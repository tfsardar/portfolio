import { Mail, Github, Linkedin, Phone } from "lucide-react";
import { profile } from "@/lib/content";

const socials = [
  { icon: Github, label: "GitHub", href: profile.github },
  { icon: Linkedin, label: "LinkedIn", href: profile.linkedin },
];

export default function Connect() {
  return (
    <section id="connect" className="relative py-28 border-t border-line overflow-hidden">
      <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-ember-glow pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 text-center">
        <h2 className="font-display font-semibold text-4xl sm:text-6xl text-balance max-w-2xl mx-auto">
          Have a project? Let&apos;s build it.
        </h2>
        <p className="text-muted mt-5 max-w-md mx-auto">
          Open to Work, freelance work and full-stack roles — reach out and tell me what you&apos;re making.
        </p>

        <a
          href={`mailto:${profile.email}`}
          className="inline-flex items-center gap-2 bg-ember text-void font-semibold rounded-full px-7 py-3.5 mt-9 hover:bg-emberlight transition-colors"
        >
          <Mail size={17} /> {profile.email}
        </a>

        <div className="flex items-center justify-center gap-4 mt-10">
          {socials.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              aria-label={label}
              className="w-11 h-11 rounded-full border border-line flex items-center justify-center text-muted hover:text-ember hover:border-ember transition-colors"
            >
              <Icon size={17} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}