import React from 'react';
import { SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

import Navigator from './components/navigator/navigator.component';


const App = () => {
  return (
    <Provider store={ store }>
      <PersistGate persistor={ persistor }>

        <SafeAreaView style={ { flex: 1 } }>
          <Navigator />
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
};


export default App;
