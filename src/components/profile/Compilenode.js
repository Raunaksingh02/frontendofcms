import React, { useRef, useState } from "react";
import Editor from "@monaco-editor/react";

export default function App() {
  const editorRef = useRef(null);
  const monacoRef = useRef(null);

  const [language, setLanguage] = useState("javascript");
  const [theme, setTheme] = useState("vs-dark");
  const [fontSize, setFontSize] = useState(16);

  const defaultCode = `// Welcome to Monaco Editor

function greet(name) {
  console.log("Hello " + name);
}

greet("Raunak");
`;

  // Tags that never need a closing tag (HTML void elements)
  const VOID_TAGS = new Set([
    "area", "base", "br", "col", "embed", "hr", "img", "input",
    "link", "meta", "param", "source", "track", "wbr",
  ]);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    monacoRef.current = monaco;
    editor.focus();

    // --- Auto-close HTML/JSX tags -------------------------------------
    // When the user types ">" right after an opening tag like <div> or
    // <span class="x">, automatically insert the matching </tag>.
    editor.onDidType((text) => {
      if (text !== ">") return;

      const model = editor.getModel();
      const position = editor.getPosition();
      if (!model || !position) return;

      const textUntilPosition = model.getValueInRange({
        startLineNumber: position.lineNumber,
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column,
      });

      // Skip self-closing tags like <br/> or <Foo />
      if (/\/\s*>$/.test(textUntilPosition)) return;

      // Match an opening tag: <TagName ...attrs...>
      const match = textUntilPosition.match(
        /<([a-zA-Z][a-zA-Z0-9.:-]*)(?:\s[^<>]*)?>$/
      );
      if (!match) return;

      const tagName = match[1];
      if (VOID_TAGS.has(tagName.toLowerCase())) return;

      editor.executeEdits("auto-close-tag", [
        {
          range: new monaco.Range(
            position.lineNumber,
            position.column,
            position.lineNumber,
            position.column
          ),
          text: `</${tagName}>`,
        },
      ]);

      // Put the cursor back right after the ">" (before the inserted closing tag)
      editor.setPosition(position);
    });
  }

  function showCode() {
    if (!editorRef.current) return;

    const code = editorRef.current.getValue();
    alert(code);
  }

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#1e1e1e",
      }}
    >
      {/* Toolbar */}
      <div
        style={{
          height: 60,
          display: "flex",
          alignItems: "center",
          gap: 15,
          padding: "0 20px",
          background: "#252526",
          borderBottom: "1px solid #333",
        }}
      >
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={{
            padding: 8,
            borderRadius: 6,
          }}
        >
          <option value="javascript">JavaScript</option>
          <option value="typescript">TypeScript</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
          <option value="json">JSON</option>
          <option value="markdown">Markdown</option>
          <option value="cpp">C++</option>
          <option value="c">C</option>
          <option value="java">Java</option>
          <option value="python">Python</option>
          <option value="sql">SQL</option>
        </select>

        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          style={{
            padding: 8,
            borderRadius: 6,
          }}
        >
          <option value="vs-dark">Dark</option>
          <option value="vs-light">Light</option>
          <option value="hc-black">High Contrast</option>
        </select>

        <input
          type="range"
          min="12"
          max="30"
          value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
        />

        <span style={{ color: "white" }}>
          Font: {fontSize}px
        </span>

        <button
          onClick={showCode}
          style={{
            marginLeft: "auto",
            padding: "10px 18px",
            cursor: "pointer",
            borderRadius: 6,
            border: "none",
            background: "#0078d4",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          Show Code
        </button>
      </div>

      {/* Monaco Editor */}
      <Editor
        height="100%"
        language={language}
        theme={theme}
        defaultValue={defaultCode}
        onMount={handleEditorDidMount}
        options={{
          fontSize,
          automaticLayout: true,
          minimap: {
            enabled: true,
          },
          wordWrap: "on",
          lineNumbers: "on",
          glyphMargin: true,
          folding: true,
          scrollBeyondLastLine: false,
          autoIndent: "full",
          formatOnPaste: true,
          formatOnType: true,

          // --- Autosuggestion ---
          quickSuggestions: {
            other: true,
            comments: true,
            strings: true,
          },
          quickSuggestionsDelay: 10,
          suggestOnTriggerCharacters: true,
          snippetSuggestions: "inline",
          wordBasedSuggestions: "currentDocument",
          parameterHints: { enabled: true },
          tabCompletion: "on",
          acceptSuggestionOnEnter: "on",
          suggestSelection: "first",
          suggest: {
            showKeywords: true,
            showSnippets: true,
            showWords: true,
            preview: true,
          },

          // --- Auto-closing brackets / quotes / surround ---
          autoClosingBrackets: "always",
          autoClosingQuotes: "always",
          autoClosingOvertype: "always",
          autoClosingDelete: "always",
          autoSurround: "languageDefined",
          matchBrackets: "always",

          bracketPairColorization: {
            enabled: true,
          },
          tabSize: 2,
          insertSpaces: true,
          smoothScrolling: true,
          cursorBlinking: "smooth",
          cursorSmoothCaretAnimation: "on",
          renderWhitespace: "selection",
          roundedSelection: true,
          mouseWheelZoom: true,
          padding: {
            top: 20,
            bottom: 20,
          },
        }}
      />
    </div>
  );
}