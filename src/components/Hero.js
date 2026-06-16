export default function Hero() {
  return (
    <div className="max-w-7xl mx-auto px-4 my-6">
      {/* اصلاح رنگ گرادینت برای تایلوند ۳ */}
      <div className="bg-gradient-to-tr from-gray-900 via-zinc-900 to-black text-white rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between shadow-sm relative overflow-hidden">
        
        <div className="z-10 max-w-md text-center md:text-right flex flex-col items-center md:items-start">
          <span className="bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-wider">
            پیشنهاد ویژه هفته
          </span>
          <h1 className="text-2xl md:text-4xl font-black mt-4 mb-3 leading-tight text-white">
            نسل جدید پرچمدارها رسیده است
          </h1>
          <p className="text-gray-400 text-xs md:text-sm mb-6 leading-6">
            خرید نقدی و اقساطی انواع تلفن‌های هوشمند همراه با گارانتی معتبر ۱۸ ماهه شرکتی.
          </p>
          <button className="bg-white text-gray-900 text-xs font-bold px-5 py-3 rounded-xl hover:bg-gray-100 transition shadow-md">
            مشاهده و خرید محصولات
          </button>
        </div>
        
        {/* شبیه‌ساز تصویر موبایل */}
        <div className="hidden md:flex mt-8 md:mt-0 w-44 h-72 bg-gradient-to-b from-zinc-800 to-zinc-700 rounded-[2rem] border-4 border-zinc-800 shadow-2xl relative items-center justify-center transform md:rotate-6 hover:rotate-0 transition duration-500">
          <div className="absolute top-2 w-14 h-3.5 bg-black rounded-full"></div>
          <span className="text-[10px] text-zinc-500">Minimal Mobile</span>
        </div>
        
      </div>
    </div>
  );
}
