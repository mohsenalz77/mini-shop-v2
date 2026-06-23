"use client";

import React, { useState } from 'react';
import Header from '../../../components/Header'; 
import Footer from '../../../components/Footer';
import { Star, ShieldCheck, Truck, ShoppingBag, ChevronRight, Heart, Share2, Ban, Plus, Minus } from 'lucide-react';
import { useCart } from '../../../context/CartContext'; 

export default function ProductDetailClient({ productData }) {
  const { cartItems, addToCart, incrementQuantity, removeFromCart } = useCart(); 
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedStorage, setSelectedStorage] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState('review');

  // 📦 بررسی هوشمند وضعیت موجودی بر اساس مقدار واکشی شده از استراپی
  const stockCount = productData.stock !== undefined ? Number(productData.stock) : 1;
  const isAvailable = stockCount > 0;

  // 🛒 بررسی این که آیا این کالا همین الان در سبد خرید هست یا نه؟
  const existInCart = cartItems.find(item => item.id === productData.id);

  // 🚀 فرمت کردن و تبدیل هوشمند اعداد فارسی به انگلیسی برای حل مشکل قیمت صفر در سبد خرید
  const handleAddToCart = () => {
    if (!isAvailable) return;

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
  };

  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden antialiased direction-rtl pb-16 md:pb-0">
      <Header />

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
          
          {/* ستون اول: گالری عکس */}
          <div className="lg:col-span-5 bg-white border border-slate-100 rounded-3xl p-4 md:p-6 flex flex-col justify-between h-[340px] md:h-[490px] shadow-2xs relative">
            <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
              <button onClick={() => setIsLiked(!isLiked)} className="w-8 h-8 md:w-9 md:h-9 bg-slate-50 border border-slate-100/70 rounded-xl flex items-center justify-center text-slate-400 hover:text-rose-500 transition shadow-3xs">
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
              <button className="w-8 h-8 md:w-9 md:h-9 bg-slate-50 border border-slate-100/70 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-700 transition shadow-3xs">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex-1 flex items-center justify-center w-full h-full relative">
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
                  className={`max-h-[260px] md:max-h-[380px] object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.08)] select-none transition duration-300 ${!isAvailable ? 'grayscale opacity-50' : ''}`}
                />
              ) : (
                <span className="text-7xl md:text-8xl lg:text-9xl filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.08)] select-none">
                  📱
                </span>
              )}
            </div>
          </div>

          {/* ستون دوم: مشخصات و انتخاب‌ها */}
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
                    {productData.storages.map((storage, idx) => (
                      <button key={idx} disabled={!isAvailable} onClick={() => setSelectedStorage(idx)} className={`px-3 py-1.5 rounded-xl text-[10px] font-bold border transition ${!isAvailable ? 'opacity-40 cursor-not-allowed bg-slate-100 border-slate-200 text-slate-400' : selectedStorage === idx ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}>{storage}</button>
                    ))}
                  </div>
                </div>

                {/* انتخاب رنگ */}
                <div className="mb-2 bg-slate-50/50 p-2.5 rounded-2xl border border-slate-100/60">
                  <span className="text-[11px] font-black text-slate-800 block mb-1.5">رنگ: {productData.colors[selectedColor].name}</span>
                  <div className="flex items-center gap-2.5">
                    {productData.colors.map((color, index) => (
                      <button key={index} disabled={!isAvailable} onClick={() => setSelectedColor(index)} className={`w-6 h-6 rounded-full ${color.class} border-2 transition ${!isAvailable ? 'opacity-30 cursor-not-allowed' : selectedColor === index ? 'border-rose-500 scale-110 ring-4 ring-rose-500/10 shadow-sm' : 'border-slate-200'}`} />
                    ))}
                  </div>
                </div>

                {/* 🔴 فیکس شماره ۱: نمایش تعداد موجودی دقیق اگر کمتر از ۵ عدد بود */}
                {isAvailable && stockCount < 5 && (
                  <div className="mt-3 bg-amber-50 border border-amber-200/60 text-amber-700 px-3 py-2 rounded-xl text-[11px] font-black flex items-center gap-1.5 animate-pulse">
                    ⚠️ شتاب کنید! فقط {stockCount.toLocaleString('fa-IR')} عدد از این محصول در انبار سیب‌شاپ باقی مانده است.
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="grid grid-cols-1 gap-2">
                  {productData.specs.map((spec, index) => (
                    <div key={index} className="flex justify-between bg-slate-50/60 px-3 py-1.5 rounded-xl border border-slate-100/30">
                      <span className="text-[11px] font-medium text-slate-400">{spec.title}</span>
                      <span className="text-xs font-bold text-slate-800">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ستون سوم: باکس خرید دسکتاپ */}
          <div className={`lg:col-span-3 border text-white rounded-3xl p-5 flex flex-col justify-between h-[350px] md:h-[490px] shadow-xl relative overflow-hidden transition-colors duration-300 ${isAvailable ? 'bg-slate-900 border-slate-950' : 'bg-slate-950/95 border-slate-900'}`}>
            <div className="flex flex-col gap-3 z-10">
              <span className="text-[11px] font-black text-slate-400 border-b border-white/5 pb-2 block text-right">فروشنده: سیب‌شاپ</span>
              <div className="flex items-start gap-2.5 text-right">
                <ShieldCheck className={`w-4.5 h-4.5 shrink-0 mt-0.5 ${isAvailable ? 'text-rose-500' : 'text-slate-500'}`} />
                <div className="flex flex-col"><span className={`text-xs font-bold ${isAvailable ? 'text-white' : 'text-slate-400'}`}>گارانتی ۱۸ ماهه شرکتی</span></div>
              </div>
              <div className="flex items-start gap-2.5 text-right">
                <Truck className={`w-4.5 h-4.5 shrink-0 mt-0.5 ${isAvailable ? 'text-rose-500' : 'text-slate-500'}`} />
                <div className="flex flex-col"><span className={`text-xs font-bold ${isAvailable ? 'text-white' : 'text-slate-400'}`}>ارسال اکسپرس سیب‌شاپ</span></div>
              </div>
            </div>
            
            <div className="mt-5 pt-3 border-t border-white/5 z-10 flex flex-col gap-3">
              <div className="flex items-center justify-between w-full text-right">
                <span className="text-[10px] text-slate-400 font-bold">{isAvailable ? "قیمت کالا:" : "وضعیت انبار:"}</span>
                <div className="flex flex-col items-end">
                  {isAvailable ? (
                    <>
                      {productData.oldPrice && <span className="text-[10px] text-slate-500 line-through font-medium">{productData.oldPrice}</span>}
                      <div className="text-base md:text-xl font-black text-white flex items-center gap-0.5 mt-0.5">
                        <span>{productData.price}</span>
                        <span className="text-[10px] font-normal text-slate-400 mr-0.5">تومان</span>
                      </div>
                    </>
                  ) : (
                    <span className="text-xs md:text-sm font-black text-rose-500 bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-xl">ناموجود در انبار</span>
                  )}
                </div>
              </div>
              
              {/* 🛒 فیکس شماره ۲ و ۳: تبدیل دکمه به کنترلر هوشمند تعداد در دسکتاپ */}
              {isAvailable ? (
                existInCart ? (
                  <div className="w-full bg-slate-800 border border-slate-700 py-2.5 px-4 rounded-2xl flex items-center justify-between shadow-inner">
                    <button 
                      disabled={existInCart.quantity >= stockCount}
                      onClick={() => incrementQuantity(productData.id)}
                      className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${existInCart.quantity >= stockCount ? 'bg-slate-700/40 text-slate-600 cursor-not-allowed' : 'bg-rose-500 hover:bg-rose-600 text-white cursor-pointer'}`}
                      title={existInCart.quantity >= stockCount ? "سقف موجودی انبار" : "افزایش تعداد"}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    
                    <div className="flex flex-col items-center select-none">
                      <span className="text-sm font-black text-white">{existInCart.quantity.toLocaleString('fa-IR')}</span>
                      <span className="text-[9px] text-slate-400 font-bold">عدد در سبد</span>
                    </div>

                    <button 
                      onClick={() => removeFromCart(productData.id)}
                      className="w-8 h-8 bg-slate-700 hover:bg-slate-600 text-white rounded-xl flex items-center justify-center cursor-pointer transition-all"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={handleAddToCart}
                    className="w-full bg-rose-500 hover:bg-rose-600 text-white font-black text-xs md:text-sm py-3.5 rounded-2xl shadow-lg transition duration-300 flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
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
              <span>توضیحات...</span>
              {activeTab === 'review' && <span className="absolute bottom-0 inset-x-0 h-0.5 bg-rose-500 rounded-full"></span>}
            </button>
          </div>
          <div className="leading-6 md:leading-7 text-[11px] md:text-sm text-slate-600 font-medium max-w-4xl">
            <p>{productData.fullSpecs[0].value}</p>
          </div>
        </div>

      </main>

      {/* سیستم فیکس پایین صفحه موبایل هماهنگ با کنترلر تعداد */}
      <div className="md:hidden fixed bottom-14 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-slate-100 p-3 flex items-center justify-between z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.04)]">
        <div className="flex flex-col text-right">
          {isAvailable ? (
            <>
              {productData.oldPrice && <span className="text-[9px] text-slate-400 font-bold line-through">{productData.oldPrice}</span>}
              <div className="text-sm font-black text-slate-950 flex items-center gap-0.5">
                <span>{productData.price}</span>
                <span className="text-[9px] font-normal text-slate-400">تومان</span>
              </div>
            </>
          ) : (
            <span className="text-xs font-bold text-slate-400">غیرقابل خرید</span>
          )}
        </div>
        
        {isAvailable ? (
          existInCart ? (
            <div className="bg-slate-900 text-white px-3 py-1.5 rounded-xl flex items-center gap-4 border border-slate-950 shadow-md">
              <button 
                disabled={existInCart.quantity >= stockCount}
                onClick={() => incrementQuantity(productData.id)}
                className={`w-6 h-6 rounded-md flex items-center justify-center text-xs ${existInCart.quantity >= stockCount ? 'bg-slate-800 text-slate-600 cursor-not-allowed' : 'bg-rose-500 text-white'}`}
              >
                +
              </button>
              <span className="text-xs font-black min-w-[12px] text-center">{existInCart.quantity.toLocaleString('fa-IR')}</span>
              <button 
                onClick={() => removeFromCart(productData.id)}
                className="w-6 h-6 bg-slate-800 text-white rounded-md flex items-center justify-center text-xs"
              >
                -
              </button>
            </div>
          ) : (
            <button 
              onClick={handleAddToCart}
              className="bg-rose-500 text-white font-black text-xs px-5 py-2.5 rounded-xl flex items-center gap-1.5 active:scale-95 transition-all duration-150"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>افزودن به سبد</span>
            </button>
          )
        ) : (
          <button disabled className="bg-slate-100 text-slate-400 border border-slate-200 font-black text-xs px-5 py-2.5 rounded-xl cursor-not-allowed">
            <span>ناموجود</span>
          </button>
        )}
      </div>

      <Footer />
    </div>
  );
}
