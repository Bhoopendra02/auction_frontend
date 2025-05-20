import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AuctionTimer from "../components/AuctionTimer";

const MyBids = () => {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_IMAGE_URL;

  useEffect(() => {
    const fetchUserBids = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Please login to view your bids");
          setLoading(false);
          return;
        }

        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/my-bids`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data && response.data.success) {
          setBids(response.data.bids);
        } else {
          setError("Failed to fetch your bids");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching bids:", err);
        setError("Failed to fetch your bids. Please try again.");
        setLoading(false);
      }
    };

    fetchUserBids();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">My Bids</h1>
          <p className="text-lg text-gray-600">Track all your active bids and auction status</p>
        </div>

        {/* Bids Grid */}
        {bids.length === 0 ? (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No bids found</h3>
            <p className="mt-1 text-gray-500">You haven't placed any bids yet</p>
            <Link
              to="/items"
              className="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300"
            >
              Browse Items
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bids.map((bid) => (
              <div
                key={bid._id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col h-[450px]"
              >
                {/* Image Section */}
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={`${backendUrl}${bid.item.image}`}
                    alt={bid.item.itemName}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <span className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-full">
                      {bid.item.category}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-4 flex flex-col flex-1">
                  {/* Title and Location */}
                  <div className="mb-4">
                    <h2 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-1">
                      {bid.item.itemName}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {bid.item.location}
                    </p>
                  </div>

                  {/* Bid Info */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {/* Left Column */}
                    <div className="space-y-2">
                      <div className="flex items-center text-gray-600">
                        <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <p className="text-xs text-gray-500">Your Bid</p>
                          <p className="font-medium">₹{bid.amount}</p>
                        </div>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-2">
                      <div className="flex items-center text-gray-600">
                        <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <div>
                          <p className="text-xs text-gray-500">Bid Status</p>
                          <p className="text-sm font-medium text-green-600">
                            {bid.isWinning ? "Winning" : "Outbid"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Timer Section */}
                  <div className="bg-gray-50 p-3 rounded-lg mb-4">
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-medium text-gray-700">Time Remaining</p>
                      <AuctionTimer 
                        endTime={bid.item.auctionEndTime || bid.item.endDate || (() => {
                          const date = new Date();
                          date.setDate(date.getDate() + 7);
                          return date;
                        })()} 
                      />
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="mt-auto">
                    <Link
                      to={`/items/${bid.item._id}`}
                      className="block w-full text-center bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300"
                    >
                      Update Bid
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBids; 