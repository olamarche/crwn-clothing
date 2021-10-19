import firebase from 'firebase/compat/app';

import "firebase/compat/firestore";
import "firebase/compat/auth";


const config = {
  apiKey: "AIzaSyANCJah5Igkr678oMI56Dd5W1qgUp9RwFs",
  authDomain: "crown-clothing-1dea1.firebaseapp.com",
  projectId: "crown-clothing-1dea1",
  storageBucket: "crown-clothing-1dea1.appspot.com",
  messagingSenderId: "679726626814",
  appId: "1:679726626814:web:6ae53f2390345ae346f2af",
  measurementId: "G-SFYBVEBLV2",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firebase.firestore().collection('users').doc(userAuth.uid);
    const snapshot = await userRef.get();

    if(!snapshot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch();

    objectsToAdd.forEach(object => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, object);
    });

    return await batch.commit();
}

export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => {
        const {title, items} = doc.data();

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }
    });
    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {});
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

var provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle = () => firebase.auth()
.signInWithPopup(provider);

export default firebase;