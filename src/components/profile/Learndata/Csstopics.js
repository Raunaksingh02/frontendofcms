const cssTopics = [
  {
    id: "css-intro",
    title: "Introduction to CSS & Selectors",
    summary: "How CSS attaches styling rules to HTML elements.",
    theory:
      "CSS (Cascading Style Sheets) controls the visual presentation of HTML: color, spacing, layout, fonts, and more. A CSS rule pairs a selector (what to style) with a declaration block (how to style it), written as property: value; pairs inside curly braces.\n\nSelectors are how CSS targets elements: element selectors (p, div) match by tag name, class selectors (.card) match any element with that class, and ID selectors (#header) match a single unique element. You can combine selectors to be more specific, like .card h2 to target <h2> elements inside anything with class 'card'.",
    keyPoints: [
      "A rule = selector + declaration block: p { color: red; }",
      "Class selectors (.name) can apply to many elements; ID selectors (#name) should be unique.",
      "CSS can be inline (style=\"\"), internal (<style>), or external (linked .css file — best practice).",
      "Combinators like descendant (space), child (>), and sibling (+, ~) refine what gets matched.",
    ],
    example:
      "<style>\n  p { color: #333; }\n  .highlight { background: yellow; }\n  #main-title { font-size: 2rem; }\n  .card h2 { margin-top: 0; }\n</style>\n<h2 id=\"main-title\">Welcome</h2>\n<p class=\"highlight\">Styled paragraph</p>",
    quiz: [
      {
        question: "What are the two main parts of a CSS rule?",
        options: [
          "Tag and attribute",
          "Selector and declaration block",
          "Class and ID",
          "Property and function",
        ],
        correctIndex: 1,
        explanation: "A rule pairs a selector with a block of property:value declarations.",
      },
      {
        question: "Which selector should generally match only one element on a page?",
        options: [".class", "#id", "element", "*"],
        correctIndex: 1,
        explanation: "IDs are meant to be unique identifiers within a page.",
      },
      {
        question: "Which CSS delivery method is generally considered best practice for larger sites?",
        options: ["Inline style attributes", "Internal <style> blocks", "External linked stylesheets", "JavaScript-injected styles"],
        correctIndex: 2,
        explanation: "External stylesheets are cacheable, reusable across pages, and keep concerns separated.",
      },
    ],
  },
  {
    id: "css-colors-units",
    title: "Colors, Units & Values",
    summary: "How CSS represents color and measurement.",
    theory:
      "CSS colors can be expressed as named colors (red), hex codes (#ff0000), rgb()/rgba() (with alpha transparency), or hsl()/hsla() (hue, saturation, lightness — often more intuitive for adjusting a color's tone).\n\nLengths come in absolute units (px is the only common one) and relative units, which scale with context: % is relative to a parent, em is relative to the element's own font-size, rem is relative to the root (<html>) font-size, and vw/vh are relative to viewport width/height — essential for responsive design.",
    keyPoints: [
      "rgba()/hsla() add an alpha channel (0–1) for transparency.",
      "rem scales with the root font-size, making it predictable for consistent spacing/type scales.",
      "em compounds with nested elements, which can cause surprising size growth.",
      "vw/vh are relative to the viewport — 100vh = full screen height.",
    ],
    example:
      "<style>\n  .box {\n    background: hsl(210, 80%, 50%);\n    color: rgba(255, 255, 255, 0.9);\n    padding: 1.5rem;\n    font-size: 1.2em;\n    width: 50vw;\n  }\n</style>\n<div class=\"box\">Colored box</div>",
    quiz: [
      {
        question: "What does the 4th value in rgba(255,0,0,0.5) control?",
        options: ["Hue", "Saturation", "Transparency (alpha)", "Brightness"],
        correctIndex: 2,
        explanation: "The alpha channel ranges 0 (fully transparent) to 1 (fully opaque).",
      },
      {
        question: "What is rem relative to?",
        options: ["The parent element's font-size", "The element's own font-size", "The root (html) element's font-size", "The viewport width"],
        correctIndex: 2,
        explanation: "rem always scales from the root font-size, unlike em which is contextual.",
      },
      {
        question: "What does 100vh represent?",
        options: ["100% of the parent's height", "100 pixels", "The full height of the viewport", "100% of the element's own height"],
        correctIndex: 2,
        explanation: "vh units are percentages of the viewport's height.",
      },
    ],
  },
  {
    id: "css-box-model",
    title: "The Box Model",
    summary: "Content, padding, border, and margin — the core layout concept.",
    theory:
      "Every element in CSS is a rectangular box made of four layers, from inside out: content, padding (space inside the border), border, and margin (space outside the border, between elements). Understanding this is essential because width/height only apply to the content box by default.\n\nThis default behavior often surprises beginners: if you set width: 200px and then add padding: 20px, the element actually renders 240px wide. Setting box-sizing: border-box changes this so width/height include padding and border, making sizing far more predictable — most modern CSS resets apply it globally.",
    keyPoints: [
      "Order from inside out: content → padding → border → margin.",
      "By default, width/height apply only to content, not padding/border (content-box).",
      "box-sizing: border-box makes width/height include padding and border.",
      "Margins between block elements can 'collapse' — the larger margin wins, not the sum.",
    ],
    example:
      "<style>\n  * { box-sizing: border-box; }\n  .box {\n    width: 200px;\n    padding: 20px;\n    border: 4px solid #333;\n    margin: 16px;\n    background: #eef;\n  }\n</style>\n<div class=\"box\">200px wide, padding and border included</div>",
    quiz: [
      {
        question: "In the default content-box model, does padding increase an element's total rendered width?",
        options: ["No, never", "Yes, it adds to the width set by the width property", "Only in Firefox", "Only if border-box is set"],
        correctIndex: 1,
        explanation: "With content-box (default), width only covers content, so padding adds on top.",
      },
      {
        question: "What does box-sizing: border-box change?",
        options: [
          "It removes borders",
          "width/height now include padding and border, not just content",
          "It disables margins",
          "It makes elements inline",
        ],
        correctIndex: 1,
        explanation: "border-box makes sizing math much more predictable for layout.",
      },
      {
        question: "What is 'margin collapsing'?",
        options: [
          "Margins always add together between elements",
          "Adjacent vertical margins can combine into a single margin equal to the larger one",
          "Margins are removed at page edges",
          "It only happens with inline elements",
        ],
        correctIndex: 1,
        explanation: "Vertical margins between block siblings can collapse rather than stack additively.",
      },
    ],
  },
  {
    id: "css-typography",
    title: "Typography",
    summary: "Controlling fonts, sizing, and text appearance.",
    theory:
      "Typography properties control how text looks: font-family sets the typeface (with fallbacks, since not every font is available on every device), font-size and font-weight control size and boldness, and line-height controls vertical spacing between lines of text — crucial for readability.\n\nfont-family should always list a stack of fallbacks ending in a generic family (serif, sans-serif, monospace) in case earlier choices aren't installed. letter-spacing and text-transform offer finer control for things like all-caps headings or tightened logotypes.",
    keyPoints: [
      "font-family should be a comma-separated stack ending in a generic fallback.",
      "line-height around 1.4–1.6 (unitless) improves paragraph readability.",
      "font-weight ranges from 100 (thin) to 900 (black); 400 is normal, 700 is bold.",
      "text-transform: uppercase changes display case without altering the actual text content.",
    ],
    example:
      "<style>\n  body {\n    font-family: 'Helvetica Neue', Arial, sans-serif;\n    line-height: 1.5;\n    color: #222;\n  }\n  h1 {\n    font-weight: 700;\n    letter-spacing: 0.5px;\n    text-transform: uppercase;\n  }\n</style>\n<h1>Styled Heading</h1>\n<p>Body text with comfortable line-height.</p>",
    quiz: [
      {
        question: "Why should font-family always end in a generic fallback like sans-serif?",
        options: [
          "It's required by CSS syntax",
          "It ensures a reasonable font renders if none of the preferred fonts are available",
          "It speeds up page load",
          "It has no real effect",
        ],
        correctIndex: 1,
        explanation: "Generic fallbacks guarantee a usable font even without any specific match.",
      },
      {
        question: "What does a unitless line-height value like 1.5 mean?",
        options: [
          "1.5 pixels",
          "1.5 times the element's font-size",
          "1.5% of the parent height",
          "It's invalid CSS",
        ],
        correctIndex: 1,
        explanation: "Unitless line-height scales proportionally with the font-size, which is usually preferred.",
      },
      {
        question: "What is the standard 'normal' font-weight value?",
        options: ["100", "400", "700", "900"],
        correctIndex: 1,
        explanation: "400 is normal weight; 700 is the standard bold value.",
      },
    ],
  },
  {
    id: "css-display",
    title: "Display & Visibility",
    summary: "Controlling how elements participate in layout, and how to hide them.",
    theory:
      "The display property fundamentally changes how an element behaves in layout: block, inline, inline-block, flex, grid, and none are the most common values. display: none removes the element entirely from layout, as if it doesn't exist — no space is reserved for it.\n\nThis is different from visibility: hidden, which hides the element visually but still reserves its layout space. Choosing between them depends on whether you want surrounding content to reflow into the gap.",
    keyPoints: [
      "display: none removes the element from layout entirely (no reserved space).",
      "visibility: hidden hides visually but keeps the element's space reserved.",
      "display: flex and display: grid turn an element into a layout container for its children.",
      "opacity: 0 hides visually but the element is still interactive and in the layout.",
    ],
    example:
      "<style>\n  .gone { display: none; }\n  .invisible { visibility: hidden; }\n</style>\n<p>Visible paragraph</p>\n<p class=\"invisible\">Invisible but still takes up space</p>\n<p class=\"gone\">Completely removed from layout</p>",
    quiz: [
      {
        question: "What's the key difference between display: none and visibility: hidden?",
        options: [
          "They're identical",
          "display: none removes layout space; visibility: hidden keeps it reserved",
          "visibility: hidden also removes the element from the DOM",
          "display: none only works on images",
        ],
        correctIndex: 1,
        explanation: "One collapses the space, the other leaves an invisible gap.",
      },
      {
        question: "Which display value turns an element into a flexible layout container for its children?",
        options: ["inline", "block", "flex", "none"],
        correctIndex: 2,
        explanation: "display: flex enables Flexbox layout for direct children.",
      },
      {
        question: "Is an element with opacity: 0 still clickable?",
        options: ["No, it behaves like display: none", "Yes, it's invisible but still occupies space and is interactive", "Only on mobile", "It depends on the browser"],
        correctIndex: 1,
        explanation: "opacity only affects visual rendering, not layout or interactivity.",
      },
    ],
  },
  {
    id: "css-positioning",
    title: "Positioning",
    summary: "static, relative, absolute, fixed, and sticky positioning.",
    theory:
      "The position property changes how an element is placed. static is the default — elements flow normally and top/left/etc. have no effect. relative shifts an element from its normal position while still reserving its original space.\n\nabsolute removes the element from normal flow entirely and positions it relative to its nearest positioned ancestor (any ancestor with position other than static) — or the page if none exists. fixed positions relative to the viewport and stays put during scrolling. sticky behaves like relative until a scroll threshold is crossed, then 'sticks' like fixed within its parent's bounds — commonly used for sticky headers.",
    keyPoints: [
      "static (default): normal flow, top/left/right/bottom ignored.",
      "relative: shifts visually but keeps its original space reserved.",
      "absolute: positioned relative to the nearest non-static ancestor; removed from flow.",
      "sticky: relative until a scroll threshold, then behaves like fixed within its container.",
    ],
    example:
      "<style>\n  .parent { position: relative; height: 200px; border: 1px solid #ccc; }\n  .badge { position: absolute; top: 8px; right: 8px; background: red; color: white; }\n  .sticky-header { position: sticky; top: 0; background: white; }\n</style>\n<div class=\"parent\">\n  <span class=\"badge\">New</span>\n</div>",
    quiz: [
      {
        question: "What does position: absolute position an element relative to?",
        options: [
          "Always the viewport",
          "Its nearest ancestor with a non-static position (or the page if none)",
          "Its immediate parent, always",
          "The document's <body> only",
        ],
        correctIndex: 1,
        explanation: "Absolute positioning looks up the ancestor chain for the nearest positioned context.",
      },
      {
        question: "Which position value keeps an element fixed to the viewport even while scrolling?",
        options: ["relative", "absolute", "fixed", "static"],
        correctIndex: 2,
        explanation: "fixed positions relative to the viewport, ignoring scroll position.",
      },
      {
        question: "What makes position: sticky different from fixed?",
        options: [
          "They're identical",
          "sticky only activates fixed-like behavior after a scroll threshold, and stays within its parent's bounds",
          "sticky doesn't support the top property",
          "sticky removes the element from the DOM",
        ],
        correctIndex: 1,
        explanation: "sticky is a hybrid: relative until scrolled past a threshold, then fixed within its container.",
      },
    ],
  },
  {
    id: "css-flexbox",
    title: "Flexbox",
    summary: "One-dimensional layout for rows or columns of flexible items.",
    theory:
      "Flexbox is designed for laying out items in a single dimension — a row or a column — and distributing space between them. Setting display: flex on a container makes its direct children flex items, which you then control with properties like justify-content (alignment along the main axis) and align-items (alignment along the cross axis).\n\nflex-direction switches between row (default) and column. Individual items can grow, shrink, or have a fixed basis using the flex shorthand (flex-grow, flex-shrink, flex-basis), letting you build flexible, responsive layouts without floats or manual width math.",
    keyPoints: [
      "display: flex on a parent makes its children flex items automatically.",
      "justify-content aligns items along the main axis (row: horizontal by default).",
      "align-items aligns items along the cross axis (row: vertical by default).",
      "flex: 1 makes an item grow to fill available space equally with other flex: 1 siblings.",
    ],
    example:
      "<style>\n  .nav {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    gap: 16px;\n  }\n  .nav .spacer { flex: 1; }\n</style>\n<div class=\"nav\">\n  <div>Logo</div>\n  <div class=\"spacer\"></div>\n  <div>Menu</div>\n</div>",
    quiz: [
      {
        question: "What does display: flex do to an element's direct children?",
        options: [
          "Nothing, it only affects the element itself",
          "Turns them into flex items laid out along a main axis",
          "Hides them",
          "Converts them into a grid",
        ],
        correctIndex: 1,
        explanation: "The container's direct children become flex items subject to flex alignment rules.",
      },
      {
        question: "Which property controls alignment along the main axis?",
        options: ["align-items", "justify-content", "flex-wrap", "gap"],
        correctIndex: 1,
        explanation: "justify-content distributes space along the main axis (horizontal in a row).",
      },
      {
        question: "What does flex: 1 typically do to an item?",
        options: [
          "Fixes its width to 1px",
          "Makes it grow to share available space equally with similar siblings",
          "Removes it from the flex layout",
          "Centers it",
        ],
        correctIndex: 1,
        explanation: "flex: 1 is shorthand enabling the item to grow and fill leftover space.",
      },
    ],
  },
  {
    id: "css-grid",
    title: "CSS Grid",
    summary: "Two-dimensional layout for rows and columns together.",
    theory:
      "While Flexbox excels at one dimension, CSS Grid is built for two-dimensional layouts — rows and columns simultaneously. Setting display: grid on a container lets you define grid-template-columns and grid-template-rows to carve up space explicitly, using units like fr (a fraction of available space).\n\nItems can be placed precisely with grid-column and grid-row, or grid-template-areas can name regions in a visual, ASCII-art-like way for very readable layout definitions. Grid is ideal for full page layouts, dashboards, and card grids.",
    keyPoints: [
      "grid-template-columns: 1fr 1fr 1fr creates 3 equal-width columns.",
      "gap sets spacing between rows and columns in one property.",
      "grid-column: span 2 makes an item span multiple columns.",
      "grid-template-areas lets you name and visually lay out regions for very readable grids.",
    ],
    example:
      "<style>\n  .grid {\n    display: grid;\n    grid-template-columns: repeat(3, 1fr);\n    gap: 16px;\n  }\n  .featured { grid-column: span 2; }\n</style>\n<div class=\"grid\">\n  <div class=\"featured\">Featured card</div>\n  <div>Card 2</div>\n  <div>Card 3</div>\n</div>",
    quiz: [
      {
        question: "What is the key difference between Flexbox and Grid?",
        options: [
          "Grid only works in Chrome",
          "Flexbox is one-dimensional (row or column); Grid is two-dimensional (rows and columns together)",
          "Flexbox is newer than Grid",
          "There is no real difference",
        ],
        correctIndex: 1,
        explanation: "Grid manages both axes at once, which Flexbox doesn't natively do.",
      },
      {
        question: "What does the fr unit represent in Grid?",
        options: [
          "A fixed number of pixels",
          "A fraction of the available space in the grid container",
          "Font-relative sizing",
          "A percentage of the viewport",
        ],
        correctIndex: 1,
        explanation: "fr distributes remaining space proportionally among tracks.",
      },
      {
        question: "What does grid-column: span 2 do to an item?",
        options: [
          "Moves it to row 2",
          "Makes it span across 2 grid columns",
          "Duplicates the item",
          "Hides the item",
        ],
        correctIndex: 1,
        explanation: "span expands an item's width across multiple grid tracks.",
      },
    ],
  },
  {
    id: "css-spacing",
    title: "Margin, Padding & Spacing Techniques",
    summary: "Practical strategies for consistent spacing across a layout.",
    theory:
      "Margin creates space outside an element's border (between it and its neighbors); padding creates space inside, between the border and the content. Both accept shorthand syntax: a single value applies to all four sides, two values are vertical/horizontal, and four values go top/right/bottom/left (clockwise).\n\nA common modern technique is the 'gap' pattern using Flexbox or Grid's gap property instead of margins on individual children, which avoids margin-collapsing quirks and doesn't require special-casing the first/last child. Negative margins can also intentionally pull elements closer or overlap them, though they should be used sparingly.",
    keyPoints: [
      "Shorthand order for 4 values is top, right, bottom, left (clockwise from top).",
      "margin: 0 auto centers a block element horizontally when it has a set width.",
      "gap (in flex/grid containers) avoids collapsing-margin issues between children.",
      "Padding never collapses the way vertical margins between block siblings can.",
    ],
    example:
      "<style>\n  .banner { margin: 0 auto; width: 600px; padding: 16px 24px; }\n  .list { display: flex; flex-direction: column; gap: 12px; }\n</style>\n<div class=\"banner\">Centered banner</div>\n<div class=\"list\">\n  <div>Item</div>\n  <div>Item</div>\n</div>",
    quiz: [
      {
        question: "What does margin: 0 auto; commonly achieve?",
        options: [
          "Removes all margin",
          "Horizontally centers a block element with a defined width",
          "Adds equal margin on all sides",
          "Vertically centers an element",
        ],
        correctIndex: 1,
        explanation: "auto left/right margins split remaining horizontal space evenly.",
      },
      {
        question: "In the 4-value shorthand margin: 10px 15px 5px 20px, what does 15px apply to?",
        options: ["Top", "Right", "Bottom", "Left"],
        correctIndex: 1,
        explanation: "Order is top, right, bottom, left — clockwise starting at 12 o'clock.",
      },
      {
        question: "Why prefer gap over individual child margins in a flex/grid layout?",
        options: [
          "gap doesn't work in modern browsers",
          "It avoids margin-collapsing and doesn't need first/last-child exceptions",
          "gap only works with padding",
          "There's no practical benefit",
        ],
        correctIndex: 1,
        explanation: "gap creates spacing purely between items, cleanly, without collapse quirks.",
      },
    ],
  },
  {
    id: "css-backgrounds-borders",
    title: "Backgrounds & Borders",
    summary: "Styling element backgrounds and edges.",
    theory:
      "The background shorthand controls color, images, position, size, and repeat behavior. background-size: cover scales a background image to fill its container while preserving aspect ratio (cropping overflow), while contain scales to fit entirely within the container without cropping.\n\nborder-radius rounds corners — a single value rounds all corners equally, while four values (or the longhand border-top-left-radius, etc.) allow independent control, useful for pill-shaped buttons (border-radius: 9999px) or speech-bubble effects.",
    keyPoints: [
      "background-size: cover fills the box, cropping overflow; contain fits fully, may leave gaps.",
      "background-position controls where within the box the image is anchored.",
      "border-radius rounds corners; a very large value creates a pill/circle shape.",
      "box-shadow adds shadow: offset-x offset-y blur-radius color.",
    ],
    example:
      "<style>\n  .hero {\n    background: url('bg.jpg') center/cover no-repeat;\n    height: 240px;\n  }\n  .pill-btn {\n    border-radius: 9999px;\n    border: 2px solid #333;\n    box-shadow: 0 2px 6px rgba(0,0,0,0.15);\n    padding: 8px 20px;\n  }\n</style>\n<div class=\"hero\"></div>\n<button class=\"pill-btn\">Click me</button>",
    quiz: [
      {
        question: "What does background-size: cover do?",
        options: [
          "Fits the image fully inside the box, possibly leaving empty space",
          "Scales the image to fill the box completely, cropping overflow if needed",
          "Repeats the image to fill the box",
          "Stretches the image, ignoring aspect ratio",
        ],
        correctIndex: 1,
        explanation: "cover fills the box entirely while preserving aspect ratio, cropping as needed.",
      },
      {
        question: "How would you make a button perfectly pill/circle shaped?",
        options: [
          "Use a large border-radius value like 9999px",
          "Use border-radius: 0",
          "Use display: flex",
          "Use background-size: cover",
        ],
        correctIndex: 0,
        explanation: "A radius larger than half the element's size produces a full pill/circle shape.",
      },
      {
        question: "In box-shadow: 0 2px 6px rgba(0,0,0,0.15), what does 6px control?",
        options: ["Horizontal offset", "Vertical offset", "Blur radius", "Spread"],
        correctIndex: 2,
        explanation: "The third value in box-shadow shorthand is the blur radius.",
      },
    ],
  },
  {
    id: "css-pseudo",
    title: "Pseudo-classes & Pseudo-elements",
    summary: "Styling states and generated content without extra markup.",
    theory:
      "Pseudo-classes (single colon, like :hover, :focus, :nth-child()) target elements in a particular state or position, without needing extra classes in the HTML. :hover applies while the mouse is over an element, :focus applies while an input is active, and :nth-child(2n) targets every second child for patterns like striped tables.\n\nPseudo-elements (double colon, like ::before and ::after) let you insert generated content into the page purely through CSS, often used for decorative icons, tooltips, or custom bullet styling, using the content property to define what's inserted.",
    keyPoints: [
      ":hover, :focus, :active target interaction states without JavaScript.",
      ":nth-child(an+b) targets elements by position, e.g. :nth-child(odd) for stripes.",
      "::before/::after insert generated content and require a content property (even if empty).",
      "Pseudo-elements are commonly used for decorative icons or custom underline/highlight effects.",
    ],
    example:
      "<style>\n  a:hover { color: crimson; }\n  li:nth-child(odd) { background: #f5f5f5; }\n  .quote::before { content: '\\201C'; font-size: 1.5em; color: #999; }\n</style>\n<a href=\"#\">Hover me</a>\n<p class=\"quote\">A great quote.</p>",
    quiz: [
      {
        question: "What is the difference in syntax between pseudo-classes and pseudo-elements?",
        options: [
          "There's no syntax difference",
          "Pseudo-classes use a single colon (:hover); pseudo-elements use a double colon (::before)",
          "Pseudo-elements require JavaScript",
          "Pseudo-classes only work on links",
        ],
        correctIndex: 1,
        explanation: "The modern convention distinguishes them with single vs double colons.",
      },
      {
        question: "What is required for ::before or ::after to actually render?",
        options: [
          "A width and height",
          "A content property, even if set to an empty string",
          "A class on the parent",
          "display: block",
        ],
        correctIndex: 1,
        explanation: "Without a content property, generated content pseudo-elements won't appear.",
      },
      {
        question: "What does :nth-child(odd) select?",
        options: ["Every even-positioned child", "Every odd-positioned child (1st, 3rd, 5th...)", "Only the first child", "Only the last child"],
        correctIndex: 1,
        explanation: "It matches children at odd positions among their siblings.",
      },
    ],
  },
  {
    id: "css-transitions",
    title: "Transitions & Animations",
    summary: "Adding smooth motion between states with CSS alone.",
    theory:
      "transition smoothly animates a property change between two states (like on :hover) over a set duration, instead of it jumping instantly. It needs a property to watch, a duration, and optionally a timing function (ease, linear, ease-in-out) that shapes the speed curve.\n\nFor more complex, multi-step animations that don't need a trigger like hover, @keyframes defines a sequence of styles at percentage points (0%, 50%, 100%), and animation applies that keyframe sequence to an element with its own duration, timing, and iteration count.",
    keyPoints: [
      "transition: property duration timing-function — animates a single state change.",
      "@keyframes defines multi-step animations independent of user interaction.",
      "animation-iteration-count: infinite loops an animation forever.",
      "Animating transform and opacity is more performant than animating width/top directly.",
    ],
    example:
      "<style>\n  .btn {\n    transition: background 0.3s ease, transform 0.2s ease;\n  }\n  .btn:hover { background: #333; transform: translateY(-2px); }\n\n  @keyframes pulse {\n    0% { transform: scale(1); }\n    50% { transform: scale(1.1); }\n    100% { transform: scale(1); }\n  }\n  .badge { animation: pulse 1.5s ease-in-out infinite; }\n</style>\n<button class=\"btn\">Hover me</button>\n<span class=\"badge\">NEW</span>",
    quiz: [
      {
        question: "What does the transition property do?",
        options: [
          "Instantly applies a new style",
          "Smoothly animates a property's change between two values over time",
          "Only works on colors",
          "Requires JavaScript to function",
        ],
        correctIndex: 1,
        explanation: "transition interpolates a property change instead of an instant jump.",
      },
      {
        question: "What is @keyframes used for?",
        options: [
          "Defining a hover state",
          "Defining a sequence of styles at points in an animation timeline",
          "Setting a background image",
          "Declaring a CSS variable",
        ],
        correctIndex: 1,
        explanation: "@keyframes lets you script multi-step animations independent of interaction.",
      },
      {
        question: "Why is animating transform generally preferred over animating width or top?",
        options: [
          "It's not preferred, they're equivalent",
          "transform animations are typically more performant, avoiding layout recalculation",
          "transform can't be combined with transition",
          "Only transform works in @keyframes",
        ],
        correctIndex: 1,
        explanation: "transform/opacity changes are handled on the compositor without triggering layout.",
      },
    ],
  },
  {
    id: "css-responsive",
    title: "Responsive Design & Media Queries",
    summary: "Adapting layout to different screen sizes.",
    theory:
      "Responsive design means a layout adapts gracefully across screen sizes, from phones to large desktops. Media queries are the core tool: @media (max-width: 768px) { ... } applies styles only when the viewport matches that condition, commonly used to switch a multi-column layout to a single column on small screens.\n\nA 'mobile-first' approach writes base styles for small screens by default, then uses min-width media queries to add complexity for larger screens — generally leading to leaner, more maintainable CSS than the reverse (desktop-first with max-width overrides everywhere).",
    keyPoints: [
      "@media (max-width: 768px) applies rules only below that viewport width.",
      "Mobile-first CSS uses min-width breakpoints to progressively enhance for larger screens.",
      "Combine with flexible units (%, fr, vw) and flex-wrap/grid for layouts that adapt smoothly, not just at breakpoints.",
      "Common breakpoints (not fixed rules): ~480px (mobile), ~768px (tablet), ~1024px+ (desktop).",
    ],
    example:
      "<style>\n  .grid { display: grid; grid-template-columns: 1fr; gap: 16px; }\n\n  @media (min-width: 768px) {\n    .grid { grid-template-columns: 1fr 1fr; }\n  }\n  @media (min-width: 1024px) {\n    .grid { grid-template-columns: repeat(3, 1fr); }\n  }\n</style>\n<div class=\"grid\">\n  <div>Card</div><div>Card</div><div>Card</div>\n</div>",
    quiz: [
      {
        question: "What does @media (max-width: 768px) mean?",
        options: [
          "Apply these styles only when viewport width is 768px or less",
          "Apply these styles only above 768px",
          "Set the element's max-width to 768px",
          "Applies only on print",
        ],
        correctIndex: 0,
        explanation: "max-width in a media query is an upper bound condition for applying the rules.",
      },
      {
        question: "What defines a 'mobile-first' approach?",
        options: [
          "Designing only for mobile, ignoring desktop",
          "Writing base styles for small screens, then adding complexity via min-width queries",
          "Using max-width queries exclusively",
          "It refers to load order of scripts",
        ],
        correctIndex: 1,
        explanation: "Mobile-first starts simple and layers on enhancements as space increases.",
      },
      {
        question: "Which of these best supports responsive layouts alongside media queries?",
        options: [
          "Fixed pixel widths everywhere",
          "Flexible units and Flexbox/Grid that adapt fluidly",
          "Absolute positioning for every element",
          "Disabling the viewport meta tag",
        ],
        correctIndex: 1,
        explanation: "Flexible layout systems reduce how much work breakpoints alone have to do.",
      },
    ],
  },
  {
    id: "css-variables",
    title: "CSS Variables (Custom Properties)",
    summary: "Reusable, dynamic values defined once and referenced everywhere.",
    theory:
      "CSS custom properties (informally 'CSS variables') are defined with a double-dash prefix, like --primary-color: #4f46e5;, typically on :root to make them globally available. They're read with the var() function, optionally with a fallback: var(--primary-color, blue).\n\nUnlike preprocessor variables (like Sass's $variable), CSS custom properties are live in the browser — they can be changed at runtime with JavaScript or overridden within a specific scope (like a .dark-theme class), making them ideal for theming and dynamic UI without recompiling any CSS.",
    keyPoints: [
      "Defined as --name: value; usually on :root for global scope.",
      "Read using var(--name) or var(--name, fallback-value).",
      "Can be overridden within any selector's scope, enabling theming (e.g. .dark { --bg: #000; }).",
      "Unlike Sass variables, custom properties can be changed live via JavaScript at runtime.",
    ],
    example:
      "<style>\n  :root {\n    --primary: #4f46e5;\n    --radius: 8px;\n  }\n  .btn {\n    background: var(--primary);\n    border-radius: var(--radius);\n    color: white;\n    padding: 10px 18px;\n  }\n  .dark { --primary: #22d3ee; }\n</style>\n<button class=\"btn\">Themed button</button>",
    quiz: [
      {
        question: "How is a CSS custom property typically declared?",
        options: ["$primary: blue;", "--primary: blue;", "@primary: blue;", "var primary = blue;"],
        correctIndex: 1,
        explanation: "Custom properties use a double-dash prefix and are read with var().",
      },
      {
        question: "What's a key advantage of CSS variables over Sass variables?",
        options: [
          "They compile to smaller files",
          "They are live in the browser and can change at runtime (e.g. via JS or scoped overrides)",
          "They don't need var() to be read",
          "They work in older browsers that don't support Sass",
        ],
        correctIndex: 1,
        explanation: "Sass variables are compiled away; CSS custom properties persist and can update dynamically.",
      },
      {
        question: "Where are CSS variables commonly declared for global availability?",
        options: ["Inside every individual rule", "On the :root selector", "Only inside media queries", "In the <head> as an attribute"],
        correctIndex: 1,
        explanation: ":root gives the variable the broadest possible scope, similar to the html element.",
      },
    ],
  },
  {
    id: "css-specificity",
    title: "Specificity & the Cascade",
    summary: "How CSS decides which conflicting rule wins.",
    theory:
      "When multiple rules target the same element with conflicting declarations, CSS resolves the conflict using specificity — a scoring system. Roughly, ID selectors outweigh class selectors, which outweigh element selectors: an ID (#nav) beats a class (.nav), which beats a tag (nav).\n\nWhen specificity ties, the rule that appears later in the source wins (the 'cascade'). Inline styles (style=\"\") outrank all selectors, and !important overrides everything else, which is why it's generally discouraged — it makes future overrides much harder to reason about.",
    keyPoints: [
      "Specificity roughly ranks: inline styles > IDs > classes/attributes/pseudo-classes > elements.",
      "Equal specificity: the later rule in the source order wins.",
      "!important overrides normal specificity rules — use sparingly, it's hard to override later.",
      "Combining selectors (like .card.featured) increases specificity beyond a single class.",
    ],
    example:
      "<style>\n  p { color: blue; }         /* specificity: 1 element */\n  .note { color: green; }   /* specificity: 1 class, wins over p */\n  #alert { color: red; }    /* specificity: 1 ID, wins over .note */\n</style>\n<p id=\"alert\" class=\"note\">This text is red.</p>",
    quiz: [
      {
        question: "Which generally wins when specificity is equal?",
        options: [
          "The shorter selector",
          "The rule declared later in the source order",
          "The rule with more words",
          "It's undefined/random",
        ],
        correctIndex: 1,
        explanation: "The cascade breaks specificity ties using source order — later wins.",
      },
      {
        question: "Which of these has the highest specificity?",
        options: [".button", "button", "#submit-button", "button.button"],
        correctIndex: 2,
        explanation: "An ID selector outweighs classes and element selectors.",
      },
      {
        question: "Why is !important generally discouraged?",
        options: [
          "It's deprecated and doesn't work in modern browsers",
          "It overrides normal specificity, making future overrides difficult to manage",
          "It only works on classes",
          "It slows down page rendering significantly",
        ],
        correctIndex: 1,
        explanation: "!important breaks the normal cascade, creating maintenance headaches.",
      },
    ],
  },
];

export default cssTopics;