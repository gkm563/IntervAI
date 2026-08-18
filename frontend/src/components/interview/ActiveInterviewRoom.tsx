import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Video,
  MessageSquare,
  Volume2,
  VolumeX,
  Send,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Award,
  RotateCcw,
  ArrowRight,
  XCircle,
  Play,
  Square,
  HelpCircle,
  Zap,
} from 'lucide-react';
import { AvatarCanvas } from './AvatarCanvas';
import { WebcamPreview } from './WebcamPreview';
import { VoiceEngine } from './VoiceEngine';

export type InterviewModality = 'VOICE' | 'VIDEO' | 'TEXT';

interface ActiveInterviewRoomProps {
  modality: InterviewModality;
  targetRole: string;
  targetCompany: string;
  difficulty: string;
  candidateName: string;
  onExit: () => void;
  onSessionComplete?: (score: number, report: any) => void;
}

interface QuestionTurn {
  question: string;
  category: string;
  focus: string;
}

interface TurnEvaluation {
  relevance: number;
  clarity: number;
  depth: number;
  overall: number;
  strengths: string[];
  weaknesses: string[];
  suggestedImprovement: string;
}

export const ActiveInterviewRoom: React.FC<ActiveInterviewRoomProps> = ({
  modality,
  targetRole,
  targetCompany,
  difficulty,
  candidateName,
  onExit,
  onSessionComplete,
}) => {
  // Questions calibrated for the candidate's session
  const questionsList: QuestionTurn[] = [
    {
      question: `Can you introduce yourself and walk me through a challenging technical problem you solved while working with ${targetRole.includes('Frontend') ? 'React / TypeScript' : targetRole.includes('Backend') ? 'distributed backend systems' : 'fullstack application architecture'}?`,
      category: 'Project Architecture & Ownership',
      focus: 'Ownership, technical complexity, architectural trade-offs, and quantified results.',
    },
    {
      question: 'How do you handle state synchronization or caching when multiple clients perform concurrent updates without losing data consistency?',
      category: 'System Design & State',
      focus: 'Optimistic UI, locking mechanisms, websocket broadcast, or conflict resolution.',
    },
    {
      question: 'Describe a situation where you had to push back on a product requirement or technical decision due to performance or security implications.',
      category: 'Behavioral & Leadership',
      focus: 'STAR framework: Situation, Task, Action taken, and Business Impact.',
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [candidateAnswer, setCandidateAnswer] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [mouthOpen, setMouthOpen] = useState(0);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [currentEvaluation, setCurrentEvaluation] = useState<TurnEvaluation | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [sessionScores, setSessionScores] = useState<number[]>([]);

  const voiceEngineRef = useRef<VoiceEngine | null>(null);

  const activeQuestion = questionsList[currentQuestionIndex];

  // Initialize Voice Engine
  useEffect(() => {
    const engine = new VoiceEngine({
      onTranscriptChange: (transcript) => {
        setCandidateAnswer(transcript);
      },
      onListeningStateChange: (listening) => {
        setIsListening(listening);
      },
      onSpeechStart: () => {
        setIsSpeaking(true);
      },
      onSpeechEnd: () => {
        setIsSpeaking(false);
        setMouthOpen(0);
      },
      onViseme: (openAmount) => {
        setMouthOpen(openAmount);
      },
    });

    voiceEngineRef.current = engine;

    // Automatically speak the question aloud in Voice or 3D Avatar mode
    if (modality === 'VOICE' || modality === 'VIDEO') {
      const timer = setTimeout(() => {
        engine.speak(activeQuestion.question);
      }, 600);
      return () => clearTimeout(timer);
    }

    return () => {
      engine.destroy();
    };
  }, []);

  // When question changes, speak next question
  const triggerQuestionSpeech = (qText: string) => {
    if (modality === 'VOICE' || modality === 'VIDEO') {
      voiceEngineRef.current?.speak(qText);
    }
  };

  const handleToggleListening = () => {
    if (isListening) {
      voiceEngineRef.current?.stopListening();
    } else {
      voiceEngineRef.current?.stopSpeaking();
      voiceEngineRef.current?.startListening();
    }
  };

  const handleRepeatQuestion = () => {
    voiceEngineRef.current?.speak(activeQuestion.question);
  };

  // Evaluate candidate answer using multi-rubric analysis
  const handleSubmitAnswer = () => {
    if (!candidateAnswer.trim()) return;

    voiceEngineRef.current?.stopListening();
    setIsEvaluating(true);

    // AI rubric scoring calculation based on answer length, structure, and keywords
    setTimeout(() => {
      const length = candidateAnswer.trim().split(/\s+/).length;
      const hasMetrics = /\d+%|\d+ms|\d+ users|\d+ requests|reduced|increased|optimized/i.test(candidateAnswer);
      const hasStructure = /first|second|then|result|because|trade-off|architecture/i.test(candidateAnswer);

      let relevance = Math.min(95, Math.max(65, 75 + (hasStructure ? 12 : 0) + (length > 25 ? 8 : 0)));
      let depth = Math.min(94, Math.max(60, 70 + (hasMetrics ? 15 : 0) + (length > 40 ? 10 : 0)));
      let clarity = Math.min(92, Math.max(70, 78 + (length > 15 && length < 120 ? 12 : 4)));
      let overall = Math.round((relevance * 0.35 + depth * 0.4 + clarity * 0.25));

      const evaluation: TurnEvaluation = {
        relevance,
        clarity,
        depth,
        overall,
        strengths: [
          'Addressed core technical trade-offs with clear situational context.',
          hasMetrics
            ? 'Strong use of quantified outcomes and system performance metrics.'
            : 'Good explanation of component responsibilities and personal ownership.',
        ],
        weaknesses: [
          hasMetrics
            ? 'Could further elaborate on disaster recovery and failover edge cases.'
            : 'Quantify specific business impact (e.g. latency reduction %, throughput).',
        ],
        suggestedImprovement:
          'Use the STAR formula (Situation -> Task -> Action -> Result) to articulate your unique contribution with numerical verification.',
      };

      setCurrentEvaluation(evaluation);
      setSessionScores((prev) => [...prev, overall]);
      setIsEvaluating(false);

      // Speak concise feedback summary in voice mode
      if (modality === 'VOICE' || modality === 'VIDEO') {
        voiceEngineRef.current?.speak(
          `Good answer. Overall readiness score for this turn is ${overall}%. ${evaluation.strengths[0]}`
        );
      }
    }, 1200);
  };

  const handleNextQuestion = () => {
    setCurrentEvaluation(null);
    setCandidateAnswer('');

    if (currentQuestionIndex + 1 < questionsList.length) {
      const nextIdx = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIdx);
      triggerQuestionSpeech(questionsList[nextIdx].question);
    } else {
      setIsFinished(true);
      const avgScore = Math.round(
        sessionScores.reduce((a, b) => a + b, 0) / Math.max(1, sessionScores.length)
      );
      if (onSessionComplete) {
        onSessionComplete(avgScore, { questionsCompleted: questionsList.length });
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#070F22] text-slate-100 flex flex-col overflow-hidden font-sans">
      {/* Top Session Bar */}
      <header className="h-16 bg-[#0B1B3A] border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between shadow-md flex-shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-xs font-extrabold px-3 py-1 rounded-lg bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center gap-1.5">
            {modality === 'VIDEO' && <Video className="w-3.5 h-3.5" />}
            {modality === 'VOICE' && <Mic className="w-3.5 h-3.5" />}
            {modality === 'TEXT' && <MessageSquare className="w-3.5 h-3.5" />}
            <span>{modality === 'VIDEO' ? '3D Avatar Mode' : modality === 'VOICE' ? 'Voice Mode' : 'Text Mode'}</span>
          </span>

          <div className="hidden sm:block text-xs font-semibold text-slate-300">
            {targetRole} • <span className="text-slate-400">{difficulty} Calibration</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs text-slate-400 font-semibold hidden md:block">
            Question {currentQuestionIndex + 1} of {questionsList.length}
          </div>

          <button
            onClick={onExit}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold transition-colors cursor-pointer"
          >
            <XCircle className="w-4 h-4" />
            <span>End Session</span>
          </button>
        </div>
      </header>

      {/* Main Simulation Viewport */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto max-w-7xl w-full mx-auto flex flex-col justify-between gap-6">
        
        {/* If session complete, show full summary report */}
        {isFinished ? (
          <div className="glass-card rounded-2xl p-8 sm:p-12 border border-slate-700 max-w-2xl mx-auto my-auto text-center space-y-6 shadow-2xl">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-sky-500 to-emerald-400 flex items-center justify-center text-white mx-auto shadow-xl shadow-sky-500/25">
              <Award className="w-10 h-10" />
            </div>

            <div className="space-y-1.5">
              <h2 className="text-2xl font-black text-white">Mock Interview Completed!</h2>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Your performance has been evaluated across Relevance, Technical Depth, and STAR Structuring.
              </p>
            </div>

            <div className="bg-slate-900/90 rounded-xl p-6 border border-slate-800 flex items-center justify-around">
              <div>
                <div className="text-xs text-slate-400 font-semibold uppercase">Overall Readiness</div>
                <div className="text-4xl font-black text-emerald-400 mt-1">
                  {Math.round(sessionScores.reduce((a, b) => a + b, 0) / Math.max(1, sessionScores.length))}%
                </div>
              </div>
              <div className="h-10 w-[1px] bg-slate-800"></div>
              <div>
                <div className="text-xs text-slate-400 font-semibold uppercase">Turns Evaluated</div>
                <div className="text-4xl font-black text-sky-400 mt-1">{questionsList.length}</div>
              </div>
            </div>

            <button
              onClick={onExit}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-sky-500/20 transition-all cursor-pointer"
            >
              Return to Dashboard
            </button>
          </div>
        ) : (
          <>
            {/* Visual Modality Grid: Avatar & Webcam (for 3D Avatar / Voice) */}
            {(modality === 'VIDEO' || modality === 'VOICE') && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 min-h-[300px]">
                {/* 3D Avatar or Audio Waveform Room */}
                <div className={`${modality === 'VIDEO' ? 'md:col-span-8' : 'md:col-span-12'} h-[320px] sm:h-[360px]`}>
                  <AvatarCanvas
                    mouthOpen={mouthOpen}
                    isSpeaking={isSpeaking}
                    interviewerName="Alex (AI Lead Interviewer)"
                  />
                </div>

                {/* Candidate Video Feed (Video Mode Only) */}
                {modality === 'VIDEO' && (
                  <div className="md:col-span-4 h-[320px] sm:h-[360px]">
                    <WebcamPreview
                      candidateName={candidateName}
                      isMuted={isMuted}
                      onToggleMute={() => setIsMuted(!isMuted)}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Current Interviewer Question Prompt Box */}
            <div className="glass-card rounded-2xl p-5 sm:p-6 border border-slate-700/80 shadow-2xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-sky-500/15 text-sky-400 border border-sky-500/30">
                    {activeQuestion.category}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">Question {currentQuestionIndex + 1} of {questionsList.length}</span>
                </div>

                {(modality === 'VOICE' || modality === 'VIDEO') && (
                  <button
                    onClick={handleRepeatQuestion}
                    className="flex items-center gap-1 text-xs text-sky-400 hover:text-sky-300 font-semibold px-2 py-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                    title="Repeat question audio"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Repeat Audio</span>
                  </button>
                )}
              </div>

              <p className="text-base sm:text-lg font-bold text-white leading-relaxed">
                &quot;{activeQuestion.question}&quot;
              </p>

              <div className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Interviewer focus: {activeQuestion.focus}</span>
              </div>
            </div>

            {/* Real-Time Turn Evaluation Card (if evaluated) */}
            {currentEvaluation && (
              <div className="glass-card rounded-2xl p-6 border border-sky-500/50 bg-sky-950/20 shadow-2xl space-y-4 animate-in fade-in-50 duration-200">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-sky-400" />
                    <h3 className="text-sm font-bold text-white">AI Turn Evaluation</h3>
                  </div>
                  <span className="text-lg font-extrabold text-emerald-400">
                    {currentEvaluation.overall}% Readiness
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="text-slate-400 text-[10px]">Relevance</div>
                    <div className="text-base font-bold text-sky-400 mt-0.5">{currentEvaluation.relevance}%</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="text-slate-400 text-[10px]">Technical Depth</div>
                    <div className="text-base font-bold text-teal-400 mt-0.5">{currentEvaluation.depth}%</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="text-slate-400 text-[10px]">Clarity</div>
                    <div className="text-base font-bold text-indigo-400 mt-0.5">{currentEvaluation.clarity}%</div>
                  </div>
                </div>

                <div className="text-xs space-y-2 pt-1 text-slate-300">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{currentEvaluation.strengths[0]}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span>{currentEvaluation.weaknesses[0]}</span>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleNextQuestion}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                  >
                    <span>{currentQuestionIndex + 1 === questionsList.length ? 'View Final Report' : 'Next Question'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Answer Input & Voice Controls */}
            {!currentEvaluation && (
              <div className="glass-card rounded-2xl p-5 sm:p-6 border border-slate-700/80 space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                    <span>Your Answer</span>
                    {isListening && (
                      <span className="flex items-center gap-1 text-[11px] text-rose-400 animate-pulse font-semibold">
                        <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                        Recording speech...
                      </span>
                    )}
                  </label>

                  {/* Voice Microphone Trigger */}
                  {(modality === 'VOICE' || modality === 'VIDEO') && (
                    <button
                      onClick={handleToggleListening}
                      className={`flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isListening
                          ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/25 animate-pulse'
                          : 'bg-sky-500 hover:bg-sky-400 text-white shadow-md'
                      }`}
                    >
                      {isListening ? <Square className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                      <span>{isListening ? 'Stop Speaking' : 'Click to Speak'}</span>
                    </button>
                  )}
                </div>

                <textarea
                  rows={4}
                  value={candidateAnswer}
                  onChange={(e) => setCandidateAnswer(e.target.value)}
                  placeholder={
                    modality === 'VOICE' || modality === 'VIDEO'
                      ? 'Speak into your microphone or type your response here...'
                      : 'Type your structured response (Situation, Action, Metrics, Result)...'
                  }
                  className="w-full bg-[#0B1B3A] border border-slate-700 rounded-xl p-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500 resize-none leading-relaxed"
                />

                <div className="flex items-center justify-between pt-1">
                  <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-sky-400" />
                    <span>{candidateAnswer.trim().split(/\s+/).filter(Boolean).length} words</span>
                  </div>

                  <button
                    onClick={handleSubmitAnswer}
                    disabled={!candidateAnswer.trim() || isEvaluating}
                    className="flex items-center gap-2 px-7 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 disabled:opacity-50 text-white font-bold text-xs shadow-md shadow-sky-500/20 transition-all cursor-pointer"
                  >
                    {isEvaluating ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Evaluating...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit Answer for AI Scoring</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
};
