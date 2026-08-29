# Vlad Jandec — Portfolio Site

A single-page portfolio for Vlad Jandec, "Your Rockstar VA" — Social Media
Manager / Dating App VA / Short-Form Video Editor. Premium executive visual
identity built around a custom VJ monogram and a Ferrari red-on-black
palette: glassmorphism cards, particle background, command palette (⌘K),
scroll-triggered reveals, and a light/dark theme toggle.

No build step. No framework. Open `index.html` in a browser, or deploy as
static files anywhere (GitHub Pages, Netlify, Vercel, S3, etc.).

---

## 1. Project structure

```
index.html              → all page markup
css/style.css            → design tokens + all component styles
css/responsive.css       → mobile/tablet breakpoints
js/data.js                → ALL editable content lives here
js/theme.js               → dark/light mode toggle
js/gallery.js             → renders skills, timeline, services, works, FAQ, contact, footer, nav
js/video.js                → renders the video-editing gallery + lightbox player
js/command-palette.js     → ⌘K / Ctrl+K quick-jump menu
js/animations.js          → GSAP scroll reveals, hero parallax, magnetic buttons
js/main.js                 → loader, particle background, cursor glow, scroll progress, mobile nav
assets/images/            → put your photos + work thumbnails here
assets/videos/            → put your short-form edit samples here
```

## 2. Editing content (no code required)

Open **`js/data.js`**. Every section's text lives in one plain object called
`VladData`. Edit the values between quotes — don't touch anything outside the
quotes unless you're comfortable with JavaScript.

| Section | Field in `VladData` |
|---|---|
| Contact buttons | `contactLinks` |
| Featured Works (with photo galleries) | `projects` |
| Video Editing samples | `videoSamples` |
| Experience timeline | `experienceTimeline` |
| Skills | `skillGroups` |
| Services (numbered automatically) | `services` |
| Why Work With Me | `whyWorkWithMe` |
| FAQ | `faqItems` |
| Nav menu | `navItems` |

### Contact links ("Let's Connect" section)
Rendered as premium glass cards — icon, platform name, and a short
subtitle like "Chat on Telegram" — in a row on desktop, 2 columns on
tablet, and a single column on mobile.
```js
contactLinks: {
  telegram: "#",        // e.g. "https://t.me/yourhandle"
  discord: "#",          // e.g. "https://discord.gg/yourinvite"
  linkedin: "#",          // e.g. "https://linkedin.com/in/yourname"
  instagram: "#",          // e.g. "https://instagram.com/yourhandle"
  whatsapp: "#"              // e.g. "https://wa.me/1234567890"
}
```
Each is a `"#"` placeholder so the cards are visible right away — replace
each with your real link when you have it. Leave a value as `""` (empty
quotes) instead of `"#"` if you'd rather hide a card completely until
you're ready to add it. Cards render in the order the keys are listed.
Each platform's icon and subtitle are defined in the `ICONS` and
`SUBTITLES` maps near the top of `js/gallery.js` — edit those if you want
different wording or a different icon style.

### Adding / editing a project in "Featured Works"
Each project can hold **multiple photos** — clicking the card in the
Featured Works section opens a fullscreen gallery visitors can page through
with arrow buttons, keyboard arrow keys, or the thumbnail strip.

```js
{
  id: "proj-05",
  title: "New Project Name",
  category: "Social Media",   // used for the filter buttons — reuse an
                                // existing category or introduce a new one
  description: "One short line about the work.",
  images: [                     // as many as you want — first one is the
    "assets/images/your-file-1.jpg",   // grid thumbnail
    "assets/images/your-file-2.jpg",
    "assets/images/your-file-3.jpg"
  ],
  video: "",                    // optional, not currently used by the UI
  link: ""                       // optional — shows a "View live" link
                                   // inside the gallery lightbox
}
```
Just add a new object to the `projects` array (copy an existing one and
change the values). The category filter buttons at the top of the Works
section are generated automatically from whatever categories appear here.

### Adding a video-editing sample
```js
{
  id: "edit-07",
  title: "Edit Sample 07",
  src: "assets/videos/edit-07.mp4",
  poster: "assets/images/edit-07-thumb.jpg"
}
```

