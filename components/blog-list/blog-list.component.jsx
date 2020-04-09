import React from 'react';
import { selectBlogList, selectBlogIsRefreshing } from '../../redux/blog/blog.selectors';
import { FlatList, Text } from 'react-native';
import { connect as connectRedux } from 'react-redux';
import BlogListItem from '../../components/blog-list-item/blog-list-item.component';
import { listMultiple, setRefreshing } from '../../redux/blog/blog.actions';

import { getBlogData } from '../../firebase/firebase.utils';


class BlogList extends React.Component {
    constructor( props ) {
        super( props );
        this.isRefreshing = false;
    }

    refreshData = async () => {
        console.log( "Refreshing data..." );
        const { listItem, setRefreshing } = this.props;
        setRefreshing( true );
        const listRef = await getBlogData();
        listItem( listRef );
    };

    componentDidMount () {
        if ( this.props.blogList === null ||
            this.props.blogList.length === 0 ) {
            this.refreshData();
        }
    }
    render () {
        const { blogList, isRefreshing } = this.props;
        return (
            <FlatList
                onRefresh={ this.refreshData }
                refreshing={ isRefreshing }
                data={ blogList }
                keyExtractor={ blog => blog.id }
                renderItem={ blogData => {
                    return (
                        <BlogListItem blog={ blogData.item } />
                    );
                } }
            />

        );
    };
};

const mapDispatchToProps = dispatch => ( {
    listItem: ( item ) => dispatch( listMultiple( item ) ),
    setRefreshing: ( item ) => dispatch( setRefreshing( item ) ),
} );

const mapStateToProps = ( state ) => ( {
    blogList: selectBlogList( state ),
    isRefreshing: selectBlogIsRefreshing( state )
} );

export default connectRedux( mapStateToProps, mapDispatchToProps )( BlogList );