import React, { useState } from 'react';
import { Search, UserPlus, Filter, MoreHorizontal, Mail, Phone, AlertCircle } from 'lucide-react';

const MembersView = () => {
  const [filter, setFilter] = useState('All');

  // Tab Button Component
  const TabBtn = ({ label, count, active }) => (
    <button 
      onClick={() => setFilter(label)}
      className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${
        active 
          ? 'bg-zinc-800 text-white shadow-sm' 
          : 'text-zinc-500 hover:text-white hover:bg-zinc-900'
      }`}
    >
      {label} <span className={`ml-1 text-[10px] px-1.5 py-0.5 rounded-full ${active ? 'bg-zinc-950 text-white' : 'bg-zinc-800'}`}>{count}</span>
    </button>
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
      
      {/* 1. CONTROLS BAR */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-zinc-900 border border-zinc-800 p-2 rounded-2xl">
        <div className="flex gap-1 p-1">
          <TabBtn label="All Members" count="842" active={filter === 'All'} />
          <TabBtn label="Active" count="720" active={filter === 'Active'} />
          <TabBtn label="Defaulters" count="45" active={filter === 'Defaulters'} />
          <TabBtn label="PT Clients" count="120" active={filter === 'PT Clients'} />
        </div>
        
        <div className="flex gap-2 w-full md:w-auto px-2">
          <div className="relative flex-1 md:w-64">
            <Search size={16} className="absolute left-3 top-2.5 text-zinc-500" />
            <input 
              type="text" 
              placeholder="Search by name, phone..." 
              className="w-full bg-zinc-950 border border-zinc-800 text-sm text-white rounded-xl pl-10 pr-4 py-2 focus:border-red-600 outline-none"
            />
          </div>
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-red-900/20">
            <UserPlus size={16} /> <span className="hidden md:inline">Add New</span>
          </button>
        </div>
      </div>

      {/* 2. ADVANCED TABLE */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-zinc-950 text-zinc-500 text-[10px] uppercase font-bold border-b border-zinc-800">
            <tr>
              <th className="px-6 py-4">Member Details</th>
              <th className="px-6 py-4">Plan & Expiry</th>
              <th className="px-6 py-4">Last Visit</th>
              <th className="px-6 py-4">Payment Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/50">
            <MemberRow 
              name="Arjun Das" 
              id="#MEM-001" 
              img="https://i.pravatar.cc/150?img=60"
              plan="Gold (Yearly)" 
              expiry="Dec 2026"
              last="Yesterday" 
              status="Paid" 
            />
             <MemberRow 
              name="Rohan Mehta" 
              id="#MEM-042" 
              img="https://i.pravatar.cc/150?img=33"
              plan="Silver (Monthly)" 
              expiry="Feb 28, 2026"
              last="24 Days Ago" 
              status="Overdue" 
              danger 
            />
            <MemberRow 
              name="Kavita Roy" 
              id="#MEM-099" 
              img="https://i.pravatar.cc/150?img=5"
              plan="Personal Training" 
              expiry="Mar 15, 2026"
              last="Today" 
              status="Paid" 
            />
          </tbody>
        </table>
      </div>
    </div>
  );
};

const MemberRow = ({ name, id, img, plan, expiry, last, status, danger }) => (
  <tr className="hover:bg-zinc-800/30 transition-colors group">
    <td className="px-6 py-4">
      <div className="flex items-center gap-3">
        <img src={img} alt={name} className="w-10 h-10 rounded-full border border-zinc-700" />
        <div>
          <h4 className="font-bold text-sm text-white">{name}</h4>
          <p className="text-xs text-zinc-500">{id}</p>
        </div>
      </div>
    </td>
    <td className="px-6 py-4">
      <div className="font-medium text-sm text-zinc-300">{plan}</div>
      <div className="text-xs text-zinc-500">Expires: {expiry}</div>
    </td>
    <td className="px-6 py-4">
      <span className={`text-xs font-bold ${danger ? 'text-red-500' : 'text-zinc-400'}`}>
        {last}
      </span>
      {danger && <p className="text-[10px] text-red-500/70 mt-0.5">Retention Risk</p>}
    </td>
    <td className="px-6 py-4">
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${
        danger 
          ? 'bg-red-500/10 text-red-500 border-red-500/20' 
          : 'bg-green-500/10 text-green-500 border-green-500/20'
      }`}>
        {danger ? <AlertCircle size={10} /> : null} {status}
      </span>
    </td>
    <td className="px-6 py-4 text-right">
      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-zinc-400 hover:text-white"><Phone size={14}/></button>
        <button className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-zinc-400 hover:text-white"><Mail size={14}/></button>
        <button className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-zinc-400 hover:text-white"><MoreHorizontal size={14}/></button>
      </div>
    </td>
  </tr>
);

export default MembersView;