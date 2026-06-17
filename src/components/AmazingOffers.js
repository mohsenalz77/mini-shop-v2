"use client";

import { useState, useEffect, useRef } from 'react';
import { Flame, ArrowLeft, ArrowRight } from 'lucide-react';

const amazingProducts = [
  { id: 101, name: 'آیفون ۱۳ پرو مکس - ۱۲۸ گیگابایت (استوک کارهای عالی)', mainPrice: '۴۸,۹۰۰,۰۰۰', discountPrice: '۴۴,۵۰۰,۰۰۰', percent: '۹', image: '📱' },
  { id: 102, name: 'ساعت هوشمند اپل واچ سری ۹ مدل Aluminum 45mm', mainPrice: '۲۱,۵۰۰,۰۰۰', discountPrice: '۱۸,۹۰۰,۰۰۰', percent: '۱۲', image: '⌚' },
  { id: 103, name: 'ایرپاد پرو نسل ۲ مدل Type-C اورجینال', mainPrice: '۱۱,۲۰۰,۰۰۰', discountPrice: '۹,۶۰۰,۰۰۰', percent: '۱۴', image: '🎧' },
  { id: 104, name: 'پاوربانک بیسوس ۲۰ هزار وات فست شارژ', mainPrice: '۲,۴۰۰,۰۰۰', discountPrice: '۱,۸۵۰,۰۰۰', percent: '۲۳', image: '🔌' },
  { id: 105, name: 'گوشی موبایل اپل مدل iPhone 15 Pro ظرفیت ۱۲۸ گیگابایت', mainPrice: '۵۴,۹۰۰,۰۰۰', discountPrice: '۵۱,۲۰۰,۰۰۰', percent: '۷', image: '📱' },
  { id: 106, name: 'گوشی موبایل سامسونگ گلکسی S24 ظرفیت ۲۵۶ گیگابایت', mainPrice: '۴۳,۵۰۰,۰۰۰', discountPrice: '۳۹,۹۰۰,۰۰۰', percent: '۸', image: '📱' },
  { id: 107, name: 'مچ‌بند هوشمند شیائومی مدل Mi Band 8 Global Version', mainPrice: '۲,۱۰۰,۰۰۰', discountPrice: '۱,۶۵۰,۰۰۰', percent: '۲۱', image: '⌚' },
  { id: 108, name: 'قاب محافظ مگ‌سیف نیلکین مناسب برای آیفون ۱۵ پرو مکس', mainPrice: '۱,۴۵۰,۰۰۰', discountPrice: '۹۸۰,۰۰۰', percent: '۳۲', image: '🛡️' },
];

