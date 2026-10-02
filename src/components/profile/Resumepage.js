import { useState, useRef, useEffect, useCallback } from "react";
import { Play, RotateCcw, ChevronLeft, ChevronRight, Check, Circle } from "lucide-react";

const COLORS = {
  bg: "#15151f",
  panel: "#1c1c29",
  panel2: "#20202f",
  line: "#2c2c3d",
  text: "#e7e7f0",
  textDim: "#9494a8",
  gold: "#f2c14e",
  blue: "#5fc9f3",
  green: "#7ee787",
  red: "#ff7b7b",
  console: "#0b0b12",
};

const MONO = "'JetBrains Mono', 'Courier New', monospace";
const SANS = "'Inter', system-ui, sans-serif";

const lessons = [
  {
    title: "Welcome & print()",
    body: [
      "Python is a general-purpose language prized for reading almost like plain English. This course covers every core topic, one idea at a time, with a real Python interpreter running right in this component so you can edit and run every example.",
      "The most basic statement is print() — it writes text to the output console.",
    ],
    code: `print("Hello, Python!")
print("This code runs for real — try editing it.")

# A comment starts with a hash — Python ignores this line
print(3 + 4)`,
  },
  {
    title: "Variables & Data Types",
    body: [
      "A variable is a name bound to a value. Python figures out the type automatically — this is called dynamic typing.",
      "Core types: int (whole numbers), float (decimals), str (text), bool (True/False). Use type() to check a variable's type.",
    ],
    code: `name = "Ada"
age = 28
height = 1.68
is_programmer = True

print(name, age, height, is_programmer)
print(type(name), type(age), type(height), type(is_programmer))`,
  },
  {
    title: "Operators",
    body: [
      "Python supports arithmetic (+ - * / // % **), comparison (== != > < >= <=), and logical (and, or, not) operators.",
      "/ always gives a float; // is floor (integer) division; % is the remainder; ** is exponent.",
    ],
    code: `a, b = 17, 5

print(a + b, a - b, a * b)
print(a / b)    # true division
print(a // b)   # floor division
print(a % b)    # remainder
print(a ** 2)   # power

print(a > b and b > 0)
print(not (a == b))`,
  },
  {
    title: "Strings",
    body: [
      "Strings are sequences of characters. They support indexing, slicing, and a large set of built-in methods.",
      "s[0] is the first character, s[1:4] slices from index 1 up to (not including) 4, and f-strings embed expressions directly.",
    ],
    code: `s = "Python Programming"

print(s[0])          # first char
print(s[-1])         # last char
print(s[0:6])        # slice
print(s.upper())
print(s.lower())
print(s.replace("Python", "Awesome"))
print(s.split(" "))

name, age = "Rina", 24
print(f"{name} is {age} years old")`,
  },
  {
    title: "Lists",
    body: ["A list is an ordered, mutable collection. You can append, remove, sort, and slice it."],
    code: `fruits = ["apple", "banana", "cherry"]
fruits.append("date")
fruits.insert(1, "avocado")
print(fruits)

fruits.remove("banana")
print(fruits)

print(fruits[1:3])       # slicing
print(len(fruits))
print(sorted(fruits))

numbers = [4, 1, 8, 2]
numbers.sort()
print(numbers)`,
  },
  {
    title: "Tuples",
    body: [
      "A tuple is like a list but immutable — once created it can't be changed. Great for fixed collections and for returning multiple values from a function.",
    ],
    code: `point = (3, 7)
print(point[0], point[1])

x, y = point   # unpacking
print(f"x={x}, y={y}")

colors = ("red", "green", "blue")
print(len(colors))

# colors[0] = "black"  # <- uncomment to see: tuples can't be modified`,
  },
  {
    title: "Dictionaries",
    body: ["A dict stores key-value pairs. Keys must be unique and (usually) immutable, like strings or numbers."],
    code: `person = {"name": "Sam", "age": 31, "city": "Austin"}

print(person["name"])
person["age"] = 32           # update
person["job"] = "Engineer"   # add new key
print(person)

for key, value in person.items():
    print(key, "->", value)

print(person.get("email", "not found"))`,
  },
  {
    title: "Sets",
    body: [
      "A set is an unordered collection of unique values — handy for removing duplicates and set algebra (union, intersection, difference).",
    ],
    code: `a = {1, 2, 3, 4}
b = {3, 4, 5, 6}

print(a | b)   # union
print(a & b)   # intersection
print(a - b)   # difference

nums = [1, 2, 2, 3, 3, 3]
unique = set(nums)
print(unique)`,
  },
  {
    title: "Conditionals",
    body: ["if / elif / else control which block of code runs, based on a condition."],
    code: `score = 78

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
else:
    grade = "F"

print(f"Score {score} -> Grade {grade}")

# ternary (conditional expression)
status = "pass" if score >= 60 else "fail"
print(status)`,
  },
  {
    title: "Loops",
    body: [
      "for loops iterate over a sequence. while loops repeat while a condition holds. break exits early, continue skips to the next iteration.",
    ],
    code: `for i in range(5):
    print("for i =", i)

fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    if fruit == "banana":
        continue
    print("fruit:", fruit)

n = 3
while n > 0:
    print("countdown", n)
    n -= 1
print("liftoff!")`,
  },
  {
    title: "Functions",
    body: [
      "A function packages reusable logic. Use def to define it, parameters to receive input, and return to send back a result. Parameters can have default values.",
    ],
    code: `def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

print(greet("Maya"))
print(greet("Leo", greeting="Hey"))

def add(*numbers):     # *args collects extra positional args
    return sum(numbers)

print(add(1, 2, 3, 4))

def describe(**info):  # **kwargs collects keyword args into a dict
    for k, v in info.items():
        print(k, ":", v)

describe(name="Kai", role="Developer")`,
  },
  {
    title: "Lambda Functions",
    body: [
      "A lambda is a small, anonymous, single-expression function — often used inline with functions like sorted(), map(), and filter().",
    ],
    code: `square = lambda x: x * x
print(square(5))

pairs = [(1, "b"), (2, "a"), (3, "c")]
pairs.sort(key=lambda p: p[1])
print(pairs)

nums = [1, 2, 3, 4, 5, 6]
evens = list(filter(lambda n: n % 2 == 0, nums))
doubled = list(map(lambda n: n * 2, nums))
print(evens)
print(doubled)`,
  },
  {
    title: "Comprehensions",
    body: ["Comprehensions build a new list, set, or dict from an existing iterable in a single readable line."],
    code: `squares = [x**2 for x in range(10)]
print(squares)

evens = [x for x in range(20) if x % 2 == 0]
print(evens)

word_lengths = {w: len(w) for w in ["cat", "elephant", "dog"]}
print(word_lengths)

unique_lengths = {len(w) for w in ["cat", "dog", "owl", "elephant"]}
print(unique_lengths)`,
  },
  {
    title: "Exception Handling",
    body: [
      "try / except lets a program handle errors gracefully instead of crashing. finally always runs, error or not.",
    ],
    code: `def safe_divide(a, b):
    try:
        result = a / b
    except ZeroDivisionError:
        print("Error: cannot divide by zero")
        return None
    except TypeError:
        print("Error: invalid types")
        return None
    else:
        print("Division succeeded")
        return result
    finally:
        print("Attempted a division")

print(safe_divide(10, 2))
print(safe_divide(10, 0))`,
  },
  {
    title: "File Handling",
    body: [
      "Python reads and writes files with open(), ideally inside a with block so the file closes automatically. This sandbox has a virtual filesystem, so file writes here are just for practice.",
    ],
    code: `with open("notes.txt", "w") as f:
    f.write("Line one\\n")
    f.write("Line two\\n")

with open("notes.txt", "r") as f:
    content = f.read()

print(content)

with open("notes.txt", "a") as f:
    f.write("Appended line\\n")

with open("notes.txt", "r") as f:
    for line in f:
        print("->", line.strip())`,
  },
  {
    title: "OOP: Classes & Objects",
    body: ["A class is a blueprint for objects. __init__ sets up new instances, and self refers to the current object."],
    code: `class Dog:
    def __init__(self, name, breed):
        self.name = name
        self.breed = breed

    def bark(self):
        return f"{self.name} says Woof!"

    def __str__(self):
        return f"Dog({self.name}, {self.breed})"

rex = Dog("Rex", "Labrador")
print(rex.bark())
print(rex)
print(rex.name, rex.breed)`,
  },
  {
    title: "Inheritance & Polymorphism",
    body: [
      "A class can inherit from another, reusing and extending its behavior. Overriding a method in the child class is polymorphism — the same method name behaves differently per class.",
    ],
    code: `class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return f"{self.name} makes a sound"

class Cat(Animal):
    def speak(self):
        return f"{self.name} says Meow!"

class Cow(Animal):
    def speak(self):
        return f"{self.name} says Moo!"

animals = [Cat("Whiskers"), Cow("Bessie"), Animal("Thing")]
for a in animals:
    print(a.speak())`,
  },
  {
    title: "Modules & Packages",
    body: ["A module is just a .py file of reusable code. Python's standard library ships many ready-made modules — import brings them in."],
    code: `import math
import random
import datetime

print(math.sqrt(64))
print(math.pi)

print(random.randint(1, 10))

today = datetime.date.today()
print("Today is:", today)`,
  },
  {
    title: "Generators & Iterators",
    body: [
      "A generator produces values lazily with yield, instead of building a whole list in memory at once — useful for large or infinite sequences.",
    ],
    code: `def countdown(n):
    while n > 0:
        yield n
        n -= 1

for value in countdown(5):
    print(value)

def fibonacci(limit):
    a, b = 0, 1
    while a < limit:
        yield a
        a, b = b, a + b

print(list(fibonacci(50)))`,
  },
  {
    title: "Decorators",
    body: [
      "A decorator is a function that wraps another function to add behavior — without changing its source code. It's applied with the @decorator_name syntax.",
    ],
    code: `import time

def timer(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} ran in {end - start:.6f}s")
        return result
    return wrapper

@timer
def slow_add(a, b):
    total = 0
    for _ in range(100000):
        total += 1
    return a + b

print(slow_add(2, 3))`,
  },
];

