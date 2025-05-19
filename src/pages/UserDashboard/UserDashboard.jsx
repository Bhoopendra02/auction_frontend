import React, { useEffect, useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';

// Sidebar component
const Sidebar = () => {
  const navItems = [
    { name: 'Profile', path: '/user/dashboard/profile' },
    { name: 'Bids', path: '/user/dashboard/bids' },
    { name: 'Settings', path: '/user/dashboard/settings' },
  ];

  return (
    <aside className="w-64 h-screen bg-white border-r">
      <div className="p-6 text-xl font-bold border-b">User Dashboard</div>
      <nav className="flex flex-col p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `px-4 py-2 rounded hover:bg-gray-100 ${
                isActive ? 'bg-gray-200 font-semibold' : ''
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

const UserDashboard = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default UserDashboard;
