import React, { useState } from 'react';
import { Check, Star, Zap, Crown, Globe, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PlanSelection = ({ onSubscribe }) => {
  
  // 1. Define Currency Options & Rates
  const currencies = [
    { code: 'USD', symbol: '$', rate: 1, name: 'United States' },
    { code: 'INR', symbol: '₹', rate: 83.5, name: 'India' },
    { code: 'EUR', symbol: '€', rate: 0.92, name: 'Europe' },
    { code: 'GBP', symbol: '£', rate: 0.79, name: 'United Kingdom' },
    { code: 'AUD', symbol: 'A$', rate: 1.52, name: 'Australia' },
  ];

  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const [isOpen, setIsOpen] = useState(false);

  // 2. Base Plans (Prices in USD)
  const plans = [
    {
      name: 'Silver',
      basePrice: 49,
      icon: Star,
      features: ['Access to Gym Floor', 'Locker Room Access', '1 Free PT Session'],
      color: 'text-zinc-400',
      border: 'border-zinc-800',
      buttonVariant: 'bg-zinc-800 hover:bg-zinc-700 text-white'
    },
    {
      name: 'Gold',
      basePrice: 89,
      badge: 'BEST VALUE',
      icon: Zap,
      features: ['All Silver Features', 'Unlimited Classes', 'Sauna Access', 'Diet Consultation'],
      color: 'text-yellow-500',
      border: 'border-yellow-600/50',
      bg: 'bg-yellow-900/10',
      buttonVariant: 'bg-red-600 hover:bg-red-700 text-white shadow-[0_0_20px_rgba(220,38,38,0.4)]'
    },
    {
      name: 'Platinum',
      basePrice: 129,
      icon: Crown,
      features: ['All Gold Features', '24/7 Access', 'Private Locker', 'Monthly Massage'],
      color: 'text-zinc-100',
      border: 'border-zinc-700',
      buttonVariant: 'bg-zinc-900 border border-zinc-700 hover:bg-zinc-800 text-white'
    }
  ];

  // Helper: Format Price based on Currency
  const getPrice = (basePrice) => {
    const val = Math.round(basePrice * selectedCurrency.rate);
    return `${selectedCurrency.symbol}${val}`;
  };

  return (
    <div className="relative">
      
      {/* CURRENCY DROPDOWN (Professional UI) */}
      <div className="flex justify-end mb-8 relative z-50">
        <div className="relative">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 bg-zinc-900 border border-zinc-700 text-white px-4 py-2 rounded-full hover:bg-zinc-800 transition-all text-sm font-medium"
            >
                <Globe size={16} className="text-zinc-400" />
                <span>{selectedCurrency.flag} {selectedCurrency.code}</span>
                <ChevronDown size={14} className={`text-zinc-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-48 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden"
                    >
                        {currencies.map((c) => (
                            <button
                                key={c.code}
                                onClick={() => {
                                    setSelectedCurrency(c);
                                    setIsOpen(false);
                                }}
                                className="w-full text-left px-4 py-3 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white flex items-center gap-3 transition-colors"
                            >
                                <span className="text-lg">{c.flag}</span>
                                <div>
                                    <div className="font-bold">{c.code}</div>
                                    <div className="text-[10px] text-zinc-500 uppercase">{c.name}</div>
                                </div>
                                {selectedCurrency.code === c.code && <Check size={14} className="ml-auto text-red-500" />}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
      </div>

      {/* PLANS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => {
          const Icon = plan.icon;
          const displayPrice = getPrice(plan.basePrice);
          
          return (
            <div 
              key={plan.name} 
              className={`relative p-8 rounded-2xl border ${plan.border} ${plan.bg || 'bg-zinc-900/50'} flex flex-col transition-transform hover:scale-105 duration-300`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg shadow-red-900/50">
                  {plan.badge}
                </div>
              )}

              <div className="mb-6">
                <Icon className={`w-10 h-10 ${plan.color} mb-4`} />
                <h3 className="text-xl font-bold text-white uppercase italic">{plan.name}</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-4xl font-black text-white">{displayPrice}</span>
                  <span className="text-zinc-500 font-bold">/mo</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-zinc-400">
                    <Check size={16} className="text-red-500" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                /* We now pass BOTH the name and the calculated price string */
                onClick={() => onSubscribe(plan.name, displayPrice)} 
                className={`w-full py-4 rounded-xl font-bold uppercase tracking-wider transition-all ${plan.buttonVariant}`}
              >
                Select Plan
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlanSelection;