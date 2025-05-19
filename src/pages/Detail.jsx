import React, { useState } from "react";

const AuctionItemDetail = () => {
  const [bidAmount, setBidAmount] = useState("");
  const [biddingHistory, setBiddingHistory] = useState([
    { id: 1, name: "John Doe", amount: 550 },
    { id: 2, name: "Jane Smith", amount: 600 },
    { id: 3, name: "Bob Johnson", amount: 650 },
  ]);


  const item = {
    name: "Vintage Wooden Desk",
    description:
      "This beautifully crafted wooden desk dates back to the 19th century, featuring intricate carvings and a rich, warm finish. Ideal for collectors or those who appreciate timeless furniture.",
    startingBid: "$500",
    auctionEnd: "April 20, 2025",
    condition: "Good",
    imageURL: "https://images.unsplash.com/photo-1633096816910-25f60d9f411b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNhciUyMGF1Y3Rpb258ZW58MHx8MHx8fDA%3D",
    dimensions: "Height: 3.5 ft, Width: 5 ft, Depth: 2.5 ft",
    material: "Solid Oak Wood",
  };

  const relatedItems = [
    { id: 1, name: "Antique Chair", imageURL: "https://via.placeholder.com/150" },
    { id: 2, name: "Victorian Lamp", imageURL: "https://via.placeholder.com/150" },
    { id: 3, name: "Carved Wooden Shelf", imageURL: "https://via.placeholder.com/150" },
  ];

  const handlePlaceBid = () => {
    if (bidAmount) {
      alert(`You have successfully placed a bid of $${bidAmount}!`);
    } else {
      alert("Please enter a valid bid amount.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Normal Item Title */}
      <div className="text-center py-6 bg-white shadow mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{item.name}</h1>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Item Image */}
          <div className="bg-white shadow rounded-lg  p-4">
            <img
              src={item.imageURL}
              alt={item.name}
              className="rounded-lg shadow-lg w-full overflow-hidden"
            />
          </div>

          {/* Item Details */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800">Details</h2>
            <p className="text-gray-600 mt-2">{item.description}</p>

            <div className="mt-4 space-y-4">
              <p>
                <strong className="text-gray-800">Starting Bid:</strong>{" "}
                <span className="text-blue-600">{item.startingBid}</span>
              </p>
              <p>
                <strong className="text-gray-800">Auction Ends:</strong>{" "}
                <span className="text-red-600">{item.auctionEnd}</span>
              </p>
              <p>
                <strong className="text-gray-800">Condition:</strong>{" "}
                <span className="text-green-600">{item.condition}</span>
              </p>
              <p>
                <strong className="text-gray-800">Dimensions:</strong>{" "}
                {item.dimensions}
              </p>
              <p>
                <strong className="text-gray-800">Material:</strong>{" "}
                {item.material}
              </p>
            </div>

            {/* Input and Button */}
            <div className="mt-6 flex space-x-4">
              <input
                type="number"
                placeholder="Enter your bid amount"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                className="border border-gray-300 rounded p-2 flex-1"
              />
              <button
                onClick={handlePlaceBid}
                className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
              >
                Place Bid
              </button>
            </div>
          </div>
        </div>

          {/* Bidding History and Count */}
        <div className="mt-12 bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800">Bidding History</h2>
          <p className="text-gray-600 mt-2">
            <strong>Total Bidders:</strong> {biddingHistory.length}
          </p>
          <div className="mt-4 bg-white shadow rounded-lg p-4">
            <ul className="space-y-2">
              {biddingHistory.map((bid) => (
                <li key={bid.id} className="flex justify-between">
                  <span className="text-gray-700">{bid.name}</span>
                  <span className="text-blue-700">${bid.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Auction Rules */}
        <div className="mt-12 bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800">Auction Rules</h2>
          <ul className="list-disc list-inside mt-4 space-y-2 text-gray-600">
            <li>Bids must be placed before the auction end date.</li>
            <li>Winning bidders will be notified within 24 hours of auction closing.</li>
            <li>Items must be paid for within 5 business days after winning.</li>
            <li>All sales are final. No returns or exchanges.</li>
          </ul>
        </div>

        {/* Related Items */}
        <div className="mt-12 bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800">Related Items</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
            {relatedItems.map((related) => (
              <div
                key={related.id}
                className="bg-white shadow rounded-lg p-4 text-center hover:shadow-lg transition-shadow"
              >
                <img
                  src={related.imageURL}
                  alt={related.name}
                  className="w-full h-32 object-cover rounded"
                />
                <p className="mt-2 font-medium text-gray-800">{related.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionItemDetail;