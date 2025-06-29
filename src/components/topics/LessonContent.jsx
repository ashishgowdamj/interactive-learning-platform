import React, { useState, useEffect, useRef } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco, tomorrow } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import CodePlayground from '../common/CodePlayground';
import InteractiveExercise from '../common/InteractiveExercise';
import TutorialSteps from '../common/TutorialSteps';
import CodeSnippets from '../common/CodeSnippets';

function LessonContent({ lesson, onComplete, onUpdateProgress, selectedTopicId }) {
  console.log("LessonContent receiving lesson:", lesson);
  console.log("LessonContent receiving onUpdateProgress:", onUpdateProgress);
  
  if (!lesson) return null;

  const [showEditor, setShowEditor] = useState(false);
  const [showExercise, setShowExercise] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [practiceCode, setPracticeCode] = useState(lesson.practiceCode || '');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const outputIframeRef = useRef(null);

  useEffect(() => {
    setShowEditor(false);
    setShowExercise(false);
    setShowTutorial(false);
    setPracticeCode(lesson.practiceCode || '');
  }, [lesson]);

  useEffect(() => {
    const darkMode = document.body.classList.contains('dark-mode');
    setIsDarkMode(darkMode);
  }, []);

  const renderContent = (content) => {
    if (typeof content === 'string') {
      return <p>{content}</p>;
    }

    return content.map((section, index) => {
      switch (section.type) {
        case 'paragraph':
          return <p key={index}>{section.text}</p>;
        case 'heading':
          return <h4 key={index}>{section.text}</h4>;
        case 'code':
          return (
            <div key={index} className="code-example">
              <div className="code-header">
                <span className="code-language">{section.language?.toUpperCase()}</span>
                <button 
                  className="copy-code-btn"
                  onClick={() => navigator.clipboard.writeText(section.code)}
                >
                  📋 Copy
                </button>
              </div>
              <SyntaxHighlighter 
                language={section.language} 
                style={isDarkMode ? tomorrow : docco}
                showLineNumbers={true}
                customStyle={{
                  margin: 0,
                  borderRadius: '0 0 8px 8px',
                  fontSize: '14px'
                }}
              >
                {section.code}
              </SyntaxHighlighter>
            </div>
          );
        case 'list':
          return (
            <ul key={index} className="lesson-list">
              {section.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          );
        case 'note':
          return (
            <div key={index} className="lesson-note">
              <div className="note-icon">💡</div>
              <div className="note-content">
                <strong>Note:</strong> {section.text}
              </div>
            </div>
          );
        case 'warning':
          return (
            <div key={index} className="lesson-warning">
              <div className="warning-icon">⚠️</div>
              <div className="warning-content">
                <strong>Warning:</strong> {section.text}
              </div>
            </div>
          );
        case 'tip':
          return (
            <div key={index} className="lesson-tip">
              <div className="tip-icon">💡</div>
              <div className="tip-content">
                <strong>Tip:</strong> {section.text}
              </div>
            </div>
          );
        default:
          return null;
      }
    });
  };

  // Sample tutorial steps for demonstration
  const tutorialSteps = [
    {
      title: "Understanding the Basics",
      description: "Let's start with the fundamental concepts of this lesson.",
      code: lesson.practiceCode?.split('\n').slice(0, 5).join('\n'),
      task: "Read through the code and understand what each line does."
    },
    {
      title: "Practice Implementation",
      description: "Now let's implement the concepts we just learned.",
      code: lesson.practiceCode,
      task: "Modify the code to add your own example.",
      hint: "Try changing the values or adding new elements."
    },
    {
      title: "Test Your Understanding",
      description: "Let's test what you've learned with a small challenge.",
      task: "Create a variation of the example that demonstrates the same concept.",
      hint: "Think about how you can apply the same principles in a different way."
    }
  ];

  // Sample exercise for demonstration
  const sampleExercise = {
    title: `${lesson.title} Exercise`,
    description: `Practice what you've learned in the ${lesson.title} lesson.`,
    difficulty: lesson.difficulty || 'Beginner',
    language: selectedTopicId === 'react' ? 'javascript' : selectedTopicId,
    startingCode: lesson.practiceCode || '',
    solution: lesson.practiceCode || '',
    requirements: [
      "Follow the lesson concepts",
      "Write clean, readable code",
      "Test your implementation"
    ],
    hint: "Review the lesson content if you need help.",
    validationRules: ["function", "return", "console.log"]
  };

  // Sample code snippets for demonstration
  const codeSnippets = [
    {
      title: "Basic Example",
      description: "A simple example to get you started",
      code: lesson.practiceCode || "// Your code here",
      explanation: "This example demonstrates the basic concepts covered in this lesson.",
      output: "Expected output will appear here"
    },
    {
      title: "Advanced Example",
      description: "A more complex example",
      code: lesson.practiceCode || "// Advanced code here",
      explanation: "This example shows more advanced usage of the concepts.",
      output: "Advanced output example"
    }
  ];

  const runCode = async () => {
    const iframe = outputIframeRef.current;
    if (iframe) {
      const document = iframe.contentDocument || iframe.contentWindow?.document;
      if (document) {
        document.open();
        document.write('');
        document.close();
        
        const codeContentBlock = Array.isArray(lesson.content) ? lesson.content.find(block => block.type === 'code') : null;
        const lessonLanguage = codeContentBlock?.language || lesson.id;
        
        console.log("Determined lesson language:", lessonLanguage);
        
        if (lessonLanguage === 'html') {
          document.open();
          document.write(practiceCode);
          document.close();
        } else if (lessonLanguage === 'css') {
          document.open();
          const htmlContent = `<!DOCTYPE html>\n<html>\n<head>\n  <title>CSS Practice Output</title>\n  <style>\n    body { font-family: Arial, sans-serif; margin: 20px; }\n    ${practiceCode}\n  </style>\n</head>\n<body>\n  <h1>CSS Practice</h1>\n  <p class="example">This is a paragraph with class "example".</p>\n  <div id="demo">This is a div with id "demo".</div>\n  <button class="btn">Button</button>\n</body>\n</html>`;
          document.write(htmlContent);
          document.close();
        } else if (lessonLanguage === 'javascript') {
          document.open();
          const htmlContent = `<!DOCTYPE html>\n<html>\n<head>\n  <title>JavaScript Practice Output</title>\n  <style>body { font-family: Arial, sans-serif; margin: 20px; } #output { background: #f5f5f5; padding: 10px; border-radius: 4px; }</style>\n</head>\n<body>\n  <div id="output"></div>\n  <script>\n    const originalLog = console.log;\n    console.log = function(...args) {\n      document.getElementById('output').innerHTML += args.join(' ') + '<br>';\n      originalLog.apply(console, args);\n    };\n    try {\n      ${practiceCode}\n    } catch(e) {\n      document.getElementById('output').innerHTML += '<span style=\"color:red\">Error: ' + e.message + '</span>';\n    }\n  </script>\n</body>\n</html>`;
          document.write(htmlContent);
          document.close();
        } else if (lessonLanguage === 'python') {
          document.open();
          document.write('<p>Running Python code...</p>');
          document.close();

          try {
            const response = await fetch('http://localhost:5001/execute-python', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ code: practiceCode }),
            });

            const result = await response.json();
            console.log("Python execution result:", result);

            document.open();
            if (result.stdout) {
              document.write(`<pre style="font-family: monospace; background: #f5f5f5; padding: 10px; border-radius: 4px;">${result.stdout}</pre>`);
            } else if (result.stderr) {
              document.write(`<pre style="color: red; font-family: monospace; background: #ffebee; padding: 10px; border-radius: 4px;">${result.stderr}</pre>`);
            } else {
              document.write('<p>No output.</p>');
            }
            document.close();

          } catch (error) {
            console.error('Error executing Python code:', error);
            document.open();
            document.write(`<p style="color: red;">Error connecting to the execution server.</p>`);
            document.close();
          }
        } else {
          document.open();
          const htmlContent = `<!DOCTYPE html>\n<html>\n<head>\n  <title>Code Output</title>\n  <style>body { font-family: Arial, sans-serif; margin: 20px; }</style>\n</head>\n<body>\n  <p>Code execution for ${lessonLanguage ? lessonLanguage.toUpperCase() : 'this language'} is not supported in this browser environment yet.</p>\n  <p>Your practice code is displayed in the editor above.</p>\n</body>\n</html>`;
          document.write(htmlContent);
          document.close();
        }
      }
    }
  };

  return (
    <div className="lesson-content-detailed">
      <div className="lesson-header">
        <h3>{lesson.title}</h3>
        <div className="lesson-meta">
          <span className="duration">⏱️ {lesson.duration}</span>
          <span className="difficulty">📊 {lesson.difficulty}</span>
        </div>
      </div>

      <div className="lesson-body">
        {renderContent(lesson.content)}
      </div>

      <div className="lesson-actions">
        <button 
          className="start-lesson-btn" 
          onClick={() => onUpdateProgress(lesson.id, 'in-progress')}
        >
          📚 Start Lesson
        </button>
        <button 
          className="practice-btn" 
          onClick={() => setShowEditor(!showEditor)}
        >
          💻 Practice Code
        </button>
        <button 
          className="exercise-btn" 
          onClick={() => setShowExercise(!showExercise)}
        >
          🏋️ Interactive Exercise
        </button>
        <button 
          className="tutorial-btn" 
          onClick={() => setShowTutorial(!showTutorial)}
        >
          📖 Step-by-Step Tutorial
        </button>
      </div>

      {showEditor && (
        <div className="practice-section">
          <h4>🔧 Code Playground</h4>
          <CodePlayground
            language={selectedTopicId === 'react' ? 'javascript' : selectedTopicId}
            initialCode={practiceCode}
            onCodeChange={setPracticeCode}
          />
        </div>
      )}

      {showExercise && (
        <div className="exercise-section">
          <h4>🎯 Interactive Exercise</h4>
          <InteractiveExercise
            exercise={sampleExercise}
            onComplete={(success, attempts) => {
              console.log(`Exercise completed: ${success}, attempts: ${attempts}`);
              if (success && onUpdateProgress) {
                onUpdateProgress(lesson.id, 'completed');
              }
            }}
          />
        </div>
      )}

      {showTutorial && (
        <div className="tutorial-section">
          <h4>📚 Step-by-Step Tutorial</h4>
          <TutorialSteps
            steps={tutorialSteps}
            onComplete={() => {
              console.log('Tutorial completed');
              if (onUpdateProgress) {
                onUpdateProgress(lesson.id, 'completed');
              }
            }}
          />
        </div>
      )}

      <div className="code-snippets-section">
        <h4>📝 Code Examples</h4>
        <CodeSnippets
          snippets={codeSnippets}
          language={selectedTopicId === 'react' ? 'javascript' : selectedTopicId}
        />
      </div>

      {lesson.practiceCode && !showEditor && (
        <div className="quick-practice">
          <h4>Quick Practice</h4>
          <div className="practice-editor-section">
            <div className="code-editor-container">
              <textarea
                className="code-editor-textarea"
                value={practiceCode}
                onChange={(e) => setPracticeCode(e.target.value)}
                spellCheck="false"
                autoCapitalize="off"
                autoCorrect="off"
              />
            </div>
            <div className="editor-actions">
              <button className="run-code-btn" onClick={runCode}>
                ▶️ Run Code
              </button>
            </div>
            <div className="code-output">
              <h5>Output</h5>
              <iframe
                ref={outputIframeRef}
                title="Code Output"
                className="output-frame"
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LessonContent;