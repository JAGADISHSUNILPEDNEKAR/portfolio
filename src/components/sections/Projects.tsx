'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowTopRightOnSquareIcon, CodeBracketIcon, PlayIcon } from '@heroicons/react/24/outline';
import { useRef } from 'react';

const projects = [
  {
    id: 1,
    title: "AI-Powered Analytics Dashboard",
    description: "Real-time data visualization platform with machine learning insights and predictive analytics.",
    image: "/api/placeholder/600/400",
    video: "/project1-demo.mp4", // Add video URL here
    gradient: "from-purple-600 to-pink-600",
    technologies: ["Next.js", "TensorFlow.js", "D3.js", "Python"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 2,
    title: "Social Media Platform",
    description: "Full-stack social platform with real-time messaging, stories, and content sharing.",
    image: "/api/placeholder/600/400",
    video: "/project2-demo.mp4",
    gradient: "from-blue-600 to-cyan-600",
    technologies: ["React", "GraphQL", "Node.js", "PostgreSQL"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 3,
    title: "E-Learning Platform",
    description: "Interactive learning management system with video streaming and progress tracking.",
    image: "/api/placeholder/600/400",
    video: "/project3-demo.mp4",
    gradient: "from-emerald-600 to-teal-600",
    technologies: ["Vue.js", "Express", "MongoDB", "WebRTC"],
    liveUrl: "#",
    githubUrl: "#",
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0], index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={cardRef}
      style={{ y, opacity }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <motion.div
        whileHover={{ y: -10 }}
        transition={{ duration: 0.3 }}
        className="relative bg-gray-900/50 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300"
      >
        {/* Gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
        
        {/* Image/Video container */}
        <div className="relative h-64 overflow-hidden bg-gray-900">
          <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20`} />
          
          {/* Placeholder for video */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer"
            >
              <PlayIcon className="w-8 h-8 text-white ml-1" />
            </motion.div>
          </div>
          
          {/* Project preview image */}
          <div className="absolute inset-0 flex items-center justify-center opacity-50">
            <CodeBracketIcon className="w-20 h-20 text-gray-600" />
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
            {project.title}
          </h3>
          <p className="text-gray-400 mb-6 line-clamp-2">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.map((tech) => (
              <motion.span
                key={tech}
                whileHover={{ scale: 1.05 }}
                className="px-3 py-1 text-xs font-medium bg-white/5 backdrop-blur-sm text-gray-300 rounded-full border border-white/10"
              >
                {tech}
              </motion.span>
            ))}
          </div>

          {/* Links */}
          <div className="flex items-center justify-between">
            <motion.a
              href={project.liveUrl}
              whileHover={{ x: 5 }}
              className="inline-flex items-center text-purple-400 hover:text-purple-300 font-medium transition-colors"
            >
              <span>Live Demo</span>
              <ArrowTopRightOnSquareIcon className="ml-1 h-4 w-4" />
            </motion.a>
            <motion.a
              href={project.githubUrl}
              whileHover={{ scale: 1.1 }}
              className="inline-flex items-center text-gray-400 hover:text-gray-300 transition-colors"
            >
              <CodeBracketIcon className="h-5 w-5" />
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

  return (
    <section id="projects" ref={sectionRef} className="py-32 bg-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/10 to-black" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>
      
      <motion.div style={{ scale }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              Featured Projects
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Showcasing my best work in web development, from concept to deployment
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}