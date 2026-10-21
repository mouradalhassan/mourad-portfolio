/* Central content for the portfolio. Everything here comes from Mourad's CV
   and the projects he built — no invented numbers or clients. */

export const SITE = {
  name: "Mourad Al Hassan",
  role: "Junior Full Stack Developer",
  location: "Tripoli, Lebanon",
  // WhatsApp: digits only, no + (used in https://wa.me/…)
  whatsapp: "96181491228",
  phone: "+961 81 491 228",
  email: "mouradalhassan2005@gmail.com",
  linkedin: "https://www.linkedin.com/in/mourad-al-hassan-095267275",
  github: "https://github.com/mouradalhassan",
};

export const HERO = {
  status: "Open to junior roles & freelance projects",
  bio: "I build fast, bilingual (English/Arabic) websites, online stores, and ordering systems for real businesses, and I handle everything from the first call to launch and handover.",
  facts: [
    { k: "20+", v: "websites built for real businesses" },
    { k: "Front to back", v: "design, code, database, hosting" },
    { k: "AR · EN · FR", v: "I work with clients in all three" },
  ],
};

export const ABOUT = {
  paragraphs: [
    "Every project you just scrolled past is live, and a real business runs on it: taking orders, showing products, bringing in customers.",
    "I build the whole thing myself, from the first sketch to the database to the domain, in English and Arabic. You get a launched website, not a mockup.",
  ],
  skills: [
    { group: "Frontend", items: ["HTML5", "CSS3", "JavaScript (ES6+)", "TypeScript", "React / Next.js", "Vite", "Tailwind CSS", "GSAP", "RTL / Arabic localization"] },
    { group: "Backend & data", items: ["Node.js", "REST APIs", "Serverless functions", "PostgreSQL", "Prisma", "Redis (Upstash)", "Netlify Blobs"] },
    { group: "Deploy & tools", items: ["Git / GitHub", "Vercel", "Netlify", "Domains & DNS", "PWA", "Web Push"] },
  ],
  languages: "Arabic (native) · English (fluent) · French (intermediate)",
  openTo: "Junior full stack roles and freelance projects",
};

/** The kinds of businesses behind the other websites (no names). */
export const MORE_KINDS = [
  "Fashion boutiques",
  "Perfume store",
  "Aesthetics clinic",
  "Pâtisserie",
  "Optical store",
  "Modest-fashion brand",
  "Hair-care brand",
  "Turkish clothing store",
  "Recycling platform",
  "Coffee shop",
];

export type App = {
  title: string;
  category: string;
  blurb: string;
  facts: string[];
  tags: string[];
  shots: [string, string, string];
  accent: string;
};

export const APPS: App[] = [
  {
    title: "AuraFit",
    category: "Fitness & nutrition app",
    blurb: "Daily meal plans with macros, guided workouts, and a live calorie and BMI dashboard.",
    facts: ["Meal plans with protein, carbs, and fat", "Workout splits with exercises", "Calories and BMI at a glance"],
    tags: ["React", "Capacitor", "Android"],
    shots: ["/apps/fit-meal.webp", "/apps/fit-home.webp", "/apps/fit-train.webp"],
    accent: "#a78bfa",
  },
  {
    title: "PlastOrganic",
    category: "Recycling app",
    blurb: "Citizens scan and post their recyclable waste, and factories and municipalities collect it.",
    facts: ["Three roles: citizen, factory, municipality", "Scan an item to classify the waste", "Post waste by category and weight"],
    tags: ["Android app", "Camera scan", "Marketplace"],
    shots: ["/apps/plast-roles.webp", "/apps/plast-scan.webp", "/apps/plast-post.webp"],
    accent: "#34d399",
  },
];

