const express = require('express');
const router = express.Router();
const Validator = require('../validators/candidate.validator');
const { protect, restrictTo } = require('../controllers/auth.controller');
const { getAll, getOneByEmail, createOne, updateOne, deleteOne } = require('../controllers/candidate.controller');

router.use(protect);
router.get('/', restrictTo('admin'), getAll);
router.post('/', Validator.createCandidateValidator(), Validator.validateBody, createOne);
router.get('/:email', getOneByEmail);
router.route('/:id').put(Validator.updateValidator(), Validator.validateBody, updateOne).delete(deleteOne);

module.exports = router;
