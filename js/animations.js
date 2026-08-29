/* ============================================================
   ANIMATIONS — GSAP ScrollTrigger reveals, hero parallax,
   magnetic buttons, timeline growth.
   Respects prefers-reduced-motion throughout.
   ============================================================ */
(function () {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function initGsap() {
    if (typeof gsap === "undefined") { fallbackReveal(); return; }
    if (typeof ScrollTrigger !== "undefined") gsap.registerPlugin(ScrollTrigger);

    document.body.classList.add("reveal-ready");

    gsap.utils.toArray(".hero-copy [data-reveal]").forEach(function (target, i) {
      gsap.to(target, {
        y: 0, opacity: 1,
        duration: prefersReduced ? 0.01 : 0.9,
        delay: prefersReduced ? 0 : 0.6 + i * 0.1,
        ease: "power3.out"
      });
    });

    gsap.utils.toArray(".hero-visual").forEach(function (visual) {
      gsap.from(visual, {
        opacity: 0, scale: 0.92,
        duration: prefersReduced ? 0.01 : 0.9,
        delay: prefersReduced ? 0 : 0.5,
        ease: "power3.out"
      });
    });

    // Generic scroll-triggered reveals for every other [data-reveal]
    if (typeof ScrollTrigger !== "undefined") {
      gsap.utils.toArray("main .section [data-reveal]").forEach(function (target) {
        gsap.to(target, {
          y: 0, opacity: 1,
          duration: prefersReduced ? 0.01 : 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: target,
            start: "top 88%",
            toggleActions: "play none none reverse"
          }
        });
      });

      // Timeline line growth
      const timeline = document.getElementById("timeline");
      if (timeline) {
        ScrollTrigger.create({
          trigger: timeline,
          start: "top 75%",
          onEnter: function () { timeline.classList.add("is-visible"); },
        });
      }

      // Section eyebrow / title parallax-lite fade (subtle)
      gsap.utils.toArray(".section-title, .eyebrow").forEach(function (t) {
        if (t.hasAttribute("data-reveal")) return; // already handled
      });
    } else {
      fallbackReveal();
    }
  }

  // If GSAP/CDN fails to load (offline etc.), reveal everything immediately.
  function fallbackReveal() {
    Array.prototype.forEach.call(document.querySelectorAll("[data-reveal]"), function (node) {
      node.style.opacity = 1;
      node.style.transform = "none";
    });
    const timeline = document.getElementById("timeline");
    if (timeline) timeline.classList.add("is-visible");
  }

  /* ---------- Hero float-card mouse parallax ---------- */
  /* ---------- Hero portrait mouse parallax (subtle tilt) ---------- */
  function initHeroParallax() {
    if (prefersReduced) return;
    const hero = document.querySelector(".hero-visual");
    if (!hero) return;
    const portrait = hero.querySelector(".portrait-frame");
    if (!portrait) return;
    hero.addEventListener("mousemove", function (e) {
      const rect = hero.getBoundingClientRect();
      const relX = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const relY = (e.clientY - rect.top - rect.height / 2) / rect.height;
      const moveX = relX * 14;
      const moveY = relY * 14;
      portrait.style.transform = "translate(" + moveX + "px," + moveY + "px)";
    });
    hero.addEventListener("mouseleave", function () {
      portrait.style.transform = "translate(0,0)";
    });
  }

  /* ---------- Magnetic buttons ---------- */
  function initMagnetic() {
    if (prefersReduced || window.matchMedia("(hover: none)").matches) return;
    Array.prototype.forEach.call(document.querySelectorAll(".magnetic"), function (btn) {
      btn.addEventListener("mousemove", function (e) {
        const rect = btn.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.35;
        btn.style.transform = "translate(" + x + "px," + y + "px)";
      });
      btn.addEventListener("mouseleave", function () { btn.style.transform = "translate(0,0)"; });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initGsap();
    initHeroParallax();
    initMagnetic();
  });
})();
