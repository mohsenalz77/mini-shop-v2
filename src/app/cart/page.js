"use client";

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Trash2, Plus, Minus, ShoppingBag, CreditCard, ShieldCheck } from 'lucide-react';

// دیتای ماک موقت برای نمایش ظاهر سبد خرید
const initialCartItems = [
  {
    id: 1,
    name: 'گوشی موبایل اپل مدل iPhone 15 Pro Max دو سیم‌کارت - ظرفیت ۲۵۶ گیگابایت',
    color: 'تایتانیم طبیعی',
    price: 67400000,
    image: '📱',
    quantity: 1
  },
  {
    id: 2,
    name: 'ایرپاد پرو نسل ۲ مدل Type-C اورجینال',
    color: 'سفید',
    price: 9600000,
    image: '🎧',
    quantity: 2
  }
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);

  // توابع موقت برای مدیریت تعداد در فرانت
  const updateQuantity = (id, type) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = type === 'plus' ? item.quantity + 1 : item.quantity - 1;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  // محاسبات فاکتور
  const totalCartPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const formattedPrice = (num) => num.toLocaleString('fa-IR');

  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden antialiased direction-rtl">
      <Header />

      <main className="max-w-[1400px] mx-auto px-4 md:px-8 pt-20 pb-16 relative z-10">
        
        {/* عنوان صفحه */}
        <div className="flex items-center gap-2 mb-8 text-right">
          <div className="w-2 h-6 bg-rose-500 rounded-full"></div>
          <h1 className="text-xl md:text-2xl font-black text-slate-900">سبد خرید شما</h1>
          <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md mr-1">
            {cartItems.length} کالا
          </span>
        </div>

        {cartItems.length === 0 ? (
          /* وضعیت سبد خرید خالی */
          <div className="w-full bg-white border border-slate-100 rounded-[32px] p-12 text-center flex flex-col items-center justify-center shadow-xs">
            <span className="text-6xl mb-4">🛒</span>
            <h2 className="text-base font-black text-slate-800 mb-2">سبد خرید شما فعلاً خالی است!</h2>
            <p className="text-xs text-slate-400 font-medium mb-6">می‌توانید برای مشاهده محصولات به صفحه اصلی بازگردید.</p>
            <a href="/" className="bg-rose-500 hover:bg-rose-600 text-white font-black text-xs px-6 py-3 rounded-xl shadow-md transition">
              بازگشت به فروشگاه
            </a>
          </div>
        ) : (
          /* لایوت دو ستونه اصلی */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* ستون راست: لیست کالاهای موجود در سبد (۸ ستون) */}
            <div className="lg:col-span-8 flex flex-col gap-4">
              {cartItems.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-white border border-slate-100 rounded-[24px] p-4 md:p-6 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4 text-right relative overflow-hidden"
                >
                  {/* بخش تصویر و عنوان کالا */}
                  <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-4xl md:text-5xl shrink-0 select-none">
                      {item.image}
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <h3 className="text-xs md:text-sm font-black text-slate-900 leading-6 max-w-md">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-slate-400 border border-white shadow-xs"></span>
                        <span className="text-[11px] font-bold text-slate-500">رنگ: {item.color}</span>
                      </div>
                    </div>
                  </div>

                  {/* بخش کنترل تعداد و قیمت نهایی */}
                  <div className="flex items-center justify-between md:justify-end gap-8 w-full md:w-auto border-t md:border-t-0 pt-3 md:pt-0 border-slate-50">
                    
                    {/* ردیف پلاس و ماینس کپسولی */}
                    <div className="flex items-center bg-slate-50 border border-slate-100 rounded-xl px-2 py-1 gap-3">
                      <button 
                        onClick={() => updateQuantity(item.id, 'plus')}
                        className="text-slate-600 hover:text-rose-500 transition w-6 h-6 flex items-center justify-center font-bold text-sm"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-black text-slate-900 w-4 text-center">
                        {item.quantity.toLocaleString('fa-IR')}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item.id, 'minus')}
                        className="text-slate-600 hover:text-rose-500 transition w-6 h-6 flex items-center justify-center font-bold text-sm"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* قیمت ضرب‌در تعداد */}
                    <div className="flex flex-col items-end shrink-0 min-w-[120px]">
                      <div className="text-sm md:text-base font-black text-slate-950 flex items-center gap-0.5">
                        <span>{formattedPrice(item.price * item.quantity)}</span>
                        <span className="text-[10px] font-normal text-slate-400">تومان</span>
                      </div>
                      {item.quantity > 1 && (
                        <span className="text-[10px] text-slate-400 font-bold mt-0.5">
                          هر واحد: {formattedPrice(item.price)}
                        </span>
                      )}
                    </div>

                    {/* دکمه حذف سطل آشغال */}
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-slate-400 hover:text-rose-500 transition-colors p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                  </div>
                </div>
              ))}
            </div>

            {/* ستون چپ: خلاصه فاکتور و پرداخت (۴ ستون) */}
            <div className="lg:col-span-4 bg-slate-900 border border-slate-950 text-white rounded-[32px] p-6 shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[350px]">
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-rose-500/10 blur-2xl rounded-full"></div>
              
              <div className="w-full flex flex-col gap-4 z-10">
                <h3 className="text-xs font-black text-slate-400 border-b border-white/5 pb-3 text-right">خلاصه فاکتور خرید</h3>
                
                <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                  <span>قیمت کالاها ({cartItems.length.toLocaleString('fa-IR')})</span>
                  <div className="flex items-center gap-0.5">
                    <span>{formattedPrice(totalCartPrice)}</span>
                    <span className="text-[10px] font-normal text-slate-500">تومان</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs font-bold text-slate-300 border-b border-white/5 pb-3">
                  <span>هزینه ارسال</span>
                  <span className="text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md font-black">رایگان</span>
                </div>

                <div className="flex items-center justify-between text-sm font-black text-white pt-1">
                  <span>مبلغ قابل پرداخت:</span>
                  <div className="flex items-center gap-0.5 text-base md:text-lg text-rose-400">
                    <span>{formattedPrice(totalCartPrice)}</span>
                    <span className="text-xs font-normal text-slate-400">تومان</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 z-10">
                <button className="w-full bg-rose-500 hover:bg-rose-600 text-white font-black text-xs md:text-sm py-4 rounded-2xl shadow-lg shadow-rose-500/10 transition-all duration-300 flex items-center justify-center gap-2 group active:scale-98">
                  <CreditCard className="w-4 h-4 transition-transform group-hover:scale-105" />
                  <span>ادامه فرآیند خرید</span>
                </button>
                
                <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500 font-bold mt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
                  <span>پرداخت امن با ضمانت طلایی سیب‌شاپ</span>
                </div>
              </div>

            </div>

          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
