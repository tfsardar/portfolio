"use client";

import SkillsHeader from "./skills/SkillsHeader";
import SkillsGrid from "./skills/SkillsGrid";
import useSkillsAnimation from "@/app/hooks/useSkillsAnimation";
import useSkillCardEffects from "@/app/hooks/useSkillCardEffects";

export default function Skills() {
  useSkillsAnimation();
  useSkillCardEffects();
  return (
    <section
      id="skills"
      className="relative overflow-hidden py-28"
    >
      <div className="absolute inset-0 pointer-events-none bg-grid bg-[size:42px_42px] opacity-20" />

      <div className="relative max-w-7xl mx-auto px-6">

        

        <SkillsHeader />

        <SkillsGrid />

      </div>
    </section>
  );
}