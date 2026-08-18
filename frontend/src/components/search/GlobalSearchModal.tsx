import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  BookOpen,
  Video,
  FileText,
  Award,
  TrendingUp,
  Calendar,
  Settings,
  X,
  ArrowRight,
  Sparkles,
  Command,
  Sun,
  Moon,
  Trophy,
  Code,
  Mic,
  MessageSquare,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export interface SearchResultItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'NAVIGATION' | 'DRILL' | 'MODALITY' | 'ACTION' | 'SETTINGS';
  icon: any;
  action: () => void;
  keywords: string[];
}

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenGamification?: () => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onOpenGamification,
}) => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Search catalog index
  const searchIndex: SearchResultItem[] = [
    // Navigation
    {
      id: 'nav-overview',
      title: 'Home Overview',
      subtitle: 'View Placement Readiness ring, status overview, and launchpad',
      category: 'NAVIGATION',
      icon: TrendingUp,
      action: () => {
        navigate('/dashboard');
        onClose();
      },
      keywords: ['home', 'overview', 'dashboard', 'readiness', 'score', 'status'],
    },
    {
      id: 'nav-resume',
      title: 'Resume & Profile',
      subtitle: 'Upload resume PDF, edit skills, and configure target job goals',
      category: 'NAVIGATION',
      icon: FileText,
      action: () => {
        navigate('/dashboard/resume');
        onClose();
      },
      keywords: ['resume', 'cv', 'profile', 'skills', 'upload', 'pdf', 'target role', 'company'],
    },
    {
      id: 'nav-interviews',
      title: 'Interviews Simulation Room',
      subtitle: 'Configure and launch mock interviews in Voice, 3D Avatar, or Text mode',
      category: 'NAVIGATION',
      icon: Video,
      action: () => {
        navigate('/dashboard/interviews');
        onClose();
      },
      keywords: ['interview', 'mock', 'simulation', 'voice', 'avatar', 'video', 'text', 'room', 'start'],
    },
    {
      id: 'nav-reports',
      title: 'Reports & Analytics',
      subtitle: 'Analyze multi-rubric evaluation, STAR feedback, and export PDF',
      category: 'NAVIGATION',
      icon: Award,
      action: () => {
        navigate('/dashboard/reports');
        onClose();
      },
      keywords: ['reports', 'analytics', 'feedback', 'evaluation', 'star', 'score', 'metrics', 'pdf'],
    },
    {
      id: 'nav-practice',
      title: 'Practice Drills Gym',
      subtitle: 'Bite-sized question drills (+40 XP reward per question)',
      category: 'NAVIGATION',
      icon: BookOpen,
      action: () => {
        navigate('/dashboard/practice');
        onClose();
      },
      keywords: ['practice', 'drills', 'gym', 'questions', 'exercises', 'xp', 'star method', 'challenge'],
    },
    {
      id: 'nav-progress',
      title: 'Readiness Progress & Memory',
      subtitle: 'Track your score trajectory over 30 days and AI long-term memory notes',
      category: 'NAVIGATION',
      icon: TrendingUp,
      action: () => {
        navigate('/dashboard/progress');
        onClose();
      },
      keywords: ['progress', 'trajectory', 'memory', 'growth', 'mastery', 'vector', 'history'],
    },
    {
      id: 'nav-schedule',
      title: 'Schedule & Calendar',
      subtitle: 'Plan upcoming mock sessions and book practice slots',
      category: 'NAVIGATION',
      icon: Calendar,
      action: () => {
        navigate('/dashboard/schedule');
        onClose();
      },
      keywords: ['schedule', 'calendar', 'book', 'slot', 'reminder', 'time', 'date'],
    },
    {
      id: 'nav-settings',
      title: 'Account Settings & Security',
      subtitle: 'Update full name, verified email, password, and notification preferences',
      category: 'NAVIGATION',
      icon: Settings,
      action: () => {
        navigate('/dashboard/settings');
        onClose();
      },
      keywords: ['settings', 'account', 'password', 'security', 'profile', 'notifications', 'email'],
    },

    // Interview Modalities
    {
      id: 'mode-avatar',
      title: 'Launch 3D Avatar Video Interview',
      subtitle: 'Procedural 3D animated interviewer with viseme lip-sync & webcam preview',
      category: 'MODALITY',
      icon: Video,
      action: () => {
        navigate('/dashboard/interviews');
        onClose();
      },
      keywords: ['3d avatar', 'avatar', 'video', 'webcam', 'lip sync', 'viseme', 'alex'],
    },
    {
      id: 'mode-voice',
      title: 'Launch Voice Speech-to-Speech Interview',
      subtitle: 'Real-time STT speech recognition & TTS audio playback',
      category: 'MODALITY',
      icon: Mic,
      action: () => {
        navigate('/dashboard/interviews');
        onClose();
      },
      keywords: ['voice', 'speech', 'audio', 'mic', 'microphone', 'stt', 'tts'],
    },
    {
      id: 'mode-text',
      title: 'Launch Text-Only Simulation',
      subtitle: 'Rapid chat-driven mock session with instant rubric scoring',
      category: 'MODALITY',
      icon: MessageSquare,
      action: () => {
        navigate('/dashboard/interviews');
        onClose();
      },
      keywords: ['text', 'chat', 'typing', 'fast', 'low bandwidth'],
    },

    // Practice Questions
    {
      id: 'drill-star',
      title: 'Drill: STAR Method Conflict Resolution',
      category: 'DRILL',
      subtitle: 'Behavioral: Resolving technical disagreements with data (+40 XP)',
      icon: BookOpen,
      action: () => {
        navigate('/dashboard/practice');
        onClose();
      },
      keywords: ['star', 'behavioral', 'conflict', 'leadership', 'situation', 'task', 'action', 'result'],
    },
    {
      id: 'drill-cache',
      title: 'Drill: Cache Stampede Mitigation',
      category: 'DRILL',
      subtitle: 'System Design: Handling 50k concurrent cache key expirations (+40 XP)',
      icon: Code,
      action: () => {
        navigate('/dashboard/practice');
        onClose();
      },
      keywords: ['cache', 'stampede', 'thundering herd', 'redis', 'system design', 'distributed', 'concurrency'],
    },
    {
      id: 'drill-react',
      title: 'Drill: React Deep Tree Re-renders',
      category: 'DRILL',
      subtitle: 'Frontend: React.memo, useMemo, and composition optimization (+40 XP)',
      icon: Code,
      action: () => {
        navigate('/dashboard/practice');
        onClose();
      },
      keywords: ['react', 'render', 'optimization', 'memo', 'usememo', 'hooks', 'virtual dom', 'frontend'],
    },

    // Quick Actions
    {
      id: 'act-gamification',
      title: 'View Quests & Badges',
      subtitle: 'Open the gamification trophy showcase and claim quest XP',
      category: 'ACTION',
      icon: Trophy,
      action: () => {
        onClose();
        onOpenGamification?.();
      },
      keywords: ['quest', 'badge', 'trophy', 'xp', 'streak', 'level', 'gamification', 'rewards'],
    },
    {
      id: 'act-theme',
      title: `Toggle Theme (Currently ${theme === 'dark' ? 'Dark Navy' : 'Clean Light'})`,
      subtitle: `Switch platform appearance to ${theme === 'dark' ? 'Light Mode' : 'Dark Navy Mode'}`,
      category: 'ACTION',
      icon: theme === 'dark' ? Sun : Moon,
      action: () => {
        toggleTheme();
        onClose();
      },
      keywords: ['theme', 'light', 'dark', 'mode', 'color', 'appearance', 'sun', 'moon'],
    },
  ];

  // Filter items based on query
  const filteredResults = query.trim()
    ? searchIndex.filter((item) => {
        const q = query.toLowerCase().trim();
        return (
          item.title.toLowerCase().includes(q) ||
          item.subtitle.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.keywords.some((k) => k.toLowerCase().includes(q))
        );
      })
    : searchIndex.slice(0, 6); // Default top suggestions

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredResults.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredResults.length) % Math.max(1, filteredResults.length));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredResults[selectedIndex]) {
          filteredResults[selectedIndex].action();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredResults, selectedIndex]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-black/70 backdrop-blur-md animate-in fade-in-50 duration-100">
      <div
        className={`relative w-full max-w-2xl rounded-3xl border shadow-2xl overflow-hidden flex flex-col ${
          theme === 'light'
            ? 'bg-white border-slate-200 text-slate-900 shadow-sky-500/10'
            : 'bg-[#0B1B3A] border-slate-700 text-white shadow-sky-500/20'
        }`}
      >
        {/* Search Input Bar */}
        <div className={`p-4 border-b flex items-center gap-3 ${
          theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/80 border-slate-800'
        }`}>
          <Search className="w-5 h-5 text-sky-500 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search anything (questions, drills, 3D avatar, voice mode, settings)..."
            className="w-full bg-transparent border-none text-sm text-slate-100 placeholder-slate-400 focus:outline-none"
            style={{ color: theme === 'light' ? '#0f172a' : '#ffffff' }}
          />

          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-300 dark:border-slate-700">
              ESC
            </span>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-1 divide-y divide-slate-100 dark:divide-slate-800/40">
          {filteredResults.length === 0 ? (
            <div className="p-8 text-center space-y-2">
              <Search className="w-8 h-8 text-slate-400 mx-auto" />
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300">No results found for &quot;{query}&quot;</div>
              <p className="text-[11px] text-slate-400">
                Try searching for <strong>&quot;Voice&quot;</strong>, <strong>&quot;Avatar&quot;</strong>, <strong>&quot;STAR&quot;</strong>, <strong>&quot;Cache&quot;</strong>, or <strong>&quot;Resume&quot;</strong>.
              </p>
            </div>
          ) : (
            filteredResults.map((item, index) => {
              const Icon = item.icon;
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`p-3 rounded-2xl flex items-center justify-between gap-3 cursor-pointer transition-all ${
                    isSelected
                      ? theme === 'light'
                        ? 'bg-sky-50 text-sky-900 border border-sky-200'
                        : 'bg-sky-950/30 text-white border border-sky-500/40 shadow-sm'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/40 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      isSelected
                        ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold truncate">{item.title}</span>
                        <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                          item.category === 'DRILL'
                            ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                            : item.category === 'MODALITY'
                            ? 'bg-indigo-500/10 text-indigo-500 border border-indigo-500/20'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                        }`}>
                          {item.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <ArrowRight className={`w-4 h-4 flex-shrink-0 transition-transform ${
                    isSelected ? 'text-sky-500 translate-x-0.5' : 'text-slate-300 dark:text-slate-600'
                  }`} />
                </div>
              );
            })
          )}
        </div>

        {/* Footer Shortcut Bar */}
        <div className={`px-4 py-2.5 border-t flex items-center justify-between text-[11px] text-slate-400 ${
          theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-slate-800'
        }`}>
          <div className="flex items-center gap-3">
            <span>Use <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono text-[10px]">↑</kbd> <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono text-[10px]">↓</kbd> to navigate</span>
            <span><kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono text-[10px]">↵</kbd> to select</span>
          </div>
          <span className="font-semibold text-sky-500">IntervAI Smart Search</span>
        </div>

      </div>
    </div>
  );
};
