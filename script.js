// Function to run HTML code
function runCode() {
    let htmlCode = document.getElementById("html-code").value;
    let cssCode = document.getElementById("css-code") ? document.getElementById("css-code").value : "";
    let jsCode = document.getElementById("js-code") ? document.getElementById("js-code").value : "";

    let outputFrame = document.getElementById("output").contentWindow.document;
    outputFrame.open();
    outputFrame.write(`
        <html>
        <head><style>${cssCode}</style></head>
        <body>${htmlCode}<script>${jsCode}<\/script></body>
        </html>
    `);
    outputFrame.close();
}

// Function to apply CSS code separately
function applyCSS() {
    let cssCode = document.getElementById("css-code").value;
    let outputFrame = document.getElementById("css-output").contentWindow.document;
    outputFrame.open();
    outputFrame.write("<style>" + cssCode + "</style>");
    outputFrame.close();
}

// Function to execute JavaScript separately
function runJS() {
    let jsCode = document.getElementById("js-code").value;
    let outputFrame = document.getElementById("js-output").contentWindow.document;

    outputFrame.open();
    outputFrame.write(`
        <html>
        <head><script>
        try {
            console.log = function(message) {
                let outputDiv = document.getElementById('console');
                if (outputDiv) {
                    outputDiv.innerHTML = "✅ Check Console"; // Show "Check Console"
                }
                console.defaultLog(message); // Still log to browser console
            };
            console.defaultLog = console.log.bind(console); // Keep default console.log
            ${jsCode} // Run user JS
        } catch (error) {
            document.getElementById('console').innerHTML = "❌ Error: " + error.message;
        }
        </script>
        </head>
        <body>
            <div id="console" style="background:white; color:red; padding:10px; height:30px; overflow-y:auto; font-family:monospace; border-radius:5px; text-align:center; font-size:20px;">
                Console Output ⬆️
            </div>
        </body>
        </html>
    `);
    outputFrame.close();
}




function toggleCompletion(topic) {
    let button = document.getElementById(`mark-completed-${topic}`);
    let statusText = document.getElementById(`${topic}-status`);

    if (localStorage.getItem(`${topic}_completed`) === "true") {
        // Unmark as completed
        localStorage.removeItem(`${topic}_completed`);
        button.innerText = "✅ Mark as Completed";
        button.classList.remove("completed"); // Remove completed style
        if (statusText) statusText.innerText = "Not started";
    } else {
        // Mark as completed
        localStorage.setItem(`${topic}_completed`, "true");
        button.innerText = "🎉 Completed!";
        button.classList.add("completed"); // Apply completed style
        if (statusText) statusText.innerText = "Completed";
    }
}

// Ensure the button reflects completion state on page load
document.addEventListener("DOMContentLoaded", () => {
    ["html", "css", "js"].forEach(topic => {
        let button = document.getElementById(`mark-completed-${topic}`);
        if (localStorage.getItem(`${topic}_completed`) === "true" && button) {
            button.innerText = "🎉 Completed!";
            button.classList.add("completed");
        }
    });
});


function checkProgress() {
    ["html", "css", "js"].forEach(topic => {
        if (localStorage.getItem(topic + "_completed")) {
            document.getElementById(topic + "-status").innerText = "Completed";
        }
    });
}

window.onload = checkProgress;

// ✅ New Dark Mode Toggle (Using Switch)

//document.addEventListener("DOMContentLoaded", function () {
   // const darkModeToggle = document.getElementById("color_mode");
    //const body = document.body;

    // Check if dark mode is enabled in localStorage
    //if (localStorage.getItem("dark-mode") === "enabled") {
     //   body.classList.add("dark-mode");
     //   darkModeToggle.checked = true;
    //}

    // Toggle dark mode when clicking the switch
   // darkModeToggle.addEventListener("change", () => {
   //     if (darkModeToggle.checked) {
   //         body.classList.add("dark-mode");
   //         localStorage.setItem("dark-mode", "enabled");
   //     } else {
  //          body.classList.remove("dark-mode");
  //          localStorage.setItem("dark-mode", "disabled");
  //      }
  //  });
//});

