import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Dumbbell, 
  DollarSign, 
  LogOut, 
  Settings, 
  BarChart3, 
  LifeBuoy, 
  ChevronLeft, 
  ChevronRight,
  MoreVertical
} from 'lucide-react';

const AdminSidebar = ({ activeTab, setActiveTab }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Grouped Menu Structure
  const menuGroups = [
    {
      label: "Operations",
      items: [
        { id: 'overview', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
        { id: 'members', label: 'Members', icon: <Users size={20} />, badge: 3 }, // Example badge
        { id: 'equipment', label: 'Equipment', icon: <Dumbbell size={20} /> },
        { id: 'finance', label: 'Financials', icon: <DollarSign size={20} /> },
      ]
    },
    {
      label: "System",
      items: [
        { id: 'analytics', label: 'Reports', icon: <BarChart3 size={20} /> },
        { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
        { id: 'support', label: 'Support', icon: <LifeBuoy size={20} /> },
      ]
    }
  ];

  return (
    <div 
      className={`relative h-screen bg-zinc-950 border-r border-zinc-800 flex flex-col transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-20' : 'w-72'
      }`}
    >
      
      {/* --- HEADER --- */}
      <div className="p-6 flex items-center justify-between">
        <div className={`flex items-center gap-3 overflow-hidden transition-all ${isCollapsed ? 'w-0 opacity-0' : 'w-full opacity-100'}`}>
          <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center shrink-0 shadow-lg shadow-red-900/20">
            <span className="font-black text-white text-lg">I</span>
          </div>
          <h1 className="text-xl font-black tracking-tighter text-white whitespace-nowrap">
            IRON<span className="text-red-600">CORE</span>
          </h1>
        </div>
        {/* Collapse Toggle - Only shows logo when collapsed */}
        {isCollapsed && (
             <div className="w-full flex justify-center">
                 <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center shrink-0 font-black text-white">I</div>
             </div>
        )}
      </div>

      {/* --- TOGGLE BUTTON (Absolute positioning) --- */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-9 bg-zinc-900 border border-zinc-700 text-zinc-400 hover:text-white rounded-full p-1 shadow-xl transition-colors z-50 hidden md:flex"
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* --- NAVIGATION --- */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-8 scrollbar-hide">
        {menuGroups.map((group, groupIdx) => (
          <div key={groupIdx}>
            
            {/* Group Label */}
            <div className={`px-4 mb-2 text-[10px] font-bold uppercase tracking-wider text-zinc-600 transition-all ${
              isCollapsed ? 'text-center opacity-0 hidden' : 'opacity-100'
            }`}>
              {group.label}
            </div>

            {/* Menu Items */}
            <div className="space-y-1">
              {group.items.map((item) => (
                <NavItem 
                  key={item.id}
                  item={item}
                  isActive={activeTab === item.id}
                  isCollapsed={isCollapsed}
                  onClick={() => setActiveTab(item.id)}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* --- USER PROFILE FOOTER --- */}
      <div className="p-4 border-t border-zinc-900">
        <div className={`flex items-center gap-3 p-2 rounded-xl transition-colors ${isCollapsed ? 'justify-center' : 'hover:bg-zinc-900'}`}>
            <img 
                src="https://i.pravatar.cc/150?img=11" 
                alt="User" 
                className="w-10 h-10 rounded-full border-2 border-zinc-800"
            />
            
            <div className={`flex-1 overflow-hidden transition-all duration-200 ${isCollapsed ? 'w-0 opacity-0 hidden' : 'w-auto opacity-100'}`}>
                <h4 className="text-sm font-bold text-white truncate">Kartik Agarwal</h4>
                <p className="text-xs text-zinc-500 truncate">Admin Access</p>
            </div>

            <button className={`text-zinc-500 hover:text-red-500 transition-colors ${isCollapsed ? 'hidden' : 'block'}`}>
                <LogOut size={18} />
            </button>
        </div>
      </div>

    </div>
  );
};

// --- SUB-COMPONENT: Navigation Item ---
const NavItem = ({ item, isActive, isCollapsed, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`group relative flex items-center w-full p-3 rounded-xl transition-all duration-200 ease-in-out ${
        isActive 
          ? 'bg-red-600 text-white shadow-lg shadow-red-900/20' 
          : 'text-zinc-500 hover:bg-zinc-900 hover:text-zinc-100'
      } ${isCollapsed ? 'justify-center' : ''}`}
    >
      {/* Icon */}
      <div className={`${isActive ? 'text-white' : 'group-hover:text-red-500'} transition-colors`}>
        {item.icon}
      </div>

      {/* Label (Hidden when collapsed) */}
      {!isCollapsed && (
        <span className="ml-3 font-semibold text-sm whitespace-nowrap">{item.label}</span>
      )}

      {/* Badge (Notification Count) */}
      {item.badge && !isCollapsed && (
        <span className="ml-auto bg-red-500/20 text-red-500 text-[10px] font-bold px-2 py-0.5 rounded-full border border-red-500/20">
          {item.badge}
        </span>
      )}
      {item.badge && isCollapsed && (
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-zinc-950"></span>
      )}

      {/* Tooltip for Collapsed State */}
      {isCollapsed && (
        <div className="absolute left-full ml-2 px-2 py-1 bg-zinc-800 text-white text-xs rounded opacity-0 -translate-x-2 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all z-50 whitespace-nowrap border border-zinc-700 font-bold shadow-xl">
          {item.label}
        </div>
      )}
    </button>
  );
};

export default AdminSidebar;