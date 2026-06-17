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
    <div className="w-full px-4 md:px-8 my-10 md:my-16 relative z-10 direction-rtl">
      
      {/* هدر بازطراحی شده و پرانرژی بخش برندها */}
      <div className="flex flex-col gap-2 mb-6 items-center md:items-start text-center md:text-right border-b border-slate-100 pb-4">
        
        {/* تگ مینی‌مال هویت بصری فوق العاده شیک */}
        <div className="flex items-center gap-1.5 bg-slate-100 text-slate-700 px-3 py-1 rounded-full border border-slate-200/50">
          <Sparkles className="w-3 h-3 text-amber-500 fill-amber-500" />
          <span className="text-[10px] font-black tracking-wide">شرکتهای معتبر</span>
        </div>
        
        {/* عنوان اصلی همراه با آیکون و گرادینت اختصاصی برند سیب‌شاپ */}
        <div className="flex items-center gap-2 mt-1">
          <Award className="w-4 h-4 text-rose-500 hidden md:block" />
          <h2 className="text-base md:text-xl font-black text-slate-800 tracking-tight">
            برندهای محبوب در سیب‌<span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600">شاپ</span>
          </h2>
        </div>
      </div>

      {/* ریل برندها */}
      <div className="w-full flex md:grid md:grid-cols-5 gap-4 overflow-x-auto md:overflow-visible pb-3 md:pb-0 scrollbar-none snap-x px-1 md:px-0">
        {brands.map((brand) => (
          <div 
            key={brand.id}
            className="flex-shrink-0 w-28 md:w-full snap-center bg-white border border-slate-100 rounded-2xl p-4 flex flex-col items-center justify-center gap-1 hover:border-slate-200 hover:shadow-xs transition-all duration-300 cursor-pointer group"
          >
            {/* باکس لوگو با هاور افکت مینی‌مال */}
            <div className="text-2xl md:text-3xl select-none filter grayscale group-hover:grayscale-0 transition duration-300 transform group-hover:scale-110">
              {brand.logo}
            </div>
            
            {/* نام برند */}
            <span className="text-xs font-black text-slate-800 mt-1 tracking-wider font-sans">
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
