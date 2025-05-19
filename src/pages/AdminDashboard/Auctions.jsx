import { useState } from 'react';
import ItemTable from '../ItemTable';
import ItemListing from '../ItemListing';

const Auctions = () => {
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'All Items' },
    { id: 'approved', label: 'Approved Items' },
    { id: 'rejected', label: 'Rejected Items' },
    { id: 'pending', label: 'Pending Items' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'all':
        return <ItemTable />;
      case 'approved':
        return <ItemListing />;
      case 'rejected':
      case 'pending':
        return <ItemTable />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Item Management</h2>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      {renderContent()}
    </div>
  );
};

export default Auctions; 