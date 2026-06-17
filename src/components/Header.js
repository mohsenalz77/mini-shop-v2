"use client";

import { useState, useEffect } from 'react';
import { 
  Search, ShoppingBag, User, ChevronDown, Menu, 
  Smartphone, Laptop, Headphones, Home, Grid 
} from 'lucide-react';

export default function Header() {
  const [isMenuVisible, setIsMenuVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 30) {
          setIsMenuVisible(false); // اسکرول به پایین -> منو و بنر جمع شوند
        } else if (window.scrollY < lastScrollY) {
          setIsMenuVisible(true); // اسکرول به بالا -> همه‌چیز باز شود
        }
        setLastScrollY(window.scrollY);
      }
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  return (
    <>
      {/* شاسی اصلی هدر - کاملاً Fixed در سقف صفحه */}
      <header className="w-full fixed top-0 left-0 right-0 z-50 flex flex-col pointer-events-none bg-transparent">
        
        {/* ۱. بنر اعلان بالایی - فیکس قطعی با انیمیشن کنترل ارتفاع (h) به جای جابجایی عمودی */}
        <div 
          className={`w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white text-center text-xs font-bold shadow-inner pointer-events-auto transition-all duration-300 ease-in-out z-50 select-none overflow-hidden flex items-center justify-center ${
            isMenuVisible ? 'h-9 py-2 px-4' : 'h-0 py-0 px-0'
          }`}
        >
          <span>جشنواره شگفت‌انگیز سیب‌شاپ؛ تا ۴۰٪ تخفیف روی لوازم جانبی موبایل ⚡</span>
        </div>

        {/* ۲. ردیف اول: لوگو، سرچ و ورود - با افکت شیشه‌ای فوق غلیظ محبوبت */}
        <div className="w-full px-4 md:px-8 h-20 flex items-center justify-between gap-8 bg-white/70 backdrop-blur-3xl border-b border-slate-100 relative z-50 pointer-events-auto shadow-xs">
          
          {/* راست: لوگو */}
          <div className="flex items-center shrink-0">
            <span className="text-2xl font-black text-slate-800 tracking-tight cursor-pointer">
              سیب<span className="text-rose-500">‌شاپ</span>
            </span>
          </div>

          {/* وسط: بار جستجو */}
          <div className="hidden md:flex items-center flex-1 max-w-2xl relative group">
            <Search className="absolute right-4 w-5 h-5 text-slate-400 group-focus-within:text-rose-500 transition duration-200" />
            <input
              type="text"
              placeholder="جستجو در سیب‌شاپ..."
              className="w-full bg-slate-100/60 text-sm font-medium pr-12 pl-4 py-3 rounded-2xl border border-transparent focus:outline-none focus:border-slate-200 focus:bg-white focus:ring-4 focus:ring-slate-100 transition duration-200"
            />
          </div>

          {/* چپ: ابزارها */}
          <div className="flex items-center gap-4 shrink-0">
            <button className="flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-slate-900 border border-slate-200 hover:bg-slate-50/80 px-4 py-2.5 rounded-xl transition duration-200">
              <User className="w-4 h-4 stroke-[2.5]" />
              <span>ورود | ثبت‌نام</span>
            </button>

            <div className="hidden md:block h-6 w-[1px] bg-slate-200/60"></div>

            <button className="hidden md:flex items-center justify-center p-2.5 text-slate-700 hover:bg-slate-50/80 rounded-xl transition duration-200 relative">
              <ShoppingBag className="w-5 h-5 stroke-[2.5]" />
              <span className="absolute -top-0.5 -left-0.5 bg-rose-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">
                ۰
              </span>
            </button>
          </div>

        </div>

        {/* ۳. ردیف دوم: منوی دسته‌بندی‌ها */}
        <div 
          className={`hidden md:block border-b border-slate-100/60 bg-white/75 backdrop-blur-2xl w-full h-12 transition-all duration-300 ease-in-out pointer-events-auto relative z-40 transform ${
            isMenuVisible 
              ? 'translate-y-0 opacity-100' 
              : '-translate-y-20 opacity-0 pointer-events-none'
          }`}
        >
          <div className="w-full px-4 md:px-8 h-12 flex items-center">
            <nav className="flex items-center gap-8 text-sm font-semibold text-slate-600">
              
              {/* آیتم مگامنو */}
              <div className="relative group/menu py-3 cursor-pointer text-slate-800 hover:text-rose-500 flex items-center gap-1.5 transition">
                <Menu className="w-4 h-4 text-slate-500 group-hover/menu:text-rose-500 transition" />
                <span className="font-bold">دسته‌بندی محصولات</span>
                <ChevronDown className="w-3 h-3 text-slate-400 group-hover/menu:rotate-180 transition duration-300" />

                {/* پاپ‌آ‌پ مگامنو */}
                <div className="absolute top-full right-0 w-[700px] bg-white border border-slate-100 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.08)] rounded-3xl p-6 grid grid-cols-3 gap-6 opacity-0 pointer-events-none group-hover/menu:opacity-100 group-hover/menu:pointer-events-auto transition-all duration-300 transform translate-y-2 group-hover/menu:translate-y-0 z-50">
                  <div>
                    <div className="flex items-center gap-1.5 text-slate-900 font-bold mb-3 text-sm">
                      <Smartphone className="w-4 h-4 text-rose-500" />
                      <span>تلفن هوشمند</span>
                    </div>
                    <ul className="space-y-2.5 font-medium text-slate-500 text-xs pr-5 border-r border-slate-100">
                      <li className="hover:text-rose-500 transition">آیفون (Apple)</li>
                      <li className="hover:text-rose-500 transition">سامسونگ (Samsung)</li>
                      <li className="hover:text-rose-500 transition">شیائومی (Xiaomi)</li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5 text-slate-900 font-bold mb-3 text-sm">
                      <Laptop className="w-4 h-4 text-blue-500" />
                      <span>لوازم جانبی</span>
                    </div>
                    <ul className="space-y-2.5 font-medium text-slate-500 text-xs pr-5 border-r border-slate-100">
                      <li className="hover:text-rose-500 transition">قاب و کاور گوشی</li>
                      <li className="hover:text-rose-500 transition">کابل و شارژر دیواری</li>
                      <li className="hover:text-rose-500 transition">پاوربانک اکسترنال</li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5 text-slate-900 font-bold mb-3 text-sm">
                      <Headphones className="w-4 h-4 text-emerald-500" />
                      <span>صوتی و پوشیدنی</span>
                    </div>
                    <ul className="space-y-2.5 font-medium text-slate-500 text-xs pr-5">
                      <li className="hover:text-rose-500 transition">ایرپاد و هندزفری</li>
                      <li className="hover:text-rose-500 transition">ساعت هوشمند</li>
                    </ul>
                  </div>
                </div>
              </div>

              <a href="#" className="hover:text-rose-500 transition py-3">برندها</a>
              <a href="#" className="hover:text-rose-500 transition py-3">تخفیف‌های ویژه</a>
              <a href="#" className="hover:text-rose-500 transition py-3">خدمات گارانتی</a>
            </nav>
          </div>
        </div>

      </header>

      {/* ۴. دایو شبیه‌ساز ارتفاع */}
      <div className="w-full h-24 md:h-40 block shrink-0"></div>

      {/* ناوبری موبایل مدرن و بهینه‌سازی شده */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-slate-100 shadow-[0_-8px_30px_rgba(0,0,0,0.06)] z-50 px-4 py-2.5 rounded-t-3xl">
        <div className="flex items-center justify-around text-slate-400">
          
          {/* دکمه خانه (فعال) */}
          <button className="flex flex-col items-center gap-1.5 text-rose-500 font-bold relative pb-1 min-w-[60px] transition duration-200">
            <span className="absolute top-0 w-1 h-1 bg-rose-500 rounded-full animate-pulse"></span>
            <Home className="w-5 h-5 mt-1 stroke-[2.5]" />
            <span className="text-[10px] font-bold tracking-tight">خانه</span>
          </button>

          {/* دکمه دسته‌بندی */}
          <button className="flex flex-col items-center gap-1.5 hover:text-slate-800 text-slate-500 font-semibold min-w-[60px] transition duration-200">
            <Grid className="w-5 h-5 stroke-[2.2]" />
            <span className="text-[10px] tracking-tight">دسته‌بندی</span>
          </button>

          {/* دکمه سبد خرید */}
          <button className="flex flex-col items-center gap-1.5 hover:text-slate-800 text-slate-500 font-semibold relative min-w-[60px] transition duration-200">
            <ShoppingBag className="w-5 h-5 stroke-[2.2]" />
            <span className="absolute top-0 right-4 bg-rose-500 text-white text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-white">
              ۰
            </span>
            <span className="text-[10px] tracking-tight">سبد خرید</span>
          </button>

          {/* دکمه پروفایل */}
          <button className="flex flex-col items-center gap-1.5 hover:text-slate-800 text-slate-500 font-semibold min-w-[60px] transition duration-200">
            <User className="w-5 h-5 stroke-[2.2]" />
            <span className="text-[10px] tracking-tight">پروفایل</span>
          </button>

        </div>
      </nav>
    </>
  );
}
