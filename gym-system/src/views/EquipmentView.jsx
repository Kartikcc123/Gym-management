import React, { useState } from 'react';
import { Wrench, CheckCircle, AlertOctagon, Plus, Filter, Calendar } from 'lucide-react';

const EquipmentView = () => {
  const [filter, setFilter] = useState('All');

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
      
      {/* 1. HEADER & CONTROLS */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
         <div>
            <h2 className="text-xl font-bold text-white">Equipment Inventory</h2>
            <p className="text-sm text-zinc-500">Manage 48 assets across 3 floors.</p>
         </div>
         <div className="flex gap-2">
            <select 
              className="bg-zinc-900 border border-zinc-800 text-sm text-white rounded-xl px-4 py-2 outline-none focus:border-red-600"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
               <option>All Equipment</option>
               <option>Cardio</option>
               <option>Strength</option>
               <option>Maintenance Needed</option>
            </select>
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-red-900/20">
               <Plus size={16} /> Add Asset
            </button>
         </div>
      </div>

      {/* 2. EQUIPMENT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <MachineCard 
          name="Treadmill #4" 
          id="AST-004"
          category="Cardio"
          status="Maintenance" 
          lastService="Needs Repair" 
          issue="Motor overheating - Tech called"
          danger 
        />
        <MachineCard 
          name="Cable Crossover" 
          id="AST-012"
          category="Strength"
          status="Operational" 
          lastService="Jan 15, 2026" 
          nextService="Mar 15, 2026"
        />
        <MachineCard 
          name="Smith Machine" 
          id="AST-008"
          category="Strength"
          status="Operational" 
          lastService="Dec 20, 2025" 
          nextService="Jun 20, 2026"
        />
        <MachineCard 
          name="Elliptical #2" 
          id="AST-005"
          category="Cardio"
          status="Operational" 
          lastService="Feb 01, 2026" 
          nextService="Aug 01, 2026"
        />
      </div>

      {/* 3. MAINTENANCE LOG TABLE */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden mt-8">
        <div className="p-6 border-b border-zinc-800">
           <h3 className="text-lg font-bold text-white">Maintenance Log</h3>
        </div>
        <table className="w-full text-left">
           <thead className="bg-zinc-950 text-zinc-500 text-[10px] uppercase font-bold">
              <tr><th className="px-6 py-4">Asset</th><th className="px-6 py-4">Issue</th><th className="px-6 py-4">Technician</th><th className="px-6 py-4">Cost</th><th className="px-6 py-4">Date</th></tr>
           </thead>
           <tbody className="divide-y divide-zinc-800/50">
              <tr className="hover:bg-zinc-800/30">
                 <td className="px-6 py-4 text-sm text-white font-bold">Leg Press</td>
                 <td className="px-6 py-4 text-xs text-zinc-400">Cable replacement</td>
                 <td className="px-6 py-4 text-xs text-zinc-400">Ravi Tech Services</td>
                 <td className="px-6 py-4 text-sm text-white">₹1,200</td>
                 <td className="px-6 py-4 text-xs text-zinc-500">Feb 10, 2026</td>
              </tr>
           </tbody>
        </table>
      </div>
    </div>
  );
};

// --- SUB COMPONENTS ---
const MachineCard = ({ name, id, category, status, lastService, nextService, issue, danger }) => (
  <div className={`p-5 rounded-2xl border transition-all hover:scale-[1.01] ${danger ? 'bg-red-900/10 border-red-900/50' : 'bg-zinc-900 border-zinc-800'}`}>
    <div className="flex justify-between items-start mb-4">
      <div>
         <h3 className="text-white font-bold text-lg">{name}</h3>
         <p className="text-xs text-zinc-500 font-mono">{id} • {category}</p>
      </div>
      {danger ? <AlertOctagon className="text-red-500" size={24} /> : <CheckCircle className="text-green-500" size={24} />}
    </div>
    
    {danger && (
      <div className="bg-red-950/50 border border-red-900/30 rounded-lg p-3 mb-4">
         <p className="text-xs text-red-400 font-bold mb-1">Current Issue:</p>
         <p className="text-xs text-red-200">{issue}</p>
      </div>
    )}

    <div className="flex justify-between items-center mt-4 pt-4 border-t border-zinc-800/50">
      <div>
         <p className="text-[10px] text-zinc-500 uppercase font-bold">Status</p>
         <span className={`text-xs font-bold ${danger ? 'text-red-500' : 'text-green-500'}`}>
           {status}
         </span>
      </div>
      <div className="text-right">
         <p className="text-[10px] text-zinc-500 uppercase font-bold">Service</p>
         <p className="text-xs text-zinc-300">{danger ? 'Action Required' : nextService}</p>
      </div>
    </div>
    
    {danger && (
        <div className="flex gap-2 mt-4">
           <button className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition-colors">
               Contact Tech
           </button>
           <button className="flex-1 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold rounded-lg transition-colors">
               Resolve
           </button>
        </div>
    )}
  </div>
);

export default EquipmentView;