import React from 'react';
import SignIn from './sign-in.component';


class SignInScreen extends React.Component {

    static navigationOptions = {
        drawerLabel: 'Sign In',
    };

    render () {
        return ( <SignIn /> );
    };
}

export default SignInScreen;