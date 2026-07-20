import { skills, stack } from "@/lib/content";

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 border-t border-line">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex items-end justify-between mb-14 flex-wrap gap-4">
          <div>
            <h2 className="font-display font-semibold text-4xl sm:text-5xl">What I work with</h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-x-16 gap-y-8 mb-16">
          {skills.map((s) => (
            <div key={s.name}>
              <div className="flex items-baseline justify-between mb-2">
                <span className="font-medium">{s.name}</span>
                <span className="font-mono text-xs text-muted">{s.level}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-panel2 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-ember to-emberlight"
                  style={{ width: `${s.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          {stack.map((s) => (
            <span
              key={s}
              className="font-mono text-xs uppercase tracking-wide border border-line rounded-full px-4 py-2 text-muted hover:text-ember hover:border-ember transition-colors"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}