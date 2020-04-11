import React from 'react';
import { Text } from 'react-native';

import SignIn from './sign-in.component';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import { faLock } from '@fortawesome/free-solid-svg-icons';


class SignInScreen extends React.Component {

    static navigationOptions = {
        drawerLabel: "Sign In",
    };

    constructor( props ) {
        super( props );
        this.props.navigation.setParams( {
            title: ( <Text style={ { fontSize: 22 } }> <FontAwesomeIcon size={ 18 } icon={ faLock } color={ 'white' } />  USER LOGIN</Text > )
        } );
    }

    render () {
        return ( <SignIn /> );
    };
}

export default SignInScreen;