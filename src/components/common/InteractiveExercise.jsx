import React, { useState } from 'react';
import CodePlayground from './CodePlayground';

function InteractiveExercise({ exercise, onComplete }) {
  const [userCode, setUserCode] = useState(exercise.startingCode || '');
  const [isCorrect, setIsCorrect] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const checkSolution = () => {
    setAttempts(attempts + 1);
    
    // Simple solution checking - in a real app, you'd have more sophisticated validation
    const userCodeNormalized = userCode.toLowerCase().replace(/\s+/g, ' ').trim();
    const solutionNormalized = exercise.solution.toLowerCase().replace(/\s+/g, ' ').trim();
    
    if (userCodeNormalized.includes(solutionNormalized) || 
        exercise.validationRules?.some(rule => userCodeNormalized.includes(rule.toLowerCase()))) {
      setIsCorrect(true);
      setFeedback('🎉 Excellent! You solved the exercise correctly!');
      if (onComplete) {
        onComplete(true, attempts + 1);
      }
    } else {
      setIsCorrect(false);
      setFeedback('Not quite right. Try again! Check the requirements carefully.');
      
      // Show hint after 3 attempts
      if (attempts >= 2 && exercise.hint) {
        setShowHint(true);
      }
    }
  };

  const resetExercise = () => {
    setUserCode(exercise.startingCode || '');
    setIsCorrect(false);
    setFeedback('');
    setShowHint(false);
    setAttempts(0);
  };

  return (
    <div className="interactive-exercise">
      <div className="exercise-header">
        <h3>{exercise.title}</h3>
        <div className="exercise-meta">
          <span className="difficulty">Difficulty: {exercise.difficulty}</span>
          <span className="attempts">Attempts: {attempts}</span>
        </div>
      </div>

      <div className="exercise-description">
        <p>{exercise.description}</p>
        
        {exercise.requirements && (
          <div className="requirements">
            <h4>Requirements:</h4>
            <ul>
              {exercise.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {showHint && exercise.hint && (
        <div className="exercise-hint">
          <h4>💡 Hint:</h4>
          <p>{exercise.hint}</p>
        </div>
      )}

      <div className="exercise-playground">
        <CodePlayground
          language={exercise.language}
          initialCode={userCode}
          onCodeChange={setUserCode}
        />
      </div>

      <div className="exercise-actions">
        <button 
          className="check-btn"
          onClick={checkSolution}
          disabled={!userCode.trim()}
        >
          Check Solution
        </button>
        <button 
          className="reset-btn"
          onClick={resetExercise}
        >
          Reset
        </button>
        {exercise.showSolution && (
          <button 
            className="solution-btn"
            onClick={() => setUserCode(exercise.solution)}
          >
            Show Solution
          </button>
        )}
      </div>

      {feedback && (
        <div className={`exercise-feedback ${isCorrect ? 'success' : 'error'}`}>
          {feedback}
        </div>
      )}

      {isCorrect && (
        <div className="exercise-success">
          <h4>🏆 Exercise Completed!</h4>
          <p>Great work! You can now move on to the next lesson.</p>
        </div>
      )}
    </div>
  );
}

export default InteractiveExercise;