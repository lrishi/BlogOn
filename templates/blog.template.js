
export const BlogTemplate = () => (
    {
        template: {
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
