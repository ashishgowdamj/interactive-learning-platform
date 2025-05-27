import React from 'react';
import './index.css'; // Assuming styles for scores are in index.css or will be added

function ScoreDisplay({ scores }) {
  // Calculate total score
  const totalScore = (scores?.html || 0) + (scores?.css || 0) + (scores?.js || 0);

  return (
    <div className="score-display-container"> {/* Use a specific class name */}
      <h4>Your Scores</h4>
      <p>HTML: <span>{scores?.html || 0}</span></p>
      <p>CSS: <span>{scores?.css || 0}</span></p>
      <p>JavaScript: <span>{scores?.js || 0}</span></p>
      <p>Total Score: <span>{totalScore}</span></p>
      {/* We can add a Reset Scores button here later */}
    </div>
  );
}

export default ScoreDisplay; 