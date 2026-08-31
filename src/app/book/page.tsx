'use client';

import { useState, Suspense } from "react";
import { motion } from "motion/react";
import { CalendarIcon, ExternalLink } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Calendar } from "../components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { format } from "date-fns";
import { toast } from "sonner";

export default function Booking() {
  return (
    <div className="bg-neutral-50 min-h-screen pb-24 font-inter text-neutral-900">
      <div className="pt-12 px-6 md:px-12 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="font-oswald text-xs uppercase tracking-widest text-[#10B981] mb-4 block">Orchard — Fruit Rooms</span>
          <h1 className="font-oswald text-5xl md:text-7xl uppercase">Sleep in the Trees</h1>
        </div>

        <Suspense fallback={<div className="py-12 text-center text-neutral-400">Loading...</div>}>
          <OrchardBooking />
        </Suspense>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// ORCHARD — BookOnlineNow integration
// ----------------------------------------------------------------------
function OrchardBooking() {
  const searchParams = useSearchParams();
  const preSelectedRoom = searchParams.get("room");

  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined as Date | undefined,
  });
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [promoCode, setPromoCode] = useState("");

  const formatDateRange = () => {
    if (!dateRange.from) return "Select dates";
    if (!dateRange.to) return `${format(dateRange.from, "MMM dd, yyyy")} — Select departure`;
    return `${format(dateRange.from, "MMM dd, yyyy")} — ${format(dateRange.to, "MMM dd, yyyy")}`;
  };

  const handleSearch = () => {
    if (!dateRange.from || !dateRange.to) {
      toast.error("Please select both arrival and departure dates.");
      return;
    }
    if (dateRange.to <= dateRange.from) {
      toast.error("Departure must be after arrival.");
      return;
    }

    const arrival = format(dateRange.from, "dd/MM/yyyy");
    const departure = format(dateRange.to, "dd/MM/yyyy");

    const params = new URLSearchParams({
      Page: "19",
      lan_id: "en-US",
      arrival,
      departure,
      rooms: String(rooms),
      adults: String(adults),
      kids: String(children),
      kid1: children > 0 ? String(children) : "-1",
      kid2: "-1",
      kid3: "-1",
      extra: "0",
      cot: "0",
      ...(preSelectedRoom ? { selectedroom: preSelectedRoom } : {}),
      ...(promoCode ? { promo: promoCode } : {}),
    });

    window.open(`https://orchard.book-onlinenow.net/index.aspx?${params.toString()}`, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="max-w-2xl mx-auto space-y-8"
    >
      {/* Intro */}
      <div className="text-center space-y-2">
        <p className="text-neutral-500 font-inter font-light">
          Select your dates and preferences. You'll be taken to our secure booking engine to complete your reservation.
        </p>
      </div>

      {/* Dates */}
      <div className="space-y-2">
        <label className="text-xs uppercase font-oswald tracking-widest text-neutral-500">Your Stay</label>
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="w-full border-b-2 border-neutral-300 py-3 bg-transparent focus:outline-none focus:border-neutral-900 transition-colors text-left flex items-center justify-between hover:border-neutral-600 group"
            >
              <span className="group-hover:text-neutral-900 transition-colors">{formatDateRange()}</span>
              <CalendarIcon className="h-4 w-4 text-neutral-500 group-hover:text-neutral-900 transition-colors" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={(range) => setDateRange({ from: range?.from, to: range?.to })}
              disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Rooms + Adults + Children */}
      <div className="grid grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="text-xs uppercase font-oswald tracking-widest text-neutral-500">Rooms</label>
          <select
            value={rooms}
            onChange={(e) => setRooms(Number(e.target.value))}
            className="w-full border-b-2 border-neutral-300 py-3 bg-transparent focus:outline-none focus:border-neutral-900 transition-colors"
          >
            {[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-xs uppercase font-oswald tracking-widest text-neutral-500">Adults</label>
          <select
            value={adults}
            onChange={(e) => setAdults(Number(e.target.value))}
            className="w-full border-b-2 border-neutral-300 py-3 bg-transparent focus:outline-none focus:border-neutral-900 transition-colors"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-xs uppercase font-oswald tracking-widest text-neutral-500">Children</label>
          <select
            value={children}
            onChange={(e) => setChildren(Number(e.target.value))}
            className="w-full border-b-2 border-neutral-300 py-3 bg-transparent focus:outline-none focus:border-neutral-900 transition-colors"
          >
            {[0, 1, 2, 3].map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
      </div>

      {/* Promo Code */}
      <div className="space-y-2">
        <label className="text-xs uppercase font-oswald tracking-widest text-neutral-500">Promo Code (optional)</label>
        <input
          type="text"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          placeholder="Enter code"
          className="w-full border-b-2 border-neutral-300 py-3 bg-transparent focus:outline-none focus:border-neutral-900 transition-colors placeholder:text-neutral-400"
        />
      </div>

      {/* CTA */}
      <div className="pt-4">
        <button
          onClick={handleSearch}
          className="w-full group bg-neutral-900 text-white py-4 font-oswald uppercase tracking-[0.15em] text-sm flex items-center justify-center gap-3 hover:bg-neutral-700 transition-colors"
        >
          Check Availability
          <ExternalLink className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
        </button>
        <p className="text-center text-xs text-neutral-400 mt-3">
          You'll be redirected to our secure booking engine to complete your reservation.
        </p>
      </div>
    </motion.div>
  );
}

