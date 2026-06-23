import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import ProductDetailClient from './ProductDetailClient';

// تابع فچ با پاپولیت عمیق استراپی ۴
async function getSingleProductBySlug(slug) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://b.dr-sib.xyz/api";
    const url = `${apiUrl}/products?filters[slug][$eq]=${slug}&populate[image]=*&populate[gallery]=*&populate[attributes][populate][options]=*&populate[attributes][populate]=*`;
    
    console.log("🔗 Standard Strapi 4 Deep Fetch URL:", url);

    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return null;
    
    const data = await res.json();
    if (data.data && data.data.length > 0) {
      return data.data[0];
    }
    return null;
  } catch (error) {
    console.error("❌ Fetch Exception:", error);
    return null;
  }
}

export default async function ProductDetailPage({ params }) {
  const { id: slug } = params;
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

  const id = apiProduct.id;
  const rawAttributes = apiProduct.attributes || apiProduct;
  
  const { 
    title, 
    price, 
    oldPrice, 
    description, 
    image, 
    gallery, 
    stock: rootStock, // انبار قدیمی در ریشه محصول
    warranty, 
    attributes: dynamicAttributes 
  } = rawAttributes;

  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "https://b.dr-sib.xyz";
  
  // 📸 ۱. پردازش تصویر اصلی
  const imgData = image?.data;
  const safeImageUrl = imgData?.attributes?.url || imgData?.url
    ? `${strapiUrl}${imgData?.attributes?.url || imgData?.url}`
    : null;

  // 🖼️ ۲. پردازش آلبوم تصاویر
  const galleryData = gallery?.data;
  let albumUrls = [];
  if (galleryData && Array.isArray(galleryData)) {
    albumUrls = galleryData
      .map(img => {
        const url = img.attributes?.url || img.url;
        return url ? `${strapiUrl}${url}` : null;
      })
      .filter(Boolean);
  }

  // 🛠️ پارسر متن توضیحات
  let cleanDescription = "توضیحاتی برای این محصول وارد نشده است.";
  if (description) {
    if (typeof description === 'string') cleanDescription = description;
    else if (Array.isArray(description)) {
      cleanDescription = description
        .map(block => block.children?.map(child => child.text).join('') || '')
        .join('\n');
    }
  }

  // 🔄 ۳. استخراج اجزای داینامیک زون
  let extractedSpecs = [];
  let dynamicVariants = [];

  if (dynamicAttributes && Array.isArray(dynamicAttributes)) {
    dynamicAttributes.forEach(attr => {
      // الف) جدول مشخصات فنی
      if (attr.__component?.includes('specification')) {
        extractedSpecs.push({
          title: attr.title,
          value: attr.value
        });
      }
      
      // ب) تنوع‌های محصول
      if (attr.__component?.includes('product-variant')) {
        dynamicVariants.push({
          id: attr.id, // ارسال ID برای مدیریت بهتر در کلاینت
          price: attr.price ? Number(attr.price) : null,
          stock: attr.stock !== undefined ? Number(attr.stock) : 0,
          options: attr.options || []
        });
      }
    });
  }

  // ۴. پردازش و فیلتر کردن هوشمند گزینه‌ها برای لایه کلاینت
  const allOptions = dynamicVariants.flatMap(v => v.options || []);
  
  // استخراج رنگ‌ها
  const extractedColors = Array.from(new Set(allOptions.filter(o => {
    const t = o.type?.toLowerCase() || '';
    return t === 'color' || t === 'رنگ' || o.meta_color;
  }).map(o => o.value)))
  .map(colorVal => {
    const matchedOpt = allOptions.find(o => o.value === colorVal);
    return {
      name: colorVal,
      class: matchedOpt?.meta_color || 'bg-slate-200'
    };
  });

  // استخراج حافظه
  const extractedStorages = Array.from(new Set(allOptions.filter(o => {
    const t = o.type?.toLowerCase() || '';
    return t === 'storage' || t === 'حافظه' || o.value?.toLowerCase().includes('gb');
  }).map(o => o.value)));

  // استخراج سایزها
  const extractedSizes = Array.from(new Set(allOptions.filter(o => {
    const t = o.type?.toLowerCase() || '';
    return t === 'size' || t === 'سایز';
  }).map(o => o.value)));

  // 🛠️ محاسبه هوشمند موجودی کل کالا (اگر در ریشه صفر بود، مجموع انبار تنوع‌ها را حساب کند)
  let totalStock = rootStock !== undefined ? Number(rootStock) : 0;
  if (totalStock === 0 && dynamicVariants.length > 0) {
    totalStock = dynamicVariants.reduce((sum, variant) => sum + variant.stock, 0);
  }

  const productData = {
    id: id,
    name: title || "بدون نام",
    imageUrl: safeImageUrl,
    imagesAlbum: albumUrls,
    englishName: rawAttributes.englishName || 'Apple Device', 
    price: price ? Number(price).toLocaleString('fa-IR') : '۰',
    rawPrice: price ? Number(price) : 0, // ارسال قیمت عددی برای محاسبات فرانت
    oldPrice: oldPrice ? Number(oldPrice).toLocaleString('fa-IR') : null,
    stock: totalStock, // موجودی کل اصلاح‌شده برای فعال شدن سبد خرید
    rating: rawAttributes.rating || '۴.۹',
    reviewCount: rawAttributes.reviewCount || '۱ دیدگاه',
    warranty: warranty || 'گارانتی شرکتی',
    
    storages: extractedStorages,
    colors: extractedColors,
    sizes: extractedSizes,
    specs: extractedSpecs.length > 0 ? extractedSpecs : [{ title: 'اصالت کالا', value: 'تضمین اصالت سیب‌شاپ' }],
    variants: dynamicVariants, // آرایه اصلاح‌شده تنوع‌ها به همراه آبجکت کامل آپشن‌ها
    
    fullSpecs: [
      { label: 'توضیحات محصول', value: cleanDescription },
    ]
  };

  return <ProductDetailClient productData={productData} />;
}
