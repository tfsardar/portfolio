"use client";

import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, initGSAP } from "@/lib/gsap";
import { useEffect } from "react";

export default function useExperienceAnimation() {
  useGSAP(() => {
    initGSAP();

    // Check for reduced motion preference
    const isReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReducedMotion) return;

    // Store cleanup functions
    const cleanupFunctions: (() => void)[] = [];

    // Get the experience section to scope selectors
    const experienceSection = document.getElementById("experience");
    if (!experienceSection) return;

    // Animate experience timeline items (job containers)
    const experienceItems = experienceSection.querySelectorAll<
      HTMLElement
    >(".relative.pl-8.pb-14.last\\:pb-0");
    // Dots
    const dots = experienceSection.querySelectorAll<
      HTMLElement
    >("span.absolute.-left-\\[7px\\].top-1\\.5.w-3.h-3");
    // Descriptions
    const descriptions = experienceSection.querySelectorAll<
      HTMLElement
    >("p.text-muted.mt-3.max-w-2xl");

    if (experienceItems.length > 0) {
      // Stagger animation for items
      const itemsTl = gsap.from(experienceItems, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        paused: true,
      });

      // Trigger when section enters viewport
      const st = ScrollTrigger.create({
        trigger: experienceSection,
        start: "top 80%",
        onEnter: () => itemsTl.play(),
        once: true,
      });
      cleanupFunctions.push(() => st.kill());

      // Animate dots with same timing
      if (dots.length > 0) {
        const dotsTl = gsap.from(dots, {
          scale: 0,
          duration: 0.4,
          stagger: 0.1,
          ease: "back.out(1.7)",
          paused: true,
        });
        const st2 = ScrollTrigger.create({
          trigger: experienceSection,
          start: "top 80%",
          onEnter: () => dotsTl.play(),
          once: true,
        });
        cleanupFunctions.push(() => st2.kill());
      }
    }

    // Animate description text inside each item (optional fade-in)
    if (descriptions.length > 0) {
      const descTl = gsap.from(descriptions, {
        y: 10,
        opacity: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: "power3.out",
        paused: true,
      });
      const st3 = ScrollTrigger.create({
        trigger: experienceSection,
        start: "top 80%",
        onEnter: () => descTl.play(),
        once: true,
      });
      cleanupFunctions.push(() => st3.kill());
    }

    // Return cleanup function
    return () => {
      cleanupFunctions.forEach((fn) => fn());
    };
  });
}