import React, { useState } from 'react';
import {
  FileText,
  UploadCloud,
  CheckCircle2,
  Sparkles,
  Plus,
  Trash2,
  Edit2,
  Award,
  Layers,
  Briefcase,
  GraduationCap,
  Code,
  ArrowRight,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const ResumePage: React.FC = () => {
  const { user } = useAuth();
  const [skills, setSkills] = useState([
    'React',
    'TypeScript',
    'Node.js',
    'PostgreSQL',
    'WebSockets',
    'Tailwind CSS',
    'System Design',
    'Docker',
  ]);
  const [newSkill, setNewSkill] = useState('');
  const [targetCompany, setTargetCompany] = useState('Google / Amazon / Product Startups');
  const [targetRole, setTargetRole] = useState('SDE-1 / Frontend Software Engineer');

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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 text-xs font-semibold mb-2 border border-sky-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Milestone 2 Preview</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Resume & Candidate Profile
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage your parsed resume content, skills, projects, and target role alignments.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl px-4 py-2.5 flex items-center gap-3">
            <Award className="w-6 h-6 text-sky-400" />
            <div>
              <div className="text-xs text-slate-400 font-semibold uppercase">Profile Strength</div>
              <div className="text-sm font-extrabold text-emerald-400">82% Complete</div>
            </div>
          </div>
        </div>
      </div>

      {/* Uploader Section */}
      <div className="glass-card rounded-2xl p-8 border border-dashed border-slate-700 hover:border-sky-500/60 transition-all text-center space-y-4 cursor-pointer bg-slate-900/40">
        <div className="w-16 h-16 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 mx-auto shadow-lg">
          <UploadCloud className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <h3 className="text-base font-bold text-white">Upload your latest Resume (PDF or DOCX)</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Drag and drop your file here, or click to browse. Max size 5MB. Our AI automatically extracts your projects and tech stack.
          </p>
        </div>
        <div className="pt-2 flex items-center justify-center gap-4 text-xs text-slate-500 font-medium">
          <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Private Storage</span>
          <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Instant Parsing</span>
          <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Vector Embedding</span>
        </div>
      </div>

      {/* Grid: Parsed Information & Target Alignment */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Skills & Projects Breakdown */}
        <div className="lg:col-span-7 space-y-6">
          {/* Skills Chips */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Code className="w-4 h-4 text-sky-400" />
                Parsed Technical Skills & Frameworks
              </h3>
              <span className="text-xs text-slate-400 font-semibold">{skills.length} Skills</span>
            </div>

            {/* Chips */}
            <div className="flex flex-wrap gap-2 pt-1">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-sky-300 hover:border-sky-500 transition-colors"
                >
                  <span>{skill}</span>
                  <button
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-slate-400 hover:text-rose-400 p-0.5"
                    title="Remove skill"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            {/* Add Skill Form */}
            <form onSubmit={handleAddSkill} className="flex gap-2 pt-2">
              <input
                type="text"
                placeholder="Add another skill (e.g. Next.js, Redis)..."
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

          {/* Extracted Projects */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-indigo-400" />
                Extracted Resume Projects (Auto-Parsed)
              </h3>
              <span className="text-xs text-sky-400 font-medium">Editable</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white text-sm">Real-Time Collaborative Code Studio</h4>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">WebSockets, React, CRDT</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Engineered distributed conflict-free text editing engine supporting 100+ concurrent clients with zero perceptible latency.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white text-sm">High-Throughput Analytics Streamer</h4>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">Node.js, Redis, Kafka</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Built backpressure ingestion pipeline processing 25,000 requests/sec with Redis caching and automated dead-letter queues.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Target Alignment & Education */}
        <div className="lg:col-span-5 space-y-6">
          {/* Target Role & Target Company */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
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
                  className="w-full bg-[#0B1B3A] border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1.5">Target Companies / Level</label>
                <input
                  type="text"
                  value={targetCompany}
                  onChange={(e) => setTargetCompany(e.target.value)}
                  className="w-full bg-[#0B1B3A] border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>
            </div>
          </div>

          {/* Education & Experience Summary */}
          <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
              <GraduationCap className="w-4 h-4 text-teal-400" />
              Academic Background
            </h3>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="font-bold text-white">B.Tech in Computer Science & Engineering</div>
                <div className="text-slate-400 mt-0.5">Graduating 2026 • Tier-1 / Placement Track</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
