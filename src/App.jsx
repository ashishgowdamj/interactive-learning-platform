import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from './firebase';
import { auth, onAuthStateChanged, logout } from './auth';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import ScoreDisplay from './ScoreDisplay';
import ProgressCircle from './ProgressCircle';
import DailyChallenge from './DailyChallenge';
import MotivationalQuote from './MotivationalQuote';
import Navbar from './components/layout/Navbar';
import SecondaryNavbar from './components/layout/SecondaryNavbar';
import LoadingSpinner from './components/common/LoadingSpinner';
import TopicContent from './components/topics/TopicContent';
import Quiz from './components/topics/Quiz';
import SearchResults from './components/common/SearchResults';
import { topics } from './data/topics';
import './App.css';
import './index.css'; // Ensure index.css styles are included
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useParams } from 'react-router-dom';

function App() {
  const [userData, setUserData] = useState(null);
  const [loadingUserData, setLoadingUserData] = useState(true);
  const [userDataError, setUserDataError] = useState(null);
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [showSignup, setShowSignup] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizTopicId, setQuizTopicId] = useState(null);

  const toggleShowSignup = () => {
    setShowSignup(prevState => !prevState);
    setUserDataError(null);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoadingAuth(false);
    });
    return () => unsubscribe();
  }, []); // Depend only on authentication state

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        setUserData(null);
        setLoadingUserData(false);
        return;
      }

      try {
        setLoadingUserData(true);
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          console.log("User data fetched:", userDocSnap.data());
          setUserData(userDocSnap.data());
        } else {
          console.log("No user data found, creating initial data.");
          const initialData = {
            scores: { html: 0, css: 0, js: 0 },
            recentActivity: [],
            learningStatus: { html: 'Not started', css: 'Not started', js: 'Not started' },
            streak: 0,
            lastActivityDate: null,
            lessonProgress: {}
          };
          await setDoc(userDocRef, initialData);
          setUserData(initialData);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setUserDataError(err);
      } finally {
        setLoadingUserData(false);
      }
    };

    fetchUserData();
  }, [user]); // Depend on user object

  const saveUserData = async (data) => {
    if (!user) return;
    try {
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, data, { merge: true });
      console.log("User data saved.");
    } catch (err) {
      console.error("Error saving user data:\n", err);
    }
  };

  const updateLessonProgressInApp = async (newLessonProgress) => {
    setUserData(prevUserData => ({ ...prevUserData, lessonProgress: newLessonProgress }));
    await saveUserData({ lessonProgress: newLessonProgress });
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
      return;
    }

    const results = {
      topics: [],
      lessons: []
    };

    topics.forEach(topic => {
      if (topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          topic.description.toLowerCase().includes(searchTerm.toLowerCase())) {
        results.topics.push(topic);
      }

      topic.lessons.forEach(lesson => {
        if (lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (lesson.description && lesson.description.toLowerCase().includes(searchTerm.toLowerCase()))) {
          if(!results.lessons.some(l => l.id === lesson.id && l.topicId === topic.id)) {
          results.lessons.push({
            ...lesson,
            topicId: topic.id
          });
        }
        }
        if (lesson.content) {
           if (Array.isArray(lesson.content) && lesson.content.every(block => typeof block.text === 'string')) {
           const contentString = lesson.content.map(block => block.text).join(' ').toLowerCase();
               if(contentString.includes(searchTerm.toLowerCase())) {
                  if(!results.lessons.some(l => l.id === lesson.id && l.topicId === topic.id)) {
                     results.lessons.push({
                        ...lesson,
                        topicId: topic.id
                     });
                  }
               }
           } else if (typeof lesson.content === 'string') {
               if(lesson.content.toLowerCase().includes(searchTerm.toLowerCase())) {
                  if(!results.lessons.some(l => l.id === lesson.id && l.topicId === topic.id)) {
                 results.lessons.push({
                    ...lesson,
                    topicId: topic.id
                 });
              }
           }
        }
        }
      });
    });

    setSearchResults(results);
  };

  const handleResultClick = (type, id) => {
    console.log('handleResultClick called with type:', type, 'id:', id);
    if (type === 'topic') {
      // Navigate to the topic page
    } else if (type === 'lesson') {
      const lesson = searchResults.lessons.find(l => l.id === id);
      if (lesson) {
        // This might require navigating to the topic page and then scrolling or highlighting the lesson
        // For simplicity now, let's just navigate to the topic page
        // TODO: Implement scrolling or highlighting lesson
      } else {
         console.error('Lesson not found in search results with id:', id);
      }
    }
    setSearchResults(null); // Clear search results after clicking a result
  };

  const onStartQuiz = (topicId) => {
    setQuizTopicId(topicId);
    setShowQuiz(true);
  };

  const handleQuizComplete = async (score, topicId) => {
    console.log('Quiz completed for topic:', topicId, 'with score:', score);
    
    if (user && userData && topicId) {
      const newScores = { ...userData.scores, [topicId]: score };
      const updatedUserData = { ...userData, scores: newScores };
      
      setUserData(updatedUserData); // Update state immediately
      await saveUserData(updatedUserData); // Save to Firebase
      console.log('Quiz score saved.');
    }
  };

  if (loadingAuth) {
    return <LoadingSpinner message="Loading authentication..." />;
  }

  if (!user) {
    return showSignup ? (
      <SignupPage onSignupSuccess={toggleShowSignup} onToggleLogin={toggleShowSignup} />
    ) : (
      <LoginPage onLoginSuccess={() => setUser(auth.currentUser)} onToggleSignup={toggleShowSignup} />
    );
  }

  if (loadingUserData) {
    return <LoadingSpinner message="Loading your learning data..." />;
  }

  if (userDataError) {
    return <div className="error-message">Error loading user data: {userDataError.message}</div>;
  }

  return (
    <Router>
    <div className="app">
      <Navbar
        userEmail={user.email}
        onSearch={handleSearch}
        onToggleDarkMode={toggleDarkMode}
        isDarkMode={isDarkMode}
      />
        <Routes>
          <Route path="/login" element={<LoginPage onLoginSuccess={() => {}} onToggleSignup={toggleShowSignup} />} />
          <Route path="/signup" element={<SignupPage onSignupSuccess={toggleShowSignup} onToggleLogin={toggleShowSignup} />} />
          <Route
            path="/"
            element={user ? (
              <MainContent
                 user={user}
                 userData={userData}
                 loadingUserData={loadingUserData}
                 userDataError={userDataError}
                 searchResults={searchResults}
                 onResultClick={handleResultClick}
                 onUpdateProgress={updateLessonProgressInApp}
                 onStartQuiz={onStartQuiz}
              />
            ) : (
              <Navigate to="/login" replace />
            )}
          />
          <Route
             path="/topics/:topicId"
             element={user ? (
                 <TopicPage
                    user={user}
                    userData={userData}
                    loadingUserData={loadingUserData}
                    userDataError={userDataError}
                    onUpdateProgress={updateLessonProgressInApp}
                    onStartQuiz={onStartQuiz}
                 />
             ) : (
                 <Navigate to="/login" replace />
             )}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

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
    </Router>
  );
}

