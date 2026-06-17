import { Smartphone, Headphones, Watch, Plug, Shield, Sparkles } from 'lucide-react';

const categories = [
  { id: 1, name: 'گوشی موبایل', icon: Smartphone, color: 'from-amber-500 to-orange-600', count: '۱۲۰ مدل' },
  { id: 2, name: 'هدفون و ایرپاد', icon: Headphones, color: 'from-rose-500 to-pink-600', count: '۸۵ مدل' },
  { id: 3, name: 'ساعت هوشمند', icon: Watch, color: 'from-blue-500 to-indigo-600', count: '۴۰ مدل' },
  { id: 4, name: 'شارژر و کابل', icon: Plug, color: 'from-emerald-500 to-teal-600', count: '۹۵ مدل' },
  { id: 5, name: 'قاب و گلس', icon: Shield, color: 'from-purple-500 to-violet-600', count: '۳۴۰ مدل' },
];

export default function Categories() {
  return (
    // mt-12 فاصله را کاملاً مهندسی‌شده و تراز با بیرون‌زدگی آیفون می‌کند
    <div className="w-full px-4 md:px-8 mt-12 mb-16 relative z-10">
      
      {/* تیتر بخش دسته‌بندی: بازطراحی شده برای فرار از بی‌روحی */}
      <div className="flex flex-col gap-2 mb-8 items-start">
        {/* یک تگ کوچک بالای تیتر برای ایجاد هویت بصری */}
        <div className="flex items-center gap-1.5 bg-rose-50 text-rose-600 px-3 py-1 rounded-full border border-rose-100/70 animate-pulse">
          <Sparkles className="w-3.5 h-3.5" />
          <span className="text-[10px] font-black tracking-wide">دسترسی سریع</span>
        </div>
        
        {/* عنوان اصلی به صورت دو رنگ و وزن فونت فوق ضخیم */}
        <h2 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">
          چه چیزی در <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600">سیب‌شاپ</span> جستجو می‌کنید؟
        </h2>
      </div>

      {/* ردیف دسته‌بندی‌ها */}
      <div className="flex md:grid md:grid-cols-5 gap-4 md:gap-6 overflow-x-auto pb-4 md:pb-0 scrollbar-none snap-x">
        {categories.map((cat) => {
          const IconComponent = cat.icon;
          return (
            <div 
              key={cat.id} 
              className="flex-shrink-0 w-36 md:w-full snap-center bg-white border border-slate-100 rounded-2xl p-5 flex flex-col items-center text-center shadow-xs hover:shadow-md hover:border-slate-200/80 transition-all duration-300 group cursor-pointer"
            >
              <div className={`w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center text-slate-700 mb-4 transition-all duration-300 group-hover:bg-gradient-to-br ${cat.color} group-hover:text-white group-hover:scale-110 shadow-inner`}>
                <IconComponent className="w-6 h-6 stroke-[1.8]" />
              </div>

              <span className="text-xs md:text-sm font-bold text-slate-800 group-hover:text-rose-500 transition-colors duration-200">
                {cat.name}
              </span>

              <span className="text-[10px] font-medium text-slate-400 mt-1.5 bg-slate-50 px-2 py-0.5 rounded-full">
                {cat.count}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
