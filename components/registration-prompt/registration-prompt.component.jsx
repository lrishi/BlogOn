import React from 'react';
import { ScrollView, Text, Button } from 'react-native';
import { getGlobalNavigationContext } from '../../components/navigator/navigator.exports';

const RegistrationPrompt = () => (

    <ScrollView>
        <Text>You must be signed in to do that!</Text>
        <Button title="Sign In" onPress={ () => getGlobalNavigationContext().navigate( 'SignIn' ) } />
        <Button title="Sign Up" onPress={ () => getGlobalNavigationContext().navigate( 'SignUp' ) } />
    </ScrollView>
);

export default RegistrationPrompt;