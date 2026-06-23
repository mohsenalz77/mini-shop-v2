"use client";

import React, { useState, useEffect } from 'react';
import Header from '../../../components/Header'; 
import Footer from '../../../components/Footer';
import { Star, ShieldCheck, Truck, ShoppingBag, ChevronRight, Heart, Share2, Ban, Plus, Minus, ArrowLeft, ShoppingCart, Check } from 'lucide-react';
import { useCart } from '../../../context/CartContext'; 
import Link from 'next/link';

// 🎨 دیکشنری هوشمند تبدیل نام‌های فارسی به کدهای رنگی وب
const colorMap = {
  'مشکی': '#1a1a1a',
  'مشکی مات': '#111111',
  'تایتانیم مشکی': '#232426',
  'سفید': '#ffffff',
  'تایتانیم سفید': '#e3e4e5',
  'نقره ای': '#e5e7eb',
  'سیلور': '#e5e7eb',
  'خاکستری': '#6b7280',
  'تایتانیم طبیعی': '#8a8885',
  'تایتانیم بیابانی': '#d3c1a5',
  'طلایی': '#fbbf24',
  'گلد': '#f59e0b',
  'آبی': '#2563eb',
  'سبز': '#16a34a',
  'قرمز': '#dc2626',
  'صورتی': '#fbcfe8',
  'بنفش': '#9333ea',
};

