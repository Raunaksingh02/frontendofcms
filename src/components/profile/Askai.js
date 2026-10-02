import React, { useEffect, useRef, useState, useCallback } from "react";
import axios from "axios";

// Adjust this to wherever your Express server actually runs.
// If you already have a base API URL elsewhere in the app (e.g. an
// axios instance or an env var), swap this out for that instead.
const AI_CHAT_API_URL =
    (process.env.REACT_APP_API_URL || "http://localhost:5001") +
    "/aichatbox";

// Resize limits for the drawer
const MIN_WIDTH = 360;
const MAX_WIDTH = 900;
const DEFAULT_WIDTH = 480;

/* ---------------------------------------------------------------------- */
/* Lightweight markdown: ```lang code blocks```, `inline code`, **bold**   */
/* ---------------------------------------------------------------------- */

function CodeBlock({ lang, content }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(content.trim());
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch {
            // clipboard API unavailable — silently ignore
        }
    };

    return (
        <div className="my-2 rounded-lg overflow-hidden border border-gray-700 shadow-sm">
            <div className="flex items-center justify-between bg-gray-800 px-3 py-1.5">
                <span className="text-[11px] font-mono text-gray-300 uppercase tracking-wide">
                    {lang || "code"}
                </span>
                <button
                    onClick={handleCopy}
                    className="text-[11px] text-gray-300 hover:text-white transition flex items-center gap-1"
                >
                    {copied ? "✓ Copied" : "Copy"}
                </button>
            </div>
            <pre className="bg-gray-900 text-green-400 text-xs font-mono p-3 overflow-x-auto">
                <code>{content}</code>
            </pre>
        </div>
    );
}

function renderInline(text, keyPrefix) {
    // Splits on **bold** and `inline code`, preserving the delimiters
    const tokens = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).filter((t) => t !== "");

    return tokens.map((token, i) => {
        const key = `${keyPrefix}-${i}`;
        if (token.startsWith("**") && token.endsWith("**")) {
            return (
                <strong key={key} className="font-semibold">
                    {token.slice(2, -2)}
                </strong>
            );
        }
        if (token.startsWith("`") && token.endsWith("`") && token.length > 1) {
            return (
                <code
                    key={key}
                    className="bg-gray-200 text-pink-600 px-1 py-0.5 rounded text-[13px] font-mono"
                >
                    {token.slice(1, -1)}
                </code>
            );
        }
        return <React.Fragment key={key}>{token}</React.Fragment>;
    });
}

function MessageContent({ text }) {
    // Split on fenced code blocks first, keep everything else as plain text
    const blockRegex = /```(\w+)?\n?([\s\S]*?)```/g;
    const nodes = [];
    let lastIndex = 0;
    let match;
    let key = 0;

    while ((match = blockRegex.exec(text)) !== null) {
        if (match.index > lastIndex) {
            nodes.push({
                type: "text",
                content: text.slice(lastIndex, match.index),
                key: key++,
            });
        }
        nodes.push({
            type: "code",
            lang: match[1] || "",
            content: match[2],
            key: key++,
        });
        lastIndex = match.index + match[0].length;
    }
    if (lastIndex < text.length) {
        nodes.push({ type: "text", content: text.slice(lastIndex), key: key++ });
    }

    return (
        <>
            {nodes.map((node) =>
                node.type === "code" ? (
                    <CodeBlock key={node.key} lang={node.lang} content={node.content} />
                ) : (
                    <span key={node.key} className="whitespace-pre-wrap">
                        {renderInline(node.content, node.key)}
                    </span>
                )
            )}
        </>
    );
}

/* ---------------------------------------------------------------------- */

const WELCOME_MESSAGE = {
    role: "assistant",
    text:
        "👋 Hi! I'm your AI Coding Mentor.\n\nI already know your current question, programming language, code, compiler output and sample input.\n\nAsk me anything!",
};

const QUICK_PROMPTS = [
    "Explain Question",
    "Give Hint",
    "Dry Run",
    "Step by Step Solution",
    "Time & Space Complexity",
    "Code",
    "Find Bug",
    "Optimize Code",
    "Explanation,visualization,dry run, code, input and output",

    ,
];

