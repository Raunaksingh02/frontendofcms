import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import {
  Sparkles, Brain, Trophy, Loader2, Clock, ChevronRight,
  ChevronLeft, CheckCircle2, XCircle, RotateCcw, Zap,
  Target, Award, AlertCircle, BarChart2, Flag,
} from "lucide-react";

// ─── THEME ────────────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;600&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Outfit', sans-serif; }

  @keyframes fadeUp    { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeIn    { from{opacity:0} to{opacity:1} }
  @keyframes slideR    { from{opacity:0;transform:translateX(28px)} to{opacity:1;transform:translateX(0)} }
  @keyframes slideL    { from{opacity:0;transform:translateX(-28px)} to{opacity:1;transform:translateX(0)} }
  @keyframes scaleIn   { from{opacity:0;transform:scale(0.88)} to{opacity:1;transform:scale(1)} }
  @keyframes popIn     { 0%{opacity:0;transform:scale(0.5)} 70%{transform:scale(1.08)} 100%{opacity:1;transform:scale(1)} }
  @keyframes spin      { to{transform:rotate(360deg)} }
  @keyframes timerPulse{ 0%,100%{box-shadow:0 0 0 0 rgba(239,68,68,0.4)} 50%{box-shadow:0 0 0 8px rgba(239,68,68,0)} }
  @keyframes correctFlash { 0%{background:transparent} 50%{background:#10b98122} 100%{background:transparent} }
  @keyframes wrongFlash   { 0%{background:transparent} 50%{background:#ef444422} 100%{background:transparent} }
  @keyframes shimmer   { 0%{background-position:-400% center} 100%{background-position:400% center} }
  @keyframes float     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
  @keyframes countIn   { from{opacity:0;transform:scale(0.3) rotate(-10deg)} to{opacity:1;transform:scale(1) rotate(0deg)} }
  @keyframes progressFill { from{width:0} }

  .fade-up  { animation: fadeUp  0.4s ease both; }
  .fade-in  { animation: fadeIn  0.3s ease both; }
  .slide-r  { animation: slideR  0.35s cubic-bezier(.34,1.56,.64,1) both; }
  .slide-l  { animation: slideL  0.35s cubic-bezier(.34,1.56,.64,1) both; }
  .scale-in { animation: scaleIn 0.35s cubic-bezier(.34,1.56,.64,1) both; }

  .opt-btn {
    width:100%; text-align:left; border:none; cursor:pointer;
    font-family:'Outfit',sans-serif; font-size:15px; font-weight:500;
    transition: transform 0.18s cubic-bezier(.34,1.56,.64,1), border-color 0.15s, background 0.15s, box-shadow 0.15s;
    position:relative; overflow:hidden;
  }
  .opt-btn::before {
    content:''; position:absolute; inset:0;
    background:rgba(255,255,255,0.04);
    opacity:0; transition:opacity 0.15s;
  }
  .opt-btn:hover:not(:disabled)::before { opacity:1; }
  .opt-btn:hover:not(:disabled) { transform:translateX(4px); }
  .opt-btn:disabled { cursor:not-allowed; }

  .gen-btn {
    transition: transform 0.18s, box-shadow 0.2s, filter 0.18s;
    cursor:pointer;
  }
  .gen-btn:hover:not(:disabled) {
    transform:translateY(-2px);
    filter:brightness(1.1);
    box-shadow:0 12px 32px rgba(249,115,22,0.35);
  }
  .gen-btn:disabled { opacity:0.45; cursor:not-allowed; }

  .nav-btn {
    transition: transform 0.15s, border-color 0.15s, color 0.15s, background 0.15s;
    cursor:pointer;
  }
  .nav-btn:hover:not(:disabled) { transform:translateY(-1px); }
  .nav-btn:disabled { opacity:0.3; cursor:not-allowed; }

  .sel-field {
    width:100%; background:#0a0f1e;
    border:1.5px solid #1e293b; border-radius:12px;
    padding:12px 14px; color:#f1f5f9; font-size:14px; font-weight:500;
    font-family:'Outfit',sans-serif; outline:none; cursor:pointer;
    appearance:none; -webkit-appearance:none;
    transition:border-color 0.2s, box-shadow 0.2s;
  }
  .sel-field:focus { border-color:#f97316; box-shadow:0 0 0 3px rgba(249,115,22,0.15); }
  .sel-field option { background:#0f172a; }

  .timer-danger { animation: timerPulse 1s ease-in-out infinite; }

  ::-webkit-scrollbar { width:4px; }
  ::-webkit-scrollbar-track { background:transparent; }
  ::-webkit-scrollbar-thumb { background:#1e293b; border-radius:99px; }
`;

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const TOPICS = ["Coding MCQ","Quantitative Aptitude","Logical Reasoning","Verbal Ability","DBMS","Operating System","Computer Networks","Java","React","Node.js"];
const COMPANIES = ["TCS","Wipro","Infosys","Accenture","Cognizant","Capgemini","HCL"];
const DIFFICULTIES = ["Easy","Medium","Hard"];
const DIFF_TIME = { Easy:900, Medium:600, Hard:420 }; // seconds per quiz
const DIFF_COLOR = { Easy:"#34d399", Medium:"#f59e0b", Hard:"#ef4444" };
const OPT_LABELS = ["A","B","C","D"];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const fmt = (s) => `${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;
const pct = (a,b) => Math.round((a/b)*100);

// ─── CONFIG SCREEN ────────────────────────────────────────────────────────────
const ConfigScreen = ({ topic, setTopic, company, setCompany, difficulty, setDifficulty, onGenerate, loading }) => (
  <div className="fade-up" style={{ maxWidth:"680px", margin:"0 auto", width:"100%" }}>
    {/* Hero */}
    <div style={{ textAlign:"center", marginBottom:"40px" }}>
      <div style={{ display:"inline-flex", alignItems:"center", justifyContent:"center", width:"72px", height:"72px", borderRadius:"20px", background:"linear-gradient(135deg,#f97316,#f59e0b)", marginBottom:"20px", boxShadow:"0 16px 40px rgba(249,115,22,0.35)", animation:"float 3s ease-in-out infinite" }}>
        <Brain size={32} color="white" />
      </div>
      <h1 style={{ fontFamily:"'Outfit',sans-serif", fontSize:"clamp(26px,4vw,42px)", fontWeight:900, color:"#f8fafc", letterSpacing:"-0.03em", marginBottom:"10px" }}>
        AI Quiz Generator
      </h1>
      <p style={{ color:"#475569", fontSize:"15px", lineHeight:1.6, maxWidth:"400px", margin:"0 auto" }}>
        Company-specific aptitude & coding tests, generated instantly by AI.
      </p>
    </div>

    {/* Config card */}
    <div style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:"24px", padding:"32px" }}>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"16px", marginBottom:"28px" }}>
        {[
          { label:"Topic", value:topic, setter:setTopic, options:TOPICS },
          { label:"Company", value:company, setter:setCompany, options:COMPANIES },
          { label:"Difficulty", value:difficulty, setter:setDifficulty, options:DIFFICULTIES },
        ].map(({ label, value, setter, options }) => (
          <div key={label}>
            <div style={{ fontSize:"11px", fontWeight:700, color:"#475569", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:"8px" }}>{label}</div>
            <div style={{ position:"relative" }}>
              <select value={value} onChange={e => setter(e.target.value)} className="sel-field">
                {options.map(o => <option key={o}>{o}</option>)}
              </select>
              <div style={{ position:"absolute", right:"12px", top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }}>
                <ChevronRight size={14} color="#475569" style={{ transform:"rotate(90deg)" }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Info strip */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"10px", marginBottom:"28px" }}>
        {[
          ["20 Questions","MCQ Format"],
          [`${DIFF_TIME[difficulty]/60} Minutes`, "Time Limit"],
          [difficulty, "Difficulty"],
        ].map(([val, lbl], i) => (
          <div key={i} style={{ background:"#0a0f1e", border:"1px solid #1e293b", borderRadius:"12px", padding:"12px 14px", textAlign:"center" }}>
            <div style={{ fontWeight:800, fontSize:"16px", color: i===2 ? DIFF_COLOR[difficulty] : "#f97316", fontFamily:"'Outfit',sans-serif", marginBottom:"3px" }}>{val}</div>
            <div style={{ fontSize:"11px", color:"#334155", fontWeight:500 }}>{lbl}</div>
          </div>
        ))}
      </div>

      <button onClick={onGenerate} disabled={loading} className="gen-btn" style={{ width:"100%", padding:"16px", borderRadius:"14px", background:"linear-gradient(135deg,#f97316,#f59e0b)", border:"none", color:"#0a0f1e", fontSize:"15px", fontWeight:800, fontFamily:"'Outfit',sans-serif", display:"flex", alignItems:"center", justifyContent:"center", gap:"10px", letterSpacing:"-0.01em" }}>
        {loading
          ? <><div style={{ width:"18px", height:"18px", border:"2.5px solid rgba(0,0,0,0.3)", borderTopColor:"rgba(0,0,0,0.8)", borderRadius:"50%", animation:"spin 0.7s linear infinite" }} /> Generating Quiz…</>
          : <><Sparkles size={18} /> Generate AI Quiz</>
        }
      </button>
    </div>
  </div>
);

// ─── QUIZ SCREEN ──────────────────────────────────────────────────────────────
const QuizScreen = ({ questions, difficulty, topic, company, onFinish }) => {
  const total        = questions.length;
  const [curr, setCurr]     = useState(0);
  const [answers, setAns]   = useState({});      // { idx: chosenOption }
  const [revealed, setRev]  = useState({});      // { idx: true } shown after pick
  const [timeLeft, setTime] = useState(DIFF_TIME[difficulty]);
  const [dir, setDir]       = useState("r");     // slide direction
  const timerRef = useRef(null);

  const question = questions[curr];
  const chosen   = answers[curr];
  const isRev    = revealed[curr];
  const correct  = question?.correctAnswer;
  const progress = ((curr) / total) * 100;
  const answered = Object.keys(answers).length;
  const danger   = timeLeft < 60;

  // Timer
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTime(t => {
        if (t <= 1) { clearInterval(timerRef.current); onFinish(answers, 0); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  const pick = (opt) => {
    if (isRev) return;
    setAns(a => ({ ...a, [curr]: opt }));
    setRev(r => ({ ...r, [curr]: true }));
  };

  const goNext = () => {
    if (curr < total - 1) { setDir("r"); setCurr(c => c + 1); }
    else { clearInterval(timerRef.current); onFinish(answers, timeLeft); }
  };

  const goPrev = () => {
    if (curr > 0) { setDir("l"); setCurr(c => c - 1); }
  };

  const skip = () => {
    if (curr < total - 1) { setDir("r"); setCurr(c => c + 1); }
  };

  const optStyle = (opt) => {
    const base = { padding:"15px 18px", borderRadius:"13px", marginBottom:"10px", display:"flex", alignItems:"center", gap:"13px", border:"1.5px solid" };
    if (!isRev) return { ...base, background:"#0a0f1e", borderColor:"#1e293b", color:"#94a3b8" };
    if (opt === correct) return { ...base, background:"#10b98115", borderColor:"#10b981", color:"#f1f5f9" };
    if (opt === chosen && opt !== correct) return { ...base, background:"#ef444415", borderColor:"#ef4444", color:"#f1f5f9" };
    return { ...base, background:"#0a0f1e", borderColor:"#0f172a", color:"#334155" };
  };

  const labelStyle = (opt) => {
    const base = { width:"28px", height:"28px", borderRadius:"8px", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"12px", fontWeight:800, flexShrink:0, fontFamily:"'JetBrains Mono',monospace" };
    if (!isRev) return { ...base, background:"#1e293b", color:"#475569" };
    if (opt === correct) return { ...base, background:"#10b981", color:"white" };
    if (opt === chosen && opt !== correct) return { ...base, background:"#ef4444", color:"white" };
    return { ...base, background:"#111827", color:"#334155" };
  };

  return (
    <div style={{ maxWidth:"740px", margin:"0 auto", width:"100%" }}>

      {/* Top bar */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"20px", flexWrap:"wrap", gap:"10px" }}>
        {/* Meta */}
        <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
          <div style={{ padding:"5px 12px", background:"#0f172a", border:"1px solid #1e293b", borderRadius:"999px", fontSize:"12px", fontWeight:600, color:"#64748b" }}>{company}</div>
          <div style={{ padding:"5px 12px", background:"#0f172a", border:"1px solid #1e293b", borderRadius:"999px", fontSize:"12px", fontWeight:600, color:"#64748b" }}>{topic}</div>
          <div style={{ padding:"5px 12px", background:`${DIFF_COLOR[difficulty]}15`, border:`1px solid ${DIFF_COLOR[difficulty]}44`, borderRadius:"999px", fontSize:"12px", fontWeight:700, color:DIFF_COLOR[difficulty] }}>{difficulty}</div>
        </div>
        {/* Timer */}
        <div className={danger ? "timer-danger" : ""} style={{ display:"flex", alignItems:"center", gap:"8px", background: danger ? "#ef444415" : "#0f172a", border:`1.5px solid ${danger ? "#ef4444" : "#1e293b"}`, borderRadius:"12px", padding:"8px 16px", transition:"all 0.3s" }}>
          <Clock size={15} color={danger ? "#ef4444" : "#64748b"} />
          <span style={{ fontFamily:"'JetBrains Mono',monospace", fontWeight:600, fontSize:"16px", color: danger ? "#ef4444" : "#f1f5f9", letterSpacing:"0.04em" }}>{fmt(timeLeft)}</span>
        </div>
      </div>

      {/* Progress */}
      <div style={{ marginBottom:"20px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"6px" }}>
          <span style={{ fontSize:"12px", color:"#475569", fontWeight:500 }}>Question {curr+1} of {total}</span>
          <span style={{ fontSize:"12px", color:"#f97316", fontWeight:700 }}>{answered} answered</span>
        </div>
        <div style={{ height:"4px", background:"#1e293b", borderRadius:"99px", overflow:"hidden" }}>
          <div style={{ height:"100%", width:`${progress}%`, background:"linear-gradient(90deg,#f97316,#f59e0b)", borderRadius:"99px", transition:"width 0.4s ease" }} />
        </div>
        {/* Dot nav */}
        <div style={{ display:"flex", gap:"4px", marginTop:"10px", flexWrap:"wrap" }}>
          {questions.map((_,i) => (
            <div key={i} onClick={() => { setDir(i>curr?"r":"l"); setCurr(i); }}
              style={{ width:"24px", height:"6px", borderRadius:"99px", cursor:"pointer", transition:"all 0.25s",
                background: i===curr ? "#f97316"
                           : answers[i] === questions[i]?.correctAnswer ? "#10b981"
                           : answers[i] ? "#ef4444"
                           : "#1e293b",
                boxShadow: i===curr ? "0 0 6px #f9731688" : "none",
              }} />
          ))}
        </div>
      </div>

      {/* Question card */}
      <div key={curr} className={dir==="r" ? "slide-r" : "slide-l"} style={{ background:"#0f172a", border:`1px solid ${isRev ? (chosen===correct ? "#10b98133" : "#ef444433") : "#1e293b"}`, borderRadius:"20px", padding:"28px 28px 22px", marginBottom:"14px", transition:"border-color 0.3s" }}>

        {/* Q number chip */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"18px" }}>
          <div style={{ padding:"4px 12px", background:"#f9731615", border:"1px solid #f9731633", borderRadius:"999px", fontSize:"11px", fontWeight:700, color:"#f97316", fontFamily:"'JetBrains Mono',monospace" }}>Q{String(curr+1).padStart(2,"0")}</div>
          {isRev && (
            <div style={{ display:"flex", alignItems:"center", gap:"6px", fontSize:"12px", fontWeight:700, color: chosen===correct ? "#10b981" : "#ef4444", animation:"popIn 0.35s ease both" }}>
              {chosen===correct ? <CheckCircle2 size={15} /> : <XCircle size={15} />}
              {chosen===correct ? "Correct!" : "Incorrect"}
            </div>
          )}
        </div>

        <p style={{ fontSize:"17px", fontWeight:600, color:"#f1f5f9", lineHeight:1.6, marginBottom:"24px", letterSpacing:"-0.01em" }}>
          {question.question}
        </p>

        {/* Options */}
        <div>
          {question.options.map((opt, i) => (
            <button key={i} className="opt-btn" onClick={() => pick(opt)} disabled={!!isRev} style={optStyle(opt)}>
              <span style={labelStyle(opt)}>{OPT_LABELS[i]}</span>
              <span style={{ flex:1, lineHeight:1.5 }}>{opt}</span>
              {isRev && opt===correct && <CheckCircle2 size={16} color="#10b981" style={{ flexShrink:0 }} />}
              {isRev && opt===chosen && opt!==correct && <XCircle size={16} color="#ef4444" style={{ flexShrink:0 }} />}
            </button>
          ))}
        </div>

        {/* Explanation strip */}
        {isRev && chosen !== correct && (
          <div style={{ marginTop:"10px", padding:"12px 14px", background:"#10b98110", border:"1px solid #10b98133", borderRadius:"11px", display:"flex", alignItems:"flex-start", gap:"9px" }}>
            <CheckCircle2 size={14} color="#10b981" style={{ marginTop:"2px", flexShrink:0 }} />
            <span style={{ fontSize:"13px", color:"#94a3b8", lineHeight:1.55 }}>
              <strong style={{ color:"#10b981" }}>Correct answer:</strong> {correct}
            </span>
          </div>
        )}
      </div>

      {/* Nav */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <button onClick={goPrev} disabled={curr===0} className="nav-btn" style={{ display:"flex", alignItems:"center", gap:"7px", padding:"12px 18px", borderRadius:"11px", background:"transparent", border:"1.5px solid #1e293b", color:"#64748b", fontSize:"13px", fontWeight:600, fontFamily:"'Outfit',sans-serif" }}>
          <ChevronLeft size={15} /> Prev
        </button>

        <div style={{ display:"flex", gap:"8px" }}>
          {!isRev && (
            <button onClick={skip} className="nav-btn" style={{ padding:"12px 18px", borderRadius:"11px", background:"transparent", border:"1.5px solid #1e293b", color:"#475569", fontSize:"13px", fontWeight:600, fontFamily:"'Outfit',sans-serif" }}>
              Skip
            </button>
          )}
          {curr < total-1 ? (
            <button onClick={goNext} className="nav-btn" style={{ display:"flex", alignItems:"center", gap:"7px", padding:"12px 22px", borderRadius:"11px", background:"linear-gradient(135deg,#f97316,#f59e0b)", border:"none", color:"#0a0f1e", fontSize:"13px", fontWeight:800, fontFamily:"'Outfit',sans-serif" }}>
              Next <ChevronRight size={15} />
            </button>
          ) : (
            <button onClick={() => { clearInterval(timerRef.current); onFinish(answers, timeLeft); }} className="nav-btn" style={{ display:"flex", alignItems:"center", gap:"7px", padding:"12px 22px", borderRadius:"11px", background:"linear-gradient(135deg,#10b981,#059669)", border:"none", color:"white", fontSize:"13px", fontWeight:800, fontFamily:"'Outfit',sans-serif" }}>
              <Flag size={15} /> Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── RESULT SCREEN ────────────────────────────────────────────────────────────
const ResultScreen = ({ questions, answers, timeLeft, totalTime, difficulty, topic, company, onRetry, onNew }) => {
  const total   = questions.length;
  const correct = questions.filter((q,i) => answers[i] === q.correctAnswer).length;
  const wrong   = Object.keys(answers).filter(i => answers[i] && answers[i] !== questions[i]?.correctAnswer).length;
  const skipped = total - Object.keys(answers).length;
  const score   = pct(correct, total);
  const timeTaken = totalTime - timeLeft;

  const grade = score>=85 ? ["Excellent","#f59e0b","🏆"]
              : score>=70 ? ["Good","#34d399","⭐"]
              : score>=50 ? ["Average","#60a5fa","📘"]
              : ["Needs Work","#ef4444","📖"];

  const [showAll, setShowAll] = useState(false);

  return (
    <div style={{ maxWidth:"780px", margin:"0 auto", width:"100%", animation:"fadeUp 0.5s ease both" }}>

      {/* Score hero */}
      <div style={{ background:"#0f172a", border:`1px solid ${grade[1]}33`, borderRadius:"24px", padding:"36px", textAlign:"center", marginBottom:"16px", boxShadow:`0 0 40px ${grade[1]}12` }}>
        <div style={{ fontSize:"48px", marginBottom:"12px", animation:"float 2.5s ease-in-out infinite" }}>{grade[2]}</div>
        <h2 style={{ fontFamily:"'Outfit',sans-serif", fontSize:"28px", fontWeight:900, color:"#f8fafc", letterSpacing:"-0.03em", marginBottom:"6px" }}>{grade[0]}</h2>
        <p style={{ color:"#475569", fontSize:"14px", marginBottom:"28px" }}>{company} · {topic} · <span style={{ color:DIFF_COLOR[difficulty], fontWeight:700 }}>{difficulty}</span></p>

        {/* Score ring */}
        <div style={{ position:"relative", width:"140px", height:"140px", margin:"0 auto 28px" }}>
          <svg width="140" height="140" style={{ transform:"rotate(-90deg)" }}>
            <circle cx="70" cy="70" r="58" fill="none" stroke="#1e293b" strokeWidth="10" />
            <circle cx="70" cy="70" r="58" fill="none" stroke={grade[1]} strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={`${2*Math.PI*58}`}
              strokeDashoffset={`${2*Math.PI*58*(1-score/100)}`}
              style={{ transition:"stroke-dashoffset 1.2s cubic-bezier(.4,0,.2,1)" }}
            />
          </svg>
          <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
            <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:"34px", fontWeight:900, color:"#f8fafc", lineHeight:1, animation:"countIn 0.7s ease both" }}>{score}%</span>
            <span style={{ fontSize:"12px", color:"#475569" }}>{correct}/{total} correct</span>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"10px" }}>
          {[
            ["Correct",correct,"#10b981"],
            ["Wrong",wrong,"#ef4444"],
            ["Skipped",skipped,"#64748b"],
            ["Time",fmt(timeTaken),"#f97316"],
          ].map(([l,v,c]) => (
            <div key={l} style={{ background:"#0a0f1e", borderRadius:"12px", padding:"14px 10px", border:"1px solid #1e293b" }}>
              <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:"22px", fontWeight:900, color:c, marginBottom:"3px" }}>{v}</div>
              <div style={{ fontSize:"11px", color:"#334155", fontWeight:500 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance bar */}
      <div style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:"16px", padding:"20px 24px", marginBottom:"16px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"10px" }}>
          <span style={{ fontSize:"13px", fontWeight:600, color:"#94a3b8" }}>Score breakdown</span>
          <span style={{ fontSize:"13px", fontWeight:700, color:grade[1] }}>{score}%</span>
        </div>
        <div style={{ height:"8px", background:"#1e293b", borderRadius:"99px", overflow:"hidden", marginBottom:"10px" }}>
          <div style={{ height:"100%", width:`${score}%`, background:`linear-gradient(90deg,${grade[1]},${grade[1]}88)`, borderRadius:"99px", animation:"progressFill 1.2s ease both" }} />
        </div>
        <div style={{ display:"flex", justifyContent:"space-between" }}>
          <span style={{ fontSize:"12px", color:"#10b981" }}>{correct} correct ({pct(correct,total)}%)</span>
          <span style={{ fontSize:"12px", color:"#ef4444" }}>{wrong} wrong ({pct(wrong,total)}%)</span>
        </div>
      </div>

      {/* Answer review */}
      <div style={{ background:"#0f172a", border:"1px solid #1e293b", borderRadius:"16px", padding:"20px 24px", marginBottom:"16px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"16px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
            <BarChart2 size={16} color="#f97316" />
            <span style={{ fontSize:"14px", fontWeight:700, color:"#f1f5f9" }}>Answer Review</span>
          </div>
          <button onClick={() => setShowAll(v=>!v)} style={{ fontSize:"12px", color:"#f97316", fontWeight:600, background:"transparent", border:"none", cursor:"pointer", fontFamily:"'Outfit',sans-serif" }}>
            {showAll ? "Show less" : "Show all"}
          </button>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
          {questions.slice(0, showAll ? total : 5).map((q, i) => {
            const ans = answers[i];
            const isC = ans === q.correctAnswer;
            const isS = !ans;
            return (
              <div key={i} style={{ padding:"13px 15px", borderRadius:"12px", background:"#0a0f1e", border:`1px solid ${isC ? "#10b98133" : isS ? "#1e293b" : "#ef444433"}`, display:"flex", gap:"12px", alignItems:"flex-start" }}>
                <div style={{ width:"26px", height:"26px", borderRadius:"7px", background: isC ? "#10b98120" : isS ? "#1e293b" : "#ef444420", border:`1px solid ${isC ? "#10b981" : isS ? "#334155" : "#ef4444"}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:"2px" }}>
                  {isC ? <CheckCircle2 size={14} color="#10b981" /> : isS ? <AlertCircle size={14} color="#475569" /> : <XCircle size={14} color="#ef4444" />}
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:"13px", fontWeight:600, color:"#94a3b8", marginBottom:"4px", lineHeight:1.5 }}>{q.question}</div>
                  {ans && <div style={{ fontSize:"12px", color: isC ? "#10b981" : "#ef4444" }}>Your answer: {ans}</div>}
                  {!isC && <div style={{ fontSize:"12px", color:"#10b981", marginTop:"2px" }}>Correct: {q.correctAnswer}</div>}
                </div>
                <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"11px", color:"#334155", flexShrink:0 }}>Q{String(i+1).padStart(2,"0")}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div style={{ display:"flex", gap:"10px", flexWrap:"wrap" }}>
        <button onClick={onRetry} className="gen-btn" style={{ flex:1, padding:"14px", borderRadius:"13px", background:"linear-gradient(135deg,#f97316,#f59e0b)", border:"none", color:"#0a0f1e", fontSize:"14px", fontWeight:800, fontFamily:"'Outfit',sans-serif", display:"flex", alignItems:"center", justifyContent:"center", gap:"8px" }}>
          <RotateCcw size={16} /> Retry Same Quiz
        </button>
        <button onClick={onNew} className="gen-btn" style={{ flex:1, padding:"14px", borderRadius:"13px", background:"transparent", border:"1.5px solid #1e293b", color:"#94a3b8", fontSize:"14px", fontWeight:700, fontFamily:"'Outfit',sans-serif", display:"flex", alignItems:"center", justifyContent:"center", gap:"8px" }}>
          <Sparkles size={16} /> New Quiz
        </button>
      </div>
    </div>
  );
};

// ─── ROOT COMPONENT ───────────────────────────────────────────────────────────
const AiQuiz = () => {
  const [topic, setTopic]         = useState("DBMS");
  const [company, setCompany]     = useState("TCS");
  const [difficulty, setDiff]     = useState("Medium");
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");
  const [questions, setQuestions] = useState(null);
  const [answers, setAnswers]     = useState(null);
  const [timeLeft, setTimeLeft]   = useState(0);
  const [screen, setScreen]       = useState("config"); // config | quiz | result

  const generate = async () => {
    setLoading(true); setError("");
    try {
      const prompt = `Generate exactly 20 multiple choice questions.\nTopic: ${topic}\nCompany: ${company}\nDifficulty: ${difficulty}\nReturn valid JSON only.\n{"questions":[{"question":"","options":["","","",""],"correctAnswer":""}]}\nDo not add explanation. Do not add markdown.`;
      const res = await axios.post("http://localhost:5001/ai", { prompt });
      const raw = res?.data?.answer || "";
      const cleaned = raw.replace(/```json|```/g,"").trim();
      const parsed  = JSON.parse(cleaned);
      if (!parsed.questions?.length) throw new Error("No questions");
      setQuestions(parsed.questions);
      setScreen("quiz");
    } catch (err) {
      setError("Failed to generate quiz. Check your server or try again.");
      console.error(err);
    } finally {
      setLoading(false); }
  };

  const handleFinish = (ans, tl) => {
    setAnswers(ans);
    setTimeLeft(tl);
    setScreen("result");
  };

  const handleRetry = () => {
    setAnswers(null);
    setScreen("quiz");
  };

  const handleNew = () => {
    setQuestions(null); setAnswers(null);
    setScreen("config");
  };

  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(145deg,#060a14 0%,#0a0f1e 50%,#060a14 100%)", padding:"32px 16px 60px", fontFamily:"'Outfit',sans-serif" }}>
      <style>{CSS}</style>

      {/* Top nav bar */}
      <div style={{ maxWidth:"780px", margin:"0 auto 36px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
          <div style={{ width:"36px", height:"36px", borderRadius:"10px", background:"linear-gradient(135deg,#f97316,#f59e0b)", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <Sparkles size={16} color="white" />
          </div>
          <span style={{ fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:"16px", color:"#f8fafc", letterSpacing:"-0.02em" }}>AI Quiz</span>
        </div>
        {screen !== "config" && (
          <button onClick={handleNew} style={{ display:"flex", alignItems:"center", gap:"6px", padding:"8px 14px", borderRadius:"10px", background:"transparent", border:"1px solid #1e293b", color:"#64748b", fontSize:"12px", fontWeight:600, fontFamily:"'Outfit',sans-serif", cursor:"pointer", transition:"border-color 0.2s, color 0.2s" }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor="#f97316";e.currentTarget.style.color="#f97316";}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor="#1e293b";e.currentTarget.style.color="#64748b";}}>
            <RotateCcw size={12} /> New Quiz
          </button>
        )}
      </div>

      {/* Error */}
      {error && (
        <div style={{ maxWidth:"680px", margin:"0 auto 20px", padding:"14px 18px", background:"#ef444415", border:"1px solid #ef444433", borderRadius:"12px", display:"flex", alignItems:"center", gap:"10px" }}>
          <AlertCircle size={16} color="#ef4444" />
          <span style={{ fontSize:"13px", color:"#fca5a5", fontWeight:500 }}>{error}</span>
        </div>
      )}

      {/* Screens */}
      {screen === "config" && (
        <ConfigScreen topic={topic} setTopic={setTopic} company={company} setCompany={setCompany} difficulty={difficulty} setDifficulty={setDiff} onGenerate={generate} loading={loading} />
      )}
      {screen === "quiz" && questions && (
        <QuizScreen questions={questions} difficulty={difficulty} topic={topic} company={company} onFinish={handleFinish} />
      )}
      {screen === "result" && questions && answers !== null && (
        <ResultScreen questions={questions} answers={answers} timeLeft={timeLeft} totalTime={DIFF_TIME[difficulty]} difficulty={difficulty} topic={topic} company={company} onRetry={handleRetry} onNew={handleNew} />
      )}
    </div>
  );
};

export default AiQuiz;