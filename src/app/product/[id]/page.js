import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import ProductDetailClient from './ProductDetailClient';

// تابع فچ کردن اطلاعات تک محصول با پاپولیت عمیق مخصوص استراپی ۴
async function getSingleProductBySlug(slug) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://b.dr-sib.xyz/api";
    
    // 🚀 سینتکس رسمی استراپی ۴ برای پاپولیت داینامیک‌زون و آبجکت‌های تودرتوی آن (options)
    const url = `${apiUrl}/products?filters[slug][$eq]=${slug}&populate[image]=*&populate[gallery]=*&populate[attributes][populate]=*`;
    
    console.log("🔗 Strapi 4 Fetch URL:", url);

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
    
    console.warn(`⚠️ No product found in Strapi 4 for slug: "${slug}"`);
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
        <div className="text-center py-20 text-slate-500 font-bold">
          <p>محصول مورد نظر یافت نشد.</p>
          <p className="text-xs text-slate-400 font-normal mt-2">اسلاگ درخواستی: {slug}</p>
          <p className="text-xs text-rose-500 font-normal mt-1">اتصال با آدرس رسمی استراپی ۴ برقرار شد.</p>
        </div>
        <Footer />
      </div>
    );
  }

  // ساختار استراپی ۴ (دیتا داخل آبجکت attributes قرار دارد)
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

  // 🛠️ پارسر متن توضیحات استراپی ۴
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

  // 🔄 ۳. استخراج و تفکیک اجزای داینامیک زون در استراپی ۴
  let extractedSpecs = [];
  let dynamicVariants = [];

  if (dynamicAttributes && Array.isArray(dynamicAttributes)) {
    dynamicAttributes.forEach(attr => {
      // در استراپی ۴ نام کامپوننت‌ها با نقطه جدا می‌شود
      if (attr.__component === 'product-attributes.specification') {
        extractedSpecs.push({
          title: attr.title,
          value: attr.value
        });
      }
      
      if (attr.__component === 'product-attributes.product-variant') {
        dynamicVariants.push({
          price: attr.price,
          stock: attr.stock,
          options: attr.options || [] // گزینه‌های Color, Storage و...
        });
      }
    });
  }

  // ۴. آرایه‌های فرانت‌اَند کلاینت
  const allOptions = dynamicVariants.flatMap(v => v.options || []);
  
  const extractedColors = Array.from(new Set(allOptions.filter(o => o.type === 'Color').map(o => o.value)))
    .map(colorVal => {
      const matchedOpt = allOptions.find(o => o.type === 'Color' && o.value === colorVal);
      return {
        name: colorVal,
        class: matchedOpt?.meta_color || 'bg-slate-200'
      };
    });

  const extractedStorages = Array.from(new Set(allOptions.filter(o => o.type === 'Storage').map(o => o.value)));
  const extractedSizes = Array.from(new Set(allOptions.filter(o => o.type === 'Size').map(o => o.value)));

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
