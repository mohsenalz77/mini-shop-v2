"use client";

import React from 'react';
import { ArrowLeft, Star, ShoppingBag } from 'lucide-react';
// ۱. ایمپورت کامپوننت Link از نکست‌جی‌آس
import Link from 'next/link';

// تغییر طلایی ۱: دیتای ثابت حذف شد و کامپوننت حالا پراپ products را از سرور دریافت می‌کند
export default function ProductGrid({ products }) {
  
  // اگر دیتایی از سرور نیامده باشد، برای جلوگیری از کرش کادر خالی یا لودینگ نشان می‌دهیم
  if (!products || products.length === 0) {
    return (
      <div className="w-full text-center py-12 text-slate-400 font-medium">
        در حال بارگذاری جدیدترین محصولات...
      </div>
    );
  }

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
        {products.map((product) => {
          // استخراج مشخصات از ساختار دیتای استراپی v4
          const { title, price, oldPrice, slug } = product.attributes;
          
          return (
            // تغییر تگ div اصلی به کامپوننت Link به همراه آدرس‌دهی داینامیک محصول بر اساس ID استراپی
            <Link 
              href={`/product/${product.id}`}
              key={product.id} 
              className="bg-white rounded-2xl md:rounded-3xl p-3 md:p-4 border border-slate-100 hover:shadow-[0_24px_48px_rgba(0,0,0,0.04)] hover:border-slate-200 transition-all duration-300 flex flex-col justify-between group cursor-pointer relative overflow-hidden block"
            >
              <div className="w-full h-full flex flex-col justify-between">
                <div>
                  {/* باکس تصویر محصول */}
                  <div className="bg-slate-50 rounded-xl md:rounded-2xl h-28 md:h-44 flex items-center justify-center relative overflow-hidden mb-3 border border-slate-100/50">
                    {/* چون در استراپی هنوز اموجی یا عکس داینامیک ست نکردیم، موقتاً یک اموجی ثابت یا هندل کننده می‌گذاریم */}
                    <span className="text-4xl md:text-6xl group-hover:scale-110 transition duration-500 select-none filter drop-shadow-sm">
                      📱
                    </span>
                    
                    {/* تگ کالا (اگر مایل بودی بعداً فیلد tag را هم در استراپی بساز) */}
                    <span className="absolute top-2 right-2 bg-slate-950/90 backdrop-blur-xs text-white text-[8px] md:text-[9px] font-black px-1.5 py-0.5 rounded-md md:rounded-lg shadow-xs">
                      جدید
                    </span>

                    {/* دکمه سبد خرید دسکتاپ */}
                    <div className="absolute inset-x-2 bottom-2 translate-y-14 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out z-20 hidden md:block">
                      <button 
                        onClick={(e) => {
                          e.preventDefault(); // جلوگیری از رفتن به صفحه محصول هنگام کلیک روی دکمه سبد خرید
                          // کد اضافه کردن به سبد خرید بعداً اینجا می‌آید
                        }}
                        className="w-full bg-slate-950 hover:bg-rose-500 text-white py-2.5 rounded-xl text-xs font-black shadow-md transition duration-200 flex items-center justify-center gap-1.5"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>افزودن به سبد خرید</span>
                      </button>
                    </div>
                  </div>
                  
                  {/* ریتینگ ستاره ثابت */}
                  <div className="flex items-center gap-1 mb-1.5 justify-start pr-0.5">
                    <Star className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
                    <span className="text-[9px] md:text-[10px] font-black text-slate-500">۴.۹</span>
                  </div>

                  {/* عنوان کالا (تغییر از product.name به دیتای واقعی استراپی یعنی title) */}
                  <h3 className="text-[11px] md:text-sm font-bold text-slate-800 leading-5 md:leading-6 line-clamp-2 h-10 md:h-12 mb-3 text-right pr-0.5">
                    {title}
                  </h3>
                </div>

                {/* بخش قیمت‌ها در کف کارت */}
                <div className="mt-1 pt-2 md:pt-3 border-t border-slate-100 flex flex-col gap-0.5 text-right">
                  {/* قیمت قبلی (تنها اگر در پنل استراپی پر شده باشد رندر می‌شود) */}
                  {oldPrice ? (
                    <span className="text-[9px] md:text-[11px] text-slate-400 font-medium line-through pr-1">
                      {Number(oldPrice).toLocaleString('fa-IR')} <span className="text-[8px] md:text-[9px] font-normal no-underline">تومان</span>
                    </span>
                  ) : (
                    <div className="h-[14px] md:h-[16px]"></div> // برای اینکه توازن عمودی کارت‌ها به هم نخورد
                  )}

                  <div className="flex items-center justify-between w-full mt-0.5">
                    {/* قیمت نهایی کاملاً داینامیک و فارسی‌سازی شده */}
                    <div className="text-xs md:text-base font-black text-slate-950 flex items-center gap-0.5">
                      <span>{Number(price).toLocaleString('fa-IR')}</span>
                      <span className="text-[9px] md:text-[10px] font-normal text-slate-400">تومان</span>
                    </div>
                    
                    {/* دکمه پلاس موبایل */}
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        // کد سبد خرید موبایل
                      }}
                      className="md:hidden bg-slate-50 text-slate-600 border border-slate-100 w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs hover:bg-rose-500 hover:text-white transition duration-200 shadow-3xs"
                    >
                      ＋
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

    </div>
  );
}
