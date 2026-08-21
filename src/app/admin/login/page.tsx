'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError('Invalid email or password.');
      setLoading(false);
      return;
    }

    router.push('/admin');
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo / Brand */}
        <div className="text-center mb-10">
          <img src="/logo.svg" alt="The Blender" className="h-20 w-auto mx-auto mb-6 object-contain" />
          <h1 className="font-oswald text-2xl uppercase tracking-widest text-neutral-900">Admin Access</h1>
          <p className="font-inter text-sm text-neutral-500 mt-1">Sign in to manage The Blender</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="bg-white border border-neutral-200 p-8 space-y-5">
          <div>
            <label className="block text-xs uppercase tracking-widest font-oswald mb-2 text-neutral-600">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full border border-neutral-300 px-4 py-3 text-sm font-inter focus:outline-none focus:border-neutral-900 transition-colors"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest font-oswald mb-2 text-neutral-600">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full border border-neutral-300 px-4 py-3 text-sm font-inter focus:outline-none focus:border-neutral-900 transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 font-inter">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-neutral-900 text-white py-3 font-oswald uppercase tracking-widest text-sm hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-xs text-neutral-400 font-inter mt-6">
          The Blender — Admin Portal
        </p>
      </div>
    </div>
  );
}
