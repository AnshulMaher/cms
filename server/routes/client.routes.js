const express = require('express');
const router = express.Router();
const { protect, restrictTo } = require('../controllers/auth.controller');
const { getAll } = require('../controllers/client.controller');

router.use(protect);
router.get('/', getAll);
module.exports = router;
