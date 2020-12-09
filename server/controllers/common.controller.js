const catchAsyncError = require('../utils/catchAsyncError');
const CustomError = require('../utils/customError');
const APIFeatures = require('../utils/apiFeatures');

//----------------- Generic Handlers-----------------//

exports.getAll = (Model) =>
    catchAsyncError(async (req, res, next) => {
        let filter = {};
        if (req.params.tourId) {
            filter = { tour: req.params.tourId };
        }
        const features = new APIFeatures(Model.find(filter), req.query).filter().sort().limitFields().paginate();
        const documents = await features.query;

        res.status(200).json({ status: 'success', results: documents.length, data: documents });
    });

exports.createOne = (Model) =>
    catchAsyncError(async (req, res, next) => {
        const data = { ...req.body };
        const document = await Model.create(data);
        res.status(201).json({ status: 'success', data: document });
    });

exports.getOne = (Model, field = null, populateOptions) =>
    catchAsyncError(async (req, res, next) => {
        let query;
        if (field) query = Model.findOne({ [field]: req.params[field] });
        else query = Model.findById(req.params.id);
        if (populateOptions) query = query.populate(populateOptions);
        const document = await query;
        if (!document) return res.status(200).json({ status: 'failed', data: null });
        res.status(200).json({ status: 'success', data: document });
    });

exports.updateOne = (Model) =>
    catchAsyncError(async (req, res, next) => {
        const document = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!document) {
            return next(new CustomError(404, 'No document found with that ID'));
        }
        res.status(200).json({ status: 'success', data: document });
    });

exports.deleteOne = (Model) =>
    catchAsyncError(async (req, res, next) => {
        const document = await Model.findByIdAndDelete(req.params.id);
        if (!document) {
            return next(new CustomError(404, 'No document found with that ID'));
        }
        res.status(204).json({ status: 'success', data: null });
    });
