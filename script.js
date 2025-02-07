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
    alert(topic.toUpperCase() + " lesson marked as completed!");
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

// Dark Mode Toggle
const darkModeToggle = document.getElementById("dark-mode-toggle");
const body = document.body;

// Check if dark mode is enabled in localStorage
if (localStorage.getItem("dark-mode") === "enabled") {
    body.classList.add("dark-mode");
    darkModeToggle.innerText = "☀️ Light Mode";
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

