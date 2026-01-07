'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SECTION_THEMES } from '@/lib/constants';
import { projects, projectCategories } from '@/lib/project-data';
import ProjectCard from '@/components/ui/ProjectCard';
import { Terminal, Code2, Scan, Filter } from 'lucide-react';

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isGridVisible, setIsGridVisible] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  useEffect(() => {
    setIsGridVisible(true);
  }, []);

  return (
    <section
      id="projects"
      ref={containerRef}
      className={`relative py-32 overflow-hidden min-h-screen ${SECTION_THEMES.projects.background}`}
    >
      {/* Background Grid - Industrial Schematic */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #ffffff 1px, transparent 1px),
              linear-gradient(to bottom, #ffffff 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-transparent to-gray-950" />
      </div>

      {/* Moving Searchlights */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0deg,rgba(245,158,11,0.03)_60deg,transparent_120deg)]"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6">
        {/* Header Terminal */}
        <div className="mb-16 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 mb-6 font-mono text-sm"
          >
            <Terminal size={14} />
            <span>:: EXECUTE_PROJECT_PROTOCOL</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold mb-6 text-center"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-orange-400 to-amber-600">
              The Digital Vault
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-slate-400 text-center max-w-2xl font-light tracking-wide"
          >
            Accessing secure archives of deployed systems and experimental prototypes.
            <br />
            <span className="text-amber-500/50 text-sm font-mono mt-2 block">
              // SELECT_CATEGORY_TO_FILTER_DATA_STREAM
            </span>
          </motion.p>
        </div>

        {/* Filter Control Panel */}
        <div className="sticky top-24 z-40 mb-12 backdrop-blur-md bg-gray-950/80 py-4 border-y border-white/5 mx-auto max-w-5xl rounded-xl">
          <div className="flex justify-center flex-wrap gap-2 px-4">
            {/* Filter Icon for Mobile aesthetic */}
            <div className="hidden sm:flex items-center mr-4 text-slate-500">
              <Filter size={16} />
              <span className="text-xs font-mono ml-2">FILTER_MODE:</span>
            </div>

            {projectCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`
                  relative px-4 py-2 rounded text-sm font-mono transition-all duration-300
                  ${selectedCategory === category
                    ? 'text-amber-400 bg-amber-500/10 border border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                    : 'text-slate-500 hover:text-slate-300 hover:bg-white/5 border border-transparent'}
                `}
              >
                {selectedCategory === category && (
                  <motion.span
                    layoutId="activeFilter"
                    className="absolute inset-0 border border-amber-500/50 rounded pointer-events-none"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {category.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Footer Status */}
        <div className="mt-20 flex justify-center">
          <div className="flex items-center gap-4 px-6 py-3 bg-slate-900 border border-slate-800 rounded-full text-slate-500 text-xs font-mono">
            <Scan className="w-4 h-4 animate-pulse text-amber-500" />
            <span>SYSTEM_STATUS: ONLINE</span>
            <span className="w-px h-4 bg-slate-800" />
            <span>TOTAL_ENTRIES: {projects.length}</span>
            <span className="w-px h-4 bg-slate-800" />
            <span>CURRENT_VIEW: {filteredProjects.length}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;