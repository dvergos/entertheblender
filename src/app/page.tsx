'use client';

import { motion } from "motion/react";
import { Bed, UtensilsCrossed, ArrowRight, Construction } from "lucide-react";

const HERO_IMAGE = "/hero-bg.jpg";

export default function HomePage() {
  return (
    <div className="bg-neutral-50 text-neutral-900">

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[calc(100vh-7rem)] w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img
            src={HERO_IMAGE}
            alt="The Blender Architecture"
            className="w-full h-full object-contain opacity-20 scale-[1.5]"
          />
          {/* Technical/Blueprint Overlays */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Top Left Marking */}
            <div className="absolute top-12 left-12 flex flex-col gap-1 opacity-40 font-mono text-[10px] text-neutral-800">
              <span className="border-l border-t border-neutral-800 w-4 h-4 block absolute -top-1 -left-1"></span>
              <span>REF-024.B</span>
              <span>ELEVATION: NORTH</span>
              <span>SCALE: 1:100</span>
            </div>

            {/* Top Right Marking */}
            <div className="absolute top-12 right-12 flex flex-col items-end gap-1 opacity-40 font-mono text-[10px] text-neutral-800">
              <span className="border-r border-t border-neutral-800 w-4 h-4 block absolute -top-1 -right-1"></span>
              <span>GRID-X12</span>
              <span>37.9858° N</span>
              <span>23.7201° E</span>
            </div>

            {/* Bottom Left Marking */}
            <div className="absolute bottom-12 left-12 flex flex-col gap-1 opacity-40 font-mono text-[10px] text-neutral-800">
              <span className="border-l border-b border-neutral-800 w-4 h-4 block absolute -bottom-1 -left-1"></span>
              <span>10.5m</span>
              <div className="w-16 h-px bg-neutral-800 mt-1 relative">
                <div className="absolute -top-1 left-0 h-2 w-px bg-neutral-800"></div>
                <div className="absolute -top-1 right-0 h-2 w-px bg-neutral-800"></div>
              </div>
            </div>

            {/* Bottom Right Marking */}
            <div className="absolute bottom-12 right-12 flex flex-col items-end gap-1 opacity-40 font-mono text-[10px] text-neutral-800">
              <span className="border-r border-b border-neutral-800 w-4 h-4 block absolute -bottom-1 -right-1"></span>
              <span>SECTOR 04</span>
              <span>APPROVED</span>
            </div>

            {/* Floating labels */}
            <div className="absolute top-1/3 left-[15%] opacity-20 font-mono text-[9px] -rotate-90 origin-bottom-left text-neutral-900">
              <span className="tracking-[0.2em]">EXTERIOR CLADDING</span>
            </div>

            <div className="absolute top-[20%] right-[25%] opacity-20 font-mono text-[9px] text-neutral-900 flex items-center gap-2">
              <span>+3.450</span>
              <span className="w-8 h-px bg-neutral-900"></span>
            </div>

            <div className="absolute bottom-[30%] left-[20%] opacity-20 font-mono text-[9px] text-neutral-900 border border-neutral-900/50 px-1 py-0.5 rounded-sm">
              <span>W-24</span>
            </div>

            <div className="absolute top-[25%] left-[25%] opacity-30 font-mono text-[10px] text-neutral-800 flex items-end">
              <div className="w-12 h-px bg-neutral-800 rotate-[-30deg] origin-right mr-1 mb-2"></div>
              <span className="uppercase tracking-wide">Primary Structure</span>
            </div>

            <div className="absolute bottom-[40%] right-[20%] opacity-30 font-mono text-[10px] text-neutral-800 flex flex-col items-start">
              <span className="uppercase tracking-wide mb-1">Ventilation Shaft</span>
              <div className="w-16 h-px bg-neutral-800 rotate-[15deg] origin-left"></div>
            </div>

            <div className="absolute top-[45%] left-[10%] opacity-30 font-mono text-[10px] text-neutral-800 flex flex-col items-end">
              <span className="uppercase tracking-wide mb-1">Reclaimed Timber</span>
              <div className="w-20 h-px bg-neutral-800 rotate-[-10deg] origin-right"></div>
            </div>

            <div className="absolute top-[15%] right-[35%] opacity-30 font-mono text-[10px] text-neutral-800 flex items-center">
              <span className="uppercase tracking-wide mr-2">Solar array</span>
              <div className="w-8 h-8 border-l border-b border-neutral-800"></div>
            </div>

            <div className="absolute bottom-[20%] right-[40%] opacity-30 font-mono text-[10px] text-neutral-800">
              <div className="absolute -top-6 -left-6 w-12 h-12 border border-dashed border-neutral-800 rounded-full"></div>
              <span className="uppercase tracking-wide relative pl-8">Entry Point</span>
            </div>
          </div>
        </div>

        {/* Label — floats above the title, decoupled */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="absolute top-[18%] left-1/2 -translate-x-1/2 z-10 text-blue-600 font-bold uppercase tracking-widest text-xs md:text-sm whitespace-nowrap"
        >
          An Exclusive Inclusive Experience
        </motion.div>

        <div className="relative z-10 flex flex-col items-center text-center px-4 py-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-oswald font-black leading-[0.9] uppercase text-neutral-900 flex flex-col items-center gap-[0.06em]"
            style={{ fontSize: 'clamp(2rem, 9vw, 120px)' }}
          >
            <span>Savor<span style={{ color: '#FF69B4' }}>.</span></span>
            <span>Stay<span style={{ color: '#10B981' }}>.</span></span>
            <span>Gather<span style={{ color: '#D4B5E8' }}>.</span></span>
          </motion.h1>
        </div>
      </section>

      {/* TAGLINE + CTA — below the hero image, above intro */}
      <section className="py-12 px-6 flex flex-col items-center text-center gap-8">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="font-inter text-sm md:text-base font-medium text-neutral-400 max-w-xs md:max-w-sm leading-relaxed"
        >
          Curated organic hospitality in the heart of the city, blending 20th-century heritage with contemporary living.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-3 justify-center items-center"
        >
          {/* Book a Room — Under Construction */}
          <span className="relative group cursor-not-allowed">
            <span className="bg-neutral-200 text-neutral-400 px-5 py-2.5 rounded-2xl font-semibold text-xs flex items-center gap-2 border border-neutral-300">
              Book a Room <Bed className="w-3.5 h-3.5" /> <Construction className="w-3.5 h-3.5" />
            </span>
            <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 bg-neutral-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
              under construction
            </span>
          </span>

          {/* Reserve a Table — Under Construction */}
          <span className="relative group cursor-not-allowed">
            <span className="bg-neutral-200 text-neutral-400 px-5 py-2.5 rounded-2xl font-semibold text-xs flex items-center gap-2 border border-neutral-300">
              Reserve a Table <UtensilsCrossed className="w-3.5 h-3.5" /> <Construction className="w-3.5 h-3.5" />
            </span>
            <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 bg-neutral-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
              under construction
            </span>
          </span>

          {/* Explore Concept — Under Construction */}
          <span className="relative group cursor-not-allowed">
            <span className="bg-neutral-200 text-neutral-400 px-5 py-2.5 rounded-2xl font-semibold text-xs flex items-center gap-2 border border-neutral-300">
              Explore Concept <ArrowRight className="w-3.5 h-3.5" /> <Construction className="w-3.5 h-3.5" />
            </span>
            <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 bg-neutral-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
              under construction
            </span>
          </span>
        </motion.div>
      </section>

      {/* 2. INTRO BLOCK */}
      <section className="py-24 px-6 md:px-12 max-w-4xl mx-auto text-center">
        <p className="font-oswald text-xl md:text-3xl leading-relaxed uppercase tracking-wide text-neutral-800">
          We build spaces that bring people together.<br/>
          <span className="text-neutral-400">A picnic restaurant. Treehouse fruit rooms. A terrace wine bar.</span>
        </p>
        <div className="w-px h-16 bg-neutral-300 mx-auto my-12"></div>
        <p className="font-inter text-neutral-600 max-w-lg mx-auto">
          Three distinct experiences. One philosophy. Welcome to The Blender.
        </p>
      </section>

    </div>
  );
}
