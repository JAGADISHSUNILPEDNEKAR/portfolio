'use client';

import React, { useRef, useEffect, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionTemplate,
} from 'framer-motion';
import { SOCIAL_LINKS, PERSONAL_INFO as GLOBAL_PERSONAL_INFO } from '@/lib/constants';
import { ArrowRight, Download, Linkedin, Github, Twitter } from 'lucide-react';

// --- Types ---

interface MousePosition {
  x: number;
  y: number;
}

// --- Constants ---

const PERSONAL_INFO = {
  name: 'JAGADISH',
  title: '0xBITCOIN_DEVELOPER',
  status: 'SYSTEM ONLINE :: AVAILABLE FOR OPS'
};

const CHARS = "-_~`!@#$%^&*()+=[]{}|;:,.<>?/0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// --- Components ---

const ScrambleText = ({ text, className }: { text: string; className?: string }) => {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const scramble = () => {
    let iteration = 0;

    clearInterval(intervalRef.current as NodeJS.Timeout);

    intervalRef.current = setInterval(() => {
      setDisplayText((prev) =>
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(intervalRef.current as NodeJS.Timeout);
      }

      iteration += 1 / 3;
    }, 30);
  };

  useEffect(() => {
    scramble();
    return () => clearInterval(intervalRef.current as NodeJS.Timeout);
  }, [text]);

  const handleInteraction = () => {
    if (!isHovered) {
      setIsHovered(true);
      scramble();
      setTimeout(() => setIsHovered(false), 1000);
    }
  }

  return (
    <motion.span
      onHoverStart={handleInteraction}
      onClick={handleInteraction}
      className={className}
    >
      {displayText}
    </motion.span>
  );
};

const DigitalRain = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState<number[]>([]);

  useEffect(() => {
    // Calculate columns based on width
    const calculateColumns = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const colWidth = 40; // Approx width of a "block" column
      const numCols = Math.ceil(width / colWidth);
      setColumns(Array.from({ length: numCols }, (_, i) => i));
    };

    calculateColumns();
    window.addEventListener('resize', calculateColumns);
    return () => window.removeEventListener('resize', calculateColumns);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 select-none mix-blend-screen">
      {columns.map((i) => (
        <RainColumn key={i} index={i} />
      ))}
    </div>
  );
};

const RainColumn = ({ index }: { index: number }) => {
  // Randomize speed and start position
  const duration = Math.random() * 15 + 10;
  const delay = Math.random() * -20;

  return (
    <motion.div
      className="absolute top-0 text-[10px] font-mono leading-none text-green-500/40 writing-vertical-rl"
      style={{
        left: `${index * 40}px`,
        textOrientation: 'upright',
      }}
      animate={{
        y: ['-100%', '100%'],
        opacity: [0, 1, 0]
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        delay: delay,
        ease: 'linear'
      }}
    >
      {/* Abstract "hash" strings */}
      {Array.from({ length: 30 }).map((_, j) => (
        <span key={j} className="block py-1">
          {Math.random() > 0.5 ? '1' : '0'}
          {Math.random() > 0.8 ? 'x' : ''}
        </span>
      ))}
    </motion.div>
  );
};

const SocialLink = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="p-3 text-white/50 hover:text-emerald-400 hover:bg-white/5 rounded-xl transition-all duration-300 border border-transparent hover:border-emerald-500/20 backdrop-blur-sm group"
    whileHover={{ scale: 1.1, y: -2 }}
    whileTap={{ scale: 0.95 }}
    aria-label={label}
  >
    {React.cloneElement(icon as React.ReactElement<any>, { className: "w-5 h-5 transition-transform group-hover:rotate-12" })}
  </motion.a>
);