function MainContent({
     user,
     userData,
     loadingUserData,
     userDataError,
     searchResults,
     onResultClick,
     onUpdateProgress,
     onStartQuiz
    }) {
    const navigate = useNavigate();

    if (loadingUserData) {
        return <LoadingSpinner message="Loading your learning data..." />;
    }

    if (userDataError) {
        return <div className="error-message">Error loading user data: {userDataError.message}</div>;
    }

    return (
      <main className="main-content">
        {searchResults ? (
          <SearchResults
            results={searchResults}
                onResultClick={onResultClick}
          />
        ) : (
        <section className="content-section">
          <div className="container">
                    <div className="topic-content-placeholder">
                         <h2>Welcome!</h2>
                         <p>Select a topic below to start learning.</p>
                        <div className="topic-buttons-container">
                           {topics.map(t => (
                              <button
                                 key={t.id}
                                 className="topic-btn"
                                 onClick={() => navigate(`/topics/${t.id}`)}
                              >
                                 {t.title}
                              </button>
                           ))}
                        </div>
                    </div>

                   <div className="dashboard-placeholder">
            <h3>Your Progress ({user.email})</h3>
            {userData && (
              <div className="dashboard-placeholder">
                <ScoreDisplay scores={userData.scores} />
                <ProgressCircle learningStatus={userData.learningStatus} />
                <DailyChallenge />
                <MotivationalQuote />
              </div>
            )}
                     </div>
          </div>
        </section>
      )}
        </main>
    );
}

function TopicPage({
    user,
    userData,
    loadingUserData,
    userDataError,
    onUpdateProgress,
    onStartQuiz
}) {
    const { topicId } = useParams();
    const navigate = useNavigate();

    const selectedTopic = topics.find(topic => topic.id === topicId);

    useEffect(() => {
        if (!loadingUserData && !selectedTopic && topicId) {
            console.warn(`Topic with ID ${topicId} not found. Redirecting to home.`);
            navigate('/', { replace: true });
        }
    }, [loadingUserData, selectedTopic, topicId, navigate]);

    if (loadingUserData) {
        return <LoadingSpinner message="Loading learning data..." />;
    }

    if (userDataError) {
        return <div className="error-message">Error loading user data: {userDataError.message}</div>;
    }

    if (selectedTopic) {
        return (
            <main className="main-content">
                <TopicContent
                    selectedTopicId={topicId}
                    topicsData={topics}
                    userData={userData}
                    onUpdateProgress={onUpdateProgress}
                    onStartQuiz={onStartQuiz}
            />
            </main>
  );
    } else {
        return null;
    }
}

export default App;
