import React, { useState, useEffect } from 'react';

function Quiz({ topic, onComplete, onClose }) {
  console.log("Quiz component rendering");
  console.log("Quiz received topic:", topic);

  // Check if topic and topic.quiz exist before trying to access quiz questions
  if (!topic || !topic.quiz || topic.quiz.length === 0) {
    console.error("Quiz component received invalid or empty topic/quiz data.", topic);
    // Optionally render an error message or close the modal
    return (
      <div className="quiz-error">
        <p>Could not load quiz questions for this topic.</p>
        <button onClick={onClose}>Close</button>
      </div>
    );
  }

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [userAnswers, setUserAnswers] = useState({}); // To store user's selected answer for each question

  const questions = topic.quiz; // Use the quiz array from the topic prop
  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    // Store the user's answer for the current question
    setUserAnswers({ ...userAnswers, [currentQuestion.id]: answer });
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null); // Reset selected answer for the next question
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleSubmitQuiz = () => {
    // Calculate score based on userAnswers after submission
    let finalScore = 0;
    questions.forEach(question => {
      if (userAnswers[question.id] === question.correctAnswer) {
        finalScore++;
      }
    });
    
    // Set showResults to true and pass the final score and topic ID
    setShowResults(true);
    onComplete(finalScore, topic.id); // Call onComplete prop with final score and topic ID
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    // Reset userAnswers and showResults
    setUserAnswers({});
    setShowResults(false);
    // No need to reset score state as it's calculated on submit
  };

  return (
    <div className="quiz-container">
      <button className="quiz-close-button" onClick={onClose}>&times;</button>

      {showResults ? (
        <div className="quiz-results">
          <h3>Your Score: {Object.values(userAnswers).filter(answer => questions.find(q => q.id === Object.keys(userAnswers).find(key => userAnswers[key] === answer)).correctAnswer === answer).length} / {questions.length}</h3>
          {/* Optionally show review of questions/answers here */}
           <button onClick={handleRestartQuiz}>Restart Quiz</button>
           <button onClick={onClose}>Close</button>
      </div>
      ) : (
      <div className="question-container">
          <div className="quiz-progress">Question {currentQuestionIndex + 1} of {questions.length}</div>
          <h3>{currentQuestion.question}</h3>
        <div className="answers-list">
            {currentQuestion.options.map((option, index) => (
              <button
              key={index}
                className={`answer-option ${selectedAnswer === option ? 'selected' : ''}`}
                onClick={() => handleAnswerSelect(option)}
                disabled={selectedAnswer !== null} // Disable other options once one is selected
              >
                {option}
              </button>
          ))}
        </div>
      <div className="quiz-navigation">
            {currentQuestionIndex < questions.length - 1 ? (
              <button onClick={handleNextQuestion} disabled={selectedAnswer === null}>Next</button>
        ) : (
              <button onClick={handleSubmitQuiz} disabled={selectedAnswer === null}>Submit</button>
        )}
      </div>
        </div>
      )}
    </div>
  );
}

export default Quiz; 