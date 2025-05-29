import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { auth, logout } from '../../auth';
import SearchBar from '../common/SearchBar';
import ILPLogo from '../../../assets/icons/ILP.png';
import './Navbar.css';

function Navbar({ userData, onSearch, onToggleDarkMode, isDarkMode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const dropdownRef = useRef(null);
  const profileIconRef = useRef(null);

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

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isProfileDropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        profileIconRef.current &&
        !profileIconRef.current.contains(event.target)
      ) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileDropdownOpen]);

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
          <li><a href="#" onClick={() => handleTopicClick('python')}>Python</a></li>
          {userData && (
            <li className="profile-dropdown-container">
              <div className="profile-icon" onClick={toggleProfileDropdown} ref={profileIconRef}>
                 <i className="fas fa-user-circle"></i> 
              </div>
              {isProfileDropdownOpen && (
                <div className="profile-dropdown-menu" ref={dropdownRef}>
                  <div className="dropdown-header">
                     <i className="fas fa-user-circle profile-avatar"></i>
                    <div className="user-details">
                       <span>{userData.firstName}</span>
                       <Link to="/profile" className="profile-link">See your profile</Link>
                    </div>
                  </div>
                   <hr />
                  <div className="dropdown-item">
                     <i className="fas fa-comment"></i>
                     <span>Give Feedback</span>
                  </div>
                   <div className="dropdown-item">
                     <i className="fas fa-cog"></i>
                     <span>Settings & Privacy</span>
                   </div>
                   <div className="dropdown-item">
                     <i className="fas fa-question-circle"></i>
                     <span>Help & Support</span>
                   </div>
                   <div className="dropdown-item" onClick={onToggleDarkMode}>
                     <i className="fas fa-adjust"></i>
                     <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                   </div>
                   <hr />
                   <div className="dropdown-item" onClick={handleLogout}>
                     <i className="fas fa-sign-out-alt"></i>
                     <span>Logout</span>
                   </div>
                </div>
              )}
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar; 