'use client';

import { useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { Github, ExternalLink, Terminal, Cpu, Shield, Code2 } from 'lucide-react';
import Image from 'next/image';
import { Project } from '@/lib/project-data';

interface ProjectCardProps {
    project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        x.set(clientX - left);
        y.set(clientY - top);
    }

    const maskImage = useMotionTemplate`radial-gradient(240px at ${mouseX}px ${mouseY}px, white, transparent)`;
    const style = { maskImage, WebkitMaskImage: maskImage };

    return (
        <div
            onMouseMove={onMouseMove}
            className="group relative flex flex-col overflow-hidden rounded-xl border border-white/10 bg-gray-900/50 hover:bg-gray-900/80 transition-colors duration-500"
        >
            {/* Holographic Border Glow */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100 z-50"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(245, 158, 11, 0.15),
              transparent 80%
            )
          `,
                }}
            />

            {/* Spotlight Effect */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={style}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20 opacity-50 backdrop-blur-xl" />
            </motion.div>

            {/* Image Section */}
            <div className="relative h-48 w-full overflow-hidden bg-gray-950">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10" />
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:filter group-hover:brightness-75"
                />

                {/* Status Badge */}
                <div className="absolute top-3 right-3 z-20">
                    <span className={`
            px-2 py-1 text-[10px] uppercase tracking-wider font-bold rounded-sm border backdrop-blur-md
            ${project.status === 'Deployed' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' :
                            project.status === 'In Development' ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' :
                                'bg-slate-500/10 border-slate-500/30 text-slate-400'}
          `}>
                        [{project.status}]
                    </span>
                </div>
            </div>

            {/* Content Section */}
            <div className="relative flex flex-col flex-grow p-5 z-20">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors flex items-center gap-2">
                        <span className="text-amber-500/50 group-hover:text-amber-500 transition-colors">
                            {'>'}
                        </span>
                        {project.title}
                    </h3>

                    <div className="flex gap-2">
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-md transition-all"
                            title="View Code"
                        >
                            <Github size={16} />
                        </a>
                        <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-slate-400 hover:text-amber-400 hover:bg-amber-500/10 rounded-md transition-all"
                            title="Live Demo"
                        >
                            <ExternalLink size={16} />
                        </a>
                    </div>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-400 line-clamp-3 mb-6 flex-grow leading-relaxed">
                    {project.description}
                </p>

                {/* Tech Stack */}
                <div className="mt-auto">
                    <div className="flex flex-wrap gap-1.5">
                        {project.technologies.slice(0, 3).map((tech) => (
                            <span
                                key={tech}
                                className="px-2 py-1 textxs font-mono text-slate-500 bg-slate-900 border border-slate-800 rounded flex items-center gap-1 group-hover:border-amber-500/30 group-hover:text-amber-500/80 transition-colors"
                            >
                                <code className="text-[10px]">{tech}</code>
                            </span>
                        ))}
                        {project.technologies.length > 3 && (
                            <span className="px-2 py-1 text-[10px] font-mono text-slate-600 border border-transparent">
                                +{project.technologies.length - 3}
                            </span>
                        )}
                    </div>
                </div>

                {/* Decorative Corner Elements */}
                <div className="absolute bottom-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <Cpu className="w-4 h-4 text-amber-500/20" />
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
