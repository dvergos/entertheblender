'use client';

// ── Avatar definitions ────────────────────────────────────────────────────────
// 10 illustrated geometric SVG avatars. Each is identified by a short slug.

export interface AvatarDef {
  id: string;
  label: string;
  svg: React.ReactNode;
}

export const AVATARS: AvatarDef[] = [
  {
    id: 'ring',
    label: 'Ring',
    svg: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect width="64" height="64" fill="#1a1a2e" />
        <circle cx="32" cy="32" r="18" stroke="#e2c4f8" strokeWidth="5" fill="none" />
        <circle cx="32" cy="32" r="7" fill="#e2c4f8" />
      </svg>
    ),
  },
  {
    id: 'diamond',
    label: 'Diamond',
    svg: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect width="64" height="64" fill="#d4b5e8" />
        <polygon points="32,8 56,30 32,56 8,30" fill="white" opacity="0.9" />
        <polygon points="32,18 46,30 32,46 18,30" fill="#7c3aed" />
      </svg>
    ),
  },
  {
    id: 'leaf',
    label: 'Leaf',
    svg: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect width="64" height="64" fill="#064e3b" />
        <path d="M32 10 C52 10 54 30 32 54 C10 30 12 10 32 10Z" fill="#10b981" />
        <line x1="32" y1="12" x2="32" y2="52" stroke="#064e3b" strokeWidth="2" />
        <line x1="32" y1="28" x2="44" y2="20" stroke="#064e3b" strokeWidth="1.5" />
        <line x1="32" y1="36" x2="20" y2="28" stroke="#064e3b" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: 'bloom',
    label: 'Bloom',
    svg: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect width="64" height="64" fill="#fff1f2" />
        <ellipse cx="32" cy="20" rx="8" ry="13" fill="#ff69b4" />
        <ellipse cx="44" cy="36" rx="8" ry="13" fill="#ff69b4" transform="rotate(72 44 36)" />
        <ellipse cx="38" cy="52" rx="8" ry="13" fill="#ff69b4" transform="rotate(144 38 52)" />
        <ellipse cx="20" cy="48" rx="8" ry="13" fill="#ff69b4" transform="rotate(216 20 48)" />
        <ellipse cx="18" cy="28" rx="8" ry="13" fill="#ff69b4" transform="rotate(288 18 28)" />
        <circle cx="32" cy="32" r="8" fill="white" />
      </svg>
    ),
  },
  {
    id: 'star',
    label: 'Star',
    svg: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect width="64" height="64" fill="#1c1917" />
        <polygon
          points="32,8 36,26 54,26 40,37 45,55 32,44 19,55 24,37 10,26 28,26"
          fill="#fbbf24"
        />
      </svg>
    ),
  },
  {
    id: 'arch',
    label: 'Arch',
    svg: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect width="64" height="64" fill="#0c4a6e" />
        <rect x="14" y="34" width="10" height="22" fill="#7dd3fc" />
        <rect x="40" y="34" width="10" height="22" fill="#7dd3fc" />
        <path d="M14 34 Q32 8 50 34" fill="#7dd3fc" />
        <rect x="22" y="40" width="20" height="16" fill="#0c4a6e" />
      </svg>
    ),
  },
  {
    id: 'peak',
    label: 'Peak',
    svg: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect width="64" height="64" fill="#292524" />
        <polygon points="32,8 58,56 6,56" fill="#78716c" />
        <polygon points="32,8 48,40 16,40" fill="#d6d3d1" />
        <polygon points="32,8 40,28 24,28" fill="white" />
      </svg>
    ),
  },
  {
    id: 'crystal',
    label: 'Crystal',
    svg: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect width="64" height="64" fill="#2e1065" />
        <polygon points="32,6 50,22 50,42 32,58 14,42 14,22" fill="none" stroke="#a78bfa" strokeWidth="2" />
        <polygon points="32,14 44,26 44,38 32,50 20,38 20,26" fill="#7c3aed" opacity="0.7" />
        <circle cx="32" cy="32" r="6" fill="#e9d5ff" />
      </svg>
    ),
  },
  {
    id: 'bolt',
    label: 'Bolt',
    svg: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect width="64" height="64" fill="#431407" />
        <polygon points="38,6 20,34 30,34 26,58 44,30 34,30" fill="#f97316" />
      </svg>
    ),
  },
  {
    id: 'target',
    label: 'Target',
    svg: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect width="64" height="64" fill="#f0fdf4" />
        <circle cx="32" cy="32" r="24" fill="#4ade80" />
        <circle cx="32" cy="32" r="16" fill="white" />
        <circle cx="32" cy="32" r="8" fill="#16a34a" />
        <circle cx="32" cy="32" r="3" fill="white" />
      </svg>
    ),
  },
];

// ── AvatarImg — renders the chosen avatar or initials fallback ────────────────

interface AvatarImgProps {
  avatarId: string | null | undefined;
  name: string | null | undefined;
  email?: string;
  role?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SIZES = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-11 h-11 text-base',
  lg: 'w-16 h-16 text-xl',
};

export function AvatarImg({ avatarId, name, email, role, size = 'md', className = '' }: AvatarImgProps) {
  const sizeCls = SIZES[size];
  const def = AVATARS.find((a) => a.id === avatarId);

  if (def) {
    return (
      <div className={`${sizeCls} shrink-0 overflow-hidden ${className}`}>
        {def.svg}
      </div>
    );
  }

  // Initials fallback
  const initial = (name || email || '?').charAt(0).toUpperCase();
  const dark = role === 'super_admin';

  return (
    <div
      className={`${sizeCls} shrink-0 flex items-center justify-center font-oswald ${
        dark ? 'bg-neutral-900 text-white' : 'bg-neutral-200 text-neutral-700'
      } ${className}`}
    >
      {initial}
    </div>
  );
}
