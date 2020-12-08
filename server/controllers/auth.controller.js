const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');
const catchAsyncError = require('../utils/catchAsyncError');
const CustomError = require('../utils/customError');
const Email = require('../utils/email');

const signToken = (id) => {
    return jwt.sign({ id: id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

const createAndSendToken = (user, statusCode, req, res) => {
    const token = signToken(user._id);
    res.cookie('jwt', token, {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
    });

    user.password = undefined;
    res.status(statusCode).json({ status: 'success', token, data: user });
};

exports.signup = catchAsyncError(async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    });

    const url = `${req.protocol}://${req.get('host')}/`;
    await new Email(newUser, url).sendWelcome();

    createAndSendToken(newUser, 201, req, res);
});

exports.login = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    // 1) If email and password actually exist
    if (!email || !password) {
        return next(new CustomError(400, 'Please provide email and password'));
    }

    // 2) Check if user exists && password is correct
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new CustomError(401, 'Incorrect email or password'));
    }

    // 3) If everything ok, send token to client
    createAndSendToken(user, 200, req, res);
});

exports.protect = catchAsyncError(async (req, res, next) => {
    // 1) Getting token and check if it's there
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    if (!token) {
        return next(new CustomError(401, 'You are not logged in! Please log in to get access'));
    }
    // 2) Verification of token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if the user still exits
    const freshUser = await User.findById(decoded.id);
    if (!freshUser) {
        return next(new CustomError(401, 'The user belonging to this token does no longer exist'));
    }
    // 4) Check if user change password after the token was issued
    if (freshUser.changedPasswordAfter(decoded.iat)) {
        return next(new CustomError(401, 'recently changed password! Please log in again'));
    }

    // Grant access to protected route
    req.user = freshUser;
    next();
});

// Only for rendered pages, no errors!
exports.isLoggedIn = catchAsyncError(async (req, res, next) => {
    if (req.cookies.jwt) {
        // 1) Verification of token
        const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);

        // 2) Check if the user still exits
        const freshUser = await User.findById(decoded.id);
        if (!freshUser) {
            return next(new CustomError(401, 'You are not logged in! Please log in to get access'));
        }

        // 3) Check if user change password ater the token was issued
        if (freshUser.changedPasswordAfter(decoded.iat)) {
            return next(new CustomError(401, 'You are not logged in! Please log in to get access'));
        }

        // There is a logged in user
        return res.status(200).json({ status: 'success', data: freshUser });
    }
    return next(new CustomError(401, 'You are not logged in! Please log in to get access'));
});

exports.logout = (req, res) => {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });
    res.status(200).json({ status: 'success' });
};

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new CustomError(403, 'You do not have permission to perfrom this action'));
        }
        next();
    };
};

exports.forgotPassword = catchAsyncError(async (req, res, next) => {
    // 1) Get user based on posted email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new CustomError(404, 'There is no user with that email address'));
    }

    // 2) Generate  a random token
    const resetToken = user.createPasswordResetToken();
    const u = await user.save({ validateBeforeSave: false });
    // 3) Send it to the user's email
    try {
        const resetURL = `${req.headers.referer}resetPassword/${resetToken}`;
        await new Email(user, resetURL).sendPasswordReset();

        res.status(200).json({
            status: 'success',
            data: resetToken,
            message: 'Token sent to email!'
        });
    } catch (err) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });

        return next(new CustomError(500, 'There was an error sending the email, Try again later!'));
    }
});

exports.resetPassword = catchAsyncError(async (req, res, next) => {
    // 1) Get user based on the token
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() }
    });

    // 2) If token has not expired, and there is user, set the new password
    if (!user) {
        return next(new CustomError(400, 'Token id invalid or has expired'));
    }
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    // 3) Update changedPasswordAt property for the user

    // 4) Log the user in, send JWT
    createAndSendToken(user, 200, req, res);
});

exports.updatePassword = catchAsyncError(async (req, res, next) => {
    // 1) Get user from collection
    const { currentPassword, newPassword, newPasswordConfirm } = req.body;
    if (!currentPassword) {
        return next(new CustomError(400, 'Please provide your current password'));
    }

    const user = await User.findById(req.user._id).select('+password');

    // 2) Check if Posted current password is correct
    if (!user || !(await req.user.correctPassword(currentPassword, user.password))) {
        return next(new CustomError(401, 'Current password is incorrect'));
    }

    // 3) If so, update password
    user.password = newPassword;
    user.passwordConfirm = newPasswordConfirm;
    await user.save();

    // 4) Log user in, send JWT
    createAndSendToken(user, 200, req, res);
});
