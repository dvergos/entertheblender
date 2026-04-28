'use client';

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Save, X, Image as ImageIcon } from "lucide-react";

type EventCategory = "upcoming" | "new" | "previous";
type EventLocation = "Vineyard" | "Basket" | "Orchard";

interface Event {
  id: string;
  title: string;
  date: string;
  dateShort: string;
  location: EventLocation;
  venue: string;
  desc: string;
  image: string;
  category: EventCategory;
  featured: boolean;
}

const INITIAL_EVENTS: Event[] = [
  {
    id: "1",
    title: "JAZZ JAM with Konstantinos Stouraitis",
    date: "Monday, 24 Mar",
    dateShort: "24/03",
    location: "Vineyard",
    venue: "At The Blender Terrace",
    desc: "Join us for an intimate evening of improvisation and soul. Konstantinos brings his signature sound to our terrace.",
    image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800",
    category: "upcoming",
    featured: true
  },
  {
    id: "2",
    title: "JCMC Open Mic with guests from Athens and Berlin",
    date: "Thursday, 27 Mar",
    dateShort: "27/03",
    location: "Vineyard",
    venue: "At The Blender Terrace",
    desc: "An open stage connecting artists across borders. Raw voices, honest stories, natural wine.",
    image: "https://images.unsplash.com/photo-1766509825610-001b72477269?w=800",
    category: "upcoming",
    featured: false
  }
];

