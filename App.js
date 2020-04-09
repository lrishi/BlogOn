import React from 'react';
import { SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

import Navigator from './components/navigator/navigator.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { connect as connectRedux } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from "./redux/user/user.selectors";

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount () {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
      if ( userAuth ) {
        const userRef = await createUserProfileDocument( userAuth );
        userRef.onSnapshot( snapShot => {
          setCurrentUser( {
            id: snapShot.id,
            ...snapShot.data()
          }
          );
          console.log( userAuth, snapShot.data() );
        } );
      } else {
        setCurrentUser( null );
      }
    } );
  }

  componentWillUnmount () {
    this.unsubscribeFromAuth();
  }
  render () {
    return (
      <SafeAreaView style={ { flex: 1 } }>
        <Navigator />
      </SafeAreaView>
    );
  }
};

const mapStateToProps = ( state ) => ( {
  currentUser: selectCurrentUser( state )
} );

const mapDispatchToProps = dispatch => ( {
  setCurrentUser: user => dispatch( setCurrentUser( user ) )
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
