import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Explore = () => {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/approved`);
        console.log(response.data);
        // Check if response.data and response.data.item exist
        if (response.data && Array.isArray(response.data.items)) {
          setAuctions(response.data.items);
        } else {
          setAuctions([]);
          setError('No auctions data available');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching auctions:', error);
        setError('Failed to fetch auctions');
        setAuctions([]);
        setLoading(false);
      }
    };

    fetchAuctions();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Explore Auctions</h1>
        <div className="text-center text-red-500">{error}</div>
      </div>
    );
  }

  if (!auctions || auctions.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Explore Auctions</h1>
        <div className="text-center text-gray-500">No auctions available at the moment.</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Explore Auctions</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {auctions.map((auction) => (
          <div key={auction._id} className="bg-white rounded-lg shadow-md p-4">
            <img 
              src={auction.image} 
              alt={auction.itemName}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{auction.itemName}</h2>
            <p className="text-gray-600 mb-2">Location: {auction.location}</p>
            <div className="flex justify-between items-center">
              <span className="text-green-600 font-bold">${auction.price}</span>
              <Link 
                to={`/items/${auction._id}`}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
