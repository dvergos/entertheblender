import { useState } from "react";
import { 
  EventsSubmenuVariation1, 
  EventsSubmenuVariation2, 
  EventsSubmenuVariation3 
} from "../components/EventsSubmenuVariations";

export function EventsSubmenuShowcase() {
  const [activeVariation, setActiveVariation] = useState(1);

  return (
    <div className="bg-neutral-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="font-oswald text-5xl uppercase mb-4 text-center">Events Submenu Variations</h1>
        <p className="text-center text-neutral-600 mb-12 max-w-2xl mx-auto">
          Choose your preferred submenu design for filtering events: Upcoming Events, What's New, and Previous Events.
        </p>

        {/* Variation Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {[1, 2, 3].map((num) => (
            <button
              key={num}
              onClick={() => setActiveVariation(num)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeVariation === num
                  ? "bg-neutral-900 text-white"
                  : "bg-white text-neutral-700 border border-neutral-200 hover:border-neutral-400"
              }`}
            >
              Variation {num}
            </button>
          ))}
        </div>

        {/* Preview Container */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 bg-neutral-100 border-b border-neutral-200">
            <p className="text-xs uppercase tracking-widest text-neutral-500 text-center">Preview</p>
          </div>

          {/* VARIATION 1: Underlined Tabs */}
          {activeVariation === 1 && (
            <div className="p-8">
              <h3 className="font-oswald text-2xl uppercase mb-6 text-neutral-900">1. Underlined Tabs (Minimal & Clean)</h3>
              <EventsSubmenuVariation1 />
              <div className="mt-8 text-sm text-neutral-600">
                <p><strong>Style:</strong> Clean underline animates beneath the active tab. Very minimal and editorial.</p>
                <p className="mt-2"><strong>Best for:</strong> Maintaining The Blender's minimal aesthetic with subtle animation.</p>
              </div>
            </div>
          )}

          {/* VARIATION 2: Pill Buttons */}
          {activeVariation === 2 && (
            <div className="p-8">
              <h3 className="font-oswald text-2xl uppercase mb-6 text-neutral-900">2. Pill/Capsule Buttons (Modern & Friendly)</h3>
              <EventsSubmenuVariation2 />
              <div className="mt-8 text-sm text-neutral-600">
                <p><strong>Style:</strong> Rounded pill buttons in a contained group. Active state has inverted colors.</p>
                <p className="mt-2"><strong>Best for:</strong> Modern, approachable feel with clear visual distinction.</p>
              </div>
            </div>
          )}

          {/* VARIATION 3: Vertical Separators */}
          {activeVariation === 3 && (
            <div className="p-8">
              <h3 className="font-oswald text-2xl uppercase mb-6 text-neutral-900">3. Vertical Separator Lines (Editorial Style)</h3>
              <EventsSubmenuVariation3 />
              <div className="mt-8 text-sm text-neutral-600">
                <p><strong>Style:</strong> Inline buttons separated by vertical lines. Active state uses bold weight.</p>
                <p className="mt-2"><strong>Best for:</strong> Editorial, magazine-like aesthetic that's very minimal.</p>
              </div>
            </div>
          )}

          {/* Description */}
          <div className="p-6 bg-neutral-50 border-t border-neutral-200">
            <div className="text-sm text-neutral-600">
              {activeVariation === 1 && (
                <div>
                  <p className="mb-2"><strong>Key Features:</strong></p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Animated underline with smooth layout transitions</li>
                    <li>Minimal design matches The Blender's aesthetic</li>
                    <li>Clear visual hierarchy with color shifts</li>
                  </ul>
                </div>
              )}
              {activeVariation === 2 && (
                <div>
                  <p className="mb-2"><strong>Key Features:</strong></p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Contained design with rounded background</li>
                    <li>Strong contrast for active state (black/white)</li>
                    <li>Modern, friendly appearance</li>
                  </ul>
                </div>
              )}
              {activeVariation === 3 && (
                <div>
                  <p className="mb-2"><strong>Key Features:</strong></p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Editorial style with vertical dividers</li>
                    <li>Uses font weight to indicate active state</li>
                    <li>Very clean, linear layout</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Implementation Note */}
        <div className="mt-12 p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-oswald uppercase text-lg mb-2 text-blue-900">Implementation Note</h3>
          <p className="text-sm text-blue-800">
            Choose your preferred variation and I'll integrate it into the Events page. All variations include smooth animations and maintain accessibility standards.
          </p>
        </div>
      </div>
    </div>
  );
}
