import { createSelector } from 'reselect';

const selectStyler = state => state.styler;

export const stylerSelectorGetDimensions = createSelector(
    [ selectStyler ],
    ( styler ) => styler.windowDimensions
);
