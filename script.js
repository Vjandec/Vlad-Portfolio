/* ============================================================
   MODAL CONTENT DATA
============================================================= */
const projectData = {
  mobile: {
    title: "Mobile Device Operations",
    body: `<p>Full lifecycle management of jailbroken iOS devices used for testing and daily operational work — from initial provisioning through ongoing maintenance.</p>
    <ul>
      <li>Device setup and jailbreak configuration for operational use</li>
      <li>Recurring troubleshooting and firmware/tooling maintenance</li>
      <li>Mobile testing protocols to catch issues before they reach a workflow</li>
      <li>Documentation so any team member could pick up a device and know its state</li>
    </ul>`
  },
  dating: {
    title: "Dating App Operations",
    body: `<p>Operational support across Tinder, Bumble, and Hinge — built around structure rather than ad hoc effort.</p>
    <ul>
      <li>Account management workflows with clear QA checkpoints</li>
      <li>Standardized documentation for every recurring task</li>
      <li>Team support to keep operations consistent at volume</li>
      <li>Process organization that reduced repeated manual work</li>
    </ul>`
  },
  agency: {
    title: "Creator Agency Operations",
    body: `<p>Administrative and operational backbone for a creator management agency's day-to-day work.</p>
    <ul>
      <li>Operations support across multiple concurrent accounts</li>
      <li>Documentation systems for onboarding and recurring tasks</li>
      <li>Team coordination between creative and operations staff</li>
      <li>Workflow improvements that cut down repetitive admin work</li>
    </ul>`
  },
  social: {
    title: "Social Media Management",
    body: `<p>End-to-end community and content management across Instagram, Threads, and Reddit.</p>
    <ul>
      <li>Community management and response workflows</li>
      <li>Content calendars and scheduling systems</li>
      <li>Growth support tied to measurable engagement goals</li>
      <li>Analytics tracking to inform what got posted next</li>
    </ul>`
  },
  workflow: {
    title: "Creating Snpchat",
    body: `<p>Creating and setting up Snapchat accounts through web-based workflows using Adspower.</p>
    <ul>
      <li>Warming up Accounts</li>
      <li>Tracking account setup progress,issues, and completion rates</li>
      <li>Documenting repeatable Snapchat setup procedures and SOPs</li>
      
    </ul>`
  },
  sop: {
    title: "Mass Account Creation",
    body: `<p>Creating and managing high volume using good and effective method using Jailbroken Device.</p>
    <ul>
      <li>Step-by-step SOPs for recurring operational tasks</li>
      <li>Diagnosing slow or inconsistent account-creation process and rebuilding them repeatable workflows</li>
      <li>Version-controlled updates as processes evolved</li>
      <li>Training-ready formatting for fast onboarding</li>
    </ul>`
  },
  video: {
  title: "Short-Form Video Editing",
  body: `<p>
    Short-form video editing focused on turning raw footage into engaging,
    platform-ready content for TikTok, Instagram Reels, and YouTube Shorts.
  </p>
  <ul>
    <li>Fast-paced cuts designed to keep viewers engaged</li>
    <li>Captions and subtitles for better accessibility and retention</li>
    <li>Strong opening hooks and removal of unnecessary pauses</li>
    <li>Basic transitions, effects, zooms, and visual emphasis</li>
    <li>Content repurposing for multiple short-form platforms</li>
    <li>Consistent formatting for TikTok, Reels, and YouTube Shorts</li>
  </ul>`
  }
   
};

/* ============================================================
   LOADER
============================================================= */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('done');
  }, 1400);
});

/* ============================================================
   CUSTOM CURSOR + SPOTLIGHT
============================================================= */
const cursorDot = document.getElementById('cursor-dot');
const cursorRing = document.getElementById('cursor-ring');
const root = document.documentElement;
let mx = window.innerWidth/2, my = window.innerHeight/2;
let rx = mx, ry = my;

