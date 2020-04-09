import React from 'react';
import { ScrollView, Image, Button, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';


class BlogEditor extends React.Component {
    constructor() {
        super();
        this.state = {
            'editor': 'This is value text!',
            'image': null
        };
    }

    selectImage = async () => {
        const image = await ImagePicker.launchCameraAsync( {

            allowsEditing: true,
            aspect: [ 16, 9 ],
            base64: true,
        } );
        if ( !image.cancelled )
            this.setState( { ...this.state, 'image': image.base64 } );
    };

    takePicture = async () => {

    };

    handleTextAddition = ( props ) => {
        console.log( "FORO", props );
        this.setState( { 'editor': props } );
    };

    render () {
        return (
            <ScrollView>
                <TextInput />
                <Image
                    style={ { width: '100%', height: 300, resizeMode: 'stretch' } }
                    source={ { uri: `data:image/gif;base64,${ this.state.image }` } }
                />
                <Button
                    title="Take Image"
                    onPress={ this.selectImage } />
                <TextInput
                    value={ this.state.editor }
                    placeholder="Enter your blog"
                    onChangeText={ this.handleTextAddition }
                    multiline={ true }

                />
            </ScrollView >
        );
    }
};

export default BlogEditor;