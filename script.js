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
    outputFrame.write("<style>" + cssCode + "</style><h2>This is a CSS Output Preview</h2>");
    outputFrame.close();
}

function runJS() {
    let jsCode = document.getElementById("js-code").value;
    let outputFrame = document.getElementById("js-output").contentWindow.document;

    outputFrame.open();
    outputFrame.write("<script>" + jsCode + "<\/script>");
    outputFrame.close();
}

// Progress Tracking
function markCompleted(topic) {
    localStorage.setItem(topic + "_completed", "true");
    alert(topic.toUpperCase() + " lesson marked as completed!");
}

function checkProgress() {
    if (localStorage.getItem("html_completed")) {
        document.getElementById("html-status").innerText = "✔ Completed";
    }
    if (localStorage.getItem("css_completed")) {
        document.getElementById("css-status").innerText = "✔ Completed";
    }
    if (localStorage.getItem("js_completed")) {
        document.getElementById("js-status").innerText = "✔ Completed";
    }
}

window.onload = checkProgress;

//reset 

function resetProgress() {
    localStorage.removeItem("html_completed");
    localStorage.removeItem("css_completed");
    localStorage.removeItem("js_completed");
    alert("Progress has been reset!");
    location.reload();  // Reload the page to reflect the changes
}

function calculateProgress() {
    const totalLessons = 3; // HTML, CSS, JavaScript
    let completedLessons = 0;

    if (localStorage.getItem("html_completed")) completedLessons++;
    if (localStorage.getItem("css_completed")) completedLessons++;
    if (localStorage.getItem("js_completed")) completedLessons++;

    const progress = (completedLessons / totalLessons) * 100;
    return progress.toFixed(0); // Round to the nearest whole number
}

function updateDashboard() {
    const htmlProgress = localStorage.getItem("html_completed") ? "100%" : "0%";
    const cssProgress = localStorage.getItem("css_completed") ? "100%" : "0%";
    const jsProgress = localStorage.getItem("js_completed") ? "100%" : "0%";

    document.getElementById("html-progress").innerText = htmlProgress;
    document.getElementById("css-progress").innerText = cssProgress;
    document.getElementById("js-progress").innerText = jsProgress;
}

window.onload = function () {
    checkProgress();
    updateDashboard();
};

const darkModeToggle = document.getElementById("dark-mode-toggle");
const body = document.body;

// Check if dark mode is enabled in localStorage
if (localStorage.getItem("dark-mode") === "enabled") {
    body.classList.add("dark-mode");
    darkModeToggle.innerText = "☀️ Light Mode";
}else {
    darkModeToggle.innerText = "🌙 Dark Mode";
}

// Toggle dark mode
darkModeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    if (body.classList.contains("dark-mode")) {
        localStorage.setItem("dark-mode", "enabled");
        darkModeToggle.innerText = "☀️ Light Mode";
    } else {
        localStorage.setItem("dark-mode", "disabled");
        darkModeToggle.innerText = "🌙 Dark Mode";
    }
});

function updateProgressBars() {
    const htmlProgress = localStorage.getItem("html_completed") ? 100 : 0;
    const cssProgress = localStorage.getItem("css_completed") ? 100 : 0;
    const jsProgress = localStorage.getItem("js_completed") ? 100 : 0;

    document.getElementById("html-progress-bar").style.width = `${htmlProgress}%`;
    document.getElementById("css-progress-bar").style.width = `${cssProgress}%`;
    document.getElementById("js-progress-bar").style.width = `${jsProgress}%`;

    document.getElementById("html-progress-text").innerText = `${htmlProgress}%`;
    document.getElementById("css-progress-text").innerText = `${cssProgress}%`;
    document.getElementById("js-progress-text").innerText = `${jsProgress}%`;
}

window.onload = function () {
    checkProgress();
    updateProgressBars();
};

let editor;

function initializeEditor(mode) {
    editor = CodeMirror(document.getElementById("code-editor"), {
        mode: mode,
        lineNumbers: true,
        theme: "default",
        value: mode === "htmlmixed" ? "<h1>Hello, World!</h1>" :
               mode === "css" ? "body { background-color: lightblue; }" :
               "alert('Hello, World!');"
    });
}

// Call this function in each lesson page with the appropriate mode
// For example, in html.html:
// initializeEditor("htmlmixed");
function runCode() {
    let htmlCode = editor.getValue();
    let outputFrame = document.getElementById("output").contentWindow.document;
    outputFrame.open();
    outputFrame.write(htmlCode);
    outputFrame.close();
}

function applyCSS() {
    let cssCode = editor.getValue();
    let outputFrame = document.getElementById("css-output").contentWindow.document;
    outputFrame.open();
    outputFrame.write("<style>" + cssCode + "</style><h2>This is a CSS Output Preview</h2>");
    outputFrame.close();
}

function runJS() {
    let jsCode = editor.getValue();
    let outputFrame = document.getElementById("js-output").contentWindow.document;
    outputFrame.open();
    outputFrame.write("<script>" + jsCode + "<\/script>");
    outputFrame.close();
}

document.getElementById("feedback-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const feedbackMessage = document.getElementById("feedback-message").value;
    alert("Thank you for your feedback!");
    document.getElementById("feedback-form").reset();
});

