"use client";

import { profile, orbitBadges } from "@/lib/content";
import Image from "next/image";

export default function HeroAvatar() {
  const initials = profile.fullName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="hero-avatar relative flex justify-center items-center">
      <div className="relative w-full max-w-sm aspect-square flex items-center justify-center">

        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full border border-line opacity-60" />

        {/* Middle Ring */}
        <div className="absolute inset-[10%] rounded-full border border-line opacity-50" />

        {/* Inner Dashed Ring */}
        <div className="absolute inset-[22%] rounded-full border border-dashed border-line/60" />

        {/* Animated Glow */}
        <div className="absolute inset-[18%] rounded-full bg-ember/10 blur-3xl animate-pulse" />

        {/* Orbit Icons */}
        <div className="absolute inset-0 orbit-wrapper">
          {orbitBadges.map((badge, index) => (
            <div
              key={badge}
              className="orbit-item absolute"
              style={{
                top: "50%",
                left: "50%",
                transform: `rotate(${index * (360 / orbitBadges.length)}deg) translateY(-180px)`,
                transformOrigin: "center",
              }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-panel2 shadow-[0_0_30px_rgba(255,106,43,0.25)] backdrop-blur-xl">
                <span className="font-mono text-[11px] font-semibold text-ember">
                  {badge}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Avatar */}
        <div className="hero-image relative z-20 h-[62%] w-[62%] overflow-hidden rounded-full border-2 border-ember/40 bg-panel2 shadow-[0_0_80px_rgba(255,106,43,0.45)]">

          <Image
            src={profile.avatar}
            alt={profile.fullName}
            fill
            style={{ objectFit: 'cover', objectPosition: 'top' }}
            className="transition-transform duration-700 hover:scale-110"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';

              const fallback = target.nextElementSibling as HTMLElement;

              if (fallback) {
                fallback.style.display = 'flex';
              }
            }}
          />

          {/* Fallback Initials */}
          <div className="absolute inset-0 hidden items-center justify-center bg-gradient-to-br from-panel2 to-void">
            <span className="font-display text-6xl font-bold text-ember">
              {initials}
            </span>
          </div>
        </div>

        {/* Online Status */}
        <div className="absolute bottom-3 right-5 z-30 flex items-center gap-2 rounded-full border border-line bg-panel px-3 py-2 backdrop-blur-xl shadow-lg">
          <span className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse" />
          <span className="font-mono text-[11px] text-muted">
            Available for work
          </span>
        </div>

        {/* Floating Glow Circles */}
        <div className="absolute left-8 top-10 h-4 w-4 rounded-full bg-ember blur-sm" />

        <div className="absolute bottom-12 left-16 h-3 w-3 rounded-full bg-cyan-400 blur-sm" />

        <div className="absolute right-12 top-20 h-5 w-5 rounded-full bg-violet-500 blur-md animate-bounce" />
      </div>
    </div>
  );
}