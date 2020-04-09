import { createSelector } from 'reselect';

const selectBlog = state => state.blog;

export const selectBlogList = createSelector(
    [ selectBlog ],
    ( blog ) => blog.blogList
);

selectBlogIsRefreshing;

export const selectBlogIsRefreshing = createSelector(
    [ selectBlog ],
    ( blog ) => blog.isRefreshing
);