export default function PythonCourse() {
  const [current, setCurrent] = useState(0);
  const [completed, setCompleted] = useState(() => new Set());
  const [code, setCode] = useState(lessons[0].code);
  const [output, setOutput] = useState([]); // {kind, text}
  const [pyStatus, setPyStatus] = useState("loading"); // loading | ready | error
  const [running, setRunning] = useState(false);
  const pyodideRef = useRef(null);
  const consoleRef = useRef(null);

  // Load Pyodide once, on mount
  useEffect(() => {
    let cancelled = false;

    function loadScript() {
      return new Promise((resolve, reject) => {
        if (window.loadPyodide) {
          resolve();
          return;
        }
        const existing = document.querySelector('script[data-pyodide="true"]');
        if (existing) {
          existing.addEventListener("load", () => resolve());
          existing.addEventListener("error", reject);
          return;
        }
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/pyodide/v0.26.1/full/pyodide.js";
        script.async = true;
        script.dataset.pyodide = "true";
        script.onload = () => resolve();
        script.onerror = reject;
        document.head.appendChild(script);
      });
    }

    (async () => {
      try {
        await loadScript();
        if (cancelled) return;
        const pyodide = await window.loadPyodide();
        if (cancelled) return;
        pyodideRef.current = pyodide;
        setPyStatus("ready");
      } catch (e) {
        if (!cancelled) setPyStatus("error");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    setCode(lessons[current].code);
    setOutput([]);
  }, [current]);

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [output]);

  const runCode = useCallback(async () => {
    if (pyStatus !== "ready" || !pyodideRef.current) {
      setOutput((o) => [...o, { kind: "sys", text: "Python is still loading — try again in a moment…" }]);
      return;
    }
    setRunning(true);
    setOutput([]);
    const pyodide = pyodideRef.current;
    try {
      pyodide.runPython(`
import sys, io
sys.stdout = io.StringIO()
sys.stderr = io.StringIO()
`);
      let hadError = false;
      let errText = "";
      try {
        await pyodide.runPythonAsync(code);
      } catch (err) {
        hadError = true;
        const msg = String(err.message || err);
        errText = msg.split("\n").slice(-4).join("\n");
      }
      const out = pyodide.runPython("sys.stdout.getvalue()");
      const errOut = pyodide.runPython("sys.stderr.getvalue()");
      const lines = [];
      if (out) lines.push({ kind: "out", text: out.replace(/\n$/, "") });
      if (errOut) lines.push({ kind: "err", text: errOut.replace(/\n$/, "") });
      if (hadError) lines.push({ kind: "err", text: errText });
      if (!out && !errOut && !hadError) lines.push({ kind: "sys", text: "(no output)" });
      setOutput(lines);
      if (!hadError) {
        setCompleted((prev) => {
          const next = new Set(prev);
          next.add(current);
          return next;
        });
      }
    } catch (e) {
      setOutput([{ kind: "err", text: String(e) }]);
    }
    setRunning(false);
  }, [code, current, pyStatus]);

  const lesson = lessons[current];

  return (
    <div style={{ background: COLORS.bg, color: COLORS.text, fontFamily: SANS, minHeight: "100%", width: "100%" }}>
      {/* Top bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 22px",
          borderBottom: `1px solid ${COLORS.line}`,
          background: "linear-gradient(180deg,#181824,#15151f)",
          position: "sticky",
          top: 0,
          zIndex: 20,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: MONO, fontWeight: 800, fontSize: 18 }}>
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: 2,
              background: COLORS.gold,
              display: "inline-block",
              boxShadow: `0 0 10px ${COLORS.gold}`,
            }}
          />
          Py<span style={{ color: COLORS.blue }}>//</span>
          <span style={{ color: COLORS.textDim, fontWeight: 500, fontSize: 13, marginLeft: 4 }}>the complete course</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontFamily: MONO, fontSize: 12, color: COLORS.textDim }}>
            {completed.size} / {lessons.length} lessons
          </span>
          <div style={{ width: 140, height: 6, background: COLORS.line, borderRadius: 4, overflow: "hidden" }}>
            <div
              style={{
                height: "100%",
                background: `linear-gradient(90deg, ${COLORS.gold}, ${COLORS.blue})`,
                width: `${(completed.size / lessons.length) * 100}%`,
                transition: "width .4s ease",
              }}
            />
          </div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "stretch" }}>
        {/* Sidebar */}
        <div
          style={{
            width: 270,
            flexShrink: 0,
            borderRight: `1px solid ${COLORS.line}`,
            background: COLORS.panel,
            overflowY: "auto",
            maxHeight: "calc(100vh - 57px)",
            padding: "10px 0 30px",
          }}
        >
          <div
            style={{
              fontFamily: MONO,
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: 1.5,
              color: COLORS.textDim,
              padding: "12px 18px 6px",
            }}
          >
            Curriculum
          </div>
          {lessons.map((l, i) => {
            const active = i === current;
            const done = completed.has(i);
            return (
              <div
                key={l.title}
                onClick={() => setCurrent(i)}
                style={{
                  display: "flex",
                  gap: 10,
                  alignItems: "flex-start",
                  padding: "10px 18px",
                  cursor: "pointer",
                  borderLeft: `2px solid ${active ? COLORS.gold : "transparent"}`,
                  background: active ? COLORS.panel2 : "transparent",
                }}
              >
                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: 11,
                    color: active ? COLORS.gold : COLORS.textDim,
                    width: 22,
                    flexShrink: 0,
                    paddingTop: 2,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  style={{
                    fontSize: 13.5,
                    lineHeight: 1.35,
                    color: active ? COLORS.gold : COLORS.text,
                    fontWeight: active ? 600 : 400,
                    flex: 1,
                  }}
                >
                  {l.title}
                </span>
                {done ? (
                  <Check size={13} color={COLORS.green} style={{ marginTop: 2, flexShrink: 0 }} />
                ) : (
                  <Circle size={7} color={COLORS.line} style={{ marginTop: 5, flexShrink: 0 }} />
                )}
              </div>
            );
          })}
        </div>

        {/* Main */}
        <div style={{ flex: 1, padding: "32px 40px 70px", maxWidth: 860, overflowY: "auto" }}>
          <div style={{ fontFamily: MONO, color: COLORS.blue, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>
            Lesson {String(current + 1).padStart(2, "0")} of {lessons.length}
          </div>
          <h1 style={{ fontFamily: MONO, fontSize: 28, fontWeight: 800, margin: "0 0 16px", letterSpacing: -0.5 }}>{lesson.title}</h1>
          {lesson.body.map((p, i) => (
            <p key={i} style={{ fontSize: 15, lineHeight: 1.7, color: "#cfcfdd", margin: "0 0 14px" }}>
              {p}
            </p>
          ))}

          {/* Lab */}
          <div style={{ marginTop: 24, border: `1px solid ${COLORS.line}`, borderRadius: 10, overflow: "hidden", background: "#101018" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "9px 14px",
                background: COLORS.panel2,
                borderBottom: `1px solid ${COLORS.line}`,
              }}
            >
              <div style={{ display: "flex", gap: 6 }}>
                <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#ff5f56", display: "inline-block" }} />
                <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#ffbd2e", display: "inline-block" }} />
                <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#27c93f", display: "inline-block" }} />
              </div>
              <div style={{ fontFamily: MONO, fontSize: 11.5, color: COLORS.textDim }}>
                {pyStatus === "loading" && "loading python runtime…"}
                {pyStatus === "ready" && "sandbox.py"}
                {pyStatus === "error" && "runtime failed to load"}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <button
                  onClick={() => setCode(lesson.code)}
                  style={{
                    fontFamily: MONO,
                    fontSize: 12,
                    color: COLORS.textDim,
                    background: "none",
                    border: `1px solid ${COLORS.line}`,
                    padding: "6px 10px",
                    borderRadius: 6,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  <RotateCcw size={12} /> reset
                </button>
                <button
                  onClick={runCode}
                  disabled={running || pyStatus !== "ready"}
                  style={{
                    fontFamily: MONO,
                    fontSize: 12.5,
                    fontWeight: 700,
                    color: "#15151f",
                    background: COLORS.gold,
                    border: "none",
                    padding: "7px 14px",
                    borderRadius: 6,
                    cursor: running || pyStatus !== "ready" ? "wait" : "pointer",
                    opacity: running || pyStatus !== "ready" ? 0.5 : 1,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <Play size={12} fill="#15151f" />
                  {running ? "Running…" : pyStatus === "loading" ? "Loading…" : "Run"}
                </button>
              </div>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              style={{
                width: "100%",
                minHeight: 180,
                background: "#101018",
                color: "#f1f1f8",
                border: "none",
                outline: "none",
                fontFamily: MONO,
                fontSize: 13.5,
                lineHeight: 1.6,
                padding: 16,
                resize: "vertical",
                tabSize: 4,
              }}
            />
            <div
              ref={consoleRef}
              style={{
                borderTop: `1px solid ${COLORS.line}`,
                background: COLORS.console,
                padding: "12px 16px",
                fontFamily: MONO,
                fontSize: 13,
                minHeight: 44,
                maxHeight: 240,
                overflowY: "auto",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
            >
              {output.length === 0 ? (
                <span style={{ color: "#54546a" }}>Output will appear here. Click "Run" to execute this code.</span>
              ) : (
                output.map((line, i) => (
                  <div
                    key={i}
                    style={{
                      color: line.kind === "err" ? COLORS.red : line.kind === "sys" ? COLORS.textDim : "#d8d8e8",
                      fontStyle: line.kind === "sys" ? "italic" : "normal",
                    }}
                  >
                    {line.text}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Nav */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 30, gap: 12 }}>
            <button
              onClick={() => setCurrent((c) => Math.max(0, c - 1))}
              disabled={current === 0}
              style={{
                fontFamily: MONO,
                fontSize: 13,
                color: COLORS.text,
                background: COLORS.panel2,
                border: `1px solid ${COLORS.line}`,
                padding: "10px 16px",
                borderRadius: 8,
                cursor: current === 0 ? "default" : "pointer",
                opacity: current === 0 ? 0.3 : 1,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <ChevronLeft size={14} /> Previous
            </button>
            <button
              onClick={() => setCurrent((c) => Math.min(lessons.length - 1, c + 1))}
              disabled={current === lessons.length - 1}
              style={{
                fontFamily: MONO,
                fontSize: 13,
                color: COLORS.text,
                background: COLORS.panel2,
                border: `1px solid ${COLORS.line}`,
                padding: "10px 16px",
                borderRadius: 8,
                cursor: current === lessons.length - 1 ? "default" : "pointer",
                opacity: current === lessons.length - 1 ? 0.3 : 1,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              Next <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}