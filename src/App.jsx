import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
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
import { Routes, Route, Navigate, useNavigate, useParams, useLocation } from 'react-router-dom';
import ProfilePage from './ProfilePage';
import SearchResultsPage from './SearchResultsPage';

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

  const navigate = useNavigate();
  const location = useLocation();

  const toggleShowSignup = () => {
    setShowSignup(prevState => !prevState);
    setUserDataError(null);
  };

  const handleLoginSuccess = () => {
    setUser(auth.currentUser);
    navigate('/');
  };

  useEffect(() => {
    if (location.pathname !== '/search') {
      setSearchResults(null);
    }
  }, [location.pathname]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoadingAuth(false);
    });
    return () => unsubscribe();
  }, []);

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
            firstName: user.email.split('@')[0], // Fallback to email username if no name
            email: user.email,
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
  }, [user]);

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

  const handleUpdateUserProfile = async (userId, updates) => {
    if (!userId) return;
    try {
      const userDocRef = doc(db, "users", userId);
      await updateDoc(userDocRef, updates);
      console.log("User profile updated.", updates);

      setUserData(prevUserData => ({ ...prevUserData, ...updates }));

    } catch (error) {
      console.error("Error updating user profile:\n", error);
      throw error;
    }
  };

  const updateLessonProgressInApp = async (newLessonProgress) => {
    // Find the lesson that was just updated
    const updatedLessonId = Object.keys(newLessonProgress).find(
      lessonId => newLessonProgress[lessonId].status === 'completed' &&
      (!userData.lessonProgress[lessonId] || userData.lessonProgress[lessonId].status !== 'completed')
    );

    if (updatedLessonId) {
      // Find the lesson details
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
        // Create activity entry
        const activity = {
          type: 'lesson',
          title: lessonDetails.title,
          description: `Completed lesson in ${topicTitle}`,
          timestamp: new Date().toISOString()
        };

        // Update user data with new activity
        const updatedUserData = {
          ...userData,
          lessonProgress: newLessonProgress,
          recentActivity: [
            activity,
            ...(userData.recentActivity || []).slice(0, 9) // Keep last 10 activities
          ]
        };

        setUserData(updatedUserData);
        await saveUserData(updatedUserData);
        return;
      }
    }

    // If no new completion, just update the progress
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
    console.log('handleResultClick called with type:', type, 'id:', id);
    // Clear search results before navigating
    setSearchResults(null);
    // Navigate to the appropriate route
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

  const handleQuizComplete = async (score, topicId) => {
    console.log('Quiz completed for topic:', topicId, 'with score:', score);
    
    if (user && userData && topicId) {
      const newScores = { ...userData.scores, [topicId]: score };
      
      // Create activity entry for quiz completion
      const topic = topics.find(t => t.id === topicId);
      const activity = {
        type: 'quiz',
        title: `${topic?.title} Quiz`,
        description: `Scored ${score}% on the quiz`,
        timestamp: new Date().toISOString()
      };

      const updatedUserData = {
        ...userData,
        scores: newScores,
        recentActivity: [
          activity,
          ...(userData.recentActivity || []).slice(0, 9) // Keep last 10 activities
        ]
      };
      
      setUserData(updatedUserData);
      await saveUserData(updatedUserData);
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
      <LoginPage onLoginSuccess={handleLoginSuccess} onToggleSignup={toggleShowSignup} />
    );
  }

  if (loadingUserData) {
    return <LoadingSpinner message="Loading your learning data..." />;
  }

  if (userDataError) {
    return <div className="error-message">Error loading user data: {userDataError.message}</div>;
  }

  return (
    <div>
      <Navbar
        userData={userData}
        onSearch={handleSearch}
        onToggleDarkMode={toggleDarkMode}
        isDarkMode={isDarkMode}
      />
      <Routes>
        <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} onToggleSignup={toggleShowSignup} />} />
        <Route path="/signup" element={<SignupPage onSignupSuccess={toggleShowSignup} onToggleLogin={toggleShowSignup} />} />
        <Route 
          path="/profile" 
          element={user ? 
            <ProfilePage 
              user={user} 
              userData={userData} 
              loadingUserData={loadingUserData} 
              userDataError={userDataError} 
              onUpdateUserProfile={handleUpdateUserProfile}
            /> 
            : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/search"
          element={user ? (
            <SearchResultsPage 
              results={searchResults} 
              onResultClick={handleResultClick}
            />
          ) : (
            <Navigate to="/login" replace />
          )}
        />
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
            <h3>Your Progress ({userData?.firstName || user?.email})</h3>
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
