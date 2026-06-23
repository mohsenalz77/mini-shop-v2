import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import ProductDetailClient from './ProductDetailClient';

// تابع فچ کردن اطلاعات تک محصول از استراپی بر اساس اسلاگ
async function getSingleProductBySlug(slug) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://b.dr-sib.xyz/api";
    const res = await fetch(`${apiUrl}/products?filters[slug][$eq]=${slug}&populate=*`, {
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

  // استخراج مشخصات اصلی از دیتای استراپی (شامل فیلد جدید gallery)
  const attributes = apiProduct.attributes || apiProduct;
  const { title, price, oldPrice, description, image, gallery, stock } = attributes;

  // آدرس پایه برای تصاویر استراپی
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "https://b.dr-sib.xyz";
  
  // 📸 ۱. پردازش و استخراج عکس اصلی (Single Media)
  const imgData = image?.data;
  const hasImage = imgData?.attributes?.url || imgData?.url;
  const safeImageUrl = hasImage 
    ? `${strapiUrl}${imgData?.attributes?.url || imgData?.url}`
    : null;

  // 🖼️ ۲. پردازش هوشمند آلبوم تصاویر (Multiple Media)
  const galleryData = gallery?.data;
  let albumUrls = [];

  // بررسی می‌کنیم که آیا دیتا وجود دارد و به صورت آرایه (چند عکسه) است یا خیر
  if (galleryData && Array.isArray(galleryData)) {
    albumUrls = galleryData
      .map(img => {
        const url = img.attributes?.url || img.url;
        return url ? `${strapiUrl}${url}` : null;
      })
      .filter(Boolean); // حذف مقادیر null یا ارورهای احتمالی URL
  }

  // 🛠️ فیکس استراپی ۵: تبدیل ساختار جدید بلاک‌های متنی به استرینگ ساده جهت جلوگیری از کرش رندر
  let cleanDescription = "توضیحاتی برای این محصول در استراپی وارد نشده است.";
  if (description) {
    if (typeof description === 'string') {
      cleanDescription = description;
    } else if (Array.isArray(description)) {
      // استخراج متون از لایه‌های ارایه‌ای Blocks استراپی جدید
      cleanDescription = description
        .map(block => block.children?.map(child => child.text).join('') || '')
        .join('\n');
    }
  }

  // آماده‌سازی دیتای تمیز و ایمن برای تحویل به قالب فرانت‌اَند شما
  const productData = {
    id: apiProduct.id,
    name: title,
    imageUrl: safeImageUrl, // عکس شاخص اصلی
    imagesAlbum: albumUrls, // 👈 آرایه تصاویر آلبوم گالری (اگر نباشد، آرایه خالی [] فرستاده می‌شود)
    englishName: 'Apple Flagship Device', 
    price: price ? Number(price).toLocaleString('fa-IR') : '۰',
    oldPrice: oldPrice ? Number(oldPrice).toLocaleString('fa-IR') : null,
    // پاس دادن مقدار خام انبار برای کنترل دکمه افزودن و سقف خرید فرانت‌اند
    stock: stock !== undefined ? Number(stock) : 1,
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
      { label: 'توضیحات محصول', value: cleanDescription },
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
