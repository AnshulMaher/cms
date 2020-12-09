const Joi = require('joi');

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
                    currentCTC: Joi.string().trim().required(),
                    expectedCTC: Joi.string().trim().required(),
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
                    currentCTC: Joi.string().trim().required(),
                    expectedCTC: Joi.string().trim().required(),
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
                    birthDate: Joi.string().allow(''),
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

    static validateBody(req, res, next) {
        try {
            const { error } = Joi.validate(req.body, req.schema);
            if (error) return res.status(422).json({ error: true, message: error.details[0].message });
            next();
        } catch (error) {
            console.error('error In ====>>>> validateBody <<<<====', error);
            return res.status(500).json({ status: 'failed', data: 'SERVER_ERROR' });
        }
    }
}

module.exports = Validators;
