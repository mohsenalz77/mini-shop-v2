"use client";

import React from 'react';
import { ShieldCheck, Truck, RotateCcw, Headphones, Instagram, Send, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-slate-950 text-slate-400 pt-16 pb-8 px-4 md:px-8 mt-20 relative z-10 border-t border-slate-900 direction-rtl">
      <div className="max-w-7xl mx-auto">
        
        {/* ۱. بخش مزایای کلیدی فروشگاه (۴ کادر مینی‌مال) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-slate-900 text-right">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-rose-500 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-black text-white">ضمانت اصالت</h4>
              <p className="text-[10px] text-slate-500 mt-0.5">۱۰۰٪ کالاها اورجینال و شرکتی</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-rose-500 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-black text-white">ارسال فوق‌سریع</h4>
              <p className="text-[10px] text-slate-500 mt-0.5">تحویل اکسپرس در کوتاه‌ترین زمان</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-rose-500 shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-black text-white">۷ روز مهلت تست</h4>
              <p className="text-[10px] text-slate-500 mt-0.5">تضمین بازگشت وجه بی‌قیدوشرط</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-rose-500 shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-black text-white">پشتیبانی ۲۴ ساعته</h4>
              <p className="text-[10px] text-slate-500 mt-0.5">همیشه و همه جا پاسخگوی شما هستیم</p>
            </div>
          </div>
        </div>

        {/* ۲. بخش ستون‌های ناوبری و لینک‌های سریع */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 py-12 text-right">
          
          {/* ستون اول: درباره سیب‌شاپ */}
          <div className="md:col-span-1 flex flex-col gap-4">
            <div className="text-xl font-black text-white flex items-center gap-1.5">
              <span>سیب‌<span className="text-rose-500">شاپ</span></span>
            </div>
            <p className="text-xs leading-6 font-medium text-slate-400">
              مرجع تخصصی خرید گجت‌های هوشمند، آیفون و مدرن‌ترین لوازم جانبی بازار فناوری. با سیب‌شاپ، اصالت کالا و خدمات درجه‌یک را تجربه کنید.
            </p>
          </div>

          {/* ستون دوم: دسترسی‌های خرید */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-black text-white border-r-2 border-rose-500 pr-2">راهنمای خرید</h4>
            <ul className="flex flex-col gap-2.5 text-xs font-medium">
              <li className="hover:text-white transition cursor-pointer">نحوه ثبت سفارش</li>
              <li className="hover:text-white transition cursor-pointer">رویه‌های بازگرداندن کالا</li>
              <li className="hover:text-white transition cursor-pointer">شیوه‌های پرداخت آنلاین</li>
              <li className="hover:text-white transition cursor-pointer">پیگیری سفارشات ارسالی</li>
            </ul>
          </div>

          {/* ستون سوم: لینک‌های شرکتی */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-black text-white border-r-2 border-rose-500 pr-2">همراه با سیب‌شاپ</h4>
            <ul className="flex flex-col gap-2.5 text-xs font-medium">
              <li className="hover:text-white transition cursor-pointer">درباره ما</li>
              <li className="hover:text-white transition cursor-pointer">تماس با کارشناسان</li>
              <li className="hover:text-white transition cursor-pointer">قوانین و حریم خصوصی</li>
              <li className="hover:text-white transition cursor-pointer">ضمانت طلایی محصولات</li>
            </ul>
          </div>

          {/* ستون چهارم: خبرنامه و شبکه‌های اجتماعی */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-black text-white border-r-2 border-rose-500 pr-2">ارتباط با ما</h4>
            <p className="text-xs leading-5 font-medium">از آخرین تخفیف‌ها و کمپین‌های سیب‌شاپ باخبر شوید:</p>
            
            {/* اینپوت عضویت */}
            <div className="w-full flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1">
              <input 
                type="email" 
                placeholder="ایمیل خود را وارد کنید..." 
                className="bg-transparent text-xs w-full px-3 py-1.5 focus:outline-none text-white text-right"
              />
              <button className="bg-rose-500 hover:bg-rose-600 text-white font-black text-[10px] px-3 py-1.5 rounded-lg transition shrink-0">
                عضویت
              </button>
            </div>

            {/* آیکون شبکه‌های اجتماعی */}
            <div className="flex items-center gap-3 mt-2">
              <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800/80 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition cursor-pointer">
                <Instagram className="w-4 h-4" />
              </div>
              <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800/80 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition cursor-pointer">
                <Send className="w-4 h-4" />
              </div>
              <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800/80 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition cursor-pointer">
                <Phone className="w-4 h-4" />
              </div>
            </div>
          </div>

        </div>

        {/* ۳. بخش انتهایی: کپی‌رایت کانون دیجیتال */}
        <div className="w-full pt-6 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between text-[11px] font-medium text-slate-600 gap-4">
          <span>© ۱۴۰۵ تمامی حقوق معنوی و مادی این وب‌سایت متعلق به فروشگاه سیب‌شاپ می‌باشد.</span>
          <span className="direction-ltr tracking-wide text-slate-700">Developed with Next.js & Tailwind CSS</span>
        </div>

      </div>
    </footer>
  );
}
