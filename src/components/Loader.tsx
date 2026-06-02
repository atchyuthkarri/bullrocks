import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface LoaderProps {
  onComplete: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<(HTMLDivElement | null)[]>([]);
  const brandWrapRef = useRef<HTMLDivElement>(null);
  
  const words = ['DISCIPLINE', 'STRENGTH', 'PERFORMANCE', 'POWER'];

  useEffect(() => {
    const tl = gsap.timeline({ onComplete });

    // Initial setup
    gsap.set(wordsRef.current, { 
      opacity: 0, 
      scale: 0.95, 
      position: 'absolute', 
      top: '50%', 
      left: '50%', 
      xPercent: -50, 
      yPercent: -50 
    });
    gsap.set('.brand-word', { y: '110%' });

    // Typography Sequence
    words.forEach((_, i) => {
      const el = wordsRef.current[i];
      if (!el) return;
      
      tl.fromTo(el,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1.02, duration: 0.35, ease: 'power2.out' }
      )
      .to(el, { 
        opacity: 0, 
        scale: 1.05, 
        duration: 0.25, 
        ease: 'power2.in' 
      }, '+=0.05'); // Hold briefly
    });

    // Brand Reveal (Mask animation)
    tl.addLabel('brandReveal');
    tl.to('.brand-word', {
      y: '0%',
      duration: 0.7,
      stagger: 0.1,
      ease: 'power4.out',
    }, 'brandReveal');

    // Final Transition (Scale forward and fade out)
    tl.addLabel('finalTransition', '+=0.4');
    
    // Scale the text forward
    tl.to(brandWrapRef.current, {
      scale: 4,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.inOut',
    }, 'finalTransition');
    
    // Fade out the entire black background container
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.inOut',
    }, 'finalTransition');

  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        background: '#020202', // Matte Black
        zIndex: 100000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Subtle Film Grain Noise */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.05,
          pointerEvents: 'none',
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Sequence Words */}
      <div style={{ position: 'relative', width: '100%', height: '100%', zIndex: 10 }}>
        {words.map((word, i) => (
          <div
            key={word}
            ref={el => { wordsRef.current[i] = el; }}
            className="font-display"
            style={{
              fontSize: 'clamp(5rem, 16vw, 18rem)',
              color: '#ffffff',
              lineHeight: '0.8',
              letterSpacing: '-0.02em',
              whiteSpace: 'nowrap',
              textTransform: 'uppercase',
            }}
          >
            {word}
          </div>
        ))}
      </div>

      {/* Final Brand Name */}
      <div 
        ref={brandWrapRef}
        style={{ 
          position: 'absolute', 
          zIndex: 20,
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          pointerEvents: 'none',
        }}
      >
        <div style={{ overflow: 'hidden', paddingBottom: '8px' }}>
          <div
            className="brand-word font-display"
            style={{
              fontSize: 'clamp(4rem, 12vw, 14rem)',
              color: '#ffffff',
              lineHeight: '0.8',
              letterSpacing: '-0.02em',
              whiteSpace: 'nowrap',
            }}
          >
            BULL ROCKS
          </div>
        </div>
        <div style={{ overflow: 'hidden' }}>
          <div
            className="brand-word"
            style={{
              fontFamily: 'Inter',
              fontSize: 'clamp(12px, 2vw, 24px)',
              letterSpacing: '0.5em',
              color: '#D6001C',
              textTransform: 'uppercase',
              fontWeight: 500,
            }}
          >
            FITNESS
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
