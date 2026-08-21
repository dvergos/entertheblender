'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Plus, Trash2, Edit2, Save, X, ShieldCheck, User, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { AvatarImg } from '@/app/components/admin/avatars';

interface AdminUser {
  id: string;
  email: string;
  full_name: string | null;
  role: string;
  avatar: string | null;
  created_at: string;
}

interface Props {
  initialUsers: AdminUser[];
  currentUserId: string;
}

const inputCls =
  'w-full border border-neutral-300 px-4 py-3 focus:outline-none focus:border-neutral-900 transition-colors font-inter text-sm bg-white';

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-widest font-oswald mb-2 text-neutral-700">
        {label}{required && ' *'}
      </label>
      {children}
    </div>
  );
}


export default function AdminUsersClient({ initialUsers, currentUserId }: Props) {
  const [users, setUsers] = useState<AdminUser[]>(initialUsers);
  const [showAddForm, setShowAddForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editRole, setEditRole] = useState<'editor' | 'super_admin'>('editor');
  const [editFullName, setEditFullName] = useState('');
  const [editSaving, setEditSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Add form state
  const [form, setForm] = useState({ email: '', fullName: '', password: '', role: 'editor' as 'editor' | 'super_admin' });
  const setF = (patch: Partial<typeof form>) => setForm((f) => ({ ...f, ...patch }));

  const showFeedback = (type: 'success' | 'error', message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 5000);
  };

  const resetAddForm = () => {
    setForm({ email: '', fullName: '', password: '', role: 'editor' });
    setShowAddForm(false);
  };

  // ── Add user via server API route (safe — uses service role key) ────────────
  const handleAdd = async () => {
    if (!form.email.trim()) { showFeedback('error', 'Email is required.'); return; }
    if (!form.password.trim() || form.password.length < 6) { showFeedback('error', 'Password must be at least 6 characters.'); return; }

    setSaving(true);
    const res = await fetch('/api/admin/create-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: form.email.trim(),
        password: form.password,
        full_name: form.fullName.trim() || null,
        role: form.role,
      }),
    });

    const json = await res.json();

    if (!res.ok) {
      showFeedback('error', json.error ?? 'Failed to create user.');
      setSaving(false);
      return;
    }

    setUsers([...users, {
      id: json.user.id,
      email: form.email.trim(),
      full_name: form.fullName.trim() || null,
      role: form.role,
      avatar: null,
      created_at: json.user.created_at ?? new Date().toISOString(),
    }]);
    resetAddForm();
    showFeedback('success', `${form.email} added. They can sign in immediately.`);
    setSaving(false);
  };

  // ── Edit role / name ───────────────────────────────────────────────────────
  const startEdit = (u: AdminUser) => {
    setEditingId(u.id);
    setEditRole(u.role as 'editor' | 'super_admin');
    setEditFullName(u.full_name ?? '');
  };

  const handleUpdate = async (userId: string) => {
    setEditSaving(true);
    const supabase = createClient();
    const { error } = await supabase
      .from('admin_profiles')
      .update({ role: editRole, full_name: editFullName.trim() || null })
      .eq('id', userId);

    if (error) {
      showFeedback('error', 'Failed to update: ' + error.message);
      setEditSaving(false);
      return;
    }

    setUsers(users.map((u) =>
      u.id === userId ? { ...u, role: editRole, full_name: editFullName.trim() || null } : u
    ));
    setEditingId(null);
    setEditSaving(false);
    showFeedback('success', 'User updated.');
  };

  // ── Delete user ────────────────────────────────────────────────────────────
  const handleDelete = async (userId: string, email: string) => {
    if (userId === currentUserId) {
      showFeedback('error', 'You cannot delete your own account.');
      return;
    }
    if (!confirm(`Remove ${email} from admin access? This cannot be undone.`)) return;

    const supabase = createClient();
    const { error } = await supabase.from('admin_profiles').delete().eq('id', userId);

    if (error) {
      showFeedback('error', 'Failed to remove user: ' + error.message);
      return;
    }

    setUsers(users.filter((u) => u.id !== userId));
    showFeedback('success', `${email} removed.`);
  };

  const formatJoined = (iso: string) => {
    try { return format(new Date(iso), 'd MMM yyyy'); } catch { return ''; }
  };

  return (
    <div className="bg-neutral-50 min-h-screen pb-24">
      <div className="pt-12 px-6 md:px-12 max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-12 border-b border-neutral-900 pb-6">
          <div>
            <h1 className="font-oswald text-5xl md:text-7xl uppercase mb-2">User Manager</h1>
            <p className="text-sm text-neutral-500 font-inter">Manage admin access and roles</p>
          </div>
          {!showAddForm && (
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 bg-neutral-900 text-white px-6 py-3 font-oswald uppercase tracking-widest text-sm hover:bg-neutral-800 transition-colors shrink-0"
            >
              <Plus className="w-4 h-4" />
              Add User
            </button>
          )}
        </div>

        {/* Feedback */}
        {feedback && (
          <div className={`mb-8 px-5 py-3 text-sm font-inter border-l-4 ${
            feedback.type === 'success'
              ? 'bg-green-50 border-green-600 text-green-800'
              : 'bg-red-50 border-red-600 text-red-700'
          }`}>
            {feedback.message}
          </div>
        )}

        {/* ── ADD USER FORM ──────────────────────────────────────────────── */}
        {showAddForm && (
          <div className="bg-white border border-neutral-200 p-8 mb-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-oswald text-2xl uppercase">Add New User</h2>
              <button onClick={resetAddForm} className="text-neutral-400 hover:text-neutral-900">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field label="Email" required>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setF({ email: e.target.value })}
                  className={inputCls}
                  placeholder="user@example.com"
                  autoFocus
                />
              </Field>

              <Field label="Full Name">
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(e) => setF({ fullName: e.target.value })}
                  className={inputCls}
                  placeholder="e.g. Maria Papadopoulou"
                />
              </Field>

              <Field label="Password" required>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setF({ password: e.target.value })}
                  className={inputCls}
                  placeholder="Min 6 characters"
                />
              </Field>

              <Field label="Role">
                <select
                  value={form.role}
                  onChange={(e) => setF({ role: e.target.value as 'editor' | 'super_admin' })}
                  className={inputCls}
                >
                  <option value="editor">Editor — can manage Menu &amp; Events</option>
                  <option value="super_admin">Super Admin — full access</option>
                </select>
              </Field>
            </div>

            <div className="flex gap-4 mt-8 pt-6 border-t border-neutral-200">
              <button
                onClick={handleAdd}
                disabled={saving}
                className="flex items-center gap-2 bg-neutral-900 text-white px-8 py-3 font-oswald uppercase tracking-widest text-sm hover:bg-neutral-800 transition-colors disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                {saving ? 'Creating...' : 'Create User'}
              </button>
              <button
                onClick={resetAddForm}
                className="border border-neutral-300 px-8 py-3 font-oswald uppercase tracking-widest text-sm hover:border-neutral-900 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* ── USER LIST ──────────────────────────────────────────────────── */}
        <div className="space-y-4">
          <h2 className="font-oswald text-2xl uppercase mb-6">
            All Users ({users.length})
          </h2>

          {users.length === 0 ? (
            <div className="text-center py-24 border border-dashed border-neutral-300">
              <p className="text-neutral-400 font-inter">No users yet.</p>
            </div>
          ) : (
            users.map((u) => (
              <div
                key={u.id}
                className={`bg-white border p-6 transition-colors ${
                  editingId === u.id
                    ? 'border-neutral-900'
                    : 'border-neutral-200 hover:border-neutral-400'
                }`}
              >
                {editingId === u.id ? (
                  /* ── Edit mode ──────────────────────────────────────── */
                  <div className="flex items-start gap-4">
                    <AvatarImg avatarId={u.avatar} name={u.full_name} email={u.email} role={editRole} />
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                      <input
                        type="text"
                        value={editFullName}
                        onChange={(e) => setEditFullName(e.target.value)}
                        placeholder="Full name"
                        className="border border-neutral-300 px-3 py-2.5 text-sm font-inter focus:outline-none focus:border-neutral-900 bg-white"
                      />
                      <select
                        value={editRole}
                        onChange={(e) => setEditRole(e.target.value as 'editor' | 'super_admin')}
                        className="border border-neutral-300 px-3 py-2.5 text-sm font-inter focus:outline-none focus:border-neutral-900 bg-white"
                      >
                        <option value="editor">Editor</option>
                        <option value="super_admin">Super Admin</option>
                      </select>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleUpdate(u.id)}
                          disabled={editSaving}
                          className="flex items-center gap-1.5 bg-neutral-900 text-white px-5 py-2.5 text-xs font-oswald uppercase tracking-widest hover:bg-neutral-800 transition-colors disabled:opacity-50"
                        >
                          {editSaving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                          Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="border border-neutral-300 px-3 py-2.5 hover:border-neutral-900 transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* ── View mode ──────────────────────────────────────── */
                  <div className="flex items-center gap-4">
                    <AvatarImg avatarId={u.avatar} name={u.full_name} email={u.email} role={u.role} />

                    {/* Name + email */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="font-oswald text-lg uppercase truncate">
                          {u.full_name || u.email}
                        </p>
                        {u.id === currentUserId && (
                          <span className="text-xs bg-neutral-100 text-neutral-500 px-2 py-0.5 font-inter shrink-0">you</span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs font-inter text-neutral-400">
                        {u.full_name && <span className="truncate">{u.email}</span>}
                        {u.full_name && <span>·</span>}
                        <span>Joined {formatJoined(u.created_at)}</span>
                      </div>
                    </div>

                    {/* Role badge + actions */}
                    <div className="flex items-center gap-3 shrink-0">
                      <span className={`flex items-center gap-1.5 text-xs font-oswald uppercase tracking-widest px-3 py-1.5 ${
                        u.role === 'super_admin'
                          ? 'bg-neutral-900 text-white'
                          : 'bg-neutral-100 text-neutral-600'
                      }`}>
                        {u.role === 'super_admin'
                          ? <><ShieldCheck className="w-3 h-3" /> Super Admin</>
                          : <><User className="w-3 h-3" /> Editor</>
                        }
                      </span>

                      <button
                        onClick={() => startEdit(u)}
                        className="p-2 hover:bg-neutral-100 transition-colors"
                        title="Edit user"
                      >
                        <Edit2 className="w-4 h-4 text-neutral-500" />
                      </button>

                      <button
                        onClick={() => handleDelete(u.id, u.email)}
                        disabled={u.id === currentUserId}
                        className="p-2 hover:bg-red-50 transition-colors disabled:opacity-25 disabled:cursor-not-allowed"
                        title="Remove user"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Role legend */}
        <div className="mt-12 border-l-2 border-neutral-900 pl-6 py-4 bg-neutral-100">
          <p className="text-sm font-inter text-neutral-700 mb-1">
            <strong className="font-oswald uppercase tracking-wider">Editor</strong>
            {' '}— can manage Menu and Events. Cannot access User Manager.
          </p>
          <p className="text-sm font-inter text-neutral-700">
            <strong className="font-oswald uppercase tracking-wider">Super Admin</strong>
            {' '}— full access including User Manager. Can create and remove users.
          </p>
        </div>

      </div>
    </div>
  );
}
