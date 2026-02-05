import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageCircle, 
  Users, 
  Send, 
  ShieldCheck, 
  Mail, 
  Newspaper, 
  MoreHorizontal, 
  Trash2,
  Plus,
  X,
  Check,
  Sparkles,
  ArrowRight,
  Briefcase,
  Heart,
  GraduationCap,
  Clock,
  Calendar,
  Settings2,
  Bell,
  ChevronDown,
  ArrowLeft
} from 'lucide-react';

interface Channel {
  id: string;
  name: string;
  category: string;
  type: 'group' | 'contact';
}

interface AppConfig {
  name: string;
  icon: React.ElementType;
  color: string;
  channels: Channel[];
}

const appConfigs: Record<string, AppConfig> = {
  'WhatsApp': {
    name: 'WhatsApp',
    icon: MessageCircle,
    color: 'text-[#25D366]',
    channels: [
      { id: '1', name: 'Family Group', category: 'Family', type: 'group' },
      { id: '2', name: 'Sarah Miller', category: 'Friends', type: 'contact' },
      { id: '3', name: 'Work Project A', category: 'Work', type: 'group' },
      { id: '4', name: 'University Study', category: 'University', type: 'group' },
      { id: '5', name: 'Mike Johnson', category: 'Friends', type: 'contact' },
    ]
  },
  'Teams': {
    name: 'Teams',
    icon: Users,
    color: 'text-[#6264A7]',
    channels: [
      { id: 't1', name: 'General Channel', category: 'Work', type: 'group' },
      { id: 't2', name: 'Product Team', category: 'Work', type: 'group' },
      { id: 't3', name: 'HR Support', category: 'Work', type: 'contact' },
    ]
  },
  'Telegram': {
    name: 'Telegram',
    icon: Send,
    color: 'text-[#24A1DE]',
    channels: [
      { id: 'tg1', name: 'News Feed', category: 'Friends', type: 'group' },
      { id: 'tg2', name: 'Besties', category: 'Friends', type: 'group' },
    ]
  },
  'Signal': {
    name: 'Signal',
    icon: ShieldCheck,
    color: 'text-[#3A76F0]',
    channels: [
      { id: 's1', name: 'Private Chat', category: 'Friends', type: 'contact' },
    ]
  }
};

interface AppControl {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  selected: boolean;
}

const initialApps: AppControl[] = [
  { id: 'whatsapp', name: 'WhatsApp', icon: MessageCircle, color: 'bg-[#25D366]', selected: true },
  { id: 'teams', name: 'Teams', icon: Users, color: 'bg-[#6264A7]', selected: true },
  { id: 'telegram', name: 'Telegram', icon: Send, color: 'bg-[#24A1DE]', selected: true },
  { id: 'signal', name: 'Signal', icon: ShieldCheck, color: 'bg-[#3A76F0]', selected: true },
  { id: 'email', name: 'Email', icon: Mail, color: 'bg-slate-500', selected: true },
  { id: 'news', name: 'News', icon: Newspaper, color: 'bg-rose-500', selected: true },
  { id: 'other', name: '...', icon: MoreHorizontal, color: 'bg-slate-400', selected: false },
];

const categoryConfig: Record<string, { 
  bg: string, 
  text: string, 
  border: string, 
  icon: React.ElementType,
  proposal: string,
  schedule: string
}> = {
  'Work': { 
    bg: 'bg-blue-50', 
    text: 'text-blue-600', 
    border: 'border-blue-100', 
    icon: Briefcase,
    proposal: 'Muted: 18:00 - 08:00',
    schedule: 'Also muted on Weekends'
  },
  'Family': { 
    bg: 'bg-rose-50', 
    text: 'text-rose-600', 
    border: 'border-rose-100', 
    icon: Heart,
    proposal: 'Always priority',
    schedule: 'Active 24/7'
  },
  'Friends': { 
    bg: 'bg-emerald-50', 
    text: 'text-emerald-600', 
    border: 'border-emerald-100', 
    icon: Users,
    proposal: 'Active: 18:00 - 23:00',
    schedule: 'Evening focus'
  },
  'University': { 
    bg: 'bg-amber-50', 
    text: 'text-amber-600', 
    border: 'border-amber-100', 
    icon: GraduationCap,
    proposal: 'Active: Mon - Fri',
    schedule: 'Academic focus'
  },
};

