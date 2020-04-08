import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

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

export const getBlogData = async () => {
    console.log( "Log start ===>" );
    const snapshot = await firestore.collection( "blogs" ).get();
    const snapShotData = () => {
        var tdata = [];
        snapshot.forEach( ( fe ) => tdata.push( fe.data() ) );
        console.log( tdata );
        return tdata;
    };
    return snapShotData();
};




export default firebase;