// src/components/features/dashboard/DietCard.jsx
import React from 'react';
import { Utensils, ChevronRight } from 'lucide-react';
import Card from '../../common/Card';
import Badge from '../../common/Badge';

const MacroBar = ({ label, current, total, color }) => {
  const percentage = Math.min((current / total) * 100, 100);
  return (
    <div className="mb-3">
      <div className="flex justify-between text-xs mb-1">
        <span className="text-zinc-400">{label}</span>
        <span className="text-white font-mono">{current}/{total}g</span>
      </div>
      <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full ${color}`} 
          style={{ width: `${percentage}%` }} 
        />
      </div>
    </div>
  );
};

const DietCard = () => {
  return (
    <Card>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-zinc-800 rounded-lg text-red-500">
            <Utensils size={20} />
          </div>
          <div>
            <h3 className="font-bold text-white">Nutrition</h3>
            <p className="text-xs text-zinc-500">Daily Targets</p>
          </div>
        </div>
        <Badge variant="warning">1,750 Kcal Left</Badge>
      </div>

      <div className="space-y-4 mb-6">
        <MacroBar label="Protein" current={140} total={180} color="bg-red-500" />
        <MacroBar label="Carbs" current={200} total={300} color="bg-blue-500" />
        <MacroBar label="Fats" current={45} total={70} color="bg-yellow-500" />
      </div>

      <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl">
        <p className="text-xs text-zinc-500 uppercase font-bold mb-2">Next Meal (4:00 PM)</p>
        <div className="flex justify-between items-center">
          <span className="text-sm font-bold text-white">Greek Yogurt & Berries</span>
          <ChevronRight size={16} className="text-zinc-600" />
        </div>
      </div>
    </Card>
  );
};

export default DietCard;