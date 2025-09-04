'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { SKILLS } from '@/lib/constants';

interface SkillCardProps {
  category: string;
  skills: Array<{ name: string; level: number }>;
  index: number;
}

const CircularProgress = ({ skill, delay }: { skill: { name: string; level: number }, delay: number }) => {
  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (skill.level / 100) * circumference;

  return (
    <div className="relative flex flex-col items-center group">
      <div className="relative w-24 h-24">
        <svg className="transform -rotate-90 w-24 h-24">
          <circle
            cx="48"
            cy="48"
            r="45"
            stroke="currentColor"
            strokeWidth="4"
            fill="transparent"
            className="text-gray-700"
          />
          <motion.circle
            cx="48"
            cy="48"
            r="45"
            stroke="currentColor"
            strokeWidth="4"
            fill="transparent"
            strokeLinecap="round"
            className="text-blue-500"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ delay, duration: 1.5, ease: 'easeOut' }}
            style={{ strokeDasharray }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.5, duration: 0.5 }}
            className="text-sm font-semibold text-white"
          >
            {skill.level}%
          </motion.span>
        </div>
      </div>
      <motion.h4
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: delay + 0.3, duration: 0.5 }}
        className="mt-3 text-sm font-medium text-gray-300 text-center group-hover:text-white transition-colors duration-300"
      >
        {skill.name}
      </motion.h4>
    </div>
  );
};

const SkillCard = ({ category, skills, index }: SkillCardProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const categoryColors = {
    frontend: 'from-blue-500 to-cyan-500',
    backend: 'from-green-500 to-emerald-500', 
    database: 'from-purple-500 to-violet-500',
    tools: 'from-orange-500 to-amber-500'
  };

  const categoryIcons = {
    frontend: '🎨',
    backend: '⚙️',
    database: '🗄️',
    tools: '🛠️'
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.2, duration: 0.8 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-2xl blur-xl" 
           style={{ background: `linear-gradient(135deg, ${categoryColors[category as keyof typeof categoryColors]})` }} />
      
      <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-gray-600 transition-all duration-500 group-hover:transform group-hover:scale-105">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">{categoryIcons[category as keyof typeof categoryIcons]}</span>
          <h3 className="text-xl font-bold text-white capitalize">
            {category}
          </h3>
        </div>
        
        <div className="grid grid-cols-2 gap-8">
          {skills.map((skill, skillIndex) => (
            <CircularProgress
              key={skill.name}
              skill={skill}
              delay={isInView ? (index * 0.2) + (skillIndex * 0.1) + 0.5 : 0}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-slate-950 to-gray-950" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Technical Skills
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Technologies I work with to bring ideas to life
          </p>
          <div className="mt-8 w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.entries(SKILLS).map(([category, skills], index) => (
            <SkillCard
              key={category}
              category={category}
              skills={skills}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;