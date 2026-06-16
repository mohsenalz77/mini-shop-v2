import { ShieldCheck, Truck, Percent, ArrowLeft } from 'lucide-react';

export default function Hero() {
  return (
    <div className="w-full px-4 md:px-8 my-6 relative overflow-visible">
      
      {/* باکس تیره هیرو - حتماً باید overflow-visible باشد */}
      <div className="w-full bg-gradient-to-br from-slate-950 via-zinc-900 to-slate-900 text-white rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between shadow-2xl relative overflow-visible border border-slate-800/50">
        
        {/* افکت‌های آمبیانس نوری */}
        <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-rose-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute -bottom-20 left-1/3 w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>

        {/* بخش راست: متون و تایپوگرافی */}
        <div className="z-10 max-w-xl text-center md:text-right flex flex-col items-center md:items-start order-2 md:order-1 mt-8 md:mt-0">
          
          <div className="flex items-center gap-2 bg-gradient-to-r from-rose-500/10 to-transparent border border-rose-500/20 px-4 py-2 rounded-full mb-6 backdrop-blur-md">
            <Percent className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
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

          <div className="flex items-center gap-4 mb-10">
            <button className="group bg-gradient-to-r from-white to-zinc-200 text-slate-950 text-xs font-black px-8 py-4 rounded-2xl hover:from-rose-500 hover:to-pink-600 hover:text-white transition-all duration-300 shadow-[0_20px_40px_rgba(255,255,255,0.05)] flex items-center gap-3">
              <span>کاوش در محصولات</span>
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1.5 stroke-[2.5]" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:flex items-center gap-8 pt-8 border-t border-white/5 w-full justify-center md:justify-start">
            <div className="flex items-center gap-2.5 text-zinc-400 group cursor-pointer">
              <ShieldCheck className="w-5 h-5 text-rose-400 shrink-0" />
              <span className="text-xs font-bold text-zinc-300">۱۸ ماه گارانتی معتبر</span>
            </div>
            <div className="flex items-center gap-2.5 text-zinc-400 group cursor-pointer">
              <Truck className="w-5 h-5 text-blue-400 shrink-0" />
              <span className="text-xs font-bold text-zinc-300">ارسال سریع اکسپرس</span>
            </div>
          </div>

        </div>
        
        {/* بخش چپ: مهار و هول دادن قطعی عکس به خارج از مرز پایین */}
        <div className="hidden md:flex flex-1 justify-center items-center order-1 md:order-2 relative z-30 h-96">
          {/* تغییر اصلی: حذف absolute bottom-0 و استفاده از translate-y برای شکستن مرز */}
          <div className="relative w-[360px] h-[540px] transform translate-y-24 rotate-1 hover:rotate-0 hover:scale-105 transition-all duration-500 ease-out cursor-pointer group flex items-center justify-center">
            <img 
              src="/hero-phone.png" 
              alt="آیفون پرچمدار سیب شاپ"
              className="w-full h-full object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.80)]"
            />
          </div>
        </div>
        
      </div>
    </div>
  );
}
