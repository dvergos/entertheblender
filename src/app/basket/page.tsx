'use client';

import { motion } from "motion/react";
import Link from "next/link";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useState } from "react";

export default function Basket() {
  const [activeCategory, setActiveCategory] = useState("coffee");

  const categories = [
    { id: "coffee", label: "Coffee" },
    { id: "beers", label: "Beers" },
    { id: "beverages", label: "Beverages & Drinks" },
    { id: "uplifting", label: "Van Uplifting Goods" },
    { id: "bagels", label: "Bagels" },
    { id: "sweets", label: "Sweets" },
  ];

  const menuData = {
    coffee: [
      { name: "Espresso", price: "€1.50" },
      { name: "Double Espresso", price: "€1.80" },
      { name: "Single Cappuccino", price: "€1.80" },
      { name: "Double Cappuccino", price: "€2.20" },
      { name: "Freddo Espresso", price: "€2.00" },
      { name: "Freddo Cappuccino", price: "€2.20" },
      { name: "Americano", price: "€2.00" },
      { name: "Latte", price: "€2.20" },
      { name: "Flat White", price: "€2.30" },
      { name: "Greek Single", price: "€1.50" },
      { name: "Greek Double", price: "€2.00" },
      { name: "Frappé", price: "€2.20" },
      { name: "Cold Brew Home Made", price: "€3.50" },
      { name: "Cold Brew Can 200ml", price: "€2.80" },
      { name: "Chemex", description: "V60 Filtered Coffee", price: "€3.50" },
      { name: "Vegan Milk - Flavor Syrup - Plus Size", price: "+0.70€" },
    ],
    beers: [
      { name: "Athineissa 4.7%", description: "500ml Bottle", price: "€3.00" },
      { name: "Norma", description: "500ml Bottle", price: "€3.50" },
      { name: "Argos Star", description: "500ml Bottle", price: "€3.50" },
      { name: "Corfu", description: "500ml Bottle", price: "€3.50" },
      { name: "Mpela Pilsner 5%", description: "500ml Bottle", price: "€4.00" },
      { name: "Free Jasmine IPA 6.5%", description: "440ml Can", price: "€5.00" },
      { name: "608 Pale Ale 5.6%", description: "500ml Can", price: "€5.50" },
      { name: "Frida West Coast IPA 6%", description: "500ml Can", price: "€6.00" },
      { name: "Kyria Toula 6% NE IPA", description: "330ml Bottle/440ml Can", price: "€4.50 / €5.50" },
      { name: "Corfu Red Ale 5%", description: "500ml Bottle", price: "€5.00" },
      { name: "Mandy Black 7%", price: "€4.50" },
    ],
    beverages: [
      { name: "Tea Hot or Iced", price: "€3.00" },
      { name: "Fresh Orange Juice", price: "€3.00" },
      { name: "Fresh Lemonade / Melonade / Water Lemonade", price: "€3.50" },
      { name: "Fresh Ginger And Mint Lemonade", price: "€3.80" },
      { name: "Fresh Smoothie", price: "€4.50" },
      { name: "Drinks", price: "€6.00" },
      { name: "Cocktails", price: "€8.00" },
      { name: "Mocktails", price: "€7.00" },
      { name: "Shots", price: "€2.50" },
      { name: "Ice Bars", price: "€3.50" },
      { name: "Wine", price: "€4.00" },
      { name: "Prosecco", price: "€6.00" },
    ],
    uplifting: [
      { name: "Smoothies", price: "€3.60" },
      { name: "On Lemon Matcha / Ice Tea", price: "€3.90" },
      { name: "Kombucha Cherry / Hibiscus", price: "€4.90" },
    ],
    bagels: [
      { name: "Vegetarian - Cream Cheese - Tomato - Mozzarella - Pesto Sauce - Olive Oil", price: "€5.40" },
      { name: "Parma Ham - Parmesan - Iceberg", price: "€6.00" },
      { name: "Smoked Turkey - Iceberg - Cheese - Mustard Sauce", price: "€6.40" },
      { name: "Chorizo Cheese - Eggplant Spread - Chorizo - Mustard Sauce With Honey", price: "€6.50" },
      { name: "Smoked Salmon - Avocado - Traditional Mustard Sauce", price: "€7.50" },
      { name: "Pastrami - Cheese - Iceberg - Avocado", price: "€8.00" },
    ],
    sweets: [
      { name: "Cookies", price: "€1.50" },
      { name: "Fondant", price: "€3.50" },
      { name: "Choco Caramel Biscuit", price: "€5.00" },
      { name: "New York Cheesecake", price: "€5.00" },
    ],
  };

  return (
    <div className="bg-neutral-50 text-neutral-900 pb-24">
      {/* HERO */}
      <section className="relative h-[80vh] w-full flex items-center justify-center bg-neutral-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-60">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1743793055911-52e19beba5d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaWNuaWMlMjBmb29kJTIwc2hhcmVkJTIwdGFibGUlMjBydXN0aWMlMjByZXN0YXVyYW50fGVufDF8fHx8MTc3MTc1NjE1MXww&ixlib=rb-4.1.0&q=80&w=1080"
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

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-16 border-b border-neutral-200 pb-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`text-sm md:text-base uppercase tracking-widest transition-all pb-2 ${
                activeCategory === cat.id
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
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-16"
        >
          {menuData[activeCategory as keyof typeof menuData].map((item, index) => (
            <div
              key={index}
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
