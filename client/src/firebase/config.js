// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "find-a-place-35994.firebaseapp.com",
  projectId: "find-a-place-35994",
  storageBucket: "find-a-place-35994.appspot.com",
  messagingSenderId: "653584340288",
  appId: "1:653584340288:web:2da5139c82fe174362d6a5",
  measurementId: "G-J7V5RNC98R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);