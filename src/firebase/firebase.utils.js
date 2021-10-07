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

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

var provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle = () => firebase.auth()
.signInWithPopup(provider);

export default firebase;