import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyCmn4tq5r1OrzZMLzcJz4zAMb_WILN4pzk',
  authDomain: 'userpanel-97693.firebaseapp.com',
  databaseURL: 'https://userpanel-97693.firebaseio.com',
  projectId: 'userpanel-97693',
  storageBucket: 'userpanel-97693.appspot.com',
  messagingSenderId: '528583228586',
  appId: '1:528583228586:web:dcee88fdc4d20877'
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
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
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
