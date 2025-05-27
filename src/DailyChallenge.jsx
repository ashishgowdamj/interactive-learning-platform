import React, { useEffect, useState } from 'react';
import './index.css'; // Assuming styles for daily challenge will be here or in a separate file

function DailyChallenge() {
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Placeholder for fetching daily challenge data
    // This will likely involve fetching data based on the current date
    const fetchDailyChallenge = async () => {
      try {
        setLoading(true);
        // Simulate fetching data
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
        
        const today = new Date();
        const dayOfMonth = today.getDate();
        
        // Basic logic to select a challenge based on the day
        let selectedChallenge = null;
        if (dayOfMonth % 2 === 0) {
            selectedChallenge = { title: "CSS Flexbox Challenge", description: "Align items using Flexbox." };
        } else {
            selectedChallenge = { title: "HTML Forms Practice", description: "Build a simple contact form." };
        }

        setChallenge(selectedChallenge);
      } catch (err) {
        console.error("Error fetching daily challenge:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDailyChallenge();
  }, []);

  if (loading) {
    return <div className="challenge-content">Loading daily challenge...</div>;
  }

  if (error) {
    return <div className="challenge-content">Error loading daily challenge: {error.message}</div>;
  }

  if (!challenge) {
      return <div className="challenge-content">No daily challenge available today.</div>;
  }

  return (
    <div className="challenge-content">
      <h4>Daily Challenge: {challenge.title}</h4>
      <p>{challenge.description}</p>
      {/* Add a button or link to start the challenge */}
      <button>Start Challenge</button>
    </div>
  );
}

export default DailyChallenge; 