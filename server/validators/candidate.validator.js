const Joi = require('joi');
const commonlyUsedPasswords = {
    passwords: [
        '123456',
        '123456789',
        'qwerty',
        'password',
        '1111111',
        '12345678',
        'abc123',
        '1234567',
        'password1',
        '12345',
        '1234567890',
        '123123',
        '0',
        'Iloveyou',
        '1234',
        '1q2w3e4r5t',
        'Qwertyuiop',
        '123',
        'Monkey',
        'Dragon'
    ]
};
class Validators {
    static createCandidateValidator() {
        return async (req, res, next) => {
            try {
                req.schema = Joi.object().keys({
                    city: Joi.string()
                        .trim()
                        .required()
                        .error(() => 'REQUIRED CITY'),
                    state: Joi.string()
                        .trim()
                        .required()
                        .error(() => 'REQUIRED STATE'),
                    candidateName: Joi.string()
                        .trim()
                        .required()
                        .error(() => 'REQUIRED CANDIDATE NAME'),
                    clientName: Joi.string()
                        .trim()
                        .required()
                        .error(() => 'REQUIRED CLIENT NAME'),
                    currentDesignation: Joi.string()
                        .trim()
                        .required()
                        .error(() => 'REQUIRED CURRENT DESIGNATION'),
                    currentCompany: Joi.string()
                        .trim()
                        .required()
                        .error(() => 'REQUIRED CURRENT COMPANY'),
                    skills: Joi.array().items(Joi.string()).min(1).required(),
                    education: Joi.string()
                        .valid(['UG', 'PG', 'Diploma', 'UG- Top College', 'PG - Top College'])
                        .trim()
                        .required()
                        .error(() => 'REQUIRED EDUCATION'),
                    totalExperience: Joi.number()
                        .strict()
                        .required()
                        .error(() => 'REQUIRED TOTAL EXPERIENCE'),
                    relevantExperience: Joi.number()
                        .strict()
                        .required()
                        .error(() => 'REQUIRED RELEVANT EXPERIENCE'),
                    currentCTC: Joi.number()
                        .strict()
                        .required()
                        .error(() => 'REQUIRED CURRENT CTC'),
                    expectedCTC: Joi.number()
                        .strict()
                        .required()
                        .error(() => 'REQUIRED EXPECTED CTC'),
                    email: Joi.string()
                        .trim()
                        .email()
                        .required()
                        .error(() => 'REQUIRED VALID EMAIL'),
                    noticePeriod: Joi.number()
                        .max(4)
                        .required()
                        .error(() => 'REQUIRED NOTICE PERIOD'),
                    phoneNumber: Joi.number()
                        .strict()
                        .min(10 ** 9)
                        .max(10 ** 10 - 1)
                        .required()
                        .error(() => 'REQUIRED PHONE NUMBER')
                });
                next();
            } catch (error) {
                console.error('error In ====>>>> createCandidateValidator <<<<====', error);
                return res.status(500).json({ status: 'failed', data: 'SERVER_ERROR' });
            }
        };
    }

    static completeCandidateValidator() {
        return async (req, res, next) => {
            try {
                req.schema = Joi.object().keys({
                    dob: Joi.string().allow(''),
                    status: Joi.string()
                        .trim()
                        .allow('')
                        .valid(['', 'interested', 'not looking', 'not relevant', 'not available', 'not reachable', 'call back later', 'high np', 'high expectation', 'location issue'])
                        .error(() => 'REQUIRED PROPER STATUS'),
                    joinStatus: Joi.string()
                        .trim()
                        .allow('')
                        .valid(['', 'Joining', 'Offer accepted', 'Offer rejected', 'Joined'])
                        .error(() => 'REQUIRED PROPER JOIN STATUS'),
                    changeReason: Joi.string()
                        .trim()
                        .allow('')
                        .valid(['', 'Better Opportunity', 'Career Change', 'Family Circumstances', 'Fresher', 'Health Reasons', 'Organizational Restructuring'])
                        .error(() => 'REQUIRED PROPER CHANGE REASON'),
                    interviewProcess: Joi.string()
                        .trim()
                        .allow('')
                        .valid(['', 'Feedback Pending', 'L1Done', 'L2Done', 'L3Done', 'L4Done', 'L5Done', 'HR done'])
                        .error(() => 'REQUIRED PROPER INTERVIEW PROCESS')
                });
                next();
            } catch (error) {
                console.error('error In ====>>>> completeCandidateValidator <<<<====', error);
                return res.status(500).json({ status: 'failed', data: 'SERVER_ERROR' });
            }
        };
    }

