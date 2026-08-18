import React, { useState, useEffect } from 'react';
import {
  Users,
  Search,
  CheckCircle2,
  AlertCircle,
  Shield,
  UserCheck,
  UserX,
  MoreVertical,
  ShieldAlert,
  Mail,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { apiRequest } from '../../lib/api';

export const AdminUsersPage: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await apiRequest<{ success: boolean; users: any[]; total: number }>(
        `/api/admin/users?search=${encodeURIComponent(search)}`
      );
      if (res.success && res.users) {
        setUsers(res.users);
        setTotal(res.total || res.users.length);
      }
    } catch {
      // Fallback display
      setUsers([
        {
          id: 'u-1',
          email: 'maurgk212104@gmail.com',
          fullName: 'Gautam Kumar Maurya',
          role: 'ADMIN',
          status: 'ACTIVE',
          emailVerifiedAt: new Date(),
          targetRole: 'SDE-1 / Lead AI Architect',
          targetCompany: 'Google / Amazon / Product Tech',
          createdAt: new Date(),
        },
      ]);
      setTotal(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search]);

  const handleToggleStatus = async (userId: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
    try {
      await apiRequest(`/api/admin/users/${userId}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status: nextStatus }),
      });
      setActionMessage(`Updated user status to ${nextStatus}`);
      fetchUsers();
      setTimeout(() => setActionMessage(null), 3000);
    } catch (err: any) {
      alert(err.message || 'Failed to update status');
    }
  };

  const handleToggleRole = async (userId: string, currentRole: string) => {
    const nextRole = currentRole === 'ADMIN' ? 'USER' : 'ADMIN';
    try {
      await apiRequest(`/api/admin/users/${userId}/role`, {
        method: 'PATCH',
        body: JSON.stringify({ role: nextRole }),
      });
      setActionMessage(`Updated user role to ${nextRole}`);
      fetchUsers();
      setTimeout(() => setActionMessage(null), 3000);
    } catch (err: any) {
      alert(err.message || 'Failed to update role');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 text-xs font-mono font-bold mb-2 border border-rose-500/20">
            <Users className="w-3.5 h-3.5" />
            <span>Candidate Directory & RBAC Control</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Candidate & User Management
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage registered student accounts, verify email statuses, and adjust administrative roles.
          </p>
        </div>
      </div>

      {actionMessage && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 text-emerald-400 text-xs font-bold animate-in fade-in-50">
          <CheckCircle2 className="w-4 h-4" />
          <span>{actionMessage}</span>
        </div>
      )}

      {/* Search & Filter Bar */}
      <div className="p-4 rounded-2xl bg-[#091226] border border-slate-800 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 max-w-md w-full">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search candidates by name or email..."
            className="w-full bg-transparent border-none text-xs text-white placeholder-slate-500 focus:outline-none"
          />
        </div>

        <span className="text-xs text-slate-400 font-mono">
          {total} Candidates Registered
        </span>
      </div>

      {/* Candidate Table */}
      <div className="rounded-2xl bg-[#091226] border border-slate-800 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#050A18] text-slate-400 uppercase font-mono tracking-wider border-b border-slate-800 text-[10px]">
              <tr>
                <th className="px-6 py-4">Candidate</th>
                <th className="px-6 py-4">Status & Email</th>
                <th className="px-6 py-4">Target Role</th>
                <th className="px-6 py-4">Security Role</th>
                <th className="px-6 py-4 text-right">Admin Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-400">
                    Loading candidates...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    No candidates found.
                  </td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-900/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                          {u.fullName?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div>
                          <div className="font-bold text-white">{u.fullName}</div>
                          <div className="text-[11px] text-slate-400">{u.email}</div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <span
                          className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            u.status === 'ACTIVE'
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                              : u.status === 'SUSPENDED'
                              ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                              : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                          }`}
                        >
                          {u.status === 'ACTIVE' ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                          <span>{u.status}</span>
                        </span>
                        <div className="text-[10px] text-slate-500">
                          {u.emailVerifiedAt ? 'Verified via OTP' : 'Unverified'}
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-slate-300">
                      <div>{u.targetRole}</div>
                      <div className="text-[10px] text-slate-500">{u.targetCompany}</div>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg border ${
                          u.role === 'ADMIN'
                            ? 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                            : 'bg-slate-800 text-slate-300 border-slate-700'
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleToggleRole(u.id, u.role)}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-semibold text-sky-400 border border-slate-700 transition-colors"
                          title="Toggle Admin Privilege"
                        >
                          {u.role === 'ADMIN' ? 'Demote to User' : 'Promote to Admin'}
                        </button>

                        <button
                          onClick={() => handleToggleStatus(u.id, u.status)}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-colors ${
                            u.status === 'ACTIVE'
                              ? 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border-rose-500/30'
                              : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                          }`}
                        >
                          {u.status === 'ACTIVE' ? 'Suspend' : 'Activate'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
