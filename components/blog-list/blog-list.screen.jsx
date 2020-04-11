import React from 'react';
import BlogList from './blog-list.component';

import { Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faThLarge as headerIcon } from '@fortawesome/free-solid-svg-icons';


class BlogListScreen extends React.Component {

    static navigationOptions = {
        drawerLabel: 'View Posts',
    };

    constructor( props ) {
        super( props );
        this.props.navigation.setParams( {
            title: ( <Text style={ { fontSize: 22 } }> <FontAwesomeIcon size={ 18 } icon={ headerIcon } color={ 'white' } />  Blog Posts</Text > )
        } );
    }

    render () {
        return ( <BlogList hasUser={ false } /> );
    };
}

export default BlogListScreen;