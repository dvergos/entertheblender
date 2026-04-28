'use client';

import { motion } from "motion/react";
import Link from "next/link";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useState } from "react";
import { Phone } from "lucide-react";

type TabType = "upcoming" | "new" | "previous";

const EVENTS = [
  {
    title: "JAZZ JAM with Konstantinos Stouraitis",
    date: "Monday, 24 Mar",
    dateShort: "24/03",
    location: "Vineyard",
    venue: "At The Blender Terrace",
    desc: "Join us for an intimate evening of improvisation and soul. Konstantinos brings his signature sound to our terrace.",
    image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    category: "upcoming",
    featured: true
  },
  {
    title: "JCMC Open Mic with guests from Athens and Berlin",
    date: "Thursday, 27 Mar",
    dateShort: "27/03",
    location: "Vineyard",
    venue: "At The Blender Terrace",
    desc: "An open stage connecting artists across borders. Raw voices, honest stories, natural wine.",
    image: "https://images.unsplash.com/photo-1766509825610-001b72477269?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcGVuJTIwbWljJTIwYWNvdXN0aWMlMjBzaW5nZXJ8ZW58MXx8fHwxNzc0MjY4MjIwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "upcoming",
    featured: false
  },
  {
    title: "Deep Eddy",
    date: "Thursday, 3 Apr",
    dateShort: "03/04",
    location: "Vineyard",
    venue: "At The Blender Terrace",
    desc: "Deep grooves and deeper cuts. A night dedicated to vinyl selections and warm atmospheres.",
    image: "https://images.unsplash.com/photo-1653569397438-60c2a42a265b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaiUyMGVsZWN0cm9uaWMlMjBtdXNpYyUyMHBhcnR5fGVufDF8fHx8MTc3NDI0MjUxNXww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "upcoming",
    featured: false
  },
  {
    title: "Mojo Grooves",
    date: "Friday, 18 Apr",
    dateShort: "18/04",
    location: "Vineyard",
    venue: "At The Blender Terrace",
    desc: "Funk, soul, and everything in between. Dance under the stars with Athens' finest selectors.",
    image: "https://images.unsplash.com/photo-1766895575451-d8b29764140a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW55bCUyMHJlY29yZHMlMjBtdXNpYyUyMG5pZ2h0fGVufDF8fHx8MTc3NDI2ODIyMXww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "upcoming",
    featured: false
  },
  {
    title: "Mr GoldPig Sandwich Competition",
    date: "Sunday, 4 May",
    dateShort: "04/05",
    location: "Basket",
    venue: "At The Blender Garden",
    desc: "Stack it high, make it count. Local chefs compete for the ultimate sandwich crown. You decide the winner.",
    image: "https://images.unsplash.com/photo-1634632071708-68d98ca65f04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW5kd2ljaCUyMGZvb2QlMjBjb21wZXRpdGlvbiUyMGdvdXJtZXR8ZW58MXx8fHwxNzc0MjY4MjIyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "upcoming",
    featured: false
  },
  {
    title: "Boobs Allowed Festival",
    date: "Tuesday, 9 Sep",
    dateShort: "09/09",
    location: "Orchard",
    venue: "At The Blender Grounds",
    desc: "A celebration of freedom, music, and community. All day festival featuring live acts, workshops, and organic food.",
    image: "https://images.unsplash.com/photo-1605286232233-e448650f5914?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwbXVzaWMlMjBmZXN0aXZhbCUyMGNyb3dkfGVufDF8fHx8MTc3NDI0NTEwN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    category: "upcoming",
    featured: false
  }
];

