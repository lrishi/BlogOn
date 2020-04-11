import React from 'react';
import { ScrollView, Text, Button } from 'react-native';
import { getGlobalNavigationContext } from '../../components/navigator/navigator.exports';

import {
    DecoratedIndicatorInfo,
    DecoratedButtonWarning,
    DecoratedButtonSuccess
} from '../../components/decorated-natives/decorated-natives.components';

import styles from "./registration-prompt.styles";

const RegistrationPrompt = () => (

    <ScrollView contentContainerStyle={ styles.container }>
        <DecoratedIndicatorInfo style={ styles.indicator } >REGISTRATION REQUIRED</DecoratedIndicatorInfo>
        <DecoratedButtonWarning
            title="  Existing User? Sign In  "
            onPress={ () => getGlobalNavigationContext().navigate( 'SignIn' ) }
            style={ styles.signInButton }
        />
        <DecoratedButtonSuccess
            title="New User: Register Now"
            onPress={ () => getGlobalNavigationContext().navigate( 'SignUp' ) }
            style={ styles.signUpButton }
        />
    </ScrollView>
);

export default RegistrationPrompt;