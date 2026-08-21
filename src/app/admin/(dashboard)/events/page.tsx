'use client';

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Save, X, Image as ImageIcon, RefreshCw, Phone, ExternalLink, Ticket, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { createClient } from "@/lib/supabase/client";

type EventLocation = "Vineyard" | "Basket" | "Orchard";
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
  recurring_end_date: string | null;
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
  location: EventLocation;
  venue: string;
  desc: string;
  image: string;
  featured: boolean;
  isRecurring: boolean;
  recurringWeeks: number;
  recurringEndDate: string;
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
    location: (row.location as EventLocation) ?? "Vineyard",
    venue: row.venue ?? "",
    desc: row.description ?? "",
    image: row.image ?? "",
    featured: row.featured ?? false,
    isRecurring: row.is_recurring ?? false,
    recurringWeeks: row.recurring_weeks ?? 1,
    recurringEndDate: row.recurring_end_date ?? "",
    isFree: row.is_free ?? false,
    cost: row.cost ?? "",
    bookingType: (row.booking_type as BookingType) ?? "none",
    bookingUrl: row.booking_url ?? "",
  };
}

function eventToRow(evt: Omit<BlenderEvent, 'id'>) {
  return {
    title: evt.title,
    date: evt.date,
    date_short: evt.dateShort,
    time_start: evt.timeStart,
    time_end: evt.timeEnd || null,
    location: evt.location,
    venue: evt.venue,
    description: evt.desc,
    image: evt.image,
    featured: evt.featured,
    is_recurring: evt.isRecurring,
    recurring_weeks: evt.recurringWeeks,
    recurring_end_date: evt.isRecurring && evt.recurringEndDate ? evt.recurringEndDate : null,
    is_free: evt.isFree,
    cost: evt.isFree ? "Free" : evt.cost,
    booking_type: evt.bookingType,
    booking_url: evt.bookingType === "external" ? evt.bookingUrl : null,
  };
}

const EMPTY_FORM: Partial<BlenderEvent> = {
  title: "",
  date: "",
  dateShort: "",
  timeStart: "",
  timeEnd: "",
  location: "Vineyard",
  venue: "At The Blender Terrace",
  desc: "",
  image: "",
  featured: false,
  isRecurring: false,
  recurringWeeks: 1,
  recurringEndDate: "",
  isFree: false,
  cost: "",
  bookingType: "none",
  bookingUrl: "",
};

const VENUE_PHONE = "+30 210 522 3954";

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-widest font-oswald mb-2 text-neutral-700">
        {label}{required && " *"}
      </label>
      {children}
    </div>
  );
}

const inputCls = "w-full border border-neutral-300 px-4 py-3 focus:outline-none focus:border-neutral-900 transition-colors font-inter text-sm bg-white";

