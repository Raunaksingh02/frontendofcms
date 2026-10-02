import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  BookOpen,
  Code2,
  CheckCircle2,
  Circle,
  ChevronLeft,
  ChevronRight,
  Play,
  RotateCcw,
  Home,
  ListChecks,
  Trophy,
} from "lucide-react";
import Htmltopics from "./Learndata/Htmltopics";
import Csstopics from "./Learndata/Csstopics";
import Jstopics from "./Learndata/Jstopics";

const LANGUAGES = [
  { id: "html", label: "HTML", topics: Htmltopics, color: "#e34c26" },
  { id: "css", label: "CSS", topics: Csstopics  , color: "#2965f1" },
  { id: "js", label: "JavaScript", topics: Jstopics   , color: "#f0db4f" },
];

const PROGRESS_KEY = "learnhub-progress-v1";

function loadProgress() {
  try {
    const raw = window.localStorage.getItem(PROGRESS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveProgress(progress) {
  try {
    window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch {
    /* ignore storage errors (private mode, etc.) */
  }
}

/* ------------------------------ LIVE EDITOR ------------------------------ */

function LiveEditor({ code, onChange }) {
  const [previewDoc, setPreviewDoc] = useState(code);

  // Debounced auto-run
  useEffect(() => {
    const t = setTimeout(() => setPreviewDoc(code), 400);
    return () => clearTimeout(t);
  }, [code]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 h-[420px]">
      <div className="flex flex-col min-h-0 rounded-lg overflow-hidden border border-gray-200">
        <div className="flex items-center justify-between px-3 py-1.5 bg-gray-800 text-gray-200 text-xs font-medium">
          <span className="flex items-center gap-1.5">
            <Code2 size={13} /> Editor
          </span>
          <button
            onClick={() => setPreviewDoc(code)}
            className="flex items-center gap-1 px-2 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-xs"
          >
            <Play size={11} /> Run
          </button>
        </div>
        <textarea
          value={code}
          onChange={(e) => onChange(e.target.value)}
          spellCheck={false}
          className="flex-1 w-full p-3 bg-gray-900 text-green-300 font-mono text-xs outline-none resize-none"
        />
      </div>
      <div className="flex flex-col min-h-0 rounded-lg overflow-hidden border border-gray-200">
        <div className="px-3 py-1.5 bg-gray-100 text-gray-600 text-xs font-medium border-b border-gray-200">
          Preview
        </div>
        <iframe
          title="live-preview"
          sandbox="allow-scripts"
          className="flex-1 w-full bg-white"
          srcDoc={previewDoc}
        />
      </div>
    </div>
  );
}

/* --------------------------------- QUIZ --------------------------------- */

function Quiz({ quiz, topicId, onPass }) {
  const [answers, setAnswers] = useState({});
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setAnswers({});
    setChecked(false);
  }, [topicId]);

  const score = useMemo(() => {
    if (!checked) return null;
    return quiz.reduce(
      (acc, q, i) => acc + (answers[i] === q.correctIndex ? 1 : 0),
      0
    );
  }, [checked, answers, quiz]);

  const allAnswered = quiz.every((_, i) => answers[i] !== undefined);

  const handleCheck = () => {
    setChecked(true);
    const correctCount = quiz.reduce(
      (acc, q, i) => acc + (answers[i] === q.correctIndex ? 1 : 0),
      0
    );
    if (correctCount === quiz.length && onPass) onPass();
  };

  return (
    <div className="space-y-5">
      {quiz.map((q, qi) => (
        <div key={qi} className="border border-gray-200 rounded-lg p-4">
          <p className="text-sm font-semibold text-gray-800 mb-3">
            {qi + 1}. {q.question}
          </p>
          <div className="space-y-2">
            {q.options.map((opt, oi) => {
              const selected = answers[qi] === oi;
              const isCorrect = oi === q.correctIndex;
              let stateClass = "border-gray-200 hover:border-indigo-300";
              if (checked && selected && isCorrect)
                stateClass = "border-green-500 bg-green-50";
              else if (checked && selected && !isCorrect)
                stateClass = "border-red-500 bg-red-50";
              else if (checked && isCorrect)
                stateClass = "border-green-500 bg-green-50";
              else if (selected) stateClass = "border-indigo-500 bg-indigo-50";

              return (
                <button
                  key={oi}
                  disabled={checked}
                  onClick={() => setAnswers((a) => ({ ...a, [qi]: oi }))}
                  className={`w-full text-left text-sm px-3 py-2 text-black rounded-md border transition ${stateClass} ${
                    checked ? "cursor-default" : "cursor-pointer"
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
          {checked && (
            <p className="text-xs text-gray-500 mt-2 italic">{q.explanation}</p>
          )}
        </div>
      ))}

      {!checked ? (
        <button
          onClick={handleCheck}
          disabled={!allAnswered}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          <ListChecks size={16} /> Check Answers
        </button>
      ) : (
        <div className="flex items-center gap-3">
          <span
            className={`text-sm font-semibold px-3 py-1.5 rounded-md ${
              score === quiz.length
                ? "bg-green-100 text-green-700"
                : "bg-amber-100 text-amber-700"
            }`}
          >
            {score} / {quiz.length} correct
          </span>
          <button
            onClick={() => {
              setAnswers({});
              setChecked(false);
            }}
            className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900"
          >
            <RotateCcw size={14} /> Retry
          </button>
        </div>
      )}
    </div>
  );
}

/* -------------------------------- MAIN HUB -------------------------------- */

export default function LearnHub({ setActiveScreen }) {
  const [langId, setLangId] = useState("html");
  const [topicIndex, setTopicIndex] = useState(0);
  const [progress, setProgress] = useState({});
  const [code, setCode] = useState("");
  const codeCacheRef = useRef({});

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  const language = LANGUAGES.find((l) => l.id === langId);
  const topics = language.topics;
  const topic = topics[topicIndex];

  // Load starter code (or cached edits) whenever the topic changes
  useEffect(() => {
    const key = `${langId}-${topic.id}`;
    setCode(codeCacheRef.current[key] ?? topic.example);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [langId, topic.id]);

  const handleCodeChange = (val) => {
    setCode(val);
    codeCacheRef.current[`${langId}-${topic.id}`] = val;
  };

  const markComplete = () => {
    setProgress((prev) => {
      const next = { ...prev, [topic.id]: true };
      saveProgress(next);
      return next;
    });
  };

  const switchLanguage = (id) => {
    setLangId(id);
    setTopicIndex(0);
  };

  const completedInLang = topics.filter((t) => progress[t.id]).length;
  const pct = Math.round((completedInLang / topics.length) * 100);

  const goPrev = () => setTopicIndex((i) => Math.max(0, i - 1));
  const goNext = () =>
    setTopicIndex((i) => Math.min(topics.length - 1, i + 1));

  return (
    <div className="h-screen w-full bg-gray-50 flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-2.5 bg-white border-b border-gray-200">
        <div className="flex items-center gap-3">
          {setActiveScreen && (
            <button
              onClick={() => setActiveScreen("Questionpage")}
              className="text-gray-500 hover:text-gray-700 text-sm flex items-center gap-1"
            >
              <Home size={14} /> Home
            </button>
          )}
          <span className="flex items-center gap-1.5 font-semibold text-gray-800">
            <BookOpen size={18} className="text-indigo-600" /> Learn HTML / CSS / JS
          </span>
        </div>
        <div className="flex gap-1">
          {LANGUAGES.map((l) => (
            <button
              key={l.id}
              onClick={() => switchLanguage(l.id)}
              className={`px-4 py-1.5 rounded-md text-sm font-semibold transition ${
                langId === l.id
                  ? "text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              style={langId === l.id ? { backgroundColor: l.color } : {}}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[260px_1fr] min-h-0">
        {/* Sidebar */}
        <div className="border-r border-gray-200 bg-white overflow-y-auto p-3">
          <div className="mb-3 px-1">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span>Progress</span>
              <span>{completedInLang}/{topics.length}</span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${pct}%`, backgroundColor: language.color }}
              />
            </div>
          </div>
          <div className="space-y-0.5">
            {topics.map((t, i) => (
              <button
                key={t.id}
                onClick={() => setTopicIndex(i)}
                className={`w-full flex items-start gap-2 text-left px-2.5 py-2 rounded-md text-xs transition ${
                  i === topicIndex
                    ? "bg-indigo-50 text-indigo-800 font-semibold"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {progress[t.id] ? (
                  <CheckCircle2 size={14} className="text-green-500 mt-0.5 shrink-0" />
                ) : (
                  <Circle size={14} className="text-gray-300 mt-0.5 shrink-0" />
                )}
                <span>{i + 1}. {t.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 max-w-4xl">
          <div className="flex items-center justify-between mb-1">
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full text-white"
              style={{ backgroundColor: language.color }}
            >
              {language.label} · Topic {topicIndex + 1} of {topics.length}
            </span>
            {progress[topic.id] && (
              <span className="flex items-center gap-1 text-xs font-medium text-green-600">
                <Trophy size={13} /> Completed
              </span>
            )}
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">{topic.title}</h1>
          <p className="text-sm text-gray-500 mb-5">{topic.summary}</p>

          {/* Theory */}
          <div className="prose prose-sm max-w-none mb-6">
            {topic.theory.split("\n\n").map((para, i) => (
              <p key={i} className="text-sm text-gray-700 leading-relaxed mb-3">
                {para}
              </p>
            ))}
          </div>

          <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 mb-6">
            <h3 className="text-xs font-bold uppercase tracking-wide text-indigo-700 mb-2">
              Key Points
            </h3>
            <ul className="space-y-1.5">
              {topic.keyPoints.map((kp, i) => (
                <li key={i} className="text-sm text-indigo-900 flex gap-2">
                  <span className="text-indigo-400">•</span>
                  <span>{kp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Live editor */}
          <h3 className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-1.5">
            <Code2 size={16} /> Try it yourself
          </h3>
          <LiveEditor code={code} onChange={handleCodeChange} />

          {/* Quiz */}
          <h3 className="text-sm font-bold text-black mt-8 mb-3 flex items-center gap-1.5">
            <ListChecks size={16} className="text-black" /> Practice Quiz
          </h3>
          <Quiz className="text-black" quiz={topic.quiz} topicId={topic.id} onPass={markComplete} />

          {/* Nav */}
          <div className="flex items-center justify-between mt-8 pb-10">
            <button
              onClick={goPrev}
              disabled={topicIndex === 0}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-gray-300 text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={16} /> Previous
            </button>
            {!progress[topic.id] && (
              <button
                onClick={markComplete}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-semibold hover:bg-green-700"
              >
                <CheckCircle2 size={16} /> Mark as Complete
              </button>
            )}
            <button
              onClick={goNext}
              disabled={topicIndex === topics.length - 1}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-gray-300 text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}