// src/components/features/dashboard/StatsGrid.jsx
import React from 'react';
import { Flame, Droplets, Dumbbell, TrendingDown } from 'lucide-react';
import Card from '../../common/Card';

const StatItem = ({ icon: Icon, label, value, subValue, color }) => (
  <Card className="flex items-center justify-between p-5">
    <div>
      <div className={`flex items-center gap-2 mb-2 ${color}`}>
        <Icon size={18} />
        <span className="text-xs font-bold uppercase tracking-wider">{label}</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-black text-white">{value}</span>
        {subValue && <span className="text-xs text-zinc-500 font-medium">{subValue}</span>}
      </div>
    </div>
  </Card>
);

const StatsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatItem 
        icon={Flame} 
        label="Streak" 
        value="12 Days" 
        color="text-red-500" 
      />
      <StatItem 
        icon={Droplets} 
        label="Hydration" 
        value="1.5L" 
        subValue="/ 3.0L"
        color="text-blue-500" 
      />
      <StatItem 
        icon={Dumbbell} 
        label="Weight" 
        value="78.5kg" 
        subValue={<span className="flex items-center text-green-500"><TrendingDown size={12} className="mr-1"/> 0.5kg</span>}
        color="text-green-500" 
      />
    </div>
  );
};

export default StatsGrid;