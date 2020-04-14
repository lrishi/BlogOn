import React from 'react';

import {
    Linking
} from 'expo';

import {
    SafeAreaView,
    Dimensions
} from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';

import {
    PersistGate
} from 'redux-persist/integration/react';

import {
    connect as connectRedux,
    Provider
} from 'react-redux';

import {
    auth,
    createUserProfileDocument,
    firestore
} from './firebase/firebase.utils';

import Navigator from './components/navigator/navigator.component';

import {
    userActionSetCurrentUser
} from './redux/user/user.actions';

import {
    userSelectorGetCurrentUser
} from "./redux/user/user.selectors";

import {
    selectIsLoading
} from "./redux/blog/blog.selectors";

import {
    blogActionSetIsLoading,
    blogActionViewBlog
} from './redux/blog/blog.actions';

import {
    stylerActionSetDimensions,
} from './redux/styler/styler.actions';

import {
    getGlobalStackNavigationContext
} from './components/navigator/navigator.exports';

import {
    persistor,
    store
} from './redux/store';

class App extends React.Component {
    unsubscribeFromAuth = null;

    handleDeepLink = async ( args ) => {
        const { url } = args;
        if ( this.deepLinkHandlingInProgress === true ) {
            return;
        }

        let { path, queryParams } = Linking.parse( url );

        if ( path === null || path === undefined ) {
            return false;
        }

        if ( ( queryParams === null ) ||
            ( queryParams === undefined ) ||
            !( queryParams.hasOwnProperty( 'id' ) ) ) {
            return false;
        }

        const {
            notifyIsLoading,
            viewBlogItem
        } = this.props;

        notifyIsLoading( true );

        try {
            const snapshot = firestore.collection( "blogs" )
                .doc( queryParams.id );

            await snapshot.get()
                .then( async ( doc ) => {
                    if ( doc.exists ) {
                        const dres = doc.data();
                        let author = { displayName: "Unknown" };
                        if ( dres.author ) {
                            let res = await dres.author.get();
                            author = res.data();
                        } else {
                            author = { displayName: "Anonymous Author" };
                        }
                        const blog = { ...dres, author: author };
                        viewBlogItem( blog );
                        getGlobalStackNavigationContext().navigate( 'BlogViewer' );
                        setTimeout( () => notifyIsLoading( false ), 1000 );
                    } else {
                        notifyIsLoading( false );
                        alert( "The post you are trying to access is invalid or might have been deleted!" );
                    }
                    this.deepLinkHandlingInProgress = false;
                } );

        } catch ( error ) {
            notifyIsLoading( false );
            alert( error.message );
            this.deepLinkHandlingInProgress = false;
        }
    };

    constructor( props ) {
        super( props );
        this.deepLinkHandlingInProgress = false;
    }

    handleDimensionChange = () => {
        const { setDimensions } = this.props;
        setDimensions( {
            width: Dimensions.get( "window" ).width,
            height: Dimensions.get( "window" ).height,
        } );
        console.log( "Dimensions Changed" );
    };

    componentDidMount () {
        const {
            setCurrentUser,
            notifyIsLoading
        } = this.props;

        Linking.getInitialURL()
            .then( url => {
                this.handleDeepLink( { url: url } );
                Linking.addEventListener( 'url',
                    ( event ) => this.handleDeepLink( event ) );
            } );

        Dimensions.addEventListener( "change", this.handleDimensionChange );

        notifyIsLoading( true );
        this.applicationIsLoading = true;

        this.unsubscribeFromAuth = auth.onAuthStateChanged(
            async ( userAuth ) => {
                if ( userAuth ) {
                    try {
                        const userRef = await createUserProfileDocument( userAuth );
                        userRef.onSnapshot( snapShot => {
                            setCurrentUser( {
                                id: snapShot.id,
                                ...snapShot.data()
                            }
                            );
                        } );
                    } catch ( error ) {
                        setCurrentUser( null );
                        alert( error.message );
                    }
                    setTimeout( () => notifyIsLoading( false ), 2000 );
                } else {
                    setCurrentUser( null );
                }

                if ( this.applicationIsLoading ) {
                    setTimeout( () => notifyIsLoading( false ), 2000 );
                    this.applicationIsLoading = false;
                }
            }

        );
    }

    componentWillUnmount () {
        Linking.removeEventListener( 'url', this.handleDeepLink );
        this.unsubscribeFromAuth();
        this.deepLinkHandlingInProgress = false;
        Dimensions.removeEventListener( "change", this.handleDimensionChange );
    }

    render () {
        const { isLoading } = this.props;
        return (
            <SafeAreaView style={ { flex: 1 } }>
                <Spinner
                    visible={ isLoading > 0 ? true : false }
                    textContent={ 'Hold on! Loading...' }
                    textStyle={ { color: '#F9F9F9', fontWeight: 'normal', marginTop: -30 } }
                />
                <Navigator />
            </SafeAreaView>
        );
    }
};

const mapStateToProps = ( state ) => ( {
    currentUser: userSelectorGetCurrentUser( state ),
    isLoading: selectIsLoading( state )
} );

const mapDispatchToProps = dispatch => ( {
    setCurrentUser: ( item ) => dispatch( userActionSetCurrentUser( item ) ),
    viewBlogItem: ( item ) => dispatch( blogActionViewBlog( item ) ),
    notifyIsLoading: ( item ) => dispatch( blogActionSetIsLoading( item ) ),
    setDimensions: ( item ) => dispatch( stylerActionSetDimensions( item ) )
} );

const ReduxApp = connectRedux( mapStateToProps, mapDispatchToProps )( App );

const ReturnableApp = () => (
    <Provider store={ store } >
        <PersistGate persistor={ persistor }>
            <ReduxApp />
        </PersistGate>
    </Provider>
);

export default ReturnableApp;
