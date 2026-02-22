import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, Dumbbell, DollarSign, 
  LogOut, Bell, Search, Menu, X, Plus, UserCog, UserPlus 
} from 'lucide-react';

// --- VIEW IMPORTS ---
import DashboardHome from '../views/DashboardHome'; 
import MembersView from '../views/MembersView';
import FinanceView from '../views/FinanceView';
import EquipmentView from '../views/EquipmentView';
import LeadsView from '../views/LeadsView'; // Fixed import name to match component
import TrainersView from '../views/TrainersView';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // --- 1. TOP NAVIGATION BAR ---
  const TopBar = () => (
    <div className="h-16 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between px-6 sticky top-0 z-20">
      
      <div className="flex items-center gap-4">
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-zinc-400">
          <Menu />
        </button>
        <h2 className="text-white font-bold text-lg hidden md:block capitalize">
          {activeTab.replace('-', ' ')} Management
        </h2>
      </div>

      <div className="flex items-center gap-6">
        {/* MULTI-BRANCH SELECTOR */}
        <div className="hidden md:flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-full px-4 py-1.5">
           <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
           <select className="bg-transparent text-sm font-bold text-white outline-none cursor-pointer">
              <option>Main Branch (Bhilwara)</option>
              <option>City Center Branch</option>
              <option>Udaipur Branch</option>
           </select>
        </div>

        {/* Global Search */}
        <div className="relative hidden md:block">
          <Search size={16} className="absolute left-3 top-3 text-zinc-500" />
          <input 
            type="text" 
            placeholder="Search member, bill, or machine..." 
            className="bg-zinc-900 border border-zinc-800 text-sm text-white rounded-full pl-10 pr-4 py-2 w-64 focus:border-red-600 outline-none"
          />
        </div>
        
        <button className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-lg shadow-red-900/20">
          <Plus size={20} />
        </button>
        
        <div className="relative">
          <Bell size={20} className="text-zinc-400 hover:text-white cursor-pointer" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </div>
        
        {/* Profile Circle - KA for Kartik Agarwal */}
        <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-bold text-white" title="Admin: Kartik Agarwal">
          KA
        </div>
      </div>
    </div>
  );

  // --- 2. CONTENT SWITCHER ---
  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <DashboardHome />;
      case 'leads': return <LeadsView />;
      case 'members': return <MembersView />;
      case 'trainers': return <TrainersView />;
      case 'finance': return <FinanceView />;
      case 'equipment': return <EquipmentView />;
      default: return <DashboardHome />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-zinc-300 font-sans flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-zinc-950 border-r border-zinc-800 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 flex justify-between items-center">
          <h1 className="text-2xl font-black tracking-tighter text-white">IRON<span className="text-red-600">CORE</span></h1>
          <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden text-zinc-500"><X /></button>
        </div>

        <nav className="px-4 space-y-2 mt-4">
          <NavItem id="overview" icon={<LayoutDashboard size={20}/>} label="Dashboard" active={activeTab} set={setActiveTab} />
          <NavItem id="leads" icon={<UserPlus size={20}/>} label="Leads" active={activeTab} set={setActiveTab} />
          <NavItem id="members" icon={<Users size={20}/>} label="Members" active={activeTab} set={setActiveTab} />
          <NavItem id="trainers" icon={<UserCog size={20}/>} label="Trainers" active={activeTab} set={setActiveTab} />
          <NavItem id="finance" icon={<DollarSign size={20}/>} label="Finance" active={activeTab} set={setActiveTab} />
          <NavItem id="equipment" icon={<Dumbbell size={20}/>} label="Inventory" active={activeTab} set={setActiveTab} />
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-zinc-900">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-zinc-500 hover:text-red-500 transition-colors font-bold text-sm">
            <LogOut size={18} /> Logout System
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

const NavItem = ({ id, icon, label, active, set }) => (
  <button
    onClick={() => set(id)}
    className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all font-bold text-sm ${
      active === id ? 'bg-red-600 text-white shadow-lg shadow-red-900/20' : 'text-zinc-500 hover:bg-zinc-900 hover:text-white'
    }`}
  >
    {icon} {label}
  </button>
);

export default AdminPanel;