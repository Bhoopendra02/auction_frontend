import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuctionTimer from '../components/AuctionTimer';

const ItemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showRejectionField, setShowRejectionField] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [bidAmount, setBidAmount] = useState('');
  const [bidError, setBidError] = useState('');
  const [recentBids, setRecentBids] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_IMAGE_URL;

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/${id}`);
        if (response.data && response.data.success) {
          setItem(response.data.item);
          setRecentBids(response.data.item.bids || []);
        } else {
          setError("Item not found");
        }
      } catch (err) {
        setError("Failed to fetch item details");
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleApprove = async () => {
    try {
        const token = localStorage.getItem("token"); // get token from local storage

    const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/admin/approve/${id}`, 
  {
        status: "approved",
        approvedAt: new Date(),
      },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    },);

      alert("Item approved");
      navigate("/ItemTable");
    } catch (err) {
      setError("Failed to approve item");
    }
  };

  const handleReject = async (e) => {
    e.preventDefault();
     try {
  const token = localStorage.getItem("token");

  const response = await axios.put(
    `${import.meta.env.VITE_BACKEND_URL}/api/admin/reject/${id}`,
    {
      status: "rejected",
      rejectedAt: new Date(),
      rejectionReason,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  alert("Item rejected");
  navigate("/");
} catch (err) {
  setError("Failed to reject item");
  console.error("Reject error:", err);
}
  }

  const handleBidSubmit = async (e) => {
    e.preventDefault();
    setBidError('');

    // Check if user is logged in
    const token = localStorage.getItem("token");
    if (!token) {
      setBidError('Please login to place a bid');
      return;
    }

    const startingBid = item.startingBid || item.price;
    const currentBid = item.currentBid || startingBid;
    const bidAmountNum = parseFloat(bidAmount);

    if (!bidAmount || isNaN(bidAmountNum) || bidAmountNum <= 0) {
      setBidError('Please enter a valid bid amount');
      return;
    }

    if (bidAmountNum < startingBid) {
      setBidError(`Bid amount cannot be less than the starting bid of ₹${startingBid}`);
      return;
    }

    if (bidAmountNum <= currentBid) {
      setBidError(`Bid amount must be greater than the current bid of ₹${currentBid}`);
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/${id}/bid`,
        { amount: bidAmountNum },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      if (response.data && response.data.success) {
        // Update the item and recent bids with the new data
        setItem(response.data.item);
        setRecentBids(response.data.item.bids);
        setBidAmount('');
        
        // Show success message
        alert('Bid placed successfully!');
        // Redirect to MyBids page
        navigate('/my-bids');
      } else {
        setBidError(response.data.message || 'Failed to place bid');
      }
    } catch (error) {
      console.error('Bid error:', error);
      setBidError(
        error.response?.data?.message || 
        'Failed to place bid. Please try again.'
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <p className="text-red-500 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <p className="text-gray-500 text-lg">No item found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header with Image and Basic Info */}
          <div className="md:flex ">
            <div className="md:w-2/5 relative mt-26">
              <img
                src={`${backendUrl}${item.image}`}
                alt={item.itemName}
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute top-4 right-4">
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  item.status === "approved"
                    ? "bg-green-100 text-green-800"
                    : item.status === "rejected"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}>
                  {item.status || "pending"}
                </span>
              </div>
            </div>
            <div className="md:w-3/5 p-8 flex flex-col justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-6">{item.itemName}</h1>
                
                {/* Timer Section */}
                <div className="mb-6 bg-gray-50 p-4 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">Time Remaining</h3>
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <AuctionTimer 
                      endTime={item.auctionEnd || (() => {
                        const date = new Date(item.createdAt);
                        date.setDate(date.getDate() + (item.auctionDuration || 7));
                        return date;
                      })()} 
                    />
                  </div>
                </div>

                {/* Price Information */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">Price Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <p className="text-sm text-gray-500 mb-1">Starting Bid</p>
                      <p className="text-2xl font-bold text-gray-900">₹{item.startingBid || item.price}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <p className="text-sm text-gray-500 mb-1">Current Bid</p>
                      <p className="text-2xl font-bold text-blue-600">₹{item.currentBid || item.startingBid}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bidding Section - Only show for approved items */}
              {item.status === "approved" && (
                <div className="mt-auto bg-gray-50 p-4 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">Place Your Bid</h3>
                  <form onSubmit={handleBidSubmit} className="space-y-3">
                    <div>
                      <label htmlFor="bidAmount" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Bid Amount (₹)
                      </label>
                      <input
                        type="number"
                        id="bidAmount"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                        min={item.currentBid ? item.currentBid + 1 : item.startingBid}
                        step="0.01"
                        className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                        placeholder={`Minimum bid: ₹${item.currentBid ? item.currentBid + 1 : item.startingBid}`}
                      />
                    </div>
                    {bidError && <p className="text-red-600 text-sm">{bidError}</p>}
                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-blue-700 transition-colors font-semibold"
                    >
                      Place Bid
                    </button>
                  </form>
                </div>
              )}

              {/* Approve/Reject Buttons - Only show for pending items */}
              {item.status === "pending" && (
                <div className="mt-auto space-y-4">
                  <div className="flex gap-4">
                    <button
                      onClick={handleApprove}
                      className="flex-1 bg-green-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-green-700 transition-colors font-semibold"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => setShowRejectionField(true)}
                      className="flex-1 bg-red-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-red-700 transition-colors font-semibold"
                    >
                      Reject
                    </button>
                  </div>

                  {showRejectionField && (
                    <form onSubmit={handleReject} className="mt-4 space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Rejection Reason
                        </label>
                        <textarea
                          value={rejectionReason}
                          onChange={(e) => setRejectionReason(e.target.value)}
                          required
                          className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-red-300 focus:border-red-300"
                          rows="4"
                          placeholder="Enter reason for rejection..."
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-red-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-red-700 transition-colors font-semibold"
                      >
                        Submit Rejection
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Detailed Information */}
          <div className="p-8 border-t border-gray-100">
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-8">
                  {/* Item Details */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Item Details</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Category</p>
                        <p className="text-gray-900 font-medium">{item.category || "Not specified"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Condition</p>
                        <p className="text-gray-900 font-medium capitalize">{item.condition || "Not specified"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Description</p>
                        <p className="text-gray-900">{item.description || "No description available"}</p>
                      </div>
                    </div>
                  </div>

                  {/* Recent Bids - Only show for approved items */}
                  {item.status === "approved" && (
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Bids</h3>
                      {recentBids.length === 0 ? (
                        <p className="text-gray-500">No bids yet. Be the first to bid!</p>
                      ) : (
                        <div className="space-y-3">
                          {recentBids.map((bid, index) => (
                            <div key={index} className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm">
                              <div>
                                <p className="font-medium text-gray-900">{bid.bidderName}</p>
                                <p className="text-sm text-gray-500">
                                  {new Date(bid.timestamp).toLocaleString()}
                                </p>
                              </div>
                              <p className="text-lg font-bold text-blue-600">₹{bid.amount}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Features */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Features</h3>
                    {item.features && item.features.length > 0 ? (
                      <ul className="space-y-2">
                        {item.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <svg className="h-5 w-5 text-green-500 mr-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500">No features listed</p>
                    )}
                  </div>

                  {/* Terms and Conditions */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Terms and Conditions</h3>
                    <p className="text-gray-700">{item.termsAndConditions || "No terms and conditions specified"}</p>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-8">
                  {/* Seller Information */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Seller Information</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Seller Name</p>
                        <p className="text-gray-900 font-medium">{item.sellerName || "Not specified"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Location</p>
                        <p className="text-gray-900 font-medium">{item.location || "Not specified"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Contact</p>
                        <div className="space-y-1">
                          <p className="text-gray-900 font-medium">{item.email || "Not specified"}</p>
                          <p className="text-gray-900 font-medium">{item.phone || "Not specified"}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Shipping Information */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Shipping Information</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Shipping Method</p>
                        <p className="text-gray-900 font-medium capitalize">{item.shippingInfo?.shippingMethod || "Not specified"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Shipping Cost</p>
                        <p className="text-gray-900 font-medium">₹{item.shippingInfo?.shippingCost || "Not specified"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Estimated Delivery</p>
                        <p className="text-gray-900 font-medium">{item.shippingInfo?.estimatedDelivery || "Not specified"} days</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