export default function Askai({
    open,
    onClose,
    question,
    language,
    code,
    input,
    output,
}) {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([WELCOME_MESSAGE]);

    // --- Drag-to-resize state ---
    const [width, setWidth] = useState(DEFAULT_WIDTH);
    const [isResizing, setIsResizing] = useState(false);
    const widthAtDragStartRef = useRef(DEFAULT_WIDTH);
    const startXRef = useRef(0);

    const chatEndRef = useRef(null);
    const textareaRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    // Auto-grow the textarea up to a max height
    useEffect(() => {
        const ta = textareaRef.current;
        if (!ta) return;
        ta.style.height = "auto";
        ta.style.height = Math.min(ta.scrollHeight, 120) + "px";
    }, [message]);

    // Handle the actual drag: since the drawer is pinned to the right edge,
    // dragging the handle left (negative movementX) should increase width.
    const handleResizeMove = useCallback((e) => {
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const delta = startXRef.current - clientX;
        const rawWidth = widthAtDragStartRef.current + delta;
        const cappedByViewport = Math.min(rawWidth, window.innerWidth * 0.95);
        const clamped = Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, cappedByViewport));
        setWidth(clamped);
    }, []);

    const handleResizeEnd = useCallback(() => {
        setIsResizing(false);
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
        window.removeEventListener("mousemove", handleResizeMove);
        window.removeEventListener("mouseup", handleResizeEnd);
        window.removeEventListener("touchmove", handleResizeMove);
        window.removeEventListener("touchend", handleResizeEnd);
    }, [handleResizeMove]);

    const handleResizeStart = useCallback(
        (e) => {
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            startXRef.current = clientX;
            widthAtDragStartRef.current = width;
            setIsResizing(true);
            document.body.style.cursor = "col-resize";
            document.body.style.userSelect = "none";
            window.addEventListener("mousemove", handleResizeMove);
            window.addEventListener("mouseup", handleResizeEnd);
            window.addEventListener("touchmove", handleResizeMove, { passive: false });
            window.addEventListener("touchend", handleResizeEnd);
        },
        [width, handleResizeMove, handleResizeEnd]
    );

    // Clean up listeners if the component unmounts mid-drag
    useEffect(() => {
        return () => {
            window.removeEventListener("mousemove", handleResizeMove);
            window.removeEventListener("mouseup", handleResizeEnd);
            window.removeEventListener("touchmove", handleResizeMove);
            window.removeEventListener("touchend", handleResizeEnd);
            document.body.style.cursor = "";
            document.body.style.userSelect = "";
        };
    }, [handleResizeMove, handleResizeEnd]);

    const resetWidth = () => setWidth(DEFAULT_WIDTH);

    if (!open) return null;

    const sendText = async (text) => {
        const trimmed = text.trim();
        if (!trimmed || loading) return;

        setMessages((prev) => [...prev, { role: "user", text: trimmed }]);
        setMessage("");
        setLoading(true);

        try {
            const { data } = await axios.post(AI_CHAT_API_URL, {
                message: trimmed,
                question,
                language,
                code,
                input,
                output,
            });

            if (data.success) {
                setMessages((prev) => [
                    ...prev,
                    { role: "assistant", text: data.answer },
                ]);
            } else {
                setMessages((prev) => [
                    ...prev,
                    {
                        role: "assistant",
                        text: data.message || "Something went wrong generating a response.",
                        error: true,
                    },
                ]);
            }
        } catch (err) {
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    text:
                        err.response?.data?.message ||
                        err.message ||
                        "Unable to reach the AI mentor. Please try again.",
                    error: true,
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const sendMessage = () => sendText(message);

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const clearChat = () => setMessages([WELCOME_MESSAGE]);

    return (
        <div className="fixed inset-0 z-50">
            {/* Overlay */}
            <div
                onClick={onClose}
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />

            {/* Drawer */}
            <div
                className="absolute right-0 top-0 h-full bg-white shadow-2xl flex flex-col"
                style={{
                    width: `${width}px`,
                    maxWidth: "95vw",
                    transition: isResizing ? "none" : "width 0.15s ease-out",
                }}
            >
                {/* Resize handle */}
                <div
                    onMouseDown={handleResizeStart}
                    onTouchStart={handleResizeStart}
                    onDoubleClick={resetWidth}
                    title="Drag to resize · double-click to reset"
                    className={`absolute left-0 top-0 h-full w-2 -translate-x-1/2 cursor-col-resize z-10 group flex items-center justify-center ${
                        isResizing ? "bg-blue-500/20" : ""
                    }`}
                >
                    <div
                        className={`h-16 w-1 rounded-full transition-colors ${
                            isResizing
                                ? "bg-blue-500"
                                : "bg-gray-300 group-hover:bg-blue-400"
                        }`}
                    />
                </div>

                {/* Header */}
                <div className="border-b bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 flex justify-between items-start">
                    <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center text-xl flex-shrink-0">
                            🤖
                        </div>
                        <div>
                            <h2 className="text-base font-bold leading-tight">
                                AI Coding Mentor
                            </h2>
                            <p className="text-xs text-blue-100 mt-1 line-clamp-1">
                                {question?.title || "No question loaded"}
                            </p>
                            <span className="inline-block mt-1 text-[10px] font-semibold bg-white/20 px-2 py-0.5 rounded-full uppercase tracking-wide">
                                {language}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-1">
                        <button
                            onClick={clearChat}
                            title="Clear chat"
                            className="w-8 h-8 rounded-lg hover:bg-white/15 transition flex items-center justify-center text-sm"
                        >
                            🗑️
                        </button>
                        <button
                            onClick={onClose}
                            title="Close"
                            className="w-8 h-8 rounded-lg hover:bg-white/15 transition flex items-center justify-center text-xl leading-none"
                        >
                            ×
                        </button>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="border-b p-3 bg-gray-50">
                    <div className="flex flex-wrap gap-2">
                        {QUICK_PROMPTS.map((item) => (
                            <button
                                key={item}
                                onClick={() => sendText(item)}
                                disabled={loading}
                                className="text-xs bg-white border border-gray-200 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 text-gray-600 px-3 py-1.5 rounded-full transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex items-end gap-2 ${
                                msg.role === "user" ? "justify-end" : "justify-start"
                            }`}
                        >
                            {msg.role === "assistant" && (
                                <div className="w-7 h-7 rounded-full bg-indigo-100 text-sm flex items-center justify-center flex-shrink-0">
                                    🤖
                                </div>
                            )}

                            <div
                                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                                    msg.role === "user"
                                        ? "bg-blue-600 text-white rounded-br-sm"
                                        : msg.error
                                        ? "bg-red-50 text-red-700 border border-red-200 rounded-bl-sm"
                                        : "bg-white text-gray-800 border border-gray-100 rounded-bl-sm"
                                }`}
                            >
                                {msg.role === "assistant" ? (
                                    <MessageContent text={msg.text} />
                                ) : (
                                    <span className="whitespace-pre-wrap">{msg.text}</span>
                                )}
                            </div>

                            {msg.role === "user" && (
                                <div className="w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-semibold flex items-center justify-center flex-shrink-0">
                                    You
                                </div>
                            )}
                        </div>
                    ))}

                    {loading && (
                        <div className="flex items-end gap-2 justify-start">
                            <div className="w-7 h-7 rounded-full bg-indigo-100 text-sm flex items-center justify-center flex-shrink-0">
                                🤖
                            </div>
                            <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm border border-gray-100 flex items-center gap-1">
                                <span className="thinking-dot" style={{ animationDelay: "0ms" }} />
                                <span className="thinking-dot" style={{ animationDelay: "150ms" }} />
                                <span className="thinking-dot" style={{ animationDelay: "300ms" }} />
                            </div>
                        </div>
                    )}

                    <div ref={chatEndRef} />
                </div>

                {/* Input */}
                <div className="border-t p-4 bg-white">
                    <div className="flex items-end gap-2">
                        <textarea
                            ref={textareaRef}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={handleKeyDown}
                            rows={1}
                            disabled={loading}
                            className="flex-1 border rounded-xl px-4 py-3 text-black outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm disabled:bg-gray-50"
                            placeholder="Ask anything about this question..."
                        />

                        <button
                            onClick={sendMessage}
                            disabled={loading || !message.trim()}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                        >
                            {loading ? "…" : "Send"}
                        </button>
                    </div>
                    <p className="text-[11px] text-gray-400 mt-1.5">
                        Enter to send · Shift+Enter for a new line
                    </p>
                </div>
            </div>

            <style>{`
                @keyframes thinkingBounce {
                    0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
                    40% { transform: translateY(-4px); opacity: 1; }
                }
                .thinking-dot {
                    width: 6px;
                    height: 6px;
                    border-radius: 9999px;
                    background-color: #6366f1;
                    display: inline-block;
                    animation: thinkingBounce 1.2s ease-in-out infinite;
                }
                .line-clamp-1 {
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </div>
    );
}