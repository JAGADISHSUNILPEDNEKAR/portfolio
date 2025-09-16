'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';

// Types
interface MousePosition {
  x: number;
  y: number;
}

interface ParticlePosition {
  x: number;
  y: number;
  id: number;
  size: number;
  delay: number;
}

// Constants
const PERSONAL_INFO = {
  name: 'Creative Developer',
  title: 'Full Stack Developer',
  subtitle: 'Crafting exceptional digital experiences with modern technologies, turning complex problems into elegant solutions.',
  resumeUrl: '/resume.pdf'
};

const SOCIAL_LINKS = {
  github: 'https://github.com/yourusername',
  linkedin: 'https://linkedin.com/in/yourusername',
  twitter: 'https://twitter.com/yourusername'
};

const PARTICLE_POSITIONS: ParticlePosition[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  x: Math.random() * 1200,
  y: Math.random() * 600,
  size: Math.random() * 3 + 1,
  delay: Math.random() * 5
}));

const DYNAMIC_WORDS = ['Code', 'Design', 'Create', 'Build', 'Innovate'];

const Hero: React.FC = () => {
  // State
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState<boolean>(false);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [showLogo, setShowLogo] = useState<boolean>(true);

  // Refs
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 25, stiffness: 150 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 150 });

  // Scroll transforms
  const { scrollY } = useScroll();
  const yTransform = useTransform(scrollY, [0, 400], [0, 100]);
  const opacityTransform = useTransform(scrollY, [0, 300], [1, 0.7]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      filter: 'blur(8px)'
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { 
        duration: 0.8, 
        ease: [0.21, 0.47, 0.32, 0.98] as any
      }
    }
  };

  const splitTextVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.5
      }
    }
  };

  // Enhanced mouse move handler
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const newX = e.clientX - rect.left;
    const newY = e.clientY - rect.top;

    setMousePosition({ x: newX, y: newY });
    mouseX.set(newX);
    mouseY.set(newY);

    // Magnetic effect for profile image
    if (profileRef.current) {
      const profileRect = profileRef.current.getBoundingClientRect();
      const profileCenterX = profileRect.left + profileRect.width / 2 - rect.left;
      const profileCenterY = profileRect.top + profileRect.height / 2 - rect.top;
      
      const distance = Math.sqrt(
        Math.pow(newX - profileCenterX, 2) + Math.pow(newY - profileCenterY, 2)
      );
      
      if (distance < 200) {
        const magnetStrength = (200 - distance) / 200;
        const magnetX = (newX - profileCenterX) * magnetStrength * 0.1;
        const magnetY = (newY - profileCenterY) * magnetStrength * 0.1;
        
        profileRef.current.style.transform = `translate(${magnetX}px, ${magnetY}px) rotateY(${magnetX * 0.1}deg) rotateX(${-magnetY * 0.1}deg)`;
      } else {
        profileRef.current.style.transform = 'translate(0px, 0px) rotateY(0deg) rotateX(0deg)';
      }
    }
  }, [mouseX, mouseY]);

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

  // GSAP animations
  useEffect(() => {
    if (!titleRef.current) return;

    const ctx = gsap.context(() => {
      // Split text animation
      const text = titleRef.current!.innerText;
      const chars = text.split('').map((char) => 
        `<span class="char" style="display: inline-block">${char === ' ' ? '&nbsp;' : char}</span>`
      );
      titleRef.current!.innerHTML = chars.join('');

      gsap.fromTo(
        '.char',
        {
          opacity: 0,
          y: 100,
          rotateX: -90,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1,
          stagger: 0.02,
          ease: 'back.out(1.7)',
          delay: 0.5,
        }
      );

      // Floating elements
      gsap.to('.floating-element', {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        stagger: {
          each: 0.2,
          from: 'random',
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Mouse parallax effect
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.particle', {
        x: mousePosition.x * 0.02,
        y: mousePosition.y * 0.02,
        duration: 1,
        ease: 'power2.out',
        stagger: {
          amount: 0.5,
          from: 'center',
        },
      });
    });

    return () => ctx.revert();
  }, [mousePosition]);

  // Setup effects
  useEffect(() => {
    setIsClient(true);

    // Hide logo after 3 seconds
    const logoTimer = setTimeout(() => {
      setShowLogo(false);
    }, 3000);

    // Rotating words
    const wordInterval = setInterval(() => {
      setCurrentWordIndex(prev => (prev + 1) % DYNAMIC_WORDS.length);
    }, 3000);

    return () => {
      clearTimeout(logoTimer);
      clearInterval(wordInterval);
    };
  }, []);

  // Enhanced Particle component with display name
  const EnhancedParticle: React.FC<{ particle: ParticlePosition; index: number }> = React.memo(function EnhancedParticle({ particle, index }) {
    return (
      <motion.div
        className="particle absolute rounded-full bg-gradient-to-r from-purple-400/40 via-pink-400/30 to-blue-400/40 backdrop-blur-sm"
        style={{
          width: particle.size * 2,
          height: particle.size * 2,
        }}
        initial={{ 
          x: particle.x, 
          y: particle.y, 
          opacity: 0,
          scale: 0 
        }}
        animate={{
          x: [
            particle.x,
            particle.x + (index % 3 === 0 ? 100 : -80),
            particle.x + (index % 2 === 0 ? -60 : 120),
            particle.x
          ],
          y: [
            particle.y,
            particle.y + (index % 4 === 0 ? 80 : -100),
            particle.y + (index % 3 === 0 ? -40 : 90),
            particle.y
          ],
          opacity: [0, 0.8, 0.4, 0],
          scale: [0, 1, 0.8, 0]
        }}
        transition={{
          duration: 15 + (index % 6) * 3,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: particle.delay,
        }}
      />
    );
  });

  // Magnetic Button component with proper type
  const MagneticButton: React.FC<{
    children: React.ReactNode;
    onClick?: () => void;
    href?: string;
    variant?: 'primary' | 'secondary';
    className?: string;
  }> = ({ children, onClick, href, variant = 'primary', className = '' }) => {
    const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent) => {
      if (!buttonRef.current) return;
      
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      buttonRef.current.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    };

    const handleMouseLeave = () => {
      if (buttonRef.current) {
        buttonRef.current.style.transform = 'translate(0px, 0px)';
      }
      setIsHovered(false);
    };

    const baseClasses = variant === 'primary'
      ? 'group relative px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-2xl font-semibold text-white overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(147,51,234,0.5)]'
      : 'group relative px-8 py-4 border-2 border-white/20 rounded-2xl font-semibold text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-500 hover:scale-105';

    const Component = href ? motion.a : motion.button;
    
    return (
      <Component
        ref={buttonRef as React.RefObject<HTMLButtonElement & HTMLAnchorElement>}
        {...(href ? { href, target: '_blank', rel: 'noopener noreferrer' } : { onClick })}
        className={`${baseClasses} ${className}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {variant === 'primary' && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-pink-400/20 to-blue-400/20"
            initial={{ x: '-100%' }}
            animate={{ x: isHovered ? '100%' : '-100%' }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          />
        )}
        <span className="relative z-10 flex items-center justify-center gap-2">
          {children}
        </span>
      </Component>
    );
  };

  return (
    <motion.section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950"
      style={{
        y: yTransform,
        opacity: opacityTransform,
      }}
      onMouseMove={handleMouseMove}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        {/* Gradient Mesh */}
        <div className="absolute inset-0 opacity-30">
          <div 
            className="floating-element absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl"
            style={{ animation: 'float 8s ease-in-out infinite' }}
          />
          <div 
            className="floating-element absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl"
            style={{ animation: 'float 10s ease-in-out infinite 2s' }}
          />
          <div 
            className="floating-element absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl"
            style={{ animation: 'float 12s ease-in-out infinite 4s' }}
          />
        </div>

        {/* Dynamic Mouse Glow */}
        {isClient && (
          <motion.div
            className="absolute pointer-events-none w-[600px] h-[600px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(147,51,234,0.15) 0%, rgba(236,72,153,0.1) 40%, transparent 70%)',
              transform: 'translate(-50%, -50%)',
              x: springX,
              y: springY,
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}

        {/* Particle System */}
        {isClient && (
          <div className="absolute inset-0 pointer-events-none">
            {PARTICLE_POSITIONS.map((particle, index) => (
              <EnhancedParticle key={particle.id} particle={particle} index={index} />
            ))}
          </div>
        )}

        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(rgba(147,51,234,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(147,51,234,0.5) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
            maskImage: 'radial-gradient(ellipse 80% 50% at 50% 50%, black 40%, transparent 100%)'
          }}
        />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          {/* Left Column - Text Content */}
          <motion.div
            variants={containerVariants}
            className="space-y-10 text-center lg:text-left"
          >
            {/* Status Badge */}
            <motion.div variants={itemVariants}>
              <motion.div 
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-purple-400/30 bg-white/5 backdrop-blur-md text-white/90 text-sm font-medium"
                whileHover={{ 
                  scale: 1.05,
                  borderColor: 'rgba(147,51,234,0.5)',
                  backgroundColor: 'rgba(147,51,234,0.1)'
                }}
              >
                <motion.div
                  className="w-2 h-2 bg-green-400 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [1, 0.5, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <span>Available for projects</span>
              </motion.div>
            </motion.div>

            {/* Dynamic Main Heading */}
            <motion.div variants={splitTextVariants} className="space-y-4">
              <motion.h1 className="text-5xl lg:text-7xl xl:text-8xl font-bold leading-tight">
                <motion.div className="block mb-2">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={DYNAMIC_WORDS[currentWordIndex]}
                      className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
                      initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
                      transition={{ duration: 0.5, ease: 'easeInOut' }}
                    >
                      {DYNAMIC_WORDS[currentWordIndex]}
                    </motion.span>
                  </AnimatePresence>
                </motion.div>
                <motion.div ref={titleRef} className="block text-white">
                  {PERSONAL_INFO.name}
                </motion.div>
              </motion.h1>
            </motion.div>

            {/* Subtitle */}
            <motion.div variants={itemVariants} className="space-y-6">
              <motion.h2 
                className="text-xl lg:text-2xl font-semibold text-blue-300"
                whileHover={{ color: '#60a5fa' }}
              >
                {PERSONAL_INFO.title}
              </motion.h2>
              <motion.p 
                className="text-lg text-gray-300 max-w-2xl leading-relaxed"
                whileHover={{ color: '#d1d5db' }}
              >
                {PERSONAL_INFO.subtitle}
              </motion.p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
              <MagneticButton
                onClick={() => handleSmoothScroll('projects')}
                variant="primary"
              >
                View My Work
                <motion.svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  whileHover={{ x: 5, scale: 1.1 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </motion.svg>
              </MagneticButton>
              
              <MagneticButton
                href={PERSONAL_INFO.resumeUrl}
                variant="secondary"
              >
                <motion.svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  whileHover={{ y: -3, scale: 1.1 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </motion.svg>
                Download Resume
              </MagneticButton>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="flex items-center gap-8 pt-6 justify-center lg:justify-start">
              <motion.p 
                className="text-gray-400 text-sm font-medium"
                whileHover={{ color: '#9ca3af' }}
              >
                Connect with me:
              </motion.p>
              <div className="flex gap-4">
                {Object.entries(SOCIAL_LINKS).map(([platform, url]) => (
                  <motion.a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-purple-400 backdrop-blur-sm transition-all duration-300 overflow-hidden"
                    whileHover={{ 
                      scale: 1.15,
                      backgroundColor: 'rgba(147,51,234,0.1)',
                      borderColor: 'rgba(147,51,234,0.4)'
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <span className="text-sm font-bold capitalize">{platform.charAt(0)}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Profile Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ delay: 0.8, duration: 1.2, ease: [0.21, 0.47, 0.32, 0.98] as any }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Animated Border Ring */}
              <motion.div
                className="absolute -inset-6 rounded-full"
                style={{
                  background: 'conic-gradient(from 0deg, #8b5cf6, #ec4899, #06b6d4, #10b981, #8b5cf6)',
                }}
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute inset-2 rounded-full bg-black/90 backdrop-blur-xl" />
              </motion.div>
              
              {/* Profile Container */}
              <motion.div
                ref={profileRef}
                className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden bg-gradient-to-br from-purple-600/30 via-pink-600/20 to-blue-600/30 backdrop-blur-sm border border-white/20"
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 10,
                  rotateX: -5,
                  transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as any }
                }}
                style={{
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.3s ease-out'
                }}
              >
                {/* Profile Image Placeholder */}
                <div className="relative w-full h-full flex items-center justify-center">
                  <motion.div
                    className="text-6xl lg:text-8xl font-bold text-white/30"
                    animate={{ 
                      scale: [1, 1.05, 1],
                      opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  >
                    CD
                  </motion.div>
                  
                  {/* Inner Glow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 via-transparent to-pink-900/30" />
                  
                  {/* Scanning Line Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-400/20 to-transparent h-8"
                    animate={{
                      y: ['-2rem', 'calc(100% + 2rem)'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      repeatDelay: 2
                    }}
                  />
                </div>
              </motion.div>

              {/* Logo Overlay Animation */}
              <AnimatePresence>
                {showLogo && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0, rotate: -10, filter: 'blur(10px)' }}
                    animate={{ scale: 1, opacity: 1, rotate: 0, filter: 'blur(0px)' }}
                    exit={{ scale: 0.9, opacity: 0, y: -20, filter: 'blur(8px)' }}
                    transition={{ duration: 1.2, ease: [0.21, 0.47, 0.32, 0.98] as any }}
                    className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md rounded-full border border-purple-400/30"
                  >
                    <motion.div
                      className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
                      animate={{
                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'linear'
                      }}
                      style={{
                        backgroundSize: '200% 200%'
                      }}
                    >
                      CD
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.button
            onClick={() => handleSmoothScroll('about')}
            className="group flex flex-col items-center gap-3 text-gray-400 hover:text-white transition-colors duration-500"
            whileHover={{ y: -5 }}
          >
            <motion.span 
              className="text-sm font-medium tracking-wider"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              EXPLORE MORE
            </motion.span>
            
            <motion.div
              className="w-12 h-20 border-2 border-current rounded-full flex justify-center items-end p-2"
              animate={{ 
                borderColor: ['rgba(156, 163, 175, 0.4)', 'rgba(147, 51, 234, 0.8)', 'rgba(156, 163, 175, 0.4)']
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <motion.div
                className="w-2 h-6 bg-gradient-to-b from-purple-400 to-pink-500 rounded-full"
                animate={{ 
                  y: [0, 8, 0],
                  scaleY: [1, 1.3, 1],
                  opacity: [0.8, 1, 0.8]
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
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          33% {
            transform: translateY(-30px) translateX(20px);
          }
          66% {
            transform: translateY(20px) translateX(-20px);
          }
        }
      `}</style>
    </motion.section>
  );
};

export default React.memo(Hero);