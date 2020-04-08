import { BlogActionTypes } from "./blog.types";
import { BLOG_DATA } from '../../components/blog-list/blog-list.data';


const INITIAL_STATE = {
    blogList: BLOG_DATA
};

const blogReducer = ( state = INITIAL_STATE, action ) => {
    switch ( action.type ) {
        case BlogActionTypes.BLOG_LIST_MULTIPLE:
            return {
                ...state,
                blogList: action.payload
            };
        default:
            return state;
    }
};

export default blogReducer;