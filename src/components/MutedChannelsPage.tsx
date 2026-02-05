import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, MessageCircle, Send, Users, Mail, MoreHorizontal, BellOff } from 'lucide-react';

interface Channel {
  id: string;
  name: string;
  app: string;
  reason: string;
}

const mutedChannelsData: Channel[] = [
  { id: 'm1', name: 'Alumni Group', app: 'WhatsApp', reason: 'Focus mode active' },
  { id: 'm2', name: 'Crypto News', app: 'Telegram', reason: 'High frequency' },
  { id: 'm3', name: 'Gaming Lounge', app: 'Telegram', reason: 'Non-work app' },
  { id: 'm4', name: 'General Chat', app: 'Teams', reason: 'Muted by rule' },
  { id: 'm5', name: 'Marketing Promos', app: 'Email', reason: 'Low priority' },
  { id: 'm6', name: 'Social Alerts', app: 'Other', reason: 'System default' },
];

const appIcons: Record<string, { icon: React.ElementType, color: string }> = {
  WhatsApp: { icon: MessageCircle, color: 'text-[#25D366]' },
  Telegram: { icon: Send, color: 'text-[#24A1DE]' },
  Teams: { icon: Users, color: 'text-[#6264A7]' },
  Email: { icon: Mail, color: 'text-slate-500' },
  Other: { icon: MoreHorizontal, color: 'text-slate-400' },
};

interface MutedChannelsPageProps {
  onBack: () => void;
}

export const MutedChannelsPage: React.FC<MutedChannelsPageProps> = ({ onBack }) => {
  const groupedChannels = mutedChannelsData.reduce((acc, channel) => {
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
      className="fixed inset-0 bg-[#F8FAFC] z-[60] overflow-y-auto pb-32"
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
            <h1 className="text-xl font-bold text-slate-900">Muted Channels</h1>
            <p className="text-xs text-slate-500">Currently held by intelligence engine</p>
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
                        <p className="text-xs text-slate-400">{channel.reason}</p>
                      </div>
                      <div className="p-1.5 rounded-full bg-rose-50 text-rose-500">
                        <BellOff size={14} />
                      </div>
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
