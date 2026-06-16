export default function Header() {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* لوگو */}
        <div className="text-xl font-black text-gray-900 tracking-tight">
          سیب<span className="text-red-500">شاپ</span>
        </div>

        {/* بار جستجو */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
          <input
            type="text"
            placeholder="جستجوی گوشی، کاور، شارژر..."
            className="w-full bg-gray-50 text-sm px-4 py-2 rounded-xl border border-gray-100 focus:outline-none focus:border-gray-300 transition"
          />
        </div>

        {/* سبد خرید و پروفایل */}
        <div className="flex items-center gap-4">
          <button className="relative p-2 text-gray-600 hover:bg-gray-50 rounded-xl transition">
            🛒
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
              ۰
            </span>
          </button>
          <button className="bg-gray-900 text-white text-sm px-4 py-2 rounded-xl font-medium hover:bg-gray-800 transition">
            ورود / ثبت‌نام
          </button>
        </div>
      </div>
    </header>
  );
}
