import React, { useState } from 'react';
import { Filter, ChevronDown, Check } from 'lucide-react';

const FilterDropdown = ({ label, options, selected, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      
      {/* Invisible Backdrop to handle "click outside" */}
      {isOpen && (
        <div className="fixed inset-0 z-30" onClick={() => setIsOpen(false)}></div>
      )}

      {/* The Trigger Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold border transition-all z-30 relative ${
          selected !== 'All' 
            ? 'bg-zinc-800 text-white border-zinc-600' 
            : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:border-zinc-700'
        }`}
      >
        <Filter size={16} className={selected !== 'All' ? 'text-red-500' : ''} />
        <span>{label}: <span className={selected !== 'All' ? 'text-white' : 'text-zinc-500'}>{selected}</span></span>
        <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* The Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl z-40 overflow-hidden animate-in fade-in zoom-in-95 duration-100 origin-top-right">
          <div className="p-1">
            
            {/* "All" Option */}
            <button
              onClick={() => { onSelect('All'); setIsOpen(false); }}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-left hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors"
            >
              <span>All</span>
              {selected === 'All' && <Check size={14} className="text-red-500" />}
            </button>

            {/* Dynamic Options */}
            {options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => { onSelect(option); setIsOpen(false); }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-left hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors"
              >
                <span>{option}</span>
                {selected === option && <Check size={14} className="text-red-500" />}
              </button>
            ))}
            
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;