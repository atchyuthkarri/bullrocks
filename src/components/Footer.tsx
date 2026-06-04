import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(marqueeRef.current, {
        x: '-20%',
        ease: 'none',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  const year = new Date().getFullYear();
  const links = {
    Training: ['Strength', 'Conditioning', 'Recovery', 'Coaching', 'Nutrition'],
    Company: ['About Us', 'Philosophy', 'Careers', 'Press', 'Contact'],
    Membership: ['Essential', 'Performance', 'Elite', 'Corporate', 'Student'],
    Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
  };

  return (
    <footer
      ref={footerRef}
      className="py-12 md:pt-20 md:pb-10 overflow-hidden"
      style={{
        background: '#030303',
        borderTop: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      {/* Massive Scrolling Marquee */}
      <div 
        style={{ 
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          paddingBottom: '40px',
          marginBottom: '80px',
          whiteSpace: 'nowrap',
        }}
      >
        <div 
          ref={marqueeRef}
          style={{ 
            display: 'inline-block',
            fontFamily: 'Bebas Neue',
            fontSize: 'clamp(6rem, 15vw, 15rem)',
            lineHeight: '0.8',
            color: 'rgba(255,255,255,0.03)',
            whiteSpace: 'nowrap',
            letterSpacing: '0.02em',
          }}
        >
          FORGED THROUGH DISCIPLINE ✦ FORGED THROUGH DISCIPLINE ✦ FORGED THROUGH DISCIPLINE ✦
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 48px' }}>
        {/* Top row */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-12 mb-20"
        >
          {/* Brand col */}
          <div>
            <div
              className="font-display"
              style={{
                fontSize: '2rem',
                letterSpacing: '0.15em',
                color: '#ffffff',
                marginBottom: '16px',
              }}
            >
              BULL<span style={{ color: '#D6001C' }}>ROCKS</span>
            </div>
            <p
              style={{
                fontFamily: 'Inter',
                fontSize: '13px',
                lineHeight: '1.7',
                color: '#8A8A8A',
                marginBottom: '24px',
                maxWidth: '280px',
              }}
            >
              The elite performance training destination. Forged through discipline. Built for champions.
            </p>
            {/* Social links */}
            <div style={{ display: 'flex', gap: '16px' }}>
              {['IG', 'TW', 'YT', 'FB'].map(social => (
                <a
                  key={social}
                  href="#"
                  aria-label={social}
                  style={{
                    width: '36px',
                    height: '36px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'Inter',
                    fontSize: '10px',
                    letterSpacing: '0.05em',
                    color: '#8A8A8A',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = '#D6001C';
                    (e.currentTarget as HTMLElement).style.color = '#D6001C';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)';
                    (e.currentTarget as HTMLElement).style.color = '#8A8A8A';
                  }}
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <div
                style={{
                  fontFamily: 'Inter',
                  fontSize: '11px',
                  letterSpacing: '0.3em',
                  color: '#D6001C',
                  textTransform: 'uppercase',
                  marginBottom: '20px',
                }}
              >
                {category}
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {items.map(item => (
                  <li key={item}>
                    <a
                      href="#"
                      style={{
                        fontFamily: 'Inter',
                        fontSize: '13px',
                        color: '#8A8A8A',
                        textDecoration: 'none',
                        transition: 'color 0.3s ease',
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#ffffff'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#8A8A8A'; }}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div
          style={{
            height: '1px',
            background: 'rgba(255,255,255,0.05)',
            marginBottom: '40px',
          }}
        />

        {/* Bottom row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div
            style={{
              fontFamily: 'Inter',
              fontSize: '12px',
              color: '#8A8A8A',
              letterSpacing: '0.05em',
            }}
          >
            © {year} Bull Rocks Fitness. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