### Services (numbered list)
Services render as an automatically-numbered list (01, 02, 03…) in the
order given in the array — no manual numbering needed, just reorder the
objects and the badges update themselves.
```js
{
  title: "Graphic Designer",
  description: "Short description of this service."
}
```

### Why Work With Me
```js
{
  title: "Fast Turnaround",
  description: "Describe your typical turnaround time."
}
```

### Experience, Skills, FAQ
Same pattern — each is an array of small objects. Copy an existing entry,
change the text, keep the same field names.

---

## 3. Adding your real photos and videos

Nothing needs to be uploaded anywhere special — just drop files into the
existing folders with the exact filenames referenced in `js/data.js`, or
change the filenames in `data.js` to match whatever you upload.

- **Your portrait / hero photo:** save it as `assets/images/vlad-hero.png`.
  Use a **transparent-background PNG** (a cut-out portrait) if you have
  one — the hero slot is deliberately borderless with just a soft glow
  behind it, so a transparent cutout blends straight into the page instead
  of sitting inside a visible card. A regular photo with a background also
  works fine, it'll just show as a rectangle. (Filename configurable via
  the `src` on `<img class="portrait-img">` in `index.html`.)
- **Work photos:** `assets/images/work-*.jpg` — filenames are set in the
  `images` array of each entry in `projects`. Add as many per project as
  you like; the gallery lightbox pages through all of them.
- **Video thumbnails:** `assets/images/edit-*-thumb.jpg`
- **Video files:** `assets/videos/edit-*.mp4` — keep these reasonably
  compressed (a few MB each) since they load in-browser.

Until you add real files, every image/video slot shows a small placeholder
label telling you exactly which file path it's expecting — so it's obvious
what to replace and where.

**Recommended image sizes** (not required, just efficient):
- Hero portrait (transparent PNG): tall crop, roughly 900×1200px, PNG, under 1MB
- Work photos: ~1200×900px, JPG, under 300KB each
- Video thumbnails: ~600×1067px (9:16), JPG, under 150KB

---

## 4. Colors, fonts, and the executive/Ferrari-red look

Everything visual is controlled by CSS variables at the top of
**`css/style.css`** inside `:root { ... }`. Change a value there and it
updates everywhere that color/token is used.

