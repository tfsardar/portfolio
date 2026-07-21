"use client";

import { Sparkles } from "lucide-react";

export default function SkillsHeader() {
  return (
    <div className="skills-heading mx-auto mb-20 max-w-3xl text-center">
      {/* Badge */}
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-panel/70 px-4 py-2 backdrop-blur-xl">
        <Sparkles size={16} className="text-ember" />
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted">
          Technical Skills
        </span>
      </div>

      {/* Heading */}
      <h2 className="font-display text-4xl font-bold leading-tight text-paper md:text-6xl">
        Building products with
        <br />
        <span className="bg-gradient-to-r from-ember via-orange-300 to-yellow-300 bg-clip-text text-transparent">
          modern technologies
        </span>
      </h2>

      {/* Description */}
      <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-muted">
        I specialize in building scalable full-stack applications using
        modern frontend frameworks, robust backend architectures,
        cloud-native tooling, databases, and AI integrations.
      </p>

      {/* Decorative Line */}
      <div className="mx-auto mt-10 h-[2px] w-32 rounded-full bg-gradient-to-r from-transparent via-ember to-transparent" />
    </div>
  );
}