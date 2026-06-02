import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const Navigation: React.FC = () => {
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  useEffect(() => {
    if (menuOpen && mobileMenuRef.current) {
      gsap.fromTo(
        '.mobile-link',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' }
      );
    }
  }, [menuOpen]);

  const links = ['Philosophy', 'Training', 'Coaches', 'Membership', 'Facility'];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id.toLowerCase());
    el?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'center',
          padding: scrolled ? '20px 24px' : '32px 48px',
          transition: 'padding 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
          pointerEvents: 'none',
        }}
      >
        <nav
          ref={navRef}
          style={{
            pointerEvents: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            maxWidth: scrolled ? '1000px' : '1400px',
            background: scrolled ? 'rgba(5, 5, 5, 0.95)' : 'linear-gradient(180deg, rgba(5,5,5,0.9) 0%, rgba(5,5,5,0) 100%)',
            backdropFilter: scrolled ? 'blur(32px)' : 'none',
            border: scrolled ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid transparent',
            borderRadius: scrolled ? '100px' : '0px',
            padding: scrolled ? '12px 32px' : '0px',
            boxShadow: scrolled ? '0 20px 40px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.05)' : 'none',
            transition: 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
          }}
        >
          {/* Logo */}
          <div
            className="font-display text-white"
            style={{ 
              fontSize: scrolled ? '1.2rem' : '1.5rem', 
              letterSpacing: '0.2em', 
              cursor: 'pointer',
              transition: 'font-size 0.5s ease',
            }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            BULL<span style={{ color: '#D6001C' }}>ROCKS</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map(link => (
              <button
                key={link}
                className="group"
                onClick={() => scrollTo(link)}
                style={{
                  position: 'relative',
                  padding: '8px 16px',
                  fontFamily: 'Inter',
                  fontSize: '11px',
                  fontWeight: 500,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.9)',
                  transition: 'color 0.3s ease',
                  overflow: 'hidden',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(255,255,255,0.9)';
                }}
              >
                <span style={{ position: 'relative', zIndex: 2 }}>{link}</span>
                <div 
                  className="absolute inset-0 bg-white/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 ease-out" 
                  style={{ zIndex: 1 }}
                />
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            {!scrolled && (
              <button 
                className="btn-outline" 
                style={{ padding: '12px 28px', fontSize: '11px' }}
                onClick={() => scrollTo('coaches')}
              >
                Book Trial
              </button>
            )}
            <button 
              className="btn-primary" 
              style={{ 
                padding: scrolled ? '10px 24px' : '12px 28px', 
                fontSize: '11px',
                borderRadius: scrolled ? '40px' : '0px',
                transition: 'all 0.5s ease',
                cursor: 'pointer',
              }}
              onClick={() => scrollTo('membership')}
            >
              Join Now
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{ 
              zIndex: 1100, 
              padding: '8px', 
              marginRight: '-8px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {[0, 1, 2].map(i => (
              <span
                key={i}
                style={{
                  display: 'block',
                  width: '24px',
                  height: '2px',
                  background: '#ffffff',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: menuOpen
                    ? i === 0 ? 'rotate(45deg) translate(5px, 6px)' : i === 2 ? 'rotate(-45deg) translate(5px, -6px)' : 'scaleX(0)'
                    : 'none',
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          ref={mobileMenuRef}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(5, 5, 5, 0.98)',
            backdropFilter: 'blur(30px)',
            zIndex: 999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '40px',
          }}
        >
          {links.map(link => (
            <button
              key={link}
              className="mobile-link font-display text-white"
              style={{ 
                fontSize: '3.5rem', 
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                transition: 'color 0.3s ease',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
              }}
              onClick={() => scrollTo(link)}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#D6001C')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#ffffff')}
            >
              {link}
            </button>
          ))}
          <button 
            className="mobile-link btn-primary mt-8"
            onClick={() => scrollTo('membership')}
          >
            Book A Free Trial
          </button>
        </div>
      )}
    </>
  );
};

export default Navigation;
