"use client";

import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { User, MapPin, ShoppingBag, Truck, CheckCircle, XCircle, LogOut, ChevronLeft, Edit3, Check } from 'lucide-react';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('dashboard'); // مدیریت تب‌های سایدبار
  const [isEditing, setIsEditing] = useState(false); // وضعیت ویرایش اطلاعات
  
  // دیتای کاربری با فیلدهای تکمیلی پستی
  const [user, setUser] = useState({
    name: "محسن عزیز",
    phone: "09123456789",
    province: "تهران",
    city: "تهران",
    address: "خیابان آزادی، کوچه درخشان، پلاک ۱۲، واحد ۳",
    postalCode: "1234567890"
  });

  // نگهدارنده موقت اطلاعات در حین ویرایش
  const [editForm, setEditForm] = useState({ ...user });

  const handleSave = () => {
    setUser({ ...editForm });
    setIsEditing(false);
    alert('تغییرات با موفقیت در پروفایل شما ثبت شد.');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 direction-rtl antialiased flex flex-col justify-between">
      <Header />

      {/* 🏪 بدنه اصلی پروفایل - کاملاً هم‌تراز با پدینگ و عرض آزاد هیرو باکس اصلی سایت */}
      <main className="w-full px-4 md:px-8 py-4 md:py-6 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          
          {/* 🔹 منوی سمت راست پروفایل */}
          <aside className="lg:col-span-3 bg-white border border-slate-100 rounded-3xl p-5 shadow-3xs text-right">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100 mb-4">
              <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 font-black text-xl border border-rose-100 shrink-0">
                📱
              </div>
              <div className="truncate">
                <h3 className="text-sm font-black text-slate-800 truncate">{user.name}</h3>
                <p className="text-[11px] text-slate-400 font-sans font-bold mt-0.5">{user.phone}</p>
              </div>
            </div>

            {/* گزینه‌های منو متصل به استیت زنده */}
            <nav className="flex flex-col gap-1">
              <button 
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center justify-between px-3 py-3 rounded-xl text-xs transition ${activeTab === 'dashboard' ? 'bg-rose-50 text-rose-600 font-black' : 'text-slate-600 hover:bg-slate-50 font-bold'}`}
              >
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>داشبورد کاربری</span>
                </div>
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>

              <button 
                onClick={() => setActiveTab('address')}
                className={`w-full flex items-center justify-between px-3 py-3 rounded-xl text-xs transition ${activeTab === 'address' ? 'bg-rose-50 text-rose-600 font-black' : 'text-slate-600 hover:bg-slate-50 font-bold'}`}
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>نشانی‌ها و اطلاعات ارسال</span>
                </div>
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>

              <button className="w-full flex items-center justify-between px-3 py-3 rounded-xl text-slate-600 hover:bg-slate-50 font-bold text-xs transition border-t border-slate-50 mt-2 text-rose-500">
                <div className="flex items-center gap-2">
                  <LogOut className="w-4 h-4" />
                  <span>خروج از حساب</span>
                </div>
              </button>
            </nav>
          </aside>

          {/* 🔹 محتوای سمت چپ پروفایل */}
          <div className="lg:col-span-9 w-full flex flex-col gap-4 md:gap-5">
            
            {activeTab === 'dashboard' && (
              /* 📊 بخش اول: داشبورد و خلاصه وضعیت سفارش‌ها */
              <section className="bg-white border border-slate-100 rounded-3xl p-5 shadow-3xs text-right animate-fadeIn">
                <h4 className="text-xs font-black text-slate-800 mb-4 flex items-center gap-1.5">
                  <ShoppingBag className="w-4 h-4 text-slate-500" />
                  <span>خلاصه سفارش‌های شما</span>
                </h4>
                
                <div className="grid grid-cols-3 gap-2 md:gap-4">
                  <div className="bg-slate-50/60 border border-slate-100 p-3 rounded-2xl flex flex-col items-center justify-center text-center">
                    <Truck className="w-5 h-5 md:w-6 md:h-6 text-amber-500" />
                    <span className="text-[9px] md:text-xs font-black text-slate-700 mt-2">جاری / در ارسال</span>
                    <span className="text-xs md:text-sm font-sans font-black text-slate-900 mt-1">۰</span>
                  </div>

                  <div className="bg-slate-50/60 border border-slate-100 p-3 rounded-2xl flex flex-col items-center justify-center text-center">
                    <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-emerald-500" />
                    <span className="text-[9px] md:text-xs font-black text-slate-700 mt-2">تحویل شده</span>
                    <span className="text-xs md:text-sm font-sans font-black text-slate-900 mt-1">۰</span>
                  </div>

                  <div className="bg-slate-50/60 border border-slate-100 p-3 rounded-2xl flex flex-col items-center justify-center text-center">
                    <XCircle className="w-5 h-5 md:w-6 md:h-6 text-rose-500" />
                    <span className="text-[9px] md:text-xs font-black text-slate-700 mt-2">لغو شده</span>
                    <span className="text-xs md:text-sm font-sans font-black text-slate-900 mt-1">۰</span>
                  </div>
                </div>
              </section>
            )}

            {/* 📝 بخش دوم: اطلاعات حساب و تحویل سفارش (در هر دو تب یا به صورت مجزا کاربرد دارد) */}
            <section className="bg-white border border-slate-100 rounded-3xl p-5 shadow-3xs text-right">
              <div className="flex items-center justify-between border-b border-slate-50 pb-3 mb-4">
                <h4 className="text-xs font-black text-slate-800">
                  {activeTab === 'address' ? 'جزئیات نشانی و ارسال کالا' : 'اطلاعات حساب کاربری'}
                </h4>
                
                {/* دکمه سوئیچ ادیتور هوشمند */}
                {!isEditing ? (
                  <button 
                    onClick={() => setIsEditing(true)} 
                    className="flex items-center gap-1 text-[11px] font-black text-rose-500 hover:text-rose-600 bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-100 transition"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>ویرایش اطلاعات</span>
                  </button>
                ) : (
                  <button 
                    onClick={handleSave} 
                    className="flex items-center gap-1 text-[11px] font-black text-white bg-emerald-500 hover:bg-emerald-600 px-3 py-1.5 rounded-xl transition"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>ذخیره تغییرات</span>
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* فیلد نام */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[11px] font-bold text-slate-400 mr-1">نام و نام خانوادگی گیرنده</span>
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={editForm.name} 
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="bg-slate-50 border border-slate-200 focus:border-rose-500/40 focus:bg-white rounded-xl px-4 py-2.5 text-xs font-black focus:outline-none w-full"
                    />
                  ) : (
                    <div className="bg-slate-50/80 px-4 py-3 rounded-xl border border-slate-100 text-xs font-black text-slate-700">{user.name}</div>
                  )}
                </div>

                {/* فیلد تلفن */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[11px] font-bold text-slate-400 mr-1">شماره تماس اضطراری</span>
                  {isEditing ? (
                    <input 
                      type="tel" 
                      maxLength={11}
                      value={editForm.phone} 
                      onChange={(e) => setEditForm({ ...editForm, phone: e.target.value.replace(/[^\d]/g, '') })}
                      className="bg-slate-50 border border-slate-200 focus:border-rose-500/40 focus:bg-white rounded-xl px-4 py-2.5 text-xs font-bold font-sans focus:outline-none text-left direction-ltr w-full"
                    />
                  ) : (
                    <div className="bg-slate-50/80 px-4 py-3 rounded-xl border border-slate-100 text-xs font-bold font-sans text-slate-700 text-left direction-ltr">{user.phone}</div>
                  )}
                </div>

                {/* فیلد استان */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[11px] font-bold text-slate-400 mr-1">استان</span>
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={editForm.province} 
                      onChange={(e) => setEditForm({ ...editForm, province: e.target.value })}
                      className="bg-slate-50 border border-slate-200 focus:border-rose-500/40 focus:bg-white rounded-xl px-4 py-2.5 text-xs font-black focus:outline-none w-full"
                    />
                  ) : (
                    <div className="bg-slate-50/80 px-4 py-3 rounded-xl border border-slate-100 text-xs font-black text-slate-700">{user.province}</div>
                  )}
                </div>

                {/* فیلد شهر */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[11px] font-bold text-slate-400 mr-1">شهر</span>
                  {isEditing ? (
                    <input 
                      type="text" 
                      value={editForm.city} 
                      onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
                      className="bg-slate-50 border border-slate-200 focus:border-rose-500/40 focus:bg-white rounded-xl px-4 py-2.5 text-xs font-black focus:outline-none w-full"
                    />
                  ) : (
                    <div className="bg-slate-50/80 px-4 py-3 rounded-xl border border-slate-100 text-xs font-black text-slate-700">{user.city}</div>
                  )}
                </div>

                {/* فیلد آدرس پستی */}
                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <span className="text-[11px] font-bold text-slate-400 mr-1">نشانی دقیق پستی</span>
                  {isEditing ? (
                    <textarea 
                      rows={2}
                      value={editForm.address} 
                      onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                      className="bg-slate-50 border border-slate-200 focus:border-rose-500/40 focus:bg-white rounded-xl px-4 py-2.5 text-xs font-bold focus:outline-none w-full resize-none leading-6"
                    />
                  ) : (
                    <div className="bg-slate-50/80 px-4 py-3 rounded-xl border border-slate-100 text-xs font-bold text-slate-700 leading-6">{user.address}</div>
                  )}
                </div>

                {/* فیلد کد پستی ۱۰ رقمی */}
                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <span className="text-[11px] font-bold text-slate-400 mr-1">کد پستی ۱۰ رقمی</span>
                  {isEditing ? (
                    <input 
                      type="text" 
                      maxLength={10}
                      value={editForm.postalCode} 
                      onChange={(e) => setEditForm({ ...editForm, postalCode: e.target.value.replace(/[^\d]/g, '') })}
                      className="bg-slate-50 border border-slate-200 focus:border-rose-500/40 focus:bg-white rounded-xl px-4 py-2.5 text-xs font-bold font-sans focus:outline-none tracking-wider w-full"
                    />
                  ) : (
                    <div className="bg-slate-50/80 px-4 py-3 rounded-xl border border-slate-100 text-xs font-bold font-sans text-slate-700 tracking-wider">{user.postalCode}</div>
                  )}
                </div>
              </div>
            </section>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
