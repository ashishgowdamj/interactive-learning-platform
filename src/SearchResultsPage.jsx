import React from 'react';
import { Link } from 'react-router-dom';
import { topics } from './data/topics'; // Assuming topics data is needed to display lesson details
import './SearchResultsPage.css'; // We will create this CSS file next

function SearchResultsPage({ results, onResultClick }) {
  if (!results) {
    return (
      <div className="search-results-page">
        <h2>Search Results</h2>
        <p>No search results to display. Please try searching from the navigation bar.</p>
      </div>
    );
  }

  const { topics: topicResults, lessons: lessonResults } = results;

  return (
    <div className="search-results-page">
      <h2>Search Results</h2>

      {topicResults.length > 0 && (
        <div className="search-section">
          <h3>Topics</h3>
          <ul>
            {topicResults.map(topic => (
              <li key={topic.id}>
                <Link to={`/topics/${topic.id}`} onClick={() => onResultClick('topic', topic.id)}>
                  {topic.title}
                </Link>
                <p>{topic.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {lessonResults.length > 0 && (
        <div className="search-section">
          <h3>Lessons</h3>
          <ul>
            {lessonResults.map(lesson => (
              <li key={`${lesson.topicId}-${lesson.id}`}>
                <Link 
                  to={`/topics/${lesson.topicId}#lesson-${lesson.id}`}
                  onClick={() => onResultClick('lesson', `${lesson.topicId}-${lesson.id}`)}
                >
                  {lesson.title} ({topics.find(t => t.id === lesson.topicId)?.title})
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {topicResults.length === 0 && lessonResults.length === 0 && (
        <p>No results found for your search.</p>
      )}
    </div>
  );
}

export default SearchResultsPage; 