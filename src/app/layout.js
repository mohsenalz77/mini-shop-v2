import { Vazirmatn } from 'next/font/google';
import "./globals.css";
// 🚀 ایمپورت پرووایدر سبد خرید که در مرحله قبل ساختیم
import { CartProvider } from "@/context/CartContext";

// لود کردن فونت بهینه‌شده‌ی وزیرمتن از گوگل فونت
const vazirmatn = Vazirmatn({ 
  subsets: ['arabic'],
  display: 'swap',
});

export const metadata = {
  title: "سیب شاپ | فروشگاه تخصصی موبایل",
  description: "تجربه خرید مینیمال و هوشمند لوازم جانبی و موبایل",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.className}>
      <body className="bg-gray-50/50 text-gray-900 antialiased">
        {/* تزریق طلایی: تمام صفحات سایت حالا به استیت سبد خرید متصل هستند */}
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
