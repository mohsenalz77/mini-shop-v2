"use client";

import React, { useState, useEffect } from 'react';
import Header from '../../../components/Header'; 
import Footer from '../../../components/Footer';
import { Star, ShieldCheck, Truck, ShoppingBag, ChevronRight, Heart, Share2, Ban, Plus, Minus, ArrowLeft, ShoppingCart, Check, TrendingUp, X, Scale } from 'lucide-react';
import { useCart } from '../../../context/CartContext'; 
import Link from 'next/link';
import Image from 'next/image';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

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
  const context = useCart() || {};
  const cartItems = context.cartItems || [];
  const addToCart = context.addToCart || (() => {});
  const incrementQuantity = context.incrementQuantity || (() => {});
  const removeFromCart = context.removeFromCart || (() => {});

  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  
  const [isLiked, setIsLiked] = useState(false);
  const [inCompare, setInCompare] = useState(false);
  const [isCopied, setIsCopied] = useState(false);   
  const [activeTab, setActiveTab] = useState('review');
  const [showSuccess, setShowSuccess] = useState(false);
  const [isChartOpen, setIsChartOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newAdv, setNewAdv] = useState('');
  const [newDisadv, setNewDisadv] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(null);

  const [activeImage, setActiveImage] = useState(productData?.imageUrl || '/placeholder.png');
  
  // ⚡️ لود مطمئن قیمت و موجودی از ریشه به عنوان لایه پشتیبان (Fallback)
  const [currentPrice, setCurrentPrice] = useState(productData?.rawPrice || 0);
  const [currentOldPrice, setCurrentOldPrice] = useState(productData?.oldPrice || null);
  const [currentStock, setCurrentStock] = useState(productData?.stock || 0);

  const [mockUser, setMockUser] = useState({ id: 1, phoneNumber: "09123456789" });

  useEffect(() => {
    setIsMounted(true);
    if (productData?.id) {
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      setIsLiked(wishlist.includes(productData.id));

      const compareList = JSON.parse(localStorage.getItem('compare_list') || '[]');
      setInCompare(compareList.includes(productData.id));
    }
  }, [productData?.id]);

  // 🔄 فیکس نهایی منطق تغییر رنگ بر اساس فیلد discountPrice و راه‌حل Fallback قیمت ریشه
  useEffect(() => {
    if (productData?.variants && productData.variants.length > 0) {
      const activeColorName = productData.colors?.[selectedColor]?.name;
      const activeSizeName = productData.sizes?.[selectedSize];

      const matchedVariant = productData.variants.find(v => {
        const matchColor = activeColorName 
          ? v.options.some(o => (o.type?.toLowerCase() === 'color' || o.type === 'رنگ') && o.value === activeColorName) 
          : true;
        const matchSize = activeSizeName 
          ? v.options.some(o => (o.type?.toLowerCase() === 'size' || o.type === 'سایز') && o.value === activeSizeName) 
          : true;
        return matchColor && matchSize;
      });

      if (matchedVariant) {
        const vPrice = Number(matchedVariant.price);
        setCurrentPrice(vPrice > 0 ? vPrice : (Number(productData.rawPrice) || 0));
        
        if (matchedVariant.discountPrice && Number(matchedVariant.discountPrice) > 0) {
          setCurrentOldPrice(Number(matchedVariant.discountPrice).toLocaleString('fa-IR'));
        } else {
          setCurrentOldPrice(productData.oldPrice);
        }
        setCurrentStock(matchedVariant.stock !== undefined ? Number(matchedVariant.stock) : Number(productData.stock));
      } else {
        setCurrentPrice(Number(productData.rawPrice) || 0);
        setCurrentOldPrice(productData.oldPrice);
        setCurrentStock(Number(productData.stock) || 0);
      }
    } else {
      setCurrentPrice(Number(productData.rawPrice) || 0);
      setCurrentOldPrice(productData.oldPrice);
      setCurrentStock(Number(productData.stock) || 0);
    }
  }, [selectedColor, selectedSize, productData]);

  useEffect(() => {
    if (productData?.imageUrl) {
      setActiveImage(productData.imageUrl);
    }
  }, [productData]);

  const handleLikeToggle = () => {
    let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    if (wishlist.includes(productData.id)) {
      wishlist = wishlist.filter(id => id !== productData.id);
      setIsLiked(false);
    } else {
      wishlist.push(productData.id);
      setIsLiked(true);
    }
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  };

  const handleShareLink = async () => {
    try {
      if (typeof window !== 'undefined') {
        await navigator.clipboard.writeText(window.location.href);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2500);
      }
    } catch (err) {
      console.error('خطا در کپی لینک:', err);
    }
  };

  const handleCompareToggle = () => {
    let compareList = JSON.parse(localStorage.getItem('compare_list') || '[]');
    if (compareList.includes(productData.id)) {
      compareList = compareList.filter(id => id !== productData.id);
      setInCompare(false);
    } else {
      if (compareList.length >= 3) {
        alert('حداکثر ۳ کالا را می‌توانید همزمان مقایسه کنید.');
        return;
      }
      compareList.push(productData.id);
      setInCompare(true);
    }
    localStorage.setItem('compare_list', JSON.stringify(compareList));
  };

  const stockCount = currentStock !== undefined ? currentStock : 0;
  const isAvailable = stockCount > 0;

  const uniqueCartId = `${productData?.id}-${selectedColor}`;
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
    const finalName = `${productData.name} (رنگ ${productData.colors?.[selectedColor]?.name || ''})`;

    addToCart({
      id: uniqueCartId,
      name: finalName,
      price: currentPrice, 
      imageUrl: activeImage || productData.imageUrl,
      stock: stockCount 
    });

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!newTitle || !newComment) {
      setSubmitMessage({ type: 'error', text: 'لطفاً عنوان و متن نظر را وارد کنید.' });
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://b.dr-sib.xyz/api";
      const payload = {
        data: {
          title: newTitle,
          comment: newComment,
          rating: Number(newRating),
          advantages: newAdv, 
          disadvantages: newDisadv,
          is_approved: false, 
          product: productData.id,
          users_permissions_user: mockUser ? mockUser.id : null 
        }
      };

      const response = await fetch(`${apiUrl}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setSubmitMessage({ type: 'success', text: 'دیدگاه شما با موفقیت ثبت شد و پس از تایید نمایش داده می‌شود.' });
        setNewTitle('');
        setNewComment('');
        setNewAdv('');
        setNewDisadv('');
        setNewRating(5);
        setTimeout(() => setIsCommentModalOpen(false), 2500);
      } else {
        setSubmitMessage({ type: 'error', text: 'خطایی در ثبت نظر رخ داد.' });
      }
    } catch (error) {
      setSubmitMessage({ type: 'error', text: 'اتصال به سرور برقرار نشد.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const allImages = productData?.imagesAlbum && productData.imagesAlbum.length > 0 
    ? [productData.imageUrl, ...productData.imagesAlbum]
    : [productData?.imageUrl].filter(Boolean);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border border-slate-800 text-white p-3 rounded-xl shadow-md text-xs font-black direction-rtl text-right">
          <p className="mb-1 text-slate-400">تاریخ: {payload[0].payload.date}</p>
          <p className="text-rose-400">قیمت: {Number(payload[0].value).toLocaleString('fa-IR')} تومان</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden antialiased direction-rtl pb-32 md:pb-0">
      <Header />

      <main className="w-full px-4 md:px-8 mt-4 md:mt-6 pt-1 pb-16 relative z-10">
        
        <div className="flex items-center gap-2 text-[11px] md:text-xs font-bold text-slate-400 mb-4 text-right">
          <span className="hover:text-slate-600 cursor-pointer">سیب‌شاپ</span>
          <ChevronRight className="w-3 h-3 text-slate-300" />
          <span className="text-slate-800 truncate max-w-[220px] md:max-w-none">{productData?.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5 items-start mb-8">
          
          {/* ستون اول: گالری عکس */}
          <div className="lg:col-span-5 bg-white border border-slate-100 rounded-3xl p-4 md:p-6 flex flex-col justify-between h-[420px] md:h-[520px] shadow-2xs relative overflow-hidden">
            <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
              <button onClick={handleLikeToggle} className="w-8 h-8 md:w-9 md:h-9 bg-slate-50/90 backdrop-blur-xs border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 hover:text-rose-500 transition shadow-3xs cursor-pointer">
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}`} />
              </button>
              <button onClick={handleCompareToggle} className="w-8 h-8 md:w-9 md:h-9 bg-slate-50/90 backdrop-blur-xs border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 hover:text-amber-500 transition shadow-3xs cursor-pointer">
                <Scale className={`w-4 h-4 ${inCompare ? 'text-amber-500 fill-amber-500/10' : 'text-slate-400'}`} />
              </button>
              <button onClick={() => setIsChartOpen(true)} className="w-8 h-8 md:w-9 md:h-9 bg-slate-50/90 backdrop-blur-xs border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 hover:text-blue-600 transition shadow-3xs cursor-pointer">
                <TrendingUp className="w-4 h-4" />
              </button>
              <div className="relative group">
                <button onClick={handleShareLink} className="w-8 h-8 md:w-9 md:h-9 bg-slate-50/90 backdrop-blur-xs border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-700 transition shadow-3xs cursor-pointer">
                  <Share2 className="w-4 h-4" />
                </button>
                {isCopied && (
                  <span className="absolute right-full top-1/2 -translate-y-1/2 ml-2 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-md whitespace-nowrap z-50">
                    لینک کپی شد! ✨
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex-1 flex items-center justify-center w-full h-[240px] md:h-[360px] relative p-2 bg-white rounded-2xl">
              {!isAvailable && (
                <div className="absolute top-2 right-2 bg-slate-500 text-white text-[10px] font-black px-3 py-1 rounded-xl z-30 shadow-xs">
                  اتمام موجودی
                </div>
              )}
              
              {activeImage && (
                <div className="w-full h-full relative flex items-center justify-center">
                  <Image 
                    src={activeImage} 
                    alt={productData?.name || "تصویر کالا"}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    priority
                    unoptimized={true}
                    className={`object-contain mix-blend-multiply select-none transition-all duration-300 ${
                      !isAvailable ? 'grayscale opacity-40' : 'hover:scale-[1.01]'
                    }`}
                  />
                </div>
              )}
            </div>

            {allImages.length > 1 && (
              <div className="flex items-center justify-start md:justify-center gap-2 mt-4 pt-4 border-t border-slate-100/70 overflow-x-auto scrollbar-none w-full px-1 py-0.5">
                {allImages.map((imgUrl, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(imgUrl)}
                    className={`w-12 h-12 md:w-14 md:h-14 bg-white border p-1 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 overflow-hidden cursor-pointer relative ${
                      activeImage === imgUrl ? 'border-rose-500 ring-2 ring-rose-500/10 scale-105 shadow-xs' : 'border-slate-200/80'
                    }`}
                  >
                    <Image src={imgUrl} alt={`زاویه ${index + 1}`} fill unoptimized={true} className="object-contain p-1 mix-blend-multiply" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ستون دوم: مشخصات تفکیک‌شده */}
          <div className="lg:col-span-4 bg-white border border-slate-100 rounded-3xl p-6 flex flex-col justify-between h-fit lg:min-h-[520px] shadow-2xs text-right">
            <div className="h-full flex flex-col justify-start gap-5">
              <div>
                <h1 className="text-lg md:text-xl lg:text-2xl font-extrabold text-slate-900 leading-8 tracking-tight mb-2">
                  {productData?.name}
                </h1>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">اصالت تضمینی</span>
                  <p className="text-xs font-bold text-slate-400">سیب‌شاپ | مشخصات و گارانتی رسمی</p>
                </div>
              </div>

              {productData?.colors && productData.colors.length > 0 && (
                <div className="border-t border-slate-100/80 pt-4">
                  <span className="text-xs font-black text-slate-800 block mb-3">
                    رنگ: <span className="text-slate-500 font-bold">{productData.colors?.[selectedColor]?.name || ''}</span>
                  </span>
                  <div className="flex items-center gap-3">
                    {productData.colors.map((color, index) => {
                      const cleanColorName = color.name.trim();
                      const calculatedBg = colorMap[cleanColorName] || (color.class?.startsWith('#') ? color.class : '#cbd5e1');
                      
                      return (
                        <button 
                          key={index} 
                          onClick={() => {
                            setSelectedColor(index);
                            if (allImages[index]) {
                              setActiveImage(allImages[index]);
                            }
                          }} 
                          className={`w-8 h-8 rounded-full border border-slate-300/60 transition-all duration-200 cursor-pointer ${
                            selectedColor === index ? 'border-rose-500 scale-110 ring-4 ring-rose-500/15 shadow-md' : 'hover:border-slate-500'
                          }`} 
                          style={{ backgroundColor: calculatedBg }}
                        />
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="border-t border-slate-100/80 pt-4">
                <div className="bg-blue-50/40 border border-blue-100/70 rounded-2xl p-3 flex items-center justify-between text-right select-none">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[11px] font-black text-blue-900">🚀 تحویل اکسپرس سیب‌شاپ</span>
                    <span className="text-[10px] text-blue-700/80 font-bold">{productData?.deliveryTime}</span>
                  </div>
                  <span className="text-xl">📦</span>
                </div>
              </div>
            </div>

            {productData?.specs && productData.specs.length > 0 && (
              <div className="mt-8 pt-4 border-t border-slate-100">
                <span className="text-xs font-black text-slate-800 block mb-3">ویژگی‌های کلیدی محصول:</span>
                <div className="grid grid-cols-1 gap-2.5">
                  {productData.specs.slice(0, 3).map((spec, index) => (
                    <div key={index} className="flex justify-between bg-slate-50/60 px-4 py-3 rounded-xl border border-slate-100/50 transition-all hover:bg-slate-100/80">
                      <span className="text-xs font-bold text-slate-400">{spec.title}</span>
                      <span className="text-xs font-black text-slate-700">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
                      {currentOldPrice && <span className="text-[10px] text-slate-500 line-through font-medium">{currentOldPrice}</span>}
                      <div className="text-base md:text-xl font-black text-white flex items-center gap-1 mt-0.5">
                        <span>{Number(currentPrice).toLocaleString('fa-IR')}</span>
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

        {/* بخش نظرات */}
        <div className="w-full bg-white border border-slate-100 rounded-3xl p-5 md:p-6 shadow-2xs mb-8 text-right">
          <div className="flex items-center gap-6 border-b border-slate-100 pb-3 mb-5">
            <button onClick={() => setActiveTab('review')} className={`text-xs md:text-sm font-black pb-2 transition relative cursor-pointer ${activeTab === 'review' ? 'text-rose-500' : 'text-slate-400'}`}>
              <span>توضیحات محصول</span>
              {activeTab === 'review' && <span className="absolute bottom-0 inset-x-0 h-0.5 bg-rose-500 rounded-full"></span>}
            </button>
            <button onClick={() => setActiveTab('comments')} className={`text-xs md:text-sm font-black pb-2 transition relative cursor-pointer ${activeTab === 'comments' ? 'text-rose-500' : 'text-slate-400'}`}>
              <span>دیدگاه کاربران ({productData?.reviewCount || 0})</span>
              {activeTab === 'comments' && <span className="absolute bottom-0 inset-x-0 h-0.5 bg-rose-500 rounded-full"></span>}
            </button>
          </div>

          {activeTab === 'review' ? (
            <div className="leading-6 md:leading-7 text-[11px] md:text-sm text-slate-600 font-medium max-w-4xl whitespace-pre-line">
              <p>{productData?.fullSpecs?.[0]?.value || 'توضیحاتی در دسترس نیست.'}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-4 bg-slate-50/70 border border-slate-100 p-5 rounded-2xl flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-black text-slate-800 mb-1">{productData?.rating || 0}</span>
                <div className="flex gap-0.5 text-amber-400 mb-2">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <button onClick={() => setIsCommentModalOpen(true)} className="w-full bg-white border border-slate-200 hover:bg-slate-900 hover:text-white transition-all text-slate-800 text-xs font-black py-2.5 rounded-xl cursor-pointer shadow-3xs">
                  نوشتن دیدگاه برای این کالا
                </button>
              </div>

              <div className="lg:col-span-8 flex flex-col gap-5">
                {productData?.reviewsList && productData.reviewsList.length > 0 ? (
                  productData.reviewsList.map((rev) => {
                    const advList = typeof rev.advantages === 'string' ? rev.advantages.split(/[،,]/).filter(Boolean) : [];
                    const disadvList = typeof rev.disadvantages === 'string' ? rev.disadvantages.split(/[،,]/).filter(Boolean) : [];

                    return (
                      <div key={rev.id} className="border-b border-slate-100/80 pb-5 text-right last:border-none">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="bg-emerald-50 text-emerald-600 text-[10px] font-black px-2 py-0.5 rounded-md flex items-center gap-1">
                            {rev.rating} <Star className="w-2.5 h-2.5 fill-emerald-600 text-emerald-600" />
                          </span>
                          <h4 className="text-xs md:text-sm font-black text-slate-800">{rev.title}</h4>
                        </div>
                        <p className="text-[11px] md:text-xs text-slate-600 font-medium leading-6 mb-3">{rev.comment}</p>

                        {advList.length > 0 && (
                          <div className="flex flex-col gap-1.5 mb-2">
                            {advList.map((adv, i) => (
                              <span key={i} className="text-[10px] md:text-xs font-bold text-emerald-600 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> {adv.trim()}
                              </span>
                            ))}
                          </div>
                        )}

                        {disadvList.length > 0 && (
                          <div className="flex flex-col gap-1.5">
                            {disadvList.map((dis, i) => (
                              <span key={i} className="text-[10px] md:text-xs font-bold text-rose-500 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> {dis.trim()}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <p className="text-xs font-bold text-slate-400 py-6 text-center">هنوز هیچ دیدگاهی ثبت نشده است.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* مودال ثبت نظر */}
      {isCommentModalOpen && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg p-5 md:p-6 shadow-2xl relative text-right animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <h3 className="text-sm md:text-base font-black text-slate-900">ثبت دیدگاه</h3>
              <button onClick={() => setIsCommentModalOpen(false)} className="w-7 h-7 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-800 transition cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleReviewSubmit} className="flex flex-col gap-3">
              <div>
                <label className="text-xs font-black text-slate-700 block mb-1.5">امتیاز شما:</label>
                <div className="flex items-center gap-1.5 direction-ltr justify-end">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} type="button" onClick={() => setNewRating(star)} className="text-amber-400 transition transform active:scale-90 cursor-pointer">
                      <Star className={`w-5 h-5 ${star <= newRating ? 'fill-amber-400' : 'text-slate-300'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-black text-slate-700 block mb-1">عنوان دیدگاه:</label>
                <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="مثلاً: عالی و پرسرعت" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-rose-500" />
              </div>

              <div>
                <label className="text-xs font-black text-slate-700 block mb-1">متن دیدگاه شما:</label>
                <textarea rows="3" value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="تجربه کاربری خود را بنویسید..." className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-rose-500 resize-none" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-black text-emerald-600 block mb-1">نقاط قوت:</label>
                  <input type="text" value={newAdv} onChange={(e) => setNewAdv(e.target.value)} placeholder="سرعت بالا" className="w-full bg-emerald-50/30 border border-emerald-100 rounded-xl p-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-500" />
                </div>
                <div>
                  <label className="text-xs font-black text-rose-500 block mb-1">نقاط ضعف:</label>
                  <input type="text" value={newDisadv} onChange={(e) => setNewDisadv(e.target.value)} placeholder="قیمت بالا" className="w-full bg-rose-50/30 border border-rose-100 rounded-xl p-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-rose-500" />
                </div>
              </div>

              {submitMessage && (
                <div className={`p-3 rounded-xl text-xs font-bold text-center mt-1 border ${submitMessage.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-rose-50 border-rose-200 text-rose-700'}`}>
                  {submitMessage.text}
                </div>
              )}

              <button type="submit" disabled={isSubmitting} className="w-full bg-rose-500 hover:bg-rose-600 text-white text-xs font-black py-3 rounded-xl shadow-md transition-all mt-2 cursor-pointer disabled:bg-slate-300">
                {isSubmitting ? 'در حال ارسال اطلاعات...' : 'ثبت دیدگاه'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* مودال نمودار قیمت */}
      {isChartOpen && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl p-5 md:p-6 shadow-2xl relative text-right flex flex-col justify-between animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-5">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <h3 className="text-sm md:text-base font-black text-slate-900">نمودار نوسان قیمت {productData?.name}</h3>
              </div>
              <button onClick={() => setIsChartOpen(false)} className="w-7 h-7 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-800 transition cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="w-full h-[260px] md:h-[320px] direction-ltr pr-4">
              {isMounted && productData?.priceHistoryList && productData.priceHistoryList.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={productData.priceHistoryList} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 'bold' }} stroke="#cbd5e1" />
                    <YAxis tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 'bold' }} stroke="#cbd5e1" width={55} tickFormatter={(val) => `${(val / 1000000).toLocaleString('fa-IR')}M`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="price" stroke="#f43f5e" strokeWidth={3} dot={{ r: 4, stroke: '#f43f5e', strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-center text-xs font-bold text-slate-400 direction-rtl">
                  اطلاعات کافی برای رسم نمودار نوسان قیمت در دیتابیس یافت نشد.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
