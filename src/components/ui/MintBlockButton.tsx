'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Loader2, CheckCircle2, ChevronRight } from 'lucide-react';

interface MintBlockButtonProps {
    isSubmitting: boolean;
    isSuccess: boolean;
    onClick?: () => void;
    disabled?: boolean;
}

export const MintBlockButton = ({
    isSubmitting,
    isSuccess,
    onClick,
    disabled
}: MintBlockButtonProps) => {
    return (
        <div className="relative w-full h-16 pointer-events-auto">
            <AnimatePresence mode="wait">
                {!isSubmitting && !isSuccess && (
                    <motion.button
                        key="mint-button"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={onClick}
                        disabled={disabled}
                        className="group relative w-full h-full bg-tungsten border border-slate-700 overflow-hidden rounded-lg flex items-center justify-between px-6 transition-all hover:bg-slate-900 hover:border-electric-cyan/50 hover:shadow-[0_0_20px_rgba(0,243,255,0.1)]"
                    >
                        {/* Background Grid Pattern */}
                        <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

                        <span className="relative z-10 font-mono text-lg font-bold tracking-widest text-white group-hover:text-electric-cyan transition-colors">
                            MINT_BLOCK
                        </span>

                        <div className="relative z-10 flex items-center gap-2">
                            <span className="text-xs font-mono text-slate-500 group-hover:text-electric-cyan/70">
                                INIT_SEQ_01
                            </span>
                            <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-electric-cyan transition-colors" />
                        </div>

                        {/* Progress Bar (Hidden initially) */}
                        <motion.div
                            className="absolute bottom-0 left-0 h-1 bg-electric-cyan"
                            initial={{ width: "0%" }}
                            whileHover={{ width: "100%" }}
                            transition={{ duration: 0.5 }}
                        />
                    </motion.button>
                )}

                {isSubmitting && (
                    <motion.div
                        key="hashing"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="relative w-full h-full bg-black border border-molten-amber/50 rounded-lg flex items-center justify-center gap-4 overflow-hidden"
                    >
                        {/* Scanning Effect */}
                        <motion.div
                            className="absolute inset-0 bg-molten-amber/10"
                            initial={{ x: "-100%" }}
                            animate={{ x: "100%" }}
                            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                        />

                        <Loader2 className="w-6 h-6 text-molten-amber animate-spin relative z-10" />
                        <span className="font-mono text-molten-amber font-bold tracking-widest relative z-10">
                            HASHING_BLOCK...
                        </span>

                        {/* Random Hex Code Simulation */}
                        <span className="absolute right-4 text-xs font-mono text-molten-amber/40 hidden sm:block">
                            0x7F...3A
                        </span>
                    </motion.div>
                )}

                {isSuccess && (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative w-full h-full bg-emerald-950/30 border border-emerald-500/50 rounded-lg flex items-center justify-center gap-3 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-emerald-500/10 animate-pulse" />
                        <CheckCircle2 className="w-6 h-6 text-emerald-400 relative z-10" />
                        <span className="font-mono text-emerald-400 font-bold tracking-widest relative z-10">
                            BLOCK_MINED_SUCCESSFULLY
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
