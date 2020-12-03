import { createSelector } from 'reselect';

export const selectLocation = (state) => state.location;

export const selectStates = createSelector(
  [selectLocation],
  (location) => location.state
);
