/**
 * CodeWord Explainer - Content Script
 * Listens for double-clicks, looks up programming keywords,
 * and renders an encapsulated explanation popover using Shadow DOM.
 */

(function () {
  // Prevent duplicate script execution
  if (window.__codeExplainerLoaded) return;
  window.__codeExplainerLoaded = true;

  let hostElement = null;
  let shadowRoot = null;
  let currentPopover = null;
  let isEnabled = true;
  let voiceEnabled = true;
  let currentTheme = "auto";

  // Load user preferences from chrome.storage.local
  async function loadSettings() {
    try {
      const settings = await chrome.storage.local.get({
        enabled: true,
        voiceEnabled: true,
        theme: "auto"
      });
      isEnabled = settings.enabled;
      voiceEnabled = settings.voiceEnabled;
      currentTheme = settings.theme;
    } catch (err) {
      console.warn("[CodeWord Explainer] Storage read warning:", err);
    }
  }

  loadSettings();

  // Listen for settings changes from popup
  if (chrome.storage && chrome.storage.onChanged) {
    chrome.storage.onChanged.addListener((changes, area) => {
      if (area === "local") {
        if (changes.enabled) isEnabled = changes.enabled.newValue;
        if (changes.voiceEnabled) voiceEnabled = changes.voiceEnabled.newValue;
        if (changes.theme) {
          currentTheme = changes.theme.newValue;
          if (currentPopover) {
            applyThemeClass(currentPopover);
          }
        }
      }
    });
  }

  // Initialize Shadow DOM Container
  function getOrCreateShadowHost() {
    if (!hostElement) {
      hostElement = document.getElementById("code-explainer-root");
      if (!hostElement) {
        hostElement = document.createElement("div");
        hostElement.id = "code-explainer-root";
        hostElement.style.all = "initial";
        hostElement.style.position = "absolute";
        hostElement.style.top = "0";
        hostElement.style.left = "0";
        hostElement.style.zIndex = "2147483647"; // Top layer
        (document.body || document.documentElement).appendChild(hostElement);
      }
    }

    if (!shadowRoot) {
      shadowRoot = hostElement.attachShadow({ mode: "open" });
      const style = document.createElement("style");
      style.textContent = getPopoverCSS();
      shadowRoot.appendChild(style);
    }

    return shadowRoot;
  }

  // Double-click handler on the page
  document.addEventListener("dblclick", async (e) => {
    if (!isEnabled) return;

    // Small delay to let browser finish native text selection
    setTimeout(() => {
      handleWordLookup(e);
    }, 10);
  });

  // Close popover on click outside
  document.addEventListener("pointerdown", (e) => {
    if (!currentPopover) return;
    // Check if clicked inside host element
    if (hostElement && hostElement.contains(e.target)) {
      return;
    }
    removePopover();
  });

  // Close popover on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && currentPopover) {
      removePopover();
    }
  });

  function handleWordLookup(e) {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) return;

    const selectedText = selection.toString().trim();
    if (!selectedText || selectedText.length > 50) return;

    // Look up in dictionary
    if (!window.CodeExplainerDictionary) return;
    const entry = window.CodeExplainerDictionary.get(selectedText);

    if (entry) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      showPopover(entry, rect);
    }
  }

  function applyThemeClass(container) {
    container.classList.remove("theme-light", "theme-dark");
    if (currentTheme === "light") {
      container.classList.add("theme-light");
    } else if (currentTheme === "dark") {
      container.classList.add("theme-dark");
    } else {
      // Auto: detect system dark mode
      const isSystemDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      container.classList.add(isSystemDark ? "theme-dark" : "theme-light");
    }
  }

  function showPopover(data, targetRect) {
    const root = getOrCreateShadowHost();
    removePopover();

    const popover = document.createElement("div");
    popover.className = "cx-card";
    applyThemeClass(popover);

    // Build popover internal DOM
    popover.innerHTML = `
      <div class="cx-header">
        <div class="cx-title-wrap">
          <span class="cx-badge">${escapeHtml(data.category)}</span>
          <h2 class="cx-title">${escapeHtml(data.term)}</h2>
        </div>
        <div class="cx-actions">
          <button class="cx-btn-icon cx-btn-speak" title="Listen to pronunciation & summary" aria-label="Speak">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            </svg>
          </button>
          <button class="cx-btn-icon cx-btn-close" title="Close (Esc)" aria-label="Close">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      <div class="cx-body">
        <div class="cx-summary">
          <strong>TL;DR:</strong> ${escapeHtml(data.summary)}
        </div>

        <div class="cx-details">
          ${escapeHtml(data.details)}
        </div>

        ${
          data.example
            ? `
          <div class="cx-code-wrap">
            <div class="cx-code-header">
              <span>Code Example</span>
              <button class="cx-btn-copy" type="button">Copy</button>
            </div>
            <pre class="cx-code"><code>${escapeHtml(data.example)}</code></pre>
          </div>
        `
            : ""
        }
      </div>

      <div class="cx-footer">
        <a href="${data.link}" target="_blank" rel="noopener noreferrer" class="cx-link">
          Official Docs ↗
        </a>
        <span class="cx-hint">Double-click any keyword</span>
      </div>
    `;

    // Wire Event Handlers
    const closeBtn = popover.querySelector(".cx-btn-close");
    closeBtn.addEventListener("click", () => removePopover());

    const speakBtn = popover.querySelector(".cx-btn-speak");
    speakBtn.addEventListener("click", () => {
      speakExplanation(data.term, data.summary);
    });

    const copyBtn = popover.querySelector(".cx-btn-copy");
    if (copyBtn && data.example) {
      copyBtn.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(data.example);
          copyBtn.textContent = "Copied!";
          setTimeout(() => {
            copyBtn.textContent = "Copy";
          }, 1800);
        } catch (err) {
          copyBtn.textContent = "Failed";
        }
      });
    }

    root.appendChild(popover);
    currentPopover = popover;

    // Auto pronounce if enabled in settings
    if (voiceEnabled) {
      speakExplanation(data.term, data.summary);
    }

    // Position Popover nicely near the selected text
    positionPopover(popover, targetRect);
  }

  function positionPopover(popover, targetRect) {
    const margin = 12;
    const popoverRect = popover.getBoundingClientRect();
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Default horizontal placement: centered on the word
    let left = targetRect.left + scrollX + (targetRect.width / 2) - (popoverRect.width / 2);

    // Keep within horizontal viewport bounds
    if (left - scrollX < margin) {
      left = scrollX + margin;
    } else if (left - scrollX + popoverRect.width > viewportWidth - margin) {
      left = scrollX + viewportWidth - popoverRect.width - margin;
    }

    // Vertical placement: Prefer below the word
    let top = targetRect.bottom + scrollY + margin;

    // If bottom overflows, flip to above the word
    if (targetRect.bottom + popoverRect.height + margin > viewportHeight) {
      const topPlacement = targetRect.top + scrollY - popoverRect.height - margin;
      if (topPlacement - scrollY > 0) {
        top = topPlacement;
      }
    }

    popover.style.left = `${Math.round(left)}px`;
    popover.style.top = `${Math.round(top)}px`;
  }

  function removePopover() {
    if (currentPopover && currentPopover.parentNode) {
      currentPopover.classList.add("cx-closing");
      setTimeout(() => {
        if (currentPopover && currentPopover.parentNode) {
          currentPopover.parentNode.removeChild(currentPopover);
        }
        currentPopover = null;
      }, 150);
    }
    // Cancel any active speech
    if (window.speechSynthesis && window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
  }

  function speakExplanation(term, summary) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel(); // Stop prior speech

    const text = `${term}. ${summary}`;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  }

  function escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Encapsulated Shadow DOM Styles
  function getPopoverCSS() {
    return `
      *, *::before, *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      .cx-card {
        position: absolute;
        width: 380px;
        max-width: 92vw;
        border-radius: 12px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        font-size: 13.5px;
        line-height: 1.5;
        box-shadow: 0 16px 36px rgba(0, 0, 0, 0.22), 0 0 0 1px rgba(255, 255, 255, 0.1);
        z-index: 2147483647;
        opacity: 0;
        transform: translateY(6px) scale(0.98);
        animation: cxFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        overflow: hidden;
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
      }

      .cx-card.cx-closing {
        opacity: 0;
        transform: translateY(4px) scale(0.97);
        transition: opacity 0.15s ease, transform 0.15s ease;
      }

      @keyframes cxFadeIn {
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      /* Dark Theme (Default) */
      .cx-card.theme-dark {
        background: rgba(18, 22, 34, 0.94);
        color: #E2E8F0;
        border: 1px solid rgba(255, 255, 255, 0.14);
      }
      .cx-card.theme-dark .cx-header {
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      }
      .cx-card.theme-dark .cx-summary {
        background: rgba(99, 102, 241, 0.12);
        border-left: 3px solid #6366F1;
        color: #C7D2FE;
      }
      .cx-card.theme-dark .cx-details {
        color: #CBD5E1;
      }
      .cx-card.theme-dark .cx-code-wrap {
        background: #0D1117;
        border: 1px solid #30363D;
      }
      .cx-card.theme-dark .cx-code-header {
        background: #161B22;
        border-bottom: 1px solid #30363D;
        color: #8B949E;
      }
      .cx-card.theme-dark .cx-code {
        color: #58A6FF;
      }
      .cx-card.theme-dark .cx-footer {
        border-top: 1px solid rgba(255, 255, 255, 0.08);
        background: rgba(0, 0, 0, 0.2);
      }
      .cx-card.theme-dark .cx-btn-icon {
        color: #94A3B8;
      }
      .cx-card.theme-dark .cx-btn-icon:hover {
        background: rgba(255, 255, 255, 0.1);
        color: #FFFFFF;
      }

      /* Light Theme */
      .cx-card.theme-light {
        background: rgba(255, 255, 255, 0.96);
        color: #1E293B;
        border: 1px solid rgba(0, 0, 0, 0.12);
        box-shadow: 0 16px 36px rgba(0, 0, 0, 0.14), 0 0 0 1px rgba(0, 0, 0, 0.05);
      }
      .cx-card.theme-light .cx-header {
        border-bottom: 1px solid rgba(0, 0, 0, 0.08);
      }
      .cx-card.theme-light .cx-summary {
        background: rgba(79, 70, 229, 0.08);
        border-left: 3px solid #4F46E5;
        color: #3730A3;
      }
      .cx-card.theme-light .cx-details {
        color: #475569;
      }
      .cx-card.theme-light .cx-code-wrap {
        background: #F8FAFC;
        border: 1px solid #E2E8F0;
      }
      .cx-card.theme-light .cx-code-header {
        background: #EDF2F7;
        border-bottom: 1px solid #E2E8F0;
        color: #64748B;
      }
      .cx-card.theme-light .cx-code {
        color: #0F172A;
      }
      .cx-card.theme-light .cx-footer {
        border-top: 1px solid rgba(0, 0, 0, 0.08);
        background: #F8FAFC;
      }
      .cx-card.theme-light .cx-btn-icon {
        color: #64748B;
      }
      .cx-card.theme-light .cx-btn-icon:hover {
        background: rgba(0, 0, 0, 0.06);
        color: #0F172A;
      }

      /* Common Elements */
      .cx-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 14px;
      }
      .cx-title-wrap {
        display: flex;
        flex-direction: column;
        gap: 3px;
      }
      .cx-badge {
        display: inline-block;
        font-size: 10.5px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: #818CF8;
      }
      .theme-light .cx-badge {
        color: #4F46E5;
      }
      .cx-title {
        font-size: 17px;
        font-weight: 700;
        letter-spacing: -0.2px;
      }
      .cx-actions {
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .cx-btn-icon {
        background: transparent;
        border: none;
        cursor: pointer;
        padding: 5px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.15s ease, color 0.15s ease;
      }

      .cx-body {
        padding: 12px 14px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        max-height: 380px;
        overflow-y: auto;
      }

      .cx-summary {
        padding: 8px 10px;
        border-radius: 6px;
        font-size: 13px;
        line-height: 1.45;
      }

      .cx-details {
        font-size: 13px;
        line-height: 1.5;
      }

      .cx-code-wrap {
        border-radius: 6px;
        overflow: hidden;
      }
      .cx-code-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px 10px;
        font-size: 11px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      .cx-btn-copy {
        background: transparent;
        border: none;
        color: inherit;
        font-size: 11px;
        cursor: pointer;
        padding: 2px 6px;
        border-radius: 4px;
      }
      .cx-btn-copy:hover {
        background: rgba(255, 255, 255, 0.15);
      }
      .theme-light .cx-btn-copy:hover {
        background: rgba(0, 0, 0, 0.08);
      }
      .cx-code {
        padding: 10px;
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
        font-size: 12px;
        line-height: 1.45;
        overflow-x: auto;
        white-space: pre;
      }

      .cx-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 9px 14px;
        font-size: 11.5px;
      }
      .cx-link {
        color: #6366F1;
        text-decoration: none;
        font-weight: 600;
        transition: color 0.15s ease;
      }
      .cx-link:hover {
        text-decoration: underline;
        color: #4F46E5;
      }
      .cx-hint {
        color: #94A3B8;
        font-size: 11px;
      }
    `;
  }
})();
