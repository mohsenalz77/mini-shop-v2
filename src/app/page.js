import Header from '../components/Header';
import Hero from '../components/Hero';

// دیتای تستی محصولات برای طراحی قالب
const products = [
  { id: 1, name: 'آیفون ۱۵ پرو مکس - ۲۵۶ گیگابایت', price: '۶۴,۵۰۰,۰۰۰', image: '📱', tag: 'ویژه' },
  { id: 2, name: 'سامسونگ گلکسی S24 اولترا', price: '۵۹,۹۰۰,۰۰۰', image: '📱', tag: 'پرفروش' },
  { id: 3, name: 'ایرپاد پرو نسل ۲ نسخه Type-C', price: '۹,۸۰۰,۰۰۰', image: '🎧', tag: 'جدید' },
  { id: 4, name: 'شارژر دیواری انکر ۲۰ وات', price: '۸۵۰,۰۰۰', image: '🔌', tag: 'لوازم جانبی' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* هدر سایت */}
      <Header />

      {/* بنر اصلی قهرمان */}
      <Hero />

      {/* بخش محصولات پیشنهادی */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-extrabold text-gray-900">محبوب‌ترین محصولات</h2>
          <span className="text-sm text-red-500 font-medium cursor-pointer hover:underline">مشاهده همه ←</span>
        </div>

        {/* گرید کارت‌های محصولات */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl p-4 border border-gray-100 hover:shadow-xl hover:border-transparent transition duration-300 flex flex-col justify-between group">
              <div>
                {/* بخش تصویر محصول فرضی */}
                <div className="bg-gray-50 rounded-xl h-48 flex items-center justify-center text-5xl relative overflow-hidden mb-4 group-hover:scale-105 transition duration-300">
                  <span>{product.image}</span>
                  {product.tag && (
                    <span className="absolute top-2 right-2 bg-gray-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                      {product.tag}
                    </span>
                  )}
                </div>
                
                {/* عنوان محصول */}
                <h3 className="text-sm font-bold text-gray-800 line-clamp-2 leading-6 mb-2">
                  {product.name}
                </h3>
              </div>

              {/* قیمت و دکمه خرید */}
              <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400">قیمت</span>
                  <span className="text-sm font-black text-gray-900">{product.price} <span className="text-[10px] font-normal text-gray-500">تومان</span></span>
                </div>
                <button className="bg-gray-50 text-gray-700 p-2 rounded-xl group-hover:bg-red-500 group-hover:text-white transition duration-300">
                  ➕
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
