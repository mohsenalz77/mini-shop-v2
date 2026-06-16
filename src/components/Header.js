import { Search, ShoppingBag, User, ChevronDown, Menu, Smartphone, Laptop, Headphones } from 'lucide-react';

export default function Header() {
  return (
    <>
      {/* ۱. بنر اعلان بالایی با تم ملایم‌تر سرخابی-صورتی */}
      <div className="bg-gradient-to-r from-rose-500 to-pink-600 text-white text-center py-2 px-4 text-[11px] font-bold tracking-wide select-none">
        جشنواره شگفت‌انگیز سیب‌شاپ؛ تا ۴۰٪ تخفیف روی لوازم جانبی موبایل ⚡
      </div>

      {/* ۲. هدر اصلی شیشه‌ای (Glassmorphism) و تم زغالی */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50 w-full transition-all">
        
        {/* ردیف اول: لوگو، سرچ‌بار مدرن و ابزارها */}
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
          
          {/* راست: لوگو با فونت سنگین و تم زغالی ارگانیک */}
          <div className="flex items-center shrink-0">
            <span className="text-2xl font-black text-slate-800 tracking-tight cursor-pointer">
              سیب<span className="text-rose-500">‌شاپ</span>
            </span>
          </div>

          {/* وسط: بار جستجوی فلت بدون کادر سنگین */}
          <div className="hidden md:flex items-center flex-1 max-w-lg mx-auto relative group">
            <Search className="absolute right-4 w-4 h-4 text-slate-400 group-focus-within:text-rose-500 transition duration-200" />
            <input
              type="text"
              placeholder="جستجوی آسان اسم گوشی، مدل قاب، برند هندزفری..."
              className="w-full bg-slate-50 text-xs font-medium pr-11 pl-4 py-3 rounded-2xl border border-transparent focus:outline-none focus:border-slate-200 focus:bg-white focus:ring-4 focus:ring-slate-100 transition duration-200"
            />
          </div>

          {/* چپ: ابزارها با آیکون‌های خطی نازک و دکمه ورود Outline */}
          <div className="flex items-center gap-4 shrink-0">
            
            {/* دکمه پروفایل/ورود به صورت Outline و بسیار مینیمال */}
            <button className="flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-slate-900 border border-slate-200 hover:bg-slate-50 px-4 py-2.5 rounded-xl transition duration-200 shadow-2xs">
              <User className="w-4 h-4 stroke-[2.5]" />
              <span>ورود | ثبت‌نام</span>
            </button>

            <div className="hidden md:block h-6 w-[1px] bg-slate-200"></div>

            {/* سبد خرید با پدینگ ظریف و آیکون لوکس خطی */}
            <button className="hidden md:flex relative p-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition duration-200">
              <ShoppingBag className="w-5 h-5 stroke-[2]" />
              <span className="absolute -top-0.5 -left-0.5 bg-rose-500 text-white text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-sm">
                ۰
              </span>
            </button>
          </div>

        </div>

        {/* ردیف دوم: منوی ناوبری یکپارچه و مگامنو بدون بخش‌های تیره */}
        <div className="hidden md:block border-t border-slate-50 bg-white/50">
          <div className="max-w-7xl mx-auto px-6 h-12 flex items-center">
            <nav className="flex items-center gap-8 text-xs font-bold text-slate-600">
              
              {/* آیتم مگامنو روان و شیک */}
              <div className="relative group/menu py-3.5 cursor-pointer text-slate-800 hover:text-rose-500 flex items-center gap-1.5 transition">
                <Menu className="w-4 h-4 text-slate-500 group-hover/menu:text-rose-500 transition" />
                <span>دسته‌بندی محصولات</span>
                <ChevronDown className="w-3 h-3 text-slate-400 group-hover/menu:rotate-180 transition duration-300" />

                {/* پاپ‌آپ مگامنو با استایل کاملاً سفید و تمیز */}
                <div className="absolute top-full right-0 w-[650px] bg-white border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.08)] rounded-3xl p-6 grid grid-cols-3 gap-6 opacity-0 pointer-events-none group-hover/menu:opacity-100 group-hover/menu:pointer-events-auto transition-all duration-300 transform translate-y-2 group-hover/menu:translate-y-0 z-50">
                  
                  {/* گروه ۱: گوشی‌ها */}
                  <div>
                    <div className="flex items-center gap-1.5 text-slate-900 font-black mb-3 text-xs">
                      <Smartphone className="w-4 h-4 text-rose-500" />
                      <span>تلفن هوشمند</span>
                    </div>
                    <ul className="space-y-2.5 font-medium text-slate-500 pr-5 border-r border-slate-100">
                      <li className="hover:text-rose-500 transition">آیفون (Apple)</li>
                      <li className="hover:text-rose-500 transition">سامسونگ (Samsung)</li>
                      <li className="hover:text-rose-500 transition">شیائومی (Xiaomi)</li>
                    </ul>
                  </div>

                  {/* گروه ۲: جانبی */}
                  <div>
                    <div className="flex items-center gap-1.5 text-slate-900 font-black mb-3 text-xs">
                      <Laptop className="w-4 h-4 text-blue-500" />
                      <span>لوازم جانبی</span>
                    </div>
                    <ul className="space-y-2.5 font-medium text-slate-500 pr-5 border-r border-slate-100">
                      <li className="hover:text-rose-500 transition">قاب و کاور گوشی</li>
                      <li className="hover:text-rose-500 transition">کابل و شارژر دیواری</li>
                      <li className="hover:text-rose-500 transition">پاوربانک اکسترنال</li>
                    </ul>
                  </div>

                  {/* گروه ۳: صوتی */}
                  <div>
                    <div className="flex items-center gap-1.5 text-slate-900 font-black mb-3 text-xs">
                      <Headphones className="w-4 h-4 text-emerald-500" />
                      <span>صوتی و پوشیدنی</span>
                    </div>
                    <ul className="space-y-2.5 font-medium text-slate-500 pr-5">
                      <li className="hover:text-rose-500 transition">ایرپاد و هندزفری</li>
                      <li className="hover:text-rose-500 transition">ساعت هوشمند</li>
                    </ul>
                  </div>

                </div>
              </div>

              {/* گزینه‌های فرعی ناوبری دسکتاپ */}
              <a href="#" className="hover:text-rose-500 transition py-3.5">برندها</a>
              <a href="#" className="hover:text-rose-500 transition py-3.5">تخفیف‌های ویژه</a>
              <a href="#" className="hover:text-rose-500 transition py-3.5">خدمات گارانتی</a>
            </nav>
          </div>
        </div>

      </header>

      {/* ناوبری پایینی چسبان موبایل (با آیکون‌های خطی هماهنگ) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-slate-100 shadow-[0_-4px_20px_rgba(0,0,0,0.04)] z-50 px-6 py-2">
        <div className="flex items-center justify-between text-slate-400">
          <button className="flex flex-col items-center gap-1 text-rose-500 font-bold">
            <span className="text-sm">🏠</span>
            <span className="text-[9px]">خانه</span>
          </button>
          <button className="flex flex-col items-center gap-1 hover:text-slate-800">
            <span className="text-sm">🗂️</span>
            <span className="text-[9px]">دسته‌بندی</span>
          </button>
          <button className="flex flex-col items-center gap-1 hover:text-slate-800">
            <span className="text-sm">🛒</span>
            <span className="text-[9px]">سبد خرید</span>
          </button>
          <button className="flex flex-col items-center gap-1 hover:text-slate-800">
            <span className="text-sm">👤</span>
            <span className="text-[9px]">پروفایل</span>
          </button>
        </div>
      </nav>
    </>
  );
}
