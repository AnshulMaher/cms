const catchAsyncError = require('../utils/catchAsyncError');
const Candidate = require('../models/candidate.model');

const common = require('./common.controller');

exports.getAll = common.getAll(Candidate);

exports.getOne = common.getOne(Candidate);

exports.getOneByEmail = common.getOne(Candidate, 'email');

exports.createOne = catchAsyncError(async (req, res, next) => {
    const data = { ...req.body, recruiter: req.user._id };
    const document = await Candidate.create(data);
    if (!document) return next(new CustomError(404, 'Failed to save!'));
    res.status(201).json({ status: 'success', data: document });
});

exports.updateOne = catchAsyncError(async (req, res, next) => {
    const data = { ...req.body, recruiter: req.user._id };
    const document = await Candidate.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
    if (!document) return next(new CustomError(404, 'No document found with that ID!'));
    res.status(200).json({ status: 'success', data: document });
});

exports.deleteOne = common.deleteOne(Candidate);
