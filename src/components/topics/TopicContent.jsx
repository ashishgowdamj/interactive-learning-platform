import React, { useState, useEffect } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import LessonContent from './LessonContent';
import { topics } from '../../data/topics'; // Import topics data

function TopicContent({ selectedTopicId, topicsData, userData, onUpdateProgress, onStartQuiz }) {
  console.log("TopicContent receiving selectedTopicId:", selectedTopicId);
  const [selectedLessonId, setSelectedLessonId] = useState(null);
  const [lessonProgress, setLessonProgress] = useState({});

  // Find the selected topic using the passed ID and topicsData
  const selectedTopic = topicsData.find(topic => topic.id === selectedTopicId);
  console.log("TopicContent found selectedTopic:", selectedTopic);

  useEffect(() => {
    if (userData?.lessonProgress) {
      setLessonProgress(userData.lessonProgress);
    }
  }, [userData]);

  const handleLessonSelect = (lesson) => {
    setSelectedLessonId(lesson.id);
    // Mark lesson as viewed when selected from the list
    updateLessonProgress(lesson.id, 'viewed');
  };

  const updateLessonProgress = async (lessonId, status) => {
    const newProgress = {
      ...lessonProgress,
      [lessonId]: {
        status,
        lastUpdated: new Date().toISOString()
      }
    };

    setLessonProgress(newProgress);
    
    if (onUpdateProgress) {
      onUpdateProgress(newProgress);
    }
  };

  // Ensure selectedTopic is a valid object before proceeding
  if (!selectedTopic || typeof selectedTopic !== 'object' || !selectedTopic.id) {
    console.error("TopicContent received invalid selectedTopic:", selectedTopicId);
    // Instead of rendering buttons, maybe display an error message or redirect
    // For now, return null or a simple message as TopicPage handles redirect if topicId is invalid
    return (
      <div className="topic-content-placeholder">
            <h2>Topic Not Found</h2>
            <p>The selected topic could not be loaded. Please return to the home page.</p>
      </div>
    );
  }

  const topic = selectedTopic; // selectedTopic is already the found topic object

  // Find the selected lesson object
  const selectedLesson = topic?.lessons.find(lesson => lesson.id === selectedLessonId);

  return (
    <div className="topic-content">
      <div className="topic-header">
        <h2>{topic.title}</h2>
        <p>{topic.description}</p>
      </div>

      <div className="lessons-container">
        <div className="lessons-list">
          <h3>Lessons</h3>
          {topic.lessons.map((lesson) => {
            const progress = lessonProgress[lesson.id];
            return (
              <div
                key={lesson.id}
                className={`lesson-item ${selectedLessonId === lesson.id ? 'active' : ''} ${progress?.status || ''}`}
                onClick={() => handleLessonSelect(lesson)}
              >
                <h4>{lesson.title}</h4>
                <div className="lesson-meta">
                  <span className="duration">{lesson.duration}</span>
                  <span className="difficulty">{lesson.difficulty}</span>
                  {progress && (
                    <span className={`progress-status ${progress.status}`}>
                      {progress.status}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
          {/* Start Quiz Button */}
          {topic.quiz && topic.quiz.length > 0 && (
             <button className="start-lesson-btn" onClick={() => onStartQuiz(topic.id)} style={{ marginTop: '20px' }}>
               Start Quiz
             </button>
          )}
        </div>

        <div className="lesson-content">
          {selectedLesson ? (
            <LessonContent 
              lesson={selectedLesson}
              onComplete={() => updateLessonProgress(selectedLesson.id, 'completed')}
              onUpdateProgress={onUpdateProgress}
            />
          ) : (
            <div className="select-lesson-message">
              <p>Select a lesson to begin learning</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TopicContent; 