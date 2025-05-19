import React from "react";

const PaymentPage = () => {
  const auctionItem = {
    name: "Vintage Wooden Desk",
    price: "$1200",
    description:
      "A beautifully crafted wooden desk from the 19th century, perfect for collectors.",
    image: "https://via.placeholder.com/500", // Replace with your item's image URL
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-2xl p-6">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Payment for {auctionItem.name}
        </h1>

        {/* Auction Item Overview */}
        <div className="flex items-center mb-6">
          <img
            src={auctionItem.image}
            alt={auctionItem.name}
            className="h-32 w-32 rounded-lg object-cover"
          />
          <div className="ml-4">
            <h2 className="text-xl font-semibold text-gray-700">
              {auctionItem.name}
            </h2>
            <p className="text-sm text-gray-600">{auctionItem.description}</p>
            <p className="text-lg font-bold text-blue-600 mt-2">
              Price: {auctionItem.price}
            </p>
          </div>
        </div>

        {/* Payment Details Form */}
        <form className="space-y-4">
          <div>
            <label
              htmlFor="cardName"
              className="block text-gray-700 font-medium mb-1"
            >
              Cardholder's Name
            </label>
            <input
              type="text"
              id="cardName"
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label
              htmlFor="cardNumber"
              className="block text-gray-700 font-medium mb-1"
            >
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              placeholder="1234 5678 9101 1121"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex space-x-4">
            <div className="w-1/2">
              <label
                htmlFor="expiryDate"
                className="block text-gray-700 font-medium mb-1"
              >
                Expiry Date
              </label>
              <input
                type="text"
                id="expiryDate"
                placeholder="MM/YY"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="w-1/2">
              <label
                htmlFor="cvv"
                className="block text-gray-700 font-medium mb-1"
              >
                CVV
              </label>
              <input
                type="password"
                id="cvv"
                placeholder="***"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mt-4"
          >
            Proceed to Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;