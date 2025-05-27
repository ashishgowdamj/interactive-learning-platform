import React from 'react';

function SecondaryNavbar({ topics, onTopicSelect }) {
  return (
    <nav className="secondary-navbar">
      <div className="container">
        <ul>
          {topics.map(topic => (
            <li key={topic.id}>
              <a href="#" onClick={() => onTopicSelect(topic.id)}>{topic.title.split(' ')[0]}</a> {/* Using first word of title for brevity, like W3Schools */}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default SecondaryNavbar; 