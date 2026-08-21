'use client';

import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useState, useEffect } from "react";
import { Phone, ExternalLink, RefreshCw } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { format } from "date-fns";

type TabType = "upcoming" | "previous";
type BookingType = "none" | "external" | "call";

interface EventRow {
  id: string;
  title: string;
  date: string;
  date_short: string | null;
  time_start: string;
  time_end: string | null;
  location: string;
  venue: string | null;
  description: string | null;
  image: string | null;
  featured: boolean;
  is_recurring: boolean;
  recurring_weeks: number;
  is_free: boolean;
  cost: string | null;
  booking_type: string;
  booking_url: string | null;
}

interface BlenderEvent {
  id: string;
  title: string;
  date: string;
  dateShort: string;
  timeStart: string;
  timeEnd: string;
  location: string;
  venue: string;
  desc: string;
  image: string;
  featured: boolean;
  isRecurring: boolean;
  recurringWeeks: number;
  isFree: boolean;
  cost: string;
  bookingType: BookingType;
  bookingUrl: string;
}

function rowToEvent(row: EventRow): BlenderEvent {
  return {
    id: row.id,
    title: row.title,
    date: row.date,
    dateShort: row.date_short ?? "",
    timeStart: row.time_start ?? "",
    timeEnd: row.time_end ?? "",
    location: row.location ?? "",
    venue: row.venue ?? "",
    desc: row.description ?? "",
    image: row.image ?? "",
    featured: row.featured ?? false,
    isRecurring: row.is_recurring ?? false,
    recurringWeeks: row.recurring_weeks ?? 1,
    isFree: row.is_free ?? false,
    cost: row.cost ?? "",
    bookingType: (row.booking_type as BookingType) ?? "none",
    bookingUrl: row.booking_url ?? "",
  };
}

const VENUE_PHONE = "+30 210 522 3954";

