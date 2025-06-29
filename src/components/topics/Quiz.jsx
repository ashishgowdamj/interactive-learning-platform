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
  const [userAnswers, setUserAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds per question
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const questions = topic.quiz;
  const currentQuestion = questions[currentQuestionIndex];

  // Timer effect
  useEffect(() => {
    if (!showResults && !showFeedback) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleNextQuestion();
            return 30;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [currentQuestionIndex, showResults, showFeedback]);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    setUserAnswers({ ...userAnswers, [currentQuestion.id]: answer });
    
    // Show feedback
    const isCorrect = answer === currentQuestion.correctAnswer;
    setIsAnswerCorrect(isCorrect);
    setShowFeedback(true);
    
    // Auto-advance after 1.5 seconds
    setTimeout(() => {
      setShowFeedback(false);
      if (currentQuestionIndex < questions.length - 1) {
        handleNextQuestion();
      } else {
        handleSubmitQuiz();
      }
    }, 1500);
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setTimeLeft(30);
    setIsAnswerCorrect(null);
    setShowFeedback(false);
  };

  const handleSubmitQuiz = () => {
    let finalScore = 0;
    questions.forEach(question => {
      if (userAnswers[question.id] === question.correctAnswer) {
        finalScore++;
      }
    });
    
    setShowResults(true);
    onComplete(finalScore, topic.id);
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setUserAnswers({});
    setShowResults(false);
    setTimeLeft(30);
    setIsAnswerCorrect(null);
    setShowFeedback(false);
  };

  // Calculate progress percentage
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="quiz-container">
      <button className="quiz-close-button" onClick={onClose}>
        <span className="close-icon">×</span>
      </button>

      {showResults ? (
        <div className="quiz-results">
          <h3>Quiz Results</h3>
          <div className="score-circle">
            <span className="score">
              {Object.values(userAnswers).filter(answer => 
                questions.find(q => q.id === Object.keys(userAnswers).find(key => userAnswers[key] === answer)).correctAnswer === answer
              ).length} / {questions.length}
            </span>
          </div>
          
          <div className="question-review">
            {questions.map((question, index) => (
              <div 
                key={question.id} 
                className={`question-review-item ${userAnswers[question.id] === question.correctAnswer ? 'correct' : 'incorrect'}`}
              >
                <h4>Question {index + 1}</h4>
                <p>{question.question}</p>
                <div className="answer-review">
                  <p>Your answer: {userAnswers[question.id]}</p>
                  <p>Correct answer: {question.correctAnswer}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="quiz-actions">
            <button onClick={handleRestartQuiz}>Restart Quiz</button>
            <button onClick={onClose}>Close</button>
          </div>
        </div>
      ) : (
        <div className="question-container">
          <div className="quiz-progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <div className="quiz-header">
            <div className="quiz-progress">
              Question {currentQuestionIndex + 1} of {questions.length}
            </div>
            <div className="quiz-timer">
              Time Left: {timeLeft}s
            </div>
          </div>

          <h3>{currentQuestion.question}</h3>
          
          <div className={`answers-list ${showFeedback ? 'show-feedback' : ''}`}>
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                className={`answer-option ${
                  selectedAnswer === option ? 'selected' : ''
                } ${
                  showFeedback && option === currentQuestion.correctAnswer ? 'correct' : ''
                } ${
                  showFeedback && selectedAnswer === option && option !== currentQuestion.correctAnswer ? 'incorrect' : ''
                }`}
                onClick={() => handleAnswerSelect(option)}
                disabled={selectedAnswer !== null}
              >
                {option}
              </button>
            ))}
          </div>

          {showFeedback && (
            <div className={`feedback-message ${isAnswerCorrect ? 'correct' : 'incorrect'}`}>
              {isAnswerCorrect ? 'Correct!' : 'Incorrect!'}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Quiz;