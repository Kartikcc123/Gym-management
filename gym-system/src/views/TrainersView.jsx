import React from 'react';
import { UserCog, Calendar, DollarSign, Star, MessageCircle } from 'lucide-react';

const TrainersView = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
           <h2 className="text-2xl font-bold text-white">Trainer Management</h2>
           <p className="text-zinc-500 text-sm">5 Active Trainers • 120 PT Sessions this month</p>
        </div>
        <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2">
           <UserCog size={16} /> Add Trainer
        </button>
      </div>

      {/* TRAINER CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TrainerCard 
           name="Rahul Sharma" 
           specialty="Strength & Conditioning" 
           clients="12 Active Clients" 
           sessions="45" 
           revenue="₹22,500" 
           rating="4.9" 
           img="https://i.pravatar.cc/150?img=11"
        />
        <TrainerCard 
           name="Priya Singh" 
           specialty="Yoga & Mobility" 
           clients="8 Active Clients" 
           sessions="28" 
           revenue="₹14,000" 
           rating="4.8" 
           img="https://i.pravatar.cc/150?img=5"
        />
        <TrainerCard 
           name="Vikram Das" 
           specialty="Weight Loss Expert" 
           clients="15 Active Clients" 
           sessions="60" 
           revenue="₹30,000" 
           rating="5.0" 
           img="https://i.pravatar.cc/150?img=3"
        />
      </div>
    </div>
  );
};

const TrainerCard = ({ name, specialty, clients, sessions, revenue, rating, img }) => (
  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-all group">
    <div className="flex justify-between items-start mb-4">
       <div className="flex gap-4">
          <img src={img} className="w-12 h-12 rounded-xl object-cover" alt={name} />
          <div>
             <h3 className="font-bold text-white text-lg">{name}</h3>
             <p className="text-xs text-zinc-500">{specialty}</p>
          </div>
       </div>
       <div className="flex items-center gap-1 bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded-lg text-xs font-bold">
          <Star size={12} fill="currentColor" /> {rating}
       </div>
    </div>
    
    <div className="grid grid-cols-2 gap-3 mb-4">
       <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800">
          <p className="text-[10px] text-zinc-500 uppercase font-bold">Sessions</p>
          <p className="text-white font-bold text-lg flex items-center gap-1"><Calendar size={14} className="text-blue-500"/> {sessions}</p>
       </div>
       <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800">
          <p className="text-[10px] text-zinc-500 uppercase font-bold">Commission</p>
          <p className="text-white font-bold text-lg flex items-center gap-1"><DollarSign size={14} className="text-green-500"/> {revenue}</p>
       </div>
    </div>

    <div className="flex gap-2">
       <button className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white py-2 rounded-xl text-xs font-bold">View Schedule</button>
       <button className="flex-1 border border-zinc-700 hover:bg-zinc-800 text-zinc-300 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2">
          <MessageCircle size={14} /> Message
       </button>
    </div>
  </div>
);

export default TrainersView;