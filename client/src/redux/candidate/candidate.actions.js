import CandidateActionTypes from './candidate.types';

export const toggleCandidateHidden = () => ({
  type: CandidateActionTypes.TOGGLE_CANDIDATE_HIDDEN
});

export const fetchCandidateSuccess = (candidate) => ({
  type: CandidateActionTypes.FETCH_EXISTING_CANDIDATE_SUCCESS,
  payload: candidate
});

export const createCandidateSuccess = (candidate) => ({
  type: CandidateActionTypes.CREATE_CANDIDATE_SUCCESS,
  payload: candidate
});

export const updateCandidateSuccess = (candidate) => ({
  type: CandidateActionTypes.UPDATE_CANDIDATE_SUCCESS,
  payload: candidate
});

export const removeCandidate = () => ({
  type: CandidateActionTypes.REMOVE_CANDIDATE
});
