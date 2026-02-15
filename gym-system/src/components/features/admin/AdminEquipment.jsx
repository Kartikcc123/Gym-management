import React from 'react';
import { Settings2, Wrench, AlertCircle, CheckCircle2, Plus, History } from 'lucide-react';

const AdminEquipment = ({ equipment }) => {
  // Status Color Logic
  const getStatusStyles = (status) => {
    switch (status) {
      case 'Operational': return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'Maintenance Needed': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'Broken': return 'text-red-500 bg-red-500/10 border-red-500/20';
      default: return 'text-zinc-500 bg-zinc-500/10 border-zinc-500/20';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* 1. HEADER & ACTIONS */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-xl font-black uppercase tracking-tighter">Equipment Inventory</h3>
          <p className="text-zinc-500 text-xs">Track hardware health and service cycles.</p>
        </div>
        <button className="flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-zinc-200 transition-all">
          <Plus size={16} /> Add Asset
        </button>
      </div>

      {/* 2. EQUIPMENT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {equipment.map((item) => (
          <div key={item.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-red-600/30 transition-all group">
            
            {/* Status Header */}
            <div className="flex justify-between items-start mb-6">
              <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border ${getStatusStyles(item.status)}`}>
                {item.status}
              </div>
              <button className="text-zinc-600 hover:text-white transition-colors">
                <Settings2 size={18} />
              </button>
            </div>

            {/* Asset Info */}
            <div className="mb-6">
              <h4 className="text-lg font-bold text-white group-hover:text-red-500 transition-colors">{item.name}</h4>
              <p className="text-zinc-500 text-xs font-mono uppercase">SN: #IRE-{item.id}X99-2026</p>
            </div>

            {/* Service History Timeline (Mini) */}
            <div className="space-y-3 pt-4 border-t border-zinc-800">
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-500 flex items-center gap-1">
                  <History size={14} /> Last Service
                </span>
                <span className="text-zinc-300 font-bold">{item.lastService}</span>
              </div>
              
              {/* Health Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                  <span className="text-zinc-500">Condition</span>
                  <span className={item.status === 'Broken' ? 'text-red-500' : 'text-zinc-300'}>
                    {item.status === 'Operational' ? '98%' : item.status === 'Broken' ? '12%' : '65%'}
                  </span>
                </div>
                <div className="h-1.5 w-full bg-black rounded-full overflow-hidden border border-zinc-800">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${
                      item.status === 'Operational' ? 'bg-green-600 w-[98%]' : 
                      item.status === 'Broken' ? 'bg-red-600 w-[12%]' : 'bg-yellow-600 w-[65%]'
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Action Footer */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-[10px] font-black uppercase hover:bg-zinc-800 transition-all">
                <Wrench size={14} /> Schedule
              </button>
              <button className="flex items-center justify-center gap-2 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-[10px] font-black uppercase hover:text-red-500 transition-all">
                View Logs
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 3. MAINTENANCE SUMMARY (Bottom Widget) */}
      <div className="bg-red-600/5 border border-red-600/20 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-red-600 rounded-xl shadow-lg shadow-red-600/20">
            <AlertCircle size={24} className="text-white" />
          </div>
          <div>
            <h4 className="font-bold text-white">System Alert</h4>
            <p className="text-zinc-400 text-sm">3 assets are approaching their 500-hour service interval.</p>
          </div>
        </div>
        <button className="w-full md:w-auto px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-black uppercase text-xs tracking-widest transition-all">
          Generate Batch Report
        </button>
      </div>
    </div>
  );
};

export default AdminEquipment;