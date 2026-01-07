'use client';

import React, { useRef, useEffect, useState } from 'react';
import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring, 
  useMotionValue, 
  useMotionTemplate,
  AnimatePresence
} from 'framer-motion';

// --- Types ---

interface MousePosition {
  x: number;
  y: number;
}

// --- Constants ---

const PERSONAL_INFO = {
  name: 'JAGADISH S P',
  // Using a hash-like representation for the subtitle to fit the Bitcoin theme
  title: '0xBITCOIN_DEVELOPER', 
  status: 'SYSTEM ONLINE :: AVAILABLE FOR OPS'
};

// --- Components ---

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

  // Dynamic Background Gradients based on mouse
  const bgGradient = useMotionTemplate`radial-gradient(
    circle at ${useMotionValue(50).get() + smoothX.get() * 20}% ${useMotionValue(50).get() + smoothY.get() * 20}%,
    rgba(20, 20, 30, 0.4) 0%,
    rgba(0, 0, 0, 0.8) 60%
  )`;    
  
  // Tilt effect for the massive text
  const textRotateX = useTransform(smoothY, [-1, 1], [10, -10]);
  const textRotateY = useTransform(smoothX, [-1, 1], [-10, 10]);

  return (
    <motion.section
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

        {/* Massive Typography */}
        <div className="relative group perspective-text">
             <motion.h1
                ref={textRef}
                className="text-7xl md:text-9xl lg:text-[12rem] leading-none font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/50 select-none mix-blend-overlay"
                style={{
                    scale: titleScale,
                    opacity: titleOpacity,
                    rotateX: textRotateX,
                    rotateY: textRotateY,
                    transformStyle: 'preserve-3d',
                }}
             >
                {/* Character Stagger Effect */}
                {PERSONAL_INFO.name.split('').map((char, i) => (
                    <motion.span
                        key={i}
                        className="inline-block origin-bottom"
                        initial={{ y: 100, opacity: 0, rotateX: -90 }}
                        animate={{ y: 0, opacity: 1, rotateX: 0 }}
                        transition={{
                            duration: 1.2,
                            delay: i * 0.05,
                            ease: [0.215, 0.61, 0.355, 1] // cubic-bezier
                        }}
                    >
                        {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                ))}
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