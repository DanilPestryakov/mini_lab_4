// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCPI73jgSQNCU7QvH9IDLpJSkhq7flnPwc",
    authDomain: "apiminilab4-e11ee.firebaseapp.com",
    projectId: "apiminilab4-e11ee",
    storageBucket: "apiminilab4-e11ee.appspot.com",
    messagingSenderId: "220757236181",
    appId: "1:220757236181:web:bdacf96b8b91f56d44055c",
    measurementId: "G-7BJ2PDDR7M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);