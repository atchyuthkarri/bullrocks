import { useEffect, useRef, useState, Suspense, lazy } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import './index.css';

// Eager load critical components
import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';
import ParticleField from './components/ParticleField';
import Navigation from './components/Navigation';
import Hero from './components/Hero';

// Lazy load below-fold sections
const Philosophy = lazy(() => import('./components/Philosophy'));
const PerformanceEcosystem = lazy(() => import('./components/PerformanceEcosystem'));
const WhyBullRocks = lazy(() => import('./components/WhyBullRocks'));
const Transformations = lazy(() => import('./components/Transformations'));
const EliteCoaches = lazy(() => import('./components/EliteCoaches'));
const Membership = lazy(() => import('./components/Membership'));
const FacilityShowcase = lazy(() => import('./components/FacilityShowcase'));
const FitnessJourney = lazy(() => import('./components/FitnessJourney'));
const FinalCTA = lazy(() => import('./components/FinalCTA'));
const Footer = lazy(() => import('./components/Footer'));

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [loading, setLoading] = useState(true);
  const lenisRef = useRef<Lenis | null>(null);

  // ── Lenis Smooth Scroll ────────────────────────────────
  useEffect(() => {
    if (loading) return;

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [loading]);

  const handleLoaderComplete = () => {
    setLoading(false);
  };

  return (
    <>
      {/* Custom cursor */}
      <CustomCursor />

      {/* Atmospheric particles (fixed, behind everything) */}
      <ParticleField />

      {/* Loading screen */}
      {loading && <Loader onComplete={handleLoaderComplete} />}

      {/* Main site */}
      <div
        style={{
          opacity: loading ? 0 : 1,
          transition: 'opacity 0.8s ease',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <Navigation />

        <main>
          <Hero />

          <Suspense fallback={<div style={{ height: '100vh', background: '#050505' }} />}>
            <Philosophy />
          </Suspense>

          <Suspense fallback={<div style={{ height: '100vh', background: '#0D0D0D' }} />}>
            <PerformanceEcosystem />
          </Suspense>

          <Suspense fallback={<div style={{ height: '100vh', background: '#050505' }} />}>
            <WhyBullRocks />
          </Suspense>

          <Suspense fallback={<div style={{ height: '100vh', background: '#0D0D0D' }} />}>
            <Transformations />
          </Suspense>

          <Suspense fallback={<div style={{ height: '100vh', background: '#050505' }} />}>
            <EliteCoaches />
          </Suspense>

          <Suspense fallback={<div style={{ height: '100vh', background: '#0D0D0D' }} />}>
            <Membership />
          </Suspense>

          <Suspense fallback={<div style={{ height: '100vh', background: '#050505' }} />}>
            <FacilityShowcase />
          </Suspense>

          <Suspense fallback={<div style={{ height: '100vh', background: '#0D0D0D' }} />}>
            <FitnessJourney />
          </Suspense>

          <Suspense fallback={<div style={{ height: '100vh', background: '#050505' }} />}>
            <FinalCTA />
          </Suspense>
        </main>

        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    </>
  );
}

export default App;
