"use client";

import React from 'react';

// دیتای واقعی محصولات همراه با تصاویر مارکت و قیمت‌های تراز شده
const products = [
  { 
    id: 1, 
    name: 'گوشی موبایل اپل مدل iPhone 15 Pro Max دو سیم‌کارت - ظرفیت ۲۵۶ گیگابایت', 
    price: '۶۷,۴۰۰,۰۰۰', 
    oldPrice: '۷۱,۲۰۰,۰۰۰',
    rating: '۴.۸',
    image: 'https://dkstatics-public.digikala.com/digikala-products/2c05060ef169542a1be8267df84f938b81beee44_1694851214.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/quality,q_90', 
    tag: 'پیشنهاد ویژه' 
  },
  { 
    id: 2, 
    name: 'گوشی موبایل سامسونگ مدل Galaxy S24 Ultra دو سیم‌کارت - ظرفیت ۲۵۶ گیگابایت', 
    price: '۶۱,۹۰۰,۰۰۰', 
    oldPrice: '۶۴,۵۰۰,۰۰۰',
    rating: '۴.۷',
    image: 'https://dkstatics-public.digikala.com/digikala-products/7e290f670df990e663a0279c6d482939b4b9b9a6_1705753177.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/quality,q_90', 
    tag: 'پرفروش‌ترین' 
  },
  { 
    id: 3, 
    name: 'هدفون بی‌سیم اپل مدل AirPods Pro 2 (2023) همراه با محفظه شارژ USB-C', 
    price: '۱۰,۴۰۰,۰۰۰', 
    oldPrice: '۱۱,۹۰۰,۰۰۰',
    rating: '۴.۹',
    image: 'https://dkstatics-public.digikala.com/digikala-products/c531cb8db366a7b7a2da691319760777fa65e900_1697282806.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/quality,q_90', 
    tag: 'جدیدترین' 
  },
  { 
    id: 4, 
    name: 'شارژر دیواری انکر مدل Nano A2637 ۲۰W مناسب برای آیفون', 
    price: '۸۹۰,۰۰۰', 
    oldPrice: '۱,۲۰۰,۰۰۰',
    rating: '۴.۵',
    image: 'https://dkstatics-public.digikala.com/digikala-products/cfcebfbf5bfbbd9ec6b11029c78d654519782559_1654605963.jpg?x-oss-process=image/resize,m_lfit,h_800,w_800/quality,q_90', 
    tag: 'لوازم جانبی' 
  },
];

export default function ProductGrid() {
  return (
    <main className="w-full px-4 md:px-8 py-8 pt-4 pb-24 relative z-0">
      <div className="max-w-7xl mx-auto">
        
        {/* تیتر بخش محصولات */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-5 bg-rose-500 rounded-full"></span>
            <h2 className="text-lg md:text-xl font-black text-gray-900">جدیدترین‌های دنیای فناوری</h2>
          </div>
          <span className="text-xs text-rose-500 font-bold cursor-pointer hover:text-rose-600 transition duration-200 flex items-center gap-1">
            <span>مشاهده همه محصولات</span>
            <span>←</span>
          </span>
        </div>

        {/* گرید کارت‌های مدرن */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-3xl p-3 md:p-4 border border-slate-100 shadow-xs hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:border-slate-200/60 transition-all duration-300 flex flex-col justify-between group cursor-pointer relative overflow-hidden"
            >
              <div>
                {/* باکس تصویر کارت محصول با افکت زوم و دکمه مخفی سبد خرید */}
                {/* تغییر مهم: به خاطر بک‌گراند سفید تصاویر دیجی‌کالا، mix-blend-multiply اضافه شد تا در باکس خاکستری محو شوند */}
                <div className="bg-slate-50 rounded-2xl h-40 md:h-48 flex items-center justify-center relative overflow-hidden mb-4 border border-slate-50/50 p-4">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 select-none mix-blend-multiply"
                  />
                  
                  {product.tag && (
                    <span className="absolute top-2 right-2 bg-white/90 backdrop-blur-md text-slate-800 text-[9px] md:text-[10px] font-black px-2 py-1 rounded-xl border border-slate-100 shadow-2xs">
                      {product.tag}
                    </span>
                  )}

                  <div className="absolute inset-x-2 bottom-2 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out z-10 hidden md:block">
                    <button className="w-full bg-rose-500 text-white py-2.5 rounded-xl text-xs font-black shadow-md hover:bg-rose-600 transition flex items-center justify-center gap-1.5">
                      <span>🛒</span>
                      <span>افزودن به سبد خرید</span>
                    </button>
                  </div>
                </div>
                
                {/* ریتینگ محصول */}
                <div className="flex items-center gap-1 mb-1.5 justify-start">
                  <span className="text-amber-400 text-xs">⭐</span>
                  <span className="text-[10px] md:text-xs font-bold text-slate-500">{product.rating}</span>
                </div>

                {/* عنوان کالا */}
                <h3 className="text-xs md:text-sm font-bold text-slate-800 leading-6 md:leading-6 group-hover:text-rose-500 transition duration-200 line-clamp-2 h-12 mb-2 text-right">
                  {product.name}
                </h3>
              </div>

              {/* بخش قیمت قبل و بعد از تخفیف */}
              <div className="mt-2 pt-3 border-t border-slate-50 flex flex-col gap-1">
                <span className="text-[10px] text-slate-400 font-medium line-through text-left pl-1">
                  {product.oldPrice}
                </span>

                <div className="flex items-center justify-between w-full">
                  <div className="text-xs md:text-base font-black text-slate-900 flex items-center gap-0.5">
                    <span>{product.price}</span>
                    <span className="text-[10px] font-normal text-slate-400">تومان</span>
                  </div>
                  
                  <button className="md:hidden bg-slate-50 text-slate-600 w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs hover:bg-rose-500 hover:text-white transition duration-200">
                    ＋
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
