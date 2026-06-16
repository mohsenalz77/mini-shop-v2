export default function Header() {
  return (
    <>
      {/* هدر دسکتاپ */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 w-full">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-2">
            <span className="text-xl font-black text-gray-900">
              سیب<span className="text-red-500">‌شاپ</span>
            </span>
          </div>

          <div className="hidden md:flex items-center flex-1 max-w-md mx-auto relative">
            <input
              type="text"
              placeholder="جستجوی گوشی، کاور، هندزفری..."
              className="w-full bg-gray-50 text-xs pr-4 pl-4 py-2.5 rounded-xl border border-gray-100 focus:outline-none focus:border-gray-200 focus:bg-white transition"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="hidden md:block text-xl">🛒</button>
            <div className="hidden md:block h-6 w-[1px] bg-gray-200"></div>
            <button className="text-xs font-bold bg-gray-950 text-white md:bg-gray-50 md:text-gray-700 md:hover:bg-gray-100 px-4 py-2 rounded-xl transition">
              ورود | ثبت‌نام
            </button>
          </div>

        </div>
      </header>

      {/* منوی پایین موبایل */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-lg z-50 px-6 py-2">
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
