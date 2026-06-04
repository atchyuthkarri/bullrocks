import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 240;
const LERP = 0.07;

function frameUrl(n: number): string {
  return `/frames/ezgif-frame-${String(n).padStart(3, '0')}.jpg`;
}

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  const titleRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // ── 1. PRELOAD ────────────────────────────────────────────
  useEffect(() => {
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    let completed = 0;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = frameUrl(i + 1);
      img.onload = img.onerror = () => {
        completed++;
        setLoadProgress(Math.round((completed / TOTAL_FRAMES) * 100));
        if (completed === TOTAL_FRAMES) setLoaded(true);
      };
      images[i] = img;
    }
    imagesRef.current = images;
  }, []);

  // ── 2. SUB-FRAME CROSS-FADE BLEND ─────────────────────────
  const drawBlended = (frameFloat: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const total = imagesRef.current.length;
    const clamped = Math.max(0, Math.min(total - 1, frameFloat));
    const idxA = Math.floor(clamped);
    const idxB = Math.min(idxA + 1, total - 1);
    const frac = clamped - idxA;

    const imgA = imagesRef.current[idxA];
    const imgB = imagesRef.current[idxB];
    if (!imgA?.complete) return;

    const cw = canvas.width, ch = canvas.height;

    const drawImg = (img: HTMLImageElement, alpha: number) => {
      if (!img?.complete || !img.naturalWidth) return;
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
      ctx.globalAlpha = alpha;
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    };

    ctx.clearRect(0, 0, cw, ch);
    drawImg(imgA, 1);
    if (frac > 0.001) drawImg(imgB, frac);
    ctx.globalAlpha = 1;
  };

  // ── 3. RESIZE ─────────────────────────────────────────────
  useEffect(() => {
    const resize = () => {
      const c = canvasRef.current;
      if (!c) return;
      c.width = window.innerWidth;
      c.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  // ── 4. LERP LOOP + SCROLL WIRING ──────────────────────────
  useEffect(() => {
    if (!loaded) return;
    drawBlended(0);

    const targetRef = { frame: 0 };
    const currentRef = { frame: 0 };
    let animFrame: number;

    const tick = () => {
      const diff = targetRef.frame - currentRef.frame;
      if (Math.abs(diff) > 0.01) {
        currentRef.frame += diff * LERP;
        drawBlended(currentRef.frame);
      }
      animFrame = requestAnimationFrame(tick);
    };
    animFrame = requestAnimationFrame(tick);

    const obj = { frame: 0 };
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 2,
      },
    });

    tl.to(obj, {
      frame: TOTAL_FRAMES - 1,
      ease: 'none',
      onUpdate() {
        targetRef.frame = obj.frame;
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
      cancelAnimationFrame(animFrame);
    };
  }, [loaded]);

  // ── 5. OVERLAY TEXT ANIMATIONS ────────────────────────────
  useEffect(() => {
    if (!loaded) return;

    const ctx = gsap.context(() => {
      // Scroll-driven overlay fade
      gsap.fromTo([titleRef.current, taglineRef.current, subRef.current, ctaRef.current],
        { opacity: 1, y: 0 },
        {
          opacity: 0,
          y: -60,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '15% top',
            scrub: 1,
          },
        }
      );

      // Fade out the dark overlays on scroll
      gsap.fromTo(overlayRef.current,
        { opacity: 1 },
        {
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '15% top',
            scrub: 1,
          },
        }
      );

      gsap.to(scrollHintRef.current, {
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '5% top',
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, [loaded]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{ height: '800vh', position: 'relative' }}
    >
      <div
        ref={stickyRef}
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          background: '#050505',
        }}
      >
        {/* Canvas */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            display: 'block',
          }}
        />

        {/* Fading Dark Overlays */}
        <div ref={overlayRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          {/* Base tint for better text readability */}
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,5,5,0.5)' }} />
          {/* Vignette */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse at center, transparent 40%, rgba(5,5,5,0.8) 100%)',
            }}
          />
          {/* Top/Bottom Gradient */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, rgba(5,5,5,0.6) 0%, transparent 30%, transparent 60%, rgba(5,5,5,0.95) 100%)',
            }}
          />
        </div>

        {/* Loading Progress (visible before loaded) */}
        {!loaded && (
          <div
            className="absolute bottom-12 left-6 md:left-12 text-[#8A8A8A] text-[11px] tracking-[0.2em] font-inter"
          >
            LOADING FRAMES — {loadProgress}%
          </div>
        )}

        {/* Hero Overlay Content */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            zIndex: 10,
            padding: '0 24px',
          }}
        >
          {/* Brand */}
          <div
            ref={titleRef}
            style={{ marginBottom: '24px' }}
          >
            <div
              style={{
                fontFamily: 'Inter',
                fontSize: '11px',
                letterSpacing: '0.5em',
                color: '#D6001C',
                textTransform: 'uppercase',
                marginBottom: '20px',
              }}
            >
              ── Bull Rocks Fitness ──
            </div>
            <h1
              className="font-display"
              style={{
                fontSize: 'clamp(4rem, 10vw, 10rem)',
                lineHeight: '0.9',
                color: '#ffffff',
                textShadow: '0 0 80px rgba(0,0,0,0.8)',
                letterSpacing: '-0.01em',
              }}
            >
              FORGED<br />
              THROUGH<br />
              <span className="gradient-text">DISCIPLINE.</span>
            </h1>
          </div>

          {/* Tagline */}
          <div
            ref={taglineRef}
            style={{
              fontFamily: 'Playfair Display',
              fontStyle: 'italic',
              fontSize: 'clamp(1rem, 2.5vw, 1.8rem)',
              color: 'rgba(255,255,255,0.7)',
              marginBottom: '16px',
              letterSpacing: '0.02em',
            }}
          >
            Train Beyond Limits.
          </div>

          {/* Subtext */}
          <div
            ref={subRef}
            style={{
              fontFamily: 'Inter',
              fontSize: '13px',
              letterSpacing: '0.15em',
              color: '#8A8A8A',
              textTransform: 'uppercase',
              marginBottom: '40px',
            }}
          >
            Elite Performance · Premium Facility · Expert Coaching
          </div>

          {/* CTAs */}
          <div
            ref={ctaRef}
            style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}
          >
            <button
              id="hero-cta-journey"
              className="btn-primary"
              onClick={() => {
                document.getElementById('membership')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span>Start Your Journey</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              id="hero-cta-trial"
              className="btn-outline"
              onClick={() => {
                document.getElementById('coaches')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Book A Free Trial
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          ref={scrollHintRef}
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            zIndex: 20,
          }}
        >
          <span
            style={{
              fontFamily: 'Inter',
              fontSize: '10px',
              letterSpacing: '0.3em',
              color: '#8A8A8A',
              textTransform: 'uppercase',
            }}
          >
            Scroll
          </span>
          <div
            style={{
              width: '1px',
              height: '60px',
              background: 'linear-gradient(to bottom, rgba(214,0,28,0.8), transparent)',
              animation: 'scrollPulse 2s ease-in-out infinite',
            }}
          />
          <style>{`
            @keyframes scrollPulse {
              0%, 100% { opacity: 0.4; transform: scaleY(1); }
              50% { opacity: 1; transform: scaleY(1.2); }
            }
          `}</style>
        </div>

        {/* Corner Stats */}
        <div className="absolute bottom-10 left-6 md:left-12 z-20 hidden sm:block">
          <div style={{ fontFamily: 'Inter', fontSize: '10px', letterSpacing: '0.25em', color: '#8A8A8A', textTransform: 'uppercase' }}>
            Est. 2018
          </div>
        </div>
        <div className="absolute bottom-10 right-6 md:right-12 z-20 text-right hidden sm:block">
          <div style={{ fontFamily: 'Inter', fontSize: '10px', letterSpacing: '0.25em', color: '#8A8A8A', textTransform: 'uppercase' }}>
            5000+ Members
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
