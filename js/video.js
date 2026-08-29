/* ============================================================
   VIDEO EDITING GALLERY
   Renders video cards from js/data.js, wires up the
   fullscreen lightbox player. No autoplay-with-sound.
   ============================================================ */
(function () {
  function el(tag, className, html) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (html !== undefined) node.innerHTML = html;
    return node;
  }

  function renderVideoGallery() {
    const grid = document.getElementById("video-gallery");
    if (!grid || typeof VladData === "undefined") return;

    VladData.videoSamples.forEach(function (sample) {
      const card = el("div", "video-card glass");
      card.setAttribute("data-reveal", "");
      card.setAttribute("tabindex", "0");
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", "Play " + sample.title);

      const thumbWrap = el("div", "video-thumb-wrap");
      const img = el("img");
      img.src = sample.poster;
      img.alt = sample.title + " thumbnail";
      img.loading = "lazy";
      img.onerror = function () {
        thumbWrap.style.display = "flex";
        thumbWrap.style.alignItems = "center";
        thumbWrap.style.justifyContent = "center";
        thumbWrap.style.background = "var(--c-void-2)";
        img.remove();
        const placeholder = el("span", null, "Replace with<br><code style=\"color:var(--c-ice)\">" + sample.poster + "</code>");
        placeholder.style.cssText = "font-family:var(--font-mono);font-size:0.68rem;color:var(--c-text-dim);text-align:center;padding:14px;line-height:1.6;";
        thumbWrap.appendChild(placeholder);
      };
      thumbWrap.appendChild(img);

      const playBtn = el("div", "video-play-btn", "&#9654;");
      thumbWrap.appendChild(playBtn);
      card.appendChild(thumbWrap);
      card.appendChild(el("div", "video-card-title", sample.title));

      function open() { openLightbox(sample.src); }
      card.addEventListener("click", open);
      card.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
      });

      grid.appendChild(card);
    });
  }

  function openLightbox(src) {
    const lightbox = document.getElementById("video-lightbox");
    const video = document.getElementById("lightbox-video");
    if (!lightbox || !video) return;
    video.src = src;
    video.muted = false;
    video.onerror = function () {
      video.poster = "";
    };
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    video.play().catch(function () { /* file not present yet — that's fine */ });
  }

  function closeLightbox() {
    const lightbox = document.getElementById("video-lightbox");
    const video = document.getElementById("lightbox-video");
    if (!lightbox || !video) return;
    video.pause();
    video.removeAttribute("src");
    video.load();
    lightbox.hidden = true;
    document.body.style.overflow = "";
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderVideoGallery();
    Array.prototype.forEach.call(document.querySelectorAll("[data-close-lightbox]"), function (btn) {
      btn.addEventListener("click", closeLightbox);
    });
    document.addEventListener("keydown", function (e) {
      const lightbox = document.getElementById("video-lightbox");
      if (e.key === "Escape" && lightbox && !lightbox.hidden) closeLightbox();
    });
  });
})();
