'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { AMENITIES } from '@/lib/rooms';
import type { Room } from '@/lib/rooms';
import {
  Save,
  Loader2,
  ArrowLeft,
  Upload,
  Trash2,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-widest font-oswald mb-2 text-neutral-700">
        {label}
      </label>
      {children}
      {hint && <p className="text-xs text-neutral-400 font-inter mt-1">{hint}</p>}
    </div>
  );
}

const inputCls =
  'w-full border border-neutral-300 px-4 py-3 focus:outline-none focus:border-neutral-900 transition-colors font-inter text-sm bg-white';

export default function AdminRoomEditor() {
  const { roomId } = useParams<{ roomId: string }>();

  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchRoom();
  }, [roomId]);

  const fetchRoom = async () => {
    const supabase = createClient();
    const { data } = await supabase.from('rooms').select('*').eq('id', roomId).single();
    if (data) setRoom(data as Room);
    setLoading(false);
  };

  const patch = (update: Partial<Room>) =>
    setRoom((r) => (r ? { ...r, ...update } : r));

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !room) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch('/api/admin/rooms/upload-image', {
        method: 'POST',
        body: formData,
      });
      const json = await res.json();
      if (json.url) {
        patch({ images: [...(room.images ?? []), json.url] });
      } else {
        toast.error('Upload failed: ' + (json.error ?? 'Unknown error'));
      }
    } catch {
      toast.error('Upload failed. Please try again.');
    }
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeImage = (idx: number) => {
    if (!room) return;
    if (!confirm('Remove this image?')) return;
    patch({ images: room.images.filter((_, i) => i !== idx) });
  };

  const moveImage = (idx: number, dir: 'up' | 'down') => {
    if (!room) return;
    const imgs = [...room.images];
    const target = dir === 'up' ? idx - 1 : idx + 1;
    if (target < 0 || target >= imgs.length) return;
    [imgs[idx], imgs[target]] = [imgs[target], imgs[idx]];
    patch({ images: imgs });
  };

  const toggleAmenity = (id: string) => {
    if (!room) return;
    const current = room.amenities ?? [];
    patch({
      amenities: current.includes(id)
        ? current.filter((a) => a !== id)
        : [...current, id],
    });
  };

  const handleSave = async () => {
    if (!room) return;
    setSaving(true);
    const supabase = createClient();
    const { error } = await supabase
      .from('rooms')
      .update({
        name: room.name,
        tagline: room.tagline || null,
        mood: room.mood || null,
        description: room.description || null,
        long_description: room.long_description || null,
        images: room.images ?? [],
        palette: room.palette || null,
        size: room.size || null,
        capacity_adults: room.capacity_adults,
        capacity_children: room.capacity_children,
        bed_configuration: room.bed_configuration || null,
        price_weekday: room.price_weekday || null,
        price_weekend: room.price_weekend || null,
        amenities: room.amenities ?? [],
        features: room.features ?? [],
        views: room.views ?? [],
        accessibility: room.accessibility ?? [],
        cancellation_policy: room.cancellation_policy || null,
        check_in: room.check_in,
        check_out: room.check_out,
        is_available: room.is_available,
        updated_at: new Date().toISOString(),
      })
      .eq('id', room.id);

    setSaving(false);
    if (error) {
      toast.error('Save failed: ' + error.message);
    } else {
      toast.success('Room saved!');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-neutral-400" />
      </div>
    );
  }

  if (!room) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <p className="font-oswald text-2xl uppercase">Room not found</p>
        <Link href="/admin/orchard" className="text-sm text-neutral-500 underline font-inter">
          Back to Orchard
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto pt-12 px-6 md:px-12 pb-24">
      {/* Header */}
      <div className="flex items-start justify-between mb-12 border-b border-neutral-900 pb-6">
        <div>
          <Link
            href="/admin/orchard"
            className="flex items-center gap-1.5 text-xs text-neutral-400 font-inter uppercase tracking-widest hover:text-neutral-700 transition-colors mb-3"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Orchard Rooms
          </Link>
          <h1 className="font-oswald text-5xl md:text-7xl uppercase">{room.name}</h1>
        </div>
        <div className="flex items-center gap-4 shrink-0 mt-1">
          {/* Available toggle */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-oswald uppercase tracking-widest text-neutral-600">
              Available
            </span>
            <button
              onClick={() => patch({ is_available: !room.is_available })}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                room.is_available ? 'bg-emerald-500' : 'bg-neutral-300'
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                  room.is_available ? 'translate-x-6' : ''
                }`}
              />
            </button>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-neutral-900 text-white px-6 py-3 font-oswald uppercase tracking-widest text-sm hover:bg-neutral-800 transition-colors disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            Save Room
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {/* ── Images ─────────────────────────────────────────────────────── */}
        <section className="bg-white border border-neutral-200 p-6">
          <h2 className="font-oswald text-xl uppercase mb-6">Images</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
            {(room.images ?? []).map((url, idx) => (
              <div
                key={`${url}-${idx}`}
                className="relative aspect-[4/3] bg-neutral-100 overflow-hidden group"
              >
                <img
                  src={url}
                  alt={`Room image ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
                {/* Hover controls */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <button
                    onClick={() => moveImage(idx, 'up')}
                    disabled={idx === 0}
                    className="bg-white p-1.5 hover:bg-neutral-100 disabled:opacity-30"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => moveImage(idx, 'down')}
                    disabled={idx === (room.images?.length ?? 0) - 1}
                    className="bg-white p-1.5 hover:bg-neutral-100 disabled:opacity-30"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => removeImage(idx)}
                    className="bg-red-500 text-white p-1.5 hover:bg-red-600"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                {idx === 0 && (
                  <span className="absolute top-2 left-2 bg-neutral-900 text-white text-xs px-2 py-0.5 font-oswald uppercase tracking-widest">
                    Cover
                  </span>
                )}
              </div>
            ))}

            {/* Upload slot */}
            <label
              className={`aspect-[4/3] border-2 border-dashed border-neutral-300 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-neutral-900 transition-colors ${
                uploading ? 'pointer-events-none opacity-60' : ''
              }`}
            >
              {uploading ? (
                <Loader2 className="w-6 h-6 animate-spin text-neutral-400" />
              ) : (
                <>
                  <Upload className="w-6 h-6 text-neutral-400" />
                  <span className="text-xs font-oswald uppercase tracking-widest text-neutral-400">
                    Upload
                  </span>
                </>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                disabled={uploading}
              />
            </label>
          </div>
          <p className="text-xs text-neutral-400 font-inter">
            First image is the cover photo. Use arrows to reorder. JPG / PNG / WebP.
          </p>
        </section>

        {/* ── Room Details ───────────────────────────────────────────────── */}
        <section className="bg-white border border-neutral-200 p-6 space-y-6">
          <h2 className="font-oswald text-xl uppercase">Room Details</h2>

          <Field label="Room Name">
            <input
              type="text"
              value={room.name}
              onChange={(e) => patch({ name: e.target.value })}
              className={inputCls}
            />
          </Field>

          <Field
            label="Tagline"
            hint="Short evocative phrase shown on the room detail page"
          >
            <input
              type="text"
              value={room.tagline ?? ''}
              onChange={(e) => patch({ tagline: e.target.value })}
              className={inputCls}
              placeholder="e.g. Where darkness becomes depth"
            />
          </Field>

          <Field label="Mood" hint="3-word descriptor shown in the listing (e.g. Deep. Intimate. Grounded.)">
            <input
              type="text"
              value={room.mood ?? ''}
              onChange={(e) => patch({ mood: e.target.value })}
              className={inputCls}
              placeholder="e.g. Deep. Intimate. Grounded."
            />
          </Field>

          <Field label="Short Description" hint="Shown in the room grid listing (2–3 sentences)">
            <textarea
              rows={3}
              value={room.description ?? ''}
              onChange={(e) => patch({ description: e.target.value })}
              className={`${inputCls} resize-none`}
              placeholder="The character of this room in a few sentences..."
            />
          </Field>

          <Field label="Full Description" hint="Shown on the room detail page">
            <textarea
              rows={6}
              value={room.long_description ?? ''}
              onChange={(e) => patch({ long_description: e.target.value })}
              className={`${inputCls} resize-none`}
              placeholder="Full room story and atmosphere..."
            />
          </Field>

          <Field label="Palette Notes" hint="Internal color reference (e.g. Dark purples / charcoal accents)">
            <input
              type="text"
              value={room.palette ?? ''}
              onChange={(e) => patch({ palette: e.target.value })}
              className={inputCls}
              placeholder="e.g. Dark purples / charcoal accents"
            />
          </Field>
        </section>

        {/* ── Specs & Pricing ────────────────────────────────────────────── */}
        <section className="bg-white border border-neutral-200 p-6">
          <h2 className="font-oswald text-xl uppercase mb-6">Specs & Pricing</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <Field label="Size (m²)">
              <input
                type="number"
                value={room.size ?? ''}
                onChange={(e) =>
                  patch({ size: e.target.value ? parseInt(e.target.value) : null })
                }
                className={inputCls}
                placeholder="e.g. 24"
                min={0}
              />
            </Field>

            <Field label="Adults Capacity">
              <input
                type="number"
                min={1}
                max={10}
                value={room.capacity_adults}
                onChange={(e) => patch({ capacity_adults: parseInt(e.target.value) || 1 })}
                className={inputCls}
              />
            </Field>

            <Field label="Children Capacity">
              <input
                type="number"
                min={0}
                max={10}
                value={room.capacity_children}
                onChange={(e) => patch({ capacity_children: parseInt(e.target.value) || 0 })}
                className={inputCls}
              />
            </Field>

            <div className="col-span-2 md:col-span-3">
              <Field label="Bed Configuration" hint="e.g. 1 King-size bed, or 2 Twin beds">
                <input
                  type="text"
                  value={room.bed_configuration ?? ''}
                  onChange={(e) => patch({ bed_configuration: e.target.value })}
                  className={inputCls}
                  placeholder="e.g. 1 King-size bed"
                />
              </Field>
            </div>

            <Field label="Weekday Price (€/night)">
              <div className="flex items-stretch">
                <span className="flex items-center px-3 border border-r-0 border-neutral-300 bg-neutral-100 text-neutral-600 text-sm font-inter">
                  €
                </span>
                <input
                  type="number"
                  value={room.price_weekday ?? ''}
                  onChange={(e) =>
                    patch({ price_weekday: e.target.value ? parseInt(e.target.value) : null })
                  }
                  className="flex-1 border border-neutral-300 px-4 py-3 focus:outline-none focus:border-neutral-900 font-inter text-sm"
                  placeholder="e.g. 80"
                  min={0}
                />
              </div>
            </Field>

            <Field label="Weekend Price (€/night)">
              <div className="flex items-stretch">
                <span className="flex items-center px-3 border border-r-0 border-neutral-300 bg-neutral-100 text-neutral-600 text-sm font-inter">
                  €
                </span>
                <input
                  type="number"
                  value={room.price_weekend ?? ''}
                  onChange={(e) =>
                    patch({ price_weekend: e.target.value ? parseInt(e.target.value) : null })
                  }
                  className="flex-1 border border-neutral-300 px-4 py-3 focus:outline-none focus:border-neutral-900 font-inter text-sm"
                  placeholder="e.g. 100"
                  min={0}
                />
              </div>
            </Field>
          </div>
        </section>

        {/* ── Policies ───────────────────────────────────────────────────── */}
        <section className="bg-white border border-neutral-200 p-6">
          <h2 className="font-oswald text-xl uppercase mb-6">Policies</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Field label="Check-in Time">
              <input
                type="text"
                value={room.check_in}
                onChange={(e) => patch({ check_in: e.target.value })}
                className={inputCls}
                placeholder="e.g. 3:00 PM"
              />
            </Field>

            <Field label="Check-out Time">
              <input
                type="text"
                value={room.check_out}
                onChange={(e) => patch({ check_out: e.target.value })}
                className={inputCls}
                placeholder="e.g. 11:00 AM"
              />
            </Field>

            <div className="md:col-span-3">
              <Field label="Cancellation Policy">
                <textarea
                  rows={2}
                  value={room.cancellation_policy ?? ''}
                  onChange={(e) => patch({ cancellation_policy: e.target.value })}
                  className={`${inputCls} resize-none`}
                  placeholder="e.g. Free cancellation up to 48 hours before check-in."
                />
              </Field>
            </div>
          </div>
        </section>

        {/* ── Amenities ──────────────────────────────────────────────────── */}
        <section className="bg-white border border-neutral-200 p-6">
          <h2 className="font-oswald text-xl uppercase mb-6">
            Amenities
            <span className="text-neutral-400 text-base normal-case font-inter ml-3">
              ({(room.amenities ?? []).length} selected)
            </span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {AMENITIES.map((a) => {
              const checked = (room.amenities ?? []).includes(a.id);
              return (
                <label key={a.id} className="flex items-center gap-3 cursor-pointer group py-1">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleAmenity(a.id)}
                    className="w-4 h-4 accent-neutral-900 cursor-pointer shrink-0"
                  />
                  <span
                    className={`text-sm font-inter transition-colors ${
                      checked
                        ? 'text-neutral-900'
                        : 'text-neutral-400 group-hover:text-neutral-600'
                    }`}
                  >
                    {a.label}
                  </span>
                </label>
              );
            })}
          </div>
        </section>

        {/* ── Unique Features ────────────────────────────────────────────── */}
        <section className="bg-white border border-neutral-200 p-6">
          <h2 className="font-oswald text-xl uppercase mb-2">Unique Features</h2>
          <p className="text-xs text-neutral-400 font-inter mb-4">
            Special features that make this room stand out. One per line.
          </p>
          <textarea
            rows={5}
            value={(room.features ?? []).join('\n')}
            onChange={(e) =>
              patch({ features: e.target.value.split('\n').filter(Boolean) })
            }
            className={`${inputCls} resize-none`}
            placeholder={'Floor-to-ceiling windows\nPrivate rooftop terrace\nHandpainted botanical murals'}
          />
        </section>

        {/* ── Views & Accessibility ──────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="bg-white border border-neutral-200 p-6">
            <h2 className="font-oswald text-xl uppercase mb-2">Views</h2>
            <p className="text-xs text-neutral-400 font-inter mb-4">One per line.</p>
            <textarea
              rows={4}
              value={(room.views ?? []).join('\n')}
              onChange={(e) =>
                patch({ views: e.target.value.split('\n').filter(Boolean) })
              }
              className={`${inputCls} resize-none`}
              placeholder={'Garden\nCity panorama'}
            />
          </section>

          <section className="bg-white border border-neutral-200 p-6">
            <h2 className="font-oswald text-xl uppercase mb-2">Accessibility</h2>
            <p className="text-xs text-neutral-400 font-inter mb-4">One per line.</p>
            <textarea
              rows={4}
              value={(room.accessibility ?? []).join('\n')}
              onChange={(e) =>
                patch({ accessibility: e.target.value.split('\n').filter(Boolean) })
              }
              className={`${inputCls} resize-none`}
              placeholder={'Step-free access\nGrab bars in bathroom'}
            />
          </section>
        </div>

        {/* ── Bottom save ────────────────────────────────────────────────── */}
        <div className="flex justify-end pt-4">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-neutral-900 text-white px-10 py-4 font-oswald uppercase tracking-widest text-sm hover:bg-neutral-800 transition-colors disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            Save Room
          </button>
        </div>
      </div>
    </div>
  );
}
