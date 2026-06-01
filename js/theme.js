/**
 * Portfolio site — Apex theme, footer, work cards
 */
(function () {
  "use strict";

  var THEME = "apex";

  function applyTheme() {
    document.documentElement.setAttribute("data-theme", THEME);
    var link = document.getElementById("pf-theme-css");
    if (!link) {
      return;
    }
    var href = link.getAttribute("href") || "";
    var base = href.indexOf("../") === 0 ? "../css/themes/" : "css/themes/";
    link.setAttribute("href", base + "theme-apex.css");
  }

  function enhanceWorkCards() {
    var grids = document.querySelectorAll("a.work .work-grid");

    for (var i = 0; i < grids.length; i++) {
      var grid = grids[i];
      if (grid.classList.contains("pf-work-enhanced")) {
        continue;
      }

      var link = grid.closest("a.work");
      var desc = grid.querySelector(".desc");
      if (!desc) {
        continue;
      }

      var computedBg = window.getComputedStyle(grid).backgroundImage;
      var bg =
        grid.style.backgroundImage ||
        (computedBg && computedBg !== "none" ? computedBg : "");

      var titleEl = desc.querySelector("h3");
      var catEl = desc.querySelector(".cat");

      grid.classList.add("pf-work-enhanced");
      grid.style.backgroundImage = "none";

      var thumb = document.createElement("div");
      thumb.className = "pf-work-thumb";
      ["web-height", "banner-height", "edm-height", "edm-height2"].forEach(function (cls) {
        if (grid.classList.contains(cls)) {
          thumb.classList.add(cls);
        }
      });
      if (link) {
        link.classList.add("pf-work-card");
      }
      if (bg && bg !== "none") {
        thumb.style.backgroundImage = bg;
      }

      var meta = document.createElement("div");
      meta.className = "pf-work-meta";
      if (titleEl) {
        meta.appendChild(titleEl.cloneNode(true));
      }
      if (catEl) {
        meta.appendChild(catEl.cloneNode(true));
      }

      grid.innerHTML = "";
      grid.appendChild(thumb);
      grid.appendChild(meta);
    }
  }

  function injectGlobalFooter() {
    var slot = document.getElementById("fh5co-footer");
    if (!slot) {
      return;
    }

    var mail = "sky13146@gmail.com";

    slot.className = "pf-footer-slot";
    slot.innerHTML =
      '<footer class="pf-footer" role="contentinfo">' +
      '  <div class="container pf-footer__inner">' +
      '    <p class="pf-footer__lead">UI/UX 與網頁設計 · 使用者洞察、跨裝置體驗、設計到實作</p>' +
      '    <p class="pf-footer__line">Portfolio of Yuhan · <a href="mailto:' +
      mail +
      '">' +
      mail +
      "</a></p>" +
      "  </div>" +
      "</footer>";
  }

  function init() {
    applyTheme();
    injectGlobalFooter();
    enhanceWorkCards();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
