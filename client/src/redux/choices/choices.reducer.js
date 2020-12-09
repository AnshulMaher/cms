import ChoicesActionTypes from './choices.types';

const initialState = {
    isFetching: false,
    clients: [],
    education: ['UG', 'PG', 'Diploma', 'PHD'],
    noticePeriod: ['1', '2', '3', '4'],
    status: ['interested', 'not looking', 'not relevant', 'not available', 'not reachable', 'call back later', 'high np', 'high expectation', 'location issue'],
    joinStatus: ['Joining', 'Offer accepted', 'Offer rejected', 'Joined'],
    interviewStatus: ['Feedback Pending', 'L1Done', 'L2Done', 'L3Done', 'L4Done', 'L5Done', 'HR done'],
    changeReason: ['Better Opportunity', 'Career Change', 'Family Circumstances', 'Fresher', 'Health Reasons', 'Organizational Restructuring'],
    state: [
        'Andhra Pradesh',
        'Andaman and Nicobar Islands',
        'Arunachal Pradesh',
        'Assam',
        'Bihar',
        'Chandigarh',
        'Chhattisgarh',
        'Dadra and Nagar Haveli',
        'Daman and Diu',
        'Delhi',
        'Goa',
        'Gujarat',
        'Haryana',
        'Himachal Pradesh',
        'Jammu and Kashmir',
        'Jharkhand',
        'Karnataka',
        'Kerala',
        'Ladakh',
        'Lakshadweep',
        'Madhya Pradesh',
        'Maharashtra',
        'Manipur',
        'Meghalaya',
        'Mizoram',
        'Nagaland',
        'Odisha',
        'Puducherry ',
        'Punjab',
        'Rajasthan',
        'Sikkim',
        'Tamil Nadu',
        'Telangana',
        'Tripura',
        'Uttar Pradesh',
        'Uttarakhand',
        'West Bengal'
    ]
};

const choicesReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ChoicesActionTypes.FETCH_CLIENTS_START:
            return { ...state, isFetching: true };
        case ChoicesActionTypes.FETCH_CLIENTS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                clients: Object.values(payload)
                    .map((v) => v.name)
                    .sort()
            };
        default:
            return state;
    }
};

export default choicesReducer;
