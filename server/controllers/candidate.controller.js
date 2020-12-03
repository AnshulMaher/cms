const Candidate = require('../models/candidate.model');

const common = require('./common.controller');

exports.getAll = common.getAll(Candidate);

exports.getOne = common.getOne(Candidate);

exports.getOneByEmail = common.getOne(Candidate, 'email');

exports.createOne = common.createOne(Candidate);

exports.updateOne = common.updateOne(Candidate);

exports.deleteOne = common.deleteOne(Candidate);
