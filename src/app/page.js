import Header from '../components/Header';
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import AmazingOffers from '../components/AmazingOffers';
import PromoBanners from '../components/PromoBanners';
import ProductGrid from '../components/ProductGrid';

export default function HomePage() {
  return (
    // مهار سرریز افقی کل صفحه اصلی
    <div className="min-h-screen bg-gray-50/40 overflow-x-hidden">
      
      {/* ۱. هدر شیشه‌ای و چسبان */}
      <Header />
      
      {/* ۲. بنر اصلی (هیرو) با افکت باکسی و آمبیانس نوری */}
      <Hero />
      
      {/* ۳. دسته‌بندی‌های سریع و دایره‌ای */}
      <Categories />

      {/* ۴. باکس شگفت‌انگیز تایمردار سیب‌شاپ */}
      <AmazingOffers />

      {/* ۵. بنرهای تبلیغاتی سه‌قلو با تخفیف‌های باندل و گجت‌ها */}
      <PromoBanners />
      
      {/* ۶. ویترین محصولات مینی‌مال و هم‌تراز با عرض هیرو */}
      <ProductGrid />

    </div>
  );
}
