import React from 'react';
import { ScrollView, TextInput, Button } from 'react-native';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

import './sign-up.styles';

const INITIAL_STATE = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

class SignUp extends React.Component {
    constructor() {
        super();
        this.state = INITIAL_STATE;
    }

    signUpHandler = async event => {
        event.preventDefault();
        const { displayName, email, password, confirmPassword } = this.state;
        if ( password !== confirmPassword ) {
            alert( "Passwords don't match!" );
            return;
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword( email, password );
            await createUserProfileDocument( user, { displayName } );
            this.setState( INITIAL_STATE );
        } catch ( error ) {
            console.error( error );
        }
    };

    handleChange = ( name, value ) => {
        this.setState( { [ name ]: value } );
    };

    render () {
        const { displayName, email, password, confirmPassword } = this.state;
        return (
            <ScrollView>
                <TextInput
                    contextMenuHidden={ true }
                    placeholder="Your name"
                    value={ displayName }
                    onChangeText={ ( value ) => this.handleChange( "displayName", value ) }
                />
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
                    placeholder="Choose a password"
                    secureTextEntry={ true }
                    textContentType="password"
                    value={ password }
                    onChangeText={ ( value ) => this.handleChange( "password", value ) }
                />
                <TextInput
                    contextMenuHidden={ true }
                    placeholder="Repeat password"
                    secureTextEntry={ true }
                    value={ confirmPassword }
                    onChangeText={ ( value ) => this.handleChange( "confirmPassword", value ) }
                />
                <Button title="Sign Up" onPress={ this.signUpHandler } />
            </ScrollView>
        );
    }
};

export default SignUp;