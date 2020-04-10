
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
