"use client";

import React from 'react';
import { ArrowLeft } from 'lucide-react';

const products = [
  { 
    id: 1, 
    name: 'گوشی موبایل اپل مدل iPhone 15 Pro Max ظرفیت ۲۵۶ گیگابایت', 
    price: '۶۷,۴۰۰,۰۰۰', 
    oldPrice: '۷۱,۲۰۰,۰۰۰',
    rating: '۴.۸',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&q=75', 
    tag: 'ویژه' 
  },
  { 
    id: 2, 
    name: 'گوشی موبایل سامسونگ مدل Galaxy S24 Ultra ظرفیت ۲۵۶ گیگابایت', 
    price: '۶۱,۹۰۰,۰۰۰', 
    oldPrice: '۶۴,۵۰۰,۰۰۰',
    rating: '۴.۷',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&q=75', 
    tag: 'پرفروش' 
  },
  { 
    id: 3, 
    name: 'هدفون بی‌سیم اپل مدل AirPods Pro 2 محفظه شارژ Type-C', 
    price: '۱۰,۴۰۰,۰۰۰', 
    oldPrice: '۱۱,۹۰۰,۰۰۰',
    rating: '۴.۹',
    image: 'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=400&q=75', 
    tag: 'جدید' 
  },
  { 
    id: 4, 
    name: 'شارژر دیواری انکر مدل Nano ۲۰W مناسب برای آیفون', 
    price: '۸۹۰,۰۰۰', 
    oldPrice: '۱,۲۰۰,۰۰۰',
    rating: '۴.۵',
    image: 'https://images.unsplash.com/photo-1622445262465-2481c4574875?w=400&q=75', 
    tag: 'اکسسوری' 
  },
];

export default function ProductGrid() {
  return (
    <div className="w-full px-4 md:px-8 my-12 relative z-10">
      
{/* هدر بخش محصولات: مدرن، اروپایی و مینی‌مال */}
<div className="w-full flex flex-col md:flex-row md:items-end justify-between mb-10 border-b border-slate-100 pb-5 gap-4">
  <div className="flex flex-col gap-1 text-right">
    {/* تگ کوچک انگلیسی برای ایجاد حس پویایی و خفن بودن لایوت */}
    <span className="text-[10px] font-black tracking-widest text-rose-500 uppercase">
      / Selected Collection
    </span>
    <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
      <span>منتخب محصولات سیب‌شاپ</span>
      <span className="text-xs font-medium text-slate-400 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-full hidden sm:inline-block">
        ۴ کالا
      </span>
    </h2>
  </div>
  
  {/* دکمه ناوبری شیک با افکت تغییر رنگ نرم و هاور انیمیشنی */}
  <button className="flex items-center gap-2 text-xs font-black text-slate-900 bg-slate-100 hover:bg-rose-500 hover:text-white px-4 py-2.5 rounded-2xl transition-all duration-300 group self-start md:self-auto shadow-xs">
    <span>همه محصولات فروشگاه</span>
    <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
  </button>
</div>

      {/* گرید بدون باگ */}
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="bg-white rounded-3xl p-3 md:p-4 border border-slate-100 shadow-xs hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] hover:border-slate-200/60 transition-all duration-300 flex flex-col justify-between group cursor-pointer relative overflow-hidden"
          >
            {/* بخش بالایی کارت */}
            <div className="relative w-full">
              
              {/* باکس تصویر محصول - افزایش ارتفاع به h-40 برای مهار سقف کادر */}
              <div className="bg-slate-50 rounded-2xl h-40 md:h-48 flex items-center justify-center relative overflow-hidden mb-3 border border-slate-50 p-2">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 select-none mix-blend-multiply"
                  loading="lazy"
                />
                
                {/* تگ کالا - فیکس چسبندگی بالا با مرز بندی درست */}
                {product.tag && (
                  <span className="absolute top-2 right-2 bg-slate-900 text-white text-[9px] font-black px-2 py-0.5 rounded-lg shadow-xs z-20">
                    {product.tag}
                  </span>
                )}

                {/* دکمه افزودن سریع دسکتاپ */}
                <div className="absolute inset-x-2 bottom-2 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out z-20 hidden md:block">
                  <button className="w-full bg-slate-900 text-white py-2 rounded-xl text-xs font-black shadow-md hover:bg-rose-500 transition duration-200">
                    افزودن به سبد خرید
                  </button>
                </div>
              </div>
              
              {/* امتیاز کالا */}
              <div className="flex items-center gap-1 mb-1 justify-start">
                <span className="text-amber-400 text-[10px]">⭐</span>
                <span className="text-[10px] font-bold text-slate-400">{product.rating}</span>
              </div>

              {/* عنوان کالا - فیکس راست‌چین و بدون تداخل */}
              <h3 className="text-xs font-bold text-slate-700 leading-5 line-clamp-2 h-10 mb-2 text-right w-full block">
                {product.name}
              </h3>
            </div>

            {/* بخش قیمت‌ها در کف کارت */}
            <div className="mt-2 pt-2.5 border-t border-slate-50 flex flex-col gap-0.5">
              <span className="text-[10px] text-slate-400 font-medium line-through text-right pr-1">
                {product.oldPrice} تومان
              </span>

              <div className="flex items-center justify-between w-full">
                <div className="text-xs md:text-sm font-black text-slate-950 flex items-center gap-0.5">
                  <span>{product.price}</span>
                  <span className="text-[9px] font-normal text-slate-400">تومان</span>
                </div>
                
                {/* پلاس موبایل */}
                <button className="md:hidden bg-slate-50 text-slate-600 w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs">
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
