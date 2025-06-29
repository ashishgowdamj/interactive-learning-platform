import React, { useState, useEffect, useRef } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import LessonContent from './LessonContent';
import ReferenceGuide from '../common/ReferenceGuide';
import { topics } from '../../data/topics';
import { useLocation } from 'react-router-dom';

function TopicContent({ selectedTopicId, topicsData, userData, onUpdateProgress, onStartQuiz }) {
  console.log("TopicContent receiving selectedTopicId:", selectedTopicId);
  const [selectedLessonId, setSelectedLessonId] = useState(null);
  const [lessonProgress, setLessonProgress] = useState({});
  const [showReference, setShowReference] = useState(false);
  const [viewMode, setViewMode] = useState('lessons'); // 'lessons', 'reference', 'overview'
  const lessonRefs = useRef({});
  const location = useLocation();

  const selectedTopic = topicsData.find(topic => topic.id === selectedTopicId);
  console.log("TopicContent found selectedTopic:", selectedTopic);

  useEffect(() => {
    if (userData?.lessonProgress) {
      setLessonProgress(userData.lessonProgress);
    }
  }, [userData]);

  useEffect(() => {
    const hash = location.hash;
    if (hash && !selectedLessonId) {
      const targetElementId = hash.substring(1);
      const targetElement = document.getElementById(targetElementId);
      
      if (targetElement && targetElementId.startsWith('lesson-')) {
         const lessonIdToScrollTo = targetElementId.replace('lesson-', '');
         const lessonToSelect = selectedTopic?.lessons.find(lesson => lesson.id === lessonIdToScrollTo);
         if (lessonToSelect) {
            setSelectedLessonId(lessonIdToScrollTo);
         }

        const navbarHeight = 70;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      } else if (targetElement) {
           targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location, selectedTopic, selectedLessonId]);

  const handleLessonSelect = (lesson) => {
    setSelectedLessonId(lesson.id);
    setViewMode('lessons');
    window.history.pushState(null, '', `#lesson-${lesson.id}`);
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

  // Sample reference data for each topic
  const getReferenceData = (topicId) => {
    const referenceMap = {
      html: [
        {
          name: '<div>',
          category: 'Elements',
          description: 'Defines a division or section in an HTML document',
          syntax: '<div>content</div>',
          parameters: [
            { name: 'class', type: 'string', description: 'CSS class name' },
            { name: 'id', type: 'string', description: 'Unique identifier' }
          ],
          examples: [
            { code: '<div class="container">Hello World</div>', description: 'Basic div with class' }
          ],
          notes: ['Block-level element', 'Can contain other elements']
        },
        {
          name: '<p>',
          category: 'Elements',
          description: 'Defines a paragraph',
          syntax: '<p>text content</p>',
          examples: [
            { code: '<p>This is a paragraph.</p>', description: 'Simple paragraph' }
          ]
        },
        {
          name: '<a>',
          category: 'Elements',
          description: 'Creates a hyperlink',
          syntax: '<a href="URL">link text</a>',
          parameters: [
            { name: 'href', type: 'string', required: true, description: 'URL of the link' },
            { name: 'target', type: 'string', description: 'Where to open the link' }
          ],
          examples: [
            { code: '<a href="https://example.com">Visit Example</a>', description: 'External link' }
          ]
        }
      ],
      css: [
        {
          name: 'color',
          category: 'Text',
          description: 'Sets the color of text',
          syntax: 'color: value;',
          examples: [
            { code: 'color: red;', description: 'Red text' },
            { code: 'color: #ff0000;', description: 'Red text using hex' }
          ]
        },
        {
          name: 'display',
          category: 'Layout',
          description: 'Specifies the display behavior of an element',
          syntax: 'display: value;',
          examples: [
            { code: 'display: block;', description: 'Block-level element' },
            { code: 'display: flex;', description: 'Flexible box layout' }
          ]
        }
      ],
      js: [
        {
          name: 'console.log()',
          category: 'Console',
          description: 'Outputs a message to the console',
          syntax: 'console.log(message)',
          parameters: [
            { name: 'message', type: 'any', required: true, description: 'The message to log' }
          ],
          examples: [
            { code: 'console.log("Hello World");', description: 'Log a string' },
            { code: 'console.log(42);', description: 'Log a number' }
          ]
        },
        {
          name: 'Array.push()',
          category: 'Array',
          description: 'Adds one or more elements to the end of an array',
          syntax: 'array.push(element1, element2, ...)',
          parameters: [
            { name: 'element', type: 'any', required: true, description: 'Elements to add' }
          ],
          examples: [
            { code: 'arr.push(5);', description: 'Add single element' }
          ]
        }
      ],
      python: [
        {
          name: 'print()',
          category: 'Built-in Functions',
          description: 'Prints objects to the console',
          syntax: 'print(*objects, sep=" ", end="\\n")',
          parameters: [
            { name: 'objects', type: 'any', description: 'Objects to print' },
            { name: 'sep', type: 'string', description: 'Separator between objects' },
            { name: 'end', type: 'string', description: 'String appended after the last object' }
          ],
          examples: [
            { code: 'print("Hello World")', description: 'Print a string' },
            { code: 'print(1, 2, 3, sep="-")', description: 'Print with custom separator' }
          ]
        },
        {
          name: 'len()',
          category: 'Built-in Functions',
          description: 'Returns the length of an object',
          syntax: 'len(object)',
          parameters: [
            { name: 'object', type: 'sequence or collection', required: true, description: 'Object to measure' }
          ],
          examples: [
            { code: 'len("hello")', description: 'Length of string (returns 5)' },
            { code: 'len([1, 2, 3])', description: 'Length of list (returns 3)' }
          ]
        }
      ],
      react: [
        {
          name: 'useState',
          category: 'Hooks',
          description: 'Hook for managing state in functional components',
          syntax: 'const [state, setState] = useState(initialState)',
          parameters: [
            { name: 'initialState', type: 'any', description: 'Initial state value' }
          ],
          examples: [
            { code: 'const [count, setCount] = useState(0);', description: 'Counter state' }
          ]
        },
        {
          name: 'useEffect',
          category: 'Hooks',
          description: 'Hook for performing side effects in functional components',
          syntax: 'useEffect(effect, dependencies)',
          parameters: [
            { name: 'effect', type: 'function', required: true, description: 'Effect function' },
            { name: 'dependencies', type: 'array', description: 'Dependency array' }
          ],
          examples: [
            { code: 'useEffect(() => { console.log("mounted"); }, []);', description: 'Run once on mount' }
          ]
        }
      ]
    };
    return referenceMap[topicId] || [];
  };

  if (!selectedTopic || typeof selectedTopic !== 'object' || !selectedTopic.id) {
    console.error("TopicContent received invalid selectedTopic:", selectedTopicId);
    return (
      <div className="topic-content-placeholder">
            <h2>Topic Not Found</h2>
            <p>The selected topic could not be loaded. Please return to the home page.</p>
      </div>
    );
  }

  const topic = selectedTopic;
  const selectedLesson = topic?.lessons.find(lesson => lesson.id === selectedLessonId);
  const completedLessons = topic.lessons.filter(lesson => 
    lessonProgress[lesson.id]?.status === 'completed'
  ).length;
  const progressPercentage = (completedLessons / topic.lessons.length) * 100;

  return (
    <div className="topic-content">
      <div className="topic-header">
        <div className="topic-title-section">
          <div className="topic-icon" style={{ color: topic.color }}>
            {topic.icon}
          </div>
          <div className="topic-info">
            <h2>{topic.title}</h2>
            <p>{topic.description}</p>
            <div className="topic-meta">
              <span className="difficulty">📊 {topic.difficulty}</span>
              <span className="duration">⏱️ {topic.estimatedTime}</span>
              <span className="progress">📈 {Math.round(progressPercentage)}% Complete</span>
            </div>
          </div>
        </div>
        
        <div className="topic-progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      <div className="topic-navigation">
        <button 
          className={`nav-btn ${viewMode === 'lessons' ? 'active' : ''}`}
          onClick={() => setViewMode('lessons')}
        >
          📚 Lessons
        </button>
        <button 
          className={`nav-btn ${viewMode === 'reference' ? 'active' : ''}`}
          onClick={() => setViewMode('reference')}
        >
          📖 Reference
        </button>
        <button 
          className={`nav-btn ${viewMode === 'overview' ? 'active' : ''}`}
          onClick={() => setViewMode('overview')}
        >
          📊 Overview
        </button>
      </div>

      {viewMode === 'lessons' && (
        <div className="lessons-container">
          <div className="lessons-list">
            <h3>📚 Lessons ({completedLessons}/{topic.lessons.length})</h3>
            {topic.lessons.map((lesson) => {
              const progress = lessonProgress[lesson.id];
              return (
                <div
                  key={lesson.id}
                  id={`lesson-${lesson.id}`}
                  className={`lesson-item ${selectedLessonId === lesson.id ? 'active' : ''} ${progress?.status || ''}`}
                  onClick={() => handleLessonSelect(lesson)}
                  ref={el => lessonRefs.current[lesson.id] = el}
                >
                  <div className="lesson-status-icon">
                    {progress?.status === 'completed' ? '✅' : 
                     progress?.status === 'in-progress' ? '🔄' : 
                     progress?.status === 'viewed' ? '👁️' : '⭕'}
                  </div>
                  <div className="lesson-details">
                    <h4>{lesson.title}</h4>
                    <div className="lesson-meta">
                      <span className="duration">⏱️ {lesson.duration}</span>
                      <span className="difficulty">📊 {lesson.difficulty}</span>
                      {progress && (
                        <span className={`progress-status ${progress.status}`}>
                          {progress.status}
                        </span>
                      )}
                    </div>
                    <p className="lesson-description">{lesson.description}</p>
                  </div>
                </div>
              );
            })}
            
            {topic.quiz && topic.quiz.length > 0 && (
               <button 
                 className="start-quiz-btn" 
                 onClick={() => onStartQuiz(topic.id)}
               >
                 🎯 Start Quiz ({topic.quiz.length} questions)
               </button>
            )}
          </div>

          <div className="lesson-content">
            {selectedLesson ? (
              <LessonContent 
                lesson={selectedLesson}
                onComplete={() => updateLessonProgress(selectedLesson.id, 'completed')}
                onUpdateProgress={onUpdateProgress}
                selectedTopicId={selectedTopicId}
              />
            ) : (
              <div className="select-lesson-message">
                <div className="welcome-content">
                  <h3>Welcome to {topic.title}! 👋</h3>
                  <p>Select a lesson from the left to begin your learning journey.</p>
                  <div className="topic-stats">
                    <div className="stat">
                      <strong>{topic.lessons.length}</strong>
                      <span>Lessons</span>
                    </div>
                    <div className="stat">
                      <strong>{topic.quiz?.length || 0}</strong>
                      <span>Quiz Questions</span>
                    </div>
                    <div className="stat">
                      <strong>{completedLessons}</strong>
                      <span>Completed</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {viewMode === 'reference' && (
        <div className="reference-container">
          <ReferenceGuide 
            references={getReferenceData(selectedTopicId)}
            title={`${topic.title} Reference Guide`}
          />
        </div>
      )}

      {viewMode === 'overview' && (
        <div className="overview-container">
          <div className="overview-content">
            <h3>📊 Learning Overview</h3>
            
            <div className="overview-stats">
              <div className="stat-card">
                <div className="stat-icon">📚</div>
                <div className="stat-info">
                  <h4>Total Lessons</h4>
                  <p>{topic.lessons.length}</p>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">✅</div>
                <div className="stat-info">
                  <h4>Completed</h4>
                  <p>{completedLessons}</p>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">🎯</div>
                <div className="stat-info">
                  <h4>Progress</h4>
                  <p>{Math.round(progressPercentage)}%</p>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">⏱️</div>
                <div className="stat-info">
                  <h4>Est. Time</h4>
                  <p>{topic.estimatedTime}</p>
                </div>
              </div>
            </div>

            <div className="lesson-overview">
              <h4>📋 Lesson Progress</h4>
              <div className="lessons-grid">
                {topic.lessons.map((lesson, index) => {
                  const progress = lessonProgress[lesson.id];
                  return (
                    <div 
                      key={lesson.id} 
                      className={`lesson-card ${progress?.status || 'not-started'}`}
                      onClick={() => {
                        setViewMode('lessons');
                        handleLessonSelect(lesson);
                      }}
                    >
                      <div className="lesson-number">{index + 1}</div>
                      <div className="lesson-title">{lesson.title}</div>
                      <div className="lesson-status">
                        {progress?.status === 'completed' ? '✅ Completed' : 
                         progress?.status === 'in-progress' ? '🔄 In Progress' : 
                         progress?.status === 'viewed' ? '👁️ Viewed' : '⭕ Not Started'}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {topic.quiz && topic.quiz.length > 0 && (
              <div className="quiz-overview">
                <h4>🎯 Quiz Information</h4>
                <div className="quiz-info">
                  <p>Test your knowledge with {topic.quiz.length} carefully crafted questions.</p>
                  <button 
                    className="start-quiz-btn" 
                    onClick={() => onStartQuiz(topic.id)}
                  >
                    🎯 Take Quiz
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default TopicContent;