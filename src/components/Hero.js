import React from 'react';

export default function Hero() {
  return (
    <div className="w-full bg-slate-900 text-white relative overflow-visible">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20 flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
        
        {/* بخش راست: متن‌ها و دکمه اکشن */}
        <div className="flex-1 flex flex-col items-start gap-4 text-right order-2 md:order-1">
          <div className="inline-flex items-center gap-1.5 bg-white/10 text-white/90 px-3 py-1 rounded-full text-xs font-medium border border-white/10">
            <span>✨ جشنواره افتتاحیه؛ ضمانت اصالت و ۱۸ ماه گارانتی شرکتی</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight md:leading-snug">
            اتصال به دنیای <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-500">پرچمدارها</span>
          </h1>
          
          <p className="text-slate-400 text-xs md:text-sm max-w-xl leading-6 font-medium">
            برترین تکنولوژی‌های روز دنیا، لوازم جانبی اورجینال و خدمات تخصصی تعمیرات موبایل را در سیب‌شاپ با استانداردهای جهانی تجربه کنید.
          </p>
          
          <div className="mt-4 flex flex-wrap gap-4">
            <button className="bg-white text-slate-900 px-6 py-3 rounded-2xl text-xs font-black shadow-lg hover:bg-slate-100 transition duration-200 flex items-center gap-2">
              <span>کاوش در محصولات</span>
              <span>←</span>
            </button>
          </div>
          
          <div className="mt-8 flex items-center gap-6 text-slate-500 text-[10px] md:text-xs font-bold border-t border-slate-800/80 pt-4 w-full">
            <div className="flex items-center gap-1.5">
              <span>🛡️</span>
              <span>۱۸ ماه گارانتی معتبر</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>🚀</span>
              <span>ارسال سریع اکسپرس</span>
            </div>
          </div>
        </div>

        {/* بخش چپ: مهار آیفون با سایه ملایم و تصحیح‌شده بدون کامنت تداخلی */}
        <div className="hidden md:flex flex-1 justify-center items-center order-1 md:order-2 relative z-30 h-96">
          <div className="relative w-[360px] h-[540px] transform translate-y-24 rotate-1 hover:rotate-0 hover:scale-105 transition-all duration-500 ease-out cursor-pointer group flex items-center justify-center">
            <img 
              src="/hero-phone.png" 
              alt="آیفون پرچمدار سیب شاپ"
              className="w-full h-full object-contain drop-shadow-[0_35px_50px_rgba(0,0,0,0.25)]"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
