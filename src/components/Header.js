import { Search, User, ShoppingBag, ChevronDown } from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full flex flex-col">
      
      {/* بخش اول: لوگو، سرچ و ورود - این بخش همیشه بالا می‌چسبد */}
      <div className="w-full bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center justify-between gap-4">
          
          {/* راست: لوگو و برندینگ */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xl md:text-2xl font-black tracking-tight text-slate-900 flex items-center gap-1">
              سیب<span className="text-rose-500">‌شاپ</span>
            </span>
          </div>

          {/* وسط: باکس جستجوی مدرن */}
          <div className="hidden md:flex flex-1 max-w-2xl relative">
            <input 
              type="text" 
              placeholder="جستجو در سیب‌شاپ..." 
              className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2.5 pr-11 pl-4 text-xs font-medium text-slate-700 placeholder-slate-400 focus:outline-hidden focus:border-rose-500/30 focus:bg-white focus:shadow-xs transition-all"
            />
            <Search className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2" />
          </div>

          {/* چپ: دکمه‌های اکشن (ورود و سبد خرید) */}
          <div className="flex items-center gap-4 shrink-0">
            <button className="flex items-center gap-2 border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">ورود | ثبت‌نام</span>
            </button>
            
            <div className="relative cursor-pointer group p-2">
              <ShoppingBag className="w-5 h-5 text-slate-700 group-hover:text-rose-500 transition" />
              <span className="absolute -top-0.5 -left-0.5 bg-rose-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                ۰
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* بخش دوم: نوار ناوبری و دسته‌بندی‌ها - این بخش با اسکرول محو می‌شود */}
      <div className="w-full bg-white/50 border-b border-gray-100/60 relative z-40">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-12 flex items-center justify-start gap-6 text-xs font-bold text-slate-600">
          
          <div className="flex items-center gap-1 text-slate-900 cursor-pointer hover:text-rose-500 transition">
            <span>دسته‌بندی محصولات</span>
            <ChevronDown className="w-3.5 h-3.5 stroke-[2.5]" />
          </div>

          <span className="w-px h-4 bg-slate-200"></span>

          <span className="cursor-pointer hover:text-rose-500 transition">برندها</span>
          <span className="cursor-pointer hover:text-rose-500 transition">تخفیف‌های ویژه</span>
          <span className="cursor-pointer hover:text-rose-500 transition">خدمات گارانتی</span>
        </div>
      </div>

    </header>
  );
}
