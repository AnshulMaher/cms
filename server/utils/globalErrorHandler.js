const sendError = (err, req, res) => {
    return res.status(err.statusCode).json({
        message: err.message,
        error: err,
        stack: err.stack
    });
};

const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    return res.status(err.statusCode).json({
        message: err.message,
        error: err,
        stack: err.stack
    });
};

module.exports = globalErrorHandler;
