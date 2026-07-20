// ─────────────────────────────────────────────────────────────
// EDIT THIS FILE to update your info, skills, experience,
// projects and videos. Nothing else needs to change.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: "Umair.Ali",
  fullName: "Umair Ali",
  role: "Full-Stack Web Developer",
  tagline:
    "I build clean, scalable, AI-powered web apps with Next.js, NestJS and PostgreSQL — from database schema to shipped product.",
  email: "ua0689110@gmail.com",
  phone: "0306-1134874",
  location: "Rawalpindi, Pakistan",
  resumeUrl: "/resume.pdf",
  github: "https://github.com/umairali110",
  linkedin: "https://www.linkedin.com/in/umairali110/",
  avatar: "/images/profile.jpg", // add your photo here — falls back to initials if missing
};

export const nav = [
  { label: "Home", href: "#home" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Connect", href: "#connect" },
];

// small highlight stats shown on the hero card
export const highlights = [
  { value: "2", label: "Internships completed" },
  { value: "4+", label: "Full-stack projects shipped" },
  { value: "3.3", label: "CGPA · BS Computer Science" },
];

export const orbitBadges = ["Next", "TS", "Nest", "PG"];

export const skills = [
  { name: "Next.js / React", level: 92 },
  { name: "TypeScript", level: 88 },
  { name: "NestJS", level: 85 },
  { name: "PostgreSQL / TypeORM", level: 80 },
  { name: "Tailwind CSS", level: 90 },
  { name: "REST APIs & JWT Auth", level: 86 },
  { name: "Redux", level: 78 },
  { name: "Prompt Engineering / AI APIs", level: 75 },
  { name: "Postman", level: 85 },
  { name: "GithHub Workflow Actions", level: 55 },
  { name: "Docker", level: 75 },
  { name: "Build CLI comands", level: 85 },
  { name: "Kubernetes", level: 45 },
  { name: "Vercel/Supabse/Railway", level: 95 },
];

export const stack = [
  "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS", "Redux",
  "NestJS", "TypeORM", "PostgreSQL", "JWT", "Stripe", "Cloudinary", "Git",
];

export const education = [
  {
    degree: "BS Computer Science",
    school: "Barani Institute of Management Sciences (Arid University)",
    period: "2023 — In Progress · Expected Jan 2027",
    detail: "CGPA: 3.3 / 4.00",
  },
  {
    degree: "Intermediate (ICS)",
    school: "Sir Syed College",
    period: "2021 — 2023",
    detail: "568 / 1100",
  },
];

export const experience = [
  {
    role: "Software Engineering Intern",
    company: "Nayatel",
    period: "3 Months",
    description:
      "Integrated AI-powered features into a full-stack weather application — built and connected backend endpoints in NestJS to serve AI-generated responses grounded in live weather data, with hands-on exposure to prompt engineering, third-party API integration, and code review.",
    tags: ["NestJS", "Prompt Engineering", "API Integration"],
  },
  {
    role: "Web Development Intern",
    company: "DevSphere",
    period: "2 Months",
    description:
      "Contributed to front-end development tasks as part of a collaborative team, gaining exposure to real-world development workflows, version control, and team-based coding standards.",
    tags: ["Frontend", "Git", "Team Workflow"],
  },
];

export type Project = {
  title: string;
  description: string;
  tags: string[];
  image?: string; // path in /public/images/projects — screenshot shown on the card
  liveUrl?: string;
  repoUrl?: string;
};

export const projects: Project[] = [
  {
    title: "AI Interview Platform",
    description:
      "An AI-powered mock interview platform that generates personalized technical questions from an uploaded resume, scores answers in real time, and builds a custom learning roadmap per candidate.",
    tags: ["Next.js 14", "NestJS", "Prisma", "Groq LLaMA", "Clerk Auth", "Socket.IO"],
    image: "/images/ai-interview.jpg",
    liveUrl: "#",
    repoUrl: "https://github.com/umairali110/Ai-interview-platform.git",
  },
  {
    title: "MovieVault — Netflix-Style Streaming Platform",
    description:
      "A full-stack movie platform to browse, search and watch trailers across 800,000+ TMDB titles, with JWT auth, favourites, avatar uploads, and a secured NestJS proxy to keep the TMDB key private.",
    tags: ["Next.js", "NestJS", "TypeORM", "JWT", "TMDB API"],
    image: "/images/movievault.jpg",
    liveUrl: "https://www.linkedin.com/posts/umairali110_webdevelopment-fullstackdeveloper-nextjs-ugcPost-7477669201869070336-aRYv/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFG0EXgBq65TifUFkRMmuQa0RcLRsxJDtT0",
    repoUrl: "https://github.com/umairali110/Movie-Vault.git",
  },
  {
    title: "WeatherNow — AI-Powered Weather App",
    description:
      "A weather app pairing live OpenWeather forecasts with a Hugging Face-powered AI assistant that answers natural-language questions like \u201cIs tomorrow good for cricket?\u201d in plain, context-aware replies.",
    tags: ["Next.js", "NestJS", "OpenWeather API", "Hugging Face"],
    image: "/images/weathernow.jpg",
    liveUrl: "https://www.linkedin.com/posts/umairali110_webdevelopment-nextjs-nestjs-share-7478040596868411392-7eYC/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFG0EXgBq65TifUFkRMmuQa0RcLRsxJDtT0",
    repoUrl: "https://github.com/umairali110/Weather-app.git",
  },
  {
    title: "Full-Stack E-Commerce Platform",
    description:
      "Production-ready store with Stripe payments and webhook handling, Cloudinary product media, role-based access for Admin/Customer, and Redux-driven cart and checkout.",
    tags: ["Next.js", "NestJS", "Stripe", "Cloudinary", "Redux"],
    image: "/images/ecommerce.jpg",
    liveUrl: "https://www.linkedin.com/posts/umairali110_fullstackdevelopment-nextjs-nestjs-ugcPost-7475091089792679937-7JrU/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFG0EXgBq65TifUFkRMmuQa0RcLRsxJDtT0",
    repoUrl: "https://github.com/umairali110/-Ecommerce-Website.git",
  },
  {
    title: "Role-Based Admin Dashboard",
    description:
      "A secure employee management system with JWT auth and token refresh, role-based access separating Admin and User tiers, and full CRUD with filtering and pagination.",
    tags: ["Next.js", "NestJS", "PostgreSQL", "TypeORM", "RBAC"],
    image: "/images/admin.jpg",
    liveUrl: "https://www.linkedin.com/posts/umairali110_nestjs-nextjs-fullstackdeveloper-ugcPost-7473221274723446784-iqxx/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFG0EXgBq65TifUFkRMmuQa0RcLRsxJDtT0",
    repoUrl: "https://github.com/umairali110/Role-Based-Admin-Dashboard.git",
  },
];