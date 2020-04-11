import React from 'react';
import { selectBlogList, selectUserBlogList, selectBlogIsRefreshing } from '../../redux/blog/blog.selectors';
import { FlatList, Text } from 'react-native';
import { connect as connectRedux } from 'react-redux';
import BlogListItem from '../../components/blog-list-item/blog-list-item.component';
import { listMultiple, listUserMultiple, setRefreshing } from '../../redux/blog/blog.actions';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { getBlogData, getUserBlogData } from '../../firebase/firebase.utils';
import { createStructuredSelector } from 'reselect';


class BlogList extends React.Component {
    constructor( props ) {
        super( props );
        this.hasUser = this.props.hasOwnProperty( 'hasUser' ) ? this.props.hasUser : false;
    }

    refreshData = async () => {
        console.log( "Refreshing data..." );
        let listRef = null;
        const { listItem, setRefreshing, listUserItem } = this.props;
        if ( !this.hasUser ) {
            setRefreshing( { global: true } );
            listRef = await getBlogData();
            listItem( listRef );
            setTimeout( () => setRefreshing( { global: false } ), 1000 );
        } else {
            setRefreshing( { user: true } );
            listRef = await getUserBlogData( this.props.currentUser );
            listUserItem( listRef );
            setTimeout( () => setRefreshing( { user: false } ), 1000 );
        }
    };

    componentDidMount () {
        if ( !this.hasUser ) {
            if ( this.props.blogList === null ||
                this.props.blogList.length === 0 ) {
                this.refreshData();
            }
        } else {
            if ( this.props.userBlogList === null ||
                this.props.userBlogList.length === 0 ) {
                this.refreshData();
            }
        }
    }

    render () {
        const { blogList, isRefreshing, userBlogList, currentUser } = this.props;
        //setTimeout( () => this.refreshData(), 300000 );
        return (
            <FlatList
                onRefresh={ this.refreshData }
                refreshing={ this.props.hasUser ? isRefreshing.user : isRefreshing.global }
                data={ this.hasUser ? userBlogList : blogList }
                keyExtractor={ blog => blog.id }
                renderItem={ blogData => {
                    return (
                        <BlogListItem blog={ blogData.item } hasUser={ this.hasUser } currentUser={ currentUser } />
                    );
                } }
            />

        );
    };

};

const mapDispatchToProps = dispatch => ( {
    listItem: ( item ) => dispatch( listMultiple( item ) ),
    listUserItem: ( item ) => dispatch( listUserMultiple( item ) ),
    setRefreshing: ( item ) => dispatch( setRefreshing( item ) ),
} );

const mapStateToProps = createStructuredSelector( {
    blogList: selectBlogList,
    userBlogList: selectUserBlogList,
    isRefreshing: selectBlogIsRefreshing,
    currentUser: selectCurrentUser
} );

export default connectRedux( mapStateToProps, mapDispatchToProps )( BlogList );