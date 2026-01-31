import React from 'react';
import { Home, Shield, BarChart2, Settings } from 'lucide-react';

export const BottomNav: React.FC = () => {
  return (
    <div className="fixed bottom-6 left-6 right-6 h-16 bg-white/80 backdrop-blur-xl border border-white/40 rounded-3xl shadow-lg flex items-center justify-around px-4 z-50">
      <button className="flex flex-col items-center gap-1 text-blue-600">
        <Home size={22} strokeWidth={2} />
        <span className="text-[10px] font-medium">Home</span>
      </button>
      <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-blue-500 transition-colors">
        <Shield size={22} strokeWidth={2} />
        <span className="text-[10px] font-medium">Safety</span>
      </button>
      <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-blue-500 transition-colors">
        <BarChart2 size={22} strokeWidth={2} />
        <span className="text-[10px] font-medium">Insights</span>
      </button>
      <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-blue-500 transition-colors">
        <Settings size={22} strokeWidth={2} />
        <span className="text-[10px] font-medium">Settings</span>
      </button>
    </div>
  );
};
