import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import ProductDetailClient from './ProductDetailClient';

// 🔄 تابع فچ عمیق استراپی ۴ با اصلاح ریلیشن‌ها و پاپولیت داینامیک زون جدید
async function getSingleProductBySlug(slug) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://b.dr-sib.xyz/api";
    
    // 🔗 پاپولیت دقیق فیلد جدید delivery_time، مشخصات موبایل و اصلاح کلید ارتباطی price_histories
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
    delivery_time,         // 📦 فیلد جدید مدت زمان ارسال در ریشه کالا
    attributes: dynamicAttributes,
    reviews,               // 📩 فچ نظرات از استراپی
    price_histories        // 📈 فچ تاریخچه قیمت تصحیح شده بر اساس ریلیشن روت
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

  // 🛠️ پارسر متن توضیحات ریچ‌تکست استراپی
  let cleanDescription = "توضیحاتی برای این محصول وارد نشده است.";
  if (description) {
    if (typeof description === 'string') cleanDescription = description;
    else if (Array.isArray(description)) {
      cleanDescription = description
        .map(block => block.children?.map(child => child.text).join('') || '')
        .join('\n');
    }
  }

  // 🔄 ۳. استخراج اجزای داینامیک زون با ساختار اختصاصی جدید
  let extractedSpecs = [];
  let dynamicVariants = [];
  let mobileStorageFromComponent = null; // متغیر کمکی برای دریافت حافظه از کامپوننت اختصاصی موبایل

  if (dynamicAttributes && Array.isArray(dynamicAttributes)) {
    dynamicAttributes.forEach(attr => {
      // الف) پارس مشخصات فنی جنرال قدیمی
      if (attr.__component?.includes('specification')) {
        extractedSpecs.push({
          title: attr.title,
          value: attr.value
        });
      }

      // ب) پارس کامپوننت اختصاصی جدید مشخصات موبایل (MobileSpecs) برای جلوگیری از باگ تداخل ویژگی‌ها
      if (attr.__component?.includes('mobile-specs') || attr.__component?.toLowerCase().includes('mobilesecs')) {
        if (attr.Storage) {
          mobileStorageFromComponent = attr.Storage;
          extractedSpecs.push({ title: 'حافظه داخلی', value: attr.Storage });
        }
        if (attr.RAM) extractedSpecs.push({ title: 'حافظه رم', value: attr.RAM });
        if (attr.Battery) extractedSpecs.push({ title: 'ظرفیت باتری', value: attr.Battery });
        if (attr.CPU) extractedSpecs.push({ title: 'تراشه و پردازنده', value: attr.CPU });
      }
      
      // ج) پارس تنوع‌های رنگی به همراه فیلد جدید oldPrice مخصوص هر رنگ
      if (attr.__component?.includes('product-variant')) {
        dynamicVariants.push({
          id: attr.id,
          price: attr.price ? Number(attr.price) : null,
          oldPrice: attr.oldPrice ? Number(attr.oldPrice) : null, // ⚡️ اضافه شدن فیلد دوقلوی قیمت تخفیف خورده برای هر رنگ
          stock: attr.stock !== undefined ? Number(attr.stock) : 0,
          options: attr.options || []
        });
      }
    });
  }

  // 🎨 ۴. پردازش هوشمند و ایزوله گزینه‌های رنگ بدون قاطی شدن با حافظه
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

  // 📦 ۵. تنظیم هوشمند آرایه حافظه برای کلاینت (اولویت اول کامپوننت اختصاصی، اولویت دوم متن عنوان)
  let extractedStorages = [];
  if (mobileStorageFromComponent) {
    extractedStorages = [mobileStorageFromComponent];
  } else {
    // اگر کامپوننت پر نبود، با ریجکس حجم را از روی عنوان استخراج کن تا فرانت کرش نکند
    const match = title?.match(/(\d+)\s*(GB|گیگابایت|گیگ)/i);
    extractedStorages = match ? [match[0]] : [];
  }

  const extractedSizes = Array.from(new Set(allOptions.filter(o => {
    const t = o.type?.toLowerCase() || '';
    return t === 'size' || t === 'سایز';
  }).map(o => o.value)));

  // 🛡️ لایف‌سایکل اتوماتیک موجودی کل را جمع زده، اما جهت محکم‌کاری فرانت نیز بررسی می‌شود
  let totalStock = rootStock !== undefined ? Number(rootStock) : 0;
  if (totalStock === 0 && dynamicVariants.length > 0) {
    totalStock = dynamicVariants.reduce((sum, variant) => sum + variant.stock, 0);
  }

  // 📩 ۶. پردازش دیتای نظرات تایید شده
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
    .filter(r => r.isApproved === true);

  // 📈 ۷. پردازش دیتای نمودار تاریخچه قیمت پایه بدون باگ زیگزاگی
  const rawPriceHistory = price_histories?.data || [];
  const processedPriceHistory = rawPriceHistory.map(item => {
    const attr = item.attributes || item;
    return {
      price: Number(attr.price),
      date: attr.date ? new Date(attr.date).toLocaleDateString('fa-IR', { month: 'short', day: 'numeric' }) : ''
    };
  });

  // 🚀 بسته بندی پکیج اطلاعات جهت تحویل به ProductDetailClient
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
    deliveryTime: delivery_time || 'ارسال اکسپرس (۱ تا ۲ روز کاری)', // تحویل متغیر جدید ارسال به کلاینت
    
    storages: extractedStorages,
    colors: extractedColors,
    sizes: extractedSizes,
    specs: extractedSpecs.length > 0 ? extractedSpecs : [{ title: 'اصالت کالا', value: 'تضمین اصالت سیب‌شاپ' }],
    variants: dynamicVariants,
    
    reviewsList: processedReviews,
    priceHistoryList: processedPriceHistory,
    
    fullSpecs: [
      { label: 'توضیحات محصول', value: cleanDescription },
    ]
  };

  return <ProductDetailClient productData={productData} />;
}
