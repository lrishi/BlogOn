import React from 'react';
import { ScrollView, Text, Button } from 'react-native';
import { auth } from '../../firebase/firebase.utils';

import './sign-out.styles';


class SignOut extends React.Component {
    constructor( props ) {
        super( props );
    }

    signOutHandler = () => {
        auth.signOut();
    };

    render () {
        return (
            <ScrollView>
                <Text > We'll miss you! Are you sure you want to Sign Out?</Text>
                <Button title="Sign Me Out" onPress={ this.signOutHandler } />
            </ScrollView>
        );
    }
};

export default SignOut;