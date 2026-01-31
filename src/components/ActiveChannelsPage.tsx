import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, MessageCircle, Send, Users, Mail, MoreHorizontal } from 'lucide-react';

interface Channel {
  id: string;
  name: string;
  app: string;
  time: string;
}

const activeChannelsData: Channel[] = [
  { id: '1', name: 'Product Team', app: 'WhatsApp', time: '2m ago' },
  { id: '2', name: 'Family Group', app: 'WhatsApp', time: '15m ago' },
  { id: '3', name: 'Design Crit', app: 'Telegram', time: '5m ago' },
  { id: '4', name: 'Project Alpha', app: 'Teams', time: 'Just now' },
  { id: '5', name: 'HR Updates', app: 'Teams', time: '1h ago' },
  { id: '6', name: 'Newsletter', app: 'Email', time: '30m ago' },
];

const appIcons: Record<string, { icon: React.ElementType, color: string }> = {
  WhatsApp: { icon: MessageCircle, color: 'text-[#25D366]' },
  Telegram: { icon: Send, color: 'text-[#24A1DE]' },
  Teams: { icon: Users, color: 'text-[#6264A7]' },
  Email: { icon: Mail, color: 'text-slate-500' },
  Other: { icon: MoreHorizontal, color: 'text-slate-400' },
};

interface ActiveChannelsPageProps {
  onBack: () => void;
}

export const ActiveChannelsPage: React.FC<ActiveChannelsPageProps> = ({ onBack }) => {
  const groupedChannels = activeChannelsData.reduce((acc, channel) => {
    if (!acc[channel.app]) acc[channel.app] = [];
    acc[channel.app].push(channel);
    return acc;
  }, {} as Record<string, Channel[]>);

  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 bg-[#F8FAFC] z-[60] overflow-y-auto pb-24"
    >
      <div className="max-w-md mx-auto px-6 pt-12">
        <header className="flex items-center gap-4 mb-8">
          <button 
            onClick={onBack}
            className="w-10 h-10 rounded-2xl bg-white shadow-sm flex items-center justify-center border border-slate-100 text-slate-600 active:scale-95 transition-transform"
          >
            <ChevronLeft size={24} />
          </button>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Active Channels</h1>
            <p className="text-xs text-slate-500">Currently receiving notifications</p>
          </div>
        </header>

        <div className="space-y-8">
          {Object.entries(groupedChannels).map(([appName, channels], groupIdx) => {
            const IconInfo = appIcons[appName] || appIcons.Other;
            return (
              <motion.div 
                key={appName}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: groupIdx * 0.1 }}
              >
                <div className="flex items-center gap-2 mb-4 px-1">
                  <div className={`${IconInfo.color}`}>
                    <IconInfo.icon size={18} />
                  </div>
                  <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">{appName}</h2>
                  <span className="ml-auto text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
                    {channels.length}
                  </span>
                </div>

                <div className="bg-white rounded-[28px] overflow-hidden border border-slate-50 shadow-sm">
                  {channels.map((channel, idx) => (
                    <div 
                      key={channel.id}
                      className={`flex items-center justify-between p-5 ${idx !== channels.length - 1 ? 'border-b border-slate-50' : ''}`}
                    >
                      <div>
                        <h3 className="text-[15px] font-semibold text-slate-800">{channel.name}</h3>
                        <p className="text-xs text-slate-400">Last activity: {channel.time}</p>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};
