// src/components/features/landing/Programs.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const ProgramCard = ({ image, title, subtitle }) => (
  <motion.div 
    className="group relative h-[400px] rounded-2xl overflow-hidden cursor-pointer border border-transparent hover:border-red-600/30 transition-all duration-300"
    whileHover={{ scale: 1.02 }}
  >
    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${image})` }} />
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-60 transition-opacity" />
    
    <div className="absolute bottom-0 left-0 p-8 w-full">
      <p className="text-red-500 text-sm font-bold uppercase tracking-wider mb-2">{subtitle}</p>
      <div className="flex justify-between items-end">
        <h3 className="text-3xl font-black text-white italic uppercase">{title}</h3>
        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
          <ChevronRight className="text-white" />
        </div>
      </div>
    </div>
  </motion.div>
);

const Programs = () => {
  return (
    <section id="classes" className="py-24 bg-zinc-950">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
             <h2 className="text-red-500 font-bold tracking-widest text-sm uppercase mb-2">Our Programs</h2>
             <h3 className="text-4xl md:text-5xl font-black text-white italic uppercase">Train Like a <span className="text-red-600">Pro</span></h3>
          </div>
          <button className="hidden md:flex items-center gap-2 text-white font-bold hover:text-red-500 transition-colors mt-4 md:mt-0">
            VIEW ALL PLANS <ChevronRight size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ProgramCard 
            image="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop"
            title="Hypertrophy"
            subtitle="Muscle Building"
          />
          <ProgramCard 
            image="https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=2069&auto=format&fit=crop"
            title="Shredded"
            subtitle="Fat Loss"
          />
          <ProgramCard 
            image="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop"
            title="Endurance"
            subtitle="Cardio & Stamina"
          />
        </div>
      </div>
    </section>
  );
};

export default Programs;