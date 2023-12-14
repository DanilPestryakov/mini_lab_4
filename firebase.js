// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCythl-BoEDlows8dWuH4C-Ulg0OTH0kAE",
    authDomain: "api-mini-lab-4-fe970.firebaseapp.com",
    projectId: "api-mini-lab-4-fe970",
    storageBucket: "api-mini-lab-4-fe970.appspot.com",
    messagingSenderId: "212169682177",
    appId: "1:212169682177:web:b41a050db714210a2a7f00"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { app, db, auth };