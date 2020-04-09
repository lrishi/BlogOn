import React from 'react';
import { ScrollView, Image, Button, TextInput, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { BlogTemplate } from '../../templates/blog.template';
import { connect as connectRedux } from 'react-redux';
import { selectCurrentUser } from "../../redux/user/user.selectors";

import firebase, { firestore } from "../../firebase/firebase.utils";

class BlogEditor extends React.Component {
    constructor( props ) {
        super( props );
        this.state = {
            blog: BlogTemplate().template,
        };
    }

    saveBlog = async () => {
        const blog = {
            ...this.state.blog,
            author: this.props.currentUser
        };

        if ( !BlogTemplate().validate( blog ) ) {
            alert( "Blog fields cannot be empty" );
            return;
        }

        blog.ts_added = firebase.firestore.Timestamp.now();
        blog.ts_updated = firebase.firestore.Timestamp.now();
        try {
            await firestore.collection( "blogs" ).add( blog );
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
            this.setState( { ...this.state, blog: { ...this.state.blog, 'image': image.base64 } } );
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
            this.setState( { ...this.state, blog: { ...this.state.blog, 'image': image.base64 } } );
        }
    };

    handleTextAddition = ( key, value ) => {
        this.setState( { ...this.state, blog: { ...this.state.blog, [ key ]: value } } );
    };

    render () {
        return (
            <ScrollView>
                <TextInput placeholder="Title" onChangeText={ ( text ) => this.handleTextAddition( 'title', text ) } />
                {
                    ( this.state.blog.image === null ) ?
                        ( <Text>No image selected</Text> ) :
                        ( <Image
                            style={ { width: '100%', height: 300, resizeMode: 'stretch' } }
                            source={ { uri: `data:image/gif;base64,${ this.state.blog.image }` } }
                        /> )
                }
                <Button
                    title="Take Image"
                    onPress={ this.takePicture } />
                <Button
                    title="Select Image"
                    onPress={ this.selectImage } />
                <TextInput
                    value={ this.state.blog.editor }
                    placeholder="Enter your blog post here"
                    onChangeText={ ( text ) => this.handleTextAddition( 'editor', text ) }
                    multiline={ true }
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
    currentUser: selectCurrentUser( state )
} );
export default connectRedux( mapStateToProps )( BlogEditor );