import React from 'react';
import { 
  Users, 
  DollarSign, 
  Calendar, 
  AlertTriangle, 
  Activity, 
  Clock, 
  ArrowUpRight 
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip 
} from 'recharts';

/**
 * Senior Dev Note: 
 * We use a dedicated StatCard sub-component to keep the main return clean.
 * The 'trend' logic is visual-only here but can be mapped to real data.
 */
const StatCard = ({ title, value, icon: Icon, trend, color = "text-white" }) => (
  <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl hover:border-zinc-700 transition-colors group">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-zinc-950 border border-zinc-800 rounded-lg group-hover:border-red-600/50 transition-colors">
        <Icon size={20} className="text-red-600" />
      </div>
      <span className="text-[10px] font-black bg-zinc-800 px-2 py-1 rounded text-zinc-400 uppercase tracking-tighter">
        {trend}
      </span>
    </div>
    <h3 className="text-zinc-500 text-xs font-bold uppercase tracking-widest">{title}</h3>
    <p className={`text-2xl font-black mt-1 ${color}`}>{value}</p>
  </div>
);

const AdminOverview = ({ revenueData, onQuickAction }) => {
  // Mock activity data - in production, this comes from your AuditLog API
  const activities = [
    { id: 1, text: "New Gold Member: Rahul S.", time: "5m ago", type: "success" },
    { id: 2, text: "Treadmill #2 Maintenance Logged", time: "1h ago", type: "warning" },
    { id: 3, text: "Payment Failed: User #293", time: "3h ago", type: "error" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* 1. TOP ROW: KPI STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Revenue" value="$42,500" icon={DollarSign} trend="+12.5%" />
        <StatCard title="Active Members" value="1,240" icon={Users} trend="+5.2%" />
        <StatCard title="Equipment Issues" value="2" icon={AlertTriangle} trend="-1" color="text-yellow-500" />
        <StatCard title="Expiring Soon" value="14" icon={Calendar} trend="+4" color="text-red-500" />
      </div>

      {/* 2. MIDDLE ROW: CHART & QUICK ACTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* REVENUE CHART */}
        <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold">Revenue Growth</h3>
            <button className="text-xs text-zinc-500 hover:text-white flex items-center gap-1">
              Full Report <ArrowUpRight size={14} />
            </button>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#dc2626" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#dc2626" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} />
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="income" stroke="#dc2626" strokeWidth={3} fillOpacity={1} fill="url(#colorIncome)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* QUICK ACTIONS PANEL */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex flex-col">
           <h3 className="text-lg font-bold mb-6">Quick Actions</h3>
           <div className="space-y-3 flex-1">
              <ActionButton 
                label="Add Member" sub="New registration" icon={Users} color="text-green-500" bg="bg-green-500/10" 
                onClick={() => onQuickAction('addMember')} 
              />
              <ActionButton 
                label="Create Invoice" sub="Billing portal" icon={DollarSign} color="text-blue-500" bg="bg-blue-500/10" 
                onClick={() => onQuickAction('invoice')} 
              />
              <ActionButton 
                label="Report Issue" sub="Equipment logs" icon={AlertTriangle} color="text-yellow-500" bg="bg-yellow-500/10" 
                onClick={() => onQuickAction('reportIssue')} 
              />
           </div>
        </div>
      </div>

      {/* 3. BOTTOM ROW: ACTIVITY FEED */}
      <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Activity className="text-red-600" size={20} /> Recent Activity
          </h3>
          <div className="flex gap-2">
             <div className="flex items-center gap-1 text-[10px] text-zinc-500 px-2 py-1 bg-black rounded border border-zinc-800">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> SYSTEM LIVE
             </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {activities.map((item) => (
            <div key={item.id} className="p-4 bg-zinc-950 border border-zinc-800/50 rounded-xl flex items-center justify-between group hover:border-zinc-600 transition-all">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-zinc-200">{item.text}</span>
                <span className="text-[10px] text-zinc-500 flex items-center gap-1 mt-1">
                  <Clock size={10} /> {item.time}
                </span>
              </div>
              <div className={`w-1 h-8 rounded-full ${
                item.type === 'success' ? 'bg-green-500' : 
                item.type === 'error' ? 'bg-red-500' : 'bg-yellow-500'
              }`} />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

const ActionButton = ({ label, sub, icon: Icon, color, bg, onClick }) => (
  <button 
    onClick={onClick}
    className="w-full p-4 bg-zinc-950 border border-zinc-800 rounded-xl hover:border-red-600/50 transition-all flex items-center gap-4 group"
  >
     <div className={`p-2 ${bg} ${color} rounded-lg group-hover:scale-110 transition-transform`}>
       <Icon size={18} />
     </div>
     <div className="text-left">
        <div className="font-bold text-sm text-white">{label}</div>
        <div className="text-[10px] text-zinc-500 uppercase font-black">{sub}</div>
     </div>
  </button>
);

export default AdminOverview;