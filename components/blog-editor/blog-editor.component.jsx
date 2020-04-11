import React from 'react';
import { BackHandler, Alert, ScrollView, Image, Button, TextInput, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { connect as connectRedux } from 'react-redux';
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { selectBlogEditable } from '../../redux/blog/blog.selectors';
import firebase, { firestore } from "../../firebase/firebase.utils";
import { editBlog } from '../../redux/blog/blog.actions';
import { BlogTemplate } from '../../redux/blog/blog.types';
import { setIsLoading } from '../../redux/blog/blog.actions';
import { getGlobalNavigationContext, getGlobalStackNavigationContext } from '../../components/navigator/navigator.exports';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faCamera as cameraIcon,
    faImages as galleryIcon,
    faUpload as publishIcon,
} from '@fortawesome/free-solid-svg-icons';


import styles from './blog-editor.styles';

import {
    DecoratedTextInput,
    DecoratedButtonSecondary,
} from '../../components/decorated-natives/decorated-natives.components';


class BlogEditor extends React.Component {
    constructor( props ) {
        super( props );
    }

    saveBlog = async () => {
        const { notifyIsLoading, editItem } = this.props;
        notifyIsLoading( true );

        let blog = {
            ...this.props.editableBlog,
            author: firestore.doc( `users/${ this.props.currentUser.id }` )
        };

        if ( !BlogTemplate().validate( blog ) ) {
            alert( "Blog fields cannot be empty" );
            notifyIsLoading( false );
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
            editItem( {} );
            getGlobalStackNavigationContext().pop();
            getGlobalNavigationContext().navigate( "MyBlogs", { needsRefresh: true } );
            setTimeout( () => notifyIsLoading( false ), 2000 );
        } catch ( error ) {
            alert( error.message );
            setTimeout( () => notifyIsLoading( false ), 1000 );
        }
    };

    takePicture = async () => {
        const image = await ImagePicker.launchCameraAsync( {
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [ 4, 3 ],
            quality: 0.5,
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
            aspect: [ 4, 3 ],
            quality: 0.5,
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

    backButtonPressEventListener = () => {

        const { editItem, editableBlog } = this.props;
        if ( editableBlog !== undefined &&
            editableBlog !== null ) {
            if ( !editableBlog.hasOwnProperty( 'image' ) ) {
                return false;
            }
        } else {
            return false;
        }
        Alert.alert(
            'All unsaved changes will be lost',
            'Discard changes and exit?',
            [
                {
                    text: 'NO',
                    onPress: () => { }
                },
                {
                    text: 'YES',
                    onPress: async () => {
                        editItem( {} );
                        getGlobalNavigationContext().goBack( null );
                    }
                },
            ]
        );
        return true;
    };

    componentDidMount () {
        BackHandler.addEventListener( 'hardwareBackPress', this.backButtonPressEventListener );
    }

    componentWillUnmount () {
        BackHandler.removeEventListener( 'hardwareBackPress', this.backButtonPressEventListener );
    }

    render () {
        let blog = this.props.editableBlog;
        if ( blog === null ) {
            blog = BlogTemplate().template;
        }
        return (
            <ScrollView contentContainerStyle={ styles.container }>
                <DecoratedTextInput
                    style={ styles.input }
                    value={ blog.title }
                    placeholder="Title"
                    returnKeyType={ "next" }
                    onChangeText={ ( text ) => this.handleTextAddition( 'title', text ) } />
                {
                    ( blog.image === null || blog.image === undefined ) ?
                        ( <Text style={ styles.noImageMessage }>No image selected</Text> ) :
                        ( <Image
                            style={ styles.coverImage }
                            source={ { uri: `data:image/gif;base64,${ blog.image }` } }
                        /> )
                }
                <View style={ styles.imageButtonHolder }>
                    <DecoratedButtonSecondary
                        style={ styles.imageButton }
                        title={ <FontAwesomeIcon icon={ galleryIcon } size={ 30 } color={ 'black' } /> }
                        onPress={ this.selectImage } />
                    <DecoratedButtonSecondary
                        style={ styles.imageButton }
                        title={ <FontAwesomeIcon icon={ cameraIcon } size={ 30 } color={ 'black' } /> }
                        onPress={ this.takePicture } />
                </View>
                <DecoratedTextInput
                    contextMenuHidden={ false }
                    value={ blog.editor }
                    placeholder="Enter your blog post here"
                    onChangeText={ ( text ) => this.handleTextAddition( 'editor', text ) }
                    multiline={ true }
                    returnKeyType={ "next" }
                    style={ styles.detailedEditor }

                />
                <DecoratedButtonSecondary
                    style={ styles.publishButton }
                    title={ <FontAwesomeIcon icon={ publishIcon } size={ 30 } color={ 'black' } /> }
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
    notifyIsLoading: ( item ) => dispatch( setIsLoading( item ) ),
} );
export default connectRedux( mapStateToProps, mapDispatchToProps )( BlogEditor );