import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Search, Menu } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import { getGreeting, formatDate } from '../utils/dateHelpers';

// Layout & Common
import Sidebar from '../components/layout/Sidebar';

// Dedicated "Sales" Page for non-members
import MemberOnboarding from './MemberOnboarding';

// Features (Ensure these files exist in your folder structure)
import StatsGrid from '../components/features/dashboard/StatsGrid';
import WorkoutTracker from '../components/features/dashboard/WorkoutTracker';
import MembershipCard from '../components/features/dashboard/MembershipCard';
import DietCard from '../components/features/dashboard/DietCard';
import UserProfile from '../components/features/dashboard/UserProfile';
import BillingHistory from '../components/features/dashboard/BillingHistory';
import SettingsView from '../components/features/dashboard/SettingView';
import HelpView from '../components/features/dashboard/HelpView';

const Dashboard = () => {
  const { user, logout } = useAuth();
  
  // Default tab is 'home'. Other valid values: 'workout', 'diet', 'billing', 'profile'
  const [activeTab, setActiveTab] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // --- TRAFFIC CONTROL LOGIC ---
  const hasActivePlan = user?.plan && user?.plan !== 'none';

  if (!hasActivePlan) {
    return <MemberOnboarding />;
  }
  // -----------------------------

  // 1. HOME VIEW (Dashboard Overview)
  const HomeView = () => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      {/* Top Stats Row */}
      <StatsGrid />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-8">
          <h3 className="text-xl font-bold text-white mb-4">Today's Focus</h3>
          <WorkoutTracker />
        </div>
        
        {/* Sidebar Widgets */}
        <div className="space-y-8">
          <MembershipCard user={user} />
          <DietCard />
        </div>
      </div>
    </motion.div>
  );

  // 2. WORKOUT VIEW (Full Page)
  const WorkoutView = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-4xl"
    >
      <h2 className="text-2xl font-black text-white mb-6 uppercase tracking-tighter">
        Training Log
      </h2>
      <WorkoutTracker mode="full" /> 
    </motion.div>
  );

  // 3. DIET VIEW (Full Page)
  const DietView = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-8"
    >
      <div>
        <h2 className="text-2xl font-black text-white mb-6 uppercase tracking-tighter">
          Nutrition Plan
        </h2>
        <DietCard mode="full" />
      </div>
      {/* You can add a MealLog component here later */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 flex items-center justify-center text-zinc-500">
         <p>Meal History Graph (Coming Soon)</p>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-black text-white font-sans flex relative overflow-hidden">
      
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/80 z-40 md:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Navigation */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={(tab) => {
            setActiveTab(tab);
            setIsMobileMenuOpen(false); // Close menu on selection (mobile)
          }} 
          onLogout={logout} 
        />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 relative min-h-screen bg-zinc-950/50">
        
        {/* Background Noise Texture */}
        <div
          className="fixed inset-0 z-0 opacity-20 pointer-events-none"
          style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }}
        />

        {/* Scrollable Container */}
        <div className="relative z-10 h-screen overflow-y-auto scroll-smooth p-6 md:p-10 pb-24">
          
          {/* Header */}
          <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
            <div className="flex items-center gap-4">
              {/* Mobile Menu Trigger */}
              <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden p-2 bg-zinc-900 rounded-lg text-white"
              >
                <Menu size={24} />
              </button>

              <div>
                <h2 className="text-zinc-500 text-xs font-bold uppercase tracking-widest">
                  {formatDate(new Date())}
                </h2>
                <h1 className="text-2xl md:text-4xl font-black italic text-white mt-1">
                  {getGreeting()}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">{user?.name?.split(' ')[0] || 'Athlete'}</span>
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto mt-4 md:mt-0">
              <div className="hidden md:flex relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-red-500 transition-colors" size={16} />
                <input
                  type="text"
                  placeholder="Search workout..."
                  className="bg-zinc-900 border border-zinc-800 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-red-600 w-64 transition-all duration-300 placeholder:text-zinc-600"
                />
              </div>
              <button className="relative p-2 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors ml-auto md:ml-0">
                <Bell size={20} />
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-600 rounded-full border-2 border-black"></span>
              </button>
            </div>
          </header>

          {/* DYNAMIC CONTENT SWITCHER */}
          <AnimatePresence mode="wait">
            
            {/* 1. HOME TAB */}
            {activeTab === 'home' && (
              <HomeView key="home" />
            )}

            {/* 2. WORKOUT TAB */}
            {activeTab === 'workout' && (
              <WorkoutView key="workout" />
            )}
            
            {/* 3. DIET TAB */}
            {activeTab === 'diet' && (
              <DietView key="diet" />
            )}

            {/* 4. BILLING TAB */}
            {(activeTab === 'billing' || activeTab === 'plan') && (
              <motion.div 
                key="billing"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <h2 className="text-2xl font-black text-white mb-6 uppercase tracking-tighter">
                  Billing History
                </h2>
                <BillingHistory />
              </motion.div>
            )}

            {activeTab === 'settings' && (
  <SettingsView key="settings" />
)}

{/* 6. HELP TAB */}
{activeTab === 'help' && (
  <HelpView key="help" />
)}

            {/* 5. PROFILE TAB */}
            {activeTab === 'profile' && (
              <motion.div 
                key="profile"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <UserProfile />
              </motion.div>
            )}
            
          </AnimatePresence>

          {/* Bottom Spacer for mobile scrolling */}
          <div className="h-20 md:hidden" />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;