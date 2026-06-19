"use client";

import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { SlidersHorizontal, ArrowUpDown, Smartphone, Percent, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '../../context/CartContext'; 

export default function ProductsPage() {
  const { addToCart } = useCart(); 
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('https://b.dr-sib.xyz/api/products?populate=*', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          setProducts(data.data || []);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 direction-rtl antialiased flex flex-col justify-between">
      <Header />

      {/* 🌌 بنر کادربندی‌شده و مدرن بالای محصولات (هماهنگ با پهنای هدر) */}
      <div className="w-full max-w-[1450px] mx-auto px-4 md:px-8 mt-4 md:mt-6">
        <div className="relative bg-gradient-to-l from-slate-950 to-slate-900 text-white py-8 md:py-12 px-6 md:px-10 overflow-hidden rounded-3xl border border-slate-900 shadow-lg text-right">
          <div className="absolute top-0 right-1/4 w-[250px] h-[250px] bg-rose-500/10 blur-[90px] rounded-full pointer-events-none"></div>
          <div className="relative z-10">
            <span className="text-rose-500 font-black text-[10px] md:text-xs uppercase bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
              فروشگاه آنلاین
            </span>
            <h1 className="text-xl md:text-3xl font-black mt-2.5 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              بررسی و خرید انواع گوشی موبایل
            </h1>
            <p className="hidden md:block text-xs text-slate-400 mt-2 max-w-xl font-medium leading-6">
              جدیدترین پرچمداران و میان‌رده‌های بازار را با گارانتی معتبر شرکتی و ارسال اکسپرس از سیب‌شاپ تهیه کنید.
            </p>
          </div>
        </div>
      </div>

      {/* 🏪 بخش اصلی فروشگاه (باز شده تا ۱۴۵۰ پیکسل) */}
      <main className="w-full max-w-[1450px] mx-auto px-4 md:px-8 py-4 md:py-8 flex-1">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          
          {/* 🛡️ فیلترهای سایدبار دسکتاپ */}
          <aside className="hidden lg:block lg:col-span-3 bg-white border border-slate-100 rounded-3xl p-5 sticky top-24 text-right shadow-3xs">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100 mb-4">
              <SlidersHorizontal className="w-4 h-4 text-slate-800" />
              <h3 className="text-sm font-black text-slate-800">فیلترهای پیشرفته</h3>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-black text-slate-500">وضعیت موجودی</span>
                <label className="flex items-center gap-2 text-xs font-bold text-slate-700 mt-1 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded-md accent-rose-500 w-4 h-4" />
                  <span>فقط کالاهای موجود</span>
                </label>
              </div>
            </div>
          </aside>

          {/* ستون محصولات */}
          <div className="lg:col-span-9 w-full">
            
            {/* 📱 نوار ابزار بالا */}
            <div className="bg-white border border-slate-100 rounded-2xl p-3 md:p-4 mb-4 flex items-center justify-between gap-2 shadow-3xs text-right">
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-xs font-black text-slate-800">
                  {isLoading ? "در حال محاسبه..." : `${products.length} کالا`}
                </span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-start sm:justify-end overflow-x-auto scrollbar-none">
                <button className="flex items-center gap-1 text-[11px] font-black text-slate-700 bg-slate-50 border border-slate-200/70 px-3 py-2 rounded-xl shrink-0">
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>فیلتر برندها</span>
                </button>
                <button className="flex items-center gap-1 text-[11px] font-black text-slate-700 bg-slate-50 border border-slate-200/70 px-3 py-2 rounded-xl shrink-0">
                  <ArrowUpDown className="w-3.5 h-3.5" />
                  <span>محبوب‌ترین‌ها</span>
                </button>
              </div>
            </div>

            {/* 🛍️ گرید محصولات: موبایل ۲ ستونه، دسکتاپ عریض ۴ ستونه فشرده و تراز */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
              {isLoading ? (
                /* 🚀 اسکلتون لودینگ (کارت‌های موجی متحرک شیک به جای متن زشت) */
                Array(8).fill(0).map((_, idx) => (
                  <div key={idx} className="bg-white border border-slate-100 rounded-xl md:rounded-3xl p-3 flex flex-col gap-3 animate-pulse">
                    <div className="w-full h-24 md:h-40 bg-slate-100 rounded-lg md:rounded-2xl"></div>
                    <div className="h-3 bg-slate-100 rounded-full w-3/4 mx-auto mt-2"></div>
                    <div className="h-3 bg-slate-100 rounded-full w-1/2 mx-auto"></div>
                    <div className="h-6 bg-slate-50 rounded-lg w-full mt-4 flex items-center justify-between px-2">
                      <div className="h-3 bg-slate-200 rounded-full w-1/3"></div>
                      <div className="w-5 h-5 bg-slate-200 rounded-md"></div>
                    </div>
                  </div>
                ))
              ) : (
                /* لود دیتای اصلی پس از دریافت از استراپی */
                products.map((item) => {
                  const id = item.id;
                  const attr = item.attributes || {};
                  
                  const name = attr.name || "محصول سیب‌شاپ";
                  const priceNum = attr.price || 0;
                  const oldPriceNum = attr.oldPrice || null;
                  
                  let discountPercent = 0;
                  if (oldPriceNum && oldPriceNum > priceNum) {
                    discountPercent = Math.round(((oldPriceNum - priceNum) / oldPriceNum) * 100);
                  }

                  let imgUrl = null;
                  if (attr.image && attr.image.data && attr.image.data.attributes) {
                    imgUrl = attr.image.data.attributes.url;
                    if (!imgUrl.startsWith('http')) {
                      imgUrl = `https://b.dr-sib.xyz${imgUrl}`;
                    }
                  }

                  const cleanProductData = {
                    id: id,
                    name: name,
                    price: Number(priceNum),
                    imageUrl: imgUrl
                  };

                  return (
                    <div 
                      key={id}
                      className="group bg-white border border-slate-100 rounded-xl md:rounded-3xl p-2.5 md:p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_12px_24px_rgba(0,0,0,0.03)] hover:border-slate-200 relative overflow-hidden"
                    >
                      <Link href={`/product/${attr.slug || id}`} className="block w-full">
                        {discountPercent > 0 && (
                          <div className="absolute top-2 right-2 bg-rose-500 text-white text-[8px] md:text-[10px] font-black px-1.5 md:px-2 py-0.5 rounded-lg z-10">
                            ٪{discountPercent.toLocaleString('fa-IR')}
                          </div>
                        )}

                        <div className="w-full h-24 md:h-40 flex items-center justify-center mb-2 bg-slate-50/40 rounded-lg md:rounded-2xl p-2 md:p-3 group-hover:scale-[1.02] transition-transform duration-300">
                          {imgUrl ? (
                            <img 
                              src={imgUrl} 
                              alt={name}
                              referrerPolicy="no-referrer-when-downgrade"
                              className="max-h-20 md:max-h-32 object-contain filter drop-shadow-3xs select-none"
                            />
                          ) : (
                            <span className="text-2xl md:text-4xl select-none">📱</span>
                          )}
                        </div>

                        <div className="text-right">
                          <h3 className="text-[10px] md:text-xs font-bold md:font-black text-slate-800 leading-4 md:leading-5 line-clamp-2 min-h-[32px] md:min-h-[40px] px-0.5">
                            {name}
                          </h3>
                        </div>
                      </Link>

                      <div className="mt-2 md:mt-3 pt-1.5 border-t border-slate-50 flex flex-col gap-0.5 w-full text-right">
                        {oldPriceNum && (
                          <span className="text-[8px] md:text-[10px] text-slate-400 font-medium line-through pr-1">
                            {oldPriceNum.toLocaleString('fa-IR')}
                          </span>
                        )}
                        
                        <div className="flex items-center justify-between w-full mt-0.5">
                          <div className="text-[10px] md:text-sm font-black text-slate-950 flex items-center gap-0.5">
                            <span>{priceNum.toLocaleString('fa-IR')}</span>
                            <span className="text-[8px] md:text-[9px] font-normal text-slate-400 mr-0.5">تومان</span>
                          </div>
                          
                          <button 
                            onClick={() => addToCart(cleanProductData)}
                            className="bg-slate-50 text-slate-600 hover:bg-rose-500 hover:text-white w-5 h-5 md:w-7 md:h-7 rounded-md md:rounded-lg flex items-center justify-center font-bold text-xs transition-all duration-200 border border-slate-100"
                            title="افزودن به سبد خرید"
                          >
                            ＋
                          </button>
                        </div>
                      </div>

                    </div>
                  );
                })
              )}
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
