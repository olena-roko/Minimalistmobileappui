import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, Heart, Moon } from 'lucide-react';

interface Status {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
}

const statuses: Status[] = [
  { id: 'Work', name: 'Work', icon: Briefcase, color: 'text-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-100', textColor: 'text-blue-900' },
  { id: 'Privat', name: 'Privat', icon: Heart, color: 'text-emerald-600', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-100', textColor: 'text-emerald-900' },
  { id: 'Sleep', name: 'Sleep', icon: Moon, color: 'text-purple-600', bgColor: 'bg-purple-50', borderColor: 'border-purple-100', textColor: 'text-purple-900' },
];

interface StatusCardProps {
  currentStatus: string;
  onStatusChange: (id: string) => void;
}

export const StatusCard: React.FC<StatusCardProps> = ({ currentStatus, onStatusChange }) => {
  const currentIndex = statuses.findIndex(s => s.id === currentStatus);
  const current = statuses[currentIndex];

  const nextStatus = () => {
    const nextIdx = (currentIndex + 1) % statuses.length;
    onStatusChange(statuses[nextIdx].id);
  };

  const prevStatus = () => {
    const prevIdx = (currentIndex - 1 + statuses.length) % statuses.length;
    onStatusChange(statuses[prevIdx].id);
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-4 px-1">
        <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Focus Mode</h3>
        <div className="flex gap-1">
          {statuses.map((s) => (
            <div 
              key={s.id} 
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${s.id === currentStatus ? 'w-4 bg-slate-800' : 'bg-slate-300'}`} 
            />
          ))}
        </div>
      </div>

      <div className="relative h-44 overflow-hidden rounded-[32px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            className={`absolute inset-0 p-8 flex flex-col justify-center border ${current.bgColor} ${current.borderColor} ${current.textColor}`}
          >
            <div className="flex items-center gap-4 mb-2">
              <div className={`p-3 rounded-2xl bg-white shadow-sm ${current.color}`}>
                <current.icon size={28} />
              </div>
              <div>
                <span className="text-xs font-medium uppercase tracking-widest opacity-60">Status active</span>
                <h2 className="text-3xl font-bold tracking-tight">{current.name}</h2>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows for clarity of "side sliding" */}
        <button 
          onClick={prevStatus}
          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/40 transition-colors z-20"
        >
          <div className="w-1 h-4 bg-slate-400/50 rounded-full" />
        </button>
        <button 
          onClick={nextStatus}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 hover:bg-white/40 transition-colors z-20"
        >
          <div className="w-1 h-4 bg-slate-400/50 rounded-full" />
        </button>
      </div>
    </div>
  );
};
