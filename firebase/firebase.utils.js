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

export const deleteBlogItem = async ( currentUser, blogItem ) => {
    const snapshot = firestore.collection( "blogs" ).doc( blogItem.id );
    await snapshot.get().then( async ( doc ) => {
        if ( doc.exists ) {
            let blogPost = doc.data();
            await blogPost.author.get().then( async ( res ) => {
                if ( res.exists ) {
                    if ( res.id == currentUser.id ) {
                        console.log( "Deleting blog..." );
                        await snapshot.delete();
                    }
                }
            } );
        }
    } );
};

export const getBlogData = async ( lastVisible = null ) => {
    let snapshot = null;

    if ( lastVisible === null ) {
        snapshot = await firestore
            .collection( "blogs" ).orderBy( "ts_added", "desc" )
            .limit( 5 ).get();
    } else {
        snapshot = await firestore
            .collection( "blogs" ).orderBy( "ts_added", "desc" )
            .startAfter( lastVisible.ts_added )
            .limit( 5 ).get();
    }

    const snapShotData = async () => {
        var tdata = [];
        snapshot.forEach( ( fed ) => {
            tdata.push( { ...fed.data(), id: fed.id } );
        } );
        for ( let i = 0; i < tdata.length; i++ ) {
            fe = tdata[ i ];
            let author = { displayName: "Unknown" };
            if ( fe.author ) {
                let res = await fe.author.get();
                author = res.data();
            } else {
                author = { displayName: "Anonymous Author" };
            }
            tdata[ i ] = { ...tdata[ i ], author: author };
        }
        return tdata;
    };
    return await snapShotData();
};

export const getUserBlogData = async ( currentUser, lastVisible = null ) => {
    if ( currentUser === null ) {
        alert( "You need to be logged in to perform this action." );
        return null;
    }
    const userRef = firestore.doc( `users/${ currentUser.id }` );
    if ( !userRef ) {
        alert( "There are Issues with your sign in data. Please relogin!" );
        return null;
    }
    let snapshot = null;
    if ( lastVisible === null ) {
        snapshot = await firestore
            .collection( "blogs" )
            .where( "author", '==', userRef )
            .orderBy( "ts_added", "desc" )
            .limit( 5 ).get();
    } else {
        snapshot = await firestore
            .collection( "blogs" )
            .where( "author", '==', userRef )
            .orderBy( "ts_added", "desc" )
            .startAfter( lastVisible.ts_added )
            .limit( 5 ).get();
    }
    const snapShotData = async () => {
        var tdata = [];
        snapshot.forEach( ( fed ) => {
            tdata.push( { ...fed.data(), id: fed.id } );
        } );
        for ( let i = 0; i < tdata.length; i++ ) {
            fe = tdata[ i ];
            let author = { displayName: "Unknown" };
            if ( fe.author ) {
                let res = await fe.author.get();
                author = res.data();
            } else {
                author = { displayName: "Anonymous Author" };
            }
            tdata[ i ] = { ...tdata[ i ], author: author };
        };
        return tdata;
    };
    return await snapShotData();
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