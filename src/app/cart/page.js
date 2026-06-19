"use client";

import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Trash2, Plus, Minus, CreditCard, ShieldCheck, ShoppingBag, Percent, Sparkles } from 'lucide-react';
import { useCart } from "../../context/CartContext";
import Link from 'next/link'; // 🚀 اضافه شدن ابزار ناوبری استاندارد نکست‌جی

export default function CartPage() {
  const { 
    cartItems, 
    addToCart, 
    removeFromCart, 
    clearItem 
  } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [suggestedProducts, setSuggestedProducts] = useState([]);

  const formattedPrice = (num) => num.toLocaleString('fa-IR');

  // محاسبه قیمت کل سبد خرید بر اساس دیتای ارسالی از ویترین
  const cartTotalPrice = cartItems.reduce((total, item) => total + (Number(item.price) * item.quantity), 0);

  // فچ کردن زنده محصولات از استراپی برای بخش پیشنهادهای ویژه
  useEffect(() => {
    async function fetchSuggestions() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?populate=*`);
        if (res.ok) {
          const data = await res.json();
          setSuggestedProducts(data.data || []);
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    }
    fetchSuggestions();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden antialiased direction-rtl pb-32 md:pb-0">
      <Header />

      <main className="w-full px-4 md:px-8 mt-4 md:mt-6 pt-1 pb-16 relative z-10">
        
        {/* عنوان صفحه */}
        <div className="flex items-center gap-2 mb-5 text-right">
          <div className="w-1.5 h-5 bg-rose-500 rounded-full animate-pulse"></div>
          <h1 className="text-base md:text-xl font-black text-slate-900">سبد خرید شما</h1>
          <span className="text-[10px] md:text-xs font-bold text-slate-400 bg-slate-200/60 border border-slate-200/20 px-2 py-0.5 rounded-md mr-1">
            {cartItems.reduce((total, item) => total + item.quantity, 0).toLocaleString('fa-IR')} کالا
          </span>
        </div>

        {cartItems.length === 0 ? (
          <div className="w-full bg-white border border-slate-100 rounded-3xl p-10 py-16 text-center flex flex-col items-center justify-center shadow-2xs">
            <div className="w-16 h-14 bg-rose-50 rounded-2xl flex items-center justify-center mb-4 text-rose-500">
              <ShoppingBag className="w-7 h-7" />
            </div>
            <h2 className="text-sm md:text-base font-black text-slate-800 mb-1">سبد خرید شما فعلاً خالی است!</h2>
            <p className="text-[11px] md:text-xs text-slate-400 font-medium mb-6">می‌توانید برای مشاهده و انتخاب گجت‌ها به فروشگاه بازگردید.</p>
            <Link href="/" className="bg-slate-900 hover:bg-rose-500 text-white font-black text-xs px-6 py-3 rounded-xl shadow-md transition duration-200">
              بازگشت به سیب‌شاپ
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5 items-start">
            
            {/* ستون راست: لیست کالاها */}
            <div className="lg:col-span-8 flex flex-col gap-5">
              
              <div className="flex flex-col gap-3">
                {cartItems.map((item) => (
                  <div 
                    key={item.id} 
                    className="bg-white border border-slate-100 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-3xs transition duration-200"
                  >
                    <div className="flex items-center gap-3.5 w-full sm:w-auto">
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-50 border border-slate-100/70 rounded-xl flex items-center justify-center overflow-hidden shrink-0 select-none">
                        {item.imageUrl ? (
                          <img src={item.imageUrl} alt={item.name} className="w-full h-full object-contain p-1.5" />
                        ) : (
                          <span className="text-3xl md:text-4xl">📱</span>
                        )}
                      </div>
                      <div className="flex flex-col gap-1 text-right">
                        <h3 className="text-xs md:text-sm font-bold text-slate-800 leading-5 md:leading-6 max-w-md line-clamp-2">
                          {item.name}
                        </h3>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border border-white shadow-3xs"></span>
                          <span className="text-[10px] md:text-[11px] font-medium text-slate-400">آماده ارسال از انبار مرکزی</span>
                        </div>
                      </div>
                    </div>

                    {/* کپسول‌های کنترل قیمت */}
                    <div className="flex items-center justify-between sm:justify-end gap-4 md:gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-50 mt-1 sm:mt-0">
                      <div className="flex items-center bg-slate-50 border border-slate-100 rounded-xl px-2 py-1 gap-2.5">
                        <button onClick={() => addToCart(item)} className="text-slate-500 hover:text-rose-500 transition w-5 h-5 flex items-center justify-center font-bold text-xs"><Plus className="w-3.5 h-3.5 stroke-[2.2]" /></button>
                        <span className="text-xs font-black text-slate-900 w-4 text-center">{item.quantity.toLocaleString('fa-IR')}</span>
                        <button onClick={() => removeFromCart(item.id)} className="text-slate-500 hover:text-rose-500 transition w-5 h-5 flex items-center justify-center font-bold text-xs"><Minus className="w-3.5 h-3.5 stroke-[2.2]" /></button>
                      </div>

                      <div className="flex flex-col items-end shrink-0 min-w-[100px] md:min-w-[120px]">
                        <div className="text-xs md:text-base font-black text-slate-950 flex items-center gap-0.5">
                          <span>{formattedPrice(Number(item.price) * item.quantity)}</span>
                          <span className="text-[9px] md:text-[10px] font-normal text-slate-400">تومان</span>
                        </div>
                      </div>

                      <button onClick={() => clearItem ? clearItem(item.id) : removeFromCart(item.id)} className="text-slate-300 hover:text-rose-500 transition p-1.5 bg-slate-50 hover:bg-rose-50 border border-slate-100 rounded-lg">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* محصولات مکمل پیشنهادی کاملاً زنده و متصل به استراپی */}
              {suggestedProducts.length > 0 && (
                <div className="w-full text-right mt-2">
                  <div className="flex items-center gap-1.5 mb-4">
                    <Sparkles className="w-4 h-4 text-rose-500" />
                    <h3 className="text-xs md:text-sm font-black text-slate-800">تکمیل خرید؟ پیشنهادهای ویژه برای شما</h3>
                  </div>
                  <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-none snap-x px-0.5">
                    {suggestedProducts.map((product) => {
                      const { title, price, image } = product.attributes;
                      const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "https://b.dr-sib.xyz";
                      const imageUrl = image?.data ? `${strapiUrl}${image.data.attributes.url}` : null;

                      return (
                        <div key={product.id} className="flex-shrink-0 w-36 md:w-48 snap-center bg-white border border-slate-100 rounded-2xl p-3 flex flex-col justify-between group cursor-pointer shadow-3xs hover:shadow-xs transition duration-200">
                          <div className="bg-slate-50 rounded-xl h-20 md:h-28 flex items-center justify-center overflow-hidden mb-2">
                            {imageUrl ? (
                              <img src={imageUrl} alt={title} className="w-full h-full object-contain p-2 group-hover:scale-105 transition duration-300" />
                            ) : (
                              <span className="text-2xl md:text-3xl select-none">📱</span>
                            )}
                          </div>
                          <h4 className="text-[10px] md:text-xs font-bold text-slate-700 leading-4 md:leading-5 line-clamp-2 h-8 md:h-10 mb-2">{title}</h4>
                          <div className="flex items-center justify-between border-t border-slate-50 pt-1.5 w-full">
                            <div className="text-[10px] md:text-xs font-black text-slate-900 flex items-center gap-0.5">
                              <span>{Number(price).toLocaleString('fa-IR')}</span>
                              <span className="text-[8px] md:text-[9px] font-normal text-slate-400">تومان</span>
                            </div>
                            <button 
                              onClick={() => addToCart({
                                id: product.id,
                                name: title,
                                price: price,
                                imageUrl: imageUrl
                              })}
                              className="bg-slate-900 text-white w-5 h-5 rounded-md flex items-center justify-center font-bold text-xs hover:bg-rose-500 transition"
                            >
                              ＋
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>

            {/* ستون چپ: خلاصه فاکتور */}
            <div className="lg:col-span-4 lg:sticky lg:top-24 bg-slate-900 border border-slate-950 text-white rounded-3xl p-5 flex flex-col justify-between min-h-[360px] md:min-h-[420px] shadow-xl relative overflow-hidden">
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-rose-500/10 blur-2xl rounded-full"></div>
              
              <div className="w-full flex flex-col gap-3.5 z-10">
                <h3 className="text-[11px] font-black text-slate-400 border-b border-white/5 pb-2.5 text-right">خلاصه فاکتور خرید</h3>
                
                <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                  <span>قیمت کالاها ({cartItems.reduce((total, item) => total + item.quantity, 0).toLocaleString('fa-IR')})</span>
                  <div className="flex items-center gap-0.5">
                    <span>{formattedPrice(cartTotalPrice)}</span>
                    <span className="text-[9px] font-normal text-slate-500">تومان</span>
                  </div>
                </div>

                <div className="w-full py-1 border-b border-white/5">
                  <div className="w-full flex items-center bg-white/[0.04] border border-white/5 rounded-xl p-1">
                    <Percent className="w-3.5 h-3.5 text-slate-500 mr-2 shrink-0" />
                    <input 
                      type="text" 
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="کد تخفیف دارید؟" 
                      className="bg-transparent text-[10px] md:text-xs w-full px-1.5 py-1 focus:outline-none text-white text-right placeholder:text-slate-600 font-bold"
                    />
                    <button 
                      onClick={() => couponCode && setIsCouponApplied(true)}
                      className={`font-black text-[10px] px-3 py-1.5 rounded-lg transition shrink-0 ${isCouponApplied ? 'bg-emerald-500 text-white' : 'bg-white/10 hover:bg-white/20 text-white'}`}
                    >
                      {isCouponApplied ? 'اعمال شد' : 'ثبت'}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs font-bold text-slate-300 border-b border-white/5 pb-3">
                  <span>هزینه ارسال</span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md font-black">رایگان</span>
                </div>

                <div className="flex items-center justify-between text-xs md:text-sm font-black text-white pt-1">
                  <span>مبلغ قابل پرداخت:</span>
                  <div className="flex items-center gap-0.5 text-sm md:text-lg text-rose-400">
                    <span>{formattedPrice(isCouponApplied ? cartTotalPrice * 0.95 : cartTotalPrice)}</span>
                    <span className="text-[10px] font-normal text-slate-400">تومان</span>
                  </div>
                </div>
              </div>

              {/* 🚀 اتصال دکمه نسخه دسکتاپ به آدرس تسویه حساب */}
              <div className="mt-6 flex flex-col gap-3 z-10">
                <Link href="/checkout" className="w-full">
                  <button className="w-full bg-rose-500 hover:bg-rose-600 text-white font-black text-xs md:text-sm py-3.5 rounded-2xl shadow-lg shadow-rose-500/10 transition-all duration-300 flex items-center justify-center gap-2 group active:scale-98 cursor-pointer">
                    <CreditCard className="w-4 h-4" />
                    <span>ادامه فرآیند خرید</span>
                  </button>
                </Link>
                
                <div className="flex items-center justify-center gap-1.5 text-[9px] md:text-[10px] text-slate-500 font-bold mt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
                  <span>پرداخت امن با ضمانت طلایی سیب‌شاپ</span>
                </div>
              </div>

            </div>

          </div>
        )}

      </main>

      {/* 🚀 اتصال دکمه چسبان نسخه موبایل به آدرس تسویه حساب */}
      {cartItems.length > 0 && (
        <div className="md:hidden fixed bottom-[68px] left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-slate-200/60 p-3.5 flex items-center justify-between z-40 shadow-[0_-8px_24px_rgba(0,0,0,0.04)] rounded-t-2xl">
          <div className="flex flex-col text-right">
            <span className="text-[9px] text-slate-400 font-bold">مبلغ کل سبد:</span>
            <div className="text-sm font-black text-slate-950 flex items-center gap-0.5 mt-0.5">
              <span>{formattedPrice(isCouponApplied ? cartTotalPrice * 0.95 : cartTotalPrice)}</span>
              <span className="text-[9px] font-normal text-slate-400">تومان</span>
            </div>
          </div>
          <Link href="/checkout">
            <button className="bg-rose-500 active:bg-rose-600 text-white font-black text-xs px-6 py-3 rounded-xl flex items-center gap-1.5 shadow-md shadow-rose-500/20 active:scale-95 transition-all duration-150 cursor-pointer">
              <CreditCard className="w-3.5 h-3.5" />
              <span>ادامه خرید</span>
            </button>
          </Link>
        </div>
      )}

      <Footer />
    </div>
  );
}
