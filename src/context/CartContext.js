"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // ۱. لود کردن سبد خرید قبلی از مرورگر هنگام بالا آمدن سایت
  useEffect(() => {
    const savedCart = localStorage.getItem("sibshop_cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
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

  // ۳. تابع اضافه کردن محصول به سبد خرید
  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const exists = prevItems.find((item) => item.id === product.id);
      if (exists) {
        // اگر کالا بود، فقط تعدادش را زیاد کن
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      // اگر کالا نبود، جدید اضافه‌اش کن
      return [...prevItems, { ...product, quantity }];
    });
  };

  // ۴. تابع کم کردن یا حذف کالا
  const removeFromCart = (id) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0) // اگر تعداد صفر شد، کلا پاکش کن
    );
  };

  // ۵. حذف کامل یک آیتم با دکمه سطل آشغال
  const clearItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // ۶. کل آیتم‌های سبد خرید (تعداد کل برای نشان دادن در هدر)
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // ۷. محاسبه قیمت کل سبد خرید
  const cartTotalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
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