document.addEventListener("DOMContentLoaded", function () {
    const toggleSwitch = document.getElementById("dark-mode-toggle");
    const body = document.body;

    // Check if dark mode is enabled in localStorage
    if (localStorage.getItem("dark-mode") === "enabled") {
        body.classList.add("dark-mode");
        toggleSwitch.checked = true;
    }

    // Event listener for the toggle button
    toggleSwitch.addEventListener("change", () => {
        if (toggleSwitch.checked) {
            body.classList.add("dark-mode");
            localStorage.setItem("dark-mode", "enabled");
        } else {
            body.classList.remove("dark-mode");
            localStorage.setItem("dark-mode", "disabled");
        }
    });
});



// ✅ Quiz Functionality with Pop-up Message for Wrong Answers
function loadQuiz(topic) {
    const quizContainer = document.getElementById(`${topic}-quiz-container`);
    if (!quizContainer) return;
    quizContainer.innerHTML = ""; // Clear previous quiz

    const currentQuiz = quizData[topic];
    let currentQuestion = 0;

    function displayQuestion() {
        quizContainer.innerHTML = "";
        const questionEl = document.createElement("h3");
        questionEl.innerText = currentQuiz[currentQuestion].question;
        quizContainer.appendChild(questionEl);

        currentQuiz[currentQuestion].options.forEach(option => {
            let button = document.createElement("button");
            button.innerText = option;
            button.classList.add("quiz-option");
            button.onclick = () => checkAnswer(option, button);
            quizContainer.appendChild(button);
        });

        // Add placeholder for incorrect message
        let messageDiv = document.createElement("div");
        messageDiv.id = "quiz-message";
        quizContainer.appendChild(messageDiv);
        
        // ✅ Scroll to the quiz container smoothly
    //quizContainer.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    function checkAnswer(answer) {
        let correctSound = document.getElementById("correct-sound");
        let wrongSound = document.getElementById("wrong-sound");

        const quizContainer = document.getElementById(`${topic}-quiz-container`);
        let messageDiv = document.getElementById("quiz-message");
        
        if (!messageDiv) {
            messageDiv = document.createElement("div");
            messageDiv.id = "quiz-message";
            quizContainer.appendChild(messageDiv);
        }

        if (answer === currentQuiz[currentQuestion].answer) {
            correctSound.currentTime = 0;
            correctSound.play().catch(err => console.error("❌ Error playing correct sound:", err));
        } else {
            wrongSound.currentTime = 0;
            wrongSound.play().catch(err => console.error("❌ Error playing wrong sound:", err));
        }

        if (answer === currentQuiz[currentQuestion].answer) {
            messageDiv.innerHTML = `<p class="correct">✅ Correct!</p>`;
            let currentScore = parseInt(localStorage.getItem(topic + "Score") || 0);
            currentScore += 10;
            localStorage.setItem(topic + "Score", currentScore);

            // ✅ Update Firestore
            updateUserScore(topic, currentScore);

        } else {
            messageDiv.innerHTML = `<p class="incorrect">❌ Incorrect! Try again.</p>`;
        }

        setTimeout(() => {
            messageDiv.innerHTML = "";
            currentQuestion++;
            if (currentQuestion < currentQuiz.length) {
                displayQuestion();
            } else {
                quizContainer.innerHTML = "<h3>🎉 Quiz Completed!</h3>";
            }
        }, 1500);
    }

    displayQuestion();
}

// Ensure dark mode toggle works
document.addEventListener("DOMContentLoaded", function () {
    const toggleSwitch = document.getElementById("dark-mode-toggle");
    if (!toggleSwitch) return;
    
    if (localStorage.getItem("dark-mode") === "enabled") {
        document.body.classList.add("dark-mode");
        toggleSwitch.checked = true;
    }

    toggleSwitch.addEventListener("change", () => {
        if (toggleSwitch.checked) {
            document.body.classList.add("dark-mode");
            localStorage.setItem("dark-mode", "enabled");
        } else {
            document.body.classList.remove("dark-mode");
            localStorage.setItem("dark-mode", "disabled");
        }
    });
});

// Function to update progress in the dashboard
function updateDashboard() {
    ["html", "css", "js"].forEach(topic => {
        let status = localStorage.getItem(topic + "_completed") ? "Completed" : "Not started";
        document.getElementById(topic + "-status").innerText = status;
    });
}

// Function to generate a random daily challenge
function loadDailyChallenge() {
    const challenges = [
        "Write an HTML page with an image and a link.",
        "Style a button using only CSS.",
        "Write a JavaScript function that reverses a string.",
        "Create an unordered list with three items.",
        "Change the background color of a div using JavaScript."
    ];
    let challenge = challenges[new Date().getDate() % challenges.length]; // Rotate challenges daily
    document.getElementById("daily-challenge").innerText = challenge;
}

