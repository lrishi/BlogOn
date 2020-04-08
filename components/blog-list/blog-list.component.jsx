import React from 'react';
import { selectBlogList } from '../../redux/blog/blog.selectors';
import { FlatList, Text } from 'react-native';
import { connect as connectRedux } from 'react-redux';
import BlogListItem from '../../components/blog-list-item/blog-list-item.component';
import { listMultiple } from '../../redux/blog/blog.actions';

import { getBlogData } from '../../firebase/firebase.utils';
let isRefreshing = false;

const BlogList = ( { blogList, listItem } ) => {
    return (
        <FlatList
            onRefresh={ () => { listItem( getBlogData() ); isRefreshing = true; } }
            refreshing={ isRefreshing }
            data={ blogList }
            keyExtractor={ blog => blog.id.toString() }
            renderItem={ blogData => {
                return ( <BlogListItem key={ blogData.item.id } blog={ blogData.item } />
                );
            } }
        />

    );
};

const mapDispatchToProps = dispatch => ( {
    listItem: item => dispatch( listMultiple( item ) ),
} );

const mapStateToProps = ( state ) => ( {
    blogList: selectBlogList( state )
} );

export default connectRedux( mapStateToProps, mapDispatchToProps )( BlogList );