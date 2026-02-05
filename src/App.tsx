import React, { useState } from 'react';
import { Bell, UserCircle } from 'lucide-react';
import { StatusCard } from './components/StatusCard';
import { CategoryGrid } from './components/CategoryGrid';
import { ChannelsSection } from './components/ChannelsSection';
import { BottomNav } from './components/BottomNav';
import { ActiveChannelsPage } from './components/ActiveChannelsPage';
import { MutedChannelsPage } from './components/MutedChannelsPage';
import { AppDetailsPage } from './components/AppDetailsPage';
import { CategoryDetailsPage } from './components/CategoryDetailsPage';
import { motion, AnimatePresence } from 'motion/react';
import { OnboardingFlow } from './components/OnboardingFlow';

export default function App() {
  const [currentStatus, setCurrentStatus] = useState('Work');
  const [showActiveChannels, setShowActiveChannels] = useState(false);
  const [showMutedChannels, setShowMutedChannels] = useState(false);
  const [selectedAppDetail, setSelectedAppDetail] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(() => {
    if (typeof window !== 'undefined') {
      return !localStorage.getItem('onboarding_completed');
    }
    return true;
  });

  const handleOnboardingComplete = () => {
    localStorage.setItem('onboarding_completed', 'true');
    setShowOnboarding(false);
  };

  if (showOnboarding) {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans pb-32 overflow-x-hidden">
      {/* Background soft glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[40%] bg-blue-100/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] left-[-10%] w-[40%] h-[30%] bg-indigo-50/40 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-md mx-auto px-6 pt-12">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-white shadow-sm flex items-center justify-center border border-slate-100">
              <Bell className="text-blue-600" size={20} />
            </div>
            <div>
              <h1 className="text-xl font-semibold tracking-tight">Keep Calm</h1>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Zen Intelligence</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => {
                localStorage.removeItem('onboarding_completed');
                window.location.reload();
              }}
              className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white overflow-hidden flex items-center justify-center text-slate-400"
            >
              <UserCircle size={40} className="-mt-1 -ml-1" />
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="space-y-8">
          <section>
            <StatusCard currentStatus={currentStatus} onStatusChange={setCurrentStatus} />
          </section>

          <section>
            <ChannelsSection 
              currentStatus={currentStatus} 
              onViewActiveChannels={() => setShowActiveChannels(true)}
              onViewMutedChannels={() => setShowMutedChannels(true)}
              onViewAppDetails={(name) => setSelectedAppDetail(name)}
            />
          </section>

          <section>
            <div className="flex justify-between items-end mb-4">
              <h2 className="text-lg font-medium text-slate-800">Categories</h2>
              <span className="text-xs text-blue-600 font-medium cursor-pointer">Quick Filter</span>
            </div>
            <CategoryGrid onCategorySelect={(name) => setSelectedCategory(name)} />
          </section>
          
        </main>
      </div>

      <AnimatePresence>
        {showActiveChannels && (
          <ActiveChannelsPage onBack={() => setShowActiveChannels(false)} />
        )}
        {showMutedChannels && (
          <MutedChannelsPage onBack={() => setShowMutedChannels(false)} />
        )}
        {selectedAppDetail && (
          <AppDetailsPage 
            appName={selectedAppDetail} 
            onBack={() => setSelectedAppDetail(null)} 
          />
        )}
        {selectedCategory && (
          <CategoryDetailsPage 
            categoryName={selectedCategory} 
            onBack={() => setSelectedCategory(null)} 
          />
        )}
      </AnimatePresence>

      <div className="relative z-[100]">
        <BottomNav />
      </div>
    </div>
  );
}
