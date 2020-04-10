import React from 'react';
import BlogList from './blog-list.component';

class BlogListScreen extends React.Component {

    static navigationOptions = {
        drawerLabel: 'View Blogs',
    };

    render () {
        return ( <BlogList hasUser={ false } /> );
    };
}

export default BlogListScreen;