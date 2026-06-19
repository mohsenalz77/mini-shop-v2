"use client";

import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { User, MapPin, ShoppingBag, Truck, CheckCircle, XCircle, CreditCard, LogOut, ChevronLeft } from 'lucide-react';

export default function ProfilePage() {
  // دیتای فرضی کاربر که بعداً از استراپی یا اورث خوانده می‌شود
  const [user, setUser] = useState({
    name: "محسن عزیز",
    phone: "09123456789",
    address: "تهران، خیابان آزادی، کوچه درخشان، پلاک ۱۲، واحد ۳",
    postalCode: "1234567890"
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 direction-rtl antialiased flex flex-col justify-between">
      <Header />

      {/* 🏪 بدنه اصلی پروفایل (هماهنگ با عرض کادرهای هیرو و فروشگاه) */}
      <main className="w-full max-w-[1450px] mx-auto px-4 md:px-8 py-6 md:py-10 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* 🔹 منوی سمت راست پروفایل (سایدبار دسکتاپ / منوی بالایی موبایل) */}
          <aside className="lg:col-span-3 bg-white border border-slate-100 rounded-3xl p-5 shadow-3xs text-right">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100 mb-4">
              <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 font-black text-xl border border-rose-100">
                📱
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-800">{user.name}</h3>
                <p className="text-[11px] text-slate-400 font-sans font-bold mt-0.5">{user.phone}</p>
              </div>
            </div>

            {/* گزینه‌های منو */}
            <nav className="flex flex-col gap-1">
              <button className="w-full flex items-center justify-between px-3 py-3 rounded-xl bg-rose-50 text-rose-600 font-black text-xs transition">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>داشبورد کاربری</span>
                </div>
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>

              <button className="w-full flex items-center justify-between px-3 py-3 rounded-xl text-slate-600 hover:bg-slate-50 font-bold text-xs transition">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span>نشانی‌ها و آدرس</span>
                </div>
                <ChevronLeft className="w-3.5 h-3.5 text-slate-300" />
              </button>

              <button className="w-full flex items-center justify-between px-3 py-3 rounded-xl text-slate-600 hover:bg-slate-50 font-bold text-xs transition border-t border-slate-50 mt-2 text-rose-500">
                <div className="flex items-center gap-2">
                  <LogOut className="w-4 h-4" />
                  <span>خروج از حساب</span>
                </div>
              </button>
            </nav>
          </aside>

          {/* 🔹 محتوای سمت چپ پروفایل */}
          <div className="lg:col-span-9 w-full flex flex-col gap-6">
            
            {/* باکس وضعیت سفارش‌ها (دیجی‌کالایی) */}
            <section className="bg-white border border-slate-100 rounded-3xl p-5 shadow-3xs text-right">
              <h4 className="text-xs font-black text-slate-800 mb-4 flex items-center gap-1.5">
                <ShoppingBag className="w-4 h-4 text-slate-500" />
                <span>خلاصه سفارش‌های شما</span>
              </h4>
              
              <div className="grid grid-cols-3 gap-2 md:gap-4">
                <div className="bg-slate-50/60 border border-slate-100 p-3 rounded-2xl flex flex-col items-center justify-center text-center">
                  <Truck className="w-5 h-5 md:w-6 md:h-6 text-amber-500" />
                  <span className="text-[10px] md:text-xs font-black text-slate-700 mt-2">جاری / در حال ارسال</span>
                  <span className="text-xs md:text-sm font-sans font-black text-slate-900 mt-1">۰</span>
                </div>

                <div className="bg-slate-50/60 border border-slate-100 p-3 rounded-2xl flex flex-col items-center justify-center text-center">
                  <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-emerald-500" />
                  <span className="text-[10px] md:text-xs font-black text-slate-700 mt-2">تحویل شده</span>
                  <span className="text-xs md:text-sm font-sans font-black text-slate-900 mt-1">۰</span>
                </div>

                <div className="bg-slate-50/60 border border-slate-100 p-3 rounded-2xl flex flex-col items-center justify-center text-center">
                  <XCircle className="w-5 h-5 md:w-6 md:h-6 text-rose-500" />
                  <span className="text-[10px] md:text-xs font-black text-slate-700 mt-2">مرجوعی یا لغو شده</span>
                  <span className="text-xs md:text-sm font-sans font-black text-slate-900 mt-1">۰</span>
                </div>
              </div>
            </section>

            {/* باکس اطلاعات حساب و نشانی ارسال */}
            <section className="bg-white border border-slate-100 rounded-3xl p-5 shadow-3xs text-right">
              <h4 className="text-xs font-black text-slate-800 mb-4 border-b border-slate-50 pb-3">
                اطلاعات تحویل سفارش
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <span className="text-[11px] font-bold text-slate-400 mr-1">گیرنده سفارش</span>
                  <div className="bg-slate-50/80 px-4 py-3 rounded-xl border border-slate-100 text-xs font-black text-slate-700">
                    {user.name}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <span className="text-[11px] font-bold text-slate-400 mr-1">شماره تماس اضطراری</span>
                  <div className="bg-slate-50/80 px-4 py-3 rounded-xl border border-slate-100 text-xs font-bold font-sans text-slate-700 text-left direction-ltr">
                    {user.phone}
                  </div>
                </div>

                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <span className="text-[11px] font-bold text-slate-400 mr-1">نشانی دقیق پستی جهت ارسال کالا</span>
                  <div className="bg-slate-50/80 px-4 py-3 rounded-xl border border-slate-100 text-xs font-bold text-slate-700 leading-6">
                    {user.address}
                  </div>
                </div>
              </div>
            </section>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
