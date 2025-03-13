import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "./firebase-config.js"; // Import Firebase config

const auth = getAuth(app);

document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            localStorage.setItem("userEmail", user.email);
            window.location.href = "index.html"; // Redirect after login
        })
        .catch((error) => {
            alert("Login failed: " + error.message);
        });
});