export default function Events() {
  const [activeTab, setActiveTab] = useState<TabType>("upcoming");

  const filteredEvents = EVENTS.filter(event => event.category === activeTab);
  const featuredEvent = filteredEvents.find(event => event.featured);
  const regularEvents = filteredEvents.filter(event => !event.featured);

  return (
    <div className="bg-neutral-50 min-h-screen pb-24">
      <div className="pt-12 px-6 md:px-12 max-w-7xl mx-auto">
        <h1 className="font-oswald text-5xl md:text-7xl uppercase mb-16">What's Happening</h1>

        {/* Underlined Tabs Submenu */}
        <nav className="border-b border-neutral-200 mb-16">
          <div className="flex gap-12">
            <button
              onClick={() => setActiveTab("upcoming")}
              className="relative pb-4 font-oswald uppercase tracking-widest text-sm transition-colors"
              style={{ color: activeTab === "upcoming" ? "#000" : "#999" }}
            >
              Upcoming Events
              {activeTab === "upcoming" && (
                <motion.div
                  layoutId="underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900"
                />
              )}
            </button>

            <button
              onClick={() => setActiveTab("new")}
              className="relative pb-4 font-oswald uppercase tracking-widest text-sm transition-colors"
              style={{ color: activeTab === "new" ? "#000" : "#999" }}
            >
              What's New
              {activeTab === "new" && (
                <motion.div
                  layoutId="underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900"
                />
              )}
            </button>

            <button
              onClick={() => setActiveTab("previous")}
              className="relative pb-4 font-oswald uppercase tracking-widest text-sm transition-colors"
              style={{ color: activeTab === "previous" ? "#000" : "#999" }}
            >
              Previous Events
              {activeTab === "previous" && (
                <motion.div
                  layoutId="underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900"
                />
              )}
            </button>
          </div>
        </nav>

        {/* Upcoming Events Layout - Hero + List */}
        {activeTab === "upcoming" && (
          <div>
            {/* Featured Hero Event */}
            {featuredEvent && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative aspect-[16/9] md:aspect-[21/9] mb-12 overflow-hidden group cursor-pointer"
              >
                <ImageWithFallback
                  src={featuredEvent.image}
                  alt={featuredEvent.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Dark overlay for better text readability */}
                <div className="absolute inset-0 bg-black/20"></div>

                {/* Date on Left */}
                <div className="absolute top-8 left-8 md:top-12 md:left-12 text-white">
                  <div className="font-oswald text-3xl md:text-4xl mb-2">{featuredEvent.dateShort}</div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3 h-3" style={{ color: '#ef4444' }} />
                    <span className="text-xs uppercase tracking-widest">Call for Bookings</span>
                  </div>
                  <a href="tel:+302105223954" className="text-sm mt-1 hover:underline block">
                    +30 210 522 3954
                  </a>
                  <div className="mt-3 pt-3 border-t border-white/30">
                    <span className="text-lg font-oswald">€50</span>
                    <span className="text-xs ml-2 opacity-80">per person</span>
                  </div>
                </div>

                {/* Title and Location on Right */}
                <div className="absolute top-8 right-8 md:top-12 md:right-12 text-right text-white max-w-md">
                  <h2 className="font-oswald text-3xl md:text-5xl uppercase mb-2 leading-tight">
                    {featuredEvent.title}
                  </h2>
                  <div className="text-sm uppercase tracking-widest opacity-90">
                    {featuredEvent.location}
                  </div>
                  <div className="text-xs mt-1 opacity-75">
                    {featuredEvent.venue}
                  </div>
                </div>
              </motion.div>
            )}

            {/* List of Regular Events */}
            <div className="bg-white/60 backdrop-blur-sm">
              {regularEvents.map((event, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="border-b border-neutral-200 last:border-b-0"
                >
                  <div className="flex items-center gap-6 md:gap-12 p-6 md:p-8 hover:bg-white/80 transition-colors group">
                    {/* Date */}
                    <div className="flex-shrink-0 w-24 md:w-32">
                      <div className="font-oswald text-2xl md:text-3xl mb-1">{event.date.split(',')[0]}</div>
                      <div className="text-sm text-neutral-600">{event.dateShort}</div>
                      {i === 0 || i === 1 ? (
                        <div className="flex items-center gap-1 mt-2">
                          <Phone className="w-3 h-3" style={{ color: '#ef4444' }} />
                          <a href="tel:+302105223954" className="text-xs uppercase tracking-widest hover:underline">
                            +30 210 522 3954
                          </a>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 mt-2">
                          <div className="w-1.5 h-1.5 bg-neutral-900 rounded-full"></div>
                          <span className="text-xs uppercase tracking-widest">Book</span>
                        </div>
                      )}
                    </div>

                    {/* Image */}
                    <div className="flex-shrink-0 w-32 h-24 md:w-48 md:h-36 overflow-hidden">
                      <ImageWithFallback
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>

                    {/* Title and Location */}
                    <div className="flex-grow">
                      <h3 className="font-oswald text-xl md:text-3xl uppercase mb-1 md:mb-2 group-hover:text-neutral-600 transition-colors">
                        {event.title}
                      </h3>
                      <div className="text-xs md:text-sm uppercase tracking-widest text-neutral-600 mb-1">
                        {event.location}
                      </div>
                      <div className="text-xs text-neutral-500">
                        {event.venue}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Other tabs - Grid Layout */}
        {activeTab !== "upcoming" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
            {filteredEvents.map((event, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="aspect-[16/9] mb-6 overflow-hidden relative">
                  <ImageWithFallback
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 text-xs font-oswald uppercase tracking-widest">
                    {event.location}
                  </div>
                </div>

                <div className="flex flex-col">
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="font-oswald text-sm text-neutral-500 uppercase tracking-widest">{event.date}</span>
                  </div>
                  <h3 className="font-oswald text-3xl uppercase mb-3 group-hover:text-neutral-600 transition-colors">{event.title}</h3>
                  <p className="font-inter text-neutral-600 font-light leading-relaxed mb-6">{event.desc}</p>
                  <Link href="/book" className="inline-block border-b border-neutral-900 pb-1 uppercase font-oswald tracking-widest text-xs self-start hover:text-neutral-500 transition-colors">
                    Book Spot
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
