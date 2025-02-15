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
    let outputFrame = document.getElementById("output").contentWindow.document;

    let scriptElement = outputFrame.createElement("script");
    scriptElement.textContent = jsCode;
    outputFrame.body.appendChild(scriptElement);
}

function runJS() {
    let jsCode = document.getElementById("js-code").value;
    let outputFrame = document.getElementById("js-output").contentWindow.document;
    outputFrame.open();
    outputFrame.write("<script>" + jsCode + "</script>");
    outputFrame.close();
}

function markCompleted(topic) {
    localStorage.setItem(topic + "_completed", "true");
    document.getElementById(topic + "-status").innerText = "✔ Completed";
}

function checkProgress() {
    ["html", "css", "js"].forEach(topic => {
        if (localStorage.getItem(topic + "_completed")) {
            document.getElementById(topic + "-status").innerText = "✔ Completed";
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
            localStorage.setItem(topic + "Score", currentScore + 10);
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
        let status = localStorage.getItem(topic + "_completed") ? "✔ Completed" : "Not started";
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
    "The best way to learn is to do. - Paul Halmos",
    "Every master was once a beginner. - Anonymous",
    "Code is like humor. When you have to explain it, it’s bad. - Cory House",
    "The only way to go fast is to go well. - Robert C. Martin",
    "First, solve the problem. Then, write the code. - John Johnson"
];

function displayQuote() {
    let randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    document.getElementById("quote-text").innerText = randomQuote;
}

// Show a random quote when the page loads
document.addEventListener("DOMContentLoaded", displayQuote);

