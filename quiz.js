const quizData = [
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
];

let currentQuestion = 0;

function loadQuiz() {
    const quizContainer = document.getElementById("quiz-container");
    const questionEl = document.createElement("h3");
    questionEl.innerText = quizData[currentQuestion].question;
    
    quizContainer.innerHTML = "";
    quizContainer.appendChild(questionEl);
    
    quizData[currentQuestion].options.forEach(option => {
        let button = document.createElement("button");
        button.innerText = option;
        button.onclick = () => checkAnswer(option);
        quizContainer.appendChild(button);
    });
}

let score = 0;

function checkAnswer(answer) {
    if (answer === quizData[currentQuestion].answer) {
        score++;
        alert("Correct!");
    } else {
        alert("Incorrect! Try again.");
    }
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuiz();
    } else {
        document.getElementById("quiz-container").innerHTML = `<h3>Quiz Completed! Your score: ${score}/${quizData.length}</h3>`;
    }
}



