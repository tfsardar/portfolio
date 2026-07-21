import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import { gsap, initGSAP } from "@/lib/gsap";

export default function useHeroAnimation() {
  useGSAP(() => {
    initGSAP();

    // ---------- Split Text ----------
    const split = new SplitType(".hero-title", {
      types: "chars,words",
    });

    // ---------- Initial States ----------
    gsap.set(".hero-subtitle", {
      opacity: 0,
      y: 30,
    });

    gsap.set(".hero-description", {
      opacity: 0,
      y: 30,
    });

    gsap.set(".hero-buttons", {
      opacity: 0,
      y: 30,
    });

    gsap.set(".hero-avatar", {
      opacity: 0,
      scale: 0.8,
      rotate: -8,
    });

    gsap.set(".hero-title .char", {
      opacity: 0,
      y: 120,
      rotateX: -90,
    });

    // ---------- Master Timeline ----------
    const tl = gsap.timeline({
      defaults: {
        ease: "power4.out",
      },
    });

    tl.to(".hero-subtitle", {
      opacity: 1,
      y: 0,
      duration: 0.8,
    })

      .to(
        ".hero-title .char",
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          stagger: 0.025,
          duration: 0.9,
        },
        "-=0.2"
      )

      .to(
        ".hero-description",
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
        },
        "-=0.6"
      )

      .to(
        ".hero-buttons",
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
        },
        "-=0.6"
      )

      .to(
        ".hero-avatar",
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 1.2,
        },
        "-=1"
      );

    // ---------- Floating Avatar ----------
    gsap.to(".hero-image", {
      y: -15,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // ---------- Orbit Rotation ----------
    gsap.to(".orbit-wrapper", {
      rotate: 360,
      repeat: -1,
      duration: 25,
      ease: "none",
      transformOrigin: "center center",
    });

    gsap.to(".orbit-item", {
      rotate: -360,
      repeat: -1,
      duration: 25,
      ease: "none",
      transformOrigin: "center center",
    });

    // ---------- Magnetic Buttons ----------
    document.querySelectorAll(".magnetic-btn").forEach((button) => {
      const element = button as HTMLElement;

      element.addEventListener("mousemove", (e) => {
        const rect = element.getBoundingClientRect();

        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(element, {
          x: x * 0.25,
          y: y * 0.25,
          duration: 0.3,
        });
      });

      element.addEventListener("mouseleave", () => {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1,0.4)",
        });
      });
    });

    // ========== NEW ENHANCEMENTS ==========
    // Check for reduced motion preference
    const isReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion) return; // Skip enhancements if reduced motion is preferred

    // Store cleanup functions for new enhancements
    const enhancements: (() => void)[] = [];

    // Get hero section once, accessible to all enhancement blocks below
    const heroSection = document.getElementById('home');
    if (!heroSection) return;

    // 1. Hero Background Parallax (Mouse Move)
    {
      // Cache background elements to avoid querying on every mousemove
      const aurora1 = document.querySelector('[class*="bg-violet-600/20"]');
      const aurora2 = document.querySelector('[class*="bg-cyan-500/15"]');
      const aurora3 = document.querySelector('[class*="bg-fuchsia-500/10"]');
      const noiseOverlay = document.querySelector('[class*="opacity-\\[0\\.04\\]"]');

      let animationFrameId: number | null = null;

      const moveBackground = (e: MouseEvent) => {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(() => {
          const x = e.clientX;
          const y = e.clientY;
          const centerX = window.innerWidth / 2;
          const centerY = window.innerHeight / 2;

          // Normalize mouse position to -1 to 1 range
          const moveX = (x - centerX) / centerX;
          const moveY = (y - centerY) / centerY;

          // Apply subtle parallax to background elements
          if (aurora1) {
            gsap.to(aurora1, {
              x: moveX * 20,
              y: moveY * 20,
              duration: 1,
              ease: "power3.out",
              overwrite: true,
            });
          }
          if (aurora2) {
            gsap.to(aurora2, {
              x: moveX * 15,
              y: moveY * 15,
              duration: 1,
              ease: "power3.out",
              overwrite: true,
            });
          }
          if (aurora3) {
            gsap.to(aurora3, {
              x: moveX * 10,
              y: moveY * 10,
              duration: 1,
              ease: "power3.out",
              overwrite: true,
            });
          }
          if (noiseOverlay) {
            gsap.to(noiseOverlay, {
              x: moveX * 5,
              y: moveY * 5,
              duration: 1,
              ease: "power3.out",
              overwrite: true,
            });
          }
        });
      };

      heroSection.addEventListener('mousemove', moveBackground);
      enhancements.push(() => {
        heroSection.removeEventListener('mousemove', moveBackground);
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
      });
    }

    // 2. Hero Content Reveal (Decorative Icon and Stats Card)
    {
      const contentWrapper = document.querySelector('.relative.hidden.max-w-sm.sm\\:block');
      if (contentWrapper) {
        // Initially set state for animation
        gsap.set(contentWrapper, { opacity: 0, y: 20 });

        // Animate in after a slight delay to let main content animate first
        const revealTl = gsap.timeline({ paused: true });
        revealTl.to(contentWrapper, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        });

        // Play after 1.2 seconds (after main title animation)
        const delay = gsap.delayedCall(1.2, () => {
          revealTl.play();
        });

        enhancements.push(() => {
          revealTl.kill();
          delay.kill();
        });
      }
    }

    // 3. Hero Avatar Enhancements
    {
      // 3D Tilt on Mouse Move
      const avatarContainer = document.querySelector('.hero-avatar.relative.flex.justify-center.items-center');
      if (avatarContainer) {
        let animationFrameId: number | null = null;

        const handleMouseMove = (e: MouseEvent) => {
          if (animationFrameId) cancelAnimationFrame(animationFrameId);
          animationFrameId = requestAnimationFrame(() => {
            const rect = avatarContainer.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const mouseX = e.clientX;
            const mouseY = e.clientY;

            // Calculate normalized offset from center (-0.5 to 0.5 range)
            const deltaX = (mouseX - centerX) / rect.width;
            const deltaY = (mouseY - centerY) / rect.height;

            // Apply subtle 3D tilt (max 5 degrees)
            const rotateY = deltaX * 10;   // Horizontal tilt
            const rotateX = -deltaY * 10;  // Vertical tilt (inverted for natural feel)

            gsap.to(avatarContainer, {
              rotateY: rotateY,
              rotateX: rotateX,
              duration: 0.5,
              ease: "power3.out",
              overwrite: true,
            });
          });
        };

        const handleMouseLeave = () => {
          if (animationFrameId) cancelAnimationFrame(animationFrameId);
          animationFrameId = requestAnimationFrame(() => {
            gsap.to(avatarContainer, {
              rotateY: 0,
              rotateX: 0,
              duration: 0.8,
              ease: "power3.out",
            });
          });
        };

        heroSection.addEventListener('mousemove', handleMouseMove);
        heroSection.addEventListener('mouseleave', handleMouseLeave);
        enhancements.push(() => {
          heroSection.removeEventListener('mousemove', handleMouseMove);
          heroSection.removeEventListener('mouseleave', handleMouseLeave);
          if (animationFrameId) cancelAnimationFrame(animationFrameId);
        });
      }

      // Enhanced Floaters (replace CSS animations with GSAP)
      {
        // Floater 1: Ping-like expansion
        const floater1 = document.querySelector('.absolute.left-8.top-10.h-4.w-4.rounded-full.bg-ember.blur-sm');
        if (floater1) {
          gsap.to(floater1, {
            scale: 1.3,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
          gsap.set(floater1, { clearProps: "animation" });
        }

        // Floater 2: Soft pulse
        const floater2 = document.querySelector('.absolute.bottom-12.left-16.h-3.w-3.rounded-full.bg-cyan-400.blur-sm');
        if (floater2) {
          gsap.fromTo(floater2,
            { opacity: 0.6 },
            {
              opacity: 1,
              duration: 1,
              yoyo: true,
              repeat: -1,
              ease: "sine.inOut"
            }
          );
          gsap.set(floater2, { clearProps: "animation" });
        }

        // Floater 3: Gentle float and rotate
        const floater3 = document.querySelector('.absolute.right-12.top-20.h-5.w-5.rounded-full.bg-violet-500.blur-md');
        if (floater3) {
          gsap.to(floater3, {
            y: -15,
            rotation: 15,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
          gsap.set(floater3, { clearProps: "animation" });
        }

        // Cleanup for floaters (kill animations and restore if needed)
        enhancements.push(() => {
          gsap.killTweensOf(floater1);
          gsap.killTweensOf(floater2);
          gsap.killTweensOf(floater3);
        });
      }
    }

    // Return combined cleanup function
    return () => {
      split.revert();
      enhancements.forEach(cleanup => cleanup());
    };
  });
}