import { useState, useRef, useEffect } from "react";
import axios from "axios";
import Tesseract from "tesseract.js";
import {
  Bot,
  User,
  Send,
  Sparkles,
  Loader2,
  ImageIcon,
  MessageSquare,
  Upload,
  Zap,
  ChevronRight,
  X,
} from "lucide-react";

// ─── Shared styles ────────────────────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body, #root { height: 100%; }

  :root {
    --bg:        #07090f;
    --surface:   #0e1320;
    --elevated:  #151c2e;
    --border:    rgba(255,255,255,0.07);
    --border-hi: rgba(129,140,248,0.35);
    --indigo:    #818cf8;
    --cyan:      #22d3ee;
    --amber:     #fbbf24;
    --text:      #e2e8f0;
    --muted:     #64748b;
    --danger:    #f87171;
  }

  .hub-root {
    font-family: 'Inter', sans-serif;
    background: var(--bg);
    color: var(--text);
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  /* ── Header ── */
  .hub-header {
    background: var(--surface);
    border-bottom: 1px solid var(--border);
    padding: 0 28px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    flex-shrink: 0;
    height: 68px;
  }

  .hub-brand {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .hub-logo {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    background: linear-gradient(135deg, var(--indigo), var(--cyan));
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .hub-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 18px;
    font-weight: 700;
    color: #fff;
    letter-spacing: -0.3px;
  }

  .hub-subtitle {
    font-size: 11px;
    color: var(--muted);
    letter-spacing: 0.5px;
    text-transform: uppercase;
    margin-top: 1px;
  }

  /* ── Tab switcher ── */
  .tab-rail {
    display: flex;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 4px;
    gap: 4px;
  }

  .tab-btn {
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 8px 18px;
    border-radius: 9px;
    border: none;
    background: transparent;
    color: var(--muted);
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;
  }

  .tab-btn:hover { color: var(--text); }

  .tab-btn.active {
    background: var(--elevated);
    color: #fff;
    box-shadow: 0 1px 8px rgba(0,0,0,0.4);
    border: 1px solid var(--border-hi);
  }

  .tab-btn.active svg { color: var(--indigo); }

  /* ── Status pill ── */
  .status-pill {
    display: flex;
    align-items: center;
    gap: 6px;
    background: rgba(34,211,238,0.08);
    border: 1px solid rgba(34,211,238,0.2);
    padding: 6px 14px;
    border-radius: 20px;
    font-size: 12px;
    color: var(--cyan);
    white-space: nowrap;
  }

  .status-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--cyan);
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }

  /* ── CHAT TAB ── */
  .chat-wrap {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 28px 0;
    scrollbar-width: thin;
    scrollbar-color: var(--elevated) transparent;
  }

  .chat-messages::-webkit-scrollbar { width: 4px; }
  .chat-messages::-webkit-scrollbar-track { background: transparent; }
  .chat-messages::-webkit-scrollbar-thumb { background: var(--elevated); border-radius: 2px; }

  .msg-row {
    display: flex;
    padding: 0 24px;
    margin-bottom: 20px;
  }

  .msg-row.user { justify-content: flex-end; }
  .msg-row.assistant { justify-content: flex-start; }

  .msg-inner {
    display: flex;
    gap: 12px;
    max-width: min(680px, 88%);
  }

  .msg-row.user .msg-inner { flex-direction: row-reverse; }

  .avatar {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .avatar.ai {
    background: var(--elevated);
    border: 1px solid var(--border-hi);
  }

  .avatar.user {
    background: linear-gradient(135deg, var(--indigo), var(--cyan));
  }

  .bubble {
    padding: 13px 17px;
    border-radius: 16px;
    font-size: 14px;
    line-height: 1.7;
    white-space: pre-wrap;
  }

  .bubble.ai {
    background: var(--surface);
    border: 1px solid var(--border);
    color: var(--text);
    border-top-left-radius: 4px;
  }

  .bubble.user {
    background: linear-gradient(135deg, #4f46e5, #0ea5e9);
    color: #fff;
    border-top-right-radius: 4px;
  }

  /* typing indicator */
  .typing-dots {
    display: flex;
    gap: 4px;
    align-items: center;
    padding: 4px 0;
  }
  .typing-dots span {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--muted);
    animation: dot-bounce 1.2s infinite;
  }
  .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
  .typing-dots span:nth-child(3) { animation-delay: 0.4s; }
  @keyframes dot-bounce {
    0%, 80%, 100% { transform: scale(0.7); opacity: 0.5; }
    40% { transform: scale(1); opacity: 1; }
  }

  /* suggestions */
  .suggestions {
    padding: 0 24px 12px;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .suggestion-chip {
    padding: 7px 14px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 20px;
    font-size: 12px;
    color: var(--text);
    cursor: pointer;
    transition: all 0.18s;
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .suggestion-chip:hover {
    border-color: var(--indigo);
    color: var(--indigo);
    background: rgba(129,140,248,0.06);
  }

  /* input row */
  .input-bar {
    padding: 16px 24px 20px;
    border-top: 1px solid var(--border);
    background: var(--bg);
    flex-shrink: 0;
  }

  .input-inner {
    display: flex;
    align-items: center;
    gap: 10px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 8px 8px 8px 16px;
    transition: border-color 0.2s;
  }

  .input-inner:focus-within { border-color: var(--border-hi); }

  .input-inner input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    color: var(--text);
  }

  .input-inner input::placeholder { color: var(--muted); }

  .send-btn {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background: linear-gradient(135deg, var(--indigo), var(--cyan));
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    flex-shrink: 0;
    transition: opacity 0.2s, transform 0.15s;
  }

  .send-btn:hover:not(:disabled) { transform: scale(1.06); }
  .send-btn:disabled { opacity: 0.5; cursor: not-allowed; }

  .input-hint {
    text-align: center;
    font-size: 11px;
    color: var(--muted);
    margin-top: 10px;
  }

  /* ── IMAGE SOLVER TAB ── */
  .solver-wrap {
    flex: 1;
    overflow-y: auto;
    padding: 28px 24px;
    scrollbar-width: thin;
    scrollbar-color: var(--elevated) transparent;
  }

  .solver-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    max-width: 1100px;
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    .solver-grid { grid-template-columns: 1fr; }
  }

  .card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 24px;
  }

  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 18px;
  }

  .card-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 16px;
    font-weight: 600;
    color: #fff;
  }

  .badge {
    font-size: 11px;
    font-weight: 600;
    padding: 4px 10px;
    border-radius: 20px;
    letter-spacing: 0.3px;
  }

  .badge-indigo {
    background: rgba(129,140,248,0.12);
    color: var(--indigo);
    border: 1px solid rgba(129,140,248,0.25);
  }

  .badge-cyan {
    background: rgba(34,211,238,0.1);
    color: var(--cyan);
    border: 1px solid rgba(34,211,238,0.2);
  }

  .badge-green {
    background: rgba(52,211,153,0.1);
    color: #34d399;
    border: 1px solid rgba(52,211,153,0.2);
  }

  /* upload zone */
  .upload-zone {
    border: 2px dashed var(--border);
    border-radius: 14px;
    height: 220px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
    position: relative;
    overflow: hidden;
  }

  .upload-zone:hover {
    border-color: var(--indigo);
    background: rgba(129,140,248,0.04);
  }

  .upload-zone.has-image { border-style: solid; border-color: var(--border-hi); }

  .upload-zone img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 12px;
  }

  .upload-zone input { display: none; }

  .upload-icon-ring {
    width: 56px;
    height: 56px;
    border-radius: 16px;
    background: var(--elevated);
    border: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 14px;
    color: var(--muted);
  }

  .upload-label {
    font-size: 14px;
    font-weight: 500;
    color: var(--text);
    margin-bottom: 4px;
  }

  .upload-hint { font-size: 12px; color: var(--muted); }

  .clear-img {
    position: absolute;
    top: 8px; right: 8px;
    width: 28px; height: 28px;
    border-radius: 8px;
    background: rgba(0,0,0,0.6);
    border: 1px solid var(--border);
    color: #fff;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    transition: background 0.15s;
  }

  .clear-img:hover { background: rgba(248,113,113,0.3); }

  /* solve button */
  .solve-btn {
    margin-top: 18px;
    width: 100%;
    padding: 13px;
    border-radius: 12px;
    background: linear-gradient(135deg, #4f46e5, #0ea5e9);
    border: none;
    color: #fff;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: opacity 0.2s, transform 0.15s;
  }

  .solve-btn:hover:not(:disabled) { transform: translateY(-1px); opacity: 0.92; }
  .solve-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

  /* progress */
  .progress-bar {
    margin-top: 16px;
    background: var(--elevated);
    border-radius: 99px;
    height: 4px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    border-radius: 99px;
    background: linear-gradient(90deg, var(--indigo), var(--cyan));
    animation: progress-shimmer 1.5s infinite;
    width: 100%;
  }

  @keyframes progress-shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }

  /* extracted text area */
  .extracted-textarea {
    width: 100%;
    background: var(--elevated);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 14px;
    color: var(--text);
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    line-height: 1.7;
    resize: vertical;
    outline: none;
    min-height: 140px;
    transition: border-color 0.2s;
  }

  .extracted-textarea:focus { border-color: var(--border-hi); }
  .extracted-textarea::placeholder { color: var(--muted); }

  /* answer box */
  .answer-box {
    background: var(--elevated);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 18px;
    min-height: 220px;
    font-size: 14px;
    line-height: 1.8;
    color: var(--text);
    white-space: pre-wrap;
  }

  .answer-empty {
    height: 100%;
    min-height: 186px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
    color: var(--muted);
    font-size: 13px;
  }

  .thinking-row {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 14px;
    padding: 12px 14px;
    background: var(--elevated);
    border-radius: 12px;
    border: 1px solid var(--border);
  }

  .spinner {
    width: 22px; height: 22px;
    border: 2px solid var(--border);
    border-top-color: var(--indigo);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    flex-shrink: 0;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  .thinking-text { font-size: 13px; color: var(--text); }
  .thinking-sub { font-size: 11px; color: var(--muted); margin-top: 2px; }
`;

// ─── SUGGESTIONS ─────────────────────────────────────────────────────────────
const SUGGESTIONS = [
  "React roadmap",
  "MERN interview questions",
  "Explain JS promises",
  "DSA roadmap",
  "Generate React MCQs",
  "Node.js prep tips",
];

// ─── CHAT PANEL ──────────────────────────────────────────────────────────────
function ChatPanel() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "👋 Hi! I'm your AI Learning Assistant. Ask me anything about React, MERN, DSA, placements, or interviews.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text) => {
    const msg = (text || input).trim();
    if (!msg || loading) return;

    setMessages((p) => [...p, { role: "user", content: msg }]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5001/ai", { prompt: msg });
      const reply =
        response?.data?.answer ||
        response?.data?.response ||
        response?.data?.message ||
        "No response received.";
      setMessages((p) => [...p, { role: "assistant", content: reply }]);
    } catch {
      setMessages((p) => [
        ...p,
        { role: "assistant", content: "❌ Unable to connect to AI server." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-wrap">
      <div className="chat-messages">
        {messages.map((m, i) => (
          <div key={i} className={`msg-row ${m.role}`}>
            <div className="msg-inner">
              <div className={`avatar ${m.role === "user" ? "user" : "ai"}`}>
                {m.role === "user" ? <User size={15} /> : <Bot size={15} />}
              </div>
              <div className={`bubble ${m.role === "user" ? "user" : "ai"}`}>
                {m.content}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="msg-row assistant">
            <div className="msg-inner">
              <div className="avatar ai">
                <Bot size={15} />
              </div>
              <div className="bubble ai">
                <div className="typing-dots">
                  <span /><span /><span />
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="suggestions">
        {SUGGESTIONS.map((s, i) => (
          <button key={i} className="suggestion-chip" onClick={() => sendMessage(s)}>
            <ChevronRight size={11} />
            {s}
          </button>
        ))}
      </div>

      <div className="input-bar">
        <div className="input-inner">
          <input
            type="text"
            value={input}
            placeholder="Ask anything about React, DSA, interviews…"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button className="send-btn" onClick={() => sendMessage()} disabled={loading}>
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
          </button>
        </div>
        <p className="input-hint">AI responses can occasionally be inaccurate. Verify important information.</p>
      </div>
    </div>
  );
}

// ─── IMAGE SOLVER PANEL ───────────────────────────────────────────────────────
function ImageSolverPanel() {
  const [image, setImage] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [ocrLoading, setOcrLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  const loading = ocrLoading || aiLoading;

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setAnswer("");
    setQuestion("");
  };

  const clearImage = () => {
    setImage(null);
    setQuestion("");
    setAnswer("");
  };

  const askBackend = async (text) => {
    try {
      setAiLoading(true);
      const res = await axios.post("http://localhost:5001/answer", { question: text });
      setAnswer(res.data.answer);
    } catch (err) {
      console.log(err);
      setAnswer("❌ Unable to connect to AI server.");
    } finally {
      setAiLoading(false);
    }
  };

  const solve = async () => {
    if (!image || loading) return;
    try {
      setOcrLoading(true);
      const result = await Tesseract.recognize(image, "eng", {
        logger: (m) => console.log(m),
      });
      const extracted = result.data.text;
      setQuestion(extracted);
      setOcrLoading(false);
      await askBackend(extracted);
    } catch (err) {
      console.log(err);
      setOcrLoading(false);
    }
  };

  return (
    <div className="solver-wrap">
      <div className="solver-grid">
        {/* LEFT — upload */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Upload Question</span>
            <span className="badge badge-indigo">Vision AI</span>
          </div>

          <label className={`upload-zone ${image ? "has-image" : ""}`}>
            {image ? (
              <>
                <img src={URL.createObjectURL(image)} alt="question" />
                <button
                  className="clear-img"
                  onClick={(e) => { e.preventDefault(); clearImage(); }}
                >
                  <X size={12} />
                </button>
              </>
            ) : (
              <>
                <div className="upload-icon-ring">
                  <Upload size={22} />
                </div>
                <p className="upload-label">Click to upload image</p>
                <p className="upload-hint">PNG, JPG, JPEG supported</p>
              </>
            )}
            <input type="file" accept="image/*" onChange={handleImage} />
          </label>

          <button className="solve-btn" onClick={solve} disabled={!image || loading}>
            {ocrLoading ? (
              <>
                <Loader2 size={16} style={{ animation: "spin 0.8s linear infinite" }} />
                Extracting Text…
              </>
            ) : aiLoading ? (
              <>
                <Loader2 size={16} style={{ animation: "spin 0.8s linear infinite" }} />
                AI Thinking…
              </>
            ) : (
              <>
                <Zap size={16} />
                Solve with AI
              </>
            )}
          </button>

          {ocrLoading && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 14, marginBottom: 6, fontSize: 12 }}>
                <span style={{ color: "var(--text)" }}>Extracting text from image…</span>
                <span style={{ color: "var(--cyan)" }}>OCR</span>
              </div>
              <div className="progress-bar"><div className="progress-fill" /></div>
            </div>
          )}
        </div>

        {/* RIGHT — extracted + answer */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div className="card">
            <div className="card-header">
              <span className="card-title">Question Context</span>
              <span className="badge badge-cyan">Editable</span>
            </div>
            <textarea
              className="extracted-textarea"
              rows={5}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Optional: add context or edit extracted text to guide the AI…"
            />
          </div>

          <div className="card">
            <div className="card-header">
              <span className="card-title">AI Answer</span>
              <span className="badge badge-green">Claude Sonnet</span>
            </div>

            {aiLoading ? (
              <div className="thinking-row">
                <div className="spinner" />
                <div>
                  <div className="thinking-text">AI is Thinking…</div>
                  <div className="thinking-sub">Analysing the question and generating an answer</div>
                </div>
              </div>
            ) : answer ? (
              <div className="answer-box">{answer}</div>
            ) : (
              <div className="answer-box">
                <div className="answer-empty">
                  <ImageIcon size={28} style={{ color: "var(--border-hi)" }} />
                  <span>Upload a question image and click "Solve with AI"</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function AILearningHub() {
  const [tab, setTab] = useState("chat");

  return (
    <>
      <style>{styles}</style>
      <div className="hub-root">
        {/* Header */}
        <header className="hub-header">
          <div className="hub-brand">
            <div className="hub-logo">
              <Sparkles size={20} color="#fff" />
            </div>
            <div>
              <div className="hub-title">AI Learning Hub</div>
              <div className="hub-subtitle">Powered by ZotAi</div>
            </div>
          </div>

          <div className="tab-rail">
            <button
              className={`tab-btn ${tab === "chat" ? "active" : ""}`}
              onClick={() => setTab("chat")}
            >
              <MessageSquare size={14} />
              Chat Assistant
            </button>
            <button
              className={`tab-btn ${tab === "solver" ? "active" : ""}`}
              onClick={() => setTab("solver")}
            >
              <ImageIcon size={14} />
              Image Solver
            </button>
          </div>

          <div className="status-pill" style={{ display: "none" }}>
            <div className="status-dot" />
            Online
          </div>
          <div className="status-pill">
            <div className="status-dot" />
            Online
          </div>
        </header>

        {/* Panel */}
        {tab === "chat" ? <ChatPanel /> : <ImageSolverPanel />}
      </div>
    </>
  );
}