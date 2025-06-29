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
          <img src="/assets/icons/ILP.png" alt="ILP Logo" className="logo" />
          <span className="site-title">Interactive Learning Platform</span>
        </div>
        <SearchBar onSearch={onSearch} />
        <button className="mobile-menu-button" onClick={toggleMobileMenu}>
          &#9776;
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
              {isDarkMode ? '☀️' : '🌙'}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;