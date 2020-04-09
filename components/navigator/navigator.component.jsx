import React from 'react';
import { Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator, DrawerActions } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import SignUpScreen from '../../components/sign-up/sign-up.screen';
import BlogListScreen from '../../components/blog-list/blog-list.screen';
import SignInScreen from '../../components/sign-in/sign-in.screen';
import SignOutScreen from '../../components/sign-out/sign-out.screen';

import { selectCurrentUser } from "../../redux/user/user.selectors";
import { connect as connectRedux } from 'react-redux';

export const DrawerNavigator1 = createDrawerNavigator(
    {
        SignIn: {
            screen: SignInScreen,
        },
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

export const StackNavigator1 = createAppContainer(
    createStackNavigator(
        {
            Main: { screen: DrawerNavigator1 }
        },
        {
            defaultNavigationOptions: ( { navigation } ) => ( {
                title: "BlogOn!",
            } ),

        }
    ) );

const Navigator = ( { currentUser } ) => {
    var DrawerNavigator = null;
    if ( currentUser === null ) {
        DrawerNavigator = createDrawerNavigator(
            {
                SignIn: {
                    screen: SignInScreen,
                },
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

    } else {
        DrawerNavigator = createDrawerNavigator(
            {
                SignOut: {
                    screen: SignOutScreen,
                },
                BlogList: {
                    screen: BlogListScreen,
                }
            },
            {
                initialRouteName: 'BlogList',
            }
        );
    }
    const StackNavigator = createAppContainer(
        createStackNavigator(
            {
                Main: { screen: DrawerNavigator }
            },
            {
                defaultNavigationOptions: ( { navigation } ) => ( {
                    title: "BlogOn!",
                } ),

            }
        ) );
    return ( <StackNavigator /> );
};

const mapStateToProps = ( state ) => ( {
    currentUser: selectCurrentUser( state )
} );

export default connectRedux( mapStateToProps )( Navigator );