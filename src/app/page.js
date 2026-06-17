"use client";

import React, { useState } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { Star, ShieldCheck, Truck, RotateCcw, ShoppingBag, ChevronRight, Heart, Share2, Info } from 'lucide-react';

const productData = {
  id: 1,
  name: 'گوشی موبایل اپل مدل iPhone 15 Pro Max دو سیم‌کارت - ظرفیت ۲۵۶ گیگابایت',
  englishName: 'Apple iPhone 15 Pro Max Dual SIM 256GB Mobile Phone',
  price: '۶۷,۴۰۰,۰۰۰',
  oldPrice: '۷۱,۲۰۰,۰۰۰',
  rating: '۴.۸',
  reviewCount: '۱۴۲ دیدگاه',
  image: '📱',
  colors: [
    { name: 'تایتانیم طبیعی', class: 'bg-stone-400' },
    { name: 'تایتانیم مشکی', class: 'bg-zinc-800' },
    { name: 'تایتانیم سفید', class: 'bg-slate-100' },
  ],
  specs: [
    { title: 'حافظه داخلی', value: '۲۵۶ گیگابایت' },
    { title: 'حافظه رم', value: '۸ گیگابایت' },
    { title: 'اندازه صفحه نمایش', value: '۶.۷ اینچ' },
    { title: 'شبکه ارتباطی', value: '5G' },
    { title: 'فناوری صفحه', value: 'LTPO Super Retina' },
    { title: 'تعداد دوربین', value: '۳ ماژول حرفه‌ای' },
  ]
};

