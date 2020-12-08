import { createSelector } from 'reselect';

export const selectChoices = (state) => state.choices;
export const selectEducationChoices = createSelector([selectChoices], (choices) => choices.education);
export const selectNoticePeriodChoices = createSelector([selectChoices], (choices) => choices.noticePeriod);
export const selectStatusChoices = createSelector([selectChoices], (choices) => choices.status);
export const selectJoinStatusChoices = createSelector([selectChoices], (choices) => choices.joinStatus);
export const selectInterviewStatusChoices = createSelector([selectChoices], (choices) => choices.interviewStatus);
export const selectChangeReasonChoices = createSelector([selectChoices], (choices) => choices.changeReason);
export const selectStateChoices = createSelector([selectChoices], (choices) => choices.state);
