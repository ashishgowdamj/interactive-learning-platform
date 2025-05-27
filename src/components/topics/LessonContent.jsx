import React, { useState, useEffect, useRef } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import CodeEditor from './CodeEditor';

function LessonContent({ lesson, onComplete, onUpdateProgress, selectedTopicId }) {
  console.log("LessonContent receiving lesson:", lesson);
  console.log("LessonContent receiving onUpdateProgress:", onUpdateProgress);
  if (!lesson) return null;

  const [showEditor, setShowEditor] = useState(false);
  const [practiceCode, setPracticeCode] = useState(lesson.practiceCode || '');
  const outputIframeRef = useRef(null);

  useEffect(() => {
    setShowEditor(false);
    setPracticeCode(lesson.practiceCode || '');
  }, [lesson]);

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
              <SyntaxHighlighter language={section.language} style={docco}>
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
              <strong>Note:</strong> {section.text}
            </div>
          );
        default:
          return null;
      }
    });
  };

  const runCode = () => {
    const iframe = outputIframeRef.current;
    if (iframe) {
      const document = iframe.contentDocument || iframe.contentWindow?.document;
      if (document) {
        document.open();
        
        // Debug logging
        console.log("Full lesson object:", lesson);
        console.log("Practice code:", practiceCode);
        
        // Determine language based on content
        let lessonLanguage;
        if (practiceCode.includes('<!DOCTYPE html>') || practiceCode.includes('<html>')) {
          lessonLanguage = 'html';
        } else if (practiceCode.includes('{') && practiceCode.includes('}') && practiceCode.includes(':')) {
          lessonLanguage = 'css';
        } else if (practiceCode.includes('function') || practiceCode.includes('const') || practiceCode.includes('let')) {
          lessonLanguage = 'javascript';
        }
        
        console.log("Determined lesson language from content:", lessonLanguage);
        let htmlContent = '';

        if (lessonLanguage === 'html') {
          htmlContent = practiceCode;
        } else if (lessonLanguage === 'css') {
          htmlContent = `<!DOCTYPE html>\n<html>\n<head>\n  <title>CSS Practice Output</title>\n  <style>\n    ${practiceCode}\n  </style>\n</head>\n<body>\n  <h1>CSS Practice</h1>\n  <p>This is a paragraph to style.</p>\n  <div>Another element.</div>\n</body>\n</html>`;
        } else if (lessonLanguage === 'javascript') {
          htmlContent = `<!DOCTYPE html>\n<html>\n<head>\n  <title>JavaScript Practice Output</title>\n</head>\n<body>\n  <p id="output">Output will appear here or in console.</p>\n  <script>\n    ${practiceCode}\n  </script>\n</body>\n</html>`;
        }

        console.log("Generated HTML content for iframe:", htmlContent);

        document.write(htmlContent);
        document.close();
      }
    }
  };

  return (
    <div className="lesson-content-detailed">
      <h3>{lesson.title}</h3>
      {renderContent(lesson.content)}
      <div className="lesson-actions">
        <button className="start-lesson-btn" onClick={() => onUpdateProgress(lesson.id, 'in-progress')}>Start Lesson</button>
        <button className="practice-btn" onClick={() => setShowEditor(!showEditor)}>Practice Exercise</button>
      </div>

      {showEditor && (
        <div className="practice-editor-section" style={{ marginTop: '20px' }}>
          <h4>Practice Your Code</h4>
          <CodeEditor
            initialCode={practiceCode}
            onCodeChange={setPracticeCode}
            language={lesson.language || lesson.topicId}
          />
          <div className="editor-actions" style={{ marginTop: '10px' }}>
            <button className="run-code-btn" onClick={runCode}>Run Code</button>
          </div>
          <div className="code-output" style={{ marginTop: '20px' }}>
            <h4>Output</h4>
            <iframe
              ref={outputIframeRef}
              title="Code Output"
              style={{ width: '100%', height: '200px', border: '1px solid #e0e0e0' }}
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}

export default LessonContent; 