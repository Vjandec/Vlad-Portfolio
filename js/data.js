/* ============================================================
   VLAD PORTFOLIO — DATA FILE
   ------------------------------------------------------------
   Everything you'll want to edit lives in this one file.
   No HTML/CSS knowledge required to update content below.

   Everything is namespaced under the single VladData object
   so it can never collide with other global names.
   ============================================================ */
var VladData = {

  /* -----------------------------------------
     CONTACT LINKS ("Let's Connect" section)
     Placeholder "#" hrefs so the cards are visible
     immediately — replace each with your real link.
  ------------------------------------------ */
  contactLinks: {
    telegram: "https://t.me/@Awieblaze",
    discord: "https://discord.com/users/1488434250553229403",
    linkedin: "https://www.linkedin.com/in/vladimir-jandec-laguisma-aaba81406?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
    instagram: "https://www.instagram.com/v.jandecc?igsi=MTJ0d21xdnB2bzJtYQ%3D%3D&utm_source=q",
    whatsapp: "https://wa.me/639483460679"
  },

  /* -----------------------------------------
     FEATURED WORKS
     category options used for filtering:
     "Social Media" | "Creative" | "VA" | "Content" | "Other"

     images: an ARRAY of image paths in /assets/images/ — the first
             one is used as the grid thumbnail. Clicking the card
             opens a gallery lightbox that lets visitors page through
             every image in the array, so add as many as you want.
     video:  optional path to a hover-preview clip in /assets/videos/
     link:   optional external URL to the live work
  ------------------------------------------ */
  projects: [
    {
      id: "proj-01",
      title: "Jailbroken Device Configuration & Multi-App Deployment",
      category: "Technical Operations",
      description: "Configured and optimized jailbroken mobile devices for multi-platform application deployment, including dating and social media apps. Managed app environments, account setup, device configurations, and operational workflows across multiple platforms.",
      images: [
        "assets/images/work-social-01-a.jpg",
        "assets/images/work-social-01-b.jpg",
        "assets/images/work-social-01-c.jpg"
      ],
      video: "",
      link: ""
    },
    {
      id: "proj-02",
      title: "Social Media Management & Mobile Operations",
      category: "SOcial Media",
      description: "Managed and maintained social media accounts using JAILBROKEN Device environments, with a focus on content management, account operations, audience engagement, and day-to-day platform activities. Utilized jailbroken devices to support flexible multi-account management and streamline social media workflows across various platforms.",
      images: [
        "assets/images/work-va-01-a.jpg",
        "assets/images/work-va-01-b.png",
        "assets/images/work-va-01-c.jpg"
      ],
      video: "",
      link: ""
    },
    {
      id: "proj-03",
      title: "Graphic Design & Visual Content Creation",
      category: "Creative",
      description: "Created engaging and visually appealing graphics for social media, marketing materials, and digital content. Developed designs using Canva and other creative tools, focusing on clean layouts, strong visual composition, consistent branding, and content that effectively communicates the intended message..",
      images: [
        "assets/images/work-creative-01-a.jpg",
        "assets/images/work-creative-01-b.jpg",
        "assets/images/work-creative-01-c.jpg"
      ],
      video: "",
      link: ""
    },
    {
      id: "proj-04",
      title: "Google Workspace & Business Strategy",
      category: "Management",
      description: "Utilized Google Workspace tools to organize, manage, and streamline business operations and workflows. Developed structured systems for document management, data organization, collaboration, scheduling, and task coordination while applying strategic approaches to improve productivity and operational efficiency..",
      images: [
        "assets/images/work-social-02-a.jpg",
        "assets/images/work-social-02-b.png",
        "assets/images/work-social-02-c.png"
      ],
      video: "",
      link: ""
    }
  ],

  /* -----------------------------------------
     SHORT-FORM VIDEO EDITING SAMPLES
     src:   path to the actual video in /assets/videos/
     poster: thumbnail shown before play in /assets/images/
  ------------------------------------------ */
  videoSamples: [
    {
      id: "edit-01",
      title: "How to start Airbnb business in 2024",
      src: "assets/videos/edit-01.mp4",
      poster: "assets/images/edit-01-thumb.png"
    },
    {
      id: "edit-02",
      title: "PODCAST EDIT SAMPLE",
      src: "assets/videos/edit-02.mp4",
      poster: "assets/images/edit-02-thumb.jpg"
    },
    {
      id: "edit-03",
      title: "TALKING HEAD EDIT SAMPLE",
      src: "assets/videos/edit-03.mp4",
      poster: "assets/images/edit-03-thumb.png"
    },
    {
      id: "edit-04",
      title: "Edit Sample 04",
      src: "assets/videos/edit-04.mp4",
      poster: "assets/images/edit-04-thumb.png"
    },
    {
      id: "edit-05",
      title: "Funny/Meme EDIT SAMPLE",
      src: "assets/videos/edit-05.mp4",
      poster: "assets/images/edit-05-thumb.png"
    },
    {
      id: "edit-06",
      title: "CLAYPOTTTTT",
      src: "assets/videos/edit-06.mp4",
      poster: "assets/images/edit-06-thumb.png"
    }
  ],

  /* -----------------------------------------
     EXPERIENCE TIMELINE
     Placeholders only — do not invent real history.
     Edit label/date/description with your real info.
  ------------------------------------------ */
  experienceTimeline: [
    {
      date: "Feb-Mar — 2024 to 2025",
      title: "Virtual Assistant",
      description: "Creating and Managing Dating app under Agency."
    },
    {
      date: "Mar-Sept — 2025",
      title: "Social Media Management",
      description: "Creating and Managing Accounts on Social Media Using Jailbroken Device."
    },
    {
      date: "May — 2026",
      title: "CEO' Assistant",
      description: "upported the CEO with administrative tasks, scheduling, communication, organization, and daily business operations to keep workflows efficient and organized.."
    },
    {
      date: "Aug — Present",
      title: "Short-Form Video Editing",
      description: "Edited engaging short-form content for TikTok, Instagram Reels, and YouTube Shorts, focusing on strong hooks, clean cuts, captions, pacing, and audience retention."
    }
  ],

  /* -----------------------------------------
     SKILLS
  ------------------------------------------ */
  skillGroups: [
    { category: "Social Media", items: ["Instagram", "Reddit", "Threads", "Snapchat"] },
    { category: "Creative", items: ["CapCut Pro", "Canva", "Short-Form Editing"] },
    { category: "Operations", items: ["Google Workspace", "Adspower", "Jailbroken Phone Workflows"] },
    { category: "Virtual Assistance", items: ["Account Management", "Content Operations", "Social Media Workflows"] }
  ],

  /* -----------------------------------------
     SERVICES
     Rendered as a numbered list (01, 02, 03...)
     in the order given below — reorder freely,
     the numbers follow automatically.
  ------------------------------------------ */
  services: [
    {
      title: "Social Media Management",
      description: "Managed multiple social media accounts across Instagram, Reddit, and Threads using jailbroken mobile devices. Handled account organization, content posting, engagement, profile management, and daily platform activities while maintaining an efficient workflow across multiple accounts.."
    },
    {
      title: "Dating App VA",
      description: "Managed dating app operations across Hinge, Tinder, and Bumble, including account setup, profile creation, photo and bio organization, account maintenance, and day-to-day platform management. Focused on maintaining organized workflows and ensuring profiles were properly prepared and presented.."
    },
    {
      title: "Short-Form Video Editing",
      description: "Edited engaging short-form videos for platforms such as TikTok, Instagram Reels, and YouTube Shorts. Focused on clean cuts, captions, pacing, transitions, hooks, and attention-grabbing visuals designed to keep viewers engaged."
    },
    {
      title: "Graphic Designer",
      description: "Created professional and engaging graphics for social media, marketing materials, and digital platforms. Focused on clean layouts, visual consistency, branding, typography, and designs that effectively communicate ideas and capture attention."
    },
    {
      title: "Photo Editor",
      description: "Edited and enhanced photos for social media, marketing, and digital content. Focused on color correction, retouching, background adjustments, image enhancement, and creating polished visuals that maintain a natural and professional appearance."
    },
    {
      title: "Google Workspace",
      description: "Professional setup, organization, and management of Google Workspace tools including Gmail, Drive, Docs, Sheets, Calendar, and collaborative workflows to improve business productivity."
    }
  ],

  /* -----------------------------------------
     TOOLS OF THE TRADE
     Powers the auto-scrolling marquee. Each entry
     just needs a short label — swap `icon` for a
     2-3 letter placeholder now, and later replace
     the rendered glyph with a real logo image by
     editing the tool-icon rendering in js/gallery.js.
  ------------------------------------------ */
  toolsOfTrade: [
    { name: "CapCut", icon: "assets/images/tools/capcut.png" },
    { name: "Adobe Premiere Pro", icon: "assets/images/tools/premiere-pro.png" },
    { name: "Claude AI", icon: "assets/images/tools/claude.webp" },
    { name: "ChatGPT", icon: "assets/images/tools/chatgpt.webp" },
    { name: "Canva", icon: "assets/images/tools/canva.png" },
    { name: "Geelark", icon: "assets/images/tools/geelark.png" },
    { name: "AdsPower", icon: "assets/images/tools/adspower.png" },
    { name: "Meta Business Suite", icon: "assets/images/tools/meta-business.png" },
    { name: "Google Workspace", icon: "assets/images/tools/google-workspace.png" },
    { name: "Notion", icon: "assets/images/tools/notion.png" },
    { name: "Slack", icon: "assets/images/tools/slack.png" },
    { name: "Discord", icon: "assets/images/tools/discord.png" },
    { name: "Telegram", icon: "assets/images/tools/telegram.png" },
    { name: "Instagram", icon: "assets/images/tools/instagram.png" },
    { name: "Threads", icon: "assets/images/tools/threads.png" },
    { name: "Reddit", icon: "assets/images/tools/reddit.png" },
    { name: "Snapchat", icon: "assets/images/tools/snapchat.png" }
  ],

  /* -----------------------------------------
     WHY WORK WITH ME
     Short, punchy reasons a client should pick you.
     Placeholders only — edit with your real strengths.
  ------------------------------------------ */
  whyWorkWithMe: [
    {
      title: "Fast Turnaround",
      description: "Quick and efficient delivery while maintaining quality and attention to detail."
    },
    {
      title: "Clear Communication",
      description: "Responsive and professional communication with regular updates to keep projects on track."
    },
    {
      title: "Reliable & Detail-Oriented",
      description: "Dependable, organized, and focused on delivering accurate, polished, and high-quality work."
    },
    {
      title: "Flexible Availability",
      description: "Flexible working hours and availability to accommodate different schedules, deadlines, and project needs."
    }
  ],

  /* -----------------------------------------
     FAQ
  ------------------------------------------ */
  faqItems: [
    {
      q: "What services do you offer?",
      a: "Social media management, dating app virtual assistance, short-form video editing, graphic design, and photo editing."
    },
    {
      q: "How long have you been working as a VA?",
      a: "2+ years of virtual assistant experience across social media and dating app operations."
    },
    {
      q: "What platforms do you work with?",
      a: "Instagram, Reddit, Threads, and Snapchat, alongside tools like CapCut Pro, Canva, Google Workspace, and Adspower."
    },
    {
      q: "Do you provide short-form video editing?",
      a: "Yes — short-form editing for modern social platforms is one of my core specialties."
    },
    {
      q: "Can you manage social media accounts?",
      a: "Yes, account management and content operations are part of my day-to-day work."
    },
    {
      q: "What tools do you use?",
      a: "CapCut Pro, Canva, Google Workspace, Adspower, and jailbroken phone workflows, among others."
    },
    {
      q: "Are you available for freelance work?",
      a: "Yes — reach out through the contact section to discuss availability."
    },
    {
      q: "How can I contact you?",
      a: "Use any of the contact buttons at the bottom of this site."
    }
  ],

  /* -----------------------------------------
     NAVIGATION (id must match a section's id="")
  ------------------------------------------ */
  navItems: [
    { label: "Home", id: "home" },
    { label: "Tools", id: "tools" },
    { label: "About", id: "about" },
    { label: "Why Me", id: "why-work-with-me" },
    { label: "Skills", id: "skills" },
    { label: "Experience", id: "experience" },
    { label: "Services", id: "services" },
    { label: "Works", id: "works" },
    { label: "Video Editing", id: "video-editing" },
    { label: "FAQ", id: "faq" },
    { label: "Contact", id: "contact" }
  ]

};
