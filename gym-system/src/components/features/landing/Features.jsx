// src/components/features/landing/Features.jsx
import React from 'react';
import { Dumbbell, Users, Utensils, Activity } from 'lucide-react';
import Card from '../../common/Card';

const FeatureItem = ({ icon: Icon, title, desc }) => (
  <Card hover className="h-full bg-zinc-900 border-zinc-800">
    <div className="w-14 h-14 bg-zinc-800 rounded-lg flex items-center justify-center mb-6 group-hover:bg-red-600 transition-colors duration-300">
      <Icon size={28} className="text-white" />
    </div>
    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-500 transition-colors">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
  </Card>
);

const Features = () => {
  return (
    <section id="features" className="py-24 bg-black relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-red-500 font-bold tracking-widest text-sm uppercase mb-2">Why Choose Us</h2>
          <h3 className="text-4xl md:text-5xl font-black text-white italic uppercase">
            Redefining <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-600">Performance</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureItem 
            icon={Dumbbell} 
            title="Premium Equipment" 
            desc="State-of-the-art biomechanical machinery designed for maximum muscle engagement and safety." 
          />
          <FeatureItem 
            icon={Users} 
            title="Expert Coaching" 
            desc="Certified trainers who build personalized plans based on your unique physiology and goals." 
          />
          <FeatureItem 
            icon={Utensils} 
            title="Smart Nutrition" 
            desc="AI-generated diet plans that adapt to your progress, complete with macro tracking." 
          />
          <FeatureItem 
            icon={Activity} 
            title="Progress Analytics" 
            desc="Visualize your gains with our member app. Track weight, BMI, and 1RM improvements." 
          />
        </div>
      </div>
    </section>
  );
};

export default Features;