import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Breadcrumb from './components/layout/Breadcrumb';
import LoadingSpinner from './components/common/LoadingSpinner';
import TopicContent from './components/topics/TopicContent';
import Quiz from './components/topics/Quiz';
import SearchResults from './components/common/SearchResults';
import { topics } from './data/topics';
import './App.css';
import './index.css';
import { Routes, Route, Navigate, useNavigate, useParams, useLocation } from 'react-router-dom';
import SearchResultsPage from './SearchResultsPage';

function App() {
  const [userData, setUserData] = useState({
    firstName: 'Guest',
    email: 'guest@example.com',
    scores: { html: 0, css: 0, js: 0, python: 0, react: 0 },
    recentActivity: [],
    learningStatus: { 
      html: 'Not started', 
      css: 'Not started', 
      js: 'Not started',
      python: 'Not started',
      react: 'Not started'
    },
    streak: 0,
    lastActivityDate: null,
    lessonProgress: {},
    preferences: {
      theme: 'light',
      notifications: true,
      emailUpdates: false
    },
    achievements: [],
    totalLessonsCompleted: 0,
    totalQuizzesTaken: 0,
    averageQuizScore: 0
  });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizTopicId, setQuizTopicId] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/search') {
      setSearchResults(null);
    }
  }, [location.pathname]);

  useEffect(() => {
    // Load data from localStorage
    const savedData = localStorage.getItem('learningData');
    if (savedData) {
      setUserData(JSON.parse(savedData));
    }
  }, []);

  const saveUserData = (data) => {
    localStorage.setItem('learningData', JSON.stringify(data));
  };

  const updateLessonProgressInApp = (newLessonProgress) => {
    const updatedLessonId = Object.keys(newLessonProgress).find(
      lessonId => newLessonProgress[lessonId].status === 'completed' &&
      (!userData.lessonProgress[lessonId] || userData.lessonProgress[lessonId].status !== 'completed')
    );

    if (updatedLessonId) {
      let lessonDetails = null;
      let topicTitle = '';
      
      for (const topic of topics) {
        const lesson = topic.lessons.find(l => l.id === updatedLessonId);
        if (lesson) {
          lessonDetails = lesson;
          topicTitle = topic.title;
          break;
        }
      }

      if (lessonDetails) {
        const activity = {
          type: 'lesson',
          title: lessonDetails.title,
          description: `Completed lesson in ${topicTitle}`,
          timestamp: new Date().toISOString()
        };

        const completedLessons = Object.values(newLessonProgress).filter(
          progress => progress.status === 'completed'
        ).length;

        const newAchievements = [];
        if (completedLessons === 1 && !userData.achievements?.includes('first-lesson')) {
          newAchievements.push('first-lesson');
        }
        if (completedLessons === 10 && !userData.achievements?.includes('lesson-master')) {
          newAchievements.push('lesson-master');
        }

        const updatedUserData = {
          ...userData,
          lessonProgress: newLessonProgress,
          recentActivity: [
            activity,
            ...(userData.recentActivity || []).slice(0, 9)
          ],
          totalLessonsCompleted: completedLessons,
          achievements: [...(userData.achievements || []), ...newAchievements]
        };

        setUserData(updatedUserData);
        saveUserData(updatedUserData);
        return;
      }
    }

    setUserData(prevUserData => ({ ...prevUserData, lessonProgress: newLessonProgress }));
    saveUserData({ ...userData, lessonProgress: newLessonProgress });
  };

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', !isDarkMode);
  };

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setSearchResults(null);
      navigate('/');
      return;
    }

    const results = {
      topics: [],
      lessons: []
    };

    topics.forEach(topic => {
      if (topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (topic.description && topic.description.toLowerCase().includes(searchTerm.toLowerCase()))) {
        results.topics.push(topic);
      }

      if (topic.lessons) {
        topic.lessons.forEach(lesson => {
          const lessonMatch = 
             lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
             (lesson.description && lesson.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
             (lesson.content && 
              (Array.isArray(lesson.content) 
                 ? lesson.content.some(block => block.type === 'paragraph' && block.text.toLowerCase().includes(searchTerm.toLowerCase()))
                 : typeof lesson.content === 'string' && lesson.content.toLowerCase().includes(searchTerm.toLowerCase())
              ));

          if (lessonMatch) {
             if (!results.lessons.some(l => l.id === lesson.id && l.topicId === topic.id)) {
              results.lessons.push({
                ...lesson,
                topicId: topic.id
              });
            }
          }
        });
      }
    });

    setSearchResults(results);
    navigate('/search');
  };

  const handleResultClick = (type, id) => {
    setSearchResults(null);
    if (type === 'topic') {
      navigate(`/topics/${id}`);
    } else if (type === 'lesson') {
      const [topicId, lessonId] = id.split('-');
      navigate(`/topics/${topicId}#lesson-${lessonId}`);
    }
  };

  const onStartQuiz = (topicId) => {
    setQuizTopicId(topicId);
    setShowQuiz(true);
  };

  const handleQuizComplete = (score, topicId) => {
    if (topicId) {
      const newScores = { ...userData.scores, [topicId]: score };
      
      const topic = topics.find(t => t.id === topicId);
      const activity = {
        type: 'quiz',
        title: `${topic?.title} Quiz`,
        description: `Scored ${score}% on the quiz`,
        timestamp: new Date().toISOString()
      };

      const totalQuizzes = (userData.totalQuizzesTaken || 0) + 1;
      const currentTotal = (userData.averageQuizScore || 0) * (userData.totalQuizzesTaken || 0);
      const newAverage = Math.round((currentTotal + score) / totalQuizzes);

      const newAchievements = [];
      if (score === 100 && !userData.achievements?.includes('perfect-score')) {
        newAchievements.push('perfect-score');
      }
      if (totalQuizzes === 5 && !userData.achievements?.includes('quiz-master')) {
        newAchievements.push('quiz-master');
      }

      const updatedUserData = {
        ...userData,
        scores: newScores,
        recentActivity: [
          activity,
          ...(userData.recentActivity || []).slice(0, 9)
        ],
        totalQuizzesTaken: totalQuizzes,
        averageQuizScore: newAverage,
        achievements: [...(userData.achievements || []), ...newAchievements]
      };
      
      setUserData(updatedUserData);
      saveUserData(updatedUserData);
    }
  };

  return (
    <div className="app">
      <Navbar
        userData={userData}
        onSearch={handleSearch}
        onToggleDarkMode={toggleDarkMode}
        isDarkMode={isDarkMode}
      />
      
      <main className="main-content">
        <Routes>
          <Route
            path="/search"
            element={
              <SearchResultsPage 
                results={searchResults} 
                onResultClick={handleResultClick}
              />
            }
          />
          <Route
            path="/"
            element={
              <MainContent
                userData={userData}
                searchResults={searchResults}
                onResultClick={handleResultClick}
                onUpdateProgress={updateLessonProgressInApp}
                onStartQuiz={onStartQuiz}
              />
            }
          />
          <Route
             path="/topics/:topicId"
             element={
                 <TopicPage
                    userData={userData}
                    onUpdateProgress={updateLessonProgressInApp}
                    onStartQuiz={onStartQuiz}
                 />
             }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />

      {showQuiz && quizTopicId && (
        <div className="quiz-overlay">
          <div className="quiz-modal">
            <Quiz
              topic={topics.find(t => t.id === quizTopicId)}
              onComplete={handleQuizComplete}
              onClose={() => setShowQuiz(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function MainContent({
     userData,
     searchResults,
     onResultClick,
     onUpdateProgress,
     onStartQuiz
    }) {
    const navigate = useNavigate();

    return (
      <div className="fade-in">
        {searchResults ? (
          <SearchResults
            results={searchResults}
            onResultClick={onResultClick}
          />
        ) : (
          <>
            {/* Hero Section */}
            <section className="hero-section">
              <div className="hero-content">
                <h1>Learn to code — for free.</h1>
                <p className="subtitle">
                  Build projects. Earn certifications. Since 2011, millions of people have used our platform to learn the technical skills they need.
                </p>
                <div className="hero-cta">
                  <button className="cta-button" onClick={() => navigate('/topics/html')}>
                    Start coding now
                  </button>
                  <button className="cta-button secondary">
                    Browse catalog
                  </button>
                </div>
              </div>
            </section>

            {/* Courses Section */}
            <section className="courses-section">
              <div className="courses-container">
                <div className="section-header">
                  <h2>Popular courses</h2>
                  <p>Choose from our most popular programming languages and tools</p>
                </div>
                
                <div className="course-grid">
                  {topics.map(topic => {
                    const completedLessons = topic.lessons.filter(lesson => 
                      userData?.lessonProgress?.[lesson.id]?.status === 'completed'
                    ).length;
                    const progressPercentage = (completedLessons / topic.lessons.length) * 100;
                    
                    return (
                      <div
                        key={topic.id}
                        className="course-card"
                        onClick={() => navigate(`/topics/${topic.id}`)}
                        style={{ '--course-color': topic.color, '--course-color-hover': topic.color + 'dd' }}
                      >
                        <div className="course-header">
                          <div className="course-icon-wrapper">
                            <div className="course-icon">{topic.icon}</div>
                            <h3 className="course-title">{topic.title}</h3>
                          </div>
                          <p className="course-description">{topic.description}</p>
                          <div className="course-meta">
                            <span className="meta-item">
                              <span>📊</span> {topic.difficulty}
                            </span>
                            <span className="meta-item">
                              <span>⏱</span> {topic.estimatedTime}
                            </span>
                            <span className="meta-item">
                              <span>📚</span> {topic.lessons.length} lessons
                            </span>
                          </div>
                        </div>
                        
                        <div className="course-body">
                          <div className="progress-section">
                            <div className="progress-label">
                              <span className="progress-text">Progress</span>
                              <span className="progress-percentage">{Math.round(progressPercentage)}%</span>
                            </div>
                            <div className="progress-bar">
                              <div 
                                className="progress-fill" 
                                style={{ width: `${progressPercentage}%` }}
                              />
                            </div>
                          </div>
                          
                          <div className="course-footer">
                            <span className="lesson-count">
                              <span>✓</span> {completedLessons} of {topic.lessons.length}
                            </span>
                            <button className="continue-button">
                              {progressPercentage > 0 ? (
                                <>
                                  <span>▶</span> Continue
                                </>
                              ) : (
                                <>
                                  <span>▶</span> Start
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Stats Section */}
            <section className="stats-section">
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">📚</div>
                  <div className="stat-number">{userData?.totalLessonsCompleted || 0}</div>
                  <div className="stat-label">Lessons</div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">🎯</div>
                  <div className="stat-number">{userData?.totalQuizzesTaken || 0}</div>
                  <div className="stat-label">Quizzes</div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">📊</div>
                  <div className="stat-number">{userData?.averageQuizScore || 0}%</div>
                  <div className="stat-label">Avg Score</div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">🔥</div>
                  <div className="stat-number">{userData?.streak || 0}</div>
                  <div className="stat-label">Streak</div>
                </div>
              </div>
            </section>

            {/* Recent Activity */}
            {userData?.recentActivity && userData.recentActivity.length > 0 && (
              <section className="activity-section">
                <div className="activity-container">
                  <div className="section-header">
                    <h2>Recent Activity</h2>
                    <p>Keep track of your learning progress</p>
                  </div>
                  <div className="activity-list">
                    {userData.recentActivity.slice(0, 4).map((activity, index) => (
                      <div key={index} className="activity-item">
                        <div className="activity-icon">
                          {activity.type === 'lesson' ? '📚' : 
                           activity.type === 'quiz' ? '🎯' : '📅'}
                        </div>
                        <div className="activity-content">
                          <div className="activity-title">{activity.title}</div>
                          <div className="activity-description">{activity.description}</div>
                        </div>
                        <div className="activity-time">
                          {new Date(activity.timestamp).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Achievements */}
            {userData?.achievements && userData.achievements.length > 0 && (
              <section className="achievements-section">
                <div className="section-header">
                  <h2>Your Achievements</h2>
                  <p>Celebrate your learning milestones</p>
                </div>
                <div className="achievements-grid">
                  {userData.achievements.map((achievement, index) => (
                    <div key={index} className="achievement-badge">
                      {achievement === 'first-lesson' && <>🎓 First Lesson</>}
                      {achievement === 'lesson-master' && <>📚 Lesson Master</>}
                      {achievement === 'perfect-score' && <>💯 Perfect Score</>}
                      {achievement === 'quiz-master' && <>🎯 Quiz Master</>}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    );
}

function TopicPage({
    userData,
    onUpdateProgress,
    onStartQuiz
}) {
    const { topicId } = useParams();
    const navigate = useNavigate();

    const selectedTopic = topics.find(topic => topic.id === topicId);

    useEffect(() => {
        if (!selectedTopic && topicId) {
            navigate('/', { replace: true });
        }
    }, [selectedTopic, topicId, navigate]);

    if (selectedTopic) {
        return (
            <div className="fade-in">
                <TopicContent
                    selectedTopicId={topicId}
                    topicsData={topics}
                    userData={userData}
                    onUpdateProgress={onUpdateProgress}
                    onStartQuiz={onStartQuiz}
                />
            </div>
        );
    } else {
        return null;
    }
}

export default App;