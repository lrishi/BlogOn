import React from 'react';
import SignUp from './sign-up.component';


class SignUpScreen extends React.Component {

    static navigationOptions = {
        drawerLabel: 'Sign Up',
    };

    render () {
        return ( <SignUp /> );

    };
}

export default SignUpScreen;