/* eslint-disable import/no-anonymous-default-export */
import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';

// import { seedDatabase } from '../seed';

const config = {
  apiKey: "AIzaSyA38Eo89d4ugmPR7e2jK7JoCXQOBkSB9Dw",
  authDomain: "reconecta-dev.firebaseapp.com",
  projectId: "reconecta-dev",
  storageBucket: "reconecta-dev.appspot.com",
  messagingSenderId: "130299303083",
  appId: "1:130299303083:web:7498f52fe1d50c580d93ee"
};
const firebase = Firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

export default firebase ;
