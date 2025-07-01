import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../common/SearchBar';
import './Navbar.css';

function Navbar({ userData, onSearch, onToggleDarkMode, isDarkMode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleTopicClick = (topicId) => {
    navigate(`/topics/${topicId}`);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="site-logo-title" onClick={handleLogoClick}>
          <div className="logo-icon">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="#3a10e5"/>
              <path d="M8 12h16M8 16h16M8 20h16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="site-title">CodeLearn</span>
        </div>
        
        <SearchBar onSearch={onSearch} />
        
        <button className="mobile-menu-button" onClick={toggleMobileMenu}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        
        <ul className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
          <li><a href="#" onClick={() => handleTopicClick('html')}>HTML</a></li>
          <li><a href="#" onClick={() => handleTopicClick('css')}>CSS</a></li>
          <li><a href="#" onClick={() => handleTopicClick('js')}>JavaScript</a></li>
          <li><a href="#" onClick={() => handleTopicClick('python')}>Python</a></li>
          <li><a href="#" onClick={() => handleTopicClick('react')}>React</a></li>
          <li>
            <button 
              className="dark-mode-toggle-button" 
              onClick={onToggleDarkMode}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                {isDarkMode ? (
                  <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                ) : (
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                )}
              </svg>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;