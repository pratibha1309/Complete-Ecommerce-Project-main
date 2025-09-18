// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8rSE9kG50bLsuV453fCw3pI17ah7ewQI",
  authDomain: "e-commerce-12890.firebaseapp.com",
  projectId: "e-commerce-12890",
  storageBucket: "e-commerce-12890.firebasestorage.app",
  messagingSenderId: "628684284012",
  appId: "1:628684284012:web:b0095613b046ca39f17849"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);

export {fireDB, auth}