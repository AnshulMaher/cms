const express = require('express');
const Validator = require('../validators/user.validator');
const router = express.Router();

const { signup, login, logout, protect, isLoggedIn, restrictTo, updatePassword, forgotPassword, resetPassword } = require('../controllers/auth.controller');

const { getAllUsers, createUser, getUser, getMe, uploadUserPhoto, resizeUserPhoto, updateMe, updateUser, deleteMe, deleteUser } = require('../controllers/user.controller');

router.post('/signup', Validator.signUpValidator(), Validator.validateBody, signup);

router.post('/login', Validator.signInValidator(), Validator.validateBody, login);

router.get('/logout', logout);

router.post('/forgotPassword', Validator.emailValidator(), Validator.validateBody, forgotPassword);

router.patch('/resetPassword/:token', Validator.passwordsValidator(), Validator.validateBody, resetPassword);

// Put protect middleware in below routes or use router.use(protect) in this line
// all below routes will be protected
router.get('/isLoggedIn', isLoggedIn);
router.use(protect);

router.get('/me', getMe, getUser);

router.patch('/updateMe', uploadUserPhoto, resizeUserPhoto, updateMe);

router.patch('/updatePassword', updatePassword);

router.delete('/deleteMe', deleteMe);

// Put restrictTo middleware in below routes or use router.use(restrictTo('admin')) in this line
// all below routes will be restricted to admin
router.use(restrictTo('admin'));
router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
