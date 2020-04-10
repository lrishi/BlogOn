import React from 'react';
import SignOut from './sign-out.component';


class SignOutScreen extends React.Component {

    static navigationOptions = {
        drawerLabel: 'Sign Out',
    };

    constructor( props ) {
        super( props );
        this.props.navigation.setParams( { title: "We'll miss you!" } );
    }

    render () {
        return ( <SignOut /> );

    };
}

export default SignOutScreen;