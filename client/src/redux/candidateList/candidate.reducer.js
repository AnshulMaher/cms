const initialState = {
    education: ['UG', 'PG', 'Diploma', 'PHD'],
    noticePeriod: ['1', '2', '3', '4'],
    status: ['interested', 'not looking', 'not relevant', 'not available', 'not reachable', 'call back later', 'high np', 'high expectation', 'location issue'],
    joinStatus: ['Joining', 'Offer accepted', 'Offer rejected', 'Joined'],
    interviewStatus: ['Feedback Pending', 'L1Done', 'L2Done', 'L3Done', 'L4Done', 'L5Done', 'HR done'],
    changeReason: ['Better Opportunity', 'Career Change', 'Family Circumstances', 'Fresher', 'Health Reasons', 'Organizational Restructuring']
};

const candidateListReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        default:
            return state;
    }
};

export default candidateListReducer;
