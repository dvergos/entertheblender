'use client';

import { motion } from "motion/react";
import Link from "next/link";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

interface MenuItem {
  id: string;
  name: string;
  description: string | null;
  price: string;
  sort_order: number;
}

interface MenuCategory {
  id: string;
  slug: string;
  label: string;
  sort_order: number;
  menu_items: MenuItem[];
}

export default function Basket() {
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [activeCategoryId, setActiveCategoryId] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from("menu_categories")
        .select("*, menu_items(*)")
        .order("sort_order", { ascending: true });

      if (data && data.length > 0) {
        const sorted = data.map((cat) => ({
          ...cat,
          menu_items: (cat.menu_items ?? []).sort(
            (a: MenuItem, b: MenuItem) => a.sort_order - b.sort_order
          ),
        }));
        setCategories(sorted);
        setActiveCategoryId(sorted[0].id);
      }
      setLoading(false);
    };

    fetchMenu();
  }, []);

  const activeCategory = categories.find((c) => c.id === activeCategoryId);
  const items = activeCategory?.menu_items ?? [];

  return (
    <div className="bg-neutral-50 text-neutral-900 pb-24">

      {/* HERO */}
      <section className="relative h-[80vh] w-full flex items-center justify-center bg-neutral-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-60">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1743793055911-52e19beba5d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaWNuaWMlMjBmb29kJTIwc2hhcmVkJTIwdGFibGUlMjByc3RpYyUyMHJlc3RhdXJhbnR8ZW58MXx8fHwxNzcxNzU2MTUxfDA&ixlib=rb-4.1.0&q=80&w=1080"
            className="w-full h-full object-cover"
            alt="Basket Hero"
          />
        </div>
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-oswald text-6xl md:text-8xl uppercase mb-4"
          >
            Basket
          </motion.h1>
          <p className="font-oswald text-xl tracking-widest uppercase opacity-80 mb-8">Put It In</p>
          <p className="font-inter max-w-md mx-auto font-light">
            Real food. Shared tables. No rules.
          </p>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-24 px-6 md:px-12 max-w-4xl mx-auto text-center">
        <p className="font-oswald text-2xl md:text-4xl leading-relaxed uppercase text-neutral-800">
          No ceremony.<br/>
          <span className="text-neutral-400 text-xl md:text-2xl mt-4 block">Just good food.</span>
        </p>
        <div className="w-px h-16 bg-neutral-300 mx-auto my-12"></div>
        <p className="font-inter text-neutral-600 max-w-lg mx-auto">
          Basket is about gathering. Put it in. Share it. Pass it around. Picnic tables, shared plates, and a community vibe.
        </p>
      </section>

      {/* MENU */}
      <section className="px-6 md:px-12 max-w-6xl mx-auto mb-24">
        <h2 className="font-oswald text-4xl md:text-5xl uppercase text-center mb-12">Menu</h2>

        {loading ? (
          <div className="text-center py-24">
            <p className="font-inter text-neutral-400 text-sm">Loading menu...</p>
          </div>
        ) : (
          <>
            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-16 border-b border-neutral-200 pb-4">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategoryId(cat.id)}
                  className={`text-sm md:text-base uppercase tracking-widest transition-all pb-2 ${
                    activeCategoryId === cat.id
                      ? "border-b-2 border-neutral-900 font-oswald"
                      : "text-neutral-400 hover:text-neutral-900"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Menu Items */}
            <motion.div
              key={activeCategoryId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-16"
            >
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-start gap-4 pb-4 border-b border-neutral-200"
                >
                  <div className="flex-1">
                    <h3 className="font-oswald text-base md:text-lg mb-1">{item.name}</h3>
                    {item.description && (
                      <p className="text-xs md:text-sm text-neutral-500">{item.description}</p>
                    )}
                  </div>
                  <span className="font-inter text-sm md:text-base text-neutral-900 whitespace-nowrap">
                    {item.price}
                  </span>
                </div>
              ))}
            </motion.div>
          </>
        )}
      </section>

      {/* GROUP BOOKING */}
      <section className="bg-neutral-100 py-24 px-6 md:px-12 text-center">
        <h3 className="font-oswald text-4xl uppercase mb-8">Large Groups</h3>
        <p className="font-inter text-neutral-600 mb-8 max-w-xl mx-auto">
          Planning a celebration? We love big tables. Tell us about your event and we'll prepare the baskets.
        </p>
        <Link href="/book" className="bg-neutral-900 text-white px-10 py-4 uppercase font-oswald tracking-widest hover:bg-neutral-800 transition-colors">
          Inquire for Groups
        </Link>
      </section>
    </div>
  );
}
