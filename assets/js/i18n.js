/*
 * MulitaMiner i18n: swaps text from window.TRANSLATIONS based on the
 * selected language. No dependencies, no build step.
 *
 * Resolution order for the initial language:
 *   1. localStorage (a previous explicit choice)
 *   2. browser language (navigator.language), if PT/ES/EN
 *   3. English fallback
 */
(function () {
  "use strict";

  var SUPPORTED = ["pt", "es", "en"];
  var FALLBACK = "en";
  var STORAGE_KEY = "mulitaminer.lang";
  var T = window.TRANSLATIONS || {};

  function detectLanguage() {
    var saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) {}
    if (saved && SUPPORTED.indexOf(saved) !== -1) return saved;

    var nav = (navigator.language || navigator.userLanguage || "").slice(0, 2).toLowerCase();
    if (SUPPORTED.indexOf(nav) !== -1) return nav;

    return FALLBACK;
  }

  function translate(key, lang) {
    var dict = T[lang] || {};
    if (dict[key] != null) return dict[key];
    var fb = T[FALLBACK] || {};
    return fb[key] != null ? fb[key] : null;
  }

  function applyLanguage(lang) {
    if (SUPPORTED.indexOf(lang) === -1) lang = FALLBACK;

    document.documentElement.setAttribute("lang", lang);

    var nodes = document.querySelectorAll("[data-i18n]");
    nodes.forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      var value = translate(key, lang);
      if (value == null) return;

      var attr = el.getAttribute("data-i18n-attr");
      if (attr) {
        el.setAttribute(attr, value);
      } else {
        el.textContent = value;
      }
    });

    // Update the active state on the language buttons.
    var buttons = document.querySelectorAll(".lang-btn");
    buttons.forEach(function (btn) {
      var isActive = btn.getAttribute("data-lang") === lang;
      btn.classList.toggle("is-active", isActive);
      btn.setAttribute("aria-pressed", isActive ? "true" : "false");
    });

    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
  }

  function init() {
    applyLanguage(detectLanguage());

    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        applyLanguage(btn.getAttribute("data-lang"));
      });
    });
  }

  // Expose for other scripts if needed.
  window.MulitaI18n = { apply: applyLanguage, detect: detectLanguage };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