export default function Events() {
  const [activeTab, setActiveTab] = useState<TabType>("upcoming");
  const [allEvents, setAllEvents] = useState<BlenderEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from("events")
        .select("*")
        .order("date", { ascending: true });
      if (data) setAllEvents((data as EventRow[]).map(rowToEvent));
      setLoading(false);
    };
    fetchEvents();
  }, []);

  // Date-based split: upcoming = today or future, previous = past
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingEvents = allEvents.filter(
    (e) => new Date(e.date + "T00:00:00") >= today
  );
  const previousEvents = allEvents
    .filter((e) => new Date(e.date + "T00:00:00") < today)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const filteredEvents = activeTab === "upcoming" ? upcomingEvents : previousEvents;
  const featuredEvent = activeTab === "upcoming" ? filteredEvents.find((e) => e.featured) : undefined;
  const regularEvents = featuredEvent ? filteredEvents.filter((e) => !e.featured) : filteredEvents;

  const formatDate = (isoDate: string) => {
    try { return format(new Date(isoDate + "T00:00:00"), "EEEE, d MMM"); } catch { return isoDate; }
  };

  const formatDayName = (isoDate: string) => {
    try { return format(new Date(isoDate + "T00:00:00"), "EEEE"); } catch { return isoDate; }
  };

  return (
    <div className="bg-neutral-50 min-h-screen pb-24">
      <div className="pt-12 px-6 md:px-12 max-w-7xl mx-auto">
        <h1 className="font-oswald text-5xl md:text-7xl uppercase mb-16">What's Happening</h1>

        {/* Tabs */}
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

        {/* Loading */}
        {loading ? (
          <div className="text-center py-24">
            <p className="font-inter text-neutral-400 text-sm">Loading events...</p>
          </div>

        /* Empty state */
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-inter text-neutral-400 text-sm">
              {activeTab === "upcoming"
                ? "No upcoming events at this time. Check back soon."
                : "No previous events to show."}
            </p>
          </div>

        ) : (
          <>
            {/* ── UPCOMING: Hero + List ──────────────────────────────────── */}
            {activeTab === "upcoming" && (
              <div>
                {/* Featured Hero */}
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
                    <div className="absolute inset-0 bg-black/20" />

                    {/* Date + Booking — left */}
                    <div className="absolute top-8 left-8 md:top-12 md:left-12 text-white">
                      <div className="font-oswald text-3xl md:text-4xl mb-1">{featuredEvent.dateShort}</div>
                      <div className="text-xs uppercase tracking-widest opacity-80">
                        {featuredEvent.timeStart}{featuredEvent.timeEnd ? ` – ${featuredEvent.timeEnd}` : ""}
                      </div>

                      {featuredEvent.bookingType === "call" && (
                        <div className="mt-3">
                          <div className="flex items-center gap-2 mb-1">
                            <Phone className="w-3 h-3 text-red-400" />
                            <span className="text-xs uppercase tracking-widest">Call for Bookings</span>
                          </div>
                          <a
                            href={`tel:${VENUE_PHONE.replace(/\s/g, "")}`}
                            className="text-sm hover:underline block"
                          >
                            {VENUE_PHONE}
                          </a>
                        </div>
                      )}

                      {featuredEvent.bookingType === "external" && (
                        <div className="mt-3">
                          <a
                            href={featuredEvent.bookingUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm hover:underline"
                          >
                            <ExternalLink className="w-3 h-3" />
                            Buy Tickets
                          </a>
                        </div>
                      )}

                      <div className="mt-3 pt-3 border-t border-white/30">
                        <span className="text-lg font-oswald">
                          {featuredEvent.isFree ? "Free" : featuredEvent.cost}
                        </span>
                      </div>
                    </div>

                    {/* Title + Location — right */}
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
                      {featuredEvent.isRecurring && (
                        <div className="flex items-center justify-end gap-1 mt-2 text-xs opacity-70">
                          <RefreshCw className="w-3 h-3" />
                          Every {featuredEvent.recurringWeeks === 1 ? "week" : `${featuredEvent.recurringWeeks} weeks`}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Regular upcoming list */}
                <div className="bg-white/60 backdrop-blur-sm">
                  {regularEvents.map((event, i) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="border-b border-neutral-200 last:border-b-0"
                    >
                      <div className="flex items-center gap-6 md:gap-12 p-6 md:p-8 hover:bg-white/80 transition-colors group">

                        {/* Date column */}
                        <div className="flex-shrink-0 w-24 md:w-36">
                          <div className="font-oswald text-xl md:text-3xl mb-0.5 leading-tight">
                            {formatDayName(event.date)}
                          </div>
                          <div className="text-sm text-neutral-600">{event.dateShort}</div>
                          <div className="text-xs text-neutral-500 mt-0.5">
                            {event.timeStart}{event.timeEnd ? ` – ${event.timeEnd}` : ""}
                          </div>

                          {event.bookingType === "call" && (
                            <div className="flex items-center gap-1 mt-2">
                              <Phone className="w-3 h-3 text-red-500" />
                              <a
                                href={`tel:${VENUE_PHONE.replace(/\s/g, "")}`}
                                className="text-xs hover:underline"
                              >
                                {VENUE_PHONE}
                              </a>
                            </div>
                          )}
                          {event.bookingType === "external" && (
                            <div className="flex items-center gap-1 mt-2">
                              <ExternalLink className="w-3 h-3" />
                              <a
                                href={event.bookingUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs uppercase tracking-widest hover:underline"
                              >
                                Tickets
                              </a>
                            </div>
                          )}
                          {event.bookingType === "none" && (
                            <div className="flex items-center gap-1 mt-2">
                              <div className="w-1.5 h-1.5 bg-neutral-900 rounded-full" />
                              <span className="text-xs uppercase tracking-widest">
                                {event.isFree ? "Free" : "No booking"}
                              </span>
                            </div>
                          )}

                          {!event.isFree && event.cost && (
                            <div className="text-xs font-medium text-neutral-700 mt-1">{event.cost}</div>
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

                        {/* Text */}
                        <div className="flex-grow">
                          <h3 className="font-oswald text-xl md:text-3xl uppercase mb-1 md:mb-2 group-hover:text-neutral-600 transition-colors">
                            {event.title}
                          </h3>
                          <div className="text-xs md:text-sm uppercase tracking-widest text-neutral-600 mb-1">
                            {event.location}
                          </div>
                          <div className="text-xs text-neutral-500">{event.venue}</div>
                          {event.isRecurring && (
                            <div className="flex items-center gap-1 mt-2 text-xs text-neutral-400">
                              <RefreshCw className="w-3 h-3" />
                              Every {event.recurringWeeks === 1 ? "week" : `${event.recurringWeeks} weeks`}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* ── PREVIOUS: Grid ─────────────────────────────────────────── */}
            {activeTab === "previous" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
                {filteredEvents.map((event, i) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group"
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
                      <span className="font-oswald text-sm text-neutral-500 uppercase tracking-widest mb-2">
                        {formatDate(event.date)}
                      </span>
                      <h3 className="font-oswald text-3xl uppercase mb-3 group-hover:text-neutral-600 transition-colors">
                        {event.title}
                      </h3>
                      <p className="font-inter text-neutral-600 font-light leading-relaxed">
                        {event.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
