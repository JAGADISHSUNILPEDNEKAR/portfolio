'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShieldCheck, ChevronRight } from 'lucide-react';
import CyberProfile from './about/CyberProfile';
import SystemStats from './about/SystemStats';
import TimelineLedger, { TimelineItem } from './about/TimelineLedger';
import Magnetic from '../ui/Magnetic';

// --- Data Constants ---
const TIMELINE_DATA: TimelineItem[] = [
  {
    year: '2025.10 - PRESENT',
    title: 'OPEN_SOURCE_CONTRIBUTOR',
    company: 'HACKTOBERFEST',
    type: 'work',
    description: 'Protocol injection into global repositories. Collaborating with distributed nodes worldwide to enhance codebase integrity.',
    tech: ['Git', 'OSS', 'CI/CD']
  },
  {
    year: '2025.09 - 2025.10',
    title: 'REPO_MAINTAINER',
    company: 'PAYROLL_SYSTEMS',
    type: 'work',
    description: 'Core system maintenance. Audited pull requests, resolved critical issues, and optimized contributor workflows.',
    tech: ['Review', 'Merge', 'Deploy']
  },
  {
    year: '2025.09 - PRESENT',
    title: 'INSTRUCTION_SET_ARCHITECT',
    company: 'POLARIS_TECH',
    type: 'work',
    description: 'Teaching Assistant. deploying knowledge packets on Git/GitHub fundamentals and version control protocols to new instances.',
    tech: ['Teaching', 'Mentorship']
  },
  {
    year: '2025.05 - 2025.07',
    title: 'BITCOIN_PROTOCOL_DEV',
    company: 'PYTHON_BITCOIN_LIB',
    type: 'work',
    description: 'Cryptographic implementation. Executed Bitcoin Improvement Protocols (BIPs) and fortified the open-source ecosystem.',
    tech: ['Cryptography', 'Python', 'BTC']
  },
  {
    year: '2024 - 2028',
    title: 'B.TECH_CS_AI/ML',
    company: 'POLARIS_SCHOOL',
    type: 'education',
    description: 'Deep learning ingestion. Specializing in Artificial Intelligence and Machine Learning architectures. Expected compilation: 2028.',
    tech: ['AI', 'ML', 'Neural Nets']
  }
];

const About = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacityHeader = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} id="about" className="relative min-h-screen py-32 bg-black overflow-hidden selection:bg-blue-500/30">

      {/* --- Parallax Background Layers --- */}
      <motion.div style={{ y: yBackground }} className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]" />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">

        {/* --- Header --- */}
        <motion.div style={{ opacity: opacityHeader }} className="mb-24 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/5 border border-blue-500/20 mb-6 backdrop-blur-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_#3b82f6]" />
            <span className="text-xs font-mono text-blue-400 tracking-[0.2em] uppercase">
              System Diagnostics // v2.0.4
            </span>
          </div>

          <h2 className="text-4xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 mb-6 tracking-tight uppercase relative inline-block">
            ABOUT_THE_ALCHMEMIST
            <span className="absolute -top-4 -right-8 text-xs font-mono text-gray-700 md:block hidden">
              [ETH_MAINNET]
            </span>
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
            Forging digital realities through <span className="text-white font-medium">visceral physics</span> and <span className="text-white font-medium">immutable code</span>.
            <br className="hidden md:block" />
            <span className="text-blue-500/70 font-mono text-xs mt-4 block">
              &gt; executing runtime...
            </span>
          </p>
        </motion.div>

        {/* --- Main Grid --- */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 mb-32 items-start">

          {/* Left Column: Avatar & ID */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end">
            <div className="sticky top-24">
              <Magnetic>
                <CyberProfile />
              </Magnetic>

              <div className="mt-12 flex justify-center lg:justify-end w-full">
                <Magnetic>
                  <button className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/50 text-white font-mono text-xs tracking-widest uppercase transition-all duration-300 flex items-center gap-3 group relative overflow-hidden">
                    <div className="absolute inset-0 bg-blue-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    <ShieldCheck className="w-4 h-4 text-gray-500 group-hover:text-blue-400 z-10" />
                    <span className="z-10">Verify_Identity</span>
                  </button>
                </Magnetic>
              </div>
            </div>
          </div>

          {/* Right Column: Stats & Log */}
          <div className="lg:col-span-7 space-y-12 pt-8 lg:pt-0">
            <SystemStats />

            {/* Narrative Log */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gray-900/40 border border-white/5 p-8 relative overflow-hidden backdrop-blur-sm group"
            >
              <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-50 transition-opacity">
                <ChevronRight className="w-12 h-12 text-white" />
              </div>

              <h3 className="text-sm font-mono text-blue-400 mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-sm" />
                KERNEL_LOG_DUMP
              </h3>

              <div className="space-y-6 text-gray-400 font-light leading-7">
                <p>
                  <strong className="text-white block mb-1 font-mono text-xs uppercase tracking-wider">0x01_INIT</strong>
                  Obsessed with the architecture of the web. I don&apos;t just build interfaces; I engineer experiences that feel alive.
                </p>
                <p>
                  <strong className="text-white block mb-1 font-mono text-xs uppercase tracking-wider">0x02_STACK</strong>
                  Specialized in React, Next.js, and crypto-native technologies.
                  <span className="text-gray-600 italic"> // Always optimizing for low latency and high throughput.</span>
                </p>
                <p>
                  <strong className="text-white block mb-1 font-mono text-xs uppercase tracking-wider">0x03_GOAL</strong>
                  building the future of the internet, one block at a time.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* --- Timeline --- */}
        <div className="relative border-t border-gray-800 pt-24">
          <div className="absolute left-1/2 -top-3 -translate-x-1/2 bg-black px-4 text-gray-600 font-mono text-xs tracking-widest uppercase">
            Execution_History
          </div>

          <TimelineLedger data={TIMELINE_DATA} />
        </div>

      </div>
    </section>
  );
};

export default About;