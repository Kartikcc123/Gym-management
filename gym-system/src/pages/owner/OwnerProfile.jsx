import React from 'react';
import { Save, User, Mail, Phone, MapPin, Camera } from 'lucide-react';

const OwnerProfile = () => {
  return (
    <div className="min-h-screen bg-black p-8 text-zinc-300">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white tracking-tight">My Profile</h1>
        <p className="text-zinc-500">Manage your personal information and security.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: Avatar Card */}
        <div className="lg:col-span-1">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col items-center text-center">
            <div className="relative mb-4 group cursor-pointer">
              <div className="w-32 h-32 bg-red-600 rounded-full flex items-center justify-center text-4xl font-black text-white border-4 border-black ring-4 ring-red-600/20">
                KA
              </div>
              <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                <Camera size={24} className="text-white" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-white">Kartik Agarwal</h2>
            <p className="text-sm text-zinc-500 mb-4">Owner & Administrator</p>
            <div className="w-full bg-zinc-950 rounded-lg p-3 border border-zinc-800">
              <p className="text-xs text-zinc-500 uppercase font-bold mb-1">Member Since</p>
              <p className="text-white font-mono">Sep 2025</p>
            </div>
          </div>
        </div>

        {/* Right Col: Edit Form */}
        <div className="lg:col-span-2">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <User size={20} className="text-red-500" /> Personal Details
            </h3>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="First Name" value="Kartik" />
                <InputField label="Last Name" value="Agarwal" />
              </div>
              
              <InputField label="Email Address" value="kartik@ironcore.com" icon={<Mail size={16} />} type="email" />
              <InputField label="Phone Number" value="+91 98765 43210" icon={<Phone size={16} />} />
              <InputField label="Address" value="123 Iron Street, Muscle City, India" icon={<MapPin size={16} />} />

              <div className="pt-4 flex justify-end">
                <button type="button" className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors">
                  <Save size={18} /> Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

// Reusable Input Component
const InputField = ({ label, value, icon, type = "text" }) => (
  <div className="space-y-2">
    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">{label}</label>
    <div className="relative">
      <input 
        type={type} 
        defaultValue={value}
        className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all pl-10"
      />
      <div className="absolute left-3 top-3.5 text-zinc-600">
        {icon || <User size={16} />}
      </div>
    </div>
  </div>
);

export default OwnerProfile;