import React, { useState, useEffect } from 'react';

const AuctionTimer = ({ endTime }) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Convert endTime to a valid date
      let end;
      try {
        // Try parsing the endTime if it's a string
        if (typeof endTime === 'string') {
          end = new Date(endTime);
        } else if (endTime instanceof Date) {
          end = endTime;
        } else {
          // If endTime is a timestamp (number)
          end = new Date(endTime);
        }

        // Check if the date is valid
        if (isNaN(end.getTime())) {
          setTimeLeft('Invalid date');
          return;
        }

        const now = new Date();
        const difference = end - now;

        if (difference <= 0) {
          setTimeLeft('Auction ended');
          return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      } catch (error) {
        console.error('Error calculating time left:', error);
        setTimeLeft('Invalid date');
      }
    };

    // Calculate immediately
    calculateTimeLeft();

    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);

    // Cleanup on unmount
    return () => clearInterval(timer);
  }, [endTime]);

  return (
    <div className="flex items-center space-x-2">
      <span className={`text-sm font-medium ${timeLeft === 'Auction ended' ? 'text-red-600' : 'text-green-600'}`}>
        {timeLeft}
      </span>
    </div>
  );
};

export default AuctionTimer; 