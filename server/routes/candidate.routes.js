const express = require('express');
const router = express.Router();

const { protect, restrictTo } = require('../controllers/auth.controller');
const { getAll, getOneByEmail, createOne, updateOne, deleteOne } = require('../controllers/candidate.controller');

router.use(protect);
router.get('/', restrictTo('admin'), getAll);
router.post('/', createOne);
router.get('/:email', getOneByEmail);
router.route('/:id').put(updateOne).delete(deleteOne);

module.exports = router;
