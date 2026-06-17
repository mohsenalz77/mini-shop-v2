import Header from '../components/Header';
import Hero from '../components/Hero';
import QuickAccess from '../components/QuickAccess';
import Categories from '../components/Categories';
import AmazingOffers from '../components/AmazingOffers';
import PromoBanners from '../components/PromoBanners';
import ProductGrid from '../components/ProductGrid';
import PromoTwoColumns from '../components/PromoTwoColumns'; // بنرهای دوقلوی موبایل
import BrandCarousel from '../components/BrandCarousel'; // برندهای جدید با هاله نوری
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    // تغییر طلایی: bg-slate-50 جایگزین bg-gray-50/40 شد تا خفگی و سفیدی مطلق دسکتاپ و موبایل شکسته شود
    <div className="min-h-screen bg-slate-50 overflow-x-hidden antialiased">
      
      {/* هدر هوشمند (دسکتاپ شیشه‌ای / موبایل اپلیکیشنی) */}
      <Header />
      
      {/* بخش هیرو تیره آیفون پرچمدار */}
      <Hero />
      
      {/* آیکون‌های دسترسی سریع (فقط رندر در موبایل) */}
      <QuickAccess />
      
      {/* دسته‌بندی محصولات با عرض کارت بهینه‌شده */}
      <Categories />
      
      {/* باکس شگفت‌انگیز قرمز همراه با تایمر دیجیتال خطی */}
      <AmazingOffers />
      
      
      {/* بنرهای پروموشن ۳ تایی دارک */}
      <PromoBanners />
      
      {/* ویترین پیشنهادی با کلمه «شاپ» گرادینت و کارت‌های بهینه */}
      <ProductGrid />

          {/* بنرهای دوقلوی ثابت نئون (فقط رندر در موبایل جهت شکستن یکنواختی اسکرول) */}
      <PromoTwoColumns />
      
      {/* گردونه برندهای محبوب همراه با افکت آمبیانس نوری و کارت‌های عمق‌دار */}
      <BrandCarousel />
      
      {/* فوتر باکسی لوکس و چندستونه در انتهای صفحه */}
      <Footer />

    </div>
  );
}
