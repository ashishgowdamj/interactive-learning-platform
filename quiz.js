const quizData = {
    html: [
        { question: "1. What does HTML stand for?", options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"], answer: "Hyper Text Markup Language" },
        { question: "2. Which tag is used for creating a hyperlink?", options: ["<a>", "<link>", "<href>"], answer: "<a>" },
        { question: "3. Which HTML tag is used to define an unordered list?", options: ["<ul>", "<ol>", "<li>" , "<list>"], answer: "<ul>" },
        { question: "4. What is the correct HTML tag for inserting a line break?", options: ["<br>", "<lb>", "<break>" , "<newline>"], answer: "<br>" },
        { question: "5. Which attribute is used to specify an image source in an <img> tag?", options: ["<href>", "<src>", "<alt>" , "<title>"], answer: "<src>" },
        { question: "6. Which HTML tag is used to define a table row?", options: ["<tr>", "<td>", "<th>" , "<row>"], answer: "<tr>" },
        { question: "7. Which doctype declaration is correct for HTML5?", options: ["<!DOCTYPE html>", "<!DOCTYPE HTML5>", "<!DOCTYPE XHTML>" , "<!DOCTYPE document>"], answer: "<!DOCTYPE html>" },
        { question: "8. Which HTML tag is used to create a checkbox?", options: ["<input type='checkbox'>", "<checkbox>", "<check>" , "<cb>"], answer: "<input type='checkbox'>" },
        { question: "9. Which tag is used to define the main content of an HTML document?", options: ["<main>", "<body>", "<content>" , "<section>"], answer: "<main>" },
        { question: "10. Which HTML tag is used to create a dropdown list?", options: ["<select>", "<dropdown>", "<option>" , "<list>"], answer: "<select>" },


    ],
    css: [
        { question: "What does CSS stand for?", options: ["Cascading Style Sheets", "Creative Style Sheets", "Computer Style System", "Colorful Style Sheets"], answer: "Cascading Style Sheets" },
        { question: "Which property changes text color in CSS?", options: ["color", "text-color", "font-color", "fg-color"], answer: "color" },
        { question: "Which property is used to change the background color?", options: ["color", "bg-color", "background-color", "bg-color"], answer: "background-color" },
        { question: "How do you add a comment in CSS?", options: ["<!-- this is a comment -->", " // this is a comment", "/* this is a comment */", "# this is a comment"], answer: "/* this is a comment */" },
        { question: "How do you select an element with id 'header'?", options: ["#header", ".header", "header", "*header"], answer: "#header" },
        { question: "Which property is used to change the font of an element?", options: ["font-family", "font-style", "font-weight", "font-size"], answer: "font-family" },
        { question: "How do you make each word in a text start with a capital letter?", options: ["text-transform: capitalize", "text-transform: uppercase", "text-transform: lowercase", "text-transform: initial"], answer: "text-transform: capitalize" },
        { question: "Which property is used to change the space between lines of text?", options: ["spacing", "line-height", "line-spacing", "text-spacing"], answer: "line-height" },
        { question: "How do you select elements with class name 'intro'?", options: ["#intro", ".intro", "intro", "*intro"], answer: ".intro" },
        { question: "Which property is used to change the left margin of an element?", options: ["margin-left", "padding-left", "indent-left", "space-left"], answer: "margin-left" }
    ],

    js: [
        { question: "1. What is the correct syntax to declare a JavaScript variable?", options: ["var x;", "variable x;", "v x;", "let x;"], answer: "var x;" },
        { question: "2. Which keyword is used to define a constant variable in JavaScript?", options: ["const", "var", "let", "constant"], answer: "const" },
        { question: "3. How do you write a comment in JavaScript?", options: ["<!-- This is a comment -->", "// This is a comment", "' This is a comment", "/* This is a comment */"], answer: "// This is a comment" },
        { question: "4. How do you create a function in JavaScript?", options: ["function: myFunction()", "function myFunction()", "def myFunction()", "create myFunction()"], answer: "function myFunction()" },
        { question: "5. How do you call a function named 'myFunction'?", options: ["call myFunction();", "myFunction();", "execute myFunction();", "run myFunction();"], answer: "myFunction();" },
        { question: "6. Which operator is used to assign a value to a variable?", options: ["=", "==", "===", ":"], answer: "=" },
        { question: "7. How do you check the type of a variable in JavaScript?", options: ["typeof", "typeOf", "checkType", "getType"], answer: "typeof" },
        { question: "8. Which symbol is used for strict equality comparison?", options: ["==", "===", "=", "!=="], answer: "===" },
        { question: "9. How do you write an array in JavaScript?", options: ["let arr = (1,2,3);", "let arr = [1,2,3];", "let arr = {1,2,3};", "let arr = <1,2,3>;"], answer: "let arr = [1,2,3];" },
        { question: "10. What will 'console.log(typeof [])' output?", options: ["array", "object", "list", "undefined"], answer: "object" }
    ]
};

function loadQuiz(topic) {
    console.log(`Loading quiz for topic: ${topic}`);
    const quizContainer = document.getElementById(`${topic}-quiz-container`);
    if (!quizContainer) {
        console.error(`Quiz container not found for topic: ${topic}`);
        return;
    }
    console.log(`Found quiz container for ${topic}`);
    quizContainer.innerHTML = ""; // Clear previous quiz

    const currentQuiz = quizData[topic];
    if (!currentQuiz) {
        console.error(`No quiz data found for topic: ${topic}`);
        return;
    }
    console.log(`Loaded quiz data for ${topic}: ${currentQuiz.length} questions`);
    let currentQuestion = 0;
    let score = 0;

    function displayQuestion() {
        console.log(`Displaying question ${currentQuestion + 1} of ${currentQuiz.length}`);
        quizContainer.innerHTML = "";
        const questionEl = document.createElement("h3");
        questionEl.innerText = currentQuiz[currentQuestion].question;
        quizContainer.appendChild(questionEl);

        const optionsContainer = document.createElement("div");
        optionsContainer.className = "quiz-options-container";

        currentQuiz[currentQuestion].options.forEach((option, index) => {
            let button = document.createElement("button");
            button.innerText = option;
            button.classList.add("quiz-option");
            button.onclick = () => checkAnswer(option);
            optionsContainer.appendChild(button);
        });

        quizContainer.appendChild(optionsContainer);

        // Add message div
        let messageDiv = document.createElement("div");
        messageDiv.id = "quiz-message";
        quizContainer.appendChild(messageDiv);
    }

    function checkAnswer(answer) {
        console.log(`Checking answer: ${answer}`);
        let correctSound = document.getElementById("correct-sound");
        let wrongSound = document.getElementById("wrong-sound");
        let messageDiv = document.getElementById("quiz-message");

        if (answer === currentQuiz[currentQuestion].answer) {
            console.log('Correct answer!');
            // Play correct sound
            if (correctSound) {
                correctSound.currentTime = 0;
                correctSound.play().catch(err => console.error("Error playing sound:", err));
            }

            // Update score
            score += 10;
            console.log(`New score: ${score}`);

            // Update user data
            try {
                const userData = getUserData() || {
                    scores: {},
                    recentActivity: [],
                    learningStatus: {}
                };
                
                // Update the score if it's higher than the current score
                const currentTopicScore = userData.scores[topic.toLowerCase()] || 0;
                if (score > currentTopicScore) {
                    userData.scores[topic.toLowerCase()] = score;
                }
                
                // Add activity
                userData.recentActivity.unshift({
                    topic: topic,
                    action: 'Completed question',
                    timestamp: new Date().toISOString()
                });
                userData.recentActivity = userData.recentActivity.slice(0, 5); // Keep only last 5

                saveUserData(userData);
                
                // Update all displays
                if (typeof updateDashboard === 'function') {
                    updateDashboard();
                } else {
                    // Fallback to individual updates
                    updateScoreDisplay();
                    updateRecentActivityDisplay();
                }
                
                console.log(`Updated user data with new score: ${score}`);
            } catch (error) {
                console.error('Error updating user data:', error);
            }

            messageDiv.innerHTML = `<p class="correct">✅ Correct! Score: ${score}</p>`;

            // Move to next question after delay
            setTimeout(() => {
                currentQuestion++;
                console.log(`Moving to next question: ${currentQuestion + 1}`);
                if (currentQuestion < currentQuiz.length) {
                    displayQuestion();
                } else {
                    console.log('Quiz completed!');
                    quizContainer.innerHTML = `
                        <div class="quiz-completion">
                            <h3>🎉 Quiz Completed!</h3>
                            <p>Final Score: ${score}</p>
                            <button class="btn" onclick="loadQuiz('${topic}')">Try Again</button>
                        </div>
                    `;
                    
                    try {
                        const userData = getUserData() || {
                            scores: {},
                            recentActivity: [],
                            learningStatus: {}
                        };
                        userData.learningStatus[topic.toLowerCase()] = 'Completed';
                        saveUserData(userData);
                        
                        // Update all displays
                        if (typeof updateDashboard === 'function') {
                            updateDashboard();
                        } else {
                            updateLearningStatusDisplay();
                            updateScoreDisplay();
                        }
                        
                        console.log(`Updated learning status to completed for ${topic}`);
                    } catch (error) {
                        console.error('Error updating learning status:', error);
                    }
                }
            }, 1500);
        } else {
            console.log('Incorrect answer');
            // Play wrong sound
            if (wrongSound) {
                wrongSound.currentTime = 0;
                wrongSound.play().catch(err => console.error("Error playing sound:", err));
            }
            messageDiv.innerHTML = `<p class="incorrect">❌ Incorrect! Try again.</p>`;

            // Clear message after delay
            setTimeout(() => {
                messageDiv.innerHTML = "";
            }, 1500);
        }
    }

    displayQuestion();
}

// Initialize displays when the quiz page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Quiz page loaded, initializing displays...');
    if (typeof updateDashboard === 'function') {
        updateDashboard();
    } else {
        // Fallback to individual updates
        updateScoreDisplay();
        updateRecentActivityDisplay();
        updateLearningStatusDisplay();
        loadDailyChallenge();
    }
});

// Remove the event listener for options since we're handling it in the quiz
document.removeEventListener("DOMContentLoaded", function () {
    const options = document.querySelectorAll(".option");
    options.forEach(option => {
        option.removeEventListener("click", function () {});
    });
});

// Function to show the popup
function showPopup(message) {
    const popup = document.createElement("div"); // Create popup element
    popup.classList.add("popup");
    popup.innerText = message;
    
    document.body.appendChild(popup); // Add popup to the page

    setTimeout(() => {
        popup.remove(); // Remove popup after 2 seconds
    }, 2000);
}