export default function AdminEvents() {
  const [events, setEvents] = useState<BlenderEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<BlenderEvent>>(EMPTY_FORM);

  const set = (patch: Partial<BlenderEvent>) => setForm((f) => ({ ...f, ...patch }));

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase
      .from("events")
      .select("*")
      .order("date", { ascending: false });
    if (data) setEvents((data as EventRow[]).map(rowToEvent));
    setLoading(false);
  };

  const handleDateChange = (isoDate: string) => {
    const short = isoDate ? format(new Date(isoDate + "T00:00:00"), "dd/MM") : "";
    set({ date: isoDate, dateShort: short });
  };

  const validate = () => {
    if (!form.title?.trim()) { alert("Event title is required."); return false; }
    if (!form.date) { alert("Event date is required."); return false; }
    if (!form.timeStart?.trim()) { alert("Start time is required."); return false; }
    if (!form.isFree && !form.cost?.trim()) { alert("Cost is required (or tick Free)."); return false; }
    if (form.bookingType === "external" && !form.bookingUrl?.trim()) { alert("Please enter the booking link URL."); return false; }
    return true;
  };

  const buildEventData = (): Omit<BlenderEvent, 'id'> => ({
    title: form.title?.trim() ?? "",
    date: form.date ?? "",
    dateShort: form.dateShort ?? "",
    timeStart: form.timeStart?.trim() ?? "",
    timeEnd: form.timeEnd?.trim() ?? "",
    location: form.location ?? "Vineyard",
    venue: form.venue?.trim() ?? "",
    desc: form.desc?.trim() ?? "",
    image: form.image?.trim() || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800",
    featured: form.featured ?? false,
    isRecurring: form.isRecurring ?? false,
    recurringWeeks: form.recurringWeeks ?? 1,
    recurringEndDate: form.isRecurring ? (form.recurringEndDate ?? "") : "",
    isFree: form.isFree ?? false,
    cost: form.isFree ? "Free" : (form.cost?.trim() ?? ""),
    bookingType: form.bookingType ?? "none",
    bookingUrl: form.bookingType === "external" ? (form.bookingUrl?.trim() ?? "") : "",
  });

  const handleAdd = async () => {
    if (!validate()) return;
    setSaving(true);
    const supabase = createClient();
    const { data } = await supabase
      .from("events")
      .insert(eventToRow(buildEventData()))
      .select()
      .single();
    if (data) setEvents([rowToEvent(data as EventRow), ...events]);
    setSaving(false);
    resetForm();
  };

  const handleUpdate = async () => {
    if (!validate()) return;
    setSaving(true);
    const supabase = createClient();
    const { data } = await supabase
      .from("events")
      .update(eventToRow(buildEventData()))
      .eq("id", editingId!)
      .select()
      .single();
    if (data) setEvents(events.map((e) => e.id === editingId ? rowToEvent(data as EventRow) : e));
    setSaving(false);
    resetForm();
  };

  const handleEdit = (event: BlenderEvent) => {
    setEditingId(event.id);
    setForm({ ...EMPTY_FORM, ...event });
    setIsAddingNew(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this event?")) return;
    const supabase = createClient();
    await supabase.from("events").delete().eq("id", id);
    setEvents(events.filter((e) => e.id !== id));
  };

  const resetForm = () => {
    setIsAddingNew(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
  };

  const formatDisplayDate = (isoDate: string) => {
    if (!isoDate) return "";
    try { return format(new Date(isoDate + "T00:00:00"), "EEE d MMM yyyy"); } catch { return isoDate; }
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

        {/* ── FORM ──────────────────────────────────────────────────────────── */}
        {isAddingNew && (
          <div className="bg-white border border-neutral-200 p-8 mb-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-oswald text-2xl uppercase">
                {editingId ? "Edit Event" : "Add New Event"}
              </h2>
              <button onClick={resetForm} className="text-neutral-400 hover:text-neutral-900">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">

              {/* ── Section: Event Details ──────────────────────────────────── */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Title */}
                <div className="md:col-span-2">
                  <Field label="Event Title" required>
                    <input
                      type="text"
                      value={form.title ?? ""}
                      onChange={(e) => set({ title: e.target.value })}
                      className={inputCls}
                      placeholder="e.g. JAZZ JAM with Konstantinos Stouraitis"
                    />
                  </Field>
                </div>

                {/* Date picker */}
                <Field label="Date" required>
                  <input
                    type="date"
                    value={form.date ?? ""}
                    onChange={(e) => handleDateChange(e.target.value)}
                    className={inputCls}
                  />
                  {form.dateShort && (
                    <p className="text-xs text-neutral-400 font-inter mt-1">Short format: {form.dateShort}</p>
                  )}
                </Field>

                {/* Location */}
                <Field label="Location">
                  <select
                    value={form.location ?? "Vineyard"}
                    onChange={(e) => set({ location: e.target.value as EventLocation })}
                    className={inputCls}
                  >
                    <option value="Vineyard">Vineyard</option>
                    <option value="Basket">Basket</option>
                    <option value="Orchard">Orchard</option>
                  </select>
                </Field>

                {/* Start time */}
                <Field label="Start Time" required>
                  <input
                    type="text"
                    value={form.timeStart ?? ""}
                    onChange={(e) => set({ timeStart: e.target.value })}
                    className={inputCls}
                    placeholder="e.g. 21:00"
                    maxLength={5}
                  />
                </Field>

                {/* End time */}
                <Field label="End Time">
                  <input
                    type="text"
                    value={form.timeEnd ?? ""}
                    onChange={(e) => set({ timeEnd: e.target.value })}
                    className={inputCls}
                    placeholder="e.g. 23:00 (optional)"
                    maxLength={5}
                  />
                </Field>

                {/* Venue */}
                <Field label="Venue Details">
                  <input
                    type="text"
                    value={form.venue ?? ""}
                    onChange={(e) => set({ venue: e.target.value })}
                    className={inputCls}
                    placeholder="e.g. At The Blender Terrace"
                  />
                </Field>

              </div>

              {/* ── Section: Recurring ─────────────────────────────────────── */}
              <div className="border border-neutral-200 p-5 space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isRecurring"
                    checked={form.isRecurring ?? false}
                    onChange={(e) => set({ isRecurring: e.target.checked })}
                    className="w-5 h-5 accent-neutral-900 cursor-pointer"
                  />
                  <label htmlFor="isRecurring" className="flex items-center gap-2 text-sm font-oswald uppercase tracking-widest text-neutral-700 cursor-pointer">
                    <RefreshCw className="w-4 h-4" />
                    Recurring Event
                  </label>
                </div>

                {form.isRecurring && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-neutral-100">
                    <Field label="Repeat every X weeks" required>
                      <div className="flex items-center gap-3">
                        <input
                          type="number"
                          min={1}
                          max={52}
                          value={form.recurringWeeks ?? 1}
                          onChange={(e) => set({ recurringWeeks: parseInt(e.target.value) || 1 })}
                          className="w-24 border border-neutral-300 px-4 py-3 focus:outline-none focus:border-neutral-900 font-inter text-sm text-center"
                        />
                        <span className="text-sm font-inter text-neutral-500">
                          {form.recurringWeeks === 1 ? "week" : "weeks"}
                        </span>
                      </div>
                    </Field>
                    <Field label="Recurring Until" required>
                      <input
                        type="date"
                        value={form.recurringEndDate ?? ""}
                        onChange={(e) => set({ recurringEndDate: e.target.value })}
                        className={inputCls}
                      />
                    </Field>
                  </div>
                )}
              </div>

              {/* ── Section: Cost ─────────────────────────────────────────── */}
              <div className="border border-neutral-200 p-5 space-y-4">
                <p className="text-xs font-oswald uppercase tracking-widest text-neutral-500">Cost & Tickets</p>

                {/* Free checkbox */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isFree"
                    checked={form.isFree ?? false}
                    onChange={(e) => set({ isFree: e.target.checked, cost: e.target.checked ? "Free" : "" })}
                    className="w-5 h-5 accent-neutral-900 cursor-pointer"
                  />
                  <label htmlFor="isFree" className="text-sm font-oswald uppercase tracking-widest text-neutral-700 cursor-pointer">
                    Free Event
                  </label>
                </div>

                {/* Cost input */}
                <div className={form.isFree ? "opacity-40 pointer-events-none" : ""}>
                  <Field label="Cost" required={!form.isFree}>
                    <div className="flex items-stretch">
                      <span className="flex items-center px-4 border border-r-0 border-neutral-300 bg-neutral-100 text-neutral-600 font-inter text-sm font-medium">
                        €
                      </span>
                      <input
                        type="text"
                        value={form.isFree ? "Free" : (form.cost ?? "")}
                        onChange={(e) => set({ cost: e.target.value })}
                        disabled={form.isFree}
                        className="flex-1 border border-neutral-300 px-4 py-3 focus:outline-none focus:border-neutral-900 transition-colors font-inter text-sm"
                        placeholder="e.g. 5 or 5–10"
                      />
                    </div>
                  </Field>
                </div>

                {/* Booking type */}
                <div className="space-y-3 pt-2 border-t border-neutral-100">
                  <p className="text-xs font-oswald uppercase tracking-widest text-neutral-500 flex items-center gap-2">
                    <Ticket className="w-3.5 h-3.5" />
                    Booking / Ticket Options
                  </p>

                  <div className="space-y-2">
                    {/* None */}
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="bookingType"
                        value="none"
                        checked={form.bookingType === "none"}
                        onChange={() => set({ bookingType: "none", bookingUrl: "" })}
                        className="accent-neutral-900"
                      />
                      <span className="text-sm font-inter text-neutral-700 group-hover:text-neutral-900">
                        No booking required — just show up
                      </span>
                    </label>

                    {/* External link */}
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="bookingType"
                        value="external"
                        checked={form.bookingType === "external"}
                        onChange={() => set({ bookingType: "external" })}
                        className="accent-neutral-900 mt-0.5"
                      />
                      <div className="flex-1">
                        <span className="flex items-center gap-1.5 text-sm font-inter text-neutral-700 group-hover:text-neutral-900">
                          <ExternalLink className="w-3.5 h-3.5" />
                          Buy tickets online
                        </span>
                        {form.bookingType === "external" && (
                          <input
                            type="url"
                            value={form.bookingUrl ?? ""}
                            onChange={(e) => set({ bookingUrl: e.target.value })}
                            className="mt-2 w-full border border-neutral-300 px-4 py-2.5 focus:outline-none focus:border-neutral-900 font-inter text-sm"
                            placeholder="https://tickets.example.com/event"
                            autoFocus
                          />
                        )}
                      </div>
                    </label>

                    {/* Call to book */}
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="bookingType"
                        value="call"
                        checked={form.bookingType === "call"}
                        onChange={() => set({ bookingType: "call", bookingUrl: "" })}
                        className="accent-neutral-900"
                      />
                      <span className="flex items-center gap-1.5 text-sm font-inter text-neutral-700 group-hover:text-neutral-900">
                        <Phone className="w-3.5 h-3.5" />
                        Call to book — <span className="text-neutral-500 font-medium">{VENUE_PHONE}</span>
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* ── Section: Description + Image ───────────────────────────── */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="md:col-span-2">
                  <Field label="Description">
                    <textarea
                      value={form.desc ?? ""}
                      onChange={(e) => set({ desc: e.target.value })}
                      rows={3}
                      className={`${inputCls} resize-none`}
                      placeholder="Brief description of the event..."
                    />
                  </Field>
                </div>

                <div className="md:col-span-2">
                  <Field label="Image URL">
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={form.image ?? ""}
                        onChange={(e) => set({ image: e.target.value })}
                        className={`${inputCls} flex-1`}
                        placeholder="https://images.unsplash.com/..."
                      />
                      <button
                        type="button"
                        onClick={() => window.open("https://unsplash.com", "_blank")}
                        className="flex items-center gap-2 border border-neutral-300 px-4 py-3 hover:border-neutral-900 transition-colors text-sm font-oswald uppercase tracking-widest whitespace-nowrap"
                      >
                        <ImageIcon className="w-4 h-4" />
                        Find Image
                      </button>
                    </div>
                    {form.image && (
                      <img src={form.image} alt="Preview" className="mt-4 w-full h-48 object-cover border border-neutral-200" />
                    )}
                  </Field>
                </div>

                {/* Featured */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={form.featured ?? false}
                    onChange={(e) => set({ featured: e.target.checked })}
                    className="w-5 h-5 accent-neutral-900 cursor-pointer"
                  />
                  <label htmlFor="featured" className="text-xs uppercase tracking-widest font-oswald text-neutral-700 cursor-pointer">
                    Featured Event
                  </label>
                </div>

              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-4 mt-8 pt-6 border-t border-neutral-200">
              <button
                onClick={editingId ? handleUpdate : handleAdd}
                disabled={saving}
                className="flex items-center gap-2 bg-neutral-900 text-white px-8 py-3 font-oswald uppercase tracking-widest text-sm hover:bg-neutral-800 transition-colors disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
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

        {/* ── EVENT LIST ────────────────────────────────────────────────────── */}
        <div className="space-y-4">
          <h2 className="font-oswald text-2xl uppercase mb-6">All Events ({events.length})</h2>

          {loading ? (
            <div className="flex items-center justify-center py-24">
              <Loader2 className="w-8 h-8 animate-spin text-neutral-400" />
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-24 border border-dashed border-neutral-300">
              <p className="text-neutral-400 font-inter">No events yet. Add your first event above.</p>
            </div>
          ) : (
            events.map((event) => (
              <div
                key={event.id}
                className="bg-white border border-neutral-200 p-6 flex gap-6 hover:border-neutral-900 transition-colors"
              >
                {/* Image */}
                <div className="w-28 h-28 bg-neutral-200 shrink-0 overflow-hidden hidden sm:block">
                  {event.image && <img src={event.image} alt={event.title} className="w-full h-full object-cover" />}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="min-w-0">
                      <h3 className="font-oswald text-lg uppercase mb-1 truncate">{event.title}</h3>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-inter text-neutral-500 uppercase tracking-wider">
                        <span>{formatDisplayDate(event.date)}</span>
                        <span>·</span>
                        <span>{event.timeStart}{event.timeEnd ? ` – ${event.timeEnd}` : ""}</span>
                        <span>·</span>
                        <span>{event.location}</span>
                        <span>·</span>
                        <span className="font-medium">{event.isFree ? "Free" : event.cost}</span>
                        {event.isRecurring && (
                          <>
                            <span>·</span>
                            <span className="flex items-center gap-1">
                              <RefreshCw className="w-3 h-3" />
                              Every {event.recurringWeeks}w until {event.recurringEndDate ? format(new Date(event.recurringEndDate + "T00:00:00"), "d MMM") : "—"}
                            </span>
                          </>
                        )}
                        {event.featured && (
                          <span className="bg-neutral-900 text-white px-2 py-0.5 font-oswald normal-case tracking-normal">Featured</span>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-1 shrink-0">
                      <button onClick={() => handleEdit(event)} className="p-2 hover:bg-neutral-100 transition-colors" title="Edit">
                        <Edit2 className="w-4 h-4 text-neutral-600" />
                      </button>
                      <button onClick={() => handleDelete(event.id)} className="p-2 hover:bg-red-50 transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>

                  <p className="text-sm text-neutral-600 font-inter line-clamp-1 mb-1">{event.desc}</p>

                  <div className="flex items-center gap-3 text-xs font-inter text-neutral-400">
                    <span>{event.venue}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      {event.bookingType === "external" && <><ExternalLink className="w-3 h-3" /> Online tickets</>}
                      {event.bookingType === "call" && <><Phone className="w-3 h-3" /> Call to book</>}
                      {event.bookingType === "none" && "No booking required"}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
