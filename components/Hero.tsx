"use client";

import HeroContent from "./hero/HeroContent";
import HeroAvatar from "./hero/HeroAvatar";
import HeroBackground from "./hero/HeroBackground";
import useHeroAnimation from "@/app/hooks/useHeroAnimation";

export default function Hero() {
  useHeroAnimation();
  return (
    <section
      id="home"
      className="relative overflow-hidden pt-36 pb-24 sm:pt-44 sm:pb-32"
    >
      <HeroBackground />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-16 items-center">
          <HeroContent />
          <HeroAvatar />
        </div>
      </div>
    </section>
  );
}