window.addEventListener('mousemove', (e) => {
  mx = e.clientX; my = e.clientY;
  cursorDot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
  root.style.setProperty('--mx', mx + 'px');
  root.style.setProperty('--my', my + 'px');
});

function animateRing(){
  rx += (mx - rx) * 0.16;
  ry += (my - ry) * 0.16;
  cursorRing.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, [data-hover], .project-card, .channel').forEach(el => {
  el.addEventListener('mouseenter', () => cursorRing.classList.add('hovering'));
  el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovering'));
});

/* ============================================================
   SCROLL: header state, progress bar, moon fill
============================================================= */
const header = document.getElementById('site-header');
const progressBar = document.getElementById('progress-bar');
const moonFill = document.getElementById('moon-fill');

function onScroll(){
  const st = window.scrollY;
  header.classList.toggle('scrolled', st > 40);

  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (st / docHeight) * 100 : 0;
  progressBar.style.width = pct + '%';
  moonFill.style.height = pct + '%';
}
window.addEventListener('scroll', onScroll, { passive:true });
onScroll();

/* ============================================================
   TYPING ANIMATION (hero roles)
============================================================= */
const roles = [
  "Mobile Device Specialist",
  "Jailbroken Device Specialist",
  "Dating App Operations Specialist",
  "Social Media Manager",
  "Workflow Optimization Expert"
];
const typedEl = document.getElementById('typed-text');
let roleIdx = 0, charIdx = 0, deleting = false;

function typeLoop(){
  const current = roles[roleIdx];
  if(!deleting){
    charIdx++;
    typedEl.textContent = current.slice(0, charIdx);
    if(charIdx === current.length){
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    charIdx--;
    typedEl.textContent = current.slice(0, charIdx);
    if(charIdx === 0){
      deleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
    }
  }
  setTimeout(typeLoop, deleting ? 28 : 55);
}
typeLoop();

/* ============================================================
   SCROLL REVEAL (Intersection Observer)
============================================================= */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold:0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ============================================================
   SKILL BARS (animate width when in view)
============================================================= */
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const row = entry.target;
      const pct = row.getAttribute('data-skill');
      const fill = row.querySelector('.skill-fill');
      requestAnimationFrame(() => { fill.style.width = pct + '%'; });
      skillObserver.unobserve(row);
    }
  });
}, { threshold:0.4 });

document.querySelectorAll('.skill-row').forEach(el => skillObserver.observe(el));

/* ============================================================
   CARD 3D TILT + GLOW POSITION
============================================================= */
document.querySelectorAll('[data-tilt]').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    const px = e.clientX - r.left, py = e.clientY - r.top;
    const rotX = ((py / r.height) - 0.5) * -6;
    const rotY = ((px / r.width) - 0.5) * 6;
    card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
    card.style.setProperty('--px', px + 'px');
    card.style.setProperty('--py', py + 'px');
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
  });
});

/* ============================================================
   PROJECT MODALS
============================================================= */
const modalBackdrop = document.getElementById('modal-backdrop');
const modalBody = document.getElementById('modal-body');
const modalClose = document.getElementById('modal-close');

document.querySelectorAll('[data-modal]').forEach(card => {

  card.addEventListener('click', (e) => {

    // Don't open the project modal when clicking the video mute button
    if (e.target.closest('.video-mute')) return;

    const key = card.getAttribute('data-modal');
    const data = projectData[key];

    if (!data) {
      console.error('No project data found for:', key);
      return;
    }

    modalBody.innerHTML = `
      <h3>${data.title}</h3>
      ${data.body}
    `;

    modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';

  });

});

function closeModal() {
  modalBackdrop.classList.remove('open');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);

