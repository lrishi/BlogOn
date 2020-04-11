import React from 'react';
import { Text } from 'react-native';
import SignUp from './sign-up.component';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';



class SignUpScreen extends React.Component {

    static navigationOptions = {
        drawerLabel: 'Sign Up',
    };

    constructor( props ) {
        super( props );
        this.props.navigation.setParams( {
            title: ( <Text style={ { fontSize: 22 } }> <FontAwesomeIcon size={ 18 } icon={ faUserAlt } color={ 'white' } />  USER REGISTRATION</Text > )
        } );
    }

    render () {
        return ( <SignUp /> );

    };
}

export default SignUpScreen;