// Run on page load
document.addEventListener("DOMContentLoaded", () => {
    updateDashboard();
    loadDailyChallenge();
});

function updateScores() {
    let htmlScore = localStorage.getItem("htmlScore") || 0;
    let cssScore = localStorage.getItem("cssScore") || 0;
    let jsScore = localStorage.getItem("jsScore") || 0;

    document.getElementById("html-score-display").innerText = htmlScore;
    document.getElementById("css-score-display").innerText = cssScore;
    document.getElementById("js-score-display").innerText = jsScore;

    let totalScore = parseInt(htmlScore) + parseInt(cssScore) + parseInt(jsScore);
    document.getElementById("score-display").innerText = `Total Score: ${totalScore}`;
}

// Reset Scores
function resetScores() {
    localStorage.setItem("htmlScore", 0);
    localStorage.setItem("cssScore", 0);
    localStorage.setItem("jsScore", 0);
    updateScores();
}

// Call this function when the page loads
document.addEventListener("DOMContentLoaded", updateScores);


function saveUsername() {
    let username = document.getElementById("username-input").value;
    if (username) {
        localStorage.setItem("username", username);
        document.getElementById("username-display").innerText = username;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    let storedUsername = localStorage.getItem("username") || "Guest";
    document.getElementById("username-display").innerText = storedUsername;
});


function saveRecentActivity(topic) {
    localStorage.setItem("recentTopic", topic);
}

// Load recent activity correctly on page load
document.addEventListener("DOMContentLoaded", () => {
    let recentTopic = localStorage.getItem("recentTopic") || "No recent activity.";
    document.getElementById("recent-topic").innerText = `You last visited: ${recentTopic}`;
});


function updateStreak() {
    let lastVisit = localStorage.getItem("lastVisit");
    let today = new Date().toDateString();

    if (lastVisit === today) return; // Already visited today

    let streak = parseInt(localStorage.getItem("streak") || 0);

    if (lastVisit) {
        let yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        if (new Date(lastVisit).toDateString() === yesterday.toDateString()) {
            streak++; // Continue streak
        } else {
            streak = 1; // Reset streak
        }
    } else {
        streak = 1; // First visit
    }

    localStorage.setItem("streak", streak);
    localStorage.setItem("lastVisit", today);
    document.getElementById("streak-count").innerText = `Streak: ${streak} days`;
}

// Load streak on page load
document.addEventListener("DOMContentLoaded", updateStreak);

function updateProgress() {
    let completed = 0;
    let total = 3; // Total number of topics (HTML, CSS, JS)

    // Check how many topics are marked as completed
    ["html", "css", "js"].forEach(topic => {
        if (localStorage.getItem(topic + "_completed") === "true") {
            completed++;
        }
    });

    let progressPercent = (completed / total) * 100;
    
    document.getElementById("progress-bar").style.width = `${progressPercent}%`;
    document.getElementById("progress-text").innerText = `${progressPercent.toFixed(0)}% Completed`;
}

// Run updateProgress on page load
document.addEventListener("DOMContentLoaded", updateProgress);



const quotes = [
    { text: "The best way to learn is to do.", author: "Paul Halmos" },
    { text: "Every master was once a beginner.", author: "Anonymous" },
    { text: "Code is like humor. When you have to explain it, it’s bad.", author: "Cory House" },
    { text: "The only way to go fast is to go well.", author: "Robert C. Martin" },
    { text: "First, solve the problem. Then, write the code.", author: "John Johnson" }
];

function displayQuote() {
    let randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    document.getElementById("quote-text").innerText = `"${randomQuote.text}"`;
    document.getElementById("quote-author").innerText = `- ${randomQuote.author}`;
}

// Show a random quote when the page loads
document.addEventListener("DOMContentLoaded", displayQuote);

//validate user HTML code to check the answer

function checkHTMLChallenge() {
    let userCode = document.getElementById("html-code").value.trim();
    let expectedCode = '<h1>Hello, World!</h1>';

    if (userCode === expectedCode) {
        document.getElementById("challenge-feedback").innerHTML = "✅ Correct!";
        localStorage.setItem("htmlChallengeCompleted", "true");
    } else {
        document.getElementById("challenge-feedback").innerHTML = "❌ Try Again!";
    }
}

// Check if challenge was completed before
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("htmlChallengeCompleted") === "true") {
        document.getElementById("challenge-feedback").innerHTML = " ";
    }
});

