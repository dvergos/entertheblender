import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import AdminUsersClient from './AdminUsersClient';

export default async function AdminUsersPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Check super_admin role — server-side gate
  const { data: profile } = await supabase
    .from('admin_profiles')
    .select('role')
    .eq('id', user!.id)
    .single();

  if (profile?.role !== 'super_admin') {
    redirect('/admin');
  }

  // Fetch all admin profiles
  const { data: users } = await supabase
    .from('admin_profiles')
    .select('id, email, full_name, role, avatar, created_at')
    .order('created_at', { ascending: true });

  return <AdminUsersClient initialUsers={users ?? []} currentUserId={user!.id} />;
}
