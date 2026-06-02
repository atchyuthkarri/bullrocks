import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Category {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  stats: { label: string; value: string }[];
  color: string;
  bgGradient: string;
}

const categories: Category[] = [
  {
    id: 'strength',
    name: 'STRENGTH',
    subtitle: 'Forge Your Foundation',
    description: 'Progressive overload, elite equipment, precision programming. Build the physique and power of a champion.',
    stats: [{ label: 'Power Racks', value: '20+' }, { label: 'Free Weight Area', value: '3000 sq.ft' }],
    color: '#D6001C',
    bgGradient: 'linear-gradient(135deg, rgba(214,0,28,0.12) 0%, transparent 70%)',
  },
  {
    id: 'conditioning',
    name: 'CONDITIONING',
    subtitle: 'Unleash Your Engine',
    description: 'High-intensity cardio systems, metabolic training zones, and elite performance metrics tracking.',
    stats: [{ label: 'Cardio Machines', value: '40+' }, { label: 'Classes / Week', value: '30+' }],
    color: '#FF3B4D',
    bgGradient: 'linear-gradient(135deg, rgba(255,59,77,0.12) 0%, transparent 70%)',
  },
  {
    id: 'recovery',
    name: 'RECOVERY',
    subtitle: 'Restore & Rebuild',
    description: 'Cold plunge therapy, percussion massage, infrared saunas. Recovery is where champions are made.',
    stats: [{ label: 'Recovery Suites', value: '5' }, { label: 'Infrared Saunas', value: '2' }],
    color: '#8A8A8A',
    bgGradient: 'linear-gradient(135deg, rgba(138,138,138,0.08) 0%, transparent 70%)',
  },
  {
    id: 'coaching',
    name: 'COACHING',
    subtitle: 'Elite Guidance',
    description: 'Certified performance coaches with a proven track record. Personalized programming that delivers results.',
    stats: [{ label: 'Expert Coaches', value: '10+' }, { label: 'Avg. Experience', value: '8 Yrs' }],
    color: '#D6001C',
    bgGradient: 'linear-gradient(135deg, rgba(214,0,28,0.12) 0%, transparent 70%)',
  },
  {
    id: 'nutrition',
    name: 'NUTRITION',
    subtitle: 'Fuel the Machine',
    description: 'Science-backed nutrition planning. Our in-house dieticians craft protocols aligned with your training goals.',
    stats: [{ label: 'Meal Plans', value: 'Custom' }, { label: 'Dieticians', value: '3' }],
    color: '#FF3B4D',
    bgGradient: 'linear-gradient(135deg, rgba(255,59,77,0.12) 0%, transparent 70%)',
  },
];

const PerformanceEcosystem: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>('.h-panel');
      const totalWidth = (panels.length - 1) * window.innerWidth;

      gsap.to(trackRef.current, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${totalWidth + window.innerHeight}`,
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
        },
      });

      panels.forEach((panel) => {
        const titleEl = panel.querySelector('.panel-title');

        gsap.from(titleEl, {
          y: 80,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: panel,
            containerAnimation: gsap.timeline(), // handled by horizontal
            start: 'left center',
            toggleActions: 'play none none reverse',
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="training"
      style={{ position: 'relative', background: '#0D0D0D' }}
    >
      {/* Section header (visible before scroll) */}
      <div
        style={{
          padding: '80px 48px 0',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 20,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            fontFamily: 'Inter',
            fontSize: '10px',
            letterSpacing: '0.4em',
            color: '#D6001C',
            textTransform: 'uppercase',
            marginBottom: '12px',
          }}
        >
          Performance Ecosystem
        </div>
      </div>

      <div
        ref={trackRef}
        className="h-scroll-track"
        style={{ height: '100vh' }}
      >
        {categories.map((cat, i) => (
          <div
            key={cat.id}
            className="h-panel"
            style={{ background: '#0D0D0D', borderRight: '1px solid rgba(255,255,255,0.04)' }}
          >
            {/* Background gradient */}
            <div style={{ position: 'absolute', inset: 0, background: cat.bgGradient, pointerEvents: 'none' }} />

            {/* Panel number */}
            <div
              className="panel-number"
              style={{
                position: 'absolute',
                top: '48px',
                right: '48px',
                fontFamily: 'Bebas Neue',
                fontSize: '8rem',
                color: 'rgba(255,255,255,0.04)',
                lineHeight: '1',
                userSelect: 'none',
              }}
            >
              0{i + 1}
            </div>

            {/* Content */}
            <div
              className="panel-content"
              style={{
                position: 'relative',
                zIndex: 10,
                padding: '0 80px',
                maxWidth: '800px',
              }}
            >
              {/* Label */}
              <div
                style={{
                  fontFamily: 'Inter',
                  fontSize: '11px',
                  letterSpacing: '0.4em',
                  color: cat.color,
                  textTransform: 'uppercase',
                  marginBottom: '24px',
                }}
              >
                {String(i + 1).padStart(2, '0')} / 05 — {cat.subtitle}
              </div>

              {/* Title */}
              <h2
                className="panel-title font-display"
                style={{
                  fontSize: 'clamp(5rem, 10vw, 11rem)',
                  lineHeight: '0.9',
                  color: '#ffffff',
                  letterSpacing: '-0.01em',
                  marginBottom: '32px',
                  textShadow: `0 0 60px ${cat.color}30`,
                }}
              >
                {cat.name}
              </h2>

              {/* Description */}
              <p
                style={{
                  fontFamily: 'Inter',
                  fontSize: '1.1rem',
                  lineHeight: '1.7',
                  color: 'rgba(255,255,255,0.55)',
                  maxWidth: '480px',
                  marginBottom: '48px',
                }}
              >
                {cat.description}
              </p>

              {/* Stats */}
              <div style={{ display: 'flex', gap: '48px' }}>
                {cat.stats.map(stat => (
                  <div key={stat.label}>
                    <div
                      style={{
                        fontFamily: 'Bebas Neue',
                        fontSize: '2.5rem',
                        color: cat.color,
                        letterSpacing: '0.05em',
                        lineHeight: '1',
                      }}
                    >
                      {stat.value}
                    </div>
                    <div
                      style={{
                        fontFamily: 'Inter',
                        fontSize: '11px',
                        letterSpacing: '0.2em',
                        color: '#8A8A8A',
                        textTransform: 'uppercase',
                        marginTop: '6px',
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Decorative vertical line */}
            <div
              style={{
                position: 'absolute',
                left: '48px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '1px',
                height: '200px',
                background: `linear-gradient(to bottom, transparent, ${cat.color}, transparent)`,
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default PerformanceEcosystem;
