(() => {
  "use strict";

  /* ---------- Nav frost-on-scroll ---------- */
  const nav = document.getElementById("site-nav");
  let ticking = false;
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        nav.classList.toggle("is-scrolled", window.scrollY > 8);
        ticking = false;
      });
      ticking = true;
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  const burger = document.getElementById("nav-burger");
  const sheet = document.getElementById("mobile-sheet");
  function closeSheet() {
    burger.setAttribute("aria-expanded", "false");
    sheet.classList.remove("is-open");
    sheet.hidden = true;
  }
  burger.addEventListener("click", () => {
    const open = burger.getAttribute("aria-expanded") === "true";
    if (open) {
      closeSheet();
    } else {
      burger.setAttribute("aria-expanded", "true");
      sheet.hidden = false;
      sheet.classList.add("is-open");
    }
  });
  sheet.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeSheet));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeSheet();
  });

  /* ---------- Language toggle (EN / Gujarati) ---------- */
  const langToggle = document.getElementById("lang-toggle");
  const i18nEls = document.querySelectorAll(".i18n");
  const STORAGE_KEY = "shriram-lang";

  function applyLang(lang) {
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("data-lang", lang);
    i18nEls.forEach((el) => {
      const text = lang === "gu" ? el.dataset.gu : el.dataset.en;
      if (text) el.textContent = text;
    });
    langToggle.querySelectorAll(".lang-toggle__opt").forEach((opt) => {
      opt.classList.toggle("is-active", opt.dataset.langOpt === lang);
    });
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* storage unavailable */ }
  }

  langToggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-lang") || "en";
    applyLang(current === "en" ? "gu" : "en");
  });

  let savedLang = "en";
  try { savedLang = localStorage.getItem(STORAGE_KEY) || "en"; } catch (e) { /* storage unavailable */ }
  if (savedLang === "gu") applyLang("gu");

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll(".accordion__item").forEach((item) => {
    const trigger = item.querySelector(".accordion__trigger");
    trigger.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");
      item.parentElement.querySelectorAll(".accordion__item.is-open").forEach((openItem) => {
        if (openItem !== item) {
          openItem.classList.remove("is-open");
          openItem.querySelector(".accordion__trigger").setAttribute("aria-expanded", "false");
        }
      });
      item.classList.toggle("is-open", !isOpen);
      trigger.setAttribute("aria-expanded", String(!isOpen));
    });
  });

  /* ---------- Sticky bottom CTA bar ---------- */
  const stickyBar = document.getElementById("cta-sticky");
  const dismissBtn = document.getElementById("cta-sticky-dismiss");
  const hero = document.getElementById("home") || document.getElementById("top");
  const DISMISS_KEY = "shriram-cta-dismissed";
  let dismissed = false;
  try { dismissed = sessionStorage.getItem(DISMISS_KEY) === "1"; } catch (e) { /* storage unavailable */ }

  let observer = null;
  if (!dismissed && hero && stickyBar) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          stickyBar.hidden = false;
          stickyBar.classList.toggle("is-visible", !entry.isIntersecting);
        });
      },
      { threshold: 0 }
    );
    observer.observe(hero);
  }

  if (dismissBtn && stickyBar) {
    dismissBtn.addEventListener("click", () => {
      // Stop observing first, or scrolling back past the hero re-shows a dismissed bar.
      if (observer) observer.disconnect();
      stickyBar.classList.remove("is-visible");
      setTimeout(() => { stickyBar.hidden = true; }, 250);
      try { sessionStorage.setItem(DISMISS_KEY, "1"); } catch (e) { /* storage unavailable */ }
    });
  }

  /* ---------- 60-Color Palette Filtering ---------- */
  const filterContainer = document.getElementById("palette-filter");
  const swatches = document.querySelectorAll(".swatch-item");
  if (filterContainer && swatches.length > 0) {
    const filterBtns = filterContainer.querySelectorAll(".palette-filter__btn");
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const family = btn.dataset.family;
        filterBtns.forEach((b) => b.classList.toggle("is-active", b === btn));
        swatches.forEach((swatch) => {
          if (family === "all" || swatch.dataset.family === family) {
            swatch.classList.remove("is-hidden");
          } else {
            swatch.classList.add("is-hidden");
          }
        });
      });
    });
  }
})();

