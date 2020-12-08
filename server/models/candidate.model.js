const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now()
    },
    birthDate: Date,
    email: {
        type: String,
        unique: true,
        require: [true, 'REQUIRED VALID EMAIL']
    },
    phoneNumber: {
        type: Number,
        require: [true, 'REQUIRED PHONE NUMBER']
    },
    candidateName: {
        type: String,
        require: [true, 'REQUIRED CANDIDATE NAME']
    },
    clientName: {
        type: String,
        require: [true, 'REQUIRED CLIENT NAME']
    },
    currentDesignation: {
        type: String,
        require: [true, 'REQUIRED CURRENT DESIGNATION']
    },
    currentCompany: {
        type: String,
        require: [true, 'REQUIRED CURRENT COMPANY']
    },
    education: {
        type: String,
        require: [true, 'REQUIRED EDUCATION'],
        enum: ['UG', 'PG', 'Diploma', 'UG- Top College', 'PG - Top College']
    },
    totalExperience: {
        type: Number,
        require: [true, 'REQUIRED TOTAL EXPERIENCE']
    },
    relevantExperience: {
        type: Number,
        require: [true, 'REQUIRED RELEVANT EXPERIENCE']
    },
    city: {
        type: String,
        require: [true, 'REQUIRED CITY']
    },
    state: {
        type: String,
        require: [true, 'REQUIRED STATE']
    },
    currentCTC: {
        type: String,
        require: [true, 'REQUIRED CURRENT CTC']
    },
    expectedCTC: {
        type: String,
        require: [true, 'REQUIRED EXPECTED CTC']
    },
    noticePeriod: {
        type: Number,
        require: [true, 'REQUIRED NOTICE PERIOD']
    },
    status: {
        type: String,
        default: '',
        enum: ['', 'interested', 'not looking', 'not relevant', 'not available', 'not reachable', 'call back later', 'high np', 'high expectation', 'location issue']
    },
    changeReason: {
        type: String
    },
    interviewProcess: {
        type: String,
        default: '',
        enum: ['', 'Feedback Pending', 'L1Done', 'L2Done', 'L3Done', 'L4Done', 'L5Done', 'HR done']
    },
    joinStatus: {
        type: String,
        default: '',
        enum: ['', 'Joining', 'Offer accepted', 'Offer rejected', 'Joined']
    },
    skills: {
        type: [String],
        require: [true, 'Skills cannot be empty']
    },
    Feedback: {
        type: Number
    },
    recruiter: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Candidate must be handled by a recruiter']
    }
});

CandidateSchema.index({
    phoneNumber: 1
});
CandidateSchema.index({
    email: 1
});

module.exports = mongoose.model('Candidate', CandidateSchema);
