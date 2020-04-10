import React from 'react';
import SignIn from './sign-in.component';


class SignInScreen extends React.Component {

    static navigationOptions = {
        drawerLabel: 'Sign In',
    };

    constructor( props ) {
        super( props );
        this.props.navigation.setParams( { title: 'User Login' } );
    }

    render () {
        return ( <SignIn /> );
    };
}

export default SignInScreen;