'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const CyberProfile = () => {
    return (
        <div className="relative group w-64 h-64 md:w-80 md:h-80 mx-auto">
            {/* --- Rotating Outer Rings (Orbitals) --- */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-dashed border-gray-800"
            />
            <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 rounded-full border border-dotted border-gray-800"
            />

            {/* --- Magnetic Field visual (Static for now, implies weight) --- */}
            <div className="absolute inset-0 rounded-full border border-blue-500/20 group-hover:border-blue-500/50 transition-colors duration-500" />

            {/* --- Hexagonal / Circular Mask for Image --- */}
            <div className="absolute inset-4 rounded-full overflow-hidden bg-black border border-gray-800 relative z-10">
                <Image
                    src="/profile_photo.jpeg"
                    alt="Profile"
                    width={320}
                    height={320}
                    className="object-cover w-full h-full opacity-60 group-hover:opacity-90 transition-opacity duration-500 grayscale group-hover:grayscale-[0.5]"
                />

                {/* Scanline Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 bg-[length:100%_2px,3px_100%] pointer-events-none" />

                {/* Glitch Overlay (Active on hover) */}
                <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-100 pointer-events-none" />
            </div>

            {/* --- Data Tags --- */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20">
                <div className="bg-black/90 border border-blue-500/30 px-3 py-1 rounded-sm backdrop-blur-md flex items-center gap-2 shadow-[0_0_10px_rgba(59,130,246,0.2)]">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_5px_#22c55e]" />
                    <span className="text-[10px] font-mono text-blue-400 tracking-widest uppercase">
                        NET_RUNNER
                    </span>
                </div>
                <div className="flex gap-1">
                    <div className="h-1 w-1 bg-blue-500/50 rounded-full" />
                    <div className="h-1 w-1 bg-blue-500/30 rounded-full" />
                    <div className="h-1 w-1 bg-blue-500/10 rounded-full" />
                </div>
            </div>

            {/* --- Technical Markers --- */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-8 bg-gradient-to-b from-transparent to-blue-500/50" />
            <div className="absolute top-1/2 left-0 -translate-x-1/2 w-8 h-px bg-gradient-to-r from-transparent to-blue-500/50" />
            <div className="absolute top-1/2 right-0 translate-x-1/2 w-8 h-px bg-gradient-to-l from-transparent to-blue-500/50" />
        </div>
    );
};

export default CyberProfile;
