import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import ProductDetailClient from './ProductDetailClient';

// تابع فچ کردن اطلاعات تک محصول با پاپولیت همه‌جانبه استراپی ۴
async function getSingleProductBySlug(slug) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://b.dr-sib.xyz/api";
    
    // 🔗 پاپولیت کامل لایه اول و دوم برای باز کردن فیلد گزینه‌های تودرتو
    const url = `${apiUrl}/products?filters[slug][$eq]=${slug}&populate[image]=*&populate[gallery]=*&populate[attributes][populate]=*`;
    
    console.log("🔗 Standard Strapi 4 Deep Fetch URL:", url);

    const res = await fetch(url, {
      cache: 'no-store'
    });

    if (!res.ok) {
      console.error(`❌ Strapi 4 Error! Status: ${res.status}`);
      return null;
    }
    
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
    stock, 
    warranty, 
    attributes: dynamicAttributes 
  } = rawAttributes;

  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "https://b.dr-sib.xyz";
  
  // 📸 ۱. پردازش تصویر اصلی
  const imgData = image?.data;
  const safeImageUrl = imgData?.attributes?.url || imgData?.url
    ? `${strapiUrl}${imgData?.attributes?.url || imgData?.url}`
    : null;

  // 🖼️ ۲. پردازش آلبوم تصاویر گالری
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
    if (typeof description === 'string') {
      cleanDescription = description;
    } else if (Array.isArray(description)) {
      cleanDescription = description
        .map(block => block.children?.map(child => child.text).join('') || '')
        .join('\n');
    }
  }

  // 🔄 ۳. استخراج اجزای داینامیک زون با انعطاف‌پذیری بالا برای استراپی ۴
  let extractedSpecs = [];
  let dynamicVariants = [];

  if (dynamicAttributes && Array.isArray(dynamicAttributes)) {
    dynamicAttributes.forEach(attr => {
      // مشخصات فنی
      if (attr.__component?.includes('specification')) {
        extractedSpecs.push({
          title: attr.title,
          value: attr.value
        });
      }
      
      // تنوع کالا و قیمت‌ها
      if (attr.__component?.includes('product-variant')) {
        // پیدا کردن فیلد گزینه‌ها چه با نام options و چه فیلدهای دیگر درون آبجکت کامپوننت
        const optionsArray = attr.options || attr.VariantOption || attr.variant_options || [];
        
        dynamicVariants.push({
          price: attr.price,
          stock: attr.stock,
          options: optionsArray
        });
      }
    });
  }

  // ۴. استخراج گزینه‌های فرانت‌اَند کلاینت (Color, Storage, Size)
  const allOptions = dynamicVariants.flatMap(v => v.options || []);
  
  const extractedColors = Array.from(new Set(allOptions.filter(o => o.type === 'Color' || o.type === 'رنگ').map(o => o.value)))
    .map(colorVal => {
      const matchedOpt = allOptions.find(o => (o.type === 'Color' || o.type === 'رنگ') && o.value === colorVal);
      return {
        name: colorVal,
        class: matchedOpt?.meta_color || 'bg-slate-200'
      };
    });

  const extractedStorages = Array.from(new Set(allOptions.filter(o => o.type === 'Storage' || o.type === 'حافظه').map(o => o.value)));
  const extractedSizes = Array.from(new Set(allOptions.filter(o => o.type === 'Size' || o.type === 'سایز').map(o => o.value)));

  const productData = {
    id: id,
    name: title || "بدون نام",
    imageUrl: safeImageUrl,
    imagesAlbum: albumUrls,
    englishName: rawAttributes.englishName || 'Apple Flagship Device', 
    price: price ? Number(price).toLocaleString('fa-IR') : '۰',
    oldPrice: oldPrice ? Number(oldPrice).toLocaleString('fa-IR') : null,
    stock: stock !== undefined ? Number(stock) : 1,
    rating: rawAttributes.rating || '۴.۹',
    reviewCount: rawAttributes.reviewCount || '۱ دیدگاه',
    warranty: warranty || 'گارانتی ۱۸ ماهه شرکتی',
    
    storages: extractedStorages,
    colors: extractedColors,
    sizes: extractedSizes,
    specs: extractedSpecs.length > 0 ? extractedSpecs : [{ title: 'اصالت کالا', value: 'تضمین اصالت سیب‌شاپ' }],
    variants: dynamicVariants,
    
    fullSpecs: [
      { label: 'توضیحات محصول', value: cleanDescription },
    ]
  };

  return <ProductDetailClient productData={productData} />;
}