export default function ProductDetailPage() {
  const [selectedColor, setSelectedColor] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  return (
    // ۱. هم‌تراز شدن پس‌زمینه با صفحه اصلی (bg-slate-50) برای شکستن خفگی سفیدی مطلق
    <div className="min-h-screen bg-slate-50 overflow-x-hidden antialiased direction-rtl">
      <Header />

      {/* ۲. بک‌گراند نوری (Glow Effect) در پشت کادر محصول برای پر کردن سفیدی کناره‌های دسکتاپ */}
      <div className="absolute top-32 left-1/4 w-96 h-96 bg-rose-500/5 blur-[120px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute top-64 right-1/4 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <main className="max-w-7xl mx-auto px-4 md:px-8 pt-28 pb-16 relative z-10">
        
        {/* بردکرامب مینی‌مال */}
        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-6 text-right">
          <span className="hover:text-slate-600 cursor-pointer">سیب‌شاپ</span>
          <ChevronRight className="w-3 h-3" />
          <span className="hover:text-slate-600 cursor-pointer">گوشی موبایل</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-800 truncate">{productData.name}</span>
        </div>

        {/* کادر اصلی سه ستونه پیشرفته */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ستون اول (سمت راست): گالری عکس لوکس با ابزار کنترلی */}
          <div className="lg:col-span-5 bg-white border border-slate-100 rounded-[32px] p-6 flex flex-col justify-between h-[400px] md:h-[500px] shadow-xs relative">
            
            {/* دکمه‌های شناور لایک و شیر روی عکس */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
              <button 
                onClick={() => setIsLiked(!isLiked)}
                className="w-9 h-9 bg-slate-50 border border-slate-100/70 rounded-xl flex items-center justify-center text-slate-400 hover:text-rose-500 transition-colors shadow-2xs"
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
              <button className="w-9 h-9 bg-slate-50 border border-slate-100/70 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors shadow-2xs">
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            {/* تصویر مرکزی با افکت هاله نوری داخلی */}
            <div className="flex-1 flex items-center justify-center bg-radial from-slate-100/40 to-transparent rounded-2xl">
              <span className="text-9xl filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.15)] select-none transform hover:scale-105 transition-transform duration-500">
                {productData.image}
              </span>
            </div>

            {/* گالری تصاویر کوچک مینی‌مال در کف کادر تصویر */}
            <div className="flex gap-2.5 justify-center mt-4">
              <div className="w-12 h-12 bg-slate-50 border-2 border-rose-500 rounded-xl flex items-center justify-center text-xl cursor-pointer">📱</div>
              <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-xl opacity-60 hover:opacity-100 transition cursor-pointer">📸</div>
              <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-xl opacity-60 hover:opacity-100 transition cursor-pointer">📦</div>
            </div>
          </div>

          {/* ستون دوم (وسط): مشخصات فنی، شناسنامه و جزئیات کالا */}
          <div className="lg:col-span-4 bg-white border border-slate-100 rounded-[32px] p-6 flex flex-col justify-between min-h-[400px] md:min-h-[500px] shadow-xs text-right">
            <div>
              <h1 className="text-base md:text-lg font-black text-slate-900 leading-7 mb-1">{productData.name}</h1>
              <p className="text-[10px] font-bold text-slate-400 font-sans tracking-wide mb-4 text-left direction-ltr">{productData.englishName}</p>

              {/* ریتینگ ستاره */}
              <div className="flex items-center gap-1.5 mb-5 bg-slate-50/80 px-3 py-1 rounded-xl border border-slate-100/50 w-fit">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="text-xs font-black text-slate-700">{productData.rating}</span>
                <span className="text-[10px] text-slate-400 font-bold">({productData.reviewCount})</span>
              </div>

              {/* پالت انتخاب رنگ کپسولی */}
              <div className="mb-5 bg-slate-50/50 p-3 rounded-2xl border border-slate-100/60">
                <span className="text-xs font-black text-slate-800 block mb-2.5">رنگ: {productData.colors[selectedColor].name}</span>
                <div className="flex items-center gap-2.5">
                  {productData.colors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(index)}
                      className={`w-7 h-7 rounded-full ${color.class} border-2 transition-all duration-300 ${
                        selectedColor === index ? 'border-rose-500 scale-110 ring-4 ring-rose-500/10 shadow-md' : 'border-slate-200 hover:scale-105'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* گرید ویژگی‌های فنی کالا */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1 text-slate-800 mb-1">
                  <Info className="w-3.5 h-3.5 text-rose-500" />
                  <span className="text-xs font-black">ویژگی‌های مهم:</span>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {productData.specs.map((spec, index) => (
                    <div key={index} className="flex items-center justify-between bg-slate-50/60 px-3 py-2 rounded-xl border border-slate-100/30">
                      <span className="text-[11px] font-medium text-slate-400">{spec.title}</span>
                      <span className="text-xs font-bold text-slate-800">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ستون سوم (سمت چپ): باکس خرید و گارانتی هوشمند (پر کننده فضای کناری دسکتاپ) */}
          <div className="lg:col-span-3 bg-slate-900 border border-slate-950 rounded-[32px] p-5 flex flex-col justify-between min-h-[400px] md:min-h-[500px] shadow-xl text-white relative overflow-hidden">
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-rose-500/10 blur-2xl rounded-full"></div>
            
            {/* خدمات و اصالت کالا */}
            <div className="flex flex-col gap-4 z-10">
              <span className="text-xs font-black text-slate-400 border-b border-white/5 pb-2 block text-right">فروشنده: سیب‌شاپ</span>
              
              <div className="flex items-start gap-3 text-right">
                <ShieldCheck className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white">گارانتی ۱۸ ماهه شرکتی</span>
                  <span className="text-[10px] text-slate-400 mt-0.5">تضمین اصالت و خدمات طلایی</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-right">
                <Truck className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white">ارسال اکسپرس سیب‌شاپ</span>
                  <span className="text-[10px] text-slate-400 mt-0.5">تحویل فوری درب منزل</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-right">
                <RotateCcw className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white">۷ روز مهلت تست تخصصی</span>
                  <span className="text-[10px] text-slate-400 mt-0.5">تعویض کالا در صورت مشکل فنی</span>
                </div>
              </div>
            </div>

            {/* بخش نهایی قیمت و دکمه خرید لوکس دوقلو */}
            <div className="mt-6 pt-4 border-t border-white/5 z-10 flex flex-col gap-4">
              <div className="flex items-center justify-between w-full direction-rtl text-right">
                <span className="text-[10px] text-slate-400 font-bold">قیمت کالا:</span>
                <div className="flex flex-col items-end">
                  <span className="text-[11px] text-slate-500 line-through font-medium">{productData.oldPrice}</span>
                  <div className="text-lg md:text-xl font-black text-white flex items-center gap-0.5 mt-0.5">
                    <span>{productData.price}</span>
                    <span className="text-[11px] font-normal text-slate-400 mr-0.5">تومان</span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-rose-500 hover:bg-rose-600 text-white font-black text-xs md:text-sm py-3.5 rounded-2xl shadow-lg shadow-rose-500/20 transition-all duration-300 flex items-center justify-center gap-2 group active:scale-98">
                <ShoppingBag className="w-4 h-4 transition-transform group-hover:scale-110" />
                <span>افزودن به سبد خرید</span>
              </button>
            </div>

          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
