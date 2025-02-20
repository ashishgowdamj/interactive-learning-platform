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

        //function for quiz appearing vertical
        currentQuiz[currentQuestion].options.forEach(option => {
            let button = document.createElement("button");
            button.innerText = option;
            button.classList.add("quiz-option"); // Add class for styling
            button.onclick = () => checkAnswer(option, button);
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
