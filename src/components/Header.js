export default function Header() {
  return (
    <>
      {/* هدر مخصوص دسکتاپ و تبلت (در موبایل کاملاً جمع‌وجور می‌شود) */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          
          {/* راست: لوگو */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xl font-black text-gray-900 tracking-tight">
              سیب<span className="text-red-500">‌شاپ</span>
            </span>
          </div>

          {/* وسط: بار جستجو (فقط در دسکتاپ نشان داده می‌شود) */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-auto relative">
            <span className="absolute right-3 text-gray-400 text-sm">🔍</span>
            <input
              type="text"
              placeholder="جستجوی گوشی، کاور، هندزفری..."
              className="w-full bg-gray-50 text-xs pr-10 pl-4 py-2.5 rounded-xl border border-gray-100 focus:outline-none focus:border-gray-200 focus:bg-white transition duration-200"
            />
          </div>

          {/* چپ: دکمه‌ها */}
          <div className="flex items-center gap-4 shrink-0">
            {/* آیکون سبد خرید (فقط دسکتاپ) */}
            <button className="hidden md:block relative p-2 text-gray-600 hover:bg-gray-50 rounded-xl transition">
              <span className="text-xl">🛒</span>
              <span className="absolute top-1 left-1 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                ۰
              </span>
            </button>
            
            <div className="hidden md:block h-6 w-[1px] bg-gray-200"></div>

            {/* دکمه ورود (مشترک با ظاهر بهینه) */}
            <button className="text-xs font-bold bg-gray-900 text-white md:bg-gray-50 md:text-gray-700 md:hover:bg-gray-100 px-4 py-2 rounded-xl transition duration-200">
              ورود | ثبت‌نام
            </button>
          </div>

        </div>
      </header>

      {/* ناوبری پایینی (Bottom Nav) - کاملاً مخفی در دسکتاپ (md:hidden) و چسبان در پایین موبایل */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] z-50 px-6 py-2">
        <div className="flex items-center justify-between text-gray-500">
          <button className="flex flex-col items-center gap-1 text-red-500 font-bold">
            <span className="text-lg">🏠</span>
            <span className="text-[10px]">خانه</span>
          </button>
          <button className="flex flex-col items-center gap-1 hover:text-gray-900">
            <span className="text-lg">🗂️</span>
            <span className="text-[10px]">دسته‌بندی</span>
          </button>
          <button className="flex flex-col items-center gap-1 hover:text-gray-900 relative">
            <span className="text-lg">🛒</span>
            <span className="text-[10px]">سبد خرید</span>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
              ۰
            </span>
          </button>
          <button className="flex flex-col items-center gap-1 hover:text-gray-900">
            <span className="text-lg">👤</span>
            <span className="text-[10px]">پروفایل</span>
          </button>
        </div>
      </nav>
    </>
  );
}
