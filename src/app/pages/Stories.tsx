'use client';

import { motion } from "motion/react";
import Link from "next/link";

const STORIES = [
  {
    title: "The Idea",
    subtitle: "Why blending food, wine and organic stays.",
    image: "https://images.unsplash.com/photo-1767974891559-ea3ed39d6ffc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjB3b29kJTIwZnJhbWUlMjBhcmNoaXRlY3R1cmUlMjBkZXRhaWx8ZW58MXx8fHwxNzcxNzU2MjczfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    title: "Upcycling Philosophy",
    subtitle: "Materials used. Sustainable approach.",
    image: "https://images.unsplash.com/photo-1705372334341-3780ebb7c97b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYXclMjB3b29kJTIwdGV4dHVyZWQlMjBiZWRyb29tJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzcxNzU2MTk5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    title: "The Build",
    subtitle: "Before & after. Architect sketches.",
    image: "https://images.unsplash.com/photo-1763300855109-c04633f07cab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b29kZW4lMjB0cmVlaG91c2UlMjBhcmNoaXRlY3R1cmUlMjBuYXR1cmV8ZW58MXx8fHwxNzcxNzU2MTUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    title: "Room Styling",
    subtitle: "Orchard design process.",
    image: "https://images.unsplash.com/photo-1643494847699-149c403ac576?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwYmVkcm9vbSUyMHdpdGglMjBuYXR1cmUlMjB2aWV3JTIwd29vZCUyMGludGVyaW9yfGVufDF8fHx8MTc3MTc1NjE1MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  }
];

export function Stories() {
  return (
    <div className="bg-neutral-50 min-h-screen pb-24">
      <div className="pt-12 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="mb-16">
          <h1 className="font-oswald text-5xl md:text-7xl uppercase mb-6">Stories</h1>
          <p className="font-inter text-xl font-light max-w-2xl text-neutral-600">
            The making of Blender. From empty space to orchard rooms to terrace sunsets. Follow the process.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {STORIES.map((story, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer relative aspect-square overflow-hidden"
            >
              <img 
                src={story.image} 
                alt={story.title} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex flex-col justify-end p-8 text-white">
                <h3 className="font-oswald text-4xl uppercase mb-2">{story.title}</h3>
                <p className="font-inter font-light text-neutral-200">{story.subtitle}</p>
                <div className="mt-6 w-12 h-px bg-white group-hover:w-24 transition-all duration-300"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
