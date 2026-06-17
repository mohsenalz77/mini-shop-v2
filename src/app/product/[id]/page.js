"use client";

import React, { useState } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { Star, ShieldCheck, Truck, RotateCcw, ShoppingBag, ChevronRight, Heart, Share2, Info, MessageSquare, Award } from 'lucide-react';

const productData = {
  id: 1,
  name: 'گوشی موبایل اپل مدل iPhone 15 Pro Max دو سیم‌کارت - ظرفیت ۲۵۶ گیگابایت',
  englishName: 'Apple iPhone 15 Pro Max Dual SIM 256GB Mobile Phone',
  price: '۶۷,۴۰۰,۰۰۰',
  oldPrice: '۷۱,۲۰۰,۰۰۰',
  rating: '۴.۸',
  reviewCount: '۱۴۲ دیدگاه',
  image: '📱',
  colors: [
    { name: 'تایتانیم طبیعی', class: 'bg-stone-400' },
    { name: 'تایتانیم مشکی', class: 'bg-zinc-800' },
    { name: 'تایتانیم سفید', class: 'bg-slate-100' },
  ],
  specs: [
    { title: 'حافظه داخلی', value: '۲۵۶ گیگابایت' },
    { title: 'حافظه رم', value: '۸ گیگابایت' },
    { title: 'اندازه صفحه نمایش', value: '۶.۷ اینچ' },
    { title: 'شبکه ارتباطی', value: '5G' },
    { title: 'فناوری صفحه', value: 'LTPO Super Retina' },
    { title: 'تعداد دوربین', value: '۳ ماژول حرفه‌ای' },
  ],
  fullSpecs: [
    { label: 'تراشه', value: 'Apple A17 Pro (۳ نانومتری)' },
    { label: 'وزن', value: '۲۲۱ گرم' },
    { label: 'جنس بدنه', value: 'تایتانیم درجه ۵ (گرید هوافضا)' },
    { label: 'باتری', value: '۴۴۴۱ میلی‌آمپر ساعت' },
    { label: 'نرخ نوسازی صفحه', value: '۱۲۰ هرتز (ProMotion)' },
  ],
  relatedProducts: [
    { id: 2, name: 'شارژر دیواری انکر مدل Nano ۲۰W', price: '۸۹۰,۰۰۰', image: '🔌' },
    { id: 3, name: 'هدفون بی‌سیم اپل مدل AirPods Pro 2', price: '۱۰,۴۰۰,۰۰۰', image: '🎧' },
    { id: 4, name: 'پاوربانک بیسوس ۲۰ هزار فست شارژ', price: '۱,۸۵۰,۰۰۰', image: '🔋' },
    { id: 5, name: 'قاب محافظ مگ‌سیف نیلکین آیفون ۱۵', price: '۹۸۰,۰۰۰', image: '🛡️' },
  ]
};

