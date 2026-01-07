'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Code2, Network, Database, Activity, Cpu } from 'lucide-react';

const SystemStats = () => {
    const stats = [
        { label: 'RUNTIME', value: '1+ YRS', icon: <Terminal className="w-4 h-4" />, color: 'text-blue-400' },
        { label: 'COMPILED', value: '15+ PROJ', icon: <Code2 className="w-4 h-4" />, color: 'text-purple-400' },
        { label: 'NODES', value: '5+ CLIENTS', icon: <Network className="w-4 h-4" />, color: 'text-green-400' },
        { label: 'STACK', value: '20+ LIBS', icon: <Database className="w-4 h-4" />, color: 'text-pink-400' },
    ];

    return (
        <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
                <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                    viewport={{ once: true }}
                    className="relative group p-4 bg-gray-900/40 border border-white/5 overflow-hidden backdrop-blur-sm hover:bg-white/5 transition-colors duration-300"
                >
                    {/* Background Grid generic */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

                    {/* Corner Accents */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-white/10 group-hover:border-blue-500/50 transition-colors" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-white/10 group-hover:border-purple-500/50 transition-colors" />

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-3">
                            <div className={`p-1.5 rounded-sm bg-white/5 ${stat.color} ring-1 ring-white/10 group-hover:ring-${stat.color.split('-')[1]}-500/50 transition-all`}>
                                {stat.icon}
                            </div>
                            <span className="text-[10px] uppercase tracking-widest text-gray-500 font-mono group-hover:text-gray-300 transition-colors">
                                {stat.label}
                            </span>
                        </div>

                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold font-mono text-white tracking-tighter">
                                {stat.value.split(' ')[0]}
                            </span>
                            <span className="text-xs text-gray-600 font-mono uppercase">
                                {stat.value.split(' ')[1]}
                            </span>
                        </div>
                    </div>

                    {/* Animation line */}
                    <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 group-hover:w-full transition-all duration-500 ease-out" />
                </motion.div>
            ))}
        </div>
    );
};

export default SystemStats;
