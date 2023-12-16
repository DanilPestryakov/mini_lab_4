// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
    apiKey: "AIzaSyAtN7Npou4v0FtLnUvLUrvMPMPt-VviJ64",
    authDomain: "api-lab-4.firebaseapp.com",
    projectId: "api-lab-4",
    storageBucket: "api-lab-4.appspot.com",
    messagingSenderId: "409399534052",
    appId: "1:409399534052:web:74d013de38781bf2c1a7f1",
    measurementId: "G-6XTD2M6FBW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// export default firebaseConfig;