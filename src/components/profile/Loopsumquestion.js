import React, { useRef, useState } from "react";
import Compiler from "./Compiler";

const CPP_API_URL = "https://cppcompiler-5r57.onrender.com/compilecpp";
const JAVA_API_URL = "https://onlinecompiler-2-4br5.onrender.com/compile";

const CPP_TEMPLATE = `#include<iostream>
using namespace std;

int main() {
    int n;
    cin >> n;

    int sum = 0;
    for (int i = 1; i <= n; i++) {
        sum += i;
    }

    cout << sum << endl;
    return 0;
}
`;

const C_TEMPLATE = `#include<stdio.h>

int main() {
    int n;
    scanf("%d", &n);

    int sum = 0;
    for (int i = 1; i <= n; i++) {
        sum += i;
    }

    printf("%d\\n", sum);
    return 0;
}
`;

const JAVA_TEMPLATE = `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        int n = 5; // Java runner has no stdin, so N is fixed here

        int sum = 0;
        for (int i = 1; i <= n; i++) {
            sum += i;
        }

        System.out.println(sum);
    }
}
`;

// Question owns the language + API configuration. Compiler is generic
// and just uses whatever it's handed here.
const LANGUAGES = [
    { id: "cpp", label: "C++", template: CPP_TEMPLATE, takesInput: true, apiUrl: CPP_API_URL },
    { id: "c", label: "C", template: C_TEMPLATE, takesInput: true, apiUrl: CPP_API_URL },
    { id: "java", label: "Java", template: JAVA_TEMPLATE, takesInput: false, apiUrl: JAVA_API_URL },
];

