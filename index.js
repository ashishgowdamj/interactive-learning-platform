import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "./firebase-config.js";
import { updateDashboard, loadDailyChallenge, updateScores, updateProgress, updateStreak, displayQuote } from "./script.js";


const auth = getAuth(app);
const db = getFirestore(app);

// Wait for authentication before running functions
onAuthStateChanged(auth, async (user) => {
    if (!user) {
        window.location.href = "login.html";
    } else {
        // Display user's email
        document.getElementById("username-display").innerText = user.email;

        // ✅ Load user-specific progress from Firestore
        await loadUserProgress(user.uid);
        
        // ✅ Run all dashboard functions after loading user data
        initializeDashboard();
    }
});

// Function to load user progress from Firestore
async function loadUserProgress(userId) {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
        const userData = userSnap.data();
        console.log("✅ Loaded user progress:", userData);

        // ✅ Check if elements exist before updating them
        if (document.getElementById("html-score-display")) {
            document.getElementById("html-score-display").innerText = userData.htmlScore || 0;
        }
        if (document.getElementById("css-score-display")) {
            document.getElementById("css-score-display").innerText = userData.cssScore || 0;
        }
        if (document.getElementById("js-score-display")) {
            document.getElementById("js-score-display").innerText = userData.jsScore || 0;
        }
        if (document.getElementById("score-display")) {
            document.getElementById("score-display").innerText = 
                (userData.htmlScore || 0) + (userData.cssScore || 0) + (userData.jsScore || 0);
        }
        if (document.getElementById("recent-topic")) {
            document.getElementById("recent-topic").innerText = `Last Activity: ${userData.lastPage || "None"}`;
        }
    } else {
        console.log("⚠ No previous progress found, starting fresh.");
    }
}


// Logout function
function logout() {
    signOut(auth).then(() => {
        window.location.href = "login.html";
    }).catch((error) => {
        console.error("Logout failed:", error);
    });
}

// Attach logout function to the logout button
document.addEventListener("DOMContentLoaded", () => {
    const logoutButton = document.getElementById("logoutButton");
    if (logoutButton) {
        logoutButton.addEventListener("click", logout);
    }
});

// ✅ Move functions inside an initialization function
function initializeDashboard() {
    updateDashboard();
    loadDailyChallenge();
    updateScores();
    updateProgress();
    updateStreak();
    displayQuote();
}
