const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');

const candidateRouter = require('../routes/candidate.routes');
const userRouter = require('../routes/user.routes');

const CustomError = require('../utils/customError');
const globalErrorHandler = require('../utils/globalErrorHandler');

const app = express();

app.enable('trust proxy');

// GLOBAL MIDDLEWARES
app.use(
    cors({
        origin: "http://localhost:3001",
        credentials: true
    })
);

/* set security http headers */
app.use(helmet());
/* developement logging */
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
/* limit requests from same ip */
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);
/* body parser, parse data from body into req.body */
app.use(express.json({ limit: '50kb' }));
/* parses incoming requests with urlencoded payloads into req.body */
app.use(express.urlencoded({ extended: true, limit: '50kb' }));
/* cookie parser, parse cookie from header into req.cookies */
app.use(cookieParser());
/* Data sanitization against NoSql query injection */
app.use(mongoSanitize());
/* Data sanitization against XSS */
app.use(xss());
/* test middleware */
app.use(compression());

// ROUTES
app.get('/',(req,res)=>{
    res.send("hello");
})
app.use('/api/v1/candidate', candidateRouter);
app.use('/api/v1/users', userRouter);

app.use('*', (req, res, next) => {
    next(new CustomError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
