import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { SlidersHorizontal, ArrowUpDown, Smartphone, Percent, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

// متد فچ کردن کل محصولات از استراپی
async function getProducts() {
  try {
    const res = await fetch('https://b.dr-sib.xyz/api/products?populate=*', {
      cache: 'no-store' // برای دریافت لحظه‌ای قیمت‌ها و موجودی جدید
    });
    if (!res.ok) throw new Error('Failed to fetch products');
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 direction-rtl antialiased">
      <Header />

      {/* 🌌 هیرو بنر ظریف مخصوص صفحه آرشیو محصولات */}
      <div className="relative bg-slate-950 text-white py-12 md:py-16 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-rose-500/10 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 text-right">
          <span className="text-rose-500 font-black text-xs uppercase tracking-wider bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">فروشگاه آنلاین</span>
          <h1 className="text-2xl md:text-4xl font-black mt-3 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">بررسی و خرید انواع گوشی موبایل</h1>
          <p className="text-xs md:text-sm text-slate-400 mt-2 max-w-xl font-medium leading-6">
            جدیدترین پرچمداران و میان‌رده‌های بازار را با گارانتی معتبر شرکتی، کد فعالسازی رجیستری و ارسال اکسپرس از سیب‌شاپ تهیه کنید.
          </p>
        </div>
      </div>

      {/* 🏪 بخش اصلی فروشگاه: فیلترها و گرید کالاها */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        
        {/* نوار ابزار بالا (تعداد کالا + مرتب‌سازی) */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-3xs text-right">
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <div className="p-2 bg-slate-50 rounded-xl border border-slate-100">
              <Smartphone className="w-5 h-5 text-slate-700" />
            </div>
            <div>
              <h2 className="text-sm font-black text-slate-800">گوشی‌های هوشمند</h2>
              <p className="text-[11px] text-slate-400 font-bold mt-0.5">{products.length} کالا یافت شد</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button className="flex items-center gap-1.5 text-xs font-black text-slate-600 bg-slate-50 border border-slate-100 px-3 py-2 rounded-xl hover:bg-slate-100 transition">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>فیلترها</span>
            </button>
            <button className="flex items-center gap-1.5 text-xs font-black text-slate-600 bg-slate-50 border border-slate-100 px-3 py-2 rounded-xl hover:bg-slate-100 transition">
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>جدیدترین‌ها</span>
            </button>
          </div>
        </div>

        {/* 🛍️ گرید محصولات (۳ تایی در دسکتاپ، ۲ تایی در تبلت، ۱ دانه در موبایل) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((item) => {
            const id = item.id;
            const attr = item.attributes || {};
            
            // استخراج فیلدها با امنیت بالا در صورت نبود دیتا
            const name = attr.name || "محصول سیب‌شاپ";
            const priceNum = attr.price || 0;
            const oldPriceNum = attr.oldPrice || null;
            
            // محاسبه درصد تخفیف واقعی در صورت وجود قیمت قبلی
            let discountPercent = 0;
            if (oldPriceNum && oldPriceNum > priceNum) {
              discountPercent = Math.round(((oldPriceNum - priceNum) / oldPriceNum) * 100);
            }

            // آدرس‌دهی هوشمند تصویر
            let imgUrl = null;
            if (attr.image && attr.image.data && attr.image.data.attributes) {
              imgUrl = attr.image.data.attributes.url;
              if (!imgUrl.startsWith('http')) {
                imgUrl = `https://b.dr-sib.xyz${imgUrl}`;
              }
            }

            return (
              <Link 
                href={`/product/${id}`} 
                key={id}
                className="group bg-white border border-slate-100 rounded-3xl p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-md hover:border-slate-200/60 relative"
              >
                {/* برچسب تخفیف شگفت‌انگیز */}
                {discountPercent > 0 && (
                  <div className="absolute top-4 right-4 bg-rose-500 text-white text-[10px] font-black px-2.5 py-1 rounded-xl shadow-xs z-10 flex items-center gap-0.5 animate-pulse">
                    <Percent className="w-3 h-3" />
                    <span>{discountPercent}٪ تخفیف</span>
                  </div>
                )}

                {/* تصویر محصول */}
                <div className="w-full h-48 flex items-center justify-center mb-4 bg-slate-50/40 rounded-2xl p-4 group-hover:scale-[1.02] transition-transform duration-300 relative">
                  {imgUrl ? (
                    <img 
                      src={imgUrl} 
                      alt={name}
                      referrerPolicy="no-referrer-when-downgrade"
                      className="max-h-40 object-contain filter drop-shadow-xs select-none"
                    />
                  ) : (
                    <span className="text-5xl select-none">📱</span>
                  )}
                </div>

                {/* عنوان و ویژگی‌های کالا */}
                <div className="text-right flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-black text-slate-800 leading-6 group-hover:text-rose-500 transition-colors duration-200 line-clamp-2 min-h-[48px]">
                      {name}
                    </h3>
                    
                    <div className="flex items-center gap-1 mt-2.5 text-emerald-600">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span className="text-[10px] font-bold">موجود در انبار سیب‌شاپ (ارسال فوری)</span>
                    </div>
                  </div>

                  {/* بخش قیمت در پایین کارت */}
                  <div className="mt-5 pt-3 border-t border-slate-50 flex items-center justify-between w-full">
                    <span className="text-[10px] text-slate-400 font-bold">قیمت فروش ویژه:</span>
                    <div className="flex flex-col items-end">
                      {oldPriceNum && (
                        <span className="text-[11px] text-slate-400 font-bold line-through">
                          {oldPriceNum.toLocaleString('fa-IR')}
                        </span>
                      )}
                      <div className="text-sm md:text-base font-black text-slate-900 flex items-center gap-0.5 mt-0.5">
                        <span>{priceNum.toLocaleString('fa-IR')}</span>
                        <span className="text-[10px] font-normal text-slate-400 mr-0.5">تومان</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
