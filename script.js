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
// Remove the entire loadQuiz function since it's already in quiz.js

// Keep the user data management functions
function getUserData() {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) return null;
    
    const userData = localStorage.getItem(`userData_${userEmail}`);
    return userData ? JSON.parse(userData) : {
        scores: {
            html: 0,
            css: 0,
            js: 0
        },
        recentActivity: [],
        learningStatus: {
            html: 'Not started',
            css: 'Not started',
            js: 'Not started'
        },
        streak: 0,
        lastActivityDate: null
    };
}

function saveUserData(data) {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) return;
    
    localStorage.setItem(`userData_${userEmail}`, JSON.stringify(data));
}

// Update displays
function updateScoreDisplay() {
    try {
        const userData = getUserData();
        if (!userData) return;

        const htmlScore = document.getElementById('html-score-display');
        const cssScore = document.getElementById('css-score-display');
        const jsScore = document.getElementById('js-score-display');
        const totalScoreDisplay = document.getElementById('score-display');

        if (htmlScore) htmlScore.textContent = userData.scores.html || 0;
        if (cssScore) cssScore.textContent = userData.scores.css || 0;
        if (jsScore) jsScore.textContent = userData.scores.js || 0;

        const totalScore = (userData.scores.html || 0) + (userData.scores.css || 0) + (userData.scores.js || 0);
        if (totalScoreDisplay) totalScoreDisplay.textContent = `Total Score: ${totalScore}`;

        console.log('Scores updated:', userData.scores);
    } catch (error) {
        console.error('Error updating score display:', error);
    }
}

function updateRecentActivityDisplay() {
    const userData = getUserData();
    if (!userData) return;
    
    const recentTopic = document.getElementById('recent-topic');
    if (userData.recentActivity.length > 0) {
        const latest = userData.recentActivity[0];
        recentTopic.textContent = `${latest.topic} - ${new Date(latest.timestamp).toLocaleDateString()}`;
    } else {
        recentTopic.textContent = 'No recent activity.';
    }
}

function updateLearningStatusDisplay() {
    const userData = getUserData();
    if (!userData) return;
    
    document.getElementById('html-status').textContent = userData.learningStatus.html;
    document.getElementById('css-status').textContent = userData.learningStatus.css;
    document.getElementById('js-status').textContent = userData.learningStatus.js;
}

// Function to generate a random daily challenge
function loadDailyChallenge() {
    console.log('Loading daily challenge...');
    const challenges = [
        "Write an HTML page with an image and a link.",
        "Style a button using only CSS.",
        "Write a JavaScript function that reverses a string.",
        "Create an unordered list with three items.",
        "Change the background color of a div using JavaScript.",
        "Create a responsive navigation menu.",
        "Implement a dark mode toggle.",
        "Build a simple contact form.",
        "Create an animated loading spinner.",
        "Build a countdown timer."
    ];
    
    try {
        const dailyChallengeElement = document.getElementById("daily-challenge");
        if (!dailyChallengeElement) {
            console.error('Daily challenge element not found');
            return;
        }
        
        // Get today's date and use it to select a challenge
        const today = new Date();
        const challengeIndex = today.getDate() % challenges.length;
        const todaysChallenge = challenges[challengeIndex];
        
        // Update the challenge text immediately
        dailyChallengeElement.innerHTML = todaysChallenge;
        
        console.log('Daily challenge loaded successfully:', todaysChallenge);
    } catch (error) {
        console.error('Error loading daily challenge:', error);
        const dailyChallengeElement = document.getElementById("daily-challenge");
        if (dailyChallengeElement) {
            dailyChallengeElement.innerText = "Could not load challenge. Please refresh.";
        }
    }
}

// Function to update all displays
function updateDashboard() {
    console.log('Updating dashboard...');
    try {
        // Load daily challenge first
        loadDailyChallenge();
        
        // Then update other displays if user is logged in
        const userData = getUserData();
        if (userData) {
            updateScoreDisplay();
            updateRecentActivityDisplay();
            updateLearningStatusDisplay();
            updateStreak();
            updateProgress();
            updateCircularProgress();
        }
    } catch (error) {
        console.error('Error updating dashboard:', error);
    }
}

// Remove all existing DOMContentLoaded event listeners and use a single one
const existingListeners = window.getEventListeners && window.getEventListeners(document)?.DOMContentLoaded || [];
existingListeners.forEach(listener => {
    document.removeEventListener('DOMContentLoaded', listener.listener);
});

// Single initialization function
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded, initializing...');
    
    // Load daily challenge immediately
    loadDailyChallenge();
    
    // Initialize other components
    try {
        const savedUsername = localStorage.getItem("username");
        if (savedUsername) {
            const welcomeContainer = document.getElementById("welcome-container");
            if (welcomeContainer) {
                welcomeContainer.innerHTML = `<h2>Welcome, ${savedUsername}!</h2>`;
            }
        }
        
        // Update dashboard (which includes scores, progress, etc.)
        updateDashboard();
        
    } catch (error) {
        console.error('Error during initialization:', error);
    }
});

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
    { text: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" },
    { text: "The only way to go fast is to go well.", author: "Robert C. Martin" },
    { text: "First, solve the problem. Then, write the code.", author: "John Johnson" }
];

