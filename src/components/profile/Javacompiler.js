import React, { useEffect, useState } from "react";
import axios from "axios";
import Questions from "./Questions";
import Askai from "./Askai";
import {
  Sparkles
} from "lucide-react";

const CPP_API_URL = "https://cppcompiler-5r57.onrender.com/compilecpp";
const JAVA_API_URL = "https://onlinecompiler-2-4br5.onrender.com/compile";

// Language behavior is the same across every question — only the starter
// code (question.templates[langId]) changes per question.
const LANGUAGE_META = [
  { id: "cpp", label: "C++", takesInput: true, apiUrl: CPP_API_URL },
  { id: "c", label: "C", takesInput: true, apiUrl: CPP_API_URL },
  { id: "java", label: "Java", takesInput: false, apiUrl: JAVA_API_URL },
];

function Spinner() {
  return (
    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-90"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}

export default function CompilerPage({ questionId, setActiveScreen }) {
  const question = Questions.find((q) => String(q.id) === String(questionId));

  const [languageId, setLanguageId] = useState("cpp");
  const [code, setCode] = useState(question ? question.templates.cpp : "");
  const [input, setInput] = useState(
    question ? question.visibleCases[0]?.input || "" : ""
  );
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [dots, setDots] = useState("");
  const [consoleTab, setConsoleTab] = useState("testcase");
  const [verdict, setVerdict] = useState(null);

  const [showAI, setShowAI] = useState(false);

  const activeLang = LANGUAGE_META.find((l) => l.id === languageId);

  // Dot animation while any request is in flight
  useEffect(() => {
    if (!loading) {
      setDots("");
      return;
    }
    const t = setInterval(() => {
      setDots((d) => (d.length >= 3 ? "" : d + "."));
    }, 350);
    return () => clearInterval(t);
  }, [loading]);

  // If questionId changes (user picks a different question), reset editor state
  useEffect(() => {
    if (!question) return;
    setLanguageId("cpp");
    setCode(question.templates.cpp);
    setInput(question.visibleCases[0]?.input || "");
    setOutput("");
    setVerdict(null);
    setConsoleTab("testcase");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionId]);

  if (!question) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-50 text-center px-6">
        <h1 className="text-xl font-bold text-gray-800 mb-2">
          No question selected
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Pick a question from the question bank to open it here.
        </p>
        <button
          onClick={() => setActiveScreen("Questions")}
          className="px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
        >
          Back to Questions
        </button>
      </div>
    );
  }

  const changeLanguage = (langId) => {
    setLanguageId(langId);
    setCode(question.templates[langId] || "");
    setInput(question.visibleCases[0]?.input || "");
    setOutput("");
    setVerdict(null);
    setConsoleTab("testcase");
  };

  const callCompiler = async (runInput) => {
    const body = activeLang.takesInput
      ? { code, input: runInput }
      : { code };
    const res = await axios.post(activeLang.apiUrl, body);
    return res.data;
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
    if (!activeLang.takesInput) {
      setConsoleTab("result");
      setVerdict({
        status: "unavailable",
        results: [],
        message: `Submit needs per-test-case input, and the ${activeLang.label} runner doesn't accept stdin. Use Run to check the fixed value in your code instead.`,
      });
      return;
    }

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
          passed: got === expected,
        });
        if (got !== expected) break; // stop at first failure, like most judges
      }

      const passed =
        results.every((r) => r.passed) && results.length === allCases.length;

      setVerdict({ status: passed ? "accepted" : "wrong", results });
    } catch (err) {
      setVerdict({
        status: "error",
        results: [],
        message: err.response?.data?.message || err.message || "Server Error",
      });
    } finally {
      setLoading(false);
    }
  };

  const difficultyColor =
    question.difficulty === "Easy"
      ? "bg-green-100 text-green-700"
      : question.difficulty === "Medium"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700";

  return (
    <div className="h-screen w-full bg-gray-50 flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-2.5 bg-white border-b border-gray-200">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveScreen("Questionpage")}
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            ← Back
          </button>
          <span className="font-semibold text-gray-800">
            {question.id}. {question.title}
          </span>
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full ${difficultyColor}`}
          >
            {question.difficulty}
          </span>
        </div>

    
        <div className="flex items-center gap-2">
                      <button

    onClick={() => setShowAI(true)}

    className=" flex items-center gap-1.5 px-4 py-1.5 rounded-md text-sm font-medium bg-red-500 text-white hover:bg-orange-600 transition disabled:opacity-60"

>

   <Sparkles size={12} /> ASK AI

</button>
          <button
            onClick={runCode}
            disabled={loading}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-md text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition disabled:opacity-60"
          >
            {loading && <Spinner />}
            Run
          </button>
          <button
            onClick={submitCode}
            disabled={loading}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-md text-sm font-medium bg-green-600 text-white hover:bg-green-700 transition disabled:opacity-60"
          >
            {loading && <Spinner />}
            Submit
          </button>

    
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 min-h-0">
        {/* LEFT: Problem panel, built from question data */}
        <div className="overflow-y-auto border-r border-gray-200 bg-white p-6">
          <h1 className="text-xl font-bold text-gray-900 mb-3">
            {question.title}
          </h1>

          <p className="text-sm text-gray-700 leading-relaxed mb-6">
            {question.description}
          </p>

          {question.visibleCases.map((ex, i) => (
            <div key={i} className="mb-5">
              <h3 className="text-sm font-semibold text-gray-800 mb-2">
                Example {i + 1}
              </h3>
              <div className="rounded-lg bg-gray-100 p-3 font-mono text-sm text-gray-800 space-y-1 whitespace-pre-wrap">
                <div>
                  <span className="text-gray-500">Input: </span>
                  {ex.input}
                </div>
                <div>
                  <span className="text-gray-500">Output: </span>
                  {ex.output}
                </div>
              </div>
            </div>
          ))}

          <h3 className="text-sm font-semibold text-gray-800 mb-2">
            Constraints
          </h3>
          <ul className="text-sm text-gray-700 list-disc list-inside space-y-1 mb-6">
            {question.constraints.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>

          <div className="text-xs text-gray-400 border-t border-gray-100 pt-3">
            Note: the Java runner doesn't accept stdin, so its template uses a
            fixed value — use Run to check it, Submit is only scored for C /
            C++.
          </div>
        </div>

        {/* RIGHT: Compiler panel */}
        <div className="flex flex-col min-h-0 bg-white">
          <div className="flex gap-2 px-4 py-2 border-b border-gray-200">
            {LANGUAGE_META.map((lang) => (
              <button
                key={lang.id}
                onClick={() => changeLanguage(lang.id)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                  languageId === lang.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>

          <div className="flex-1 min-h-0">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              className="w-full h-full p-4 bg-gray-900 text-green-400 font-mono text-sm outline-none resize-none"
            />
          </div>

          {/* Console */}
          <div
            className="border-t border-gray-200 flex flex-col"
            style={{ height: "42%" }}
          >
            <div className="flex gap-4 px-4 pt-2 border-b border-gray-200 text-sm font-medium">
              <button
                onClick={() => setConsoleTab("testcase")}
                className={`pb-2 border-b-2 transition ${
                  consoleTab === "testcase"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Testcase
              </button>
              <button
                onClick={() => setConsoleTab("result")}
                className={`pb-2 border-b-2 transition ${
                  consoleTab === "result"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Result
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {consoleTab === "testcase" && (
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1 block">
                    Input (stdin)
                  </label>
                  <textarea
                    value={activeLang.takesInput ? input : ""}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={!activeLang.takesInput}
                    placeholder={
                      activeLang.takesInput
                        ? "e.g. 5"
                        : `${activeLang.label} runner does not accept input`
                    }
                    className={`w-full h-16 p-2 rounded-md border border-gray-300 font-mono text-sm outline-none resize-none ${
                      activeLang.takesInput
                        ? "bg-gray-50 text-gray-900"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  />

                  <label className="text-xs font-medium text-gray-500 mt-3 mb-1 block">
                    Output
                  </label>
                  <div className="relative">
                    <textarea
                      value={output}
                      readOnly
                      className="w-full h-16 p-2 rounded-md border border-gray-300 bg-black text-green-400 font-mono text-sm outline-none resize-none"
                    />
                    {loading && (
                      <div className="absolute inset-0 flex items-center gap-2 px-2 rounded-md bg-black text-green-400 font-mono text-sm pointer-events-none">
                        <span>Running{dots}</span>
                        <span className="blink-cursor">▍</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {consoleTab === "result" && (
                <div>
                  {!verdict && !loading && (
                    <p className="text-sm text-gray-400">
                      Hit "Submit" to check your code against the test cases.
                    </p>
                  )}

                  {loading && (
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Spinner />
                      <span>Judging{dots}</span>
                    </div>
                  )}

                  {!loading && verdict && verdict.status === "unavailable" && (
                    <div className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-md p-3">
                      {verdict.message}
                    </div>
                  )}

                  {!loading && verdict && verdict.status === "error" && (
                    <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-md p-3">
                      {verdict.message}
                    </div>
                  )}

                  {!loading &&
                    verdict &&
                    (verdict.status === "accepted" ||
                      verdict.status === "wrong") && (
                      <div>
                        <div
                          className={`inline-block text-sm font-semibold px-3 py-1 rounded-md mb-3 ${
                            verdict.status === "accepted"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {verdict.status === "accepted"
                            ? "Accepted"
                            : "Wrong Answer"}
                        </div>

                        <div className="space-y-2">
                          {verdict.results.map((r, i) => (
                            <div
                              key={i}
                              className={`text-sm rounded-md border p-2 ${
                                r.passed
                                  ? "border-green-200 bg-green-50"
                                  : "border-red-200 bg-red-50"
                              }`}
                            >
                              <div className="font-medium text-gray-700 mb-1">
                                Case {i + 1} {r.hidden ? "(hidden)" : ""} —{" "}
                                <span
                                  className={
                                    r.passed
                                      ? "text-green-700"
                                      : "text-red-700"
                                  }
                                >
                                  {r.passed ? "Passed" : "Failed"}
                                </span>
                              </div>
                              {!r.hidden && (
                                <div className="font-mono text-xs text-gray-600 whitespace-pre-wrap">
                                  Input: {r.input}
                                </div>
                              )}
                              <div className="font-mono text-xs text-gray-600">
                                Expected: {r.expected}
                              </div>
                              <div className="font-mono text-xs text-gray-600">
                                Got: {r.got}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        .blink-cursor {
          animation: blink 1s step-start infinite;
        }
      `}</style>


      <Askai

    open={showAI}

    onClose={() => setShowAI(false)}

    question={question}

    language={languageId}

    code={code}

    input={input}

    output={output}

/>
    </div>
  );
}



