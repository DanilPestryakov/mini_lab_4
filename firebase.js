// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
//import firebaseConfig from "./firebase-credentials";


const firebaseConfig = {
    apiKey: "AIzaSyD53Eityv7C3s5nOLi9upJ7hEyTw0Y_mnA",
    authDomain: "minilab4shkuro.firebaseapp.com",
    projectId: "minilab4shkuro",
    storageBucket: "minilab4shkuro.appspot.com",
    messagingSenderId: "55409393174",
    appId: "1:55409393174:web:4af67b00336762cd4a3f37"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { app, db, auth };