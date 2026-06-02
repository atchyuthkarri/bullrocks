import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  tagline: string;
  featured: boolean;
  features: string[];
  cta: string;
  color: string;
}

const plans: Plan[] = [
  {
    id: 'essential',
    name: 'ESSENTIAL',
    price: '₹2,499',
    period: '/ month',
    tagline: 'Begin Your Journey',
    featured: false,
    features: [
      'Full Gym Access',
      'Cardio Zone',
      'Locker Rooms',
      'Group Classes (4/month)',
      'Basic Nutrition Guide',
      'Mobile App Access',
    ],
    cta: 'Start Essential',
    color: '#8A8A8A',
  },
  {
    id: 'performance',
    name: 'PERFORMANCE',
    price: '₹4,999',
    period: '/ month',
    tagline: 'Elevate Your Game',
    featured: true,
    features: [
      'Everything in Essential',
      'Unlimited Group Classes',
      'Monthly PT Session (2)',
      'Recovery Suite Access',
      'Nutrition Consultation',
      'Progress Tracking',
      'Guest Passes (2/month)',
      'Priority Class Booking',
    ],
    cta: 'Join Performance',
    color: '#D6001C',
  },
  {
    id: 'elite',
    name: 'ELITE',
    price: '₹9,999',
    period: '/ month',
    tagline: 'No Limits. No Compromise.',
    featured: false,
    features: [
      'Everything in Performance',
      'Weekly PT Sessions (4)',
      'Custom Nutrition Plan',
      'Private Training Time',
      'Infrared Sauna Unlimited',
      'Cold Plunge Access',
      'VIP Locker',
      'Unlimited Guest Passes',
      'Quarterly Body Comp Analysis',
    ],
    cta: 'Go Elite',
    color: '#FF3B4D',
  },
];

const Membership: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

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

      gsap.from('.membership-card', {
        opacity: 0,
        y: 80,
        stagger: 0.15,
        duration: 1,
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
      id="membership"
      style={{
        background: '#0D0D0D',
        padding: '120px 48px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '800px',
          height: '800px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(214,0,28,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
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
            Membership Experience
          </div>
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(4rem, 8vw, 9rem)',
              lineHeight: '0.9',
              color: '#ffffff',
              letterSpacing: '-0.01em',
              marginBottom: '24px',
            }}
          >
            CHOOSE YOUR
            <br />
            <span style={{ color: '#D6001C' }}>LEVEL.</span>
          </h2>
          <p
            style={{
              fontFamily: 'Inter',
              fontSize: '14px',
              letterSpacing: '0.05em',
              color: '#8A8A8A',
              maxWidth: '400px',
              margin: '0 auto',
            }}
          >
            No contracts. Cancel anytime. Your transformation begins with a decision.
          </p>
        </div>

        {/* Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2px',
            alignItems: 'start',
          }}
        >
          {plans.map(plan => (
            <div
              key={plan.id}
              id={`plan-${plan.id}`}
              className={`membership-card ${plan.featured ? 'featured' : ''}`}
              style={{
                position: 'relative',
                padding: '56px 44px',
                background: plan.featured
                  ? 'linear-gradient(135deg, rgba(214,0,28,0.08), rgba(13,13,13,0.95))'
                  : '#111111',
                border: plan.featured
                  ? '1px solid rgba(214,0,28,0.5)'
                  : '1px solid rgba(255,255,255,0.06)',
                boxShadow: plan.featured
                  ? '0 0 80px rgba(214,0,28,0.15), inset 0 0 80px rgba(214,0,28,0.03)'
                  : 'none',
                transition: 'all 0.4s ease',
                transform: plan.featured && hoveredPlan !== plan.id ? 'translateY(-12px)' : 'none',
              }}
              onMouseEnter={() => setHoveredPlan(plan.id)}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              {/* Featured badge */}
              {plan.featured && (
                <div
                  style={{
                    position: 'absolute',
                    top: '-1px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#D6001C',
                    padding: '6px 20px',
                    fontFamily: 'Inter',
                    fontSize: '10px',
                    fontWeight: 600,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#ffffff',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Most Popular
                </div>
              )}

              {/* Plan name */}
              <div
                className="font-display"
                style={{
                  fontSize: '2rem',
                  letterSpacing: '0.15em',
                  color: plan.color,
                  marginBottom: '8px',
                }}
              >
                {plan.name}
              </div>

              {/* Tagline */}
              <div
                style={{
                  fontFamily: 'Inter',
                  fontSize: '12px',
                  letterSpacing: '0.1em',
                  color: '#8A8A8A',
                  marginBottom: '32px',
                  textTransform: 'uppercase',
                }}
              >
                {plan.tagline}
              </div>

              {/* Divider */}
              <div
                style={{
                  width: '100%',
                  height: '1px',
                  background: plan.featured
                    ? 'linear-gradient(90deg, transparent, rgba(214,0,28,0.5), transparent)'
                    : 'rgba(255,255,255,0.06)',
                  marginBottom: '32px',
                }}
              />

              {/* Price */}
              <div style={{ marginBottom: '40px' }}>
                <div
                  className="font-display"
                  style={{
                    fontSize: '3.5rem',
                    color: '#ffffff',
                    lineHeight: '1',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {plan.price}
                </div>
                <div
                  style={{
                    fontFamily: 'Inter',
                    fontSize: '12px',
                    letterSpacing: '0.1em',
                    color: '#8A8A8A',
                    marginTop: '4px',
                  }}
                >
                  {plan.period}
                </div>
              </div>

              {/* Features */}
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 40px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {plan.features.map(feature => (
                  <li
                    key={feature}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      fontFamily: 'Inter',
                      fontSize: '14px',
                      color: 'rgba(255,255,255,0.75)',
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7l4 4 6-7" stroke={plan.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                id={`plan-cta-${plan.id}`}
                className={plan.featured ? 'btn-primary' : 'btn-outline'}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div
          style={{
            marginTop: '48px',
            textAlign: 'center',
            fontFamily: 'Inter',
            fontSize: '12px',
            letterSpacing: '0.1em',
            color: '#8A8A8A',
          }}
        >
          All plans include a 7-day free trial · No joining fee · Cancel anytime
        </div>
      </div>
    </section>
  );
};

export default Membership;
