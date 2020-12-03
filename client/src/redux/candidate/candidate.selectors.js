import { createSelector } from 'reselect';

export const selectCandidateState = (state) => state.candidate;

export const selectCandidate = createSelector([selectCandidateState], (candidate) => candidate.candidate);
