'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Types
interface MousePosition {
  x: number;
  y: number;
}

interface ParticlePosition {
  x: number;
  y: number;
  id: number;
}

interface PersonalInfo {
  name: string;
  title: string;
  subtitle: string;
  resumeUrl: string;
}

interface SocialLinks {
  github: string;
  linkedin: string;
  twitter: string;
}

// Constants
const PERSONAL_INFO: PersonalInfo = {
  name: 'Creative Developer',
  title: 'Full Stack Developer',
  subtitle: 'Crafting exceptional digital experiences with modern technologies, turning complex problems into elegant solutions.',
  resumeUrl: '/resume.pdf'
};

const SOCIAL_LINKS: SocialLinks = {
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
  twitter: 'https://twitter.com'
};

// Fixed particle positions to avoid hydration issues
const PARTICLE_POSITIONS: ParticlePosition[] = [
  { x: 100, y: 150, id: 1 }, { x: 300, y: 250, id: 2 }, { x: 500, y: 100, id: 3 },
  { x: 700, y: 300, id: 4 }, { x: 900, y: 200, id: 5 }, { x: 1100, y: 350, id: 6 },
  { x: 200, y: 400, id: 7 }, { x: 800, y: 450, id: 8 }, { x: 1200, y: 180, id: 9 },
  { x: 400, y: 320, id: 10 }, { x: 600, y: 280, id: 11 }, { x: 1000, y: 380, id: 12 },
  { x: 150, y: 500, id: 13 }, { x: 750, y: 120, id: 14 }, { x: 1150, y: 420, id: 15 }
];

