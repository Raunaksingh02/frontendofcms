import React, { useState } from "react";
import axios from "axios";

const API_URL = "https://cppcompiler-5r57.onrender.com/compilecpp";

const HEADER = "#include<iostream>\n#include<climits>\n#include <vector>\n#include <unordered_map>\nusing namespace std;\n\n";

const QUESTIONS = [
  {
    id: "two-sum",
    number: "01",
    title: "Two Sum",
    tagline: "Arrays & Hashing",
    difficulty: "Easy",
    description:
      "Given a list of integers and a target value, return the indices of the two numbers that add up to the target. Assume exactly one valid pair exists, and you can't use the same element twice.",
    constraints: ["2 <= n <= 1000", "Exactly one valid pair exists", "Return the two indices separated by a space"],
    visibleCases: [
      { input: "4\n2 7 11 15\n9", output: "0 1" },
      { input: "3\n3 2 4\n6", output: "1 2" }
    ],
    hiddenCases: [{ input: "2\n3 3\n6", output: "0 1" }],
    prefix: HEADER,
    stub: `vector<int> twoSum(vector<int>& nums, int target) {
    // TODO: return the indices of the two numbers that add up to target

}`,
    suffix: `int main() {
    int n;
    cin >> n;
    vector<int> nums(n);
    for (int i = 0; i < n; i++) cin >> nums[i];
    int target;
    cin >> target;

    vector<int> result = twoSum(nums, target);
    for (size_t i = 0; i < result.size(); i++) {
        cout << result[i];
        if (i + 1 != result.size()) cout << " ";
    }
    cout << endl;

    return 0;
}
`
  },
  {
    id: "reverse-integer",
    number: "02",
    title: "Reverse Integer",
    tagline: "Math",
    difficulty: "Medium",
    description:
      "Given a 32-bit signed integer, return it with its digits reversed, keeping the original sign. Leading zeros produced by the reversal simply disappear (e.g. reversing 120 gives 21).",
    constraints: ["-2^31 <= x <= 2^31 - 1", "Print only the resulting integer"],
    visibleCases: [
      { input: "123", output: "321" },
      { input: "-123", output: "-321" }
    ],
    hiddenCases: [{ input: "120", output: "21" }],
    prefix: HEADER,
    stub: `int reverseNumber(int x) {
    // TODO: reverse the digits of x, keeping its sign

}`,
    suffix: `int main() {
    int x;
    cin >> x;
    cout << reverseNumber(x) << endl;

    return 0;
}
`
  }
];

function Spinner() {
  return (
    <svg className="op-spin" width="14" height="14" viewBox="0 0 24 24" fill="none">
      <circle className="op-spin-track" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="op-spin-head" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  );
}

