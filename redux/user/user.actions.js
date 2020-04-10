import { UserActionTypes } from "./user.types";

export const setCurrentUser = user => ( {
    type: UserActionTypes.SET_CURRENT_USER,
    payload: user
} );

export const setCurrentTitle = user => ( {
    type: UserActionTypes.SET_CURRENT_TITLE,
    payload: user
} );