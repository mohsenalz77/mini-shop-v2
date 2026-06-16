export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* راست: لوگو */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-black text-gray-900 tracking-tight">
            سیب<span className="text-red-500">‌شاپ</span>
          </span>
        </div>

        {/* وسط: بار جستجوی عریض و شیک */}
        <div className="hidden md:flex items-center flex-1 max-w-lg mx-12 relative">
          <span className="absolute right-3 text-gray-400 text-base">🔍</span>
          <input
            type="text"
            placeholder="جستجوی گوشی، کاور، هندزفری..."
            className="w-full bg-gray-50 text-xs pr-10 pl-4 py-2.5 rounded-xl border border-gray-100 focus:outline-none focus:border-gray-200 focus:bg-white focus:ring-4 focus:ring-gray-100 transition duration-200"
          />
        </div>

        {/* چپ: ابزارها */}
        <div className="flex items-center gap-3">
          {/* سبد خرید */}
          <button className="relative p-2.5 text-gray-600 hover:bg-gray-50 rounded-xl transition duration-200">
            <span className="text-lg">🛒</span>
            <span className="absolute top-1 left-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              ۰
            </span>
          </button>
          
          <div className="h-6 w-[1px] bg-gray-200 my-auto hidden sm:block"></div>

          {/* دکمه ورود */}
          <button className="text-xs font-semibold text-gray-700 hover:text-gray-900 px-3 py-2 rounded-xl hover:bg-gray-50 transition duration-200">
            ورود یا ثبت‌نام
          </button>
        </div>
      </div>
    </header>
  );
}
