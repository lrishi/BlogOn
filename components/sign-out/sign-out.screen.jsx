import React from 'react';
import SignOut from './sign-out.component';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSadTear as iconType} from '@fortawesome/free-solid-svg-icons';

import { Text } from 'react-native';


class SignOutScreen extends React.Component {

    static navigationOptions = {
        drawerLabel: 'Sign Out',
    };

    constructor( props ) {
        super( props );
        this.props.navigation.setParams( {
            title: ( <Text style={ { fontSize: 22 } }> <FontAwesomeIcon size={ 30 } icon={ iconType } color={ 'white' } />  We'll miss you! </Text > )
        } );
    }

    render () {
        return ( <SignOut /> );

    };
}

export default SignOutScreen;