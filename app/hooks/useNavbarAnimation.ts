import { useEffect } from "react";
import { gsap } from "@/lib/gsap";

type UseNavbarAnimationProps = {
  open: boolean;
  active: string;
  mobileMenuRef: React.RefObject<HTMLDivElement>;
};

export default function useNavbarAnimation({ open, active, mobileMenuRef }: UseNavbarAnimationProps) {
  // Animate active link change
  useEffect(() => {
    // First, set all navbar links to inactive state
    const links = document.querySelectorAll('header a[href^="#"]');
    links.forEach((link) => {
      gsap.to(link, {
        backgroundColor: "transparent",
        color: "var(--muted)",
        duration: 0.3,
        ease: "power3.out"
      });
    });

    // Then, set the active link to active state
    const activeLink = document.querySelector(`header a[href="${active}"]`);
    if (activeLink) {
      gsap.to(activeLink, {
        backgroundColor: "var(--panel2)",
        color: "var(--ember)",
        duration: 0.5,
        ease: "power3.out"
      });
    }
  }, [active]);

  // Set up hover effects for navbar links (desktop and mobile)
  useEffect(() => {
    const links = document.querySelectorAll('header a[href^="#"]');
    links.forEach((link) => {
      link.addEventListener('mouseenter', () => {
        gsap.to(link, { scale: 1.05, duration: 0.3 });
      });
      link.addEventListener('mouseleave', () => {
        gsap.to(link, { scale: 1, duration: 0.3 });
      });
    });

    return () => {
      links.forEach((link) => {
        link.removeEventListener('mouseenter', () => {
          gsap.to(link, { scale: 1.05, duration: 0.3 });
        });
        link.removeEventListener('mouseleave', () => {
          gsap.to(link, { scale: 1, duration: 0.3 });
        });
      });
    };
  }, []); // run once

  // Animate mobile menu (height and opacity)
  useEffect(() => {
    const mobileMenu = mobileMenuRef.current;
    if (!mobileMenu) return;

    if (open) {
      const computedStyle = getComputedStyle(mobileMenu);
      const borderTop = parseFloat(computedStyle.borderTopWidth);
      const borderBottom = parseFloat(computedStyle.borderBottomWidth);
      const totalHeight = mobileMenu.scrollHeight + borderTop + borderBottom;

      gsap.to(mobileMenu, {
        height: totalHeight,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out"
      });
    } else {
      gsap.to(mobileMenu, {
        height: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power3.in"
      });
    }
  }, [open, mobileMenuRef]);
}