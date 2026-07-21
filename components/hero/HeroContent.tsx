"use client";

import { Mail, Quote, Code2 } from "lucide-react";
import { profile, highlights } from "@/lib/content";

export default function HeroContent() {
  return (
    <div className="hero-content relative">
      {/* Greeting */}
      <p className="hero-subtitle text-sm mb-5">
        <span className="text-muted">Hey, I&apos;m </span>
        <span className="text-ember font-medium">{profile.name}</span>
      </p>

      {/* Main Heading */}
      <h1 className="hero-title font-display font-semibold text-[12vw] leading-[0.95] sm:text-6xl lg:text-7xl text-balance">
        {profile.role}
      </h1>

      {/* Description */}
      <p className="hero-description mt-6 max-w-md text-muted leading-relaxed">
        {profile.tagline}
      </p>

      {/* CTA Buttons */}
      <div className="hero-buttons flex flex-wrap items-center gap-4 mt-9">
        <a
          href="#connect"
          className="magnetic-btn inline-flex items-center gap-2 rounded-full bg-ember px-6 py-3 font-semibold text-void transition-all duration-300 hover:scale-105 hover:bg-emberlight"
        >
          Hire Me
        </a>

        <a
          href={`mailto:${profile.email}`}
          aria-label="Email Me"
          className="magnetic-btn flex h-11 w-11 items-center justify-center rounded-full border border-line transition-all duration-300 hover:border-ember hover:text-ember hover:scale-110"
        >
          <Mail size={18} />
        </a>
      </div>

      {/* Divider */}
      <div className="hidden sm:block mt-14 mb-8 h-px max-w-sm bg-line" />

      {/* Decorative Icon */}
      <div className="relative hidden max-w-sm sm:block">
        <Code2
          className="absolute -left-10 -top-10 text-ember/10 pointer-events-none"
          size={190}
          strokeWidth={1.2}
        />

        {/* Stats Card */}
        <div className="relative rounded-2xl border border-line bg-panel p-5">
          <div className="flex items-start gap-3">
            <Quote className="shrink-0 text-ember" size={20} />

            <div className="grid w-full grid-cols-3 gap-4">
              {highlights.map((item) => (
                <div key={item.label}>
                  <p className="font-display text-2xl font-semibold text-ember">
                    {item.value}
                  </p>

                  <p className="mt-1 text-[11px] leading-snug text-muted">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}