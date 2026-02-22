import React, { useState, useMemo, useCallback } from 'react'; // Added Hooks
import { useLocation, useNavigate } from 'react-router-dom';
import { Check, X, ShieldCheck, Zap, Star, ArrowRight, ChevronLeft } from 'lucide-react';

const PLAN_PRICES = {
  Silver: "₹2,999",
  Gold: "₹4,999",
  Platinum: "₹7,999"
};

const PlanDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // --- LOGIC UPGRADE: State management for interactivity ---
  const [selectedPlan, setSelectedPlan] = useState(state?.plan ?? "Gold");
  
  // Dynamically update the price based on state
  const currentPrice = useMemo(() => PLAN_PRICES[selectedPlan], [selectedPlan]);

  const handleProceed = useCallback(() => {
    navigate("/payment", { state: { plan: selectedPlan, price: currentPrice } });
  }, [navigate, selectedPlan, currentPrice]);

  // Feature Comparison Data
  const features = [
    { name: "Gym Floor Access", silver: true, gold: true, platinum: true },
    { name: "Locker Room", silver: true, gold: true, platinum: true },
    { name: "Free Wifi", silver: true, gold: true, platinum: true },
    { name: "Group Classes", silver: false, gold: "Unlimited", platinum: "Unlimited" },
    { name: "Guest Pass", silver: false, gold: "1/Month", platinum: "Unlimited" },
    { name: "Sauna & Steam", silver: false, gold: true, platinum: true },
    { name: "Personal Training", silver: "1 Session", gold: "2 Sessions", platinum: "Weekly" },
    { name: "Private Locker", silver: false, gold: false, platinum: true },
    { name: "Massage Therapy", silver: false, gold: false, platinum: "Monthly" },
  ];

  // Helper to render consistent UI cells
  const renderCellContent = (value, isSelected) => {
    if (value === true) return <Check size={20} className={`mx-auto ${isSelected ? "text-red-500" : "text-zinc-500"}`} />;
    if (value === false) return <X size={18} className="mx-auto text-zinc-700" />;
    return <span className={`text-xs font-bold ${isSelected ? "text-red-400" : "text-zinc-500"}`}>{value}</span>;
  };

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      
      {/* 1. Header Area */}
      <div className="bg-zinc-900 border-b border-zinc-800 pt-10 pb-16 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-50" />
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 flex items-center gap-2 text-zinc-500 hover:text-white transition-colors"
        >
          <ChevronLeft size={20} /> Back
        </button>

        <h2 className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-4">You have selected</h2>
        <h1 className="text-4xl md:text-6xl font-black italic uppercase text-white mb-4">
          The <span className="text-red-600">{selectedPlan}</span> Plan
        </h1>
        <p className="text-xl text-zinc-400 max-w-2xl mx-auto italic">
          Excellent choice. You are unlocking the full potential of IronForge.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 -mt-8 relative z-10">
        
        {/* 2. Guarantee Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <Card icon={<ShieldCheck />} color="green" title="No Hidden Fees" desc="What you see is what you pay." />
          <Card icon={<Zap />} color="blue" title="Instant Access" desc="Start training immediately." />
          <Card icon={<Star />} color="yellow" title="7-Day Guarantee" desc="Money back if not satisfied." />
        </div>

        {/* 3. Comparison Table */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden mb-12">
          <div className="p-6 border-b border-zinc-800">
            <h3 className="text-2xl font-black italic uppercase">Plan Comparison</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-900/80 text-zinc-400 text-xs uppercase tracking-wider">
                  <th className="p-4 pl-6 font-bold">Feature</th>
                  {['Silver', 'Gold', 'Platinum'].map((plan) => (
                    <th 
                      key={plan}
                      onClick={() => setSelectedPlan(plan)}
                      className={`p-4 text-center cursor-pointer transition-all ${
                        selectedPlan === plan 
                        ? 'text-red-500 bg-red-900/10 border-t-2 border-red-600' 
                        : 'hover:bg-zinc-800'
                      }`}
                    >
                      {plan} {selectedPlan === plan && '(Selected)'}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {features.map((feature, idx) => (
                  <tr key={idx} className="hover:bg-zinc-800/30 transition-colors">
                    <td className="p-4 pl-6 font-medium text-zinc-300">{feature.name}</td>
                    
                    {['silver', 'gold', 'platinum'].map((level) => {
                      const isSelected = selectedPlan.toLowerCase() === level;
                      return (
                        <td 
                          key={level} 
                          onClick={() => setSelectedPlan(level.charAt(0).toUpperCase() + level.slice(1))}
                          className={`p-4 text-center cursor-pointer ${isSelected ? 'bg-red-900/5' : ''}`}
                        >
                          {renderCellContent(feature[level], isSelected)}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 4. Sticky Bottom Bar */}
      <div className="fixed bottom-0 inset-x-0 bg-zinc-950 border-t border-zinc-800 p-4 md:p-6 z-50">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-xs text-zinc-500 uppercase font-bold tracking-wider">Total due today</span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-white">{currentPrice}</span>
              <span className="text-sm text-zinc-400">/month</span>
            </div>
          </div>

          <button 
            onClick={handleProceed}
            className="group flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(220,38,38,0.4)]"
          >
            Proceed to Payment 
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Sub-component for cleanup
const Card = ({ icon, color, title, desc }) => (
  <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-xl flex items-center gap-4 shadow-xl">
    <div className={`p-3 bg-${color}-900/20 rounded-full text-${color}-500`}>{icon}</div>
    <div>
      <h4 className="font-bold text-white">{title}</h4>
      <p className="text-xs text-zinc-500">{desc}</p>
    </div>
  </div>
);

export default PlanDetails;