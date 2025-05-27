import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { auth, logout } from '../../auth';
import SearchBar from '../common/SearchBar';
import ILPLogo from '../../../assets/icons/ILP.png';
import './Navbar.css';

function Navbar({ userEmail, onSearch, onToggleDarkMode, isDarkMode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      console.log("User logged out successfully");
      navigate('/login');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

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
        <div className="site-logo-title" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
          <img src={ILPLogo} alt="ILP Logo" className="logo" />
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
          <li>
            <button onClick={onToggleDarkMode} className="dark-mode-toggle-button">
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
          </li>
          {userEmail && (
            <li className="user-info">
              <span>{userEmail}</span>
              <button onClick={handleLogout} className="logout-button">Logout</button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar; 