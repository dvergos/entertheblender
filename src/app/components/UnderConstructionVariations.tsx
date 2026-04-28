'use client';

import Link from "next/link";
import { Construction, Hammer, Clock, Sparkles } from "lucide-react";

export function UnderConstructionVariations() {
  return (
    <div className="min-h-screen bg-neutral-50 p-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-oswald text-5xl uppercase mb-4">Under Construction Variations</h1>
        <p className="text-neutral-600 mb-16 font-inter">
          Four different ways to indicate that "Stories" is under construction in the navigation menu
        </p>

        <div className="space-y-20">
          
          {/* VARIATION 1: Construction Icon with Tooltip */}
          <div>
            <h2 className="font-oswald text-2xl uppercase mb-6 text-neutral-700">Variation 1: Construction Icon</h2>
            <div className="bg-white p-8 rounded-lg shadow-sm border border-neutral-200">
              <div className="flex items-center gap-6 text-sm font-inter">
                <Link href="/orchard" className="hover:text-neutral-500 transition-colors lowercase">orchard</Link>
                <Link href="/vineyard" className="hover:text-neutral-500 transition-colors lowercase">vineyard</Link>
                <Link href="/" className="flex items-center gap-2 hover:text-neutral-500 transition-colors lowercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4B5E8]"></span>
                  <span className="uppercase tracking-widest font-oswald">Basket</span>
                </Link>
                <span className="text-neutral-400">|</span>
                <Link href="/events" className="hover:text-neutral-500 transition-colors lowercase">events</Link>
                
                {/* Stories with construction icon */}
                <span className="relative group cursor-not-allowed">
                  <span className="flex items-center gap-1.5 text-neutral-400">
                    <span className="lowercase">stories</span>
                    <Construction className="w-3.5 h-3.5" />
                  </span>
                  {/* Tooltip */}
                  <span className="absolute top-full left-0 mt-2 px-3 py-1.5 bg-neutral-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    Under Construction
                  </span>
                </span>
                
                <Link href="/contact" className="hover:text-neutral-500 transition-colors lowercase">why blender?</Link>
                <Link href="/book" className="ml-4 text-neutral-900 font-bold hover:underline transition-all">
                  Book Now →
                </Link>
              </div>
            </div>
          </div>

          {/* VARIATION 2: Coming Soon Badge */}
          <div>
            <h2 className="font-oswald text-2xl uppercase mb-6 text-neutral-700">Variation 2: Coming Soon Badge</h2>
            <div className="bg-white p-8 rounded-lg shadow-sm border border-neutral-200">
              <div className="flex items-center gap-6 text-sm font-inter">
                <Link href="/orchard" className="hover:text-neutral-500 transition-colors lowercase">orchard</Link>
                <Link href="/vineyard" className="hover:text-neutral-500 transition-colors lowercase">vineyard</Link>
                <Link href="/" className="flex items-center gap-2 hover:text-neutral-500 transition-colors lowercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4B5E8]"></span>
                  <span className="uppercase tracking-widest font-oswald">Basket</span>
                </Link>
                <span className="text-neutral-400">|</span>
                <Link href="/events" className="hover:text-neutral-500 transition-colors lowercase">events</Link>
                
                {/* Stories with coming soon badge */}
                <span className="relative cursor-not-allowed">
                  <span className="flex items-center gap-2 text-neutral-400">
                    <span className="lowercase">stories</span>
                    <span className="px-2 py-0.5 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-[10px] uppercase tracking-wider font-bold rounded-full">
                      Soon
                    </span>
                  </span>
                </span>
                
                <Link href="/contact" className="hover:text-neutral-500 transition-colors lowercase">why blender?</Link>
                <Link href="/book" className="ml-4 text-neutral-900 font-bold hover:underline transition-all">
                  Book Now →
                </Link>
              </div>
            </div>
          </div>

          {/* VARIATION 3: Hammer Icon with Dots Animation */}
          <div>
            <h2 className="font-oswald text-2xl uppercase mb-6 text-neutral-700">Variation 3: Animated Work Icon</h2>
            <div className="bg-white p-8 rounded-lg shadow-sm border border-neutral-200">
              <div className="flex items-center gap-6 text-sm font-inter">
                <Link href="/orchard" className="hover:text-neutral-500 transition-colors lowercase">orchard</Link>
                <Link href="/vineyard" className="hover:text-neutral-500 transition-colors lowercase">vineyard</Link>
                <Link href="/" className="flex items-center gap-2 hover:text-neutral-500 transition-colors lowercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4B5E8]"></span>
                  <span className="uppercase tracking-widest font-oswald">Basket</span>
                </Link>
                <span className="text-neutral-400">|</span>
                <Link href="/events" className="hover:text-neutral-500 transition-colors lowercase">events</Link>
                
                {/* Stories with hammer icon */}
                <span className="relative group cursor-not-allowed">
                  <span className="flex items-center gap-1.5 text-neutral-400">
                    <span className="lowercase">stories</span>
                    <Hammer className="w-3.5 h-3.5 animate-pulse" />
                  </span>
                  {/* Animated dots tooltip */}
                  <span className="absolute top-full left-0 mt-2 px-3 py-1.5 bg-neutral-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    In Progress<span className="animate-pulse">...</span>
                  </span>
                </span>
                
                <Link href="/contact" className="hover:text-neutral-500 transition-colors lowercase">why blender?</Link>
                <Link href="/book" className="ml-4 text-neutral-900 font-bold hover:underline transition-all">
                  Book Now →
                </Link>
              </div>
            </div>
          </div>

          {/* VARIATION 4: Sparkles Icon (New Feature) */}
          <div>
            <h2 className="font-oswald text-2xl uppercase mb-6 text-neutral-700">Variation 4: Sparkles (New Feature)</h2>
            <div className="bg-white p-8 rounded-lg shadow-sm border border-neutral-200">
              <div className="flex items-center gap-6 text-sm font-inter">
                <Link href="/orchard" className="hover:text-neutral-500 transition-colors lowercase">orchard</Link>
                <Link href="/vineyard" className="hover:text-neutral-500 transition-colors lowercase">vineyard</Link>
                <Link href="/" className="flex items-center gap-2 hover:text-neutral-500 transition-colors lowercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4B5E8]"></span>
                  <span className="uppercase tracking-widest font-oswald">Basket</span>
                </Link>
                <span className="text-neutral-400">|</span>
                <Link href="/events" className="hover:text-neutral-500 transition-colors lowercase">events</Link>
                
                {/* Stories with sparkles */}
                <span className="relative group cursor-not-allowed">
                  <span className="flex items-center gap-1.5 text-neutral-400">
                    <span className="lowercase line-through decoration-dotted">stories</span>
                    <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                  </span>
                  {/* Tooltip */}
                  <span className="absolute top-full left-0 mt-2 px-3 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    Coming Soon ✨
                  </span>
                </span>
                
                <Link href="/contact" className="hover:text-neutral-500 transition-colors lowercase">why blender?</Link>
                <Link href="/book" className="ml-4 text-neutral-900 font-bold hover:underline transition-all">
                  Book Now →
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Implementation Notes */}
        <div className="mt-20 p-8 bg-neutral-900 text-white rounded-lg">
          <h3 className="font-oswald text-xl uppercase mb-4">Implementation Notes</h3>
          <ul className="space-y-2 text-sm font-inter text-neutral-300">
            <li><strong className="text-white">Variation 1:</strong> Simple construction icon with tooltip - professional and clear</li>
            <li><strong className="text-white">Variation 2:</strong> "Soon" badge with gradient - modern and colorful</li>
            <li><strong className="text-white">Variation 3:</strong> Animated hammer icon - playful and indicates active work</li>
            <li><strong className="text-white">Variation 4:</strong> Sparkles with strikethrough - creative way to show "not quite ready"</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
