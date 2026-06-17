"use client";

import React from 'react';
import { Award, Sparkles } from 'lucide-react';

const brands = [
  { id: 1, name: 'Apple', logo: '🍏', subtitle: 'اپل' },
  { id: 2, name: 'Samsung', logo: '📱', subtitle: 'سامسونگ' },
  { id: 3, name: 'Xiaomi', logo: '🍊', subtitle: 'شیائومی' },
  { id: 4, name: 'Anker', logo: '🔋', subtitle: 'انکر' },
  { id: 5, name: 'Baseus', logo: '🔌', subtitle: 'بیسوس' },
];

export default function BrandCarousel() {
  return (
    // اضافه شدن overflow-visible برای مهار آمبیانس نوری
    <div className="w-full px-4 md:px-8 my-12 md:my-20 relative z-10 direction-rtl overflow-visible">
      
      {/* 🌟 افکت آمبیانس نوری هوشمند پشت بخش برندها برای شکستن سفیدی مطلق */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-rose-500/[0.03] md:bg-rose-500/[0.04] rounded-full blur-[100px] pointer-events-none z-0"></div>
      
      {/* هدر بخش برندها */}
      <div className="flex flex-col gap-2 mb-8 items-center md:items-start text-center md:text-right border-b border-slate-200/60 pb-5 relative z-10">
        
        {/* تگ مینی‌مال */}
        <div className="flex items-center gap-1.5 bg-slate-100/80 text-slate-600 px-3 py-1 rounded-full border border-slate-200/40 shadow-xs">
          <Sparkles className="w-3 h-3 text-amber-500 fill-amber-500" />
          <span className="text-[10px] font-black tracking-wide">شرکت‌های معتبر</span>
        </div>
        
        {/* عنوان اصلی همراه با آیکون و گرادینت اختصاصی برند سیب‌شاپ */}
        <div className="flex items-center gap-2 mt-1">
          <Award className="w-4 h-4 text-rose-500 hidden md:block" />
          <h2 className="text-base md:text-xl font-black text-slate-800 tracking-tight">
            برندهای محبوب در سیب‌<span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600">شاپ</span>
          </h2>
        </div>
      </div>

      {/* ریل برندها با استایل کارت‌های سایه‌دار و عمق‌دار */}
      <div className="w-full flex md:grid md:grid-cols-5 gap-4 md:gap-6 overflow-x-auto md:overflow-visible pb-4 md:pb-0 scrollbar-none snap-x px-1 md:px-0 relative z-10">
        {brands.map((brand) => (
          <div 
            key={brand.id}
            className="flex-shrink-0 w-28 md:w-full snap-center bg-white border border-slate-100/70 rounded-2xl p-5 flex flex-col items-center justify-center gap-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_30px_rgba(244,63,94,0.06)] hover:border-rose-100/80 transition-all duration-300 cursor-pointer group"
          >
            {/* باکس لوگو با فیلتر رنگی هوشمند */}
            <div className="text-2xl md:text-3xl select-none filter opacity-70 group-hover:opacity-100 transition duration-300 transform group-hover:scale-110">
              {brand.logo}
            </div>
            
            {/* نام برند */}
            <span className="text-xs font-black text-slate-800 mt-1 tracking-wider font-sans group-hover:text-rose-500 transition-colors duration-200">
              {brand.name}
            </span>
            
            {/* زیرنویس فارسی */}
            <span className="text-[9px] font-medium text-slate-400">
              {brand.subtitle}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}
