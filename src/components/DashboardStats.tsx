import React from 'react';
import { DollarSign, Users, TrendingUp, Calendar } from 'lucide-react';

const StatsCard = ({ icon: Icon, label, value, trend }: {
  icon: React.ElementType;
  label: string;
  value: string;
  trend: string;
}) => (
  <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-gray-400 text-sm">{label}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
      </div>
      <Icon className="w-6 h-6 text-emerald-400" />
    </div>
    <p className="text-sm text-emerald-400 mt-4">
      <TrendingUp className="w-4 h-4 inline mr-1" />
      {trend}
    </p>
  </div>
);

const DashboardStats = () => {
  const stats = [
    {
      icon: DollarSign, 
      label: 'Total Pledges',
      value: '$124,592',
      trend: '+12.5% from last month'
    },
    {
      icon: Users,
      label: 'Active Donors',
      value: '1,429',
      trend: '+8.2% new donors'
    },
    {
      icon: Calendar,
      label: 'Pending Pledges',
      value: '38',
      trend: '-4.3% from last week'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default DashboardStats;