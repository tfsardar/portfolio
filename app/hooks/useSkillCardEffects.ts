"use client";

import { useEffect } from "react";
import { gsap } from "@/lib/gsap";

export default function useSkillCardEffects() {
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>(".skill-card");
    const cleanupFns: (() => void)[] = [];

    cards.forEach((card) => {
      const glow = card.querySelector<HTMLElement>(".card-glow");

      const move = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateX = -(y - rect.height / 2) / 14;
        const rotateY = (x - rect.width / 2) / 14;

        gsap.to(card, {
          rotateX,
          rotateY,
          scale: 1.02,
          transformPerspective: 1000,
          transformOrigin: "center",
          duration: 0.35,
          ease: "power3.out",
        });

        if (glow) {
          gsap.to(glow, {
            x,
            y,
            duration: 0.25,
            ease: "none",
          });
        }
      };

      const leave = () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          duration: 0.5,
          ease: "power3.out",
        });

        if (glow) {
          gsap.to(glow, {
            opacity: 0,
            duration: 0.25,
          });
        }
      };

      const enter = () => {
        if (glow) {
          gsap.to(glow, {
            opacity: 1,
            duration: 0.25,
          });
        }
      };

      card.addEventListener("mouseenter", enter);
      card.addEventListener("mousemove", move);
      card.addEventListener("mouseleave", leave);

      cleanupFns.push(() => {
        card.removeEventListener("mouseenter", enter);
        card.removeEventListener("mousemove", move);
        card.removeEventListener("mouseleave", leave);
      });
    });

    return () => {
      cleanupFns.forEach((fn) => fn());
    };
  }, []);
}