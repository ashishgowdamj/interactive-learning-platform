import React, { useState } from 'react';

function ReferenceGuide({ references, title = "Reference Guide" }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedItems, setExpandedItems] = useState(new Set());

  const categories = ['all', ...new Set(references.map(ref => ref.category))];
  
  const filteredReferences = references.filter(ref => {
    const matchesSearch = ref.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ref.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || ref.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleExpanded = (id) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  return (
    <div className="reference-guide">
      <div className="reference-header">
        <h3>{title}</h3>
        <div className="reference-controls">
          <input
            type="text"
            placeholder="Search references..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-filter"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="reference-list">
        {filteredReferences.map((ref, index) => (
          <div key={index} className="reference-item">
            <div 
              className="reference-summary"
              onClick={() => toggleExpanded(index)}
            >
              <div className="reference-info">
                <h4>{ref.name}</h4>
                <p className="reference-description">{ref.description}</p>
                <span className="reference-category">{ref.category}</span>
              </div>
              <div className="expand-icon">
                {expandedItems.has(index) ? '▼' : '▶'}
              </div>
            </div>

            {expandedItems.has(index) && (
              <div className="reference-details">
                {ref.syntax && (
                  <div className="syntax-section">
                    <h5>Syntax:</h5>
                    <code className="syntax-code">{ref.syntax}</code>
                  </div>
                )}

                {ref.parameters && (
                  <div className="parameters-section">
                    <h5>Parameters:</h5>
                    <ul>
                      {ref.parameters.map((param, i) => (
                        <li key={i}>
                          <strong>{param.name}</strong>
                          {param.type && <span className="param-type"> ({param.type})</span>}
                          {param.required && <span className="param-required"> *required</span>}
                          {param.description && <span> - {param.description}</span>}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {ref.examples && (
                  <div className="examples-section">
                    <h5>Examples:</h5>
                    {ref.examples.map((example, i) => (
                      <div key={i} className="example-item">
                        <pre><code>{example.code}</code></pre>
                        {example.description && <p className="example-description">{example.description}</p>}
                      </div>
                    ))}
                  </div>
                )}

                {ref.notes && (
                  <div className="notes-section">
                    <h5>Notes:</h5>
                    <ul>
                      {ref.notes.map((note, i) => (
                        <li key={i}>{note}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {ref.relatedMethods && (
                  <div className="related-section">
                    <h5>Related:</h5>
                    <div className="related-methods">
                      {ref.relatedMethods.map((method, i) => (
                        <span key={i} className="related-method">{method}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredReferences.length === 0 && (
        <div className="no-results">
          <p>No references found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
}

export default ReferenceGuide;