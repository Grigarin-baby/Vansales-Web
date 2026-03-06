import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onOpenDemo: () => void;
}

export function Hero({ onOpenDemo }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const floatsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const phone = phoneRef.current;
    if (!section || !content || !phone) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.4 });

      // Badge
      tl.fromTo(
        '.hero__badge',
        { opacity: 0, y: 20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out' }
      );

      // Title
      tl.fromTo(
        '.hero__title',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.3'
      );

      // Subtitle
      tl.fromTo(
        '.hero__subtitle',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
        '-=0.4'
      );

      // Action buttons
      tl.fromTo(
        '.hero__actions .btn',
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.7)', stagger: 0.12 },
        '-=0.3'
      );

      // Stats row
      tl.fromTo(
        '.hero__stats-row .hero__stat',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.1 },
        '-=0.2'
      );

      // Phone mockup
      tl.fromTo(
        phone,
        { opacity: 0, rotateY: -15, scale: 0.9 },
        { opacity: 1, rotateY: -5, scale: 1, duration: 1, ease: 'power3.out' },
        '-=0.8'
      );

      // Phone inner elements stagger
      tl.fromTo(
        '.phone__screen > *',
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', stagger: 0.08 },
        '-=0.5'
      );

      // Floating cards
      tl.fromTo(
        '.hero__float',
        { opacity: 0, scale: 0.8, x: (i) => (i === 0 ? 30 : -30) },
        { opacity: 1, scale: 1, x: 0, duration: 0.6, ease: 'back.out(1.4)', stagger: 0.15 },
        '-=0.4'
      );

      // Parallax on phone when scrolling
      gsap.to(phone, {
        y: -40,
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Parallax on floating cards
      gsap.to('.hero__float--1', {
        y: -60,
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.to('.hero__float--2', {
        y: -30,
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.to('.hero__float--3', {
        y: -45,
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" ref={sectionRef}>
      <div className="hero__bg" />
      <div className="container hero__grid">
        <div className="hero__content" ref={contentRef}>
          <div className="hero__badge">
            <span className="hero__badge-dot" />
            Mobile-First Sales Platform
          </div>

          <h1 className="hero__title">
            Field Sales
            <br />
            Management,{' '}
            <span className="hero__title-accent">Simplified</span>
          </h1>

          <p className="hero__subtitle">
            Empower your sales team with real-time route optimization,
            vehicle inventory tracking, and seamless invoice generation —
            all from one powerful mobile platform.
          </p>

          <div className="hero__actions">
            <button onClick={onOpenDemo} className="btn btn--primary btn--lg">
              Request a Demo
            </button>
            <a href="#features" className="btn btn--outline btn--lg">
              Explore Features
            </a>
          </div>
        </div>

        <div className="hero__stats-row">
          <div className="hero__stat">
            <div className="hero__stat-value">Real-time</div>
            <div className="hero__stat-label">Inventory Sync</div>
          </div>
          <div className="hero__stat">
            <div className="hero__stat-value">100%</div>
            <div className="hero__stat-label">Digital Invoicing</div>
          </div>
          <div className="hero__stat">
            <div className="hero__stat-value">Zero</div>
            <div className="hero__stat-label">Paperwork</div>
          </div>
        </div>

        <div className="hero__visual" ref={floatsRef}>
          <div className="hero__phone-container">
            <div className="phone-mockup" ref={phoneRef}>
              <div className="phone__notch" />
              <div className="phone__screen">
                <div className="phone__header">
                  <span className="phone__header-title">Dashboard</span>
                  <div className="phone__header-icon">
                    <img 
                      src="https://www.bairuhatech.com/assets/blogos-aa6804e6.png" 
                      alt="Vansales Logo" 
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  </div>
                </div>

                <div className="phone__welcome">
                  <div className="phone__welcome-name">Welcome, Alex</div>
                  <div className="phone__welcome-route">
                    Route: Downtown West • Vehicle: VAN-042
                  </div>
                </div>

                <div className="phone__progress">
                  <div className="phone__progress-header">
                    <span>Daily Target</span>
                    <span>75%</span>
                  </div>
                  <div className="phone__progress-bar">
                    <div className="phone__progress-fill" style={{ width: '75%' }} />
                  </div>
                </div>

                <div className="phone__stats">
                  <div className="phone__stat">
                    <div className="phone__stat-value phone__stat-value--green">24</div>
                    <div className="phone__stat-label">Orders</div>
                  </div>
                  <div className="phone__stat">
                    <div className="phone__stat-value phone__stat-value--orange">₹42.5K</div>
                    <div className="phone__stat-label">Sales</div>
                  </div>
                </div>

                <div className="phone__invoice">
                  <div className="phone__invoice-header">
                    <span className="phone__invoice-title">Recent Sales</span>
                  </div>
                  <div className="phone__invoice-item">
                    <span className="phone__invoice-name">INV-000142</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span className="phone__invoice-amount">₹2,450</span>
                      <span className="phone__invoice-badge">Paid</span>
                    </span>
                  </div>
                  <div className="phone__invoice-item">
                    <span className="phone__invoice-name">INV-000141</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span className="phone__invoice-amount">₹1,800</span>
                      <span className="phone__invoice-badge">Paid</span>
                    </span>
                  </div>
                </div>

                <div className="phone__bottom-nav">
                  <div className="phone__nav-item">
                    <div className="phone__nav-dot phone__nav-dot--active" />
                    <span className="phone__nav-label phone__nav-label--active">Home</span>
                  </div>
                  <div className="phone__nav-item">
                    <div className="phone__nav-dot" />
                    <span className="phone__nav-label">Sales</span>
                  </div>
                  <div className="phone__nav-item">
                    <div className="phone__nav-dot" />
                    <span className="phone__nav-label">Reports</span>
                  </div>
                  <div className="phone__nav-item">
                    <div className="phone__nav-dot" />
                    <span className="phone__nav-label">More</span>
                  </div>
                </div>
              </div>
              <div className="phone__home-indicator" />
            </div>

            <div className="hero__float hero__float--1">
              <div className="hero__float-icon" style={{ background: 'rgba(16,185,129,0.12)' }}>
                <span style={{ color: '#10B981' }}>✓</span>
              </div>
              <div>
                <div className="hero__float-text">Payment Received</div>
                <div className="hero__float-sub">₹4,200 via UPI</div>
              </div>
            </div>

            <div className="hero__float hero__float--2">
              <div className="hero__float-icon" style={{ background: 'rgba(248,151,6,0.12)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#F89706">
                  <path d="M20 2H4c-1 0-2 1-2 2v3.01c0 .72.43 1.34 1 1.69V20c0 1.1 1.1 2 2 2h14c.9 0 2-.9 2-2V8.7c.57-.35 1-.97 1-1.69V4c0-1-1-2-2-2zm-5 12H9v-2h6v2zm5-7H4V4h16v3z" />
                </svg>
              </div>
              <div>
                <div className="hero__float-text">Stock Updated</div>
                <div className="hero__float-sub">Vehicle VAN-042</div>
              </div>
            </div>

            <div className="hero__float hero__float--3">
              <div className="hero__float-icon" style={{ background: 'rgba(59,130,246,0.12)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#3B82F6">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
              </div>
              <div>
                <div className="hero__float-text">Next Customer</div>
                <div className="hero__float-sub">1.2 km away</div>
              </div>
            </div>

            <div className="hero__glow" />
          </div>
        </div>
      </div>
    </section>
  );
}
