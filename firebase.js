// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
//import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "./firebase-credentials";
import {initializeFirestore} from 'firebase/firestore';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
// Стандартный способ у меня не работал
//const db = getFirestore(app);

const db = initializeFirestore(app, {
    experimentalForceLongPolling: true,
});
export { app, db, auth };