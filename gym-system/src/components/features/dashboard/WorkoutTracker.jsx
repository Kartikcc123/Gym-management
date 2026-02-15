// src/components/features/dashboard/WorkoutTracker.jsx
import React from 'react';
import { ChevronRight, PlayCircle, Clock, Zap } from 'lucide-react';
import Card from '../../common/Card';
import Badge from '../../common/Badge';
import Button from '../../common/Button';

const WorkoutTracker = () => {
  const exercises = [
    { name: 'Bench Press', sets: '4x8', completed: true },
    { name: 'Incline Dumbbell Press', sets: '3x10', completed: false },
    { name: 'Cable Flys', sets: '3x12', completed: false },
    { name: 'Tricep Pushdowns', sets: '3x15', completed: false },
  ];

  return (
    <Card className="h-full relative overflow-hidden group">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex justify-between items-start mb-6">
        <div>
          <Badge variant="brand" className="mb-2">Today's Session</Badge>
          <h3 className="text-2xl font-black italic text-white uppercase">Push Day</h3>
          <div className="flex items-center gap-4 mt-2 text-xs text-zinc-400 font-medium uppercase tracking-wider">
            <span className="flex items-center gap-1"><Clock size={14} /> 65 Mins</span>
            <span className="flex items-center gap-1"><Zap size={14} /> High Intensity</span>
          </div>
        </div>
        <button className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-white hover:text-black transition-colors">
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Exercise List */}
      <div className="space-y-3 relative z-10 mb-8">
        {exercises.map((ex, i) => (
          <div 
            key={i} 
            className={`flex items-center gap-4 p-3 rounded-lg border transition-all ${
              ex.completed 
                ? 'bg-green-500/10 border-green-500/20 text-green-500' 
                : 'bg-zinc-900/50 border-zinc-800 text-zinc-300 hover:border-zinc-600'
            }`}
          >
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border ${
              ex.completed ? 'bg-green-500 text-black border-green-500' : 'border-zinc-600'
            }`}>
              {i + 1}
            </div>
            <div className="flex-1">
              <p className="font-bold text-sm">{ex.name}</p>
            </div>
            <span className="text-xs font-mono bg-black/30 px-2 py-1 rounded">{ex.sets}</span>
          </div>
        ))}
      </div>

      {/* Action */}
      <Button variant="primary" className="w-full" icon={PlayCircle}>
        Start Workout
      </Button>
    </Card>
  );
};

export default WorkoutTracker;