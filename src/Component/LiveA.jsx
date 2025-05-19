import React from "react";
import { NavLink } from "react-router-dom";

const liveItems = [
  {
    name: "Property",
    image:
      "https://i.pinimg.com/736x/11/5b/d0/115bd0be35b4ac368e20654832467750.jpg",
    desc: "A luxurious property for auction. Don't miss the chance!",
    location: "New York, USA",
    startingBid: "$10000",
    description: "Residential and commercial properties available for bidding.",
    status: "Ongoing",
  },
  {
    name: "Antiques",
    image:
      "https://i.pinimg.com/474x/e2/98/6a/e2986a4a927b7130a8caff76b9dbdb3c.jpg",
    desc: "Rare and valuable antique piece for collectors.",
    location: "London, UK",
    startingBid: "$10000",
    description: "Residential and commercial properties available for bidding.",
    status: "Ongoing",
  },
  {
    name: "Electronic",
    image:
      "https://images.unsplash.com/photo-1678657053777-87beb4656912?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQ0fHxjYW1lcmFzfGVufDB8fDB8fHww",
    desc: "High-quality electronics for your home or office.",
    location: "Berlin, Germany",
    startingBid: "$10000",
    description: "Residential and commercial properties available for bidding.",
    status: "Ongoing",
  },
  {
    name: "Vehicles",
    image:
      "https://images.unsplash.com/photo-1633096816910-25f60d9f411b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNhciUyMGF1Y3Rpb258ZW58MHx8MHx8fDA%3D",
    desc: "Luxury car waiting for its next owner through live auction.",
    location: "Tokyo, Japan",
    startingBid: "$10000",
    description: "Residential and commercial properties available for bidding.",
    status: "Ongoing",
  },
  {
    name: "Vehicles",
    image:
      "https://images.unsplash.com/photo-1633096816910-25f60d9f411b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNhciUyMGF1Y3Rpb258ZW58MHx8MHx8fDA%3D",
    desc: "Luxury car waiting for its next owner through live auction.",
    location: "Tokyo, Japan",
    startingBid: "$10000",
    description: "Residential and commercial properties available for bidding.",
    status: "Ongoing",
  },
  {
    name: "Vehicles",
    image:
      "https://images.unsplash.com/photo-1633096816910-25f60d9f411b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNhciUyMGF1Y3Rpb258ZW58MHx8MHx8fDA%3D",
    desc: "Luxury car waiting for its next owner through live auction.",
    location: "Tokyo, Japan",
    startingBid: "$10000",
    description: "Residential and commercial properties available for bidding.",
    status: "Ongoing",
  },
  {
    name: "Vehicles",
    image:
      "https://images.unsplash.com/photo-1633096816910-25f60d9f411b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNhciUyMGF1Y3Rpb258ZW58MHx8MHx8fDA%3D",
    desc: "Luxury car waiting for its next owner through live auction.",
    location: "Tokyo, Japan",
    startingBid: "$10000",
    description: "Residential and commercial properties available for bidding.",
    status: "Ongoing",
  },
  {
    name: "Vehicles",
    image:
      "https://images.unsplash.com/photo-1633096816910-25f60d9f411b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNhciUyMGF1Y3Rpb258ZW58MHx8MHx8fDA%3D",
    desc: "Luxury car waiting for its next owner through live auction.",
    location: "Tokyo, Japan",
    startingBid: "$10000",
    description: "Residential and commercial properties available for bidding.",
    status: "Ongoing",
  }
];

function LiveAuction() {
  return (
    <div className="w-7/10 m-auto">
      {/* Heading */}
      
      <div className="text-center mt-24">
      <p className="text-5xl font-semibold text-gray-800">Live Auction</p>
      <p className="mt-2 text-lg font-semibold text-gray-700">
      Explore Live Auctions And Find the Best Deals
      </p>
      </div>

      {/* Auction Cards */}
      <div className="flex flex-wrap justify-center items-center gap-4 mt-12">
         {liveItems.map((item, index) => (
                  <div
                    key={index}
                    className="w-60 bg-white rounded-lg shadow-lg overflow-hidden"
                  >
                    {/* Image Section */}
                    <div className="overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-36 w-full object-cover"
                      />
                    </div>
        
                    {/* Details Section */}
                    <div className="p-3 m-auto">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {item.name}
                      </h3>
                      <p className="text-xs text-gray-600 mt-2 line-clamp-3">
                        {item.description}
                      </p>
                      <p className="mt-2 text-blue-700 text-sm font-medium">
                        Starting Bid: {item.startingBid}
                      </p>
                      <p
                        className="mt-1 text-xs font-medium 
                          text-green-600"
                            
                           
                        
                      >
                        Status: {item.status}
                      </p>
                      <NavLink to={`/Detail/${index}`}>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-lg mt-4">
                          Bid Now
                        </button>
                      </NavLink>
                    </div>
                  </div>
                ))}
      </div>
    </div>
  );
}

export default LiveAuction;