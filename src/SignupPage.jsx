import React, { useState } from 'react';
import { signup } from './auth'; // Import the signup function
import { doc, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import './LoginPage.css'; // Reusing the same styles

function SignupPage({ onSignupSuccess, onToggleLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      // Get the first name from the full name
      const firstName = name.split(' ')[0];
      
      // Create the user account
      const userCredential = await signup(email, password);
      
      // Store user data in Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        firstName: firstName,
        email: email,
        scores: { html: 0, css: 0, js: 0 },
        recentActivity: [],
        learningStatus: { html: 'Not started', css: 'Not started', js: 'Not started' },
        streak: 0,
        lastActivityDate: null,
        lessonProgress: {}
      });

      onSignupSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>Create Account</h1>
          <p>Start your learning journey today</p>
        </div>
        
        <form onSubmit={handleSignup} className="login-form">
          <div className="form-group">
            <label htmlFor="name">
              <i className="fas fa-user"></i>
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">
              <i className="fas fa-envelope"></i>
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">
              <i className="fas fa-lock"></i>
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              required
            />
          </div>

          {error && (
            <div className="error-message">
              <i className="fas fa-exclamation-circle"></i>
              {error}
            </div>
          )}

          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                Creating Account...
              </>
            ) : (
              <>
                <i className="fas fa-user-plus"></i>
                Create Account
              </>
            )}
          </button>
        </form>

        <div className="login-footer">
          <p>Already have an account?</p>
          <button 
            onClick={onToggleLogin}
            className="signup-link"
          >
            Login
          </button>
        </div>

        <div className="login-features">
          <div className="feature">
            <i className="fas fa-book"></i>
            <span>Interactive Lessons</span>
          </div>
          <div className="feature">
            <i className="fas fa-code"></i>
            <span>Live Code Editor</span>
          </div>
          <div className="feature">
            <i className="fas fa-trophy"></i>
            <span>Track Progress</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage; 