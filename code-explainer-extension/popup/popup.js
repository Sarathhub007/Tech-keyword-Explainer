/**
 * CodeWord Explainer - Popup Script
 * Handles settings persistence, in-popup search, category browsing, and sandbox launching.
 */

document.addEventListener("DOMContentLoaded", async () => {
  const toggleEnabled = document.getElementById("toggleEnabled");
  const statusIndicator = document.getElementById("statusIndicator");
  const toggleVoice = document.getElementById("toggleVoice");
  const themeSelect = document.getElementById("themeSelect");
  const searchInput = document.getElementById("searchInput");
  const btnClearSearch = document.getElementById("btnClearSearch");
  const searchResultsList = document.getElementById("searchResultsList");
  const detailView = document.getElementById("detailView");
  const tagsCloud = document.getElementById("tagsCloud");
  const btnOpenTest = document.getElementById("btnOpenTest");
  const btnOpenSandboxLink = document.getElementById("btnOpenSandboxLink");

  // 1. Load initial settings
  const settings = await chrome.storage.local.get({
    enabled: true,
    voiceEnabled: true,
    theme: "auto"
  });

  toggleEnabled.checked = settings.enabled;
  updateStatusText(settings.enabled);

  toggleVoice.checked = settings.voiceEnabled;
  themeSelect.value = settings.theme;
  applyTheme(settings.theme);

  // 2. Settings Listeners
  toggleEnabled.addEventListener("change", async () => {
    const isEnabled = toggleEnabled.checked;
    await chrome.storage.local.set({ enabled: isEnabled });
    updateStatusText(isEnabled);
  });

  toggleVoice.addEventListener("change", async () => {
    await chrome.storage.local.set({ voiceEnabled: toggleVoice.checked });
  });

  themeSelect.addEventListener("change", async () => {
    const newTheme = themeSelect.value;
    await chrome.storage.local.set({ theme: newTheme });
    applyTheme(newTheme);
  });

  function updateStatusText(enabled) {
    if (enabled) {
      statusIndicator.textContent = "Active on all pages";
      statusIndicator.classList.remove("disabled");
    } else {
      statusIndicator.textContent = "Disabled (Paused)";
      statusIndicator.classList.add("disabled");
    }
  }

  function applyTheme(theme) {
    if (theme === "light") {
      document.body.setAttribute("data-theme", "light");
    } else if (theme === "dark") {
      document.body.removeAttribute("data-theme");
    } else {
      // Auto: detect system dark mode
      const isDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (isDark) {
        document.body.removeAttribute("data-theme");
      } else {
        document.body.setAttribute("data-theme", "light");
      }
    }
  }

  // 3. Populate Quick Explore Tags
  const popularKeywords = [
    "async",
    "closure",
    "lambda",
    "recursion",
    "hashmap",
    "polymorphism",
    "docker",
    "websocket",
    "jwt",
    "solid",
    "git",
    "sql",
    "useState",
    "big o"
  ];

  tagsCloud.innerHTML = "";
  popularKeywords.forEach((termKey) => {
    const chip = document.createElement("button");
    chip.className = "tag-chip";
    chip.textContent = termKey;
    chip.type = "button";
    chip.addEventListener("click", () => {
      searchInput.value = termKey;
      handleSearch(termKey);
    });
    tagsCloud.appendChild(chip);
  });

  // 4. In-Popup Search Functionality
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim();
    if (query.length > 0) {
      btnClearSearch.classList.remove("hidden");
    } else {
      btnClearSearch.classList.add("hidden");
      searchResultsList.classList.add("hidden");
      detailView.classList.add("hidden");
    }
    handleSearch(query);
  });

  btnClearSearch.addEventListener("click", () => {
    searchInput.value = "";
    btnClearSearch.classList.add("hidden");
    searchResultsList.classList.add("hidden");
    detailView.classList.add("hidden");
    searchInput.focus();
  });

  function handleSearch(query) {
    if (!query) {
      searchResultsList.classList.add("hidden");
      return;
    }

    if (!window.CodeExplainerDictionary) return;

    // Check for exact match first
    const exact = window.CodeExplainerDictionary.get(query);
    if (exact) {
      renderDetail(exact);
      searchResultsList.classList.add("hidden");
      return;
    }

    // Fuzzy search through dictionary
    const results = window.CodeExplainerDictionary.search(query);
    if (results.length > 0) {
      renderResultsList(results);
    } else {
      searchResultsList.innerHTML = `
        <div style="padding: 12px; text-align: center; color: var(--text-muted); font-size: 12px;">
          No exact matches for "<strong>${escapeHtml(query)}</strong>".
          <div style="margin-top: 8px;">
            <a href="https://devdocs.io/#q=${encodeURIComponent(query)}" target="_blank" style="color: var(--accent); font-weight: 600;">
              Search DevDocs ↗
            </a>
          </div>
        </div>
      `;
      searchResultsList.classList.remove("hidden");
      detailView.classList.add("hidden");
    }
  }

  function renderResultsList(results) {
    searchResultsList.innerHTML = "";
    results.slice(0, 8).forEach((item) => {
      const row = document.createElement("div");
      row.className = "search-item";
      row.innerHTML = `
        <span class="search-item-term">${escapeHtml(item.term)}</span>
        <span class="search-item-cat">${escapeHtml(item.category)}</span>
      `;
      row.addEventListener("click", () => {
        renderDetail(item);
        searchResultsList.classList.add("hidden");
      });
      searchResultsList.appendChild(row);
    });
    searchResultsList.classList.remove("hidden");
  }

  function renderDetail(item) {
    detailView.innerHTML = `
      <div class="detail-header">
        <span class="detail-badge">${escapeHtml(item.category)}</span>
        <button id="btnDetailClose" class="btn-icon" style="padding: 2px 6px; font-size: 11px;">✕</button>
      </div>
      <h3 class="detail-title">${escapeHtml(item.term)}</h3>
      <div class="detail-summary">
        <strong>TL;DR:</strong> ${escapeHtml(item.summary)}
      </div>
      <p class="detail-text">${escapeHtml(item.details)}</p>
      ${
        item.example
          ? `<pre class="detail-code"><code>${escapeHtml(item.example)}</code></pre>`
          : ""
      }
      <div class="detail-actions">
        <a href="${item.link}" target="_blank" class="detail-link">Documentation ↗</a>
        <button id="btnSpeakDetail" class="btn-icon" title="Listen" style="padding: 4px 8px; font-size: 11px;">
          🔊 Speak
        </button>
      </div>
    `;

    detailView.classList.remove("hidden");

    const closeBtn = detailView.querySelector("#btnDetailClose");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        detailView.classList.add("hidden");
      });
    }

    const speakBtn = detailView.querySelector("#btnSpeakDetail");
    if (speakBtn) {
      speakBtn.addEventListener("click", () => {
        if (window.speechSynthesis) {
          window.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance(`${item.term}. ${item.summary}`);
          window.speechSynthesis.speak(utterance);
        }
      });
    }
  }

  // 5. Open Sandbox Test Page
  function openSandbox() {
    chrome.tabs.create({ url: chrome.runtime.getURL("test-page.html") });
  }

  btnOpenTest.addEventListener("click", openSandbox);
  btnOpenSandboxLink.addEventListener("click", openSandbox);

  function escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
});
