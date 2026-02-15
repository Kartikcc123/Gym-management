import React from 'react';
import { 
  TrendingUp, Users, AlertTriangle, Activity, 
  ArrowUpRight, ArrowDownRight, Clock, DollarSign 
} from 'lucide-react';

const DashboardHome = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
      
      {/* 1. HERO STATS (Gradient Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Revenue" 
          value="₹4.2L" 
          trend="+12.5%" 
          trendUp={true}
          icon={<DollarSign className="text-white" />} 
          color="from-green-600 to-green-900"
        />
        <StatCard 
          title="Active Members" 
          value="842" 
          trend="+5.2%" 
          trendUp={true}
          icon={<Users className="text-white" />} 
          color="from-blue-600 to-blue-900"
        />
        <StatCard 
          title="Pending Dues" 
          value="₹85k" 
          trend="14 Members" 
          trendUp={false} // Bad trend
          icon={<AlertTriangle className="text-white" />} 
          color="from-red-600 to-red-900"
        />
        <StatCard 
          title="Live Occupancy" 
          value="42" 
          trend="Peak Hours" 
          trendUp={true}
          icon={<Activity className="text-white" />} 
          color="from-purple-600 to-purple-900"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 2. LIVE FLOOR ACTIVITY (The "Who is here" tracker) */}
        <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-white">Live Floor Activity</h3>
              <p className="text-xs text-zinc-500">Real-time check-ins from the turnstile.</p>
            </div>
            <span className="flex items-center gap-2 text-xs font-bold text-green-500 bg-green-500/10 px-3 py-1 rounded-full animate-pulse">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span> Live
            </span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="text-[10px] uppercase font-bold text-zinc-500 border-b border-zinc-800">
                <tr>
                  <th className="pb-3 pl-4">Member</th>
                  <th className="pb-3">Check-in</th>
                  <th className="pb-3">Plan</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                <CheckInRow name="Rahul Sharma" img="https://i.pravatar.cc/150?img=11" time="2 mins ago" plan="Gold Plan" status="Active" />
                <CheckInRow name="Priya Singh" img="https://i.pravatar.cc/150?img=5" time="14 mins ago" plan="Silver Plan" status="Expiring" warning />
                <CheckInRow name="Amit Verma" img="https://i.pravatar.cc/150?img=3" time="42 mins ago" plan="PT Session" status="Active" />
                <CheckInRow name="Sneha Gupta" img="https://i.pravatar.cc/150?img=9" time="1 hr ago" plan="Gold Plan" status="Overdue" danger />
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. URGENT TASKS (The "To-Do" list) */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col h-full">
          <h3 className="text-lg font-bold text-white mb-1">Attention Needed</h3>
          <p className="text-xs text-zinc-500 mb-4">You have 4 critical tasks.</p>
          
          <div className="flex-1 space-y-3">
            <TaskItem title="Treadmill #4 Motor Issue" tag="Maintenance" color="bg-red-500" time="2h ago" />
            <TaskItem title="Verify Arjun's Bank Transfer" tag="Finance" color="bg-yellow-500" time="5h ago" />
            <TaskItem title="Restock Whey Protein (Choco)" tag="Inventory" color="bg-blue-500" time="1d ago" />
            <TaskItem title="Approve Trainer Leave" tag="HR" color="bg-purple-500" time="1d ago" />
          </div>

          <button className="w-full mt-4 py-3 bg-zinc-950 border border-zinc-800 hover:bg-zinc-800 text-white text-xs font-bold rounded-xl transition-all">
            Mark All as Read
          </button>
        </div>
      </div>
    </div>
  );
};

// --- SUB COMPONENTS ---
const StatCard = ({ title, value, trend, trendUp, icon, color }) => (
  <div className={`relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br ${color} border border-white/10 shadow-xl`}>
    <div className="relative z-10">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">{icon}</div>
        <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full bg-black/20 text-white`}>
          {trendUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />} {trend}
        </div>
      </div>
      <h3 className="text-3xl font-black text-white tracking-tight">{value}</h3>
      <p className="text-xs font-bold text-white/70 uppercase tracking-wider mt-1">{title}</p>
    </div>
    {/* Decorative Background Pattern */}
    <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
  </div>
);

const CheckInRow = ({ name, img, time, plan, status, warning, danger }) => (
  <tr className="group hover:bg-zinc-800/50 transition-colors">
    <td className="py-3 pl-4 flex items-center gap-3">
      <img src={img} alt={name} className="w-8 h-8 rounded-full border border-zinc-700" />
      <span className="font-bold text-sm text-white">{name}</span>
    </td>
    <td className="py-3 text-xs text-zinc-400 font-mono"><span className="flex items-center gap-1"><Clock size={10}/> {time}</span></td>
    <td className="py-3 text-xs text-zinc-500">{plan}</td>
    <td className="py-3">
      <span className={`text-[10px] font-bold px-2 py-1 rounded border ${
        danger ? 'bg-red-500/10 text-red-500 border-red-500/20' : 
        warning ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' : 
        'bg-green-500/10 text-green-500 border-green-500/20'
      }`}>{status}</span>
    </td>
  </tr>
);

const TaskItem = ({ title, tag, color, time }) => (
  <div className="flex items-center gap-3 p-3 bg-zinc-950 rounded-xl border border-zinc-800 hover:border-zinc-700 cursor-pointer transition-all group">
    <div className={`w-1 self-stretch rounded-full ${color}`}></div>
    <div className="flex-1">
      <h4 className="text-sm font-bold text-zinc-200 group-hover:text-white transition-colors">{title}</h4>
      <div className="flex justify-between items-center mt-1">
        <span className="text-[10px] bg-zinc-900 text-zinc-500 px-1.5 py-0.5 rounded border border-zinc-800">{tag}</span>
        <span className="text-[10px] text-zinc-600">{time}</span>
      </div>
    </div>
  </div>
);

export default DashboardHome;