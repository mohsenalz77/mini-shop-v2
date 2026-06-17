"use client";

import React from 'react';
import { ArrowLeft, Star } from 'lucide-react';

const products = [
  { 
    id: 1, 
    name: 'گوشی موبایل اپل مدل iPhone 15 Pro Max ظرفیت ۲۵۶ گیگابایت', 
    price: '۶۷,۴۰۰,۰۰۰', 
    oldPrice: '۷۱,۲۰۰,۰۰۰',
    rating: '۴.۸',
    // استفاده از تصویر png با کادر شفاف و تمیز
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
    <div className="w-full px-4 md:px-8 my-16 relative z-10 direction-rtl">
      
      {/* ۱. هدر جدید: فوق مینی‌مال، راست‌چین اصولی و بدون شلوغ‌کاری انگلیسی */}
      <div className="w-full flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-6 bg-rose-500 rounded-full"></span>
          <h2 className="text-lg md:text-xl font-black text-slate-900">جدیدترین محصولات</h2>
        </div>
        
        <button className="flex items-center gap-1 text-xs font-bold text-rose-500 hover:text-rose-600 transition duration-200 group">
          <span>مشاهده همه</span>
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        </button>
      </div>

      {/* ۲. گرید مهندسی‌شده کارت‌های محصول */}
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="bg-white rounded-3xl p-3 md:p-4 border border-slate-100 hover:shadow-[0_20px_40px_rgba(0,0,0,0.03)] hover:border-slate-200 transition-all duration-300 flex flex-col justify-between group cursor-pointer relative overflow-hidden"
          >
            <div>
              {/* باکس تصویر محصول - تغییر به bg-white خالص برای حذف افکت دو رنگی لبه‌های عکس */}
              <div className="bg-white rounded-2xl h-36 md:h-44 flex items-center justify-center relative overflow-hidden mb-4 border border-slate-50 p-2">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 select-none"
                  loading="lazy"
                />
                
                {/* تگ وضعیت کالا */}
                {product.tag && (
                  <span className="absolute top-2 right-2 bg-slate-900 text-white text-[9px] font-black px-2 py-0.5 rounded-lg z-20">
                    {product.tag}
                  </span>
                )}

                {/* دکمه افزودن سریع دسکتاپ با کد رنگ هدر */}
                <div className="absolute inset-x-2 bottom-2 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out z-20 hidden md:block">
                  <button className="w-full bg-rose-500 text-white py-2 rounded-xl text-xs font-black shadow-md hover:bg-rose-600 transition duration-200">
                    افزودن به سبد خرید
                  </button>
                </div>
              </div>
              
              {/* ریتینگ ستاره مینی‌مال */}
              <div className="flex items-center gap-1 mb-2 justify-start">
                <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                <span className="text-[10px] font-bold text-slate-400">{product.rating}</span>
              </div>

              {/* عنوان کالا کاملاً راست‌چین بدون تداخل */}
              <h3 className="text-xs md:text-sm font-bold text-slate-700 leading-6 line-clamp-2 h-12 mb-3 text-right">
                {product.name}
              </h3>
            </div>

            {/* بخش قیمت‌ها در کف کارت */}
            <div className="mt-2 pt-3 border-t border-slate-50 flex flex-col gap-1 text-right">
              {/* قیمت قبلی خط خورده ملایم */}
              <span className="text-[10px] text-slate-400 font-medium line-through pl-1">
                {product.oldPrice}
              </span>

              <div className="flex items-center justify-between w-full">
                {/* قیمت اصلی */}
                <div className="text-sm md:text-base font-black text-slate-950 flex items-center gap-0.5">
                  <span>{product.price}</span>
                  <span className="text-[10px] font-normal text-slate-400">تومان</span>
                </div>
                
                {/* دکمه پلاس مینی‌مال موبایل */}
                <button className="md:hidden bg-slate-50 text-slate-600 w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs hover:bg-rose-500 hover:text-white transition duration-200">
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
