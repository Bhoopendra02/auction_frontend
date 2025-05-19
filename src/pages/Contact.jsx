import React from "react";

const Contact = () => {
  return (
    <div className=" min-h-screen flex items-center justify-center">
      <div className="max-w-6xl mx-auto flex flex-wrap md:flex-nowrap bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Contact Details Section */}
        <div className="w-full md:w-1/2 bg-gray-300 text-gray-900 p-8">
          <h1 className="text-3xl font-bold mb-4">Get in Touch</h1>
          <p className="text-lg mb-6">
            We're here to help! Reach out to us using the contact information below or fill out the form to send us a message.
          </p>
          <div>
            <h2 className="text-xl font-semibold mb-2">Address</h2>
            <p>123 Auction St, Indore, Madhya Pradesh, India</p>
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Phone</h2>
            <p>+91-9876543210</p>
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Email</h2>
            <p>support@auctionwebsite.com</p>
          </div>
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <form className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Your Name"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Your Email"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Your Message"
                rows="5"
                required
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-green-800 transition duration-300"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;