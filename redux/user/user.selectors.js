import { createSelector } from 'reselect';

const selectUser = state => state.user;

export const userSelectorGetCurrentUser = createSelector(
    [ selectUser ],
    ( user ) => user.currentUser
);
