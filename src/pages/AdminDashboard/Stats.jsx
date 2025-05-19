import React from 'react';

const Stats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700">Total Users</h3>
        <p className="text-3xl font-bold text-blue-600">0</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700">Active Auctions</h3>
        <p className="text-3xl font-bold text-green-600">0</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700">Total Sales</h3>
        <p className="text-3xl font-bold text-purple-600">$0</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700">Pending Approvals</h3>
        <p className="text-3xl font-bold text-orange-600">0</p>
      </div>
    </div>
  );
};

export default Stats; 