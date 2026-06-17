import Header from '../components/Header';
import Hero from '../components/Hero';
import QuickAccess from '../components/QuickAccess'; // آدرس‌دهی اصلاح و یکدست شد
import Categories from '../components/Categories';
import AmazingOffers from '../components/AmazingOffers';
import PromoBanners from '../components/PromoBanners';
import ProductGrid from '../components/ProductGrid';
import Footer from '../components/Footer';

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
      
      <Footer />

    </div>
  );
}
