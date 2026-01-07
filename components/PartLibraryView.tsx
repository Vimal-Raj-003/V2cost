
import React from 'react';

const PartLibraryView: React.FC = () => {
  const parts = [
    { name: 'Gear Box Housing', id: 'GBH-2023-X', desc: 'Alloy casing for Model X Series 5 Transmission Unit', cost: '$450.00', date: 'Oct 24, 2023', owner: 'JS', ownerName: 'J. Smith', qty: 500, status: 'In Progress', statusColor: 'blue' },
    { name: 'Piston Head Assembly', id: 'PHA-9000-Z', desc: 'High durability steel piston for industrial engine', cost: '$120.50', date: 'Oct 20, 2023', owner: 'MD', ownerName: 'M. Doe', qty: 200, status: 'Completed', statusColor: 'green' },
    { name: 'Valve Spring Set', id: 'VSS-004', desc: 'Coil springs for exhaust valve', cost: '$15.00', date: 'Oct 25, 2023', owner: 'AJ', ownerName: 'A. Johnson', qty: '1,000', status: 'Pending', statusColor: 'yellow' },
    { name: 'Support Brackets', id: 'SPB-101', desc: 'Heavy duty mounting brackets', cost: '$85.20', date: 'Oct 26, 2023', owner: 'RK', ownerName: 'R. Khan', qty: 150, status: 'Rejected', statusColor: 'red' },
  ];

  return (
    <div className="flex flex-col gap-6 animate-fadeIn pb-10">
      {/* Header Area */}
      <div className="flex flex-wrap justify-between items-end gap-4 mb-2">
        <div className="flex flex-col gap-2 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">Part Library</h2>
          <p className="text-slate-500 dark:text-slate-400 text-base">Manage your saved parts database, track costs, and monitor casting status updates in real-time.</p>
        </div>
        <button className="bg-primary hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2 transition-all shadow-lg shadow-primary/20">
          <span className="material-symbols-outlined text-[20px]">add</span>
          Add New Part
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-2">
        <StatCard label="Total Parts" value="142" icon="inventory_2" />
        <StatCard label="In Progress" value="12" icon="pending" color="text-blue-600" />
        <StatCard label="Completed" value="128" icon="check_circle" color="text-green-600" />
        <StatCard label="Est. Total Value" value="$45.2k" icon="attach_money" />
      </div>

      {/* Database Container */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl flex flex-col shadow-lg overflow-hidden">
        {/* Table Controls */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex flex-col md:flex-row gap-4 justify-between items-center bg-white dark:bg-slate-800">
          <div className="relative w-full md:w-96 group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors">search</span>
            </div>
            <input 
              className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg leading-5 bg-slate-50 dark:bg-slate-900 placeholder-slate-400 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition-all" 
              placeholder="Search by Part Name, ID, or Description..." 
              type="text"
            />
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700 transition-all text-sm font-medium bg-white dark:bg-slate-800">
              <span className="material-symbols-outlined text-[20px]">filter_list</span>
              Filter
            </button>
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700 transition-all text-sm font-medium bg-white dark:bg-slate-800">
              <span className="material-symbols-outlined text-[20px]">download</span>
              Export
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 dark:bg-slate-900/50 sticky top-0 z-10 border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider" scope="col">Part Name</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider" scope="col">Description</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right" scope="col">Cost</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider" scope="col">Casting Date</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider" scope="col">Owner</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center" scope="col">Qty</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider" scope="col">Status</th>
                <th className="relative px-6 py-4" scope="col"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {parts.map((part, i) => (
                <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="size-8 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center mr-3 text-slate-500">
                        <span className="material-symbols-outlined text-[18px]">settings</span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-900 dark:text-white group-hover:text-primary transition-colors cursor-pointer">{part.name}</div>
                        <div className="text-xs text-slate-500">ID: {part.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-600 dark:text-slate-400 truncate max-w-[240px]" title={part.desc}>{part.desc}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="text-sm font-medium text-slate-900 dark:text-white">{part.cost}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-600 dark:text-slate-400">{part.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="size-6 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-[10px] text-indigo-700 dark:text-indigo-300 font-bold border border-indigo-200 dark:border-indigo-800">{part.owner}</div>
                      <span className="text-sm text-slate-600 dark:text-slate-400">{part.ownerName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="text-sm text-slate-600 dark:text-slate-400 font-mono">{part.qty}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge label={part.status} color={part.statusColor} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-slate-400 hover:text-slate-600 transition-colors">
                      <span className="material-symbols-outlined text-[20px]">more_vert</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="border-t border-slate-200 dark:border-slate-700 p-4 flex items-center justify-between bg-white dark:bg-slate-800">
          <div className="text-sm text-slate-500 hidden sm:block">
            Showing <span className="font-medium text-slate-700 dark:text-slate-300">1</span> to <span className="font-medium text-slate-700 dark:text-slate-300">4</span> of <span className="font-medium text-slate-700 dark:text-slate-300">142</span> results
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
            <button className="p-2 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors disabled:opacity-50">
              <span className="material-symbols-outlined text-[20px]">chevron_left</span>
            </button>
            <button className="px-3.5 py-2 rounded-lg bg-primary text-white text-sm font-medium">1</button>
            <button className="px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-500 hover:text-slate-900 hover:bg-slate-50 text-sm font-medium transition-colors">2</button>
            <button className="px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-500 hover:text-slate-900 hover:bg-slate-50 text-sm font-medium transition-colors">3</button>
            <span className="text-slate-400 px-1">...</span>
            <button className="p-2 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors">
              <span className="material-symbols-outlined text-[20px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ label: string, value: string, icon: string, color?: string }> = ({ label, value, icon, color }) => (
  <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-xl shadow-sm">
    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">{label}</p>
    <div className="flex items-end justify-between">
      <p className={`text-2xl font-bold ${color || 'text-slate-900 dark:text-white'}`}>{value}</p>
      <span className="material-symbols-outlined text-slate-400">{icon}</span>
    </div>
  </div>
);

const StatusBadge: React.FC<{ label: string, color: string }> = ({ label, color }) => {
  const styles = {
    blue: 'bg-blue-50 text-blue-700 border-blue-200 ring-blue-500',
    green: 'bg-green-50 text-green-700 border-green-200 ring-green-500',
    yellow: 'bg-yellow-50 text-yellow-700 border-yellow-200 ring-yellow-400',
    red: 'bg-red-50 text-red-700 border-red-200 ring-red-400',
  }[color as 'blue' | 'green' | 'yellow' | 'red'];

  const dotColor = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-400',
    red: 'bg-red-400',
  }[color as 'blue' | 'green' | 'yellow' | 'red'];

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${styles}`}>
      <span className={`size-1.5 rounded-full ${dotColor} ${color === 'blue' ? 'animate-pulse' : ''}`}></span>
      {label}
    </span>
  );
};

export default PartLibraryView;
