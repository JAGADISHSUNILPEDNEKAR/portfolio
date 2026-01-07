'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SECTION_THEMES } from '@/lib/constants';
import { SKILLS_DATA } from '@/lib/skill-data';
import SkillCard from '@/components/ui/SkillCard';
import { Cpu, Database, Layout, PenTool, Terminal } from 'lucide-react';

/* -------------------------------------------------------------------------- */
/* CATEGORY ICON MAP */
/* -------------------------------------------------------------------------- */
const CATEGORY_ICONS: Record<string, React.ElementType> = {
  'Language Skills': Terminal,
  'Frameworks': Layout,
  'Database': Database,
  'Tools & Softwares': PenTool, // Or Wrench/Hammer
  'Operating Systems': Cpu,
};

const Skills = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax for background
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      id="skills"
      ref={containerRef}
      className={`relative py-32 overflow-hidden min-h-screen ${SECTION_THEMES.skills.background}`}
    >
      {/* Animated Background Layers */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Tech Grid */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, ${SECTION_THEMES.skills.accent} 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Cybernetic Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" className="text-cyan-500" />
        </svg>

        {/* Glowing Orbs */}
        <motion.div
          style={{ y: yBg }}
          className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] mix-blend-screen"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]) }}
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[120px] mix-blend-screen"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6">

        {/* Section Header */}
        <div className="flex flex-col items-center mb-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/30 border border-cyan-500/30 text-cyan-400 font-mono text-xs mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            SYSTEM_CAPABILITIES::ONLINE
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Technical Arsenal
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-slate-400 max-w-2xl font-light tracking-wide text-lg"
          >
            A comprehensive array of languages, frameworks, and developer tools calibrated for high-performance engineering.
          </motion.p>
        </div>

        {/* Categories "Tech Connectors" Layout */}
        <div className="flex flex-col gap-24 relative">
          {Object.entries(SKILLS_DATA).map(([category, data], categoryIndex) => {
            const Icon = CATEGORY_ICONS[category] || Terminal;

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, x: categoryIndex % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
                className="relative"
              >
                {/* Category Header (Tech Label) */}
                <div className={`flex items-center gap-4 mb-10 ${categoryIndex % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className="h-px flex-grow bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
                  <div className="flex items-center gap-3 px-6 py-2 bg-slate-900/80 border border-cyan-500/30 rounded-br-2xl rounded-tl-2xl shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                    <Icon className="w-5 h-5 text-cyan-400" />
                    <h3 className="text-xl font-bold text-white tracking-widest uppercase font-mono">
                      {category}
                    </h3>
                  </div>
                  <div className="h-px flex-grow bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
                </div>

                {/* Skills Grid (Hex Layout Simulation) */}
                <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 max-w-6xl mx-auto px-4 perspective-1000">
                  {/* Alternating row offset hack for hex-like feel could be done with margins, but simple flex wrap looks good with the hex clip-path */}
                  {data.skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0, rotateX: 90 }}
                      whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
                      transition={{
                        delay: index * 0.05,
                        type: "spring",
                        stiffness: 100
                      }}
                      viewport={{ once: true }}
                    >
                      <SkillCard skill={skill} index={index} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
