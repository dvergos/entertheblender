'use client';

import { useState, Suspense } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { clsx } from "clsx";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "../components/ui/button";
import { CalendarIcon, ExternalLink } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Calendar } from "../components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { format } from "date-fns";

type BookingType = "orchard" | "vineyard" | "basket";

export default function Booking() {
  const [activeTab, setActiveTab] = useState<BookingType>("orchard");

  return (
    <div className="bg-neutral-50 min-h-screen pb-24 font-inter text-neutral-900">
      <div className="pt-12 px-6 md:px-12 max-w-5xl mx-auto">
        <h1 className="font-oswald text-5xl md:text-7xl uppercase mb-12 text-center">Reservations</h1>

        {/* TABS */}
        <div className="flex flex-wrap justify-center gap-8 mb-16 border-b border-neutral-200 pb-4">
          {(["orchard", "vineyard", "basket"] as BookingType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={clsx(
                "text-lg uppercase font-oswald tracking-widest transition-colors pb-4 -mb-4.5 border-b-2",
                activeTab === tab
                  ? "border-neutral-900 text-neutral-900"
                  : "border-transparent text-neutral-400 hover:text-neutral-600"
              )}
            >
              {tab === "orchard" && "Orchard (Stay)"}
              {tab === "vineyard" && "Vineyard (Table)"}
              {tab === "basket" && "Basket (Events)"}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        <Suspense fallback={<div className="py-12 text-center text-neutral-400">Loading...</div>}>
          <AnimatePresence mode="wait">
            {activeTab === "orchard" && <OrchardBooking key="orchard" />}
            {activeTab === "vineyard" && <VineyardBooking key="vineyard" />}
            {activeTab === "basket" && <BasketBooking key="basket" />}
          </AnimatePresence>
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

// ----------------------------------------------------------------------
// VINEYARD BOOKING FORM
// ----------------------------------------------------------------------
function VineyardBooking() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    toast.success("Table Reserved! See you at sunset.");
    reset();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="max-w-2xl mx-auto space-y-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs uppercase font-oswald tracking-widest text-neutral-500">Date</label>
          <input type="date" {...register("date", { required: true })} className="w-full border-b border-neutral-300 py-2 bg-transparent focus:outline-none focus:border-neutral-900" />
        </div>
        <div className="space-y-2">
          <label className="text-xs uppercase font-oswald tracking-widest text-neutral-500">Time</label>
          <select {...register("time")} className="w-full border-b border-neutral-300 py-2 bg-transparent focus:outline-none focus:border-neutral-900">
            <option>18:00</option>
            <option>19:00</option>
            <option>20:00</option>
            <option>21:00</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs uppercase font-oswald tracking-widest text-neutral-500">Guests</label>
          <select {...register("guests")} className="w-full border-b border-neutral-300 py-2 bg-transparent focus:outline-none focus:border-neutral-900">
            <option>2 Guests</option>
            <option>3 Guests</option>
            <option>4 Guests</option>
            <option>5+ Guests</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-xs uppercase font-oswald tracking-widest text-neutral-500">Preference</label>
          <div className="flex gap-4 pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" value="terrace" {...register("location")} defaultChecked className="accent-neutral-900" />
              <span className="text-sm">Terrace</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" value="indoor" {...register("location")} className="accent-neutral-900" />
              <span className="text-sm">Indoor</span>
            </label>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs uppercase font-oswald tracking-widest text-neutral-500">Special Requests</label>
        <textarea {...register("requests")} rows={3} className="w-full border-b border-neutral-300 py-2 bg-transparent focus:outline-none focus:border-neutral-900 resize-none" placeholder="Allergies, occasions..."></textarea>
      </div>

      <div className="space-y-2">
        <label className="text-xs uppercase font-oswald tracking-widest text-neutral-500">Contact</label>
        <div className="grid grid-cols-2 gap-4">
          <input type="text" placeholder="Name" {...register("name", { required: true })} className="w-full border-b border-neutral-300 py-2 bg-transparent focus:outline-none focus:border-neutral-900" />
          <input type="email" placeholder="Email" {...register("email", { required: true })} className="w-full border-b border-neutral-300 py-2 bg-transparent focus:outline-none focus:border-neutral-900" />
        </div>
      </div>

      <Button onClick={handleSubmit(onSubmit)} className="w-full mt-8">Reserve Table</Button>
    </motion.div>
  );
}

// ----------------------------------------------------------------------
// BASKET BOOKING FORM
// ----------------------------------------------------------------------
function BasketBooking() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    toast.success("Inquiry Sent! We'll be in touch.");
    reset();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="max-w-2xl mx-auto space-y-8"
    >
      <div className="text-center mb-8">
        <p className="text-neutral-500">For groups larger than 8, or private events.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs uppercase font-oswald tracking-widest text-neutral-500">Event Date</label>
          <input type="date" {...register("date", { required: true })} className="w-full border-b border-neutral-300 py-2 bg-transparent focus:outline-none focus:border-neutral-900" />
        </div>
        <div className="space-y-2">
          <label className="text-xs uppercase font-oswald tracking-widest text-neutral-500">Group Size</label>
          <input type="number" {...register("size", { required: true })} placeholder="Estimated guests" className="w-full border-b border-neutral-300 py-2 bg-transparent focus:outline-none focus:border-neutral-900" />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs uppercase font-oswald tracking-widest text-neutral-500">Event Type</label>
        <select {...register("type")} className="w-full border-b border-neutral-300 py-2 bg-transparent focus:outline-none focus:border-neutral-900">
          <option>Casual Gathering</option>
          <option>Birthday / Celebration</option>
          <option>Corporate</option>
          <option>Wedding / Private</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-xs uppercase font-oswald tracking-widest text-neutral-500">Tell us more</label>
        <textarea {...register("details")} rows={4} className="w-full border-b border-neutral-300 py-2 bg-transparent focus:outline-none focus:border-neutral-900 resize-none" placeholder="What do you have in mind?"></textarea>
      </div>

      <div className="space-y-2">
        <label className="text-xs uppercase font-oswald tracking-widest text-neutral-500">Contact</label>
        <div className="grid grid-cols-2 gap-4">
          <input type="text" placeholder="Name" {...register("name", { required: true })} className="w-full border-b border-neutral-300 py-2 bg-transparent focus:outline-none focus:border-neutral-900" />
          <input type="email" placeholder="Email" {...register("email", { required: true })} className="w-full border-b border-neutral-300 py-2 bg-transparent focus:outline-none focus:border-neutral-900" />
        </div>
      </div>

      <Button onClick={handleSubmit(onSubmit)} className="w-full mt-8">Request Event</Button>
    </motion.div>
  );
}
