import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 'Real-time', label: 'Inventory Synchronization' },
  { value: '100%', label: 'Paperless Operations' },
  { value: '3x', label: 'Faster Order Processing' },
  { value: '24/7', label: 'Data Accessibility' },
];

export function Stats() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const items = section.querySelectorAll('.stat-item');

      gsap.set(items, { opacity: 0, y: 30, scale: 0.9 });
      gsap.to(items, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      // Value counter-like pop effect
      const values = section.querySelectorAll('.stat-item__value');
      gsap.set(values, { scale: 0.5, opacity: 0 });
      gsap.to(values, {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: 'back.out(1.7)',
        stagger: 0.12,
        delay: 0.15,
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section className="stats" ref={sectionRef}>
      <div className="container">
        {STATS.map((stat) => (
          <div key={stat.label} className="stat-item">
            <div className="stat-item__value">{stat.value}</div>
            <div className="stat-item__label">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
