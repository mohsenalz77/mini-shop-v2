import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import ProductDetailClient from './ProductDetailClient';

// تابع فچ با پاپولیت عمیق استراپی ۴ + لود داینامیک نظرات و تاریخچه قیمت
async function getSingleProductBySlug(slug) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://b.dr-sib.xyz/api";
    // 🔗 اضافه کردن پاپولیت رول‌های جدید به آدرس فچ استراپی
    const url = `${apiUrl}/products?filters[slug][$eq]=${slug}&populate[image]=*&populate[gallery]=*&populate[attributes][populate][options]=*&populate[attributes][populate]=*&populate[reviews]=*&populate[price_histories]=*`;
    
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
    stock: rootStock, 
    warranty, 
    attributes: dynamicAttributes,
    reviews,              // 📩 فچ نظرات از استراپی
    price_histories       // 📈 فچ تاریخچه قیمت از استراپی
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
      if (attr.__component?.includes('specification')) {
        extractedSpecs.push({
          title: attr.title,
          value: attr.value
        });
      }
      
      if (attr.__component?.includes('product-variant')) {
        dynamicVariants.push({
          id: attr.id,
          price: attr.price ? Number(attr.price) : null,
          stock: attr.stock !== undefined ? Number(attr.stock) : 0,
          options: attr.options || []
        });
      }
    });
  }

  // ۴. پردازش و فیلتر کردن هوشمند گزینه‌ها برای لایه کلاینت
  const allOptions = dynamicVariants.flatMap(v => v.options || []);
  
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

  const extractedStorages = Array.from(new Set(allOptions.filter(o => {
    const t = o.type?.toLowerCase() || '';
    return t === 'storage' || t === 'حافظه' || o.value?.toLowerCase().includes('gb');
  }).map(o => o.value)));

  const extractedSizes = Array.from(new Set(allOptions.filter(o => {
    const t = o.type?.toLowerCase() || '';
    return t === 'size' || t === 'سایز';
  }).map(o => o.value)));

  let totalStock = rootStock !== undefined ? Number(rootStock) : 0;
  if (totalStock === 0 && dynamicVariants.length > 0) {
    totalStock = dynamicVariants.reduce((sum, variant) => sum + variant.stock, 0);
  }

  // 📩 ۵. پردازش دیتای نظرات تایید شده
  const rawReviewsList = reviews?.data || [];
  const processedReviews = rawReviewsList
    .map(item => {
      const attr = item.attributes || item;
      return {
        id: item.id,
        title: attr.title || "بدون عنوان",
        comment: attr.comment || "",
        rating: Number(attr.rating || 5),
        isApproved: attr.is_approved,
        advantages: attr.advantages ? attr.advantages.split(',').filter(Boolean) : [],
        disadvantages: attr.disadvantages ? attr.disadvantages.split(',').filter(Boolean) : []
      };
    })
    .filter(r => r.isApproved === true); // فقط نظراتی که ادمین تایید کرده لود شوند

  // 📈 ۶. پردازش دیتای نمودار تاریخچه قیمت
  const rawPriceHistory = price_histories?.data || [];
  const processedPriceHistory = rawPriceHistory.map(item => {
    const attr = item.attributes || item;
    return {
      price: Number(attr.price),
      date: attr.date ? new Date(attr.date).toLocaleDateString('fa-IR', { month: 'short', day: 'numeric' }) : ''
    };
  });

  const productData = {
    id: id,
    name: title || "بدون نام",
    imageUrl: safeImageUrl,
    imagesAlbum: albumUrls,
    englishName: rawAttributes.englishName || 'Apple Device', 
    price: price ? Number(price).toLocaleString('fa-IR') : '۰',
    rawPrice: price ? Number(price) : 0,
    oldPrice: oldPrice ? Number(oldPrice).toLocaleString('fa-IR') : null,
    stock: totalStock,
    rating: rawAttributes.rating || '۴.۹',
    reviewCount: `${processedReviews.length} دیدگاه`,
    warranty: warranty || 'گارانتی شرکتی',
    
    storages: extractedStorages,
    colors: extractedColors,
    sizes: extractedSizes,
    specs: extractedSpecs.length > 0 ? extractedSpecs : [{ title: 'اصالت کالا', value: 'تضمین اصالت سیب‌شاپ' }],
    variants: dynamicVariants,
    
    // فیلدهای جدید فرستاده شده به کلاینت
    reviewsList: processedReviews,
    priceHistoryList: processedPriceHistory,
    
    fullSpecs: [
      { label: 'توضیحات محصول', value: cleanDescription },
    ]
  };

  return <ProductDetailClient productData={productData} />;
}
