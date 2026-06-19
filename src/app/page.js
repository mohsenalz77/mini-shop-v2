export const dynamic = 'force-dynamic'; // 🚀 خط طلایی: به نکست‌جی‌اس دستور می‌دهد صفحه را استاتیک بیلد نکند

import Header from '../components/Header';
import Hero from '../components/Hero';
import QuickAccess from '../components/QuickAccess';
import Categories from '../components/Categories';
import AmazingOffers from '../components/AmazingOffers';
import PromoBanners from '../components/PromoBanners';
import ProductGrid from '../components/ProductGrid';
import PromoTwoColumns from '../components/PromoTwoColumns';
import BrandCarousel from '../components/BrandCarousel';
import Footer from '../components/Footer';

// تابع گرفتن آنلاین محصولات از استراپی روی سرور اوبونتو
async function getProducts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?populate=*`, {
      cache: 'no-store'
    });

    if (!res.ok) {
      throw new Error("خطا در ارتباط با سرور استراپی");
    }

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("خطا در فچ کردن محصولات:", error);
    return [];
  }
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden antialiased">
      <Header />
      <Hero />
      <QuickAccess />
      <Categories />
      <AmazingOffers />
      <PromoBanners />
      
      {/* رندر کردن محصولات واقعی استراپی */}
      <ProductGrid products={products} />

      <PromoTwoColumns />
      <BrandCarousel />
      <Footer />
    </div>
  );
}
