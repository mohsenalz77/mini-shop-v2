import Header from '../components/Header';
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import AmazingOffers from '../components/AmazingOffers';
import PromoBanners from '../components/PromoBanners';
import ProductGrid from '../components/ProductGrid';

export default function HomePage() {
  return (
    // لایه اصلی والد با فیکس قطعی سرریز
    <div className="min-h-screen bg-gray-50/40 overflow-x-hidden relative">
      
      {/* ۱. هدر شیشه‌ای هوشمند */}
      <Header />
      
      {/* ۲. بنر اصلی هیرو */}
      <Hero />
      
      {/* ظرف مهارکننده (Container): این دایو اجازه نمی‌دهد هیچ المانی به لایه‌های بالاتر تجاوز کند */}
      <div className="w-full relative z-10 flex flex-col">
        
        {/* ۳. دسته‌بندی‌های سریع */}
        <Categories />

        {/* ۴. شگفت‌انگیز تایمردار */}
        <AmazingOffers />

        {/* ۵. بنرهای تبلیغاتی سه‌قلو */}
        <PromoBanners />
        
        {/* ۶. ویترین محصولات */}
        <ProductGrid />

      </div>
    </div>
  );
}
