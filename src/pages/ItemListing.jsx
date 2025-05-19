import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AuctionTimer from "../components/AuctionTimer";

const ApprovedItems = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const backendUrl = import.meta.env.VITE_BACKEND_IMAGE_URL;
  
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/approved");
        console.log("API Response:", response.data);
        console.log("First Item Structure:", response.data.items?.[0]);
        
        if (response.data && response.data.success && Array.isArray(response.data.items)) {
          // Add default price if missing
          const itemsWithPrice = response.data.items.map(item => ({
            ...item,
            price: item.price || item.startingBid || 0
          }));
          setItems(itemsWithPrice);
          setFilteredItems(itemsWithPrice);
        } else {
          setItems([]);
          setFilteredItems([]);
          setError("No items available");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching items:", err);
        setError("Failed to fetch items. Please try again.");
        setItems([]);
        setFilteredItems([]);
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    if (items && Array.isArray(items)) {
      let filtered = items;
      
      // Apply search filter
      if (searchTerm) {
        filtered = filtered.filter(item =>
          item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      // Apply category filter
      if (selectedCategory !== "all") {
        filtered = filtered.filter(item => item.category === selectedCategory);
      }
      
      setFilteredItems(filtered);
    }
  }, [searchTerm, items, selectedCategory]);

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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Live Auctions</h1>
          <p className="text-lg text-gray-600">Discover and bid on unique items from trusted sellers</p>
        </div>

        {/* Filters Section */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="w-full md:w-96">
            <div className="relative">
              <input
                type="text"
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-auto">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full md:w-48 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="home">Home & Garden</option>
              <option value="sports">Sports</option>
              <option value="collectibles">Collectibles</option>
            </select>
          </div>
        </div>

        {/* Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No items found</h3>
            <p className="mt-1 text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col h-[450px]"
              >
                {/* Image Section */}
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={`${backendUrl}${item.image}`}
                    alt={item.itemName}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <span className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-full">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-4 flex flex-col flex-1">
                  {/* Title and Location */}
                  <div className="mb-4">
                    <h2 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-1">
                      {item.itemName}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {item.location}
                    </p>
                  </div>

                  {/* Price and Seller Info */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {/* Left Column */}
                    <div className="space-y-2">
                      <div className="flex items-center text-gray-600">
                        <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <p className="text-xs text-gray-500">Starting Price</p>
                          <p className="font-medium">₹{item.price || item.startingBid || 'Price not set'}</p>
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
                          <p className="text-xs text-gray-500">Seller</p>
                          <p className="text-sm">{item.seller?.username || item.sellerName || 'Unknown Seller'}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Timer Section */}
                  <div className="bg-gray-50 p-3 rounded-lg mb-4">
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-medium text-gray-700">Time Remaining</p>
                      <AuctionTimer 
                        endTime={item.auctionEndTime || item.endDate || (() => {
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
                      to={`/items/${item._id}`}
                      className="block w-full text-center bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300"
                    >
                      Place Bid
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

export default ApprovedItems;
