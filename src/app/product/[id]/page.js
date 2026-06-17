"use client";

import React, { useState } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { Star, ShieldCheck, Truck, RotateCcw, ShoppingBag, ChevronRight } from 'lucide-react';

// یک دیتای ماک موقت برای رندر شدن صفحه تکی (بعداً از Strapi یا دیتا سنتر میاد)
const productData = {
  id: 1,
  name: 'گوشی موبایل اپل مدل iPhone 15 Pro Max دو سیم‌کارت - ظرفیت ۲۵۶ گیگابایت',
  englishName: 'Apple iPhone 15 Pro Max Dual SIM 256GB Mobile Phone',
  price: '۶۷,۴۰۰,۰۰۰',
  oldPrice: '۷۱,۲۰۰,۰۰۰',
  rating: '۴.۸',
  reviewCount: '۱۴۲ دیدگاه',
  image: '📱', // بعداً با گالری عکس واقعی جاگزین میشه
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
  ]
};

export default function ProductDetailPage({ params }) {
  // دسترسی به آیدی محصول از طریق params.id
  const [selectedColor, setSelectedColor] = useState(0);

  return (
    <div className="min-h-screen bg-gray-50/40 overflow-x-hidden direction-rtl">
      <Header />

      <main className="max-w-7xl mx-auto px-4 md:px-8 pt-28 pb-16 relative z-10">
        
        {/* ۱. بردکرامب (Breadcrumb) یا مسیر راهنمای بالای صفحه */}
        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-8 text-right">
          <span className="hover:text-slate-600 cursor-pointer">سیب‌شاپ</span>
          <ChevronRight className="w-3 h-3" />
          <span className="hover:text-slate-600 cursor-pointer">گوشی موبایل</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-800 truncate max-w-[200px] md:max-w-none">{productData.name}</span>
        </div>

        {/* ۲. کادر اصلی دو ستونه محصول */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white border border-slate-100 rounded-[32px] p-4 md:p-8 shadow-xs">
          
          {/* ستون راست: گالری عکس محصول (لوپ ۴ ستونه در ال‌جی) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center bg-slate-50 rounded-2xl p-6 h-[300px] md:h-[450px] border border-slate-100/60 relative">
            <span className="text-9xl filter drop-shadow-xl select-none animate-bounce-slow">
              {productData.image}
            </span>
          </div>

          {/* ستون چپ: اطلاعات، مشخصات فنی و باکس خرید (لوپ ۷ ستونه) */}
          <div className="lg:col-span-7 flex flex-col justify-between text-right">
            
            {/* بخش عناوین */}
            <div>
              <h1 className="text-lg md:text-xl font-black text-slate-900 leading-8 mb-2">
                {productData.name}
              </h1>
              <p className="text-xs font-medium text-slate-400 direction-ltr text-right mb-4 tracking-wide font-sans">
                {productData.englishName}
              </p>

              {/* امتیاز و کامنت */}
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-1 bg-amber-50 text-amber-600 px-2 py-0.5 rounded-lg text-xs font-black">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{productData.rating}</span>
                </div>
                <span className="text-[11px] font-bold text-slate-400">({productData.reviewCount})</span>
              </div>

              {/* انتخاب رنگ کپسولی */}
              <div className="mb-6">
                <span className="text-xs font-black text-slate-800 block mb-3">انتخاب رنگ: {productData.colors[selectedColor].name}</span>
                <div className="flex items-center gap-3">
                  {productData.colors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(index)}
                      className={`w-8 h-8 rounded-full ${color.class} border-2 transition-all duration-200 shadow-inner ${
                        selectedColor === index ? 'border-rose-500 scale-110 ring-4 ring-rose-500/10' : 'border-transparent hover:scale-105'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* مشخصات برجسته کالا */}
              <div className="mb-6">
                <span className="text-xs font-black text-slate-800 block mb-3">ویژگی‌های کلیدی محصول:</span>
                <div className="grid grid-cols-2 gap-3">
                  {productData.specs.map((spec, index) => (
                    <div key={index} className="bg-slate-50 border border-slate-100/50 rounded-xl p-3 flex flex-col gap-0.5">
                      <span className="text-[10px] font-medium text-slate-400">{spec.title}</span>
                      <span className="text-xs font-bold text-slate-800">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* بخش قیمت و دکمه خرید در پایین ستون */}
            <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex items-center justify-between mt-4">
              <div className="flex flex-col gap-0.5">
                <span className="text-xs text-slate-400 font-medium line-through pl-1">{productData.oldPrice}</span>
                <div className="text-base md:text-xl font-black text-slate-950 flex items-center gap-0.5">
                  <span>{productData.price}</span>
                  <span className="text-xs font-normal text-slate-400">تومان</span>
                </div>
              </div>

              <button className="bg-rose-500 hover:bg-rose-600 text-white font-black text-xs md:text-sm px-6 py-3 rounded-xl shadow-md transition duration-200 flex items-center gap-2 group">
                <ShoppingBag className="w-4 h-4 transition-transform group-hover:scale-110" />
                <span>افزودن به سبد خرید</span>
              </button>
            </div>

          </div>

        </div>

        {/* ۳. بخش مزایای کوچک زیر محصول */}
        <div className="grid grid-cols-3 gap-4 mt-6 text-center text-[11px] md:text-xs font-bold text-slate-500">
          <div className="bg-white border border-slate-100 rounded-2xl p-3 flex items-center justify-center gap-2"><ShieldCheck className="w-4 h-4 text-emerald-500" /><span>گارانتی ۱۸ ماهه شرکتی</span></div>
          <div className="bg-white border border-slate-100 rounded-2xl p-3 flex items-center justify-center gap-2"><Truck className="w-4 h-4 text-blue-500" /><span>ارسال فوری سیب‌شاپ</span></div>
          <div className="bg-white border border-slate-100 rounded-2xl p-3 flex items-center justify-center gap-2"><RotateCcw className="w-4 h-4 text-rose-500" /><span>۷ روز مهلت تست تخصصی</span></div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
