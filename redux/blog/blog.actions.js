import { BlogActionTypes } from './blog.types';


export const listMultiple = ( item ) => ( {
    type: BlogActionTypes.BLOG_LIST_MULTIPLE,
    payload: item
} );