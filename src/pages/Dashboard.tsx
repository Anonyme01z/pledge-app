import React from 'react';
import DashboardStats from '../components/DashboardStats';
import RecentPledges from '../components/RecentPledges';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
            Export Report
          </button>
          <button className="px-4 py-2 bg-emerald-500 rounded-lg hover:bg-emerald-600 transition-colors">
            New Campaign
          </button>
        </div>
      </div>

      <DashboardStats />
      <RecentPledges />
    </div>
  );
};

export default Dashboard;