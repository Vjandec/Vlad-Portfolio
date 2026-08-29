/* ============================================================
   THEME — Dark / Light mode with localStorage persistence
   ============================================================ */
(function () {
  const STORAGE_KEY = "vlad-theme";
  const root = document.body;
  const toggleBtn = document.getElementById("theme-toggle");

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) { /* storage unavailable */ }
  }

  function getPreferredTheme() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "dark" || saved === "light") return saved;
    } catch (e) { /* ignore */ }
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }

  applyTheme(getPreferredTheme());

  if (toggleBtn) {
    toggleBtn.addEventListener("click", function () {
      const current = root.getAttribute("data-theme");
      applyTheme(current === "dark" ? "light" : "dark");
    });
  }
})();
