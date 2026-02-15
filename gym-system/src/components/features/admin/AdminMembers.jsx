import React, { useState } from 'react';
import { Search, Filter, MoreHorizontal, UserCheck, ShieldAlert, Mail } from 'lucide-react';

const AdminMembers = ({ members }) => {
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
          <input 
            type="text"
            placeholder="Search by name, email, or phone..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:border-red-600 outline-none transition-all"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-zinc-800 transition-all">
            <Filter size={16} /> Filter
          </button>
        </div>
      </div>

      {/* Main Data Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-zinc-950 border-b border-zinc-800">
              <tr>
                <th className="p-5 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Customer</th>
                <th className="p-5 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Plan</th>
                <th className="p-5 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Status</th>
                <th className="p-5 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Joined</th>
                <th className="p-5 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/50">
              {members.filter(m => m.name.toLowerCase().includes(search.toLowerCase())).map((customer) => (
                <tr key={customer.id} className="hover:bg-zinc-800/30 transition-all group">
                  <td className="p-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center font-bold text-red-600 border border-zinc-700">
                        {customer.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white group-hover:text-red-500 transition-colors">{customer.name}</div>
                        <div className="text-[10px] text-zinc-500 font-mono">UID: #{customer.id}0226</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-5">
                    <span className={`text-[10px] font-black px-2 py-1 rounded uppercase tracking-widest ${
                      customer.plan === 'Platinum' ? 'text-blue-400 bg-blue-400/10' : 
                      customer.plan === 'Gold' ? 'text-yellow-500 bg-yellow-500/10' : 'text-zinc-400 bg-zinc-400/10'
                    }`}>
                      {customer.plan}
                    </span>
                  </td>
                  <td className="p-5">
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${customer.status === 'Active' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-red-500'}`} />
                      <span className="text-xs font-bold text-zinc-300">{customer.status}</span>
                    </div>
                  </td>
                  <td className="p-5 text-xs text-zinc-500 font-medium">
                    Feb 2026
                  </td>
                  <td className="p-5 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button title="Email Customer" className="p-2 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-400 hover:text-white transition-all">
                        <Mail size={14} />
                      </button>
                      <button title="Edit User" className="p-2 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-400 hover:text-white transition-all">
                        <MoreHorizontal size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminMembers;