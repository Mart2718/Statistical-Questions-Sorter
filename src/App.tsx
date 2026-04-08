/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'motion/react';
import { 
  Check, 
  X, 
  BookOpen, 
  RotateCcw, 
  ChevronRight, 
  Info, 
  ArrowLeft, 
  ArrowRight,
  ClipboardList,
  Trophy,
  MessageSquare
} from 'lucide-react';
import { cn } from './lib/utils';
import { DATASETS, QUESTIONS, type Question, type Dataset } from './data';
import VariabilitySpotlight from './components/VariabilitySpotlight';

// --- Components ---

const Header = ({ onOpenVars, onRestart, showRestart }: { onOpenVars: () => void, onRestart: () => void, showRestart: boolean }) => (
  <header className="relative z-50 bg-navy text-white px-6 py-3.5 flex items-center justify-between gap-3 flex-wrap shadow-md">
    <div className="flex flex-col gap-0.5">
      <h1 className="font-serif text-lg tracking-tight">Is This a Statistical Question?</h1>
      <span className="text-[10px] text-white/45 font-mono uppercase tracking-widest">STAT C1000 · Santa Ana College</span>
    </div>
    <nav className="flex gap-2 items-center" aria-label="Main navigation">
      <button 
        onClick={onOpenVars}
        aria-label="Open variable reference panel"
        className="font-sans text-xs font-medium px-3.5 py-1.5 rounded-full border border-white/20 hover:border-white/50 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-teal focus-visible:outline-none transition-all flex items-center gap-2"
      >
        <ClipboardList className="w-3.5 h-3.5" aria-hidden="true" />
        Variables
      </button>
      {showRestart && (
        <button 
          onClick={onRestart}
          aria-label="Restart the application"
          className="font-sans text-xs font-medium px-3.5 py-1.5 rounded-full border border-white/20 hover:border-white/50 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-teal focus-visible:outline-none transition-all"
        >
          Restart
        </button>
      )}
    </nav>
  </header>
);

const ProgressBar = ({ current, total, dataset }: { current: number, total: number, dataset?: string }) => {
  const pct = (current / total) * 100;
  const ds = dataset ? DATASETS[dataset] : null;

  return (
    <div className="relative z-40" role="progressbar" aria-valuenow={current} aria-valuemin={0} aria-valuemax={total} aria-label="Question progress">
      <div className="bg-navy-mid h-[3px] w-full">
        <motion.div 
          className="bg-teal h-full"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>
      <div className="flex justify-between items-center px-6 py-2 text-[11px] font-mono text-text-muted bg-transparent">
        <span>{current} of {total} questions completed</span>
        {ds && (
          <span className={cn("px-2.5 py-0.5 rounded-full font-medium text-[10px]", ds.badgeClass)}>
            <span className="sr-only">Current dataset: </span>
            {ds.emoji} {ds.label}
          </span>
        )}
      </div>
    </div>
  );
};

