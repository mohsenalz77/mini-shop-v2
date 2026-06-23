import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import ProductDetailClient from './ProductDetailClient';

// تابع فچ کردن اطلاعات تک محصول با مانیتورینگ دقیق خطاها
async function getSingleProductBySlug(slug) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://b.dr-sib.xyz/api";
    
    // 🔗 اضافه کردن پاپولیت عمیق به صورت کاملاً استاندارد برای استراپی ۵ و ۴
    const url = `${apiUrl}/products?filters[slug][$eq]=${slug}&populate=*&populate[attributes][populate]=*`;
    
    console.log("🚀 Requesting Strapi URL:", url); // این لاگ در ترمینال VSCode آدرس فچ را بهت نشان می‌دهد

    const res = await fetch(url, {
      cache: 'no-store'
    });

    if (!res.ok) {
      console.error(`❌ Strapi error response! Status: ${res.status}`);
      return null;
    }
    
    const data = await res.json();
    
    // اگر دیتایی پیدا شد
    if (data.data && data.data.length > 0) {
      return data.data[0];
    }
    
    console.warn(`⚠️ No product found in Strapi for slug: "${slug}"`);
    return null;
  } catch (error) {
    console.error("❌ Error fetching single product by slug:", error);
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
        <div className="text-center py-20 text-slate-500 font-bold">
          <p>محصول مورد نظر یافت نشد.</p>
          <p className="text-xs text-slate-400 font-normal mt-2">اسلاگ درخواستی: {slug}</p>
          <p className="text-xs text-rose-500 font-normal mt-1">مطمئن شو که محصول در استراپی در وضعیت Publish قرار دارد و فیلد attributes ساخته شده است.</p>
        </div>
        <Footer />
      </div>
    );
  }

  // لایه دفاعی برای استراپی ۴ و ۵ (تخت کردن ویژگی‌ها)
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
  
  // 📸 ۱. پردازش عکس اصلی
  const imgData = image?.data;
  const hasImage = imgData?.attributes?.url || imgData?.url;
  const safeImageUrl = hasImage 
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

  // 🛠️ پردازش توضیحات متنی استراپی
  let cleanDescription = "توضیحاتی برای این محصول در استراپی وارد نشده است.";
  if (description) {
    if (typeof description === 'string') {
      cleanDescription = description;
    } else if (Array.isArray(description)) {
      cleanDescription = description
        .map(block => block.children?.map(child => child.text).join('') || '')
        .join('\n');
    }
  }

  // 🔄 ۳. استخراج ویژگی‌های داینامیک زون با لایه دفاعی عدم وجود کامپوننت
  let extractedSpecs = [];
  let dynamicVariants = [];

  if (dynamicAttributes && Array.isArray(dynamicAttributes)) {
    dynamicAttributes.forEach(attr => {
      // بررسی گارد ریل نام کامپوننت (متناسب با نام کامپوننت شما در استراپی)
      if (attr.__component?.endsWith('specification')) {
        extractedSpecs.push({
          title: attr.title,
          value: attr.value
        });
      }
      
      if (attr.__component?.endsWith('product-variant')) {
        dynamicVariants.push({
          price: attr.price,
          stock: attr.stock,
          options: attr.options || []
        });
      }
    });
  }

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
    specs: extractedSpecs.length > 0 ? extractedSpecs : [{ title: 'ارتباطات', value: 'دیتابیس آنلاین سیب‌شاپ' }],
    variants: dynamicVariants,
    
    fullSpecs: [
      { label: 'توضیحات محصول', value: cleanDescription },
    ]
  };

  return <ProductDetailClient productData={productData} />;
}