function displayQuote() {
    console.log('Displaying motivational quote...');
    try {
        const quoteTextElement = document.getElementById("quote-text");
        const quoteAuthorElement = document.getElementById("quote-author");
        
        if (!quoteTextElement || !quoteAuthorElement) {
            console.error('Quote elements not found');
            return;
        }
        
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const selectedQuote = quotes[randomIndex];
        
        // Update the quote text immediately
        quoteTextElement.innerHTML = `"${selectedQuote.text}"`;
        quoteAuthorElement.innerHTML = `- ${selectedQuote.author}`;
        
        console.log('Quote displayed successfully:', selectedQuote);
    } catch (error) {
        console.error('Error displaying quote:', error);
        const quoteTextElement = document.getElementById("quote-text");
        const quoteAuthorElement = document.getElementById("quote-author");
        
        if (quoteTextElement) quoteTextElement.innerHTML = "Error loading quote";
        if (quoteAuthorElement) quoteAuthorElement.innerHTML = "";
    }
}

// Add some CSS for the quote display
const quoteStyle = document.createElement('style');
quoteStyle.textContent = `
    #quote-text {
        font-size: 1.2em;
        font-style: italic;
        color: #2c3e50;
        margin-bottom: 10px;
        line-height: 1.4;
    }
    #quote-author {
        font-size: 1em;
        color: #7f8c8d;
        text-align: right;
    }
    .quote-container {
        padding: 20px;
        background: #f8f9fa;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        margin: 20px 0;
    }
`;
document.head.appendChild(quoteStyle);

// Initialize quote on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing quote display...');
    displayQuote();
    
    // Refresh quote every 30 seconds
    setInterval(displayQuote, 30000);
});

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

// User data management
function getUserData() {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) return null;
    
    const userData = localStorage.getItem(`userData_${userEmail}`);
    return userData ? JSON.parse(userData) : {
        scores: {
            html: 0,
            css: 0,
            js: 0
        },
        recentActivity: [],
        learningStatus: {
            html: 'Not started',
            css: 'Not started',
            js: 'Not started'
        },
        streak: 0,
        lastActivityDate: null
    };
}

function saveUserData(data) {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) return;
    
    localStorage.setItem(`userData_${userEmail}`, JSON.stringify(data));
}

// Update scores
function updateScore(topic, score) {
    const userData = getUserData();
    if (!userData) return;
    
    userData.scores[topic.toLowerCase()] = score;
    saveUserData(userData);
    updateScoreDisplay();
}

// Save recent activity
function saveRecentActivity(topic) {
    const userData = getUserData();
    if (!userData) return;
    
    const activity = {
        topic: topic,
        timestamp: new Date().toISOString()
    };
    
    userData.recentActivity.unshift(activity);
    // Keep only last 5 activities
    userData.recentActivity = userData.recentActivity.slice(0, 5);
    
    // Update learning status
    userData.learningStatus[topic.toLowerCase()] = 'In Progress';
    
    // Update streak
    updateStreak(userData);
    
    saveUserData(userData);
    updateRecentActivityDisplay();
    updateLearningStatusDisplay();
}

// Update streak
function updateStreak(userData) {
    const today = new Date().toDateString();
    const lastActivity = userData.lastActivityDate;
    
    if (lastActivity === today) return;
    
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();
    
    if (lastActivity === yesterdayStr) {
        userData.streak++;
    } else if (lastActivity !== today) {
        userData.streak = 1;
    }
    
    userData.lastActivityDate = today;
}

// Update displays
function updateScoreDisplay() {
    const userData = getUserData();
    if (!userData) return;
    
    document.getElementById('html-score-display').textContent = userData.scores.html;
    document.getElementById('css-score-display').textContent = userData.scores.css;
    document.getElementById('js-score-display').textContent = userData.scores.js;
    
    const totalScore = userData.scores.html + userData.scores.css + userData.scores.js;
    document.getElementById('score-display').textContent = `Total Score: ${totalScore}`;
}

function updateRecentActivityDisplay() {
    const userData = getUserData();
    if (!userData) return;
    
    const recentTopic = document.getElementById('recent-topic');
    if (userData.recentActivity.length > 0) {
        const latest = userData.recentActivity[0];
        recentTopic.textContent = `${latest.topic} - ${new Date(latest.timestamp).toLocaleDateString()}`;
    } else {
        recentTopic.textContent = 'No recent activity.';
    }
}

function updateLearningStatusDisplay() {
    const userData = getUserData();
    if (!userData) return;
    
    document.getElementById('html-status').textContent = userData.learningStatus.html;
    document.getElementById('css-status').textContent = userData.learningStatus.css;
    document.getElementById('js-status').textContent = userData.learningStatus.js;
}

function updateStreakDisplay() {
    const userData = getUserData();
    if (!userData) return;
    
    document.getElementById('streak-count').textContent = `Streak: ${userData.streak} days`;
}

// Reset scores
function resetScores() {
    const userData = getUserData();
    if (!userData) return;
    
    userData.scores = {
        html: 0,
        css: 0,
        js: 0
    };
    saveUserData(userData);
    updateScoreDisplay();
}

// Initialize displays when page loads
document.addEventListener('DOMContentLoaded', function() {
    updateScoreDisplay();
    updateRecentActivityDisplay();
    updateLearningStatusDisplay();
    updateStreakDisplay();
});

// Add some CSS for the daily challenge
const style = document.createElement('style');
style.textContent = `
    .challenge-content {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px;
        background: #f8f9fa;
        border-radius: 8px;
        margin-top: 10px;
    }
    .challenge-icon {
        font-size: 24px;
        animation: bounce 1s infinite;
    }
    .challenge-text {
        color: #2c3e50;
        font-size: 16px;
    }
    @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
    }
`;
document.head.appendChild(style);
