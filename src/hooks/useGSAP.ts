import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export const useGSAP = (animation: (tl: gsap.core.Timeline) => void, deps: any[] = []) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const tl = gsap.timeline();
    animation(tl);

    return () => {
      tl.kill();
    };
  }, deps);

  return ref;
};

export const fadeInUp = (element: string | Element, delay: number = 0) => {
  return gsap.fromTo(
    element,
    {
      y: 50,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      delay,
      ease: "power3.out",
    }
  );
};

export const staggerFadeIn = (elements: string | Element[], stagger: number = 0.2) => {
  return gsap.fromTo(
    elements,
    {
      y: 30,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger,
      ease: "power2.out",
    }
  );
};