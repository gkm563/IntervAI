import React, { useState, useEffect, useRef } from 'react';
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
  CheckCheck,
  Trash2,
  Clock,
  ShieldAlert,
  Info,
  CheckCircle,
  Sun,
  Moon,
  Flame,
  Trophy,
  Zap,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useGamification } from '../../context/GamificationContext';
import { GamificationModal } from '../gamification/GamificationModal';
import { GlobalSearchModal } from '../search/GlobalSearchModal';
import { apiRequest } from '../../lib/api';
import { NotificationItem, UserDashboardStats } from '../../lib/types';

export const DashboardLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const {
    xp,
    level,
    levelTitle,
    progressPercent,
    streakDays,
    recentReward,
    dismissRewardToast,
  } = useGamification();

  const navigate = useNavigate();
  const location = useLocation();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [gamificationModalOpen, setGamificationModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  
  // Notification State
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [loadingNotifications, setLoadingNotifications] = useState<boolean>(false);
  
  // Dashboard Stats State (Real dynamic user statistics)
  const [stats, setStats] = useState<UserDashboardStats>({
    readinessScore: 0,
    readinessLevel: 'Uncalibrated (Take 1st Mock)',
    interviewsCompleted: 0,
    totalQuestionsAnswered: 0,
    weaknessesCount: 0,
    hasResume: false,
    activeDrillsCount: 0,
  });

  const notifRef = useRef<HTMLDivElement>(null);

  // Close notifications dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch real notifications and stats
  const fetchNotifications = async () => {
    try {
      setLoadingNotifications(true);
      const res = await apiRequest<{ success: boolean; notifications: NotificationItem[]; unreadCount: number }>('/api/notifications');
      if (res.success) {
        setNotifications(res.notifications || []);
        setUnreadCount(res.unreadCount || 0);
      }
    } catch {
      // Keep silent
    } finally {
      setLoadingNotifications(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await apiRequest<{ success: boolean; stats: UserDashboardStats }>('/api/users/stats');
      if (res.success && res.stats) {
        setStats(res.stats);
      }
    } catch {
      // Keep real 0 state
    }
  };

  useEffect(() => {
    fetchNotifications();
    fetchStats();
    
    // Periodic light poll for new notifications every 30s
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleMarkAsRead = async (id: string, linkUrl?: string | null) => {
    try {
      await apiRequest(`/api/notifications/${id}/read`, { method: 'PATCH' });
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
      if (linkUrl) {
        setNotificationsOpen(false);
        navigate(linkUrl);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await apiRequest('/api/notifications/read-all', { method: 'PATCH' });
      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
      setUnreadCount(0);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteNotification = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await apiRequest(`/api/notifications/${id}`, { method: 'DELETE' });
      const target = notifications.find((n) => n.id === id);
      if (target && !target.is_read) {
        setUnreadCount((prev) => Math.max(0, prev - 1));
      }
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Global Ctrl+K / Cmd+K search shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const formatRelativeTime = (dateStr: string) => {
    try {
      const diffMs = Date.now() - new Date(dateStr).getTime();
      const diffMins = Math.floor(diffMs / 60000);
      if (diffMins < 1) return 'Just now';
      if (diffMins < 60) return `${diffMins}m ago`;
      const diffHours = Math.floor(diffMins / 60);
      if (diffHours < 24) return `${diffHours}h ago`;
      const diffDays = Math.floor(diffHours / 24);
      return `${diffDays}d ago`;
    } catch {
      return '';
    }
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
    <div className={`min-h-screen ${theme === 'light' ? 'bg-[#F8FAFC] text-slate-900' : 'bg-[#070F22] text-slate-100'} flex flex-col font-sans transition-colors duration-200`}>
      {/* Gamification Modal */}
      <GamificationModal
        isOpen={gamificationModalOpen}
        onClose={() => setGamificationModalOpen(false)}
      />

      {/* Global Command Palette / Search Modal */}
      <GlobalSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onOpenGamification={() => setGamificationModalOpen(true)}
      />

      {/* Floating XP Reward Toast */}
      {recentReward && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-amber-300">
            <Trophy className="w-5 h-5 animate-spin" />
            <div>
              <div className="text-xs font-black">+{recentReward.amount} XP EARNED!</div>
              <div className="text-[10px] opacity-90">{recentReward.reason}</div>
            </div>
            <button onClick={dismissRewardToast} className="p-1 hover:opacity-75">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Top Header Bar */}
      <header className={`sticky top-0 z-40 ${theme === 'light' ? 'bg-white/95 border-slate-200 shadow-sm' : 'bg-[#0B1B3A]/95 border-slate-800 shadow-md'} backdrop-blur-md border-b px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between`}>
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
              <span className={`text-lg font-extrabold tracking-tight font-['Plus_Jakarta_Sans',sans-serif] ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                Interv<span className="text-sky-500">AI</span>
              </span>
              <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400 -mt-1 hidden sm:block">
                Candidate Workspace
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Global Search Bar Trigger (Click or Ctrl+K) */}
        <div
          onClick={() => setSearchModalOpen(true)}
          className={`hidden md:flex items-center justify-between relative max-w-sm w-full mx-6 px-3.5 py-2 rounded-xl border cursor-pointer transition-all ${
            theme === 'light'
              ? 'bg-slate-50 border-slate-200 text-slate-500 hover:border-sky-400 shadow-sm'
              : 'bg-slate-900/90 border-slate-700/80 text-slate-400 hover:border-sky-500/80'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <Search className="w-4 h-4 text-sky-500" />
            <span className="text-xs">Search questions, skills, modalities...</span>
          </div>
          <div className="flex items-center gap-1">
            <kbd className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold border ${
              theme === 'light' ? 'bg-white border-slate-200 text-slate-600' : 'bg-slate-800 border-slate-700 text-slate-300'
            }`}>
              Ctrl K
            </kbd>
          </div>
        </div>

        {/* Center: Gamified XP & Streak Header Bar */}
        <div
          onClick={() => setGamificationModalOpen(true)}
          className={`hidden xl:flex items-center gap-3 px-3.5 py-1.5 rounded-2xl border cursor-pointer transition-all hover:scale-105 ${
            theme === 'light'
              ? 'bg-slate-50 border-slate-200 hover:border-sky-400 shadow-sm'
              : 'bg-slate-900/90 border-slate-700/80 hover:border-sky-500/80'
          }`}
          title="Click to view quests & badges"
        >
          {/* Level Badge */}
          <div className="flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-lg bg-gradient-to-tr from-sky-400 to-indigo-600 flex items-center justify-center text-[10px] font-black text-white shadow-sm">
              {level}
            </span>
            <span className="text-xs font-extrabold text-sky-400">Lv.{level} {levelTitle}</span>
          </div>

          {/* XP Progress Mini Bar */}
          <div className="w-20 bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-sky-400 to-emerald-400 h-1.5 rounded-full"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>

          {/* Streak Flame */}
          <div className="flex items-center gap-1 text-xs font-black text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
            <Flame className="w-3.5 h-3.5 fill-amber-500" />
            <span>{streakDays}d</span>
          </div>
        </div>

        {/* Right: Actions, Theme Switcher, Notifications & User Dropdown */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Light / Dark Mode Toggle Button */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-xl border transition-all cursor-pointer ${
              theme === 'light'
                ? 'bg-slate-100 border-slate-200 text-amber-600 hover:bg-slate-200'
                : 'bg-slate-900 border-slate-700 text-sky-400 hover:bg-slate-800'
            }`}
            title={theme === 'light' ? 'Switch to Dark Navy Mode' : 'Switch to Clean Light Mode'}
          >
            {theme === 'light' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Real Notification Bell */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => {
                setNotificationsOpen(!notificationsOpen);
                if (!notificationsOpen) fetchNotifications();
              }}
              className={`p-2 rounded-xl transition-colors relative cursor-pointer ${
                theme === 'light'
                  ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 min-w-[16px] h-4 px-1 rounded-full bg-sky-500 text-white text-[10px] font-extrabold flex items-center justify-center animate-pulse">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown Panel */}
            {notificationsOpen && (
              <div className={`absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl border shadow-2xl z-50 overflow-hidden animate-in fade-in-50 duration-100 ${
                theme === 'light' ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#0B1B3A] border-slate-700 text-white'
              }`}>
                <div className={`p-3.5 border-b flex items-center justify-between ${theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-slate-800'}`}>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider">Notifications</span>
                    {unreadCount > 0 && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-500 border border-sky-500/30">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={handleMarkAllRead}
                      className="text-[11px] text-sky-500 hover:text-sky-400 font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <CheckCheck className="w-3.5 h-3.5" />
                      <span>Mark all read</span>
                    </button>
                  )}
                </div>

                {/* Notifications List */}
                <div className="max-h-80 overflow-y-auto divide-y divide-slate-200/60 dark:divide-slate-800/60">
                  {loadingNotifications ? (
                    <div className="p-6 text-center text-xs text-slate-400">Loading notifications...</div>
                  ) : notifications.length === 0 ? (
                    <div className="p-8 text-center space-y-2">
                      <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800/80 flex items-center justify-center mx-auto text-slate-400">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                      <div className="text-xs font-bold text-slate-700 dark:text-slate-300">You&apos;re all caught up!</div>
                      <p className="text-[11px] text-slate-400">No notifications right now.</p>
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => handleMarkAsRead(notif.id, notif.link_url)}
                        className={`p-3.5 flex items-start gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer ${
                          !notif.is_read ? 'bg-sky-50/50 dark:bg-sky-950/20' : ''
                        }`}
                      >
                        <div className="mt-0.5 flex-shrink-0">
                          {notif.type === 'AUTH' ? (
                            <div className="w-7 h-7 rounded-lg bg-sky-500/10 text-sky-500 flex items-center justify-center">
                              <ShieldAlert className="w-3.5 h-3.5" />
                            </div>
                          ) : (
                            <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
                              <Info className="w-3.5 h-3.5" />
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <h4 className={`text-xs font-bold truncate ${!notif.is_read ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-300'}`}>
                              {notif.title}
                            </h4>
                            <span className="text-[10px] text-slate-400 flex-shrink-0 flex items-center gap-1">
                              <Clock className="w-2.5 h-2.5" />
                              {formatRelativeTime(notif.created_at)}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5 leading-relaxed">
                            {notif.message}
                          </p>
                        </div>

                        <button
                          onClick={(e) => handleDeleteNotification(notif.id, e)}
                          className="text-slate-400 hover:text-rose-500 p-1 transition-colors"
                          title="Delete notification"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Avatar & Dropdown */}
          <div className="relative">
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className={`flex items-center gap-2.5 p-1 rounded-xl transition-colors cursor-pointer ${
                theme === 'light' ? 'hover:bg-slate-100' : 'hover:bg-slate-800/80'
              }`}
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white shadow-md">
                {user?.fullName?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="hidden sm:block text-left pr-1">
                <div className={`text-xs font-bold leading-tight ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>{user?.fullName || 'Candidate'}</div>
                <div className="text-[10px] text-sky-500 font-medium truncate max-w-[120px]">{user?.email}</div>
              </div>
            </button>

            {userDropdownOpen && (
              <div className={`absolute right-0 mt-2 w-56 rounded-2xl border shadow-2xl p-2 z-50 animate-in fade-in-50 duration-100 ${
                theme === 'light' ? 'bg-white border-slate-200' : 'bg-[#0B1B3A] border-slate-700'
              }`}>
                <div className={`px-3 py-2 border-b mb-1 ${theme === 'light' ? 'border-slate-100' : 'border-slate-800'}`}>
                  <p className={`text-xs font-bold ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>{user?.fullName}</p>
                  <p className="text-[10px] text-slate-400 truncate">{user?.email}</p>
                </div>
                <Link
                  to="/dashboard/settings"
                  onClick={() => setUserDropdownOpen(false)}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-colors ${
                    theme === 'light' ? 'text-slate-700 hover:bg-slate-100' : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <Settings className="w-4 h-4 text-slate-400" />
                  Account Settings
                </Link>
                <button
                  onClick={() => {
                    setUserDropdownOpen(false);
                    setGamificationModalOpen(true);
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-colors ${
                    theme === 'light' ? 'text-slate-700 hover:bg-slate-100' : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  <Trophy className="w-4 h-4 text-amber-500" />
                  Quests & Badges
                </button>
                <div className={`my-1 border-t ${theme === 'light' ? 'border-slate-100' : 'border-slate-800'}`}></div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors cursor-pointer"
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
        <aside className={`w-64 border-r p-4 hidden lg:flex flex-col justify-between overflow-y-auto ${
          theme === 'light' ? 'bg-white border-slate-200' : 'bg-[#09152E] border-slate-800'
        }`}>
          <div className="space-y-1.5">
            <div className="px-3 py-2 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
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
                        ? 'bg-sky-500/15 text-sky-500 border border-sky-500/30 shadow-sm'
                        : theme === 'light'
                        ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${
                      theme === 'light' ? 'bg-slate-100 text-slate-600 border-slate-200' : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </div>

          {/* Real Dynamic Sidebar Readiness Status */}
          <div className={`p-4 rounded-2xl border text-xs space-y-2.5 ${
            theme === 'light' ? 'bg-sky-50/70 border-sky-200' : 'bg-gradient-to-br from-sky-950/40 to-indigo-950/40 border-sky-800/30'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-sky-500 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Readiness Score
              </span>
              <span className="text-xs font-extrabold text-emerald-500">{stats.readinessScore}%</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-sky-400 to-emerald-400 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${Math.max(4, stats.readinessScore)}%` }}
              ></div>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-[10px] leading-relaxed">
              {stats.interviewsCompleted === 0
                ? 'Complete your first diagnostic mock interview to calibrate your score.'
                : `Status: ${stats.readinessLevel}.`}
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
            <div className={`relative w-72 border-r p-4 flex flex-col justify-between z-10 ${
              theme === 'light' ? 'bg-white border-slate-200' : 'bg-[#09152E] border-slate-800'
            }`}>
              <div className="space-y-1.5">
                <div className={`flex items-center justify-between pb-4 mb-2 border-b ${theme === 'light' ? 'border-slate-200' : 'border-slate-800'}`}>
                  <span className="text-xs font-bold uppercase tracking-wider">Navigation</span>
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
                            ? 'bg-sky-500/15 text-sky-500 border border-sky-500/30'
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

              <div className={`pt-4 border-t ${theme === 'light' ? 'border-slate-200' : 'border-slate-800'}`}>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 font-semibold"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className={`flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 ${theme === 'light' ? 'bg-[#F8FAFC]' : 'bg-[#070F22]'}`}>
          <div className="max-w-7xl mx-auto space-y-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
