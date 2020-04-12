import React from 'react';
import { SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

import Navigator from './components/navigator/navigator.component';
import { auth, createUserProfileDocument, firestore } from './firebase/firebase.utils';
import { connect as connectRedux } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from "./redux/user/user.selectors";
import { selectIsLoading } from "./redux/blog/blog.selectors";
import { Linking } from 'expo';
import Spinner from 'react-native-loading-spinner-overlay';
import { setIsLoading, viewBlog } from './redux/blog/blog.actions';
import { getGlobalStackNavigationContext } from './components/navigator/navigator.exports';

class App extends React.Component {
  unsubscribeFromAuth = null;

  handleDeepLink = async ( args ) => {
    const { url } = args;
    if ( this.deepLinkHandlingInProgress === true )
      return;
    let { path, queryParams } = Linking.parse( url );
    if ( path === null || path === undefined ) {
      return false;
    }
    if ( queryParams === null ||
      queryParams === undefined ||
      !queryParams.hasOwnProperty( 'id' ) ) {
      return;
    }
    const { notifyIsLoading, viewBlogItem } = this.props;
    notifyIsLoading( true );
    try {
      const snapshot = firestore.collection( "blogs" ).doc( queryParams.id );
      await snapshot.get().then( async ( doc ) => {
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

  componentDidMount () {
    const { setCurrentUser, notifyIsLoading } = this.props;
    Linking.getInitialURL().then( url => {
      this.handleDeepLink( { url: url } );
      Linking.addEventListener( 'url',
        ( event ) => this.handleDeepLink( event ) );
    } );
    this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
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
    } );
  }

  componentWillUnmount () {
    Linking.removeEventListener( 'url', this.handleDeepLink );
    this.unsubscribeFromAuth();
    this.deepLinkHandlingInProgress = false;
  }

  render () {
    const { isLoading } = this.props;
    return (
      <SafeAreaView style={ { flex: 1 } }>
        <Spinner
          visible={ isLoading > 0 ? true : false }
        />
        <Navigator />
      </SafeAreaView>
    );
  }
};

const mapStateToProps = ( state ) => ( {
  currentUser: selectCurrentUser( state ),
  isLoading: selectIsLoading( state )
} );

const mapDispatchToProps = dispatch => ( {
  setCurrentUser: user => dispatch( setCurrentUser( user ) ),
  viewBlogItem: ( item ) => dispatch( viewBlog( item ) ),
  notifyIsLoading: ( item ) => dispatch( setIsLoading( item ) ),
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
