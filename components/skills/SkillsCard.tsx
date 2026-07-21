"use client";

import { ArrowUpRight } from "lucide-react";

type SkillCardProps = {
  name: string;
  level: number;
};

export default function SkillCard({
  name,
  level,
}: SkillCardProps) {
  return (
    
    <div
      className="skill-card group relative overflow-hidden rounded-3xl border border-line bg-panel/70 p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-ember/50"
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      {/* Mouse Glow */}
      <div className="card-glow absolute h-56 w-56 rounded-full bg-ember/20 blur-[90px] opacity-0 pointer-events-none" />

      {/* Animated Glow */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -left-24 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-ember/20 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-40 w-40 rounded-full bg-orange-400/10 blur-3xl" />
      </div>

      {/* Gradient Border */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-ember/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between">
        <h3 className="font-display text-xl font-semibold text-paper">
          {name}
        </h3>

        <ArrowUpRight
          size={18}
          className="text-muted transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-ember"
        />
      </div>

      {/* Progress */}
      <div className="relative z-10 mt-8">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs uppercase tracking-[0.25em] text-muted">
            Proficiency
          </span>

          <span className="font-mono text-sm font-semibold text-ember">
            {level}%
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-panel2">
          <div
            className="skill-progress h-full rounded-full bg-gradient-to-r from-ember via-orange-400 to-yellow-300"
            data-progress={level}
            style={{
              width: "0%",
            }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-8 flex items-center justify-between">
        <span className="rounded-full border border-line bg-panel2 px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-muted">
          Production Ready
        </span>

        <span className="text-xs text-muted transition-colors duration-300 group-hover:text-paper">
          View Details →
        </span>
      </div>

      {/* Shine Effect */}
      <div className="absolute -left-40 top-0 h-full w-20 -skew-x-12 bg-white/5 opacity-0 transition-all duration-700 group-hover:left-[140%] group-hover:opacity-100" />
    </div>
  );
}