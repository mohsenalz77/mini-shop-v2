import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import ProductDetailClient from './ProductDetailClient';

// تابع فچ کردن اطلاعات تک محصول از استراپی بر اساس اسلاگ و ساختار جدید داینامیک زون
async function getSingleProductBySlug(slug) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://b.dr-sib.xyz/api";
    // 🔗 پاپولیت عمیق برای واکشی فیلدهای داینامیک زون (attributes) و ساب‌کامپوننت‌های آن
    const res = await fetch(`${apiUrl}/products?filters[slug][$eq]=${slug}&populate=*&populate[attributes][populate]=*`, {
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

  const attributes = apiProduct.attributes || apiProduct;
  // استخراج فیلد داینامیک زون (attributes) و گارانتی
  const { title, price, oldPrice, description, image, gallery, stock, warranty, attributes: dynamicAttributes } = attributes;

  // آدرس پایه برای تصاویر استراپی
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "https://b.dr-sib.xyz";
  
  // 📸 ۱. پردازش و استخراج عکس اصلی
  const imgData = image?.data;
  const hasImage = imgData?.attributes?.url || imgData?.url;
  const safeImageUrl = hasImage 
    ? `${strapiUrl}${imgData?.attributes?.url || imgData?.url}`
    : null;

  // 🖼️ ۲. پردازش هوشمند آلبوم تصاویر
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

  // 🛠️ پردازش بلاک‌های متنی توضیحات استراپی ۵
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

  // 🔄 ۳. استخراج و فیلتر هوشمند ویژگی‌های پویا (Dynamic Zone) از استراپی
  let extractedSpecs = [];
  let dynamicVariants = [];

  if (dynamicAttributes && Array.isArray(dynamicAttributes)) {
    dynamicAttributes.forEach(attr => {
      // الف) اگر مشخصات فنی (Specification) بود:
      if (attr.__component === 'product-attributes.specification') {
        extractedSpecs.push({
          title: attr.title,
          value: attr.value
        });
      }
      
      // ب) اگر تنوع اصلی محصول (ProductVariant) بود:
      if (attr.__component === 'product-attributes.product-variant') {
        dynamicVariants.push({
          price: attr.price,
          stock: attr.stock,
          options: attr.options || [] // شامل گزینه‌های ریز مثل Color, Storage, Size
        });
      }
    });
  }

  // ۴. استخراج آرایه رنگ‌ها و ظرفیت‌ها به صورت یونیک برای نمایش اولیه در فرانت
  const allOptions = dynamicVariants.flatMap(v => v.options);
  
  const extractedColors = Array.from(new Set(allOptions.filter(o => o.type === 'Color').map(o => o.value)))
    .map(colorVal => {
      const matchedOpt = allOptions.find(o => o.type === 'Color' && o.value === colorVal);
      return {
        name: colorVal,
        class: matchedOpt?.meta_color || 'bg-slate-200' // استفاده از meta_color وارد شده در استراپی
      };
    });

  const extractedStorages = Array.from(new Set(allOptions.filter(o => o.type === 'Storage').map(o => o.value)));
  const extractedSizes = Array.from(new Set(allOptions.filter(o => o.type === 'Size').map(o => o.value)));

  // آماده‌سازی نهایی دیتای شسته رفته برای کامپوننت کلاینت
  const productData = {
    id: apiProduct.id,
    name: title,
    imageUrl: safeImageUrl,
    imagesAlbum: albumUrls,
    englishName: attributes.englishName || '', 
    // فیلدهای قیمت و انبار پایه (در صورت وجود تنوع داینامیک، کلاینت آن را مدیریت می‌کند)
    price: price ? Number(price).toLocaleString('fa-IR') : '۰',
    oldPrice: oldPrice ? Number(oldPrice).toLocaleString('fa-IR') : null,
    stock: stock !== undefined ? Number(stock) : 1,
    rating: attributes.rating || '۴.۸',
    reviewCount: attributes.reviewCount || '۱ دیدگاه',
    warranty: warranty || 'گارانتی ۱۸ ماهه سیب‌شاپ', // فیلد داینامیک گارانتی
    
    // آرایه‌های پویا استخراج شده از استراپی
    storages: extractedStorages,
    colors: extractedColors,
    sizes: extractedSizes, // ویژگی‌های ساعت
    specs: extractedSpecs.length > 0 ? extractedSpecs : [{ title: 'ارتباطات', value: 'دیزاین پویا' }],
    variants: dynamicVariants, // پاس دادن کل آبجکت تنوع‌ها برای مدیریت قیمت‌ها در کلاینت
    
    fullSpecs: [
      { label: 'توضیحات محصول', value: cleanDescription },
    ],
    relatedProducts: [
      { id: 2, name: 'شارژر دیواری انکر مدل Nano ۲۰W', price: '۸۹۰,۰۰۰', image: '🔌' },
    ]
  };

  return <ProductDetailClient productData={productData} />;
}
