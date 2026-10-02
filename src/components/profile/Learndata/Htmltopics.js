const htmlTopics = [
  {
    id: "html-intro",
    title: "Introduction to HTML & Document Structure",
    summary: "What HTML is, and the skeleton every HTML page starts from.",
    theory:
      "HTML (HyperText Markup Language) is the standard markup language used to structure content on the web. It is not a programming language — it has no logic or calculations — it simply describes the structure of a page using elements made of tags.\n\nEvery HTML document follows a required skeleton: a doctype declaration, an <html> root element, a <head> for metadata (title, links to stylesheets, character encoding), and a <body> that holds everything visible to the user. Browsers read this structure top to bottom and build the DOM (Document Object Model) from it, which is what CSS styles and JavaScript manipulates.",
    keyPoints: [
      "<!DOCTYPE html> tells the browser to use modern HTML5 rendering rules.",
      "<head> content is not visible on the page; <body> content is.",
      "HTML elements are made of an opening tag, content, and a closing tag: <p>text</p>.",
      "Some elements are 'void' elements with no closing tag, like <img> and <br>.",
    ],
    example:
      "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>My First Page</title>\n</head>\n<body>\n  <h1>Hello, World!</h1>\n  <p>This is my first HTML page.</p>\n</body>\n</html>",
    quiz: [
      {
        question: "What does <!DOCTYPE html> do?",
        options: [
          "Loads a CSS stylesheet",
          "Tells the browser to render the page using HTML5 standards",
          "Creates a comment",
          "Declares a JavaScript variable",
        ],
        correctIndex: 1,
        explanation: "It's a declaration, not a tag, that sets the document to standards-compliant HTML5 mode.",
      },
      {
        question: "Which section holds content the user actually sees?",
        options: ["<head>", "<meta>", "<body>", "<title>"],
        correctIndex: 2,
        explanation: "<body> contains all visible page content; <head> holds metadata.",
      },
      {
        question: "Which of these is a void (self-closing) element?",
        options: ["<p>", "<div>", "<img>", "<span>"],
        correctIndex: 2,
        explanation: "<img> never wraps content and has no closing tag.",
      },
    ],
  },
  {
    id: "html-text",
    title: "Headings, Paragraphs & Text Formatting",
    summary: "Structuring readable text content with headings and inline formatting.",
    theory:
      "Text is the most common content on the web, and HTML gives it structure with six levels of headings (<h1> through <h6>) and paragraphs (<p>). Headings aren't just for size — they define a document outline that screen readers and search engines rely on, so <h1> should be used once for the main title, with <h2>-<h6> nesting logically beneath it.\n\nInline formatting tags like <strong>, <em>, <mark>, and <small> add semantic meaning on top of plain text: <strong> means 'important', not just 'bold', and <em> means 'stressed emphasis', not just 'italic'. Browsers apply default visual styling to these, but the meaning is what matters for accessibility.",
    keyPoints: [
      "Use only one <h1> per page as the main heading.",
      "<strong> and <em> carry meaning; <b> and <i> are purely visual.",
      "<br> forces a line break; <hr> draws a thematic horizontal rule.",
      "Whitespace in HTML source is collapsed — use tags, not extra spaces, for layout.",
    ],
    example:
      "<h1>Article Title</h1>\n<h2>Introduction</h2>\n<p>This is a <strong>very important</strong> point, and this word is <em>emphasized</em>.</p>\n<hr>\n<p><small>Published on Jan 1, 2026</small></p>",
    quiz: [
      {
        question: "Why should a page usually have only one <h1>?",
        options: [
          "Browsers only render the first one",
          "It represents the single main heading in the document outline",
          "It's required by the HTML5 spec to error otherwise",
          "There's no reason, it's just convention with no effect",
        ],
        correctIndex: 1,
        explanation: "It defines the top of the semantic outline used by search engines and assistive tech.",
      },
      {
        question: "What is the semantic difference between <strong> and <b>?",
        options: [
          "There is none, they're identical",
          "<strong> indicates importance; <b> is purely stylistic bolding",
          "<b> works in all browsers, <strong> doesn't",
          "<strong> is deprecated in HTML5",
        ],
        correctIndex: 1,
        explanation: "<strong> carries semantic weight for accessibility tools; <b> does not.",
      },
      {
        question: "What does <br> do?",
        options: ["Adds a horizontal rule", "Bolds text", "Forces a line break", "Starts a new paragraph"],
        correctIndex: 2,
        explanation: "<br> inserts a single line break within text content.",
      },
    ],
  },
  {
    id: "html-links",
    title: "Links & Anchor Tags",
    summary: "Connecting pages and resources with the <a> element.",
    theory:
      "The anchor tag <a> creates hyperlinks — the fundamental mechanism that makes the web 'linked'. Its most important attribute is href, which can point to another page, a section within the same page (#id), an email address (mailto:), or an external site.\n\nBy default, links open in the same tab. Setting target=\"_blank\" opens a new tab, but should be paired with rel=\"noopener noreferrer\" for security, since the new page can otherwise access the opening page via window.opener.",
    keyPoints: [
      "href is required for a link to actually navigate anywhere.",
      "#section-id links scroll to an element with a matching id on the page.",
      "target=\"_blank\" opens in a new tab; always pair with rel=\"noopener\".",
      "Anchors can wrap other elements, e.g. <a href=\"...\"><img ...></a>.",
    ],
    example:
      "<a href=\"https://example.com\">Visit Example</a>\n<a href=\"#pricing\">Jump to Pricing</a>\n<a href=\"mailto:hello@example.com\">Email us</a>\n<a href=\"https://example.com\" target=\"_blank\" rel=\"noopener noreferrer\">Opens in new tab</a>",
    quiz: [
      {
        question: "Which attribute makes a link actually navigate somewhere?",
        options: ["src", "href", "link", "target"],
        correctIndex: 1,
        explanation: "href specifies the destination URL of an anchor tag.",
      },
      {
        question: "What does href=\"#pricing\" do?",
        options: [
          "Opens a new browser window",
          "Sends an email",
          "Scrolls to the element with id='pricing' on the current page",
          "Downloads a file named pricing",
        ],
        correctIndex: 2,
        explanation: "A hash href jumps to the matching in-page element id.",
      },
      {
        question: "Why pair target=\"_blank\" with rel=\"noopener\"?",
        options: [
          "It's purely stylistic",
          "It prevents the new page from accessing window.opener",
          "It's required for the link to work at all",
          "It makes the link open faster",
        ],
        correctIndex: 1,
        explanation: "noopener closes a security gap where the new tab could manipulate the original page.",
      },
    ],
  },
  {
    id: "html-images-media",
    title: "Images & Media",
    summary: "Embedding images responsibly with <img> and its key attributes.",
    theory:
      "The <img> tag embeds images using the src attribute for the file path or URL. The alt attribute is not optional in practice — it provides alternative text for screen readers and displays if the image fails to load, and search engines use it to understand image content.\n\nModern responsive images use srcset and sizes to let the browser choose the best image resolution for the user's screen, saving bandwidth on smaller devices without extra JavaScript.",
    keyPoints: [
      "alt text should describe the image's purpose, or be empty (alt=\"\") if purely decorative.",
      "width and height attributes prevent layout shift while images load.",
      "srcset lets browsers pick the right image size for the device.",
      "loading=\"lazy\" defers offscreen images until the user scrolls near them.",
    ],
    example:
      "<img src=\"cat.jpg\" alt=\"A gray tabby cat sitting on a windowsill\" width=\"400\" height=\"300\" loading=\"lazy\">\n\n<img\n  src=\"hero-small.jpg\"\n  srcset=\"hero-small.jpg 480w, hero-large.jpg 1080w\"\n  sizes=\"(max-width: 600px) 480px, 1080px\"\n  alt=\"Hero banner\">",
    quiz: [
      {
        question: "What is the primary purpose of the alt attribute?",
        options: [
          "To set the image's alignment",
          "To provide alternative text for accessibility and fallback display",
          "To compress the image",
          "To link the image to another page",
        ],
        correctIndex: 1,
        explanation: "alt is read by screen readers and shown if the image can't load.",
      },
      {
        question: "Why add width/height attributes to <img>?",
        options: [
          "They're required by HTML5 or the image won't render",
          "To prevent layout shift while the image is loading",
          "To compress the file size",
          "They have no real effect",
        ],
        correctIndex: 1,
        explanation: "Explicit dimensions reserve space in the layout before the image loads.",
      },
      {
        question: "What does loading=\"lazy\" do?",
        options: [
          "Blurs the image until clicked",
          "Loads a low-res placeholder forever",
          "Defers loading offscreen images until they're near the viewport",
          "Disables the image on slow connections",
        ],
        correctIndex: 2,
        explanation: "Lazy loading improves initial page load by deferring offscreen images.",
      },
    ],
  },
  {
    id: "html-lists",
    title: "Lists (Ordered, Unordered & Description)",
    summary: "Grouping related items with <ul>, <ol>, and <dl>.",
    theory:
      "Lists group related items semantically. <ul> (unordered list) is used when order doesn't matter, rendering bullet points by default. <ol> (ordered list) is used when sequence matters, rendering numbers. Both contain one or more <li> (list item) elements.\n\nA less common but useful third type is the description list <dl>, which pairs terms (<dt>) with their descriptions (<dd>) — ideal for glossaries, FAQs, or key-value data like metadata.",
    keyPoints: [
      "<ul> for unordered groups, <ol> for sequences/steps, both use <li> children.",
      "<ol> accepts a start attribute and type attribute (1, A, a, I, i) for numbering style.",
      "Lists can be nested inside a parent <li>.",
      "<dl>/<dt>/<dd> is the right choice for term-definition pairs.",
    ],
    example:
      "<ul>\n  <li>Milk</li>\n  <li>Eggs</li>\n</ul>\n\n<ol start=\"1\">\n  <li>Preheat oven</li>\n  <li>Mix ingredients</li>\n</ol>\n\n<dl>\n  <dt>HTML</dt>\n  <dd>Markup language for structuring web content.</dd>\n</dl>",
    quiz: [
      {
        question: "When should you choose <ol> over <ul>?",
        options: [
          "When you want bullets instead of numbers",
          "When the order/sequence of items matters",
          "When there are more than 5 items",
          "There's no functional difference",
        ],
        correctIndex: 1,
        explanation: "<ol> implies sequence — steps, rankings, instructions.",
      },
      {
        question: "What pairs with <dt> inside a <dl>?",
        options: ["<li>", "<dd>", "<td>", "<option>"],
        correctIndex: 1,
        explanation: "<dt> (term) is followed by one or more <dd> (description) elements.",
      },
      {
        question: "Can list items be nested with another list inside them?",
        options: ["No, never", "Yes, a <ul> or <ol> can go inside an <li>", "Only <ol> can nest", "Only in HTML5.1+"],
        correctIndex: 1,
        explanation: "Nested lists are valid and common for sub-items like menus or outlines.",
      },
    ],
  },
  {
    id: "html-tables",
    title: "Tables",
    summary: "Displaying tabular data correctly with <table> and its structural children.",
    theory:
      "Tables display data in rows and columns and should only be used for genuinely tabular data — not for page layout, which is CSS's job. A table is built from <table>, with rows <tr>, header cells <th>, and data cells <td>.\n\nFor accessibility and clarity, larger tables benefit from <thead>, <tbody>, and <tfoot> to group rows semantically, and the scope attribute on <th> clarifies whether a header applies to a row or column, which screen readers rely on.",
    keyPoints: [
      "<th> is for header cells (bold, centered by default); <td> is for data cells.",
      "<thead>/<tbody>/<tfoot> group rows for structure and styling hooks.",
      "colspan and rowspan merge cells across columns or rows.",
      "Never use tables purely for visual page layout — use CSS Grid/Flexbox instead.",
    ],
    example:
      "<table>\n  <thead>\n    <tr><th scope=\"col\">Name</th><th scope=\"col\">Score</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>Alice</td><td>92</td></tr>\n    <tr><td>Bob</td><td colspan=\"1\">88</td></tr>\n  </tbody>\n</table>",
    quiz: [
      {
        question: "What is the semantic purpose of <th> versus <td>?",
        options: [
          "<th> is just a bolder <td>, no semantic meaning",
          "<th> marks a header cell; <td> marks a regular data cell",
          "<th> is for the whole table title",
          "They are interchangeable",
        ],
        correctIndex: 1,
        explanation: "<th> conveys header semantics used by assistive technology to relate data to headers.",
      },
      {
        question: "What does colspan do?",
        options: [
          "Merges a cell across multiple columns",
          "Sets the column's text color",
          "Sorts the column",
          "Hides a column",
        ],
        correctIndex: 0,
        explanation: "colspan makes a single cell span multiple columns.",
      },
      {
        question: "When should tables be used for page layout (like a 3-column homepage)?",
        options: ["Always, it's simplest", "Only in emails", "Never for general page layout — use CSS instead", "Only on mobile"],
        correctIndex: 2,
        explanation: "Tables are for tabular data; layout should use CSS Flexbox/Grid (email HTML is a notable historical exception).",
      },
    ],
  },
  {
    id: "html-forms",
    title: "Forms & Input Elements",
    summary: "Collecting user input with <form>, <input>, and related controls.",
    theory:
      "Forms let users submit data to a server. The <form> element wraps controls and defines action (where data is sent) and method (GET or POST). Inside, <input> is the most versatile control — its type attribute (text, email, password, checkbox, radio, date, etc.) determines both validation behavior and the on-screen widget.\n\nEvery input should be paired with a <label>, either wrapping the input or linked via a matching for/id pair. This isn't cosmetic — it expands the clickable area and is essential for screen reader users to know what a field is for.",
    keyPoints: [
      "type=\"email\", type=\"number\", etc. give free built-in browser validation.",
      "<label for=\"id\"> must match the input's id to be properly associated.",
      "required, minlength, and pattern attributes add validation without JavaScript.",
      "<select>/<option> for dropdowns, <textarea> for multi-line text.",
    ],
    example:
      "<form action=\"/submit\" method=\"POST\">\n  <label for=\"email\">Email</label>\n  <input type=\"email\" id=\"email\" name=\"email\" required>\n\n  <label for=\"plan\">Plan</label>\n  <select id=\"plan\" name=\"plan\">\n    <option value=\"free\">Free</option>\n    <option value=\"pro\">Pro</option>\n  </select>\n\n  <button type=\"submit\">Sign up</button>\n</form>",
    quiz: [
      {
        question: "Why link a <label> to its <input> with for/id?",
        options: [
          "It's purely decorative",
          "It expands the click target and helps screen readers announce the field",
          "It's required for the form to submit",
          "It changes the input's data type",
        ],
        correctIndex: 1,
        explanation: "Proper labeling is one of the most important accessibility practices in forms.",
      },
      {
        question: "What does the required attribute do on an input?",
        options: [
          "Sends the field even if empty",
          "Prevents form submission until that field has a value",
          "Hides the field until filled",
          "Auto-fills the field",
        ],
        correctIndex: 1,
        explanation: "required triggers built-in browser validation blocking submission when empty.",
      },
      {
        question: "Which element is used for a multi-line text input?",
        options: ["<input type=\"text\">", "<textarea>", "<select>", "<label>"],
        correctIndex: 1,
        explanation: "<textarea> is specifically for multi-line free text.",
      },
    ],
  },
  {
    id: "html-semantic",
    title: "Semantic HTML5 Elements",
    summary: "Using meaningful tags like <header>, <nav>, <main>, and <article>.",
    theory:
      "Before HTML5, developers built entire layouts out of generic <div> elements with class names like \"header\" or \"nav\". HTML5 introduced semantic elements that describe their purpose directly: <header>, <nav>, <main>, <section>, <article>, <aside>, and <footer>.\n\nThese carry real meaning for browsers, search engines, and assistive technology — a screen reader user can jump straight to <nav> or <main> using landmark navigation, and search engines weigh content inside <article> differently than a generic container.",
    keyPoints: [
      "<main> should appear once per page and hold the primary unique content.",
      "<article> is self-contained content that could stand alone (a blog post, a product card).",
      "<section> groups thematically related content, usually with its own heading.",
      "<nav> wraps primary navigation links; <aside> holds tangential content like sidebars.",
    ],
    example:
      "<header>\n  <nav><a href=\"/\">Home</a> <a href=\"/blog\">Blog</a></nav>\n</header>\n<main>\n  <article>\n    <h1>Post Title</h1>\n    <p>Content...</p>\n  </article>\n  <aside>Related links</aside>\n</main>\n<footer>&copy; 2026</footer>",
    quiz: [
      {
        question: "Why prefer <nav> over a plain <div class=\"nav\">?",
        options: [
          "<nav> looks different by default",
          "<nav> gives semantic meaning that assistive tech and browsers understand natively",
          "There is no difference at all",
          "<div> is deprecated",
        ],
        correctIndex: 1,
        explanation: "Semantic tags are understood by tools without relying on class names.",
      },
      {
        question: "How many <main> elements should a page typically have?",
        options: ["As many as needed", "Exactly one", "Zero, it's optional and rarely used", "One per section"],
        correctIndex: 1,
        explanation: "<main> marks the single primary content area of the page.",
      },
      {
        question: "What best describes <article>?",
        options: [
          "A sidebar widget",
          "Self-contained content that would make sense on its own, like a blog post",
          "The site's navigation bar",
          "A generic styling container",
        ],
        correctIndex: 1,
        explanation: "<article> is for independently distributable/reusable content.",
      },
    ],
  },
  {
    id: "html-div-span",
    title: "Divs, Spans & Block vs Inline",
    summary: "Generic containers and the block/inline distinction that governs layout.",
    theory:
      "<div> and <span> are generic containers with no inherent meaning — they exist purely as hooks for CSS and JavaScript. The key difference is their default display behavior: <div> is a block-level element (starts on a new line, takes full available width), while <span> is inline (flows within text, only as wide as its content).\n\nUnderstanding block vs inline is foundational: block elements (like <p>, <div>, <h1>) stack vertically and accept width/height, while inline elements (like <span>, <a>, <strong>) sit within a line of text and mostly ignore width/height until you change their display value with CSS.",
    keyPoints: [
      "<div> = block-level generic container; <span> = inline generic container.",
      "Block elements stack top-to-bottom; inline elements flow left-to-right within text.",
      "Use semantic tags first; fall back to <div>/<span> only when nothing more meaningful fits.",
      "display: inline-block gives an element inline flow but block-like width/height control.",
    ],
    example:
      "<div class=\"card\">\n  <p>Price: <span class=\"highlight\">$29</span> per month</p>\n</div>\n\n<style>\n.highlight { color: green; font-weight: bold; }\n</style>",
    quiz: [
      {
        question: "What is the default display type of <div>?",
        options: ["inline", "block", "inline-block", "none"],
        correctIndex: 1,
        explanation: "<div> is block-level by default, taking the full available width.",
      },
      {
        question: "Why use <span> around a word inside a paragraph?",
        options: [
          "To force a new line",
          "To style or target just that inline portion of text with CSS/JS",
          "It's required for text to render",
          "To make it a link",
        ],
        correctIndex: 1,
        explanation: "<span> is a hook for styling/scripting a piece of inline text.",
      },
      {
        question: "What does display: inline-block give you?",
        options: [
          "Purely inline behavior with no width control",
          "Block stacking with no inline flow",
          "Inline flow while still respecting width/height like a block",
          "It hides the element",
        ],
        correctIndex: 2,
        explanation: "inline-block blends inline flow with block-style sizing.",
      },
    ],
  },
  {
    id: "html-attributes",
    title: "HTML Attributes & Global Attributes",
    summary: "How attributes configure elements, and the ones every element shares.",
    theory:
      "Attributes provide additional information about an element, written as name=\"value\" pairs inside the opening tag. Some are element-specific (src on <img>, href on <a>), while 'global attributes' like id, class, style, title, and data-* work on virtually every HTML element.\n\ndata-* attributes are especially useful for storing custom data directly on an element for JavaScript to read later, without inventing non-standard attributes. For example, data-user-id=\"42\" is valid HTML and accessible in JS via element.dataset.userId.",
    keyPoints: [
      "id must be unique per page; class can repeat and apply to many elements.",
      "data-* attributes store custom data readable via element.dataset in JavaScript.",
      "title shows a tooltip on hover; it's not a substitute for visible labeling.",
      "Boolean attributes (like disabled, checked) are 'on' just by being present.",
    ],
    example:
      "<button id=\"buy-btn\" class=\"btn btn-primary\" data-product-id=\"42\" disabled>\n  Buy Now\n</button>\n\n<script>\n  const btn = document.getElementById(\"buy-btn\");\n  console.log(btn.dataset.productId); // \"42\"\n</script>",
    quiz: [
      {
        question: "How is a data-* attribute read in JavaScript?",
        options: [
          "element.getData()",
          "element.dataset",
          "element.attributes.data",
          "It cannot be read from JS",
        ],
        correctIndex: 1,
        explanation: "The dataset property exposes all data-* attributes as camelCase keys.",
      },
      {
        question: "Can multiple elements share the same class?",
        options: ["No, class must be unique", "Yes, that's exactly what class is for", "Only on <div>", "Only with CSS Grid"],
        correctIndex: 1,
        explanation: "class is designed to group multiple elements for shared styling/behavior.",
      },
      {
        question: "What does a boolean attribute like disabled do when simply present with no value?",
        options: [
          "It's ignored unless set to \"true\"",
          "It activates that behavior just by being present",
          "It causes an HTML error",
          "It requires a matching JavaScript handler",
        ],
        correctIndex: 1,
        explanation: "Boolean attributes are true by presence alone, e.g. <input disabled>.",
      },
    ],
  },
  {
    id: "html-iframe",
    title: "Iframes & Embedding Content",
    summary: "Embedding another document inside the current page with <iframe>.",
    theory:
      "An <iframe> embeds another HTML document inside the current page as a nested browsing context — commonly used for maps, videos, payment widgets, or ads. The src attribute points to the embedded page's URL.\n\nBecause iframes load third-party content, browsers apply security boundaries between the parent page and the iframe (the same-origin policy). The sandbox attribute can further restrict what an embedded iframe is allowed to do, like disabling scripts or form submission, which matters when embedding untrusted content.",
    keyPoints: [
      "src points to the URL of the page to embed.",
      "title should be set on iframes for accessibility, describing the embedded content.",
      "The same-origin policy restricts JS interaction between parent and cross-origin iframe content.",
      "sandbox restricts iframe capabilities (scripts, forms, popups) for untrusted embeds.",
    ],
    example:
      "<iframe\n  src=\"https://example.com/widget\"\n  title=\"Example widget\"\n  width=\"400\"\n  height=\"300\"\n  loading=\"lazy\">\n</iframe>",
    quiz: [
      {
        question: "What is an <iframe> used for?",
        options: [
          "Styling text",
          "Embedding another HTML document within the current page",
          "Declaring variables",
          "Creating a table",
        ],
        correctIndex: 1,
        explanation: "iframe creates a nested browsing context loading a separate document.",
      },
      {
        question: "What does the sandbox attribute do?",
        options: [
          "Speeds up iframe loading",
          "Restricts capabilities of the embedded content, like scripts or popups",
          "Adds a visible border",
          "Makes the iframe responsive",
        ],
        correctIndex: 1,
        explanation: "sandbox applies extra security restrictions to untrusted embedded content.",
      },
      {
        question: "Why does the same-origin policy matter for iframes?",
        options: [
          "It has no real effect",
          "It prevents cross-origin scripts from freely accessing each other's content",
          "It only affects CSS",
          "It's only relevant for forms",
        ],
        correctIndex: 1,
        explanation: "It's a core browser security boundary between different origins.",
      },
    ],
  },
  {
    id: "html-audio-video",
    title: "HTML5 Audio & Video",
    summary: "Native media playback without third-party plugins.",
    theory:
      "Before HTML5, embedding audio/video required plugins like Flash. The <audio> and <video> elements provide native playback with the controls attribute adding a built-in play/pause/volume UI. Multiple <source> children can offer different formats so the browser picks one it supports.\n\nFor video, poster sets a preview image shown before playback starts. autoplay is heavily restricted by modern browsers (usually requiring muted) to prevent unwanted noise, so autoplay video is almost always paired with the muted attribute.",
    keyPoints: [
      "controls shows native play/pause/volume UI without any JavaScript.",
      "Multiple <source> tags provide format fallbacks (mp4, webm, etc.).",
      "autoplay video generally requires muted to be allowed by browsers.",
      "poster sets the video's preview thumbnail before it plays.",
    ],
    example:
      "<video controls width=\"480\" poster=\"preview.jpg\">\n  <source src=\"movie.mp4\" type=\"video/mp4\">\n  <source src=\"movie.webm\" type=\"video/webm\">\n  Your browser does not support video.\n</video>\n\n<audio controls>\n  <source src=\"song.mp3\" type=\"audio/mpeg\">\n</audio>",
    quiz: [
      {
        question: "What does the controls attribute add to <video>?",
        options: [
          "Subtitles",
          "A built-in play/pause/volume UI",
          "Autoplay behavior",
          "A download button only",
        ],
        correctIndex: 1,
        explanation: "controls exposes the browser's native playback UI.",
      },
      {
        question: "Why is muted usually required alongside autoplay?",
        options: [
          "It isn't required, that's a myth",
          "Browsers block unmuted autoplay to prevent unexpected sound",
          "muted makes videos load faster",
          "It's only needed on mobile",
        ],
        correctIndex: 1,
        explanation: "Modern browser policies block audible autoplay without user interaction.",
      },
      {
        question: "What is the purpose of multiple <source> elements inside <video>?",
        options: [
          "To play multiple videos at once",
          "To offer format fallbacks so the browser picks one it supports",
          "To add captions",
          "To loop the video multiple times",
        ],
        correctIndex: 1,
        explanation: "Different browsers support different codecs; sources provide alternatives.",
      },
    ],
  },
  {
    id: "html-meta-seo",
    title: "Meta Tags & SEO Basics",
    summary: "Metadata in <head> that controls rendering, sharing, and search visibility.",
    theory:
      "Meta tags live in <head> and describe the document to browsers, search engines, and social platforms rather than displaying visible content. <meta charset=\"UTF-8\"> sets character encoding, and the viewport meta tag controls how the page scales on mobile devices — without it, mobile browsers render a desktop-width page and zoom out.\n\nFor search engines, <title> and <meta name=\"description\"> are the two most influential tags for how a page appears in results. Open Graph tags (og:title, og:image, etc.) control how a link looks when shared on social media.",
    keyPoints: [
      "<meta charset=\"UTF-8\"> should be the first thing inside <head>.",
      "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"> enables proper mobile scaling.",
      "<title> and meta description are the primary text shown in search results.",
      "Open Graph (og:*) meta tags control social media link previews.",
    ],
    example:
      "<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n  <title>Best Coffee Beans Online | BrewCo</title>\n  <meta name=\"description\" content=\"Shop small-batch, ethically sourced coffee beans.\">\n  <meta property=\"og:title\" content=\"BrewCo Coffee\">\n</head>",
    quiz: [
      {
        question: "What happens if the viewport meta tag is missing on a mobile browser?",
        options: [
          "Nothing changes",
          "The page renders at desktop width and appears zoomed out",
          "The page fails to load",
          "Images stop loading",
        ],
        correctIndex: 1,
        explanation: "Without it, mobile browsers assume a wide desktop layout by default.",
      },
      {
        question: "Which two tags most influence how a page looks in search results?",
        options: [
          "<h1> and <img>",
          "<title> and meta description",
          "<link> and <script>",
          "<div> and <span>",
        ],
        correctIndex: 1,
        explanation: "Search engines commonly display the <title> and description as the result snippet.",
      },
      {
        question: "What do Open Graph (og:*) tags control?",
        options: [
          "Page loading speed",
          "How a shared link previews on social media platforms",
          "Browser autofill behavior",
          "CSS animation timing",
        ],
        correctIndex: 1,
        explanation: "og: tags define the title/image/description used in social share previews.",
      },
    ],
  },
  {
    id: "html-accessibility",
    title: "Accessibility (ARIA Basics)",
    summary: "Making pages usable for people relying on assistive technology.",
    theory:
      "Web accessibility means building pages usable by everyone, including people using screen readers, keyboard-only navigation, or other assistive tech. The first rule of ARIA (Accessible Rich Internet Applications) is: don't use ARIA if a native semantic element already does the job — a real <button> is more accessible by default than a <div role=\"button\">.\n\nWhen custom widgets are unavoidable, ARIA attributes like role, aria-label, and aria-hidden fill the gaps: role tells assistive tech what a generic element behaves like, aria-label provides an accessible name when there's no visible text, and aria-hidden=\"true\" hides purely decorative elements from screen readers.",
    keyPoints: [
      "Prefer native elements (<button>, <nav>, <a>) over ARIA roles on generic <div>s.",
      "aria-label gives an accessible name when there's no visible label text.",
      "aria-hidden=\"true\" hides decorative content (like icon fonts) from screen readers.",
      "All interactive elements should be reachable and operable via keyboard (Tab/Enter).",
    ],
    example:
      "<button aria-label=\"Close dialog\">\n  <span aria-hidden=\"true\">&times;</span>\n</button>\n\n<div role=\"alert\">Your changes have been saved.</div>",
    quiz: [
      {
        question: "What is the first rule of using ARIA?",
        options: [
          "Add ARIA to every element for safety",
          "Prefer native semantic elements over ARIA roles when possible",
          "ARIA replaces the need for alt text",
          "ARIA is only for forms",
        ],
        correctIndex: 1,
        explanation: "Native elements come with built-in accessible behavior ARIA can't fully replicate.",
      },
      {
        question: "When should you use aria-label?",
        options: [
          "Always, on every element",
          "When there's no visible text to describe an interactive element's purpose",
          "Only on images",
          "It's interchangeable with the title attribute",
        ],
        correctIndex: 1,
        explanation: "aria-label supplies an accessible name when visible text is absent.",
      },
      {
        question: "What does aria-hidden=\"true\" do?",
        options: [
          "Hides the element visually and from screen readers",
          "Hides the element from screen readers only, while it stays visible",
          "Deletes the element",
          "Disables the element",
        ],
        correctIndex: 1,
        explanation: "It removes an element from the accessibility tree without affecting visible layout.",
      },
    ],
  },
  {
    id: "html-entities",
    title: "HTML Entities & Special Characters",
    summary: "Displaying reserved and special characters safely in HTML.",
    theory:
      "Certain characters have special meaning in HTML — < and > define tags, & starts an entity reference. To display them literally as text, you must use their entity codes: &lt; for <, &gt; for >, and &amp; for &. Without this, a browser would try to parse them as markup instead of showing them.\n\nEntities also provide characters that are hard to type directly, like &copy; (©), &nbsp; (a non-breaking space), and &mdash; (—). Named entities are easier to read in source code, while numeric entities (&#169;) work for virtually any Unicode character.",
    keyPoints: [
      "&lt; = <, &gt; = >, &amp; = & — required to display these characters as text.",
      "&nbsp; is a non-breaking space, useful to keep two words together.",
      "&copy;, &reg;, &trade; render ©, ®, ™ respectively.",
      "Numeric entities like &#8364; work for any Unicode character, including emoji.",
    ],
    example:
      "<p>Use &lt;div&gt; for a container. Price: 10&nbsp;&euro; &mdash; tax included.</p>\n<p>&copy; 2026 BrewCo. All rights reserved.</p>",
    quiz: [
      {
        question: "Why can't you just type < directly to show it as text in HTML?",
        options: [
          "You can, there's no issue",
          "The browser will interpret it as the start of a tag",
          "It causes a JavaScript error",
          "It's only a problem in old browsers",
        ],
        correctIndex: 1,
        explanation: "< is reserved for tag syntax, so it must be escaped as &lt; to display literally.",
      },
      {
        question: "What does &nbsp; represent?",
        options: [
          "A line break",
          "A non-breaking space that keeps adjacent words together",
          "A bullet point",
          "A tab character",
        ],
        correctIndex: 1,
        explanation: "&nbsp; prevents a line wrap from occurring at that space.",
      },
      {
        question: "What is an advantage of numeric entities like &#169; over named ones?",
        options: [
          "They render faster",
          "They can represent virtually any Unicode character, even without a named entity",
          "They are required by HTML5",
          "They are more readable in source code",
        ],
        correctIndex: 1,
        explanation: "Numeric references cover the full Unicode range, not just common named entities.",
      },
    ],
  },
];

export default htmlTopics;