import React, { useEffect, useState, useCallback } from "react";
import { AlertTriangle, Clock, CheckCircle2, Shield, Eye, XCircle, ChevronRight, ChevronLeft, BookOpen, Monitor, Lock, Wifi } from "lucide-react";

const Assessment = () => {
  const questions = [
    { question: "What is React?", options: ["Database", "Library", "Framework", "Language"], answer: 1 },
    { question: "Which hook manages state?", options: ["useRef", "useMemo", "useState", "useEffect"], answer: 2 },
    { question: "What is Node.js?", options: ["Browser", "Runtime", "Database", "Library"], answer: 1 },
    { question: "MongoDB is?", options: ["SQL", "NoSQL", "Framework", "Language"], answer: 1 },
    { question: "Express is?", options: ["Backend Framework", "Database", "Frontend", "Compiler"], answer: 0 },
    { question: "Which company created React?", options: ["Google", "Amazon", "Meta", "Netflix"], answer: 2 },
    { question: "HTML stands for?", options: ["Hyper Text Markup Language", "Hyper Tool Language", "Markup Hyper Text", "None"], answer: 0 },
    { question: "CSS is used for?", options: ["Database", "Styling", "Backend", "Compiler"], answer: 1 },
    { question: "JSX is?", options: ["React Syntax", "Database", "Compiler", "Server"], answer: 0 },
    { question: "API stands for?", options: ["Application Programming Interface", "Application Protocol Interface", "Advanced Programming Interface", "None"], answer: 0 },
  ];

  const [phase, setPhase] = useState("rules"); // rules | confirm | test | submitted
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [violations, setViolations] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600);
  const [warningOpen, setWarningOpen] = useState(false);
  const [warningCount, setWarningCount] = useState(0);
  const [terminated, setTerminated] = useState(false);
  const [checkedRules, setCheckedRules] = useState(false);

  const submitTest = useCallback((reason = "manual") => {
    setSubmitted(true);
    setPhase("submitted");
    if (document.fullscreenElement) document.exitFullscreen();
    if (reason === "terminated") setTerminated(true);
  }, []);

  const launchTest = async () => {
    try { await document.documentElement.requestFullscreen(); } catch (e) {}
    setPhase("test");
  };

  // Timer
  useEffect(() => {
    if (phase !== "test" || submitted) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) { submitTest("timeout"); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [phase, submitted, submitTest]);

  // Violation detection
  useEffect(() => {
    if (phase !== "test") return;
    const handleVisibility = () => {
      if (document.hidden) {
        setViolations((v) => v + 1);
        setWarningCount((w) => w + 1);
        setWarningOpen(true);
      }
    };
    const handleBlur = () => {
      setViolations((v) => v + 1);
      setWarningCount((w) => w + 1);
      setWarningOpen(true);
    };
    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("blur", handleBlur);
    document.addEventListener("contextmenu", (e) => e.preventDefault());
    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey || e.metaKey || e.key === "F12") e.preventDefault();
    });
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("blur", handleBlur);
    };
  }, [phase]);

  // Auto-terminate
  useEffect(() => {
    if (violations >= 3 && phase === "test") submitTest("terminated");
  }, [violations, phase, submitTest]);

  const dismissWarning = () => setWarningOpen(false);
  const selectOption = (index) => setAnswers({ ...answers, [current]: index });

  const score = questions.reduce((acc, q, i) => answers[i] === q.answer ? acc + 1 : acc, 0);
  const pct = Math.round((score / questions.length) * 100);
  const mins = Math.floor(timeLeft / 60);
  const secs = String(timeLeft % 60).padStart(2, "0");
  const timerDanger = timeLeft < 60;

  // ─── RULES SCREEN ────────────────────────────────────────────────────────────
  if (phase === "rules") {
    const rules = [
      { icon: Monitor, title: "Fullscreen Mode", desc: "The test will open in fullscreen. Exiting fullscreen counts as a violation.", color: "#3b82f6" },
      { icon: Eye, title: "No Tab Switching", desc: "Switching tabs or minimizing the window will be detected and flagged immediately.", color: "#f59e0b" },
      { icon: Lock, title: "No Keyboard Shortcuts", desc: "Ctrl, Cmd, F12 and other shortcuts are disabled during the assessment.", color: "#8b5cf6" },
      { icon: XCircle, title: "No Right-Click", desc: "Context menus are disabled to prevent any external assistance.", color: "#ef4444" },
      { icon: Wifi, title: "3 Violations = Termination", desc: "Accumulating 3 violations will immediately end and auto-submit your test.", color: "#ec4899" },
      { icon: Clock, title: "10-Minute Timer", desc: "You have exactly 10 minutes. The test auto-submits when time expires.", color: "#10b981" },
    ];
    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0a0f1e 0%, #0f172a 50%, #0a0f1e 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap');
          * { box-sizing: border-box; }
          .rule-card { transition: transform 0.2s, border-color 0.2s; }
          .rule-card:hover { transform: translateY(-2px); }
          .launch-btn { transition: all 0.2s; position: relative; overflow: hidden; }
          .launch-btn::after { content: ''; position: absolute; inset: 0; background: rgba(255,255,255,0.08); opacity: 0; transition: opacity 0.2s; }
          .launch-btn:hover::after { opacity: 1; }
          .launch-btn:hover { transform: translateY(-1px); box-shadow: 0 12px 40px rgba(245,158,11,0.4); }
          .launch-btn:disabled { opacity: 0.45; cursor: not-allowed; transform: none; box-shadow: none; }
          .checkbox-wrap { cursor: pointer; user-select: none; }
          .checkbox-wrap:hover .custom-check { border-color: #f59e0b; }
        `}</style>
        <div style={{ width: "100%", maxWidth: "760px" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "72px", height: "72px", background: "linear-gradient(135deg, #f59e0b22, #f59e0b44)", borderRadius: "20px", border: "1px solid #f59e0b44", marginBottom: "20px" }}>
              <BookOpen size={32} color="#f59e0b" />
            </div>
            <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "34px", fontWeight: 800, color: "#f8fafc", margin: "0 0 10px" }}>Assessment Rules</h1>
            <p style={{ color: "#94a3b8", fontSize: "15px", margin: 0 }}>Read carefully before beginning. These rules are strictly enforced.</p>
          </div>

          {/* Rules Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "14px", marginBottom: "28px" }}>
            {rules.map(({ icon: Icon, title, desc, color }, i) => (
              <div key={i} className="rule-card" style={{ background: "#0f172a", border: `1px solid ${color}22`, borderRadius: "16px", padding: "20px", display: "flex", gap: "14px", alignItems: "flex-start" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: `${color}18`, border: `1px solid ${color}33`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={18} color={color} />
                </div>
                <div>
                  <div style={{ fontWeight: 600, color: "#f1f5f9", fontSize: "14px", marginBottom: "4px" }}>{title}</div>
                  <div style={{ color: "#64748b", fontSize: "13px", lineHeight: 1.5 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Info Strip */}
          <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: "14px", padding: "16px 20px", display: "flex", justifyContent: "space-around", marginBottom: "28px", flexWrap: "wrap", gap: "12px" }}>
            {[["10", "Questions"], ["10 min", "Duration"], ["MCQ", "Format"], ["1 pt", "Per Question"]].map(([val, label]) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "22px", fontWeight: 800, color: "#f59e0b" }}>{val}</div>
                <div style={{ fontSize: "12px", color: "#64748b", fontWeight: 500 }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Agreement */}
          <label className="checkbox-wrap" style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px", padding: "16px 20px", background: "#0f172a", border: `1px solid ${checkedRules ? "#f59e0b55" : "#1e293b"}`, borderRadius: "12px", transition: "border-color 0.2s" }}>
            <div className="custom-check" onClick={() => setCheckedRules(v => !v)} style={{ width: "22px", height: "22px", borderRadius: "6px", border: `2px solid ${checkedRules ? "#f59e0b" : "#334155"}`, background: checkedRules ? "#f59e0b" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.2s" }}>
              {checkedRules && <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#0a0f1e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
            </div>
            <span style={{ color: "#94a3b8", fontSize: "14px", lineHeight: 1.5 }}>I have read and understood all the rules. I agree to take this test honestly without any external assistance.</span>
          </label>

          {/* Launch Button */}
          <button className="launch-btn" onClick={launchTest} disabled={!checkedRules} style={{ width: "100%", padding: "18px", borderRadius: "14px", background: "linear-gradient(135deg, #f59e0b, #d97706)", border: "none", color: "#0a0f1e", fontSize: "16px", fontWeight: 700, fontFamily: "'DM Sans', sans-serif", cursor: checkedRules ? "pointer" : "not-allowed", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
            <Shield size={18} /> Begin Assessment <ChevronRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  // ─── SUBMITTED SCREEN ────────────────────────────────────────────────────────
  if (phase === "submitted") {
    const grade = pct >= 90 ? { label: "Excellent", color: "#10b981" } : pct >= 70 ? { label: "Good", color: "#3b82f6" } : pct >= 50 ? { label: "Average", color: "#f59e0b" } : { label: "Needs Improvement", color: "#ef4444" };
    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0a0f1e 0%, #0f172a 50%, #0a0f1e 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap');`}</style>
        <div style={{ width: "100%", maxWidth: "500px", textAlign: "center" }}>
          <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: "24px", padding: "48px 40px" }}>
            {terminated ? (
              <div style={{ width: "72px", height: "72px", borderRadius: "20px", background: "#ef444418", border: "1px solid #ef444433", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
                <XCircle size={36} color="#ef4444" />
              </div>
            ) : (
              <div style={{ width: "72px", height: "72px", borderRadius: "20px", background: "#10b98118", border: "1px solid #10b98133", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
                <CheckCircle2 size={36} color="#10b981" />
              </div>
            )}
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "28px", fontWeight: 800, color: "#f8fafc", margin: "0 0 6px" }}>{terminated ? "Test Terminated" : "Test Submitted"}</h2>
            <p style={{ color: "#64748b", fontSize: "14px", margin: "0 0 32px" }}>{terminated ? "Your test was terminated due to multiple violations." : "Your responses have been recorded."}</p>

            {/* Score Ring */}
            <div style={{ position: "relative", width: "140px", height: "140px", margin: "0 auto 32px" }}>
              <svg width="140" height="140" style={{ transform: "rotate(-90deg)" }}>
                <circle cx="70" cy="70" r="56" fill="none" stroke="#1e293b" strokeWidth="10" />
                <circle cx="70" cy="70" r="56" fill="none" stroke={grade.color} strokeWidth="10" strokeDasharray={`${2 * Math.PI * 56}`} strokeDashoffset={`${2 * Math.PI * 56 * (1 - pct / 100)}`} strokeLinecap="round" style={{ transition: "stroke-dashoffset 1s ease" }} />
              </svg>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: "'Syne', sans-serif", fontSize: "32px", fontWeight: 800, color: "#f8fafc" }}>{score}/10</span>
                <span style={{ fontSize: "12px", color: "#64748b", fontWeight: 500 }}>{pct}%</span>
              </div>
            </div>

            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 18px", borderRadius: "999px", background: `${grade.color}18`, border: `1px solid ${grade.color}33`, marginBottom: "28px" }}>
              <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: grade.color, display: "inline-block" }} />
              <span style={{ color: grade.color, fontSize: "13px", fontWeight: 600 }}>{grade.label}</span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
              {[["Correct", score, "#10b981"], ["Wrong", questions.length - score, "#ef4444"], ["Violations", violations, violations > 0 ? "#f59e0b" : "#64748b"]].map(([label, val, color]) => (
                <div key={label} style={{ background: "#0a0f1e", borderRadius: "12px", padding: "14px", border: "1px solid #1e293b" }}>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "22px", fontWeight: 800, color }}>{val}</div>
                  <div style={{ fontSize: "12px", color: "#64748b", marginTop: "2px" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── TEST SCREEN ─────────────────────────────────────────────────────────────
  const progress = (Object.keys(answers).length / questions.length) * 100;

  return (
    <div style={{ minHeight: "100vh", background: "#0a0f1e", fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap');
        * { box-sizing: border-box; }
        .opt-btn { transition: all 0.15s; }
        .opt-btn:hover { transform: translateX(4px); }
        .nav-btn { transition: all 0.15s; }
        .nav-btn:hover { opacity: 0.85; transform: translateY(-1px); }
        .q-dot { transition: all 0.15s; }
        .q-dot:hover { transform: scale(1.1); }
        @keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        .question-body { animation: fadeIn 0.25s ease; }
        @keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-6px)} 75%{transform:translateX(6px)} }
        .warning-modal { animation: fadeIn 0.2s ease; }
        @keyframes pulse-red { 0%,100%{box-shadow:0 0 0 0 rgba(239,68,68,0)} 50%{box-shadow:0 0 0 6px rgba(239,68,68,0.15)} }
        .danger-timer { animation: pulse-red 1s infinite; }
      `}</style>

      {/* Tab-Switch Warning Modal */}
      {warningOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(6px)" }}>
          <div className="warning-modal" style={{ background: "#0f172a", border: "2px solid #ef4444", borderRadius: "20px", padding: "40px 36px", maxWidth: "420px", width: "90%", textAlign: "center" }}>
            <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "#ef444420", border: "2px solid #ef444455", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
              <AlertTriangle size={28} color="#ef4444" />
            </div>
            <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "22px", fontWeight: 800, color: "#f8fafc", margin: "0 0 10px" }}>
              {violations >= 3 ? "Test Terminated" : "Violation Detected!"}
            </h3>
            <p style={{ color: "#94a3b8", fontSize: "14px", lineHeight: 1.6, margin: "0 0 8px" }}>
              {violations >= 3
                ? "You have exceeded the maximum number of violations. Your test has been auto-submitted."
                : "Tab switching or window blur was detected. This is a proctoring violation."}
            </p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "24px" }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{ width: "36px", height: "6px", borderRadius: "99px", background: i < violations ? "#ef4444" : "#1e293b", transition: "background 0.3s" }} />
              ))}
            </div>
            <p style={{ color: "#64748b", fontSize: "13px", margin: "0 0 24px" }}>
              Violation <strong style={{ color: "#ef4444" }}>{warningCount}</strong> of <strong style={{ color: "#ef4444" }}>3</strong> — {violations >= 3 ? "Test has been terminated." : "One more will terminate the test."}
            </p>
            <button onClick={dismissWarning} disabled={violations >= 3} style={{ width: "100%", padding: "14px", borderRadius: "10px", background: violations >= 3 ? "#1e293b" : "linear-gradient(135deg, #ef4444, #dc2626)", border: "none", color: violations >= 3 ? "#64748b" : "white", fontSize: "15px", fontWeight: 600, cursor: violations >= 3 ? "not-allowed" : "pointer" }}>
              {violations >= 3 ? "Closing…" : "I Understand — Resume Test"}
            </button>
          </div>
        </div>
      )}

      {/* Top Bar */}
      <div style={{ position: "sticky", top: 0, zIndex: 100, background: "#0f172a", borderBottom: "1px solid #1e293b", padding: "0 24px", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Shield size={18} color="#f59e0b" />
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: "#f8fafc", fontSize: "15px" }}>Assessment</span>
          <span style={{ background: "#1e293b", color: "#64748b", fontSize: "12px", padding: "2px 10px", borderRadius: "999px", fontWeight: 500 }}>MERN Stack</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          {/* Timer */}
          <div className={timerDanger ? "danger-timer" : ""} style={{ display: "flex", alignItems: "center", gap: "8px", background: timerDanger ? "#ef444415" : "#1e293b", border: `1px solid ${timerDanger ? "#ef4444" : "#334155"}`, borderRadius: "10px", padding: "6px 14px", transition: "all 0.3s" }}>
            <Clock size={14} color={timerDanger ? "#ef4444" : "#94a3b8"} />
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: timerDanger ? "#ef4444" : "#f8fafc", fontSize: "15px", letterSpacing: "0.05em" }}>{mins}:{secs}</span>
          </div>

          {/* Violations */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ width: "10px", height: "10px", borderRadius: "50%", background: i < violations ? "#ef4444" : "#1e293b", border: `1px solid ${i < violations ? "#ef4444" : "#334155"}`, transition: "all 0.3s" }} />
            ))}
            <span style={{ fontSize: "12px", color: "#64748b", marginLeft: "2px" }}>violations</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{ height: "3px", background: "#1e293b", position: "relative" }}>
        <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${progress}%`, background: "linear-gradient(90deg, #f59e0b, #d97706)", transition: "width 0.4s ease", borderRadius: "0 2px 2px 0" }} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: "20px", padding: "24px", maxWidth: "1100px", margin: "0 auto" }}>

        {/* Question Panel */}
        <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: "20px", padding: "36px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
            <span style={{ fontSize: "13px", color: "#64748b", fontWeight: 500 }}>Question {current + 1} of {questions.length}</span>
            <span style={{ fontSize: "13px", color: "#f59e0b", fontWeight: 600, background: "#f59e0b15", padding: "4px 12px", borderRadius: "999px", border: "1px solid #f59e0b33" }}>
              {Object.keys(answers).length}/{questions.length} Answered
            </span>
          </div>

          <div className="question-body" key={current}>
            <p style={{ fontSize: "19px", fontWeight: 600, color: "#f1f5f9", lineHeight: 1.5, marginBottom: "28px" }}>{questions[current].question}</p>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {questions[current].options.map((option, i) => {
                const selected = answers[current] === i;
                return (
                  <button key={i} className="opt-btn" onClick={() => selectOption(i)} style={{ width: "100%", textAlign: "left", padding: "16px 20px", borderRadius: "12px", background: selected ? "linear-gradient(135deg, #f59e0b18, #d97706)" : "#0a0f1e", border: `1.5px solid ${selected ? "#f59e0b" : "#1e293b"}`, color: selected ? "#fef3c7" : "#94a3b8", fontSize: "15px", fontWeight: selected ? 600 : 400, cursor: "pointer", display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{ width: "28px", height: "28px", borderRadius: "8px", background: selected ? "#f59e0b" : "#1e293b", border: `1px solid ${selected ? "#f59e0b" : "#334155"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "12px", fontWeight: 700, color: selected ? "#0a0f1e" : "#64748b", transition: "all 0.15s" }}>
                      {["A", "B", "C", "D"][i]}
                    </span>
                    {option}
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "36px", paddingTop: "24px", borderTop: "1px solid #1e293b" }}>
            <button className="nav-btn" onClick={() => setCurrent(Math.max(0, current - 1))} disabled={current === 0} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px 20px", borderRadius: "10px", background: "#1e293b", border: "1px solid #334155", color: current === 0 ? "#334155" : "#94a3b8", fontSize: "14px", fontWeight: 600, cursor: current === 0 ? "not-allowed" : "pointer" }}>
              <ChevronLeft size={16} /> Previous
            </button>

            <div style={{ display: "flex", gap: "3px" }}>
              {questions.map((_, i) => (
                <div key={i} style={{ width: "6px", height: "6px", borderRadius: "50%", background: i === current ? "#f59e0b" : answers[i] !== undefined ? "#10b981" : "#1e293b", transition: "all 0.2s" }} />
              ))}
            </div>

            {current === questions.length - 1 ? (
              <button className="nav-btn" onClick={() => submitTest("manual")} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px 24px", borderRadius: "10px", background: "linear-gradient(135deg, #10b981, #059669)", border: "none", color: "white", fontSize: "14px", fontWeight: 700, cursor: "pointer" }}>
                Submit Test <CheckCircle2 size={16} />
              </button>
            ) : (
              <button className="nav-btn" onClick={() => setCurrent(current + 1)} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px 20px", borderRadius: "10px", background: "linear-gradient(135deg, #f59e0b, #d97706)", border: "none", color: "#0a0f1e", fontSize: "14px", fontWeight: 700, cursor: "pointer" }}>
                Next <ChevronRight size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Question Navigator */}
          <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: "20px", padding: "24px" }}>
            <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: "#f8fafc", fontSize: "14px", margin: "0 0 16px", letterSpacing: "0.05em", textTransform: "uppercase" }}>Questions</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "8px" }}>
              {questions.map((_, i) => (
                <button key={i} className="q-dot" onClick={() => setCurrent(i)} style={{ height: "42px", borderRadius: "10px", background: i === current ? "#f59e0b" : answers[i] !== undefined ? "#10b98120" : "#0a0f1e", border: `1.5px solid ${i === current ? "#f59e0b" : answers[i] !== undefined ? "#10b981" : "#1e293b"}`, color: i === current ? "#0a0f1e" : answers[i] !== undefined ? "#10b981" : "#64748b", fontSize: "13px", fontWeight: 700, cursor: "pointer" }}>
                  {i + 1}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "14px", paddingTop: "14px", borderTop: "1px solid #1e293b" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "2px", background: "#10b981" }} />
                <span style={{ fontSize: "12px", color: "#64748b" }}>Answered</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "2px", background: "#1e293b", border: "1px solid #334155" }} />
                <span style={{ fontSize: "12px", color: "#64748b" }}>Skipped</span>
              </div>
            </div>
          </div>

          {/* Progress Card */}
          <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: "20px", padding: "24px" }}>
            <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: "#f8fafc", fontSize: "14px", margin: "0 0 16px", letterSpacing: "0.05em", textTransform: "uppercase" }}>Progress</h3>
            <div style={{ marginBottom: "8px", display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: "12px", color: "#64748b" }}>Completion</span>
              <span style={{ fontSize: "12px", color: "#f59e0b", fontWeight: 600 }}>{Math.round(progress)}%</span>
            </div>
            <div style={{ height: "6px", background: "#0a0f1e", borderRadius: "99px", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg, #f59e0b, #10b981)", borderRadius: "99px", transition: "width 0.4s ease" }} />
            </div>
          </div>

          {/* Submit Early */}
          {Object.keys(answers).length > 0 && (
            <button onClick={() => submitTest("manual")} style={{ width: "100%", padding: "14px", borderRadius: "12px", background: "transparent", border: "1.5px solid #1e293b", color: "#64748b", fontSize: "14px", fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }} onMouseEnter={e => { e.target.style.borderColor = "#10b981"; e.target.style.color = "#10b981"; }} onMouseLeave={e => { e.target.style.borderColor = "#1e293b"; e.target.style.color = "#64748b"; }}>
              Submit Early
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Assessment;
