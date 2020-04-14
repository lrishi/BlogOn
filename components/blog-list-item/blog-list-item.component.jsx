import React from 'react';
import { Share, TouchableOpacity, View, Text, Image, Alert } from 'react-native';
import { connect as connectRedux } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faShareSquare, faClock, faEdit, faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { blogActionSetIsLoading } from '../../redux/blog/blog.actions';
import { blogActionEditBlog, blogActionViewBlog } from '../../redux/blog/blog.actions';
import { deleteBlogItem } from '../../firebase/firebase.utils';
import { getGlobalStackNavigationContext } from '../navigator/navigator.exports';

import { stylerSelectorGetDimensions } from '../../redux/styler/styler.selectors';
import { DecoratedButtonSecondary } from '../../components/decorated-natives/decorated-natives.components';

import styles from './blog-list-item.styles';

class BlogListItem extends React.Component {
    constructor( props ) {
        super( props );
    }

    deleteItem = async () => {

        const { currentUser, blog, notifyIsLoading, refreshCallBack } = this.props;
        Alert.alert(
            'Warning!',
            'A deleted post cannot be restored. Are you sure you want to delete this post?',
            [
                {
                    text: 'NO',
                    onPress: () => { setTimeout( () => notifyIsLoading( false ), 1000 ); }
                },
                {
                    text: 'YES',
                    onPress: async () => {
                        notifyIsLoading( true );
                        await deleteBlogItem( currentUser, blog ).then( () => {
                            refreshCallBack();
                        } );
                    }
                },
            ]
        );
    };

    editItem = () => {
        const { notifyIsLoading, blog, blogActionEditBlogItem } = this.props;
        notifyIsLoading( true );
        blogActionEditBlogItem( blog );
        getGlobalStackNavigationContext().navigate( 'BlogEditor' );
        setTimeout( () => notifyIsLoading( false ), 1000 );
    };

    handleblogActionViewBlog = () => {
        const { blog, blogActionViewBlogItem } = this.props;
        blogActionViewBlogItem( blog );
        getGlobalStackNavigationContext().navigate( 'BlogViewer' );
    };

    shareItem = async () => {
        const { blog } = this.props;
        const redirectUrl = "https://tinyurl.com/vkgpzd3?id=" + blog.id;
        try {
            await Share.share(
                {
                    message:
                        "Checkout my blog '" + blog.title + "' on BlogOn!. Click here: " + redirectUrl
                },
                {
                    title: 'Sharing post: ' + blog.title,
                }
            );
        } catch ( error ) {
            alert( error.message );
        }
    };

    render () {
        const { blog, hasUser = false, windowDimensions } = this.props;
        return (
            <TouchableOpacity
                activeOpacity={ 0.75 }
                style={
                    ( windowDimensions.isPortrait() ) ?
                        styles.blogListItemContainer :
                        styles.landscapeBlogListItemContainer
                }
                onPress={ this.handleblogActionViewBlog }>

                <Image
                    style={ styles.blogListThumbnail }
                    source={ { uri: `data:image/gif;base64,${ blog.image }` } }
                />
                <View style={ styles.blogListTextWrapper }>
                    <Text numberOfLines={ 1 } style={ styles.blogListTitle } >{ blog.title }</Text>

                    <Text style={ styles.blogMetaData }>
                        <FontAwesomeIcon icon={ faEdit } size={ 12 } color={ 'grey' } /> { blog.author !== null ? blog.author.displayName.substring( 0, 20 ) : "Unknown" } { '\n' }
                        <FontAwesomeIcon icon={ faClock } size={ 12 } color={ 'grey' } /> { blog.ts_added.toDate().toDateString().substring( 0, 20 ) }
                    </Text>

                    <Text numberOfLines={ 1 } style={ styles.blogExcerpt }>
                        { `${ blog.editor.substring( 0, 24 ) }` }
                    </Text>
                    {
                        hasUser ?
                            (
                                <View style={ styles.blogActionWrapper } >
                                    <TouchableOpacity style={ {
                                        ...styles.blogActionButton,
                                        ...styles.blogEditButton
                                    } }
                                        onPress={ this.editItem } >
                                        <FontAwesomeIcon icon={ faEdit } color={ 'white' } />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={ {
                                            ...styles.blogActionButton,
                                            ...styles.deleteButton
                                        } }
                                        onPress={ this.deleteItem } >
                                        <FontAwesomeIcon icon={ faTimesCircle } color={ 'white' } />
                                    </TouchableOpacity>
                                </View>
                            )
                            :
                            (
                                <View style={ styles.blogActionWrapper }>
                                    <DecoratedButtonSecondary
                                        style={ styles.shareButton }
                                        title={ <FontAwesomeIcon icon={ faShareSquare } color={ 'black' } size={ 20 } /> }
                                        onPress={ this.shareItem }
                                    />
                                </View>
                            )
                    }
                </View>
            </TouchableOpacity>

        );
    };
}
const mapDispatchToProps = dispatch => ( {
    blogActionEditBlogItem: ( item ) => dispatch( blogActionEditBlog( item ) ),
    blogActionViewBlogItem: ( item ) => dispatch( blogActionViewBlog( item ) ),
    notifyIsLoading: ( item ) => dispatch( blogActionSetIsLoading( item ) ),
} );

const mapStateToProps = ( state ) => ( {
    windowDimensions: stylerSelectorGetDimensions( state ),
} );

export default connectRedux( mapStateToProps, mapDispatchToProps )( BlogListItem );