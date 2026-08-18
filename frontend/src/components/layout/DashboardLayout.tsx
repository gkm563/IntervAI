import React, { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  Bot,
  Home,
  FileText,
  Video,
  Award,
  BookOpen,
  TrendingUp,
  Calendar,
  Settings,
  LogOut,
  Bell,
  Search,
  Menu,
  X,
  User,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const DashboardLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navItems = [
    { to: '/dashboard', label: 'Home Overview', icon: Home, end: true },
    { to: '/dashboard/resume', label: 'Resume & Profile', icon: FileText, badge: 'M2' },
    { to: '/dashboard/interviews', label: 'Interviews', icon: Video, badge: 'M3' },
    { to: '/dashboard/reports', label: 'Reports & Analytics', icon: Award, badge: 'M4' },
    { to: '/dashboard/practice', label: 'Practice Drills', icon: BookOpen, badge: 'M4' },
    { to: '/dashboard/progress', label: 'Readiness Progress', icon: TrendingUp, badge: 'M8' },
    { to: '/dashboard/schedule', label: 'Schedule & Calendar', icon: Calendar },
    { to: '/dashboard/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#070F22] text-slate-100 flex flex-col font-sans">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-[#0B1B3A]/95 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between shadow-md">
        {/* Left: Mobile Toggle & Brand */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Toggle sidebar"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link to="/dashboard" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-400 via-sky-600 to-indigo-700 flex items-center justify-center shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-extrabold tracking-tight text-white font-['Plus_Jakarta_Sans',sans-serif]">
                Interv<span className="text-sky-400">AI</span>
              </span>
              <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400 -mt-1 hidden sm:block">
                Candidate Workspace
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Global Search Bar */}
        <div className="hidden md:flex items-center relative max-w-md w-full mx-8">
          <Search className="w-4 h-4 absolute left-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search questions, projects, metrics..."
            className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all"
          />
        </div>

        {/* Right: Actions & User Dropdown */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            to="/"
            className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 px-3 py-1.5 rounded-lg border border-slate-800 hover:bg-slate-800/60 transition-colors"
          >
            <span>Landing Page</span>
            <ExternalLink className="w-3 h-3 text-slate-500" />
          </Link>

          <button
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors relative"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
          </button>

          {/* User Avatar & Dropdown */}
          <div className="relative">
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-slate-800/80 transition-colors cursor-pointer"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white shadow-md">
                {user?.fullName?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="hidden sm:block text-left pr-1">
                <div className="text-xs font-bold text-white leading-tight">{user?.fullName || 'Candidate'}</div>
                <div className="text-[10px] text-sky-400 font-medium truncate max-w-[120px]">{user?.email}</div>
              </div>
            </button>

            {userDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#0B1B3A] border border-slate-700 shadow-2xl p-2 z-50 animate-in fade-in-50 duration-100">
                <div className="px-3 py-2 border-b border-slate-800 mb-1">
                  <p className="text-xs font-bold text-white">{user?.fullName}</p>
                  <p className="text-[10px] text-slate-400 truncate">{user?.email}</p>
                </div>
                <Link
                  to="/dashboard/settings"
                  onClick={() => setUserDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
                >
                  <Settings className="w-4 h-4 text-slate-400" />
                  Account Settings
                </Link>
                <Link
                  to="/dashboard/resume"
                  onClick={() => setUserDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
                >
                  <FileText className="w-4 h-4 text-slate-400" />
                  My Resume Profile
                </Link>
                <div className="my-1 border-t border-slate-800"></div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* App Body Grid */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="w-64 bg-[#09152E] border-r border-slate-800 p-4 hidden lg:flex flex-col justify-between overflow-y-auto">
          <div className="space-y-1.5">
            <div className="px-3 py-2 text-[10px] uppercase font-bold text-slate-500 tracking-wider">
              Workspace Navigation
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-sky-500/15 text-sky-400 border border-sky-500/30 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </div>

          {/* Sidebar Readiness Status Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-sky-950/40 to-indigo-950/40 border border-sky-800/30 text-xs space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-sky-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Readiness Score
              </span>
              <span className="text-xs font-extrabold text-emerald-400">74%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div className="bg-gradient-to-r from-sky-400 to-emerald-400 h-1.5 rounded-full w-[74%]"></div>
            </div>
            <p className="text-slate-400 text-[10px] leading-relaxed">
              Targeting: SDE-1 / Frontend Roles. Practice 2 drills to level up.
            </p>
          </div>
        </aside>

        {/* Mobile Sidebar Drawer */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <div className="relative w-72 bg-[#09152E] border-r border-slate-800 p-4 flex flex-col justify-between z-10">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between pb-4 mb-2 border-b border-slate-800">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">Navigation</span>
                  <button
                    onClick={() => setMobileSidebarOpen(false)}
                    className="p-1 text-slate-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.end}
                      onClick={() => setMobileSidebarOpen(false)}
                      className={({ isActive }) =>
                        `w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                          isActive
                            ? 'bg-sky-500/15 text-sky-400 border border-sky-500/30'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                        }`
                      }
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                          {item.badge}
                        </span>
                      )}
                    </NavLink>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-slate-800">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs text-rose-400 hover:bg-rose-500/10 font-semibold"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#070F22]">
          <div className="max-w-7xl mx-auto space-y-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
