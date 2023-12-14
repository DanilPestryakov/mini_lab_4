// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
//import firebaseConfig from "./firebase-credentials";


const firebaseConfig = {
  apiKey: "AIzaSyCOYEQj5dBka0HqXsoqNt04bbQ-TBXlIzg",
  authDomain: "api-minilab-4-e0293.firebaseapp.com",
  projectId: "api-minilab-4-e0293",
  storageBucket: "api-minilab-4-e0293.appspot.com",
  messagingSenderId: "289865934253",
  appId: "1:289865934253:web:6c5f59d7f1c48bf1002d24",
  measurementId: "G-HVGNS10PSF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { app, db, auth };