'use client';

import { useState, Suspense } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { clsx } from "clsx";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "../../components/ui/button";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { Check, ChevronLeft, CalendarIcon } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Calendar } from "../../components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover";
import { format } from "date-fns";

// Custom Room Icon Arrow
function RoomArrow({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Simple house/room outline with arrow */}
      <path
        d="M3 12L5 10V18H11V12H13V18H19V10L21 12M12 3L3 10H21L12 3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Arrow integrated into the design */}
      <path
        d="M15 13L17 15M17 15L15 17M17 15H7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Custom Details Icon Arrow
function DetailsArrow({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Simple arrow pointing right */}
      <path
        d="M5 12H19M19 12L12 5M19 12L12 19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Mock Data
const ROOMS = [
  {
    id: "blackcurrant",
    name: "Blackcurrant",
    price: 250,
    image: "https://images.unsplash.com/photo-1743867840110-ee532b7c6fb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwcHVycGxlJTIwYmVkcm9vbSUyMGludGVyaW9yJTIwbW9vZHl8ZW58MXx8fHwxNzcxNzU2MTk5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Deep. Intimate. Grounded. Evening light in wood.",
    amenities: ["King bed", "Private bathroom", "Terrace view", "Minibar", "WiFi"],
    images: [
      "https://images.unsplash.com/photo-1743867840110-ee532b7c6fb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwcHVycGxlJTIwYmVkcm9vbSUyMGludGVyaW9yJTIwbW9vZHl8ZW58MXx8fHwxNzcxNzU2MTk5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb29keSUyMGJlZHJvb20lMjBkZXRhaWx8ZW58MXx8fHwxNzcxNzU2MTk5fDA&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    id: "banana",
    name: "Banana",
    price: 220,
    image: "https://images.unsplash.com/photo-1699558983214-521c242961b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXJtJTIwd29vZCUyMHllbGxvdyUyMGFjY2VudCUyMGJlZHJvb20lMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzE3NTYxOTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Playful. Soft. Warm. The most relaxed room.",
    amenities: ["Queen bed", "Private bathroom", "Garden view", "Work desk", "WiFi"],
    images: [
      "https://images.unsplash.com/photo-1699558983214-521c242961b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXJtJTIwd29vZCUyMHllbGxvdyUyMGFjY2VudCUyMGJlZHJvb20lMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzE3NTYxOTl8MA&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    id: "blood-orange",
    name: "Blood Orange",
    price: 240,
    image: "https://images.unsplash.com/photo-1593030019566-d681b01e877f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydXN0JTIwb3JhbmdlJTIwYmVkcm9vbSUyMGludGVyaW9yJTIwdmlicmFudHxlbnwxfHx8fDE3NzE3NTYxOTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Bold. Sensory. Vibrant. Energetic atmosphere.",
    amenities: ["King bed", "Private bathroom", "Sunset view", "Minibar", "WiFi"],
    images: [
      "https://images.unsplash.com/photo-1593030019566-d681b01e877f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydXN0JTIwb3JhbmdlJTIwYmVkcm9vbSUyMGludGVyaW9yJTIwdmlicmFudHxlbnwxfHx8fDE3NzE3NTYxOTl8MA&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    id: "breadfruit",
    name: "Breadfruit",
    price: 260,
    image: "https://images.unsplash.com/photo-1705372334341-3780ebb7c97b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYXclMjB3b29kJTIwdGV4dHVyZWQlMjBiZWRyb29tJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzcxNzU2MTk5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Textured. Earthy. Architectural. Most structural design.",
    amenities: ["King bed", "Private bathroom", "Orchard view", "Reading nook", "WiFi"],
    images: [
      "https://images.unsplash.com/photo-1705372334341-3780ebb7c97b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYXclMjB3b29kJTIwdGV4dHVyZWQlMjBiZWRyb29tJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzcxNzU2MTk5fDA&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    id: "bergamot",
    name: "Bergamot",
    price: 280,
    image: "https://images.unsplash.com/photo-1615800001718-73ba40557cb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0JTIwZ3JlZW4lMjBtaW5pbWFsJTIwYmVkcm9vbSUyMGludGVyaW9yfGVufDF8fHx8MTc3MTc1NjE5OXww&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Refined. Fragrant. Balanced. Most elegant room.",
    amenities: ["King bed", "Private bathroom", "Aromatherapy", "Minibar", "WiFi"],
    images: [
      "https://images.unsplash.com/photo-1615800001718-73ba40557cb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0JTIwZ3JlZW4lMjBtaW5pbWFsJTIwYmVkcm9vbSUyMGludGVyaW9yfGVufDF8fHx8MTc3MTc1NjE5OXww&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  },
  {
    id: "blueberry",
    name: "Blueberry",
    price: 230,
    image: "https://images.unsplash.com/photo-1767050371633-675072d4bed7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWVwJTIwYmx1ZSUyMGJlZHJvb20lMjBpbnRlcmlvciUyMG1pbmltYWx8ZW58MXx8fHwxNzcxNzU2MTk5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    description: "Calm. Compact. Introspective. Quiet and minimal.",
    amenities: ["Queen bed", "Private bathroom", "Tree view", "Meditation space", "WiFi"],
    images: [
      "https://images.unsplash.com/photo-1767050371633-675072d4bed7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWVwJTIwYmx1ZSUyMGJlZHJvb20lMjBpbnRlcmlvciUyMG1pbmltYWx8ZW58MXx8fHwxNzcxNzU2MTk5fDA&ixlib=rb-4.1.0&q=80&w=1080"
    ]
  }
];

type BookingType = "orchard" | "vineyard" | "basket";

interface BookingData {
  arrival: string;
  departure: string;
  guests: string;
  roomId: string;
  name: string;
  email: string;
  phone: string;
}

export default function Booking() {
  const [activeTab, setActiveTab] = useState<BookingType>("orchard");

  return (
    <div className="bg-neutral-50 min-h-screen pb-24 font-inter text-neutral-900">
      <div className="pt-12 px-6 md:px-12 max-w-5xl mx-auto">
        <h1 className="font-oswald text-5xl md:text-7xl uppercase mb-12 text-center">Reservations</h1>

        {/* TABS */}
        <div className="flex flex-wrap justify-center gap-8 mb-16 border-b border-neutral-200 pb-4">
          <button
            onClick={() => setActiveTab("orchard")}
            className={clsx(
              "text-lg uppercase font-oswald tracking-widest transition-colors pb-4 -mb-4.5 border-b-2",
              activeTab === "orchard" ? "border-neutral-900 text-neutral-900" : "border-transparent text-neutral-400 hover:text-neutral-600"
            )}
          >
            Orchard (Stay)
          </button>
          <button
            onClick={() => setActiveTab("vineyard")}
            className={clsx(
              "text-lg uppercase font-oswald tracking-widest transition-colors pb-4 -mb-4.5 border-b-2",
              activeTab === "vineyard" ? "border-neutral-900 text-neutral-900" : "border-transparent text-neutral-400 hover:text-neutral-600"
            )}
          >
            Vineyard (Table)
          </button>
          <button
            onClick={() => setActiveTab("basket")}
            className={clsx(
              "text-lg uppercase font-oswald tracking-widest transition-colors pb-4 -mb-4.5 border-b-2",
              activeTab === "basket" ? "border-neutral-900 text-neutral-900" : "border-transparent text-neutral-400 hover:text-neutral-600"
            )}
          >
            Basket (Events)
          </button>
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
// ORCHARD BOOKING FLOW - MULTI-STEP
// ----------------------------------------------------------------------
function OrchardBooking() {
  const searchParams = useSearchParams();
  const preSelectedRoom = searchParams.get("room");

  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState<Partial<BookingData>>({
    roomId: preSelectedRoom || "",
    guests: "2"
  });

  const selectedRoom = ROOMS.find(r => r.id === bookingData.roomId);

  // Calculate nights and total
  const calculateNights = () => {
    if (!bookingData.arrival || !bookingData.departure) return 0;
    const arrival = new Date(bookingData.arrival);
    const departure = new Date(bookingData.departure);
    const nights = Math.ceil((departure.getTime() - arrival.getTime()) / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights : 0;
  };

  const nights = calculateNights();
  const totalPrice = selectedRoom ? selectedRoom.price * nights : 0;

  const goToStep = (step: number) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto"
    >
      {/* PROGRESS INDICATOR */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3, 4, 5, 6].map((step) => (
            <div key={step} className="flex items-center flex-1">
              <div className={clsx(
                "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors",
                currentStep >= step ? "bg-neutral-900 text-white" : "bg-neutral-200 text-neutral-400"
              )}>
                {currentStep > step ? <Check size={16} /> : step}
              </div>
              {step < 6 && <div className={clsx("flex-1 h-0.5 mx-2", currentStep > step ? "bg-neutral-900" : "bg-neutral-200")} />}
            </div>
          ))}
        </div>
        <div className="text-center">
          <p className="text-sm text-neutral-500 uppercase tracking-wide font-oswald">
            {currentStep === 1 && "Select Dates"}
            {currentStep === 2 && "Choose Your Room"}
            {currentStep === 3 && "Room Details"}
            {currentStep === 4 && "Guest Information"}
            {currentStep === 5 && "Payment"}
            {currentStep === 6 && "Confirmation"}
          </p>
        </div>
      </div>

      {/* STEP CONTENT */}
      <AnimatePresence mode="wait">
        {currentStep === 1 && (
          <Step1Dates
            key="step1"
            data={bookingData}
            onNext={(data) => {
              setBookingData({ ...bookingData, ...data });
              goToStep(2);
            }}
          />
        )}
        {currentStep === 2 && (
          <Step2RoomSelection
            key="step2"
            selectedRoomId={bookingData.roomId}
            onBack={() => goToStep(1)}
            onNext={(roomId) => {
              setBookingData({ ...bookingData, roomId });
              goToStep(3);
            }}
          />
        )}
        {currentStep === 3 && selectedRoom && (
          <Step3RoomDetails
            key="step3"
            room={selectedRoom}
            nights={nights}
            totalPrice={totalPrice}
            onBack={() => goToStep(2)}
            onNext={() => goToStep(4)}
          />
        )}
        {currentStep === 4 && (
          <Step4GuestInfo
            key="step4"
            data={bookingData}
            onBack={() => goToStep(3)}
            onNext={(data) => {
              setBookingData({ ...bookingData, ...data });
              goToStep(5);
            }}
          />
        )}
        {currentStep === 5 && selectedRoom && (
          <Step5Payment
            key="step5"
            room={selectedRoom}
            bookingData={bookingData}
            nights={nights}
            totalPrice={totalPrice}
            onBack={() => goToStep(4)}
            onNext={() => goToStep(6)}
          />
        )}
        {currentStep === 6 && selectedRoom && (
          <Step6Confirmation
            key="step6"
            room={selectedRoom}
            bookingData={bookingData}
            nights={nights}
            totalPrice={totalPrice}
          />
        )}
      </AnimatePresence>

    </motion.div>
  );
}

// Step 1: Select Dates
function Step1Dates({ data, onNext }: { data: Partial<BookingData>, onNext: (data: Partial<BookingData>) => void }) {
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: data.arrival ? new Date(data.arrival) : undefined,
    to: data.departure ? new Date(data.departure) : undefined,
  });

  // Guest counts
  const [adults, setAdults] = useState(parseInt(data.guests || "2"));
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [cribs, setCribs] = useState(0);

  // Format date range for display
  const formatDateRange = () => {
    if (!dateRange.from) return "Select dates";
    if (!dateRange.to) return `${format(dateRange.from, "MMM dd, yyyy")} - Select end date`;
    return `${format(dateRange.from, "MMM dd, yyyy")} - ${format(dateRange.to, "MMM dd, yyyy")}`;
  };

  // Handle date selection
  const handleDateSelect = (range: any) => {
    setDateRange(range || { from: undefined, to: undefined });
  };

  const totalGuests = adults + children + infants;
  const maxGuests = 9;

  const incrementAdults = () => {
    if (totalGuests < maxGuests) setAdults(adults + 1);
  };
  const decrementAdults = () => {
    if (adults > 1) setAdults(adults - 1);
  };

  const incrementChildren = () => {
    if (totalGuests < maxGuests) setChildren(children + 1);
  };
  const decrementChildren = () => {
    if (children > 0) setChildren(children - 1);
  };

  const incrementInfants = () => {
    if (totalGuests < maxGuests) setInfants(infants + 1);
  };
  const decrementInfants = () => {
    if (infants > 0) {
      setInfants(infants - 1);
      if (infants - 1 < cribs) {
        setCribs(infants - 1);
      }
    }
  };

  const incrementCribs = () => {
    if (cribs < infants) setCribs(cribs + 1);
  };
  const decrementCribs = () => {
    if (cribs > 0) setCribs(cribs - 1);
  };

  const handleContinue = () => {
    if (!dateRange.from || !dateRange.to) {
      toast.error("Please select both arrival and departure dates.");
      return;
    }

    if (dateRange.to <= dateRange.from) {
      toast.error("Departure date must be after arrival date.");
      return;
    }

    if (totalGuests === 0) {
      toast.error("Please select at least one guest.");
      return;
    }

    onNext({
      arrival: format(dateRange.from, "yyyy-MM-dd"),
      departure: format(dateRange.to, "yyyy-MM-dd"),
      guests: totalGuests.toString()
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-8"
    >
      {/* Date Range Selection */}
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
              onSelect={handleDateSelect}
              disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Guest Selection */}
      <div className="space-y-2">
        <label className="text-xs uppercase font-oswald tracking-widest text-neutral-500">Guests</label>
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="w-full border-b-2 border-neutral-300 py-3 bg-transparent focus:outline-none focus:border-neutral-900 transition-colors text-left"
            >
              {totalGuests} {totalGuests === 1 ? 'Guest' : 'Guests'}
              {children > 0 && ` (${adults} Adult${adults !== 1 ? 's' : ''}, ${children} Child${children !== 1 ? 'ren' : ''}${infants > 0 ? `, ${infants} Infant${infants !== 1 ? 's' : ''}` : ''})`}
              {children === 0 && infants > 0 && ` (${adults} Adult${adults !== 1 ? 's' : ''}, ${infants} Infant${infants !== 1 ? 's' : ''})`}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-96 p-6" align="start">
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-center pb-4 border-b border-neutral-200">Guests</h3>

              {/* Adults */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{adults} Adult{adults !== 1 ? 's' : ''}</div>
                  <div className="text-sm text-neutral-500">Ages 12+</div>
                </div>
                <div className="flex items-center gap-3">
                  <motion.button
                    type="button"
                    onClick={decrementAdults}
                    disabled={adults <= 1}
                    whileTap={{ scale: adults > 1 ? 0.9 : 1 }}
                    whileHover={{ scale: adults > 1 ? 1.05 : 1 }}
                    className={clsx(
                      "w-10 h-10 border-2 border-neutral-900 flex items-center justify-center transition-colors",
                      adults <= 1 ? "opacity-30 cursor-not-allowed" : "hover:bg-neutral-100 active:bg-neutral-200"
                    )}
                  >
                    <span className="text-xl text-neutral-400">−</span>
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={incrementAdults}
                    disabled={totalGuests >= maxGuests}
                    whileTap={{ scale: totalGuests < maxGuests ? 0.9 : 1 }}
                    whileHover={{ scale: totalGuests < maxGuests ? 1.05 : 1 }}
                    className={clsx(
                      "w-10 h-10 border-2 border-neutral-900 flex items-center justify-center transition-colors",
                      totalGuests >= maxGuests ? "opacity-30 cursor-not-allowed" : "hover:bg-neutral-100 active:bg-neutral-200"
                    )}
                  >
                    <span className="text-xl">+</span>
                  </motion.button>
                </div>
              </div>

              {/* Children */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{children} Child{children !== 1 ? 'ren' : ''}</div>
                  <div className="text-sm text-neutral-500">Ages 2-11</div>
                </div>
                <div className="flex items-center gap-3">
                  <motion.button
                    type="button"
                    onClick={decrementChildren}
                    disabled={children <= 0}
                    whileTap={{ scale: children > 0 ? 0.9 : 1 }}
                    whileHover={{ scale: children > 0 ? 1.05 : 1 }}
                    className={clsx(
                      "w-10 h-10 border-2 border-neutral-900 flex items-center justify-center transition-colors",
                      children <= 0 ? "opacity-30 cursor-not-allowed" : "hover:bg-neutral-100 active:bg-neutral-200"
                    )}
                  >
                    <span className="text-xl text-neutral-400">−</span>
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={incrementChildren}
                    disabled={totalGuests >= maxGuests}
                    whileTap={{ scale: totalGuests < maxGuests ? 0.9 : 1 }}
                    whileHover={{ scale: totalGuests < maxGuests ? 1.05 : 1 }}
                    className={clsx(
                      "w-10 h-10 border-2 border-neutral-900 flex items-center justify-center transition-colors",
                      totalGuests >= maxGuests ? "opacity-30 cursor-not-allowed" : "hover:bg-neutral-100 active:bg-neutral-200"
                    )}
                  >
                    <span className="text-xl">+</span>
                  </motion.button>
                </div>
              </div>

              {/* Infants */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{infants} Infant{infants !== 1 ? 's' : ''}</div>
                  <div className="text-sm text-neutral-500">Ages under 2</div>
                </div>
                <div className="flex items-center gap-3">
                  <motion.button
                    type="button"
                    onClick={decrementInfants}
                    disabled={infants <= 0}
                    whileTap={{ scale: infants > 0 ? 0.9 : 1 }}
                    whileHover={{ scale: infants > 0 ? 1.05 : 1 }}
                    className={clsx(
                      "w-10 h-10 border-2 border-neutral-900 flex items-center justify-center transition-colors",
                      infants <= 0 ? "opacity-30 cursor-not-allowed" : "hover:bg-neutral-100 active:bg-neutral-200"
                    )}
                  >
                    <span className="text-xl text-neutral-400">−</span>
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={incrementInfants}
                    disabled={totalGuests >= maxGuests}
                    whileTap={{ scale: totalGuests < maxGuests ? 0.9 : 1 }}
                    whileHover={{ scale: totalGuests < maxGuests ? 1.05 : 1 }}
                    className={clsx(
                      "w-10 h-10 border-2 border-neutral-900 flex items-center justify-center transition-colors",
                      totalGuests >= maxGuests ? "opacity-30 cursor-not-allowed" : "hover:bg-neutral-100 active:bg-neutral-200"
                    )}
                  >
                    <span className="text-xl">+</span>
                  </motion.button>
                </div>
              </div>

              {/* Cribs - Only show if infants > 0 */}
              {infants > 0 && (
                <div className="flex items-center justify-between pt-2 border-t border-neutral-200">
                  <div>
                    <div className="font-medium">{cribs} Crib{cribs !== 1 ? 's' : ''}</div>
                    <div className="text-sm text-neutral-500">For infants</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <motion.button
                      type="button"
                      onClick={decrementCribs}
                      disabled={cribs <= 0}
                      whileTap={{ scale: cribs > 0 ? 0.9 : 1 }}
                      whileHover={{ scale: cribs > 0 ? 1.05 : 1 }}
                      className={clsx(
                        "w-10 h-10 border-2 border-neutral-900 flex items-center justify-center transition-colors",
                        cribs <= 0 ? "opacity-30 cursor-not-allowed" : "hover:bg-neutral-100 active:bg-neutral-200"
                      )}
                    >
                      <span className="text-xl text-neutral-400">−</span>
                    </motion.button>
                    <motion.button
                      type="button"
                      onClick={incrementCribs}
                      disabled={cribs >= infants}
                      whileTap={{ scale: cribs < infants ? 0.9 : 1 }}
                      whileHover={{ scale: cribs < infants ? 1.05 : 1 }}
                      className={clsx(
                        "w-10 h-10 border-2 border-neutral-900 flex items-center justify-center transition-colors",
                        cribs >= infants ? "opacity-30 cursor-not-allowed" : "hover:bg-neutral-100 active:bg-neutral-200"
                      )}
                    >
                      <span className="text-xl">+</span>
                    </motion.button>
                  </div>
                </div>
              )}

              {/* Note */}
              <div className="pt-4 border-t border-neutral-200">
                <p className="text-sm text-neutral-600">
                  Please note: You can book for a maximum of {maxGuests} guests.
                </p>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex justify-end pt-8">
        <button
          onClick={handleContinue}
          className="group relative bg-neutral-900 text-white px-8 py-3 rounded-full font-oswald uppercase tracking-[0.15em] text-xs overflow-hidden transition-all duration-300 hover:bg-neutral-800 hover:tracking-[0.2em] hover:px-10"
        >
          <span className="relative z-10 flex items-center gap-3">
            Continue to Rooms
            <RoomArrow className="transition-all duration-300 group-hover:translate-x-1 group-hover:text-neutral-300" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-800 to-neutral-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
        </button>
      </div>
    </motion.div>
  );
}

// Step 2: Room Selection
function Step2RoomSelection({ selectedRoomId, onBack, onNext }: { selectedRoomId?: string, onBack: () => void, onNext: (roomId: string) => void }) {
  const [tempSelection, setTempSelection] = useState(selectedRoomId || "");

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {ROOMS.map((room) => (
          <div
            key={room.id}
            onClick={() => setTempSelection(room.id)}
            className={clsx(
              "cursor-pointer border-2 transition-all duration-200 group relative overflow-hidden",
              tempSelection === room.id ? "border-neutral-900 shadow-lg" : "border-neutral-200 hover:border-neutral-400"
            )}
          >
            <div className="aspect-[4/3] bg-neutral-200 overflow-hidden relative">
              <ImageWithFallback src={room.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={room.name} />
              {tempSelection === room.id && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="bg-white px-4 py-2">
                    <span className="text-neutral-900 font-oswald uppercase tracking-widest text-sm">Selected</span>
                  </div>
                </div>
              )}
            </div>
            <div className="p-4">
              <div className="flex justify-between items-baseline mb-2">
                <h4 className="font-oswald uppercase text-lg">{room.name}</h4>
                <span className="text-sm font-oswald text-neutral-600">€{room.price}</span>
              </div>
              <p className="text-xs text-neutral-500 leading-relaxed">{room.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between pt-8">
        <Button onClick={onBack} variant="ghost" className="flex items-center gap-2">
          <ChevronLeft size={16} /> Back
        </Button>
        <button
          onClick={() => {
            if (!tempSelection) {
              toast.error("Please select a room");
              return;
            }
            onNext(tempSelection);
          }}
          className="group relative bg-neutral-900 text-white px-8 py-3 rounded-full font-oswald uppercase tracking-[0.15em] text-xs overflow-hidden transition-all duration-300 hover:bg-neutral-800 hover:tracking-[0.2em] hover:px-10"
        >
          <span className="relative z-10 flex items-center gap-3">
            Continue to Details
            <DetailsArrow className="transition-all duration-300 group-hover:translate-x-1 group-hover:text-neutral-300" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-800 to-neutral-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
        </button>
      </div>
    </motion.div>
  );
}

// Step 3: Room Details
function Step3RoomDetails({ room, nights, totalPrice, onBack, onNext }: { room: typeof ROOMS[0], nights: number, totalPrice: number, onBack: () => void, onNext: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-8"
    >
      {/* Photo Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {room.images.map((img, i) => (
          <div key={i} className="aspect-[4/3] bg-neutral-200 overflow-hidden">
            <ImageWithFallback src={img} className="w-full h-full object-cover" alt={`${room.name} ${i + 1}`} />
          </div>
        ))}
      </div>

      {/* Room Info */}
      <div className="bg-neutral-100 p-8 space-y-6">
        <div>
          <h3 className="font-oswald text-3xl uppercase mb-2">{room.name}</h3>
          <p className="text-neutral-600 font-light">{room.description}</p>
        </div>

        {/* Amenities */}
        <div>
          <h4 className="font-oswald text-sm uppercase tracking-widest text-neutral-500 mb-3">Amenities</h4>
          <div className="grid grid-cols-2 gap-2">
            {room.amenities.map((amenity) => (
              <div key={amenity} className="flex items-center gap-2">
                <Check size={16} className="text-neutral-900" />
                <span className="text-sm">{amenity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sustainability Note */}
        <div className="border-t border-neutral-300 pt-6">
          <h4 className="font-oswald text-sm uppercase tracking-widest text-neutral-500 mb-3">Sustainability</h4>
          <p className="text-sm text-neutral-600 leading-relaxed">
            This room is built entirely with upcycled materials. From reclaimed wood to repurposed textiles,
            every element tells a story of thoughtful regeneration. We believe in creating spaces that honor
            both nature and craftsmanship.
          </p>
        </div>

        {/* Pricing Summary */}
        <div className="border-t border-neutral-300 pt-6">
          <div className="flex justify-between mb-2">
            <span className="text-sm">€{room.price} × {nights} {nights === 1 ? 'night' : 'nights'}</span>
            <span className="text-sm">€{totalPrice}</span>
          </div>
          <div className="flex justify-between font-oswald text-lg">
            <span>Total</span>
            <span>€{totalPrice}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button onClick={onBack} variant="ghost" className="flex items-center gap-2">
          <ChevronLeft size={16} /> Back
        </Button>
        <Button onClick={onNext} size="lg">Continue to Guest Info</Button>
      </div>
    </motion.div>
  );
}

// Step 4: Guest Information
function Step4GuestInfo({ data, onBack, onNext }: { data: Partial<BookingData>, onBack: () => void, onNext: (data: Partial<BookingData>) => void }) {
  const { register, handleSubmit, formState: { errors } } = useForm<Partial<BookingData>>({ defaultValues: data });

  const onSubmit = (data: Partial<BookingData>) => {
    if (!data.name || !data.email || !data.phone) {
      toast.error("Please fill in all fields.");
      return;
    }
    onNext(data);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8"
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs uppercase font-oswald tracking-widest text-neutral-500">Full Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="w-full border-b-2 border-neutral-300 py-3 bg-transparent focus:outline-none focus:border-neutral-900 transition-colors"
            placeholder="John Doe"
          />
          {errors.name && <p className="text-red-500 text-xs">This field is required.</p>}
        </div>

        <div className="space-y-2">
          <label className="text-xs uppercase font-oswald tracking-widest text-neutral-500">Email Address</label>
          <input
            type="email"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            className="w-full border-b-2 border-neutral-300 py-3 bg-transparent focus:outline-none focus:border-neutral-900 transition-colors"
            placeholder="john@example.com"
          />
          {errors.email && <p className="text-red-500 text-xs">Please enter a valid email.</p>}
        </div>

        <div className="space-y-2">
          <label className="text-xs uppercase font-oswald tracking-widest text-neutral-500">Phone Number</label>
          <input
            type="tel"
            {...register("phone", { required: true })}
            className="w-full border-b-2 border-neutral-300 py-3 bg-transparent focus:outline-none focus:border-neutral-900 transition-colors"
            placeholder="+30 123 456 7890"
          />
          {errors.phone && <p className="text-red-500 text-xs">This field is required.</p>}
        </div>
      </div>

      <div className="flex justify-between pt-8">
        <Button type="button" onClick={onBack} variant="ghost" className="flex items-center gap-2">
          <ChevronLeft size={16} /> Back
        </Button>
        <Button type="submit" size="lg">Continue to Payment</Button>
      </div>
    </motion.form>
  );
}

// Step 5: Payment
function Step5Payment({ room, bookingData, nights, totalPrice, onBack, onNext }: { room: typeof ROOMS[0], bookingData: Partial<BookingData>, nights: number, totalPrice: number, onBack: () => void, onNext: () => void }) {
  const [paymentMethod, setPaymentMethod] = useState<"card" | "bank">("card");

  const handlePayment = () => {
    toast.success("Payment processed successfully!");
    setTimeout(() => {
      onNext();
    }, 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-8"
    >
      {/* Booking Summary */}
      <div className="bg-neutral-100 p-6 space-y-4">
        <h3 className="font-oswald text-xl uppercase">Booking Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-neutral-600">Room</span>
            <span className="font-medium">{room.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-600">Guest</span>
            <span className="font-medium">{bookingData.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-600">Contact</span>
            <span className="font-medium">{bookingData.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-600">Duration</span>
            <span className="font-medium">{nights} {nights === 1 ? 'night' : 'nights'}</span>
          </div>
          <div className="border-t border-neutral-300 pt-3 mt-3 flex justify-between font-oswald text-lg">
            <span>Total</span>
            <span>€{totalPrice}</span>
          </div>
        </div>
      </div>

      {/* Payment Method Selection */}
      <div className="space-y-4">
        <h4 className="font-oswald text-sm uppercase tracking-widest text-neutral-500">Payment Method</h4>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setPaymentMethod("card")}
            className={clsx(
              "p-4 border-2 transition-all",
              paymentMethod === "card" ? "border-neutral-900 bg-neutral-50" : "border-neutral-200 hover:border-neutral-400"
            )}
          >
            <span className="font-oswald uppercase text-sm">Credit Card</span>
          </button>
          <button
            type="button"
            onClick={() => setPaymentMethod("bank")}
            className={clsx(
              "p-4 border-2 transition-all",
              paymentMethod === "bank" ? "border-neutral-900 bg-neutral-50" : "border-neutral-200 hover:border-neutral-400"
            )}
          >
            <span className="font-oswald uppercase text-sm">Bank Transfer</span>
          </button>
        </div>
      </div>

      {/* Mock Payment Form */}
      {paymentMethod === "card" && (
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs uppercase font-oswald tracking-widest text-neutral-500">Card Number</label>
            <input
              type="text"
              className="w-full border-b-2 border-neutral-300 py-3 bg-transparent focus:outline-none focus:border-neutral-900"
              placeholder="1234 5678 9012 3456"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs uppercase font-oswald tracking-widest text-neutral-500">Expiry</label>
              <input
                type="text"
                className="w-full border-b-2 border-neutral-300 py-3 bg-transparent focus:outline-none focus:border-neutral-900"
                placeholder="MM/YY"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase font-oswald tracking-widest text-neutral-500">CVV</label>
              <input
                type="text"
                className="w-full border-b-2 border-neutral-300 py-3 bg-transparent focus:outline-none focus:border-neutral-900"
                placeholder="123"
              />
            </div>
          </div>
        </div>
      )}

      {paymentMethod === "bank" && (
        <div className="bg-neutral-100 p-6 text-sm space-y-2">
          <p className="font-medium">Bank Transfer Details:</p>
          <p className="text-neutral-600">Bank: National Bank of Greece</p>
          <p className="text-neutral-600">IBAN: GR12 3456 7890 1234 5678 90</p>
          <p className="text-neutral-600">Reference: {room.name} - {bookingData.name}</p>
        </div>
      )}

      <div className="flex justify-between pt-8">
        <Button onClick={onBack} variant="ghost" className="flex items-center gap-2">
          <ChevronLeft size={16} /> Back
        </Button>
        <Button onClick={handlePayment} size="lg">
          {paymentMethod === "card" ? "Pay Now" : "Confirm Booking"}
        </Button>
      </div>
    </motion.div>
  );
}

// Step 6: Confirmation
function Step6Confirmation({ room, bookingData, nights, totalPrice }: { room: typeof ROOMS[0], bookingData: Partial<BookingData>, nights: number, totalPrice: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-8 text-center"
    >
      {/* Success Icon */}
      <div className="flex justify-center">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
          <Check size={40} className="text-green-600" />
        </div>
      </div>

      {/* Confirmation Message */}
      <div className="space-y-4">
        <h2 className="font-oswald text-4xl uppercase">Your Stay is Confirmed</h2>
        <p className="text-neutral-600 max-w-md mx-auto">
          A confirmation email has been sent to <strong>{bookingData.email}</strong> with all the details of your booking.
        </p>
      </div>

      {/* Booking Details */}
      <div className="bg-neutral-100 p-8 space-y-4 text-left max-w-md mx-auto">
        <h3 className="font-oswald text-xl uppercase text-center mb-6">Booking Details</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-neutral-600">Room</span>
            <span className="font-medium">{room.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-600">Guest</span>
            <span className="font-medium">{bookingData.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-600">Arrival</span>
            <span className="font-medium">{bookingData.arrival}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-600">Departure</span>
            <span className="font-medium">{bookingData.departure}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-600">Duration</span>
            <span className="font-medium">{nights} {nights === 1 ? 'night' : 'nights'}</span>
          </div>
          <div className="border-t border-neutral-300 pt-3 mt-3 flex justify-between font-oswald text-lg">
            <span>Total Paid</span>
            <span>€{totalPrice}</span>
          </div>
        </div>
      </div>

      {/* Upsell - Vineyard */}
      <div className="bg-neutral-900 text-white p-8 space-y-4">
        <h3 className="font-oswald text-2xl uppercase">Complete Your Experience</h3>
        <p className="text-neutral-300 max-w-md mx-auto">
          Reserve a table at <strong>Vineyard</strong> during your stay and enjoy sunset wine tasting on our terrace.
        </p>
        <Link href="/book">
          <Button variant="ghost" className="border-white text-white hover:bg-white hover:text-neutral-900 mt-4">
            Reserve a Table at Vineyard
          </Button>
        </Link>
      </div>

      <div className="pt-8">
        <Link href="/">
          <Button size="lg">Return to Homepage</Button>
        </Link>
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

      <Button
        onClick={handleSubmit(onSubmit)}
        className="w-full mt-8"
      >
        Reserve Table
      </Button>
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
        <p className="text-neutral-500 mb-2">For groups larger than 8, or private events.</p>
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

      <Button
        onClick={handleSubmit(onSubmit)}
        className="w-full mt-8"
      >
        Request Event
      </Button>
    </motion.div>
  );
}
