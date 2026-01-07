'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Skill } from '@/lib/skill-data';
import { Cpu, ChevronDown } from 'lucide-react';

interface SkillCardProps {
    skill: Skill;
    index: number;
}

const SkillCard = ({ skill, index }: SkillCardProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="relative group perspective-1000">
            <motion.div
                className={`relative w-24 h-28 sm:w-28 sm:h-32 flex flex-col items-center justify-center p-2 
          bg-slate-900/40 backdrop-blur-md 
          clip-path-hexagon
          transition-all duration-300
          ${isHovered ? 'z-20 scale-110 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]' : 'z-10'}
          ${isExpanded ? 'bg-slate-800/80 shadow-lg shadow-cyan-500/20' : ''}
        `}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => skill.isExpandable && setIsExpanded(!isExpanded)}
                style={{
                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                }}
            >
                {/* Neon Border Effect */}
                <div
                    className="absolute inset-0 bg-gradient-to-b from-cyan-500/20 to-blue-500/20 pointer-events-none"
                    style={{
                        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                        padding: '1px' // Fake border
                    }}
                >
                    <div className="absolute inset-[1px] bg-slate-900/90 clip-path-hexagon"
                        style={{
                            clipPath: 'polygon(50% 0.5%, 99.5% 25.2%, 99.5% 74.8%, 50% 99.5%, 0.5% 74.8%, 0.5% 25.2%)'
                        }}
                    />
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center">
                    <div className="relative w-10 h-10 sm:w-12 sm:h-12 mb-2 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1">
                        <Image
                            src={skill.icon}
                            alt={skill.name}
                            fill
                            className="object-contain filter drop-shadow-md"
                            unoptimized
                        />
                    </div>

                    <span className={`text-[10px] sm:text-xs font-mono font-medium tracking-wider text-center
                ${isHovered ? 'text-cyan-400' : 'text-slate-400'}
                transition-colors duration-300
            `}>
                        {skill.name}
                    </span>

                    {/* Connection Node Decor */}
                    {isHovered && (
                        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-3 bg-cyan-500/50 shadow-[0_0_8px_cyan]" />
                    )}

                    {skill.isExpandable && (
                        <ChevronDown
                            size={12}
                            className={`mt-1 text-slate-500 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-cyan-500' : ''}`}
                        />
                    )}
                </div>

                {/* Scan line effect */}
                {isHovered && (
                    <motion.div
                        initial={{ top: '-10%', opacity: 0 }}
                        animate={{ top: '110%', opacity: [0, 1, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                        className="absolute left-0 right-0 h-1 bg-cyan-400/30 shadow-[0_0_10px_cyan] z-20 pointer-events-none blur-[1px]"
                    />
                )}
            </motion.div>

            {/* Expanded Distros Panel */}
            <AnimatePresence>
                {isExpanded && skill.distros && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 10, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.8 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-slate-900/95 border border-slate-700/50 rounded-xl p-4 z-50 shadow-2xl backdrop-blur-xl"
                    >
                        <div className="text-xs text-slate-400 font-mono mb-2 text-center border-b border-slate-800 pb-2">
                        // LINUX_KERNELS_DETECTED
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                            {skill.distros.map((distro) => (
                                <div key={distro.name} className="flex flex-col items-center group/distro cursor-pointer">
                                    <div className="w-8 h-8 relative mb-1 transition-transform group-hover/distro:scale-110">
                                        <Image src={distro.icon} alt={distro.name} fill className="object-contain" unoptimized />
                                    </div>
                                    <span className="text-[9px] text-slate-500 group-hover/distro:text-cyan-400 transition-colors">{distro.name}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SkillCard;
