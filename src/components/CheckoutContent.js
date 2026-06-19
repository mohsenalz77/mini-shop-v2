"use client";

import React, { useState } from 'react';
import { useCart } from '../context/CartContext'; // 🚀 بررسی کن که این مسیر دقیقاً درست باشد
import { ShoppingBag, CreditCard, ShieldCheck, MapPin, ChevronLeft, Wallet } from 'lucide-react';

export default function CheckoutContent() {
  // 🔐 امن‌سازی هوک سبد خرید برای جلوگیری از کرش و ارور Is Not A Function
  const context = useCart();
  const cartItems = context?.cartItems || [];
  const getCartTotal = context?.getCartTotal ? context.getCartTotal : () => 0;

  const [paymentMethod, setPaymentMethod] = useState('online');

  const userAddress = {
    name: "محسن عزیز",
    phone: "09123456789",
    address: "تهران، خیابان آزادی، کوچه درخشان، پلاک ۱۲، واحد ۳"
  };

  const shippingCost = 45000;
  const finalTotal = getCartTotal() + shippingCost;

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert('سبد خرید شما خالی است!');
      return;
    }
    alert(`درخواست پرداخت به مبلغ ${finalTotal.toLocaleString('fa-IR')} تومان صادر شد.`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start text-right">
      {/* ستون سمت راست */}
      <div className="lg:col-span-8 flex flex-col gap-4 w-full">
        
        {/* باکس آدرس */}
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

        {/* باکس شیوه پرداخت */}
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
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition ${paymentMethod === 'online' ? 'border-rose-500' : 'border-slate-300'}`}>
                  {paymentMethod === 'online' && <div className="w-2.5 h-2.5 bg-rose-500 rounded-full"></div>}
                </div>
                <div>
                  <span className="text-xs font-black text-slate-800 block">پرداخت آنلاین اینترنتی</span>
                  <span className="text-[10px] text-slate-400 font-medium mt-0.5 block">با تمامی کارت‌های عضو شتاب</span>
                </div>
              </div>
              <Wallet className="w-5 h-5 text-slate-400" />
            </label>

            <label 
              onClick={() => setPaymentMethod('wallet')}
              className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition ${paymentMethod === 'wallet' ? 'border-rose-500 bg-rose-50/20' : 'border-slate-100 bg-slate-50/50 hover:bg-slate-50'}`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition ${paymentMethod === 'wallet' ? 'border-rose-500' : 'border-slate-300'}`}>
                  {paymentMethod === 'wallet' && <div className="w-2.5 h-2.5 bg-rose-500 rounded-full"></div>}
                </div>
                <div>
                  <span className="text-xs font-black text-slate-800 block">پرداخت از کیف پول</span>
                  <span className="text-[10px] text-slate-400 font-medium mt-0.5 block">موجودی: ۰ تومان</span>
                </div>
              </div>
              <Wallet className="w-5 h-5 text-slate-400" />
            </label>
          </div>
        </section>

        {/* لیست محصولات فاکتور */}
        <section className="bg-white border border-slate-100 rounded-3xl p-5 shadow-3xs">
          <h3 className="text-xs font-black text-slate-800 mb-4 flex items-center gap-1.5">
            <ShoppingBag className="w-4 h-4 text-slate-400" />
            <span>مرور کالاهای مرسوله ({cartItems.length} کالا)</span>
          </h3>
          
          <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-none flex-row-reverse text-right">
            {cartItems.map((item) => (
              <div key={item.id} className="w-20 shrink-0 bg-slate-50 border border-slate-100 p-2 rounded-2xl relative flex items-center justify-center h-20">
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.name} className="max-h-14 object-contain select-none" />
                ) : (
                  <span className="text-xl">📱</span>
                )}
                <span className="absolute bottom-1 left-1 bg-slate-800 text-white text-[9px] font-sans font-black w-4.5 h-4.5 rounded-lg flex items-center justify-center border border-white">
                  {item.quantity}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ستون سمت چپ: قیمت کل */}
      <aside className="lg:col-span-4 bg-white border border-slate-100 rounded-3xl p-5 shadow-3xs w-full sticky top-24">
        <h4 className="text-xs font-black text-slate-800 mb-4 border-b border-slate-50 pb-3">
          صورت‌حساب مالی سفارش
        </h4>
        
        <div className="flex flex-col gap-3 pb-4 border-b border-slate-100">
          <div className="flex items-center justify-between w-full">
            <span className="text-[11px] text-slate-400 font-bold">قیمت کالاها ({cartItems.length}):</span>
            <div className="text-xs font-black text-slate-800 flex items-center gap-0.5">
              <span>{getCartTotal().toLocaleString('fa-IR')}</span>
              <span className="text-[10px] font-normal text-slate-400 mr-0.5">تومان</span>
            </div>
          </div>

          <div className="flex items-center justify-between w-full">
            <span className="text-[11px] text-slate-400 font-bold">هزینه ارسال:</span>
            <div className="text-xs font-black text-slate-800 flex items-center gap-0.5">
              <span>{shippingCost.toLocaleString('fa-IR')}</span>
              <span className="text-[10px] font-normal text-slate-400 mr-0.5">تومان</span>
            </div>
          </div>
        </div>

        <div className="my-4 flex items-center justify-between w-full">
          <span className="text-xs font-black text-slate-800">مبلغ قابل پرداخت:</span>
          <div className="text-base md:text-lg font-black text-rose-500 flex items-center gap-0.5">
            <span>{finalTotal.toLocaleString('fa-IR')}</span>
            <span className="text-[10px] font-normal text-slate-400 mr-0.5">تومان</span>
          </div>
        </div>

        <button 
          onClick={handlePaymentSubmit}
          className="w-full bg-rose-500 hover:bg-rose-600 text-white font-black text-xs md:text-sm py-3.5 rounded-2xl shadow-md transition duration-300 flex items-center justify-center gap-2"
        >
          <ShieldCheck className="w-4 h-4" />
          <span>تایید و پرداخت نهایی فاکتور</span>
        </button>
      </aside>
    </div>
  );
}
