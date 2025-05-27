// Import the functions you need from Firebase Authentication
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged // Import onAuthStateChanged
} from "firebase/auth";
import { app } from './firebase'; // Import the initialized Firebase app

// Get the Auth instance
const auth = getAuth(app);

// Function to sign up a new user
export const signup = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Signed up 
        const user = userCredential.user;
        console.log('User signed up:', user);
        return user;
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Signup Error:', errorCode, errorMessage);
        throw error; // Re-throw the error for the component to handle
    }
};

// Function to log in an existing user
export const login = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        // Signed in
        const user = userCredential.user;
        console.log('User logged in:', user);
        return user;
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Login Error:', errorCode, errorMessage);
        throw error; // Re-throw the error for the component to handle
    }
};

// Function to log out the current user
export const logout = async () => {
    try {
        await signOut(auth);
        console.log('User logged out.');
    } catch (error) {
        console.error('Logout Error:', error);
        throw error; // Re-throw the error for the component to handle
    }
};

// Export the auth instance and onAuthStateChanged for use in components
export { auth, onAuthStateChanged }; 