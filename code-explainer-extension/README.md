# 💡 CodeWord Explainer - Chrome Extension

> **Double-click any programming keyword or concept on any webpage to instantly view explanations, syntax code examples, audio pronunciation, and official documentation links!**

Built with modern **HTML**, **CSS**, and **JavaScript** using **Manifest V3**.

---

## 🚀 Quick Start & Installation

Install and test the extension in Chrome, Edge, or Brave in less than 1 minute:

1. Open your browser and navigate to the Extensions page:
   - In **Google Chrome**: go to `chrome://extensions/`
   - In **Microsoft Edge**: go to `edge://extensions/`
   - In **Brave**: go to `brave://extensions/`
2. In the top-right corner, turn on **Developer mode**.
3. Click the **Load unpacked** button.
4. Select this directory:
   ```text
   C:\Users\DELL\.gemini\antigravity\scratch\code-explainer-extension
   ```
5. **Test it immediately**:
   - Open `test-page.html` in your browser (or click the test beaker 🧪 button in the extension popup).
   - Double-click on words like `closure`, `async`, `useState`, `docker`, `recursion`, or `polymorphism`!

---

## ✨ Features

- 🖱️ **Instant Double-Click Lookup**: Seamlessly triggers on double-clicking any programming or coding term on any webpage (GitHub, Medium, StackOverflow, blogs, docs).
- 🛡️ **Shadow DOM Encapsulated UI**: The explanation card is rendered inside an isolated Shadow DOM root (`#code-explainer-root`). The host website's CSS can **never** break the card's styling, and the card's styles will **never** leak into or distort the webpage!
- 📚 **Comprehensive 150+ Term Offline Dictionary**:
  - **JavaScript & TypeScript**: `async`, `await`, `Promise`, `closure`, `hoisting`, `prototype`, `destructuring`, `currying`, `debounce`, `throttle`, `generics`, `interface`...
  - **Python**: `lambda`, `decorator`, `generator`, `yield`, `self`, `gil`, `comprehension`...
  - **OOP & Patterns**: `class`, `inheritance`, `polymorphism`, `encapsulation`, `abstraction`, `singleton`, `factory`, `solid`...
  - **Data Structures & Algorithms**: `big o`, `recursion`, `hashmap`, `binary search`, `stack`, `queue`, `linked list`, `tree`, `graph`, `dynamic programming`...
  - **Web, APIs & Security**: `rest`, `graphql`, `websocket`, `jwt`, `oauth`, `cors`, `dom`, `flexbox`, `grid`...
  - **Modern Frameworks**: `useState`, `useEffect`, `useMemo`, `component`...
  - **DevOps & DB**: `docker`, `kubernetes`, `git`, `ci/cd`, `sql`, `nosql`, `redis`, `acid`, `index`...
- 🔊 **Voice Pronunciation**: Listen to the technical term and quick summary read out loud using the browser's native Speech Synthesis API.
- 📋 **1-Click Code Copy**: Easily copy formatted code examples right to your clipboard.
- 🎨 **Adaptive Themes**: Supports Dark Mode, Light Mode, and Auto (system preference).
- 🔍 **In-Popup Quick Search & Explore**: Search any term directly from the extension action popup with instant autocomplete and category filtering.
- 🔒 **100% Private & Zero Latency**: No tracking, no external API latency, works completely offline.

---

## 📂 Project Architecture

```
code-explainer-extension/
├── manifest.json              # Chrome Manifest V3 configuration
├── icons/                     # Extension icons (16px, 48px, 128px)
│   ├── icon-16.png
│   ├── icon-48.png
│   └── icon-128.png
├── content/
│   ├── dictionary.js          # Built-in programming terminology database
│   └── content.js             # Double-click listener & Shadow DOM popover renderer
├── popup/
│   ├── popup.html             # Action popup interface
│   ├── popup.css              # Popup styling & theme definitions
│   └── popup.js               # Settings toggle, search & category browser
├── test-page.html             # Interactive testing playground
├── CHROMEWEBSTORE.md          # Chrome Web Store submission & permissions guide
└── README.md                  # Documentation and setup instructions
```

---

## 🛠️ Adding Custom Keywords

To add your own custom terms, open [`content/dictionary.js`](file:///C:/Users/DELL/.gemini/antigravity/scratch/code-explainer-extension/content/dictionary.js) and add an entry:

```javascript
"mykeyword": {
  term: "MyKeyword",
  category: "Language / Category",
  summary: "A short 1-sentence summary.",
  details: "Detailed explanation of how and when to use it.",
  example: "const example = true;",
  link: "https://example.com/docs"
}
```

Then reload the extension on `chrome://extensions/` by clicking the reload arrow icon.
