import React from 'react';
import { ScrollView, Image, Button, TextInput, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { connect as connectRedux } from 'react-redux';
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { selectBlogEditable } from '../../redux/blog/blog.selectors';
import firebase, { firestore } from "../../firebase/firebase.utils";
import { editBlog } from '../../redux/blog/blog.actions';
import { BlogTemplate } from '../../templates/blog.template';

class BlogEditor extends React.Component {
    constructor( props ) {
        super( props );
    }

    saveBlog = async () => {
        let blog = {
            ...this.props.editableBlog,
            author: firestore.doc( `users/${ this.props.currentUser.id }` )
        };

        if ( !BlogTemplate().validate( blog ) ) {
            alert( "Blog fields cannot be empty" );
            return;
        }
        if ( blog.ts_added == null ) {
            blog.ts_added = firebase.firestore.Timestamp.now();
        }
        blog.ts_updated = firebase.firestore.Timestamp.now();
        try {
            if ( blog.id == null ) {
                await firestore.collection( "blogs" ).add( blog );
            } else {
                await firestore.collection( "blogs" ).doc( blog.id )
                    .set( blog, { merge: true } );
            }
            /* TODO: Redirect to view */
        } catch ( error ) {
            alert( error.message );
        }
    };

    takePicture = async () => {
        const image = await ImagePicker.launchCameraAsync( {
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [ 16, 9 ],
            base64: true,
        } );
        if ( !image.cancelled ) {
            this.props.editItem( { ...this.props.editableBlog, 'image': image.base64 } );
        }
    };

    selectImage = async () => {
        const image = await ImagePicker.launchImageLibraryAsync( {
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [ 16, 9 ],
            quality: 1,
            base64: true
        } );
        if ( !image.cancelled ) {
            this.props.editItem( { ...this.props.editableBlog, 'image': image.base64 } );
        }
    };

    handleTextAddition = ( key, value ) => {
        this.props.editItem( {
            ...this.props.editableBlog,
            [ key ]: value
        } );
    };

    render () {
        let blog = this.props.editableBlog;
        if ( blog === null ) {
            blog = BlogTemplate().template;
        }
        return (
            <ScrollView>
                <TextInput value={ blog.title }
                    placeholder="Title"
                    returnKeyType={ "next" }
                    onChangeText={ ( text ) => this.handleTextAddition( 'title', text ) } />
                {
                    ( blog.image === null ) ?
                        ( <Text>No image selected</Text> ) :
                        ( <Image
                            style={ { width: '100%', height: 300, resizeMode: 'stretch' } }
                            source={ { uri: `data:image/gif;base64,${ blog.image }` } }
                        /> )
                }
                <Button
                    title="Take Image"
                    onPress={ this.takePicture } />
                <Button
                    title="Select Image"
                    onPress={ this.selectImage } />
                <TextInput
                    value={ blog.editor }
                    placeholder="Enter your blog post here"
                    onChangeText={ ( text ) => this.handleTextAddition( 'editor', text ) }
                    multiline={ true }
                    returnKeyType={ "next" }
                    style={ { height: 200 } }

                />
                <Button
                    title="Save"
                    onPress={ this.saveBlog } />
            </ScrollView >
        );
    }
};

const mapStateToProps = ( state ) => ( {
    currentUser: selectCurrentUser( state ),
    editableBlog: selectBlogEditable( state )
} );

const mapDispatchToProps = dispatch => ( {
    editItem: ( item ) => dispatch( editBlog( item ) ),
} );
export default connectRedux( mapStateToProps, mapDispatchToProps )( BlogEditor );