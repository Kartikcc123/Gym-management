import React, { useState } from 'react';
import { Send, Users, Filter, Info } from 'lucide-react';

const BulkMessagePanel = () => {
  const [target, setTarget] = useState('all');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSend = () => {
    setIsSending(true);
    // Simulate API call to /api/admin/bulk-email
    setTimeout(() => {
      setIsSending(false);
      alert(`Message queued for ${target} members!`);
      setMessage('');
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl">
        <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
          <Send className="text-red-600" size={20} /> Broadcast Announcement
        </h3>
        <p className="text-zinc-500 text-xs mb-8 uppercase tracking-widest font-black">
          Send a notification to your customer base.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Settings Column */}
          <div className="space-y-6">
            <div>
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-2">Target Audience</label>
              <select 
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="w-full bg-black border border-zinc-800 rounded-xl p-3 text-sm font-bold outline-none focus:border-red-600 transition-all"
              >
                <option value="all">All Members</option>
                <option value="Platinum">Platinum Only</option>
                <option value="Gold">Gold Only</option>
                <option value="Expired">Expired Members</option>
              </select>
            </div>

            <div className="p-4 bg-red-600/5 border border-red-600/20 rounded-xl">
              <div className="flex gap-2 text-red-500 mb-1">
                <Info size={14} />
                <span className="text-[10px] font-black uppercase">Anti-Spam Tip</span>
              </div>
              <p className="text-[10px] text-zinc-500 leading-relaxed">
                Avoid using all caps in the subject line to prevent being flagged by mail filters.
              </p>
            </div>
          </div>

          {/* Message Column */}
          <div className="md:col-span-2 space-y-4">
            <input 
              type="text" 
              placeholder="Subject: e.g. New Equipment Arriving This Monday!" 
              className="w-full bg-black border border-zinc-800 rounded-xl p-4 text-sm font-bold outline-none focus:border-red-600 transition-all"
            />
            <textarea 
              rows="8"
              placeholder="Write your message here..."
              className="w-full bg-black border border-zinc-800 rounded-xl p-4 text-sm text-zinc-300 outline-none focus:border-red-600 transition-all resize-none"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            
            <div className="flex items-center justify-between pt-4">
              <span className="text-[10px] text-zinc-600 font-medium">
                Estimated Recipients: <span className="text-white font-bold">~1,240 members</span>
              </span>
              <button 
                onClick={handleSend}
                disabled={isSending || !message}
                className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white px-8 py-3 rounded-xl font-black uppercase text-xs tracking-widest flex items-center gap-2 transition-all shadow-lg shadow-red-600/20"
              >
                {isSending ? "Dispatching..." : <><Send size={16} /> Send Broadcast</>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkMessagePanel;