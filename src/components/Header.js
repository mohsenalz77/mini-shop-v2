"use client";

import { useState, useEffect } from 'react';
import { 
  Search, ShoppingBag, User, ChevronDown, Menu, 
  Smartphone, Laptop, Headphones, Home, Grid, X, Bell, ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCart } from "../context/CartContext";

export default function Header() {
  const [isMenuVisible, setIsMenuVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // 🔍 استیت‌های مگامودال سرچ زنده
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);

  const popularSearches = ['s26 ultra', 'ps5', 'گوشی موبایل', 'a36'];

  const pathname = usePathname();
  const router = useRouter();
  const { cartCount } = useCart();

  // ۱. افکت لود کردن داده‌ها از مرورگر (localStorage) در اولین اجرای صفحه
  useEffect(() => {
    const saved = localStorage.getItem('sibshop_recent_searches');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (e) {
        console.error("خطا در لود تاریخچه:", e);
      }
  }, []);

  // ۲. افکت ذخیره خودکار در مرورگر به محض اضافه شدن کلمه جدید
  useEffect(() => {
    if (recentSearches.length > 0) {
      localStorage.setItem('sibshop_recent_searches', JSON.stringify(recentSearches));
    }
  }, [recentSearches]);

  // کنترل اسکرول هدر برای پنهان/آشکار شدن نوار بالا
  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 30) {
          setIsMenuVisible(false);
        } else if (window.scrollY < lastScrollY) {
          setIsMenuVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  // بسته‌شدن خودکار کشو و مودال با تغییر صفحه
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchModalOpen(false);
  }, [pathname]);

  // 🚀 اکشن اجرای سرچ، فرمت متن، ثبت در تاریخچه بدون تایید تکراری و ریدایرکت
  const executeSearch = (queryText) => {
    const trimmed = queryText.trim();
    if (!trimmed) return;

    setSearchQuery(trimmed); 

    setRecentSearches(prev => {
      const filtered = prev.filter(item => item !== trimmed);
      return [trimmed, ...filtered].slice(0, 5);
    });

    setIsSearchModalOpen(false);
    router.push(`/products?search=${encodeURIComponent(trimmed)}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeSearch(searchQuery);
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('sibshop_recent_searches');
  };

  return (
    <>
      {/* ========================================================================= */}
      {/* ۱. هدر نسخه دسکتاپ */}
      {/* ========================================================================= */}
      <header className="hidden md:flex w-full fixed top-0 left-0 right-0 z-50 flex-col pointer-events-none bg-transparent">
        {/* بنر اعلان دسکتاپ */}
        <div className={`w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white text-center text-xs font-bold shadow-inner pointer-events-auto transition-all duration-300 ease-in-out z-50 select-none overflow-hidden flex items-center justify-center ${isMenuVisible ? 'h-9 py-2 px-4' : 'h-0 py-0 px-0'}`}>
          <span>جشنواره شگفت‌انگیز سیب‌شاپ؛ تا ۴۰٪ تخفیف روی لوازم جانبی موبایل ⚡</span>
        </div>

        {/* ردیف اول دسکتاپ */}
        <div className="w-full px-4 md:px-8 h-20 flex items-center justify-between gap-8 bg-white/70 backdrop-blur-3xl border-b border-slate-100 relative z-50 pointer-events-auto shadow-xs">
          <Link href="/" className="flex items-center shrink-0 pointer-events-auto">
            <span className="text-2xl font-black text-slate-800 tracking-tight cursor-pointer">
              سیب<span className="text-rose-500">‌شاپ</span>
            </span>
          </Link>

          {/* فیلد ورودی سرچ دسکتاپ */}
          <div className="flex items-center flex-1 max-w-2xl relative group pointer-events-auto">
            <Search className="absolute right-4 w-5 h-5 text-slate-400" />
            <input
              type="text"
              readOnly
              onClick={() => setIsSearchModalOpen(true)}
              placeholder="جستجو در سیب‌شاپ..."
              className="w-full bg-slate-100/60 text-sm font-medium pr-12 pl-4 py-3 rounded-2xl border border-transparent focus:outline-none cursor-pointer hover:bg-slate-100 transition duration-150"
            />
          </div>

          <div className="flex items-center gap-4 shrink-0 pointer-events-auto">
            <Link href="/login" className="flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-slate-900 border border-slate-200 hover:bg-slate-50/80 px-4 py-2.5 rounded-xl transition duration-200">
              <User className="w-4 h-4 stroke-[2.5]" />
              <span>ورود | ثبت‌نام</span>
            </Link>
            <div className="h-6 w-[1px] bg-slate-200/60"></div>
            <Link href="/cart" className="flex items-center justify-center p-2.5 text-slate-700 hover:bg-slate-50/80 rounded-xl transition duration-200 relative">
              <ShoppingBag className="w-5 h-5 stroke-[2.5]" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -left-0.5 bg-rose-500 text-white text-[10px] font-sans font-black w-5 h-5 rounded-full flex items-center justify-center shadow-xs animate-fade-in">
                  {cartCount.toLocaleString('fa-IR')}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* ردیف دوم دسکتاپ */}
        <div className={`border-b border-slate-100/60 bg-white/75 backdrop-blur-2xl w-full h-12 transition-all duration-300 ease-in-out pointer-events-auto relative z-40 transform ${isMenuVisible ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0 pointer-events-none'}`}>
          <div className="w-full px-4 md:px-8 h-12 flex items-center">
            <nav className="flex items-center gap-8 text-sm font-semibold text-slate-600">
              <div className="relative group/menu py-3 cursor-pointer text-slate-800 hover:text-rose-500 flex items-center gap-1.5 transition">
                <Menu className="w-4 h-4 text-slate-500 group-hover/menu:text-rose-500 transition" />
                <span className="font-bold">دسته‌بندی محصولات</span>
                <ChevronDown className="w-3 h-3 text-slate-400 group-hover/menu:rotate-180 transition duration-300" />
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
              <Link href="/" className="hover:text-rose-500 transition py-3">برندها</Link>
              <Link href="/" className="hover:text-rose-500 transition py-3">تخفیف‌های ویژه</Link>
              <Link href="/" className="hover:text-rose-500 transition py-3">خدمات گارانتی</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* ۲. هدر نسخه موبایل */}
      {/* ========================================================================= */}
      <header className="md:hidden w-full fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-100 flex flex-col pt-2 pb-3 px-4 gap-2.5 shadow-xs">
        <div className="w-full flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-black text-slate-800 tracking-tight">
              سیب<span className="text-rose-500">‌شاپ</span>
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <button className="p-2 text-slate-600 hover:bg-slate-50 rounded-full relative transition">
              <Bell className="w-5 h-5 stroke-[2.2]" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full"></span>
            </button>
          </div>
        </div>

        {/* باکس شبیه‌ساز سرچ در موبایل */}
        <div 
          onClick={() => setIsSearchModalOpen(true)}
          className="w-full relative flex items-center bg-slate-100 text-slate-400 text-sm font-medium pr-11 pl-4 py-3 rounded-xl cursor-pointer select-none"
        >
          <Search className="absolute right-4 w-5 h-5 text-slate-400" />
          <span>جستجو در کالاها...</span>
        </div>
      </header>

      <div className="w-full h-[120px] md:h-40 block shrink-0"></div>

      {/* ========================================================================= */}
      {/* ۳. پیاده‌سازی مگامودال سرچ پیشرفته (دسکتاپ و موبایل کاملاً مطابق تصاویر) */}
      {/* ========================================================================= */}
      {isSearchModalOpen && (
        <div className="fixed inset-0 bg-white md:bg-slate-900/40 md:backdrop-blur-xs z-[100] flex justify-center md:items-start md:pt-6 direction-rtl antialiased">
          
          {/* محفظه اصلی مگامودال */}
          <div className="w-full h-full md:h-auto md:max-w-3xl bg-white md:rounded-3xl md:shadow-2xl flex flex-col overflow-hidden">
            
            {/* ردیف بالای فیلد سرچ اصلی */}
            <div className="px-4 py-3 md:px-5 md:py-4 border-b border-slate-100 flex items-center gap-3">
              {/* دکمه بازگشت در نسخه موبایل */}
              <button 
                onClick={() => setIsSearchModalOpen(false)} 
                className="md:hidden p-1.5 text-slate-700 hover:bg-slate-100 rounded-full transition shrink-0"
              >
                <ArrowRight className="w-6 h-6" />
              </button>

              <div className="relative flex-1 flex items-center">
                <Search className="absolute right-4 w-5 h-5 text-rose-500" />
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="جستجو در همه کالاها..."
                  /* 🚀 فیکس شد: استفاده از text-base (حداقل 16px) در موبایل جهت جلوگیری از زوم خودکار مرورگر */
                  className="w-full bg-slate-50 text-base md:text-sm font-bold text-slate-800 pr-12 pl-12 py-3 md:py-3.5 rounded-2xl border-2 border-rose-500/10 focus:outline-none focus:border-rose-500 focus:bg-white transition"
                />
                {searchQuery && (
                  /* 🚀 فیکس شد: هم‌ترازی دقیق دکمه حذف متن با اینپوت جدید */
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute left-4 p-1 text-slate-400 hover:text-slate-600 transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* دکمه بستن در دسکتاپ */}
              <button 
                onClick={() => setIsSearchModalOpen(false)}
                className="hidden md:flex p-2 bg-slate-100 hover:bg-rose-50 hover:text-rose-500 rounded-xl transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* بدنه محتوایی لایو سرچ */}
            <div className="p-5 md:p-6 flex-1 overflow-y-auto max-h-[calc(100vh-80px)] md:max-h-[75vh] flex flex-col gap-6 text-right">
              
              {/* بخش اول: جستجوهای اخیر */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black text-slate-800">جستجوهای اخیر</span>
                  {recentSearches.length > 0 && (
                    <button 
                      onClick={clearRecentSearches}
                      className="text-[10px] font-bold text-slate-400 hover:text-rose-500 transition px-2 py-1 rounded-md"
                    >
                      پاک کردن
                    </button>
                  )}
                </div>

                {recentSearches.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((search, idx) => (
                      <button
                        key={idx}
                        onClick={() => executeSearch(search)}
                        className="bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-bold px-3.5 py-2 rounded-xl border border-slate-100 transition"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-[11px] text-slate-400 font-medium">هیچ تاریخچه جستجویی وجود ندارد.</p>
                )}
              </div>

              {/* بخش دوم: جستجوهای پرطرفدار */}
              <div>
                <span className="text-xs font-black text-slate-800 block mb-3">جستجوهای پرطرفدار</span>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((pop, idx) => (
                    <button
                      key={idx}
                      onClick={() => executeSearch(pop)}
                      className="bg-white hover:bg-rose-50/40 text-slate-700 text-xs font-black px-4 py-2 rounded-xl border border-slate-200/70 shadow-3xs flex items-center gap-1.5 transition"
                    >
                      <span className="text-slate-300 text-[10px]">↗</span>
                      <span>{pop}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 🚀 فیکس شد: نمایش بنر هوشمند تبلیغاتی در دسکتاپ و موبایل با طراحی کاملاً واکنش‌گرا */}
              <div className="w-full mt-2">
                <div className="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 rounded-2xl p-4 md:p-5 text-white relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm select-none">
                  <div className="z-10 flex flex-col gap-1">
                    <span className="text-[9px] md:text-xs font-black bg-white/20 px-2.5 py-1 rounded-full w-max">این تابستون انجامش بدیم! ☀️</span>
                    <p className="text-[10px] md:text-[11px] font-bold text-white/90">برای هر چیزی که تو این تابستون لازم داری روی سیب‌شاپ حساب کن</p>
                  </div>
                  <button 
                    onClick={() => executeSearch('جانبی موبایل')}
                    className="bg-slate-950/90 text-white text-[9px] md:text-[10px] font-black px-3.5 py-2 md:py-2.5 rounded-xl hover:bg-slate-950 transition z-10 shadow-xs shrink-0"
                  >
                    شروع خرید شگفت‌انگیز
                  </button>
                  <div className="absolute -right-10 -bottom-10 w-28 h-28 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* ناوبری پایین موبایل */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-slate-100 shadow-[0_-8px_30px_rgba(0,0,0,0.06)] z-50 px-4 py-2 rounded-t-2xl">
        <div className="flex items-center justify-around text-slate-400">
          <Link href="/" className={`flex flex-col items-center gap-1 min-w-[60px] py-1 transition duration-200 ${pathname === '/' && !isMobileMenuOpen ? 'text-rose-500 font-bold scale-102' : 'text-slate-400 font-medium hover:text-slate-700'}`}>
            <Home className="w-5 h-5 stroke-[2.3]" />
            <span className="text-[10px] tracking-tight">خانه</span>
          </Link>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={`flex flex-col items-center gap-1 font-semibold min-w-[60px] py-1 transition duration-200 ${isMobileMenuOpen ? 'text-rose-500 font-bold scale-102' : 'text-slate-400 hover:text-slate-700'}`}>
            <Grid className="w-5 h-5 stroke-[2.2]" />
            <span className="text-[10px] tracking-tight">دسته‌بندی</span>
          </button>
          <Link href="/cart" className={`flex flex-col items-center gap-1 min-w-[60px] py-1 transition duration-200 ${pathname === '/cart' && !isMobileMenuOpen ? 'text-rose-500 font-bold scale-102' : 'text-slate-400 font-medium hover:text-slate-700'}`}>
            <div className="w-6 h-6 flex items-center justify-center relative">
              <ShoppingBag className="w-5 h-5 stroke-[2.2]" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -left-1.5 bg-rose-500 text-white text-[9px] font-sans font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border border-white shadow-xs leading-none">{cartCount}</span>
              )}
            </div>
            <span className="text-[10px] tracking-tight">سبد خرید</span>
          </Link>
          <Link href="/login" className={`flex flex-col items-center gap-1 min-w-[60px] py-1 transition duration-200 ${pathname === '/login' && !isMobileMenuOpen ? 'text-rose-500 font-bold' : 'text-slate-400 font-medium hover:text-slate-700'}`}>
            <User className="w-5 h-5 stroke-[2.2]" />
            <span className="text-[10px] tracking-tight">پروفایل</span>
          </Link>
        </div>
      </nav>

      {/* منوی کشویی دسته‌بندی موبایل */}
      <div className={`fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 transition-opacity duration-300 md:hidden ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMobileMenuOpen(false)}>
        <div className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-[2.5rem] p-6 max-h-[85vh] overflow-y-auto transition-transform duration-300 ease-out transform shadow-[0_-10px_40px_rgba(0,0,0,0.12)] ${isMobileMenuOpen ? 'translate-y-0' : 'translate-y-full'}`} onClick={(e) => e.stopPropagation()}>
          <div className="w-14 h-1.5 bg-slate-200 rounded-full mx-auto mb-5 cursor-pointer" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-black text-slate-800">دسته‌بندی محصولات سیب‌شاپ</h3>
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-1.5 bg-slate-100 text-slate-500 rounded-full hover:bg-slate-200 transition"><X className="w-4 h-4" /></button>
          </div>
          <div className="space-y-5 pb-8">
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
          </div>
        </div>
      </div>
    </>
  );
}
