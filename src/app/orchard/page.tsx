import { createClient } from '@/lib/supabase/server';
import type { Room } from '@/lib/rooms';
import Link from 'next/link';

export default async function OrchardPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('rooms')
    .select(
      'id, name, tagline, mood, description, images, price_weekday, size, capacity_adults, is_available, sort_order'
    )
    .eq('is_available', true)
    .order('sort_order');

  const rooms = (data ?? []) as Partial<Room>[];
  const heroImage = rooms[0]?.images?.[0] ?? null;

  return (
    <div className="bg-neutral-50 text-neutral-900 pb-24">
      {/* Hero */}
      <section className="relative h-[75vh] w-full flex items-center justify-center bg-neutral-900 text-white overflow-hidden">
        {heroImage && (
          <div className="absolute inset-0 opacity-50">
            <img src={heroImage} alt="Orchard" className="w-full h-full object-cover" />
          </div>
        )}
        <div className="relative z-10 text-center px-6">
          <p className="font-oswald text-xs uppercase tracking-[0.4em] mb-6 opacity-60">
            The Blender — Orchard
          </p>
          <h1 className="font-oswald text-7xl md:text-9xl uppercase mb-4">Orchard</h1>
          <p className="font-oswald text-lg tracking-widest uppercase opacity-60 mb-8">
            Fruit Rooms
          </p>
          <p className="font-inter max-w-sm mx-auto font-light text-white/70 leading-relaxed text-sm">
            Sleep among trees. Six rooms, each named after a fruit.
            Built with reclaimed materials. Designed to slow you down.
          </p>
        </div>
      </section>

      {/* Philosophy strip */}
      <section className="py-20 px-6 md:px-12 max-w-4xl mx-auto text-center border-b border-neutral-200">
        <h2 className="font-oswald text-4xl uppercase mb-8">The B Collection</h2>
        <div className="font-inter font-light text-neutral-600 text-lg space-y-1.5">
          <p>Six fruits. Six moods. One letter.</p>
          <p>Each Orchard room begins with B.</p>
          <p>A quiet connection to The Blender.</p>
        </div>
      </section>

      {/* Room grid */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        {rooms.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-oswald text-3xl uppercase text-neutral-300 mb-4">
              Rooms Coming Soon
            </p>
            <p className="font-inter text-neutral-400 font-light">
              We&apos;re preparing something beautiful.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-24">
            {rooms.map((room, idx) => (
              <Link key={room.id} href={`/orchard/${room.id}`} className="group block">
                {/* Image */}
                <div className="aspect-[4/3] bg-neutral-200 mb-6 overflow-hidden relative">
                  {room.images?.[0] ? (
                    <img
                      src={room.images[0]}
                      alt={room.name ?? ''}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="font-oswald text-5xl text-neutral-300 uppercase">
                        {room.name?.[0]}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                </div>

                {/* Info */}
                <div>
                  <span className="font-oswald text-sm text-neutral-400 block mb-2">
                    0{idx + 1}
                  </span>
                  <h3 className="font-oswald text-3xl uppercase mb-2 group-hover:text-neutral-500 transition-colors">
                    {room.name}
                  </h3>
                  {room.mood && (
                    <p className="font-inter text-xs font-medium uppercase tracking-widest text-neutral-400 mb-4">
                      {room.mood}
                    </p>
                  )}
                  {room.description && (
                    <p className="font-inter font-light text-neutral-600 leading-relaxed mb-6 max-w-md">
                      {room.description}
                    </p>
                  )}
                  <div className="flex flex-wrap items-center gap-3 text-xs font-inter text-neutral-400 uppercase tracking-wider mb-6">
                    {room.price_weekday && <span>From €{room.price_weekday}/night</span>}
                    {room.size && (
                      <>
                        <span>·</span>
                        <span>{room.size} m²</span>
                      </>
                    )}
                    {room.capacity_adults && (
                      <>
                        <span>·</span>
                        <span>{room.capacity_adults} guests</span>
                      </>
                    )}
                  </div>
                  <span className="inline-block border-b border-neutral-900 pb-0.5 font-oswald text-xs uppercase tracking-widest group-hover:text-neutral-500 group-hover:border-neutral-500 transition-colors">
                    View Room →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="mt-8 py-24 bg-neutral-900 text-white text-center px-6">
        <p className="font-oswald text-xs uppercase tracking-[0.4em] mb-6 text-neutral-400">
          Enquire
        </p>
        <h3 className="font-oswald text-4xl md:text-5xl uppercase mb-8">
          Ready to Sleep on Nature?
        </h3>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="mailto:info@entertheblender.gr"
            className="px-10 py-4 bg-white text-neutral-900 font-oswald uppercase tracking-widest text-sm hover:bg-neutral-100 transition-colors"
          >
            Email Us
          </a>
          <a
            href="tel:+302105223954"
            className="px-10 py-4 border border-white/30 text-white font-oswald uppercase tracking-widest text-sm hover:border-white transition-colors"
          >
            +30 210 522 3954
          </a>
        </div>
      </section>
    </div>
  );
}