export default function AdminEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Event>>({
    title: "",
    date: "",
    dateShort: "",
    location: "Vineyard",
    venue: "",
    desc: "",
    image: "",
    category: "upcoming",
    featured: false
  });

  // Load events from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("blender_events");
    if (stored) {
      setEvents(JSON.parse(stored));
    } else {
      setEvents(INITIAL_EVENTS);
      localStorage.setItem("blender_events", JSON.stringify(INITIAL_EVENTS));
    }
  }, []);

  // Save events to localStorage whenever they change
  useEffect(() => {
    if (events.length > 0) {
      localStorage.setItem("blender_events", JSON.stringify(events));
    }
  }, [events]);

  const handleAdd = () => {
    if (!formData.title || !formData.date || !formData.dateShort) {
      alert("Please fill in required fields: Title, Date, and Short Date");
      return;
    }

    const newEvent: Event = {
      id: Date.now().toString(),
      title: formData.title || "",
      date: formData.date || "",
      dateShort: formData.dateShort || "",
      location: formData.location || "Vineyard",
      venue: formData.venue || "",
      desc: formData.desc || "",
      image: formData.image || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800",
      category: formData.category || "upcoming",
      featured: formData.featured || false
    };

    setEvents([...events, newEvent]);
    resetForm();
  };

  const handleEdit = (event: Event) => {
    setEditingId(event.id);
    setFormData(event);
    setIsAddingNew(true);
  };

  const handleUpdate = () => {
    if (!formData.title || !formData.date || !formData.dateShort) {
      alert("Please fill in required fields: Title, Date, and Short Date");
      return;
    }

    setEvents(events.map(event => 
      event.id === editingId 
        ? { ...event, ...formData } as Event
        : event
    ));
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this event?")) {
      setEvents(events.filter(event => event.id !== id));
    }
  };

  const resetForm = () => {
    setIsAddingNew(false);
    setEditingId(null);
    setFormData({
      title: "",
      date: "",
      dateShort: "",
      location: "Vineyard",
      venue: "",
      desc: "",
      image: "",
      category: "upcoming",
      featured: false
    });
  };

  return (
    <div className="bg-neutral-50 min-h-screen pb-24">
      <div className="pt-12 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12 border-b border-neutral-900 pb-6">
          <div>
            <h1 className="font-oswald text-5xl md:text-7xl uppercase mb-2">Event Manager</h1>
            <p className="text-sm text-neutral-500 font-inter">Add, edit, and manage your events</p>
          </div>
          {!isAddingNew && (
            <button
              onClick={() => setIsAddingNew(true)}
              className="flex items-center gap-2 bg-neutral-900 text-white px-6 py-3 font-oswald uppercase tracking-widest text-sm hover:bg-neutral-800 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Event
            </button>
          )}
        </div>

        {/* Add/Edit Form */}
        {isAddingNew && (
          <div className="bg-white border border-neutral-200 p-8 mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-oswald text-2xl uppercase">
                {editingId ? "Edit Event" : "Add New Event"}
              </h2>
              <button
                onClick={resetForm}
                className="text-neutral-400 hover:text-neutral-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div className="md:col-span-2">
                <label className="block text-xs uppercase tracking-widest font-oswald mb-2 text-neutral-700">
                  Event Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full border border-neutral-300 px-4 py-3 focus:outline-none focus:border-neutral-900 transition-colors font-inter"
                  placeholder="e.g. JAZZ JAM with Konstantinos Stouraitis"
                />
              </div>

              {/* Date (Full) */}
              <div>
                <label className="block text-xs uppercase tracking-widest font-oswald mb-2 text-neutral-700">
                  Date (Full Format) *
                </label>
                <input
                  type="text"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full border border-neutral-300 px-4 py-3 focus:outline-none focus:border-neutral-900 transition-colors font-inter"
                  placeholder="e.g. Monday, 24 Mar"
                />
              </div>

              {/* Date (Short) */}
              <div>
                <label className="block text-xs uppercase tracking-widest font-oswald mb-2 text-neutral-700">
                  Date (Short Format) *
                </label>
                <input
                  type="text"
                  value={formData.dateShort}
                  onChange={(e) => setFormData({ ...formData, dateShort: e.target.value })}
                  className="w-full border border-neutral-300 px-4 py-3 focus:outline-none focus:border-neutral-900 transition-colors font-inter"
                  placeholder="e.g. 24/03"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs uppercase tracking-widest font-oswald mb-2 text-neutral-700">
                  Location
                </label>
                <select
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value as EventLocation })}
                  className="w-full border border-neutral-300 px-4 py-3 focus:outline-none focus:border-neutral-900 transition-colors font-inter bg-white"
                >
                  <option value="Vineyard">Vineyard</option>
                  <option value="Basket">Basket</option>
                  <option value="Orchard">Orchard</option>
                </select>
              </div>

              {/* Venue */}
              <div>
                <label className="block text-xs uppercase tracking-widest font-oswald mb-2 text-neutral-700">
                  Venue Details
                </label>
                <input
                  type="text"
                  value={formData.venue}
                  onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                  className="w-full border border-neutral-300 px-4 py-3 focus:outline-none focus:border-neutral-900 transition-colors font-inter"
                  placeholder="e.g. At The Blender Terrace"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs uppercase tracking-widest font-oswald mb-2 text-neutral-700">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as EventCategory })}
                  className="w-full border border-neutral-300 px-4 py-3 focus:outline-none focus:border-neutral-900 transition-colors font-inter bg-white"
                >
                  <option value="upcoming">Upcoming Events</option>
                  <option value="new">What's New</option>
                  <option value="previous">Previous Events</option>
                </select>
              </div>

              {/* Featured */}
              <div className="flex items-center gap-3 pt-8">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-5 h-5 border-neutral-300"
                />
                <label htmlFor="featured" className="text-xs uppercase tracking-widest font-oswald text-neutral-700 cursor-pointer">
                  Featured Event
                </label>
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-xs uppercase tracking-widest font-oswald mb-2 text-neutral-700">
                  Description
                </label>
                <textarea
                  value={formData.desc}
                  onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                  rows={3}
                  className="w-full border border-neutral-300 px-4 py-3 focus:outline-none focus:border-neutral-900 transition-colors font-inter resize-none"
                  placeholder="Brief description of the event..."
                />
              </div>

              {/* Image URL */}
              <div className="md:col-span-2">
                <label className="block text-xs uppercase tracking-widest font-oswald mb-2 text-neutral-700">
                  Image URL
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="flex-1 border border-neutral-300 px-4 py-3 focus:outline-none focus:border-neutral-900 transition-colors font-inter"
                    placeholder="https://images.unsplash.com/..."
                  />
                  <button
                    onClick={() => window.open('https://unsplash.com', '_blank')}
                    className="flex items-center gap-2 border border-neutral-300 px-4 py-3 hover:border-neutral-900 transition-colors text-sm font-oswald uppercase tracking-widest"
                  >
                    <ImageIcon className="w-4 h-4" />
                    Find Image
                  </button>
                </div>
                {formData.image && (
                  <div className="mt-4">
                    <img src={formData.image} alt="Preview" className="w-full h-48 object-cover border border-neutral-200" />
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-8 pt-6 border-t border-neutral-200">
              <button
                onClick={editingId ? handleUpdate : handleAdd}
                className="flex items-center gap-2 bg-neutral-900 text-white px-8 py-3 font-oswald uppercase tracking-widest text-sm hover:bg-neutral-800 transition-colors"
              >
                <Save className="w-4 h-4" />
                {editingId ? "Update Event" : "Add Event"}
              </button>
              <button
                onClick={resetForm}
                className="border border-neutral-300 px-8 py-3 font-oswald uppercase tracking-widest text-sm hover:border-neutral-900 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Events List */}
        <div className="space-y-6">
          <h2 className="font-oswald text-2xl uppercase mb-6">All Events ({events.length})</h2>
          
          {events.length === 0 ? (
            <div className="text-center py-24 border border-dashed border-neutral-300">
              <p className="text-neutral-400 font-inter">No events yet. Add your first event above.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="bg-white border border-neutral-200 p-6 flex gap-6 hover:border-neutral-900 transition-colors"
                >
                  {/* Event Image */}
                  <div className="w-32 h-32 bg-neutral-200 shrink-0 overflow-hidden">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                  </div>

                  {/* Event Details */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-oswald text-xl uppercase mb-1">{event.title}</h3>
                        <p className="text-xs text-neutral-500 font-inter uppercase tracking-widest">
                          {event.date} • {event.location} • {event.category}
                          {event.featured && <span className="ml-2 bg-neutral-900 text-white px-2 py-0.5">FEATURED</span>}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(event)}
                          className="p-2 hover:bg-neutral-100 transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4 text-neutral-600" />
                        </button>
                        <button
                          onClick={() => handleDelete(event.id)}
                          className="p-2 hover:bg-red-50 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-neutral-600 font-inter line-clamp-2">{event.desc}</p>
                    <p className="text-xs text-neutral-400 font-inter mt-2">{event.venue}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="mt-12 border-l-2 border-neutral-900 pl-6 py-4 bg-neutral-100">
          <p className="text-sm font-inter text-neutral-700 mb-2">
            <strong className="font-oswald uppercase tracking-wider">Note:</strong> Events are stored locally in your browser. 
            To persist changes across devices, consider connecting a database solution.
          </p>
          <p className="text-xs text-neutral-500 font-inter">
            Tip: Use Unsplash for high-quality, copyright-free event images. Click "Find Image" to search.
          </p>
        </div>
      </div>
    </div>
  );
}
