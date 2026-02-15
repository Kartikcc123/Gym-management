import React, { useState } from 'react';
import { Bell, Lock, Smartphone, Moon, Save } from 'lucide-react';
import { motion } from 'framer-motion';

const SettingsView = () => {
  const [notifications, setNotifications] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => { setIsSaving(false); alert("Settings Saved!"); }, 1000);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
      <h2 className="text-2xl font-black text-white mb-6 uppercase tracking-tighter">Account Settings</h2>
      
      <div className="space-y-6">
        {/* Notification Settings */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Bell className="text-red-600" size={20} /> Notifications
          </h3>
          <div className="flex items-center justify-between p-4 bg-black rounded-xl border border-zinc-800">
            <div>
              <p className="text-white font-bold text-sm">Push Notifications</p>
              <p className="text-xs text-zinc-500">Receive daily workout reminders</p>
            </div>
            <button 
              onClick={() => setNotifications(!notifications)}
              className={`w-12 h-6 rounded-full p-1 transition-colors ${notifications ? 'bg-red-600' : 'bg-zinc-700'}`}
            >
              <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${notifications ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
          </div>
        </div>

        {/* Password Update */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
           <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Lock className="text-red-600" size={20} /> Security
          </h3>
          <div className="space-y-4">
            <input type="password" placeholder="Current Password" className="w-full bg-black border border-zinc-800 rounded-xl p-3 text-sm text-white focus:border-red-600 outline-none" />
            <input type="password" placeholder="New Password" className="w-full bg-black border border-zinc-800 rounded-xl p-3 text-sm text-white focus:border-red-600 outline-none" />
          </div>
        </div>

        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-widest py-4 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isSaving ? 'Saving...' : <><Save size={18} /> Save Changes</>}
        </button>
      </div>
    </motion.div>
  );
};

export default SettingsView;