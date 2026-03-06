import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    number: '01',
    title: 'Allocate',
    desc: 'Sales rep logs in and receives their daily vehicle and route assignment.',
  },
  {
    number: '02',
    title: 'Visit',
    desc: 'Follow the optimized route to visit assigned customers efficiently.',
  },
  {
    number: '03',
    title: 'Sell',
    desc: 'Create invoices, process payments, and manage stock on the spot.',
  },
  {
    number: '04',
    title: 'Report',
    desc: 'Real-time analytics and end-of-day reports sync automatically.',
  },
];

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const steps = stepsRef.current;
    const line = lineRef.current;
    if (!section || !header || !steps || !line) return;

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

      // Connecting line draws in
      gsap.fromTo(
        line,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: steps,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Step circles pop in with stagger
      const stepEls = steps.querySelectorAll('.workflow__step');
      gsap.set(stepEls, { opacity: 0, y: 40 });
      gsap.to(stepEls, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'back.out(1.4)',
        stagger: 0.15,
        scrollTrigger: {
          trigger: steps,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // Number circles scale bounce
      const numbers = steps.querySelectorAll('.workflow__step-number');
      gsap.set(numbers, { scale: 0 });
      gsap.to(numbers, {
        scale: 1,
        duration: 0.5,
        ease: 'back.out(2)',
        stagger: 0.15,
        delay: 0.2,
        scrollTrigger: {
          trigger: steps,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section" id="how-it-works" ref={sectionRef}>
      <div className="container">
        <div className="section__header" ref={headerRef}>
          <span className="section__badge">How It Works</span>
          <h2 className="section__title">Simple. Powerful. Effective.</h2>
          <p className="section__subtitle">
            Get your team up and running in minutes with a streamlined
            four-step workflow.
          </p>
        </div>

        <div className="workflow__steps" ref={stepsRef}>
          <div
            ref={lineRef}
            className="workflow__line"
            style={{
              position: 'absolute',
              top: 40,
              left: '15%',
              right: '15%',
              height: 2,
              background: 'linear-gradient(90deg, transparent, #2A2D38, #F89706, #2A2D38, transparent)',
              transformOrigin: 'left center',
              zIndex: -1,
            }}
          />
          {STEPS.map((step) => (
            <div key={step.number} className="workflow__step">
              <div className="workflow__step-number">{step.number}</div>
              <h3 className="workflow__step-title">{step.title}</h3>
              <p className="workflow__step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
