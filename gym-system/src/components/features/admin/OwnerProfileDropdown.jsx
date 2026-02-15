import React from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Import Navigation Hook
import { User, Settings, CreditCard, LogOut, ShieldCheck } from 'lucide-react';

const OwnerProfileDropdown = ({ onClose }) => {
  const navigate = useNavigate(); // 2. Initialize Hook

  // Function to handle navigation and close the dropdown
  const handleNavigation = (path) => {
    navigate(path); // Go to the page
    onClose();      // Close the dropdown menu
  };

  const handleLogout = () => {
    // Clear session data
    localStorage.removeItem('token'); 
    navigate('/'); // Redirect to Login/Home
    onClose();
  };

  return (
    <>
      {/* Invisible backdrop to close when clicking outside */}
      <div className="fixed inset-0 z-40" onClick={onClose}></div>

      <div className="absolute right-0 mt-4 w-72 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right">
        
        {/* Profile Header */}
        <div className="p-6 bg-gradient-to-br from-zinc-800 to-zinc-900 border-b border-zinc-800">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-xl font-black border-2 border-black ring-2 ring-red-600/20">
              KA
            </div>
            <div>
              <h4 className="text-sm font-black text-white">Kartik Agarwal</h4>
              <p className="text-[10px] text-zinc-400 font-medium">kartik@ironcore.com</p>
            </div>
          </div>
          
          <div className="bg-black/40 rounded-lg p-2 flex items-center justify-between border border-zinc-700/50">
            <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-1">
              <ShieldCheck size={10} className="text-red-600" /> Enterprise Plan
            </span>
            <span className="text-[9px] font-black text-red-500">PRO</span>
          </div>
        </div>

        {/* Menu Links - SPECIFIC ROUTES ADDED HERE */}
        <div className="p-2">
          
          {/* 1. My Profile -> Opens Owner Profile Page */}
          <DropdownItem 
            icon={<User size={16} />} 
            label="My Profile" 
            sub="Personal details" 
            onClick={() => handleNavigation('/owner/profile')} 
          />

          {/* 2. Gym Settings -> Opens Gym Setting Page */}
          <DropdownItem 
            icon={<Settings size={16} />} 
            label="Gym Settings" 
            sub="Operational config" 
            onClick={() => handleNavigation('/owner/settings')} 
          />

          {/* 3. Billing -> Opens Billing Page */}
          <DropdownItem 
            icon={<CreditCard size={16} />} 
            label="Billing" 
            sub="Invoices & Plans" 
            onClick={() => handleNavigation('/owner/billing')} 
          />

        </div>

        {/* System Health Snapshot */}
        <div className="px-4 py-3 bg-zinc-950/50 border-y border-zinc-800">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[10px] font-bold text-zinc-500 uppercase">System Uptime</span>
            <span className="text-[10px] text-green-500 font-bold">99.9%</span>
          </div>
          <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full bg-green-600 w-[99.9%]"></div>
          </div>
        </div>

        {/* Logout */}
        <div className="p-2">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:bg-red-600/10 hover:text-red-500 transition-all text-sm font-bold"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>

      </div>
    </>
  );
};

// --- CRITICAL FIX IN SUB-COMPONENT ---
// 1. Added 'onClick' to props
// 2. Added onClick={onClick} to the button element
const DropdownItem = ({ icon, label, sub, onClick }) => (
  <button 
    onClick={onClick}
    className="w-full flex items-center gap-4 px-4 py-2.5 rounded-xl hover:bg-zinc-800 transition-all text-left group"
  >
    <div className="text-zinc-500 group-hover:text-white transition-colors">
      {icon}
    </div>
    <div>
      <div className="text-sm font-bold text-zinc-200 group-hover:text-white">{label}</div>
      <div className="text-[9px] text-zinc-500 font-medium uppercase tracking-tighter">{sub}</div>
    </div>
  </button>
);

export default OwnerProfileDropdown;