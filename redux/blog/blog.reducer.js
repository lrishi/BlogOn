import { BlogActionTypes } from "./blog.types";


const INITIAL_STATE = {
    blogList: null,
    isRefreshing: false
};

const blogReducer = ( state = INITIAL_STATE, action ) => {
    switch ( action.type ) {
        case BlogActionTypes.BLOG_LIST_MULTIPLE:
            return {
                ...state,
                isRefreshing: false,
                blogList: action.payload
            };
        case BlogActionTypes.BLOG_REFRESH_LISTS:
            return {
                ...state,
                isRefreshing: action.payload
            };
        default:
            return state;
    }
};

export default blogReducer;