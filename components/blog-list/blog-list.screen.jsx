import React from 'react';
import BlogList from './blog-list.component';

class BlogListScreen extends React.Component {

    static navigationOptions = {
        drawerLabel: 'View Posts',
        title: 'View Posts',
    };
    constructor( props ) {
        super( props );
        this.props.navigation.setParams( { title: 'View Posts' } );
    }

    render () {
        return ( <BlogList hasUser={ false } /> );
    };
}

export default BlogListScreen;