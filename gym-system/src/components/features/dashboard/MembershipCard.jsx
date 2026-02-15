// src/components/features/dashboard/MembershipCard.jsx
import React from 'react';
import { QrCode, Wifi } from 'lucide-react';
import { motion } from 'framer-motion';

const MembershipCard = ({ user }) => {
  return (
    <div className="perspective-1000">
      <motion.div 
        initial={{ rotateY: 0 }}
        whileHover={{ rotateY: 5 }}
        className="relative h-56 w-full rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 bg-gradient-to-br from-zinc-100 to-zinc-300 text-black p-6 flex flex-col justify-between"
      >
        {/* Card Header */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-black italic tracking-tighter">
              IRON<span className="text-red-600">FORGE</span>
            </h3>
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Elite Member</span>
          </div>
          <Wifi size={20} className="text-zinc-400 rotate-90" />
        </div>

        {/* Card Body (QR) */}
        <div className="flex items-center gap-6">
          <div className="bg-white p-2 rounded-lg shadow-sm">
            <QrCode size={64} className="text-black" />
          </div>
          <div>
            <p className="text-[10px] uppercase text-zinc-500 font-bold mb-1">Member ID</p>
            <p className="font-mono text-lg font-bold tracking-wider">8821-X44</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-bold text-green-700 uppercase">Access Granted</span>
            </div>
          </div>
        </div>

        {/* Card Footer */}
        <div className="flex justify-between items-end border-t border-zinc-300/50 pt-4">
          <div>
            <p className="text-[10px] uppercase text-zinc-500 font-bold">Holder</p>
            <p className="font-bold text-sm">{user?.name || "Kartik Agarwal"}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase text-zinc-500 font-bold">Valid Thru</p>
            <p className="font-bold text-sm">01/27</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MembershipCard;