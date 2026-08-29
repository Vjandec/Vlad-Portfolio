/* ============================================================
   COMMAND PALETTE — Ctrl/Cmd + K
   ============================================================ */
(function () {
  let selectedIndex = 0;
  let currentItems = [];

  function getPalette() { return document.getElementById("command-palette"); }
  function getInput() { return document.getElementById("palette-input"); }
  function getResults() { return document.getElementById("palette-results"); }

  function buildItems(query) {
    if (typeof VladData === "undefined") return [];
    const q = (query || "").trim().toLowerCase();
    return VladData.navItems.filter(function (item) {
      return item.label.toLowerCase().indexOf(q) !== -1;
    });
  }

  function renderResults(query) {
    const results = getResults();
    if (!results) return;
    results.innerHTML = "";
    currentItems = buildItems(query);
    selectedIndex = 0;

    if (currentItems.length === 0) {
      const li = document.createElement("li");
      li.style.cssText = "padding:16px;color:var(--c-text-dim);font-size:0.9rem;";
      li.textContent = "No matching section.";
      results.appendChild(li);
      return;
    }

    currentItems.forEach(function (item, i) {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = "#" + item.id;
      a.className = i === 0 ? "is-selected" : "";
      a.innerHTML = "<span>" + item.label + "</span><span class=\"pr-arrow\">&rarr;</span>";
      a.addEventListener("click", function () { closePalette(); });
      li.appendChild(a);
      results.appendChild(li);
    });
  }

  function updateSelection(delta) {
    if (currentItems.length === 0) return;
    selectedIndex = (selectedIndex + delta + currentItems.length) % currentItems.length;
    const links = getResults().querySelectorAll("a");
    links.forEach(function (a, i) { a.classList.toggle("is-selected", i === selectedIndex); });
    if (links[selectedIndex]) links[selectedIndex].scrollIntoView({ block: "nearest" });
  }

  function openPalette() {
    const palette = getPalette();
    if (!palette) return;
    palette.hidden = false;
    renderResults("");
    const input = getInput();
    if (input) { input.value = ""; setTimeout(function () { input.focus(); }, 30); }
    document.body.style.overflow = "hidden";
  }

  function closePalette() {
    const palette = getPalette();
    if (!palette) return;
    palette.hidden = true;
    document.body.style.overflow = "";
  }

  document.addEventListener("DOMContentLoaded", function () {
    const trigger = document.getElementById("palette-trigger");
    if (trigger) trigger.addEventListener("click", openPalette);

    Array.prototype.forEach.call(document.querySelectorAll("[data-close-palette]"), function (node) {
      node.addEventListener("click", closePalette);
    });

    const input = getInput();
    if (input) {
      input.addEventListener("input", function () { renderResults(input.value); });
    }

    document.addEventListener("keydown", function (e) {
      const isMeta = e.metaKey || e.ctrlKey;
      if (isMeta && e.key.toLowerCase() === "k") {
        e.preventDefault();
        const palette = getPalette();
        if (palette && palette.hidden) openPalette(); else closePalette();
        return;
      }
      const palette = getPalette();
      if (!palette || palette.hidden) return;
      if (e.key === "Escape") { closePalette(); return; }
      if (e.key === "ArrowDown") { e.preventDefault(); updateSelection(1); return; }
      if (e.key === "ArrowUp") { e.preventDefault(); updateSelection(-1); return; }
      if (e.key === "Enter") {
        const links = getResults().querySelectorAll("a");
        if (links[selectedIndex]) links[selectedIndex].click();
      }
    });
  });
})();
