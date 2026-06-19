import React from 'react';
import Link from 'next/link'; // 🚀 اضافه شدن ابزار ناوبری نکست‌جی

export default function Hero() {
  return (
    <div className="w-full px-4 md:px-8 my-3 md:my-6 relative overflow-visible">
      
      {/* باکس تیره هیرو */}
      <div className="w-full bg-gradient-to-br from-slate-950 via-zinc-900 to-slate-900 text-white rounded-3xl p-5 py-6 md:p-16 flex flex-col md:flex-row items-center justify-between shadow-2xl relative overflow-visible border border-slate-800/50">
        
        {/* افکت‌های آمبیانس نوری */}
        <div className="absolute -top-20 -left-20 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-rose-500/10 rounded-full blur-[90px] md:blur-[120px] pointer-events-none"></div>
        <div className="absolute -bottom-20 left-1/3 w-[200px] md:w-[300px] h-[200px] md:h-[300px] bg-blue-600/10 rounded-full blur-[80px] md:blur-[100px] pointer-events-none"></div>

        {/* بخش تصویر */}
        <div className="w-full md:flex-1 flex justify-center items-center order-1 md:order-2 relative z-30 h-44 md:h-96 mb-3 md:mb-0">
          <div className="relative w-[140px] h-[220px] md:w-[360px] md:h-[540px] transform translate-y-2 md:translate-y-24 rotate-1 hover:rotate-0 hover:scale-105 transition-all duration-500 ease-out cursor-pointer group flex items-center justify-center">
            <img 
              src="/hero-phone.png" 
              alt="آیفون پرچمدار سیب شاپ"
              className="w-full h-full object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.3)] md:drop-shadow-[0_35px_50px_rgba(0,0,0,0.25)]"
            />
          </div>
        </div>

        {/* بخش راست: متن‌ها و دکمه اکشن */}
        <div className="flex-1 flex flex-col items-center md:items-start gap-3 md:gap-4 text-center md:text-right order-2 md:order-1 w-full">
          
          <div className="inline-flex items-center gap-1.5 bg-white/10 text-white/90 px-3 py-1 rounded-full text-[9px] md:text-xs font-medium border border-white/10 max-w-full">
            <span className="truncate">✨ جشنواره افتتاحیه؛ ضمانت اصالت و ۱۸ ماه گارانتی شرکتی</span>
          </div>
          
          <h1 className="text-xl md:text-5xl font-black text-white leading-tight md:leading-snug mt-1">
            اتصال به دنیای <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-500">پرچمدارها</span>
          </h1>
          
          <p className="text-slate-400 text-[11px] md:text-sm max-w-xl leading-5 md:leading-6 font-medium px-2 md:px-0">
            برترین تکنولوژی‌های روز دنیا، لوازم جانبی اورجینال و خدمات تخصصی تعمیرات موبایل را in سیب‌شاپ تجربه کنید.
          </p>
          
          <div className="mt-1 md:mt-4 flex flex-wrap justify-center md:justify-start gap-4 w-full md:w-auto">
            {/* 🚀 اتصال هوشمند دکمه به آدرس لیست محصولات */}
            <Link href="/products" className="w-full md:w-auto block">
              <button className="w-full md:w-auto justify-center bg-white text-slate-900 px-6 py-2.5 md:py-3 rounded-xl md:rounded-2xl text-xs font-black shadow-lg hover:bg-slate-100 transition duration-200 flex items-center gap-2 cursor-pointer">
                <span>مشاهده محصولات</span>
                <span className="scale-x-[-1] md:scale-x-1">←</span>
              </button>
            </Link>
          </div>
          
          <div className="mt-4 md:mt-8 flex items-center justify-center md:justify-start gap-5 text-slate-500 text-[9px] md:text-xs font-bold border-t border-slate-800/80 pt-3 w-full">
            <div className="flex items-center gap-1">
              <span>🛡️</span>
              <span>۱۸ ماه گارانتی</span>
            </div>
            <div className="flex items-center gap-1">
              <span>🚀</span>
              <span>ارسال سریع</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