    static updateValidator() {
        return async (req, res, next) => {
            try {
                req.schema = Joi.object().keys({
                    _id: Joi.string(),
                    recruiter: Joi.string(),
                    city: Joi.string()
                        .trim()
                        .required()
                        .error(() => 'REQUIRED CITY'),
                    state: Joi.string()
                        .trim()
                        .required()
                        .error(() => 'REQUIRED STATE'),
                    candidateName: Joi.string()
                        .trim()
                        .required()
                        .error(() => 'REQUIRED CANDIDATE NAME'),
                    clientName: Joi.string()
                        .trim()
                        .required()
                        .error(() => 'REQUIRED CLIENT NAME'),
                    currentDesignation: Joi.string()
                        .trim()
                        .required()
                        .error(() => 'REQUIRED CURRENT DESIGNATION'),
                    currentCompany: Joi.string()
                        .trim()
                        .required()
                        .error(() => 'REQUIRED CURRENT COMPANY'),
                    skills: Joi.array().items(Joi.string()).min(1).required(),
                    education: Joi.string()
                        .valid(['UG', 'PG', 'Diploma', 'UG- Top College', 'PG - Top College'])
                        .trim()
                        .required()
                        .error(() => 'REQUIRED EDUCATION'),
                    totalExperience: Joi.number()
                        .strict()
                        .required()
                        .error(() => 'REQUIRED TOTAL EXPERIENCE'),
                    relevantExperience: Joi.number()
                        .strict()
                        .required()
                        .error(() => 'REQUIRED RELEVANT EXPERIENCE'),
                    currentCTC: Joi.number()
                        .strict()
                        .required()
                        .error(() => 'REQUIRED CURRENT CTC'),
                    expectedCTC: Joi.number()
                        .strict()
                        .required()
                        .error(() => 'REQUIRED EXPECTED CTC'),
                    email: Joi.string()
                        .trim()
                        .email()
                        .required()
                        .error(() => 'REQUIRED VALID EMAIL'),
                    noticePeriod: Joi.number()
                        .max(4)
                        .required()
                        .error(() => 'REQUIRED NOTICE PERIOD'),
                    phoneNumber: Joi.number()
                        .strict()
                        .min(10 ** 9)
                        .max(10 ** 10 - 1)
                        .required()
                        .error(() => 'REQUIRED PHONE NUMBER'),
                    date: Joi.string().allow(''),
                    dob: Joi.string().allow(''),
                    status: Joi.string()
                        .trim()
                        .allow('')
                        .valid(['', 'interested', 'not looking', 'not relevant', 'not available', 'not reachable', 'call back later', 'high np', 'high expectation', 'location issue'])
                        .error(() => 'REQUIRED PROPER STATUS'),
                    joinStatus: Joi.string()
                        .trim()
                        .allow('')
                        .valid(['', 'Joining', 'Offer accepted', 'Offer rejected', 'Joined'])
                        .error(() => 'REQUIRED PROPER JOIN STATUS'),
                    changeReason: Joi.string()
                        .trim()
                        .allow('')
                        .valid(['', 'Better Opportunity', 'Career Change', 'Family Circumstances', 'Fresher', 'Health Reasons', 'Organizational Restructuring'])
                        .error(() => 'REQUIRED PROPER CHANGE REASON'),
                    interviewProcess: Joi.string()
                        .trim()
                        .allow('')
                        .valid(['', 'Feedback Pending', 'L1Done', 'L2Done', 'L3Done', 'L4Done', 'L5Done', 'HR done'])
                        .error(() => 'REQUIRED PROPER INTERVIEW PROCESS')
                });
                next();
            } catch (error) {
                console.error('error In ====>>>> candidateUpdateValidator <<<<====', error);
                return res.status(500).json({ status: 'failed', data: 'SERVER_ERROR' });
            }
        };
    }

