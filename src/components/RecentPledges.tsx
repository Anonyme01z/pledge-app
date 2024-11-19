import React from 'react';
import { MoreVertical } from 'lucide-react';

const RecentPledges = () => {
  const pledges = [
    {
      donor: 'Sarah Johnson',
      amount: '$1,200',
      project: 'Clean Water Initiative',
      status: 'Completed',
      date: '2024-03-15'
    },
    {
      donor: 'Michael Chen',
      amount: '$500',
      project: 'Education Fund',
      status: 'Pending',
      date: '2024-03-14'
    },
    {
      donor: 'Emma Davis',
      amount: '$2,000',
      project: 'Healthcare Access',
      status: 'Processing',
      date: '2024-03-14'
    },
    {
      donor: 'James Wilson',
      amount: '$750',
      project: 'Food Security',
      status: 'Completed',
      date: '2024-03-13'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-500/20 text-green-500';
      case 'Pending':
        return 'bg-yellow-500/20 text-yellow-500';
      case 'Processing':
        return 'bg-blue-500/20 text-blue-500';
      default:
        return 'bg-gray-500/20 text-gray-500';
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Recent Pledges</h2>
        <button className="text-gray-400 hover:text-white">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-400 text-sm">
              <th className="pb-4">Donor</th>
              <th className="pb-4">Amount</th>
              <th className="pb-4">Project</th>
              <th className="pb-4">Status</th>
              <th className="pb-4">Date</th>
            </tr>
          </thead>
          <tbody className="text-gray-300">
            {pledges.map((pledge, index) => (
              <tr key={index} className="border-t border-gray-800">
                <td className="py-4">{pledge.donor}</td>
                <td className="py-4 font-semibold">{pledge.amount}</td>
                <td className="py-4">{pledge.project}</td>
                <td className="py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(pledge.status)}`}>
                    {pledge.status}
                  </span>
                </td>
                <td className="py-4 text-gray-400">{pledge.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentPledges;