// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import {getAuth} from '@firebase/auth';
import {getStorage} from 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN_API_KEY,
  projectId: process.env.REACT_APP_PROJECTID_API_KEY,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET_API_KEY,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID_API_KEY,
  appId: process.env.REACT_APP_APPID_API_KEY,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

const auth = getAuth(app);
export {auth};
export const firestore = getFirestore(app);