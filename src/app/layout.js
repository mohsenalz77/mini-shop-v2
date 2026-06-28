import { Vazirmatn } from 'next/font/google';
import "./globals.css";
// 🚀 ایمپورت پرووایدر سبد خرید
import { CartProvider } from "../context/CartContext";

// لود کردن استاندارد و همه‌جانبه‌ی فونت وزیرمتن با تعریف متغیر CSS
const vazirmatn = Vazirmatn({ 
  subsets: ['arabic'],
  display: 'swap',
  variable: '--font-vazir', // ساخت متغیر اختصاصی برای تداخل پیدا نکردن در فرانت
});

export const metadata = {
  title: "سیب شاپ | فروشگاه تخصصی موبایل",
  description: "تجربه خرید مینیمال و هوشمند لوازم جانبی و موبایل",
};

export default function RootLayout({ children }) {
  return (
    // ⚡️ اضافه شدن متغیر فونت به کلاس ریشه سایت
    <html lang="fa" dir="rtl" className={`${vazirmatn.variable}`}>
      {/* 🎨 اعمال قطعی فونت روی کلاس اصلی تگ بادی */}
      <body className="bg-gray-50/50 text-gray-900 antialiased font-sans">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
