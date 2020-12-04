const { default: catchAsyncError } = require('../../client/src/utils/catchAsyncError');
const Candidate = require('../models/candidate.model');

const common = require('./common.controller');

exports.getAll = common.getAll(Candidate);

exports.getOne = common.getOne(Candidate);

exports.getOneByEmail = common.getOne(Candidate, 'email');

exports.createOne =   catchAsyncError(async (req, res, next) => {
    const data = { ...req.body, recruiter:req.user._id };
    const document = await Model.create(data);
    res.status(201).json({ status: 'success', data: document });
  });

exports.updateOne = common.updateOne(Candidate);

exports.deleteOne = common.deleteOne(Candidate);
