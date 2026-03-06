import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CAPABILITIES = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
      </svg>
    ),
    title: 'Role-Based Access Control',
    desc: 'Separate Admin and Sales dashboards with granular permissions. Admins manage users, products, and routes while sales reps focus on customer visits.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
      </svg>
    ),
    title: 'Cloud-Synced Data',
    desc: 'All transactions, inventory changes, and customer data sync instantly to the cloud. Access reports from any device, anywhere.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
      </svg>
    ),
    title: 'Secure Authentication',
    desc: 'JWT-based authentication with automatic token rotation, device tracking, and multi-device logout for enterprise security.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
      </svg>
    ),
    title: 'Analytics & Reporting',
    desc: 'Visual dashboards with sales trends, route performance, and inventory analytics. Make data-driven decisions in real-time.',
  },
];

export function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const visual = visualRef.current;
    const list = listRef.current;
    if (!section || !header || !visual || !list) return;

    const ctx = gsap.context(() => {
      // Header
      gsap.set(header.children, { opacity: 0, y: 30 });
      gsap.to(header.children, {
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

      // Visual mock - rows slide in from left
      const rows = visual.querySelectorAll('.capabilities__mock-row');
      gsap.set(rows, { opacity: 0, x: -40 });
      gsap.to(rows, {
        opacity: 1,
        x: 0,
        duration: 0.5,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: visual,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // Visual container fade + scale
      gsap.fromTo(
        visual,
        { opacity: 0, scale: 0.95, x: -30 },
        {
          opacity: 1,
          scale: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: visual,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Capability items slide in from right
      const items = list.querySelectorAll('.capability-item');
      gsap.set(items, { opacity: 0, x: 40 });
      gsap.to(items, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: list,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      // Icon containers pop
      const icons = list.querySelectorAll('.capability-item__icon');
      gsap.set(icons, { scale: 0, rotation: -45 });
      gsap.to(icons, {
        scale: 1,
        rotation: 0,
        duration: 0.5,
        ease: 'back.out(2)',
        stagger: 0.12,
        delay: 0.1,
        scrollTrigger: {
          trigger: list,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section section--alt" id="capabilities" ref={sectionRef}>
      <div className="container">
        <div className="section__header" ref={headerRef}>
          <span className="section__badge">Platform</span>
          <h2 className="section__title">Built for Enterprise Scale</h2>
          <p className="section__subtitle">
            A robust platform designed with security, scalability, and
            real-time collaboration at its core.
          </p>
        </div>

        <div className="capabilities__grid">
          <div className="capabilities__visual" ref={visualRef}>
            <div className="capabilities__mock-row">
              <div className="capabilities__mock-cell capabilities__mock-cell--header" />
              <div className="capabilities__mock-cell capabilities__mock-cell--header" />
              <div className="capabilities__mock-cell capabilities__mock-cell--header" />
            </div>
            {[0, 1, 2, 3, 4].map((row) => (
              <div className="capabilities__mock-row" key={row}>
                <div className="capabilities__mock-cell" />
                <div className={`capabilities__mock-cell ${row % 2 === 0 ? 'capabilities__mock-cell--accent' : ''}`} />
                <div className="capabilities__mock-cell" />
              </div>
            ))}
          </div>

          <div className="capabilities__list" ref={listRef}>
            {CAPABILITIES.map((cap) => (
              <div key={cap.title} className="capability-item">
                <div className="capability-item__icon">{cap.icon}</div>
                <div>
                  <h3 className="capability-item__title">{cap.title}</h3>
                  <p className="capability-item__desc">{cap.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
