import { createSelector } from 'reselect';

const selectBlog = state => state.blog;

export const selectBlogList = createSelector(
    [ selectBlog ],
    ( blog ) => blog.blogList
);

export const selectUserBlogList = createSelector(
    [ selectBlog ],
    ( blog ) => blog.userBlogList
);

export const selectBlogIsRefreshing = createSelector(
    [ selectBlog ],
    ( blog ) => blog.isRefreshing
);

export const selectBlogEditable = createSelector(
    [ selectBlog ],
    ( blog ) => blog.editable
);

export const selectBlogViewable = createSelector(
    [ selectBlog ],
    ( blog ) => blog.viewable
);

export const selectIsLoading = createSelector(
    [ selectBlog ],
    ( blog ) => blog.isLoading
);