import React from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import {
  ShieldCheck,
  Users,
  Activity,
  Radio,
  FileQuestion,
  ArrowLeft,
  Server,
  Lock,
  Cpu,
  KeyRound,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminLayout: React.FC = () => {
  const { user } = useAuth();

  const navItems = [
    { to: '/admin', label: 'System Overview & Metrics', icon: Activity, end: true },
    { to: '/admin/users', label: 'Candidate & User Directory', icon: Users },
    { to: '/admin/security', label: 'Security & Audit Logs', icon: Lock },
    { to: '/admin/broadcast', label: 'Broadcast Dispatcher', icon: Radio },
    { to: '/admin/questions', label: 'Question Bank & Drills', icon: FileQuestion },
  ];

  return (
    <div className="min-h-screen bg-[#040814] text-slate-100 flex flex-col font-sans selection:bg-rose-500 selection:text-white">
      {/* Top Root Security Banner */}
      <div className="bg-gradient-to-r from-rose-950 via-slate-950 to-indigo-950 border-b border-rose-500/30 px-4 py-2 flex items-center justify-between text-[11px] font-mono text-rose-300">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
          <span className="font-extrabold uppercase tracking-widest text-rose-400">
            ROOT SECURITY CLEARANCE: LEVEL 5
          </span>
          <span className="hidden sm:inline text-slate-400">• Master Super Admin Portal</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-slate-400">Operator: <strong className="text-white">{user?.email}</strong></span>
          <Link
            to="/dashboard"
            className="flex items-center gap-1 text-sky-400 hover:text-sky-300 font-bold ml-2 bg-slate-900 px-2 py-0.5 rounded border border-slate-800"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>Candidate Dashboard</span>
          </Link>
        </div>
      </div>

      {/* Main Admin Body Grid */}
      <div className="flex-1 flex overflow-hidden">
        {/* Admin Sidebar */}
        <aside className="w-64 bg-[#070D1F] border-r border-slate-800/80 p-4 hidden md:flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            <div className="px-3 py-2 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-rose-500/20">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-black tracking-tight text-white">IntervAI Core Admin</div>
                <div className="text-[10px] text-rose-400 font-mono">RBAC Security v2.0</div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="px-3 py-1 text-[9px] uppercase font-mono font-bold text-slate-400 tracking-wider">
                Management Modules
              </div>
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                      `w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                        isActive
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                      }`
                    }
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>

          {/* Real-time Server Health Pill */}
          <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-[11px] space-y-2 font-mono">
            <div className="flex items-center justify-between text-slate-400">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <Server className="w-3.5 h-3.5" />
                Backend Node
              </span>
              <span className="text-[10px] font-bold text-emerald-400">ONLINE</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span className="flex items-center gap-1.5 text-sky-400">
                <Cpu className="w-3.5 h-3.5" />
                TLS Channel
              </span>
              <span className="text-[10px] font-bold text-sky-400">256-bit AES</span>
            </div>
          </div>
        </aside>

        {/* Admin Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#040814]">
          <div className="max-w-7xl mx-auto space-y-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
