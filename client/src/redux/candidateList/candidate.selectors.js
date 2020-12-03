import { createSelector } from 'reselect';

export const selectCandidate = (state) => state.candidateList;
export const selectCandidates = createSelector([selectCandidate], (candidate) => candidate.candidateList);
export const selectCandidateEducation = createSelector([selectCandidate], (candidate) => candidate.education);
export const selectCandidateNoticePeriod = createSelector([selectCandidate], (candidate) => candidate.noticePeriod);
export const selectCandidateStatus = createSelector([selectCandidate], (candidate) => candidate.status);
export const selectCandidateJoinStatus = createSelector([selectCandidate], (candidate) => candidate.joinStatus);
export const selectCandidateInterviewStatus = createSelector([selectCandidate], (candidate) => candidate.interviewStatus);
export const selectCandidateChangeReason = createSelector([selectCandidate], (candidate) => candidate.changeReason);