//validate user CSS code to check the answer

function checkCSSChallenge() {
    let userCode = document.getElementById("css-code").value.trim();
    let expectedCode = "body { background-color: red; }";

    if (userCode === expectedCode) {
        document.getElementById("challenge-feedback").innerHTML = "✅ Correct!";
        localStorage.setItem("cssChallengeCompleted", "true");
    } else {
        document.getElementById("challenge-feedback").innerHTML = "❌ Try Again!";
    }
}

// Check if challenge was completed before
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("cssChallengeCompleted") === "true") {
        document.getElementById("challenge-feedback").innerHTML = "";
    }
});

//vaalidatee js challenge
function checkJSChallenge() {
    let jsCode = document.getElementById("js-code").value.trim();
    let feedbackDiv = document.getElementById("challenge-feedback");

    // Normalize spaces, remove extra quotes for comparison
    let cleanedCode = jsCode.replace(/\s+/g, '').replace(/"/g, "'").toLowerCase();

    // Check for both return and alert versions
    let isCorrect = cleanedCode.includes("return'hello,world!'") || cleanedCode.includes("alert('hello,world!')");

    if (isCorrect) {
        feedbackDiv.innerHTML = "✅ Correct!";
        localStorage.setItem("jsChallengeCompleted", "true"); // Save completion
    } else {
        feedbackDiv.innerHTML = "❌ Try Again!";
        localStorage.removeItem("jsChallengeCompleted"); // Reset if incorrect
    }
}


// Check progress on page load
document.addEventListener("DOMContentLoaded", () => {
    let challengeStatus = localStorage.getItem("jsChallengeCompleted");
    let feedbackDiv = document.getElementById("challenge-feedback");
    let jsCode = document.getElementById("js-code").value.trim();
    let cleanedCode = jsCode.replace(/\s+/g, '').replace(/"/g, "'").toLowerCase();

    let isCorrect = cleanedCode.includes("return'hello,world!'") || cleanedCode.includes("alert('hello,world!')");

    if (challengeStatus === "true" && isCorrect) {
        feedbackDiv.innerHTML = "🎉 Challenge Completed!";
    } else {
        feedbackDiv.innerHTML = ""; // Reset the message if incorrect
        localStorage.removeItem("jsChallengeCompleted"); // Clear incorrect completion
    }
});


//adjust height atomatically
function autoResize(textarea) {
    textarea.style.height = "auto"; // Reset height
    textarea.style.height = textarea.scrollHeight + "px"; // Set new height
}

function updateCircularProgress() {
    let completed = 0;
    let total = 3; // Total number of topics (HTML, CSS, JS)

    // Check how many topics are completed
    ["html", "css", "js"].forEach(topic => {
        if (localStorage.getItem(topic + "_completed") === "true") {
            completed++;
        }
    });

    let progressPercent = (completed / total) * 100; // Calculate percentage
    let circle = document.getElementById("progress-circle");
    let percentageText = document.getElementById("progress-percentage");

    if (circle && percentageText) {  
        let dashOffset = 283 - (progressPercent / 100) * 283; // Convert percent to stroke offset

        circle.style.strokeDashoffset = dashOffset; // Animate circle fill
        percentageText.innerText = `${progressPercent.toFixed(0)}%`; // Update percentage text
    }

    // Update the progress text
    let progressText = document.getElementById("progress-text");
    if (progressText) {
        progressText.innerText = `${progressPercent.toFixed(0)}% Completed`;
    }
}

// Run updateProgress on page load
document.addEventListener("DOMContentLoaded", updateCircularProgress);

//pressin Enter, it will trigger the "Save" button's function
document.getElementById("username-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevents form submission (if inside a form)
        saveUsername(); // Calls the save function
    }
});

function saveUsername() {
    let usernameInput = document.getElementById("username-input").value.trim();
    
    if (usernameInput) {
        localStorage.setItem("username", usernameInput);
        document.getElementById("username-display").innerText = usernameInput;
        
        // Hide input and button after saving
        document.getElementById("welcome-container").innerHTML = `<h2>Welcome, ${usernameInput}!</h2>`;
    }
}

// Trigger save on pressing "Enter"
function handleEnter(event) {
    if (event.key === "Enter") {
        saveUsername();
    }
}

