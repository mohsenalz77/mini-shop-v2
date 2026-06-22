"use client";

import React from 'react';
import dynamic from 'next/dynamic'; 
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { ChevronLeft } from 'lucide-react';

// لود داینامیک از آدرس کامپوننت جدید
const DynamicCheckoutContent = dynamic(() => import('../../components/CheckoutContent'), {
  ssr: false,
  loading: () => <div className="w-full text-center py-20 text-xs font-bold text-slate-400">در حال دریافت فاکتور امن...</div>
});

export default function CheckoutPage() {
  
  /**
   * 🚀 تابع جادویی کسر خودکار از انبار استراپی (باید این را به بخش پرداخت نهایی هندلر پاس بدهی)
   * @param {Array} cartItems - آرایه محصولات موجود در سبد خرید از Context
   */
  const handleReduceStockAfterPayment = async (cartItems) => {
    try {
      // اجرای همزمان تمامی درخواست‌های PUT برای بالا بردن سرعت عملیات (Promise.all)
      const updatePromises = cartItems.map(async (item) => {
        const currentStock = item.stock !== undefined ? Number(item.stock) : 0;
        const purchaseQuantity = Number(item.quantity);
        const newStock = Math.max(0, currentStock - purchaseQuantity); // جلوگیری از منفی شدن انبار تحت هر شرایطی

        const response = await fetch(`https://b.dr-sib.xyz/api/products/${item.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            // اگر استراپی شما نیاز به توکن برای ویرایش دارد، آن را اینجا باز کنید:
            // 'Authorization': `Bearer ${localStorage.getItem('sibshop_token')}`
          },
          body: JSON.stringify({
            data: {
              stock: newStock
            }
          })
        });

        if (!response.ok) {
          throw new Error(`خطا در به‌روزرسانی انبار محصول با آی‌دی ${item.id}`);
        }
        
        return response.json();
      });

      await Promise.all(updatePromises);
      console.log("انبارداری سیب‌شاپ با موفقیت به‌روزرسانی و کالاها کسر شدند. 📦");
      return true;
    } catch (error) {
      console.error("مشکل در کسر اتوماتیک موجودی انبار استراپی:", error);
      return false;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 direction-rtl antialiased flex flex-col justify-between">
      <Header />

      {/* بدنه عریض آزاد هماهنگ با هیرو باکس */}
      <main className="w-full px-4 md:px-8 py-4 md:py-6 flex-1">
        <div className="bg-white border border-slate-100 rounded-2xl p-4 mb-4 flex items-center justify-center gap-4 md:gap-8 shadow-3xs text-center">
          <span className="text-[11px] md:text-xs font-bold text-slate-400">۱. سبد خرید</span>
          <ChevronLeft className="w-3 h-3 text-slate-300" />
          <span className="text-[11px] md:text-xs font-black text-rose-500 bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-100">۲. زمان و آدرس ارسال</span>
          <ChevronLeft className="w-3 h-3 text-slate-300" />
          <span className="text-[11px] md:text-xs font-bold text-slate-400">۳. پرداخت نهایی</span>
        </div>

        {/* 💡 پروپز مجهز شده را به کامپوننت داخلی پاس می‌دهیم تا در زمان دکمه پرداخت نهایی فعالش کند */}
        <DynamicCheckoutContent onPaymentSuccess={handleReduceStockAfterPayment} />
      </main>

      <Footer />
    </div>
  );
}