const Hero: React.FC = () => {
  // State
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // Refs
  const containerRef = useRef<HTMLElement>(null);
  const mouseGlowRef = useRef<HTMLDivElement>(null);

  // Framer Motion scroll hooks
  const { scrollY } = useScroll();
  const yTransform = useTransform(scrollY, [0, 300], [0, 50]);
  const opacityTransform = useTransform(scrollY, [0, 300], [1, 0.3]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      filter: 'blur(10px)'
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { 
        duration: 0.8, 
        ease: [0.21, 0.47, 0.32, 0.98]
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: -90
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.21, 0.47, 0.32, 0.98]
      }
    }
  };

  // Mouse move handler
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const newPosition: MousePosition = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };

    setMousePosition(newPosition);
  }, []);

  // Smooth scroll handler
  const handleSmoothScroll = useCallback((targetId: string) => {
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, []);

  // Effects
  useEffect(() => {
    setIsClient(true);
    setIsVisible(true);

    // Intersection Observer for entrance animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Particle component
  const Particle: React.FC<{ position: ParticlePosition; index: number }> = React.memo(({ position, index }) => (
    <motion.div
      className="absolute w-1 h-1 bg-white/30 rounded-full"
      initial={{ x: position.x, y: position.y, opacity: 0 }}
      animate={{
        x: [position.x, position.x + (index % 2 === 0 ? 30 : -30), position.x],
        y: [position.y, position.y + (index % 3 === 0 ? 20 : -20), position.y],
        opacity: [0, 0.8, 0]
      }}
      transition={{
        duration: 8 + (index % 4) * 2,
        repeat: Infinity,
        ease: 'linear',
        delay: index * 0.3,
      }}
    />
  ));

  return (
    <motion.section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #533a7d 100%)'
      }}
      onMouseMove={handleMouseMove}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(147,51,234,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(147,51,234,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black_40%,transparent)]" />
        
        {/* Mouse Glow Effect */}
        {isClient && (
          <motion.div
            ref={mouseGlowRef}
            className="absolute pointer-events-none w-96 h-96 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(147,51,234,0.15) 0%, rgba(236,72,153,0.1) 30%, transparent 70%)',
              transform: 'translate(-50%, -50%)',
              left: mousePosition.x,
              top: mousePosition.y,
            }}
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}

        {/* Floating Orbs */}
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"
          style={{ y: yTransform }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div
          className="absolute bottom-20 right-20 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl"
          style={{ y: useTransform(scrollY, [0, 300], [0, -30]) }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500/8 rounded-full blur-3xl"
          style={{ 
            x: useTransform(scrollY, [0, 300], [-50, -80]),
            y: useTransform(scrollY, [0, 300], [-50, -20])
          }}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Floating Particles */}
      {isClient && (
        <div className="absolute inset-0 pointer-events-none">
          {PARTICLE_POSITIONS.map((position, index) => (
            <Particle key={position.id} position={position} index={index} />
          ))}
        </div>
      )}

      {/* Main Content */}
      <motion.div 
        className="container mx-auto px-6 relative z-10"
        style={{ opacity: opacityTransform }}
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Left Column - Text Content */}
          <motion.div
            variants={containerVariants}
            className="space-y-8 text-center lg:text-left"
          >
            {/* Status Badge */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white/80 text-sm">
                <motion.svg 
                  className="w-4 h-4" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z"/>
                </motion.svg>
                <span>Open for opportunities</span>
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.div variants={titleVariants} className="space-y-2">
              <motion.h1 className="text-5xl lg:text-7xl xl:text-8xl font-bold leading-tight">
                <motion.div variants={wordVariants} className="block">
                  <span className="text-white">Creative</span>
                </motion.div>
                <motion.div variants={wordVariants} className="block">
                  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                    Developer
                  </span>
                </motion.div>
              </motion.h1>
            </motion.div>

            {/* Subtitle */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h2 className="text-xl lg:text-2xl font-semibold text-blue-300">
                {PERSONAL_INFO.title}
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
                {PERSONAL_INFO.subtitle}
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <motion.button
                onClick={() => handleSmoothScroll('projects')}
                className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl font-semibold text-white overflow-hidden transition-all duration-300"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 0 40px rgba(147,51,234,0.5)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  View My Work
                  <motion.svg 
                    className="w-5 h-5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </motion.svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>
              
              <motion.a
                href={PERSONAL_INFO.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group px-8 py-4 border-2 border-white/20 rounded-2xl font-semibold text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300 flex items-center justify-center gap-2"
                whileHover={{ 
                  scale: 1.05,
                  borderColor: 'rgba(147,51,234,0.5)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </motion.svg>
                Download Resume
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="flex items-center gap-6 pt-4 justify-center lg:justify-start">
              <p className="text-gray-400 text-sm">Find me on:</p>
              <div className="flex gap-4">
                {Object.entries(SOCIAL_LINKS).map(([platform, url]) => (
                  <motion.a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-purple-400 backdrop-blur-sm transition-all duration-300"
                    whileHover={{ 
                      scale: 1.1,
                      backgroundColor: 'rgba(147,51,234,0.1)',
                      borderColor: 'rgba(147,51,234,0.3)'
                    }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={`${platform} profile`}
                  >
                    <span className="text-sm font-medium capitalize">{platform.charAt(0)}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Profile Image Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Rotating Border */}
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full blur-2xl opacity-30"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Profile Container */}
              <div className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-white/20 bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-blue-600/20 backdrop-blur-sm">
                {/* Placeholder Content */}
                <div className="w-full h-full flex items-center justify-center">
                  <motion.div
                    className="text-6xl lg:text-8xl font-bold text-white/20"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    CD
                  </motion.div>
                </div>
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-transparent to-pink-900/20" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.button
            onClick={() => handleSmoothScroll('about')}
            className="flex flex-col items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300 group"
            aria-label="Scroll to about section"
            whileHover={{ y: -2 }}
          >
            <span className="text-sm font-medium">Scroll Down</span>
            <motion.div
              className="w-6 h-10 border-2 border-current rounded-full flex justify-center p-1"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className="w-1 h-3 bg-current rounded-full"
                animate={{ 
                  y: [0, 8, 0],
                  opacity: [1, 0, 1]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

// Optimize re-renders
Hero.displayName = 'Hero';

export default React.memo(Hero);