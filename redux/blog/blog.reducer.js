import { BlogActionTypes } from "./blog.types";

const INITIAL_STATE = {
    blogList: null,
    userBlogList: null,
    isRefreshing: false,
    editable: null,
    viewable: null,
    isLoading: false
};

const blogReducer = ( state = INITIAL_STATE, action ) => {
    switch ( action.type ) {
        case BlogActionTypes.BLOG_LIST_MULTIPLE:
            return {
                ...state,
                isRefreshing: false,
                blogList: action.payload
            };
        case BlogActionTypes.BLOG_LIST_USER_MULTIPLE:
            return {
                ...state,
                isRefreshing: false,
                userBlogList: action.payload
            };
        case BlogActionTypes.BLOG_REFRESH_LISTS:
            return {
                ...state,
                isRefreshing: action.payload
            };
        case BlogActionTypes.BLOG_EDIT:
            return {
                ...state,
                editable: action.payload
            };
        case BlogActionTypes.BLOG_VIEW:
            return {
                ...state,
                viewable: action.payload
            };
        case BlogActionTypes.BLOG_SET_ISLOADING:
            return {
                ...state,
                isLoading: action.payload
            };
        default:
            return state;
    }
};

export default blogReducer;