import Header from '../components/Header';
import Hero from '../components/Hero';

const products = [
  { id: 1, name: 'گوشی موبایل آیفون ۱۵ پرو مکس - ۲۵۶ گیگابایت', price: '۶۴,۵۰۰,۰۰۰', image: '📱', tag: 'پیشنهاد ویژه' },
  { id: 2, name: 'گوشی موبایل سامسونگ گلکسی S24 اولترا ۵G', price: '۵۹,۹۰۰,۰۰۰', image: '📱', tag: 'پرفروش‌ترین' },
  { id: 3, name: 'هدفون بی‌سیم اپل مدل AirPods Pro نسل ۲', price: '۹,۸۰۰,۰۰۰', image: '🎧', tag: 'جدیدترین' },
  { id: 4, name: 'شارژر دیواری انکر مدل ۲۰ وات مناسب آیفون', price: '۸۵۰,۰۰۰', image: '🔌', tag: 'لوازم جانبی' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50/40">
      <Header />
      <Hero />

      {/* اضافه شدن pb-24 برای اینکه منوی پایین موبایل روی محصولات نیفتد */}
      <main className="max-w-7xl mx-auto px-4 py-8 pb-24">
        
        {/* تیتر بخش */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="w-1 h-5 bg-red-500 rounded-full"></span>
            <h2 className="text-base md:text-lg font-black text-gray-900">جدیدترین‌های دنیای فناوری</h2>
          </div>
          <span className="text-xs text-red-500 font-bold cursor-pointer hover:text-red-600 transition">
            مشاهده همه ←
          </span>
        </div>

        {/* گرید ریسپانسیو: در موبایل ۲ ستونه (grid-cols-2)، در دسکتاپ ۴ ستونه (md:grid-cols-4) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl p-3 md:p-4 border border-gray-100/80 hover:shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:border-gray-200/60 transition-all duration-300 flex flex-col justify-between group cursor-pointer">
              <div>
                {/* باکس تصویر محصول */}
                <div className="bg-gray-50 rounded-xl h-36 md:h-44 flex items-center justify-center text-4xl md:text-5xl relative overflow-hidden mb-3">
                  <span className="group-hover:scale-110 transition duration-300 select-none">{product.image}</span>
                  {product.tag && (
                    <span className="absolute top-1.5 right-1.5 bg-white/90 backdrop-blur-xs text-gray-800 text-[8px] md:text-[10px] font-extrabold px-1.5 py-0.5 md:py-1 rounded-md md:rounded-lg border border-gray-100 shadow-2xs">
                      {product.tag}
                    </span>
                  )}
                </div>
                
                {/* عنوان دقیق محصول */}
                <h3 className="text-[11px] md:text-xs font-bold text-gray-700 leading-5 md:leading-6 group-hover:text-gray-900 transition duration-200 line-clamp-2 h-10 md:h-12">
                  {product.name}
                </h3>
              </div>

              {/* بخش قیمت و سبد خرید */}
              <div className="mt-3 pt-3 border-t border-gray-50 flex items-center justify-between">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[9px] md:text-[10px] text-gray-400 font-medium">قیمت</span>
                  <div className="text-xs md:text-sm font-black text-gray-900 flex items-center gap-0.5 md:gap-1">
                    <span>{product.price}</span>
                    <span className="text-[9px] md:text-[10px] font-normal text-gray-400">تومان</span>
                  </div>
                </div>
                
                {/* دکمه افزودن پلاس مدرن */}
                <button className="bg-gray-50 text-gray-600 w-7 h-7 md:w-8 md:h-8 rounded-lg md:rounded-xl flex items-center justify-center font-bold text-xs md:text-sm hover:bg-red-500 hover:text-white transition duration-200">
                  ＋
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
