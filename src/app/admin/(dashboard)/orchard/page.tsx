import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import type { Room } from '@/lib/rooms';
import { Edit2, CheckCircle, XCircle, ImageOff } from 'lucide-react';

const ROOM_COLORS: Record<string, string> = {
  blackcurrant: '#6B21A8',
  banana: '#CA8A04',
  'blood-orange': '#EA580C',
  breadfruit: '#78350F',
  bergamot: '#15803D',
  blueberry: '#1D4ED8',
};

export default async function AdminOrchardPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('rooms')
    .select('*')
    .order('sort_order');

  const rooms = (data ?? []) as Room[];

  return (
    <div className="max-w-5xl mx-auto pt-12 px-6 md:px-12 pb-24">
      <div className="border-b border-neutral-900 pb-6 mb-12 flex items-end justify-between">
        <div>
          <h1 className="font-oswald text-5xl md:text-7xl uppercase mb-2">Orchard Rooms</h1>
          <p className="text-sm text-neutral-500 font-inter">
            Manage your 6 fruit rooms — images, pricing, amenities
          </p>
        </div>
      </div>

      {rooms.length === 0 ? (
        <div className="border border-dashed border-neutral-300 py-16 text-center">
          <p className="font-oswald text-lg uppercase text-neutral-400 mb-2">No rooms found</p>
          <p className="text-sm text-neutral-500 font-inter">
            Run the rooms seed SQL in Supabase to populate the 6 fruit rooms.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {rooms.map((room, idx) => (
            <div
              key={room.id}
              className="bg-white border border-neutral-200 flex gap-0 hover:border-neutral-900 transition-colors"
            >
              {/* Color accent */}
              <div
                className="w-1 shrink-0"
                style={{ backgroundColor: ROOM_COLORS[room.id] ?? '#737373' }}
              />

              {/* Thumbnail */}
              <div className="w-24 h-24 md:w-28 md:h-28 shrink-0 overflow-hidden bg-neutral-100 flex items-center justify-center">
                {room.images?.[0] ? (
                  <img
                    src={room.images[0]}
                    alt={room.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-1 text-neutral-300">
                    <ImageOff className="w-5 h-5" />
                    <span className="text-xs font-inter">No image</span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 py-4 pl-5 pr-4 min-w-0 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-xs font-oswald uppercase tracking-widest text-neutral-400 mb-0.5">
                    0{idx + 1}
                  </p>
                  <h3 className="font-oswald text-2xl uppercase leading-tight mb-1">
                    {room.name}
                  </h3>
                  {room.mood && (
                    <p className="text-xs text-neutral-500 font-inter italic mb-2">{room.mood}</p>
                  )}
                  <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs font-inter text-neutral-400">
                    {room.price_weekday ? (
                      <span>From €{room.price_weekday}/night</span>
                    ) : (
                      <span className="text-amber-500">No price set</span>
                    )}
                    {room.size && <span>· {room.size} m²</span>}
                    {room.capacity_adults > 0 && <span>· {room.capacity_adults} adults</span>}
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      {room.is_available ? (
                        <>
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                          Available
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5 text-red-400" />
                          Unavailable
                        </>
                      )}
                    </span>
                    <span>·</span>
                    <span>{room.images?.length ?? 0} photo{room.images?.length !== 1 ? 's' : ''}</span>
                  </div>
                </div>

                <Link
                  href={`/admin/orchard/${room.id}`}
                  className="flex items-center gap-2 bg-neutral-900 text-white px-4 py-2.5 font-oswald uppercase tracking-widest text-xs hover:bg-neutral-800 transition-colors shrink-0"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
