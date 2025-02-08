function runCode() {
    let htmlCode = document.getElementById("html-code").value;
    let outputFrame = document.getElementById("output").contentWindow.document;
    outputFrame.open();
    outputFrame.write(htmlCode);
    outputFrame.close();
}

function applyCSS() {
    let cssCode = document.getElementById("css-code").value;
    let outputFrame = document.getElementById("css-output").contentWindow.document;
    outputFrame.open();
    outputFrame.write("<style>" + cssCode + "</style>");
    outputFrame.close();
}

function runJS() {
    let jsCode = document.getElementById("js-code").value;
    let outputFrame = document.getElementById("js-output").contentWindow.document;
    outputFrame.open();
    outputFrame.write("<script>" + jsCode + "</script>");
    outputFrame.close();
}

function resetProgress() {
    localStorage.clear();
    alert("Progress has been reset!");
    location.reload();
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
        const messageDiv = document.createElement("div");
        messageDiv.id = "quiz-message";
        quizContainer.appendChild(messageDiv);
    }

    function checkAnswer(answer, button) {
        const messageDiv = document.getElementById("quiz-message");

        if (answer === currentQuiz[currentQuestion].answer) {
            messageDiv.innerHTML = `<p class="correct">✅ Correct!</p>`;
        } else {
            messageDiv.innerHTML = `<p class="incorrect">❌ Incorrect! Try again.</p>`;
        }

        setTimeout(() => {
            messageDiv.innerHTML = "";
        }, 1500);

        currentQuestion++;
        if (currentQuestion < currentQuiz.length) {
            setTimeout(displayQuestion, 1500);
        } else {
            setTimeout(() => {
                quizContainer.innerHTML = "<h3>🎉 Quiz Completed!</h3>";
            }, 1500);
        }
    }

    displayQuestion();
}