```css
--c-void: #050505;      /* background */
--c-crimson: #8b0000;   /* primary accent — Ferrari red */
--c-burgundy: #a11217;  /* secondary accent */
--c-violet: #5a0c10;    /* deep red, used for gradient depth */
--c-ice: #a11217;       /* eyebrows, small labels, highlights */
--c-text: #eaeaea;
--c-text-dim: #b5b5b5;
--c-border: rgba(255,255,255,0.08);
--c-gold: #a11217;      /* premium accent — hero badge/CTA, nav CTA,
                           tool-card hover, contact card hover */
```
Despite the variable name, `--c-gold` now drives the red accent system
(kept the name to avoid touching every rule that references it — feel free
to rename it if you're editing the CSS directly).

The site also ships a light theme (`[data-theme="light"] { ... }` right
below the dark tokens) — edit that block if you want to adjust the light
mode palette too. Users can toggle between them with the sun/moon button in
the nav bar; their choice is remembered via `localStorage`.

Fonts are loaded from Google Fonts in the `<head>` of `index.html`:
- **Bricolage Grotesque** — headlines
- **Inter** — body text
- **JetBrains Mono** — eyebrow labels, tags, nav accents

### The logo and brand lockup

The VJ monogram is hand-built inline SVG at the top of `index.html`
(search for `class="brand-mark"`) — no image file to swap, it's pure
vector so it stays crisp at any size. The name, tagline, and sub-tagline
next to it are plain text in the same block:
```html
<span class="brand-name">VLAD <span class="brand-name-accent">JANDEC</span></span>
<span class="brand-tagline">— Your Rockstar VA —</span>
<span class="brand-subtag">Strategy<i>.</i>Content<i>.</i>Growth</span>
```
Edit that text directly. On screens narrower than 1180px the tagline and
sub-tagline hide automatically so the header stays compact — only the
monogram and name show.

### How the header works

The nav is transparent when the page is at the top and gains a dark glass
background, blur, border, and shadow once you scroll past ~40px — that
behavior lives in `initNavScrollState()` in `js/main.js` (toggles an
`.is-scrolled` class) plus the matching CSS in `css/style.css` under
`#site-nav.is-scrolled`. The current section's nav link gets a red
underline automatically via the existing active-section detection.

### Editing the hero content

The hero's badge, heading, description, buttons, and trust checklist are
literal text directly in `index.html` (search for `<section id="home"`)
rather than in `data.js`, since it's one-off marketing copy rather than a
repeatable list. Look for these classes to find each piece:

| What | Class |
|---|---|
| Small pill above the heading | `.hero-badge` |
| Big heading (the red accent word is wrapped in `<span class="accent">`) | `.hero-heading` |
| Paragraph below the heading | `.hero-desc` |
| Two buttons | `.hero-cta` |
| Checklist | `.hero-trust` |

### Tools of the Trade

The auto-scrolling tool marquee is data-driven — edit the `toolsOfTrade`
array in `js/data.js`:
```js
{ name: "CapCut", icon: "CC" }
```
`icon` is shown as a placeholder monogram in a circle. To swap in a real
logo later, open `js/gallery.js`, find `renderToolsMarquee`, and replace
the line that creates `.tool-icon` with an `<img>` tag pointing at your
logo file instead of the text monogram.

---

## 5. Features included

- Hand-built vector VJ monogram logo with a full brand lockup (name,
  tagline, sub-tagline), always clickable back to the hero
- Transparent-to-glass header: see-through at the top of the page, gains
  a blurred dark background, border, and shadow once you scroll, with a
  red underline-grow hover animation and a permanent red indicator on the
  current section
- Command palette (press **⌘K** / **Ctrl+K**, or tap the button in the nav)
- Canvas particle background that reacts subtly to the cursor
- Cursor glow + trailing dots (desktop only, disabled on touch devices)
- Scroll progress bar
- Dark/light theme toggle (persisted across visits)
- GSAP-powered scroll reveals, with a plain-CSS fallback if the GSAP CDN
  script can't load, so the site never gets stuck invisible offline
- Premium hero section: badge, dominant heading with a red accent word,
  description, dual CTAs, and a trust-indicator checklist
- Seamless transparent-PNG-friendly hero portrait slot that subtly
  overlaps the bottom of the hero section on desktop, with soft red
  ground lighting beneath it
- Auto-scrolling "Tools of the Trade" marquee — floats gently, pauses on
  hover, and each card enlarges with a red glow on hover
- Filterable Featured Works gallery — click any project to open a fullscreen
  photo gallery (arrow buttons, keyboard arrows, and thumbnail strip)
- Short-form video gallery with a fullscreen lightbox player
- Numbered Services list and a "Why Work With Me" section
- "Let's Connect" section with premium glass contact cards (Telegram,
  Discord, LinkedIn, Instagram, WhatsApp) — icon, name, and subtitle, with
  a lift + red glow on hover
- Accordion FAQ
- Fully responsive: desktop, tablet, and mobile (with a slide-out mobile menu)
- Respects `prefers-reduced-motion` throughout

---

## 6. Deploying

This is a static site — any static host works.

### GitHub Pages (free, simplest)
1. Create a new GitHub repository and push this whole folder to it.
2. In the repo, go to **Settings → Pages**.
3. Under "Build and deployment," set **Source** to "Deploy from a branch,"
   pick your main branch and `/ (root)`, then save.
4. Your site will be live at `https://yourusername.github.io/repo-name/`
   within a minute or two.

### Netlify / Vercel (also free, drag-and-drop)
1. Go to netlify.com (or vercel.com) and sign in.
2. Drag this project folder onto the dashboard, or connect it as a Git repo.
3. It deploys automatically — no build command needed since there's no
   build step.

### Any other static host
Upload the contents of this folder (keeping the same file/folder
structure) to any web server that can serve static files.

---

## 7. Browser support

Built with modern, broadly-supported CSS (CSS Grid, `aspect-ratio`, `clamp()`/
`min()`, custom properties) and vanilla JavaScript — works in current Chrome,
Safari, Firefox, and Edge. GSAP is loaded from a CDN for scroll animations;
if that CDN is ever unreachable, the site automatically falls back to
showing all content immediately rather than staying hidden.
