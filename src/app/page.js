import Header from '../components/Header';
import Hero from '../components/Hero';
import QuickAccess from '@/components/QuickAccess';
import Categories from '../components/Categories';
import AmazingOffers from '../components/AmazingOffers';
import PromoBanners from '../components/PromoBanners';
import ProductGrid from '../components/ProductGrid';
import Footer from '../components/Footer'; // ۱. ایمپورت کردن فوتر جدید

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50/40 overflow-x-hidden">
      
      <Header />
      <Hero />
      <QuickAccess />
      <Categories />
      <AmazingOffers />
      <PromoBanners />
      <ProductGrid />
      
      {/* ۲. رندر فوتر سنگین و چندستونه در انتهای صفحه */}
      <Footer />

    </div>
  );
}
