"use client";
import { projects } from "@/lib/content";
import ProjectCard from "./ProjectCard";
import useProjectsAnimation from "@/app/hooks/useProjectsAnimation";

export default function Projects() {
  useProjectsAnimation();

  return (
    <section id="projects" className="relative py-24 border-t border-line">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <h2 className="font-display font-semibold text-4xl sm:text-5xl mb-4">Selected work</h2>
        <p className="text-muted max-w-lg mb-14">
          Full-stack builds from internship work and personal projects — real screenshots, real stacks.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}