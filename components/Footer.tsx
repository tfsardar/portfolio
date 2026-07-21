"use client";
import { profile } from "@/lib/content";
import useFooterAnimation from "@/app/hooks/useFooterAnimation";

export default function Footer() {
  useFooterAnimation();

  return (
    <footer className="border-t border-line py-8">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="font-mono text-xs text-muted">
          © {new Date().getFullYear()} {profile.fullName}
        </p>
        <p className="font-mono text-xs text-muted">Designed & developed with care.</p>
      </div>
    </footer>
  );
}