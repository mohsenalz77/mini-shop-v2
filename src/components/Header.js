export default function Header() {
  return (
    <>
      {/* هدر بالایی (مشترک دسکتاپ و موبایل با ظاهر متفاوت) */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          
          {/* راست: لوگو */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xl font-black text-gray-900 tracking-tight">
              سیب<span className="text-red-500">‌شاپ</span>
            </span>
          </div>

          {/* وسط: بار جستجو (در موبایل مخفی، در دسکتاپ عریض) */}
          <div className="hidden md:flex items-center flex-1 max-w-lg mx-auto relative">
            <span className="absolute right-3 text-gray-400 text-sm">🔍</span>
            <input
              type="text"
              placeholder="جستجوی گوشی، کاور، هندزفری..."
              className="w-full bg-gray-50 text-xs pr-10 pl-4 py-2.5 rounded-xl border border-gray-100 focus:outline-none focus:border-gray-200 focus:bg-white focus:ring-4 focus:ring-gray-100 transition duration-200"
            />
          </div>

          {/* چپ: ابزارها (در دسکتاپ کامل، در موبایل فقط دکمه ورود) */}
          <div className="flex items-center gap-4 shrink-0">
            {/* دکمه سرچ کمکی فقط برای موبایل */}
            <button className="md:hidden p-2 text-gray-600 hover:bg-gray-50 rounded-xl transition">
              🔍
            </button>

            {/* سبد خرید (فقط در دسکتاپ اینجا نشان داده می‌شود) */}
            <button className="hidden md:relative md:block p-2.5 text-gray-600 hover:bg-gray-50 rounded-xl transition duration-200">
              <span className="text-lg">🛒</span>
              <span className="absolute top-1 left-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                ۰
              </span>
            </button>
            
            <div className="h-6 w-[1px] bg-gray-200 my-auto hidden md:block"></div>

            {/* دکمه ورود */}
            <button className="text-xs font-bold bg-gray-900 text-white md:bg-transparent md:text-gray-700 md:hover:text-gray-900 px-4 py-2 md:px-3 md:py-2 rounded-xl md:hover:bg-gray-50 transition duration-200">
              ورود
            </button>
          </div>
        </div>
      </header>

      {/* منوی ناوبری پایینی (Bottom Navigation) - فقط مخصوص موبایل */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.03)] z-50 px-6 py-2">
        <div className="flex items-center justify-between text-gray-600">
          <button className="flex flex-col items-center gap-1 text-red-500 font-bold">
            <span className="text-lg">🏠</span>
            <span className="text-[10px]">خانه</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-900">
            <span className="text-lg">🗂️</span>
            <span className="text-[10px]">دسته‌بندی</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-900 relative">
            <span className="text-lg">🛒</span>
            <span className="text-[10px]">سبد خرید</span>
            <span className="absolute -top-1 -right-1.5 bg-red-500 text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
              ۰
            </span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-900">
            <span className="text-lg">👤</span>
            <span className="text-[10px]">پروفایل</span>
          </button>
        </div>
      </nav>
    </>
  );
}
