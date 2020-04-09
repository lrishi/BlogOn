import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/database';



const config = {
    apiKey: "AIzaSyCspE_Rl2u0qEhuOthKM5GRgnQnDQR42Ic",
    authDomain: "blogon-9b154.firebaseapp.com",
    databaseURL: "https://blogon-9b154.firebaseio.com",
    projectId: "blogon-9b154",
    storageBucket: "blogon-9b154.appspot.com",
    messagingSenderId: "107454535403",
    appId: "1:107454535403:web:d0f714a275c26defdb10ae"
};

firebase.initializeApp( config );


export const auth = firebase.auth();
export const firestore = firebase.firestore();

firebase.auth().setPersistence( firebase.auth.Auth.Persistence.LOCAL );

export const getBlogData = async () => {
    const snapshot = await firestore
        .collection( "blogs" ).orderBy( "ts_updated", "desc" )
        .limit( 10 ).get();
    const snapShotData = () => {
        var tdata = [];
        snapshot.forEach( ( fe ) => tdata.push( { ...fe.data(), id: fe.id } ) );
        return tdata;
    };
    return snapShotData();
};

export const createUserProfileDocument = async ( userAuth, additionalData ) => {

    if ( userAuth == null ) {
        return;
    }

    const userRef = firestore.doc( `users/${ userAuth.uid }` );
    const snapShot = await userRef.get();

    if ( !snapShot.exists ) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set( {
                displayName,
                email,
                createdAt,
                ...additionalData
            } );

        } catch ( error ) {
            console.log( 'error creating user', error.message );
        }
    }

    return userRef;
};


export default firebase;