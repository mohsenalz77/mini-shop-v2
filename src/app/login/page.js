"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Smartphone, Lock, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(1); // ۱ برای شماره تلفن، ۲ برای رمز عبور

  const handleNextStep = (e) => {
    e.preventDefault();
    if (phoneNumber.length >= 10) {
      setStep(2);
    } else {
      alert('لطفاً شماره موبایل معتبر وارد کنید.');
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    alert('درخواست ورود فرستاده شد!');
  };

  return (
    /* 🎨 تغییر انقلابی رنگ بک‌گراند به مشکی لوکس پرمیوم متمایل به سرمه‌ای تیره */
    <div className="min-h-screen bg-gradient-to-tr from-[#060913] via-[#0f1424] to-[#090d19] flex items-center justify-center relative overflow-hidden px-4 direction-rtl antialiased">
      
      {/* هاله‌های نوری آمبیانس پشت صحنه (حالا با این رنگ جدید درخشش بسیار رویایی‌تری دارند) */}
      <div className="absolute top-[-5%] right-[-5%] w-[450px] h-[450px] bg-rose-500/[0.08] blur-[140px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-5%] left-[-5%] w-[450px] h-[450px] bg-pink-500/[0.08] blur-[140px] rounded-full pointer-events-none"></div>

      {/* باکس شیشه‌ای فرم ورود */}
      <div className="w-full max-w-md bg-white/[0.02] backdrop-blur-2xl border border-white/[0.06] p-6 md:p-8 rounded-3xl shadow-[0_32px_64px_rgba(0,0,0,0.4)] relative z-10 text-right">
        
        {/* لوگو و سربرگ */}
        <div className="flex flex-col items-center text-center mb-8">
          <Link href="/" className="flex items-center gap-1.5 mb-3 group">
            <span className="text-2xl select-none filter drop-shadow-sm group-hover:scale-110 transition duration-300">📱</span>
            <span className="text-xl font-black text-white tracking-tight">
              سیب‌<span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-500">شاپ</span>
            </span>
          </Link>
          <h2 className="text-xs font-black text-slate-200 mt-1">به کلوپ سیب‌شاپ خوش آمدید</h2>
          <p className="text-[11px] text-slate-500 font-medium mt-1">جهت ثبت سفارش یا پیگیری خرید، وارد حساب خود شوید</p>
        </div>

        {step === 1 ? (
          /* مرحله اول: ورود شماره موبایل */
          <form onSubmit={handleNextStep} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-black text-slate-400 mr-1">شماره موبایل</label>
              <div className="w-full flex items-center bg-white/[0.02] border border-white/[0.08] rounded-2xl p-3 focus-within:border-rose-500/40 focus-within:bg-white/[0.04] transition duration-200">
                <Smartphone className="w-4 h-4 text-slate-500 ml-2 shrink-0" />
                <input 
                  type="tel" 
                  maxLength={11}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="مثال: ۰۹۱۲۳۴۵۶۷۸۹" 
                  className="bg-transparent text-xs w-full focus:outline-none text-white text-left font-sans font-bold placeholder:text-slate-600"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-black text-xs py-4 rounded-2xl shadow-lg shadow-rose-500/20 transition duration-300 flex items-center justify-center gap-1.5 mt-2 active:scale-98"
            >
              <span>ادامه فرآیند</span>
              <ArrowRight className="w-4 h-4 rotate-180" />
            </button>
          </form>
        ) : (
          /* مرحله دوم: ورود رمز عبور */
          <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between px-1">
                <label className="text-[11px] font-black text-slate-400">رمز عبور حساب</label>
                <button type="button" onClick={() => setStep(1)} className="text-[10px] font-black text-rose-400 hover:underline">تغییر شماره</button>
              </div>
              <div className="w-full flex items-center bg-white/[0.02] border border-white/[0.08] rounded-2xl p-3 focus-within:border-rose-500/40 focus-within:bg-white/[0.04] transition duration-200">
                <Lock className="w-4 h-4 text-slate-500 ml-2 shrink-0" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="bg-transparent text-xs w-full focus:outline-none text-white text-left font-sans font-bold placeholder:text-slate-600"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-black text-xs py-4 rounded-2xl shadow-lg shadow-rose-500/20 transition duration-300 flex items-center justify-center gap-1.5 mt-2 active:scale-98"
            >
              <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300" />
              <span>تایید و ورود به سایت</span>
            </button>
          </form>
        )}

        {/* پانویس فرم امنیتی */}
        <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-center gap-1.5 text-[10px] text-slate-600 font-bold">
          <ShieldCheck className="w-4 h-4 text-slate-600" />
          <span>حفاظت امنیتی دو مرحله‌ای پروتکل سیب‌شاپ</span>
        </div>

      </div>
    </div>
  );
}
