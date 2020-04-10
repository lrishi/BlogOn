import React from 'react';
import { TouchableOpacity, View, Text, Image, Button, Alert } from 'react-native';
import { connect as connectRedux } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faClock, faEdit, faTimesCircle } from '@fortawesome/free-regular-svg-icons';

import { editBlog } from '../../redux/blog/blog.actions';
import { deleteBlogItem } from '../../firebase/firebase.utils';
import { getGlobalNavigationContext } from '../navigator/navigator.exports';
import styles from './blog-list-item.styles';

class BlogListItem extends React.Component {
    constructor( props ) {
        super( props );
    }

    deleteItem = async () => {
        const { currentUser, blog } = this.props;
        Alert.alert(
            'Warning! Irreversible action!',
            'Are you sure you want to delete this post?',
            [
                { text: 'NO', onPress: () => { } },
                { text: 'YES', onPress: async () => await deleteBlogItem( currentUser, blog ) },
            ]
        );
    };

    editItem = () => {
        const { blog, editBlogItem } = this.props;
        editBlogItem( blog );
        getGlobalNavigationContext().navigate( 'BlogEditor' );
    };

    render () {
        const { blog, hasUser = false } = this.props;
        return (
            <TouchableOpacity style={ styles.blogListItemContainer }>

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
                                    <TouchableOpacity style={ styles.blogActionButton }
                                        onPress={ this.editItem } >
                                        <FontAwesomeIcon icon={ faEdit } />
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
                            ( <View></View> )
                    }
                </View>
            </TouchableOpacity>

        );
    };
}
const mapDispatchToProps = dispatch => ( {
    editBlogItem: ( item ) => dispatch( editBlog( item ) ),
} );

export default connectRedux( null, mapDispatchToProps )( BlogListItem );