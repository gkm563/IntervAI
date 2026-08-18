import React, { useState } from 'react';
import { Radio, Send, CheckCircle2, AlertCircle, Sparkles, Bell } from 'lucide-react';
import { apiRequest } from '../../lib/api';

export const AdminBroadcastPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [type, setType] = useState('SYSTEM');
  const [isSending, setIsSending] = useState(false);
  const [successResult, setSuccessResult] = useState<string | null>(null);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return;

    setIsSending(true);
    setSuccessResult(null);

    try {
      const res = await apiRequest<{ success: boolean; dispatched: number }>('/api/admin/broadcast', {
        method: 'POST',
        body: JSON.stringify({ title, message, type }),
      });

      if (res.success) {
        setSuccessResult(`Broadcast dispatched to ${res.dispatched || 'all'} registered candidate inboxes!`);
        setTitle('');
        setMessage('');
      }
    } catch (err: any) {
      alert(err.message || 'Failed to dispatch broadcast.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 text-xs font-mono font-bold mb-2 border border-rose-500/20">
          <Radio className="w-3.5 h-3.5" />
          <span>Platform-Wide Push Engine</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Broadcast Alert Dispatcher
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Send high-priority system announcements, placement drive notifications, or version updates directly to candidate notification bells.
        </p>
      </div>

      {successResult && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 text-emerald-400 text-xs font-bold animate-in fade-in-50">
          <CheckCircle2 className="w-4 h-4" />
          <span>{successResult}</span>
        </div>
      )}

      {/* Broadcast Composer */}
      <div className="max-w-2xl bg-[#091226] rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6">
        <form onSubmit={handleSend} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-300 mb-1.5">Announcement Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Google SDE-1 Practice Round Calibration Now Live!"
              className="w-full bg-[#050A18] border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-rose-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1.5">Notification Category</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full bg-[#050A18] border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-rose-500"
            >
              <option value="SYSTEM">System Announcement</option>
              <option value="INTERVIEW">New Interview Modality</option>
              <option value="PRACTICE">Placement Drill Challenge</option>
              <option value="AUTH">Security Advisory</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1.5">Broadcast Message Content</label>
            <textarea
              rows={4}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type the message body that will appear in all candidate notification dropdowns..."
              className="w-full bg-[#050A18] border border-slate-700 rounded-xl p-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-rose-500 resize-none leading-relaxed"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={isSending || !title.trim() || !message.trim()}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-indigo-600 hover:from-rose-400 hover:to-indigo-500 disabled:opacity-50 text-white font-bold text-xs shadow-md shadow-rose-500/20 transition-all cursor-pointer"
            >
              {isSending ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Dispatching to Inboxes...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Dispatch Broadcast Alert</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
