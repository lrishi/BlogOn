import React from 'react';
import SignOut from './sign-out.component';


class SignOutScreen extends React.Component {

    static navigationOptions = {
        drawerLabel: 'Sign Out',
    };

    render () {
        return ( <SignOut /> );

    };
}

export default SignOutScreen;