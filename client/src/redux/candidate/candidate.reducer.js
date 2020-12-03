import CandidateActionTypes from './candidate.types';

const initialState = {
  hidden: false,
  candidate: null
};

const candidateReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CandidateActionTypes.TOGGLE_CANDIDATE_HIDDEN:
      return { ...state, hidden: !state.hidden };

    case CandidateActionTypes.FETCH_EXISTING_CANDIDATE_SUCCESS:
    case CandidateActionTypes.CREATE_CANDIDATE_SUCCESS:
    case CandidateActionTypes.UPDATE_CANDIDATE_SUCCESS:
      return { ...state, candidate: payload };

    case CandidateActionTypes.REMOVE_CANDIDATE:
      return { ...state, candidate: null };

    default:
      return state;
  }
};

export default candidateReducer;
