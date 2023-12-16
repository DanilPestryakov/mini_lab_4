// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
//import firebaseConfig from "./firebase-credentials";

const firebaseConfig = {
    apiKey: "AIzaSyA_QwhCHxdffzY3BJVvWh47UnV_BmDGAug",
    authDomain: "minilab4-6f6b1.firebaseapp.com",
    projectId: "minilab4-6f6b1",
    storageBucket: "minilab4-6f6b1.appspot.com",
    messagingSenderId: "61920241742",
    appId: "1:61920241742:web:2b1d398a522f828d87bb1f"
};

// Initialize Firebasew
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { app, db, auth };
