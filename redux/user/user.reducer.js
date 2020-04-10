import { UserActionTypes } from './user.types';

const INITIAL_STATE = {
    currentUser: null,
    title: 'BlogOn!',
};
const userReducer = ( state = INITIAL_STATE, action ) => {
    switch ( action.type ) {
        case UserActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            };
        case UserActionTypes.SET_CURRENT_TITLE:
            return {
                ...state,
                title: action.payload
            };
        default:
            return state;
    }
};


export default userReducer;