// Load saved username on page load
document.addEventListener("DOMContentLoaded", function() {
    let savedUsername = localStorage.getItem("username");
    if (savedUsername) {
        document.getElementById("username-display").innerText = savedUsername;
        document.getElementById("welcome-container").innerHTML = `<h2>Welcome, ${savedUsername}!</h2>`;
    }
});
  
  // Function to save user progress to Firestore
  function saveUserProgress(userId, userProgress) {
      db.collection("users").doc(userId).set(userProgress, { merge: true })
      .then(() => {
          console.log("✅ User progress saved successfully!");
      })
      .catch((error) => {
          console.error("❌ Error saving user progress: ", error);
      });
  }
  
  // Function to load user progress from Firestore
  function loadUserProgress(userId) {
      db.collection("users").doc(userId).get()
      .then((doc) => {
          if (doc.exists) {
              const data = doc.data();
              console.log("✅ Loaded user progress:", data);
  
              // Update UI with user-specific progress
              document.getElementById("score-display").innerText = data.score || 0;
              document.getElementById("recent-topic").innerText = `Last Activity: ${data.lastPage || "None"}`;
          } else {
              console.log("⚠ No user progress found, starting fresh.");
          }
      })
      .catch((error) => {
          console.error("❌ Error loading user progress: ", error);
      });
  }
  
  // Auto-save progress when user leaves or navigates
  auth.onAuthStateChanged((user) => {
      if (user) {
          const userId = user.uid; // Get the unique Firebase Auth user ID
  
          // Load user progress from Firestore
          loadUserProgress(userId);
  
          // Save progress when the user leaves the page
          window.addEventListener("beforeunload", () => {
              const userProgress = {
                  lastPage: window.location.pathname, // Save last visited page
                  lastActionTime: new Date().toISOString(), // Timestamp of last action
                  score: parseInt(document.getElementById("score-display").innerText) || 0 // Save score dynamically
              };
              saveUserProgress(userId, userProgress);
          });
      } else {
          console.log("❌ No user logged in. Progress will not be saved.");
      }
  });
  
// ✅ Updated script.js with Firestore integration

import { getFirestore, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { app } from "./firebase-config.js";

const db = getFirestore(app);
const auth = getAuth(app);

// ✅ Function to update user quiz scores in Firestore
async function updateUserScore(topic, score) {
    const user = auth.currentUser;
    if (!user) {
        console.error("❌ User not logged in");
        return;
    }

    const userRef = doc(db, "users", user.uid);
    try {
        await updateDoc(userRef, { [`${topic}Score`]: score }, { merge: true });
        console.log(`✅ ${topic} score updated in Firestore:`, score);
    } catch (error) {
        console.error("❌ Error updating user score:", error);
    }
}

// ✅ Function to load user quiz scores from Firestore
async function loadUserScores() {
    const user = auth.currentUser;
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
        const userData = docSnap.data();
        console.log("✅ Loaded user scores:", userData);

        document.getElementById("html-score-display").innerText = userData.htmlScore || 0;
        document.getElementById("css-score-display").innerText = userData.cssScore || 0;
        document.getElementById("js-score-display").innerText = userData.jsScore || 0;
        document.getElementById("score-display").innerText = 
            (userData.htmlScore || 0) + (userData.cssScore || 0) + (userData.jsScore || 0);
    } else {
        console.log("⚠ No previous scores found, setting default.");
        await setDoc(userRef, { htmlScore: 0, cssScore: 0, jsScore: 0 }, { merge: true });
    }
}

// ✅ Modify quiz score update logic to store in Firestore
async function updateQuizScore(topic) {
    const user = auth.currentUser;
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);

    let currentScore = docSnap.exists() ? (docSnap.data()[`${topic}Score`] || 0) : 0;
    currentScore += 10; // Increase score

    await updateUserScore(topic, currentScore); // Save to Firestore
}

// ✅ Load user data after login
auth.onAuthStateChanged((user) => {
    if (user) {
        loadUserScores(); // Load scores after login
    }
});

// ✅ Attach event listeners to quiz options
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".quiz-option").forEach(option => {
        option.addEventListener("click", function () {
            const topic = this.dataset.topic;
            updateQuizScore(topic);
        });
    });
});

export function updateDashboard() {
    console.log("Dashboard updated!");
}

export function loadDailyChallenge() {
    console.log("Daily challenge loaded!");
}

export function updateScores() {
    console.log("Scores updated!");
}

export function updateProgress() {
    console.log("Progress updated!");
}

export function updateStreak() {
    console.log("Streak updated!");
}

export function displayQuote() {
    console.log("Motivational quote displayed!");
}
