/* Libraries */
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { connect as connectRedux } from 'react-redux';


/* Screens */
import SignUpScreen from '../../components/sign-up/sign-up.screen';
import SignInScreen from '../../components/sign-in/sign-in.screen';
import SignOutScreen from '../../components/sign-out/sign-out.screen';
import BlogListScreen from '../../components/blog-list/blog-list.screen';
import BlogViewerScreen from '../../components/blog-viewer/blog-viewer.screen';
import BlogEditorScreen from '../../components/blog-editor/blog-editor.screen';
import UserBlogListScreen from '../../components/blog-list/user-blog-list.screen';


/* Utils */
import {
    setGlobalNavigationContext,
    setGlobalStackNavigationContext,
    getGlobalNavigationContext,
} from './navigator.exports';

import {
    userSelectorGetCurrentUser
} from "../../redux/user/user.selectors";

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faShareAlt as shareIcon,
} from '@fortawesome/free-solid-svg-icons';

import CurrentTheme from '../../themes/current.theme';
import styles from './navigator.styles';

const Navigator = ( { currentUser } ) => {
    let currTitle = "BlogOn!";
    var DrawerNavigator = null;
    var commonNavs = {

        BlogList: {
            screen: BlogListScreen,
        },
        BlogEditor: {
            screen: BlogEditorScreen,
        },
        MyBlogs: {
            screen: UserBlogListScreen,
        },
    };
    if ( currentUser === null ) {
        DrawerNavigator = createDrawerNavigator(
            {
                ...commonNavs,
                SignIn: {
                    screen: SignInScreen,
                },
                SignUp: {
                    screen: SignUpScreen,
                },

            },
            {
                initialRouteName: 'BlogList',
                defaultNavigationOptions: ( { navigation } ) => {
                    setGlobalNavigationContext( navigation );
                    if ( navigation.isFocused() ) {
                        let a = navigation.getParam( "title", "BlogOn" );
                        if ( a != currTitle ) {
                            currTitle = a;
                            getGlobalNavigationContext().closeDrawer();
                        }
                    }
                },
            }
        );

    } else {
        DrawerNavigator = createDrawerNavigator(
            {
                ...commonNavs,
                SignOut: {
                    screen: SignOutScreen,
                },
            },
            {
                initialRouteName: 'MyBlogs',
                defaultNavigationOptions: ( { navigation } ) => {
                    setGlobalNavigationContext( navigation );
                    if ( navigation.isFocused() ) {
                        let a = navigation.getParam( "title", "BlogOn" );
                        if ( a != currTitle ) {
                            currTitle = a;
                            getGlobalNavigationContext().closeDrawer();
                        }
                    }
                },
            }
        );
    }
    const StackNavigator = createAppContainer(
        createStackNavigator(
            {
                Main: DrawerNavigator,
                BlogViewer: BlogViewerScreen,
            },
            {
                initialRouteName: 'Main',
                defaultNavigationOptions: ( { navigation } ) => {
                    setGlobalStackNavigationContext( navigation );
                    const showBackButton = navigation.getParam( "showBackButton", false );
                    const showShareButton = navigation.getParam( "showShareButton", false );
                    let backButton = {};
                    let shareButton = {};
                    if ( !showBackButton ) {
                        backButton.headerLeft = () => (
                            <TouchableOpacity
                                style={ styles.headerButton }
                                onPress={ () => getGlobalNavigationContext().toggleDrawer() }
                            >
                                <Text style={ styles.headerText }>{ currTitle }</Text>
                            </TouchableOpacity>
                        );
                        backButton.title = "";
                    } else {
                        backButton = {
                            title: currTitle,
                        };
                    }
                    if ( showShareButton ) {
                        const shareHandler = navigation.getParam( 'shareHandler', null );
                        shareButton = {
                            headerRight: () => {
                                return (
                                    <TouchableOpacity
                                        style={ styles.shareButton }
                                        onPress={ shareHandler }
                                    >
                                        <FontAwesomeIcon icon={ shareIcon } size={ 21 } color={ 'white' } />
                                    </TouchableOpacity>
                                );
                            }
                        };
                    }
                    return {
                        ...backButton,
                        ...shareButton,
                        headerMode: 'screen',
                        headerStyle: {
                            backgroundColor: CurrentTheme.Colors.primary,
                        },
                        headerTitleStyle: {
                            color: CurrentTheme.ComplementColors.primary
                        },
                    };
                },
                headerMode: 'screen',
            }
        ) );
    return ( <StackNavigator /> );
};

const mapStateToProps = ( state ) => ( {
    currentUser: userSelectorGetCurrentUser( state ),
} );


export default connectRedux( mapStateToProps )( Navigator );