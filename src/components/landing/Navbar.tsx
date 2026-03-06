import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

interface NavbarProps {
  onOpenDemo: () => void;
}

export function Navbar({ onOpenDemo }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Entrance animation for main nav
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    gsap.fromTo(
      nav,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
    );
  }, []);

  // Mobile menu GSAP animation
  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    if (mobileOpen) {
      const tl = gsap.timeline();
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
      
      gsap.set(menu, { display: 'flex' });
      
      tl.fromTo(menu, 
        { opacity: 0 }, 
        { opacity: 1, duration: 0.4, ease: 'power2.out' }
      );

      tl.fromTo(menu.querySelectorAll('.navbar__link, .btn'),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out' },
        '-=0.2'
      );
    } else {
      document.body.style.overflow = 'unset';
      gsap.to(menu, { 
        opacity: 0, 
        duration: 0.3, 
        ease: 'power2.in',
        onComplete: () => gsap.set(menu, { display: 'none' })
      });
    }
  }, [mobileOpen]);

  const closeMenu = () => setMobileOpen(false);

  return (
    <>
      <nav ref={navRef} className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="container">
          <a href="#" className="navbar__logo">
            <div className="navbar__logo-icon">
              <svg viewBox="0 0 24 24">
                <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
              </svg>
            </div>
            <span className="navbar__logo-text">Vansales</span>
          </a>

          <ul className="navbar__links">
            <li><a href="#features" className="navbar__link">Features</a></li>
            <li><a href="#how-it-works" className="navbar__link">How It Works</a></li>
            <li><a href="#capabilities" className="navbar__link">Capabilities</a></li>
            <li><button onClick={onOpenDemo} className="navbar__link" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', font: 'inherit' }}>Contact</button></li>
          </ul>

          <div className="navbar__actions">
            <button onClick={onOpenDemo} className="btn btn--primary btn--sm navbar__desktop-only">Request Demo</button>
            <button
              className="navbar__mobile-toggle"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <div ref={menuRef} className={`navbar__mobile-menu ${mobileOpen ? 'navbar__mobile-menu--open' : ''}`}>
        <button className="navbar__mobile-close" onClick={closeMenu} aria-label="Close menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <a href="#features" className="navbar__link" onClick={closeMenu}>Features</a>
        <a href="#how-it-works" className="navbar__link" onClick={closeMenu}>How It Works</a>
        <a href="#capabilities" className="navbar__link" onClick={closeMenu}>Capabilities</a>
        <button 
          className="navbar__link" 
          onClick={() => { 
            closeMenu(); 
            onOpenDemo(); 
          }}
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', font: 'inherit' }}
        >
          Contact
        </button>
        <button 
          className="btn btn--primary" 
          onClick={() => { 
            closeMenu(); 
            onOpenDemo(); 
          }}
        >
          Request Demo
        </button>
      </div>
    </>
  );
}