const VariablePanel = ({ isOpen, onClose, activeTab, onTabChange }: { isOpen: boolean, onClose: () => void, activeTab: string, onTabChange: (tab: string) => void }) => {
  const data = DATASETS[activeTab];

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/30 backdrop-blur-sm"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed top-0 right-0 w-[420px] max-w-[95vw] h-screen bg-surface shadow-heavy z-[110] flex flex-col overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="var-panel-title"
      >
        <div className="p-5 bg-navy text-white flex items-center justify-between shrink-0">
          <h2 id="var-panel-title" className="font-serif text-xl">Variable Reference</h2>
          <button 
            onClick={onClose} 
            aria-label="Close variable reference panel"
            className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-teal focus-visible:outline-none transition-colors"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
        <div className="flex border-bottom border-border shrink-0" role="tablist" aria-label="Dataset selection">
          {Object.keys(DATASETS).map((key) => (
            <button
              key={key}
              role="tab"
              aria-selected={activeTab === key}
              aria-controls={`panel-${key}`}
              id={`tab-${key}`}
              onClick={() => onTabChange(key)}
              className={cn(
                "flex-1 py-3 text-[11px] font-mono font-semibold tracking-wider border-b-2 transition-all focus-visible:bg-teal/5 focus-visible:outline-none",
                activeTab === key ? "text-navy border-teal" : "text-text-muted border-transparent hover:text-navy"
              )}
            >
              {DATASETS[key].emoji} {DATASETS[key].label.split(' ')[0]}
            </button>
          ))}
        </div>
        <div 
          className="flex-1 overflow-y-auto p-4 space-y-6" 
          role="tabpanel" 
          id={`panel-${activeTab}`} 
          aria-labelledby={`tab-${activeTab}`}
        >
          <div className="bg-bg rounded-sm p-4 border-l-4 border-teal">
            <div className="font-serif text-lg text-navy mb-1.5 flex items-center gap-2">
              <span aria-hidden="true">{data.emoji}</span> {data.label}
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="text-[10px] font-mono px-2 py-1 bg-surface border border-border rounded-full text-text-dim">n = {data.n}</span>
              <span className="text-[10px] font-mono px-2 py-1 bg-surface border border-border rounded-full text-text-dim">{data.source}</span>
              <span className="text-[10px] font-mono px-2 py-1 bg-surface border border-border rounded-full text-text-dim">{data.unit}</span>
            </div>
            <p className="text-xs text-text-dim leading-relaxed mb-3">{data.description}</p>
            <div className="text-[11px] text-gold bg-gold-light p-2.5 rounded-sm italic leading-relaxed">
              <span className="font-bold not-italic">Note: </span> {data.caveat}
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-[10px] font-mono font-bold uppercase tracking-widest text-text-muted flex items-center gap-2 px-1">
                <div className="w-2 h-2 rounded-full bg-gold" aria-hidden="true" /> Categorical Variables
              </h3>
              {data.variables.categorical.map((v) => (
                <div key={v.name} className="flex gap-3 p-2.5 rounded-sm border border-border bg-bg items-start">
                  <div className="font-mono text-[11px] font-medium text-navy min-w-[120px] shrink-0 break-all">{v.name}</div>
                  <div className="text-xs text-text-dim leading-snug flex-1">{v.desc}</div>
                  <div className="text-[9px] font-mono font-medium px-1.5 py-0.5 rounded-md bg-gold-light text-gold shrink-0">Cat</div>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <h3 className="text-[10px] font-mono font-bold uppercase tracking-widest text-text-muted flex items-center gap-2 px-1">
                <div className="w-2 h-2 rounded-full bg-teal" aria-hidden="true" /> Quantitative Variables
              </h3>
              {data.variables.quantitative.map((v) => (
                <div key={v.name} className="flex gap-3 p-2.5 rounded-sm border border-border bg-bg items-start">
                  <div className="font-mono text-[11px] font-medium text-navy min-w-[120px] shrink-0 break-all">{v.name}</div>
                  <div className="text-xs text-text-dim leading-snug flex-1">{v.desc}</div>
                  <div className="text-[9px] font-mono font-medium px-1.5 py-0.5 rounded-md bg-teal-light text-teal shrink-0">Quant</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

const IntroScreen = ({ onStart }: { onStart: () => void, key?: React.Key }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex-1 flex flex-col items-center py-10 px-6 gap-8 overflow-y-auto relative z-10"
  >
    <div className="text-center max-w-xl">
      <h2 className="font-serif text-4xl md:text-5xl text-navy leading-tight mb-3">Statistical or Not?</h2>
      <p className="text-text-dim leading-relaxed max-w-md mx-auto">
        Before you run any procedure, you need to ask the right kind of question. Learn to tell the difference — then prove it.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
      <section className="bg-surface rounded-xl p-6 shadow-soft border-t-4 border-teal">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-teal mb-2">Statistical Research Question</h3>
        <p className="font-serif text-xl text-navy mb-2">Variability lives here</p>
        <p className="text-xs text-text-dim leading-relaxed mb-4">
          Targets a <strong>population</strong>, uses a <strong>sample</strong>, measures a <strong>variable</strong>, and accounts for <strong>chance</strong>. The answer is never a single fixed value — it's a distribution.
        </p>
        <div className="bg-teal-light text-teal p-3 rounded-lg text-xs font-mono italic leading-relaxed">
          <span className="sr-only">Example: </span>
          "What is the average age of patients readmitted within 30 days?"
        </div>
      </section>
      <section className="bg-surface rounded-xl p-6 shadow-soft border-t-4 border-coral">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-coral mb-2">Non-Statistical (Deterministic) Question</h3>
        <p className="font-serif text-xl text-navy mb-2">One fixed answer</p>
        <p className="text-xs text-text-dim leading-relaxed mb-4">
          Has a single, definite, unchanging answer. No sample needed — you can look it up, count it, or calculate it directly. No variability across observations.
        </p>
        <div className="bg-coral-light text-coral p-3 rounded-lg text-xs font-mono italic leading-relaxed">
          <span className="sr-only">Example: </span>
          "How many patients in this dataset were prescribed insulin?"
        </div>
      </section>
    </div>

    <div className="w-full max-w-2xl bg-surface rounded-xl shadow-soft overflow-hidden">
      <div className="px-5 py-3.5 text-[11px] font-bold uppercase tracking-widest text-text-muted border-b border-border font-mono">
        Key Differences at a Glance
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-bg/50">
              <th className="p-4 font-mono font-semibold text-text-muted border-b border-border">Feature</th>
              <th className="p-4 font-mono font-semibold text-text-muted border-b border-border">Statistical (SRQ)</th>
              <th className="p-4 font-mono font-semibold text-text-muted border-b border-border">Non-Statistical (NSQ)</th>
            </tr>
          </thead>
          <tbody className="text-text-dim">
            <tr className="border-b border-border">
              <td className="p-4 font-medium text-text-muted">Outcome</td>
              <td className="p-4 text-teal font-bold">Range of answers; best estimate from sample</td>
              <td className="p-4 text-coral font-bold">Single precise, fixed fact</td>
            </tr>
            <tr className="border-b border-border">
              <td className="p-4 font-medium text-text-muted">Key Element</td>
              <td className="p-4 text-teal font-bold">Variability — data points differ</td>
              <td className="p-4 text-coral font-bold">Certainty — no variation in answer</td>
            </tr>
            <tr>
              <td className="p-4 font-medium text-text-muted">Methods</td>
              <td className="p-4">Averages, proportions, intervals, tests</td>
              <td className="p-4">Direct lookup, count, or formula</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div className="w-full max-w-2xl">
      <h3 className="text-[11px] font-bold uppercase tracking-widest text-text-muted mb-3 font-mono px-1">
        A question is statistical if it requires all four:
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[
          { n: 1, t: "Defining a Population", d: "Targets a group too large to measure entirely" },
          { n: 2, t: "Using a Sample", d: "Relies on a subset to estimate the whole" },
          { n: 3, t: "Measuring a Variable", d: "Looks at a characteristic that takes different values" },
          { n: 4, t: "Accounting for Chance", d: "Uses probability to quantify uncertainty" }
        ].map(item => (
          <div key={item.n} className="bg-surface rounded-sm p-4 shadow-soft flex gap-3 items-start">
            <div className="w-6 h-6 bg-teal text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5" aria-hidden="true">
              {item.n}
            </div>
            <div>
              <strong className="block text-sm font-semibold text-navy mb-0.5">{item.t}</strong>
              <span className="text-xs text-text-dim leading-relaxed">{item.d}</span>
            </div>
          </div>
        ))}
      </div>
    </div>

    <button 
      onClick={onStart}
      className="mt-4 px-12 py-4 rounded-full bg-navy text-white font-bold text-lg shadow-heavy hover:bg-teal hover:-translate-y-0.5 focus-visible:ring-4 focus-visible:ring-teal/30 focus-visible:outline-none transition-all active:translate-y-0"
    >
      Start Sorting →
    </button>
  </motion.div>
);

const SwipeCard = ({ 
  question, 
  onAnswer, 
  onOpenVars 
}: { 
  question: Question, 
  onAnswer: (isStat: boolean) => void,
  onOpenVars: () => void,
  key?: React.Key
}) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
  
  const statOpacity = useTransform(x, [50, 150], [0, 1]);
  const notStatOpacity = useTransform(x, [-150, -50], [1, 0]);
  
  const ds = DATASETS[question.dataset];

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.x > 100) onAnswer(true);
    else if (info.offset.x < -100) onAnswer(false);
  };

  return (
    <div className="relative w-full max-w-[480px] h-[360px] flex items-center justify-center">
      {/* Ghost cards */}
      <div className="absolute inset-0 bg-surface rounded-xl shadow-soft translate-y-2 scale-[0.96] opacity-50" aria-hidden="true" />
      <div className="absolute inset-0 bg-surface rounded-xl shadow-soft translate-y-1 scale-[0.98] opacity-75" aria-hidden="true" />
      
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        style={{ x, rotate, opacity }}
        onDragEnd={handleDragEnd}
        whileDrag={{ cursor: 'grabbing' }}
        className="absolute inset-0 bg-surface rounded-xl shadow-heavy p-8 flex flex-col gap-4 cursor-grab touch-none select-none z-10"
        aria-roledescription="swipeable card"
        aria-label={`Question: ${question.question}`}
      >
        <div className={cn("inline-flex items-center gap-2 font-mono text-[10px] font-medium px-3 py-1 rounded-full w-fit tracking-wider", ds.badgeClass)}>
          <span aria-hidden="true">{ds.emoji}</span> {ds.label}
        </div>
        
        <div className="flex-1 flex items-center">
          <h3 className="font-serif text-xl md:text-2xl text-navy leading-snug">
            {question.question}
          </h3>
        </div>

        {/* Stamps */}
        <motion.div 
          style={{ opacity: statOpacity }}
          className="absolute top-6 right-6 font-serif text-2xl font-bold px-4 py-1.5 border-4 border-teal text-teal rounded-lg -rotate-6 pointer-events-none"
          aria-hidden="true"
        >
          STATISTICAL ✓
        </motion.div>
        <motion.div 
          style={{ opacity: notStatOpacity }}
          className="absolute top-6 left-6 font-serif text-2xl font-bold px-4 py-1.5 border-4 border-coral text-coral rounded-lg rotate-6 pointer-events-none"
          aria-hidden="true"
        >
          NOT STATISTICAL ✕
        </motion.div>

        <div className="flex items-center gap-2 text-[11px] text-text-muted font-mono" aria-hidden="true">
          <Info className="w-3 h-3" />
          ← swipe or use buttons below →
        </div>
      </motion.div>
    </div>
  );
};

const FeedbackOverlay = ({ 
  result, 
  onNext 
}: { 
  result: { q: Question, correct: boolean, userSaidStat: boolean }, 
  onNext: () => void 
}) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-navy/60 backdrop-blur-md"
    role="alertdialog"
    aria-modal="true"
    aria-labelledby="feedback-title"
    aria-describedby="feedback-desc"
  >
    <motion.div 
      initial={{ scale: 0.9, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      className="bg-surface rounded-xl p-8 max-w-lg w-full shadow-heavy max-h-[90vh] overflow-y-auto"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
          result.correct ? "bg-teal-light text-teal" : "bg-coral-light text-coral"
        )} aria-hidden="true">
          {result.correct ? <Check className="w-6 h-6" /> : <X className="w-6 h-6" />}
        </div>
        <h2 id="feedback-title" className={cn("font-serif text-2xl", result.correct ? "text-teal" : "text-coral")}>
          {result.correct ? "Correct!" : "Not quite."}
        </h2>
      </div>

      <div className="bg-bg rounded-lg p-4 text-sm text-text-dim italic leading-relaxed mb-4">
        <span className="sr-only">The question was: </span>
        "{result.q.question}"
      </div>

      <div className={cn(
        "inline-flex text-[11px] font-bold px-3 py-1 rounded-full font-mono mb-4",
        result.q.isStat ? "bg-teal-light text-teal" : "bg-coral-light text-coral"
      )}>
        {result.q.isStat ? "✓ Statistical Research Question" : "✕ Non-Statistical Question"}
      </div>

      <div id="feedback-desc" className="text-sm text-text leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: result.q.why }} />

      {result.q.isStat && result.correct && result.q.vars.length > 0 && (
        <VariabilitySpotlight 
          variableName={result.q.vars[0]} 
          dataset={result.q.dataset} 
        />
      )}

      {result.q.vars.length > 0 && (
        <div className="bg-bg rounded-sm p-3 border-l-4 border-border mb-6">
          <div className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-2 font-mono">
            Key Variables Involved
          </div>
          <div className="flex flex-wrap gap-1.5">
            {result.q.vars.map(v => (
              <span key={v} className="text-[11px] font-mono px-2 py-0.5 bg-surface border border-border rounded-md text-text-dim">
                {v}
              </span>
            ))}
          </div>
        </div>
      )}

      <button 
        onClick={onNext}
        autoFocus
        className="w-full py-3.5 rounded-full bg-navy text-white font-bold text-base hover:bg-teal focus-visible:ring-4 focus-visible:ring-teal/30 focus-visible:outline-none transition-all"
      >
        Next Question →
      </button>
    </motion.div>
  </motion.div>
);

const ResultsScreen = ({ 
  results, 
  onRestart 
}: { 
  results: { q: Question, correct: boolean, userSaidStat: boolean }[], 
  onRestart: () => void,
  key?: React.Key
}) => {
  const score = results.filter(r => r.correct).length;
  const total = results.length;
  const pct = score / total;

  const content = useMemo(() => {
    if (pct >= 0.9) return { h: "Outstanding!", s: "You have a strong grasp of what makes a question statistical." };
    if (pct >= 0.75) return { h: "Solid work!", s: "You're getting it. Review the misses — they reveal something about variability." };
    if (pct >= 0.5) return { h: "Good start.", s: "Re-read the definitions and try again. Focus on: does this question have variability?" };
    return { h: "Keep going.", s: "This is tricky — that's the point. Study the feedback explanations and retry." };
  }, [pct]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 flex flex-col items-center py-10 px-6 gap-6 overflow-y-auto relative z-10"
      role="main"
      aria-labelledby="results-title"
    >
      <div className="text-center max-w-xl">
        <div className="w-32 h-32 rounded-full bg-navy flex flex-col items-center justify-center mx-auto mb-4 shadow-heavy" aria-label={`Score: ${score} out of ${total}`}>
          <div className="font-serif text-4xl text-white leading-none" aria-hidden="true">{score}</div>
          <div className="text-xs text-white/50 font-mono mt-1" aria-hidden="true">/ {total}</div>
        </div>
        <h2 id="results-title" className="font-serif text-3xl text-navy mb-2">{content.h}</h2>
        <p className="text-sm text-text-dim leading-relaxed">{content.s}</p>
      </div>

      <div className="w-full max-w-lg">
        <h3 className="text-[11px] font-bold uppercase tracking-widest text-text-muted mb-3 font-mono px-1">
          Question Breakdown
        </h3>
        <div className="space-y-2">
          {results.map((r, i) => (
            <div key={i} className="bg-surface rounded-sm p-4 shadow-soft flex items-center justify-between gap-4">
              <div className="text-sm text-text leading-snug flex-1">{r.q.question}</div>
              <div className="text-xl shrink-0" aria-label={r.correct ? "Correct" : "Incorrect"}>
                {r.correct ? "✅" : "❌"}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full max-w-lg bg-surface rounded-xl p-6 shadow-soft border-l-4 border-gold">
        <h3 className="text-[11px] font-bold uppercase tracking-widest text-gold mb-2 font-mono">Reflect</h3>
        <p className="font-serif text-lg text-navy leading-snug mb-4">
          Which question surprised you most — and what does that tell you about variability?
        </p>
        <label htmlFor="reflection" className="sr-only">Your reflection</label>
        <textarea 
          id="reflection"
          className="w-full min-h-[100px] p-3 rounded-lg border border-border bg-bg text-sm text-text outline-none focus:border-teal focus-visible:ring-2 focus-visible:ring-teal focus-visible:outline-none transition-all resize-none"
          placeholder="Write your reflection here..."
        />
      </div>

      <button 
        onClick={onRestart}
        className="px-12 py-3.5 rounded-full bg-navy text-white font-bold text-base shadow-heavy hover:bg-teal focus-visible:ring-4 focus-visible:ring-teal/30 focus-visible:outline-none transition-all"
      >
        Try Again →
      </button>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [screen, setScreen] = useState<'intro' | 'game' | 'results'>('intro');
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [results, setResults] = useState<{ q: Question, correct: boolean, userSaidStat: boolean }[]>([]);
  const [feedback, setFeedback] = useState<{ q: Question, correct: boolean, userSaidStat: boolean } | null>(null);
  const [isVarPanelOpen, setIsVarPanelOpen] = useState(false);
  const [activeVarTab, setActiveVarTab] = useState('diabetes');

  const startGame = () => {
    const shuffled = [...QUESTIONS].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
    setCurrentIdx(0);
    setResults([]);
    setFeedback(null);
    setScreen('game');
  };

  const restart = () => {
    setScreen('intro');
  };

  const handleAnswer = useCallback((userSaidStat: boolean) => {
    const q = shuffledQuestions[currentIdx];
    const correct = userSaidStat === q.isStat;
    const result = { q, correct, userSaidStat };
    
    setResults(prev => [...prev, result]);
    setFeedback(result);
  }, [shuffledQuestions, currentIdx]);

  const handleNext = () => {
    setFeedback(null);
    if (currentIdx + 1 >= shuffledQuestions.length) {
      setScreen('results');
    } else {
      setCurrentIdx(prev => prev + 1);
    }
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (screen !== 'game') return;
      if (feedback) {
        if (e.key === 'Enter' || e.key === ' ') handleNext();
        return;
      }
      if (e.key === 'ArrowRight') handleAnswer(true);
      if (e.key === 'ArrowLeft') handleAnswer(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [screen, feedback, handleAnswer]);

  // Sync var panel tab with current question
  useEffect(() => {
    if (screen === 'game' && shuffledQuestions[currentIdx]) {
      setActiveVarTab(shuffledQuestions[currentIdx].dataset);
    }
  }, [screen, currentIdx, shuffledQuestions]);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header 
        onOpenVars={() => setIsVarPanelOpen(true)} 
        onRestart={restart} 
        showRestart={screen !== 'intro'} 
      />
      
      {screen === 'game' && (
        <ProgressBar 
          current={currentIdx} 
          total={shuffledQuestions.length} 
          dataset={shuffledQuestions[currentIdx]?.dataset} 
        />
      )}

      <main className="flex-1 relative overflow-hidden flex flex-col">
        <AnimatePresence mode="wait">
          {screen === 'intro' && (
            <IntroScreen key="intro" onStart={startGame} />
          )}
          
          {screen === 'game' && (
            <motion.div 
              key="game"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col items-center justify-start py-6 px-6 gap-6"
            >
              <div className="flex justify-between w-full max-w-[480px] pointer-events-none">
                <div className="flex items-center gap-2 text-xs font-medium text-coral opacity-50">
                  <div className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center text-base">✕</div>
                  <span>Not Statistical</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-teal opacity-50">
                  <span>Statistical</span>
                  <div className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center text-base">✓</div>
                </div>
              </div>

              <SwipeCard 
                key={currentIdx}
                question={shuffledQuestions[currentIdx]} 
                onAnswer={handleAnswer}
                onOpenVars={() => setIsVarPanelOpen(true)}
              />

              <div className="flex gap-6 items-center mt-auto mb-4">
                <div className="flex flex-col items-center gap-1.5">
                  <button 
                    onClick={() => handleAnswer(false)}
                    className="w-14 h-14 rounded-full border-2 border-coral text-coral flex items-center justify-center hover:bg-coral hover:text-white transition-all hover:scale-110 active:scale-95"
                  >
                    <X className="w-7 h-7" />
                  </button>
                  <span className="text-[10px] font-mono text-coral uppercase tracking-wider">Not Stat</span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <button 
                    onClick={() => setIsVarPanelOpen(true)}
                    className="w-11 h-11 rounded-full border-2 border-border text-text-muted flex items-center justify-center hover:border-navy hover:text-navy transition-all"
                  >
                    <BookOpen className="w-5 h-5" />
                  </button>
                  <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider">Vars</span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <button 
                    onClick={() => handleAnswer(true)}
                    className="w-14 h-14 rounded-full border-2 border-teal text-teal flex items-center justify-center hover:bg-teal hover:text-white transition-all hover:scale-110 active:scale-95"
                  >
                    <Check className="w-7 h-7" />
                  </button>
                  <span className="text-[10px] font-mono text-teal uppercase tracking-wider">Stat</span>
                </div>
              </div>
              
              <div className="text-[10px] text-text-muted font-mono mb-4 text-center">
                ← Left Arrow = Not Stat | Right Arrow = Stat →
              </div>
            </motion.div>
          )}

          {screen === 'results' && (
            <ResultsScreen key="results" results={results} onRestart={restart} />
          )}
        </AnimatePresence>

        {feedback && (
          <FeedbackOverlay result={feedback} onNext={handleNext} />
        )}
      </main>

      <VariablePanel 
        isOpen={isVarPanelOpen} 
        onClose={() => setIsVarPanelOpen(false)} 
        activeTab={activeVarTab}
        onTabChange={setActiveVarTab}
      />
    </div>
  );
}
