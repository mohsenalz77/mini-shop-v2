import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import ProductDetailClient from './ProductDetailClient';

// تابع فچ کردن اطلاعات تک محصول از استراپی بر اساس اسلاگ
async function getSingleProductBySlug(slug) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products?filters[slug][$eq]=${slug}&populate=*`, {
      cache: 'no-store'
    });

    if (!res.ok) return null;
    
    const data = await res.json();
    
    if (data.data && data.data.length > 0) {
      return data.data[0];
    }
    
    return null;
  } catch (error) {
    console.error("Error fetching single product by slug:", error);
    return null;
  }
}

export default async function ProductDetailPage({ params }) {
  const { id: slug } = params;
  
  // گرفتن دیتای واقعی از استراپی بر اساس اسلاگ کالا
  const apiProduct = await getSingleProductBySlug(slug);

  if (!apiProduct) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-between direction-rtl">
        <Header />
        <div className="text-center py-20 text-slate-500 font-bold">محصول مورد نظر یافت نشد.</div>
        <Footer />
      </div>
    );
  }

  // استخراج مشخصات اصلی از دیتای استراپی
  const { title, price, oldPrice, description, image } = apiProduct.attributes;

  // 🚀 اصلاح بنیادی: خواندن آدرس پایه از دامنه امن متغیر محیطی ورسل به جای آی‌پی قدیمی
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "https://b.dr-sib.xyz";
  const hasImage = image?.data?.attributes?.url;
  const safeImageUrl = hasImage 
    ? `${strapiUrl}${image.data.attributes.url}`
    : null;

  // آماده‌سازی دیتای تمیز و ایمن برای تحویل به قالب فرانت‌اَند شما
  const productData = {
    id: apiProduct.id,
    name: title,
    imageUrl: safeImageUrl, 
    englishName: 'Apple Flagship Device', 
    price: Number(price).toLocaleString('fa-IR'),
    oldPrice: oldPrice ? Number(oldPrice).toLocaleString('fa-IR') : null,
    rating: '۴.۹',
    reviewCount: '۱ دیدگاه',
    storages: ['۱۲۸ گیگ', '۲۵۶ گیگ', '۵۱۲ گیگ'],
    colors: [
      { name: 'تایتانیم طبیعی', class: 'bg-stone-400' },
      { name: 'تایتانیم مشکی', class: 'bg-zinc-800' },
      { name: 'تایتانیم سفید', class: 'bg-slate-100' },
    ],
    specs: [
      { title: 'حافظه داخلی', value: '۲۵۶ گیگابایت' },
      { title: 'حافظه رم', value: '۸ گیگابایت' },
      { title: 'ارتباطات زنده', value: 'دیتابیس استراپی آنلاین' },
    ],
    fullSpecs: [
      { label: 'توضیحات محصول', value: description || 'توضیحاتی برای این محصول در استراپی وارد نشده است.' },
    ],
    relatedProducts: [
      { id: 2, name: 'شارژر دیواری انکر مدل Nano ۲۰W', price: '۸۹۰,۰۰۰', image: '🔌' },
      { id: 3, name: 'هدفون بی‌سیم اپل مدل AirPods Pro 2', price: '۱۰,۴۰۰,۰۰۰', image: '🎧' },
    ],
    comments: [
      { id: 1, user: 'سیب‌شاپ بوت‌کمپ', date: 'امروز', rating: 5, text: 'این دیتا مستقیماً و به صورت داینامیک بر اساس آدرس اسلاگ از دیتابیس استراپی لود شده است!', badge: 'توسعه‌دهنده' },
    ]
  };

  return <ProductDetailClient productData={productData} />;
}
