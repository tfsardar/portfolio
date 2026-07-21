"use client";

import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, initGSAP } from "@/lib/gsap";
import { useEffect, useRef } from "react";

export default function useSkillsAnimation() {
  useGSAP(() => {
    initGSAP();

    // ========== EXISTING ANIMATIONS (unchanged) ==========
    // Section Heading
    gsap.from(".skills-heading", {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
      immediateRender: false,   
      scrollTrigger: {
        trigger: "#skills",
        start: "top 75%",
      },
    });

    // Cards Reveal
    gsap.from(".skill-card", {
      y: 80,
      opacity: 0,
      scale: 0.9,
      duration: 0.8,
      stagger: 0.12,
      ease: "power3.out",
      immediateRender: false,
      scrollTrigger: {
        trigger: ".skills-grid",
        start: "top 75%",
      },
    });

    // Progress Bar Animation
    gsap.utils.toArray<HTMLElement>(".skill-progress").forEach((bar) => {
      const value = Number(bar.dataset.progress);

      gsap.fromTo(
        bar,
        {
          width: 0,
        },
        {
          width: `${value}%`,
          duration: 1.5,
          ease: "power4.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: bar,
            start: "top 90%",
          },
        }
      );
    });

    // ========== ENHANCEMENTS ==========
    // Check for reduced motion preference
    const isReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReducedMotion) return; // Skip enhancements if reduced motion is preferred

    // Store cleanup functions for enhancements
    const enhancements: (() => void)[] = [];

    // 1. Heading Pulse Enhancement
    {
      const headingTrigger = ScrollTrigger.create({
        trigger: "#skills",
        start: "top 75%",
        onEnter: () => {
          gsap.to(".skills-heading", {
            scale: 1.02,
            duration: 0.3,
            yoyo: true,
            repeat: 1,
            ease: "power3.out",
          });
        },
        // Ensure it only runs once
        once: true,
      });
      enhancements.push(() => headingTrigger.kill());
    }

    // 2. Progress Bar Glow Enhancement
    {
      gsap.utils.toArray<HTMLElement>(".skill-progress").forEach((bar) => {
        const glowTween = gsap.to(bar, {
          boxShadow: "0 0 12px rgba(255,106,43,0.6)",
          duration: 0.3,
          yoyo: true,
          repeat: 1,
          delay: 1.8, // Wait for the width animation to finish (1.5s) + buffer
          ease: "power3.out",
          paused: true,
        });

        // Play the glow when the ScrollTrigger for this bar enters
        const glowScrollTrigger = ScrollTrigger.create({
          trigger: bar,
          start: "top 90%",
          onEnter: () => glowTween.play(),
          once: true,
        });

        enhancements.push(() => {
          glowTween.kill();
          glowScrollTrigger.kill();
        });
      });
    }
  });
}