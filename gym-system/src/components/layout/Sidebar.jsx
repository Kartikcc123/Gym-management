import React from 'react';
import { Home, CreditCard, Utensils, User, LogOut, Settings, HelpCircle } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, onLogout }) => {
  const menuItems = [
    { id: 'home', icon: Home, label: 'Dashboard' },
    { id: 'workout', icon: CreditCard, label: 'My Plan' }, // Changed id to match Dashboard logic
    { id: 'diet', icon: Utensils, label: 'Diet & Nutrition' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  const bottomItems = [
    { id: 'settings', icon: Settings, label: 'Settings' },
    { id: 'help', icon: HelpCircle, label: 'Help' },
  ];

  return (
    <>
      {/* --- DESKTOP SIDEBAR --- */}
      <aside className="hidden md:flex fixed top-0 left-0 h-screen w-64 bg-zinc-950 border-r border-white/5 flex-col z-40">
        <div className="p-8">
          <h1 className="text-2xl font-black italic tracking-tighter text-white">
            IRON<span className="text-red-600">FORGE</span>
          </h1>
          <p className="text-xs text-zinc-500 mt-1 uppercase tracking-widest">Member Portal</p>
        </div>

        {/* Main Navigation */}
        <div className="flex-1 px-4 space-y-2">
          <p className="px-4 text-xs font-bold text-zinc-600 uppercase tracking-wider mb-2">Menu</p>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
                activeTab === item.id 
                  ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.4)]' 
                  : 'text-zinc-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon size={20} className={activeTab === item.id ? "animate-pulse" : "group-hover:scale-110 transition-transform"} />
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Bottom Actions (UPDATED) */}
        <div className="p-4 border-t border-white/5 space-y-2">
          {bottomItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)} // Added Click Handler
              className={`w-full flex items-center gap-4 px-4 py-2 rounded-lg transition-colors ${
                 activeTab === item.id 
                 ? 'text-white bg-white/10' 
                 : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'
              }`}
            >
              <item.icon size={18} />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
          
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-4 px-4 py-2 mt-4 text-red-500 hover:bg-red-900/10 rounded-lg transition-colors"
          >
            <LogOut size={18} />
            <span className="text-sm font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* --- MOBILE NAV (UPDATED) --- */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full h-20 bg-zinc-950 border-t border-white/10 z-50 flex justify-around items-center px-2 pb-2">
        {[...menuItems, ...bottomItems].slice(0, 5).map((item) => ( // Showing top 5 items only on mobile to fit space
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center w-full h-full gap-1 pt-2 transition-colors ${
              activeTab === item.id ? 'text-red-500' : 'text-zinc-500'
            }`}
          >
            <item.icon size={22} />
          </button>
        ))}
      </nav>
    </>
  );
};

export default Sidebar;