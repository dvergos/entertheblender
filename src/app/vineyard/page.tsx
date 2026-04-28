'use client';

import { motion } from "motion/react";
import Link from "next/link";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const RAW_CUTS = [
  { name: "Beef Tartar", desc: "Hand-cut. Olive oil. Sea salt." },
  { name: "Sea Bass Ceviche", desc: "Citrus. Herbs. Clean acidity." },
  { name: "Salmon Crudo", desc: "Cold. Sharp. Balanced." }
];

const CHEESE_COLD = [
  { name: "Aged Comté", desc: "Firm. Nutty. Dry finish." },
  { name: "Fresh Burrata", desc: "Soft center. Cracked pepper." },
  { name: "Seasonal Fruit Plate", desc: "Cut fresh. No additions." },
  { name: "Charcuterie Selection", desc: "Thin slices. Deep flavor." }
];

const SMALL_PLATES = [
  { name: "Marinated Olives", desc: "" },
  { name: "Salted Almonds", desc: "" },
  { name: "Sourdough & Butter", desc: "" }
];

const WINES = [
  { type: "Natural Wines", desc: "Minimal intervention. Maximum character." },
  { type: "Orange", desc: "Unfiltered. Textured." },
  { type: "Red", desc: "Structured. Dry." },
  { type: "White", desc: "Bright. Mineral." },
  { type: "Rosé", desc: "Clean. Direct." }
];

export default function Vineyard() {
  return (
    <div className="bg-neutral-50 text-neutral-900 pb-24">
      {/* HERO */}
      <section className="relative h-[80vh] w-full flex items-center justify-center bg-neutral-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-60">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1693075156156-546ce5c120a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW5lJTIwZ2xhc3MlMjBzdW5zZXQlMjB0ZXJyYWNlJTIwb3V0ZG9vciUyMGJhcnxlbnwxfHx8fDE3NzE3NTYxNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
            className="w-full h-full object-cover"
            alt="Vineyard Hero"
          />
        </div>
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-oswald text-6xl md:text-8xl uppercase mb-4"
          >
            Vineyard
          </motion.h1>
          <p className="font-oswald text-xl tracking-widest uppercase opacity-80 mb-8">Raw Pleasure</p>
          <p className="font-inter max-w-md mx-auto font-light">
            Natural wines. Raw cuts. Sunset rituals.
          </p>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-24 px-6 md:px-12 max-w-4xl mx-auto text-center">
        <p className="font-oswald text-2xl md:text-4xl leading-relaxed uppercase text-neutral-800">
          Wine. Cut. Serve.<br/>
          <span className="text-neutral-400 text-xl md:text-2xl mt-4 block">No heavy sauces. No complications. Just raw pleasure.</span>
        </p>
      </section>

      {/* MENU GRID */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">

          {/* LEFT COLUMN */}
          <div className="space-y-16">
            <div>
              <h3 className="font-oswald text-3xl uppercase mb-8 border-b border-neutral-200 pb-2">Raw Cuts</h3>
              <div className="space-y-8">
                {RAW_CUTS.map((item, i) => (
                  <div key={i} className="flex justify-between items-baseline group">
                    <div>
                      <h4 className="font-oswald text-xl uppercase mb-1">{item.name}</h4>
                      <p className="font-inter text-sm text-neutral-500 font-light">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-oswald text-3xl uppercase mb-8 border-b border-neutral-200 pb-2">Small Plates</h3>
              <div className="space-y-6">
                {SMALL_PLATES.map((item, i) => (
                  <div key={i}>
                    <h4 className="font-oswald text-xl uppercase mb-1">{item.name}</h4>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-16">
            <div className="relative">
              <div className="aspect-[4/3] bg-neutral-200 mb-8 overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1695606452981-bd5e7dab4e6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGFyY3V0ZXJpZSUyMGJvYXJkJTIwcmF3JTIwbWVhdCUyMGNoZWVzZSUyMHBsYXR0ZXIlMjBlbGVnYW50fGVufDF8fHx8MTc3MTc1NjIzMHww&ixlib=rb-4.1.0&q=80&w=1080"
                  className="w-full h-full object-cover"
                  alt="Raw Cuts"
                />
              </div>
            </div>

            <div>
              <h3 className="font-oswald text-3xl uppercase mb-8 border-b border-neutral-200 pb-2">Cheese & Cold Plates</h3>
              <div className="space-y-8">
                {CHEESE_COLD.map((item, i) => (
                  <div key={i}>
                    <h4 className="font-oswald text-xl uppercase mb-1">{item.name}</h4>
                    <p className="font-inter text-sm text-neutral-500 font-light">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WINE SECTION */}
      <section className="bg-neutral-900 text-neutral-300 py-24 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <h3 className="font-oswald text-4xl text-white uppercase mb-12 text-center">The Cellar</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-center md:text-left">
            <div className="flex flex-col justify-center">
              <p className="font-inter font-light text-lg mb-8 leading-relaxed">
                Our wine list is alive. It changes with the seasons, the harvests, and our discoveries. We favor natural wines, minimal intervention, and maximum character.
              </p>
              <Link href="/contact" className="inline-block border border-white text-white px-8 py-3 uppercase font-oswald tracking-widest text-sm hover:bg-white hover:text-neutral-900 transition-colors self-center md:self-start">
                Request Wine List
              </Link>
            </div>
            <div className="space-y-6 border-l border-neutral-800 pl-8 md:pl-12">
              {WINES.map((wine, i) => (
                <div key={i}>
                  <h4 className="font-oswald text-xl text-white uppercase mb-1">{wine.type}</h4>
                  <p className="font-inter text-sm text-neutral-500">{wine.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <h3 className="font-oswald text-4xl uppercase mb-8">Reserve a Table</h3>
        <p className="font-inter text-neutral-500 mb-8">Join us for sunset on the terrace.</p>
        <Link href="/book" className="bg-neutral-900 text-white px-10 py-4 uppercase font-oswald tracking-widest hover:bg-neutral-800 transition-colors">
          Book Now
        </Link>
      </section>
    </div>
  );
}
