import React, { useState } from 'react';
import { login } from './auth'; // Import the login function
import './LoginPage.css'; // Assuming you have basic form styles here

function LoginPage({ onLoginSuccess, onToggleSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      // If login is successful, call the onLoginSuccess prop
      onLoginSuccess();
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
          <h1>Welcome Back!</h1>
          <p>Continue your learning journey</p>
        </div>
        
        <form onSubmit={handleLogin} className="login-form">
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
              placeholder="Enter your password"
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
                Logging in...
              </>
            ) : (
              <>
                <i className="fas fa-sign-in-alt"></i>
                Login
              </>
            )}
          </button>
        </form>

        <div className="login-footer">
          <p>Don't have an account?</p>
          <button 
            onClick={onToggleSignup}
            className="signup-link"
          >
            Create Account
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

export default LoginPage; 