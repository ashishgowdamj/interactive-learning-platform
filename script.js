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
