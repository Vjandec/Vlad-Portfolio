/* ============================================================
   GALLERY / CONTENT RENDERING
   Builds skills, timeline, services, why-work-with-me, works,
   FAQ, contact, footer, and nav from js/data.js — nothing here
   needs editing when you just want to change content.
   ============================================================ */
(function () {
  function el(tag, className, html) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (html !== undefined) node.innerHTML = html;
    return node;
  }

  function pad2(n) { return n < 10 ? "0" + n : "" + n; }

  /* ---------- Navigation ---------- */
  function renderNav() {
    const list = document.getElementById("nav-list");
    if (!list || typeof VladData === "undefined") return;
    VladData.navItems.forEach(function (item) {
      const li = document.createElement("li");
      const a = el("a", null, item.label);
      a.href = "#" + item.id;
      a.dataset.navTarget = item.id;
      li.appendChild(a);
      list.appendChild(li);
    });
  }

  /* ---------- Skills ---------- */
  function renderSkills() {
    const grid = document.getElementById("skills-grid");
    if (!grid || typeof VladData === "undefined") return;
    VladData.skillGroups.forEach(function (group) {
      const card = el("div", "skill-card glass");
      card.setAttribute("data-reveal", "");
      card.appendChild(el("h3", null, group.category));
      const tagWrap = el("div", "skill-tags");
      group.items.forEach(function (item) {
        tagWrap.appendChild(el("span", "skill-tag", item));
      });
      card.appendChild(tagWrap);
      grid.appendChild(card);
    });
  }

  /* ---------- Experience timeline ---------- */
  function renderTimeline() {
    const wrap = document.getElementById("timeline");
    if (!wrap || typeof VladData === "undefined") return;
    VladData.experienceTimeline.forEach(function (item) {
      const node = el("div", "timeline-item");
      node.setAttribute("data-reveal", "");
      node.appendChild(el("span", "timeline-date", item.date));
      node.appendChild(el("h3", null, item.title));
      node.appendChild(el("p", null, item.description));
      wrap.appendChild(node);
    });
  }

  /* ---------- Services (numbered) ---------- */
  function renderServices() {
    const grid = document.getElementById("services-grid");
    if (!grid || typeof VladData === "undefined") return;
    VladData.services.forEach(function (s, i) {
      const card = el("div", "service-card glass");
      card.setAttribute("data-reveal", "");
      card.appendChild(el("span", "service-index", pad2(i + 1)));
      card.appendChild(el("h3", null, s.title));
      card.appendChild(el("p", null, s.description));
      card.addEventListener("mousemove", function (e) {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", (e.clientX - rect.left) + "px");
        card.style.setProperty("--my", (e.clientY - rect.top) + "px");
      });
      grid.appendChild(card);
    });
  }

  /* ---------- Why Work With Me ---------- */
  function renderWhyWorkWithMe() {
    const grid = document.getElementById("why-grid");
    if (!grid || typeof VladData === "undefined") return;
    VladData.whyWorkWithMe.forEach(function (item) {
      const card = el("div", "why-card glass");
      card.setAttribute("data-reveal", "");
      card.appendChild(el("span", "why-check", "&#10003;"));
      card.appendChild(el("h3", null, item.title));
      card.appendChild(el("p", null, item.description));
      grid.appendChild(card);
    });
  }

  /* ---------- Featured works ---------- */
  let currentFilter = "All";
  function renderWorksFilters() {
    const wrap = document.getElementById("works-filters");
    if (!wrap || typeof VladData === "undefined") return;
    const categories = ["All"].concat(
      Array.from(new Set(VladData.projects.map(function (p) { return p.category; })))
    );
    categories.forEach(function (cat) {
      const btn = el("button", "works-filter" + (cat === "All" ? " is-active" : ""), cat);
      btn.type = "button";
      btn.setAttribute("role", "tab");
      btn.addEventListener("click", function () {
        currentFilter = cat;
        Array.from(wrap.children).forEach(function (b) { b.classList.remove("is-active"); });
        btn.classList.add("is-active");
        renderWorksGallery();
      });
      wrap.appendChild(btn);
    });
  }

  function renderWorksGallery() {
    const gallery = document.getElementById("works-gallery");
    if (!gallery || typeof VladData === "undefined") return;
    gallery.innerHTML = "";
    const filtered = currentFilter === "All"
      ? VladData.projects
      : VladData.projects.filter(function (p) { return p.category === currentFilter; });

    filtered.forEach(function (p) {
      const card = el("div", "work-card");
      card.setAttribute("tabindex", "0");
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", "Open gallery for " + p.title);

      const thumbSrc = (p.images && p.images[0]) || "";
      const img = el("img");
      img.src = thumbSrc;
      img.alt = p.title;
      img.loading = "lazy";
      img.onerror = function () {
        img.remove();
        card.appendChild(el("div", "work-card-placeholder",
          "Replace with<br><code>" + thumbSrc + "</code>"));
      };
      card.appendChild(img);

      const overlay = el("div", "work-card-overlay");
      overlay.appendChild(el("span", "work-card-cat", p.category));
      overlay.appendChild(el("h3", null, p.title));
      overlay.appendChild(el("p", null, p.description));
      if (p.images && p.images.length > 1) {
        overlay.appendChild(el("span", "work-card-count", "&#9635; " + p.images.length + " photos"));
      }
      card.appendChild(overlay);

      function open() { openPhotoLightbox(p); }
      card.addEventListener("click", open);
      card.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
      });

      gallery.appendChild(card);
    });
  }

  /* ---------- Photo gallery lightbox (for Featured Works) ---------- */
  const photoState = { images: [], index: 0, title: "", link: "" };

  function renderPhotoLightboxFrame() {
    const img = document.getElementById("photo-lightbox-img");
    const title = document.getElementById("photo-lightbox-title");
    const counter = document.getElementById("photo-lightbox-counter");
    const thumbs = document.getElementById("photo-lightbox-thumbs");
    const linkBtn = document.getElementById("photo-lightbox-link");
    if (!img || !thumbs) return;

    const src = photoState.images[photoState.index] || "";
    img.src = src;
    img.alt = photoState.title + " — image " + (photoState.index + 1);
    img.onerror = function () { img.alt = "Missing file: " + src; };
    if (title) title.textContent = photoState.title;
    if (counter) counter.textContent = (photoState.index + 1) + " / " + photoState.images.length;

    if (linkBtn) {
      if (photoState.link) {
        linkBtn.href = photoState.link;
        linkBtn.hidden = false;
      } else {
        linkBtn.hidden = true;
      }
    }

    thumbs.innerHTML = "";
    photoState.images.forEach(function (src, i) {
      const t = el("img", "photo-lightbox-thumb" + (i === photoState.index ? " is-active" : ""));
      t.src = src;
      t.alt = "";
      t.loading = "lazy";
      t.onerror = function () { t.style.display = "none"; };
      t.addEventListener("click", function () {
        photoState.index = i;
        renderPhotoLightboxFrame();
      });
      thumbs.appendChild(t);
    });
  }

  function openPhotoLightbox(project) {
    const lightbox = document.getElementById("photo-lightbox");
    if (!lightbox) return;
    photoState.images = (project.images || []).slice();
    photoState.index = 0;
    photoState.title = project.title;
    photoState.link = project.link || "";
    renderPhotoLightboxFrame();
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closePhotoLightbox() {
    const lightbox = document.getElementById("photo-lightbox");
    if (!lightbox) return;
    lightbox.hidden = true;
    document.body.style.overflow = "";
  }

  function stepPhotoLightbox(delta) {
    if (!photoState.images.length) return;
    photoState.index = (photoState.index + delta + photoState.images.length) % photoState.images.length;
    renderPhotoLightboxFrame();
  }

  /* ---------- FAQ ---------- */
  function renderFaq() {
    const wrap = document.getElementById("faq-list");
    if (!wrap || typeof VladData === "undefined") return;
    VladData.faqItems.forEach(function (item, i) {
      const node = el("div", "faq-item glass");
      node.setAttribute("data-reveal", "");
      const qBtn = el("button", "faq-q");
      qBtn.type = "button";
      qBtn.setAttribute("aria-expanded", "false");
      qBtn.innerHTML = "<span>" + item.q + "</span><span class=\"faq-plus\">+</span>";
      const aWrap = el("div", "faq-a");
      const aInner = el("div", "faq-a-inner", item.a);
      aWrap.appendChild(aInner);

      qBtn.addEventListener("click", function () {
        const isOpen = node.classList.contains("is-open");
        Array.prototype.forEach.call(wrap.querySelectorAll(".faq-item.is-open"), function (openItem) {
          if (openItem !== node) {
            openItem.classList.remove("is-open");
            openItem.querySelector(".faq-a").style.maxHeight = null;
            openItem.querySelector(".faq-q").setAttribute("aria-expanded", "false");
          }
        });
        if (isOpen) {
          node.classList.remove("is-open");
          aWrap.style.maxHeight = null;
          qBtn.setAttribute("aria-expanded", "false");
        } else {
          node.classList.add("is-open");
          aWrap.style.maxHeight = aInner.offsetHeight + "px";
          qBtn.setAttribute("aria-expanded", "true");
        }
      });

      node.appendChild(qBtn);
      node.appendChild(aWrap);
      wrap.appendChild(node);
    });
  }

/* ---------- Tools of the Trade (marquee) ---------- */
function renderToolsMarquee() {
  const track = document.getElementById("tools-track");
  if (!track || typeof VladData === "undefined") return;

  const tools = VladData.toolsOfTrade || [];

  // Render the list twice for seamless marquee looping
  const doubled = tools.concat(tools);

  doubled.forEach(function (tool) {
    const card = el("div", "tool-card");
    const inner = el("div", "tool-card-inner");

    const icon = document.createElement("span");
    icon.className = "tool-icon";

    // If icon is an image path, create an image
    if (tool.icon && /\.(png|jpg|jpeg|webp|svg)$/i.test(tool.icon)) {
      const img = document.createElement("img");
      img.src = tool.icon;
      img.alt = tool.name + " logo";
      img.loading = "lazy";
      icon.appendChild(img);
    } else {
      // Otherwise use the text icon
      icon.textContent = tool.icon || tool.name.slice(0, 2);
    }

    const name = el("span", "tool-name", tool.name);

    inner.appendChild(icon);
    inner.appendChild(name);
    card.appendChild(inner);
    track.appendChild(card);
  });
}

  /* ---------- Contact ("Let's Connect" card grid) ---------- */
  const ICONS = {
    telegram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"><path d="M21 3 3 10.53l7.19 2.87L13 21l3-5.5L21 3z"/></svg>',
    discord: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16v11H8l-4 4V5z"/><circle cx="9" cy="10.5" r="0.8" fill="currentColor" stroke="none"/><circle cx="12" cy="10.5" r="0.8" fill="currentColor" stroke="none"/><circle cx="15" cy="10.5" r="0.8" fill="currentColor" stroke="none"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17" cy="7" r="0.6" fill="currentColor" stroke="none"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="7" cy="17" r="2.2"/><circle cx="17" cy="7" r="2.2"/><path d="M8.6 15.4 15.4 8.6"/></svg>',
    email: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h3l1.5 5-2 1.5a12 12 0 0 0 6 6l1.5-2 5 1.5v3a2 2 0 0 1-2 2C11.5 20 4 12.5 4 5a2 2 0 0 1 2-2Z"/></svg>'
  };
  const LABELS = {
    email: "Email",
    telegram: "Telegram",
    discord: "Discord",
    linkedin: "LinkedIn",
    instagram: "Instagram",
    whatsapp: "WhatsApp"
  };
  const SUBTITLES = {
    telegram: "Chat on Telegram",
    discord: "Join on Discord",
    linkedin: "Connect on LinkedIn",
    instagram: "Follow on Instagram",
    whatsapp: "Message on WhatsApp",
    email: "Send an email"
  };
  function linkHref(key, value) {
    if (key === "email" && value !== "#") return "mailto:" + value;
    return value;
  }

  function renderContact() {
    const wrap = document.getElementById("contact-links");
    if (!wrap || typeof VladData === "undefined") return;
    Object.keys(VladData.contactLinks).forEach(function (key) {
      const value = VladData.contactLinks[key];
      if (!value) return;
      const a = el("a", "contact-card glass");
      a.href = linkHref(key, value);
      a.target = key === "email" && value !== "#" ? "_self" : "_blank";
      a.rel = "noopener";
      a.setAttribute("aria-label", LABELS[key] || key);
      const circle = el("span", "contact-card-icon", ICONS[key] || (LABELS[key] || key).slice(0, 1));
      a.appendChild(circle);
      const textWrap = el("span", "contact-card-text");
      textWrap.appendChild(el("span", "contact-card-name", LABELS[key] || key));
      textWrap.appendChild(el("span", "contact-card-subtitle", SUBTITLES[key] || ""));
      a.appendChild(textWrap);
      wrap.appendChild(a);
    });
  }

  function renderFooter() {
    const wrap = document.getElementById("footer-links");
    const yearSpan = document.getElementById("footer-year");
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    if (!wrap || typeof VladData === "undefined") return;
    Object.keys(VladData.contactLinks).forEach(function (key) {
      const value = VladData.contactLinks[key];
      if (!value) return;
      const a = el("a", null, LABELS[key] || key);
      a.href = linkHref(key, value);
      a.target = key === "email" ? "_self" : "_blank";
      a.rel = "noopener";
      wrap.appendChild(a);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderNav();
    renderToolsMarquee();
    renderSkills();
    renderTimeline();
    renderServices();
    renderWhyWorkWithMe();
    renderWorksFilters();
    renderWorksGallery();
    renderFaq();
    renderContact();
    renderFooter();

    Array.prototype.forEach.call(document.querySelectorAll("[data-close-photo-lightbox]"), function (btn) {
      btn.addEventListener("click", closePhotoLightbox);
    });
    const prevBtn = document.getElementById("photo-lightbox-prev");
    const nextBtn = document.getElementById("photo-lightbox-next");
    if (prevBtn) prevBtn.addEventListener("click", function () { stepPhotoLightbox(-1); });
    if (nextBtn) nextBtn.addEventListener("click", function () { stepPhotoLightbox(1); });

    document.addEventListener("keydown", function (e) {
      const lightbox = document.getElementById("photo-lightbox");
      if (!lightbox || lightbox.hidden) return;
      if (e.key === "Escape") closePhotoLightbox();
      if (e.key === "ArrowLeft") stepPhotoLightbox(-1);
      if (e.key === "ArrowRight") stepPhotoLightbox(1);
    });
  });
})();
