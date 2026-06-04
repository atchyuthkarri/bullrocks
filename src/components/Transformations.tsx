import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Story {
  id: number;
  name: string;
  duration: string;
  weightLost?: string;
  strengthGain?: string;
  quote: string;
  beforeLabel: string;
  afterLabel: string;
  beforeGradient: string;
  afterGradient: string;
}

const stories: Story[] = [
  {
    id: 1,
    name: 'ARJUN SHARMA',
    duration: '6 Months',
    weightLost: '28 KG',
    strengthGain: '200%',
    quote: 'Bull Rocks didn\'t just change my body — it changed my entire identity.',
    beforeLabel: 'Before',
    afterLabel: 'After',
    beforeGradient: 'linear-gradient(135deg, #1a1a1a 0%, #2a1a1a 100%)',
    afterGradient: 'linear-gradient(135deg, #1a0a0a 0%, #D6001C 100%)',
  },
  {
    id: 2,
    name: 'PRIYA REDDY',
    duration: '4 Months',
    strengthGain: '150%',
    quote: 'The coaches here see your potential before you do.',
    beforeLabel: 'Before',
    afterLabel: 'After',
    beforeGradient: 'linear-gradient(135deg, #1a1a1a 0%, #1a1a2a 100%)',
    afterGradient: 'linear-gradient(135deg, #0a0a1a 0%, #FF3B4D 100%)',
  },
  {
    id: 3,
    name: 'VIKRAM PATEL',
    duration: '12 Months',
    weightLost: '15 KG',
    strengthGain: '300%',
    quote: 'From couch to competing. Bull Rocks made the impossible possible.',
    beforeLabel: 'Before',
    afterLabel: 'After',
    beforeGradient: 'linear-gradient(135deg, #111 0%, #222 100%)',
    afterGradient: 'linear-gradient(135deg, #1a0000 0%, #D6001C 100%)',
  },
];

const BASlider: React.FC<{ story: Story }> = ({ story }) => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMouseDown = () => { isDragging.current = true; };
  const handleMouseUp = () => { isDragging.current = false; };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setSliderPos(x * 100);
  };

  return (
    <div
      ref={containerRef}
      className="ba-slider"
      style={{
        width: '100%',
        height: '400px',
        userSelect: 'none',
        borderRadius: '0',
        position: 'relative',
        cursor: 'ew-resize',
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      {/* After (background full) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: story.afterGradient,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            fontFamily: 'Bebas Neue',
            fontSize: '6rem',
            color: 'rgba(255,255,255,0.1)',
            letterSpacing: '0.2em',
          }}
        >
          AFTER
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            fontFamily: 'Inter',
            fontSize: '10px',
            letterSpacing: '0.3em',
            color: 'rgba(255,255,255,0.4)',
            textTransform: 'uppercase',
          }}
        >
          After ✦
        </div>
      </div>

      {/* Before (clipped) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
          background: story.beforeGradient,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            fontFamily: 'Bebas Neue',
            fontSize: '6rem',
            color: 'rgba(255,255,255,0.1)',
            letterSpacing: '0.2em',
          }}
        >
          BEFORE
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '20px',
            fontFamily: 'Inter',
            fontSize: '10px',
            letterSpacing: '0.3em',
            color: 'rgba(255,255,255,0.4)',
            textTransform: 'uppercase',
          }}
        >
          Before ✦
        </div>
      </div>

      {/* Slider handle */}
      <div
        className="ba-slider-handle"
        style={{ left: `${sliderPos}%` }}
      />
    </div>
  );
};

const Transformations: React.FC = () => {
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

      gsap.from('.story-card', {
        opacity: 0,
        y: 60,
        stagger: 0.2,
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
      id="transformations"
      className="py-16 px-6 md:py-[120px] md:px-12 relative overflow-hidden"
      style={{ background: '#0D0D0D' }}
    >
      {/* Glow */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '800px',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(214,0,28,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
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
            Real Results
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
            TRANSFORMATION
            <br />
            <span style={{ color: '#D6001C' }}>STORIES.</span>
          </h2>
        </div>

        {/* Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
          {stories.map((story, i) => (
            <div
              key={story.id}
              className="story-card flex flex-col lg:grid lg:grid-cols-2 gap-[2px] bg-white/5 border border-white/5 overflow-hidden"
            >
              {/* Slider */}
              <div style={{ order: i % 2 === 0 ? 0 : 1 }}>
                <BASlider story={story} />
              </div>

              {/* Info */}
              <div
                className="p-8 md:p-12 flex flex-col justify-center bg-[#0D0D0D]"
                style={{
                  order: i % 2 === 0 ? 1 : 0,
                }}
              >
                <div
                  style={{
                    fontFamily: 'Inter',
                    fontSize: '11px',
                    letterSpacing: '0.3em',
                    color: '#D6001C',
                    textTransform: 'uppercase',
                    marginBottom: '16px',
                  }}
                >
                  {story.duration} Transformation
                </div>
                <div
                  className="font-display"
                  style={{
                    fontSize: '2.5rem',
                    color: '#ffffff',
                    letterSpacing: '0.1em',
                    marginBottom: '24px',
                  }}
                >
                  {story.name}
                </div>
                <p
                  style={{
                    fontFamily: 'Playfair Display',
                    fontStyle: 'italic',
                    fontSize: '1.2rem',
                    color: 'rgba(255,255,255,0.6)',
                    lineHeight: '1.7',
                    marginBottom: '32px',
                  }}
                >
                  "{story.quote}"
                </p>

                <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
                  {story.weightLost && (
                    <div>
                      <div
                        style={{
                          fontFamily: 'Bebas Neue',
                          fontSize: '2.5rem',
                          color: '#D6001C',
                          lineHeight: '1',
                        }}
                      >
                        {story.weightLost}
                      </div>
                      <div
                        style={{
                          fontFamily: 'Inter',
                          fontSize: '10px',
                          letterSpacing: '0.25em',
                          color: '#8A8A8A',
                          textTransform: 'uppercase',
                          marginTop: '4px',
                        }}
                      >
                        Lost
                      </div>
                    </div>
                  )}
                  {story.strengthGain && (
                    <div>
                      <div
                        style={{
                          fontFamily: 'Bebas Neue',
                          fontSize: '2.5rem',
                          color: '#FF3B4D',
                          lineHeight: '1',
                        }}
                      >
                        {story.strengthGain}
                      </div>
                      <div
                        style={{
                          fontFamily: 'Inter',
                          fontSize: '10px',
                          letterSpacing: '0.25em',
                          color: '#8A8A8A',
                          textTransform: 'uppercase',
                          marginTop: '4px',
                        }}
                      >
                        Strength Gain
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Transformations;
