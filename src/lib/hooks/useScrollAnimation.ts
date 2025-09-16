import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const useScrollAnimation = (
  animationConfig?: {
    duration?: number;
    delay?: number;
    y?: number;
    opacity?: number;
    scale?: number;
    stagger?: number;
  }
) => {
  const ref = useRef<HTMLDivElement>(null);
  const childrenRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    if (!ref.current) return;

    const config = {
      duration: 1,
      delay: 0,
      y: 50,
      opacity: 0,
      scale: 1,
      stagger: 0.1,
      ...animationConfig,
    };

    const ctx = gsap.context(() => {
      // Animate the main container
      gsap.fromTo(
        ref.current,
        {
          opacity: config.opacity,
          y: config.y,
          scale: config.scale === 1 ? 1 : 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: config.duration,
          delay: config.delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Animate children if they exist
      if (childrenRef.current.length > 0) {
        gsap.fromTo(
          childrenRef.current,
          {
            opacity: 0,
            y: 30,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: config.stagger,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 70%',
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, [animationConfig]);

  return { ref, childrenRef };
};

export const useParallaxBackground = () => {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bgRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        yPercent: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: bgRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return bgRef;
};

export const useTextReveal = () => {
  const textRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const ctx = gsap.context(() => {
      const chars = gsap.utils.toArray('.char') as HTMLElement[];
      
      gsap.fromTo(
        chars,
        {
          opacity: 0,
          y: 100,
          rotateX: -90,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          stagger: 0.02,
          duration: 1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 75%',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return textRef;
};