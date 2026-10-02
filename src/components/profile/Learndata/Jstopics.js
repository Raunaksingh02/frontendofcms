const jsTopics = [
  {
    id: "js-intro",
    title: "Introduction to JavaScript & Syntax",
    summary: "What JavaScript is, and how code is structured on a page.",
    theory:
      "JavaScript is the programming language of the web — it adds interactivity, logic, and dynamic behavior that HTML and CSS alone can't provide. It runs directly in the browser (and, via Node.js, on servers too), executing statements sequentially, top to bottom, unless control flow says otherwise.\n\nJavaScript is embedded in a page via <script> tags, either inline or linked with src. Statements typically end with a semicolon (technically optional due to automatic semicolon insertion, but explicit semicolons avoid subtle bugs). console.log() is the most common tool for inspecting values while learning or debugging.",
    keyPoints: [
      "<script src=\"app.js\"></script> links external JS; place before </body> or use defer.",
      "JavaScript is case-sensitive: myVar and MyVar are different identifiers.",
      "console.log() prints values to the browser's developer console for debugging.",
      "Comments use // for single-line and /* */ for multi-line, ignored at runtime.",
    ],
    example:
      "// This is a comment\nconsole.log(\"Hello, JavaScript!\");\n\nlet score = 10;\nscore = score + 5;\nconsole.log(\"Score is:\", score);",
    quiz: [
      {
        question: "What does console.log() do?",
        options: [
          "Deletes a variable",
          "Prints a value to the browser's developer console",
          "Creates a new HTML element",
          "Sends data to a server",
        ],
        correctIndex: 1,
        explanation: "console.log is the primary tool for inspecting values during development.",
      },
      {
        question: "Is JavaScript case-sensitive?",
        options: ["No", "Yes, myVar and MyVar are different variables", "Only for function names", "Only in strict mode"],
        correctIndex: 1,
        explanation: "Identifiers in JavaScript are case-sensitive throughout.",
      },
      {
        question: "How do you write a single-line comment in JavaScript?",
        options: ["<!-- comment -->", "# comment", "// comment", "' comment"],
        correctIndex: 2,
        explanation: "// starts a comment that runs to the end of the line.",
      },
    ],
  },
  {
    id: "js-variables",
    title: "Variables (var, let, const)",
    summary: "Declaring and storing values with the right keyword.",
    theory:
      "Variables store values for later use. Modern JavaScript has three declaration keywords: var (old, function-scoped, avoid in new code), let (block-scoped, reassignable), and const (block-scoped, cannot be reassigned after declaration).\n\nBlock scoping (let/const) means a variable only exists within the nearest {} it's declared in — inside an if block or loop, for example — which prevents the accidental leakage that var was notorious for. const doesn't mean the value is fully immutable, though: an array or object declared with const can still have its contents changed, just not be reassigned to a completely new value.",
    keyPoints: [
      "Prefer const by default; use let only when you know the variable needs reassignment.",
      "var is function-scoped and hoisted in confusing ways — avoid it in modern code.",
      "const prevents reassignment, but object/array contents declared with const are still mutable.",
      "Declaring a variable without initializing it (let x;) gives it the value undefined.",
    ],
    example:
      "const name = \"Ada\";\nlet age = 30;\nage = 31; // OK, let can be reassigned\n\nconst scores = [10, 20];\nscores.push(30); // OK, mutating contents is fine\n// scores = []; would throw an error — can't reassign a const",
    quiz: [
      {
        question: "Which declaration should you default to unless you need reassignment?",
        options: ["var", "let", "const", "static"],
        correctIndex: 2,
        explanation: "const communicates intent clearly and prevents accidental reassignment.",
      },
      {
        question: "Can the contents of a const array be changed?",
        options: [
          "No, const makes everything fully immutable",
          "Yes, only reassigning the variable itself is disallowed",
          "Only with var",
          "Only inside functions",
        ],
        correctIndex: 1,
        explanation: "const locks the binding, not the value's internal mutability.",
      },
      {
        question: "What is the main problem with var that let/const solve?",
        options: [
          "var is slower to execute",
          "var is function-scoped (not block-scoped), causing scope leakage bugs",
          "var can't hold numbers",
          "var requires semicolons",
        ],
        correctIndex: 1,
        explanation: "let/const respect block boundaries like if and for, unlike var.",
      },
    ],
  },
  {
    id: "js-data-types",
    title: "Data Types & Type Conversion",
    summary: "The kinds of values JavaScript works with, and converting between them.",
    theory:
      "JavaScript has a handful of primitive types: string, number (both integers and decimals — there's no separate int/float type), boolean, undefined, null, and symbol/bigint (advanced). Non-primitives are objects, including arrays and functions.\n\nBecause JavaScript is loosely typed, values often get implicitly converted ('coerced') in comparisons and operations, which can cause surprises — \"5\" + 1 produces \"51\" (string concatenation), while \"5\" - 1 produces 4 (numeric conversion, since - has no string meaning). typeof is the tool for checking a value's type at runtime, and functions like Number(), String(), and Boolean() perform explicit conversion.",
    keyPoints: [
      "typeof value returns a string naming the type, e.g. \"string\", \"number\", \"boolean\".",
      "+ between a string and number concatenates; other operators (-, *, /) coerce to numbers.",
      "null means 'intentionally empty'; undefined means 'not yet assigned'.",
      "Use === (strict equality) instead of == to avoid unexpected type coercion in comparisons.",
    ],
    example:
      "console.log(typeof \"hello\");     // \"string\"\nconsole.log(typeof 42);          // \"number\"\nconsole.log(\"5\" + 1);            // \"51\"\nconsole.log(\"5\" - 1);            // 4\nconsole.log(Number(\"42\"));       // 42\nconsole.log(String(42));         // \"42\"\nconsole.log(1 === \"1\");          // false\nconsole.log(1 == \"1\");           // true",
    quiz: [
      {
        question: "What does typeof \"hello\" return?",
        options: ["\"text\"", "\"string\"", "\"str\"", "undefined"],
        correctIndex: 1,
        explanation: "typeof reports \"string\" for any string value.",
      },
      {
        question: "What does \"5\" + 1 evaluate to?",
        options: ["6", "\"51\"", "\"6\"", "NaN"],
        correctIndex: 1,
        explanation: "+ with a string operand triggers string concatenation, not addition.",
      },
      {
        question: "Why is === generally preferred over ==?",
        options: [
          "=== is faster to type",
          "=== avoids implicit type coercion, comparing both value and type",
          "== doesn't work with numbers",
          "There's no real difference",
        ],
        correctIndex: 1,
        explanation: "Strict equality prevents surprising coercions like 1 == \"1\" being true.",
      },
    ],
  },
  {
    id: "js-operators",
    title: "Operators & Expressions",
    summary: "Arithmetic, comparison, logical, and assignment operators.",
    theory:
      "Operators combine values into expressions. Arithmetic operators (+, -, *, /, %, **) do math; comparison operators (===, !==, <, >, <=, >=) produce booleans; logical operators (&&, ||, !) combine or invert boolean logic.\n\n&& and || are also used for more than plain booleans in real code: value && fallback runs the second operand only if the first is truthy (useful for conditional execution), while value || fallback returns the first truthy value (a common way to supply a default). The newer ?? (nullish coalescing) is similar to || but only falls back on null/undefined, not other falsy values like 0 or \"\".",
    keyPoints: [
      "% is the remainder/modulo operator: 7 % 3 is 1.",
      "&& short-circuits: if the first operand is falsy, the second is never evaluated.",
      "|| returns the first truthy operand — commonly used for default values.",
      "?? only falls back on null/undefined, unlike || which falls back on any falsy value.",
    ],
    example:
      "const a = 7 % 3;         // 1\nconst isAdult = 20 >= 18; // true\n\nconst username = \"\" || \"Guest\";   // \"Guest\" (empty string is falsy)\nconst count = 0 ?? 10;             // 0 (0 is not null/undefined, so no fallback)\n\nconsole.log(a, isAdult, username, count);",
    quiz: [
      {
        question: "What does 7 % 3 evaluate to?",
        options: ["2.33", "1", "21", "4"],
        correctIndex: 1,
        explanation: "% returns the remainder of division: 7 divided by 3 leaves remainder 1.",
      },
      {
        question: "What is the key difference between || and ?? for defaults?",
        options: [
          "They behave identically",
          "?? only falls back on null/undefined; || falls back on any falsy value (0, \"\", false)",
          "|| is newer than ??",
          "?? only works with numbers",
        ],
        correctIndex: 1,
        explanation: "This distinction matters when 0 or \"\" are valid, intentional values.",
      },
      {
        question: "What does && do when the first operand is falsy?",
        options: [
          "It still evaluates the second operand",
          "It short-circuits and returns the first (falsy) operand without evaluating the second",
          "It throws an error",
          "It returns true",
        ],
        correctIndex: 1,
        explanation: "&& short-circuits on a falsy left operand, skipping the right side entirely.",
      },
    ],
  },
  {
    id: "js-conditionals",
    title: "Conditional Statements",
    summary: "Branching logic with if/else and switch.",
    theory:
      "Conditionals let code make decisions. if executes a block only when its condition is truthy; else if chains additional conditions; else is the catch-all fallback. Any value can be used as a condition — JavaScript coerces it to true/false, and values like 0, \"\", null, undefined, and NaN are all 'falsy' (everything else is 'truthy').\n\nswitch is an alternative to long if/else if chains when comparing one value against many possible exact matches. Each case needs a break to prevent 'fall-through' into the next case (which is sometimes intentional, but usually a bug if forgotten).",
    keyPoints: [
      "Falsy values: 0, \"\", null, undefined, NaN, false — everything else is truthy.",
      "else if chains are evaluated top to bottom; the first true condition wins.",
      "switch compares with strict equality (===) against each case value.",
      "Forgetting break in a switch case causes execution to 'fall through' into the next case.",
    ],
    example:
      "const grade = 85;\n\nif (grade >= 90) {\n  console.log(\"A\");\n} else if (grade >= 80) {\n  console.log(\"B\");\n} else {\n  console.log(\"C or below\");\n}\n\nswitch (\"tue\") {\n  case \"mon\":\n    console.log(\"Monday\");\n    break;\n  case \"tue\":\n    console.log(\"Tuesday\");\n    break;\n  default:\n    console.log(\"Other day\");\n}",
    quiz: [
      {
        question: "Which of these values is falsy in JavaScript?",
        options: ["\"0\" (string)", "[] (empty array)", "0 (number)", "{} (empty object)"],
        correctIndex: 2,
        explanation: "The number 0 is falsy; empty strings/arrays/objects other than \"\" are actually truthy.",
      },
      {
        question: "What happens if you forget break in a switch case?",
        options: [
          "A syntax error occurs",
          "Execution falls through into the next case",
          "The switch statement is skipped entirely",
          "Nothing, break is optional and has no effect",
        ],
        correctIndex: 1,
        explanation: "Without break, execution continues into subsequent cases regardless of their match.",
      },
      {
        question: "In an if/else if chain, how many blocks can execute?",
        options: [
          "All matching blocks execute",
          "Only the first block whose condition is true",
          "Only the last block",
          "Exactly one block always executes, even if none match",
        ],
        correctIndex: 1,
        explanation: "The chain stops at the first true condition; else is only reached if none matched.",
      },
    ],
  },
  {
    id: "js-loops",
    title: "Loops (for, while, do-while)",
    summary: "Repeating code with different loop constructs.",
    theory:
      "Loops repeat a block of code. The classic for loop packs initialization, condition, and increment into one line: for (let i = 0; i < 5; i++) { ... }, ideal when you know how many iterations you need. while checks its condition before each iteration, looping as long as it's true — useful when the iteration count isn't known upfront.\n\ndo-while is similar to while but checks the condition after running the block, guaranteeing at least one execution. for...of iterates over the values of an iterable (arrays, strings), while for...in iterates over the enumerable keys of an object — a common source of confusion for beginners since they serve different purposes.",
    keyPoints: [
      "for (let i = 0; i < n; i++) is the standard counted loop.",
      "while checks its condition before running; do-while checks after, guaranteeing one run.",
      "for...of iterates values (arrays, strings); for...in iterates object keys.",
      "break exits a loop entirely; continue skips to the next iteration.",
    ],
    example:
      "for (let i = 0; i < 3; i++) {\n  console.log(\"i =\", i);\n}\n\nconst fruits = [\"apple\", \"banana\", \"cherry\"];\nfor (const fruit of fruits) {\n  console.log(fruit);\n}\n\nlet n = 0;\nwhile (n < 3) {\n  console.log(\"n =\", n);\n  n++;\n}",
    quiz: [
      {
        question: "Which loop guarantees the body runs at least once?",
        options: ["for", "while", "do-while", "for...of"],
        correctIndex: 2,
        explanation: "do-while checks its condition after the first execution, so the body always runs once.",
      },
      {
        question: "What does for...of iterate over for an array?",
        options: ["The array's indices", "The array's values", "The array's keys as strings", "Nothing, it's for objects only"],
        correctIndex: 1,
        explanation: "for...of gives you each value directly, unlike for...in which gives keys/indices.",
      },
      {
        question: "What does continue do inside a loop?",
        options: [
          "Exits the loop immediately",
          "Skips the rest of the current iteration and moves to the next one",
          "Restarts the loop from the beginning",
          "Pauses execution",
        ],
        correctIndex: 1,
        explanation: "continue jumps to the next iteration, skipping remaining code in the current one.",
      },
    ],
  },
  {
    id: "js-functions",
    title: "Functions & Arrow Functions",
    summary: "Reusable blocks of logic, in classic and modern arrow syntax.",
    theory:
      "Functions package reusable logic. A function declaration (function greet() {}) is hoisted (usable before its definition in the file) and has its own this binding. Arrow functions (const greet = () => {}) are a more concise modern syntax, and crucially do not have their own this — they inherit it from the surrounding scope, which makes them especially useful inside callbacks and class methods.\n\nParameters can have default values (function greet(name = \"Guest\")), and the rest parameter (...args) collects any number of extra arguments into an array. Every function that doesn't explicitly return a value returns undefined.",
    keyPoints: [
      "function declarations are hoisted; function expressions/arrow functions are not.",
      "Arrow functions don't bind their own this — they use the enclosing scope's this.",
      "Default parameters: function f(x = 10) uses 10 if no argument (or undefined) is passed.",
      "Rest parameters (...args) gather extra arguments into a real array.",
    ],
    example:
      "function add(a, b) {\n  return a + b;\n}\n\nconst multiply = (a, b) => a * b;\n\nfunction sum(...numbers) {\n  return numbers.reduce((total, n) => total + n, 0);\n}\n\nconsole.log(add(2, 3));       // 5\nconsole.log(multiply(2, 3));  // 6\nconsole.log(sum(1, 2, 3, 4)); // 10",
    quiz: [
      {
        question: "What is a key behavioral difference of arrow functions vs regular functions?",
        options: [
          "Arrow functions can't take parameters",
          "Arrow functions don't have their own this — they inherit it from the enclosing scope",
          "Arrow functions are always hoisted, just like declarations",
          "Arrow functions can't return values",
        ],
        correctIndex: 1,
        explanation: "This is one of the most important practical differences, especially inside callbacks.",
      },
      {
        question: "What does a function return if it has no explicit return statement?",
        options: ["null", "0", "undefined", "An error is thrown"],
        correctIndex: 2,
        explanation: "Functions implicitly return undefined when no return statement executes.",
      },
      {
        question: "What does the rest parameter ...args collect?",
        options: [
          "Only the first argument",
          "All remaining arguments into a real array",
          "The function's name",
          "Nothing, it's invalid syntax",
        ],
        correctIndex: 1,
        explanation: "Rest parameters gather any number of trailing arguments into an array.",
      },
    ],
  },
  {
    id: "js-arrays",
    title: "Arrays & Array Methods",
    summary: "Ordered collections and the methods that transform them.",
    theory:
      "Arrays store ordered lists of values, indexed from 0. Beyond basic access (arr[0]) and mutation (push, pop, splice), modern JavaScript favors a set of higher-order methods that don't mutate the original array: map() transforms each element into a new array, filter() keeps only elements matching a condition, and reduce() folds the array down into a single accumulated value.\n\nThese three (map/filter/reduce) form the backbone of functional-style array processing in JS and are far more common in modern code than manual for loops for transforming data.",
    keyPoints: [
      "push/pop add/remove from the end; shift/unshift add/remove from the start.",
      "map() returns a new array of transformed values, same length as the original.",
      "filter() returns a new array containing only elements that pass a test function.",
      "reduce() combines all elements into a single value using an accumulator function.",
    ],
    example:
      "const nums = [1, 2, 3, 4, 5];\n\nconst doubled = nums.map(n => n * 2);\nconst evens = nums.filter(n => n % 2 === 0);\nconst total = nums.reduce((sum, n) => sum + n, 0);\n\nconsole.log(doubled); // [2, 4, 6, 8, 10]\nconsole.log(evens);   // [2, 4]\nconsole.log(total);   // 15",
    quiz: [
      {
        question: "What does array.map() return?",
        options: [
          "A single value",
          "A new array with each element transformed, same length as the original",
          "A boolean",
          "It mutates the original array in place",
        ],
        correctIndex: 1,
        explanation: "map() produces a brand-new array, leaving the original untouched.",
      },
      {
        question: "What does array.filter() do?",
        options: [
          "Removes duplicate values",
          "Returns a new array containing only elements that pass a test function",
          "Sorts the array",
          "Mutates the array by removing failing elements in place",
        ],
        correctIndex: 1,
        explanation: "filter() builds a new array of only the elements where the callback returns true.",
      },
      {
        question: "In reduce((sum, n) => sum + n, 0), what does the 0 represent?",
        options: [
          "The array's starting index",
          "The initial value of the accumulator",
          "The number of iterations",
          "It's ignored",
        ],
        correctIndex: 1,
        explanation: "The second argument to reduce sets the accumulator's starting value.",
      },
    ],
  },
  {
    id: "js-objects",
    title: "Objects & Object Methods",
    summary: "Key-value data structures and how to work with them.",
    theory:
      "Objects store data as key-value pairs, ideal for representing structured entities like a user or product. Properties are accessed with dot notation (obj.name) or bracket notation (obj[\"name\"]) — bracket notation is required when the key is dynamic or not a valid identifier.\n\nObject.keys(), Object.values(), and Object.entries() extract an object's keys, values, or [key, value] pairs respectively, often for iteration. The spread operator ({...obj, newProp: 1}) creates a shallow copy with additional or overridden properties, a common pattern for immutable updates.",
    keyPoints: [
      "Dot notation (obj.key) for known static keys; bracket notation (obj[key]) for dynamic keys.",
      "Object.keys(obj) / Object.values(obj) / Object.entries(obj) extract parts for iteration.",
      "Spread ({...obj}) shallow-copies an object, useful for immutable-style updates.",
      "delete obj.key removes a property from an object entirely.",
    ],
    example:
      "const user = { name: \"Ada\", age: 30 };\n\nconsole.log(user.name);         // \"Ada\"\nconsole.log(user[\"age\"]);       // 30\n\nconst updated = { ...user, age: 31 };\nconsole.log(updated);           // { name: \"Ada\", age: 31 }\n\nconsole.log(Object.keys(user)); // [\"name\", \"age\"]",
    quiz: [
      {
        question: "When is bracket notation (obj[key]) required instead of dot notation?",
        options: [
          "Never, dot notation always works",
          "When the key is stored in a variable or isn't a valid identifier",
          "Only for arrays",
          "Only for numeric properties",
        ],
        correctIndex: 1,
        explanation: "Bracket notation allows dynamic/computed keys that dot notation can't express.",
      },
      {
        question: "What does {...user, age: 31} do?",
        options: [
          "Mutates user.age directly",
          "Creates a new object with user's properties, overriding age to 31",
          "Deletes the age property",
          "Throws a syntax error",
        ],
        correctIndex: 1,
        explanation: "Spread copies existing properties first; later keys override earlier ones.",
      },
      {
        question: "What does Object.keys(obj) return?",
        options: [
          "An array of the object's values",
          "An array of the object's own property names",
          "A single string of all keys",
          "The number of properties",
        ],
        correctIndex: 1,
        explanation: "Object.keys returns an array of the object's enumerable own key names.",
      },
    ],
  },
  {
    id: "js-dom",
    title: "DOM Manipulation",
    summary: "Reading and changing page content from JavaScript.",
    theory:
      "The DOM (Document Object Model) is the browser's live, in-memory representation of the page as a tree of nodes. JavaScript can query it with methods like document.querySelector() (returns the first match) and document.querySelectorAll() (returns all matches), using standard CSS selector syntax.\n\nOnce you have a reference to an element, you can read/change its content (textContent, innerHTML), attributes (setAttribute, classList), and styles (element.style.property). innerHTML parses and inserts raw HTML — powerful, but risky with untrusted input since it can execute injected scripts (a common source of XSS vulnerabilities).",
    keyPoints: [
      "querySelector('.card') / querySelectorAll('.card') use CSS selector syntax to find elements.",
      "textContent sets plain text safely; innerHTML parses HTML and can be an XSS risk with untrusted input.",
      "classList.add/remove/toggle manages CSS classes without manually string-editing className.",
      "createElement() + appendChild() build and insert new nodes programmatically.",
    ],
    example:
      "const title = document.querySelector(\"h1\");\ntitle.textContent = \"Updated Title\";\ntitle.classList.add(\"highlight\");\n\nconst newItem = document.createElement(\"li\");\nnewItem.textContent = \"New item\";\ndocument.querySelector(\"ul\").appendChild(newItem);",
    quiz: [
      {
        question: "What does document.querySelector('.card') return?",
        options: [
          "All elements with class 'card' as an array",
          "The first element matching that CSS selector, or null if none",
          "A boolean indicating if the class exists",
          "The number of matching elements",
        ],
        correctIndex: 1,
        explanation: "querySelector always returns a single element (the first match) or null.",
      },
      {
        question: "Why is textContent generally safer than innerHTML for untrusted input?",
        options: [
          "textContent is faster to type",
          "textContent inserts plain text without parsing it as HTML, avoiding script injection",
          "innerHTML doesn't work on all browsers",
          "There's no safety difference",
        ],
        correctIndex: 1,
        explanation: "innerHTML parses and can execute embedded HTML/scripts, a classic XSS vector.",
      },
      {
        question: "What does classList.toggle('active') do?",
        options: [
          "Always adds the class",
          "Always removes the class",
          "Adds the class if absent, removes it if present",
          "Renames the class",
        ],
        correctIndex: 2,
        explanation: "toggle flips the class's presence based on its current state.",
      },
    ],
  },
  {
    id: "js-events",
    title: "Events & Event Listeners",
    summary: "Responding to user interaction with addEventListener.",
    theory:
      "Events are how JavaScript reacts to things happening — clicks, key presses, form submissions, page loads. addEventListener(type, handler) attaches a function to run when that event fires on an element, and is preferred over inline onclick=\"\" attributes because it cleanly separates behavior from markup and allows multiple listeners on the same event.\n\nThe handler function receives an event object with useful details: event.target (what triggered it), and methods like event.preventDefault() (stop the browser's default behavior, e.g. a form actually submitting) and event.stopPropagation() (stop the event from bubbling up to parent elements).",
    keyPoints: [
      "element.addEventListener('click', handler) is the standard modern way to handle events.",
      "event.preventDefault() stops default browser behavior (like a link navigating or form submitting).",
      "event.target refers to the actual element that triggered the event.",
      "Events bubble upward through ancestors by default; stopPropagation() halts that bubbling.",
    ],
    example:
      "const btn = document.querySelector(\"#save\");\n\nbtn.addEventListener(\"click\", (event) => {\n  event.preventDefault();\n  console.log(\"Clicked:\", event.target);\n});\n\ndocument.querySelector(\"form\").addEventListener(\"submit\", (e) => {\n  e.preventDefault();\n  console.log(\"Form intercepted, no page reload.\");\n});",
    quiz: [
      {
        question: "Why prefer addEventListener over an inline onclick attribute?",
        options: [
          "addEventListener is deprecated, so it should be avoided",
          "It separates behavior from markup and allows multiple listeners on one event",
          "Inline onclick doesn't work in any modern browser",
          "There's no practical difference",
        ],
        correctIndex: 1,
        explanation: "addEventListener is more flexible and keeps HTML and behavior decoupled.",
      },
      {
        question: "What does event.preventDefault() do?",
        options: [
          "Stops the event from bubbling to parent elements",
          "Cancels the browser's default action for that event, like form submission",
          "Removes the event listener",
          "Logs the event to the console",
        ],
        correctIndex: 1,
        explanation: "preventDefault stops the built-in browser behavior tied to that event.",
      },
      {
        question: "What does event.target refer to?",
        options: [
          "The element the listener was attached to, always",
          "The actual element that triggered/originated the event",
          "The document object",
          "The event's type as a string",
        ],
        correctIndex: 1,
        explanation: "target is the specific element the event actually originated from.",
      },
    ],
  },
  {
    id: "js-strings",
    title: "String Methods",
    summary: "Common operations for working with text.",
    theory:
      "Strings are immutable in JavaScript — methods like toUpperCase(), slice(), and replace() all return a new string rather than modifying the original. Common tasks include extracting substrings with slice(start, end), splitting a string into an array with split(separator), and checking content with includes(), startsWith(), and endsWith().\n\nTemplate literals (backtick strings) are the modern way to build strings with embedded expressions using ${expression} syntax, replacing older, harder-to-read string concatenation with +. They also support multi-line strings without needing \\n escape sequences.",
    keyPoints: [
      "Strings are immutable — every string method returns a new string, never mutates in place.",
      "Template literals use backticks and ${expr} for embedded expressions: `Hi ${name}`.",
      "split(separator) turns a string into an array; join(separator) does the reverse for arrays.",
      "trim() removes leading/trailing whitespace, useful for cleaning user input.",
    ],
    example:
      "const name = \"Ada\";\nconst greeting = `Hello, ${name}! You have ${3 + 2} new messages.`;\nconsole.log(greeting);\n\nconst csv = \"a,b,c\";\nconsole.log(csv.split(\",\"));        // [\"a\", \"b\", \"c\"]\nconsole.log(\"  hi  \".trim());       // \"hi\"\nconsole.log(\"Hello\".toUpperCase()); // \"HELLO\"",
    quiz: [
      {
        question: "Do string methods like toUpperCase() modify the original string?",
        options: [
          "Yes, strings are mutable in JS",
          "No, strings are immutable — a new string is always returned",
          "Only in strict mode",
          "Only slice() is immutable",
        ],
        correctIndex: 1,
        explanation: "All string methods return new strings; the original is never changed.",
      },
      {
        question: "What syntax do template literals use for embedded expressions?",
        options: ["#{expr}", "${expr}", "%{expr}", "{{expr}}"],
        correctIndex: 1,
        explanation: "Template literals use backticks with ${} to embed JavaScript expressions.",
      },
      {
        question: "What does \"a,b,c\".split(\",\") return?",
        options: ["\"abc\"", "[\"a\", \"b\", \"c\"]", "3", "\"a b c\""],
        correctIndex: 1,
        explanation: "split breaks a string into an array using the given separator.",
      },
    ],
  },
  {
    id: "js-scope-closures",
    title: "Scope & Closures",
    summary: "Where variables live, and functions that remember their environment.",
    theory:
      "Scope determines where a variable is accessible. JavaScript has global scope (accessible everywhere), function scope, and block scope (for let/const inside {}). Inner scopes can access variables from outer scopes, but not the reverse.\n\nA closure happens when a function 'remembers' variables from the scope it was created in, even after that outer function has finished running. This is the mechanism behind private state in JavaScript — a common pattern is a function that returns another function which keeps a private counter alive via closure, inaccessible from outside except through the returned function itself.",
    keyPoints: [
      "Inner functions can access outer variables; outer functions cannot access inner ones.",
      "A closure is a function bundled with its 'remembered' surrounding scope.",
      "Closures are commonly used to create private state that can't be accessed directly from outside.",
      "Each call to an outer function creates a fresh, independent closure environment.",
    ],
    example:
      "function makeCounter() {\n  let count = 0;\n  return function () {\n    count++;\n    return count;\n  };\n}\n\nconst counter = makeCounter();\nconsole.log(counter()); // 1\nconsole.log(counter()); // 2\nconsole.log(counter()); // 3\n// 'count' is private — inaccessible directly from outside makeCounter",
    quiz: [
      {
        question: "What is a closure?",
        options: [
          "A syntax error in nested functions",
          "A function that retains access to variables from its creation scope, even after that scope has finished",
          "A way to close a browser tab",
          "A type of loop",
        ],
        correctIndex: 1,
        explanation: "Closures let inner functions 'remember' outer variables across time.",
      },
      {
        question: "In the counter example, why can't outside code directly change count?",
        options: [
          "count is declared with const somewhere",
          "count only exists inside makeCounter's closure, with no direct external reference",
          "JavaScript doesn't allow reading numbers from closures",
          "It actually can be changed directly",
        ],
        correctIndex: 1,
        explanation: "count is private to the closure — only the returned function can touch it.",
      },
      {
        question: "Can an outer function access variables declared inside an inner function?",
        options: ["Yes, always", "No, scope access only flows from inner functions outward to outer ones", "Only with var", "Only in closures"],
        correctIndex: 1,
        explanation: "Variable lookup only travels outward through scope, never inward.",
      },
    ],
  },
  {
    id: "js-es6",
    title: "ES6+ Features (Destructuring, Spread, Template Literals)",
    summary: "Modern syntax that makes everyday JavaScript more concise.",
    theory:
      "ES6 (2015) and later versions introduced syntax that's now standard in everyday JavaScript. Destructuring unpacks values from arrays or objects into individual variables in one line: const { name, age } = user; or const [first, second] = list;. It can also rename and provide defaults inline.\n\nThe spread operator (...) expands an iterable into individual elements — used to copy/merge arrays ([...arr1, ...arr2]), copy objects ({...obj}), or pass array elements as individual function arguments. Template literals (covered with strings) and default parameters round out the most commonly used modern syntax.",
    keyPoints: [
      "Object destructuring: const { name, age } = user; pulls named properties into variables.",
      "Array destructuring: const [a, b] = arr; pulls positional values into variables.",
      "Spread (...) expands arrays/objects: merging, copying, or passing as function arguments.",
      "Destructuring can rename (const { name: userName } = user) and set defaults (= 'Guest').",
    ],
    example:
      "const user = { name: \"Ada\", age: 30, country: \"UK\" };\nconst { name, age } = user;\nconsole.log(name, age); // \"Ada\" 30\n\nconst nums1 = [1, 2];\nconst nums2 = [3, 4];\nconst merged = [...nums1, ...nums2];\nconsole.log(merged); // [1, 2, 3, 4]\n\nconst [first, , third] = [\"a\", \"b\", \"c\"];\nconsole.log(first, third); // \"a\" \"c\"",
    quiz: [
      {
        question: "What does const { name, age } = user; do?",
        options: [
          "Deletes name and age from user",
          "Creates new variables name and age from matching properties on user",
          "Renames user's properties",
          "Throws an error if user has extra properties",
        ],
        correctIndex: 1,
        explanation: "Object destructuring extracts named properties directly into variables.",
      },
      {
        question: "What does [...nums1, ...nums2] produce?",
        options: [
          "A nested array [[..nums1], [..nums2]]",
          "A new flat array combining all elements of both arrays",
          "An error, since arrays can't be spread",
          "The sum of both arrays' elements",
        ],
        correctIndex: 1,
        explanation: "Spread expands each array's elements individually into the new array literal.",
      },
      {
        question: "In const [first, , third] = arr;, what does the empty slot do?",
        options: [
          "Causes a syntax error",
          "Skips that positional element during destructuring",
          "Duplicates the previous value",
          "Sets that position to null explicitly",
        ],
        correctIndex: 1,
        explanation: "An empty slot in array destructuring simply skips that index.",
      },
    ],
  },
  {
    id: "js-async",
    title: "Asynchronous JavaScript (Callbacks, Promises, async/await)",
    summary: "Handling operations that take time without blocking execution.",
    theory:
      "JavaScript is single-threaded, but many operations — network requests, timers, file reads — take time. Rather than blocking everything while waiting, JS handles these asynchronously. The earliest pattern was callbacks (pass a function to run later), which can lead to deeply nested 'callback hell' when chaining several async steps.\n\nPromises improved this: a Promise represents a value that will exist in the future, resolved (success) or rejected (failure), and can be chained with .then()/.catch(). async/await, built on top of Promises, lets asynchronous code read like synchronous code — an async function can await a Promise, pausing that function (not the whole program) until it resolves, with try/catch handling errors naturally instead of nested callbacks.",
    keyPoints: [
      "A Promise has three states: pending, fulfilled (resolved), or rejected.",
      "fetch() returns a Promise; .then() runs on success, .catch() runs on failure/rejection.",
      "async function makes a function always return a Promise; await pauses until it resolves.",
      "try/catch around await is the standard way to handle errors in async/await code.",
    ],
    example:
      "// Promise-based\nfetch(\"/api/user\")\n  .then((res) => res.json())\n  .then((data) => console.log(data))\n  .catch((err) => console.error(err));\n\n// async/await version of the same thing\nasync function loadUser() {\n  try {\n    const res = await fetch(\"/api/user\");\n    const data = await res.json();\n    console.log(data);\n  } catch (err) {\n    console.error(err);\n  }\n}",
    quiz: [
      {
        question: "What are the three states of a Promise?",
        options: [
          "start, middle, end",
          "pending, fulfilled, rejected",
          "loading, success, error only for fetch",
          "sync, async, deferred",
        ],
        correctIndex: 1,
        explanation: "Every Promise begins pending and settles into fulfilled or rejected.",
      },
      {
        question: "What does await do inside an async function?",
        options: [
          "Blocks the entire browser until the Promise resolves",
          "Pauses that function's execution until the Promise resolves, without blocking the rest of the program",
          "Converts a Promise into a callback",
          "Cancels the Promise",
        ],
        correctIndex: 1,
        explanation: "await only pauses the async function itself; other code keeps running.",
      },
      {
        question: "How are errors typically handled in async/await code?",
        options: [
          "They can't be caught",
          "With try/catch wrapped around the await calls",
          "Only with .catch() chained after the function",
          "Errors are silently ignored by default",
        ],
        correctIndex: 1,
        explanation: "try/catch is the natural error-handling pattern for async/await, mirroring sync code.",
      },
    ],
  },
];

export default jsTopics;