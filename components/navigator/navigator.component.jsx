import React from 'react';
import { Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator, DrawerActions } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import SignUpScreen from '../../components/sign-up/sign-up.screen';
import BlogListScreen from '../../components/blog-list/blog-list.screen';
import SignInScreen from '../../components/sign-in/sign-in.screen';
import SignOutScreen from '../../components/sign-out/sign-out.screen';
import BlogEditorScreen from '../../components/blog-editor/blog-editor.screen';

import { selectCurrentUser } from "../../redux/user/user.selectors";
import { connect as connectRedux } from 'react-redux';

export var DrawerNavigation = null;

const Navigator = ( { currentUser } ) => {
    var DrawerNavigator = null;
    var commonNavs = {
        BlogEditor: {
            screen: BlogEditorScreen,
        },
        BlogList: {
            screen: BlogListScreen,
        },
        MyBlogs: {
            screen: BlogListScreen,
        }
    };
    if ( currentUser === null ) {
        DrawerNavigator = createDrawerNavigator(
            {
                SignIn: {
                    screen: SignInScreen,
                },
                SignUp: {
                    screen: SignUpScreen,
                },
                ...commonNavs

            },
            {
                initialRouteName: 'BlogList',
                defaultNavigationOptions: ( { navigation } ) => {
                    DrawerNavigation = navigation;
                    return {};
                }
            }
        );

    } else {
        DrawerNavigator = createDrawerNavigator(
            {
                SignOut: {
                    screen: SignOutScreen,
                },
                ...commonNavs
            },
            {
                initialRouteName: 'BlogEditor',
                defaultNavigationOptions: ( { navigation } ) => {
                    DrawerNavigation = navigation;
                    return {};
                }
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