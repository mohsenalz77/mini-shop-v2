"use client";

import { ArrowLeft, Gift, Percent, Zap } from 'lucide-react';

export default function PromoBanners() {
  return (
    // my-4 در موبایل فاصله عمودی را برای جلوگیری از طولانی شدن صفحه بهینه می‌کند
    <div className="w-full px-4 md:px-8 my-4 md:my-8 relative z-10">
      
      {/* در موبایل تبدیل به ریل افقی روان (flex overflow-x-auto) و در دسکتاپ گرید ۳ ستونه (md:grid) می‌شود */}
      <div className="w-full flex md:grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 overflow-x-auto md:overflow-visible pb-4 md:pb-0 scrollbar-none snap-x px-1 md:px-0">
        
        {/* بنر اول: باندل اکسسوری */}
        <div className="flex-shrink-0 w-[85%] sm:w-[70%] md:w-full snap-center relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-zinc-900 border border-slate-800/60 p-5 md:p-6 flex flex-col justify-between group shadow-xl min-h-[180px] md:min-h-[200px]">
          <div className="absolute -right-16 -bottom-16 w-40 h-40 bg-rose-500/10 rounded-full blur-[50px] pointer-events-none transition-all duration-500 group-hover:bg-rose-500/20"></div>
          
          <div className="flex flex-col items-start gap-2 relative z-10 text-right">
            <div className="flex items-center gap-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 px-2.5 py-0.5 rounded-lg text-[10px] font-black">
              <Percent className="w-3 h-3" />
              <span>تخفیف باندل</span>
            </div>
            <h3 className="text-sm md:text-lg font-black text-white tracking-tight mt-1">ست کامل لوازم جانبی</h3>
            <p className="text-slate-400 text-[10px] md:text-[11px] leading-5 font-medium mt-0.5 md:mt-1">
              قاب و گلس رو همزمان بخر، روی کل سبد خریدت <span className="text-rose-400 font-bold">۱۵٪ تخفیف بیشتر</span> یادگاری بگیر!
            </p>
          </div>
          
          <div className="flex items-center justify-between w-full mt-3 md:mt-4 relative z-10">
            <button className="flex items-center gap-1.5 text-[11px] md:text-xs font-black text-rose-400 hover:text-rose-300 transition group/btn">
              <span>ست کردن کالاها</span>
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover/btn:-translate-x-1" />
            </button>
            <div className="text-3xl md:text-4xl select-none filter drop-shadow-[0_10px_15px_rgba(244,63,94,0.2)] transform group-hover:scale-110 group-hover:rotate-3 transition duration-300">📦</div>
          </div>
        </div>

        {/* بنر دوم: پک هدیه گجت‌ها */}
        <div className="flex-shrink-0 w-[85%] sm:w-[70%] md:w-full snap-center relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-950 via-neutral-900 to-slate-900 border border-slate-800/60 p-5 md:p-6 flex flex-col justify-between group shadow-xl min-h-[180px] md:min-h-[200px]">
          <div className="absolute -left-16 -top-16 w-40 h-40 bg-cyan-500/10 rounded-full blur-[50px] pointer-events-none transition-all duration-500 group-hover:bg-cyan-500/20"></div>
          
          <div className="flex flex-col items-start gap-2 relative z-10 text-right">
            <div className="flex items-center gap-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2.5 py-0.5 rounded-lg text-[10px] font-black">
              <Gift className="w-3 h-3" />
              <span>آفر ویژه هدیه</span>
            </div>
            <h3 className="text-sm md:text-lg font-black text-white tracking-tight mt-1">اکوسیستم پوشیدنی</h3>
            <p className="text-slate-400 text-[10px] md:text-[11px] leading-5 font-medium mt-0.5 md:mt-1">
              ترکیب جادویی ساعت هوشمند و ایرپاد؛ یک هدیه لوکس با <span className="text-cyan-400 font-bold">بسته‌بندی اختصاصی سیب‌شاپ</span>.
            </p>
          </div>
          
          <div className="flex items-center justify-between w-full mt-3 md:mt-4 relative z-10">
            <button className="flex items-center gap-1.5 text-[11px] md:text-xs font-black text-cyan-400 hover:text-cyan-300 transition group/btn">
              <span>مشاهده پکیج‌ها</span>
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover/btn:-translate-x-1" />
            </button>
            <div className="text-3xl md:text-4xl select-none filter drop-shadow-[0_10px_15px_rgba(6,182,212,0.2)] transform group-hover:scale-110 group-hover:-rotate-3 transition duration-300">🎁</div>
          </div>
        </div>

        {/* بنر سوم: آفر سوپر شارژر */}
        <div className="flex-shrink-0 w-[85%] sm:w-[70%] md:w-full snap-center relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-zinc-900 to-stone-900 border border-slate-800/60 p-5 md:p-6 flex flex-col justify-between group shadow-xl min-h-[180px] md:min-h-[200px]">
          <div className="absolute -right-16 -top-16 w-40 h-40 bg-amber-500/10 rounded-full blur-[50px] pointer-events-none transition-all duration-500 group-hover:bg-amber-500/20"></div>
          
          <div className="flex flex-col items-start gap-2 relative z-10 text-right">
            <div className="flex items-center gap-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2.5 py-0.5 rounded-lg text-[10px] font-black">
              <Zap className="w-3 h-3" />
              <span>تضمین اصالت</span>
            </div>
            <h3 className="text-sm md:text-lg font-black text-white tracking-tight mt-1">پک سوپر شارژر ایمن</h3>
            <p className="text-slate-400 text-[10px] md:text-[11px] leading-5 font-medium mt-0.5 md:mt-1">
              کلگی و کابل فست شارژ اصلی اورجینال با <span className="text-amber-400 font-bold">ضمانت تعویض بی‌قید و شرط</span> و پایداری ولتاژ باتری.
            </p>
          </div>
          
          <div className="flex items-center justify-between w-full mt-3 md:mt-4 relative z-10">
            <button className="flex items-center gap-1.5 text-[11px] md:text-xs font-black text-amber-400 hover:text-amber-300 transition group/btn">
              <span>انتخاب آداپتور</span>
              <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover/btn:-translate-x-1" />
            </button>
            <div className="text-3xl md:text-4xl select-none filter drop-shadow-[0_10px_15px_rgba(245,158,11,0.2)] transform group-hover:scale-110 group-hover:rotate-6 transition duration-300">⚡</div>
          </div>
        </div>

      </div>
    </div>
  );
}
