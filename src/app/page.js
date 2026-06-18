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

// 🚀 تابع گرفتن آنلاین محصولات از استراپی روی رندر
async function getProducts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?populate=*`, {
      cache: 'no-store' // محصولات همیشه آنی و آپدیت لود شوند
    });

    if (!res.ok) {
      throw new Error("خطا در ارتباط با سرور استراپی");
    }

    const data = await res.json();
    return data.data; // آرایه محصولات را برمی‌گرداند
  } catch (error) {
    console.error("خطا در فچ کردن محصولات:", error);
    return []; // در صورت ارور، آرایه خالی برمی‌گرداند تا سایت کرش نکند
  }
}

// تغییر طلایی ۲: کامپوننت را async کردیم تا بتواند دیتا را قبل از رندر شدن صفحه بگیرد
export default async function HomePage() {
  const products = await getProducts();

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
      
      {/* ویترین پیشنهادی با کلمه «شاپ» گرادینت و کارت‌های بهینه (حالا دیتای واقعی محصولات را می‌گیرد) */}
      <ProductGrid products={products} />

      {/* بنرهای دوقلوی ثابت نئون (فقط رندر در موبایل جهت شکستن یکنواختی اسکرول) */}
      <PromoTwoColumns />
      
      {/* گردونه برندهای محبوب همراه با افکت آمبیانس نوری و کارت‌های عمق‌دار */}
      <BrandCarousel />
      
      {/* فوتر باکسی لوکس و چندستونه در انتهای صفحه */}
      <Footer />

    </div>
  );
}
