"use client";

import { useState, useEffect } from 'react';
import { 
  Search, ShoppingBag, User, ChevronDown, Menu, 
  Smartphone, Laptop, Headphones, Home, Grid, X, Bell
} from 'lucide-react';

export default function Header() {
  const [isMenuVisible, setIsMenuVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      {/* ========================================================================= */}
      {/* ۱. هدر نسخه دسکتاپ (کاملاً دست‌نخورده و فیکس) */}
      {/* ========================================================================= */}
      <header className="hidden md:flex w-full fixed top-0 left-0 right-0 z-50 flex-col pointer-events-none bg-transparent">
        {/* بنر اعلان دسکتاپ */}
        <div 
          className={`w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white text-center text-xs font-bold shadow-inner pointer-events-auto transition-all duration-300 ease-in-out z-50 select-none overflow-hidden flex items-center justify-center ${
            isMenuVisible ? 'h-9 py-2 px-4' : 'h-0 py-0 px-0'
          }`}
        >
          <span>جشنواره شگفت‌انگیز سیب‌شاپ؛ تا ۴۰٪ تخفیف روی لوازم جانبی موبایل ⚡</span>
        </div>

        {/* ردیف اول دسکتاپ */}
        <div className="w-full px-4 md:px-8 h-20 flex items-center justify-between gap-8 bg-white/70 backdrop-blur-3xl border-b border-slate-100 relative z-50 pointer-events-auto shadow-xs">
          <div className="flex items-center shrink-0">
            <span className="text-2xl font-black text-slate-800 tracking-tight cursor-pointer">
              سیب<span className="text-rose-500">‌شاپ</span>
            </span>
          </div>

          <div className="flex items-center flex-1 max-w-2xl relative group">
            <Search className="absolute right-4 w-5 h-5 text-slate-400 group-focus-within:text-rose-500 transition duration-200" />
            <input
              type="text"
              placeholder="جستجو در سیب‌شاپ..."
              className="w-full bg-slate-100/60 text-sm font-medium pr-12 pl-4 py-3 rounded-2xl border border-transparent focus:outline-none focus:border-slate-200 focus:bg-white focus:ring-4 focus:ring-slate-100 transition duration-200"
            />
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <button className="flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-slate-900 border border-slate-200 hover:bg-slate-50/80 px-4 py-2.5 rounded-xl transition duration-200">
              <User className="w-4 h-4 stroke-[2.5]" />
              <span>ورود | ثبت‌نام</span>
            </button>
            <div className="h-6 w-[1px] bg-slate-200/60"></div>
            <button className="flex items-center justify-center p-2.5 text-slate-700 hover:bg-slate-50/80 rounded-xl transition duration-200 relative">
              <ShoppingBag className="w-5 h-5 stroke-[2.5]" />
              <span className="absolute -top-0.5 -left-0.5 bg-rose-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">۰</span>
            </button>
          </div>
        </div>

        {/* ردیف دوم دسکتاپ: منوی دسته‌بندی‌ها */}
        <div 
          className={`border-b border-slate-100/60 bg-white/75 backdrop-blur-2xl w-full h-12 transition-all duration-300 ease-in-out pointer-events-auto relative z-40 transform ${
            isMenuVisible ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0 pointer-events-none'
          }`}
        >
          <div className="w-full px-4 md:px-8 h-12 flex items-center">
            <nav className="flex items-center gap-8 text-sm font-semibold text-slate-600">
              <div className="relative group/menu py-3 cursor-pointer text-slate-800 hover:text-rose-500 flex items-center gap-1.5 transition">
                <Menu className="w-4 h-4 text-slate-500 group-hover/menu:text-rose-500 transition" />
                <span className="font-bold">دسته‌بندی محصولات</span>
                <ChevronDown className="w-3 h-3 text-slate-400 group-hover/menu:rotate-180 transition duration-300" />

                {/* پاپ آپ مگامنو */}
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

      {/* ========================================================================= */}
      {/* ۲. هدر جدید نسخه موبایل (فیکس شده در بالا، کاملاً مطابق تصویر دیجی‌کالا) */}
      {/* ========================================================================= */}
      <header className="md:hidden w-full fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-100 flex flex-col pt-2 pb-3 px-4 gap-2.5 shadow-xs">
        
        {/* ردیف اول موبایل: لوگو چپ / نوتیفیکیشن و اعلان راست */}
        <div className="w-full flex items-center justify-between">
          {/* راست: لوگو سیب‌شاپ مشابه تصویر */}
          <div className="flex items-center">
            <span className="text-xl font-black text-slate-800 tracking-tight">
              سیب<span className="text-rose-500">‌شاپ</span>
            </span>
          </div>

          {/* چپ: آیکون نوتیفیکیشن زنگوله مدرن */}
          <div className="flex items-center gap-2">
            <button className="p-2 text-slate-600 hover:bg-slate-50 rounded-full relative transition">
              <Bell className="w-5 h-5 stroke-[2.2]" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full"></span>
            </button>
          </div>
        </div>

        {/* ردیف دوم موبایل: باکس جستجوی سراسری مشابه دیجی‌کالا */}
        <div className="w-full relative flex items-center">
          <Search className="absolute right-4 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="جستجو در سیب‌شاپ..."
            className="w-full bg-slate-100 text-sm font-medium pr-11 pl-4 py-3 rounded-xl border border-transparent focus:outline-none focus:bg-slate-50 transition duration-150"
          />
        </div>
      </header>

      {/* ========================================================================= */}
      {/* ۳. دایو شبیه‌ساز ارتفاع (Spacer) */}
      {/* ========================================================================= */}
      <div className="w-full h-[120px] md:h-40 block shrink-0"></div>

      {/* ========================================================================= */}
      {/* ۴. ناوبری پایین موبایل + سیستم هوشمند منوی دسته‌بندی (Bottom Sheet) */}
      {/* ========================================================================= */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-slate-100 shadow-[0_-8px_30px_rgba(0,0,0,0.06)] z-50 px-4 py-2.5 rounded-t-3xl">
        <div className="flex items-center justify-around text-slate-400">
          
          <button className="flex flex-col items-center gap-1.5 text-rose-500 font-bold relative pb-1 min-w-[60px]">
            <span className="absolute top-0 w-1 h-1 bg-rose-500 rounded-full animate-pulse"></span>
            <Home className="w-5 h-5 mt-1 stroke-[2.5]" />
            <span className="text-[10px] font-bold tracking-tight">خانه</span>
          </button>

          {/* دکمه دسته‌بندی با قابلیت باز کردن کشو */}
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className={`flex flex-col items-center gap-1.5 font-semibold min-w-[60px] transition duration-200 ${isMobileMenuOpen ? 'text-rose-500' : 'text-slate-500 hover:text-slate-800'}`}
          >
            <Grid className="w-5 h-5 stroke-[2.2]" />
            <span className="text-[10px] tracking-tight">دسته‌بندی</span>
          </button>

          <button className="flex flex-col items-center gap-1.5 text-slate-500 hover:text-slate-800 font-semibold relative min-w-[60px]">
            <ShoppingBag className="w-5 h-5 stroke-[2.2]" />
            <span className="absolute top-0 right-4 bg-rose-500 text-white text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-white">۰</span>
            <span className="text-[10px] tracking-tight">سبد خرید</span>
          </button>

          <button className="flex flex-col items-center gap-1.5 text-slate-500 hover:text-slate-800 font-semibold min-w-[60px]">
            <User className="w-5 h-5 stroke-[2.2]" />
            <span className="text-[10px] tracking-tight">پروفایل</span>
          </button>
        </div>
      </nav>

      {/* ========================================================================= */}
      {/* ۵. منوی کشویی دسته‌بندی موبایل (Bottom Drawer) - کاملاً واکنش‌گرا */}
      {/* ========================================================================= */}
      <div 
        className={`fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div 
          className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-[2.5rem] p-6 max-h-[85vh] overflow-y-auto transition-transform duration-300 ease-out transform shadow-[0_-10px_40px_rgba(0,0,0,0.12)] ${
            isMobileMenuOpen ? 'translate-y-0' : 'translate-y-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* خط دستگیره بالای منو برای حس نیتیو */}
          <div className="w-14 h-1.5 bg-slate-200 rounded-full mx-auto mb-5 cursor-pointer" onClick={() => setIsMobileMenuOpen(false)}></div>
          
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-black text-slate-800">دسته‌بندی محصولات سیب‌شاپ</h3>
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-1.5 bg-slate-100 text-slate-500 rounded-full hover:bg-slate-200 transition">
              <X className="w-4 h-4" />
            </button>
          </div>
          
          {/* ساختار محتوایی دسته‌بندی‌ها به صورت کارت‌های بهینه */}
          <div className="space-y-5 pb-8">
            {/* گروه ۱ */}
            <div className="bg-slate-50/60 p-4 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-2 text-slate-900 font-bold mb-3 text-sm">
                <Smartphone className="w-5 h-5 text-rose-500" />
                <span>تلفن هوشمند</span>
              </div>
              <div className="flex flex-wrap gap-2 pr-1">
                <span className="bg-white text-slate-700 text-xs font-medium px-3 py-2 rounded-xl border border-slate-100 shadow-2xs">آیفون (Apple)</span>
                <span className="bg-white text-slate-700 text-xs font-medium px-3 py-2 rounded-xl border border-slate-100 shadow-2xs">سامسونگ (Samsung)</span>
                <span className="bg-white text-slate-700 text-xs font-medium px-3 py-2 rounded-xl border border-slate-100 shadow-2xs">شیائومی (Xiaomi)</span>
              </div>
            </div>

            {/* گروه ۲ */}
            <div className="bg-slate-50/60 p-4 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-2 text-slate-900 font-bold mb-3 text-sm">
                <Laptop className="w-5 h-5 text-blue-500" />
                <span>لوازم جانبی</span>
              </div>
              <div className="flex flex-wrap gap-2 pr-1">
                <span className="bg-white text-slate-700 text-xs font-medium px-3 py-2 rounded-xl border border-slate-100 shadow-2xs">قاب و کاور گوشی</span>
                <span className="bg-white text-slate-700 text-xs font-medium px-3 py-2 rounded-xl border border-slate-100 shadow-2xs">کابل و شارژر</span>
                <span className="bg-white text-slate-700 text-xs font-medium px-3 py-2 rounded-xl border border-slate-100 shadow-2xs">پاوربانک</span>
              </div>
            </div>

            {/* گروه ۳ */}
            <div className="bg-slate-50/60 p-4 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-2 text-slate-900 font-bold mb-3 text-sm">
                <Headphones className="w-5 h-5 text-emerald-500" />
                <span>صوتی و پوشیدنی</span>
              </div>
              <div className="flex flex-wrap gap-2 pr-1">
                <span className="bg-white text-slate-700 text-xs font-medium px-3 py-2 rounded-xl border border-slate-100 shadow-2xs">ایرپاد و هندزفری</span>
                <span className="bg-white text-slate-700 text-xs font-medium px-3 py-2 rounded-xl border border-slate-100 shadow-2xs">ساعت هوشمند</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
