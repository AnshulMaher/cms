import UserActionTypes from './user.types';

const initialState = {
    currentUser: null
};

const userReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case UserActionTypes.SIGN_IN_SUCCESS:
        case UserActionTypes.CHECK_USER_SESSION:
        case UserActionTypes.SIGN_UP_SUCCESS:
            return { ...state, currentUser: payload };

        case UserActionTypes.SIGN_OUT_SUCCESS:
            return { ...state, currentUser: null };

        default:
            return state;
    }
};

export default userReducer;
