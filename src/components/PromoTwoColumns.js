"use client";

import React from 'react';
import { ArrowLeft, Sparkles, Zap } from 'lucide-react';

export default function PromoTwoColumns() {
  return (
    // تغییر اصلی: اضافه شدن کلاس md:hidden برای مخفی شدن کامل در دسکتاپ
    <div className="w-full px-4 my-6 relative z-10 direction-rtl md:hidden">
      
      {/* گرید ۲ ستونه ثابت و شیک مخصوص موبایل */}
      <div className="w-full grid grid-cols-2 gap-3">
        
        {/* بنر راست: لوازم جانبی نسل جدید */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-zinc-900 border border-slate-800/60 p-4 flex flex-col justify-between group shadow-lg min-h-[120px] cursor-pointer">
          {/* هاله نوری پس‌زمینه */}
          <div className="absolute -right-10 -bottom-10 w-28 h-28 bg-rose-500/10 rounded-full blur-[40px] pointer-events-none"></div>
          
          <div className="flex flex-col items-start gap-1 relative z-10 text-right">
            <div className="flex items-center gap-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 px-2 py-0.5 rounded-md text-[8px] font-black">
              <Sparkles className="w-2.5 h-2.5" />
              <span>کالکشن جدید</span>
            </div>
            <h3 className="text-xs font-black text-white tracking-tight mt-1">اکسسوری آیفون ۱۶</h3>
          </div>
          
          <div className="flex items-center justify-between w-full mt-2 relative z-10">
            <button className="flex items-center gap-1 text-[10px] font-black text-rose-400">
              <span>ورود به فروشگاه</span>
              <ArrowLeft className="w-3 h-3" />
            </button>
            <div className="text-2xl select-none filter drop-shadow-[0_8px_12px_rgba(244,63,94,0.15)]">🚀</div>
          </div>
        </div>

        {/* بنر چپ: کابل و شارژر ایمن */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-950 via-neutral-900 to-slate-900 border border-slate-800/60 p-4 flex flex-col justify-between group shadow-lg min-h-[120px] cursor-pointer">
          {/* هاله نوری پس‌زمینه */}
          <div className="absolute -left-10 -top-10 w-28 h-28 bg-amber-500/10 rounded-full blur-[40px] pointer-events-none"></div>
          
          <div className="flex flex-col items-start gap-1 relative z-10 text-right">
            <div className="flex items-center gap-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-md text-[8px] font-black">
              <Zap className="w-2.5 h-2.5" />
              <span>تخفیف ویژه</span>
            </div>
            <h3 className="text-xs font-black text-white tracking-tight mt-1">کابل و شارژر اورجینال</h3>
          </div>
          
          <div className="flex items-center justify-between w-full mt-2 relative z-10">
            <button className="flex items-center gap-1 text-[10px] font-black text-amber-400">
              <span>مشاهده محصولات</span>
              <ArrowLeft className="w-3 h-3" />
            </button>
            <div className="text-2xl select-none filter drop-shadow-[0_8px_12px_rgba(245,158,11,0.15)]">🔌</div>
          </div>
        </div>

      </div>
    </div>
  );
}
