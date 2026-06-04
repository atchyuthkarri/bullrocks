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
        className={`fixed top-0 left-0 right-0 z-[1000] flex justify-center pointer-events-none transition-all duration-500 ${
          scrolled ? 'py-5 px-4 md:px-6' : 'py-6 px-6 md:py-8 md:px-12'
        }`}
      >
        <nav
          ref={navRef}
          className={`flex items-center justify-between w-full transition-all duration-700 ease-out ${
            scrolled
              ? 'max-w-[1000px] bg-black/95 backdrop-blur-2xl border border-white/15 rounded-full py-3 px-6 md:px-8 shadow-[0_20px_40px_rgba(0,0,0,0.4),inset_0_0_0_1px_rgba(255,255,255,0.05)]'
              : 'max-w-[1400px] bg-gradient-to-b from-black/90 to-transparent border-transparent rounded-none py-0 px-0 shadow-none'
          }`}
          style={{ pointerEvents: 'auto' }}
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
