'use client';

import { motion } from "motion/react";

export default function Homev2Page() {
  return (
    <div className="bg-neutral-50 text-neutral-900">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[75vh] min-h-[600px] w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-neutral-100 to-neutral-50">
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

            {/* Random Floating Numbers/Lines */}
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

            {/* Random Callouts with Arrows */}
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
        
        <div className="relative z-10 text-center px-4">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
             className="text-blue-600 font-bold uppercase tracking-widest text-xs md:text-sm mb-4"
          >
            An Exclusive Inclusive Experience
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-oswald font-black text-6xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tighter uppercase text-neutral-900 flex flex-col items-center mb-32 gap-4 md:gap-8"
          >
            <span>Savor<span className="text-[#FF69B4]">.</span></span>
            <span>Stay<span className="text-[#10B981]">.</span></span>
            <span className="relative flex flex-col items-start">
              <span>Gather<span className="text-[#D4B5E8]">.</span></span>
              <span className="absolute top-full left-12 mt-20 text-sm md:text-lg font-medium font-inter tracking-normal normal-case text-neutral-400 max-w-[260px] md:max-w-[340px] leading-tight">
                Curated organic hospitality in the heart of the city, blending 20th-century heritage with contemporary living.
              </span>
            </span>
          </motion.h1>
        </div>
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
