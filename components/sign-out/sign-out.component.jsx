import React from 'react';
import { ScrollView, Text } from 'react-native';
import { auth } from '../../firebase/firebase.utils';

import './sign-out.styles';

const INITIAL_STATE = {
    email: '',
    password: '',
};

class SignOut extends React.Component {
    constructor( props ) {
        super( props );
        this.state = INITIAL_STATE;
    }


    render () {
        return (
            <ScrollView>
                <Text > Sign out page!</Text>
            </ScrollView>
        );
    }
};

export default SignOut;