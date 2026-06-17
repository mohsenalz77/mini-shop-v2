import Header from '../components/Header';
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import AmazingOffers from '../components/AmazingOffers';
import PromoBanners from '../components/PromoBanners';
import ProductGrid from '../components/ProductGrid'; // ۱. ایمپورت کامپوننت جدید

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50/40 overflow-x-hidden">
      
      <Header />
      <Hero />
      <Categories />
      <AmazingOffers />
      <PromoBanners />
      
      {/* ۲. تزریق مستقیم کامپوننت محصولات جدا شده */}
      <ProductGrid />

    </div>
  );
}
