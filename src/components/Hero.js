import { ShieldCheck, Truck, Percent, ArrowLeft } from 'lucide-react';

export default function Hero() {
  return (
    <div className="w-full px-4 md:px-8 my-6">
      <div className="w-full bg-gradient-to-br from-slate-950 via-zinc-900 to-slate-900 text-white rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between shadow-2xl relative overflow-hidden border border-slate-800/50">
        
        {/* افکت نور پس‌زمینه آمبیانس (مخصوص لوکس کردن تم تاریک) */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

        {/* بخش راست: متون، تایپوگرافی و دکمه‌ها */}
        <div className="z-10 max-w-xl text-center md:text-right flex flex-col items-center md:items-start order-2 md:order-1 mt-8 md:mt-0">
          
          <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full mb-6">
            <Percent className="w-3.5 h-3.5 text-rose-400" />
            <span className="text-[11px] font-bold text-zinc-300 tracking-wide">
              پیشنهاد ویژه: آیفون پرو سری تیتانیوم با گارانتی معتبر شرکتی
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400 leading-tight mb-4">
            اتصال به دنیای پرچمدارها
          </h1>
          
          <p className="text-zinc-400 text-xs md:text-sm mb-8 leading-7 max-w-md">
            برترین تکنولوژی‌های روز دنیا، لوازم جانبی اورجینال و خدمات تخصصی تعمیرات موبایل را در سیب‌شاپ با تضمین بالاترین کیفیت تجربه کنید.
          </p>

          {/* دکمه اکشن لوکس و کپسولی */}
          <div className="flex items-center gap-4 mb-8">
            <button className="group bg-white text-slate-950 text-xs font-bold px-6 py-3.5 rounded-full hover:bg-rose-500 hover:text-white transition-all duration-300 shadow-xl flex items-center gap-2">
              <span>مشاهده و خرید محصولات</span>
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            </button>
          </div>

          {/* مزایای خرید سه گانه با آیکون‌های خطی Lucide */}
          <div className="grid grid-cols-2 md:flex items-center gap-6 pt-6 border-t border-white/5 w-full justify-center md:justify-start">
            <div className="flex items-center gap-2 text-zinc-400">
              <ShieldCheck className="w-4 h-4 text-rose-400 shrink-0" />
              <span className="text-[11px] font-semibold">۱۸ ماه گارانتی معتبر</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-400">
              <Truck className="w-4 h-4 text-blue-400 shrink-0" />
              <span className="text-[11px] font-semibold">ارسال سریع اکسپرس</span>
            </div>
          </div>

        </div>
        
        {/* بخش چپ: تصویر فوق‌العاده باکیفیت، واقعی و ۱۰۰٪ شفاف از نمای روبروی پرچمدار */}
        <div className="hidden md:flex flex-1 justify-center items-center order-1 md:order-2 relative z-10 h-96">
          <div className="relative w-72 h-full transform rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-500 ease-out cursor-pointer group flex items-center justify-center">
            <img 
              src="https://i.postimg.co/7Ym4fPsh/iphone-front.png" 
              alt="پرچمدار هوشمند سیب شاپ"
              className="max-h-[90%] w-auto object-contain drop-shadow-[0_30px_50px_rgba(244,63,94,0.15)]"
            />
          </div>
        </div>
        
      </div>
    </div>
  );
}
