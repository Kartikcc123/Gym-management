import React from 'react';
import { X, Save } from 'lucide-react';

const MemberModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">New Member Registration</h2>
          <button onClick={onClose}><X className="text-zinc-500 hover:text-white" /></button>
        </div>

        {/* Form Body */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
           <Input label="Full Name" placeholder="Ex: Arjun Das" />
           <Input label="Phone Number" placeholder="+91 98765 43210" />
           <Input label="Email Address" placeholder="arjun@email.com" />
           
           <div className="space-y-2">
             <label className="text-xs font-bold text-zinc-500 uppercase">Membership Plan</label>
             <select className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl px-4 py-3 outline-none focus:border-red-600">
                <option>Gold Plan (Yearly) - ₹12,000</option>
                <option>Silver Plan (Monthly) - ₹1,500</option>
                <option>Personal Training - ₹5,000</option>
             </select>
           </div>

           <Input label="Start Date" type="date" />
           
           <div className="space-y-2">
             <label className="text-xs font-bold text-zinc-500 uppercase">Assign Branch</label>
             <select className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl px-4 py-3 outline-none focus:border-red-600">
                <option>Main Branch (Bhilwara)</option>
                <option>City Center</option>
             </select>
           </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-zinc-800 flex justify-end gap-4 bg-zinc-950">
           <button onClick={onClose} className="text-zinc-400 hover:text-white font-bold text-sm px-4">Cancel</button>
           <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-red-900/20">
              <Save size={18} /> Register Member
           </button>
        </div>
      </div>
    </div>
  );
};

const Input = ({ label, placeholder, type = "text" }) => (
  <div className="space-y-2">
    <label className="text-xs font-bold text-zinc-500 uppercase">{label}</label>
    <input 
      type={type} 
      placeholder={placeholder}
      className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl px-4 py-3 outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all"
    />
  </div>
);

export default MemberModal;