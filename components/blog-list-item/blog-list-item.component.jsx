import React from 'react';
import { View, Text, Image, Button, Alert } from 'react-native';
import { deleteBlogItem } from '../../firebase/firebase.utils';
import { getGlobalNavigationContext } from '../navigator/navigator.exports';
import { connect as connectRedux } from 'react-redux';
import { editBlog } from '../../redux/blog/blog.actions';

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
            <View>
                <Text>{ blog.title }</Text>
                <Text>By { blog.author !== null ? blog.author.displayName : "Unknown" }</Text>

                <Image
                    style={ { width: '100%', height: 300, resizeMode: 'stretch' } }
                    source={ { uri: `data:image/gif;base64,${ blog.image }` } }
                />
                <Text>Added on { blog.ts_added.toDate().toString() }, Modified on { blog.ts_updated.toDate().toString() }</Text>
                <Text>{ blog.editor }</Text>
                {
                    hasUser ?
                        (
                            <View>
                                <Button title="Edit" onPress={ this.editItem } />
                                <Button title="Delete" onPress={ this.deleteItem } />
                            </View>
                        )
                        :
                        ( <View></View> )
                }

            </View>

        );
    };
}
const mapDispatchToProps = dispatch => ( {
    editBlogItem: ( item ) => dispatch( editBlog( item ) ),
} );

export default connectRedux( null, mapDispatchToProps )( BlogListItem );