export const SERVICES = [
  { icon: "globe", title: "Business websites", text: "Fast, mobile-first, English and Arabic." },
  { icon: "cart", title: "Stores and ordering", text: "Catalogs, carts, WhatsApp or online checkout." },
  { icon: "panel", title: "Admin dashboards", text: "Owners update everything themselves." },
  { icon: "bell", title: "Web apps and PWAs", text: "Logins, databases, push notifications." },
  { icon: "rocket", title: "Launch and handover", text: "Hosting, domain, DNS, and a guide." },
  { icon: "lang", title: "Arabic and English", text: "Right-to-left layouts done properly." },
];

export const STEPS = [
  {
    n: "01",
    t: "Intro call",
    d: "Tell me about your business, your customers, and what the site has to do. I ask the questions that shape the project.",
  },
  {
    n: "02",
    t: "Plan & quote",
    d: "You get a clear plan: pages, features, languages, timeline, and price, before any work starts.",
  },
  {
    n: "03",
    t: "Design",
    d: "You see the look and the content first, in English and Arabic if you need both, and we adjust it together.",
  },
  {
    n: "04",
    t: "Build & preview",
    d: "I build it and send you a live preview link, so you can test everything on your own phone.",
  },
  {
    n: "05",
    t: "Launch & handover",
    d: "Your domain, hosting, and admin panel go live, with a short guide. Everything is yours.",
  },
];

export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  blurb: string;
  facts: string[];
  tags: string[];
  href?: string;
  accent: string;
  images: [string, string];
};

export const PROJECTS: Project[] = [
  {
    slug: "tayseer",
    title: "Tayseer",
    category: "E-commerce platform",
    year: "2026",
    blurb: "A bilingual online store with a full admin panel behind it.",
    facts: ["Arabic RTL + English", "Storefront + admin panel", "OTP login, card and cash payments"],
    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    href: "https://tayseer-alpha.vercel.app",
    accent: "#f5b700",
    images: ["/projects/tayseer-1.webp", "/projects/tayseer-2.webp"],
  },
  {
    slug: "deens-coffee",
    title: "Deen’s Coffee",
    category: "Ordering website",
    year: "2026",
    blurb: "A coffee shop that takes orders online, on its own domain.",
    facts: ["Daily order numbers", "Owner admin with photo uploads", "GSAP-animated storefront"],
    tags: ["Vite", "Tailwind CSS", "GSAP", "Node.js"],
    href: "https://deenscoffeeshop.com",
    accent: "#2fb5ae",
    images: ["/projects/deens-1.webp", "/projects/deens-2.webp"],
  },
  {
    slug: "mea-techno",
    title: "MEA Techno",
    category: "Catalog + quote requests",
    year: "2026",
    blurb: "Customers build a quote from 250+ products and send it on WhatsApp.",
    facts: ["250+ products, 4 categories", "English and Arabic", "Quote list sent on WhatsApp"],
    tags: ["JavaScript", "WhatsApp", "EN / AR"],
    href: "https://meatechno.vercel.app",
    accent: "#ffc61a",
    images: ["/projects/mea-1.webp", "/projects/mea-2.webp"],
  },
  {
    slug: "tima-home",
    title: "Tıma Home",
    category: "Storefront",
    year: "2026",
    blurb: "A home-accessories store with a scroll-animated hero.",
    facts: ["Scroll-driven house animation", "Tap a shade, watch the sofa change", "English and Arabic, WhatsApp checkout"],
    tags: ["JavaScript", "CSS", "SVG"],
    href: "https://timahome.vercel.app",
    accent: "#e1262b",
    images: ["/projects/tima-1.webp", "/projects/tima-2.webp"],
  },
  {
    slug: "spoil-fashion",
    title: "Spoil Fashion",
    category: "Store + admin app",
    year: "2026",
    blurb: "A clothing store whose admin app pings the owner on every order.",
    facts: ["WhatsApp checkout", "Installable admin PWA", "Push notification per order"],
    tags: ["PWA", "Web Push", "Vercel"],
    accent: "#d9d9e3",
    images: ["/projects/spoil-1.webp", "/projects/spoil-2.webp"],
  },
];

export const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Apps", href: "#apps" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];
