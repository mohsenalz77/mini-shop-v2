"use client";

import { ArrowLeft, Gift, Percent } from 'lucide-react';

export default function PromoBanners() {
  return (
    // حذف max-w-7xl جهت باز شدن کامل بنرها و چفت شدن با لبه‌های کناری هیرو و شگفت‌انگیز
    <div className="w-full px-4 md:px-8 my-8 relative z-10">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* بنر اول */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-zinc-900 border border-slate-800/60 p-6 md:p-8 flex items-center justify-between group shadow-xl">
          <div className="absolute -right-16 -bottom-16 w-48 h-48 bg-rose-500/10 rounded-full blur-[60px] pointer-events-none transition-all duration-500 group-hover:bg-rose-500/20"></div>
          <div className="flex flex-col items-start gap-3 relative z-10 max-w-[70%] text-right">
            <div className="flex items-center gap-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 px-2.5 py-0.5 rounded-lg text-[10px] font-black">
              <Percent className="w-3 h-3" />
              <span>تخفیف هوشمند باندل</span>
            </div>
            <h3 className="text-base md:text-xl font-black text-white tracking-tight">ست کامل لوازم جانبی</h3>
            <p className="text-slate-400 text-[11px] md:text-xs leading-5 font-medium">
              قاب، گلس و شیلد محافظ رو همزمان بخر، روی کل سبد خریدت <span className="text-rose-400 font-bold">۱۵٪ تخفیف بیشتر</span> یادگاری بگیر!
            </p>
            <button className="mt-2 flex items-center gap-1.5 text-xs font-black text-rose-400 hover:text-rose-300 transition group/btn">
              <span>ست کردن کالاها</span>
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover/btn:-translate-x-1" />
            </button>
          </div>
          <div className="text-5xl md:text-6xl select-none filter drop-shadow-[0_10px_20px_rgba(244,63,94,0.2)] transform group-hover:scale-110 group-hover:rotate-3 transition duration-300 pl-2">📦</div>
        </div>

        {/* بنر دوم */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-950 via-neutral-900 to-slate-900 border border-slate-800/60 p-6 md:p-8 flex items-center justify-between group shadow-xl">
          <div className="absolute -left-16 -top-16 w-48 h-48 bg-cyan-500/10 rounded-full blur-[60px] pointer-events-none transition-all duration-500 group-hover:bg-cyan-500/20"></div>
          <div className="flex flex-col items-start gap-3 relative z-10 max-w-[70%] text-right">
            <div className="flex items-center gap-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2.5 py-0.5 rounded-lg text-[10px] font-black">
              <Gift className="w-3 h-3" />
              <span>آفر ویژه هدیه</span>
            </div>
            <h3 className="text-base md:text-xl font-black text-white tracking-tight">پک اکوسیستم پوشیدنی</h3>
            <p className="text-slate-400 text-[11px] md:text-xs leading-5 font-medium">
              ترکیب جادویی ساعت هوشمند و ایرپاد پرو؛ یک هدیه لوکس و به‌صرفه با <span className="text-cyan-400 font-bold">بسته‌ب بندی اختصاصی سیب‌شاپ</span>.
            </p>
            <button className="mt-2 flex items-center gap-1.5 text-xs font-black text-cyan-400 hover:text-cyan-300 transition group/btn">
              <span>مشاهده پکیج‌ها</span>
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover/btn:-translate-x-1" />
            </button>
          </div>
          <div className="text-5xl md:text-6xl select-none filter drop-shadow-[0_10px_20px_rgba(6,182,212,0.2)] transform group-hover:scale-110 group-hover:-rotate-3 transition duration-300 pl-2">🎁</div>
        </div>

      </div>
    </div>
  );
}
