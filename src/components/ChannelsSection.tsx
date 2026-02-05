import React, { useState } from 'react';
import { ChevronRight, CheckCircle2, BellOff, MessageCircle, Send, Users, Mail, MoreHorizontal } from 'lucide-react';
import { motion } from 'motion/react';

interface AppInfo {
  name: string;
  icon: React.ElementType;
  color: string;
}

const apps: AppInfo[] = [
  { name: 'WhatsApp', icon: MessageCircle, color: 'bg-[#25D366]' },
  { name: 'Telegram', icon: Send, color: 'bg-[#24A1DE]' },
  { name: 'Teams', icon: Users, color: 'bg-[#6264A7]' },
  { name: 'Email', icon: Mail, color: 'bg-slate-500' },
  { name: 'Other', icon: MoreHorizontal, color: 'bg-slate-400' },
];

interface ChannelsSectionProps {
  currentStatus: string;
  onViewActiveChannels: () => void;
  onViewMutedChannels: () => void;
  onViewAppDetails: (appName: string) => void;
}

export const ChannelsSection: React.FC<ChannelsSectionProps> = ({ 
  currentStatus, 
  onViewActiveChannels,
  onViewMutedChannels,
  onViewAppDetails
}) => {
  const [allDevices, setAllDevices] = useState(true);

  const getStatusText = (appName: string) => {
    switch (currentStatus) {
      case 'Work':
        if (appName === 'Teams' || appName === 'Email') return 'All channels active';
        if (appName === 'Telegram') return 'All channels muted';
        if (appName === 'WhatsApp') return '2 channels muted';
        return 'All channels muted';
      
      case 'Privat':
        if (appName === 'WhatsApp' || appName === 'Telegram') return 'All channels active';
        if (appName === 'Teams' || appName === 'Email') return 'All channels muted';
        return 'Limited access';
      
      case 'Sleep':
        if (appName === 'WhatsApp') return '2 channels active';
        return 'All channels muted';
      
      default:
        return 'Adaptive filtering';
    }
  };

  const getCount = (type: 'Active' | 'Muted') => {
    if (currentStatus === 'Work') return type === 'Active' ? 12 : 8;
    if (currentStatus === 'Privat') return type === 'Active' ? 15 : 5;
    return type === 'Active' ? 2 : 18;
  };

  return (
    <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-50">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-slate-900">Quick Status</h2>
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-500">All Devices</span>
          <button 
            onClick={() => setAllDevices(!allDevices)}
            className={`w-11 h-6 rounded-full transition-colors relative ${allDevices ? 'bg-indigo-600' : 'bg-slate-200'}`}
          >
            <motion.div 
              animate={{ x: allDevices ? 22 : 2 }}
              className="absolute top-1 left-0 w-4 h-4 bg-white rounded-full shadow-sm"
            />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <button 
          onClick={onViewActiveChannels}
          className="bg-[#F0FDF4] rounded-2xl p-4 border border-[#DCFCE7] text-left transition-transform active:scale-95 group"
        >
          <div className="flex items-center gap-2 text-[#166534] mb-4">
            <CheckCircle2 size={18} />
            <span className="text-sm font-semibold">Active</span>
          </div>
          <motion.div 
            key={`${currentStatus}-active`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-3xl font-bold text-[#166534] mb-1"
          >
            {getCount('Active')}
          </motion.div>
          <div className="flex items-center justify-between text-sm text-[#166534]/70">
            <span>Channels</span>
            <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </button>

        <button 
          onClick={onViewMutedChannels}
          className="bg-[#FFF7ED] rounded-2xl p-4 border border-[#FFEDD5] text-left transition-transform active:scale-95 group"
        >
          <div className="flex items-center gap-2 text-[#9A3412] mb-4">
            <BellOff size={18} />
            <span className="text-sm font-semibold">Muted</span>
          </div>
          <motion.div 
            key={`${currentStatus}-muted`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-3xl font-bold text-[#9A3412] mb-1"
          >
            {getCount('Muted')}
          </motion.div>
          <div className="flex items-center justify-between text-sm text-[#9A3412]/70">
            <span>Channels</span>
            <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </button>
      </div>

      <div className="space-y-3">
        {apps.map((app, idx) => (
          <motion.button
            key={app.name}
            onClick={() => onViewAppDetails(app.name)}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="w-full flex items-center gap-4 p-3 rounded-2xl bg-[#F8FAFC]/50 hover:bg-[#F8FAFC] transition-colors group"
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${app.color} shadow-sm transition-transform group-hover:scale-105`}>
              <app.icon size={22} />
            </div>
            <div className="flex-1 text-left">
              <h4 className="text-[15px] font-semibold text-slate-900">{app.name}</h4>
              <motion.p 
                key={`${currentStatus}-${app.name}`}
                initial={{ opacity: 0, y: 2 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-slate-500"
              >
                {getStatusText(app.name)}
              </motion.p>
            </div>
            <ChevronRight size={18} className="text-slate-300 group-hover:text-slate-400 transition-colors" />
          </motion.button>
        ))}
      </div>
    </div>
  );
};
