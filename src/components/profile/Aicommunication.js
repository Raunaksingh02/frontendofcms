
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Bot, Mic, Loader2, Briefcase } from "lucide-react";

const API_URL = "http://localhost:5001/ai";

const Aicommunication = () => {
  const [candidateName, setCandidateName] = useState("");
  const [role, setRole] = useState("");
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [transcript, setTranscript] = useState("");
  const [messages, setMessages] = useState([]);
  const [seconds, setSeconds] = useState(0);

  const recognitionRef = useRef(null);
  const silenceTimer = useRef(null);
  const aiSpeakingRef = useRef(false);

  useEffect(() => {
    let interval;
    if (started) {
      interval = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [started]);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = () => setListening(true);

    recognition.onend = () => {
      setListening(false);
      if (started && !aiSpeakingRef.current) {
        try {
          recognition.start();
        } catch {}
      }
    };

    recognition.onresult = (event) => {
      let text = "";
      for (let i = 0; i < event.results.length; i++) {
        text += event.results[i][0].transcript;
      }

      setTranscript(text);

      clearTimeout(silenceTimer.current);

      silenceTimer.current = setTimeout(() => {
        if (text.trim().length > 5) {
          submitAnswer(text);
        }
      }, 3000);
    };

    recognitionRef.current = recognition;
  }, [started, messages]);

  const callAI = async (prompt) => {
    const res = await axios.post(API_URL, { prompt });
    return res.data.answer;
  };

  const speak = (text) => {
    speechSynthesis.cancel();

    aiSpeakingRef.current = true;

    try {
      recognitionRef.current?.stop();
    } catch {}

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.onend = () => {
      aiSpeakingRef.current = false;

      setTimeout(() => {
        try {
          recognitionRef.current?.start();
        } catch {}
      }, 1000);
    };

    speechSynthesis.speak(utterance);
  };

  const startInterview = async () => {
    setLoading(true);

    try {
      const prompt = `
You are a professional MNC HR interviewer.

Candidate Name: ${candidateName}
Role: ${role}

Ask only the first interview question.
      `;

      const firstQuestion = await callAI(prompt);

      setCurrentQuestion(firstQuestion);

      setMessages([
        {
          sender: "ai",
          text: firstQuestion,
        },
      ]);

      setQuestionCount(1);
      setStarted(true);

      speak(firstQuestion);
    } finally {
      setLoading(false);
    }
  };

  const submitAnswer = async (voiceAnswer) => {
    if (loading) return;

    setLoading(true);

    try {
      const updated = [
        ...messages,
        {
          sender: "user",
          text: voiceAnswer,
        },
      ];

      setMessages(updated);

      const history = updated
        .map((m) => `${m.sender}: ${m.text}`)
        .join("\n");

      const prompt = `
You are an HR interviewer.

${history}

Evaluate the answer.
Give score and feedback.
Ask next question.
`;

      const reply = await callAI(prompt);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: reply,
        },
      ]);

      setCurrentQuestion(reply);
      setTranscript("");
      setQuestionCount((q) => q + 1);

      speak(reply);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = () => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  if (!started) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
        <div className="w-full max-w-2xl bg-slate-900 rounded-3xl p-8">
          <h1 className="text-5xl font-bold text-center mb-8">
            AI Voice HR Interview
          </h1>

          <input
            className="w-full mb-4 p-4 rounded-xl bg-slate-800"
            placeholder="Candidate Name"
            value={candidateName}
            onChange={(e) => setCandidateName(e.target.value)}
          />

          <input
            className="w-full mb-4 p-4 rounded-xl bg-slate-800"
            placeholder="Target Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />

          <button
            onClick={startInterview}
            className="w-full p-4 bg-blue-600 rounded-xl"
          >
            {loading ? "Starting..." : "Start Interview"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-slate-950 text-white overflow-hidden">
      <div className="h-20 border-b border-slate-800 flex items-center justify-between px-8">
        <div>
          <h2 className="font-bold">{candidateName}</h2>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Briefcase size={14} />
            {role}
          </div>
        </div>

        <div>Question {questionCount}</div>
        <div>{formatTime()}</div>
      </div>

      <div className="h-[calc(100vh-80px)] flex flex-col items-center justify-center px-6">
        <div className="relative mb-10">
          <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping"></div>
          <div className="w-44 h-44 rounded-full bg-blue-600 flex items-center justify-center relative">
            <Bot size={90} />
          </div>
        </div>

        <div className="flex gap-1 items-end h-20 mb-8">
          {Array.from({ length: 25 }).map((_, i) => (
            <div
              key={i}
              className="w-2 bg-blue-500 animate-pulse rounded-full"
              style={{
                height: `${20 + ((i * 13) % 60)}px`,
              }}
            />
          ))}
        </div>

        <div className="text-center max-w-4xl">
          <div className="text-slate-400 mb-3">
            {listening ? "Listening..." : "AI Speaking..."}
          </div>

          <h3 className="text-2xl font-semibold mb-6">
            {currentQuestion}
          </h3>

          <div className="bg-slate-900 rounded-2xl p-6 min-h-[120px]">
            <p className="text-slate-300">
              {transcript || "Your live speech transcript appears here..."}
            </p>
          </div>
        </div>

        {loading && (
          <div className="mt-6 flex items-center gap-2">
            <Loader2 className="animate-spin" />
            Processing...
          </div>
        )}
      </div>
    </div>
  );
};

export default Aicommunication;
