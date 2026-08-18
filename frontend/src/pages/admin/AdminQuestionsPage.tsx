import React, { useState, useEffect } from 'react';
import { FileQuestion, Plus, Trash2, Edit, CheckCircle2, Zap, Trophy, BookOpen } from 'lucide-react';
import { apiRequest } from '../../lib/api';

export const AdminQuestionsPage: React.FC = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('System Design');
  const [newDifficulty, setNewDifficulty] = useState('MEDIUM');
  const [newQuestion, setNewQuestion] = useState('');
  const [newFocus, setNewFocus] = useState('');

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const res = await apiRequest<{ success: boolean; questions: any[] }>('/api/admin/questions');
      if (res.success && res.questions) {
        setQuestions(res.questions);
      }
    } catch {
      // Fallback
      setQuestions([
        {
          id: 'q-1',
          title: 'STAR Method: Behavioral Conflict Resolution',
          category: 'Behavioral',
          difficulty: 'MEDIUM',
          question: 'Describe a situation where a technical disagreement occurred regarding database schema design, and how you reached consensus.',
          focus: 'Emphasize Situation, Task, Action, and Quantified Result.',
          xpReward: 40,
        },
        {
          id: 'q-2',
          title: 'Distributed Systems: Cache Stampede Mitigation',
          category: 'System Design',
          difficulty: 'HARD',
          question: 'How do you prevent a cache stampede / thundering herd problem when a high-traffic cache key expires simultaneously for 50k users?',
          focus: 'Mutual exclusion locks, probabilistic early expiration (XFetch), or background refresh.',
          xpReward: 50,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newQuestion.trim()) return;

    const added = {
      id: `q-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      difficulty: newDifficulty,
      question: newQuestion,
      focus: newFocus || 'Technical depth and clarity.',
      xpReward: 40,
    };

    setQuestions([added, ...questions]);
    setShowAddModal(false);
    setNewTitle('');
    setNewQuestion('');
    setNewFocus('');
  };

  const handleDelete = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 text-xs font-mono font-bold mb-2 border border-rose-500/20">
            <FileQuestion className="w-3.5 h-3.5" />
            <span>Curated Drill & Question Catalog</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Question Bank & Practice Gym Manager
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Create, calibrate, and categorize AI mock interview questions across System Design, Behavioral, and Frontend domains.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-indigo-600 hover:from-rose-400 hover:to-indigo-500 text-white text-xs font-bold shadow-md shadow-rose-500/20 transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Question</span>
        </button>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="bg-[#091226] border border-slate-700 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl space-y-4 text-xs">
            <h2 className="text-base font-bold text-white">Add Question to Live Catalog</h2>

            <form onSubmit={handleAddQuestion} className="space-y-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Question Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Distributed Consensus in Raft"
                  className="w-full bg-[#050A18] border border-slate-700 rounded-xl px-3.5 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Domain Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full bg-[#050A18] border border-slate-700 rounded-xl px-3.5 py-2 text-white"
                  >
                    <option value="System Design">System Design</option>
                    <option value="Behavioral">Behavioral (STAR)</option>
                    <option value="Frontend">Frontend (React/TS)</option>
                    <option value="Backend">Backend & Distributed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Difficulty</label>
                  <select
                    value={newDifficulty}
                    onChange={(e) => setNewDifficulty(e.target.value)}
                    className="w-full bg-[#050A18] border border-slate-700 rounded-xl px-3.5 py-2 text-white"
                  >
                    <option value="EASY">Entry / College</option>
                    <option value="MEDIUM">Mid-Level (SDE-1/2)</option>
                    <option value="HARD">Senior Bar-Raiser</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Question Prompt</label>
                <textarea
                  rows={3}
                  required
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  placeholder="What question will the AI ask the candidate?"
                  className="w-full bg-[#050A18] border border-slate-700 rounded-xl p-3 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Key Evaluation Focus</label>
                <input
                  type="text"
                  value={newFocus}
                  onChange={(e) => setNewFocus(e.target.value)}
                  placeholder="e.g. Leader election, split-brain mitigation"
                  className="w-full bg-[#050A18] border border-slate-700 rounded-xl px-3.5 py-2 text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-bold"
                >
                  Publish Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Questions List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {questions.map((q) => (
          <div key={q.id} className="p-5 rounded-2xl bg-[#091226] border border-slate-800 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
                  {q.category}
                </span>
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                  <Trophy className="w-3 h-3" />
                  +{q.xpReward || 40} XP
                </span>
              </div>

              <h3 className="text-sm font-bold text-white">{q.title}</h3>
              <p className="text-xs text-slate-300 italic">&quot;{q.question}&quot;</p>
              <div className="text-[11px] text-slate-400 flex items-center gap-1 pt-1">
                <Zap className="w-3 h-3 text-sky-400" />
                <span>Focus: {q.focus}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-400">Difficulty: {q.difficulty}</span>
              <button
                onClick={() => handleDelete(q.id)}
                className="text-rose-400 hover:text-rose-300 flex items-center gap-1 text-[11px] p-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
