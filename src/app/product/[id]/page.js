"use client";

import React, { useState } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { Star, ShieldCheck, Truck, RotateCcw, ShoppingBag, ChevronRight, Heart, Share2, Info, Award, MessageSquare, ThumbsUp } from 'lucide-react';

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
  ],
  comments: [
    { id: 1, user: 'مهدی علوی', date: '۲۵ خرداد ۱۴۰۵', rating: 5, text: 'سرعت پردازنده عالیه، بدنه تایتانیم حس فوق‌العاده سبکی میده. خریدش رو پیشنهاد میکنم.', badge: 'خریدار' },
    { id: 2, user: 'سارا امیدی', date: '۱۸ خرداد ۱۴۰۵', rating: 4, text: 'کیفیت دوربین فوق‌العاده‌ست مخصوصاً زوم ۵ برابری، ولی حتماً باید شارژر اصلی جدا براش بگیرید.', badge: 'خریدار' },
  ]
};

export default function ProductDetailPage() {
  const [selectedColor, setSelectedColor] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState('review');

  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden antialiased direction-rtl">
      <Header />

      {/* هاله‌های آمبیانس نوری */}
      <div className="absolute top-32 left-1/4 w-[500px] h-[500px] bg-rose-500/5 blur-[150px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute top-96 right-1/4 w-[500px] h-[500px] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none z-0"></div>

      {/* تغییر فیکس: پدینگ بالای صفحه از pt-28 به pt-20 کاهش یافت تا باکس به هدر نزدیک شود */}
      <main className="max-w-[1400px] mx-auto px-4 md:px-8 pt-20 pb-16 relative z-10">
        
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
          
          {/* ستون اول: گالری عکس */}
          <div className="lg:col-span-5 bg-white border border-slate-100 rounded-[32px] p-6 flex flex-col justify-between h-[400px] md:h-[500px] shadow-xs relative">
            <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
              <button onClick={() => setIsLiked(!isLiked)} className="w-9 h-9 bg-slate-50 border border-slate-100/70 rounded-xl flex items-center justify-center text-slate-400 hover:text-rose-500 transition-colors shadow-2xs">
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

          {/* ستون دوم: مشخصات برجسته */}
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
                    <button key={index} onClick={() => setSelectedColor(index)} className={`w-7 h-7 rounded-full ${color.class} border-2 transition-all duration-300 ${selectedColor === index ? 'border-rose-500 scale-110 ring-4 ring-rose-500/10 shadow-md' : 'border-slate-200 hover:scale-105'}`} />
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1 text-slate-800 mb-1"><Info className="w-3.5 h-3.5 text-rose-500" /><span className="text-xs font-black">ویژگی‌های مهم:</span></div>
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

          {/* ستون سوم: باکس خرید */}
          <div className="lg:col-span-3 bg-slate-900 border border-slate-950 rounded-[32px] p-5 flex flex-col justify-between min-h-[400px] md:min-h-[500px] shadow-xl text-white relative overflow-hidden">
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-rose-500/10 blur-2xl rounded-full"></div>
            <div className="flex flex-col gap-4 z-10">
              <span className="text-xs font-black text-slate-400 border-b border-white/5 pb-2 block text-right">فروشنده: سیب‌شاپ</span>
              <div className="flex items-start gap-3 text-right">
                <ShieldCheck className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                <div className="flex flex-col"><span className="text-xs font-bold text-white">گارانتی ۱۸ ماهه شرکتی</span><span className="text-[10px] text-slate-400 mt-0.5">تضمین اصالت و خدمات طلایی</span></div>
              </div>
              <div className="flex items-start gap-3 text-right">
                <Truck className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                <div className="flex flex-col"><span className="text-xs font-bold text-white">ارسال اکسپرس سیب‌شاپ</span><span className="text-[10px] text-slate-400 mt-0.5">تحویل فوری درب منزل</span></div>
              </div>
              <div className="flex items-start gap-3 text-right">
                <RotateCcw className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                <div className="flex flex-col"><span className="text-xs font-bold text-white">۷ روز مهلت تست تخصصی</span><span className="text-[10px] text-slate-400 mt-0.5">تعویض کالا در صورت مشکل فنی</span></div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 z-10 flex flex-col gap-4">
              <div className="flex items-center justify-between w-full direction-rtl text-right">
                <span className="text-[10px] text-slate-400 font-bold">قیمت کالا:</span>
                <div className="flex flex-col items-end">
                  <span className="text-[11px] text-slate-500 line-through font-medium">{productData.oldPrice}</span>
                  <div className="text-lg md:text-xl font-black text-white flex items-center gap-0.5 mt-0.5"><span>{productData.price}</span><span className="text-[11px] font-normal text-slate-400 mr-0.5">تومان</span></div>
                </div>
              </div>
              <button className="w-full bg-rose-500 hover:bg-rose-600 text-white font-black text-xs md:text-sm py-3.5 rounded-2xl shadow-lg shadow-rose-500/20 transition-all duration-300 flex items-center justify-center gap-2 group active:scale-98">
                <ShoppingBag className="w-4 h-4 transition-transform group-hover:scale-110" />
                <span>افزودن به سبد خرید</span>
              </button>
            </div>
          </div>
        </div>

        {/* بخش دوم: سیستم تب‌بندی نقد و بررسی */}
        <div className="w-full bg-white border border-slate-100 rounded-[32px] p-6 shadow-xs mb-10 text-right">
          <div className="flex items-center gap-6 border-b border-slate-100 pb-4 mb-6">
            <button onClick={() => setActiveTab('review')} className={`text-sm font-black pb-2 transition-all duration-200 relative ${activeTab === 'review' ? 'text-rose-500' : 'text-slate-400'}`}>
              <span>نقد و بررسی تخصصی</span>
              {activeTab === 'review' && <span className="absolute bottom-0 inset-x-0 h-0.5 bg-rose-500 rounded-full"></span>}
            </button>
            <button onClick={() => setActiveTab('specs')} className={`text-sm font-black pb-2 transition-all duration-200 relative ${activeTab === 'specs' ? 'text-rose-500' : 'text-slate-400'}`}>
              <span>مشخصات فنی کامل</span>
              {activeTab === 'specs' && <span className="absolute bottom-0 inset-x-0 h-0.5 bg-rose-500 rounded-full"></span>}
            </button>
          </div>
          {activeTab === 'review' ? (
            <div className="leading-7 text-xs md:text-sm text-slate-600 font-medium max-w-4xl">
              <p className="mb-4 font-bold text-slate-900 text-sm md:text-base">تایتانیم؛ جهش بزرگ در بدنه آیفون ۱۵ پرو مکس</p>
              <p className="mb-4">آیفون ۱۵ پرو مکس اولین آیفونی است که از بدنه آلیاژ تایتانیم گرید ۵ استفاده می‌کند. این تغییر مهندسی نه تنها مقاومت بدنه را در برابر ضربه و خط‌وخش به شدت بالا برده، بلکه وزن گوشی را به شکل محسوسی کاهش داده است.</p>
              <p>تراشه انقلابی A17 Pro با معماری ۳ نانومتری، اجرای سنگین‌ترین بازی‌های کنسولی را روی این گجت ممکن کرده است.</p>
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

        {/* بخش سوم: محصولات پیشنهادی */}
        <div className="w-full text-right mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Award className="w-5 h-5 text-rose-500" />
            <h3 className="text-base md:text-lg font-black text-slate-900">لوازم جانبی پیشنهادی سیب‌شاپ</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {productData.relatedProducts.map((item) => (
              <div key={item.id} className="bg-white border border-slate-100 rounded-2xl p-4 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between group">
                <div className="bg-slate-50 rounded-xl h-28 md:h-36 flex items-center justify-center text-4xl mb-3 overflow-hidden"><span className="group-hover:scale-110 transition duration-300 select-none">{item.image}</span></div>
                <h4 className="text-xs font-bold text-slate-700 leading-5 line-clamp-2 h-10 mb-3">{item.name}</h4>
                <div className="flex items-center justify-between border-t border-slate-50 pt-2 w-full">
                  <div className="text-xs font-black text-slate-950 flex items-center gap-0.5"><span>{item.price}</span><span className="text-[10px] font-normal text-slate-400">تومان</span></div>
                  <button className="bg-slate-50 text-slate-600 w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs hover:bg-rose-500 hover:text-white transition">＋</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 🌟 بخش چهارم جدید: پنل نظرات و امتیازدهی کاربران فروشگاه */}
        <div className="w-full bg-white border border-slate-100 rounded-[32px] p-6 shadow-xs text-right">
          <div className="flex items-center gap-2 mb-8 border-b border-slate-50 pb-4">
            <MessageSquare className="w-5 h-5 text-rose-500" />
            <h3 className="text-base md:text-lg font-black text-slate-900">دیدگاه کاربران ({productData.reviewCount})</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* کارت چپ: آمار و آنالیز امتیاز محصول */}
            <div className="lg:col-span-4 bg-slate-50/70 border border-slate-100/50 p-6 rounded-2xl flex flex-col items-center justify-center text-center">
              <span className="text-4xl font-black text-slate-900">{productData.rating}</span>
              <div className="flex items-center gap-0.5 my-2">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-xs font-bold text-slate-400 mt-1">از مجموع ۱۴۲ رای ثبت‌شده</p>
              
              {/* پروگرس بار دکوری رضایت */}
              <div className="w-full mt-5 flex flex-col gap-2 text-right">
                <div className="flex items-center justify-between text-[11px] font-black text-slate-600">
                  <span>ارزش خرید نسبت به قیمت</span>
                  <span>۸۵٪</span>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-rose-500 h-full w-[85%] rounded-full"></div>
                </div>
              </div>
            </div>

            {/* کارت راست: لیست کامنت‌های کاربران */}
            <div className="lg:col-span-8 flex flex-col gap-4">
              {productData.comments.map((comment) => (
                <div key={comment.id} className="border border-slate-100 p-4 rounded-2xl flex flex-col gap-3">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-black text-slate-800">{comment.user}</span>
                      <span className="text-[10px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-md font-black">{comment.badge}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-bold">{comment.date}</span>
                  </div>

                  {/* ستاره هر کامنت */}
                  <div className="flex items-center gap-0.5">
                    {[...Array(comment.rating)].map((_, i) => <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />)}
                  </div>

                  <p className="text-xs md:text-sm text-slate-600 leading-6 font-medium">{comment.text}</p>
                  
                  {/* دکمه لایک کامنت مینی‌مال */}
                  <button className="flex items-center gap-1 text-[11px] font-black text-slate-400 hover:text-emerald-500 transition mt-1 mr-auto">
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>مفید بود</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
