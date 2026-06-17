"use client";

import { useState, useEffect, useRef } from 'react';
import { Flame, ArrowLeft, ArrowRight } from 'lucide-react';
// ۱. ایمپورت کردن کامپوننت لینک نکست‌جی‌اس در بالاترین بخش فایل
import Link from 'next/link'; 

const amazingProducts = [
  // دیتای محصولات شما ...
];

export default function AmazingOffers() {
  // کدهای مربوط به تایمر و هندل اسکرول شما ...

  return (
    <div className="w-full px-4 md:px-8 my-8 md:my-12 relative block z-10">
      <div className="w-full bg-gradient-to-l from-rose-600 to-red-500 rounded-3xl p-4 md:p-6 flex flex-col xl:flex-row items-center gap-4 md:gap-5 shadow-xl relative overflow-hidden group/box">
        
        {/* هدر مخصوص نسخه موبایل و دسکتاپ شما کماکان اینجاست... */}

        {/* ========================================================================= */}
        {/* ۳. ریل اسکرول محصولات (اتصال داینامیک لینک‌ها به صفحه جزئیات محصول) */}
        {/* ========================================================================= */}
        <div 
          ref={scrollRef}
          className="flex-1 w-full flex gap-3 md:gap-4 overflow-x-auto pb-1 md:pb-3 scrollbar-none snap-x z-10 scroll-smooth px-1 md:px-0"
        >
          {amazingProducts.map((prod) => (
            // ۲. تغییر تگ div اصلی به تگ Link و دادن آدرس مسیر پویا
            <Link 
              href={`/product/${prod.id}`}
              key={prod.id} 
              className="flex-shrink-0 w-[145px] md:w-52 xl:w-56 snap-center bg-white rounded-2xl p-3 md:p-4 flex flex-col justify-between group cursor-pointer hover:shadow-2xl transition-all duration-300 relative border border-white block"
            >
              <div> {/* یک دایو داخلی برای مهار ساختار لایوت کدهای قبلی شما */}
                <div className="relative">
                  <span className="absolute top-0 right-0 bg-rose-500 text-white text-[9px] md:text-[10px] font-black px-1.5 md:px-2 py-0.5 rounded-lg z-10">
                    %{prod.percent}
                  </span>
                  
                  <div className="w-full bg-slate-50 rounded-xl h-24 md:h-36 flex items-center justify-center text-3xl md:text-5xl mb-2 md:mb-3 overflow-hidden">
                    <span className="group-hover:scale-110 transition duration-300 select-none">{prod.image}</span>
                  </div>
                  
                  <h3 className="text-[11px] md:text-xs font-bold text-slate-700 leading-4 md:leading-5 line-clamp-2 h-8 md:h-10 mb-1 md:mb-2 text-right">
                    {prod.name}
                  </h3>
                </div>
                
                <div className="mt-1 md:mt-2 pt-2 border-t border-slate-50 flex flex-col gap-1 md:gap-1.5">
                  <span className="text-[9px] md:text-[10px] text-slate-400 font-medium line-through text-right pr-1">
                    {prod.mainPrice}
                  </span>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-0.5 text-slate-950 font-black text-[11px] md:text-sm">
                      <span>{prod.discountPrice}</span>
                      <span className="text-[9px] font-normal text-slate-400">تومان</span>
                    </div>
                    {/* دکمه پلاس */}
                    <button className="bg-slate-50 text-slate-600 w-6 h-6 md:w-7 md:h-7 rounded-lg flex items-center justify-center font-bold text-xs hover:bg-rose-500 hover:text-white transition duration-200">＋</button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* مینی بنر کلوپ مشتریان شما... */}

      </div>
    </div>
  );
}
