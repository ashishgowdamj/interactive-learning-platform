import React, { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco, tomorrow } from 'react-syntax-highlighter/dist/esm/styles/hljs';

function CodeSnippets({ snippets, language = 'javascript' }) {
  const [activeSnippet, setActiveSnippet] = useState(0);
  const [copied, setCopied] = useState(false);
  const [theme, setTheme] = useState('light');

  const copyToClipboard = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const currentSnippet = snippets[activeSnippet];

  return (
    <div className="code-snippets">
      <div className="snippets-header">
        <div className="snippet-tabs">
          {snippets.map((snippet, index) => (
            <button
              key={index}
              className={`snippet-tab ${index === activeSnippet ? 'active' : ''}`}
              onClick={() => setActiveSnippet(index)}
            >
              {snippet.title}
            </button>
          ))}
        </div>
        <div className="snippet-controls">
          <button
            className="theme-toggle"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <button
            className="copy-btn"
            onClick={() => copyToClipboard(currentSnippet.code)}
          >
            {copied ? '✓ Copied!' : '📋 Copy'}
          </button>
        </div>
      </div>

      <div className="snippet-content">
        {currentSnippet.description && (
          <div className="snippet-description">
            <p>{currentSnippet.description}</p>
          </div>
        )}

        <div className="code-container">
          <SyntaxHighlighter
            language={language}
            style={theme === 'light' ? docco : tomorrow}
            showLineNumbers={true}
            wrapLines={true}
            customStyle={{
              margin: 0,
              borderRadius: '8px',
              fontSize: '14px'
            }}
          >
            {currentSnippet.code}
          </SyntaxHighlighter>
        </div>

        {currentSnippet.explanation && (
          <div className="snippet-explanation">
            <h4>Explanation:</h4>
            <p>{currentSnippet.explanation}</p>
          </div>
        )}

        {currentSnippet.output && (
          <div className="snippet-output">
            <h4>Expected Output:</h4>
            <pre className="output-preview">{currentSnippet.output}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default CodeSnippets;