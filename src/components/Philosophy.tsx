import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const lines = [
  { text: 'STRENGTH', highlight: false },
  { text: "ISN'T GIVEN.", highlight: false },
  { text: '', highlight: false },
  { text: "IT'S", highlight: false },
  { text: 'EARNED.', highlight: true },
];

const Philosophy: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const linesRef = useRef<(HTMLDivElement | null)[]>([]);
  const subRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Lines reveal
      linesRef.current.forEach((line, i) => {
        if (!line) return;
        gsap.from(line, {
          opacity: 0,
          y: 80,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: `${10 + i * 8}% center`,
            end: `${30 + i * 8}% center`,
            toggleActions: 'play none none reverse',
          },
        });
      });

      // Sub text
      gsap.from(subRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '60% center',
          toggleActions: 'play none none reverse',
        },
      });

      // Parallax on text
      gsap.to(linesRef.current, {
        y: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="py-16 px-6 md:py-[120px] md:px-12 flex items-center justify-center relative overflow-hidden"
      style={{
        minHeight: '100vh',
        background: '#050505',
      }}
    >
      {/* Red glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(214,0,28,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Side label */}
      <div
        className="hidden md:block absolute left-12 uppercase whitespace-nowrap"
        style={{
          top: '50%',
          transform: 'translateY(-50%) rotate(-90deg)',
          transformOrigin: 'center',
          fontFamily: 'Inter',
          fontSize: '10px',
          letterSpacing: '0.4em',
          color: '#D6001C',
        }}
      >
        Our Philosophy
      </div>

      <div style={{ maxWidth: '1200px', width: '100%', textAlign: 'center' }}>
        {lines.map((line, i) => (
          <div
            key={i}
            ref={el => { linesRef.current[i] = el; }}
            className="font-display"
            style={{
              fontSize: 'clamp(4rem, 12vw, 13rem)',
              lineHeight: '0.88',
              letterSpacing: '-0.01em',
              color: line.highlight ? '#D6001C' : '#ffffff',
              display: line.text ? 'block' : 'none',
              textShadow: line.highlight ? '0 0 60px rgba(214,0,28,0.4)' : 'none',
            }}
          >
            {line.text}
          </div>
        ))}

        {/* Separator */}
        <div
          style={{
            width: '60px',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, #D6001C, transparent)',
            margin: '48px auto 40px',
          }}
        />

        {/* Sub content */}
        <div ref={subRef} style={{ maxWidth: '600px', margin: '0 auto' }}>
          <p
            style={{
              fontFamily: 'Playfair Display',
              fontStyle: 'italic',
              fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
              color: 'rgba(255,255,255,0.6)',
              lineHeight: '1.8',
              marginBottom: '32px',
            }}
          >
            At Bull Rocks Fitness, every rep is purposeful, every session is a statement. 
            We exist for those who refuse to be ordinary.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '48px', flexWrap: 'wrap' }}>
            {['Performance', 'Precision', 'Power'].map(val => (
              <div key={val} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    fontFamily: 'Bebas Neue',
                    fontSize: '2.5rem',
                    color: '#D6001C',
                    letterSpacing: '0.1em',
                  }}
                >
                  {val}
                </div>
                <div
                  style={{
                    width: '20px',
                    height: '1px',
                    background: '#D6001C',
                    margin: '8px auto 0',
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
