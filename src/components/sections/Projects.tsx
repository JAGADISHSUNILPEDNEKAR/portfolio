'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { SECTION_THEMES } from '@/lib/constants';
import { ExternalLink, Github, Eye } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const categories = ['all', 'web', 'mobile', 'fullstack', 'design', 'systems', 'blockchain', 'ai'];

  const projects = [
    {
      id: 1,
      title: 'Payroll_Management_System',
      description: 'Terminal-based COBOL payroll system with employee management, automated salary calculations including overtime and tax, CSV export, and secure admin authentication.',
      image: '/images/projects/PMS.png',
      category: 'systems',
      technologies: ['COBOL', 'GnuCOBOL', 'CLI', 'File System'],
      github: 'https://github.com/JAGADISHSUNILPEDNEKAR/Payroll_Management_System',
      demo: 'https://github.com/JAGADISHSUNILPEDNEKAR/Payroll_Management_System',
      featured: true,
    },
    {
      id: 2,
      title: 'portfolio',
      description: 'Modern portfolio website built with Next.js showcasing projects and skills with optimized fonts and responsive design.',
      image: '/images/projects/Portfolio.webp',
      category: 'web',
      technologies: ['Next.js', 'React', 'TypeScript', 'Vercel'],
      github: 'https://github.com/JAGADISHSUNILPEDNEKAR/portfolio',
      demo: 'https://jagadishsunilpednekarportfolio.vercel.app/',
      featured: true,
    },
    {
      id: 3,
      title: 'Guess-the-number',
      description: 'Interactive number guessing game with single and multiplayer modes, performance classification, real-time scoring leaderboard, and celebratory fireworks animations.',
      image: '/images/projects/GTN.png',
      category: 'web',
      technologies: ['JavaScript', 'HTML', 'CSS', 'Canvas Confetti'],
      github: 'https://github.com/JAGADISHSUNILPEDNEKAR/Guess-the-number',
      demo: 'https://jagadishsunilpednekar.github.io/Guess-the-number/',
      featured: true,
    },
    {
      id: 4,
      title: 'MusicPlayer',
      description: 'Feature-rich WPF music player with playlist management, supporting multiple audio formats (MP3, WAV, FLAC), shuffle and repeat modes, and persistent settings.',
      image: '/images/projects/MP.webp',
      category: 'design',
      technologies: ['C#', 'WPF', '.NET', 'NAudio', 'TagLib'],
      github: 'https://github.com/JAGADISHSUNILPEDNEKAR/MusicPlayer',
      demo: 'https://github.com/JAGADISHSUNILPEDNEKAR/MusicPlayer',
      featured: false,
    },
    {
      id: 5,
      title: 'TICTACTOE',
      description: 'iOS Tic-Tac-Toe game with intelligent AI opponents using minimax algorithm, featuring MVVM architecture, smooth animations, and multiple difficulty levels.',
      image: '/images/projects/ttt.png',
      category: 'mobile',
      technologies: ['Swift', 'SwiftUI', 'Combine', 'iOS'],
      github: 'https://github.com/JAGADISHSUNILPEDNEKAR/TICTACTOE',
      demo: 'https://github.com/JAGADISHSUNILPEDNEKAR/TICTACTOE',
      featured: false,
    },
    {
      id: 6,
      title: 'kenken-game',
      description: 'Mathematical puzzle game implementing KenKen logic with constraint satisfaction and interactive gameplay.',
      image: '/images/projects/kenken.jpg',
      category: 'web',
      technologies: ['JavaScript', 'HTML', 'CSS', 'Game Logic'],
      github: 'https://github.com/JAGADISHSUNILPEDNEKAR/kenken-game',
      demo: 'https://github.com/JAGADISHSUNILPEDNEKAR/kenken-game',
      featured: false,
    },
    {
      id: 7,
      title: 'blockchain-lottery-platform',
      description: 'Decentralized lottery and gaming platform with Chainlink VRF for provable randomness, featuring automated payouts, blackjack, and bingo on Ethereum blockchain.',
      image: '/images/projects/BLP.png',
      category: 'blockchain',
      technologies: ['Solidity', 'React', 'Ethers.js', 'Chainlink', 'Hardhat'],
      github: 'https://github.com/JAGADISHSUNILPEDNEKAR/blockchain-lottery-platform',
      demo: 'https://github.com/JAGADISHSUNILPEDNEKAR/blockchain-lottery-platform',
      featured: true,
    },
    {
      id: 8,
      title: 'toy-docker-compose',
      description: 'Simplified Docker Compose implementation in Scala with YAML parsing, service orchestration, dependency resolution, and comprehensive logging for container management.',
      image: '/images/projects/scala-docker.png',
      category: 'systems',
      technologies: ['Scala', 'SBT', 'Docker', 'YAML', 'SnakeYAML'],
      github: 'https://github.com/JAGADISHSUNILPEDNEKAR/toy-docker-compose',
      demo: 'https://github.com/JAGADISHSUNILPEDNEKAR/toy-docker-compose',
      featured: false,
    },
    {
      id: 9,
      title: 'monoalphabetic-cipher',
      description: 'Assembly-based encryption tool implementing monoalphaegbetic substitution cipher with case preservation, input validation, and educational cryptography demonstration.',
      image: '/images/projects/mc.jpeg',
      category: 'systems',
      technologies: ['Assembly', 'x86-64', 'NASM', 'Linux'],
      github: 'https://github.com/JAGADISHSUNILPEDNEKAR/monoalphabetic-cipher',
      demo: 'https://github.com/JAGADISHSUNILPEDNEKAR/monoalphabetic-cipher',
      featured: false,
    },
    {
      id: 10,
      title: 'J-MATH-SOLVER',
      description: 'Interactive mathematical problem solver using J programming language for algebraic equations, statistics, calculus, and Monte Carlo simulations with CLI and API support.',
      image: '/images/projects/jsolver.png',
      category: 'fullstack',
      technologies: ['J', 'Node.js', 'JavaScript', 'Linear Algebra'],
      github: 'https://github.com/JAGADISHSUNILPEDNEKAR/J-MATH-SOLVER',
      demo: 'https://github.com/JAGADISHSUNILPEDNEKAR/J-MATH-SOLVER',
      featured: false,
    },
    {
      id: 11,
      title: 'CFD_SOLVER',
      description: 'Computational Fluid Dynamics solver for Navier-Stokes equations with turbulence modeling, parallel computing support (OpenMP/MPI), and multiple discretization schemes.',
      image: '/images/projects/CFD.webp',
      category: 'systems',
      technologies: ['Fortran', 'C++', 'OpenMP', 'MPI', 'CMake'],
      github: 'https://github.com/JAGADISHSUNILPEDNEKAR/CFD_SOLVER',
      demo: 'https://github.com/JAGADISHSUNILPEDNEKAR/CFD_SOLVER',
      featured: true,
    },
    {
      id: 12,
      title: 'JuiceWRLD',
      description: 'Dynamic music website with real-time lyrics synchronization during playback, featuring engaging UI, playlist functionality, and Web Audio API integration.',
      image: '/images/projects/JW.jpeg',
      category: 'web',
      technologies: ['JavaScript', 'HTML', 'CSS', 'Web Audio API'],
      github: 'https://github.com/JAGADISHSUNILPEDNEKAR/JuiceWRLD',
      demo: 'https://github.com/JAGADISHSUNILPEDNEKAR/JuiceWRLD',
      featured: false,
    },
    {
      id: 13,
      title: 'CodePilot_Ai',
      description: 'AI-powered code review platform detecting bugs and security vulnerabilities, with GitHub integration, health scoring, contextual explanations, and educational feedback for developers.',
      image: '/images/projects/CodePilot.png',
      category: 'ai',
      technologies: ['React', 'Node.js', 'MongoDB', 'Gemini API', 'Express'],
      github: 'https://github.com/PriyanshuPandey008/CodePilot_Ai',
      demo: 'https://ai-code-frontend.vercel.app',
      featured: true,
    },
    {
      id: 14,
      title: 'Habit_Tracker',
      description: 'Web application for building healthy habits with interactive calendar, progress visualization, habit logging, and persistent local storage for consistent tracking.',
      image: '/images/projects/HabitTracker.png',
      category: 'web',
      technologies: ['HTML', 'CSS', 'JavaScript', 'LocalStorage'],
      github: 'https://github.com/raj-aryan-official/Habit-Tracker-',
      demo: 'https://vermillion-longma-89f32f.netlify.app/',
      featured: true,
    },
    {
      id: 15,
      title: 'Brainerzz',
      description: 'Study platform generating interactive flashcards from lengthy texts using NLP, extracting key definitions and formulas to reduce exam anxiety and enhance learning efficiency.',
      image: '/images/projects/Brainerzz.png',
      category: 'fullstack',
      technologies: ['Node.js', 'Express', 'MongoDB', 'NLP', 'JWT'],
      github: 'https://github.com/JAGADISHSUNILPEDNEKAR/Final-Project-GSoC',
      demo: 'https://incredible-daffodil-552b7d.netlify.app/index.html',
      featured: true,
    },
    {
      id: 16,
      title: 'E-Commerce Platform',
      description: 'A full-featured e-commerce solution with real-time inventory, payment processing, and admin dashboard.',
      image: '/images/projects/ecommerce.jpg',
      category: 'fullstack',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      featured: false,
    },
    {
      id: 17,
      title: 'Task Management App',
      description: 'Collaborative task management with real-time updates, drag-and-drop interface, and team analytics.',
      image: '/images/projects/taskmanager.jpg',
      category: 'web',
      technologies: ['Next.js', 'Prisma', 'WebSocket', 'Tailwind'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      featured: false,
    },
  ];

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax background
      gsap.to('.projects-bg', {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Filter buttons animation
      gsap.fromTo(
        '.filter-btn',
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.filter-container',
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className={`relative py-32 overflow-hidden ${SECTION_THEMES.projects.background}`}
    >
      {/* Dark Sophisticated Background */}
      <div className="projects-bg absolute inset-0">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000" />
        </div>

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(${SECTION_THEMES.projects.accent}22 1px, transparent 1px),
                             linear-gradient(90deg, ${SECTION_THEMES.projects.accent}22 1px, transparent 1px)`,
            backgroundSize: '30px 30px',
          }}
        />

        {/* Floating Code Symbols */}
        <div className="absolute inset-0">
          {['</', '/>', '{}', '[]', '()'].map((symbol, i) => (
            <motion.div
              key={i}
              className="absolute text-amber-500/20 text-4xl font-mono"
              style={{
                left: `${20 + i * 15}%`,
                top: `${10 + i * 10}%`,
              }}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              {symbol}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Showcasing my best work in web development, from concept to deployment
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <div className="filter-container flex justify-center gap-4 mb-12 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`filter-btn px-6 py-2 rounded-full font-medium transition-all duration-300 ${selectedCategory === category
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25'
                  : 'bg-slate-800/50 text-gray-400 hover:text-white hover:bg-slate-700/50 border border-slate-700'
                }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Horizontal Scroll Container */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex gap-8 overflow-x-auto pb-8 snap-x snap-mandatory scroll-smooth scrollbar-thin scrollbar-track-slate-800/50 scrollbar-thumb-amber-500/50 hover:scrollbar-thumb-amber-500/70"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(245, 158, 11, 0.5) rgba(30, 41, 59, 0.5)',
            }}
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex-shrink-0 w-[85vw] sm:w-[350px] md:w-[400px] snap-center group relative"
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden hover:bg-slate-800/70 transition-all duration-300 h-full flex flex-col">
                    {/* Project Image */}
                    <div className="relative h-48 overflow-hidden bg-slate-900 flex-shrink-0">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                      {/* Overlay with Actions */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-4 left-4 right-4 flex gap-3">
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                            Live Demo
                          </a>
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
                          >
                            <Github className="w-4 h-4" />
                            Code
                          </a>
                        </div>
                      </div>

                      {/* Featured Badge */}
                      {project.featured && (
                        <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-semibold rounded-full shadow-lg">
                          Featured
                        </div>
                      )}
                    </div>

                    {/* Project Content */}
                    <div className="p-6 flex-grow flex flex-col">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4 leading-relaxed flex-grow line-clamp-3">
                        {project.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {project.technologies.slice(0, 4).map((tech, techIndex) => (
                          <motion.span
                            key={tech}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: techIndex * 0.05 }}
                            className="px-3 py-1 bg-slate-900/50 border border-slate-600 rounded-md text-xs text-gray-300 hover:text-amber-400 hover:border-amber-500/50 transition-all duration-200"
                          >
                            {tech}
                          </motion.span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="px-3 py-1 bg-slate-900/50 border border-slate-600 rounded-md text-xs text-gray-400">
                            +{project.technologies.length - 4}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Hover Glow Effect */}
                    {hoveredProject === project.id && (
                      <motion.div
                        layoutId="projectGlow"
                        className="absolute inset-0 border-2 border-amber-500/50 rounded-xl pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Scroll Hint Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-8 w-16 bg-gradient-to-r from-gray-950 to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-8 w-16 bg-gradient-to-l from-gray-950 to-transparent pointer-events-none" />
        </div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="group px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full font-semibold text-white hover:shadow-xl hover:shadow-amber-500/25 transition-all duration-300 hover:scale-105">
            <span className="flex items-center gap-2">
              View All Projects
              <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </motion.div>
      </div>

      <style jsx>{`
        /* Custom scrollbar for Webkit browsers */
        .overflow-x-auto::-webkit-scrollbar {
          height: 8px;
        }
        
        .overflow-x-auto::-webkit-scrollbar-track {
          background: rgba(30, 41, 59, 0.5);
          border-radius: 4px;
        }
        
        .overflow-x-auto::-webkit-scrollbar-thumb {
          background: rgba(245, 158, 11, 0.5);
          border-radius: 4px;
          transition: background 0.3s ease;
        }
        
        .overflow-x-auto::-webkit-scrollbar-thumb:hover {
          background: rgba(245, 158, 11, 0.7);
        }
      `}</style>
    </section>
  );
};

export default Projects;