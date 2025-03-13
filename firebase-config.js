// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3aID5tKRDGqCMDTdnc0QgCBk1Y0l3vlM",
  authDomain: "interactive-learning-pla-8c6ae.firebaseapp.com",
  projectId: "interactive-learning-pla-8c6ae",
  storageBucket: "interactive-learning-pla-8c6ae.appspot.com",
  messagingSenderId: "396467298850",
  appId: "1:396467298850:web:ee69b8272964fc5045607b",
  measurementId: "G-6WEZ7QGT7Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);