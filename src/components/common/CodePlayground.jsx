import React, { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';

function CodePlayground({ language = 'html', initialCode = '', onCodeChange }) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [theme, setTheme] = useState('vs-light');
  const outputRef = useRef(null);

  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  const handleEditorChange = (value) => {
    setCode(value || '');
    if (onCodeChange) {
      onCodeChange(value || '');
    }
  };

  const runCode = async () => {
    setIsRunning(true);
    
    try {
      if (language === 'html') {
        runHTMLCode();
      } else if (language === 'css') {
        runCSSCode();
      } else if (language === 'javascript') {
        runJavaScriptCode();
      } else if (language === 'python') {
        await runPythonCode();
      } else if (language === 'react') {
        runReactCode();
      }
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const runHTMLCode = () => {
    const iframe = outputRef.current;
    if (iframe) {
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (doc) {
        doc.open();
        doc.write(code);
        doc.close();
      }
    }
  };

  const runCSSCode = () => {
    const iframe = outputRef.current;
    if (iframe) {
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (doc) {
        const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    ${code}
  </style>
</head>
<body>
  <h1>CSS Preview</h1>
  <p class="example">This is a paragraph with class "example".</p>
  <div id="demo">This is a div with id "demo".</div>
  <button class="btn">Button</button>
  <ul>
    <li>List item 1</li>
    <li>List item 2</li>
    <li>List item 3</li>
  </ul>
</body>
</html>`;
        doc.open();
        doc.write(htmlContent);
        doc.close();
      }
    }
  };

  const runJavaScriptCode = () => {
    const iframe = outputRef.current;
    if (iframe) {
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (doc) {
        const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    #output { background: #f5f5f5; padding: 10px; border-radius: 4px; margin-top: 10px; }
    .console-log { margin: 5px 0; padding: 5px; background: white; border-left: 3px solid #007bff; }
  </style>
</head>
<body>
  <h3>JavaScript Output</h3>
  <div id="output"></div>
  <script>
    const originalLog = console.log;
    const outputDiv = document.getElementById('output');
    
    console.log = function(...args) {
      const logDiv = document.createElement('div');
      logDiv.className = 'console-log';
      logDiv.textContent = args.join(' ');
      outputDiv.appendChild(logDiv);
      originalLog.apply(console, args);
    };
    
    try {
      ${code}
    } catch (error) {
      const errorDiv = document.createElement('div');
      errorDiv.style.color = 'red';
      errorDiv.textContent = 'Error: ' + error.message;
      outputDiv.appendChild(errorDiv);
    }
  </script>
</body>
</html>`;
        doc.open();
        doc.write(htmlContent);
        doc.close();
      }
    }
  };

  const runPythonCode = async () => {
    try {
      const response = await fetch('http://localhost:5001/execute-python', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      const result = await response.json();
      
      const iframe = outputRef.current;
      if (iframe) {
        const doc = iframe.contentDocument || iframe.contentWindow?.document;
        if (doc) {
          let content = '<h3>Python Output</h3>';
          if (result.stdout) {
            content += `<pre style="background: #f5f5f5; padding: 10px; border-radius: 4px;">${result.stdout}</pre>`;
          }
          if (result.stderr) {
            content += `<pre style="background: #ffebee; color: #c62828; padding: 10px; border-radius: 4px;">${result.stderr}</pre>`;
          }
          if (!result.stdout && !result.stderr) {
            content += '<p>No output</p>';
          }
          
          doc.open();
          doc.write(`
<!DOCTYPE html>
<html>
<head>
  <style>body { font-family: Arial, sans-serif; margin: 20px; }</style>
</head>
<body>${content}</body>
</html>`);
          doc.close();
        }
      }
    } catch (error) {
      const iframe = outputRef.current;
      if (iframe) {
        const doc = iframe.contentDocument || iframe.contentWindow?.document;
        if (doc) {
          doc.open();
          doc.write(`
<!DOCTYPE html>
<html>
<head>
  <style>body { font-family: Arial, sans-serif; margin: 20px; }</style>
</head>
<body>
  <h3>Python Output</h3>
  <p style="color: red;">Error: Could not connect to Python execution server.</p>
</body>
</html>`);
          doc.close();
        }
      }
    }
  };

  const runReactCode = () => {
    const iframe = outputRef.current;
    if (iframe) {
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (doc) {
        const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    .error { color: red; background: #ffebee; padding: 10px; border-radius: 4px; }
  </style>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
    try {
      ${code}
      
      const root = ReactDOM.createRoot(document.getElementById('root'));
      root.render(<App />);
    } catch (error) {
      document.getElementById('root').innerHTML = 
        '<div class="error">Error: ' + error.message + '</div>';
    }
  </script>
</body>
</html>`;
        doc.open();
        doc.write(htmlContent);
        doc.close();
      }
    }
  };

  const clearOutput = () => {
    const iframe = outputRef.current;
    if (iframe) {
      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (doc) {
        doc.open();
        doc.write('');
        doc.close();
      }
    }
  };

  const formatCode = () => {
    // Basic code formatting - in a real app, you'd use a proper formatter
    let formatted = code;
    if (language === 'html') {
      // Basic HTML formatting
      formatted = formatted.replace(/></g, '>\n<');
    } else if (language === 'css') {
      // Basic CSS formatting
      formatted = formatted.replace(/;/g, ';\n').replace(/{/g, ' {\n').replace(/}/g, '\n}\n');
    }
    setCode(formatted);
  };

  return (
    <div className="code-playground">
      <div className="playground-header">
        <div className="playground-controls">
          <button 
            className="run-btn" 
            onClick={runCode} 
            disabled={isRunning}
          >
            {isRunning ? '⏳ Running...' : '▶️ Run Code'}
          </button>
          <button className="clear-btn" onClick={clearOutput}>
            🗑️ Clear
          </button>
          <button className="format-btn" onClick={formatCode}>
            ✨ Format
          </button>
          <select 
            value={theme} 
            onChange={(e) => setTheme(e.target.value)}
            className="theme-selector"
          >
            <option value="vs-light">Light Theme</option>
            <option value="vs-dark">Dark Theme</option>
          </select>
        </div>
      </div>
      
      <div className="playground-content">
        <div className="editor-section">
          <h4>Code Editor ({language.toUpperCase()})</h4>
          <div className="editor-container">
            <Editor
              height="400px"
              language={language === 'react' ? 'javascript' : language}
              value={code}
              onChange={handleEditorChange}
              theme={theme}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: 'on',
                roundedSelection: false,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 2,
                wordWrap: 'on'
              }}
            />
          </div>
        </div>
        
        <div className="output-section">
          <h4>Output</h4>
          <div className="output-container">
            <iframe
              ref={outputRef}
              title="Code Output"
              className="output-frame"
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CodePlayground;