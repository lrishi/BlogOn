import React from 'react';
import BlogEditor from './blog-editor.component';


class BlogEditorScreen extends React.Component {

    static navigationOptions = {
        drawerLabel: 'Edit Blog',
    };

    render () {
        return ( <BlogEditor /> );

    };
}

export default BlogEditor;