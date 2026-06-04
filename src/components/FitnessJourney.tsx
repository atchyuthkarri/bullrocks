import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    id: 1,
    word: 'JOIN',
    label: 'Step One',
    description: 'Walk through our doors and meet your dedicated onboarding specialist.',
    icon: '01',
  },
  {
    id: 2,
    word: 'TRAIN',
    label: 'Step Two',
    description: 'A custom program is built around your goals, schedule, and current fitness level.',
    icon: '02',
  },
  {
    id: 3,
    word: 'TRANSFORM',
    label: 'Step Three',
    description: 'Watch your body recompose. Track every metric. Feel the difference daily.',
    icon: '03',
  },
  {
    id: 4,
    word: 'PERFORM',
    label: 'Step Four',
    description: 'Compete, achieve, and unlock your full athletic potential.',
    icon: '04',
  },
  {
    id: 5,
    word: 'DOMINATE',
    label: 'Step Five',
    description: 'You are now the standard others aspire to. Welcome to the elite.',
    icon: '05',
  },
];

const FitnessJourney: React.FC = () => {
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

      gsap.utils.toArray<HTMLElement>('.journey-step').forEach((step, i) => {
        gsap.from(step, {
          opacity: 0,
          x: i % 2 === 0 ? -60 : 60,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: step,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      // Animate the timeline line
      gsap.from('.timeline-line', {
        scaleY: 0,
        transformOrigin: 'top center',
        duration: 2,
        ease: 'power2.out',
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
      id="journey"
      className="py-16 px-6 md:py-[120px] md:px-12 relative overflow-hidden"
      style={{ background: '#0D0D0D' }}
    >
      {/* Background text */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontFamily: 'Bebas Neue',
          fontSize: '30vw',
          color: 'rgba(255,255,255,0.01)',
          lineHeight: '1',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        BULL
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        {/* Header */}
        <div ref={titleRef} style={{ marginBottom: '80px', textAlign: 'center' }}>
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
            The Path
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
            YOUR FITNESS
            <br />
            <span style={{ color: '#D6001C' }}>JOURNEY.</span>
          </h2>
        </div>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          {/* Vertical line */}
          <div
            className="timeline-line"
            style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              bottom: 0,
              width: '1px',
              background: 'linear-gradient(to bottom, transparent, #D6001C80, #D6001C, #D6001C80, transparent)',
              transform: 'translateX(-50%)',
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
            {steps.map((step, i) => (
              <div
                key={step.id}
                className="journey-step flex flex-col md:grid md:grid-cols-[1fr_auto_1fr] items-center gap-6 md:gap-10"
              >
                {/* Left content */}
                <div
                  className={`md:block ${i % 2 === 0 ? 'block' : 'hidden'}`}
                  style={{
                    textAlign: i % 2 === 0 ? 'right' : 'left',
                    order: i % 2 === 0 ? 0 : 2,
                  }}
                >
                  {i % 2 === 0 && (
                    <>
                      <div
                        style={{
                          fontFamily: 'Inter',
                          fontSize: '11px',
                          letterSpacing: '0.3em',
                          color: '#D6001C',
                          textTransform: 'uppercase',
                          marginBottom: '8px',
                        }}
                      >
                        {step.label}
                      </div>
                      <div
                        className="font-display"
                        style={{
                          fontSize: 'clamp(3rem, 5vw, 5rem)',
                          color: '#ffffff',
                          letterSpacing: '0.05em',
                          lineHeight: '1',
                          marginBottom: '16px',
                        }}
                      >
                        {step.word}
                      </div>
                      <p
                        style={{
                          fontFamily: 'Inter',
                          fontSize: '14px',
                          lineHeight: '1.7',
                          color: '#8A8A8A',
                          maxWidth: '280px',
                          marginLeft: 'auto',
                        }}
                      >
                        {step.description}
                      </p>
                    </>
                  )}
                </div>

                {/* Center node */}
                <div
                  style={{
                    order: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      background: '#050505',
                      border: '1px solid #D6001C',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'Bebas Neue',
                      fontSize: '1.1rem',
                      color: '#D6001C',
                      letterSpacing: '0.05em',
                      boxShadow: '0 0 30px rgba(214,0,28,0.3)',
                      position: 'relative',
                      zIndex: 2,
                    }}
                  >
                    {step.icon}
                  </div>
                </div>

                {/* Right content */}
                <div
                  className={`md:block ${i % 2 !== 0 ? 'block' : 'hidden'}`}
                  style={{
                    textAlign: i % 2 === 0 ? 'left' : 'right',
                    order: i % 2 === 0 ? 2 : 0,
                  }}
                >
                  {i % 2 !== 0 && (
                    <>
                      <div
                        style={{
                          fontFamily: 'Inter',
                          fontSize: '11px',
                          letterSpacing: '0.3em',
                          color: '#D6001C',
                          textTransform: 'uppercase',
                          marginBottom: '8px',
                        }}
                      >
                        {step.label}
                      </div>
                      <div
                        className="font-display"
                        style={{
                          fontSize: 'clamp(3rem, 5vw, 5rem)',
                          color: '#ffffff',
                          letterSpacing: '0.05em',
                          lineHeight: '1',
                          marginBottom: '16px',
                        }}
                      >
                        {step.word}
                      </div>
                      <p
                        style={{
                          fontFamily: 'Inter',
                          fontSize: '14px',
                          lineHeight: '1.7',
                          color: '#8A8A8A',
                          maxWidth: '280px',
                          marginRight: 'auto',
                          textAlign: 'left',
                        }}
                      >
                        {step.description}
                      </p>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FitnessJourney;
