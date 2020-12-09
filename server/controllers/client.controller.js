const catchAsyncError = require('../utils/catchAsyncError');
const Client = require('../models/client.model');
const common = require('./common.controller');

exports.getAll = common.getAll(Client);
