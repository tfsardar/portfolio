import { ExternalLink, Github, LayoutGrid } from "lucide-react";
import type { Project } from "@/lib/content";

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className="group relative bg-panel border border-line rounded-2xl overflow-hidden hover:border-ember/60 transition-colors">
      <div className="relative aspect-video bg-panel2 overflow-hidden">
        {project.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-[linear-gradient(135deg,#1C1712,#0B0A08)]">
            <LayoutGrid className="text-ember/40" size={28} />
            <p className="font-mono text-[11px] text-muted px-4 text-center">
              Add a screenshot to /public/images/projects
            </p>
          </div>
        )}

        <span className="absolute top-3 left-3 font-mono text-[11px] text-muted bg-void/70 rounded-full px-2.5 py-1">
          0{index + 1}
        </span>
      </div>

      <div className="p-6">
        <h3 className="font-display font-semibold text-xl mb-2">{project.title}</h3>
        <p className="text-muted text-sm leading-relaxed mb-4">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-5">
          {project.tags.map((t) => (
            <span key={t} className="font-mono text-[11px] uppercase tracking-wide text-emberlight bg-panel2 rounded-full px-3 py-1">
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 text-sm">
          {project.liveUrl && (
            <a href={project.liveUrl} className="inline-flex items-center gap-1.5 hover:text-ember transition-colors">
              <ExternalLink size={14} /> Live site
            </a>
          )}
          {project.repoUrl && (
            <a href={project.repoUrl} className="inline-flex items-center gap-1.5 text-muted hover:text-ember transition-colors">
              <Github size={14} /> Code
            </a>
          )}
        </div>
      </div>
    </article>
  );
}