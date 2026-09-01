import { createClient } from '@/lib/supabase/server';
import { AMENITIES } from '@/lib/rooms';
import type { Room } from '@/lib/rooms';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Users, Maximize2, BedDouble, Clock, Check } from 'lucide-react';

export default async function RoomDetailPage({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  const { roomId } = await params;

  const supabase = await createClient();
  const { data } = await supabase.from('rooms').select('*').eq('id', roomId).single();

  if (!data) notFound();
  const room = data as Room;

  const activeAmenities = AMENITIES.filter((a) => room.amenities?.includes(a.id));

  return (
    <div className="bg-neutral-50 text-neutral-900 pb-32">
      {/* Back */}
      <div className="px-6 md:px-12 max-w-7xl mx-auto pt-8">
        <Link
          href="/orchard"
          className="inline-flex items-center gap-1.5 text-xs font-oswald uppercase tracking-widest text-neutral-400 hover:text-neutral-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          All Rooms
        </Link>
      </div>

      {/* Hero image */}
      {room.images?.[0] && (
        <div className="mt-6 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="aspect-[21/9] bg-neutral-200 overflow-hidden">
            <img
              src={room.images[0]}
              alt={room.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Thumbnail strip */}
      {(room.images?.length ?? 0) > 1 && (
        <div className="mt-3 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-4 md:grid-cols-6 gap-2">
          {room.images.slice(1, 7).map((img, i) => (
            <div key={i} className="aspect-square bg-neutral-200 overflow-hidden">
              <img
                src={img}
                alt={`${room.name} ${i + 2}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* Content grid */}
      <div className="mt-16 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Left column: details */}
        <div className="lg:col-span-2 space-y-16">
          {/* Title block */}
          <div>
            {room.mood && (
              <p className="font-inter text-xs uppercase tracking-[0.3em] text-neutral-400 mb-4">
                {room.mood}
              </p>
            )}
            <h1 className="font-oswald text-6xl md:text-8xl uppercase mb-4">{room.name}</h1>
            {room.tagline && (
              <p className="font-inter text-xl font-light text-neutral-500 italic">
                {room.tagline}
              </p>
            )}
          </div>

          {/* Specs bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-neutral-200">
            {room.size && (
              <div className="flex flex-col gap-1.5">
                <Maximize2 className="w-4 h-4 text-neutral-400" />
                <span className="font-oswald text-xl">{room.size} m²</span>
                <span className="text-xs font-inter text-neutral-400 uppercase tracking-widest">
                  Size
                </span>
              </div>
            )}
            <div className="flex flex-col gap-1.5">
              <Users className="w-4 h-4 text-neutral-400" />
              <span className="font-oswald text-lg">
                {room.capacity_adults} adults
                {room.capacity_children > 0 && ` + ${room.capacity_children} children`}
              </span>
              <span className="text-xs font-inter text-neutral-400 uppercase tracking-widest">
                Capacity
              </span>
            </div>
            {room.bed_configuration && (
              <div className="flex flex-col gap-1.5">
                <BedDouble className="w-4 h-4 text-neutral-400" />
                <span className="font-oswald text-lg leading-tight">
                  {room.bed_configuration}
                </span>
                <span className="text-xs font-inter text-neutral-400 uppercase tracking-widest">
                  Beds
                </span>
              </div>
            )}
            {(room.price_weekday || room.price_weekend) && (
              <div className="flex flex-col gap-1.5">
                <span className="font-oswald text-2xl">
                  €{room.price_weekday ?? room.price_weekend}
                </span>
                <span className="text-xs font-inter text-neutral-400 uppercase tracking-widest">
                  From / night
                </span>
              </div>
            )}
          </div>

          {/* Description */}
          {(room.description || room.long_description) && (
            <div className="space-y-5">
              {room.description && (
                <p className="font-inter font-light text-lg text-neutral-700 leading-relaxed">
                  {room.description}
                </p>
              )}
              {room.long_description && (
                <p className="font-inter font-light text-neutral-600 leading-relaxed whitespace-pre-line">
                  {room.long_description}
                </p>
              )}
            </div>
          )}

          {/* Unique features */}
          {(room.features?.length ?? 0) > 0 && (
            <div>
              <h2 className="font-oswald text-2xl uppercase mb-6">What Makes This Room</h2>
              <div className="space-y-3">
                {room.features.map((f) => (
                  <div key={f} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#10B981] mt-0.5 shrink-0" />
                    <span className="font-inter text-neutral-700">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Amenities */}
          {activeAmenities.length > 0 && (
            <div>
              <h2 className="font-oswald text-2xl uppercase mb-6">Amenities</h2>
              <div className="grid grid-cols-2 gap-x-8 gap-y-0">
                {activeAmenities.map((a) => (
                  <div
                    key={a.id}
                    className="flex items-center gap-2.5 py-2.5 border-b border-neutral-100"
                  >
                    <Check className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                    <span className="font-inter text-sm text-neutral-700">{a.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Views */}
          {(room.views?.length ?? 0) > 0 && (
            <div>
              <h2 className="font-oswald text-2xl uppercase mb-4">Views</h2>
              <div className="flex flex-wrap gap-2">
                {room.views.map((v) => (
                  <span
                    key={v}
                    className="font-inter text-sm text-neutral-600 border border-neutral-200 px-4 py-1.5"
                  >
                    {v}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Accessibility */}
          {(room.accessibility?.length ?? 0) > 0 && (
            <div>
              <h2 className="font-oswald text-2xl uppercase mb-4">Accessibility</h2>
              <div className="space-y-2">
                {room.accessibility.map((a) => (
                  <div key={a} className="flex items-center gap-2.5">
                    <Check className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                    <span className="font-inter text-sm text-neutral-600">{a}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right column: booking card */}
        <div className="lg:col-span-1">
          <div className="sticky top-32 bg-white border border-neutral-200 p-6 space-y-6">
            {/* Price */}
            {(room.price_weekday || room.price_weekend) && (
              <div>
                {room.price_weekday && (
                  <div className="flex items-end gap-2 mb-1">
                    <span className="font-oswald text-4xl">€{room.price_weekday}</span>
                    <span className="font-inter text-sm text-neutral-400 mb-1">
                      weekday / night
                    </span>
                  </div>
                )}
                {room.price_weekend && room.price_weekend !== room.price_weekday && (
                  <p className="text-sm font-inter text-neutral-400">
                    €{room.price_weekend} / night on weekends
                  </p>
                )}
              </div>
            )}

            {/* Book now */}
            <div>
              <Link
                href="/book"
                className="block w-full bg-neutral-900 text-white py-4 font-oswald uppercase tracking-widest text-sm text-center hover:bg-neutral-700 transition-colors"
              >
                Book Now
              </Link>
              <p className="text-xs text-center font-inter text-neutral-400 mt-2 leading-relaxed">
                Booking does not guarantee you will get this exact room — it&apos;s based on availability.
              </p>
            </div>

            {/* Check-in / out */}
            <div className="border-t border-neutral-100 pt-4 space-y-3 text-sm font-inter text-neutral-500">
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  Check-in
                </span>
                <span className="font-medium text-neutral-900">{room.check_in}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  Check-out
                </span>
                <span className="font-medium text-neutral-900">{room.check_out}</span>
              </div>
            </div>

            {/* Cancellation */}
            {room.cancellation_policy && (
              <p className="text-xs font-inter text-neutral-400 border-t border-neutral-100 pt-4 leading-relaxed">
                {room.cancellation_policy}
              </p>
            )}

            {/* Contact options */}
            <div className="border-t border-neutral-100 pt-4 space-y-2">
              <a
                href="mailto:info@entertheblender.gr"
                className="block w-full border border-neutral-300 py-3 text-center font-oswald uppercase tracking-widest text-xs hover:border-neutral-900 hover:bg-neutral-900 hover:text-white transition-colors"
              >
                Email to Enquire
              </a>
              <a
                href="tel:+302105223954"
                className="block w-full border border-neutral-300 py-3 text-center font-oswald uppercase tracking-widest text-xs hover:border-neutral-900 transition-colors"
              >
                Call +30 210 522 3954
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
