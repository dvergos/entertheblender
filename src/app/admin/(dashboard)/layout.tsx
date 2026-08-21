import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import AdminNav from './AdminNav';
import { Toaster } from 'sonner';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/admin/login');
  }

  // Fetch the admin profile to get the role
  const { data: profile } = await supabase
    .from('admin_profiles')
    .select('full_name, role, email, avatar')
    .eq('id', user.id)
    .single();

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <AdminNav
        userId={user.id}
        userEmail={profile?.email ?? user.email ?? ''}
        userName={profile?.full_name ?? ''}
        userRole={profile?.role ?? 'editor'}
        userAvatar={profile?.avatar ?? null}
      />
      <main className="flex-1 pt-16">
        {children}
      </main>
      <Toaster position="top-center" />
    </div>
  );
}
