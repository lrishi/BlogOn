import { BlogActionTypes } from "./blog.types";
import { BlogTemplate } from '../../templates/blog.template';

const INITIAL_STATE = {
    blogList: null,
    userBlogList: null,
    isRefreshing: false,
    editable: null
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
        default:
            return state;
    }
};

export default blogReducer;