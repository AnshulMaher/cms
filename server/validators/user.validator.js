const Joi = require('joi');

const commonlyUsedPasswords = [
    '123456',
    '123456789',
    'qwerty',
    'password',
    '1111111',
    '12345678',
    'abc123',
    '1234567',
    'password1',
    '12345',
    '1234567890',
    '123123',
    '0',
    'Iloveyou',
    '1234',
    '1q2w3e4r5t',
    'Qwertyuiop',
    '123',
    'Monkey',
    'Dragon'
];

class Validators {
    static signUpValidator() {
        return async (req, res, next) => {
            try {
                req.schema = Joi.object().keys({
                    name: Joi.string()
                        .trim()
                        .required()
                        .error(() => 'REQUIRED CLIENT NAME'),
                    email: Joi.string()
                        .trim()
                        .email()
                        .required()
                        .error(() => 'REQUIRED VALID EMAIL'),
                    password: Joi.string()
                        .trim()
                        .min(8)
                        .max(20)
                        .invalid(commonlyUsedPasswords)
                        .required()
                        .error(() => 'PASSWORD VALIDATION FAILED'),
                    passwordConfirm: Joi.any()
                        .equal(Joi.ref('password'))
                        .required()
                        .error(() => 'PASSWORD VALIDATION FAILED')
                });
                next();
            } catch (error) {
                console.error('error In ====>>>> signUpValidator <<<<====', error);
                return res.status(500).json({ status: 'failed', data: 'SERVER_ERROR' });
            }
        };
    }
    static signInValidator() {
        return async (req, res, next) => {
            try {
                req.schema = Joi.object().keys({
                    email: Joi.string()
                        .trim()
                        .email()
                        .required()
                        .error(() => 'REQUIRED VALID EMAIL'),
                    password: Joi.string()
                        .trim()
                        .min(8)
                        .max(20)
                        .required()
                        .error(() => 'PASSWORD VALIDATION FAILED')
                });
                next();
            } catch (error) {
                console.error('error In ====>>>> signInValidator <<<<====', error);
                return res.status(500).json({ status: 'failed', data: 'SERVER_ERROR' });
            }
        };
    }
    static emailValidator() {
        return async (req, res, next) => {
            try {
                req.schema = Joi.object().keys({
                    email: Joi.string()
                        .trim()
                        .email()
                        .required()
                        .error(() => 'REQUIRED VALID EMAIL')
                });
                next();
            } catch (error) {
                console.error('error In ====>>>> forgotPasswordValidator <<<<====', error);
                return res.status(500).json({ status: 'failed', data: 'SERVER_ERROR' });
            }
        };
    }
    static passwordsValidator() {
        return async (req, res, next) => {
            try {
                req.schema = Joi.object().keys({
                    password: Joi.string()
                        .trim()
                        .min(8)
                        .max(20)
                        .invalid(commonlyUsedPasswords)
                        .required()
                        .error(() => 'PASSWORD VALIDATION FAILED'),
                    passwordConfirm: Joi.ref('password')
                });
                next();
            } catch (error) {
                console.error('error In ====>>>> resetPasswordValidator <<<<====', error);
                return res.status(500).json({ status: 'failed', data: 'SERVER_ERROR' });
            }
        };
    }

    static validateBody(req, res, next) {
        try {
            const { error } = Joi.validate(req.body, req.schema);
            if (error) return res.status(422).json({ error: true, message: error.details[0].message });
            next();
        } catch (error) {
            console.error('error In ====>>>> validateBody <<<<====', error);
            return res.status(500).json({ status: 'failed', data: 'SERVER_ERROR' });
        }
    }
}

module.exports = Validators;
