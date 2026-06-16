export default function Hero() {
  return (
    <div className="max-w-7xl mx-auto px-4 my-6">
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between shadow-sm relative overflow-hidden">
        <div className="z-10 max-w-md text-center md:text-right">
          <span className="bg-red-500 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            پیشنهاد ویژه هفته
          </span>
          <h1 className="text-3xl md:text-5xl font-black mt-4 mb-2 leading-tight">
            نسل جدید پرچمدارها رسیده است
          </h1>
          <p className="text-gray-400 text-sm md:text-base mb-6">
            خرید نقدی و اقساطی انواع تلفن‌های هوشمند همراه با گارانتی معتبر ۱۸ ماهه.
          </p>
          <button className="bg-white text-gray-900 font-bold px-6 py-3 rounded-xl hover:bg-gray-100 transition shadow-md">
            مشاهده و خرید
          </button>
        </div>
        
        {/* شبیه‌ساز تصویر موبایل با CSS مینیمال */}
        <div className="mt-8 md:mt-0 w-48 h-80 bg-gradient-to-tr from-gray-700 to-gray-600 rounded-[2.5rem] border-4 border-gray-800 shadow-2xl relative flex items-center justify-center transform md:rotate-6 hover:rotate-0 transition duration-500">
          <div className="absolute top-3 w-16 h-4 bg-black rounded-full"></div> {/* ناچ گوشی */}
          <span className="text-xs text-gray-400">Minimal Mobile</span>
        </div>
      </div>
    </div>
  );
}
