import React from 'react';
import { TrendingUp } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, trend, color = "text-white" }) => (
  <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl relative overflow-hidden group hover:border-zinc-700 transition-all">
    <div className="flex justify-between items-start mb-4 relative z-10">
      <div>
        <p className="text-zinc-500 text-xs font-bold uppercase tracking-wider">{title}</p>
        <h3 className={`text-3xl font-black mt-1 ${color}`}>{value}</h3>
      </div>
      <div className="p-3 bg-zinc-800 rounded-xl text-zinc-400 group-hover:text-red-500 transition-colors">
        <Icon size={24} />
      </div>
    </div>
    <div className="flex items-center gap-2 text-sm relative z-10">
      <span className="text-green-500 font-bold flex items-center gap-1">
        <TrendingUp size={14} /> {trend}
      </span>
      <span className="text-zinc-500">vs last month</span>
    </div>
  </div>
);

export default StatCard;