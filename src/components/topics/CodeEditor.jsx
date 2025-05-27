import React, { useState } from 'react';

function CodeEditor({
  initialCode = '',
  onCodeChange,
  language = 'html' // Default language
}) {
  const [code, setCode] = useState(initialCode);

  const handleChange = (event) => {
    setCode(event.target.value);
    if (onCodeChange) {
      onCodeChange(event.target.value);
    }
  };

  return (
    <div className="code-editor-container">
      <textarea
        className="code-editor-textarea"
        value={code}
        onChange={handleChange}
        spellCheck="false"
        autoCapitalize="off"
        autoCorrect="off"
        data-language={language} // Can be used for syntax highlighting later
      />
    </div>
  );
}

export default CodeEditor; 