import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';

const SellerDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar role="seller" />
      <div className="flex-1 overflow-auto">
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SellerDashboard; 