import React from 'react';
import { ScrollView, TextInput, Button, Text } from 'react-native';
import { auth } from '../../firebase/firebase.utils';

import './sign-in.styles';

const INITIAL_STATE = {
    email: '',
    password: '',
};

class SignIn extends React.Component {
    constructor( props ) {
        super( props );
        this.state = INITIAL_STATE;
    }

    signInHandler = async event => {
        const { email, password } = this.state;
        event.preventDefault();
        try {
            await auth.signInWithEmailAndPassword( email, password );

        } catch ( error ) {
            alert( error.message );
        }
        this.setState( INITIAL_STATE );
    };

    handleChange = ( name, value ) => {
        this.setState( { [ name ]: value } );
    };

    render () {
        const { email, password } = this.state;
        return (
            <ScrollView>
                <TextInput
                    contextMenuHidden={ true }
                    keyboardType="email-address"
                    placeholder="Your email"
                    textContentType="emailAddress"
                    value={ email }
                    onChangeText={ ( value ) => this.handleChange( "email", value ) }
                />
                <TextInput
                    contextMenuHidden={ true }
                    placeholder="Your Password"
                    secureTextEntry={ true }
                    textContentType="password"
                    value={ password }
                    onChangeText={ ( value ) => this.handleChange( "password", value ) }
                />
                <Button title="Sign In" onPress={ this.signInHandler } />
            </ScrollView>
        );
    }
};

export default SignIn;