// src/hooks/useBackgroundAnimation.ts
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const useBackgroundAnimation = (theme: any) => {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bgRef.current) return;

    // Animated gradient mesh
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    
    tl.to(bgRef.current, {
      backgroundPosition: '100% 100%',
      duration: 20,
      ease: 'none',
    });

    // Floating particles
    const particles = bgRef.current.querySelectorAll('.particle');
    particles.forEach((particle, i) => {
      gsap.to(particle, {
        y: 'random(-100, 100)',
        x: 'random(-100, 100)',
        rotation: 'random(-180, 180)',
        duration: 'random(10, 20)',
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: i * 0.5,
      });
    });

    return () => {
      tl.kill();
    };
  }, [theme]);

  return bgRef;
};