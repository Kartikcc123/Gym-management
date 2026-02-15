import React from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, Calendar, Download, CheckCircle, 
  AlertCircle, ChevronRight, FileText 
} from 'lucide-react';
import useAuth from '../../../hooks/useAuth';

const BillingHistory = () => {
  const { user } = useAuth();

  // Mock Data - In a real app, fetch this from your backend
  const invoices = [
    { id: 'INV-001', date: 'Feb 12, 2026', plan: 'Gold Plan Membership', amount: '$89.00', status: 'Paid', method: 'Visa •••• 4242' },
    { id: 'INV-002', date: 'Jan 12, 2026', plan: 'Gold Plan Membership', amount: '$89.00', status: 'Paid', method: 'Visa •••• 4242' },
    { id: 'INV-003', date: 'Dec 12, 2025', plan: 'Silver Plan Membership', amount: '$49.00', status: 'Paid', method: 'Visa •••• 4242' },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <motion.div 
      initial="hidden" 
      animate="visible" 
      variants={containerVariants}
      className="max-w-5xl mx-auto space-y-8"
    >
      {/* 1. HEADER & CURRENT STATUS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Current Plan Card */}
        <div className="md:col-span-2 bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-zinc-400 text-xs font-bold uppercase tracking-widest mb-1">Current Subscription</h2>
              <h3 className="text-3xl font-black italic text-white uppercase">{user?.plan || 'No Active Plan'}</h3>
            </div>
            <div className="p-3 bg-red-600/10 rounded-xl border border-red-600/20 text-red-500">
              <CreditCard size={24} />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:items-center text-sm text-zinc-400">
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-green-500" />
              <span>Status: <span className="text-white font-bold">Active</span></span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-zinc-700 rounded-full" />
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>Next Billing: <span className="text-white font-bold">March 12, 2026</span></span>
            </div>
          </div>
        </div>

        {/* Payment Method Card */}
        <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl flex flex-col justify-between hover:border-zinc-700 transition-colors cursor-pointer group">
           <div>
             <h2 className="text-zinc-400 text-xs font-bold uppercase tracking-widest mb-4">Payment Method</h2>
             <div className="flex items-center gap-3 text-white">
               <div className="w-10 h-6 bg-white rounded flex items-center justify-center">
                 <span className="text-black font-bold text-[10px] italic">VISA</span>
               </div>
               <span className="font-mono text-lg">•••• 4242</span>
             </div>
           </div>
           <div className="mt-4 flex items-center text-xs text-red-500 font-bold uppercase tracking-wider gap-1 group-hover:gap-2 transition-all">
             Update Method <ChevronRight size={14} />
           </div>
        </div>
      </div>

      {/* 2. INVOICE HISTORY TABLE */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <FileText size={20} className="text-red-600" /> Billing History
          </h3>
          <button className="text-xs text-zinc-500 hover:text-white transition-colors">Download All</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 text-xs font-bold text-zinc-500 uppercase tracking-wider">
                <th className="p-4 pl-6">Invoice</th>
                <th className="p-4">Date</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right pr-6">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {invoices.map((inv) => (
                <tr key={inv.id} className="group hover:bg-zinc-900/50 transition-colors border-b border-zinc-800/50 last:border-0">
                  <td className="p-4 pl-6">
                    <div className="font-bold text-white">{inv.plan}</div>
                    <div className="text-xs text-zinc-500">{inv.method}</div>
                  </td>
                  <td className="p-4 text-zinc-400">{inv.date}</td>
                  <td className="p-4 font-bold text-white">{inv.amount}</td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-green-900/20 text-green-500 border border-green-900/30">
                      <CheckCircle size={10} /> {inv.status}
                    </span>
                  </td>
                  <td className="p-4 text-right pr-6">
                    <button className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-white transition-colors" title="Download Invoice">
                      <Download size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Mobile View Placeholder (visible only on small screens if you hide table) */}
        {/* For simplicity, the table above scrolls horizontally on mobile. */}
      </div>

    </motion.div>
  );
};

export default BillingHistory;