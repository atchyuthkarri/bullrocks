import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FinalCTA: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background pulsing glow
      gsap.to(bgRef.current, {
        opacity: 0.6,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.from(titleRef.current, {
        opacity: 0,
        y: 80,
        duration: 1.4,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.from(subRef.current, {
        opacity: 0,
        y: 40,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.from(ctaRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="cta"
      className="py-16 px-6 md:py-[120px] md:px-12 flex flex-col items-center justify-center text-center relative overflow-hidden"
      style={{
        minHeight: '100vh',
        background: '#050505',
      }}
    >
      {/* Animated background glow */}
      <div
        ref={bgRef}
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse at 30% 50%, rgba(214,0,28,0.1) 0%, transparent 60%),
            radial-gradient(ellipse at 70% 50%, rgba(255,59,77,0.06) 0%, transparent 60%)
          `,
          pointerEvents: 'none',
          opacity: 0.3,
        }}
      />

      {/* Massive background text */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        <div
          className="font-display"
          style={{
            fontSize: '30vw',
            color: 'rgba(255,255,255,0.015)',
            lineHeight: '1',
            whiteSpace: 'nowrap',
            userSelect: 'none',
          }}
        >
          BR
        </div>
      </div>

      {/* Grid overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1000px' }}>
        {/* Label */}
        <div
          style={{
            fontFamily: 'Inter',
            fontSize: '11px',
            letterSpacing: '0.5em',
            color: '#D6001C',
            textTransform: 'uppercase',
            marginBottom: '32px',
          }}
        >
          ── The Time Is Now ──
        </div>

        {/* Main headline */}
        <div ref={titleRef}>
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(5rem, 12vw, 14rem)',
              lineHeight: '0.85',
              color: '#ffffff',
              letterSpacing: '-0.01em',
              marginBottom: '8px',
            }}
          >
            YOUR NEXT
          </h2>
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(5rem, 12vw, 14rem)',
              lineHeight: '0.85',
              color: '#ffffff',
              letterSpacing: '-0.01em',
              marginBottom: '8px',
            }}
          >
            LEVEL
          </h2>
          <h2
            className="font-display gradient-text"
            style={{
              fontSize: 'clamp(5rem, 12vw, 14rem)',
              lineHeight: '0.85',
              letterSpacing: '-0.01em',
              marginBottom: '48px',
            }}
          >
            STARTS NOW.
          </h2>
        </div>

        {/* Subtext */}
        <div ref={subRef} style={{ marginBottom: '60px' }}>
          <p
            style={{
              fontFamily: 'Playfair Display',
              fontStyle: 'italic',
              fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
              color: 'rgba(255,255,255,0.5)',
              marginBottom: '16px',
            }}
          >
            Join Bull Rocks Fitness today.
          </p>
          <div
            style={{
              width: '60px',
              height: '1px',
              background: '#D6001C',
              margin: '0 auto',
            }}
          />
        </div>

        {/* CTAs */}
        <div
          ref={ctaRef}
          style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '80px',
          }}
        >
          <button
            id="final-cta-trial"
            className="btn-outline"
            style={{ fontSize: '13px', padding: '18px 48px' }}
            onClick={() => document.getElementById('membership')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Book A Trial
          </button>
          <button
            id="final-cta-join"
            className="btn-primary"
            style={{ fontSize: '13px', padding: '18px 48px' }}
            onClick={() => document.getElementById('membership')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Join Now
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Contact info */}
        <div
          className="flex flex-col sm:flex-row justify-center gap-12 flex-wrap"
        >
          {[
            { label: 'Location', value: 'Hyderabad, India' },
            { label: 'Hours', value: 'Mon–Sun · 5AM–11PM' },
            { label: 'Contact', value: '+91 98765 43210' },
          ].map(info => (
            <div key={info.label} style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontFamily: 'Inter',
                  fontSize: '10px',
                  letterSpacing: '0.3em',
                  color: '#D6001C',
                  textTransform: 'uppercase',
                  marginBottom: '6px',
                }}
              >
                {info.label}
              </div>
              <div
                style={{
                  fontFamily: 'Inter',
                  fontSize: '13px',
                  color: '#8A8A8A',
                }}
              >
                {info.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
