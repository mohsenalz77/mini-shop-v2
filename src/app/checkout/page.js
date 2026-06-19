"use client";

import React from 'react';
import dynamic from 'next/dynamic'; 
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { ChevronLeft } from 'lucide-react';

// 🚀 لود داینامیک واقعی و ۱۰۰٪ کلاینتی از کامپوننت خارجی بدون تداخل باندل
const DynamicCheckoutContent = dynamic(() => import('../../components/CheckoutContent'), {
  ssr: false,
  loading: () => (
    <div className="w-full text-center py-12 text-xs font-bold text-slate-400">
      در حال آماده‌سازی امن پیش‌فاکتور...
    </div>
  )
});

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 direction-rtl antialiased flex flex-col justify-between">
      <Header />

      <main className="w-full px-4 md:px-8 py-4 md:py-6 flex-1">
        {/* نوار مراحل خرید */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4 mb-4 flex items-center justify-center gap-4 md:gap-8 shadow-3xs text-center">
          <span className="text-[11px] md:text-xs font-bold text-slate-400">۱. سبد خرید</span>
          <ChevronLeft className="w-3 h-3 text-slate-300" />
          <span className="text-[11px] md:text-xs font-black text-rose-500 bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-100">۲. زمان و آدرس ارسال</span>
          <ChevronLeft className="w-3 h-3 text-slate-300" />
          <span className="text-[11px] md:text-xs font-bold text-slate-400">۳. پرداخت نهایی</span>
        </div>

        <DynamicCheckoutContent />
      </main>

      <Footer />
    </div>
  );
}
