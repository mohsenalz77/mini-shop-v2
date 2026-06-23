"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // ۱. لود کردن سبد خرید قبلی از مرورگر هنگام بالا آمدن سایت
  useEffect(() => {
    const savedCart = localStorage.getItem("sibshop_cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("خطا در لود سبد خرید:", e);
      }
    }
  }, []);

  // ۲. ذخیره خودکار در مرورگر به محض تغییر سبد خرید
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("sibshop_cart", JSON.stringify(cartItems));
    } else {
      localStorage.removeItem("sibshop_cart");
    }
  }, [cartItems]);

  // ۳. تابع اضافه کردن محصول به سبد خرید با بررسی سقف موجودی انبار (بی‌صدا و بدون آلرت)
  const addToCart = (product, quantity = 1) => {
    // 📦 استخراج موجودی واقعی محصول از دیتای استراپی (اگر تعریف نشده بود، فرض بر ۱ است)
    const availableStock = product.stock !== undefined ? Number(product.stock) : 99;

    setCartItems((prevItems) => {
      const exists = prevItems.find((item) => item.id === product.id);

      if (exists) {
        const nextQuantity = exists.quantity + quantity;

        // 🤫 قفل بی‌صدا: اگر تعداد درخواستی جدید از سقف انبار بیشتر شد، بدون خطای مزاحم متوقفش کن
        if (nextQuantity > availableStock) {
          return prevItems; 
        }

        // اگر سقف مجاز بود، تعدادش را زیاد کن
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: nextQuantity } : item
        );
      }

      // 🤫 قفل بی‌صدا برای کالای جدید
      if (quantity > availableStock) {
        return prevItems;
      }

      // اگر کالا نبود و سقف مجاز بود، جدید اضافه‌اش کن
      return [...prevItems, { ...product, stock: availableStock, quantity }];
    });
  };

  // ۴. تابع افزایش مستقیم تعداد کالا با بررسی دقیق و بی‌صدای انبار
  const incrementQuantity = (id) => {
    setCartItems((prevItems) => {
      const targetItem = prevItems.find((item) => item.id === id);
      if (!targetItem) return prevItems;

      const availableStock = targetItem.stock !== undefined ? Number(targetItem.stock) : 99;

      // 🤫 قفل بی‌صدا: دکمه فرانت غیرفعال است، اما اگر باز هم کلیک شد جلویش را بگیر
      if (targetItem.quantity + 1 > availableStock) {
        return prevItems;
      }

      return prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
    });
  };

  // ۵. تابع کم کردن تعداد کالا
  const removeFromCart = (id) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0) // اگر تعداد صفر شد، کلا پاکش کن
    );
  };

  // ۶. حذف کامل یک آیتم با دکمه سطل آشغال
  const clearItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // ۷. کل آیتم‌های سبد خرید (تعداد کل برای نشان دادن در هدر)
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // ۸. محاسبه قیمت کل سبد خرید
  const cartTotalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems, // 🚀 ارسال مستقیم این متد برای پاکسازی سبد خرید در صفحه تسویه حساب
        addToCart,
        incrementQuantity, 
        removeFromCart,
        clearItem,
        cartCount,
        cartTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// هوک اختصاصی برای استفاده راحت در بقیه فایل‌ها
export function useCart() {
  return useContext(CartContext);
}