const getCategoryStyles = (name: string) => {
  return categoryConfig[name] || { 
    bg: 'bg-slate-50', 
    text: 'text-slate-600', 
    border: 'border-slate-200', 
    icon: Bell,
    proposal: 'Custom rule',
    schedule: 'Always active'
  };
};

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: string[];
  onAdd: (name: string) => void;
  onDelete: (name: string) => void;
  onRename: (oldName: string, newName: string) => void;
}

const CategoryModal: React.FC<CategoryModalProps> = ({ 
  isOpen, 
  onClose, 
  categories, 
  onAdd, 
  onDelete,
  onRename
}) => {
  const [newCategory, setNewCategory] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');

  const handleAdd = () => {
    if (newCategory.trim()) {
      onAdd(newCategory.trim());
      setNewCategory('');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-end justify-center sm:items-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-white rounded-[40px] p-8 shadow-2xl overflow-hidden"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-black text-slate-900">Categories</h2>
              <button onClick={onClose} className="p-2 bg-slate-100 rounded-full text-slate-400">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-3 mb-8 max-h-[40vh] overflow-y-auto pr-2 scrollbar-hide">
              {categories.map((cat, idx) => {
                const styles = getCategoryStyles(cat);
                return (
                  <div key={cat} className="group flex items-center gap-3">
                    <div className={`flex-1 ${styles.bg} border ${styles.border} rounded-2xl p-4 flex items-center justify-between group-hover:shadow-sm transition-all`}>
                      {editingIndex === idx ? (
                        <input
                          autoFocus
                          className={`bg-transparent font-bold ${styles.text} outline-none w-full`}
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onBlur={() => {
                            if (editValue.trim() && editValue !== cat) {
                              onRename(cat, editValue.trim());
                            }
                            setEditingIndex(null);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              if (editValue.trim() && editValue !== cat) {
                                onRename(cat, editValue.trim());
                              }
                              setEditingIndex(null);
                            }
                          }}
                        />
                      ) : (
                        <span 
                          className={`font-bold ${styles.text} cursor-text flex-1`}
                          onClick={() => {
                            setEditingIndex(idx);
                            setEditValue(cat);
                          }}
                        >
                          {cat}
                        </span>
                      )}
                      <button 
                        onClick={() => onDelete(cat)}
                        className="text-slate-300 hover:text-rose-500 transition-colors p-1"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                );
              })}
              
              <div className="flex items-center gap-3 pt-2">
                <div className="flex-1 bg-white border-2 border-dashed border-slate-200 rounded-2xl p-1 flex items-center">
                  <input 
                    placeholder="New category name..."
                    className="flex-1 px-4 py-3 bg-transparent text-sm font-semibold outline-none"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                  />
                  <button 
                    onClick={handleAdd}
                    disabled={!newCategory.trim()}
                    className="p-3 bg-blue-600 text-white rounded-xl disabled:opacity-30 transition-opacity"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            </div>

            <button 
              onClick={onClose}
              className="w-full bg-slate-900 text-white py-5 rounded-[28px] font-bold text-lg shadow-xl shadow-slate-200 active:scale-95 transition-transform"
            >
              Done
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

interface OnboardingFlowProps {
  onComplete: () => void;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [apps, setApps] = useState(initialApps);
  const [selectedMode, setSelectedMode] = useState('Work');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [categories, setCategories] = useState(['Family', 'Friends', 'Work', 'University']);
  const [editingApp, setEditingApp] = useState<string | null>(null);
  const [editingCategoryRules, setEditingCategoryRules] = useState<string | null>(null);
  const [appData, setAppData] = useState(appConfigs);
  const [smartMuteStates, setSmartMuteStates] = useState<Record<string, boolean>>({
    'Work': true,
    'Family': true,
    'Friends': true,
    'University': true
  });
  const [categoryRules, setCategoryRules] = useState<Record<string, { proposal: string, schedule: string }>>({
    'Work': categoryConfig['Work'],
    'Family': categoryConfig['Family'],
    'Friends': categoryConfig['Friends'],
    'University': categoryConfig['University']
  });

  const toggleSmartMute = (cat: string) => {
    setSmartMuteStates(prev => ({ ...prev, [cat]: !prev[cat] }));
  };

  const updateCategoryRule = (cat: string, proposal: string, schedule: string) => {
    setCategoryRules(prev => ({
      ...prev,
      [cat]: { proposal, schedule }
    }));
  };

  const updateChannelCategory = (appName: string, channelId: string, newCategory: string) => {
    setAppData(prev => ({
      ...prev,
      [appName]: {
        ...prev[appName],
        channels: prev[appName].channels.map(ch => 
          ch.id === channelId ? { ...ch, category: newCategory } : ch
        )
      }
    }));
  };

  const toggleApp = (id: string) => {
    setApps(apps.map(app => app.id === id ? { ...app, selected: !app.selected } : app));
  };

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
    else onComplete();
  };

  const handleAddCategory = (name: string) => {
    if (!categories.includes(name)) {
      setCategories([...categories, name]);
    }
  };

  const handleDeleteCategory = (name: string) => {
    setCategories(categories.filter(c => c !== name));
  };

  const handleRenameCategory = (oldName: string, newName: string) => {
    setCategories(categories.map(c => c === oldName ? newName : c));
  };

  return (
    <div className="fixed inset-0 bg-[#F8FAFC] z-[100] overflow-y-auto">
      {/* Container zur Begrenzung der Breite auf App-Größe (wie ActiveChannelsPage) */}
      <div className="max-w-md mx-auto h-full flex flex-col relative bg-[#F8FAFC]">
        
        <CategoryModal 
          isOpen={isEditModalOpen} 
          onClose={() => setIsEditModalOpen(false)}
          categories={categories}
          onAdd={handleAddCategory}
          onDelete={handleDeleteCategory}
          onRename={handleRenameCategory}
        />
        
        {/* Progress Bar */}
        <div className="shrink-0 flex gap-2 px-8 pt-16 mb-8">
          {[1, 2, 3, 4].map((s) => (
            <div 
              key={s} 
              className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${s <= step ? 'bg-blue-600' : 'bg-slate-200'}`} 
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 px-8 flex flex-col pb-10"
            >
              <div className="bg-white border border-slate-200 rounded-[32px] p-6 mb-8 shadow-sm">
                <h1 className="text-xl font-bold text-slate-900 leading-tight">
                  These apps are sending you messages. Do you want to control them?
                </h1>
              </div>

              <div className="space-y-3 mb-8">
                {apps.map((app) => (
                  <button
                    key={app.id}
                    onClick={() => toggleApp(app.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-3xl transition-all border ${
                      app.selected 
                      ? 'bg-white border-blue-100 shadow-sm' 
                      : 'bg-transparent border-slate-100 opacity-60'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white ${app.color}`}>
                      <app.icon size={22} />
                    </div>
                    <span className="flex-1 text-left font-semibold text-slate-700">{app.name}</span>
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-colors ${
                      app.selected ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-200 text-transparent'
                    }`}>
                      <Check size={14} strokeWidth={4} />
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-auto">
                <button 
                  onClick={nextStep}
                  className="w-full bg-slate-900 text-white py-5 rounded-[28px] font-bold text-lg shadow-xl shadow-slate-200 flex items-center justify-center gap-2 active:scale-95 transition-transform"
                >
                  Next <ArrowRight size={20} />
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 px-8 flex flex-col pb-10"
            >
              <AnimatePresence mode="wait">
                {!editingApp ? (
                  <motion.div 
                    key="list"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-col h-full"
                  >
                    <div className="bg-white border border-slate-200 rounded-[32px] p-6 mb-8 shadow-sm">
                      <h1 className="text-xl font-bold text-slate-900 leading-tight">
                        We have sorted these message channels for you. Tap an app to customize it!
                      </h1>
                    </div>

                    <div className="space-y-4 mb-10">
                      {Object.entries(appData).map(([name, app]) => (
                        <button 
                          key={name} 
                          onClick={() => setEditingApp(name)}
                          className="w-full flex items-center gap-4 text-left group active:scale-[0.98] transition-all"
                        >
                          <div className={`w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center shadow-sm ${app.color}`}>
                            <app.icon size={20} />
                          </div>
                          <div className="flex-1 bg-white border border-slate-200 rounded-3xl p-4 flex items-center justify-between shadow-sm group-hover:border-blue-200 transition-colors">
                            <span className="font-bold text-slate-900">{app.name}</span>
                            <div className="flex items-center gap-3">
                              <div className="flex flex-wrap gap-1.5 justify-end max-w-[120px]">
                                {Array.from(new Set(app.channels.map(c => c.category))).map(cat => {
                                  const styles = getCategoryStyles(cat);
                                  return (
                                    <span 
                                      key={cat} 
                                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${styles.border} ${styles.text} ${styles.bg}`}
                                    >
                                      {cat}
                                    </span>
                                  );
                                })}
                              </div>
                              <ArrowRight size={16} className="text-slate-400 shrink-0" />
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>

                    <div className="mt-auto flex flex-col items-end gap-6">
                      <button 
                        onClick={() => setIsEditModalOpen(true)}
                        className="text-sm font-bold text-slate-600 border border-slate-200 px-6 py-2.5 rounded-2xl hover:bg-slate-50 transition-colors"
                      >
                        Edit categories
                      </button>
                      
                      <button 
                        onClick={nextStep}
                        className="w-full bg-slate-900 text-white py-5 rounded-[28px] font-bold text-lg shadow-xl shadow-slate-200 flex items-center justify-center gap-2 active:scale-95 transition-transform"
                      >
                        Next <ArrowRight size={20} />
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="detail"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    className="flex flex-col h-full"
                  >
                    <div className="flex items-center gap-4 mb-8">
                      <button 
                        onClick={() => setEditingApp(null)}
                        className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-600 shadow-sm active:scale-90 transition-transform"
                      >
                        <ArrowLeft size={24} />
                      </button>
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white ${appData[editingApp].color.replace('text', 'bg')}`}>
                          {React.createElement(appData[editingApp].icon, { size: 18 })}
                        </div>
                        <h2 className="text-2xl font-black text-slate-900">{editingApp}</h2>
                      </div>
                    </div>

                    <div className="space-y-3 mb-10">
                      {appData[editingApp].channels.map((channel) => (
                        <div key={channel.id} className="flex items-center gap-2">
                          <div className="flex-1 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                            <span className="font-bold text-slate-700 text-sm">{channel.name}</span>
                          </div>
                          <div className="relative group">
                            <select 
                              className={`appearance-none bg-white border border-slate-200 rounded-2xl px-4 py-4 pr-10 text-xs font-black shadow-sm outline-none cursor-pointer focus:border-blue-300 transition-colors ${getCategoryStyles(channel.category).text}`}
                              value={channel.category}
                              onChange={(e) => updateChannelCategory(editingApp, channel.id, e.target.value)}
                            >
                              {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                              ))}
                            </select>
                            <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-auto">
                      <button 
                        onClick={() => setEditingApp(null)}
                        className="w-full bg-slate-900 text-white py-5 rounded-[28px] font-bold text-lg shadow-xl shadow-slate-200 active:scale-95 transition-transform"
                      >
                        Done
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 px-8 flex flex-col pb-10 relative"
            >
              {/* Category Settings Overlay */}
              <AnimatePresence>
                {editingCategoryRules && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="fixed inset-x-0 bottom-0 z-[120] bg-white rounded-t-[40px] p-8 shadow-[0_-20px_40px_rgba(0,0,0,0.1)] max-w-lg mx-auto"
                  >
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-black text-slate-900">Edit {editingCategoryRules} Rules</h2>
                      <button onClick={() => setEditingCategoryRules(null)} className="p-2 bg-slate-100 rounded-full text-slate-400">
                        <X size={20} />
                      </button>
                    </div>
                    
                    <div className="space-y-6 mb-8">
                      <div>
                        <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2 block">Focus Rule</label>
                        <input 
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-4 font-bold text-slate-700 outline-none focus:border-blue-200"
                          value={categoryRules[editingCategoryRules].proposal}
                          onChange={(e) => updateCategoryRule(editingCategoryRules, e.target.value, categoryRules[editingCategoryRules].schedule)}
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2 block">Schedule Details</label>
                        <input 
                          className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-4 py-4 font-bold text-slate-700 outline-none focus:border-blue-200"
                          value={categoryRules[editingCategoryRules].schedule}
                          onChange={(e) => updateCategoryRule(editingCategoryRules, categoryRules[editingCategoryRules].proposal, e.target.value)}
                        />
                      </div>
                    </div>

                    <button 
                      onClick={() => setEditingCategoryRules(null)}
                      className="w-full bg-slate-900 text-white py-5 rounded-[28px] font-bold text-lg shadow-xl"
                    >
                      Save Changes
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="bg-white border border-slate-200 rounded-[32px] p-6 mb-8 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <Sparkles size={16} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">Zen AI Proposal</span>
                </div>
                <h1 className="text-xl font-bold text-slate-900 leading-tight">
                  I've prepared some smart rules to help you find your focus.
                </h1>
              </div>

              <div className="space-y-4 mb-10">
                {['Work', 'Family', 'Friends', 'University'].map((catName) => {
                  const config = getCategoryStyles(catName);
                  const rules = categoryRules[catName];
                  const isSmartMute = smartMuteStates[catName];
                  
                  return (
                    <div key={catName} className="bg-white border border-slate-100 rounded-[32px] p-5 shadow-sm hover:shadow-md transition-shadow group">
                      <div className="flex items-start justify-between">
                        <div className="flex gap-4">
                          <div className={`w-14 h-14 rounded-3xl ${config.bg} ${config.text} flex items-center justify-center shadow-inner`}>
                            <config.icon size={28} />
                          </div>
                          <div className="pt-1">
                            <h3 className="font-black text-slate-900">{catName}</h3>
                            <p className="text-xs font-bold text-slate-500 flex items-center gap-1.5 mt-0.5">
                              <Clock size={12} className="text-slate-400" />
                              {rules.proposal}
                            </p>
                          </div>
                        </div>
                        <button 
                          onClick={() => setEditingCategoryRules(catName)}
                          className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity active:bg-slate-100"
                        >
                          <Settings2 size={18} />
                        </button>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-[10px] font-bold text-slate-400">
                            {rules.schedule}
                          </div>
                        </div>
                        <button 
                          onClick={() => toggleSmartMute(catName)}
                          className="flex items-center gap-2 group/toggle"
                        >
                          <span className={`text-[10px] font-bold transition-colors ${isSmartMute ? 'text-blue-600' : 'text-slate-400'}`}>
                            {isSmartMute ? 'Smart Mute Active' : 'Manual Mode'}
                          </span>
                          <div className={`w-8 h-4 rounded-full flex items-center px-0.5 transition-colors duration-300 ${isSmartMute ? 'bg-blue-600' : 'bg-slate-200'}`}>
                            <motion.div 
                              layout
                              className="w-3 h-3 bg-white rounded-full shadow-sm" 
                              animate={{ x: isSmartMute ? 16 : 0 }}
                              transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                          </div>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-auto">
                <button 
                  onClick={nextStep}
                  className="w-full bg-slate-900 text-white py-5 rounded-[28px] font-bold text-lg shadow-xl shadow-slate-200 flex items-center justify-center gap-2 active:scale-95 transition-transform"
                >
                  Accept and Continue <ArrowRight size={20} />
                </button>
                <p className="text-center text-[10px] font-bold text-slate-400 mt-4">
                  You can always fine-tune these in settings
                </p>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div 
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-1 px-8 flex flex-col items-center justify-center text-center"
            >
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="w-32 h-32 bg-blue-600 rounded-[48px] flex items-center justify-center text-white mb-8 shadow-2xl shadow-blue-200"
              >
                <Sparkles size={48} />
              </motion.div>
              
              <h1 className="text-3xl font-black text-slate-900 mb-4 px-4">
                You're all set to experience the calm.
              </h1>
              <p className="text-slate-500 text-sm leading-relaxed max-w-[280px] mb-12">
                Our Zen Intelligence will now begin filtering your notifications based on your chosen mode.
              </p>

              <div className="w-full space-y-4">
                <div className="bg-emerald-50 text-emerald-700 p-4 rounded-2xl flex items-center gap-3 text-sm font-medium">
                  <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white">
                    <Check size={14} strokeWidth={3} />
                  </div>
                  Notifications optimized
                </div>
                <div className="bg-blue-50 text-blue-700 p-4 rounded-2xl flex items-center gap-3 text-sm font-medium">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white">
                    <Check size={14} strokeWidth={3} />
                  </div>
                  Zen Intelligence active
                </div>
              </div>

              <div className="w-full mt-auto py-8">
                <button 
                  onClick={onComplete}
                  className="w-full bg-blue-600 text-white py-5 rounded-[28px] font-bold text-lg shadow-xl shadow-blue-100 active:scale-95 transition-transform"
                >
                  Go to Dashboard
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