export default function ProductDetailClient({ productData }) {
  // 🛡️ کانتکست سبد خرید
  const context = useCart() || {};
  const cartItems = context.cartItems || [];
  const addToCart = context.addToCart || (() => {});
  const incrementQuantity = context.incrementQuantity || (() => {});
  const removeFromCart = context.removeFromCart || (() => {});

  // 🔘 استیت‌های انتخاب ویژگی‌ها
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedStorage, setSelectedStorage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState('review');
  const [showSuccess, setShowSuccess] = useState(false);

  // 📸 استیت تصویر بزرگ گالری
  const [activeImage, setActiveImage] = useState(productData?.imageUrl);

  // 💰 استیت‌های قیمت و انبار لحظه‌ای ترکیب انتخابی
  const [currentPrice, setCurrentPrice] = useState(productData?.price);
  const [currentStock, setCurrentStock] = useState(productData?.stock);

  // 🔄 فیلتر و مچ کردن هوشمند ترکیب انتخاب‌شده با آرایه تنوع‌های استراپی
  useEffect(() => {
    if (productData?.variants && productData.variants.length > 0) {
      const activeColorName = productData.colors?.[selectedColor]?.name;
      const activeStorageName = productData.storages?.[selectedStorage];
      const activeSizeName = productData.sizes?.[selectedSize];

      const matchedVariant = productData.variants.find(v => {
        const matchColor = activeColorName 
          ? v.options.some(o => (o.type?.toLowerCase() === 'color' || o.type === 'رنگ') && o.value === activeColorName) 
          : true;
          
        const matchStorage = activeStorageName 
          ? v.options.some(o => (o.type?.toLowerCase() === 'storage' || o.type === 'حافظه') && o.value === activeStorageName) 
          : true;
          
        const matchSize = activeSizeName 
          ? v.options.some(o => (o.type?.toLowerCase() === 'size' || o.type === 'سایز') && o.value === activeSizeName) 
          : true;

        return matchColor && matchStorage && matchSize;
      });

      if (matchedVariant) {
        setCurrentPrice(Number(matchedVariant.price).toLocaleString('fa-IR'));
        setCurrentStock(Number(matchedVariant.stock));
      } else {
        setCurrentPrice(productData.price);
        setCurrentStock(productData.stock);
      }
    }
  }, [selectedColor, selectedStorage, selectedSize, productData]);

  // هماهنگی تصویر اولیه با تغییر کالا
  useEffect(() => {
    if (productData?.imageUrl) {
      setActiveImage(productData.imageUrl);
    }
  }, [productData]);

  const stockCount = currentStock !== undefined ? currentStock : 0;
  const isAvailable = stockCount > 0;

  // 🛒 تولید کلید شناسه یکتا برای هر ترکیب ویژگی جهت تفکیک در سبد خرید
  const uniqueCartId = `${productData?.id}-${selectedColor}-${selectedStorage}-${selectedSize}`;
  const existInCart = cartItems.find(item => item.id === uniqueCartId);

  const handleIncrement = () => {
    if (existInCart && existInCart.quantity < stockCount) {
      incrementQuantity(uniqueCartId);
    }
  };

  const handleDecrement = () => {
    if (existInCart) {
      removeFromCart(uniqueCartId);
    }
  };

  const handleAddToCart = () => {
    if (!isAvailable || !productData) return;

    const p2e = s => s.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d));
    const cleanPriceString = currentPrice 
      ? p2e(currentPrice.toString()).replace(/[^\d]/g, '') 
      : '0';

    const rawPrice = Number(cleanPriceString);
    const finalName = `${productData.name} (${productData.colors?.[selectedColor]?.name || ''} - ${productData.storages?.[selectedStorage] || ''})`.trim();

    addToCart({
      id: uniqueCartId,
      name: finalName,
      price: rawPrice,
      imageUrl: activeImage || productData.imageUrl,
      stock: stockCount 
    });

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const allImages = productData?.imagesAlbum && productData.imagesAlbum.length > 0 
    ? [productData.imageUrl, ...productData.imagesAlbum]
    : [productData?.imageUrl].filter(Boolean);

  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden antialiased direction-rtl pb-32 md:pb-0">
      <Header />

      <main className="w-full px-4 md:px-8 mt-4 md:mt-6 pt-1 pb-16 relative z-10">
        
        {/* بردکرامب */}
        <div className="flex items-center gap-2 text-[11px] md:text-xs font-bold text-slate-400 mb-4 text-right">
          <span className="hover:text-slate-600 cursor-pointer">سیب‌شاپ</span>
          <ChevronRight className="w-3 h-3 text-slate-300" />
          <span className="text-slate-800 truncate max-w-[220px] md:max-w-none">{productData?.name}</span>
        </div>

        {/* کادر اصلی محصول */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5 items-start mb-8">
          
          {/* 📱 ستون اول: گالری عکس فیکس شده */}
          <div className="lg:col-span-5 bg-white border border-slate-100 rounded-3xl p-4 md:p-6 flex flex-col justify-between h-[420px] md:h-[520px] shadow-2xs relative overflow-hidden">
            <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
              <button onClick={() => setIsLiked(!isLiked)} className="w-8 h-8 md:w-9 md:h-9 bg-slate-50/90 backdrop-blur-xs border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 hover:text-rose-500 transition shadow-3xs">
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
              <button className="w-8 h-8 md:w-9 md:h-9 bg-slate-50/90 backdrop-blur-xs border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-700 transition shadow-3xs">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex-1 flex items-center justify-center w-full h-[240px] md:h-[360px] relative p-2 bg-white rounded-2xl">
              {!isAvailable && (
                <div className="absolute top-2 right-2 bg-slate-500 text-white text-[10px] font-black px-3 py-1 rounded-xl z-30 shadow-xs select-none">
                  اتمام موجودی
                </div>
              )}
              
              <img 
                src={activeImage || productData?.imageUrl} 
                alt={productData?.name}
                referrerPolicy="no-referrer-when-downgrade"
                className={`max-h-full max-w-full object-contain mix-blend-multiply select-none transition-all duration-300 ${
                  !isAvailable ? 'grayscale opacity-40' : 'hover:scale-[1.01]'
                }`}
              />
            </div>

            {/* ریزعکس‌های آلبوم گالری */}
            {allImages.length > 1 && (
              <div className="flex items-center justify-start md:justify-center gap-2 mt-4 pt-4 border-t border-slate-100/70 overflow-x-auto scrollbar-none w-full px-1 py-0.5">
                {allImages.map((imgUrl, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(imgUrl)}
                    className={`w-12 h-12 md:w-14 md:h-14 bg-white border p-1 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 overflow-hidden ${
                      activeImage === imgUrl ? 'border-rose-500 ring-2 ring-rose-500/10 scale-105 shadow-xs' : 'border-slate-200/80'
                    }`}
                  >
                    <img src={imgUrl} alt={`زاویه ${index + 1}`} className="max-h-full max-w-full object-contain mix-blend-multiply" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ستون دوم: مشخصات تفکیک‌شده و ویژگی‌ها */}
          <div className="lg:col-span-4 bg-white border border-slate-100 rounded-3xl p-5 flex flex-col justify-between min-h-[380px] md:h-[520px] shadow-2xs text-right">
            <div className="h-full flex flex-col justify-between gap-3">
              <div>
                <h1 className="text-sm md:text-base lg:text-lg font-black text-slate-900 leading-6 md:leading-7 mb-1">{productData?.name}</h1>
                <p className="text-[10px] font-bold text-slate-400 mb-2.5">سیب‌شاپ | اصالت تضمینی کالا</p>

                {/* انتخاب ظرفیت */}
                {productData?.storages && productData.storages.length > 0 && (
                  <div className="mb-3 bg-slate-50/50 p-2.5 rounded-2xl border border-slate-100/60">
                    <span className="text-[11px] font-black text-slate-800 block mb-1.5">انتخاب ظرفیت:</span>
                    <div className="flex flex-wrap gap-2">
                      {productData.storages.map((storage, idx) => (
                        <button key={idx} onClick={() => setSelectedStorage(idx)} className={`px-3 py-1.5 rounded-xl text-[10px] font-bold border transition ${selectedStorage === idx ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}>{storage}</button>
                      ))}
                    </div>
                  </div>
                )}

                {/* انتخاب سایز ساعت هوشمند */}
                {productData?.sizes && productData.sizes.length > 0 && (
                  <div className="mb-3 bg-slate-50/50 p-2.5 rounded-2xl border border-slate-100/60">
                    <span className="text-[11px] font-black text-slate-800 block mb-1.5">اندازه قاب ساعت:</span>
                    <div className="flex flex-wrap gap-2">
                      {productData.sizes.map((size, idx) => (
                        <button key={idx} onClick={() => setSelectedSize(idx)} className={`px-3 py-1.5 rounded-xl text-[10px] font-bold border transition ${selectedSize === idx ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}>{size}</button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 🎨 انتخاب رنگ هوشمند بر اساس کلید نام فارسی */}
                {productData?.colors && productData.colors.length > 0 && (
                  <div className="mb-2 bg-slate-50/50 p-2.5 rounded-2xl border border-slate-100/60">
                    <span className="text-[11px] font-black text-slate-800 block mb-1.5">رنگ: {productData.colors?.[selectedColor]?.name || ''}</span>
                    <div className="flex items-center gap-2.5">
                      {productData.colors.map((color, index) => {
                        const cleanColorName = color.name.trim();
                        const calculatedBg = colorMap[cleanColorName] || (color.class?.startsWith('#') ? color.class : '#cbd5e1');
                        
                        return (
                          <button 
                            key={index} 
                            onClick={() => {
                              setSelectedColor(index);
                              // 📸 سوئیچ عکس شاخص همزمان با ردیف تصاویر آلبوم گالری
                              if (allImages[index]) {
                                setActiveImage(allImages[index]);
                              }
                            }} 
                            className={`w-6 h-6 rounded-full border border-slate-300/70 transition-all ${selectedColor === index ? 'border-rose-500 scale-110 ring-4 ring-rose-500/10 shadow-sm' : 'hover:border-slate-500'}`} 
                            style={{ backgroundColor: calculatedBg }}
                            title={cleanColorName}
                          />
                        );
                      })}
                    </div>
                  </div>
                )}

                {isAvailable && stockCount < 5 && (
                  <div className="mt-3 bg-amber-50 border border-amber-200/60 text-amber-700 px-3 py-2 rounded-xl text-[11px] font-black">
                    ⚠️ تنها {stockCount.toLocaleString('fa-IR')} عدد از این ترکیب در انبار باقی مانده!
                  </div>
                )}
              </div>

              {/* کادر مشخصات فنی */}
              <div className="flex flex-col gap-1.5">
                <div className="grid grid-cols-1 gap-2">
                  {productData?.specs?.map((spec, index) => (
                    <div key={index} className="flex justify-between bg-slate-50/60 px-3 py-1.5 rounded-xl border border-slate-100/30">
                      <span className="text-[11px] font-medium text-slate-400">{spec.title}</span>
                      <span className="text-xs font-bold text-slate-800">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ستون سوم: باکس خرید */}
          <div className={`lg:col-span-3 border text-white rounded-3xl p-6 flex flex-col justify-between h-auto min-h-[380px] md:h-[520px] shadow-xl relative overflow-hidden transition-colors duration-300 ${isAvailable ? 'bg-slate-900 border-slate-950' : 'bg-slate-950/95 border-slate-900'}`}>
            <div className="flex flex-col gap-3.5 z-10">
              <span className="text-[11px] font-black text-slate-400 border-b border-white/5 pb-2.5 block text-right">فروشنده: سیب‌شاپ</span>
              <div className="flex items-center gap-3 text-right px-1">
                <ShieldCheck className="w-5 h-5 shrink-0 text-rose-500" />
                <span className="text-xs font-bold text-slate-200">{productData?.warranty}</span>
              </div>
              <div className="flex items-center gap-3 text-right px-1">
                <Truck className="w-5 h-5 shrink-0 text-rose-500" />
                <span className="text-xs font-bold text-slate-200">ارسال اکسپرس سیب‌شاپ</span>
              </div>
            </div>
            
            <div className="mt-5 pt-4 border-t border-white/5 z-10 flex flex-col gap-4">
              <div className="flex items-center justify-between w-full min-h-[44px] text-right px-1">
                {isAvailable ? (
                  <>
                    <span className="text-xs text-slate-400 font-bold">قیمت ترکیب انتخابی:</span>
                    <div className="flex flex-col items-end">
                      {productData?.oldPrice && <span className="text-[10px] text-slate-500 line-through font-medium">{productData.oldPrice}</span>}
                      <div className="text-base md:text-xl font-black text-white flex items-center gap-1 mt-0.5">
                        <span>{currentPrice}</span>
                        <span className="text-xs font-normal text-slate-400 mr-1">تومان</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <span className="text-xs md:text-sm font-black text-rose-500 bg-rose-500/10 border border-rose-500/20 px-3 py-1.5 rounded-xl w-full text-center">ناموجود در این ترکیب</span>
                )}
              </div>
              
              {isAvailable ? (
                showSuccess ? (
                  <div className="w-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-black py-3.5 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/5 px-4">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>به سبد خرید اضافه شد</span>
                  </div>
                ) : existInCart ? (
                  <div className="flex flex-col gap-3 w-full transition-all duration-300">
                    <div className="w-full bg-slate-800 border border-slate-700/60 py-2.5 px-4 rounded-2xl flex items-center justify-between shadow-inner">
                      <button disabled={existInCart.quantity >= stockCount} onClick={handleIncrement} className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all active:scale-95 ${existInCart.quantity >= stockCount ? 'bg-slate-700/40 text-slate-600 cursor-not-allowed' : 'bg-rose-500 text-white shadow-sm'}`}><Plus className="w-4 h-4" /></button>
                      <div className="flex flex-col items-center select-none">
                        <span className="text-sm font-black text-white">{existInCart.quantity.toLocaleString('fa-IR')}</span>
                        <span className="text-[9px] text-slate-400 font-bold mt-0.5">عدد در سبد</span>
                      </div>
                      <button onClick={handleDecrement} className="w-8 h-8 bg-slate-700 text-white rounded-xl flex items-center justify-center border border-slate-600/40"><Minus className="w-4 h-4" /></button>
                    </div>
                    <Link href="/cart" className="w-full bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-black py-3.5 rounded-2xl flex items-center justify-center gap-2.5 border border-rose-500/30 shadow-md px-4">
                      <ShoppingCart className="w-4 h-4 text-rose-400 shrink-0" />
                      <span>مشاهده و تایید سبد خرید</span>
                      <ArrowLeft className="w-4 h-4 mr-auto bg-rose-500/20 p-0.5 rounded-lg text-rose-300 shrink-0" />
                    </Link>
                  </div>
                ) : (
                  <button onClick={handleAddToCart} className="w-full bg-rose-500 hover:bg-rose-600 text-white font-black text-xs md:text-sm py-3.5 px-4 rounded-2xl shadow-lg transition duration-300 flex items-center justify-center gap-2.5 active:scale-98 cursor-pointer">
                    <ShoppingBag className="w-4 h-4 shrink-0" />
                    <span>افزودن به سبد خرید</span>
                  </button>
                )
              ) : (
                <button disabled className="w-full bg-slate-800 text-slate-500 border border-slate-700 py-3.5 rounded-2xl font-black text-xs md:text-sm flex items-center justify-center gap-2 cursor-not-allowed">
                  <Ban className="w-4 h-4" />
                  <span>ترکیب ناموجود است</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* توضیحات محصول */}
        <div className="w-full bg-white border border-slate-100 rounded-3xl p-5 md:p-6 shadow-2xs mb-8 text-right">
          <div className="flex items-center gap-6 border-b border-slate-100 pb-3 mb-5">
            <button onClick={() => setActiveTab('review')} className={`text-xs md:text-sm font-black pb-2 transition relative ${activeTab === 'review' ? 'text-rose-500' : 'text-slate-400'}`}>
              <span>توضیحات محصول</span>
              {activeTab === 'review' && <span className="absolute bottom-0 inset-x-0 h-0.5 bg-rose-500 rounded-full"></span>}
            </button>
          </div>
          <div className="leading-6 md:leading-7 text-[11px] md:text-sm text-slate-600 font-medium max-w-4xl">
            <p>{productData?.fullSpecs?.[0]?.value || 'توضیحاتی در دسترس نیست.'}</p>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
