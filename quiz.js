const quizData = {
    html: [
        {
            question: "What does HTML stand for?",
            options: ["HyperText Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"],
            answer: "HyperText Markup Language"
        },
        {
            question: "Which tag is used to create a hyperlink?",
            options: ["<a>", "<link>", "<href>"],
            answer: "<a>"
        }
    ],
    css: [
        {
            question: "What does CSS stand for?",
            options: ["Cascading Style Sheets", "Creative Style Sheets", "Computer Style System"],
            answer: "Cascading Style Sheets"
        },
        {
            question: "Which property is used to change text color in CSS?",
            options: ["color", "text-color", "font-color"],
            answer: "color"
        }
    ],
    js: [
        {
            question: "What is JavaScript used for?",
            options: ["Styling web pages", "Adding interactivity to web pages", "Creating databases"],
            answer: "Adding interactivity to web pages"
        },
        {
            question: "Which keyword is used to declare a variable in JavaScript?",
            options: ["var", "let", "both var and let"],
            answer: "both var and let"
        }
    ]
};

let currentQuestion = 0;
let currentTopic = "";

function loadQuiz(topic) {
    currentTopic = topic;
    currentQuestion = 0;
    showQuestion();
}

function showQuestion() {
    const quizContainer = document.getElementById("quiz-container");
    const questionEl = document.createElement("h3");
    questionEl.innerText = quizData[currentTopic][currentQuestion].question;
    
    quizContainer.innerHTML = "";
    quizContainer.appendChild(questionEl);
    
    quizData[currentTopic][currentQuestion].options.forEach(option => {
        let button = document.createElement("button");
        button.innerText = option;
        button.onclick = () => checkAnswer(option);
        quizContainer.appendChild(button);
    });
}

function checkAnswer(answer) {
    if (answer === quizData[currentTopic][currentQuestion].answer) {
        alert("Correct!");
    } else {
        alert("Incorrect! Try again.");
    }
    currentQuestion++;
    if (currentQuestion < quizData[currentTopic].length) {
        showQuestion();
    } else {
        document.getElementById("quiz-container").innerHTML = "<h3>Quiz Completed!</h3>";
    }
}