export default function LeetStyleCompiler() {
  const [qId, setQId] = useState(QUESTIONS[0].id);
  const question = QUESTIONS.find((q) => q.id === qId);

  const [stubCode, setStubCode] = useState(question.stub);
  const [input, setInput] = useState(question.visibleCases[0].input);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [consoleTab, setConsoleTab] = useState("testcase");
  const [verdict, setVerdict] = useState(null);
  const [solved, setSolved] = useState({});
  const [showFullCode, setShowFullCode] = useState(false);

  function fullCodeFor(q, stub) {
    return `${q.prefix}${stub}\n\n${q.suffix}`;
  }

  function selectQuestion(id) {
    const next = QUESTIONS.find((q) => q.id === id);
    setQId(id);
    setStubCode(next.stub);
    setInput(next.visibleCases[0].input);
    setOutput("");
    setVerdict(null);
    setConsoleTab("testcase");
    setShowFullCode(false);
  }

  const callCompiler = async (runInput) => {
    const compiledSource = fullCodeFor(question, stubCode);
    const { data } = await axios.post(API_URL, { code: compiledSource, input: runInput });
    return data;
  };

  const runCode = async () => {
    try {
      setLoading(true);
      setOutput("");
      setVerdict(null);
      setConsoleTab("testcase");
      const data = await callCompiler(input);
      setOutput(data.success ? data.output : data.message);
    } catch (err) {
      setOutput(err.response?.data?.message || err.message || "Server Error");
    } finally {
      setLoading(false);
    }
  };

  const submitCode = async () => {
    try {
      setLoading(true);
      setOutput("");
      setConsoleTab("result");
      setVerdict(null);

      const allCases = [...question.visibleCases, ...question.hiddenCases];
      const results = [];

      for (let i = 0; i < allCases.length; i++) {
        const tc = allCases[i];
        const data = await callCompiler(tc.input);
        const got = (data.success ? data.output : data.message || "").trim();
        const expected = tc.output.trim();
        results.push({
          hidden: i >= question.visibleCases.length,
          input: tc.input,
          expected,
          got,
          passed: got === expected
        });
        if (got !== expected) break;
      }

      const passed = results.every((r) => r.passed) && results.length === allCases.length;
      setVerdict({ status: passed ? "accepted" : "wrong", results });
      if (passed) setSolved((prev) => ({ ...prev, [question.id]: true }));
    } catch (err) {
      setVerdict({
        status: "error",
        results: [],
        message: err.response?.data?.message || err.message || "Server Error"
      });
    } finally {
      setLoading(false);
    }
  };

  const solvedCount = Object.keys(solved).length;

  return (
    <div className="op-shell">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

        .op-shell {
          --paper: #f6f5f1;
          --card: #ffffff;
          --ink: #12151c;
          --ink-soft: #4d5566;
          --navy-900: #0b1e3d;
          --navy-700: #17335e;
          --blue-500: #2f5fe0;
          --blue-050: #ecf1ff;
          --teal-600: #0f8f83;
          --teal-050: #e6f6f3;
          --amber-600: #b96a12;
          --amber-050: #fbf0e2;
          --rose-600: #c23b3b;
          --rose-050: #fdecec;
          --line: #dde2ea;
          --line-strong: #b9c2d0;
          --radius: 10px;

          background: var(--paper);
          background-image:
            linear-gradient(var(--line) 1px, transparent 1px),
            linear-gradient(90deg, var(--line) 1px, transparent 1px);
          background-size: 28px 28px;
          background-position: -1px -1px;
          font-family: 'IBM Plex Sans', sans-serif;
          color: var(--ink);
          min-height: 100%;
          padding: 28px;
        }
        .op-mono { font-family: 'IBM Plex Mono', monospace; }
        .op-display { font-family: 'Space Grotesk', sans-serif; }
        .op-frame { max-width: 1280px; margin: 0 auto; }

        .op-titleblock {
          background: var(--navy-900);
          color: #eef2fb;
          border-radius: var(--radius);
          padding: 22px 26px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          position: relative;
          overflow: hidden;
          margin-bottom: 22px;
        }
        .op-titleblock::before {
          content: "";
          position: absolute; inset: 0;
          background-image: radial-gradient(circle, rgba(255,255,255,0.09) 1px, transparent 1px);
          background-size: 16px 16px;
          opacity: 0.5;
          pointer-events: none;
        }
        .op-tb-left { position: relative; z-index: 1; }
        .op-tb-eyebrow { font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: #8fb0ff; margin-bottom: 6px; }
        .op-tb-title { font-size: 26px; font-weight: 700; line-height: 1.15; }
        .op-tb-sub { font-size: 13px; color: #b7c3dd; margin-top: 6px; }
        .op-tb-meta { position: relative; z-index: 1; display: flex; gap: 22px; border-left: 1px solid rgba(255,255,255,0.18); padding-left: 22px; }
        .op-tb-meta-item { text-align: left; }
        .op-tb-meta-label { font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: #7f95c2; margin-bottom: 4px; }
        .op-tb-meta-value { font-size: 15px; font-weight: 600; color: #fff; }

        .op-layout { display: grid; grid-template-columns: 250px 1fr; gap: 22px; align-items: start; }
        @media (max-width: 960px) { .op-layout { grid-template-columns: 1fr; } }

        .op-index { background: var(--card); border: 1px solid var(--line); border-radius: var(--radius); padding: 14px; }
        .op-index-heading { font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--ink-soft); padding: 4px 8px 12px; display: flex; justify-content: space-between; }
        .op-index-row {
          width: 100%; text-align: left; display: flex; align-items: center; gap: 10px;
          padding: 10px 10px; border-radius: 8px; border: 1px solid transparent; background: transparent;
          cursor: pointer; margin-bottom: 4px; transition: background 0.15s ease, border-color 0.15s ease;
        }
        .op-index-row:hover { background: var(--blue-050); }
        .op-index-row.active { background: var(--blue-050); border: 1px solid var(--blue-500); position: relative; }
        .op-index-row.active::before, .op-index-row.active::after {
          content: ""; position: absolute; width: 8px; height: 8px; border-color: var(--blue-500); border-style: solid;
        }
        .op-index-row.active::before { top: -1px; left: -1px; border-width: 2px 0 0 2px; }
        .op-index-row.active::after { bottom: -1px; right: -1px; border-width: 0 2px 2px 0; }
        .op-index-num { font-size: 11px; font-weight: 600; color: var(--blue-500); min-width: 20px; }
        .op-index-title { font-size: 13.5px; font-weight: 500; color: var(--ink); flex: 1; }
        .op-index-tagline { font-size: 10.5px; color: var(--ink-soft); }
        .op-index-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--line-strong); flex-shrink: 0; }
        .op-index-dot.easy { background: var(--teal-600); }
        .op-index-dot.medium { background: var(--amber-600); }
        .op-index-dot.hard { background: var(--rose-600); }
        .op-index-check { color: var(--teal-600); font-size: 13px; }

        .op-card { background: var(--card); border: 1px solid var(--line); border-radius: var(--radius); padding: 26px 28px; }

        .op-problem-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; align-items: start; }
        @media (max-width: 1100px) { .op-problem-layout { grid-template-columns: 1fr; } }

        .op-diff-badge { display: inline-block; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 999px; margin-bottom: 10px; }
        .op-diff-badge.easy { background: var(--teal-050); color: var(--teal-600); }
        .op-diff-badge.medium { background: var(--amber-050); color: var(--amber-600); }
        .op-diff-badge.hard { background: var(--rose-050); color: var(--rose-600); }

        .op-topic-num { display: inline-block; font-size: 11px; letter-spacing: 0.1em; color: var(--blue-500); margin-bottom: 6px; margin-right: 10px; }
        .op-topic-title { font-size: 22px; font-weight: 700; color: var(--navy-900); }
        .op-topic-tagline { font-size: 13px; color: var(--ink-soft); margin-top: 4px; margin-bottom: 18px; font-style: italic; }
        .op-intro { font-size: 14px; line-height: 1.7; color: #262c38; margin-bottom: 20px; }

        .op-section-label { font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-soft); font-weight: 700; margin: 18px 0 10px; }

        .op-example { border: 1px solid var(--line); border-radius: 8px; padding: 12px 14px; margin-bottom: 10px; background: #fbfbfa; }
        .op-example-title { font-size: 11.5px; font-weight: 700; color: var(--navy-900); margin-bottom: 6px; }
        .op-example-row { display: flex; gap: 8px; font-family: 'IBM Plex Mono', monospace; font-size: 12.5px; color: #2c3340; margin-bottom: 3px; white-space: pre-wrap; }
        .op-example-label { color: var(--ink-soft); flex-shrink: 0; min-width: 62px; }

        .op-points { list-style: none; padding: 0; margin: 0; }
        .op-points li { display: flex; gap: 10px; font-size: 13px; line-height: 1.6; color: #29303c; padding: 5px 0; }
        .op-points li::before {
          content: ""; flex-shrink: 0; margin-top: 6px; width: 6px; height: 6px; background: var(--blue-500); border-radius: 1px; transform: rotate(45deg);
        }

        .op-editor { border: 1px solid var(--line); border-radius: 10px; overflow: hidden; background: #0d1420; }
        .op-editor-bar { display: flex; align-items: center; gap: 8px; padding: 9px 12px; background: #16202f; border-bottom: 1px solid #223047; }
        .op-dot { width: 9px; height: 9px; border-radius: 50%; }
        .op-editor-filename { margin-left: 8px; font-size: 11.5px; color: #8ea0c2; }
        .op-editor-hint { margin-left: auto; font-size: 10.5px; color: #5f7599; }
        .op-editor textarea {
          width: 100%; height: 260px; padding: 16px; background: #0d1420; color: #8ff0b0; border: none; outline: none;
          resize: none; font-family: 'IBM Plex Mono', monospace; font-size: 13px; line-height: 1.6;
        }

        .op-fullcode-toggle {
          margin-top: 8px; background: none; border: none; color: var(--blue-500); font-size: 12px; font-weight: 600;
          cursor: pointer; padding: 4px 0;
        }
        .op-fullcode-box {
          margin-top: 6px; border: 1px dashed var(--line-strong); border-radius: 8px; padding: 12px 14px;
          background: #f9fafb; font-family: 'IBM Plex Mono', monospace; font-size: 11.5px; color: #4a5266;
          white-space: pre-wrap; max-height: 220px; overflow-y: auto;
        }

        .op-run-row { display: flex; gap: 10px; margin-top: 12px; }
        .op-run-btn, .op-submit-btn2 {
          flex: 1; padding: 11px; border: none; border-radius: 8px; font-weight: 600; font-size: 13.5px; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .op-run-btn { background: #eef1f6; color: var(--navy-900); }
        .op-submit-btn2 { background: var(--blue-500); color: #fff; }
        .op-run-btn:disabled, .op-submit-btn2:disabled { opacity: 0.6; cursor: not-allowed; }

        .op-console-tabs { display: flex; gap: 18px; margin-top: 14px; border-bottom: 1px solid var(--line); }
        .op-console-tab {
          padding: 8px 2px; font-size: 12.5px; font-weight: 600; color: var(--ink-soft); background: none; border: none;
          border-bottom: 2px solid transparent; cursor: pointer; margin-bottom: -1px;
        }
        .op-console-tab.active { color: var(--navy-900); border-bottom-color: var(--blue-500); }

        .op-panel-label { font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; font-weight: 700; color: var(--ink-soft); margin: 14px 0 6px; }
        .op-input-box, .op-console {
          width: 100%; padding: 10px 12px; border: 1px solid var(--line); border-radius: 8px; outline: none; resize: none;
          font-family: 'IBM Plex Mono', monospace; font-size: 12.5px;
        }
        .op-input-box { height: 60px; background: #fff; color: var(--ink); }
        .op-console { height: 90px; background: #06090f; color: #7ee6a3; border-color: #1c2536; }

        .op-verdict-pill { display: inline-block; font-size: 12.5px; font-weight: 700; padding: 5px 12px; border-radius: 6px; margin-bottom: 12px; }
        .op-verdict-pill.accepted { background: var(--teal-050); color: var(--teal-600); }
        .op-verdict-pill.wrong { background: var(--rose-050); color: var(--rose-600); }
        .op-verdict-pill.error { background: var(--amber-050); color: var(--amber-600); }

        .op-case-card { border: 1px solid var(--line); border-radius: 8px; padding: 10px 12px; margin-bottom: 8px; font-size: 12px; }
        .op-case-card.pass { border-color: #bfe3dd; background: var(--teal-050); }
        .op-case-card.fail { border-color: #e2a3a3; background: var(--rose-050); }
        .op-case-title { font-weight: 700; margin-bottom: 4px; color: #29303c; }
        .op-case-title .tag-pass { color: var(--teal-600); }
        .op-case-title .tag-fail { color: var(--rose-600); }
        .op-case-line { font-family: 'IBM Plex Mono', monospace; font-size: 11.5px; color: #4a5266; white-space: pre-wrap; }

        .op-spin { animation: op-rotate 0.8s linear infinite; }
        .op-spin-track { opacity: 0.25; }
        .op-spin-head { opacity: 0.9; }
        @keyframes op-rotate { to { transform: rotate(360deg); } }
      `}</style>

      <div className="op-frame">
        <div className="op-titleblock">
          <div className="op-tb-left">
            <div className="op-tb-eyebrow">Coding Practice · C++</div>
            <div className="op-tb-title op-display">Algorithm Problem Set</div>
            <div className="op-tb-sub">10 classic problems. Only the function you need to complete is shown — includes and the test runner are wired in automatically.</div>
          </div>
          <div className="op-tb-meta">
            <div className="op-tb-meta-item">
              <div className="op-tb-meta-label">Problem</div>
              <div className="op-tb-meta-value op-mono">{question.number} / {QUESTIONS.length}</div>
            </div>
            <div className="op-tb-meta-item">
              <div className="op-tb-meta-label">Language</div>
              <div className="op-tb-meta-value op-mono">C++</div>
            </div>
            <div className="op-tb-meta-item">
              <div className="op-tb-meta-label">Solved</div>
              <div className="op-tb-meta-value op-mono">{solvedCount}/{QUESTIONS.length}</div>
            </div>
          </div>
        </div>

        <div className="op-layout">
          <div className="op-index">
            <div className="op-index-heading"><span>Problems</span><span>{QUESTIONS.length} total</span></div>
            {QUESTIONS.map((q) => (
              <button
                key={q.id}
                onClick={() => selectQuestion(q.id)}
                className={`op-index-row ${q.id === qId ? "active" : ""}`}
              >
                <span className="op-index-num op-mono">{q.number}</span>
                <span style={{ flex: 1 }}>
                  <div className="op-index-title">{q.title}</div>
                  <div className="op-index-tagline">{q.tagline}</div>
                </span>
                {solved[q.id] ? (
                  <span className="op-index-check">✓</span>
                ) : (
                  <span className={`op-index-dot ${q.difficulty.toLowerCase()}`} />
                )}
              </button>
            ))}
          </div>

          <div className="op-problem-layout">
            {/* Problem panel */}
            <div className="op-card">
              <span className={`op-diff-badge ${question.difficulty.toLowerCase()}`}>{question.difficulty}</span>
              <div><span className="op-topic-num op-mono">PROB. {question.number}</span></div>
              <div className="op-topic-title op-display">{question.title}</div>
              <div className="op-topic-tagline">{question.tagline}</div>

              <p className="op-intro">{question.description}</p>

              <div className="op-section-label">Examples</div>
              {question.visibleCases.map((ex, i) => (
                <div className="op-example" key={i}>
                  <div className="op-example-title">Example {i + 1}</div>
                  <div className="op-example-row">
                    <span className="op-example-label">Input:</span>
                    <span>{ex.input || "(none)"}</span>
                  </div>
                  <div className="op-example-row">
                    <span className="op-example-label">Output:</span>
                    <span>{ex.output}</span>
                  </div>
                </div>
              ))}

              <div className="op-section-label">Constraints</div>
              <ul className="op-points">
                {question.constraints.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>

            {/* Compiler panel */}
            <div className="op-card" style={{ padding: "20px" }}>
              <div className="op-editor">
                <div className="op-editor-bar">
                  <span className="op-dot" style={{ background: "#ff5f56" }} />
                  <span className="op-dot" style={{ background: "#ffbd2e" }} />
                  <span className="op-dot" style={{ background: "#27c93f" }} />
                  <span className="op-editor-filename op-mono">solution.cpp</span>
                  <span className="op-editor-hint">includes + main() hidden</span>
                </div>
                <textarea value={stubCode} onChange={(e) => setStubCode(e.target.value)} spellCheck={false} />
              </div>

              <button className="op-fullcode-toggle" onClick={() => setShowFullCode((v) => !v)}>
                {showFullCode ? "▾ Hide full compiled code" : "▸ View full compiled code"}
              </button>
              {showFullCode && (
                <div className="op-fullcode-box">{fullCodeFor(question, stubCode)}</div>
              )}

              <div className="op-run-row">
                <button className="op-run-btn" onClick={runCode} disabled={loading}>
                  {loading && <Spinner />} Run
                </button>
                <button className="op-submit-btn2" onClick={submitCode} disabled={loading}>
                  {loading && <Spinner />} Submit
                </button>
              </div>

              <div className="op-console-tabs">
                <button
                  className={`op-console-tab ${consoleTab === "testcase" ? "active" : ""}`}
                  onClick={() => setConsoleTab("testcase")}
                >
                  Testcase
                </button>
                <button
                  className={`op-console-tab ${consoleTab === "result" ? "active" : ""}`}
                  onClick={() => setConsoleTab("result")}
                >
                  Test Result
                </button>
              </div>

              {consoleTab === "testcase" && (
                <div>
                  <div className="op-panel-label">Input (stdin)</div>
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="op-input-box"
                    placeholder="e.g. 4&#10;2 7 11 15&#10;9"
                  />
                  <div className="op-panel-label">Output</div>
                  <textarea value={output} readOnly className="op-console" />
                </div>
              )}

              {consoleTab === "result" && (
                <div style={{ marginTop: "12px" }}>
                  {!verdict && !loading && (
                    <p style={{ fontSize: "13px", color: "var(--ink-soft)" }}>
                      Hit "Submit" to check your code against every test case.
                    </p>
                  )}
                  {loading && (
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "var(--ink-soft)" }}>
                      <Spinner /> Judging…
                    </div>
                  )}
                  {!loading && verdict && verdict.status === "error" && (
                    <div className="op-case-card fail">{verdict.message}</div>
                  )}
                  {!loading && verdict && (verdict.status === "accepted" || verdict.status === "wrong") && (
                    <div>
                      <span className={`op-verdict-pill ${verdict.status}`}>
                        {verdict.status === "accepted" ? "Accepted" : "Wrong Answer"}
                      </span>
                      {verdict.results.map((r, i) => (
                        <div key={i} className={`op-case-card ${r.passed ? "pass" : "fail"}`}>
                          <div className="op-case-title">
                            Case {i + 1} {r.hidden ? "(hidden)" : ""} —{" "}
                            <span className={r.passed ? "tag-pass" : "tag-fail"}>
                              {r.passed ? "Passed" : "Failed"}
                            </span>
                          </div>
                          {!r.hidden && <div className="op-case-line">Input: {r.input || "(none)"}</div>}
                          <div className="op-case-line">Expected: {r.expected}</div>
                          <div className="op-case-line">Got: {r.got}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}