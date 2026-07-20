"use client";

import { Mail, Quote, Code2 } from "lucide-react";
import { profile, orbitBadges, highlights } from "@/lib/content";

export default function Hero() {
  const initials = profile.fullName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  return (
    <section id="home" className="relative pt-36 pb-24 sm:pt-44 sm:pb-32 overflow-hidden">
      {/* ambient grid + glow */}
      <div className="absolute inset-0 bg-grid bg-[size:44px_44px] grid-fade pointer-events-none" />
      <div className="absolute -top-24 right-[-10%] w-[620px] h-[620px] bg-ember-glow pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[1.05fr_0.95fr] gap-16 items-center">
        {/* left: copy */}
        <div className="animate-rise">
          <p className="text-sm mb-5">
            <span className="text-muted">Hey, I am</span>{" "}
            <span className="text-ember font-medium">{profile.name}</span>
          </p>
          <h1 className="font-display font-semibold text-[12vw] leading-[0.95] sm:text-6xl lg:text-7xl text-balance">
            {profile.role}
          </h1>
          <p className="text-muted mt-6 max-w-md leading-relaxed">{profile.tagline}</p>

          <div className="flex items-center gap-4 mt-9">
            <a
              href="#connect"
              className="inline-flex items-center gap-2 bg-ember text-void font-semibold rounded-full px-6 py-3 hover:bg-emberlight transition-colors"
            >
              Hire me
            </a>
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email me"
              className="w-11 h-11 rounded-full border border-line flex items-center justify-center hover:border-ember hover:text-ember transition-colors"
            >
              <Mail size={17} />
            </a>
          </div>

          {/* divider */}
          <div className="hidden sm:block h-px bg-line max-w-sm mt-14 mb-8" />

          {/* highlight card with decorative glyph behind it */}
          <div className="hidden sm:block relative max-w-sm">
            <Code2
              className="absolute -left-10 -top-10 text-ember/10 pointer-events-none"
              size={190}
              strokeWidth={1.2}
            />
            <div className="relative flex items-start gap-3 bg-panel border border-line rounded-2xl p-5">
              <Quote className="text-ember shrink-0" size={20} />
              <div className="grid grid-cols-3 gap-4 w-full">
                {highlights.map((h) => (
                  <div key={h.label}>
                    <p className="font-display text-2xl font-semibold text-ember">{h.value}</p>
                    <p className="text-[11px] text-muted leading-snug mt-1">{h.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* right: avatar + orbit badges, matching the reference composition */}
        <div className="relative flex justify-center">
          <div className="relative w-full max-w-sm aspect-square flex items-center justify-center">
            {/* orbit rings */}
            <div className="absolute inset-0 rounded-full border border-line" />
            <div className="absolute inset-[10%] rounded-full border border-line" />
            <div className="absolute inset-[22%] rounded-full border border-dashed border-line/70" />

            {/* orbiting tech badges */}
            <div className="absolute inset-0 animate-orbit">
              {orbitBadges.map((s, i) => (
                <span
                  key={s}
                  style={{
                    transform: `rotate(${i * 90}deg) translate(0, -50%)`,
                    top: "50%",
                    left: "calc(50% - 22px)",
                  }}
                  className="absolute w-11 h-11 rounded-xl bg-panel2 border border-line grid place-items-center animate-orbit-rev shadow-[0_0_20px_-4px_rgba(255,106,43,0.4)]"
                >
                  <span className="text-[11px] font-mono font-semibold text-emberlight">{s}</span>
                </span>
              ))}
            </div>

            {/* center avatar */}
            <div className="relative z-10 w-[62%] aspect-square rounded-full overflow-hidden border-2 border-ember/40 bg-panel2 shadow-[0_0_80px_-10px_rgba(255,106,43,0.45)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={profile.avatar}
                alt={profile.fullName}
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                  const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = "flex";
                }}
              />
              <div className="hidden w-full h-full items-center justify-center bg-gradient-to-br from-panel2 to-void absolute inset-0">
                <span className="font-display text-6xl font-semibold text-ember/80">{initials}</span>
              </div>
            </div>

            {/* status pill */}
            <div className="absolute bottom-2 right-6 z-20 flex items-center gap-2 bg-panel border border-line rounded-full pl-2 pr-3 py-1.5">
              <span className="w-2 h-2 rounded-full bg-signal animate-pulse" />
              <span className="font-mono text-[11px] text-muted">open to work</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}