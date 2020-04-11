import { BlogActionTypes } from './blog.types';


export const listMultiple = ( item ) => ( {
    type: BlogActionTypes.BLOG_LIST_MULTIPLE,
    payload: item
} );

export const listUserMultiple = ( item ) => ( {
    type: BlogActionTypes.BLOG_LIST_USER_MULTIPLE,
    payload: item
} );

export const setRefreshing = ( item ) => ( {
    type: BlogActionTypes.BLOG_SET_REFRESHING,
    payload: item
} );

export const editBlog = ( item ) => ( {
    type: BlogActionTypes.BLOG_EDIT,
    payload: item
} );

export const viewBlog = ( item ) => ( {
    type: BlogActionTypes.BLOG_VIEW,
    payload: item
} );

export const setIsLoading = ( item ) => ( {
    type: BlogActionTypes.BLOG_SET_ISLOADING,
    payload: item
} );

