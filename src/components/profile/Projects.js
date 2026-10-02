

import React, { useState, useEffect, useRef, useCallback } from 'react';


const lessons = [
  {
    id: 'props',
    group: 'Fundamentals',
    title: 'Props',
    desc: 'Props let a parent component pass data down to a child. They are read-only — a child should never modify its own props.',
    code: `function Greeting({ name, role }) {
  return (
    <div style={{ fontFamily: 'sans-serif', padding: 8 }}>
      <h3>Hello, {name}!</h3>
      <p>Role: {role}</p>
    </div>
  );
}

function App() {

  return (
    <div>
      <Greeting name="Ava" role="Designer" />
      <Greeting name="Sam" role="Engineer" />
    </div>
  );
}

render(<App />);`,
  },
  {
    id: 'useState',
    group: 'Hooks',
    title: 'useState',
    desc: 'useState gives a component its own memory that persists between renders. Calling the setter schedules a re-render with the new value.',
    code: `function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h3>Count: {count}</h3>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
    </div>
  );
}

render(<App />);`,
  },
  {
    id: 'useEffect',
    group: 'Hooks',
    title: 'useEffect',
    desc: 'useEffect runs side effects after render. The dependency array controls when it re-runs — [] means "only once, on mount."',
    code: `function App() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h3>Elapsed: {seconds}s</h3>
      <p>A timer that started once, on mount.</p>
    </div>
  );
}

render(<App />);`,
  },
  {
    id: 'useContext',
    group: 'Hooks',
    title: 'useContext',
    desc: 'Context shares a value across many components without passing props manually at every level. useContext reads the nearest Provider value.',
    code: `const ThemeContext = React.createContext('light');

function ThemedBox() {
  const theme = useContext(ThemeContext);
  const isDark = theme === 'dark';
  return (
    <div style={{
      padding: 16,
      background: isDark ? '#222' : '#eee',
      color: isDark ? '#fff' : '#111',
      fontFamily: 'sans-serif'
    }}>
      Current theme: {theme}
    </div>
  );
}

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <ThemedBox />
    </ThemeContext.Provider>
  );
}

render(<App />);`,
  },
  {
    id: 'useRef',
    group: 'Hooks',
    title: 'useRef',
    desc: 'useRef creates a mutable value that survives re-renders but does NOT trigger one when changed. Commonly used for direct DOM access.',
    code: `function App() {
  const inputRef = useRef(null);

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <input ref={inputRef} placeholder="Click the button to focus me" style={{ padding: 6, width: 220 }} />
      <div style={{ marginTop: 8 }}>
        <button onClick={() => inputRef.current.focus()}>Focus input</button>
      </div>
    </div>
  );
}

render(<App />);`,
  },
  {
    id: 'useMemo',
    group: 'Hooks',
    title: 'useMemo',
    desc: 'useMemo caches the result of an expensive calculation and only recomputes it when its dependencies change.',
    code: `function slowSquare(n) {
  let total = 0;
  for (let i = 0; i < 200000000; i++) total += 1;
  return n * n;
}

function App() {
  const [num, setNum] = useState(4);
  const [text, setText] = useState('');
  const squared = useMemo(() => slowSquare(num), [num]);

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <p>{num} squared = {squared}</p>
      <button onClick={() => setNum(num + 1)}>Increase number</button>
      <div style={{ marginTop: 12 }}>
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Typing doesn't re-run slowSquare"
          style={{ padding: 6, width: 260 }}
        />
      </div>
    </div>
  );
}

render(<App />);`,
  },
  {
    id: 'useCallback',
    group: 'Hooks',
    title: 'useCallback',
    desc: 'useCallback returns a memoized function that keeps the same identity across renders unless its dependencies change — useful with memoized children.',
    code: `const Button = React.memo(({ onClick, children }) => {
  console.log('Button rendered:', children);
  return <button onClick={onClick} style={{ margin: 4 }}>{children}</button>;
});

function App() {
  const [count, setCount] = useState(0);
  const [other, setOther] = useState(0);
  const increment = useCallback(() => setCount(c => c + 1), []);

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <p>Count: {count}</p>
      <Button onClick={increment}>Increment</Button>
      <button onClick={() => setOther(other + 1)} style={{ margin: 4 }}>
        Re-render parent ({other})
      </button>
      <p style={{ fontSize: 12, color: '#666' }}>Check the console to see when Button re-renders.</p>
    </div>
  );
}

render(<App />);`,
  },
  {
    id: 'useReducer',
    group: 'Hooks',
    title: 'useReducer',
    desc: 'useReducer manages complex state logic through a reducer function, similar to Redux. Good when transitions depend on action type, not just a new value.',
    code: `function reducer(state, action) {
  switch (action.type) {
    case 'increment': return { count: state.count + 1 };
    case 'decrement': return { count: state.count - 1 };
    case 'reset': return { count: 0 };
    default: return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div style={{ fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h3>Count: {state.count}</h3>
      <button onClick={() => dispatch({ type: 'increment' })}>+1</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-1</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  );
}

render(<App />);`,
  },
  {
    id: 'useLayoutEffect',
    group: 'Hooks',
    title: 'useLayoutEffect',
    desc: 'useLayoutEffect fires synchronously after DOM mutations, before paint. Use it when you need to measure or adjust layout before the user sees anything.',
    code: `function App() {
  const boxRef = useRef(null);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    if (boxRef.current) {
      setWidth(boxRef.current.getBoundingClientRect().width);
    }
  }, []);

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <div ref={boxRef} style={{ padding: 16, background: '#eee', width: '60%' }}>
        Measured before paint
      </div>
      <p>Box width: {Math.round(width)}px</p>
    </div>
  );
}

render(<App />);`,
  },
];

