import { StylerActionTypes } from "./styler.types";

export const stylerActionSetDimensions = item => ( {
    type: StylerActionTypes.SET_DIMENSIONS,
    payload: item
} );