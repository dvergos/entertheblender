'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { LogOut, UtensilsCrossed, Calendar, Users, LayoutDashboard, KeyRound, ImageIcon, ChevronDown, Loader2, Check, TreePine } from 'lucide-react';
import { AVATARS, AvatarImg } from '@/app/components/admin/avatars';

interface AdminNavProps {
  userId: string;
  userEmail: string;
  userName: string;
  userRole: string;
  userAvatar: string | null;
}

type PanelState = null | 'menu' | 'avatar' | 'password';

export default function AdminNav({ userId, userEmail, userName, userRole, userAvatar }: AdminNavProps) {
  const pathname = usePathname();
  const router = useRouter();

  // Local optimistic avatar state so UI updates instantly on save
  const [avatarId, setAvatarId] = useState<string | null>(userAvatar);
  const [panel, setPanel] = useState<PanelState>(null);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(userAvatar);
  const [avatarSaving, setAvatarSaving] = useState(false);
  const [avatarSaved, setAvatarSaved] = useState(false);

  const [pw, setPw] = useState('');
  const [pwConfirm, setPwConfirm] = useState('');
  const [pwSaving, setPwSaving] = useState(false);
  const [pwError, setPwError] = useState<string | null>(null);
  const [pwSaved, setPwSaved] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    if (!panel) return;
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        closePanel();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [panel]);

  const closePanel = () => {
    setPanel(null);
    setPw('');
    setPwConfirm('');
    setPwError(null);
    setPwSaved(false);
    setAvatarSaved(false);
    setSelectedAvatar(avatarId);
  };

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  };

  const handleSaveAvatar = async () => {
    if (selectedAvatar === avatarId) { closePanel(); return; }
    setAvatarSaving(true);
    const supabase = createClient();
    await supabase
      .from('admin_profiles')
      .update({ avatar: selectedAvatar })
      .eq('id', userId);
    setAvatarId(selectedAvatar);
    setAvatarSaving(false);
    setAvatarSaved(true);
    setTimeout(closePanel, 800);
  };

  const handleChangePassword = async () => {
    setPwError(null);
    if (pw.length < 6) { setPwError('Password must be at least 6 characters.'); return; }
    if (pw !== pwConfirm) { setPwError('Passwords do not match.'); return; }
    setPwSaving(true);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password: pw });
    setPwSaving(false);
    if (error) { setPwError(error.message); return; }
    setPwSaved(true);
    setTimeout(closePanel, 1200);
  };

  const navLinks = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
    { href: '/admin/menu', label: 'Menu', icon: UtensilsCrossed },
    { href: '/admin/events', label: 'Events', icon: Calendar },
    ...(userRole === 'super_admin'
      ? [
          { href: '/admin/orchard', label: 'Orchard', icon: TreePine },
          { href: '/admin/users', label: 'Users', icon: Users },
        ]
      : []),
  ];

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-neutral-900 text-white h-16 flex items-center px-6 gap-6">
      {/* Brand */}
      <Link href="/admin" className="font-oswald text-sm uppercase tracking-widest opacity-80 hover:opacity-100 transition-opacity shrink-0">
        The Blender <span className="text-neutral-500">/ Admin</span>
      </Link>

      <span className="text-neutral-700 hidden md:block">|</span>

      {/* Nav links */}
      <div className="hidden md:flex items-center gap-1 flex-1">
        {navLinks.map(({ href, label, icon: Icon, exact }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-oswald uppercase tracking-widest transition-colors ${
              isActive(href, exact)
                ? 'bg-white text-neutral-900'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </Link>
        ))}
      </div>

      {/* Avatar + dropdown */}
      <div className="ml-auto relative shrink-0" ref={dropdownRef}>
        <button
          onClick={() => setPanel(panel ? null : 'menu')}
          className="flex items-center gap-2 group"
          aria-label="Account menu"
        >
          <AvatarImg avatarId={avatarId} name={userName} email={userEmail} role={userRole} size="sm" className="ring-2 ring-transparent group-hover:ring-neutral-500 transition-all" />
          <div className="hidden md:block text-left">
            <p className="text-xs font-oswald uppercase tracking-widest leading-none">
              {userName || userEmail}
            </p>
            <p className="text-xs text-neutral-500 font-inter capitalize mt-0.5">
              {userRole === 'super_admin' ? 'Super Admin' : 'Editor'}
            </p>
          </div>
          <ChevronDown className={`w-3.5 h-3.5 text-neutral-500 transition-transform ${panel ? 'rotate-180' : ''}`} />
        </button>

        {/* ── Dropdown panel ── */}
        {panel && (
          <div className="absolute top-full right-0 mt-2 w-72 bg-white text-neutral-900 shadow-2xl border border-neutral-200 z-50">

            {/* ── Main menu ── */}
            {panel === 'menu' && (
              <div>
                <div className="px-4 py-3 border-b border-neutral-100">
                  <p className="text-xs font-oswald uppercase tracking-widest text-neutral-900">{userName || userEmail}</p>
                  <p className="text-xs text-neutral-400 font-inter mt-0.5">{userEmail}</p>
                </div>
                <button
                  onClick={() => { setPanel('avatar'); setSelectedAvatar(avatarId); }}
                  className="flex items-center gap-3 w-full px-4 py-3 text-sm font-inter hover:bg-neutral-50 transition-colors text-left"
                >
                  <ImageIcon className="w-4 h-4 text-neutral-500" />
                  Change Avatar
                </button>
                <button
                  onClick={() => setPanel('password')}
                  className="flex items-center gap-3 w-full px-4 py-3 text-sm font-inter hover:bg-neutral-50 transition-colors text-left"
                >
                  <KeyRound className="w-4 h-4 text-neutral-500" />
                  Change Password
                </button>
                <div className="border-t border-neutral-100" />
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-4 py-3 text-sm font-inter hover:bg-red-50 text-red-600 transition-colors text-left"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            )}

            {/* ── Avatar picker ── */}
            {panel === 'avatar' && (
              <div>
                <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-100">
                  <p className="text-xs font-oswald uppercase tracking-widest">Choose Avatar</p>
                  <button onClick={() => setPanel('menu')} className="text-xs text-neutral-400 hover:text-neutral-700 font-inter">Back</button>
                </div>
                <div className="grid grid-cols-5 gap-2 p-4">
                  {AVATARS.map((a) => (
                    <button
                      key={a.id}
                      onClick={() => setSelectedAvatar(a.id)}
                      title={a.label}
                      className={`w-full aspect-square overflow-hidden ring-2 transition-all ${
                        selectedAvatar === a.id ? 'ring-neutral-900 scale-95' : 'ring-transparent hover:ring-neutral-300'
                      }`}
                    >
                      {a.svg}
                    </button>
                  ))}
                </div>
                <div className="px-4 pb-4">
                  <button
                    onClick={handleSaveAvatar}
                    disabled={avatarSaving || avatarSaved}
                    className="w-full flex items-center justify-center gap-2 bg-neutral-900 text-white py-2.5 text-xs font-oswald uppercase tracking-widest hover:bg-neutral-800 transition-colors disabled:opacity-50"
                  >
                    {avatarSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : avatarSaved ? <Check className="w-3.5 h-3.5" /> : null}
                    {avatarSaved ? 'Saved!' : 'Save Avatar'}
                  </button>
                </div>
              </div>
            )}

            {/* ── Password change ── */}
            {panel === 'password' && (
              <div>
                <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-100">
                  <p className="text-xs font-oswald uppercase tracking-widest">Change Password</p>
                  <button onClick={() => setPanel('menu')} className="text-xs text-neutral-400 hover:text-neutral-700 font-inter">Back</button>
                </div>
                <div className="p-4 space-y-3">
                  {pwError && (
                    <p className="text-xs text-red-600 font-inter bg-red-50 px-3 py-2 border-l-2 border-red-500">{pwError}</p>
                  )}
                  {pwSaved && (
                    <p className="text-xs text-green-700 font-inter bg-green-50 px-3 py-2 border-l-2 border-green-600">Password updated!</p>
                  )}
                  <input
                    type="password"
                    placeholder="New password"
                    value={pw}
                    onChange={(e) => setPw(e.target.value)}
                    className="w-full border border-neutral-300 px-3 py-2.5 text-sm font-inter focus:outline-none focus:border-neutral-900 bg-white"
                  />
                  <input
                    type="password"
                    placeholder="Confirm password"
                    value={pwConfirm}
                    onChange={(e) => setPwConfirm(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleChangePassword()}
                    className="w-full border border-neutral-300 px-3 py-2.5 text-sm font-inter focus:outline-none focus:border-neutral-900 bg-white"
                  />
                  <button
                    onClick={handleChangePassword}
                    disabled={pwSaving || pwSaved}
                    className="w-full flex items-center justify-center gap-2 bg-neutral-900 text-white py-2.5 text-xs font-oswald uppercase tracking-widest hover:bg-neutral-800 transition-colors disabled:opacity-50"
                  >
                    {pwSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : pwSaved ? <Check className="w-3.5 h-3.5" /> : null}
                    {pwSaved ? 'Updated!' : 'Update Password'}
                  </button>
                </div>
              </div>
            )}

          </div>
        )}
      </div>
    </nav>
  );
}
