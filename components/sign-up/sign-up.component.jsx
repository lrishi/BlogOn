import React from 'react';
import { ScrollView, TextInput, Button } from 'react-native';

import './sign-up.styles';


class SignUp extends React.Component {
    constructor() {
        super();
        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        };
    }

    render () {
        const { displayName, email, password, confirmPassword } = this.state;
        return (
            <ScrollView>
                <TextInput
                    contextMenuHidden={ true }
                    placeholder="Your name"
                />
                <TextInput
                    contextMenuHidden={ true }
                    keyboardType="email-address"
                    placeholder="Your email"
                    textContentType="emailAddress"

                />
                <TextInput
                    contextMenuHidden={ true }
                    placeholder="Choose a password"
                    secureTextEntry={ true }
                    textContentType="password"
                />
                <TextInput
                    contextMenuHidden={ true }
                    placeholder="Repeat password"
                    secureTextEntry={ true }
                />
                <Button title="Sign Up" />
            </ScrollView>
        );
    }
};

export default SignUp;