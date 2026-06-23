"use client";

import React, { useState } from 'react';
import Header from '../../../components/Header'; 
import Footer from '../../../components/Footer';
import { Star, ShieldCheck, Truck, ShoppingBag, ChevronRight, Heart, Share2, Ban, Plus, Minus, ArrowLeft, ShoppingCart, Check } from 'lucide-react';
import { useCart } from '../../../context/CartContext'; 
import Link from 'next/link';

export default function ProductDetailClient({ productData }) {
  // 🛡️ لایه دفاعی برای جلوگیری از ارور در صورت عدم بارگذاری کانتکست
  const context = useCart() || {};
  const cartItems = context.cartItems || [];
  const addToCart = context.addToCart || (() => {});
  const incrementQuantity = context.incrementQuantity || (() => {});
  const removeFromCart = context.removeFromCart || (() => {});

  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedStorage, setSelectedStorage] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState('review');
  
  // 🔘 استیت مدیریت پیام «به سبد خرید اضافه شد» به سبک دیجی‌کالا
  const [showSuccess, setShowSuccess] = useState(false);

  // 📦 بررسی هوشمند وضعیت موجودی بر اساس مقدار واکشی شده از استراپی
  const stockCount = productData?.stock !== undefined ? Number(productData.stock) : 1;
  const isAvailable = stockCount > 0;

  // 🛒 بررسی وضعیت حضور این کالا در سبد خرید فعلی کاربر
  const existInCart = cartItems.find(item => item.id === productData?.id);

  const handleIncrement = () => {
    if (existInCart && existInCart.quantity < stockCount) {
      incrementQuantity(productData.id);
    }
  };

  const handleDecrement = () => {
    if (existInCart) {
      removeFromCart(productData.id);
    }
  };

  // 🚀 مدیریت هوشمند افزودن به سبد با انیمیشن موفقیت
  const handleAddToCart = () => {
    if (!isAvailable || !productData) return;

    const p2e = s => s.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d));
    const cleanPriceString = productData.price 
      ? p2e(productData.price.toString()).replace(/[^\d]/g, '') 
      : '0';

    const rawPrice = Number(cleanPriceString);

    addToCart({
      id: productData.id,
      name: productData.name,
      price: rawPrice,
      imageUrl: productData.imageUrl,
      stock: stockCount 
    });

    // فعال کردن وضعیت «اضافه شد» و محو شدن آن پس از ۲ ثانیه
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 2000);
  };

  if (!productData) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-between direction-rtl">
        <Header />
        <div className="text-center py-20 text-slate-500 font-bold">دریافت اطلاعات محصول...</div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden antialiased direction-rtl pb-32 md:pb-0">
      <Header />

      {/* هاله‌های آمبیانس نوری */}
      <div className="absolute top-32 left-1/4 w-[500px] h-[500px] bg-rose-500/5 blur-[150px] rounded-full pointer-events-none z-0"></div>

      <main className="w-full px-4 md:px-8 mt-4 md:mt-6 pt-1 pb-16 relative z-10">
        
        {/* بردکرامب */}
        <div className="flex items-center gap-2 text-[11px] md:text-xs font-bold text-slate-400 mb-4 text-right">
          <span className="hover:text-slate-600 cursor-pointer">سیب‌شاپ</span>
          <ChevronRight className="w-3 h-3 text-slate-300" />
          <span className="hover:text-slate-600 cursor-pointer">گوشی موبایل</span>
          <ChevronRight className="w-3 h-3 text-slate-300" />
          <span className="text-slate-800 truncate max-w-[180px] md:max-w-none">{productData.name}</span>
        </div>

        {/* کادر اصلی محصول */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5 items-start mb-8">
          
          {/* 📱 ستون اول: گالری عکس اصلاح‌شده با تکنیک mix-blend-multiply */}
          <div className="lg:col-span-5 bg-white border border-slate-100 rounded-3xl p-4 md:p-6 flex flex-col justify-between h-[340px] md:h-[490px] shadow-2xs relative overflow-hidden">
            <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
              <button onClick={() => setIsLiked(!isLiked)} className="w-8 h-8 md:w-9 md:h-9 bg-slate-50/80 backdrop-blur-xs border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 hover:text-rose-500 transition shadow-3xs">
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
              <button className="w-8 h-8 md:w-9 md:h-9 bg-slate-50/80 backdrop-blur-xs border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-700 transition shadow-3xs">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex-1 flex items-center justify-center w-full h-full relative p-4 bg-white rounded-2xl">
              {!isAvailable && (
                <div className="absolute top-2 right-2 bg-slate-500 text-white text-[10px] font-black px-3 py-1 rounded-xl z-30 shadow-xs select-none">
                  اتمام موجودی
                </div>
              )}
              
              {productData.imageUrl ? (
                <img 
                  src={productData.imageUrl} 
                  alt={productData.name}
                  referrerPolicy="no-referrer-when-downgrade"
                  /* 🚀 جادوی سی‌اس‌اس: حذف کادر سفیدِ دورِ تصاویر استراپی */
                  className={`max-h-[240px] md:max-h-[360px] w-auto object-contain mix-blend-multiply select-none transition duration-500 ${
                    !isAvailable ? 'grayscale opacity-40' : 'hover:scale-[1.03]'
                  }`}
                />
              ) : (
                <span className="text-7xl md:text-8xl lg:text-9xl filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.08)] select-none">
                  📱
                </span>
              )}
            </div>
          </div>

          {/* ستون دوم: مشخصات کالا */}
          <div className="lg:col-span-4 bg-white border border-slate-100 rounded-3xl p-5 flex flex-col justify-between min-h-[380px] md:h-[490px] shadow-2xs text-right">
            <div className="h-full flex flex-col justify-between gap-3">
              <div>
                <h1 className="text-sm md:text-base lg:text-lg font-black text-slate-900 leading-6 md:leading-7 mb-1">{productData.name}</h1>
                <p className="text-[9px] md:text-[10px] font-bold text-slate-400 font-sans tracking-wide mb-2.5 text-left direction-ltr truncate">{productData.englishName}</p>
                
                <div className="flex flex-wrap gap-1.5 mb-3">
                  <span className="bg-slate-100 text-slate-700 text-[9px] font-black px-2 py-0.5 rounded-md border border-slate-200/40">پارت نامبر CH/A</span>
                  <span className="bg-emerald-50 text-emerald-700 text-[9px] font-black px-2 py-0.5 rounded-md border border-emerald-200/30">رجیستر شده با کد فعالسازی</span>
                </div>

                <div className="flex items-center gap-1.5 mb-3 bg-slate-50/80 px-2.5 py-1 rounded-xl border border-slate-100/50 w-fit">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-black text-slate-700">{productData.rating}</span>
                  <span className="text-[9px] text-slate-400 font-bold">({productData.reviewCount})</span>
                </div>

                {/* انتخاب ظرفیت */}
                <div className="mb-3 bg-slate-50/50 p-2.5 rounded-2xl border border-slate-100/60">
                  <span className="text-[11px] font-black text-slate-800 block mb-1.5">انتخاب ظرفیت:</span>
                  <div className="flex items-center gap-2">
                    {productData.storages?.map((storage, idx) => (
                      <button key={idx} disabled={!isAvailable} onClick={() => setSelectedStorage(idx)} className={`px-3 py-1.5 rounded-xl text-[10px] font-bold border transition ${!isAvailable ? 'opacity-40 cursor-not-allowed bg-slate-100 border-slate-200 text-slate-400' : selectedStorage === idx ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}>{storage}</button>
                    ))}
                  </div>
                </div>

                {/* انتخاب رنگ */}
                <div className="mb-2 bg-slate-50/50 p-2.5 rounded-2xl border border-slate-100/60">
                  <span className="text-[11px] font-black text-slate-800 block mb-1.5">رنگ: {productData.colors?.[selectedColor]?.name || ''}</span>
                  <div className="flex items-center gap-2.5">
                    {productData.colors?.map((color, index) => (
                      <button key={index} disabled={!isAvailable} onClick={() => setSelectedColor(index)} className={`w-6 h-6 rounded-full ${color.class} border-2 transition ${!isAvailable ? 'opacity-30 cursor-not-allowed' : selectedColor === index ? 'border-rose-500 scale-110 ring-4 ring-rose-500/10 shadow-sm' : 'border-slate-200'}`} />
                    ))}
                  </div>
                </div>

                {isAvailable && stockCount < 5 && (
                  <div className="mt-3 bg-amber-50 border border-amber-200/60 text-amber-700 px-3 py-2 rounded-xl text-[11px] font-black flex items-center gap-1.5">
                    ⚠️ تنها {stockCount.toLocaleString('fa-IR')} عدد از این کالا در انبار سیب‌شاپ باقی مانده است.
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="grid grid-cols-1 gap-2">
                  {productData.specs?.map((spec, index) => (
                    <div key={index} className="flex justify-between bg-slate-50/60 px-3 py-1.5 rounded-xl border border-slate-100/30">
                      <span className="text-[11px] font-medium text-slate-400">{spec.title}</span>
                      <span className="text-xs font-bold text-slate-800">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ستون سوم: باکس خرید دسکتاپ مدرن و کاملاً بهینه‌سازی شده */}
          <div className={`lg:col-span-3 border text-white rounded-3xl p-6 flex flex-col justify-between h-auto min-h-[380px] md:h-[490px] shadow-xl relative overflow-hidden transition-colors duration-300 ${isAvailable ? 'bg-slate-900 border-slate-950' : 'bg-slate-950/95 border-slate-900'}`}>
            <div className="flex flex-col gap-3.5 z-10">
              <span className="text-[11px] font-black text-slate-400 border-b border-white/5 pb-2.5 block text-right">فروشنده: سیب‌شاپ</span>
              <div className="flex items-center gap-3 text-right px-1">
                <ShieldCheck className={`w-5 h-5 shrink-0 ${isAvailable ? 'text-rose-500' : 'text-slate-500'}`} />
                <span className="text-xs font-bold text-slate-200">گارانتی ۱۸ ماهه شرکتی</span>
              </div>
              <div className="flex items-center gap-3 text-right px-1">
                <Truck className={`w-5 h-5 shrink-0 ${isAvailable ? 'text-rose-500' : 'text-slate-500'}`} />
                <span className="text-xs font-bold text-slate-200">ارسال اکسپرس سیب‌شاپ</span>
              </div>
            </div>
            
            <div className="mt-5 pt-4 border-t border-white/5 z-10 flex flex-col gap-4">
              <div className="flex items-center justify-between w-full min-h-[44px] text-right px-1">
                {isAvailable ? (
                  <>
                    <span className="text-xs text-slate-400 font-bold">قیمت کالا:</span>
                    <div className="flex flex-col items-end">
                      {productData.oldPrice && <span className="text-[10px] text-slate-500 line-through font-medium">{productData.oldPrice}</span>}
                      <div className="text-base md:text-xl font-black text-white flex items-center gap-1 mt-0.5">
                        <span>{productData.price}</span>
                        <span className="text-xs font-normal text-slate-400 mr-1">تومان</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <span className="text-xs md:text-sm font-black text-rose-500 bg-rose-500/10 border border-rose-500/20 px-3 py-1.5 rounded-xl w-full text-center">ناموجود در انبار</span>
                )}
              </div>
              
              {/* 🛒 منطق و دکمه‌های خرید توسعه‌یافته مشابه پلتفرم‌های بزرگ */}
              {isAvailable ? (
                showSuccess ? (
                  /* 🟢 حالت موقت: تایید افزودن موفقیت‌آمیز به سبد خرید (دیجی‌کالایی) */
                  <div className="w-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-black py-3.5 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/5 px-4">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>به سبد خرید اضافه شد</span>
                  </div>
                ) : existInCart ? (
                  /* 🔢 حالت کنترل تعداد اقلام موجود در سبد خرید */
                  <div className="flex flex-col gap-3 w-full transition-all duration-300">
                    <div className="w-full bg-slate-800 border border-slate-700/60 py-2.5 px-4 rounded-2xl flex items-center justify-between shadow-inner">
                      <button 
                        disabled={existInCart.quantity >= stockCount}
                        onClick={handleIncrement}
                        className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all active:scale-95 ${existInCart.quantity >= stockCount ? 'bg-slate-700/40 text-slate-600 cursor-not-allowed' : 'bg-rose-500 hover:bg-rose-600 text-white cursor-pointer shadow-sm'}`}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      
                      <div className="flex flex-col items-center select-none">
                        <span className="text-sm font-black text-white">{existInCart.quantity.toLocaleString('fa-IR')}</span>
                        <span className="text-[9px] text-slate-400 font-bold mt-0.5">عدد در سبد</span>
                      </div>

                      <button 
                        onClick={handleDecrement}
                        className="w-8 h-8 bg-slate-700 hover:bg-slate-600 text-white rounded-xl flex items-center justify-center cursor-pointer transition-all active:scale-95 border border-slate-600/40"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                    </div>

                    <Link 
                      href="/cart" 
                      className="w-full bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-black py-3.5 rounded-2xl flex items-center justify-center gap-2.5 border border-rose-500/30 transition-all shadow-md px-4"
                    >
                      <ShoppingCart className="w-4 h-4 text-rose-400 shrink-0" />
                      <span>مشاهده و تایید سبد خرید</span>
                      <ArrowLeft className="w-4 h-4 mr-auto bg-rose-500/20 p-0.5 rounded-lg text-rose-300 shrink-0" />
                    </Link>
                  </div>
                ) : (
                  /* 🛍️ حالت اولیه: افزودن به سبد خرید */
                  <button 
                    onClick={handleAddToCart}
                    className="w-full bg-rose-500 hover:bg-rose-600 text-white font-black text-xs md:text-sm py-3.5 px-4 rounded-2xl shadow-lg transition duration-300 flex items-center justify-center gap-2.5 active:scale-98 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4 shrink-0" />
                    <span>افزودن به سبد خرید</span>
                  </button>
                )
              ) : (
                <button disabled className="w-full bg-slate-800 text-slate-500 border border-slate-700 py-3.5 rounded-2xl font-black text-xs md:text-sm flex items-center justify-center gap-2 cursor-not-allowed">
                  <Ban className="w-4 h-4" />
                  <span>کالا ناموجود است</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* سیستم تب‌بندی */}
        <div className="w-full bg-white border border-slate-100 rounded-3xl p-5 md:p-6 shadow-2xs mb-8 text-right">
          <div className="flex items-center gap-6 border-b border-slate-100 pb-3 mb-5">
            <button onClick={() => setActiveTab('review')} className={`text-xs md:text-sm font-black pb-2 transition relative ${activeTab === 'review' ? 'text-rose-500' : 'text-slate-400'}`}>
              <span>توضیحات محصول</span>
              {activeTab === 'review' && <span className="absolute bottom-0 inset-x-0 h-0.5 bg-rose-500 rounded-full"></span>}
            </button>
          </div>
          <div className="leading-6 md:leading-7 text-[11px] md:text-sm text-slate-600 font-medium max-w-4xl">
            <p>{productData.fullSpecs?.[0]?.value || 'توضیحاتی در دسترس نیست.'}</p>
          </div>
        </div>

      </main>

      {/* 📱 سیستم فیکس پایین صفحه موبایل هوشمند با قابلیت فیدبک آنی زمان خرید */}
      <div className={`md:hidden fixed bottom-14 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200/60 px-4 py-3 flex flex-col gap-2.5 z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.04)] transition-all ${((existInCart || showSuccess) && isAvailable) ? 'h-auto' : 'h-[72px]'}`}>
        
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col text-right justify-center">
            {isAvailable ? (
              <>
                {productData.oldPrice && <span className="text-[9px] text-slate-400 font-bold line-through">{productData.oldPrice}</span>}
                <div className="text-sm font-black text-slate-950 flex items-center gap-0.5">
                  <span>{productData.price}</span>
                  <span className="text-[9px] font-normal text-slate-400">تومان</span>
                </div>
              </>
            ) : (
              <span className="text-xs font-bold text-slate-400">کالا ناموجود است</span>
            )}
          </div>
          
          <div className="flex items-center justify-end">
            {isAvailable ? (
              showSuccess ? (
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-xs font-black px-4 py-2 rounded-xl flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5" />
                  <span>اضافه شد</span>
                </div>
              ) : existInCart ? (
                <div className="bg-slate-900 text-white px-3 py-1.5 rounded-xl flex items-center gap-5 border border-slate-950 shadow-md">
                  <button 
                    disabled={existInCart.quantity >= stockCount}
                    onClick={handleIncrement}
                    className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold ${
                      existInCart.quantity >= stockCount ? 'bg-slate-800 text-slate-600 cursor-not-allowed' : 'bg-rose-500 text-white'
                    }`}
                  >
                    +
                  </button>
                  <span className="text-xs font-black min-w-[12px] text-center">{existInCart.quantity.toLocaleString('fa-IR')}</span>
                  <button 
                    onClick={handleDecrement}
                    className="w-6 h-6 bg-slate-800 text-white rounded-md flex items-center justify-center text-xs font-bold"
                  >
                    -
                  </button>
                </div>
              ) : (
                <button 
                  onClick={handleAddToCart}
                  className="bg-rose-500 text-white font-black text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 active:scale-95 transition-all"
                >
                  <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
                  <span>افزودن به سبد</span>
                </button>
              )
            ) : (
              <button disabled className="bg-slate-100 text-slate-400 border border-slate-200 font-black text-xs px-5 py-2.5 rounded-xl cursor-not-allowed">
                <span>ناموجود</span>
              </button>
            )}
          </div>
        </div>

        {/* دکمه پایین موبایل برای رفتن به سبد خرید */}
        {isAvailable && existInCart && !showSuccess && (
          <Link 
            href="/cart" 
            className="w-full bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 text-[11px] font-black py-2.5 rounded-xl flex items-center justify-center gap-2 border border-rose-500/30 shadow-sm"
          >
            <ShoppingCart className="w-3.5 h-3.5 text-rose-500" />
            <span>تایید و نهایی‌سازی سبد خرید</span>
            <ArrowLeft className="w-3 h-3 mr-auto ml-1 bg-rose-500/20 p-0.5 rounded-md text-rose-400" />
          </Link>
        )}
      </div>

      <Footer />
    </div>
  );
}
