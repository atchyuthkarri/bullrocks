import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const galleryItems = [
  { id: 1, label: 'Power Zone', size: 'large', gradient: 'linear-gradient(135deg, #1a0000 0%, #2a0808 50%, #D6001C15 100%)' },
  { id: 2, label: 'Cardio Studio', size: 'small', gradient: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)' },
  { id: 3, label: 'Recovery Suite', size: 'small', gradient: 'linear-gradient(135deg, #0d0d1a 0%, #1a1a2a 100%)' },
  { id: 4, label: 'Free Weight Area', size: 'medium', gradient: 'linear-gradient(135deg, #100008 0%, #200010 100%)' },
  { id: 5, label: 'Olympic Platform', size: 'medium', gradient: 'linear-gradient(135deg, #0a0a0a 0%, #FF3B4D15 100%)' },
  { id: 6, label: 'Sauna & Spa', size: 'small', gradient: 'linear-gradient(135deg, #1a0a00 0%, #2a1000 100%)' },
];

const FacilityShowcase: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.from('.gallery-item', {
        opacity: 0,
        scale: 0.95,
        stagger: 0.1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.gallery-grid',
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });

      // Parallax on each gallery item
      gsap.utils.toArray<HTMLElement>('.gallery-item').forEach(item => {
        gsap.to(item.querySelector('.gallery-inner'), {
          y: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: item,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="facility"
      style={{
        background: '#050505',
        padding: '120px 48px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div ref={titleRef} style={{ marginBottom: '80px' }}>
          <div
            style={{
              fontFamily: 'Inter',
              fontSize: '11px',
              letterSpacing: '0.4em',
              color: '#D6001C',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}
          >
            Facility Showcase
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '32px' }}>
            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(4rem, 8vw, 9rem)',
                lineHeight: '0.9',
                color: '#ffffff',
                letterSpacing: '-0.01em',
              }}
            >
              WORLD-CLASS
              <br />
              <span style={{ color: '#D6001C' }}>FACILITY.</span>
            </h2>
            <p
              style={{
                fontFamily: 'Inter',
                fontSize: '14px',
                lineHeight: '1.7',
                color: '#8A8A8A',
                maxWidth: '340px',
              }}
            >
              15,000 sq.ft of premium training space. Architecture designed to inspire performance.
            </p>
          </div>
        </div>

        {/* Gallery Grid */}
        <div
          className="gallery-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: 'auto',
            gap: '4px',
          }}
        >
          {galleryItems.map((item, i) => {
            const isLarge = item.size === 'large';
            const isMedium = item.size === 'medium';
            return (
              <div
                key={item.id}
                className="gallery-item parallax-wrap"
                style={{
                  gridColumn: isLarge ? 'span 2' : 'span 1',
                  gridRow: isLarge || isMedium ? 'span 1' : 'span 1',
                  aspectRatio: isLarge ? '16/9' : '4/3',
                  overflow: 'hidden',
                  position: 'relative',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => {
                  const inner = e.currentTarget.querySelector('.gallery-inner') as HTMLElement;
                  if (inner) gsap.to(inner, { scale: 1.05, duration: 0.6, ease: 'power2.out' });
                  const label = e.currentTarget.querySelector('.gallery-label') as HTMLElement;
                  if (label) gsap.to(label, { opacity: 1, y: 0, duration: 0.3 });
                }}
                onMouseLeave={e => {
                  const inner = e.currentTarget.querySelector('.gallery-inner') as HTMLElement;
                  if (inner) gsap.to(inner, { scale: 1, duration: 0.6, ease: 'power2.out' });
                  const label = e.currentTarget.querySelector('.gallery-label') as HTMLElement;
                  if (label) gsap.to(label, { opacity: 0, y: 10, duration: 0.3 });
                }}
              >
                {/* Background */}
                <div
                  className="gallery-inner parallax-inner"
                  style={{
                    position: 'absolute',
                    inset: '-10%',
                    background: item.gradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {/* Decorative elements */}
                  <div
                    style={{
                      fontFamily: 'Bebas Neue',
                      fontSize: isLarge ? '12rem' : '8rem',
                      color: 'rgba(255,255,255,0.03)',
                      lineHeight: '1',
                      userSelect: 'none',
                    }}
                  >
                    BR
                  </div>

                  {/* Grid overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
                      `,
                      backgroundSize: '40px 40px',
                    }}
                  />

                  {/* Corner accents */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      width: '24px',
                      height: '24px',
                      borderTop: '1px solid rgba(214,0,28,0.4)',
                      borderLeft: '1px solid rgba(214,0,28,0.4)',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '16px',
                      right: '16px',
                      width: '24px',
                      height: '24px',
                      borderBottom: '1px solid rgba(214,0,28,0.4)',
                      borderRight: '1px solid rgba(214,0,28,0.4)',
                    }}
                  />
                </div>

                {/* Hover label */}
                <div
                  className="gallery-label"
                  style={{
                    position: 'absolute',
                    bottom: '20px',
                    left: '20px',
                    opacity: 0,
                    transform: 'translateY(10px)',
                    zIndex: 10,
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'Bebas Neue',
                      fontSize: '1.3rem',
                      color: '#ffffff',
                      letterSpacing: '0.1em',
                    }}
                  >
                    {item.label}
                  </div>
                </div>

                {/* Item number */}
                <div
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    fontFamily: 'Inter',
                    fontSize: '10px',
                    letterSpacing: '0.2em',
                    color: 'rgba(255,255,255,0.2)',
                    zIndex: 10,
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div
          style={{
            marginTop: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px',
            flexWrap: 'wrap',
          }}
        >
          <button
            id="facility-tour-cta"
            className="btn-primary"
            onClick={() => document.getElementById('journey')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Schedule A Tour
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FacilityShowcase;
