import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Reel {
  id: string;
  title: string;
  duration: string;
  views: string;
  imageUrl: string;
}

const reels: Reel[] = [
  {
    id: 'r1',
    title: 'THE GRIND NEVER STOPS',
    duration: '0:45',
    views: '12.4K',
    imageUrl: '/images/reel_1.png',
  },
  {
    id: 'r2',
    title: 'METABOLIC CONDITIONING',
    duration: '0:30',
    views: '8.2K',
    imageUrl: '/images/reel_2.png',
  },
  {
    id: 'r3',
    title: 'ELITE COACHING CUES',
    duration: '0:55',
    views: '15.1K',
    imageUrl: '/images/reel_3.png',
  },
];

const ReelsSection: React.FC = () => {
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
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.from('.reel-card', {
        opacity: 0,
        y: 80,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.reels-grid',
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="reels"
      className="py-16 px-6 md:py-[120px] md:px-12 relative overflow-hidden"
      style={{ background: '#0D0D0D' }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div ref={titleRef} style={{ marginBottom: '60px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px' }}>
          <div>
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
              Bull Rocks In Motion
            </div>
            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(4rem, 8vw, 8rem)',
                lineHeight: '0.9',
                color: '#ffffff',
                letterSpacing: '-0.01em',
              }}
            >
              LATEST
              <br />
              <span style={{ color: '#D6001C' }}>REELS.</span>
            </h2>
          </div>
          <button
            className="btn-outline"
            style={{ padding: '12px 24px', fontSize: '14px' }}
          >
            Follow @BullRocks
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ marginLeft: '8px' }}>
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M15 12l-5-3v6l5-3z" fill="currentColor" />
            </svg>
          </button>
        </div>

        {/* Reels Grid (Horizontal on mobile, Grid on desktop) */}
        <div className="reels-grid grid grid-cols-1 md:grid-cols-3 gap-6">
          {reels.map((reel) => (
            <div
              key={reel.id}
              className="reel-card relative overflow-hidden cursor-pointer group"
              style={{
                aspectRatio: '9/16',
                background: '#050505',
                borderRadius: '8px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
              }}
            >
              {/* Thumbnail Image */}
              <img
                src={reel.imageUrl}
                alt={reel.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Gradient Overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.1) 100%)',
                  pointerEvents: 'none',
                }}
              />

              {/* Play Button Center */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 group-hover:scale-110"
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'rgba(214,0,28,0.2)',
                  backdropFilter: 'blur(4px)',
                  border: '1px solid rgba(214,0,28,0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  boxShadow: '0 0 30px rgba(214,0,28,0.3)',
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: '4px' }}>
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>

              {/* Content Bottom */}
              <div
                className="absolute bottom-0 left-0 w-full p-6"
                style={{ zIndex: 2 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <div
                    style={{
                      fontFamily: 'Inter',
                      fontSize: '11px',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
                    </svg>
                    {reel.views}
                  </div>
                  <div
                    style={{
                      fontFamily: 'Inter',
                      fontSize: '11px',
                      color: 'rgba(255,255,255,0.6)',
                    }}
                  >
                    {reel.duration}
                  </div>
                </div>
                <div
                  className="font-display"
                  style={{
                    fontSize: '1.5rem',
                    color: '#ffffff',
                    letterSpacing: '0.05em',
                    lineHeight: '1.2',
                  }}
                >
                  {reel.title}
                </div>
              </div>

              {/* Top Right Decorative BR */}
              <div
                className="absolute top-4 right-4 font-display opacity-20"
                style={{ fontSize: '2rem', color: '#fff', userSelect: 'none' }}
              >
                BR
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReelsSection;
