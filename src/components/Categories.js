import { Smartphone, Headphones, Watch, Plug, Shield } from 'lucide-react';

const categories = [
  { id: 1, name: 'گوشی موبایل', icon: Smartphone, color: 'from-amber-500 to-orange-600', count: '۱۲۰ مدل' },
  { id: 2, name: 'هدفون و ایرپاد', icon: Headphones, color: 'from-rose-500 to-pink-600', count: '۸۵ مدل' },
  { id: 3, name: 'ساعت هوشمند', icon: Watch, color: 'from-blue-500 to-indigo-600', count: '۴۰ مدل' },
  { id: 4, name: 'شارژر و کابل', icon: Plug, color: 'from-emerald-500 to-teal-600', count: '۹۵ مدل' },
  { id: 5, name: 'قاب و گلس', icon: Shield, color: 'from-purple-500 to-violet-600', count: '۳۴۰ مدل' },
];

export default function Categories() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 my-12">
      {/* تیتر بخش دسته‌بندی */}
      <div className="flex items-center gap-2 mb-8 justify-start">
        <span className="w-1.5 h-6 bg-rose-500 rounded-full"></span>
        <h2 className="text-lg md:text-xl font-black text-slate-900">دسته‌بندی محصولات سیب‌شاپ</h2>
      </div>

      {/* ردیف دسته‌بندی‌ها (در موبایل اسکرول افقی و در دسکتاپ فیت) */}
      <div className="flex md:grid md:grid-cols-5 gap-4 md:gap-6 overflow-x-auto pb-4 md:pb-0 scrollbar-none snap-x">
        {categories.map((cat) => {
          const IconComponent = cat.icon;
          return (
            <div 
              key={cat.id} 
              className="flex-shrink-0 w-36 md:w-full snap-center bg-white border border-slate-100 rounded-2xl p-5 flex flex-col items-center text-center shadow-xs hover:shadow-md hover:border-slate-200/80 transition-all duration-300 group cursor-pointer"
            >
              {/* باکس دایره‌ای آیکون با گرادینت نرم موقع هاور */}
              <div className={`w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center text-slate-700 mb-4 transition-all duration-300 group-hover:bg-gradient-to-br ${cat.color} group-hover:text-white group-hover:scale-110 shadow-inner`}>
                <IconComponent className="w-6 h-6 stroke-[1.8]" />
              </div>

              {/* نام دسته‌بندی */}
              <span className="text-xs md:text-sm font-bold text-slate-800 group-hover:text-rose-500 transition-colors duration-200">
                {cat.name}
              </span>

              {/* تعداد موجودی ریز و کم‌رنگ */}
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
