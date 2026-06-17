"use client";

import React from 'react';

// لیست برندها به همراه نام انگلیسی (که بعداً می‌توانی جای متن، لوگوی SVG یا عکس بگذاری)
const brands = [
  { id: 1, name: 'Apple', logo: '🍏', subtitle: 'اپل' },
  { id: 2, name: 'Samsung', logo: '📱', subtitle: 'سامسونگ' },
  { id: 3, name: 'Xiaomi', logo: '🍊', subtitle: 'شیائومی' },
  { id: 4, name: 'Anker', logo: '🔋', subtitle: 'انکر' },
  { id: 5, name: 'Baseus', logo: '🔌', subtitle: 'بیسوس' },
];

export default function BrandCarousel() {
  return (
    // مارجین استاندارد و متناسب با چیدمان قبل از فوتر
    <div className="w-full px-4 md:px-8 my-10 md:my-16 relative z-10 direction-rtl">
      
      {/* هدر بخش برندها */}
      <div className="w-full flex flex-col gap-1 text-right mb-6 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
          <h2 className="text-sm md:text-base font-black text-slate-800 tracking-tight">برندهای محبوب در سیب‌شاپ</h2>
        </div>
      </div>

      {/* ریل برندها: در موبایل اسکرول افقی روان و در دسکتاپ گرید ۵ ستونه فیکس */}
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
