'use client';

import { motion } from "motion/react";
import Link from "next/link";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const ROOMS = [
  {
    id: "blackcurrant",
    name: "Blackcurrant",
    mood: "Deep. Intimate. Grounded.",
    description: "Blackcurrant feels like evening light in wood. Dense pencil texture. Clusters. Shadow play.",
    image: "https://images.unsplash.com/photo-1743867840110-ee532b7c6fb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwcHVycGxlJTIwYmVkcm9vbSUyMGludGVyaW9yJTIwbW9vZHl8ZW58MXx8fHwxNzcxNzU2MTk5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    palette: "Dark purples / charcoal accents"
  },
  {
    id: "banana",
    name: "Banana",
    mood: "Playful. Soft. Warm.",
    description: "Banana is the most relaxed room. Elongated shapes. Vertical motion.",
    image: "https://images.unsplash.com/photo-1699558983214-521c242961b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXJtJTIwd29vZCUyMHllbGxvdyUyMGFjY2VudCUyMGJlZHJvb20lMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzE3NTYxOTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    palette: "Warm wood + muted yellow accents"
  },
  {
    id: "blood-orange",
    name: "Blood Orange",
    mood: "Bold. Sensory. Vibrant.",
    description: "This room feels energetic. Circular slices. Sharp contrast pencil strokes.",
    image: "https://images.unsplash.com/photo-1593030019566-d681b01e877f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydXN0JTIwb3JhbmdlJTIwYmVkcm9vbSUyMGludGVyaW9yJTIwdmlicmFudHxlbnwxfHx8fDE3NzE3NTYxOTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    palette: "Warm tones / rust accents"
  },
  {
    id: "breadfruit",
    name: "Breadfruit",
    mood: "Textured. Earthy. Architectural.",
    description: "Breadfruit becomes the most structural room. Patterned skin. Geometric repetition.",
    image: "https://images.unsplash.com/photo-1705372334341-3780ebb7c97b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYXclMjB3b29kJTIwdGV4dHVyZWQlMjBiZWRyb29tJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzcxNzU2MTk5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    palette: "Raw materials / natural wood"
  },
  {
    id: "bergamot",
    name: "Bergamot",
    mood: "Refined. Fragrant. Balanced.",
    description: "The most elegant room. Minimal line drawing. Citrus cross-sections.",
    image: "https://images.unsplash.com/photo-1615800001718-73ba40557cb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0JTIwZ3JlZW4lMjBtaW5pbWFsJTIwYmVkcm9vbSUyMGludGVyaW9yfGVufDF8fHx8MTc3MTc1NjE5OXww&ixlib=rb-4.1.0&q=80&w=1080",
    palette: "Soft green undertones"
  },
  {
    id: "blueberry",
    name: "Blueberry",
    mood: "Calm. Compact. Introspective.",
    description: "Quiet and minimal. Small repetitive dot textures.",
    image: "https://images.unsplash.com/photo-1767050371633-675072d4bed7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWVwJTIwYmx1ZSUyMGJlZHJvb20lMjBpbnRlcmlvciUyMG1pbmltYWx8ZW58MXx8fHwxNzcxNzU2MTk5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    palette: "Deep blue undertones"
  }
];

export default function Orchard() {
  return (
    <div className="bg-neutral-50 text-neutral-900 pb-24">
      {/* HERO */}
      <section className="relative h-[80vh] w-full flex items-center justify-center bg-neutral-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-60">
          <ImageWithFallback src={ROOMS[3].image} className="w-full h-full object-cover" alt="Orchard Hero" />
        </div>
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-oswald text-6xl md:text-8xl uppercase mb-4"
          >
            Orchard
          </motion.h1>
          <p className="font-oswald text-xl tracking-widest uppercase opacity-80 mb-8">Fruit Rooms</p>
          <p className="font-inter max-w-md mx-auto font-light">
            Sleep among trees. Each room named after a fruit. Built with reclaimed materials. Designed to slow you down.
          </p>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="py-24 px-6 md:px-12 max-w-5xl mx-auto text-center">
        <h2 className="font-oswald text-4xl uppercase mb-8">The B Collection</h2>
        <div className="font-inter font-light text-lg space-y-2 mb-12">
          <p>Six fruits. Six moods. One letter.</p>
          <p>Each Orchard room begins with B.</p>
          <p>A quiet connection to The Blender.</p>
        </div>
        <Link href="/book" className="inline-block border-b border-neutral-900 pb-1 uppercase font-oswald tracking-widest hover:text-neutral-500 transition-colors">
          Check Availability
        </Link>
      </section>

      {/* ROOM LIST */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
          {ROOMS.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index % 2 * 0.2 }}
              className="group"
            >
              <div className="aspect-[4/3] bg-neutral-200 mb-6 overflow-hidden relative">
                <ImageWithFallback
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
              </div>

              <div className="flex flex-col items-start">
                <span className="font-oswald text-sm text-neutral-400 mb-2">0{index + 1}</span>
                <h3 className="font-oswald text-3xl uppercase mb-2 group-hover:text-neutral-600 transition-colors">{room.name}</h3>
                <p className="font-inter text-sm font-medium uppercase tracking-wide mb-4 text-neutral-500">{room.mood}</p>
                <p className="font-inter font-light text-neutral-600 mb-6 leading-relaxed max-w-md">
                  {room.description}
                </p>
                <Link
                  href={`/book?room=${room.id}`}
                  className="px-6 py-3 border border-neutral-200 hover:bg-neutral-900 hover:text-white transition-colors uppercase font-oswald text-xs tracking-widest"
                >
                  Book {room.name}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mt-32 py-24 bg-neutral-100 text-center">
        <h3 className="font-oswald text-4xl uppercase mb-8">Ready to Sleep on Nature?</h3>
        <Link href="/book" className="bg-neutral-900 text-white px-10 py-4 uppercase font-oswald tracking-widest hover:bg-neutral-800 transition-colors">
          Book Your Stay
        </Link>
      </section>
    </div>
  );
}
