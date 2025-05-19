import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const MyAuctions = () => {
  const [auctions, setAuctions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAuctions();
  }, []);

  const fetchAuctions = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/seller/my-items', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      // Ensure we're setting an array
      if (response.data && Array.isArray(response.data)) {
        setAuctions(response.data);
      } else if (response.data && response.data.items && Array.isArray(response.data.items)) {
        setAuctions(response.data.items);
      } else {
        setAuctions([]);
      }
      setError(null);
    } catch (err) {
      setError('Failed to fetch auctions');
      toast.error('Failed to load your auctions');
      setAuctions([]); // Set empty array on error
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAuction = async (auctionId) => {
    if (!window.confirm('Are you sure you want to delete this auction?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/api/auctions/${auctionId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success('Auction deleted successfully');
      fetchAuctions(); // Refresh the list
    } catch (err) {
      toast.error('Failed to delete auction');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Auctions</h2>
        <Link
          to="/seller/create"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create New Auction
        </Link>
      </div>

      {!auctions || auctions.length === 0 ? (
        <div className="text-center text-gray-600 p-8">
          <p className="text-xl mb-4">You haven't created any auctions yet</p>
          <Link
            to="/seller/create"
            className="text-blue-600 hover:text-blue-800"
          >
            Create your first auction
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {auctions.map((auction) => (
            <div
              key={auction._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="relative h-48">
                <img
                  src={auction.image}
                  alt={auction.itemName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    auction.status === 'active' ? 'bg-green-100 text-green-800' :
                    auction.status === 'ended' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {auction.status}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{auction.itemName}</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>Starting Bid: ${auction.startingBid}</p>
                  <p>Current Bid: ${auction.currentBid || auction.startingBid}</p>
                  <p>End Date: {new Date(auction.endDate).toLocaleDateString()}</p>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <Link
                    to={`/items/${auction._id}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    View Details
                  </Link>
                  <div className="space-x-2">
                    <button
                      onClick={() => handleDeleteAuction(auction._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAuctions; 