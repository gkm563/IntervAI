import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  xpReward: number;
}

export interface DailyQuest {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  completed: boolean;
  claimed: boolean;
  progress: number;
  total: number;
}

interface GamificationContextType {
  xp: number;
  level: number;
  levelTitle: string;
  currentLevelXp: number;
  nextLevelXp: number;
  progressPercent: number;
  streakDays: number;
  badges: Badge[];
  dailyQuests: DailyQuest[];
  recentReward: { amount: number; reason: string } | null;
  addXp: (amount: number, reason: string) => void;
  claimQuest: (questId: string) => void;
  unlockBadge: (badgeId: string) => void;
  dismissRewardToast: () => void;
}

const LEVEL_THRESHOLDS = [
  { level: 1, minXp: 0, title: 'Code Cadet' },
  { level: 2, minXp: 150, title: 'Algorithm Apprentice' },
  { level: 3, minXp: 400, title: 'Architecture Ace' },
  { level: 4, minXp: 800, title: 'Staff Strategist' },
  { level: 5, minXp: 1500, title: 'Principal Prodigy' },
];

const INITIAL_BADGES: Badge[] = [
  {
    id: 'first_turn',
    name: 'First Blood 🎯',
    description: 'Complete your first mock interview turn',
    icon: '🎯',
    unlocked: true,
    unlockedAt: 'Today',
    xpReward: 50,
  },
  {
    id: 'star_master',
    name: 'STAR Master 🌟',
    description: 'Score 85%+ on behavioral structure',
    icon: '🌟',
    unlocked: true,
    unlockedAt: 'Today',
    xpReward: 75,
  },
  {
    id: 'voice_champion',
    name: 'Voice Champion 🎙️',
    description: 'Complete a full speech-to-speech voice interview',
    icon: '🎙️',
    unlocked: false,
    xpReward: 100,
  },
  {
    id: 'avatar_pro',
    name: 'Avatar Virtuoso 🤖',
    description: 'Complete a 3D Avatar video interview session',
    icon: '🤖',
    unlocked: false,
    xpReward: 100,
  },
  {
    id: 'streak_3',
    name: 'Fire Starter 🔥',
    description: 'Maintain a 3-day continuous practice streak',
    icon: '🔥',
    unlocked: true,
    unlockedAt: 'Today',
    xpReward: 120,
  },
  {
    id: 'depth_hunter',
    name: 'Depth Overlord ⚡',
    description: 'Score 90%+ in technical depth calibration',
    icon: '⚡',
    unlocked: false,
    xpReward: 150,
  },
];

const INITIAL_QUESTS: DailyQuest[] = [
  {
    id: 'quest_1',
    title: 'Daily Warmup Drill',
    description: 'Answer 1 targeted practice question in the drills library',
    xpReward: 40,
    completed: true,
    claimed: false,
    progress: 1,
    total: 1,
  },
  {
    id: 'quest_2',
    title: 'Multi-Modal Explorer',
    description: 'Launch an interview session using 3D Avatar or Voice mode',
    xpReward: 60,
    completed: false,
    claimed: false,
    progress: 0,
    total: 1,
  },
  {
    id: 'quest_3',
    title: 'STAR Structurer',
    description: 'Include situation, task, action, and results in your answers',
    xpReward: 50,
    completed: true,
    claimed: true,
    progress: 1,
    total: 1,
  },
];

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

export const GamificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [xp, setXp] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('intervai_gamification_xp');
      if (saved) return parseInt(saved, 10);
    }
    return 245; // Starting calibrated XP for onboarding
  });

  const [streakDays, setStreakDays] = useState<number>(3);
  const [badges, setBadges] = useState<Badge[]>(INITIAL_BADGES);
  const [dailyQuests, setDailyQuests] = useState<DailyQuest[]>(INITIAL_QUESTS);
  const [recentReward, setRecentReward] = useState<{ amount: number; reason: string } | null>(null);

  // Derive level info
  let currentLevelObj = LEVEL_THRESHOLDS[0];
  let nextLevelObj = LEVEL_THRESHOLDS[1];

  for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
    if (xp >= LEVEL_THRESHOLDS[i].minXp) {
      currentLevelObj = LEVEL_THRESHOLDS[i];
      nextLevelObj = LEVEL_THRESHOLDS[i + 1] || { level: 6, minXp: LEVEL_THRESHOLDS[i].minXp + 1000, title: 'Master' };
    }
  }

  const currentLevelXp = xp - currentLevelObj.minXp;
  const levelSpan = nextLevelObj.minXp - currentLevelObj.minXp;
  const progressPercent = Math.min(100, Math.max(0, Math.round((currentLevelXp / levelSpan) * 100)));

  useEffect(() => {
    localStorage.setItem('intervai_gamification_xp', xp.toString());
  }, [xp]);

  const addXp = (amount: number, reason: string) => {
    setXp((prev) => prev + amount);
    setRecentReward({ amount, reason });
  };

  const claimQuest = (questId: string) => {
    const quest = dailyQuests.find((q) => q.id === questId);
    if (quest && quest.completed && !quest.claimed) {
      setDailyQuests((prev) =>
        prev.map((q) => (q.id === questId ? { ...q, claimed: true } : q))
      );
      addXp(quest.xpReward, `Completed Quest: ${quest.title}`);
    }
  };

  const unlockBadge = (badgeId: string) => {
    const badge = badges.find((b) => b.id === badgeId);
    if (badge && !badge.unlocked) {
      setBadges((prev) =>
        prev.map((b) =>
          b.id === badgeId ? { ...b, unlocked: true, unlockedAt: 'Just now' } : b
        )
      );
      addXp(badge.xpReward, `Achievement Unlocked: ${badge.name}`);
    }
  };

  const dismissRewardToast = () => {
    setRecentReward(null);
  };

  return (
    <GamificationContext.Provider
      value={{
        xp,
        level: currentLevelObj.level,
        levelTitle: currentLevelObj.title,
        currentLevelXp,
        nextLevelXp: nextLevelObj.minXp,
        progressPercent,
        streakDays,
        badges,
        dailyQuests,
        recentReward,
        addXp,
        claimQuest,
        unlockBadge,
        dismissRewardToast,
      }}
    >
      {children}
    </GamificationContext.Provider>
  );
};

export const useGamification = (): GamificationContextType => {
  const context = useContext(GamificationContext);
  if (!context) {
    throw new Error('useGamification must be used within GamificationProvider');
  }
  return context;
};
