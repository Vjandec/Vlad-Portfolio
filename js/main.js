/* ============================================================
   MAIN — Loader, particle background, cursor effects,
   scroll progress, active-section nav, mobile menu.
   ============================================================ */
(function () {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;

  /* ---------- Loading screen ---------- */
  function initLoader() {
    const loader = document.getElementById("loader");
    if (!loader) return;
    const hide = function () {
      loader.classList.add("is-hidden");
      setTimeout(function () { loader.remove(); }, 700);
    };
    const minDelay = prefersReduced ? 100 : 1400;
    if (document.readyState === "complete") {
      setTimeout(hide, minDelay);
    } else {
      window.addEventListener("load", function () { setTimeout(hide, minDelay); });
      // Safety net in case 'load' never fires quickly (slow video/img assets)
      setTimeout(hide, 2600);
    }
  }

  /* ---------- Scroll progress bar ---------- */
  function initScrollProgress() {
    const bar = document.querySelector("#scroll-progress span");
    if (!bar) return;
    function update() {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop;
      const height = doc.scrollHeight - doc.clientHeight;
      const pct = height > 0 ? (scrollTop / height) * 100 : 0;
      bar.style.width = pct + "%";
    }
    document.addEventListener("scroll", update, { passive: true });
    update();
  }

  /* ---------- Nav transparent -> glass on scroll ---------- */
  function initNavScrollState() {
    const nav = document.getElementById("site-nav");
    if (!nav) return;
    function update() {
      const scrolled = (window.scrollY || document.documentElement.scrollTop) > 40;
      nav.classList.toggle("is-scrolled", scrolled);
    }
    document.addEventListener("scroll", update, { passive: true });
    update();
  }

  /* ---------- Active section nav indicator ---------- */
  function initActiveNav() {
    const links = document.querySelectorAll("#nav-list a");
    if (!links.length) return;
    const sections = Array.from(links)
      .map(function (a) { return document.getElementById(a.dataset.navTarget); })
      .filter(Boolean);
    if (!("IntersectionObserver" in window) || sections.length === 0) return;

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          links.forEach(function (a) {
            a.classList.toggle("is-active", a.dataset.navTarget === id);
          });
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });

    sections.forEach(function (s) { observer.observe(s); });
  }

  /* ---------- Mobile menu ---------- */
  function initMobileMenu() {
    const burger = document.getElementById("nav-burger");
    const nav = document.getElementById("site-nav");
    const list = document.getElementById("nav-list");
    if (!burger || !nav || !list) return;
    burger.addEventListener("click", function () {
      const isOpen = nav.classList.toggle("is-menu-open");
      list.classList.toggle("is-open", isOpen);
      burger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    Array.prototype.forEach.call(list.querySelectorAll("a"), function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("is-menu-open");
        list.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Cursor glow + trail (desktop only) ---------- */
  function initCursorEffects() {
    if (isTouch || prefersReduced) return;

    const glow = document.createElement("div");
    glow.id = "cursor-glow";
    document.body.appendChild(glow);

    let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
    window.addEventListener("mousemove", function (e) {
      mouseX = e.clientX; mouseY = e.clientY;
    });

    (function animateGlow() {
      // simple lerp toward the cursor for a soft trailing feel
      glow.style.left = mouseX + "px";
      glow.style.top = mouseY + "px";
      requestAnimationFrame(animateGlow);
    })();

    // Lightweight trailing dots
    const trailLength = 8;
    const dots = [];
    for (let i = 0; i < trailLength; i++) {
      const dot = document.createElement("div");
      dot.className = "trail-dot";
      dot.style.opacity = (1 - i / trailLength) * 0.5;
      document.body.appendChild(dot);
      dots.push({ el: dot, x: mouseX, y: mouseY });
    }

    (function animateTrail() {
      let x = mouseX, y = mouseY;
      dots.forEach(function (dot) {
        dot.x += (x - dot.x) * 0.35;
        dot.y += (y - dot.y) * 0.35;
        dot.el.style.left = dot.x + "px";
        dot.el.style.top = dot.y + "px";
        x = dot.x; y = dot.y;
      });
      requestAnimationFrame(animateTrail);
    })();
  }

  /* ---------- Particle background canvas ---------- */
  function initParticles() {
    const canvas = document.getElementById("particle-canvas");
    if (!canvas) return;
    if (prefersReduced) { canvas.remove(); return; }

    const ctx = canvas.getContext("2d");
    let particles = [];
    let width, height;
    let mouseX = -9999, mouseY = -9999;
    let rafId;
    let visible = true;

    function isLight() { return document.body.getAttribute("data-theme") === "light"; }

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      const density = isTouch ? 45 : 90;
      const count = Math.min(density, Math.floor((width * height) / 18000));
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          r: Math.random() * 1.6 + 0.6
        });
      }
    }

    function colorFor(alpha) {
      return isLight() ? "rgba(124,58,237," + alpha + ")" : "rgba(159,216,255," + alpha + ")";
    }

    function step() {
      if (!visible) { rafId = requestAnimationFrame(step); return; }
      ctx.clearRect(0, 0, width, height);

      particles.forEach(function (p, i) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // gentle attraction toward cursor
        const dx = mouseX - p.x, dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          p.x += dx * 0.0025;
          p.y += dy * 0.0025;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = colorFor(0.55);
        ctx.fill();

        // connecting lines to nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const ddx = p.x - q.x, ddy = p.y - q.y;
          const d = Math.sqrt(ddx * ddx + ddy * ddy);
          if (d < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = colorFor(0.08 * (1 - d / 110));
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      });

      rafId = requestAnimationFrame(step);
    }

    window.addEventListener("resize", resize);
    if (!isTouch) {
      window.addEventListener("mousemove", function (e) { mouseX = e.clientX; mouseY = e.clientY; });
    }
    document.addEventListener("visibilitychange", function () {
      visible = document.visibilityState === "visible";
    });

    resize();
    step();
  }

  document.addEventListener("DOMContentLoaded", function () {
    initLoader();
    initScrollProgress();
    initNavScrollState();
    initActiveNav();
    initMobileMenu();
    initCursorEffects();
    initParticles();
  });
})();
