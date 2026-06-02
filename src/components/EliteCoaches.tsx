import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Coach {
  id: number;
  name: string;
  title: string;
  specialty: string;
  experience: string;
  certifications: string[];
  philosophy: string;
  gradientFrom: string;
  gradientTo: string;
  initials: string;
}

const coaches: Coach[] = [
  {
    id: 1,
    name: 'RAHUL KRISHNA',
    title: 'Head Performance Coach',
    specialty: 'Strength & Hypertrophy',
    experience: '12 Years',
    certifications: ['NSCA-CSCS', 'NASM-CPT', 'Precision Nutrition'],
    philosophy: 'Every athlete has a breakthrough waiting — my job is to find it.',
    gradientFrom: '#D6001C',
    gradientTo: '#050505',
    initials: 'RK',
  },
  {
    id: 2,
    name: 'MEERA NAIR',
    title: 'Elite Conditioning Specialist',
    specialty: 'Metabolic & Cardio Systems',
    experience: '9 Years',
    certifications: ['ACE-CPT', 'HIIT Specialist', 'Olympic Lifting L2'],
    philosophy: 'Your cardio capacity is your competitive edge.',
    gradientFrom: '#FF3B4D',
    gradientTo: '#0D0D0D',
    initials: 'MN',
  },
  {
    id: 3,
    name: 'ARYAN SINGH',
    title: 'Sports Nutritionist & Coach',
    specialty: 'Nutrition & Recovery',
    experience: '8 Years',
    certifications: ['RD', 'CISSN', 'Sports Dietitian'],
    philosophy: 'What you eat between sessions defines your results.',
    gradientFrom: '#D6001C',
    gradientTo: '#050505',
    initials: 'AS',
  },
];

const EliteCoaches: React.FC = () => {
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

      gsap.from('.coach-card', {
        opacity: 0,
        y: 80,
        stagger: 0.2,
        duration: 1.2,
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
      id="coaches"
      style={{
        background: '#050505',
        padding: '120px 48px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Grid lines background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
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
            Elite Coaches
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
            MEET THE
            <br />
            <span style={{ color: '#D6001C' }}>MASTERS.</span>
          </h2>
        </div>

        {/* Coach Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {coaches.map((coach, i) => (
            <div
              key={coach.id}
              className="coach-card"
              style={{
                display: 'grid',
                gridTemplateColumns: i % 2 === 0 ? '400px 1fr' : '1fr 400px',
                background: '#0D0D0D',
                border: '1px solid rgba(255,255,255,0.04)',
                overflow: 'hidden',
                transition: 'border-color 0.3s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(214,0,28,0.3)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.04)';
              }}
            >
              {/* Portrait area */}
              <div
                style={{
                  background: `linear-gradient(135deg, ${coach.gradientFrom}30, ${coach.gradientTo})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '400px',
                  position: 'relative',
                  order: i % 2 === 0 ? 0 : 1,
                  overflow: 'hidden',
                }}
              >
                {/* Background pattern */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `radial-gradient(circle, ${coach.gradientFrom}20 1px, transparent 1px)`,
                    backgroundSize: '30px 30px',
                    opacity: 0.5,
                  }}
                />

                {/* Initials Avatar */}
                <div
                  style={{
                    position: 'relative',
                    zIndex: 2,
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      width: '160px',
                      height: '160px',
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, ${coach.gradientFrom}, rgba(5,5,5,0.8))`,
                      border: `2px solid ${coach.gradientFrom}50`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 24px',
                      boxShadow: `0 0 60px ${coach.gradientFrom}30`,
                    }}
                  >
                    <span
                      className="font-display"
                      style={{
                        fontSize: '4rem',
                        color: '#ffffff',
                        letterSpacing: '0.05em',
                      }}
                    >
                      {coach.initials}
                    </span>
                  </div>
                  <div
                    style={{
                      fontFamily: 'Inter',
                      fontSize: '11px',
                      letterSpacing: '0.3em',
                      color: coach.gradientFrom,
                      textTransform: 'uppercase',
                    }}
                  >
                    {coach.experience} Experience
                  </div>
                </div>

                {/* Decorative corner */}
                <div
                  style={{
                    position: 'absolute',
                    top: '24px',
                    left: '24px',
                    width: '40px',
                    height: '40px',
                    borderTop: `1px solid ${coach.gradientFrom}60`,
                    borderLeft: `1px solid ${coach.gradientFrom}60`,
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '24px',
                    right: '24px',
                    width: '40px',
                    height: '40px',
                    borderBottom: `1px solid ${coach.gradientFrom}60`,
                    borderRight: `1px solid ${coach.gradientFrom}60`,
                  }}
                />
              </div>

              {/* Content */}
              <div
                style={{
                  padding: '60px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  order: i % 2 === 0 ? 1 : 0,
                }}
              >
                <div
                  style={{
                    fontFamily: 'Inter',
                    fontSize: '11px',
                    letterSpacing: '0.3em',
                    color: coach.gradientFrom,
                    textTransform: 'uppercase',
                    marginBottom: '12px',
                  }}
                >
                  {coach.title}
                </div>
                <h3
                  className="font-display"
                  style={{
                    fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                    color: '#ffffff',
                    letterSpacing: '0.05em',
                    marginBottom: '16px',
                  }}
                >
                  {coach.name}
                </h3>
                <div
                  style={{
                    width: '40px',
                    height: '1px',
                    background: coach.gradientFrom,
                    marginBottom: '24px',
                  }}
                />
                <div
                  style={{
                    fontFamily: 'Inter',
                    fontSize: '13px',
                    letterSpacing: '0.1em',
                    color: '#8A8A8A',
                    textTransform: 'uppercase',
                    marginBottom: '24px',
                  }}
                >
                  Specialty: {coach.specialty}
                </div>
                <p
                  style={{
                    fontFamily: 'Playfair Display',
                    fontStyle: 'italic',
                    fontSize: '1.15rem',
                    color: 'rgba(255,255,255,0.6)',
                    lineHeight: '1.7',
                    marginBottom: '32px',
                  }}
                >
                  "{coach.philosophy}"
                </p>

                {/* Certifications */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {coach.certifications.map(cert => (
                    <span
                      key={cert}
                      style={{
                        padding: '6px 14px',
                        border: `1px solid ${coach.gradientFrom}40`,
                        fontFamily: 'Inter',
                        fontSize: '11px',
                        letterSpacing: '0.1em',
                        color: '#8A8A8A',
                        textTransform: 'uppercase',
                      }}
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EliteCoaches;
