"use client";

import React from 'react';
import { ArrowLeft, Star, ShoppingBag } from 'lucide-react';

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
    rating: '۴.۷',
    image: '📱', 
    tag: 'پرفروش' 
  },
  { 
    id: 3, 
    name: 'هدفون بی‌سیم اپل مدل AirPods Pro 2 محفظه شارژ Type-C', 
    price: '۱۰,۴۰۰,۰۰۰', 
    oldPrice: '۱۱,۹۰۰,۰۰۰',
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
    <div className="w-full px-4 md:px-8 my-16 relative z-10 direction-rtl">
      
      {/* هدر دگرگون شده: لوکس، مینی‌مال و هم‌تراز با کلاس‌های روز */}
      <div className="w-full flex items-end justify-between mb-10 border-b border-slate-100 pb-5">
        <div className="flex flex-col gap-1.5 text-right">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></span>
            <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">ویترین پیشنهادی سیب‌شاپ</h2>
          </div>
          <p className="text-[11px] font-medium text-slate-400">دست‌چین محبوب‌ترین و جدیدترین گجت‌های بازار فناوری</p>
        </div>
        
        <button className="flex items-center gap-1.5 text-xs font-black text-slate-700 hover:text-rose-500 border border-slate-200 hover:border-rose-200 bg-white px-4 py-2 rounded-2xl transition-all duration-300 group shadow-2xs">
          <span>مشاهده همه محصولات</span>
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
        </button>
      </div>

      {/* گرید کارت‌های محصول با ساختار هندسی تراز */}
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="bg-white rounded-3xl p-4 border border-slate-100 hover:shadow-[0_24px_48px_rgba(0,0,0,0.04)] hover:border-slate-200 transition-all duration-300 flex flex-col justify-between group cursor-pointer relative overflow-hidden"
          >
            <div>
              {/* باکس تصویر محصول - یکدست با ایموجی‌های تمیز مشابه شگفت‌انگیز */}
              <div className="bg-slate-50 rounded-2xl h-36 md:h-44 flex items-center justify-center relative overflow-hidden mb-4 border border-slate-100/50">
                <span className="text-5xl md:text-6xl group-hover:scale-110 transition duration-500 select-none filter drop-shadow-md">
                  {product.image}
                </span>
                
                {/* تگ کالا با تم تاریک و باکلاس */}
                {product.tag && (
                  <span className="absolute top-2.5 right-2.5 bg-slate-950/90 backdrop-blur-xs text-white text-[9px] font-black px-2 py-0.5 rounded-lg shadow-xs">
                    {product.tag}
                  </span>
                )}

                {/* دکمه افزودن به سبد خرید دسکتاپ چسبان با استایل مدرن */}
                <div className="absolute inset-x-2 bottom-2 translate-y-14 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out z-20 hidden md:block">
                  <button className="w-full bg-slate-950 hover:bg-rose-500 text-white py-2.5 rounded-xl text-xs font-black shadow-md transition duration-200 flex items-center justify-center gap-1.5">
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>افزودن به سبد خرید</span>
                  </button>
                </div>
              </div>
              
              {/* ریتینگ ستاره */}
              <div className="flex items-center gap-1 mb-2 justify-start pr-0.5">
                <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                <span className="text-[10px] font-black text-slate-500">{product.rating}</span>
              </div>

              {/* عنوان کالا */}
              <h3 className="text-xs md:text-sm font-bold text-slate-800 leading-6 line-clamp-2 h-12 mb-4 text-right pr-0.5">
                {product.name}
              </h3>
            </div>

            {/* بخش قیمت‌ها در کف کارت - تراز کامل عمودی */}
            <div className="mt-2 pt-3 border-t border-slate-100 flex flex-col gap-1 text-right">
              {/* قیمت قبلی خط خورده ملایم */}
              <span className="text-[11px] text-slate-400 font-medium line-through pr-1">
                {product.oldPrice} <span className="text-[9px] font-normal no-underline">تومان</span>
              </span>

              <div className="flex items-center justify-between w-full mt-0.5">
                {/* قیمت نهایی درشت */}
                <div className="text-sm md:text-base font-black text-slate-950 flex items-center gap-0.5">
                  <span>{product.price}</span>
                  <span className="text-[10px] font-normal text-slate-400">تومان</span>
                </div>
                
                {/* دکمه پلاس موبایل */}
                <button className="md:hidden bg-slate-100 text-slate-800 w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs hover:bg-rose-500 hover:text-white transition duration-200">
                  ＋
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
