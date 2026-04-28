import { motion } from "motion/react";
import { useState } from "react";

type TabType = "upcoming" | "new" | "previous";

// VARIATION 1: Underlined Tabs (Minimal & Clean)
export function EventsSubmenuVariation1() {
  const [activeTab, setActiveTab] = useState<TabType>("upcoming");

  return (
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
              layoutId="underline-v1"
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
              layoutId="underline-v1"
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
              layoutId="underline-v1"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900"
            />
          )}
        </button>
      </div>
    </nav>
  );
}

// VARIATION 2: Pill/Capsule Buttons (Modern & Friendly)
export function EventsSubmenuVariation2() {
  const [activeTab, setActiveTab] = useState<TabType>("upcoming");

  return (
    <nav className="mb-16">
      <div className="inline-flex gap-3 bg-neutral-100 p-1.5 rounded-full">
        <button
          onClick={() => setActiveTab("upcoming")}
          className="relative px-6 py-3 font-oswald uppercase tracking-widest text-xs transition-all rounded-full"
          style={{
            backgroundColor: activeTab === "upcoming" ? "#000" : "transparent",
            color: activeTab === "upcoming" ? "#fff" : "#666"
          }}
        >
          Upcoming Events
        </button>
        
        <button
          onClick={() => setActiveTab("new")}
          className="relative px-6 py-3 font-oswald uppercase tracking-widest text-xs transition-all rounded-full"
          style={{
            backgroundColor: activeTab === "new" ? "#000" : "transparent",
            color: activeTab === "new" ? "#fff" : "#666"
          }}
        >
          What's New
        </button>
        
        <button
          onClick={() => setActiveTab("previous")}
          className="relative px-6 py-3 font-oswald uppercase tracking-widest text-xs transition-all rounded-full"
          style={{
            backgroundColor: activeTab === "previous" ? "#000" : "transparent",
            color: activeTab === "previous" ? "#fff" : "#666"
          }}
        >
          Previous Events
        </button>
      </div>
    </nav>
  );
}

// VARIATION 3: Vertical Separator Lines (Editorial Style)
export function EventsSubmenuVariation3() {
  const [activeTab, setActiveTab] = useState<TabType>("upcoming");

  return (
    <nav className="mb-16">
      <div className="flex items-center gap-6">
        <button
          onClick={() => setActiveTab("upcoming")}
          className="font-oswald uppercase tracking-widest text-sm transition-all"
          style={{
            color: activeTab === "upcoming" ? "#000" : "#ccc",
            fontWeight: activeTab === "upcoming" ? 600 : 400
          }}
        >
          Upcoming Events
        </button>
        
        <div className="w-px h-4 bg-neutral-300" />
        
        <button
          onClick={() => setActiveTab("new")}
          className="font-oswald uppercase tracking-widest text-sm transition-all"
          style={{
            color: activeTab === "new" ? "#000" : "#ccc",
            fontWeight: activeTab === "new" ? 600 : 400
          }}
        >
          What's New
        </button>
        
        <div className="w-px h-4 bg-neutral-300" />
        
        <button
          onClick={() => setActiveTab("previous")}
          className="font-oswald uppercase tracking-widest text-sm transition-all"
          style={{
            color: activeTab === "previous" ? "#000" : "#ccc",
            fontWeight: activeTab === "previous" ? 600 : 400
          }}
        >
          Previous Events
        </button>
      </div>
    </nav>
  );
}
