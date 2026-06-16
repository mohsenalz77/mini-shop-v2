import { Search, User, ShoppingBag } from 'lucide-react';

export default function Header() {
  return (
    // فیکس اصلی: اضافه شدن sticky top-0 z-50 به همراه bg-white/90 و backdrop-blur
    // این کار باعث می‌شود هدر اصلی تو با همان ظاهر قبلی بالای صفحه قفل شود و شیشه‌ای بماند
    <header className="w-full bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 shadow-xs transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center justify-between gap-4">
        
        {/* راست: سبد خرید و ورود (در لایوت راست به چپ تو) */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="relative cursor-pointer group p-2">
            <ShoppingBag className="w-5 h-5 text-slate-700 group-hover:text-red-500 transition" />
            <span className="absolute -top-0.5 -left-0.5 bg-red-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
              ۰
            </span>
          </div>
          
          <button className="flex items-center gap-2 border border-gray-200/80 rounded-xl px-4 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50 transition">
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">ورود | ثبت‌نام</span>
          </button>
        </div>

        {/* وسط: باکس جستجو */}
        <div className="hidden md:flex flex-1 max-w-xl relative">
          <input 
            type="text" 
            placeholder="جستجو در سیب‌شاپ..." 
            className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2.5 pr-4 pl-11 text-xs font-medium text-gray-700 placeholder-gray-400 focus:outline-hidden focus:border-red-500/30 focus:bg-white transition-all"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
        </div>

        {/* چپ: لوگو و برندینگ */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xl md:text-2xl font-black tracking-tight text-gray-900">
            سیب<span className="text-red-500">‌شاپ</span>
          </span>
        </div>

      </div>
    </header>
  );
}
