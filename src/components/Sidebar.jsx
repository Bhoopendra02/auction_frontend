import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ role }) => {
  const adminLinks = [
    { path: '/admin/dashboard', label: 'Dashboard' },
    { path: '/admin/users', label: 'User Management' },
    { path: '/admin/auctions', label: 'Auction Management' },
    { path: '/admin/reports', label: 'Reports' },
  ];

  const sellerLinks = [
    { path: '/seller/dashboard', label: 'Dashboard' },
    { path: '/seller/auctions', label: 'My Auctions' },
    { path: '/seller/create', label: 'Create Auction' },
    { path: '/seller/sales', label: 'Sales History' },
  ];

  const userLinks = [
    { path: '/user/dashboard', label: 'Dashboard' },
    { path: '/user/bids', label: 'My Bids' },
    { path: '/user/watchlist', label: 'Watchlist' },
    { path: '/user/purchases', label: 'Purchase History' },
  ];

  const links = role === 'admin' ? adminLinks : role === 'seller' ? sellerLinks : userLinks;

  return (
    <div className="w-64 bg-white shadow-lg h-screen">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-6 capitalize">{role} Dashboard</h2>
        <nav>
          <ul className="space-y-2">
            {links.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded-lg ${
                      isActive
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar; 