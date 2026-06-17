"use client";

import { useState, useEffect } from 'react';
import { ShoppingCart, Timer, Flame, ArrowLeft } from 'lucide-react';

// دیتای موقت محصولات شگفت‌انگیز (بعداً به دیتابیس وصل می‌کنی)
const amazingProducts = [
  { id: 101, name: 'آیفون ۱۳ پرو مکس - ۱۲۸ گیگابایت (استوک کارهای عالی)', mainPrice: '۴۸,۹۰۰,۰۰۰', discountPrice: '۴۴,۵۰۰,۰۰۰', percent: '۹', image: '📱' },
  { id: 102, name: 'ساعت هوشمند اپل واچ سری ۹ مدل Aluminum 45mm', mainPrice: '۲۱,۵۰۰,۰۰۰', discountPrice: '۱۸,۹۰۰,۰۰۰', percent: '۱۲', image: '⌚' },
  { id: 103, name: 'ایرپاد پرو نسل ۲ مدل Type-C اورجینال', mainPrice: '۱۱,۲۰۰,۰۰۰', discountPrice: '۹,۶۰۰,۰۰۰', percent: '۱۴', image: '🎧' },
  { id: 104, name: 'پاوربانک بیسوس ۲۰ هزار وات فست شارژ', mainPrice: '۲,۴۰۰,۰۰۰', discountPrice: '۱,۸۵۰,۰۰۰', percent: '۲۳', image: '🔌' },
];

export default function AmazingOffers() {
  // استیت تایمر معکوس (مثلاً برای ۶ ساعت و ۴۲ دقیقه بعد)
  const [timeLeft, setTimeLeft] = useState({ hours: 6, minutes: 42, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.hours === 0 && prev.minutes === 0 && prev.seconds === 0) {
          clearInterval(timer);
          return prev;
        }
        let s = prev.seconds - 1;
        let m = prev.minutes;
        let h = prev.hours;

        if (s < 0) {
          s = 59;
          m -= 1;
        }
        if (m < 0) {
          m = 59;
          h -= 1;
        }
        return { hours: h, minutes: m, seconds: s };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // تابع کمکی برای فرمت‌دهی دو رقمی اعداد تایمر
  const formatTime = (num) => String(num).padStart(2, '۰');

  return (
    <div className="w-full px-4 md:px-8 my-12 relative z-10">
      {/* باکس شاسی کلان شگفت‌انگیز با پس‌زمینه رز/قرمز پرانرژی متناسب با تم سیب‌شاپ */}
      <div className="w-full bg-gradient-to-l from-rose-600 to-red-500 rounded-3xl p-6 flex flex-col lg:flex-row items-center gap-6 shadow-xl overflow-hidden">
        
        {/* بخش راست: تابلوی اعلان شگفت‌انگیز و تایمر معکوس */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-right text-white shrink-0 py-4 px-2 lg:w-52">
          <div className="flex items-center gap-2 mb-2 bg-white/10 px-3 py-1 rounded-full border border-white/10 animate-bounce">
            <Flame className="w-4 h-4 text-amber-300 fill-amber-300" />
            <span className="text-[11px] font-black">پیشنهاد ویژه روز</span>
          </div>
          
          <h2 className="text-2xl font-black tracking-tight mb-1">شگفت‌انگیز</h2>
          <span className="text-rose-100 text-xs font-medium mb-6">تخفیف‌های کات‌شده و داغ</span>

          {/* باکس تایمر زنده */}
          <div className="flex items-center gap-1.5 font-black text-slate-900 direction-ltr mb-6">
            <div className="bg-white rounded-xl w-10 h-10 flex items-center justify-center text-sm shadow-md">
              {formatTime(timeLeft.seconds)}
            </div>
            <span className="text-white text-sm animate-pulse">:</span>
            <div className="bg-white rounded-xl w-10 h-10 flex items-center justify-center text-sm shadow-md">
              {formatTime(timeLeft.minutes)}
            </div>
            <span className="text-white text-sm animate-pulse">:</span>
            <div className="bg-white rounded-xl w-10 h-10 flex items-center justify-center text-sm shadow-md">
              {formatTime(timeLeft.hours)}
            </div>
            <Timer className="w-4 h-4 text-white ml-2 shrink-0 stroke-[2.5]" />
          </div>

          <button className="hidden lg:flex items-center gap-2 text-xs font-black text-white hover:text-amber-200 transition group mt-auto">
            <span>مشاهده همه</span>
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          </button>
        </div>

        {/* بخش چپ: رولر افقی محصولات تخفیف‌خورده با اسکرول ریسپانسیو مهار شده */}
        <div className="flex-1 w-full flex gap-4 overflow-x-auto pb-2 scrollbar-none snap-x">
          {amazingProducts.map((prod) => (
            <div 
              key={prod.id} 
              className="flex-shrink-0 w-44 md:w-56 snap-center bg-white rounded-2xl p-4 flex flex-col justify-between group cursor-pointer hover:shadow-2xl transition-all duration-300 relative border border-white"
            >
              <div>
                {/* دایره درصد تخفیف قرمز بالا سمت راست کارت */}
                <span className="absolute top-3 right-3 bg-rose-500 text-white text-[10px] font-black px-2 py-0.5 rounded-lg z-10 shadow-xs">
                  %{prod.percent}
                </span>

                {/* تصویر محصول */}
                <div className="w-full bg-slate-50 rounded-xl h-28 md:h-36 flex items-center justify-center text-4xl md:text-5xl mb-3 relative overflow-hidden">
                  <span className="group-hover:scale-110 transition duration-300 select-none">{prod.image}</span>
                </div>

                {/* عنوان کالا با افکت لاین‌کلمپ */}
                <h3 className="text-xs font-bold text-slate-700 leading-5 line-clamp-2 h-10 mb-2">
                  {prod.name}
                </h3>
              </div>

              {/* بخش مالی و محاسباتی قیمت */}
              <div className="mt-2 pt-2 border-t border-slate-50 flex flex-col gap-1.5">
                {/* قیمت قبلی خط خورده خاکستری */}
                <span className="text-[10px] text-slate-400 font-medium line-through text-right pr-1">
                  {prod.mainPrice}
                </span>
                
                {/* قیمت اصلی نهایی با دکمه خرید پلاس */}
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-0.5 text-slate-950 font-black text-xs md:text-sm">
                    <span>{prod.discountPrice}</span>
                    <span className="text-[10px] font-normal text-slate-400">تومان</span>
                  </div>
                  
                  <button className="bg-slate-50 text-slate-600 w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs hover:bg-rose-500 hover:text-white transition duration-200 shrink-0">
                    ＋
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
