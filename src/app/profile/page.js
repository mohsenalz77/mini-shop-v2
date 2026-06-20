"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { User, MapPin, ShoppingBag, Truck, CheckCircle, XCircle, LogOut, ChevronLeft, Edit3, Check } from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsLoadingSaving] = useState(false);
  
  // استیت دیتای واقعی کاربر متصل به سرور
  const [user, setUser] = useState({
    id: "",
    name: "محسن عزیز",
    phone: "",
    province: "",
    city: "",
    address: "",
    postalCode: ""
  });

  const [editForm, setEditForm] = useState({ ...user });

  // ⏱️ لود کردن اطلاعات زنده کاربر از دیتابیس استراپی به محض ورود به صفحه
  useEffect(() => {
    async function fetchUserProfile() {
      const token = localStorage.getItem('sibshop_token');
      if (!token) {
        alert('لطفا ابتدا وارد حساب کاربری خود شوید.');
        router.push('/login');
        return;
      }

      try {
        // فچ کردن اطلاعات پستی و کاربری مستقیم از متد /users/me استراپی
        const res = await fetch('https://b.dr-sib.xyz/api/users/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (res.ok) {
          const data = await res.json();
          
          const loadedUser = {
            id: data.id,
            name: data.name || "محسن عزیز",
            phone: data.username || "",
            province: data.province || "",
            city: data.city || "",
            address: data.address || "",
            postalCode: data.postalCode || ""
          };

          setUser(loadedUser);
          setEditForm(loadedUser);
        } else {
          // اگر توکن منقضی شده بود، هدایت به لاگین
          localStorage.removeItem('sibshop_token');
          router.push('/login');
        }
      } catch (error) {
        console.error("Fetch profile error:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUserProfile();
  }, [router]);

  // 🚀 ذخیره دیتای جدید روی هارد دیتابیس سرور استراپی
  const handleSave = async () => {
    const token = localStorage.getItem('sibshop_token');
    setIsLoadingSaving(true);

    try {
      // ارسال درخواست پوت به استراپی برای آپدیت سطر همین کاربر
      const res = await fetch(`https://b.dr-sib.xyz/api/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: editForm.name,
          province: editForm.province,
          city: editForm.city,
          address: editForm.address,
          postalCode: editForm.postalCode
        })
      });

      if (res.ok) {
        const updatedData = await res.json();
        
        setUser({
          ...user,
          name: updatedData.name,
          province: updatedData.province,
          city: updatedData.city,
          address: updatedData.address,
          postalCode: updatedData.postalCode
        });

        setIsEditing(false);
        alert('تغییرات با موفقیت روی سرور سیب‌شاپ ذخیره شد. ⚡');
      } else {
        alert('خطا در ذخیره‌سازی اطلاعات روی سرور.');
      }
    } catch (error) {
      console.error("Update profile error:", error);
      alert('ارتباط با سرور برقرار نشد.');
    } finally {
      setIsLoadingSaving(false);
    }
  };

  // 🚪 خروج کامل از حساب
  const handleLogout = () => {
    localStorage.removeItem('sibshop_token');
    localStorage.removeItem('sibshop_user');
    window.location.href = '/';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 font-bold text-xs text-slate-500">
        در حال دریافت اطلاعات از سرور سیب‌شاپ...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 direction-rtl antialiased flex flex-col justify-between">
      <Header />

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

              <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-between px-3 py-3 rounded-xl text-rose-500 hover:bg-rose-50/50 font-bold text-xs transition border-t border-slate-50 mt-2"
              >
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

            <section className="bg-white border border-slate-100 rounded-3xl p-5 shadow-3xs text-right">
              <div className="flex items-center justify-between border-b border-slate-50 pb-3 mb-4">
                <h4 className="text-xs font-black text-slate-800">
                  {activeTab === 'address' ? 'جزئیات نشانی و ارسال کالا' : 'اطلاعات حساب کاربری'}
                </h4>
                
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
                    disabled={isSaving}
                    className="flex items-center gap-1 text-[11px] font-black text-white bg-emerald-500 hover:bg-emerald-600 px-3 py-1.5 rounded-xl transition disabled:opacity-50"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>{isSaving ? 'در حال ذخیره...' : 'ذخیره تغییرات'}</span>
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <div className="bg-slate-50/80 px-4 py-3 rounded-xl border border-slate-100 text-xs font-black text-slate-700">{user.name || "ثبت نشده"}</div>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <span className="text-[11px] font-bold text-slate-400 mr-1">شماره تماس گیرنده</span>
                  <div className="bg-slate-50/80 px-4 py-3 rounded-xl border border-slate-100 text-xs font-bold font-sans text-slate-400 text-left direction-ltr select-none">{user.phone}</div>
                </div>

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
                    <div className="bg-slate-50/80 px-4 py-3 rounded-xl border border-slate-100 text-xs font-black text-slate-700">{user.province || "ثبت نشده"}</div>
                  )}
                </div>

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
                    <div className="bg-slate-50/80 px-4 py-3 rounded-xl border border-slate-100 text-xs font-black text-slate-700">{user.city || "ثبت نشده"}</div>
                  )}
                </div>

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
                    <div className="bg-slate-50/80 px-4 py-3 rounded-xl border border-slate-100 text-xs font-bold text-slate-700 leading-6">{user.address || "آدرسی ثبت نشده است."}</div>
                  )}
                </div>

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
                    <div className="bg-slate-50/80 px-4 py-3 rounded-xl border border-slate-100 text-xs font-bold font-sans text-slate-700 tracking-wider">{user.postalCode || "--------"}</div>
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
