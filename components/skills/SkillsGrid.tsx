"use client";

import { skills } from "@/lib/content";
import SkillCard from "./SkillsCard";

export default function SkillsGrid() {
  return (
    <div className="skills-grid relative">
      {/* Background Decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember/5 blur-[140px]" />
      </div>

      {/* Skills Grid */}
      <div
        className="
          relative
          grid
          gap-6
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
        "
      >
        {skills.map((skill, index) => (
          <div
            key={skill.name}
            className="skill-reveal"
            style={{
              animationDelay: `${index * 80}ms`,
            }}
          >
            <SkillCard
              name={skill.name}
              level={skill.level}
            />
          </div>
        ))}
      </div>
    </div>
  );
}