import React, { useState, useRef, useEffect } from 'react'
import { NavLink, Link, Outlet } from 'react-router-dom';

function NavBar() {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const dropdownRef = useRef(null);

  const categories = [
    { name: "Electronics", path: "/category/Electronics" },
    { name: "Vehicles", path: "/category/Vehicle" },
    { name: "Collectibles", path: "/category/Collectibles" },
    { name: "Art ", path: "/category/art" },
    { name: "Antique ", path: "/category/Antique" },
    { name: "Sports ", path: "/category/Sports" }
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsCategoryOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <NavLink to={""} className="flex-shrink-0">
            <p className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
              BidNow
            </p>
          </NavLink>

          {/* Navigation Links */}
          <ul className="hidden md:flex items-center space-x-8">
            <NavLink to={""} className={({ isActive }) => 
              `text-gray-700 hover:text-blue-600 transition-colors duration-200 ${isActive ? 'text-blue-600 font-semibold' : ''}`
            }>
              <li>Home</li>
            </NavLink>
            
             <NavLink to={"/Explore"} className={({ isActive }) => 
              `text-gray-700 hover:text-blue-600 transition-colors duration-200 ${isActive ? 'text-blue-600 font-semibold' : ''}`
            }>
              <li>Explore</li>
            </NavLink>

            {/* Category Dropdown */}
            <li className="relative" ref={dropdownRef}>
              <button 
                type="button"
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                Category
              </button>

              {/* Dropdown Menu */}
              {isCategoryOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                  {categories.map((category) => (
                    <Link
                      key={category.path}
                      to={category.path}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-b border-gray-100 last:border-b-0"
                      onClick={() => setIsCategoryOpen(false)}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
            </li>

            <NavLink to={"/About"} className={({ isActive }) => 
              `text-gray-700 hover:text-blue-600 transition-colors duration-200 ${isActive ? 'text-blue-600 font-semibold' : ''}`
            }>
              <li>About</li>
            </NavLink>

            <NavLink to={"/Contact"} className={({ isActive }) => 
              `text-gray-700 hover:text-blue-600 transition-colors duration-200 ${isActive ? 'text-blue-600 font-semibold' : ''}`
            }>
              <li>Contact</li>
            </NavLink>
          </ul>

          {/* Sign In Button and Profile Icon */}
          <div className="flex items-center space-x-4">
            <NavLink to={"/user/dashboard/profile"} className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </NavLink>
            <NavLink to={"/Form"}>
              <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transform transition-all duration-200 hover:-translate-y-0.5 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                Sign in
              </button>
            </NavLink>
          </div>
        </div>
      </div>
      <Outlet/>
    </div>
  )
}

export default NavBar;
