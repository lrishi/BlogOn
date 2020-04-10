import React from 'react';
import { Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator, DrawerActions } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import SignUpScreen from '../../components/sign-up/sign-up.screen';
import BlogListScreen from '../../components/blog-list/blog-list.screen';
import UserBlogListScreen from '../../components/blog-list/user-blog-list.screen';

import SignInScreen from '../../components/sign-in/sign-in.screen';
import SignOutScreen from '../../components/sign-out/sign-out.screen';
import BlogEditorScreen from '../../components/blog-editor/blog-editor.screen';

import { selectCurrentUser, selectCurrentTitle } from "../../redux/user/user.selectors";
import { setCurrentTitle } from "../../redux/user/user.actions";

import { connect as connectRedux } from 'react-redux';
import { setGlobalNavigationContext, setGlobalStackNavigationContext, getGlobalStackNavigationContext } from './navigator.exports';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faClock, faEdit, faTimesCircle } from '@fortawesome/free-regular-svg-icons';


const Navigator = ( { currentUser, currentTitle, updateCurrentTitle } ) => {
    let currTitle = "BlogOn!";
    var DrawerNavigator = null;
    var commonNavs = {
        BlogEditor: {
            screen: BlogEditorScreen,
        },
        BlogList: {
            screen: BlogListScreen,
        },
        MyBlogs: {
            screen: UserBlogListScreen,
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
                initialRouteName: 'BlogEditor',
                defaultNavigationOptions: ( { navigation } ) => {
                    setGlobalNavigationContext( navigation );
                    if ( navigation.isFocused() ) {
                        let a = navigation.getParam( "title", "BlogOn" );
                        if ( a != currTitle ) {
                            currTitle = a;
                            getGlobalStackNavigationContext().closeDrawer();
                        }
                    }
                },
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
                    setGlobalNavigationContext( navigation );
                    if ( navigation.isFocused() ) {
                        let a = navigation.getParam( "title", "BlogOn" );
                        if ( a != currTitle ) {
                            currTitle = a;
                            getGlobalStackNavigationContext().closeDrawer();
                        }
                    }
                },
            }
        );
    }
    const StackNavigator = createAppContainer(
        createStackNavigator(
            {
                Main: DrawerNavigator
            },
            {
                initialRouteName: 'Main',
                defaultNavigationOptions: ( { navigation } ) => {
                    setGlobalStackNavigationContext( navigation );
                    return {
                        headerMode: 'screen',
                        headerStyle: {
                            backgroundColor: "indigo",

                        },
                        headerTitleStyle: {
                            color: 'white'
                        },
                        title: ( <Text style={ { fontSize: 25 } }>{ currTitle }  <FontAwesomeIcon size={ 24 } icon={ faEdit } color={ 'white' } /> </Text > ),
                    };
                },
                headerMode: 'screen',
            }
        ) );
    return ( <StackNavigator /> );
};

const mapStateToProps = ( state ) => ( {
    currentUser: selectCurrentUser( state ),
    currentTitle: selectCurrentTitle( state )
} );
const mapDispatchToProps = ( dispatch ) => ( {
    updateCurrentTitle: ( item ) => dispatch( setCurrentTitle( item ) )
} );
export default connectRedux( mapStateToProps, mapDispatchToProps )( Navigator );