export default function AmazingOffers() {
  const [timeLeft, setTimeLeft] = useState({ hours: 6, minutes: 42, seconds: 0 });
  const scrollRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.hours === 0 && prev.minutes === 0 && prev.seconds === 0) {
          clearInterval(timer);
          return prev;
        }
        let s = prev.seconds - 1; let m = prev.minutes; let h = prev.hours;
        if (s < 0) { s = 59; m -= 1; }
        if (m < 0) { m = 59; h -= 1; }
        return { hours: h, minutes: m, seconds: s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const formatTime = (num) => String(num).padStart(2, '۰');

  return (
    <div className="w-full px-4 md:px-8 my-8 md:my-12 relative block z-10">
      
      {/* باکس شگفت‌انگیز - پدینگ‌ها برای موبایل به صورت ردیفی کاملاً بهینه شدند */}
      <div className="w-full bg-gradient-to-l from-rose-600 to-red-500 rounded-3xl p-4 md:p-6 flex flex-col xl:flex-row items-center gap-4 md:gap-5 shadow-xl relative overflow-hidden group/box">
        
        {/* ========================================================================= */}
        {/* ۱. هدر شگفت‌انگیز مخصوص نسخه موبایل (ترکیب خطی افقی لوکس) */}
        {/* ========================================================================= */}
        <div className="flex xl:hidden w-full items-center justify-between border-b border-white/10 pb-3 z-10">
          <div className="flex items-center gap-2.5">
            <div className="bg-amber-400 text-slate-950 p-1.5 rounded-xl shadow-inner animate-bounce">
              <Flame className="w-4 h-4 fill-slate-950 stroke-[2]" />
            </div>
            <div className="flex flex-col items-start">
              <h2 className="text-base font-black text-white tracking-tight">شگفت‌آور</h2>
              <span className="text-[10px] text-rose-100 font-medium">تخفیف‌های داغ روز</span>
            </div>
          </div>

          {/* باکس تایمر افقی و مینیاتوری در موبایل */}
          <div className="flex items-center gap-1 font-black text-slate-900 direction-ltr bg-black/10 px-2 py-1.5 rounded-2xl border border-white/5">
            <div className="bg-white rounded-lg w-7 h-7 flex items-center justify-center text-[11px] shadow-sm font-black">{formatTime(timeLeft.seconds)}</div>
            <span className="text-white text-[10px]">:</span>
            <div className="bg-white rounded-lg w-7 h-7 flex items-center justify-center text-[11px] shadow-sm font-black">{formatTime(timeLeft.minutes)}</div>
            <span className="text-white text-[10px]">:</span>
            <div className="bg-white rounded-lg w-7 h-7 flex items-center justify-center text-[11px] shadow-sm font-black">{formatTime(timeLeft.hours)}</div>
          </div>

          {/* دکمه مشاهده همه در موبایل */}
          <button className="flex items-center gap-1 text-[11px] font-black text-white hover:text-amber-200 transition">
            <span>همه</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* ========================================================================= */}
        {/* ۲. بخش ساختار اعلان دسکتاپ (کاملاً دست‌نخورده، در موبایل hidden است) */}
        {/* ========================================================================= */}
        <div className="hidden xl:flex flex-col items-center xl:items-start text-center xl:text-right text-white shrink-0 py-2 xl:w-44 z-10">
          <div className="flex items-center gap-2 mb-2 bg-white/10 px-3 py-1 rounded-full border border-white/10">
            <Flame className="w-4 h-4 text-amber-300 fill-amber-300" />
            <span className="text-[11px] font-black">پیشنهاد ویژه روز</span>
          </div>
          
          <h2 className="text-2xl font-black tracking-tight mb-1">شگفت‌آور</h2>
          <span className="text-rose-100 text-xs font-medium mb-5">تخفیف‌های داغ سیب‌شاپ</span>

          <div className="flex items-center gap-1 font-black text-slate-900 direction-ltr mb-5">
            <div className="bg-white rounded-xl w-9 h-9 flex items-center justify-center text-xs shadow-md">{formatTime(timeLeft.seconds)}</div>
            <span className="text-white text-sm">:</span>
            <div className="bg-white rounded-xl w-9 h-9 flex items-center justify-center text-xs shadow-md">{formatTime(timeLeft.minutes)}</div>
            <span className="text-white text-sm">:</span>
            <div className="bg-white rounded-xl w-9 h-9 flex items-center justify-center text-xs shadow-md">{formatTime(timeLeft.hours)}</div>
          </div>

          <button className="flex items-center gap-2 text-xs font-black text-white hover:text-amber-200 transition group mt-auto">
            <span>مشاهده همه</span>
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          </button>
        </div>

        {/* دکمه‌های ریموت دسکتاپ */}
        <button 
          onClick={() => handleScroll('right')}
          className="absolute right-[210px] top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-800 w-10 h-10 rounded-full items-center justify-center shadow-lg transition-all duration-300 z-30 hidden xl:flex opacity-0 group-hover/box:opacity-100 hover:scale-110 border border-slate-100"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
        
        <button 
          onClick={() => handleScroll('left')}
          className="absolute left-[210px] top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-800 w-10 h-10 rounded-full items-center justify-center shadow-lg transition-all duration-300 z-30 hidden xl:flex opacity-0 group-hover/box:opacity-100 hover:scale-110 border border-slate-100"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* ========================================================================= */}
        {/* ۳. ریل اسکرول محصولات (بهینه‌سازی پدینگ‌ها و کارت‌ها برای موبایل) */}
        {/* ========================================================================= */}
        <div 
          ref={scrollRef}
          className="flex-1 w-full flex gap-3 md:gap-4 overflow-x-auto pb-1 md:pb-3 scrollbar-none snap-x z-10 scroll-smooth px-1 md:px-0"
        >
          {amazingProducts.map((prod) => (
            <div 
              key={prod.id} 
              className="flex-shrink-0 w-[145px] md:w-52 xl:w-56 snap-center bg-white rounded-2xl p-3 md:p-4 flex flex-col justify-between group cursor-pointer hover:shadow-2xl transition-all duration-300 relative border border-white"
            >
              <div className="relative">
                <span className="absolute top-0 right-0 bg-rose-500 text-white text-[9px] md:text-[10px] font-black px-1.5 md:px-2 py-0.5 rounded-lg z-10">
                  %{prod.percent}
                </span>
                
                {/* بهینه‌سازی ارتفاع تصویر در نسخه موبایل */}
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
                  {/* دکمه افزودن کوچک‌تر و متناسب‌تر در موبایل */}
                  <button className="bg-slate-50 text-slate-600 w-6 h-6 md:w-7 md:h-7 rounded-lg flex items-center justify-center font-bold text-xs hover:bg-rose-500 hover:text-white transition duration-200">＋</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ۴. مینی بنر انتهای صف دسکتاپ */}
        <div className="hidden xl:flex flex-col items-center justify-center text-center border-2 border-dashed border-white/20 rounded-2xl p-5 w-48 h-full shrink-0 text-white relative overflow-hidden group/left cursor-pointer">
          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover/left:opacity-100 transition duration-300"></div>
          <span className="text-4xl mb-2 animate-pulse">🎁</span>
          <span className="text-xs font-black mb-1">شانس برنده شدن!</span>
          <p className="text-[10px] text-rose-100 leading-4 mb-4">با هر خرید شگفت‌انگیز، یک کد قرعه‌کشی گجت ببر.</p>
          <div className="bg-white text-rose-600 rounded-xl px-3 py-1.5 text-[10px] font-black flex items-center gap-1 shadow-sm">
            <span>کلوپ مشتریان</span>
            <ArrowLeft className="w-3 h-3" />
          </div>
        </div>

      </div>
    </div>
  );
}
