"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Smartphone, ShieldCheck, MessageSquareCode, ArrowRight, X } from 'lucide-react';

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [step, setStep] = useState(1); // ۱ برای شماره موبایل، ۲ برای کد پیامک
  const [isLoading, setIsLoading] = useState(false);

  // 🚀 مرحله اول: ارسال شماره موبایل به شبیه‌ساز استراپی
  const handleNextStep = async (e) => {
    e.preventDefault();
    if (phoneNumber.length === 11 && phoneNumber.startsWith('09')) {
      setIsLoading(true);
      try {
        const res = await fetch('https://b.dr-sib.xyz/api/auth/send-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone: phoneNumber }),
        });

        const data = await res.json();

        if (res.ok) {
          // فیکسِ الرت برای این مرحله جهت نمایش درست پیام متنی
          const msg = data.message || 'کد تایید ارسال شد.';
          alert(`${msg}\nکد دمو (جهت تست): ${data.demoCode}`);
          setStep(2);
        } else {
          let errorText = 'خطایی در ارسال کد رخ داد.';
          if (data.error && data.error.message) errorText = data.error.message;
          else if (data.message) errorText = data.message;
          alert(errorText);
        }
      } catch (error) {
        console.error("OTP Error:", error);
        alert('ارتباط با سرور برقرار نشد.');
      } finally {
        setIsLoading(false);
      }
    } else {
      alert('لطفاً یک شماره موبایل معتبر ۱۱ رقمی (مثال: ۰۹۱۲۳۴۵۶۷۸۹) وارد کنید.');
    }
  };

  // 🚀 مرحله دوم: تایید کد، هندل آبجکت‌های خطا، ذخیره دیتای کاربر و ریدایرکت
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (verificationCode.length === 5) {
      setIsLoading(true);
      try {
        const res = await fetch('https://b.dr-sib.xyz/api/auth/verify-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone: phoneNumber, code: verificationCode }),
        });

        const data = await res.json();

        if (res.ok) {
          // 🚀 فیکس شد: تبدیل هر نوع ریسپانس ساختاریافته به متن ساده برای الرت بدون لود [object Object]
          const successMessage = data.message && typeof data.message === 'string' ? data.message : 'ورود با موفقیت انجام شد!';
          alert(successMessage);
          
          // 🔑 ذخیره توکن JWT و اطلاعات کاربر در حافظه مرورگر برای استفاده در هدر و پروفایل
          localStorage.setItem('sibshop_token', data.token);
          localStorage.setItem('sibshop_user', JSON.stringify(data.user));
          
          // 🚀 بازگشت اتوماتیک و آنی به صفحه اصلی سایت
          window.location.href = '/';
        } else {
          // 🚀 فیکس شد: کالبدشکافی عمیق ارورهای استراپی برای استخراج متن واقعی خطا
          let errorMessage = 'کد وارد شده اشتباه است.';
          if (data.error && typeof data.error === 'string') errorMessage = data.error;
          else if (data.error && data.error.message) errorMessage = data.error.message;
          else if (data.message && typeof data.message === 'string') errorMessage = data.message;
          
          alert(errorMessage);
        }
      } catch (error) {
        console.error("Verify Error:", error);
        alert('خطا در تایید کد.');
      } finally {
        setIsLoading(false);
      }
    } else {
      alert('لطفاً کد تایید ۵ رقمی را به طور کامل وارد کنید.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-slate-100 via-slate-50 to-rose-50/40 flex items-center justify-center relative overflow-hidden px-4 md:px-6 direction-rtl antialiased">
      
      {/* هاله‌های نوری پس‌زمینه */}
      <div className="absolute top-[-5%] right-[-5%] w-[450px] h-[450px] bg-rose-400/[0.15] blur-[130px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-5%] left-[-5%] w-[450px] h-[450px] bg-pink-300/[0.12] blur-[130px] rounded-full pointer-events-none"></div>

      {/* باکس فرم ورود */}
      <div className="w-full max-w-md bg-white/70 backdrop-blur-2xl border border-white/80 p-5 sm:p-6 md:p-8 rounded-3xl shadow-[0_24px_50px_rgba(0,0,0,0.04)] relative z-10 text-right my-auto">
        
        {/* دکمه خروج و بازگشت */}
        <Link 
          href="/" 
          className="absolute top-4 left-4 md:top-5 md:left-5 text-slate-400 hover:text-slate-800 bg-slate-100/50 hover:bg-slate-200/60 p-1.5 rounded-xl transition-all duration-200 group"
          title="بازگشت به صفحه اصلی"
        >
          <X className="w-4 h-4 transition-transform group-hover:rotate-90 duration-300" />
        </Link>
        
        {/* لوگو و سربرگ */}
        <div className="flex flex-col items-center text-center mb-6 md:mb-8 mt-2">
          <Link href="/" className="flex items-center gap-1.5 mb-2 group">
            <span className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
              سیب‌<span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600">شاپ</span>
            </span>
          </Link>
          <h2 className="text-xs font-black text-slate-800 mt-1">ورود یا ثبت‌نام</h2>
          <p className="text-[10px] md:text-[11px] text-slate-400 font-medium mt-1">سلام! لطفا شماره موبایل خود را وارد کنید</p>
        </div>

        {step === 1 ? (
          /* 📱 مرحله اول: ورود شماره موبایل */
          <form onSubmit={handleNextStep} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-black text-slate-500 mr-1">شماره موبایل</label>
              <div className="w-full flex items-center bg-slate-50/60 border border-slate-200/60 rounded-2xl p-3 focus-within:border-rose-500/40 focus-within:bg-white transition duration-200">
                <Smartphone className="w-4 h-4 text-slate-400 ml-2 shrink-0" />
                <input 
                  type="tel" 
                  maxLength={11}
                  value={phoneNumber}
                  disabled={isLoading}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/[^\d]/g, ''))}
                  placeholder="۰۹۱۲۳۴۵۶۷۸۹" 
                  className="bg-transparent text-base md:text-sm w-full focus:outline-none text-slate-800 text-left font-sans font-bold placeholder:text-slate-300 tracking-wider"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-black text-xs md:text-sm py-3.5 md:py-4 rounded-2xl shadow-md shadow-rose-500/10 transition duration-300 flex items-center justify-center gap-1.5 mt-1 active:scale-98 disabled:opacity-50"
            >
              <span>{isLoading ? 'در حال ارسال...' : 'ورود با کد تایید'}</span>
            </button>
          </form>
        ) : (
          /* ✉️ مرحله دوم: ورود کد تایید پیامکی (SMS) */
          <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between px-1">
                <label className="text-[11px] font-black text-slate-500">کد تایید فرستاده شده</label>
                <button type="button" onClick={() => setStep(1)} className="text-[10px] font-black text-rose-500 hover:underline flex items-center gap-0.5">
                  <ArrowRight className="w-3 h-3" />
                  <span>ویرایش شماره</span>
                </button>
              </div>
              
              <div className="w-full flex items-center bg-slate-50/60 border border-slate-200/60 rounded-2xl p-3 focus-within:border-rose-500/40 focus-within:bg-white transition duration-200">
                <MessageSquareCode className="w-4 h-4 text-slate-400 ml-2 shrink-0" />
                <input 
                  type="text" 
                  maxLength={5}
                  value={verificationCode}
                  disabled={isLoading}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/[^\d]/g, ''))}
                  placeholder="کد ۵ رقمی" 
                  className="bg-transparent text-base md:text-sm w-full focus:outline-none text-slate-800 text-center font-sans font-black placeholder:text-slate-300 tracking-widest"
                />
              </div>
              <p className="text-[10px] text-slate-400 mr-1 mt-0.5">کد تایید برای شماره {phoneNumber} پیامک شد.</p>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-black text-xs md:text-sm py-3.5 md:py-4 rounded-2xl shadow-md shadow-rose-500/10 transition duration-300 flex items-center justify-center gap-1.5 mt-1 active:scale-98 disabled:opacity-50"
            >
              <span>{isLoading ? 'در حال بررسی...' : 'تایید و ورود به سیب‌شاپ'}</span>
            </button>
          </form>
        )}

        {/* پانویس امنیتی */}
        <div className="mt-6 md:mt-8 pt-4 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[9px] md:text-[10px] text-slate-400 font-bold">
          <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
          <span>ورود امن و حفاظت‌شده به حساب کاربری</span>
        </div>

      </div>
    </div>
  );
}
