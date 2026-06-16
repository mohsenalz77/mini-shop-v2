export default function Header() {
  return (
    <>
      {/* ۱. بنر اعلان بالای هدر برای تخفیف‌های شگفت‌انگیز */}
      <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white text-center py-2 px-4 text-xs font-bold tracking-wide shadow-inner select-none">
        🔥 جشنواره شگفت‌انگیز تابستانه سیب‌شاپ! تا ۴۰٪ تخفیف روی انواع لوازم جانبی موبایل ⚡
      </div>

      {/* هدر اصلی */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 w-full shadow-xs">
        
        {/* ردیف اول هدر: لوگو، سرچ و ابزارها */}
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
          
          {/* راست: لوگو بزرگتر و شیک‌تر */}
          <div className="flex items-center shrink-0">
            <span className="text-2xl font-black text-gray-950 tracking-tight cursor-pointer">
              سیب<span className="text-red-500">‌شاپ</span>
            </span>
          </div>

          {/* وسط: بار جستجوی مدرن با سایز بزرگتر */}
          <div className="hidden md:flex items-center flex-1 max-w-lg relative group">
            <span className="absolute right-4 text-gray-400 text-lg group-focus-within:text-red-500 transition duration-200">🔍</span>
            <input
              type="text"
              placeholder="جستجوی آسان گوشی، کاور، پاوربانک، ایرپاد..."
              className="w-full bg-gray-50 text-sm font-medium pr-12 pl-4 py-3 rounded-2xl border border-gray-100/80 focus:outline-none focus:border-red-200 focus:bg-white focus:ring-4 focus:ring-red-50 transition duration-200 shadow-2xs"
            />
          </div>

          {/* چپ: ابزارها با دکمه ورود بسیار جذاب‌تر */}
          <div className="flex items-center gap-5 shrink-0">
            {/* سبد خرید با پدینگ بزرگتر و دایره تعداد قرمز افکت‌دار */}
            <button className="hidden md:flex relative p-3 text-gray-700 hover:bg-gray-50 rounded-2xl border border-gray-100/60 transition duration-200">
              <span className="text-xl">🛒</span>
              <span className="absolute -top-1 -left-1 bg-red-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-sm animate-pulse">
                ۰
              </span>
            </button>
            
            <div className="hidden md:block h-8 w-[1px] bg-gray-200"></div>

            {/* دکمه ورود لوکس و بزرگتر */}
            <button className="text-xs font-extrabold bg-gray-950 text-white hover:bg-red-500 hover:shadow-lg hover:shadow-red-500/20 px-6 py-3 rounded-2xl transition duration-300">
              ورود | ثبت‌نام
            </button>
          </div>

        </div>

        {/* ردیف دوم هدر: منوی ناوبری و مگامنو (فقط دسکتاپ) */}
        <div className="hidden md:block border-t border-gray-50 bg-white/90 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6 h-12 flex items-center">
            <nav className="flex items-center gap-8 text-sm font-bold text-gray-600">
              
              {/* آیتم مگامنو با افکت هوور بی‌پایان */}
              <div className="relative group/menu py-3 cursor-pointer text-gray-900 hover:text-red-500 flex items-center gap-1.5 transition">
                <span>🍔</span>
                <span>دسته‌بندی محصولات</span>
                <span className="text-[10px] text-gray-400 group-hover/menu:rotate-180 transition duration-200">▼</span>

                {/* خودِ باکس مگامنو */}
                <div className="absolute top-full right-0 w-[600px] bg-white border border-gray-100 shadow-2xl rounded-3xl p-6 grid grid-cols-3 gap-6 opacity-0 pointer-events-none group-hover/menu:opacity-100 group-hover/menu:pointer-events-auto transition-all duration-300 transform translate-y-2 group-hover/menu:translate-y-0 z-50">
                  
                  {/* ستون اول: گوشی‌ها */}
                  <div>
                    <h4 className="font-black text-gray-900 border-r-2 border-red-500 pr-2 mb-3">تلفن هوشمند</h4>
                    <ul className="space-y-2.5 text-xs font-medium text-gray-500 pr-2">
                      <li className="hover:text-red-500 transition">آیفون (Apple)</li>
                      <li className="hover:text-red-500 transition">سامسونگ (Samsung)</li>
                      <li className="hover:text-red-500 transition">شیائومی (Xiaomi)</li>
                      <li className="hover:text-red-500 transition">گوشی‌های کارکرده / اوپن باکس</li>
                    </ul>
                  </div>

                  {/* ستون دوم: لوازم جانبی اصلی */}
                  <div>
                    <h4 className="font-black text-gray-900 border-r-2 border-blue-500 pr-2 mb-3">لوازم جانبی</h4>
                    <ul className="space-y-2.5 text-xs font-medium text-gray-500 pr-2">
                      <li className="hover:text-red-500 transition">قاب و کاور گوشی</li>
                      <li className="hover:text-red-500 transition">محافظ صفحه (گلس)</li>
                      <li className="hover:text-red-500 transition">کابل و شارژر دیواری</li>
                      <li className="hover:text-red-500 transition">پاوربانک (شارژر همراه)</li>
                    </ul>
                  </div>

                  {/* ستون سوم: گجت‌های هوشمند */}
                  <div>
                    <h4 className="font-black text-gray-900 border-r-2 border-emerald-500 pr-2 mb-3">صوتی و پوشیدنی</h4>
                    <ul className="space-y-2.5 text-xs font-medium text-gray-500 pr-2">
                      <li className="hover:text-red-500 transition">ساعت هوشمند</li>
                      <li className="hover:text-red-500 transition">هندزفری بی‌سیم / ایرپاد</li>
                      <li className="hover:text-red-500 transition">اسپیکر بلوتوثی</li>
                    </ul>
                  </div>

                </div>
              </div>

              {/* بقیه دکمه‌های ناوبری ساده */}
              <a href="#" className="hover:text-red-500 transition py-3">برندها</a>
              <a href="#" className="hover:text-red-500 transition py-3">شگفت‌انگیزها</a>
              <a href="#" className="hover:text-red-500 transition py-3">ضمانت و گارانتی</a>
              <a href="#" className="hover:text-red-500 transition py-3">تماس با ما</a>
            </nav>
          </div>
        </div>

      </header>

      {/* ناوبری پایینی چسبان موبایل (بدون تغییر منطقی) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-xl z-50 px-6 py-2">
        <div className="flex items-center justify-between text-gray-500">
          <button className="flex flex-col items-center gap-1 text-red-500 font-bold">
            <span className="text-lg">🏠</span>
            <span className="text-[10px]">خانه</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <span className="text-lg">🗂️</span>
            <span className="text-[10px]">دسته‌بندی</span>
          </button>
          <button className="flex flex-col items-center gap-1 relative">
            <span className="text-lg">🛒</span>
            <span className="text-[10px]">سبد خرید</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <span className="text-lg">👤</span>
            <span className="text-[10px]">پروفایل</span>
          </button>
        </div>
      </nav>
    </>
  );
}
