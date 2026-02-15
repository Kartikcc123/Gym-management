import React, { useState } from 'react';
// import { motion } from 'framer-motion';
import { LogOut, Settings, Lock, Star, TrendingUp, Utensils, Dumbbell } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import PlanSelection from '../components/features/dashboard/PlanSelection';
import UserProfile from '../components/features/dashboard/UserProfile';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/common/BackButton';

const MemberOnboarding = () => {
  const { user, logout} = useAuth();
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  // Handler: When a user selects a plan
  const handleSubscribe = (planName, calculatedPrice) => {
  
  // If PlanSelection sent a price (e.g., "₹7431"), use it.
  // Otherwise, fallback to defaults (safety check)
  let finalPrice = calculatedPrice; 

  if (!finalPrice) {
      if (planName === 'Silver') finalPrice = '$49';
      else if (planName === 'Gold') finalPrice = '$89';
      else if (planName === 'Platinum') finalPrice = '$129';
  }

  // Pass the DYNAMIC price to the next page
  navigate('/plan-details', { state: { plan: planName, price: finalPrice } });
};

  // If user wants to edit profile/logout
  if (showProfile) {
    return (
      <div className="min-h-screen bg-black text-white p-6 md:p-10">
        <button 
          onClick={() => setShowProfile(false)}
          className="mb-6 text-zinc-400 hover:text-white flex items-center gap-2"
        >
          ← Back to Plans
        </button>
        <UserProfile />
        <button onClick={logout} className="mt-8 text-red-500 text-sm font-bold uppercase tracking-wider border border-red-900/30 px-6 py-3 rounded-lg hover:bg-red-900/20">
          Sign Out
        </button>
      </div>
    );
  }

  // --- THE SALES PAGE ---
  return (
    <div className="min-h-screen ...">
        <BackButton />
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 blur-sm" />
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-black via-black/90 to-black" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-10">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl md:text-4xl font-black italic uppercase">
              Welcome, <span className="text-red-600">{user?.name?.split(' ')[0]}</span>
            </h1>
            <p className="text-zinc-400 mt-1">Your profile is created. Now, unlock your potential.</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => setShowProfile(true)}
              className="p-3 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
              title="Profile Settings"
            >
              <Settings size={20} />
            </button>
            <button 
              onClick={logout}
              className="p-3 rounded-full bg-zinc-900 border border-zinc-800 text-red-500 hover:bg-red-900/20 transition-colors"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </header>

        {/* The "Locked" Teaser Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 opacity-50 pointer-events-none select-none relative">
            {/* Overlay Lock */}
            <div className="absolute inset-0 z-20 flex items-center justify-center">
                <div className="bg-black/80 backdrop-blur-md border border-red-600/30 p-6 rounded-2xl text-center shadow-2xl transform md:scale-125">
                    <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(220,38,38,0.5)]">
                        <Lock className="text-white" size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-white uppercase italic">Dashboard Locked</h3>
                    <p className="text-sm text-zinc-400 mt-2">Choose a plan below to access<br/>Analytics, AI Workouts & Nutrition.</p>
                </div>
            </div>

            {/* Mock Cards (To show what they are missing) */}
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl h-40 flex flex-col justify-between">
                <div className="flex justify-between text-zinc-500"><TrendingUp /> <span>Analytics</span></div>
                <div className="h-2 w-2/3 bg-zinc-800 rounded-full animate-pulse"></div>
                <div className="h-2 w-1/2 bg-zinc-800 rounded-full animate-pulse"></div>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl h-40 flex flex-col justify-between">
                <div className="flex justify-between text-zinc-500"><Dumbbell /> <span>Workout Tracker</span></div>
                <div className="h-2 w-3/4 bg-zinc-800 rounded-full animate-pulse"></div>
                <div className="h-2 w-1/2 bg-zinc-800 rounded-full animate-pulse"></div>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl h-40 flex flex-col justify-between">
                <div className="flex justify-between text-zinc-500"><Utensils /> <span>Smart Diet</span></div>
                <div className="h-2 w-2/3 bg-zinc-800 rounded-full animate-pulse"></div>
                <div className="h-2 w-1/3 bg-zinc-800 rounded-full animate-pulse"></div>
            </div>
        </div>

        {/* Benefits List */}
        <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold text-white mb-8 uppercase italic">Why Become a Member?</h2>
            <div className="flex flex-wrap justify-center gap-4 md:gap-12">
                {['Unlimited AI Access', 'Custom Meal Plans', '1-on-1 Coaching', 'Progress Analytics'].map((benefit, i) => (
                    <div key={i} className="flex items-center gap-2 text-zinc-300">
                        <Star className="text-red-600 fill-red-600" size={16} />
                        <span className="font-bold tracking-wide uppercase text-sm">{benefit}</span>
                    </div>
                ))}
            </div>
        </div>

        {/* THE PLAN SELECTION (The main action) */}
        <div className="relative z-30">
            <PlanSelection onSubscribe={handleSubscribe} />
        </div>

      </div>
    </div>
    </div>
  );
};

export default MemberOnboarding;