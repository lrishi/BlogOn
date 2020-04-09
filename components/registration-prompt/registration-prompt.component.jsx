import React from 'react';
import { ScrollView, Text, Button } from 'react-native';
import { DrawerNavigation } from '../../components/navigator/navigator.component';

const RegistrationPrompt = () => (

    <ScrollView>
        <Text>You must be signed in to do that!</Text>
        <Button title="Sign In" onPress={ () => DrawerNavigation.navigate( 'SignIn' ) } />
        <Button title="Sign Up" onPress={ () => DrawerNavigation.navigate( 'SignUp' ) } />
    </ScrollView>
);

export default RegistrationPrompt;