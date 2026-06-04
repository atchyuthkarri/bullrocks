import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Stat {
  value: string;
  suffix: string;
  label: string;
  sublabel: string;
}

const stats: Stat[] = [
  { value: '5000', suffix: '+', label: 'MEMBERS', sublabel: 'Active community' },
  { value: '50', suffix: '+', label: 'MACHINES', sublabel: 'Premium equipment' },
  { value: '10', suffix: '+', label: 'TRAINERS', sublabel: 'Certified experts' },
  { value: '8', suffix: '', label: 'YEARS', sublabel: 'Of excellence' },
];

const WhyBullRocks: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const titleRef = useRef<HTMLDivElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title reveal
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

      // Counters
      counterRefs.current.forEach((el, i) => {
        if (!el) return;
        const stat = stats[i];
        const endVal = parseFloat(stat.value);

        const obj = { val: 0 };
        gsap.to(obj, {
          val: endVal,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          onUpdate() {
            if (el) el.textContent = Math.round(obj.val).toString();
          },
        });
      });

      // Card stagger
      gsap.from('.stat-card', {
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
          toggleActions: 'play none none reverse',
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const tickerItems = ['ELITE PERFORMANCE', 'PREMIUM FACILITY', 'EXPERT COACHING', 'BULL ROCKS FITNESS', 'FORGE YOUR LEGACY'];

  return (
    <section
      ref={sectionRef}
      id="why"
      className="py-16 px-6 md:py-[120px] md:px-12 relative overflow-hidden"
      style={{
        minHeight: '100vh',
        background: '#050505',
      }}
    >
      {/* Ticker */}
      <div
        className="ticker-wrap"
        style={{
          position: 'absolute',
          top: '0',
          left: 0,
          right: 0,
          padding: '16px 0',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          background: 'rgba(214,0,28,0.04)',
        }}
      >
        <div ref={tickerRef} className="ticker-inner">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span
              key={i}
              style={{
                fontFamily: 'Bebas Neue',
                fontSize: '1.2rem',
                letterSpacing: '0.2em',
                color: i % 2 === 0 ? '#ffffff' : '#D6001C',
                margin: '0 40px',
              }}
            >
              {item} ✦
            </span>
          ))}
        </div>
      </div>

      {/* Red glow */}
      <div
        style={{
          position: 'absolute',
          bottom: '-200px',
          right: '-200px',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(214,0,28,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto', paddingTop: '80px' }}>
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
            Why Bull Rocks
          </div>
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(4rem, 8vw, 9rem)',
              lineHeight: '0.9',
              color: '#ffffff',
              letterSpacing: '-0.01em',
            }}
          >
            THE NUMBERS
            <br />
            <span style={{ color: '#D6001C' }}>SPEAK.</span>
          </h2>
        </div>

        {/* Stats Grid */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-[2px] bg-white/5 border border-white/5"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="stat-card p-8 md:py-[60px] md:px-[40px] relative transition-colors duration-300"
              style={{
                background: '#050505',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(214,0,28,0.04)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = '#050505';
              }}
            >
              {/* Red top border */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: 'linear-gradient(90deg, #D6001C, transparent)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                }}
                className="stat-border"
              />

              <div
                style={{
                  fontFamily: 'Bebas Neue',
                  fontSize: 'clamp(5rem, 8vw, 9rem)',
                  lineHeight: '1',
                  letterSpacing: '-0.02em',
                  background: 'linear-gradient(135deg, #ffffff, #D6001C)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                <span ref={el => { counterRefs.current[i] = el; }}>0</span>
                {stat.suffix}
              </div>
              <div
                style={{
                  fontFamily: 'Bebas Neue',
                  fontSize: '1.4rem',
                  letterSpacing: '0.2em',
                  color: '#ffffff',
                  marginBottom: '8px',
                }}
              >
                {stat.label}
              </div>
              <div
                style={{
                  fontFamily: 'Inter',
                  fontSize: '12px',
                  letterSpacing: '0.15em',
                  color: '#8A8A8A',
                  textTransform: 'uppercase',
                }}
              >
                {stat.sublabel}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom tagline */}
        <div
          style={{
            marginTop: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '32px',
          }}
        >
          <p
            style={{
              fontFamily: 'Playfair Display',
              fontStyle: 'italic',
              fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
              color: 'rgba(255,255,255,0.5)',
              maxWidth: '600px',
            }}
          >
            "Every great body was built one disciplined day at a time."
          </p>
          <button
            id="why-cta"
            className="btn-primary"
            onClick={() => document.getElementById('membership')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Join The Elite
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default WhyBullRocks;
