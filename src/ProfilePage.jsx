import React, { useState, useEffect } from 'react';
import LoadingSpinner from './components/common/LoadingSpinner';
import {
  // Import necessary Firebase functions here (e.g., updateDoc, doc, db)
  // We'll assume you pass an updateUserProfile function via props for now
} from 'firebase/firestore'; // Make sure you have Firebase Firestore imported
import './ProfilePage.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';

function ProfilePage({ user, userData, loadingUserData, userDataError, onUpdateUserProfile }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(userData?.firstName || '');
  const [updateError, setUpdateError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  // Update newName state if userData changes (e.g., after a successful save)
  useEffect(() => {
    setEditedName(userData?.firstName || '');
  }, [userData]);

  if (loadingUserData) {
    return <LoadingSpinner message="Loading profile data..." />;
  }

  if (userDataError) {
    return <div className="error-message">Error loading profile data: {userDataError.message}</div>;
  }

  if (!user || !userData) {
    return <div className="error-message">User data not available. Please log in.</div>;
  }

  const handleNameUpdate = async () => {
    if (editedName.trim()) {
      try {
        await onUpdateUserProfile(user.uid, { firstName: editedName });
        setIsEditing(false);
      } catch (error) {
        console.error('Error updating name:', error);
      }
    }
  };

  // Format date for timeline display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Sort activities by date
  const sortedActivities = userData?.recentActivity?.sort((a, b) => 
    new Date(b.timestamp) - new Date(a.timestamp)
  ) || [];

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>Profile</h1>
      </div>

      <div className="profile-content">
        <div className="profile-section">
          <div className="profile-info">
            <div className="name-section">
              {isEditing ? (
                <div className="edit-name-container">
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="name-input"
                  />
                  <div className="edit-buttons">
                    <button onClick={handleNameUpdate} className="save-button">Save</button>
                    <button onClick={() => setIsEditing(false)} className="cancel-button">Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="name-display">
                  <h2>{userData?.firstName || user?.email}</h2>
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="edit-button"
                  >
                    ✏️
                  </button>
                </div>
              )}
            </div>
            <p className="email">{user?.email}</p>
          </div>
        </div>

        <div className="profile-section">
          <h3>Learning Timeline</h3>
          <div className="timeline">
            {sortedActivities.length > 0 ? (
              sortedActivities.map((activity, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-icon">
                    {activity.type === 'lesson' ? '📚' : 
                     activity.type === 'quiz' ? '📝' : 
                     activity.type === 'streak' ? '🔥' : '📅'}
                  </div>
                  <div className="timeline-content">
                    <h4>{activity.title}</h4>
                    <p>{activity.description}</p>
                    <span className="timeline-date">{formatDate(activity.timestamp)}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-activity">No recent activity to display.</p>
            )}
          </div>
        </div>

        <div className="profile-section">
          <h3>Learning Statistics</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <h4>Current Streak</h4>
              <p className="stat-value">{userData?.streak || 0} days</p>
            </div>
            <div className="stat-card">
              <h4>Total Lessons</h4>
              <p className="stat-value">
                {Object.values(userData?.lessonProgress || {}).filter(
                  progress => progress.status === 'completed'
                ).length}
              </p>
            </div>
            <div className="stat-card">
              <h4>Quiz Average</h4>
              <p className="stat-value">
                {Object.values(userData?.scores || {}).length > 0
                  ? Math.round(
                      Object.values(userData.scores).reduce((a, b) => a + b, 0) /
                      Object.values(userData.scores).length
                    )
                  : 0}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage; 