import { BlogActionTypes } from './blog.types';


export const blogActionListMultiple = ( item ) => ( {
    type: BlogActionTypes.BLOG_LIST_MULTIPLE,
    payload: item
} );

export const blogActionListUserMultiple = ( item ) => ( {
    type: BlogActionTypes.BLOG_LIST_USER_MULTIPLE,
    payload: item
} );

export const blogActionSetRefreshing = ( item ) => ( {
    type: BlogActionTypes.BLOG_SET_REFRESHING,
    payload: item
} );

export const blogActionEditBlog = ( item ) => ( {
    type: BlogActionTypes.BLOG_EDIT,
    payload: item
} );

export const blogActionViewBlog = ( item ) => ( {
    type: BlogActionTypes.BLOG_VIEW,
    payload: item
} );

export const blogActionSetIsLoading = ( item ) => ( {
    type: BlogActionTypes.BLOG_SET_ISLOADING,
    payload: item
} );

