import React from "react";

const AboutPage = () => {
  return (
    <div className=" min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-6 bg-gray-300 shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center border-b-4 border-blue-600 pb-2">
          About Us
        </h1>
        <p className="text-lg text-gray-900 leading-relaxed">
          Welcome to <strong>Your Auction Website</strong>, where buyers and
          sellers meet to trade unique and valuable items in a secure and
          transparent environment. Our mission is to connect people through our
          innovative online auction platform that ensures fairness and
          accessibility for all participants.
        </p>
        <p className="text-lg text-gray-900 leading-relaxed mt-4">
          Founded in [Year], we are passionate about creating a community-driven
          marketplace that encourages trust, competition, and fun. Whether
          you're searching for rare collectibles, antiques, or modern goods, we
          offer a seamless experience to help you achieve your goals.
        </p>
        <p className="text-lg text-gray-900 leading-relaxed mt-4">
          Thank you for choosing us as your trusted auction platform. Let's make
          bidding exciting!
        </p>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Our Values
          </h2>
          <ul className="list-disc ml-6 text-gray-900 space-y-2">
            <li className="hover:text-blue-600 transition duration-300">
              Integrity and transparency in every transaction.
            </li>
            <li className="hover:text-blue-600 transition duration-300">
              Empowering buyers and sellers with robust tools.
            </li>
            <li className="hover:text-blue-600 transition duration-300">
              Creating a community of passionate individuals.
            </li>
          </ul>
        </div>
        <div className="mt-10">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-800 transition duration-300">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;