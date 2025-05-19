import React from "react";
import { Link, useParams } from "react-router-dom";
   

   
const categories = [
  {
    name: "Fine Arts",
    image: "https://i.pinimg.com/474x/88/6c/2d/886c2dd9632df00ec675fdcf6d2fac92.jpg",
    startingBid: "$200",
    description: "A collection of rare and exquisite fine art pieces for collectors.",
    status: "Ongoing",
  },
  {
    name: "Electronic",
    image: "https://images.unsplash.com/photo-1678657053777-87beb4656912?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQ0fHxjYW1lcmFzfGVufDB8fDB8fHww",
    startingBid: "$50",
    description: "Premium electronic gadgets and appliances available for bidding.",
    status: "Upcoming",
  },
  {
    name: "Vehicles",
    image: "https://images.unsplash.com/photo-1633096816910-25f60d9f411b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNhciUyMGF1Y3Rpb258ZW58MHx8MHx8fDA%3D",
    startingBid: "$3000",
    description: "Luxury and vintage vehicles up for auction. Bid now to get this.",
    status: "Closed",
  },
  {
    name: "Properties",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvcGVydGllc3xlbnwwfHwwfHx8MA%3D%3D",
    startingBid: "$10000",
    description: "Residential and commercial properties available for bidding.",
    status: "Ongoing",
  },
  {
    name: "Antiques",
    image: "https://i.pinimg.com/474x/e2/98/6a/e2986a4a927b7130a8caff76b9dbdb3c.jpg",
    startingBid: "$500",
    description: "Timeless antique items for passionate collectors.",
    status: "Upcoming",
  },
  {
    name: "Antiques",
    image: "https://i.pinimg.com/474x/e2/98/6a/e2986a4a927b7130a8caff76b9dbdb3c.jpg",
    startingBid: "$500",
    description: "Timeless antique items for passionate collectors.",
    status: "Upcoming",
  },
  {
    name: "Antiques",
    image: "https://i.pinimg.com/474x/e2/98/6a/e2986a4a927b7130a8caff76b9dbdb3c.jpg",
    startingBid: "$500",
    description: "Timeless antique items for passionate collectors.",
    status: "Upcoming",
  },
  {
    name: "Antiques",
    image: "https://i.pinimg.com/474x/e2/98/6a/e2986a4a927b7130a8caff76b9dbdb3c.jpg",
    startingBid: "$500",
    description: "Timeless antique items for passionate collectors.",
    status: "Upcoming",
  },
];

function Category(props) {
  return (
    <div className="text-center mt-24 w-7/10 m-auto">
      <p className="text-5xl font-semibold text-gray-800">Categories</p>
      <p className="mt-2 text-lg font-semibold text-gray-700">
        Bid, Buy, and Sell Effortlessly Through Leading Auction Platform
      </p>

      {/* Auction Item Cards */}
      <div className="flex justify-center items-center flex-wrap gap-4 mt-12">
        {categories.map((category, index) => (
          <div
            key={index}
            className="w-60 bg-white rounded-lg shadow-lg overflow-hidden"
          >
            {/* Image Section */}
            <div className="overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out">
              <img
                src={category.image}
                alt={category.name}
                className="h-36 w-full object-cover"
              />
            </div>

            {/* Details Section */}
            <div className="p-3">
              <h3 className="text-lg font-semibold text-gray-800">
                {category.name}
              </h3>
              <p className="text-xs text-gray-600 mt-2 line-clamp-3">
                {category.description}
              </p>
              <p className="mt-2 text-blue-700 text-sm font-medium">
                Starting Bid: {category.startingBid}
              </p>
              <p
                className={`mt-1 text-xs font-medium ${
                  category.status === "Ongoing"
                    ? "text-green-600"
                    : category.status === "Upcoming"
                    ? "text-yellow-500"
                    : "text-red-600"
                }`}
              >
                Status: {category.status}
              </p>
              <Link to={`/Detail`}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-lg mt-4">
                  Bid Now
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category;