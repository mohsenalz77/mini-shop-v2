"use client";

import React from 'react';
import { ArrowLeft, Star, ShoppingBag } from 'lucide-react';
// ۱. ایمپورت کامپوننت Link از نکست‌جی‌آس
import Link from 'next/link';

const products = [
  { 
    id: 1, 
    name: 'گوشی موبایل اپل مدل iPhone 15 Pro Max ظرفیت ۲۵۶ گیگابایت', 
    price: '۶۷,۴۰۰,۰۰۰', 
    oldPrice: '۷۱,۲۰۰,۰۰۰',
    rating: '۴.۸',
    image: '📱', 
    tag: 'ویژه' 
  },
  { 
    id: 2, 
    name: 'گوشی موبایل سامسونگ مدل Galaxy S24 Ultra ظرفیت ۲۵۶ گیگابایت', 
    price: '۶۱,۹۰۰,۰۰۰', 
    oldPrice: '۶۴,۵۰۰,۰۰۰',
    rating: '۴.۷', // اصلاح کاراکتر ریتینگ
    image: '📱', 
    tag: 'پرفروش' 
  },
  { 
    id: 3, 
    name: 'هدفون بی‌سیم اپل مدل AirPods Pro 2 محفظه شارژ Type-C', 
    price: '۱۰,۴۰۰,۰۰۰', 
    oldPrice: '۱۱,۹۰۰,۰۰۰',
    rating: '۴.欺',
    rating: '۴.۹',
    image: '🎧', 
    tag: 'جدید' 
  },
  { 
    id: 4, 
    name: 'شارژر دیواری انکر مدل Nano ۲۰W مناسب برای آیفون', 
    price: '۸۹۰,۰۰۰', 
    oldPrice: '۱,۲۰۰,۰۰۰',
    rating: '۴.۵',
    image: '🔌', 
    tag: 'اکسسوری' 
  },
];

export default function ProductGrid() {
  return (
    <div className="w-full px-4 md:px-8 my-10 md:my-16 relative z-10 direction-rtl">
      
      {/* هدر ویترین */}
      <div className="w-full flex items-center justify-between mb-6 md:mb-10 border-b border-slate-100 pb-4 md:pb-5">
        <div className="flex flex-col gap-1 text-right">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse"></span>
            <h2 className="text-base md:text-2xl font-black text-slate-900 tracking-tight">
              ویترین سیب‌<span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600">شاپ</span>
            </h2>
          </div>
          <p className="text-[10px] md:text-[11px] font-medium text-slate-400">دست‌چین محبوب‌ترین گجت‌های بازار</p>
        </div>
        
        <button className="flex items-center gap-1 text-[11px] md:text-xs font-black text-slate-700 hover:text-rose-500 border border-slate-200 hover:border-rose-200 bg-white px-2.5 py-1.5 md:px-4 md:py-2 rounded-xl md:rounded-2xl transition-all duration-300 group shadow-2xs">
          <span className="hidden md:inline">مشاهده همه محصولات</span>
          <span className="md:hidden">همه</span>
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
        </button>
      </div>

      {/* گرید ۲ ستونه در موبایل و ۴ ستونه در دسکتاپ */}
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
        {products.map((product) => (
          // ۲. تغییر تگ div اصلی به کامپوننت Link به همراه آدرس‌دهی داینامیک محصول
          <Link 
            href={`/product/${product.id}`}
            key={product.id} 
            className="bg-white rounded-2xl md:rounded-3xl p-3 md:p-4 border border-slate-100 hover:shadow-[0_24px_48px_rgba(0,0,0,0.04)] hover:border-slate-200 transition-all duration-300 flex flex-col justify-between group cursor-pointer relative overflow-hidden block"
          >
            <div className="w-full h-full flex flex-col justify-between">
              <div>
                {/* باکس تصویر محصول */}
                <div className="bg-slate-50 rounded-xl md:rounded-2xl h-28 md:h-44 flex items-center justify-center relative overflow-hidden mb-3 border border-slate-100/50">
                  <span className="text-4xl md:text-6xl group-hover:scale-110 transition duration-500 select-none filter drop-shadow-sm">
                    {product.image}
                  </span>
                  
                  {/* تگ کالا */}
                  {product.tag && (
                    <span className="absolute top-2 right-2 bg-slate-950/90 backdrop-blur-xs text-white text-[8px] md:text-[9px] font-black px-1.5 py-0.5 rounded-md md:rounded-lg shadow-xs">
                      {product.tag}
                    </span>
                  )}

                  {/* دکمه سبد خرید دسکتاپ */}
                  <div className="absolute inset-x-2 bottom-2 translate-y-14 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out z-20 hidden md:block">
                    <button className="w-full bg-slate-950 hover:bg-rose-500 text-white py-2.5 rounded-xl text-xs font-black shadow-md transition duration-200 flex items-center justify-center gap-1.5">
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>افزودن به سبد خرید</span>
                    </button>
                  </div>
                </div>
                
                {/* ریتینگ ستاره */}
                <div className="flex items-center gap-1 mb-1.5 justify-start pr-0.5">
                  <Star className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
                  <span className="text-[9px] md:text-[10px] font-black text-slate-500">{product.rating}</span>
                </div>

                {/* عنوان کالا */}
                <h3 className="text-[11px] md:text-sm font-bold text-slate-800 leading-5 md:leading-6 line-clamp-2 h-10 md:h-12 mb-3 text-right pr-0.5">
                  {product.name}
                </h3>
              </div>

              {/* بخش قیمت‌ها در کف کارت */}
              <div className="mt-1 pt-2 md:pt-3 border-t border-slate-100 flex flex-col gap-0.5 text-right">
                {/* قیمت قبلی */}
                <span className="text-[9px] md:text-[11px] text-slate-400 font-medium line-through pr-1">
                  {product.oldPrice} <span className="text-[8px] md:text-[9px] font-normal no-underline">تومان</span>
                </span>

                <div className="flex items-center justify-between w-full mt-0.5">
                  {/* قیمت نهایی */}
                  <div className="text-xs md:text-base font-black text-slate-950 flex items-center gap-0.5">
                    <span>{product.price}</span>
                    <span className="text-[9px] md:text-[10px] font-normal text-slate-400">تومان</span>
                  </div>
                  
                  {/* دکمه پلاس موبایل */}
                  <button className="md:hidden bg-slate-50 text-slate-600 border border-slate-100 w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs hover:bg-rose-500 hover:text-white transition duration-200 shadow-3xs">
                    ＋
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
}
