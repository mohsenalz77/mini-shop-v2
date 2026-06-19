"use client";

import React, { useState } from 'react';
import { useCart } from '../context/CartContext'; 
import { ShoppingBag, CreditCard, ShieldCheck, MapPin, Wallet } from 'lucide-react';

export default function CheckoutContent() {
  const context = useCart();
  const cartItems = context?.cartItems || [];

  const [paymentMethod, setPaymentMethod] = useState('online');

  const userAddress = {
    name: "محسن عزیز",
    phone: "09123456789",
    address: "تهران، خیابان آزادی، کوچه درخشان، پلاک ۱۲، واحد ۳"
  };

  const shippingCost = 45000;

  // 🚀 فرمول مستقیم و دقیق محاسبه قیمت کل (عینا مشابه منطق تست‌شده سبد خرید شما)
  const cartTotalPrice = cartItems.reduce((total, item) => total + (Number(item.price) * item.quantity), 0);
  
  // 🚀 محاسبه تعداد کل گجت‌های موجود در مرسوله به صورت کاملاً دقیق
  const totalItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const finalTotal = cartTotalPrice + shippingCost;

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert('سبد خرید شما خالی است!');
      return;
    }
    alert(`درخواست پرداخت به مبلغ ${finalTotal.toLocaleString('fa-IR')} تومان از طریق درگاه بانکی صادر شد.`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5 items-start text-right">
      
      {/* 🔹 ستون سمت راست: جزئیات آدرس، کالاها و شیوه پرداخت */}
      <div className="lg:col-span-8 flex flex-col gap-5 w-full">
        
        {/* ۱. باکس آدرس تحویل سفارش */}
        <section className="bg-white border border-slate-100 rounded-3xl p-5 shadow-3xs">
          <h3 className="text-xs font-black text-slate-800 mb-4 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-slate-400" />
            <span>آدرس تحویل سفارش</span>
          </h3>
          <div className="bg-slate-50/70 p-4 rounded-2xl border border-slate-100">
            <p className="text-xs font-bold text-slate-700 leading-6">{userAddress.address}</p>
            <div className="flex flex-wrap gap-4 mt-3 pt-3 border-t border-slate-200/40 text-[11px] font-black text-slate-400">
              <span>گیرنده: {userAddress.name}</span>
              <span>تلفن: {userAddress.phone}</span>
            </div>
          </div>
        </section>

        {/* ۲. باکس شیوه پرداخت کالا */}
        <section className="bg-white border border-slate-100 rounded-3xl p-5 shadow-3xs">
          <h3 className="text-xs font-black text-slate-800 mb-4 flex items-center gap-1.5">
            <CreditCard className="w-4 h-4 text-slate-400" />
            <span>انتخاب شیوه پرداخت</span>
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label 
              onClick={() => setPaymentMethod('online')}
              className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition ${paymentMethod === 'online' ? 'border-rose-500 bg-rose-50/20' : 'border-slate-100 bg-slate-50/50 hover:bg-slate-50'}`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition ${paymentMethod === 'online' ? 'border-rose-500' : 'border-slate-300'}`}>
                  {paymentMethod === 'online' && <div className="w-2 h-2 bg-rose-500 rounded-full"></div>}
                </div>
                <div>
                  <span className="text-xs font-black text-slate-800 block">پرداخت آنلاین اینترنتی</span>
                  <span className="text-[10px] text-slate-400 font-medium mt-0.5 block">با تمامی کارت‌های عضو شتاب</span>
                </div>
              </div>
              <Wallet className="w-4 h-4 text-slate-400" />
            </label>

            <label 
              onClick={() => setPaymentMethod('wallet')}
              className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition ${paymentMethod === 'wallet' ? 'border-rose-500 bg-rose-50/20' : 'border-slate-100 bg-slate-50/50 hover:bg-slate-50'}`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition ${paymentMethod === 'wallet' ? 'border-rose-500' : 'border-slate-300'}`}>
                  {paymentMethod === 'wallet' && <div className="w-2 h-2 bg-rose-500 rounded-full"></div>}
                </div>
                <div>
                  <span className="text-xs font-black text-slate-800 block">پرداخت از کیف پول</span>
                  <span className="text-[10px] text-slate-400 font-medium mt-0.5 block">موجودی: ۰ تومان</span>
                </div>
              </div>
              <Wallet className="w-4 h-4 text-slate-400" />
            </label>
          </div>
        </section>

        {/* ۳. لیست خلاصه اقلام مرسوله */}
        <section className="bg-white border border-slate-100 rounded-3xl p-5 shadow-3xs">
          <h3 className="text-xs font-black text-slate-800 mb-4 flex items-center gap-1.5">
            <ShoppingBag className="w-4 h-4 text-slate-400" />
            <span>مرور کالاهای مرسوله ({totalItemsCount.toLocaleString('fa-IR')} کالا)</span>
          </h3>
          
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none text-right flex-row-reverse justify-end">
            {cartItems.map((item) => (
              <div key={item.id} className="w-16 h-16 bg-slate-50 border border-slate-100 p-2 rounded-xl relative flex items-center justify-center shrink-0">
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.name} className="max-h-12 object-contain select-none" />
                ) : (
                  <span className="text-xl">📱</span>
                )}
                <span className="absolute bottom-1 left-1 bg-slate-800 text-white text-[9px] font-sans font-black w-4 h-4 rounded-md flex items-center justify-center border border-white">
                  {item.quantity}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* 🔹 ستون سمت چپ: پیش‌فاکتور مالی دارک */}
      <aside className="lg:col-span-4 bg-slate-900 border border-slate-950 text-white rounded-3xl p-5 flex flex-col justify-between min-h-[360px] md:min-h-[400px] shadow-xl relative overflow-hidden w-full lg:sticky lg:top-24">
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-rose-500/10 blur-2xl rounded-full pointer-events-none"></div>
        
        <div className="w-full flex flex-col gap-3.5 z-10">
          <h3 className="text-[11px] font-black text-slate-400 border-b border-white/5 pb-2.5">خلاصه فاکتور خرید</h3>
          
          <div className="flex items-center justify-between text-xs font-bold text-slate-300">
            <span>قیمت کالاها ({totalItemsCount.toLocaleString('fa-IR')})</span>
            <div className="flex items-center gap-0.5">
              <span>{cartTotalPrice.toLocaleString('fa-IR')}</span>
              <span className="text-[9px] font-normal text-slate-400">تومان</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs font-bold text-slate-300 border-b border-white/5 pb-3">
            <span>هزینه ارسال (اکسپرس)</span>
            <div className="flex items-center gap-0.5">
              <span>{shippingCost.toLocaleString('fa-IR')}</span>
              <span className="text-[9px] font-normal text-slate-400">تومان</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs md:text-sm font-black text-white pt-2">
            <span>مبلغ قابل پرداخت:</span>
            <div className="flex items-center gap-0.5 text-sm md:text-lg text-rose-400">
              <span>{finalTotal.toLocaleString('fa-IR')}</span>
              <span className="text-[10px] font-normal text-slate-400">تومان</span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 z-10">
          <button 
            onClick={handlePaymentSubmit}
            className="w-full bg-rose-500 hover:bg-rose-600 text-white font-black text-xs md:text-sm py-3.5 rounded-2xl shadow-lg shadow-rose-500/10 transition-all duration-300 flex items-center justify-center gap-2 group active:scale-98"
          >
            <CreditCard className="w-4 h-4" />
            <span>تایید و پرداخت نهایی</span>
          </button>
          
          <div className="flex items-center justify-center gap-1.5 text-[9px] md:text-[10px] text-slate-500 font-bold mt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
            <span>پرداخت امن با ضمانت طلایی سیب‌شاپ</span>
          </div>
        </div>
      </aside>

    </div>
  );
}
