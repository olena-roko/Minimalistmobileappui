import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ChevronLeft, 
  MessageCircle, 
  Send, 
  Users, 
  Mail, 
  MoreHorizontal,
  Clock,
  Settings2,
  Check,
  X,
  Bell,
  BellOff,
  Briefcase,
  Heart,
  GraduationCap
} from 'lucide-react';

interface Channel {
  id: string;
  name: string;
  app: string;
  isMuted: boolean;
}

interface CategoryDetailsPageProps {
  categoryName: string;
  onBack: () => void;
}

const categoryIcons: Record<string, any> = {
  'Work': { icon: Briefcase, color: 'text-blue-600', bgColor: 'bg-blue-50', border: 'border-blue-100' },
  'Family': { icon: Heart, color: 'text-rose-600', bgColor: 'bg-rose-50', border: 'border-rose-100' },
  'Friends': { icon: Users, color: 'text-emerald-600', bgColor: 'bg-emerald-50', border: 'border-emerald-100' },
  'University': { icon: GraduationCap, color: 'text-indigo-600', bgColor: 'bg-indigo-50', border: 'border-indigo-100' },
};

const appIcons: Record<string, { icon: React.ElementType, color: string }> = {
  WhatsApp: { icon: MessageCircle, color: 'text-[#25D366]' },
  Telegram: { icon: Send, color: 'text-[#24A1DE]' },
  Teams: { icon: Users, color: 'text-[#6264A7]' },
  Email: { icon: Mail, color: 'text-slate-500' },
  Other: { icon: MoreHorizontal, color: 'text-slate-400' },
};

// Mock data: Contacts for the category grouped by app
const mockContacts: Record<string, Channel[]> = {
  'Work': [
    { id: 't1', name: 'General Channel', app: 'Teams', isMuted: false },
    { id: 't2', name: 'Product Team', app: 'Teams', isMuted: false },
    { id: 'w3', name: 'Work Project A', app: 'WhatsApp', isMuted: false },
    { id: 'e1', name: 'HR Updates', app: 'Email', isMuted: true },
  ],
  'Family': [
    { id: 'w1', name: 'Family Group', app: 'WhatsApp', isMuted: false },
    { id: 'w2', name: 'Dad', app: 'WhatsApp', isMuted: false },
  ],
  'Friends': [
    { id: 'w4', name: 'Sarah Miller', app: 'WhatsApp', isMuted: true },
    { id: 'tg1', name: 'Besties', app: 'Telegram', isMuted: false },
    { id: 'w5', name: 'Mike Johnson', app: 'WhatsApp', isMuted: true },
  ],
  'University': [
    { id: 'w6', name: 'University Study', app: 'WhatsApp', isMuted: false },
    { id: 'tg2', name: 'Math Group', app: 'Telegram', isMuted: false },
  ],
};

const mockRules: Record<string, { proposal: string, schedule: string }> = {
  'Work': { proposal: 'Muted: 18:00 - 08:00', schedule: 'Muted on Weekends' },
  'Family': { proposal: 'Always priority', schedule: 'Active 24/7' },
  'Friends': { proposal: 'Active: 18:00 - 23:00', schedule: 'Evening focus' },
  'University': { proposal: 'Active: Mon - Fri', schedule: 'Academic focus' },
};

export const CategoryDetailsPage: React.FC<CategoryDetailsPageProps> = ({ categoryName, onBack }) => {
  const [isEditingRules, setIsEditingRules] = useState(false);
  const [rules, setRules] = useState(mockRules[categoryName] || { proposal: 'Custom Rule', schedule: 'Manual mode' });
  const [tempRules, setTempRules] = useState(rules);

  const contacts = mockContacts[categoryName] || [];
  const styles = categoryIcons[categoryName] || { icon: MoreHorizontal, color: 'text-slate-600', bgColor: 'bg-slate-50', border: 'border-slate-100' };
  
  const groupedContacts = contacts.reduce((acc, contact) => {
    if (!acc[contact.app]) acc[contact.app] = [];
    acc[contact.app].push(contact);
    return acc;
  }, {} as Record<string, Channel[]>);

  const handleSaveRules = () => {
    setRules(tempRules);
    setIsEditingRules(false);
  };

  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 bg-[#F8FAFC] z-[80] overflow-y-auto pb-32"
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
            <div className={`w-10 h-10 rounded-xl ${styles.bgColor} flex items-center justify-center ${styles.color}`}>
              <styles.icon size={22} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">{categoryName}</h1>
              <p className="text-xs text-slate-500">{contacts.length} filters in category</p>
            </div>
          </div>
        </header>

        {/* Rules Section */}
        <div className="bg-white border border-slate-100 rounded-[32px] p-6 mb-8 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-blue-600" />
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">Active Rules</span>
            </div>
            {!isEditingRules ? (
              <button 
                onClick={() => {
                  setTempRules(rules);
                  setIsEditingRules(true);
                }}
                className="p-2 rounded-full bg-slate-50 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <Settings2 size={16} />
              </button>
            ) : (
              <div className="flex gap-2">
                <button 
                  onClick={() => setIsEditingRules(false)}
                  className="p-1.5 rounded-full bg-rose-50 text-rose-500"
                >
                  <X size={14} />
                </button>
                <button 
                  onClick={handleSaveRules}
                  className="p-1.5 rounded-full bg-emerald-50 text-emerald-500"
                >
                  <Check size={14} />
                </button>
              </div>
            )}
          </div>

          {isEditingRules ? (
            <div className="space-y-3">
              <input 
                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-sm font-bold text-slate-700 outline-none focus:border-blue-200"
                value={tempRules.proposal}
                onChange={(e) => setTempRules({ ...tempRules, proposal: e.target.value })}
              />
              <input 
                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-sm text-slate-500 outline-none focus:border-blue-200"
                value={tempRules.schedule}
                onChange={(e) => setTempRules({ ...tempRules, schedule: e.target.value })}
              />
            </div>
          ) : (
            <div>
              <h3 className="font-bold text-slate-900 text-[15px]">{rules.proposal}</h3>
              <p className="text-xs text-slate-500 mt-1">{rules.schedule}</p>
            </div>
          )}
        </div>

        {/* Contacts grouped by app */}
        <div className="space-y-8">
          {Object.entries(groupedContacts).map(([appName, appContacts], groupIdx) => {
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
                    {appContacts.length}
                  </span>
                </div>

                <div className="bg-white rounded-[28px] overflow-hidden border border-slate-50 shadow-sm">
                  {appContacts.map((contact, idx) => (
                    <div 
                      key={contact.id}
                      className={`flex items-center justify-between p-5 ${idx !== appContacts.length - 1 ? 'border-b border-slate-50' : ''}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 font-bold`}>
                          {contact.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="text-[14px] font-semibold text-slate-800">{contact.name}</h3>
                          <p className="text-[10px] text-slate-400">Direct Message</p>
                        </div>
                      </div>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${contact.isMuted ? 'text-slate-300' : 'text-emerald-500'}`}>
                        {contact.isMuted ? <BellOff size={16} /> : <Bell size={16} />}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {contacts.length === 0 && (
          <div className="py-20 text-center">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4 text-slate-300">
              <Users size={32} />
            </div>
            <p className="text-slate-400 font-medium">No contacts in this category yet</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};
