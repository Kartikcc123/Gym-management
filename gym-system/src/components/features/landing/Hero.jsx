// src/components/features/landing/Hero.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Play, Activity } from 'lucide-react';
import Button from '../../common/Button';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-40 scale-105"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-0" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-red-500 font-bold tracking-[0.2em] text-sm md:text-lg mb-4 uppercase">
            Evolution Starts Here
          </h2>
          <h1 className="text-5xl md:text-8xl font-black text-white italic uppercase leading-none mb-8">
            Sculpt Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-white">Future Self</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-lg">
            Experience the next generation of fitness. AI-driven analytics, professional coaching, and a community that pushes past limits.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <Button 
              variant="primary" 
              size="lg" 
              onClick={() => navigate('/dashboard')}
              className="shadow-[0_0_20px_rgba(220,38,38,0.4)]"
            >
              Start Free Trial
            </Button>
            
            <Button variant="ghost" size="lg" icon={Play}>
              Watch Video
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Floating 3D Element */}
      <motion.div 
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-10 md:right-32 hidden md:block"
      >
        <div className="bg-zinc-900/80 backdrop-blur-md p-4 rounded-xl border border-zinc-800 shadow-2xl flex items-center gap-4 w-64">
          <div className="bg-red-600/20 p-3 rounded-full text-red-500">
            <Activity size={24} />
          </div>
          <div>
            <p className="text-gray-400 text-xs uppercase">Live Status</p>
            <p className="text-white font-bold text-lg">500+ Active Members</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;