export default function ProductDetailPage() {
  const [selectedColor, setSelectedColor] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState('review'); // مدیریت تب‌ها

  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden antialiased direction-rtl">
      <Header />

      {/* هاله‌های آمبیانس نوری در بک‌گراند */}
      <div className="absolute top-32 left-1/4 w-[500px] h-[500px] bg-rose-500/5 blur-[150px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute top-96 right-1/4 w-[500px] h-[500px] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none z-0"></div>

      {/* تغییر طلایی: افزایش عرض کادر به 1400px برای نزدیک شدن باکس‌ها به کناره‌های صفحه */}
      <main className="max-w-[1400px] mx-auto px-4 md:px-8 pt-28 pb-16 relative z-10">
        
        {/* بردکرامب مینی‌مال */}
        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-6 text-right">
          <span className="hover:text-slate-600 cursor-pointer">سیب‌شاپ</span>
          <ChevronRight className="w-3 h-3" />
          <span className="hover:text-slate-600 cursor-pointer">گوشی موبایل</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-800 truncate">{productData.name}</span>
        </div>

        {/* بخش اول: کادر اصلی سه ستونه محصول */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-10">
          
          {/* ستون اول (سمت راست): گالری عکس لوکس */}
          <div className="lg:col-span-5 bg-white border border-slate-100 rounded-[32px] p-6 flex flex-col justify-between h-[400px] md:h-[500px] shadow-xs relative">
            <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
              <button 
                onClick={() => setIsLiked(!isLiked)}
                className="w-9 h-9 bg-slate-50 border border-slate-100/70 rounded-xl flex items-center justify-center text-slate-400 hover:text-rose-500 transition-colors shadow-2xs"
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
              <button className="w-9 h-9 bg-slate-50 border border-slate-100/70 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-700 transition-colors shadow-2xs">
                <Share2 className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 flex items-center justify-center rounded-2xl">
              <span className="text-9xl filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.12)] select-none transform hover:scale-105 transition-transform duration-500">
                {productData.image}
              </span>
            </div>

            <div className="flex gap-2.5 justify-center mt-4">
              <div className="w-12 h-12 bg-slate-50 border-2 border-rose-500 rounded-xl flex items-center justify-center text-xl cursor-pointer">📱</div>
              <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-xl opacity-60 hover:opacity-100 transition cursor-pointer">📸</div>
              <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-xl opacity-60 hover:opacity-100 transition cursor-pointer">📦</div>
            </div>
          </div>

          {/* ستون دوم (وسط): مشخصات برجسته کالا */}
          <div className="lg:col-span-4 bg-white border border-slate-100 rounded-[32px] p-6 flex flex-col justify-between min-h-[400px] md:min-h-[500px] shadow-xs text-right">
            <div>
              <h1 className="text-base md:text-lg font-black text-slate-900 leading-7 mb-1">{productData.name}</h1>
              <p className="text-[10px] font-bold text-slate-400 font-sans tracking-wide mb-4 text-left direction-ltr">{productData.englishName}</p>

              <div className="flex items-center gap-1.5 mb-5 bg-slate-50/80 px-3 py-1 rounded-xl border border-slate-100/50 w-fit">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="text-xs font-black text-slate-700">{productData.rating}</span>
                <span className="text-[10px] text-slate-400 font-bold">({productData.reviewCount})</span>
              </div>

              <div className="mb-5 bg-slate-50/50 p-3 rounded-2xl border border-slate-100/60">
                <span className="text-xs font-black text-slate-800 block mb-2.5">رنگ: {productData.colors[selectedColor].name}</span>
                <div className="flex items-center gap-2.5">
                  {productData.colors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(index)}
                      className={`w-7 h-7 rounded-full ${color.class} border-2 transition-all duration-300 ${
                        selectedColor === index ? 'border-rose-500 scale-110 ring-4 ring-rose-500/10 shadow-md' : 'border-slate-200 hover:scale-105'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1 text-slate-800 mb-1">
                  <Info className="w-3.5 h-3.5 text-rose-500" />
                  <span className="text-xs font-black">ویژگی‌های مهم:</span>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {productData.specs.map((spec, index) => (
                    <div key={index} className="flex items-center justify-between bg-slate-50/60 px-3 py-2 rounded-xl border border-slate-100/30">
                      <span className="text-[11px] font-medium text-slate-400">{spec.title}</span>
                      <span className="text-xs font-bold text-slate-800">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ستون سوم (سمت چپ): باکس خرید و گارانتی هوشمند */}
          <div className="lg:col-span-3 bg-slate-900 border border-slate-950 rounded-[32px] p-5 flex flex-col justify-between min-h-[400px] md:min-h-[500px] shadow-xl text-white relative overflow-hidden">
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-rose-500/10 blur-2xl rounded-full"></div>
            
            <div className="flex flex-col gap-4 z-10">
              <span className="text-xs font-black text-slate-400 border-b border-white/5 pb-2 block text-right">فروشنده: سیب‌شاپ</span>
              
              <div className="flex items-start gap-3 text-right">
                <ShieldCheck className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white">گارانتی ۱۸ ماهه شرکتی</span>
                  <span className="text-[10px] text-slate-400 mt-0.5">تضمین اصالت و خدمات طلایی</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-right">
                <Truck className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white">ارسال اکسپرس سیب‌شاپ</span>
                  <span className="text-[10px] text-slate-400 mt-0.5">تحویل فوری درب منزل</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-right">
                <RotateCcw className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white">۷ روز مهلت تست تخصصی</span>
                  <span className="text-[10px] text-slate-400 mt-0.5">تعویض کالا در صورت مشکل فنی</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 z-10 flex flex-col gap-4">
              <div className="flex items-center justify-between w-full direction-rtl text-right">
                <span className="text-[10px] text-slate-400 font-bold">قیمت کالا:</span>
                <div className="flex flex-col items-end">
                  <span className="text-[11px] text-slate-500 line-through font-medium">{productData.oldPrice}</span>
                  <div className="text-lg md:text-xl font-black text-white flex items-center gap-0.5 mt-0.5">
                    <span>{productData.price}</span>
                    <span className="text-[11px] font-normal text-slate-400 mr-0.5">تومان</span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-rose-500 hover:bg-rose-600 text-white font-black text-xs md:text-sm py-3.5 rounded-2xl shadow-lg shadow-rose-500/20 transition-all duration-300 flex items-center justify-center gap-2 group active:scale-98">
                <ShoppingBag className="w-4 h-4 transition-transform group-hover:scale-110" />
                <span>افزودن به سبد خرید</span>
              </button>
            </div>
          </div>
        </div>

        {/* بخش دوم جدید: سیستم تب‌بندی توصیف و مشخصات کامل فنی زیر محصول */}
        <div className="w-full bg-white border border-slate-100 rounded-[32px] p-6 shadow-xs mb-10 text-right">
          {/* دکمه‌های کنترل تب */}
          <div className="flex items-center gap-6 border-b border-slate-100 pb-4 mb-6">
            <button 
              onClick={() => setActiveTab('review')}
              className={`text-sm font-black pb-2 transition-all duration-200 relative ${activeTab === 'review' ? 'text-rose-500' : 'text-slate-400'}`}
            >
              <span>نقد و بررسی تخصصی</span>
              {activeTab === 'review' && <span className="absolute bottom-0 inset-x-0 h-0.5 bg-rose-500 rounded-full"></span>}
            </button>
            <button 
              onClick={() => setActiveTab('specs')}
              className={`text-sm font-black pb-2 transition-all duration-200 relative ${activeTab === 'specs' ? 'text-rose-500' : 'text-slate-400'}`}
            >
              <span>مشخصات فنی کامل</span>
              {activeTab === 'specs' && <span className="absolute bottom-0 inset-x-0 h-0.5 bg-rose-500 rounded-full"></span>}
            </button>
          </div>

          {/* محتوای متغیر تب‌ها */}
          {activeTab === 'review' ? (
            <div className="leading-7 text-xs md:text-sm text-slate-600 font-medium max-w-4xl">
              <p className="mb-4 font-bold text-slate-900 text-sm md:text-base">تایتانیم؛ جهش بزرگ در بدنه آیفون ۱۵ پرو مکس</p>
              <p className="mb-4">آیفون ۱۵ پرو مکس اولین آیفونی است که از بدنه آلیاژ تایتانیم گرید ۵ استفاده می‌کند. این تغییر مهندسی نه تنها مقاومت بدنه را در برابر ضربه و خط‌وخش به شدت بالا برده، بلکه وزن گوشی را به شکل محسوسی کاهش داده است تا دست شما در استفاده طولانی‌مدت اصلاً خسته نشود.</p>
              <p>تراشه انقلابی A17 Pro با معماری ۳ نانومتری، اجرای سنگین‌ترین بازی‌های کنسولی را روی این گجت ممکن کرده است. در کنار آن، سنسور پریسکوپی جدید دوربین امکان زوم ۵ برابری اپتیکال بدون افت ذره‌ای از کیفیت را در اختیارتان می‌گذارد.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
              {productData.fullSpecs.map((fSpec, idx) => (
                <div key={idx} className="flex items-center justify-between bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                  <span className="text-xs font-bold text-slate-400">{fSpec.label}</span>
                  <span className="text-xs font-black text-slate-800">{fSpec.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* بخش سوم جدید: ریل افقی محصولات مرتبط و لوازم جانبی پیشنهادی */}
        <div className="w-full text-right mb-6">
          <div className="flex items-center gap-2 mb-6">
            <Award className="w-5 h-5 text-rose-500" />
            <h3 className="text-base md:text-lg font-black text-slate-900">لوازم جانبی پیشنهادی سیب‌شاپ</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {productData.relatedProducts.map((item) => (
              <div key={item.id} className="bg-white border border-slate-100 rounded-2xl p-4 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between group">
                <div className="bg-slate-50 rounded-xl h-28 md:h-36 flex items-center justify-center text-4xl mb-3 overflow-hidden">
                  <span className="group-hover:scale-110 transition duration-300 select-none">{item.image}</span>
                </div>
                <h4 className="text-xs font-bold text-slate-700 leading-5 line-clamp-2 h-10 mb-3">{item.name}</h4>
                <div className="flex items-center justify-between border-t border-slate-50 pt-2 w-full">
                  <div className="text-xs font-black text-slate-950 flex items-center gap-0.5">
                    <span>{item.price}</span>
                    <span className="text-[10px] font-normal text-slate-400">تومان</span>
                  </div>
                  <button className="bg-slate-50 text-slate-600 w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs hover:bg-rose-500 hover:text-white transition">＋</button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
