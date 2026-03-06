import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CallToActionProps {
  onOpenDemo: () => void;
}

export function CallToAction({ onOpenDemo }: CallToActionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Background glow pulses in
      gsap.fromTo(
        '.cta__bg',
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Title
      gsap.fromTo(
        '.cta__title',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Subtitle
      gsap.fromTo(
        '.cta__subtitle',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          delay: 0.15,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Buttons
      gsap.fromTo(
        '.cta__actions .btn',
        { opacity: 0, y: 20, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: 'back.out(1.7)',
          stagger: 0.12,
          delay: 0.3,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section className="cta" id="contact" ref={sectionRef}>
      <div className="cta__bg" />
      <div className="container">
        <div className="cta__content">
          <h2 className="cta__title">Ready to Transform Your Field Sales?</h2>
          <p className="cta__subtitle">
            Join businesses that have streamlined their sales operations
            with Vansales. Schedule a personalized demo and see the platform
            in action.
          </p>
          <div className="cta__actions">
            <button onClick={onOpenDemo} className="btn btn--primary btn--lg">
              Schedule a Demo
            </button>
            <a href="#features" className="btn btn--outline btn--lg">
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
