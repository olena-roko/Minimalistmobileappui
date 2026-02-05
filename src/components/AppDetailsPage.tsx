import React from 'react';
import { motion } from 'motion/react';
import { 
  ChevronLeft, 
  MessageCircle, 
  Send, 
  Users, 
  Mail, 
  MoreHorizontal,
  ChevronDown,
  Bell,
  BellOff,
  Search,
  Plus
} from 'lucide-react';

interface Channel {
  id: string;
  name: string;
  category: string;
  type: 'group' | 'contact';
  isMuted: boolean;
}

interface AppDetailsPageProps {
  appName: string;
  onBack: () => void;
}

const appIcons: Record<string, { icon: React.ElementType, color: string, bgColor: string }> = {
  WhatsApp: { icon: MessageCircle, color: 'text-[#25D366]', bgColor: 'bg-[#25D366]/10' },
  Telegram: { icon: Send, color: 'text-[#24A1DE]', bgColor: 'bg-[#24A1DE]/10' },
  Teams: { icon: Users, color: 'text-[#6264A7]', bgColor: 'bg-[#6264A7]/10' },
  Email: { icon: Mail, color: 'text-slate-500', bgColor: 'bg-slate-100' },
  Other: { icon: MoreHorizontal, color: 'text-slate-400', bgColor: 'bg-slate-50' },
};

const categoryStyles: Record<string, { bg: string, text: string, border: string }> = {
  'Work': { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-100' },
  'Family': { bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-100' },
  'Friends': { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100' },
  'University': { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-100' },
};

// Mock data for contacts/channels within an app
const mockContacts: Record<string, Channel[]> = {
  'WhatsApp': [
    { id: '1', name: 'Family Group', category: 'Family', type: 'group', isMuted: false },
    { id: '2', name: 'Sarah Miller', category: 'Friends', type: 'contact', isMuted: true },
    { id: '3', name: 'Work Project A', category: 'Work', type: 'group', isMuted: false },
    { id: '4', name: 'University Study', category: 'University', type: 'group', isMuted: false },
    { id: '5', name: 'Mike Johnson', category: 'Friends', type: 'contact', isMuted: true },
  ],
  'Teams': [
    { id: 't1', name: 'General Channel', category: 'Work', type: 'group', isMuted: false },
    { id: 't2', name: 'Product Team', category: 'Work', type: 'group', isMuted: false },
    { id: 't3', name: 'HR Support', category: 'Work', type: 'contact', isMuted: true },
  ],
  'Telegram': [
    { id: 'tg1', name: 'News Feed', category: 'Friends', type: 'group', isMuted: true },
    { id: 'tg2', name: 'Besties', category: 'Friends', type: 'group', isMuted: false },
  ],
};

export const AppDetailsPage: React.FC<AppDetailsPageProps> = ({ appName, onBack }) => {
  const IconInfo = appIcons[appName] || appIcons.Other;
  const contacts = mockContacts[appName] || [];

  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 bg-[#F8FAFC] z-[70] overflow-y-auto pb-32"
    >
      <div className="max-w-md mx-auto px-6 pt-12">
        <header className="flex items-center gap-4 mb-8">
          <button 
            onClick={onBack}
            className="w-10 h-10 rounded-2xl bg-white shadow-sm flex items-center justify-center border border-slate-100 text-slate-600 active:scale-95 transition-transform"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl ${IconInfo.bgColor} flex items-center justify-center ${IconInfo.color}`}>
              <IconInfo.icon size={22} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">{appName}</h1>
              <p className="text-xs text-slate-500">{contacts.length} active filters</p>
            </div>
          </div>
        </header>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder={`Search ${appName} contacts...`}
            className="w-full bg-white border border-slate-100 rounded-[24px] py-4 pl-12 pr-4 text-sm font-medium shadow-sm outline-none focus:border-blue-200"
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center px-2">
            <h2 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Contacts & Groups</h2>
            <div className="flex gap-2">
               <div className="w-2 h-2 rounded-full bg-emerald-500" />
               <span className="text-[10px] font-bold text-slate-400">Active</span>
            </div>
          </div>

          <div className="space-y-3">
            {contacts.map((contact) => {
              const styles = categoryStyles[contact.category] || { bg: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-100' };
              
              return (
                <div 
                  key={contact.id}
                  className="bg-white border border-slate-100 rounded-[28px] p-4 flex items-center justify-between shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className={`w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 font-bold text-lg`}>
                        {contact.name.charAt(0)}
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center ${contact.isMuted ? 'bg-slate-100 text-slate-400' : 'bg-emerald-100 text-emerald-600'}`}>
                        {contact.isMuted ? <BellOff size={10} strokeWidth={3} /> : <Bell size={10} strokeWidth={3} />}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{contact.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-[9px] font-black uppercase tracking-tighter px-2 py-0.5 rounded-full border ${styles.bg} ${styles.text} ${styles.border}`}>
                          {contact.category}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {contact.type === 'group' ? 'Group' : 'Direct Message'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <button className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 active:bg-slate-100 transition-colors">
                    <ChevronDown size={18} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-100">
          <button className="w-full bg-slate-50 text-slate-600 py-4 rounded-2xl font-bold text-sm border border-slate-100 flex items-center justify-center gap-2 active:scale-[0.98] transition-all">
             <Plus size={18} /> Add custom rule for {appName}
          </button>
        </div>
      </div>
    </motion.div>
  );
};
