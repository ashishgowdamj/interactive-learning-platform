const quizData = {
    html: [
        { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"], answer: "Hyper Text Markup Language" },
        { question: "Which tag is used for creating a hyperlink?", options: ["<a>", "<link>", "<href>"], answer: "<a>" }
    ],
    css: [
        { question: "What does CSS stand for?", options: ["Cascading Style Sheets", "Creative Style Sheets", "Computer Style System"], answer: "Cascading Style Sheets" },
        { question: "Which property changes text color in CSS?", options: ["color", "text-color", "font-color"], answer: "color" },
        { question: "Which property is used to change the background color?", options: ["color", "bg-color", "background-color"], answer: "background-color" }
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
        if (answer === currentQuiz[currentQuestion].answer) {
            alert("Correct!");
        } else {
            alert("Incorrect! Try again.");
        }
        currentQuestion++;
        if (currentQuestion < currentQuiz.length) {
            displayQuestion();
        } else {
            quizContainer.innerHTML = "<h3>Quiz Completed!</h3>";
        }
    }

    displayQuestion();
}