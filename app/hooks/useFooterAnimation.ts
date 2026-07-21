"use client";

import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, initGSAP } from "@/lib/gsap";
import { useEffect } from "react";

export default function useFooterAnimation() {
  useGSAP(() => {
    initGSAP();

    // Check for reduced motion preference
    const isReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReducedMotion) return;

    // Store cleanup functions
    const cleanupFunctions: (() => void)[] = [];

    // Get the footer element
    const footer = document.querySelector("footer");
    if (!footer) return;

    // Select the two text lines inside the footer
    const textLines = footer.querySelectorAll("p");

    // ===== 1. Fade-in and slide-up on scroll =====
    if (textLines.length > 0) {
      // Set initial state
      gsap.set(textLines, { y: 20, opacity: 0 });

      // Create staggered animation
      const footerTl = gsap.to(textLines, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });

      // Trigger when footer enters viewport
      const st = ScrollTrigger.create({
        trigger: footer,
        start: "top 80%",
        onEnter: () => footerTl.play(),
        once: true,
      });
      cleanupFunctions.push(() => st.kill());
    }

    // ===== 2. Hover lift effect on each text line =====
    textLines.forEach((line) => {
      const handleMouseEnter = () => {
        gsap.to(line, {
          y: -2,
          duration: 0.3,
          ease: "power3.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(line, {
          y: 0,
          duration: 0.3,
          ease: "power3.out",
        });
      };

      line.addEventListener("mouseenter", handleMouseEnter);
      line.addEventListener("mouseleave", handleMouseLeave);

      cleanupFunctions.push(() => {
        line.removeEventListener("mouseenter", handleMouseEnter);
        line.removeEventListener("mouseleave", handleMouseLeave);
      });
    });

    // Return combined cleanup function
    return () => {
      cleanupFunctions.forEach((fn) => fn());
    };
  });
}