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
        require: [true, 'Candidate must have an email address']
    },
    phoneNumber: {
        type: Number,
        require: [true, 'Candidate must have a phone number']
    },
    candidateName: {
        type: String,
        require: [true, 'Candidate must have a name']
    },
    clientName: {
        type: String,
        require: [true, 'Client must have a name']
    },
    currentDesignation: {
        type: String,
        require: [true, 'Candidate must have a valid profile']
    },
    currentCompany: {
        type: String,
        require: [true, 'Current company field required']
    },
    education: {
        type: String,
        require: [true, 'Education field required'],
        enum: ['UG', 'PG', 'Diploma', 'UG- Top College', 'PG - Top College']
    },
    totalExperience: {
        type: Number,
        require: [true, 'Total experience field needed']
    },
    relevantExperience: {
        type: Number,
        require: [true, 'Relevant experience field needed']
    },
    area: String,
    city: {
        type: String,
        require: [true, 'City is required']
    },
    state: {
        type: String,
        require: [true, 'State is required']
    },
    currentCTC: {
        type: Number,
        require: [true, 'Current CTC field required']
    },
    expectedCTC: {
        type: Number,
        require: [true, 'Expected CTC field required']
    },
    noticePeriod: {
        type: Number,
        require: [true, 'Candidate must have a notice period']
    },
    status: {
        type: String,
        enum: ['interested', 'not looking', 'not relevant', 'not available', 'not reachable', 'call back later', 'high np', 'high expectation', 'location issue']
    },
    changeReason: {
        type: String
    },
    interviewProcess: {
        type: String,
        enum: ['Feedback Pending', 'L1Done', 'L2Done', 'L3Done', 'L4Done', 'L5Done', 'HR done']
    },
    joinStatus: {
        type: String,
        enum: ['Joining', 'Offer accepted', 'Offer rejected', 'Joined']
    },
    skills: {
        type: [String],
        require: [true, 'Skills cannot be empty']
    },
    Feedback: {
        type: Number,
        require: [true, 'Please provide feedback']
    },
    recruiter: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'candidate must be handled by a recruiter.']
    }
});

CandidateSchema.index({
    phoneNumber: 1
});
CandidateSchema.index({
    email: 1
});

module.exports = mongoose.model('Candidate', CandidateSchema);
