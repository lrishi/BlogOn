import { BlogActionTypes } from './blog.types';


export const listMultiple = ( item ) => ( {
    type: BlogActionTypes.BLOG_LIST_MULTIPLE,
    payload: item
} );
export const setRefreshing = ( item ) => ( {
    type: BlogActionTypes.BLOG_SET_REFRESHING,
    payload: item
} );