import React from 'react';
import { Flame, Wrench, RefreshCw, Award, Percent } from 'lucide-react';

const quickLinks = [
  { id: 1, title: 'تخفیف داغ', icon: Flame, color: 'bg-amber-500 text-white shadow-amber-500/20' },
  { id: 2, title: 'تعمیرات تخصصی', icon: Wrench, color: 'bg-blue-500 text-white shadow-blue-500/20' },
  { id: 3, title: 'آیفون استوک', icon: RefreshCw, color: 'bg-emerald-500 text-white shadow-emerald-500/20' },
  { id: 4, title: 'گارانتی طلایی', icon: Award, color: 'bg-purple-500 text-white shadow-purple-500/20' },
  { id: 5, title: 'باندل‌ها', icon: Percent, color: 'bg-rose-500 text-white shadow-rose-500/20' },
];

// اسم تابع به QuickAccess تغییر یافت تا با نام فایل ست باشد
export default function QuickAccess() {
  return (
    // این بخش فقط در موبایل نمایش داده می‌شود (md:hidden)
    <div className="w-full px-4 my-4 md:hidden relative z-10 direction-rtl">
      <div className="w-full flex items-center justify-between overflow-x-auto pb-2 scrollbar-none gap-2">
        {quickLinks.map((link) => {
          const IconComp = link.icon;
          return (
            <button 
              key={link.id} 
              className="flex flex-col items-center gap-2 shrink-0 min-w-[72px] focus:outline-none"
            >
              {/* دایره آیکون غوطه‌ور با سایه رنگی ملایم */}
              <div className={`w-12 h-12 rounded-2xl ${link.color} flex items-center justify-center shadow-md transition-transform active:scale-95`}>
                <IconComp className="w-5 h-5 stroke-[2.2]" />
              </div>
              {/* متن مینی‌مال زیر آیکون */}
              <span className="text-[10px] font-black text-slate-700 tracking-tight text-center max-w-[75px] line-clamp-1">
                {link.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
