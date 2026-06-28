import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import ProductDetailClient from './ProductDetailClient';

async function getSingleProductBySlug(slug) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://b.dr-sib.xyz/api";
    // 🔗 پاپولیت دقیق ریلیشن‌ها و داینامیک‌زون
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
    delivery_time,
    attributes: dynamicAttributes,
    reviews,
    price_histories
  } = rawAttributes;

  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "https://b.dr-sib.xyz";
  
  const imgData = image?.data;
  const safeImageUrl = imgData?.attributes?.url || imgData?.url
    ? `${strapiUrl}${imgData?.attributes?.url || imgData?.url}`
    : null;

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

  let cleanDescription = "توضیحاتی برای این محصول وارد نشده است.";
  if (description) {
    if (typeof description === 'string') cleanDescription = description;
    else if (Array.isArray(description)) {
      cleanDescription = description
        .map(block => block.children?.map(child => child.text).join('') || '')
        .join('\n');
    }
  }

  let extractedSpecs = [];
  let dynamicVariants = [];

  if (dynamicAttributes && Array.isArray(dynamicAttributes)) {
    dynamicAttributes.forEach(attr => {
      if (attr.__component?.includes('specification')) {
        extractedSpecs.push({ title: attr.title, value: attr.value });
      }

      if (attr.__component?.includes('mobile-specs') || attr.__component?.toLowerCase().includes('mobilesecs')) {
        if (attr.Storage) extractedSpecs.push({ title: 'حافظه داخلی', value: attr.Storage });
        if (attr.RAM) extractedSpecs.push({ title: 'حافظه رم', value: attr.RAM });
        if (attr.Battery) extractedSpecs.push({ title: 'ظرفیت باتری', value: attr.Battery });
        if (attr.CPU) extractedSpecs.push({ title: 'تراشه و پردازنده', value: attr.CPU });
      }
      
      if (attr.__component?.includes('product-variant')) {
        dynamicVariants.push({
          id: attr.id,
          price: attr.price ? Number(attr.price) : null,
          discountPrice: attr.discountPrice ? Number(attr.discountPrice) : null, // ⚡️ هماهنگ‌سازی با فیلد دیتابیس شما
          stock: attr.stock !== undefined ? Number(attr.stock) : 0,
          options: attr.options || []
        });
      }
    });
  }

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

  const extractedSizes = Array.from(new Set(allOptions.filter(o => {
    const t = o.type?.toLowerCase() || '';
    return t === 'size' || t === 'سایز';
  }).map(o => o.value)));

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
        advantages: attr.advantages || "",
        disadvantages: attr.disadvantages || ""
      };
    })
    .filter(r => r.isApproved === true);

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
    stock: rootStock ? Number(rootStock) : 0,
    rating: rawAttributes.rating || '۴.۹',
    reviewCount: `${processedReviews.length} دیدگاه`,
    warranty: warranty || 'گارانتی شرکتی',
    deliveryTime: delivery_time || 'ارسال اکسپرس (۱ تا ۲ روز کاری)',
    
    colors: extractedColors,
    sizes: extractedSizes,
    specs: extractedSpecs.length > 0 ? extractedSpecs : [{ title: 'اصالت کالا', value: 'تضمین اصالت سیب‌شاپ' }],
    variants: dynamicVariants,
    reviewsList: processedReviews,
    priceHistoryList: processedPriceHistory,
    fullSpecs: [{ label: 'توضیحات محصول', value: cleanDescription }]
  };

  return <ProductDetailClient productData={productData} />;
}
