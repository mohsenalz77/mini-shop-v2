import Header from '../components/Header';
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import AmazingOffers from '../components/AmazingOffers';
import PromoBanners from '../components/PromoBanners';

// ۱. ارتقای دیتای محصولات با عکس‌های واقعی، امتیاز و قیمت قبل از تخفیف
const products = [
  { 
    id: 1, 
    name: 'گوشی موبایل آیفون ۱۵ پرو مکس - ۲۵۶ گیگابایت', 
    price: '۶۴,۵۰۰,۰۰۰', 
    oldPrice: '۶۸,۰۰۰,۰۰۰',
    rating: '۴.۸',
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&q=80', 
    tag: 'پیشنهاد ویژه' 
  },
  { 
    id: 2, 
    name: 'گوشی موبایل سامسونگ گلکسی S24 اولترا ۵G دو سیم‌کارت', 
    price: '۵۹,۹۰۰,۰۰۰', 
    oldPrice: '۶۲,۵۰۰,۰۰۰',
    rating: '۴.۷',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&q=80', 
    tag: 'پرفروش‌ترین' 
  },
  { 
    id: 3, 
    name: 'هدفون بی‌سیم اپل مدل AirPods Pro نسل ۲ Type-C', 
    price: '۹,۸۰۰,۰۰۰', 
    oldPrice: '۱۰,۹۰۰,۰۰۰',
    rating: '۴.۹',
    image: 'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=500&q=80', 
    tag: 'جدیدترین' 
  },
  { 
    id: 4, 
    name: 'شارژر دیواری انکر مدل Nano ۲۰W مناسب آیفون', 
    price: '۸۵۰,۰۰۰', 
    oldPrice: '۱,۱۰۰,۰۰۰',
    rating: '۴.۵',
    image: 'https://images.unsplash.com/photo-1622445262465-2481c4574875?w=500&q=80', 
    tag: 'لوازم جانبی' 
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50/40 overflow-x-hidden">
      
      <Header />
      <Hero />
      <Categories />
      <AmazingOffers />
      <PromoBanners />

      {/* ویترین جدید و پیشرفته محصولات */}
      <main className="w-full px-4 md:px-8 py-8 pt-4 pb-24 relative z-0">
        <div className="max-w-7xl mx-auto">
          
          {/* تیتر بخش محصولات */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-5 bg-rose-500 rounded-full"></span>
              <h2 className="text-lg md:text-xl font-black text-gray-900">جدیدترین‌های دنیای فناوری</h2>
            </div>
            <span className="text-xs text-rose-500 font-bold cursor-pointer hover:text-rose-600 transition duration-200 flex items-center gap-1">
              <span>مشاهده همه محصولات</span>
              <span>←</span>
            </span>
          </div>

          {/* گرید کارت‌های مدرن */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <div 
                key={product.id} 
                className="bg-white rounded-3xl p-3 md:p-4 border border-slate-100 shadow-xs hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:border-slate-200/60 transition-all duration-300 flex flex-col justify-between group cursor-pointer relative overflow-hidden"
              >
                <div>
                  {/* باکس تصویر کارت محصول با افکت زوم و دکمه مخفی سبد خرید */}
                  <div className="bg-slate-50 rounded-2xl h-40 md:h-48 flex items-center justify-center relative overflow-hidden mb-4 border border-slate-50">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 select-none mix-blend-multiply"
                    />
                    
                    {/* تگ وضعیت کالا */}
                    {product.tag && (
                      <span className="absolute top-2 right-2 bg-white/90 backdrop-blur-md text-slate-800 text-[9px] md:text-[10px] font-black px-2 py-1 rounded-xl border border-slate-100 shadow-2xs">
                        {product.tag}
                      </span>
                    )}

                    {/* دکمه افزودن سریع چسبان؛ موقع هاور خیلی نرم از پایین کارت ظاهر می‌شود */}
                    <div className="absolute inset-x-2 bottom-2 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out z-10 hidden md:block">
                      <button className="w-full bg-rose-500 text-white py-2.5 rounded-xl text-xs font-black shadow-md hover:bg-rose-600 transition flex items-center justify-center gap-1.5">
                        <span>🛒</span>
                        <span>افزودن به سبد خرید</span>
                      </button>
                    </div>
                  </div>
                  
                  {/* ریتینگ محصول (ستاره طلایی) */}
                  <div className="flex items-center gap-1 mb-1.5 justify-start">
                    <span className="text-amber-400 text-xs">⭐</span>
                    <span className="text-[10px] md:text-xs font-bold text-slate-500">{product.rating}</span>
                  </div>

                  {/* عنوان کالا با افکت لاین‌کلمپ دقیق */}
                  <h3 className="text-xs md:text-sm font-bold text-slate-800 leading-6 md:leading-6 group-hover:text-rose-500 transition duration-200 line-clamp-2 h-12 mb-2 text-right">
                    {product.name}
                  </h3>
                </div>

                {/* بخش قیمت قبل و بعد از تخفیف */}
                <div className="mt-2 pt-3 border-t border-slate-50 flex flex-col gap-1">
                  
                  {/* قیمت اصلی قدیمی خط خورده */}
                  <span className="text-[10px] text-slate-400 font-medium line-through text-left pl-1">
                    {product.oldPrice} تومان
                  </span>

                  <div className="flex items-center justify-between w-full">
                    {/* قیمت جدید نهایی */}
                    <div className="text-xs md:text-base font-black text-slate-900 flex items-center gap-0.5">
                      <span>{product.price}</span>
                      <span className="text-[10px] font-normal text-slate-400">تومان</span>
                    </div>
                    
                    {/* دکمه پلاس موبایل (در دسکتاپ دکمه عریض هاور فعال است) */}
                    <button className="md:hidden bg-slate-50 text-slate-600 w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs hover:bg-rose-500 hover:text-white transition duration-200">
                      ＋
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </main>

    </div>
  );
}
