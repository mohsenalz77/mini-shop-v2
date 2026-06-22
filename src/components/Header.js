"use client";

import { useState, useEffect, useRef } from 'react';
import { 
  Search, ShoppingBag, User, ChevronDown, Menu, 
  Smartphone, Laptop, Headphones, Home, Grid, X, Bell, ArrowRight,
  UserCheck, LogOut, Package, Heart, HelpCircle, Award
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCart } from "../context/CartContext";

// نقشه کمکی برای تبدیل نام متنی آیکون در استراپی به کامپوننت واقعی Lucide
const iconMap = {
  Smartphone: Smartphone,
  Laptop: Laptop,
  Headphones: Headphones,
};

const popularBrands = [
  { name: "اپل (Apple)", slug: "apple" },
  { name: "سامسونگ (Samsung)", slug: "samsung" },
  { name: "انکر (Anker)", slug: "anker" },
  { name: "باسئوس (Baseus)", slug: "baseus" },
  { name: "شیائومی (Xiaomi)", slug: "xiaomi" }
];

export default function Header() {
  const [isMenuVisible, setIsMenuVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // 🔍 استیت‌های مگامودال سرچ زنده
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  
  // 🔑 استیت‌های وضعیت لاگین کاربر متصل به سرور استراپی
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  // 🔽 استیت‌های کنترل بازشدن منوهای دسکتاپ و کشوی اعلان موبایل
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isBrandsDropdownOpen, setIsBrandsDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  
  // 🚀 استیت دسته‌بندی‌های داینامیک فچ شده از Strapi
  const [menuCategories, setMenuCategories] = useState([]);

  const dropdownTimer = useRef(null);
  const brandsTimer = useRef(null);
  const [animateModal, setAnimateModal] = useState(false);

  const popularSearches = ['s26 ultra', 'ps5', 'گوشی موبایل', 'a36'];

  const pathname = usePathname();
  const router = useRouter();
  const { cartCount } = useCart();

  useEffect(() => {
    if (isSearchModalOpen) {
      setTimeout(() => setAnimateModal(true), 10);
    } else {
      setAnimateModal(false);
    }
  }, [isSearchModalOpen]);

  // ۱. افکت لود کردن داده‌های سرچ، وضعیت احراز هویت و فچ دسته‌بندی‌ها از Strapi
  useEffect(() => {
    // الف) لود تاریخچه سرچ
    const saved = localStorage.getItem('sibshop_recent_searches');
    if (saved) {
      try { setRecentSearches(JSON.parse(saved)); } catch (e) { console.error(e); }
    } else { setRecentSearches([]); } 

    // ب) بررسی توکن و دیتای لاگین یوزر استراپی
    const token = localStorage.getItem('sibshop_token');
    const savedUser = localStorage.getItem('sibshop_user');
    if (token && savedUser) {
      try {
        setIsLoggedIn(true);
        setUserData(JSON.parse(savedUser));
      } catch (error) {
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
      setUserData(null);
    }

    // ج) فچ داینامیک دسته‌بندی‌ها و کامپوننت‌های تکرارشونده از Strapi
    const fetchStrapiCategories = async () => {
      try {
        const res = await fetch('http://localhost:1337/api/categories?populate=*');
        const json = await res.json();
        if (json && json.data) {
          setMenuCategories(json.data);
        }
      } catch (err) {
        console.error("خطا در دریافت دسته‌بندی‌ها از استراپی:", err);
      }
    };
    fetchStrapiCategories();
  }, [pathname]);

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
          setIsProfileDropdownOpen(false);
          setIsBrandsDropdownOpen(false);
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
    setIsProfileDropdownOpen(false);
    setIsBrandsDropdownOpen(false);
    setIsNotificationOpen(false);
  }, [pathname]);

  // هندلرهای هوشمند هاور دسکتاپ (پروفایل)
  const handleProfileEnter = () => {
    if (dropdownTimer.current) clearTimeout(dropdownTimer.current);
    setIsProfileDropdownOpen(true);
  };
  const handleProfileLeave = () => {
    dropdownTimer.current = setTimeout(() => setIsProfileDropdownOpen(false), 180); 
  };

  // هندلرهای هوشمند هاور دسکتاپ (برندها)
  const handleBrandsEnter = () => {
    if (brandsTimer.current) clearTimeout(brandsTimer.current);
    setIsBrandsDropdownOpen(true);
  };
  const handleBrandsLeave = () => {
    brandsTimer.current = setTimeout(() => setIsBrandsDropdownOpen(false), 180);
  };

  const executeSearch = (queryText) => {
    const trimmed = queryText.trim();
    if (!trimmed) return;
    setSearchQuery(trimmed); 
    setRecentSearches(prev => [trimmed, ...prev.filter(item => item !== trimmed)].slice(0, 5));
    setIsSearchModalOpen(false);
    router.push(`/products?search=${encodeURIComponent(trimmed)}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') executeSearch(searchQuery);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('sibshop_recent_searches');
  };

  const handleLogout = () => {
    localStorage.removeItem('sibshop_token');
    localStorage.removeItem('sibshop_user');
    setIsLoggedIn(false);
    setUserData(null);
    setIsProfileDropdownOpen(false);
    router.push('/');
  };

  const isProfileActive = (pathname === '/login' || pathname === '/profile') && !isMobileMenuOpen;

  const getUserDisplayName = () => {
    if (!userData) return "ورود | ثبت‌نام";
    if (userData.name && userData.name.trim() !== "") return userData.name;
    return "حساب کاربری";
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

          {/* بخش پروفایل هوشمند با منوی بازشو دسکتاپ */}
          <div className="flex items-center gap-6 shrink-0 pointer-events-auto">
            {isLoggedIn ? (
              <div className="relative" onMouseEnter={handleProfileEnter} onMouseLeave={handleProfileLeave}>
                <button className={`flex items-center justify-between gap-1.5 text-sm font-bold text-slate-700 hover:text-rose-500 border border-slate-200 rounded-xl px-3.5 py-2 w-44 transition-all duration-200 bg-slate-50/50 cursor-pointer select-none ${isProfileDropdownOpen ? 'border-rose-200 bg-white shadow-xs' : ''}`}>
                  <div className="flex items-center gap-1.5 truncate">
                    <User className="w-4 h-4 text-slate-500 shrink-0 stroke-[2.2]" />
                    <span className="truncate">{getUserDisplayName()}</span>
                  </div>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform duration-300 ${isProfileDropdownOpen ? 'rotate-180 text-rose-500' : ''}`} />
                </button>

                <div className={`absolute top-[100%] pt-1 left-0 w-full z-50 transition-all duration-250 origin-top text-right ${isProfileDropdownOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}>
                  <div className="bg-white border border-slate-100 shadow-xl rounded-xl p-1.5 flex flex-col gap-0.5">
                    <Link href="/profile" className="flex items-center gap-2 px-3 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-rose-500 rounded-lg transition">
                      <UserCheck className="w-4 h-4 stroke-[2.2]" />
                      <span>مشاهده حساب کاربری</span>
                    </Link>
                    <Link href="/profile/orders" className="flex items-center gap-2 px-3 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-rose-500 rounded-lg transition">
                      <Package className="w-4 h-4 stroke-[2.2]" />
                      <span>سفارش‌های من</span>
                    </Link>
                    <div className="h-[1px] bg-slate-100 my-1"></div>
                    <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-2.5 text-xs font-bold text-rose-500 hover:bg-rose-50 rounded-lg transition w-full cursor-pointer">
                      <LogOut className="w-4 h-4 stroke-[2.2]" />
                      <span>خروج از حساب</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link href="/login" className="flex items-center gap-1.5 text-sm font-bold text-slate-700 hover:text-rose-500 border border-slate-200 rounded-xl px-3.5 py-2 transition duration-200 bg-white">
                <User className="w-4 h-4 stroke-[2.2]" />
                <span>ورود | ثبت‌نام</span>
              </Link>
            )}

            <div className="h-6 w-[1px] bg-slate-200"></div>
            
            {/* لیست علاقه‌مندی‌ها در دسکتاپ */}
            <Link href="/profile/favorites" className="p-2 text-slate-600 hover:text-rose-500 rounded-xl transition relative">
              <Heart className="w-5 h-5 stroke-[2.2]" />
            </Link>

            <Link href="/cart" className="flex items-center justify-center p-2 text-slate-700 hover:text-rose-500 rounded-xl transition duration-200 relative">
              <ShoppingBag className="w-5 h-5 stroke-[2.2]" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -left-0.5 bg-rose-500 text-white text-[10px] font-sans font-black w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                  {cartCount.toLocaleString('fa-IR')}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* ردیف دوم دسکتاپ */}
        <div className={`border-b border-slate-100/60 bg-white/75 backdrop-blur-2xl w-full h-12 transition-all duration-300 ease-in-out pointer-events-auto relative z-40 transform ${isMenuVisible ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0 pointer-events-none'}`}>
          <div className="w-full px-4 md:px-8 h-12 flex items-center justify-between">
            <nav className="flex items-center gap-8 text-sm font-semibold text-slate-600">
              
              {/* 🌟 مگامنو ۱۰۰٪ پویا متصل به جداول و کامپوننت‌های Strapi */}
              <div className="relative group/menu py-3 cursor-pointer text-slate-800 hover:text-rose-500 flex items-center gap-1.5 transition">
                <Menu className="w-4 h-4 text-slate-500 group-hover/menu:text-rose-500 transition" />
                <span className="font-bold">دسته‌بندی محصولات</span>
                <ChevronDown className="w-3 h-3 text-slate-400 group-hover/menu:rotate-180 transition duration-300" />
                
                <div className="absolute top-full right-0 w-[700px] bg-white border border-slate-100 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.08)] rounded-3xl p-6 grid grid-cols-3 gap-6 opacity-0 pointer-events-none group-hover/menu:opacity-100 group-hover/menu:pointer-events-auto transition-all duration-300 transform translate-y-2 group-hover/menu:translate-y-0 z-50">
                  {menuCategories.map((category) => {
                    // خواندن داینامیک نام آیکون از استراپی و اتصال به کامپوننت لوساید
                    const IconComponent = iconMap[category.iconName] || Smartphone;
                    return (
                      <div key={category.id}>
                        <div className="flex items-center gap-1.5 text-slate-900 font-bold mb-3 text-sm">
                          <IconComponent className="w-4 h-4 text-rose-500" />
                          <span>{category.title}</span>
                        </div>
                        <ul className="space-y-2.5 font-medium text-slate-500 text-xs pr-5 border-r border-slate-100 text-right">
                          {category.subCategories && category.subCategories.map((sub, index) => (
                            <li key={index}>
                              <Link href={`/products?category=${category.slug}&sub=${sub.slug}`} className="hover:text-rose-500 transition block py-0.5">
                                {sub.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* منوی بازشوی هوشمند برندها */}
              <div 
                className="relative py-3 cursor-pointer hover:text-rose-500 transition flex items-center gap-1"
                onMouseEnter={handleBrandsEnter}
                onMouseLeave={handleBrandsLeave}
              >
                <span>برندها</span>
                <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${isBrandsDropdownOpen ? 'rotate-180 text-rose-500' : ''}`} />
                
                <div className={`absolute top-full right-0 w-44 bg-white border border-slate-100 shadow-xl rounded-xl p-1.5 z-50 flex flex-col gap-0.5 transition-all duration-200 origin-top text-right ${isBrandsDropdownOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}>
                  {popularBrands.map((brand, idx) => (
                    <Link key={idx} href={`/brands/${brand.slug}`} className="px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-rose-500 rounded-lg transition">
                      {brand.name}
                    </Link>
                  ))}
                </div>
              </div>

              <Link href="/" className="hover:text-rose-500 transition py-3">تخفیف‌های ویژه</Link>
              <Link href="/" className="hover:text-rose-500 transition py-3">تضمین اصالت کالا</Link>
            </nav>

            <Link href="/faq" className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-slate-600 transition">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>راهنمای خرید و پشتیبانی</span>
            </Link>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* ۲. هدر نسخه موبایل */}
      {/* ========================================================================= */}
      <header className="md:hidden w-full fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-100 flex flex-col pt-3 pb-3 px-4 gap-3 shadow-xs">
        <div className="w-full flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-black text-slate-800 tracking-tight">
              سیب<span className="text-rose-500">‌شاپ</span>
            </span>
          </Link>
          
          <div className="flex items-center gap-1.5">
            {/* دکمه پروفایل موبایل */}
            <Link 
              href={isLoggedIn ? "/profile" : "/login"} 
              className={`p-2 rounded-full transition ${isProfileActive ? 'text-rose-500 bg-rose-50' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <User className="w-5 h-5 stroke-[2.2]" />
            </Link>
            
            {/* دکمه زنگوله موبایل متصل به مرکز اعلانات و آفرها */}
            <button 
              onClick={() => setIsNotificationOpen(true)}
              className={`p-2 rounded-full relative transition ${isNotificationOpen ? 'text-rose-500 bg-rose-50' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <Bell className="w-5 h-5 stroke-[2.2]" />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse"></span>
            </button>

            {/* کپی آیکون سبد خرید در هدر بالای موبایل برای راحتی دست مشتری */}
            <Link href="/cart" className="p-2 text-slate-600 hover:bg-slate-50 rounded-full relative transition">
              <ShoppingBag className="w-5 h-5 stroke-[2.2]" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-rose-500 text-white text-[9px] font-sans font-black w-4 h-4 rounded-full flex items-center justify-center border border-white shadow-xs leading-none">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* باکس شبیه‌ساز سرچ در موبایل */}
        <div onClick={() => setIsSearchModalOpen(true)} className="w-full relative flex items-center bg-slate-100 text-slate-400 text-xs font-semibold pr-11 pl-4 py-2.5 rounded-xl cursor-pointer select-none">
          <Search className="absolute right-4 w-4 h-4 text-slate-400" />
          <span>جستجو در کالاها...</span>
        </div>
      </header>

      <div className="w-full h-[125px] md:h-40 block shrink-0"></div>

      {/* ========================================================================= */}
      {/* ۳. مگامودال سرچ پیشرفته */}
      {/* ========================================================================= */}
      {isSearchModalOpen && (
        <div onClick={() => setIsSearchModalOpen(false)} className={`fixed inset-0 bg-white md:bg-slate-900/40 md:backdrop-blur-xs z-[100] flex justify-center md:items-start md:pt-6 direction-rtl antialiased transition-opacity duration-300 ${animateModal ? 'opacity-100' : 'opacity-0'}`}>
          <div onClick={(e) => e.stopPropagation()} className={`w-full h-full md:h-auto md:max-w-3xl bg-white md:rounded-3xl md:shadow-2xl flex flex-col overflow-hidden transition-all duration-300 transform ${animateModal ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
            <div className="px-4 py-3 md:px-5 md:py-4 border-b border-slate-100 flex items-center gap-3">
              <button onClick={() => setIsSearchModalOpen(false)} className="md:hidden p-1.5 text-slate-700 hover:bg-slate-100 rounded-full transition shrink-0"><ArrowRight className="w-6 h-6" /></button>
              <div className="relative flex-1 flex items-center">
                <Search className="absolute right-4 w-5 h-5 text-rose-500" />
                <input
                  type="text" autoFocus value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={handleKeyDown}
                  placeholder="جستجو در همه کالاها..."
                  className="w-full bg-slate-50 text-base md:text-sm font-bold text-slate-800 pr-12 pl-12 py-3 md:py-3.5 rounded-2xl border-2 border-rose-500/10 focus:outline-none focus:border-rose-500 focus:bg-white transition"
                />
                {searchQuery && <button onClick={() => setSearchQuery('')} className="absolute left-4 p-1 text-slate-400 hover:text-slate-600 transition"><X className="w-4 h-4" /></button>}
              </div>
              <button onClick={() => setIsSearchModalOpen(false)} className="hidden md:flex p-2 bg-slate-100 hover:bg-rose-50 hover:text-rose-500 rounded-xl transition"><X className="w-4 h-4" /></button>
            </div>

            <div className="p-5 md:p-6 flex-1 overflow-y-auto max-h-[calc(100vh-80px)] md:max-h-[75vh] flex flex-col gap-6 text-right">
              {recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-black text-slate-800">جستجوهای اخیر</span>
                    <button onClick={clearRecentSearches} className="text-[10px] font-bold text-slate-400 hover:text-rose-500 transition px-2 py-1 rounded-md">پاک کردن</button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((search, idx) => (
                      <button key={idx} onClick={() => executeSearch(search)} className="bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-bold px-3.5 py-2 rounded-xl border border-slate-100 transition">{search}</button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <span className="text-xs font-black text-slate-800 block mb-3">جستجوهای پرطرفدار</span>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((pop, idx) => (
                    <button key={idx} onClick={() => executeSearch(pop)} className="bg-white hover:bg-rose-50/40 text-slate-700 text-xs font-black px-4 py-2 rounded-xl border border-slate-200/70 shadow-3xs flex items-center gap-1.5 transition">
                      <span className="text-slate-300 text-[10px]">↗</span><span>{pop}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* بنر رنگی فیکس و جذاب تابستانه */}
              <div className="w-full mt-2">
                <div className="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 rounded-2xl p-4 md:p-5 text-white relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm select-none">
                  <div className="z-10 flex flex-col gap-1">
                    <span className="text-[9px] md:text-xs font-black bg-white/20 px-2.5 py-1 rounded-full w-max">این تابستون انجامش بدیم! ☀️</span>
                    <p className="text-[10px] md:text-[11px] font-bold text-white/90">برای هر چیزی که تو این تابستون لازم داری روی سیب‌شاپ حساب کن</p>
                  </div>
                  <button onClick={() => executeSearch('جانبی موبایل')} className="bg-slate-950/90 text-white text-[9px] md:text-[10px] font-black px-3.5 py-2 md:py-2.5 rounded-xl hover:bg-slate-950 transition z-10 shadow-xs shrink-0">شروع خرید شگفت‌انگیز</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ۴. کشوی مرکز اعلانات و کدهای تخفیف (مخصوص موبایل) */}
      {/* ========================================================================= */}
      <div className={`fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-[150] transition-opacity duration-300 md:hidden ${isNotificationOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsNotificationOpen(false)}>
        <div className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-[2.5rem] p-6 max-h-[80vh] overflow-y-auto transition-transform duration-300 ease-out transform shadow-2xl text-right`} onClick={(e) => e.stopPropagation()}>
          <div className="w-14 h-1.5 bg-slate-200 rounded-full mx-auto mb-5 cursor-pointer" onClick={() => setIsNotificationOpen(false)}></div>
          
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-base font-black text-slate-800 flex items-center gap-2">
              <Bell className="w-5 h-5 text-rose-500 stroke-[2.2]" />
              <span>مرکز اعلانات سیب‌شاپ</span>
            </h3>
            <button onClick={() => setIsNotificationOpen(false)} className="p-1.5 bg-slate-100 text-slate-500 rounded-full"><X className="w-4 h-4" /></button>
          </div>

          <div className="space-y-3.5 pb-6">
            <div className="bg-gradient-to-br from-rose-50 to-pink-50/30 p-4 rounded-2xl border border-rose-100 flex items-start gap-3">
              <div className="flex flex-col gap-1 w-full">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-rose-600">کد تخفیف اختصاصی شما ایفا شد! 🎉</span>
                  <span className="text-[9px] font-bold text-slate-400">امروز</span>
                </div>
                <p className="text-[11px] font-medium text-slate-600 leading-5 mt-1">کد تخفیف <code className="bg-white px-1.5 py-0.5 rounded-md border text-xs font-mono font-bold text-rose-500">SIBNEW</code> برای خرید لوازم جانبی با ۲۰٪ تخفیف بدون محدودیت خرید اول فعال شد.</p>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-start gap-3">
              <div className="p-2.5 bg-rose-50 rounded-xl text-rose-500 shrink-0"><Award className="w-5 h-5" /></div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-black text-slate-900">طرح گارانتی اصالت طلایی سیب‌شاپ</span>
                <p className="text-[11px] font-medium text-slate-500 leading-5">تمامی پاوربانک‌ها و آداپتورهای شارژ از این پس با ۱۸ ماه گارانتی شرکتی و ۷ روز مهلت تست بی قید و شرط ارسال می‌شوند.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ۵. ناوبری پایین موبایل */}
      {/* ========================================================================= */}
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
              {cartCount > 0 && <span className="absolute -top-1.5 -left-1.5 bg-rose-500 text-white text-[11px] font-sans font-black w-5 h-5 rounded-full flex items-center justify-center border border-white shadow-xs leading-none">{cartCount}</span>}
            </div>
            <span className="text-[10px] tracking-tight">سبد خرید</span>
          </Link>

          <Link href={isLoggedIn ? "/profile" : "/login"} className={`flex flex-col items-center gap-1 min-w-[60px] py-1 transition duration-200 ${isProfileActive ? 'text-rose-500 font-bold' : 'text-slate-400 font-medium hover:text-slate-700'}`}>
            <User className={`w-5 h-5 transition duration-200 ${isProfileActive ? 'text-rose-500 stroke-[2.5]' : 'stroke-[2.2]'}`} />
            <span className="text-[10px] tracking-tight">{isLoggedIn ? "پروفایل" : "ورود"}</span>
          </Link>
        </div>
      </nav>

      {/* منوی کشویی دسته‌بندی موبایل */}
      <div className={`fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 transition-opacity duration-300 md:hidden ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMobileMenuOpen(false)}>
        <div className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-[2.5rem] p-6 max-h-[85vh] overflow-y-auto transition-transform duration-300 ease-out transform shadow-2xl text-right`} onClick={(e) => e.stopPropagation()}>
          <div className="w-14 h-1.5 bg-slate-200 rounded-full mx-auto mb-5 cursor-pointer" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-black text-slate-800">دسته‌بندی محصولات سیب‌شاپ</h3>
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-1.5 bg-slate-100 text-slate-500 rounded-full"><X className="w-4 h-4" /></button>
          </div>
          <div className="space-y-5 pb-8">
            <div className="bg-slate-50/60 p-4 rounded-2xl border border-slate-100 text-right">
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
