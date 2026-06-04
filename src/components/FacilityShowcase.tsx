import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface GalleryItem {
  id: string;
  title: string;
  size: 'small' | 'medium' | 'large';
  gradient: string;
  imageUrl: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: '1',
    title: 'THE MAIN FLOOR',
    size: 'large',
    gradient: 'linear-gradient(135deg, rgba(214,0,28,0.2) 0%, rgba(5,5,5,0.9) 100%)',
    imageUrl: '/images/gym_main_floor.png',
  },
  {
    id: '2',
    title: 'RECOVERY SUITES',
    size: 'medium',
    gradient: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(5,5,5,0.95) 100%)',
    imageUrl: '/images/gym_recovery_suite.png',
  },
  {
    id: '3',
    title: 'THE IRON ZONE',
    size: 'small',
    gradient: 'linear-gradient(135deg, rgba(255,59,77,0.15) 0%, rgba(5,5,5,0.95) 100%)',
    imageUrl: '/images/gym_iron_zone.png',
  },
  {
    id: '4',
    title: 'CARDIO DECK',
    size: 'medium',
    gradient: 'linear-gradient(135deg, rgba(138,138,138,0.1) 0%, rgba(5,5,5,0.95) 100%)',
    imageUrl: '/images/gym_cardio_deck.png',
  },
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
      className="py-16 px-6 md:py-[120px] md:px-12 relative overflow-hidden"
      style={{ background: '#050505' }}
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
        <div className="gallery-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
          {galleryItems.map((item, i) => {
            const isLarge = item.size === 'large';
            return (
              <div
                key={item.id}
                className={`gallery-item parallax-wrap relative overflow-hidden cursor-pointer ${isLarge ? 'md:col-span-2' : 'col-span-1'}`}
                style={{
                  aspectRatio: isLarge ? '16/9' : '4/3',
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
                {/* Background Image */}
                <div
                  className="gallery-inner parallax-inner"
                  style={{
                    position: 'absolute',
                    inset: '-10%',
                  }}
                >
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                  {/* Overlay Gradient */}
                  <div style={{ position: 'absolute', inset: 0, background: item.gradient, pointerEvents: 'none' }} />
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
                    {item.title}
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
