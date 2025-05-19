import React, { useEffect, useState } from 'react';

const Bids = () => {
  const [bids, setBids] = useState([]);

  useEffect(() => {
    // Replace with real API
    fetch('https://jsonplaceholder.typicode.com/comments?postId=1')
      .then((res) => res.json())
      .then(setBids)
      .catch(console.error);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Bids</h2>
      <ul className="space-y-2">
        {bids.map((bid) => (
          <li key={bid.id} className="bg-white p-4 border rounded shadow-sm">
            <p><strong>Bidder:</strong> {bid.name}</p>
            <p><strong>Amount:</strong> ${Math.floor(Math.random() * 1000)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Bids; 