// --- Main Hero Component ---

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  // Motion Values for Mouse Physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for visceral feel
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 400, mass: 0.5 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 400, mass: 0.5 });

  // Scroll Transforms
  const { scrollY } = useScroll();
  const titleScale = useTransform(scrollY, [0, 500], [1, 1.5]);
  const titleOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const contentY = useTransform(scrollY, [0, 500], [0, 100]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    // Normalize -1 to 1
    const x = (clientX / innerWidth) * 2 - 1;
    const y = (clientY / innerHeight) * 2 - 1;

    mouseX.set(x);
    mouseY.set(y);
  };

  // Tilt effect for the massive text
  const textRotateX = useTransform(smoothY, [-1, 1], [10, -10]);
  const textRotateY = useTransform(smoothX, [-1, 1], [-10, 10]);

  return (
    <motion.section
      id="home"
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black text-white perspective-1000"
      onMouseMove={handleMouseMove}
      initial="initial"
      animate="animate"
      style={{
        perspective: "1000px" // Essential for 3D transforms
      }}
    >
      {/* 1. Background Layer: The Digital Forge */}
      <div className="absolute inset-0 z-0">
        {/* Deep noise texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}
        />

        {/* Animated Digital Rain */}
        <DigitalRain />

        {/* Dynamic Grid Floor */}
        <motion.div
          className="absolute -bottom-[50%] -left-[50%] w-[200%] h-[200%] opacity-20"
          style={{
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
            backgroundSize: '100px 100px',
            rotateX: "60deg",
            y: useTransform(scrollY, [0, 500], [0, 200])
          }}
          animate={{
            backgroundPosition: ['0px 0px', '0px 100px']
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Ambient Glow */}
        <motion.div
          className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_50%_50%,rgba(76,29,149,0.3)_0%,rgba(0,0,0,0)_50%)]"
          style={{
            x: useTransform(smoothX, [-1, 1], [-50, 50]),
            y: useTransform(smoothY, [-1, 1], [-50, 50]),
          }}
        />
      </div>

      {/* 2. Main Content Layer */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center w-full px-4"
        style={{ y: contentY }}
      >
        {/* System Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex items-center gap-3 px-4 py-2 mb-12 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
        >
          <div className="relative flex items-center justify-center w-2 h-2">
            <span className="absolute inline-flex w-full h-full rounded-full animate-ping bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-500"></span>
          </div>
          <span className="font-mono text-xs tracking-widest text-emerald-400/80 uppercase">
            {PERSONAL_INFO.status}
          </span>
        </motion.div>

        {/* Massive Typography - Scramble Effect */}
        <div className="relative group perspective-text text-center">
          <motion.h1
            ref={textRef}
            className="text-7xl md:text-9xl lg:text-[11rem] leading-none font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/50 select-none mix-blend-overlay cursor-pointer"
            style={{
              scale: titleScale,
              opacity: titleOpacity,
              rotateX: textRotateX,
              rotateY: textRotateY,
              transformStyle: 'preserve-3d',
            }}
          >
            <ScrambleText text={PERSONAL_INFO.name} />
          </motion.h1>

          {/* Subtitle / Hash */}
          <motion.div
            className="mt-8 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="relative">
              <motion.div
                className="absolute inset-0 bg-white mix-blend-exclusion"
                initial={{ scaleX: 1, originX: 0 }}
                animate={{ scaleX: 0, originX: 1 }}
                transition={{ duration: 0.8, delay: 1, ease: "circOut" }}
              />
              <h2 className="font-mono text-sm md:text-xl tracking-[0.5em] text-white/60">
                {PERSONAL_INFO.title}
              </h2>
            </div>
          </motion.div>
        </div>

        {/* Actions & Socials */}
        <motion.div
          className="mt-16 flex flex-col items-center gap-8 relative z-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-6">
            <motion.a
              href="#projects"
              className="group relative px-8 py-4 bg-white text-black font-bold font-mono tracking-wider uppercase overflow-hidden hover:scale-105 transition-transform duration-300 clip-path-slant"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-emerald-400 mix-blend-difference opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center gap-2">
                View My Work <ArrowRight className="w-4 h-4" />
              </span>
            </motion.a>

            <motion.a
              href={GLOBAL_PERSONAL_INFO.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="group px-8 py-4 border border-white/20 hover:bg-white/5 font-mono text-sm tracking-wider uppercase transition-all duration-300 hover:border-emerald-500/50 hover:text-emerald-400 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-2">
                Download Resume <Download className="w-4 h-4" />
              </span>
            </motion.a>
          </div>

          {/* Connect Status */}
          <div className="flex flex-col items-center gap-4 mt-8">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <span className="text-[10px] font-mono text-emerald-500/60 tracking-[0.3em] uppercase">Connect Uplink</span>

            <div className="flex gap-4 p-2 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-md">
              <SocialLink href={SOCIAL_LINKS.linkedin} icon={<Linkedin />} label="LinkedIn" />
              <SocialLink href={SOCIAL_LINKS.github} icon={<Github />} label="Portfolio (GitHub)" />
              <SocialLink href={SOCIAL_LINKS.twitter} icon={<Twitter />} label="X" />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* 3. Foreground Overlay (Glass & Steel Vignette) */}
      <div className="absolute inset-0 pointer-events-none z-20 border-[1px] border-white/5 m-4 md:m-8 rounded-3xl" />

      {/* Decorative Corners */}
      {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((corner) => (
        <div key={corner} className={`absolute w-8 h-8 border-white/20 z-20 m-4 md:m-8 transition-all duration-500
              ${corner === 'top-left' ? 'top-0 left-0 border-t border-l rounded-tl-3xl' : ''}
              ${corner === 'top-right' ? 'top-0 right-0 border-t border-r rounded-tr-3xl' : ''}
              ${corner === 'bottom-left' ? 'bottom-0 left-0 border-b border-l rounded-bl-3xl' : ''}
              ${corner === 'bottom-right' ? 'bottom-0 right-0 border-b border-r rounded-br-3xl' : ''}
          `} />
      ))}

    </motion.section>
  );
};

export default Hero;