modalBackdrop.addEventListener('click', (e) => {
  if (e.target === modalBackdrop) {
    closeModal();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalBackdrop.classList.contains('open')) {
    closeModal();
  }
});
/* ============================================================
   CONTACT FORM (mailto handoff — no backend)
============================================================= */
document.getElementById('contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('cf-name').value;
  const email = document.getElementById('cf-email').value;
  const msg = document.getElementById('cf-msg').value;
  const subject = encodeURIComponent(`Inquiry from ${name}`);
  const bodyText = encodeURIComponent(`${msg}\n\n— ${name} (${email})`);
  window.location.href = `mailto:hello@vlad.ops?subject=${subject}&body=${bodyText}`;
  document.getElementById('form-note').textContent = "Opening your email client...";
});

/* ============================================================
   HERO CANVAS: floating embers / dust particles + bats
============================================================= */
const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d');
let W, H, particles = [], bats = [];

function resizeCanvas(){
  W = canvas.width = canvas.offsetWidth;
  H = canvas.height = canvas.offsetHeight;
}
window.addEventListener('resize', resizeCanvas);

function initParticles(){
  particles = [];
  const count = window.innerWidth < 700 ? 26 : 55;
  for(let i=0;i<count;i++){
    particles.push({
      x: Math.random()*W,
      y: Math.random()*H,
      r: Math.random()*1.6 + 0.4,
      vy: -(Math.random()*0.25 + 0.05),
      vx: (Math.random()-0.5)*0.15,
      alpha: Math.random()*0.5 + 0.1
    });
  }
}

function initBats(){
  bats = [];
  const count = 5;
  for(let i=0;i<count;i++){
    bats.push({
      x: Math.random()*W,
      y: Math.random()*H*0.5,
      speed: Math.random()*0.6 + 0.3,
      wing: Math.random()*Math.PI*2,
      scale: Math.random()*0.6 + 0.6,
      amp: Math.random()*30 + 10
    });
  }
}

function drawBat(x,y,scale,wingPhase){
  const w = Math.sin(wingPhase) * 0.5 + 0.5; // 0..1 wing flap
  ctx.save();
  ctx.translate(x,y);
  ctx.scale(scale,scale);
  ctx.fillStyle = 'rgba(10,6,6,0.85)';
  ctx.beginPath();
  ctx.moveTo(0,0);
  ctx.quadraticCurveTo(-14, -6 - w*10, -22, 2 - w*4);
  ctx.quadraticCurveTo(-10, 0, 0, 4);
  ctx.quadraticCurveTo(10, 0, 22, 2 - w*4);
  ctx.quadraticCurveTo(14, -6 - w*10, 0, 0);
  ctx.fill();
  ctx.restore();
}

function loop(){
  ctx.clearRect(0,0,W,H);

  // dust / embers
  particles.forEach(p => {
    p.y += p.vy; p.x += p.vx;
    if(p.y < -10){ p.y = H + 10; p.x = Math.random()*W; }
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
    ctx.fillStyle = `rgba(201,162,39,${p.alpha})`;
    ctx.fill();
  });

  // bats
  bats.forEach(b => {
    b.x += b.speed;
    b.wing += 0.25;
    const yy = b.y + Math.sin(b.x*0.02) * b.amp * 0.05;
    if(b.x > W + 30) b.x = -30;
    drawBat(b.x, yy, b.scale, b.wing);
  });

  requestAnimationFrame(loop);
}

function startCanvas(){
  resizeCanvas();
  initParticles();
  initBats();
  loop();
}
startCanvas();
const shortVideo = document.getElementById('short-video');
const videoMute = document.getElementById('video-mute');

if (shortVideo && videoMute) {

  videoMute.addEventListener('click', async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (shortVideo.muted) {
      shortVideo.muted = false;
      shortVideo.volume = 1;

      try {
        await shortVideo.play();
        videoMute.textContent = '🔊';
        videoMute.setAttribute('aria-label', 'Mute video');
      } catch (error) {
        console.log('Browser prevented audio playback:', error);
        shortVideo.muted = true;
        videoMute.textContent = '🔇';
      }

    } else {
      shortVideo.muted = true;
      videoMute.textContent = '🔇';
      videoMute.setAttribute('aria-label', 'Unmute video');
    }
  });

}

