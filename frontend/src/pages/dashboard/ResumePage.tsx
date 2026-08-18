import React, { useState } from 'react';
import {
  FileText,
  UploadCloud,
  CheckCircle2,
  Sparkles,
  Plus,
  Trash2,
  Layers,
  Briefcase,
  GraduationCap,
  Code,
  Inbox,
  Save,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { apiRequest } from '../../lib/api';

export const ResumePage: React.FC = () => {
  const { user } = useAuth();
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');
  const [targetCompany, setTargetCompany] = useState(user?.targetCompany || '');
  const [targetRole, setTargetRole] = useState(user?.targetRole || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiRequest('/api/users/profile', {
        method: 'PUT',
        body: JSON.stringify({
          targetRole,
          targetCompany,
        }),
      });
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 text-xs font-semibold mb-2 border border-sky-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Milestone 2 Specification</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Resume & Candidate Profile
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage your parsed resume content, skills, projects, and target role alignments.
          </p>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 text-emerald-300 text-sm">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <span>Profile preferences saved successfully!</span>
        </div>
      )}

      {/* Real Uploader Section */}
      <div className="glass-card rounded-2xl p-8 border border-dashed border-slate-700 hover:border-sky-500/60 transition-all text-center space-y-4 cursor-pointer bg-slate-900/40">
        <div className="w-16 h-16 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 mx-auto shadow-lg">
          <UploadCloud className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <h3 className="text-base font-bold text-white">Upload your Resume (PDF or DOCX)</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Drag and drop your file here, or click to browse. Max size 5MB. Full PDF parsing & vector embedding activates in Milestone 2.
          </p>
        </div>
        <div className="pt-2 flex items-center justify-center gap-4 text-xs text-slate-500 font-medium">
          <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Private Storage</span>
          <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Automatic Skill Extraction</span>
        </div>
      </div>

      {/* Grid: Real User Information & Target Alignment */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Skills & Projects Breakdown */}
        <div className="lg:col-span-7 space-y-6">
          {/* Skills Chips */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Code className="w-4 h-4 text-sky-400" />
                Technical Skills & Frameworks
              </h3>
              <span className="text-xs text-slate-400 font-semibold">{skills.length} Added</span>
            </div>

            {/* Chips or Empty state */}
            {skills.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500 bg-slate-900/40 rounded-xl border border-slate-800/80 space-y-1">
                <Inbox className="w-5 h-5 text-slate-600 mx-auto" />
                <p>No skills added yet. Add your core languages & frameworks below or upload a resume.</p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2 pt-1">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-sky-300 hover:border-sky-500 transition-colors"
                  >
                    <span>{skill}</span>
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      className="text-slate-400 hover:text-rose-400 p-0.5 cursor-pointer"
                      title="Remove skill"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Add Skill Form */}
            <form onSubmit={handleAddSkill} className="flex gap-2 pt-2">
              <input
                type="text"
                placeholder="Add a skill (e.g. React, Python, PostgreSQL)..."
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                className="flex-1 bg-[#0B1B3A] border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs flex items-center gap-1 shadow-md cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </form>
          </div>

          {/* Extracted Projects (Clean empty state) */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-400" />
                Extracted Resume Projects
              </h3>
              <span className="text-xs text-slate-500 font-medium">0 Projects</span>
            </div>

            <div className="p-6 text-center text-xs text-slate-500 bg-slate-900/40 rounded-xl border border-slate-800/80 space-y-1">
              <Inbox className="w-5 h-5 text-slate-600 mx-auto" />
              <p>No projects extracted yet. Upload your resume above to parse your technical projects.</p>
            </div>
          </div>
        </div>

        {/* Right Column: Target Alignment & Education */}
        <div className="lg:col-span-5 space-y-6">
          <form onSubmit={handleSaveProfile} className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <Briefcase className="w-4 h-4 text-emerald-400" />
              Target Career Goals
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1.5">Target Job Title</label>
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="e.g. SDE-1 Frontend Engineer, Backend Developer"
                  className="w-full bg-[#0B1B3A] border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1.5">Target Companies / Context</label>
                <input
                  type="text"
                  value={targetCompany}
                  onChange={(e) => setTargetCompany(e.target.value)}
                  placeholder="e.g. Product Startups, FAANG, Fintech"
                  className="w-full bg-[#0B1B3A] border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Goals</span>
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};
