import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import ProductDetailClient from './ProductDetailClient'; // کامپوننت کلاینت که الان می‌سازیم

// 🚀 تابع فچ کردن اطلاعات تک محصول از استراپی آنلاین
async function getSingleProduct(id) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}?populate=*`, {
      cache: 'no-store'
    });

    if (!res.ok) return null;
    
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching single product:", error);
    return null;
  }
}

// این یک Server Component است و پارامتر آدرس را در پراپ params می‌گیرد
export default async function ProductDetailPage({ params }) {
  // گرفتن شناسه محصول از آدرس
  const { id } = params;
  
  // گرفتن دیتای واقعی از استراپی
  const apiProduct = await getSingleProduct(id);

  if (!apiProduct) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-between direction-rtl">
        <Header />
        <div className="text-center py-20 text-slate-500 font-bold">محصول مورد نظر یافت نشد.</div>
        <Footer />
      </div>
    );
  }

  // استخراج مشخصات از استراپی
  const { title, price, oldPrice, description } = apiProduct.attributes;

  // ادغام دیتای استراپی با ساختار لایوت تو
  const productData = {
    id: apiProduct.id,
    name: title,
    englishName: 'Apple Flagship Device', // می‌توانی بعداً فیلد انگلیسی را به استراپی اضافه کنی
    price: Number(price).toLocaleString('fa-IR'),
    oldPrice: oldPrice ? Number(oldPrice).toLocaleString('fa-IR') : null,
    rating: '۴.۹',
    reviewCount: '۱ دیدگاه',
    image: '📱',
    storages: ['۱۲۸ گیگ', '۲۵۶ گیگ', '۵۱۲ گیگ'],
    colors: [
      { name: 'تایتانیم طبیعی', class: 'bg-stone-400' },
      { name: 'تایتانیم مشکی', class: 'bg-zinc-800' },
      { name: 'تایتانیم سفید', class: 'bg-slate-100' },
    ],
    specs: [
      { title: 'حافظه داخلی', value: '۲۵۶ گیگابایت' },
      { title: 'حافظه رم', value: '۸ گیگابایت' },
      { title: 'وضعیت در دیتابیس', value: 'آنلاین و زنده' },
    ],
    fullSpecs: [
      { label: 'توضیحات ثبت شده:', value: description || 'توضیحاتی برای این محصول وارد نشده است.' },
    ],
    relatedProducts: [
      { id: 2, name: 'شارژر دیواری انکر مدل Nano ۲۰W', price: '۸۹۰,۰۰۰', image: '🔌' },
      { id: 3, name: 'هدفون بی‌سیم اپل مدل AirPods Pro 2', price: '۱۰,۴۰۰,۰۰۰', image: '🎧' },
    ],
    comments: [
      { id: 1, user: 'سیب‌شاپ بوتمپ', date: 'امروز', rating: 5, text: 'این دیتا مستقیماً و به صورت داینامیک بر اساس آدرس ID از دیتابیس استراپی لود شده است!', badge: 'توسعه‌دهنده' },
    ]
  };

  return <ProductDetailClient productData={productData} />;
}