const VISIBLE_CASES = [
    { input: "5", output: "15" },
    { input: "10", output: "55" },
];
const HIDDEN_CASES = [
    { input: "1", output: "1" },
    { input: "100", output: "5050" },
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

export default function LoopSumQuestion() {
    // A ref into the Compiler lets THIS component drive it programmatically
    // (run arbitrary hidden test cases) without the Compiler knowing anything
    // about judging.
    const compilerRef = useRef(null);

    const [languageId, setLanguageId] = useState("cpp");
    const [lastRun, setLastRun] = useState(null); // { languageId, input, output, success }
    const [submitting, setSubmitting] = useState(false);
    const [verdict, setVerdict] = useState(null); // { status, results }

    const activeLang = LANGUAGES.find((l) => l.id === languageId);

    // Compiler calls this after every manual "Run" — this is the other
    // direction of the interaction: Compiler -> Question.
    const handleOutputChange = (result) => {
        setLastRun(result);
        setVerdict(null);
    };

    const handleLanguageChange = (id) => {
        setLanguageId(id);
        setLastRun(null);
        setVerdict(null);
    };

    // Does the last manual run match one of the known visible examples?
    const matchedExample =
        lastRun && VISIBLE_CASES.find((c) => c.input.trim() === (lastRun.input || "").trim());
    const isExampleMatch =
        matchedExample &&
        lastRun.success &&
        (lastRun.output || "").trim() === matchedExample.output.trim();

    const handleSubmit = async () => {
        if (!activeLang.takesInput) {
            setVerdict({
                status: "unavailable",
                results: [],
                message:
                    "The Java runner doesn't accept stdin, so Submit can't feed it different N values. Use Run to sanity-check the fixed N in your code instead.",
            });
            return;
        }

        setSubmitting(true);
        setVerdict(null);

        const allCases = [...VISIBLE_CASES, ...HIDDEN_CASES];
        const results = [];

        for (let i = 0; i < allCases.length; i++) {
            const tc = allCases[i];
            try {
                // This is Question calling INTO Compiler via the ref.
                const data = await compilerRef.current.execute(tc.input);
                const got = (data.success ? data.output : data.message || "").trim();
                const expected = tc.output.trim();
                const passed = got === expected;
                results.push({
                    hidden: i >= VISIBLE_CASES.length,
                    input: tc.input,
                    expected,
                    got,
                    passed,
                });
                if (!passed) break;
            } catch (err) {
                results.push({
                    hidden: i >= VISIBLE_CASES.length,
                    input: tc.input,
                    expected: tc.output,
                    got: err.response?.data?.message || err.message || "Server Error",
                    passed: false,
                });
                break;
            }
        }

        const passedAll = results.length === allCases.length && results.every((r) => r.passed);
        setVerdict({ status: passedAll ? "accepted" : "wrong", results });
        setSubmitting(false);
    };

    return (
        <div className="h-screen w-full bg-gray-50 flex flex-col">

            {/* Top bar */}
            <div className="flex items-center justify-between px-5 py-2.5 bg-white border-b border-gray-200">
                <div className="flex items-center gap-3">
                    <span className="font-semibold text-gray-800">1. Loop Sum</span>
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                        Easy
                    </span>
                </div>
                <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-md text-sm font-medium bg-green-600 text-white hover:bg-green-700 transition disabled:opacity-60"
                >
                    {submitting && <Spinner />}
                    Submit
                </button>
            </div>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 min-h-0">

                {/* LEFT: Problem panel (owns test-case content) */}
                <div className="overflow-y-auto border-r border-gray-200 bg-white p-6">
                    <h1 className="text-xl font-bold text-gray-900 mb-3">Loop Sum</h1>

                    <p className="text-sm text-gray-700 leading-relaxed mb-4">
                        Given an integer <code className="px-1 py-0.5 bg-gray-100 rounded text-pink-600">N</code>,
                        write a program that uses a <strong>loop</strong> to compute the sum of all
                        integers from <code className="px-1 py-0.5 bg-gray-100 rounded text-pink-600">1</code> to{" "}
                        <code className="px-1 py-0.5 bg-gray-100 rounded text-pink-600">N</code> (inclusive),
                        and print the result.
                    </p>

                    <p className="text-sm text-gray-700 leading-relaxed mb-6">
                        Read <code className="px-1 py-0.5 bg-gray-100 rounded text-pink-600">N</code> from
                        standard input and print a single integer.
                    </p>

                    {VISIBLE_CASES.map((ex, i) => (
                        <div key={i} className="mb-5">
                            <h3 className="text-sm font-semibold text-gray-800 mb-2">
                                Example {i + 1}
                            </h3>
                            <div className="rounded-lg bg-gray-100 p-3 font-mono text-sm text-gray-800 space-y-1">
                                <div>
                                    <span className="text-gray-500">Input: </span>
                                    N = {ex.input}
                                </div>
                                <div>
                                    <span className="text-gray-500">Output: </span>
                                    {ex.output}
                                </div>
                            </div>
                        </div>
                    ))}

                    <h3 className="text-sm font-semibold text-gray-800 mb-2">Constraints</h3>
                    <ul className="text-sm text-gray-700 list-disc list-inside space-y-1 mb-6">
                        <li>1 ≤ N ≤ 1000</li>
                        <li>The loop must run in O(N) time (no closed-form shortcuts).</li>
                    </ul>

                    {/* Live feedback driven by Compiler's onOutputChange callback */}
                    {lastRun && matchedExample && (
                        <div
                            className={`text-sm rounded-md border p-3 mb-4 ${
                                isExampleMatch
                                    ? "border-green-200 bg-green-50 text-green-700"
                                    : "border-red-200 bg-red-50 text-red-700"
                            }`}
                        >
                            {isExampleMatch
                                ? `✓ Matches the expected output for N = ${matchedExample.input}`
                                : `✗ Doesn't match. Expected "${matchedExample.output}" for N = ${matchedExample.input}, got "${lastRun.output}"`}
                        </div>
                    )}

                    {/* Submit verdict, built from Question's own judging logic */}
                    {verdict && (
                        <div className="mt-2">
                            {verdict.status === "unavailable" && (
                                <div className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-md p-3">
                                    {verdict.message}
                                </div>
                            )}

                            {(verdict.status === "accepted" || verdict.status === "wrong") && (
                                <div>
                                    <div
                                        className={`inline-block text-sm font-semibold px-3 py-1 rounded-md mb-3 ${
                                            verdict.status === "accepted"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                        }`}
                                    >
                                        {verdict.status === "accepted" ? "Accepted" : "Wrong Answer"}
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
                                                    <span className={r.passed ? "text-green-700" : "text-red-700"}>
                                                        {r.passed ? "Passed" : "Failed"}
                                                    </span>
                                                </div>
                                                {!r.hidden && (
                                                    <div className="font-mono text-xs text-gray-600">
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

                    <div className="text-xs text-gray-400 border-t border-gray-100 pt-3 mt-4">
                        Note: the Java runner doesn't accept stdin, so its template hardcodes N = 5 —
                        Submit is only scored for C / C++.
                    </div>
                </div>

                {/* RIGHT: the generic Compiler, fed this question's languages */}
                <div className="min-h-0 bg-white">
                    <Compiler
                        ref={compilerRef}
                        languages={LANGUAGES}
                        initialLanguageId="cpp"
                        onOutputChange={handleOutputChange}
                        onLanguageChange={handleLanguageChange}
                    />
                </div>
            </div>
        </div>
    );
}