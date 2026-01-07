'use client';

import React from 'react';
import { motion } from 'framer-motion';

export type TimelineItemKey = 'work' | 'education';

export interface TimelineItem {
    year: string;
    title: string;
    company: string;
    type: TimelineItemKey;
    description: string;
    tech?: string[];
}

interface TimelineLedgerProps {
    data: TimelineItem[];
}

const TimelineLedger = ({ data }: TimelineLedgerProps) => {
    return (
        <div className="relative py-10">
            {/* Central Timeline 'Bus' */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gray-800 md:-ml-px">
                <div className="absolute top-0 bottom-0 w-full bg-gradient-to-b from-transparent via-blue-500/20 to-transparent opacity-50" />
            </div>

            <div className="space-y-12">
                {data.map((item, index) => (
                    <TimelineBlock key={index} item={item} index={index} />
                ))}
            </div>
        </div>
    );
};

const TimelineBlock = ({ item, index }: { item: TimelineItem; index: number }) => {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className={`relative flex items-start gap-8 md:gap-0 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
        >
            {/* Center Node */}
            <div className="absolute left-[24px] md:left-1/2 top-0 w-4 h-4 -translate-x-1/2 md:translate-x-0 flex items-center justify-center md:-ml-2 z-10">
                <div className="w-3 h-3 bg-black border border-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)] group-hover:scale-125 transition-transform" />
            </div>

            {/* Content Side */}
            <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
                <div className="relative group perspective">
                    <motion.div
                        whileHover={{ scale: 1.01, rotateX: 2, rotateY: isEven ? -2 : 2 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="p-6 bg-gray-900/40 border border-white/5 backdrop-blur-sm relative overflow-hidden transition-all duration-300 hover:bg-white/5 hover:border-blue-500/30 hover:shadow-[0_0_30px_-10px_rgba(59,130,246,0.15)]"
                    >
                        {/* Scanline */}
                        <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(59,130,246,0.05)_50%,transparent_100%)] bg-[length:200%_200%] animate-scanline pointer-events-none opacity-0 group-hover:opacity-100" />

                        {/* Header */}
                        <div className={`flex flex-col mb-3 ${isEven ? 'md:items-end' : 'md:items-start'}`}>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-[10px] font-mono text-blue-400 px-1.5 py-0.5 bg-blue-500/10 rounded border border-blue-500/20">
                                    {item.year}
                                </span>
                                <span className="text-[10px] font-mono text-gray-600">
                                    // {item.type === 'work' ? 'EXEC' : 'COMPILE'}
                                </span>
                            </div>
                            <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors tracking-tight">
                                {item.company}
                            </h3>
                            <div className="text-sm text-gray-400 font-mono">
                                {item.title}
                            </div>
                        </div>

                        {/* Body */}
                        <p className="text-sm text-gray-400 leading-relaxed mb-4 font-light border-l-2 md:border-l-0 md:border-t-0 border-gray-800 pl-3 md:pl-0">
                            {item.description}
                        </p>

                        {/* Tech Stack */}
                        <div className={`flex flex-wrap gap-2 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                            {item.tech?.map((tech) => (
                                <span key={tech} className="text-[10px] font-mono text-gray-500 px-2 py-1 bg-black border border-white/10 rounded-sm hover:text-blue-400 hover:border-blue-500/40 transition-colors">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Empty Side */}
            <div className="hidden md:block w-1/2" />
        </motion.div>
    );
};

export default TimelineLedger;
