"use client";

import { useEffect, useState } from "react";
import { Download, Menu, X, FileText } from "lucide-react";
import { nav, profile } from "@/lib/content";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const sections = nav.map((n) => document.querySelector(n.href)).filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <header className="fixed top-4 sm:top-6 inset-x-0 z-50 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        <a href="#home" className="font-display text-xl font-semibold tracking-tight shrink-0">
          {profile.name}
        </a>

        <nav className="hidden md:flex items-center gap-1 bg-panel/90 backdrop-blur-md border border-line rounded-full px-2 py-2">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-[13px] px-4 py-1.5 rounded-full transition-colors ${
                active === item.href ? "text-ember bg-panel2" : "text-muted hover:text-paper"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={profile.resumeUrl}
          download
          className="hidden md:inline-flex items-center gap-2.5 bg-panel/90 backdrop-blur-md border border-line rounded-full pl-4 pr-1.5 py-1.5 text-[13px] hover:border-ember hover:text-ember transition-colors shrink-0"
        >
          <FileText size={14} className="text-ember" />
          Download Resume
          <span className="w-7 h-7 rounded-full bg-panel2 flex items-center justify-center">
            <Download size={13} />
          </span>
        </a>

        <button
          className="md:hidden w-10 h-10 rounded-full bg-panel border border-line flex items-center justify-center"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden max-w-6xl mx-auto mt-3 bg-panel border border-line rounded-2xl px-5 py-5">
          <ul className="flex flex-col gap-4 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={() => setOpen(false)} className="text-muted hover:text-paper">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={profile.resumeUrl}
            download
            className="mt-5 inline-flex items-center gap-2 border border-line rounded-full pl-4 pr-1.5 py-1.5 text-[13px]"
          >
            Download Resume
            <span className="w-7 h-7 rounded-full bg-panel2 flex items-center justify-center">
              <Download size={13} />
            </span>
          </a>
        </div>
      )}
    </header>
  );
}