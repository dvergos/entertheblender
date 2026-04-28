'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, Instagram, MessageCircle } from "lucide-react";

export function FloatingContactButton() {
  const [isExpanded, setIsExpanded] = useState(false);

  const contactOptions = [
    {
      icon: Mail,
      label: "Email Us",
      href: "mailto:blender@entertheblender.gr",
      color: "#D4B5E8",
      delay: 0.1,
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      href: "https://wa.me/302105223954",
      color: "#10B981",
      delay: 0.15,
    },
    {
      icon: Phone,
      label: "Call Us",
      href: "tel:+302105223954",
      color: "#FF69B4",
      delay: 0.2,
    },
    {
      icon: Instagram,
      label: "Instagram",
      href: "https://instagram.com/entertheblender",
      color: "#7C3AED",
      delay: 0.25,
    },
  ];

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-16 right-0 flex flex-col gap-2 mb-2"
          >
            {contactOptions.map((option) => (
              <motion.a
                key={option.label}
                href={option.href}
                target={option.href.startsWith("http") ? "_blank" : undefined}
                rel={option.href.startsWith("http") ? "noopener noreferrer" : undefined}
                initial={{ scale: 0, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0, opacity: 0, y: 20 }}
                transition={{
                  delay: option.delay,
                  type: "spring",
                  stiffness: 260,
                  damping: 20
                }}
                className="group flex items-center gap-2 bg-white hover:bg-neutral-50 px-3 py-2 rounded-full shadow-lg border border-neutral-200 transition-all"
                style={{
                  minWidth: "140px",
                }}
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center transition-all"
                  style={{ backgroundColor: option.color }}
                >
                  <option.icon className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="font-medium text-xs text-neutral-900 uppercase tracking-wide">
                  {option.label}
                </span>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Button */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-12 h-12 rounded-full bg-neutral-900 hover:bg-neutral-700 text-white shadow-2xl flex items-center justify-center transition-all border-2 border-white"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: isExpanded ? 90 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Phone className="w-5 h-5" />
      </motion.button>
    </div>
  );
}
