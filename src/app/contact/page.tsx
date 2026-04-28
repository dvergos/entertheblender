'use client';

import { motion } from "motion/react";
import { Button } from "../components/ui/button";
import { Instagram, Facebook, MessageCircle } from "lucide-react";

export default function Contact() {
  return (
    <div className="bg-neutral-50 min-h-screen pb-24">
      <div className="pt-12 px-6 md:px-12 max-w-7xl mx-auto">
        <h1 className="font-oswald text-5xl md:text-7xl uppercase mb-16">Ways to find us</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">

          {/* INFO */}
          <div className="space-y-12">
            <div>
              <h3 className="font-oswald text-2xl uppercase mb-4">Visit Us</h3>
              <p className="font-inter font-light text-neutral-600 leading-relaxed">
                Odisseos 14<br/>
                Athens 104 37, Greece
              </p>
              <a href="https://maps.google.com/?q=Odisseos+14,+Athens+104+37,+Greece" target="_blank" rel="noopener noreferrer" className="font-inter text-sm border-b border-neutral-900 pb-0.5 mt-2 inline-block">Get Directions</a>
            </div>

            <div>
              <h3 className="font-oswald text-2xl uppercase mb-4">Talk to Us</h3>
              <p className="font-inter font-light text-neutral-600 leading-relaxed">
                <a href="mailto:blender@entertheblender.gr" className="hover:text-neutral-900 transition-colors">
                  blender@entertheblender.gr
                </a>
                <br/>
              </p>
              <div className="flex items-center gap-3 mt-2">
                <span className="font-inter font-light text-neutral-600">+30 210 522 3954</span>
                <a
                  href="https://wa.me/302105223954"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-500 hover:opacity-70 transition-opacity"
                  aria-label="WhatsApp"
                >
                  <MessageCircle size={20} strokeWidth={2.5} />
                </a>
                <a
                  href="viber://chat?number=%2B302105223954"
                  className="text-purple-500 hover:opacity-70 transition-opacity"
                  aria-label="Viber"
                >
                  <MessageCircle size={20} />
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-oswald text-2xl uppercase mb-4">Follow</h3>
              <div className="flex gap-6">
                <a href="https://www.instagram.com/entertheblender" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-inter text-sm hover:text-neutral-500 transition-colors">
                  <Instagram size={20} />
                  <span>Instagram</span>
                </a>
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-inter text-sm hover:text-neutral-500 transition-colors">
                  <Facebook size={20} />
                  <span>Facebook</span>
                </a>
              </div>
            </div>

            <div className="w-full h-64 bg-neutral-200 mt-8 relative group cursor-pointer overflow-hidden">
              {/* Google Maps Embed */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3144.9837584944886!2d23.717871076518625!3d37.98585267191562!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a1bd433413c359%3A0x9c3e3e3e3e3e3e3e!2sOdisseos%2014%2C%20Athina%20104%2037%2C%20Greece!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="The Blender Location"
              ></iframe>
            </div>
          </div>

          {/* FORM */}
          <div className="bg-white p-8 md:p-12 border border-neutral-100">
            <h3 className="font-oswald text-2xl uppercase mb-8">Send a Message</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase font-oswald tracking-widest text-neutral-500">First Name</label>
                  <input type="text" className="w-full border-b border-neutral-300 py-2 focus:outline-none focus:border-neutral-900 transition-colors bg-transparent" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase font-oswald tracking-widest text-neutral-500">Last Name</label>
                  <input type="text" className="w-full border-b border-neutral-300 py-2 focus:outline-none focus:border-neutral-900 transition-colors bg-transparent" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase font-oswald tracking-widest text-neutral-500">Email</label>
                <input type="email" className="w-full border-b border-neutral-300 py-2 focus:outline-none focus:border-neutral-900 transition-colors bg-transparent" />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase font-oswald tracking-widest text-neutral-500">Message</label>
                <textarea rows={4} className="w-full border-b border-neutral-300 py-2 focus:outline-none focus:border-neutral-900 transition-colors bg-transparent resize-none"></textarea>
              </div>

              <div className="pt-6">
                <Button variant="default" size="lg" className="w-full">
                  Send Message
                </Button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
