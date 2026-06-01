/**
 * Portfolio theme loader — apex | arctic | quartz
 */
(function () {
  "use strict";

  var THEMES = ["apex", "arctic", "quartz"];
  var STORAGE_KEY = "pf-portfolio-theme";
  var DEFAULT_THEME = "apex";

  function getQueryTheme() {
    var match = /[?&]theme=([a-z]+)/i.exec(window.location.search);
    if (match && THEMES.indexOf(match[1].toLowerCase()) !== -1) {
      return match[1].toLowerCase();
    }
    return null;
  }

  function getStoredTheme() {
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored && THEMES.indexOf(stored) !== -1) {
        return stored;
      }
    } catch (e) {}
    return null;
  }

  function themeStylesheetPath(theme) {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    var base = "css/themes/";
    for (var i = 0; i < links.length; i++) {
      var href = links[i].getAttribute("href") || "";
      if (href.indexOf("themes/theme-") !== -1) {
        if (href.indexOf("../") === 0) {
          base = "../css/themes/";
        }
        break;
      }
    }
    var el = document.getElementById("pf-theme-css");
    if (el) {
      var elHref = el.getAttribute("href") || "";
      if (elHref.indexOf("../") === 0) {
        base = "../css/themes/";
      }
    }
    return base + "theme-" + theme + ".css";
  }

  function applyTheme(theme, persist) {
    if (THEMES.indexOf(theme) === -1) {
      theme = DEFAULT_THEME;
    }
    document.documentElement.setAttribute("data-theme", theme);
    var link = document.getElementById("pf-theme-css");
    if (link) {
      link.setAttribute("href", themeStylesheetPath(theme));
    }
    if (persist !== false) {
      try {
        localStorage.setItem(STORAGE_KEY, theme);
      } catch (e) {}
    }
    updateSwitcherUI(theme);
  }

  function updateSwitcherUI(theme) {
    var buttons = document.querySelectorAll("[data-pf-theme]");
    for (var i = 0; i < buttons.length; i++) {
      var btn = buttons[i];
      if (btn.getAttribute("data-pf-theme") === theme) {
        btn.classList.add("is-active");
        btn.setAttribute("aria-pressed", "true");
      } else {
        btn.classList.remove("is-active");
        btn.setAttribute("aria-pressed", "false");
      }
    }
  }

  function injectSwitcher() {
    if (document.querySelector(".pf-theme-switcher")) {
      return;
    }
    var wrap = document.createElement("div");
    wrap.className = "pf-theme-switcher";
    wrap.setAttribute("role", "group");
    wrap.setAttribute("aria-label", "切換網站配色");
    wrap.innerHTML =
      '<span class="pf-theme-switcher__label">配色</span>' +
      '<div class="pf-theme-switcher__btns">' +
      '<button type="button" data-pf-theme="apex" title="Apex Slate" aria-label="Apex Slate"></button>' +
      '<button type="button" data-pf-theme="arctic" title="Arctic Flow" aria-label="Arctic Flow"></button>' +
      '<button type="button" data-pf-theme="quartz" title="Quartz Silver" aria-label="Quartz Silver"></button>' +
      "</div>";
    document.body.appendChild(wrap);
    wrap.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-pf-theme]");
      if (btn) {
        applyTheme(btn.getAttribute("data-pf-theme"), true);
      }
    });
  }

  /** 作品卡：圖上、標題下（避免手機 hover 遮罩蓋圖） */
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
      '<footer class="pf-footer" role="contentinfo" data-pf-version="2">' +
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
    var theme = getQueryTheme() || getStoredTheme() || DEFAULT_THEME;
    applyTheme(theme, !getQueryTheme());
    injectGlobalFooter();
    injectSwitcher();
    enhanceWorkCards();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.PFTheme = {
    apply: applyTheme,
    list: THEMES,
    get: function () {
      return document.documentElement.getAttribute("data-theme") || DEFAULT_THEME;
    }
  };
})();
