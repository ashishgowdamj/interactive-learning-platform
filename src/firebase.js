// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQcA4OdDssssS-VT5Sn_526Wx5zgIK1cg",
  authDomain: "interactive-learning-pla-fc6d1.firebaseapp.com",
  projectId: "interactive-learning-pla-fc6d1",
  storageBucket: "interactive-learning-pla-fc6d1.firebasestorage.app",
  messagingSenderId: "107637082273",
  appId: "1:107637082273:web:65ac2ebdf247433937c8e0",
  measurementId: "G-KRBQJ76W21"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and export it
export const db = getFirestore(app);

// Export the app instance as well
export { app };

// We can add and export other services like Auth here later
// export const auth = getAuth(app); 