import React from 'react';
import { X } from 'lucide-react';

const ActionModal = ({ type, onClose, onSubmit, data = {} }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-zinc-900 border border-zinc-700 w-full max-w-md rounded-2xl shadow-2xl relative animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-zinc-800">
          <h3 className="text-xl font-bold text-white">
            {type === 'addMember' && 'Register New Member'}
            {type === 'invoice' && 'Generate Invoice'}
            {type === 'reportIssue' && 'Report Equipment Issue'}
          </h3>
          <button onClick={onClose} className="text-zinc-500 hover:text-white"><X size={20} /></button>
        </div>

        {/* Content */}
        <form onSubmit={onSubmit} className="p-6 space-y-4">
          
          {type === 'addMember' && (
            <>
              <InputGroup label="Full Name" placeholder="John Doe" />
              <InputGroup label="Email" type="email" placeholder="john@example.com" />
              <SelectGroup label="Plan" options={['Gold Plan', 'Silver Plan', 'Platinum Plan']} />
            </>
          )}

          {type === 'invoice' && (
            <>
              <SelectGroup label="Select Member" options={['Kartik Agarwal', 'John Doe', 'Sarah Connor']} />
              <InputGroup label="Amount ($)" type="number" placeholder="89.00" />
              <InputGroup label="Due Date" type="date" />
            </>
          )}

          {type === 'reportIssue' && (
            <>
              <SelectGroup label="Equipment" options={['Treadmill', 'Cable Machine', 'Other']} />
              <SelectGroup label="Priority" options={['High', 'Medium', 'Low']} />
              <div className="space-y-2">
                <label className="text-xs text-zinc-400 uppercase font-bold">Description</label>
                <textarea className="w-full bg-black border border-zinc-700 rounded-lg p-3 text-white focus:border-red-600 outline-none resize-none" rows="3"></textarea>
              </div>
            </>
          )}

          <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl uppercase tracking-wider transition-colors mt-4">
            Confirm Action
          </button>
        </form>
      </div>
    </div>
  );
};

// Simple helpers for the modal form inputs
const InputGroup = ({ label, type = "text", placeholder }) => (
  <div className="space-y-2">
    <label className="text-xs text-zinc-400 uppercase font-bold">{label}</label>
    <input type={type} placeholder={placeholder} className="w-full bg-black border border-zinc-700 rounded-lg p-3 text-white focus:border-red-600 outline-none" required />
  </div>
);

const SelectGroup = ({ label, options }) => (
  <div className="space-y-2">
    <label className="text-xs text-zinc-400 uppercase font-bold">{label}</label>
    <select className="w-full bg-black border border-zinc-700 rounded-lg p-3 text-white focus:border-red-600 outline-none">
      {options.map(opt => <option key={opt}>{opt}</option>)}
    </select>
  </div>
);

export default ActionModal;