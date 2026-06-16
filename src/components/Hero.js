import { ShieldCheck, Truck, Percent, ArrowLeft } from 'lucide-react';

export default function Hero() {
  return (
    <div className="w-full px-4 md:px-8 my-6">
      <div className="w-full bg-gradient-to-br from-slate-950 via-zinc-900 to-slate-900 text-white rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between shadow-2xl relative overflow-hidden border border-slate-800/50">
        
        {/* افکت‌های آمبیانس نوری پیشرفته */}
        <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-rose-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute -bottom-20 left-1/3 w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>

        {/* بخش راست: متون و تایپوگرافی */}
        <div className="z-10 max-w-xl text-center md:text-right flex flex-col items-center md:items-start order-2 md:order-1 mt-8 md:mt-0">
          
          <div className="flex items-center gap-2 bg-gradient-to-r from-rose-500/10 to-transparent border border-rose-500/20 px-4 py-2 rounded-full mb-6 backdrop-blur-md">
            <Percent className="w-3.5 h-3.5 text-rose-400 animation-pulse" />
            <span className="text-[11px] font-bold text-rose-300 tracking-wide">
              جشنواره افتتاحیه: ضمانت اصالت و ۱۸ ماه گارانتی شرکتی
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400 leading-tight mb-6 tracking-tight">
            اتصال به دنیای <span className="text-rose-500">پرچمدارها</span>
          </h1>
          
          <p className="text-zinc-400 text-xs md:text-sm mb-10 leading-8 max-w-md font-medium">
            برترین تکنولوژی‌های روز دنیا، لوازم جانبی اورجینال و خدمات تخصصی تعمیرات موبایل را در سیب‌شاپ با استانداردهای جهانی تجربه کنید.
          </p>

          {/* دکمه اکشن لوکس */}
          <div className="flex items-center gap-4 mb-10">
            <button className="group bg-gradient-to-r from-white to-zinc-200 text-slate-950 text-xs font-black px-8 py-4 rounded-2xl hover:from-rose-500 hover:to-pink-600 hover:text-white transition-all duration-300 shadow-[0_20px_40px_rgba(255,255,255,0.05)] hover:shadow-[0_20px_40px_rgba(244,63,94,0.2)] flex items-center gap-3">
              <span>کاوش در محصولات</span>
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1.5 stroke-[2.5]" />
            </button>
          </div>

          {/* مزایای خرید */}
          <div className="grid grid-cols-2 md:flex items-center gap-8 pt-8 border-t border-white/5 w-full justify-center md:justify-start">
            <div className="flex items-center gap-2.5 text-zinc-400 group cursor-pointer">
              <ShieldCheck className="w-5 h-5 text-rose-400 shrink-0 transition-transform group-hover:scale-110" />
              <span className="text-xs font-bold text-zinc-300">۱۸ ماه گارانتی معتبر</span>
            </div>
            <div className="flex items-center gap-2.5 text-zinc-400 group cursor-pointer">
              <Truck className="w-5 h-5 text-blue-400 shrink-0 transition-transform group-hover:scale-110" />
              <span className="text-xs font-bold text-zinc-300">ارسال سریع اکسپرس</span>
            </div>
          </div>

        </div>
        
        {/* بخش چپ: یک چیدمان وکتور فوق‌العاده انتزاعی، شیشه‌ای و سه‌بعدی لوکس (بدون نیاز به عکس خارجی) */}
        <div className="hidden md:flex flex-1 justify-center items-center order-1 md:order-2 relative z-10 h-96 select-none">
          
          {/* المان اصلی: شبیه‌ساز بدنه تیتانیوم تیره */}
          <div className="relative w-56 h-80 bg-gradient-to-b from-zinc-800 via-zinc-900 to-slate-950 rounded-[2.5rem] border-[4px] border-zinc-700/60 shadow-[0_30px_70px_rgba(0,0,0,0.9)] flex items-center justify-center transform -rotate-6 hover:rotate-0 hover:scale-105 transition-all duration-500 ease-out group cursor-pointer">
            
            {/* داینامیک آیلند */}
            <div className="absolute top-3.5 w-20 h-4.5 bg-black rounded-full border border-zinc-800/80 flex items-center justify-between px-2">
              <div className="w-1.5 h-1.5 bg-zinc-900 rounded-full"></div>
              <div className="w-1 h-1 bg-indigo-950 rounded-full"></div>
            </div>

            {/* سنسور دوربین پشتی فرضی (سایه عمق) */}
            <div className="absolute inset-4 rounded-[1.8rem] border border-white/5 bg-gradient-to-tr from-white/0 via-white/5 to-transparent pointer-events-none group-hover:via-white/10 transition duration-500"></div>
            
            <div className="text-center">
              <p className="text-[10px] font-black text-zinc-600 tracking-widest uppercase group-hover:text-rose-400 transition duration-300">Titanium</p>
              <p className="text-[8px] font-bold text-zinc-700 uppercase tracking-widest mt-1">Special Edition</p>
            </div>

            {/* حلقه شیشه‌ای شناور دوم پشت موبایل برای عمق دادن */}
            <div className="absolute -right-12 bottom-6 w-32 h-32 rounded-3xl bg-gradient-to-br from-white/10 to-white/0 border border-white/10 backdrop-blur-md -z-10 transform rotate-12 group-hover:translate-x-2 transition-all duration-500 shadow-2xl flex items-center justify-center">
              <span className="text-2xl">⚡</span>
            </div>

          </div>

        </div>
        
      </div>
    </div>
  );
}
