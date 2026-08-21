import { NextRequest, NextResponse } from 'next/server';
import { createClient as createServerClient } from '@/lib/supabase/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: NextRequest) {
  // Verify the requesting user is a super_admin
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from('admin_profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'super_admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // Use service role to create the user — does not affect current session
  const adminClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  const { email, password, full_name, role } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
  }

  // Create the auth user — email_confirm: true skips the confirmation email
  const { data, error } = await adminClient.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (error || !data.user) {
    return NextResponse.json({ error: error?.message ?? 'Failed to create user.' }, { status: 400 });
  }

  // Create the admin profile row
  const { error: profileError } = await adminClient
    .from('admin_profiles')
    .insert({
      id: data.user.id,
      email,
      full_name: full_name?.trim() || null,
      role,
    });

  if (profileError) {
    return NextResponse.json(
      { error: 'User created but profile save failed: ' + profileError.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    user: { id: data.user.id, email, created_at: data.user.created_at },
  });
}
