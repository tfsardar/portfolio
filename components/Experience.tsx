"use client";
import { experience, education } from "@/lib/content";
import useExperienceAnimation from "@/app/hooks/useExperienceAnimation";

export default function Experience() {
  useExperienceAnimation();

  return (
    <section id="experience" className="relative py-24 border-t border-line">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <h2 className="font-display font-semibold text-4xl sm:text-5xl mb-14">Where I&apos;ve worked</h2>

        <div className="relative border-l border-line ml-2">
          {experience.map((job) => (
            <div key={job.role + job.company} className="relative pl-8 pb-14 last:pb-0">
              <span className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-ember shadow-[0_0_0_4px_rgba(255,106,43,0.15)]" />
              <p className="font-mono text-xs text-muted mb-2">{job.period}</p>
              <h3 className="font-display font-semibold text-xl sm:text-2xl">
                {job.role} <span className="text-muted font-body font-normal">· {job.company}</span>
              </h3>
              <p className="text-muted mt-3 max-w-2xl leading-relaxed">{job.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {job.tags.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[11px] uppercase tracking-wide bg-panel2 text-emberlight rounded-full px-3 py-1"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* education */}
        <div className="mt-16 pt-12 border-t border-line grid sm:grid-cols-2 gap-8">
          {education.map((e) => (
            <div key={e.degree}>
              <p className="font-mono text-xs text-muted mb-2">{e.period}</p>
              <h4 className="font-display font-semibold text-lg">{e.degree}</h4>
              <p className="text-muted text-sm mt-1">{e.school}</p>
              <p className="text-emberlight text-sm mt-1 font-mono">{e.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}