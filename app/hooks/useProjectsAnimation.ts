"use client";

import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, initGSAP } from "@/lib/gsap";
import { useEffect } from "react";

export default function useProjectsAnimation() {
  useGSAP(() => {
    initGSAP();

    // Check for reduced motion preference
    const isReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReducedMotion) return;

    // Store cleanup functions
    const cleanupFunctions: (() => void)[] = [];

    // Get the projects section
    const projectsSection = document.getElementById("projects");
    if (!projectsSection) return;

    // ===== 1. Stagger Entrance Animation (ScrollTrigger) =====
    {
      // Select all project cards (direct children of the grid)
      const projectCards = projectsSection.querySelectorAll<
        HTMLElement
      >(".grid > article"); // Article is the ProjectCard component

      if (projectCards.length > 0) {
        // Create a stagger animation from y:20, opacity:0 to y:0, opacity:1
        const entranceTl = gsap.from(projectCards, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          paused: true,
        });

        // Trigger when the projects section enters the viewport
        const st = ScrollTrigger.create({
          trigger: projectsSection,
          start: "top 80%",
          onEnter: () => entranceTl.play(),
          once: true, // Only play once when entering viewport
        });
        cleanupFunctions.push(() => st.kill());
      }
    }

    // ===== 2. Per-Card Hover Effects =====
    {
      // We'll use event delegation on the projects section for efficiency
      // Cache image and buttons for each card to avoid querying on every mousemove
      const cardData = new WeakMap<HTMLElement, { image: HTMLImageElement | null; buttons: NodeListOf<HTMLAnchorElement> }>();

      const handleMouseEnter = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const card = target.closest("article");
        if (!card) return;

        // Cache image and buttons for this card
        const image = card.querySelector("img");
        const buttons = card.querySelectorAll("a");
        cardData.set(card, { image, buttons });

        // Optional: lift the card slightly on enter
        gsap.to(card, {
          y: -4,
          duration: 0.3,
          ease: "power3.out",
        });
      };

      const handleMouseMove = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const card = target.closest("article");
        if (!card) return;

        const data = cardData.get(card);
        if (!data) return; // Should not happen if mouseenter fired

        const { image, buttons } = data;

        // Get the card's bounding rect
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate mouse offset from center (-0.5 to 0.5 range)
        const deltaX = (e.clientX - centerX) / rect.width;
        const deltaY = (e.clientY - centerY) / rect.height;

        // --- Card 3D Tilt (subtle) ---
        const rotateY = deltaX * 8; // max 8 degrees
        const rotateX = -deltaY * 8; // max 8 degrees (inverted for natural feel)

        gsap.to(card, {
          rotateY,
          rotateX,
          duration: 0.5,
          ease: "power3.out",
          overwrite: "auto",
        });

        // --- Image Parallax (inside the card) ---
        if (image) {
          // Move image slightly opposite to mouse movement for depth effect
          const moveX = deltaX * 4; // 4px max
          const moveY = deltaY * 4; // 4px max

          gsap.to(image, {
            x: moveX,
            y: moveY,
            duration: 0.5,
            ease: "power3.out",
            overwrite: "auto",
          });
        }

        // --- Button Magnetic Effect ---
        buttons.forEach((button) => {
          const btnRect = button.getBoundingClientRect();
          const btnCenterX = btnRect.left + btnRect.width / 2;
          const btnCenterY = btnRect.top + btnRect.height / 2;

          // Distance from button center to mouse
          const dx = e.clientX - btnCenterX;
          const dy = e.clientY - btnCenterY;

          // Magnetic strength (stronger when closer)
          const distance = Math.sqrt(dx * dx + dy * dy);
          const strength = Math.max(0, 1 - distance / 120); // fade out beyond 120px

          // Move button slightly towards mouse
          const moveX = dx * 0.15 * strength;
          const moveY = dy * 0.15 * strength;

          gsap.to(button, {
            x: moveX,
            y: moveY,
            duration: 0.3,
            ease: "power3.out",
            overwrite: "auto",
          });
        });
      };

      const handleMouseLeave = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const card = target.closest("article");
        if (!card) return;

        // Remove cached data
        cardData.delete(card);

        // Reset card transform
        gsap.to(card, {
          rotateY: 0,
          rotateX: 0,
          y: 0, // also reset the lift
          duration: 0.6,
          ease: "power3.out",
        });

        // Reset image position
        const image = card.querySelector("img");
        if (image) {
          gsap.to(image, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          });
        }

        // Reset button positions
        const buttons = card.querySelectorAll("a");
        buttons.forEach((button) => {
          gsap.to(button, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          });
        });
      };

      // Add event listeners to the projects section (event delegation)
      projectsSection.addEventListener("mouseenter", handleMouseEnter);
      projectsSection.addEventListener("mousemove", handleMouseMove);
      projectsSection.addEventListener("mouseleave", handleMouseLeave);

      cleanupFunctions.push(() => {
        projectsSection.removeEventListener("mouseenter", handleMouseEnter);
        projectsSection.removeEventListener("mousemove", handleMouseMove);
        projectsSection.removeEventListener("mouseleave", handleMouseLeave);
      });
    }

    // ===== 3. Button Ripple Effect on Click =====
    {
      const handleButtonClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        // Check if clicked element is a button (the <a> tags) or inside one
        const button = target.closest("a");
        if (!button) return;

        // Create ripple element
        const ripple = document.createElement("span");
        ripple.style.position = "absolute";
        ripple.style.borderRadius = "50%";
        ripple.style.background = "rgba(255,255,255,0.3)";
        ripple.style.transform = "translate(-50%, -50%)";
        ripple.style.pointerEvents = "none";
        ripple.style.zIndex = "10";

        // Get button dimensions and position
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 2;

        // Position at click point
        ripple.style.width = `${size}px`;
        ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left}px`;
        ripple.style.top = `${e.clientY - rect.top}px`;

        // Add to button
        button.style.position = "relative"; // Ensure positioning context
        button.appendChild(ripple);

        // Animate ripple: fade out and scale up
        gsap.to(ripple, {
          opacity: 0,
          scale: 2,
          duration: 0.6,
          ease: "power3.out",
          onComplete: () => {
            ripple.remove();
          },
        });
      };

      // Add click listener to buttons within projects section
      projectsSection.addEventListener("click", handleButtonClick);

      cleanupFunctions.push(() => {
        projectsSection.removeEventListener("click", handleButtonClick);
      });
    }

    // Return combined cleanup function
    return () => {
      cleanupFunctions.forEach((fn) => fn());
    };
  });
}