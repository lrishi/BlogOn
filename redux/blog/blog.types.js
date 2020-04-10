export const BlogActionTypes = {
    BLOG_LIST_MULTIPLE: "BLOG_LIST_MULTIPLE",
    BLOG_LIST_USER_MULTIPLE: "BLOG_LIST_USER_MULTIPLE",
    BLOG_SET_REFRESHING: "BLOG_SET_REFRESHING",
    BLOG_EDIT: "BLOG_EDIT",
    BLOG_VIEW: "BLOG_VIEW",
    BLOG_SET_ISLOADING: "BLOG_SET_ISLOADING"
};

export const BlogTemplate = () => (
    {
        template: {
            'id': null,
            'title': null,
            'editor': null,
            'image': null,
            'author': null,
            'ts_added': null,
            'ts_updated': null
        },
        validate: ( { title, editor, image, author } ) => {
            return ( title !== null && editor != null && image != null && author != null );
        }
    }
);
