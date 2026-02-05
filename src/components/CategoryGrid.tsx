import React from 'react';
import { Briefcase, Heart, Users, GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';

const categories = [
  { id: 'work', name: 'Work', icon: Briefcase, count: 12, color: 'bg-blue-50 text-blue-600' },
  { id: 'family', name: 'Family', icon: Heart, count: 2, color: 'bg-rose-50 text-rose-600' },
  { id: 'friends', name: 'Friends', icon: Users, count: 5, color: 'bg-emerald-50 text-emerald-600' },
  { id: 'university', name: 'University', icon: GraduationCap, count: 8, color: 'bg-indigo-50 text-indigo-600' },
];

interface CategoryGridProps {
  onCategorySelect: (name: string) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ onCategorySelect }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {categories.map((cat, idx) => (
        <motion.button
          key={cat.id}
          onClick={() => onCategorySelect(cat.name)}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: idx * 0.05 }}
          className="flex flex-col items-start p-5 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow text-left"
        >
          <div className={`p-3 rounded-2xl ${cat.color} mb-4`}>
            <cat.icon size={24} strokeWidth={1.5} />
          </div>
          <h3 className="text-base font-medium text-slate-900">{cat.name}</h3>
          <p className="text-xs text-slate-500 mt-1">{cat.count} pending</p>
        </motion.button>
      ))}
    </div>
  );
};
