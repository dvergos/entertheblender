import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { UtensilsCrossed, Calendar, Users, ArrowRight, TreePine } from 'lucide-react';

export default async function AdminDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from('admin_profiles')
    .select('full_name, role')
    .eq('id', user!.id)
    .single();

  const isSuperAdmin = profile?.role === 'super_admin';
  const displayName = profile?.full_name || user?.email || '';

  const cards = [
    {
      href: '/admin/menu',
      icon: UtensilsCrossed,
      title: 'Menu Manager',
      description: 'Add, edit and reorder Basket menu categories and items.',
      accent: '#D4B5E8',
    },
    {
      href: '/admin/events',
      icon: Calendar,
      title: 'Event Manager',
      description: 'Manage upcoming and past events across all three venues.',
      accent: '#10B981',
    },
    ...(isSuperAdmin
      ? [
          {
            href: '/admin/orchard',
            icon: TreePine,
            title: 'Orchard Manager',
            description: 'Manage the 6 fruit rooms — images, pricing, amenities, and availability.',
            accent: '#10B981',
          },
          {
            href: '/admin/users',
            icon: Users,
            title: 'User Manager',
            description: 'Invite users, assign roles, and manage admin access.',
            accent: '#FF69B4',
          },
        ]
      : []),
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 md:px-12 py-16">
      {/* Header */}
      <div className="mb-12 border-b border-neutral-200 pb-8">
        <p className="font-inter text-sm text-neutral-500 mb-1 uppercase tracking-widest">Welcome back</p>
        <h1 className="font-oswald text-4xl md:text-6xl uppercase">{displayName}</h1>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map(({ href, icon: Icon, title, description, accent }) => (
          <Link
            key={href}
            href={href}
            className="group bg-white border border-neutral-200 p-8 hover:border-neutral-900 transition-colors flex flex-col gap-4"
          >
            <div className="flex items-start justify-between">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: accent + '33' }}
              >
                <Icon className="w-5 h-5" style={{ color: accent }} />
              </div>
              <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-neutral-900 transition-colors mt-1" />
            </div>
            <div>
              <h2 className="font-oswald text-xl uppercase mb-1">{title}</h2>
              <p className="font-inter text-sm text-neutral-500">{description}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Back to site */}
      <div className="mt-12 pt-8 border-t border-neutral-200">
        <Link
          href="/"
          className="text-xs font-inter text-neutral-400 hover:text-neutral-900 transition-colors uppercase tracking-widest"
        >
          ← Back to public site
        </Link>
      </div>
    </div>
  );
}
