import { useSectionReveal } from '../../hooks/useInView';

const FEATURES = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
      </svg>
    ),
    title: 'Daily Vehicle Allocation',
    desc: 'Assign vehicles and routes to sales reps with one tap. Track fleet utilization and prevent double bookings in real-time.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
      </svg>
    ),
    title: 'Smart Route Management',
    desc: 'Organize delivery territories with optimized routes. Assign customers to routes for maximum coverage and efficiency.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 2H4c-1 0-2 1-2 2v3.01c0 .72.43 1.34 1 1.69V20c0 1.1 1.1 2 2 2h14c.9 0 2-.9 2-2V8.7c.57-.35 1-.97 1-1.69V4c0-1-1-2-2-2zm-5 12H9v-2h6v2zm5-7H4V4h16v3z" />
      </svg>
    ),
    title: 'Live Inventory Tracking',
    desc: 'Monitor vehicle stock in real-time. Track opening quantities, sales, returns, and remaining inventory throughout the day.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
      </svg>
    ),
    title: 'Instant Invoicing',
    desc: 'Generate professional invoices on-the-go with automatic calculations, sequential numbering, and line-item management.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
      </svg>
    ),
    title: 'Flexible Payments',
    desc: 'Accept cash, UPI, and card payments. Support partial payments and track payment status across all invoices.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
      </svg>
    ),
    title: 'Returns & Refunds',
    desc: 'Handle refunds and replacements seamlessly. Link returns to original invoices with full audit trail and stock adjustments.',
  },
];

export function Features() {
  const { headerRef, gridRef } = useSectionReveal('.feature-card', 0.12);

  return (
    <section className="section section--alt" id="features">
      <div className="container">
        <div className="section__header" ref={headerRef}>
          <span className="section__badge">Features</span>
          <h2 className="section__title">Everything Your Sales Team Needs</h2>
          <p className="section__subtitle">
            A complete toolkit for managing field sales operations — from
            vehicle allocation to payment collection.
          </p>
        </div>

        <div className="features__grid" ref={gridRef}>
          {FEATURES.map((feature) => (
            <div key={feature.title} className="feature-card">
              <div className="feature-card__icon">{feature.icon}</div>
              <h3 className="feature-card__title">{feature.title}</h3>
              <p className="feature-card__desc">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
