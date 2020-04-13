import { UserActionTypes } from "./user.types";

export const userActionSetCurrentUser = user => ( {
    type: UserActionTypes.SET_CURRENT_USER,
    payload: user
} );