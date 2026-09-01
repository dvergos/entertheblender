'use client';

import './globals.css';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Toaster } from 'sonner';
import { FloatingContactButton } from './components/FloatingContactButton';
import { Facebook, Instagram, Mail, MessageCircle, Map, Construction, Menu, X } from 'lucide-react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMobileMenuOpen(false);
  }, [pathname]);

  // Admin routes have their own layout — render children only
  if (isAdmin) {
    return (
      <html lang="en">
        <body className="min-h-screen bg-neutral-50 font-sans text-neutral-900">
          {children}
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral-50 font-sans text-neutral-900 selection:bg-neutral-900 selection:text-white flex flex-col">
        <div className="min-h-screen bg-neutral-50 font-sans text-neutral-900 selection:bg-neutral-900 selection:text-white flex flex-col">
          <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-100">
            {/* Logo Section */}
            <div className="flex items-center justify-center py-2">
              <Link href="/" className="hover:opacity-70 transition-opacity">
                <img
                  src="/logo.png"
                  alt="The Blender Logo"
                  className="h-[52px] md:h-[72px] w-auto object-contain"
                />
              </Link>
            </div>

            {/* Navigation Section */}
            <div className="h-12 flex items-center justify-center px-6">
              <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide uppercase">

                {/* Vineyard — disabled */}
                <span className="relative group cursor-not-allowed">
                  <span className="flex items-center gap-3 text-neutral-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF69B4] opacity-40"></span>
                    <span className="uppercase tracking-widest font-oswald flex items-center gap-1.5">
                      Vineyard
                      <Construction className="w-3.5 h-3.5" />
                    </span>
                  </span>
                  <span className="absolute top-full left-0 mt-2 px-3 py-1.5 bg-neutral-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                    under construction
                  </span>
                </span>

                {/* Orchard — active */}
                <Link href="/orchard" className="group flex items-center gap-3 hover:opacity-70 transition-opacity">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
                  <span className="uppercase tracking-widest font-oswald">Orchard</span>
                </Link>

                {/* Basket — active */}
                <Link href="/basket" className="group flex items-center gap-3 hover:opacity-70 transition-opacity">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4B5E8]"></span>
                  <span className="uppercase tracking-widest font-oswald">Basket</span>
                </Link>

                <span className="text-neutral-400">|</span>

                {/* Events — active */}
                <Link href="/events" className="hover:text-neutral-500 transition-colors lowercase">events</Link>

                {/* Stories — disabled */}
                <span className="relative group cursor-not-allowed">
                  <span className="flex items-center gap-1.5 text-neutral-400">
                    <span className="lowercase">stories</span>
                    <Construction className="w-3.5 h-3.5" />
                  </span>
                  <span className="absolute top-full left-0 mt-2 px-3 py-1.5 bg-neutral-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                    under construction
                  </span>
                </span>

                {/* Why Blender — disabled */}
                <span className="relative group cursor-not-allowed">
                  <span className="flex items-center gap-1.5 text-neutral-400">
                    <span className="lowercase">why blender?</span>
                    <Construction className="w-3.5 h-3.5" />
                  </span>
                  <span className="absolute top-full left-0 mt-2 px-3 py-1.5 bg-neutral-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                    under construction
                  </span>
                </span>

                {/* Book Now — direct to booking engine */}
                <a href="https://orchard.book-onlinenow.net/" target="_blank" rel="noopener noreferrer" className="ml-4 font-bold hover:opacity-70 transition-opacity">
                  Book Now →
                </a>
              </div>

              {/* Mobile hamburger */}
              <div className="md:hidden absolute right-4">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 text-neutral-900"
                  aria-label="Toggle menu"
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </nav>

          {/* Mobile full-screen menu */}
          {mobileMenuOpen && (
            <div className="md:hidden fixed inset-0 z-40 bg-white flex flex-col pt-36 px-8 pb-12 overflow-y-auto">
              <nav className="flex flex-col gap-6">
                <Link href="/orchard" className="flex items-center gap-3 font-oswald text-2xl uppercase tracking-widest">
                  <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>Orchard
                </Link>
                <Link href="/basket" className="flex items-center gap-3 font-oswald text-2xl uppercase tracking-widest">
                  <span className="w-2 h-2 rounded-full bg-[#D4B5E8]"></span>Basket
                </Link>
                <span className="flex items-center gap-3 font-oswald text-2xl uppercase tracking-widest text-neutral-300 cursor-not-allowed">
                  <span className="w-2 h-2 rounded-full bg-[#FF69B4] opacity-40"></span>Vineyard <Construction className="w-4 h-4" />
                </span>

                <div className="w-full h-px bg-neutral-100 my-2" />

                <Link href="/events" className="font-inter text-lg text-neutral-700 lowercase">events</Link>
                <Link href="/contact" className="font-inter text-lg text-neutral-700 lowercase">contact</Link>
                <span className="font-inter text-lg text-neutral-300 lowercase flex items-center gap-2 cursor-not-allowed">
                  stories <Construction className="w-3.5 h-3.5" />
                </span>

                <div className="w-full h-px bg-neutral-100 my-2" />

                <a
                  href="https://orchard.book-onlinenow.net/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-neutral-900 text-white px-6 py-4 font-oswald uppercase tracking-widest text-sm text-center"
                >
                  Book Now →
                </a>
              </nav>

              <div className="mt-auto pt-12 text-sm text-neutral-400 font-inter space-y-1">
                <p>Odisseos 14, Athens 104 37</p>
                <a href="tel:+302105223954" className="block hover:text-neutral-900 transition-colors">+30 210 522 3954</a>
              </div>
            </div>
          )}

          <main className="flex-grow pt-24 md:pt-28">
            {children}
          </main>

          <FloatingContactButton />

          <Toaster position="top-center" />

          <footer className="bg-neutral-900 text-neutral-400 py-16 px-6 md:px-12 border-t border-neutral-800">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="flex flex-col gap-4">
                <h3 className="text-white font-oswald text-xl tracking-widest uppercase">The Blender</h3>
                <p className="text-sm leading-relaxed max-w-xs">
                  Stay. Gather. Savor.<br/>
                  An organic hospitality project blending food, wine and treehouse stays.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <h4 className="text-white font-oswald text-sm tracking-widest uppercase mb-2">Experiences</h4>
                <Link href="/basket" className="text-sm hover:text-white transition-colors">Basket — PUT IT IN</Link>
                <Link href="/orchard" className="text-sm hover:text-white transition-colors">Orchard — FRUIT ROOMS</Link>
                <span className="text-sm text-neutral-600 flex items-center gap-1.5 cursor-not-allowed">Vineyard — RAW PLEASURE <Construction className="w-3 h-3" /></span>
              </div>

              <div className="flex flex-col gap-2">
                <h4 className="text-white font-oswald text-sm tracking-widest uppercase mb-2">Explore</h4>
                <Link href="/events" className="text-sm hover:text-white transition-colors">Events</Link>
                <span className="text-sm text-neutral-600 flex items-center gap-1.5 cursor-not-allowed">Stories <Construction className="w-3 h-3" /></span>
                <Link href="/contact" className="text-sm hover:text-white transition-colors">Contact</Link>
                <a href="https://orchard.book-onlinenow.net/" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-white transition-colors">Book Now</a>
              </div>

              <div className="flex flex-col gap-4">
                <Link href="/contact" className="text-white font-oswald text-sm tracking-widest uppercase mb-2 hover:opacity-70 transition-opacity">Connect</Link>
                <div className="text-sm">
                  <p>Odisseos 14</p>
                  <p>Athens 104 37, Greece</p>
                </div>
                <div className="text-sm">
                  <a href="mailto:info@entertheblender.gr" className="hover:text-white transition-colors">info@entertheblender.gr</a>
                  <p>+30 210 522 3954</p>
                </div>
                <div className="flex gap-3 mt-2">
                  <a href="https://www.facebook.com/profile.php?id=61576905283069" target="_blank" rel="noopener noreferrer" className="text-white hover:opacity-70 transition-opacity" aria-label="Facebook">
                    <Facebook size={18} />
                  </a>
                  <a href="https://www.instagram.com/enter_the_blender" target="_blank" rel="noopener noreferrer" className="text-white hover:opacity-70 transition-opacity" aria-label="Instagram">
                    <Instagram size={18} />
                  </a>
                  <a href="mailto:info@entertheblender.gr" className="text-white hover:opacity-70 transition-opacity" aria-label="Email">
                    <Mail size={18} />
                  </a>
                  <a href="viber://chat?number=%2B302105223954" className="text-purple-500 hover:opacity-70 transition-opacity" aria-label="Viber">
                    <MessageCircle size={18} />
                  </a>
                  <a href="https://wa.me/302105223954" target="_blank" rel="noopener noreferrer" className="text-green-500 hover:opacity-70 transition-opacity" aria-label="WhatsApp">
                    <MessageCircle size={18} strokeWidth={2.5} />
                  </a>
                  <a href="https://maps.google.com/?q=Odisseos+14,+Athens+104+37,+Greece" target="_blank" rel="noopener noreferrer" className="text-white hover:opacity-70 transition-opacity" aria-label="Google Maps">
                    <Map size={18} />
                  </a>
                </div>
              </div>
            </div>
            <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-neutral-800 text-xs text-neutral-600 flex justify-between">
              <p>© {new Date().getFullYear()} The Blender. All rights reserved.</p>
              <p>Designed with Nature.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
