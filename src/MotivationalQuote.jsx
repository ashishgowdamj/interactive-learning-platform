import React, { useEffect, useState } from 'react';
import './index.css'; // Assuming styles for the quote will be here or in a separate file

function MotivationalQuote() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Placeholder for fetching a motivational quote
    // This could come from an API or a local list
    const fetchQuote = async () => {
      try {
        setLoading(true);
        // Simulate fetching a quote
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
        
        const quotes = [
            "The only way to do great work is to love what you do. - Steve Jobs",
            "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill",
            "Believe you can and you're halfway there. - Theodore Roosevelt",
            "Your time is limited, don't waste it living someone else's life. - Steve Jobs",
            "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt"
        ];
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        
        setQuote(randomQuote);
      } catch (err) {
        console.error("Error fetching quote:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuote();
    
    // Optional: Refresh the quote periodically
    // const intervalId = setInterval(fetchQuote, 60000); // Refresh every minute
    // return () => clearInterval(intervalId); // Clean up interval

  }, []);

  if (loading) {
    return <div className="motivational-quote">Loading quote...</div>;
  }

  if (error) {
    return <div className="motivational-quote">Error loading quote: {error.message}</div>;
  }

  if (!quote) {
      return <div className="motivational-quote">No quote available today.</div>;
  }

  return (
    <div className="motivational-quote">
      <p>{quote}</p>
    </div>
  );
}

export default MotivationalQuote; 