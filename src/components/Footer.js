"use client";

import React from 'react';
import { ShieldCheck, Truck, RotateCcw, Headphones, Instagram, Send, Phone } from 'lucide-react';

export default function Footer() {
  return (
    // mt-12 در موبایل فاصله را برای جلوگیری از طولانی شدن اسکرول بهینه می‌کند
    <div className="w-full px-4 md:px-8 mb-20 md:mb-8 mt-12 md:mt-20 relative z-10 direction-rtl">
      
      <footer className="w-full bg-slate-950 text-slate-400 pt-8 pb-12 md:py-12 px-5 md:px-10 rounded-[24px] md:rounded-[32px] border border-slate-900 shadow-2xl text-right">
        
        {/* ۱. بخش مزایای کلیدی فروشگاه (۴ کادر مینی‌مال - بهینه‌شده برای موبایل) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 pb-8 md:pb-10 border-b border-slate-900/60">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-slate-900 flex items-center justify-center text-rose-500 shrink-0">
              <ShieldCheck className="w-4.5 h-4.5 md:w-5 md:h-5" />
            </div>
            <div>
              <h4 className="text-xs md:text-sm font-black text-white">ضمانت اصالت</h4>
              <p className="text-[9px] md:text-[10px] text-slate-500 mt-0.5">کالاها اورجینال و شرکتی</p>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-slate-900 flex items-center justify-center text-rose-500 shrink-0">
              <Truck className="w-4.5 h-4.5 md:w-5 md:h-5" />
            </div>
            <div>
              <h4 className="text-xs md:text-sm font-black text-white">ارسال فوق‌سریع</h4>
              <p className="text-[9px] md:text-[10px] text-slate-500 mt-0.5">تحویل اکسپرس کشوری</p>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-slate-900 flex items-center justify-center text-rose-500 shrink-0">
              <RotateCcw className="w-4.5 h-4.5 md:w-5 md:h-5" />
            </div>
            <div>
              <h4 className="text-xs md:text-sm font-black text-white">۷ روز مهلت تست</h4>
              <p className="text-[9px] md:text-[10px] text-slate-500 mt-0.5">ضمانت بازگشت وجه</p>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-slate-900 flex items-center justify-center text-rose-500 shrink-0">
              <Headphones className="w-4.5 h-4.5 md:w-5 md:h-5" />
            </div>
            <div>
              <h4 className="text-xs md:text-sm font-black text-white">پشتیبانی ۲۴ ساعته</h4>
              <p className="text-[9px] md:text-[10px] text-slate-500 mt-0.5">همیشه پاسخگوی شما هستیم</p>
            </div>
          </div>
        </div>

        {/* ۲. بخش ستون‌های ناوبری و لینک‌های سریع */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-10 py-8 md:py-10">
          
          {/* ستون اول: درباره سیب‌شاپ */}
          <div className="md:col-span-1 flex flex-col gap-3">
            <div className="text-lg md:text-xl font-black text-white flex items-center gap-1.5">
              <span>سیب‌<span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600">شاپ</span></span>
            </div>
            <p className="text-[11px] md:text-xs leading-6 font-medium text-slate-400">
              مرجع تخصصی خرید گجت‌های هوشمند، آیفون و مدرن‌ترین لوازم جانبی بازار فناوری. با سیب‌شاپ، اصالت کالا و خدمات درجه‌یک را تجربه کنید.
            </p>
          </div>

          {/* ردیف ترکیبی لینک‌ها برای موبایل (قرارگیری دو ستون در یک ردیف افقی جهت کاهش اسکرول عمودی) */}
          <div className="grid grid-cols-2 md:contents gap-6">
            {/* ستون دوم: دسترسی‌های خرید */}
            <div className="flex flex-col gap-3">
              <h4 className="text-xs md:text-sm font-black text-white border-r-2 border-rose-500 pr-2">راهنمای خرید</h4>
              <ul className="flex flex-col gap-2.5 text-[11px] md:text-xs font-medium">
                <li className="hover:text-white transition cursor-pointer">نحوه ثبت سفارش</li>
                <li className="hover:text-white transition cursor-pointer">رویه‌های بازگرداندن</li>
                <li className="hover:text-white transition cursor-pointer">شیوه‌های پرداخت</li>
                <li className="hover:text-white transition cursor-pointer">پیگیری سفارشات</li>
              </ul>
            </div>

            {/* ستون سوم: لینک‌های شرکتی */}
            <div className="flex flex-col gap-3">
              <h4 className="text-xs md:text-sm font-black text-white border-r-2 border-rose-500 pr-2">همراه با ما</h4>
              <ul className="flex flex-col gap-2.5 text-[11px] md:text-xs font-medium">
                <li className="hover:text-white transition cursor-pointer">درباره ما</li>
                <li className="hover:text-white transition cursor-pointer">تماس با کارشناسان</li>
                <li className="hover:text-white transition cursor-pointer">قوانین و حریم خصوصی</li>
                <li className="hover:text-white transition cursor-pointer">ضمانت طلایی</li>
              </ul>
            </div>
          </div>

          {/* ستون چهارم: خبرنامه و شبکه‌های اجتماعی */}
          <div className="flex flex-col gap-3.5">
            <h4 className="text-xs md:text-sm font-black text-white border-r-2 border-rose-500 pr-2">ارتباط با ما</h4>
            <p className="text-[11px] md:text-xs leading-5 font-medium">از آخرین تخفیف‌ها و کمپین‌های سیب‌شاپ باخبر شوید:</p>
            
            <div className="w-full flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1.5">
              <input 
                type="email" 
                placeholder="ایمیل خود را وارد کنید..." 
                className="bg-transparent text-[11px] w-full px-2 py-1 focus:outline-none text-white text-right placeholder:text-slate-600"
              />
              <button className="bg-rose-500 hover:bg-rose-600 text-white font-black text-[10px] px-3 py-1.5 rounded-lg transition shrink-0">
                عضویت
              </button>
            </div>

            <div className="flex items-center gap-3 mt-1 justify-start">
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
        <div className="w-full pt-5 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between text-[10px] md:text-[11px] font-medium text-slate-500 gap-3 text-center md:text-right">
          <span>© ۱۴۰۵ تمامی حقوق معنوی و مادی این وب‌سایت متعلق به فروشگاه سیب‌شاپ می‌باشد.</span>
          <span className="direction-ltr tracking-wide text-slate-600 text-[9px] md:text-[11px]">Developed with Next.js & Tailwind CSS</span>
        </div>

      </footer>
    </div>
  );
}