    /*************************************************************************************
    @Purpose    :   Function for food provider availability
    @Parameter  :   {
        availability    *: [{    Array of objects
            from        :   Number,
            until       :   Number,
            day         :   { type: String, enum: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] }
            isAvailable :   { type: Boolean, default: false },
        }],
    }
    @Return     :   JSON String
    **************************************************************************************/
    static availabilityValidator() {
        return async (req, res, next) => {
            try {
                req.schema = Joi.object().keys({
                    availability: Joi.array()
                        .items(
                            Joi.object().keys({
                                isAvailable: Joi.boolean()
                                    .strict()
                                    .required()
                                    .error(() => 'REQUIRED_IS_AVAILABLE'),
                                day: Joi.string()
                                    .valid('Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun')
                                    .required()
                                    .error(() => 'REQUIRED_PROPER_DAY'),
                                from: Joi.when('isAvailable', {
                                    is: true,
                                    then: Joi.number()
                                        .strict()
                                        .required()
                                        .error(() => 'REQUIRED_FROM_VALUE')
                                }),
                                until: Joi.when('isAvailable', {
                                    is: true,
                                    then: Joi.number()
                                        .strict()
                                        .required()
                                        .error(() => 'REQUIRED_UNTIL_VALUE')
                                })
                            })
                        )
                        .required()
                        .min(7)
                        .error(() => 'REQUIRED_AVAILABILITY_DETAILS')
                });
                next();
            } catch (error) {
                console.error('error In ====>>>> availabilityValidator <<<<====', error);
                return res.send(CS.sendResponse(0, 'SERVER_ERROR'));
            }
        };
    }

    /*************************************************************************************
    @Purpose    :   Function For get id validator
    @Parameter  :
    {
        _id     *:  ObjectId
    }
    @Return     :   JSON String
    **************************************************************************************/
    static getIdValidator() {
        return async (req, res, next) => {
            try {
                req.schema = Joi.object().keys({
                    _id: Joi.objectId()
                        .required()
                        .error(() => 'REQUIRED_ID')
                });
                next();
            } catch (error) {
                console.error('error In ====>>>> getIdValidator <<<<====', error);
                return res.send(CS.sendResponse(0, 'SERVER_ERROR'));
            }
        };
    }

    /*************************************************************************************
                V A L I D A T E - B O D Y
**************************************************************************************/
    static validateBody(req, res, next) {
        try {
            const { error } = Joi.validate(req.body, req.schema);
            if (error) return res.status(422).json({ status: 'failed', data: error.details[0].message });
            next();
        } catch (error) {
            console.error('error In ====>>>> validateBody <<<<====', error);
            return res.status(500).json({ status: 'failed', data: 'SERVER_ERROR' });
        }
    }

    /*************************************************************************************
                V A L I D A T E - P A R M S
**************************************************************************************/
    static validateParams(req, res, next) {
        try {
            const { error } = Joi.validate(req.params, req.schema);
            if (error) return res.status(422).json(CS.sendResponse(0, error.details[0].message));
            next();
        } catch (error) {
            console.error('error In ====>>>> validateParams <<<<====', error);
            return res.send({ status: 0, message: error });
        }
    }
    // End
}

module.exports = Validators;
