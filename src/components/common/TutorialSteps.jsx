import React, { useState } from 'react';

function TutorialSteps({ steps, onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const markStepComplete = () => {
    const newCompleted = new Set(completedSteps);
    newCompleted.add(currentStep);
    setCompletedSteps(newCompleted);
    
    if (newCompleted.size === steps.length && onComplete) {
      onComplete();
    }
  };

  const goToStep = (stepIndex) => {
    setCurrentStep(stepIndex);
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="tutorial-steps">
      <div className="steps-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
        <div className="steps-indicators">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`step-indicator ${
                index === currentStep ? 'active' : ''
              } ${
                completedSteps.has(index) ? 'completed' : ''
              }`}
              onClick={() => goToStep(index)}
            >
              {completedSteps.has(index) ? '✓' : index + 1}
            </div>
          ))}
        </div>
      </div>

      <div className="step-content">
        <div className="step-header">
          <h3>Step {currentStep + 1}: {currentStepData.title}</h3>
          <span className="step-counter">{currentStep + 1} of {steps.length}</span>
        </div>

        <div className="step-body">
          <div className="step-description">
            {currentStepData.description}
          </div>

          {currentStepData.code && (
            <div className="step-code">
              <h4>Try this code:</h4>
              <pre><code>{currentStepData.code}</code></pre>
            </div>
          )}

          {currentStepData.task && (
            <div className="step-task">
              <h4>Your task:</h4>
              <p>{currentStepData.task}</p>
            </div>
          )}

          {currentStepData.hint && (
            <details className="step-hint">
              <summary>💡 Need a hint?</summary>
              <p>{currentStepData.hint}</p>
            </details>
          )}
        </div>

        <div className="step-actions">
          <button 
            onClick={prevStep} 
            disabled={currentStep === 0}
            className="step-btn prev-btn"
          >
            ← Previous
          </button>
          
          <button 
            onClick={markStepComplete}
            className={`step-btn complete-btn ${
              completedSteps.has(currentStep) ? 'completed' : ''
            }`}
          >
            {completedSteps.has(currentStep) ? '✓ Completed' : 'Mark Complete'}
          </button>
          
          <button 
            onClick={nextStep} 
            disabled={currentStep === steps.length - 1}
            className="step-btn next-btn"
          >
            Next →
          </button>
        </div>
      </div>

      {completedSteps.size === steps.length && (
        <div className="tutorial-complete">
          <h3>🎉 Tutorial Complete!</h3>
          <p>Great job! You've completed all the steps in this tutorial.</p>
        </div>
      )}
    </div>
  );
}

export default TutorialSteps;