const PROGRESS_KEY = 'react-course-progress';

/* ---------------- Build the iframe document ---------------- */
/* This mirrors the standalone HTML playground exactly: CDN React/ReactDOM/
   Babel, a #root div, and a script that compiles + renders the user's code.
   Running inside an iframe means it never shares a React tree, module
   graph, or bundler with the host app — no nested-root conflicts. */

function buildPreviewDoc(source) {
  const escapedSource = JSON.stringify(source);
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.development.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.development.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.23.5/babel.min.js"></script>
<style>
  html, body { margin: 0; padding: 16px; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; background: #fff; }
  #error { display: none; background: #fdecea; color: #a33; font-family: "SF Mono", Menlo, Consolas, monospace; font-size: 12px; padding: 12px; white-space: pre-wrap; border: 1px solid #f3c1bc; border-radius: 4px; margin-top: 12px; }
</style>
</head>
<body>
<div id="root"></div>
<div id="error"></div>
<script>
  window.onerror = function (message) {
    var el = document.getElementById('error');
    el.style.display = 'block';
    el.textContent = String(message);
    return true;
  };

  var errorEl = document.getElementById('error');
  function showError(err) {
    errorEl.style.display = 'block';
    errorEl.textContent = err.toString();
    if (window.parent) {
      window.parent.postMessage({ source: 'react-course-preview', type: 'error', message: err.toString() }, '*');
    }
  }

  try {
    var source = ${escapedSource};
    var transformed = Babel.transform(source, { presets: ['react'] }).code;

    var root = ReactDOM.createRoot(document.getElementById('root'));
    var render = function (element) { root.render(element); };
    var useState = React.useState;
    var useEffect = React.useEffect;
    var useRef = React.useRef;
    var useMemo = React.useMemo;
    var useCallback = React.useCallback;
    var useReducer = React.useReducer;
    var useContext = React.useContext;
    var useLayoutEffect = React.useLayoutEffect;

    var fn = new Function(
      'React', 'render', 'useState', 'useEffect', 'useRef', 'useMemo',
      'useCallback', 'useReducer', 'useContext', 'useLayoutEffect',
      transformed
    );
    fn(React, render, useState, useEffect, useRef, useMemo, useCallback, useReducer, useContext, useLayoutEffect);

    if (window.parent) {
      window.parent.postMessage({ source: 'react-course-preview', type: 'success' }, '*');
    }
  } catch (err) {
    showError(err);
  }
</script>
</body>
</html>`;
}

/* ---------------- Main component ---------------- */

export default function ReactCourse() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [code, setCode] = useState(lessons[0].code);
  const [compileError, setCompileError] = useState(null);
  const [progress, setProgress] = useState({});
  const textareaRef = useRef(null);
  const iframeRef = useRef(null);

  const lesson = lessons[currentIndex];

  // load progress from localStorage once
  useEffect(() => {
    try {
      const saved = localStorage.getItem(PROGRESS_KEY);
      if (saved) setProgress(JSON.parse(saved));
    } catch (e) {
      /* ignore */
    }
  }, []);

  // listen for error/success messages posted from inside the preview iframe
  useEffect(() => {
    const handler = (event) => {
      const data = event.data;
      if (!data || data.source !== 'react-course-preview') return;
      if (data.type === 'error') {
        setCompileError(data.message);
      } else {
        setCompileError(null);
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  const saveProgress = useCallback((next) => {
    setProgress(next);
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(next));
    } catch (e) {
      /* ignore */
    }
  }, []);

  const runCode = useCallback((source) => {
    setCompileError(null);
    if (iframeRef.current) {
      iframeRef.current.srcdoc = buildPreviewDoc(source);
    }
  }, []);

  // run whenever the lesson changes
  useEffect(() => {
    setCode(lesson.code);
    runCode(lesson.code);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  const handleKeyDown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      runCode(code);
    }
    if (e.key === 'Tab') {
      e.preventDefault();
      const el = textareaRef.current;
      const start = el.selectionStart;
      const end = el.selectionEnd;
      const next = code.substring(0, start) + '  ' + code.substring(end);
      setCode(next);
      requestAnimationFrame(() => {
        el.selectionStart = el.selectionEnd = start + 2;
      });
    }
  };

  const toggleDone = () => {
    const next = { ...progress, [lesson.id]: !progress[lesson.id] };
    saveProgress(next);
  };

  const doneCount = Object.values(progress).filter(Boolean).length;
  const pct = Math.round((doneCount / lessons.length) * 100);

  let lastGroup = null;

  return (
    <div style={styles.app}>
      <aside style={styles.sidebar}>
        <h1 style={styles.sidebarTitle}>React course</h1>
        <div style={{ padding: '0 16px 12px' }}>
          <div style={styles.progressBarBg}>
            <div style={{ ...styles.progressBarFill, width: `${pct}%` }} />
          </div>
          <div style={styles.progressText}>
            {doneCount} / {lessons.length} complete
          </div>
        </div>
        <div>
          {lessons.map((l, i) => {
            const showGroup = l.group !== lastGroup;
            lastGroup = l.group;
            const isActive = i === currentIndex;
            const isDone = !!progress[l.id];
            return (
              <React.Fragment key={l.id}>
                {showGroup && <div style={styles.groupLabel}>{l.group}</div>}
                <div
                  onClick={() => setCurrentIndex(i)}
                  style={{
                    ...styles.lessonItem,
                    ...(isActive ? styles.lessonItemActive : {}),
                  }}
                >
                  <span
                    style={{
                      ...styles.check,
                      ...(isDone ? styles.checkDone : {}),
                    }}
                  >
                    ✓
                  </span>
                  <span style={{ color: isActive ? '#fff' : '#bbb' }}>{l.title}</span>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </aside>

      <main style={styles.main}>
        <header style={styles.header}>
          <div>
            <div style={styles.headerTitle}>{lesson.title}</div>
            <div style={styles.headerSub}>
              {currentIndex + 1} of {lessons.length} — {lesson.group}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              style={styles.btnSecondary}
              onClick={() => {
                setCode(lesson.code);
                runCode(lesson.code);
              }}
            >
              Reset code
            </button>
            <button
              style={{
                ...styles.btnSecondary,
                ...(progress[lesson.id] ? styles.btnDone : {}),
              }}
              onClick={toggleDone}
            >
              {progress[lesson.id] ? 'Completed ✓' : 'Mark complete'}
            </button>
            <button style={styles.btnPrimary} onClick={() => runCode(code)}>
              Run ▶
            </button>
          </div>
        </header>

        <div style={styles.description} dangerouslySetInnerHTML={{ __html: lesson.desc }} />

        <div style={styles.split}>
          <div style={styles.pane}>
            <div style={styles.paneLabel}>Code (JSX)</div>
            <textarea
              ref={textareaRef}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              style={styles.textarea}
            />
          </div>
          <div style={styles.divider} />
          <div style={styles.pane}>
            <div style={styles.paneLabel}>Preview</div>
            <iframe
              ref={iframeRef}
              title="React preview"
              style={styles.previewFrame}
            />
            {compileError && <div style={styles.errorBox}>{compileError}</div>}
          </div>
        </div>
      </main>
    </div>
  );
}

/* ---------------- Inline styles (drop-in, no CSS file needed) ---------------- */

const styles = {
  app: {
    display: 'flex',
    height: '100vh',
    background: '#1e1e1e',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    overflow: 'hidden',
  },
  sidebar: {
    width: 250,
    flexShrink: 0,
    background: '#181818',
    borderRight: '1px solid #333',
    overflowY: 'auto',
  },
  sidebarTitle: { fontSize: 14, color: '#eee', padding: '16px 16px 8px', margin: 0 },
  progressBarBg: { height: 6, background: '#333', borderRadius: 3, overflow: 'hidden' },
  progressBarFill: { height: '100%', background: '#4caf50', transition: 'width 0.3s' },
  progressText: { fontSize: 11, color: '#888', marginTop: 6 },
  groupLabel: {
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    color: '#666',
    padding: '14px 16px 4px',
  },
  lessonItem: {
    padding: '10px 16px',
    fontSize: 13,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    borderLeft: '3px solid transparent',
  },
  lessonItemActive: { background: '#232323', borderLeftColor: '#0e639c' },
  check: {
    width: 16,
    height: 16,
    borderRadius: '50%',
    border: '1.5px solid #555',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 10,
    color: 'transparent',
  },
  checkDone: { background: '#4caf50', borderColor: '#4caf50', color: '#fff' },
  main: { flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 },
  header: {
    padding: '10px 16px',
    background: '#252526',
    color: '#ddd',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid #333',
    flexShrink: 0,
  },
  headerTitle: { fontSize: 14, fontWeight: 600 },
  headerSub: { fontSize: 11, color: '#888', marginTop: 2 },
  btnPrimary: {
    background: '#0e639c',
    color: '#fff',
    border: 'none',
    padding: '6px 14px',
    borderRadius: 4,
    fontSize: 13,
    cursor: 'pointer',
  },
  btnSecondary: {
    background: 'transparent',
    border: '1px solid #444',
    color: '#ccc',
    padding: '6px 14px',
    borderRadius: 4,
    fontSize: 13,
    cursor: 'pointer',
  },
  btnDone: { background: '#2e5a30', borderColor: '#2e5a30', color: '#fff' },
  description: {
    background: '#202020',
    color: '#ccc',
    padding: '12px 16px',
    fontSize: 13,
    lineHeight: 1.6,
    borderBottom: '1px solid #333',
    flexShrink: 0,
    maxHeight: 140,
    overflowY: 'auto',
  },
  split: { flex: 1, display: 'flex', minHeight: 0 },
  pane: { flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, minHeight: 0 },
  paneLabel: {
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: '#888',
    padding: '6px 12px',
    background: '#252526',
    borderBottom: '1px solid #333',
    flexShrink: 0,
  },
  textarea: {
    flex: 1,
    background: '#1e1e1e',
    color: '#d4d4d4',
    border: 'none',
    outline: 'none',
    resize: 'none',
    padding: 12,
    fontFamily: '"SF Mono", Menlo, Consolas, monospace',
    fontSize: 13,
    lineHeight: 1.5,
    tabSize: 2,
    whiteSpace: 'pre',
  },
  previewFrame: { flex: 1, width: '100%', border: 'none', background: '#fff' },
  errorBox: {
    background: '#3a1d1d',
    color: '#ff8080',
    fontFamily: '"SF Mono", Menlo, Consolas, monospace',
    fontSize: 12,
    padding: 12,
    whiteSpace: 'pre-wrap',
    borderTop: '2px solid #b33',
    flexShrink: 0,
    maxHeight: 120,
    overflowY: 'auto',
  },
  divider: { width: 1, background: '#333' },
};