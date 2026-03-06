import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealOptions {
  /** Child selector to animate individually (e.g. '.feature-card') */
  children?: string;
  /** Stagger delay between children */
  stagger?: number;
  /** Animation start position */
  start?: string;
  /** Y offset to animate from */
  y?: number;
  /** Duration in seconds */
  duration?: number;
  /** GSAP ease string */
  ease?: string;
  /** Delay before animation starts */
  delay?: number;
  /** Scale from value */
  fromScale?: number;
}

export function useScrollReveal<T extends HTMLElement = HTMLElement>(
  options: ScrollRevealOptions = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const {
      children,
      stagger = 0.12,
      start = 'top 85%',
      y = 40,
      duration = 0.8,
      ease = 'power3.out',
      delay = 0,
      fromScale,
    } = options;

    const targets = children ? el.querySelectorAll(children) : el;
    const fromVars: gsap.TweenVars = {
      opacity: 0,
      y,
      ...(fromScale != null && { scale: fromScale }),
    };
    const toVars: gsap.TweenVars = {
      opacity: 1,
      y: 0,
      duration,
      ease,
      delay,
      ...(fromScale != null && { scale: 1 }),
      ...(children ? { stagger } : {}),
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: 'play none none none',
      },
    };

    gsap.set(targets, fromVars);
    const tween = gsap.to(targets, toVars);

    return () => {
      tween.kill();
    };
  }, [options]);

  return ref;
}

/**
 * Animate a section header + grid children separately
 */
export function useSectionReveal(
  childSelector: string,
  stagger = 0.1
) {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    const grid = gridRef.current;
    if (!header || !grid) return;

    // Header animation
    gsap.set(header.children, { opacity: 0, y: 30 });
    const headerTween = gsap.to(header.children, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.1,
      scrollTrigger: {
        trigger: header,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    // Grid children animation
    const items = grid.querySelectorAll(childSelector);
    gsap.set(items, { opacity: 0, y: 50, scale: 0.95 });
    const gridTween = gsap.to(items, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.7,
      ease: 'power3.out',
      stagger,
      scrollTrigger: {
        trigger: grid,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    return () => {
      headerTween.kill();
      gridTween.kill();
    };
  }, [childSelector, stagger]);

  return { headerRef, gridRef };
}
