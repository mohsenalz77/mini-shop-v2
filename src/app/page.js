import Header from '../components/Header';
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import AmazingOffers from '../components/AmazingOffers';
import PromoBanners from '../components/PromoBanners';
import ProductGrid from '../components/ProductGrid';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50/40 overflow-x-hidden">
      
      {/* ۱. هدر همیشه ثابت بر سقف صفحه */}
      <Header />
      
      {/* ۲. بنر اصلی هیرو با افکت باکسی شما */}
      <Hero />
      
      {/* ۳. دسته‌بندی‌های سریع دایره‌ای */}
      <Categories />

      {/* ۴. شگفت‌انگیز تایمردار قرمز (حتماً مطمئن شو فایل AmazingOffers.js در پوشه components وجود دارد) */}
      <AmazingOffers />

      {/* ۵. بنرهای تبلیغاتی سه‌قلو نئونی */}
      <PromoBanners />
      
      {/* ۶. ویترین نهایی و فیکس‌شده‌ی محصولات */}
      <ProductGrid />

    </div>
  );
}
