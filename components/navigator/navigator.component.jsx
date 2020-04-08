import React from 'react';
import { Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator, DrawerActions } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import SignUpScreen from '../../components/sign-up/sign-up.screen';
import BlogListScreen from '../blog-list/blog-list.screen';


const DrawerNavigator = createDrawerNavigator(
    {
        SignUp: {
            screen: SignUpScreen,
        },
        BlogList: {
            screen: BlogListScreen,
        }
    },
    {
        initialRouteName: 'BlogList',
    }
);
const StackNavigator = createStackNavigator(
    {
        Main: { screen: DrawerNavigator }
    },
    {
        defaultNavigationOptions: ( { navigation } ) => ( {
            title: "BlogOn!",
        } ),

    }
);

export default createAppContainer( StackNavigator );