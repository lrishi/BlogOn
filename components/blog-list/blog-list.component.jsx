import React from 'react';
import { selectBlogList, selectUserBlogList, selectBlogIsRefreshing } from '../../redux/blog/blog.selectors';
import { FlatList, Text, View } from 'react-native';
import { connect as connectRedux } from 'react-redux';
import BlogListItem from '../../components/blog-list-item/blog-list-item.component';
import { blogActionListMultiple, blogActionListUserMultiple, blogActionSetRefreshing } from '../../redux/blog/blog.actions';
import { userSelectorGetCurrentUser } from '../../redux/user/user.selectors';
import { getBlogData, getUserBlogData } from '../../firebase/firebase.utils';
import { createStructuredSelector } from 'reselect';
import { blogActionSetIsLoading } from '../../redux/blog/blog.actions';
import { blogActionEditBlog } from '../../redux/blog/blog.actions';

import { DecoratedButtonInfo } from '../../components/decorated-natives/decorated-natives.components';
import { getGlobalStackNavigationContext } from '../../components/navigator/navigator.exports';

import styles from './blog-list.styles';

class BlogList extends React.Component {
    constructor( props ) {
        super( props );
        this.hasUser = this.props.hasOwnProperty( 'hasUser' ) ? this.props.hasUser : false;
    }

    refreshData = async () => {
        console.log( "Refreshing data..." );
        let listRef = null;
        const { listItem, setRefreshing, listUserItem, navigation = null } = this.props;
        if ( navigation != null ) {
            navigation.setParams( { "needsRefresh": false } );
        }
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

    refreshCallBack = async () => {
        const { notifyIsLoading } = this.props;
        await this.refreshData();
        setTimeout( () => notifyIsLoading( false ), 1000 );
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

    handleNewPostButton = () => {
        const { notifyIsLoading, editBlogItem } = this.props;
        notifyIsLoading( true );
        editBlogItem( {} );
        getGlobalStackNavigationContext().navigate( 'BlogEditor' );
        setTimeout( () => notifyIsLoading( false ), 1000 );

    };

    listEmptyComponent = () => {
        const { isRefreshing, hasUser } = this.props;
        if ( hasUser ) {
            return (
                <View>
                    <Text style={ styles.emptyListBanner } >
                        { isRefreshing.user ? "Updating..." : "You've written no blogs yet." }
                    </Text>
                    <DecoratedButtonInfo
                        style={ styles.newPostButton }
                        title="Write a New Post"
                        onPress={ this.handleNewPostButton }
                    />
                </View>
            );
        } else {
            return (
                <View>
                    <Text style={ styles.emptyListBanner } >
                        { isRefreshing.global ? "Updating..." : "No posts to show" }
                    </Text>
                </View>
            );
        }
    };

    render () {
        const { navigation = null } = this.props;
        if ( navigation != null ) {
            if ( navigation.getParam( "needsRefresh", false ) ) {
                this.refreshData(); // This is async method
            }
        }
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
                        <BlogListItem blog={ blogData.item } hasUser={ this.hasUser } currentUser={ currentUser } refreshCallBack={ this.refreshCallBack } />
                    );
                } }
                ListEmptyComponent={ this.listEmptyComponent() }
            />
        );
    };

};

const mapDispatchToProps = dispatch => ( {
    listItem: ( item ) => dispatch( blogActionListMultiple( item ) ),
    listUserItem: ( item ) => dispatch( blogActionListUserMultiple( item ) ),
    setRefreshing: ( item ) => dispatch( blogActionSetRefreshing( item ) ),
    editBlogItem: ( item ) => dispatch( blogActionEditBlog( item ) ),
    notifyIsLoading: ( item ) => dispatch( blogActionSetIsLoading( item ) ),
} );

const mapStateToProps = createStructuredSelector( {
    blogList: selectBlogList,
    userBlogList: selectUserBlogList,
    isRefreshing: selectBlogIsRefreshing,
    currentUser: userSelectorGetCurrentUser
} );

export default connectRedux( mapStateToProps, mapDispatchToProps )( BlogList );