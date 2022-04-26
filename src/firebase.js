import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBshixPOVWzCH_DUkEbWShR8-9tFgRPr-4",
    authDomain: "moonlit-aria-347619.firebaseapp.com",
    projectId: "moonlit-aria-347619",
    storageBucket: "moonlit-aria-347619.appspot.com",
    messagingSenderId: "730532345557",
    appId: "1:730532345557:web:b227851940fc635d78545c",
    measurementId: "G-ZW056RS42G"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider };
  export default db;