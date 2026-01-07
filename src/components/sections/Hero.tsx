'use client';

import React, { useRef, useEffect, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from 'framer-motion';
import { SOCIAL_LINKS, PERSONAL_INFO as GLOBAL_PERSONAL_INFO } from '@/lib/constants';
import { ArrowRight, Download, Linkedin, Github, Twitter } from 'lucide-react';
import InteractiveBackground from '@/components/ui/InteractiveBackground';
import Magnetic from '@/components/ui/Magnetic';

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
            if (index < iteration) return text[index];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) clearInterval(intervalRef.current as NodeJS.Timeout);
      iteration += 1 / 2; // Faster scramble
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
  };

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

// --- Glitch Title Component ---
const GlitchTitle = ({ text }: { text: string }) => {
  return (
    <div className="relative group perspective-text text-center cursor-default">
      <div className="absolute top-0 left-0 w-full h-full text-7xl md:text-9xl lg:text-[11rem] leading-none font-black tracking-tighter text-red-500 opacity-0 group-hover:opacity-70 group-hover:animate-glitch-1 mix-blend-screen select-none pointer-events-none transform translate-x-[2px]">
        {text}
      </div>
      <div className="absolute top-0 left-0 w-full h-full text-7xl md:text-9xl lg:text-[11rem] leading-none font-black tracking-tighter text-blue-500 opacity-0 group-hover:opacity-70 group-hover:animate-glitch-2 mix-blend-screen select-none pointer-events-none transform -translate-x-[2px]">
        {text}
      </div>
      <h1 className="relative text-7xl md:text-9xl lg:text-[11rem] leading-none font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/50 select-none mix-blend-overlay z-10">
        <ScrambleText text={text} />
      </h1>
    </div>
  );
};


const SocialLink = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => (
  <Magnetic>
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-3 text-white/50 hover:text-emerald-400 hover:bg-white/5 rounded-full transition-all duration-300 border border-transparent hover:border-emerald-500/20 backdrop-blur-sm"
      aria-label={label}
    >
      {React.cloneElement(icon as React.ReactElement<any>, { className: "w-5 h-5 transition-transform" })}
    </a>
  </Magnetic>
);

// --- Main Hero Component ---

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);

  // Motion Values for Mouse Physics (Parallax)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 400, mass: 0.5 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 400, mass: 0.5 });

  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth) * 2 - 1;
    const y = (clientY / innerHeight) * 2 - 1;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <motion.section
      id="home"
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black text-white"
      onMouseMove={handleMouseMove}
      initial="initial"
      animate="animate"
    >
      {/* 1. Background Layer */}
      <div className="absolute inset-0 z-0">
        <InteractiveBackground />

        {/* Deep noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}
        />
        {/* Radial gradient for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />
      </div>

      {/* 2. Main Content Layer */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center w-full px-4"
        style={{ y: contentY, opacity }}
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

        {/* Glitch Title */}
        <motion.div
          style={{
            x: useTransform(smoothX, [-1, 1], [-20, 20]),
            y: useTransform(smoothY, [-1, 1], [-20, 20]),
          }}
        >
          <GlitchTitle text={PERSONAL_INFO.name} />
        </motion.div>

        {/* Subtitle */}
        <motion.div
          className="mt-8 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="relative inline-block group">
            <span className="font-mono text-sm md:text-xl tracking-[0.5em] text-white/60 group-hover:text-emerald-400 transition-colors duration-300">
              {PERSONAL_INFO.title}
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-emerald-400 group-hover:w-full transition-all duration-500 ease-out"></span>
          </div>
        </motion.div>


        {/* Actions & Socials */}
        <motion.div
          className="mt-20 flex flex-col items-center gap-10 relative z-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-8">
            <Magnetic>
              <a
                href="#projects"
                className="relative px-8 py-4 bg-white text-black font-bold font-mono tracking-wider uppercase overflow-hidden hover:scale-105 transition-transform duration-300 group rounded-full"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View My Work <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-emerald-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 z-0" />
              </a>
            </Magnetic>

            <Magnetic>
              <a
                href={GLOBAL_PERSONAL_INFO.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 border border-white/20 hover:bg-white/5 font-mono text-sm tracking-wider uppercase transition-all duration-300 hover:border-emerald-500/50 hover:text-emerald-400 backdrop-blur-sm rounded-full flex items-center gap-2 group"
              >
                Download Resume <Download className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </a>
            </Magnetic>
          </div>

          {/* Socials */}
          <div className="flex gap-6 mt-4">
            <SocialLink href={SOCIAL_LINKS.linkedin} icon={<Linkedin />} label="LinkedIn" />
            <SocialLink href={SOCIAL_LINKS.github} icon={<Github />} label="Portfolio (GitHub)" />
            <SocialLink href={SOCIAL_LINKS.twitter} icon={<Twitter />} label="X" />
          </div>
        </motion.div>

      </motion.div>

      {/* Vignette & Grain Overlay (Foreground) */}
      <div className="absolute inset-0 pointer-events-none z-20"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%)'
        }}
      />

    </motion.section>
  );
};

export default Hero;