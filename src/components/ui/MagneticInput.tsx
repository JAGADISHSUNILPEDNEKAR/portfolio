'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useMotionTemplate, useMotionValue, animate } from 'framer-motion';
import { cn } from '@/lib/utils'; // Assuming this exists, common in shadcn/ui. If not, I'll fix.

interface MagneticInputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
    label: string;
    id: string;
    type?: 'text' | 'email' | 'textarea';
    error?: string;
}

export const MagneticInput = ({
    label,
    id,
    type = 'text',
    error,
    className,
    ...props
}: MagneticInputProps) => {
    const [isFocused, setIsFocused] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Magnetic effect strength
    const magnetStrength = 0.3;

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        const x = clientX - left - width / 2;
        const y = clientY - top - height / 2;

        mouseX.set(x * magnetStrength);
        mouseY.set(y * magnetStrength);
    }

    function handleMouseLeave() {
        mouseX.set(0);
        mouseY.set(0);
        setIsFocused(false);
    }

    const InputComponent = type === 'textarea' ? 'textarea' : 'input';

    // Laser etching effect gradient
    const borderBackground = useMotionTemplate`radial-gradient(
    650px circle at ${mouseX}px ${mouseY}px,
    var(--electric-cyan) 0%,
    transparent 40%
  )`;

    return (
        <div className="relative group perspective-1000">
            <motion.div
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onFocus={() => setIsFocused(true)}
                initial={{ x: 0, y: 0 }}
                style={{ x: mouseX, y: mouseY }}
                transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
                className="relative z-10"
            >
                <div className="relative overflow-hidden rounded-xl bg-deep-void ring-1 ring-tungsten transition-all duration-300 group-hover:ring-slate-700">

                    {/* Spotlight Effect (Laser Etching) */}
                    <motion.div
                        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100 placeholder:text-slate-500"
                        style={{
                            background: borderBackground,
                            maskImage: 'linear-gradient(#fff, #fff) content-box, linear-gradient(#fff, #fff)',
                            maskComposite: 'exclude',
                            WebkitMaskComposite: 'xor', // Fixed property name
                        }}
                    />

                    {/* Label */}
                    <div className="absolute top-0 left-0 px-4 py-2 pointer-events-none">
                        <span className={cn(
                            "text-xs font-mono uppercase tracking-widest transition-colors duration-300",
                            isFocused ? "text-electric-cyan" : "text-slate-500",
                            error && "text-red-500" // System Alert Color
                        )}>
                            {label} {error && `// ${error}`}
                        </span>
                    </div>

                    {/* Input Field */}
                    {/* @ts-ignore - Dynamic component typings can be tricky, keeping it simple */}
                    <InputComponent
                        id={id}
                        className={cn(
                            "w-full bg-transparent px-4 pb-4 pt-8 text-white font-mono placeholder-slate-600 focus:outline-none focus:ring-0 active:bg-transparent resize-none",
                            type === 'textarea' ? "h-32" : "h-16",
                            className
                        )}
                        {...props}
                    />

                    {/* Corner accents (Tech feel) */}
                    <div className="absolute bottom-0 right-0 p-1 opacity-50">
                        <div className={cn("w-2 h-2 border-r border-b transition-colors duration-300",
                            isFocused ? "border-electric-cyan" : "border-slate-700"
                        )} />
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
