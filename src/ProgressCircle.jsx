import React, { useEffect, useRef } from 'react';
import './index.css'; // Assuming styles for circular progress are in index.css or will be added

function ProgressCircle({ learningStatus }) {
    const percentage = calculateProgress(learningStatus);
    const circleRef = useRef(null);
    const circumference = 2 * Math.PI * 45; // radius = 45

    useEffect(() => {
        if (circleRef.current) {
            const offset = circumference - (percentage / 100) * circumference;
            circleRef.current.style.strokeDashoffset = offset;
        }
    }, [percentage, circumference]);

    function calculateProgress(status) {
        if (!status) return 0;
        let completedCount = 0;
        if (status.html === 'Completed') completedCount++;
        if (status.css === 'Completed') completedCount++;
        if (status.js === 'Completed') completedCount++;
        return (completedCount / 3) * 100; // Assuming 3 main topics (HTML, CSS, JS)
    }

    return (
        <div className="progress-container"> {/* Container for text and circle */}
            <p>Course Completion:</p>
            <div className="circular-progress"> {/* Container for SVG and percentage */}
                <span className="progress-percentage">{Math.round(percentage)}%</span>
                <svg>
                    {/* Background Circle */}
                    <circle cx="50" cy="50" r="45" stroke="#e0e0e0" strokeWidth="10" fill="none"></circle>
                    {/* Progress Circle */}
                    <circle 
                        ref={circleRef}
                        cx="50" 
                        cy="50" 
                        r="45" 
                        stroke="#40c9ff" 
                        strokeWidth="10" 
                        fill="none" 
                        strokeLinecap="round" 
                        strokeDasharray={circumference} // Use calculated circumference
                        strokeDashoffset={circumference} // Initial offset (empty)
                    ></circle>
                </svg>
            </div>
            {/* Display status text based on overall completion */}
             <p className="progress-text">{percentage === 100 ? 'Completed' : 'Not Completed'}</p>
        </div>
    );
}

export default ProgressCircle; 