import React from 'react';
import BlogViewer from './blog-viewer.component';

class BlogViewerScreen extends React.Component {

    static navigationOptions = {
        title: 'Viewing Post',
    };
    constructor( props ) {
        super( props );
        this.props.navigation.setParams( { title: 'Viewing Post' } );
    }

    render () {
        return ( <BlogViewer /> );
    };
}

export default BlogViewerScreen;