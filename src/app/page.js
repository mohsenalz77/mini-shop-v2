import Header from '@/components/Header';
import Hero from '@/components/Hero';

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

      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* تیتر بخش */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-6 bg-red-500 rounded-full"></span>
            <h2 className="text-lg font-black text-gray-900">جدیدترین‌های دنیای فناوری</h2>
          </div>
          <span className="text-xs text-red-500 font-bold cursor-pointer hover:text-red-600 transition">
            مشاهده همه محصولات ←
          </span>
        </div>

        {/* گرید حرفه‌ای کارت‌ها */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl p-4 border border-gray-100/80 hover:shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:border-gray-200/60 transition-all duration-300 flex flex-col justify-between group cursor-pointer">
              <div>
                {/* باکس تصویر محصول */}
                <div className="bg-gray-50 rounded-xl h-44 flex items-center justify-center text-5xl relative overflow-hidden mb-4">
                  <span className="group-hover:scale-110 transition duration-300 select-none">{product.image}</span>
                  {product.tag && (
                    <span className="absolute top-2 right-2 bg-white/90 backdrop-blur-xs text-gray-800 text-[10px] font-extrabold px-2 py-1 rounded-lg border border-gray-100 shadow-2xs">
                      {product.tag}
                    </span>
                  )}
                </div>
                
                {/* عنوان دقیق محصول با ساختار مرتب */}
                <h3 className="text-xs font-bold text-gray-700 leading-6 group-hover:text-gray-900 transition duration-200 line-clamp-2 h-12">
                  {product.name}
                </h3>
              </div>

              {/* بخش قیمت و سبد خرید */}
              <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] text-gray-400 font-medium">قیمت فروشگاه</span>
                  <div className="text-sm font-black text-gray-900 flex items-center gap-1">
                    <span>{product.price}</span>
                    <span className="text-[10px] font-normal text-gray-400">تومان</span>
                  </div>
                </div>
                
                {/* دکمه افزودن پلاس مدرن */}
                <button className="bg-gray-50 text-gray-600 w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm hover:bg-red-500 hover:text-white transition duration-200">
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
