import React from 'react';

const SearchResults = ({ results, onResultClick }) => {
  if (!results || (!results.topics?.length && !results.lessons?.length)) {
    return (
      <div className="search-results">
        <h3>No results found</h3>
        <p>Try different search terms or browse through the topics.</p>
      </div>
    );
  }

  return (
    <div className="search-results">
      <h3>Search Results</h3>
      
      {results.topics?.length > 0 && (
        <div className="search-section">
          <h4>Topics</h4>
          {results.topics.map((topic) => (
            <div
              key={topic.id}
              className="search-result-item"
              onClick={() => onResultClick('topic', topic.id)}
            >
              <h5>{topic.title}</h5>
              <p>{topic.description}</p>
            </div>
          ))}
        </div>
      )}

      {results.lessons?.length > 0 && (
        <div className="search-section">
          <h4>Lessons</h4>
          {results.lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="search-result-item"
              onClick={() => onResultClick('lesson', lesson.id)}
            >
              <h5>{lesson.title}</h5>
              <p>{lesson.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults; 