import React from "react";

function Footer()  {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-24">
      <div className=" container mx-auto px-4 ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4">About AuctionPro</h4>
            <p>
              AuctionPro is your one-stop destination for online auctions,
              connecting buyers and sellers with ease. Find great deals and
              rare items at your fingertips.
            </p>
          </div>

          {/* Quick Links */}
          <div className="">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul>
              <li>
                <a
                  href="/about"
                  className="text-gray-400 hover:text-white transition"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-400 hover:text-white transition"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  className="text-gray-400 hover:text-white transition"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="/privacy-policy"
                  className="text-gray-400 hover:text-white transition"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Get in Touch</h4>
            <p>Email: support@auctionpro.com</p>
            <p>Phone: 91 75832 97890</p>
            <p>Address: 123 Auction Street, Indore, MP, India</p>
          </div>
        </div>

        <hr className="border-gray-700 my-6" />

        {/* Bottom Section */}
        <div className="text-center">
          <p className="text-sm text-gray-400">
            &copy; 2025 AuctionPro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;