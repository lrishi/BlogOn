import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import userReducer from './user/user.reducer';
import blogReducer from './blog/blog.reducer';
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

// AsyncStorage.clear();

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: [],
    stateReconciler: autoMergeLevel2
};

const rootReducer = combineReducers(
    {
        user: userReducer,
        blog: blogReducer
    } );

export default persistReducer( persistConfig, rootReducer );