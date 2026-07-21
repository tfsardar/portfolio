"use client";

import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, initGSAP } from "@/lib/gsap";

export default function useConnectAnimation() {
  useGSAP(() => {
    initGSAP();

    // Check for reduced motion preference
    const isReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReducedMotion) return;

    // Store cleanup functions
    const cleanupFunctions: (() => void)[] = [];

    // Get the connect section
    const connectSection = document.getElementById("connect");
    if (!connectSection) return;

    // ===== 1. Section Title & Description Fade-In (ScrollTrigger) =====
    {
      const title = connectSection.querySelector(
        "h2.font-display.font-semibold.text-4xl.sm\\:text-6xl"
      );
      const description = connectSection.querySelector(
        "p.text-muted.mt-5.max-w-md.mx-auto"
      );

      if (title) {
        gsap.set(title, { y: 20, opacity: 0 });
        const titleTl = gsap.to(title, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        });
        const st1 = ScrollTrigger.create({
          trigger: connectSection,
          start: "top 80%",
          onEnter: () => titleTl.play(),
          once: true,
        });
        cleanupFunctions.push(() => st1.kill());
      }

      if (description) {
        gsap.set(description, { y: 20, opacity: 0 });
        const descTl = gsap.to(description, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.2, // slight delay after title
        });
        const st2 = ScrollTrigger.create({
          trigger: connectSection,
          start: "top 80%",
          onEnter: () => descTl.play(),
          once: true,
        });
        cleanupFunctions.push(() => st2.kill());
      }
    }

    // ===== 2. Email Button Interactions =====
    {
      const emailBtn = connectSection.querySelector(
        'a[href^="mailto:"]'
      ) as HTMLAnchorElement | null;
      if (!emailBtn) return;

      // Store handlers for cleanup
      const handleMouseDown = () => {
        gsap.to(emailBtn, { scale: 0.95, duration: 0.2, ease: "power3.out" });
      };
      const handleMouseUp = () => {
        gsap.to(emailBtn, { scale: 1, duration: 0.3, ease: "elastic.out(1,0.4)" });
      };
      const handleMouseLeave = () => {
        gsap.to(emailBtn, { scale: 1, duration: 0.3, ease: "elastic.out(1,0.4)" });
      };
      const handleClick = (e: MouseEvent) => {
        const rect = emailBtn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement("span");
        ripple.style.position = "absolute";
        ripple.style.borderRadius = "50%";
        ripple.style.background = "rgba(255,255,255,0.3)";
        ripple.style.transform = "translate(-50%, -50%)";
        ripple.style.pointerEvents = "none";
        ripple.style.zIndex = "10";

        const size = Math.max(rect.width, rect.height) * 2;
        ripple.style.width = `${size}px`;
        ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left}px`;
        ripple.style.top = `${e.clientY - rect.top}px`;

        // Ensure positioning context
        const originalPosition = emailBtn.style.position;
        if (emailBtn.style.position !== "relative") {
          emailBtn.style.position = "relative";
        }
        emailBtn.appendChild(ripple);

        gsap.to(ripple, {
          opacity: 0,
          scale: 2,
          duration: 0.6,
          ease: "power3.out",
          onComplete: () => {
            ripple.remove();
            // Restore original position if we changed it
            if (originalPosition !== "" && emailBtn.style.position === "relative") {
              emailBtn.style.position = originalPosition;
            }
          },
        });
      };

      emailBtn.addEventListener("mousedown", handleMouseDown);
      emailBtn.addEventListener("mouseup", handleMouseUp);
      emailBtn.addEventListener("mouseleave", handleMouseLeave);
      emailBtn.addEventListener("click", handleClick);

      cleanupFunctions.push(() => {
        emailBtn.removeEventListener("mousedown", handleMouseDown);
        emailBtn.removeEventListener("mouseup", handleMouseUp);
        emailBtn.removeEventListener("mouseleave", handleMouseLeave);
        emailBtn.removeEventListener("click", handleClick);
      });
    }

    // ===== 3. Social Icons Animations =====
    {
      const socialLinks = connectSection.querySelectorAll<
        HTMLElement
      >(".flex.items-center.justify-center.gap-4 > a");

      // Stagger fade-in for social icons
      if (socialLinks.length > 0) {
        gsap.set(socialLinks, { scale: 0.8, opacity: 0 });
        const socialTl = gsap.to(socialLinks, {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: "power3.out",
        });
        const stSocial = ScrollTrigger.create({
          trigger: connectSection,
          start: "top 80%",
          onEnter: () => socialTl.play(),
          once: true,
        });
        cleanupFunctions.push(() => stSocial.kill());
      }

      // Hover enhanced effects (scale + slight rotation) - cache icons for performance
      const iconCache = new WeakMap<HTMLElement, SVGElement | null>();
      socialLinks.forEach((link) => {
        // Cache the icon
        const icon = link.querySelector("svg");
        iconCache.set(link, icon);

        const handleMouseEnter = () => {
          gsap.to(link, {
            scale: 1.05,
            rotate: 5,
            duration: 0.3,
            ease: "power3.out",
          });
          const cachedIcon = iconCache.get(link);
          if (cachedIcon) {
            gsap.to(cachedIcon, {
              scale: 1.1,
              duration: 0.3,
              ease: "power3.out",
            });
          }
        };

        const handleMouseLeave = () => {
          gsap.to(link, {
            scale: 1,
            rotate: 0,
            duration: 0.3,
            ease: "power3.out",
          });
          const cachedIcon = iconCache.get(link);
          if (cachedIcon) {
            gsap.to(cachedIcon, {
              scale: 1,
              duration: 0.3,
              ease: "power3.out",
            });
          }
        };

        const handleClick = () => {
          gsap.to(link, {
            scale: 0.9,
            duration: 0.2,
            ease: "power3.out",
            yoyo: true,
            repeat: 1,
          });
        };

        link.addEventListener("mouseenter", handleMouseEnter);
        link.addEventListener("mouseleave", handleMouseLeave);
        link.addEventListener("click", handleClick);

        cleanupFunctions.push(() => {
          link.removeEventListener("mouseenter", handleMouseEnter);
          link.removeEventListener("mouseleave", handleMouseLeave);
          link.removeEventListener("click", handleClick);
        });
      });
    }

    // ===== 4. Background Blob Float Animation =====
    {
      const blob = connectSection.querySelector(
        'div.absolute.-bottom-40.left-1\\/2.-translate-x-1\\/2.w\\[600px\\].h\\[600px\\].bg-ember-glow'
      ) as HTMLElement | null;
      if (!blob) return;

      // Gentle floating animation
      const blobTl = gsap.to(blob, {
        x: "-=20",
        y: "-=20",
        rotation: 5,
        duration: 4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      cleanupFunctions.push(() => {
        blobTl.kill();
      });
    }

    // Return combined cleanup function
    return () => {
      cleanupFunctions.forEach((fn) => fn());
    };
  });
}