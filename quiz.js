const quizData = {
    html: [
        { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"], answer: "Hyper Text Markup Language" },
        { question: "Which tag is used for creating a hyperlink?", options: ["<a>", "<link>", "<href>"], answer: "<a>" }
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
        { question: "Which keyword is used to declare a variable in JavaScript?", options: ["var", "int", "string"], answer: "var" },
        { question: "Which function is used to print in JavaScript?", options: ["console.log()", "print()", "echo()"], answer: "console.log()" }
    ]
};

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
            button.onclick = () => checkAnswer(option);
            quizContainer.appendChild(button);
        });
    }

    function checkAnswer(answer) {
        const quizContainer = document.getElementById(`${topic}-quiz-container`);
    
        // Remove old feedback if it exists
        let existingMessage = document.getElementById("quiz-message");
        if (existingMessage) existingMessage.remove();
    
        // Create a new message element
        let messageDiv = document.createElement("div");
        messageDiv.id = "quiz-message";
    
        if (answer === quizData[topic][currentQuestion].answer) {
            messageDiv.innerHTML = `<p class="correct">✅ Correct!</p>`;
    
            // Increase score based on topic
            let currentScore = parseInt(localStorage.getItem(topic + "Score") || 0);
            localStorage.setItem(topic + "Score", currentScore + 10); // Add 10 points per correct answer
        } else {
            messageDiv.innerHTML = `<p class="incorrect">❌ Incorrect! Try again.</p>`;
        }
    
        // Append the message below the question
        quizContainer.appendChild(messageDiv);
    
        // Move to next question after a delay
        setTimeout(() => {
            messageDiv.remove(); // Remove feedback message
    
            currentQuestion++; // Move to next question
            if (currentQuestion < quizData[topic].length) {
                displayQuestion(); // Show next question
            } else {
                quizContainer.innerHTML = "<h3>🎉 Quiz Completed!</h3>";
            }
        }, 1500);
    }
    

    displayQuestion();
}

document.addEventListener("DOMContentLoaded", function () {
    const options = document.querySelectorAll(".option"); // Select all answer options

    options.forEach(option => {
        option.addEventListener("click", function () {
            const isCorrect = this.getAttribute("data-correct") === "true"; // Check correct answer

            if (!isCorrect) {
                showPopup("Wrong Answer! Try again."); // Show popup for incorrect answers
            }
        });
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
