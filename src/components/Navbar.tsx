"use client";

import React, { useState } from "react";
import Link from "next/link"; // ← ① これを追加
import { Leaf, Heart, Menu } from "lucide-react";
import { NAV_ITEMS, RESERVATION_URL } from "../constants/components";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-emerald-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* ② ロゴ部分を <Link> に変更 */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-extrabold flex items-center text-emerald-600 hover:opacity-80 transition-opacity">
              <Leaf className="mr-2 text-emerald-500" size={24} />
              桑都塾 <span className="text-sm font-medium text-emerald-400 ml-2 hidden sm:inline">Souto Juku</span>
            </Link>
          </div>

          {/* PC用メニュー: mapでループ */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {NAV_ITEMS.map((item) => (
                <a key={item.href} href={item.href} className="text-slate-600 hover:text-emerald-600 px-3 py-2 rounded-full text-sm font-bold transition-colors flex items-center">
                  {item.icon === "heart" && <Heart size={16} className="mr-1 text-rose-400" />}
                  {item.label}
                </a>
              ))}
              <a href={RESERVATION_URL} target="_blank" rel="noopener noreferrer" className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-md shadow-emerald-200">
                無料体験予約
              </a>
            </div>
          </div>
          
          {/* ハンバーガーボタン */}
          <div className="-mr-2 flex md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-500 hover:text-emerald-600 p-2">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* スマホ用メニュー */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-emerald-100 shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href} className="text-slate-700 block px-4 py-3 rounded-2xl text-base font-bold hover:bg-emerald-50 flex items-center">
                {item.icon === "heart" && <Heart size={18} className="mr-2 text-rose-400" />}
                {item.label}
              </a>
            ))}
            <a href={RESERVATION_URL} target="_blank" rel="noopener noreferrer" className="w-full text-center bg-emerald-500 text-white px-4 py-3 rounded-2xl text-base font-bold mt-4 block shadow-md shadow-emerald-200">
              無料体験予約
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};