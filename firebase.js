// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore, getFirestore } from "firebase/firestore";

const firebaseConfig = {
         apiKey: "apiKey",
         authDomain: "domain",
         projectId: "id",
         storageBucket: "sb",
         messagingSenderId: "id",
         appId: "id",
         measurementId: "id"
       };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
const db = initializeFirestore(app, {
             experimentalForceLongPolling: true,
             useFetchStreams: false,
           })

export { app, db, auth };