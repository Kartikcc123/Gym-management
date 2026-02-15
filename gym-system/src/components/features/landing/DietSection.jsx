// src/components/features/landing/DietSection.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import Button from '../../common/Button';

const DietSection = () => {
  return (
    <section id="diet" className="py-24 bg-black relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-red-900/10 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
        {/* Left: Image/App Preview */}
        <div className="flex-1 w-full">
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl shadow-red-900/20"
          >
            <img 
              src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2053&auto=format&fit=crop" 
              alt="Healthy Food" 
              className="w-full h-auto opacity-80"
            />
            {/* Floating UI Overlay */}
            <div className="absolute bottom-6 left-6 right-6 bg-black/80 backdrop-blur-md p-6 rounded-xl border border-zinc-700">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-bold text-white">Daily Macro Goals</h4>
                <span className="text-red-500 text-sm font-bold">85% Achieved</span>
              </div>
              <div className="h-2 bg-zinc-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-red-600 to-red-400 w-[85%]" />
              </div>
              <div className="mt-4 flex justify-between text-xs text-gray-400">
                <span>Protein: 180g</span>
                <span>Carbs: 220g</span>
                <span>Fats: 65g</span>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Right: Text Content */}
        <div className="flex-1">
          <h2 className="text-red-500 font-bold tracking-widest text-sm uppercase mb-2">Nutrition Science</h2>
          <h3 className="text-4xl font-black text-white italic uppercase mb-6">Fuel Your <br /> Ambition</h3>
          <p className="text-gray-400 mb-8 leading-relaxed">
            Exercise is only 40% of the equation. Our gym management system provides you with custom meal plans tailored to your specific metabolic rate and dietary preferences (Vegan, Keto, Paleo).
          </p>
          <ul className="space-y-4 mb-8">
            {['Personalized Meal Plans', 'Grocery Shopping Lists', 'Real-time Macro Tracking', 'Hydration Reminders'].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-gray-300">
                <CheckCircle2 size={20} className="text-red-500" /> {item}
              </li>
            ))}
          </ul>
          <Button variant="outline">
            View Sample Diet
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DietSection;