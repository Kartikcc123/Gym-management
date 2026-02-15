import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Mail, Calendar, Ruler, Weight, Activity, 
  Edit2, Save, X, Camera, Dumbbell 
} from 'lucide-react';
import useAuth from '../../../hooks/useAuth';
import Button from '../../common/Button';

const UserProfile = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    height: '',
    weight: '',
    goal: ''
  });

  // Load user data into form when component mounts
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        age: user.profile?.age || '',
        height: user.profile?.height || '',
        weight: user.profile?.weight || '',
        goal: user.profile?.goal || 'General Fitness'
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Structure data to match your MongoDB User Model
    const updates = {
      name: formData.name,
      profile: {
        age: Number(formData.age),
        height: Number(formData.height),
        weight: Number(formData.weight),
        goal: formData.goal
      }
    };
    
    updateProfile(updates); // Updates local context immediately
    setIsEditing(false);
    // TODO: In a real app, you would also send a PUT request to backend here
  };

  // Calculate BMI
  const calculateBMI = () => {
    if (formData.height && formData.weight) {
      const heightInMeters = formData.height / 100;
      const bmi = (formData.weight / (heightInMeters * heightInMeters)).toFixed(1);
      return bmi;
    }
    return '--';
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <motion.div 
      initial="hidden" 
      animate="visible" 
      variants={containerVariants}
      className="max-w-4xl mx-auto space-y-6"
    >
      {/* HEADER SECTION */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

        {/* Avatar */}
        <div className="relative group">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-zinc-800 border-4 border-black flex items-center justify-center text-3xl font-black text-zinc-500 overflow-hidden shadow-2xl">
             {/* Placeholder Initials */}
             {user?.name?.charAt(0) || 'U'}
          </div>
          <button className="absolute bottom-0 right-0 bg-red-600 p-2 rounded-full text-white border-4 border-black hover:bg-red-700 transition-colors shadow-lg">
            <Camera size={16} />
          </button>
        </div>

        {/* Name & Plan */}
        <div className="text-center md:text-left flex-1">
          <h2 className="text-2xl md:text-3xl font-black italic text-white uppercase">{user?.name}</h2>
          <p className="text-zinc-400 flex items-center justify-center md:justify-start gap-2 mt-1">
            <Mail size={14} /> {user?.email}
          </p>
          
          <div className="mt-4 flex flex-wrap gap-3 justify-center md:justify-start">
             <span className="px-3 py-1 bg-red-600/10 border border-red-600/30 text-red-500 text-xs font-bold uppercase rounded-full tracking-wider">
                {user?.subscription?.plan || 'No Active Plan'}
             </span>
             <span className="px-3 py-1 bg-zinc-800 border border-zinc-700 text-zinc-400 text-xs font-bold uppercase rounded-full tracking-wider">
                Member
             </span>
          </div>
        </div>

        {/* Edit Toggle */}
        <div className="absolute top-6 right-6">
          {!isEditing ? (
             <button 
               onClick={() => setIsEditing(true)}
               className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm"
             >
               <Edit2 size={16} /> Edit Profile
             </button>
          ) : (
            <div className="flex gap-2">
               <button onClick={() => setIsEditing(false)} className="p-2 bg-zinc-800 rounded-full hover:bg-zinc-700 text-white transition-colors">
                 <X size={18} />
               </button>
               <button onClick={handleSave} className="p-2 bg-green-600 rounded-full hover:bg-green-700 text-white transition-colors shadow-lg shadow-green-900/20">
                 <Save size={18} />
               </button>
            </div>
          )}
        </div>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Height */}
        <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl relative group hover:border-zinc-700 transition-colors">
           <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-blue-900/20 rounded-xl text-blue-500"><Ruler size={24} /></div>
              <span className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Height</span>
           </div>
           <div className="flex items-baseline gap-1">
              {isEditing ? (
                <input 
                  type="number" 
                  name="height" 
                  value={formData.height} 
                  onChange={handleChange}
                  className="bg-black border border-zinc-700 rounded p-1 w-20 text-white font-bold focus:border-blue-500 outline-none" 
                  placeholder="cm"
                />
              ) : (
                <span className="text-3xl font-black text-white italic">{formData.height || '--'}</span>
              )}
              <span className="text-zinc-500 font-bold">cm</span>
           </div>
        </div>

        {/* Weight */}
        <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl relative group hover:border-zinc-700 transition-colors">
           <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-red-900/20 rounded-xl text-red-500"><Weight size={24} /></div>
              <span className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Weight</span>
           </div>
           <div className="flex items-baseline gap-1">
              {isEditing ? (
                <input 
                  type="number" 
                  name="weight" 
                  value={formData.weight} 
                  onChange={handleChange}
                  className="bg-black border border-zinc-700 rounded p-1 w-20 text-white font-bold focus:border-red-500 outline-none" 
                  placeholder="kg"
                />
              ) : (
                <span className="text-3xl font-black text-white italic">{formData.weight || '--'}</span>
              )}
              <span className="text-zinc-500 font-bold">kg</span>
           </div>
        </div>

        {/* BMI Calculator (Auto) */}
        <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl relative group hover:border-zinc-700 transition-colors">
           <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-green-900/20 rounded-xl text-green-500"><Activity size={24} /></div>
              <span className="text-xs text-zinc-500 font-bold uppercase tracking-wider">BMI</span>
           </div>
           <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-white italic">{calculateBMI()}</span>
              <span className="text-xs text-zinc-500 ml-2">
                {calculateBMI() < 18.5 ? 'Underweight' : calculateBMI() < 25 ? 'Healthy' : 'Overweight'}
              </span>
           </div>
        </div>
      </div>

      {/* ADDITIONAL DETAILS FORM */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 md:p-8">
        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <User size={20} className="text-red-600" /> Personal Details
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {/* Full Name */}
           <div className="space-y-2">
              <label className="text-xs text-zinc-500 uppercase font-bold">Full Name</label>
              <input 
                 type="text" 
                 name="name"
                 value={formData.name}
                 onChange={handleChange}
                 disabled={!isEditing}
                 className="w-full bg-black border border-zinc-800 rounded-lg p-3 text-white disabled:text-zinc-400 disabled:border-transparent focus:border-red-600 focus:outline-none transition-colors"
              />
           </div>

           {/* Age */}
           <div className="space-y-2">
              <label className="text-xs text-zinc-500 uppercase font-bold">Age</label>
              <input 
                 type="number" 
                 name="age"
                 value={formData.age}
                 onChange={handleChange}
                 disabled={!isEditing}
                 className="w-full bg-black border border-zinc-800 rounded-lg p-3 text-white disabled:text-zinc-400 disabled:border-transparent focus:border-red-600 focus:outline-none transition-colors"
              />
           </div>

           {/* Goal */}
           <div className="md:col-span-2 space-y-2">
              <label className="text-xs text-zinc-500 uppercase font-bold">Current Goal</label>
              <div className="relative">
                <Dumbbell className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
                <input 
                  type="text" 
                  name="goal"
                  value={formData.goal}
                  onChange={handleChange}
                  disabled={!isEditing}
                  placeholder="e.g. Build Muscle, Lose Fat"
                  className="w-full bg-black border border-zinc-800 rounded-lg p-3 pl-10 text-white disabled:text-zinc-400 disabled:border-transparent focus:border-red-600 focus:outline-none transition-colors"
                />
              </div>
           </div>
        </div>
      </div>

    </motion.div>
  );
};

export default UserProfile;