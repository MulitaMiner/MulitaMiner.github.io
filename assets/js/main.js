/*
 * MulitaMiner UI interactions: mobile nav toggle and copy-to-clipboard.
 * Kept tiny and dependency-free.
 */
(function () {
  "use strict";

  // ----- Mobile navigation -----
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");

  if (toggle && header) {
    toggle.addEventListener("click", function () {
      var open = header.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    // Close the menu after tapping a nav link.
    header.querySelectorAll(".main-nav a").forEach(function (link) {
      link.addEventListener("click", function () {
        header.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ----- Copy to clipboard (BibTeX, snippets) -----
  document.querySelectorAll("[data-copy-target]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var target = document.querySelector(btn.getAttribute("data-copy-target"));
      if (!target) return;

      var text = target.textContent;
      var label = btn.querySelector("[data-i18n]") || btn;
      var lang = document.documentElement.getAttribute("lang") || "en";
      var dict = (window.TRANSLATIONS && window.TRANSLATIONS[lang]) || {};
      var doneText = dict["paper.copied"] || "Copied";
      var original = label.textContent;

      function feedback() {
        label.textContent = doneText;
        btn.classList.add("is-done");
        setTimeout(function () {
          label.textContent = original;
          btn.classList.remove("is-done");
        }, 1800);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(feedback).catch(fallbackCopy);
      } else {
        fallbackCopy();
      }

      function fallbackCopy() {
        var ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "absolute";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand("copy"); feedback(); } catch (e) {}
        document.body.removeChild(ta);
      }
    });
  });
})();
