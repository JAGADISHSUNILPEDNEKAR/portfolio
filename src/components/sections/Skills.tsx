'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

// ✅ Skills Data with real logos from skillicons.dev
const SKILLS_DATA = {
  "Language Skills": {
    watermark: "</>" ,
    skills: [
      { name: 'Java', icon: 'https://skillicons.dev/icons?i=java' },
      { name: 'JavaScript', icon: 'https://skillicons.dev/icons?i=javascript' },
      { name: 'TypeScript', icon: 'https://skillicons.dev/icons?i=typescript' },
      { name: 'C', icon: 'https://skillicons.dev/icons?i=c' },
      { name: 'C++', icon: 'https://skillicons.dev/icons?i=cpp' },
      { name: 'Python', icon: 'https://skillicons.dev/icons?i=python' },
      { name: 'Dart', icon: 'https://skillicons.dev/icons?i=dart' },
      { name: 'Go', icon: 'https://skillicons.dev/icons?i=go' },
      { name: 'Rust', icon: 'https://skillicons.dev/icons?i=rust' },
      { name: 'Kotlin', icon: 'https://skillicons.dev/icons?i=kotlin' }
    ]
  },
  "Frameworks": {
    watermark: "🧩",
    skills: [
      { name: 'React', icon: 'https://skillicons.dev/icons?i=react' },
      { name: 'Next.js', icon: 'https://skillicons.dev/icons?i=nextjs' },
      { name: 'AWS', icon: 'https://skillicons.dev/icons?i=aws' },
      { name: 'Node.js', icon: 'https://skillicons.dev/icons?i=nodejs' },
      { name: 'Svelte', icon: 'https://skillicons.dev/icons?i=svelte' },
      { name: 'Vite', icon: 'https://skillicons.dev/icons?i=vite' },
      { name: 'Django', icon: 'https://skillicons.dev/icons?i=django' },
      { name: 'Flask', icon: 'https://skillicons.dev/icons?i=flask' },
      { name: 'Astro', icon: 'https://skillicons.dev/icons?i=astro' },
      { name: 'Flutter', icon: 'https://skillicons.dev/icons?i=flutter' }
    ]
  },
  "Operating Systems": {
    watermark: "🖥️",
    skills: [
      { name: 'Windows', icon: 'https://skillicons.dev/icons?i=windows' },
      { name: 'Linux', icon: 'https://skillicons.dev/icons?i=linux' },
      { name: 'Apple', icon: 'https://skillicons.dev/icons?i=apple' },
      { name: 'Ubuntu', icon: 'https://skillicons.dev/icons?i=ubuntu' },
      { name: 'Arch', icon: 'https://skillicons.dev/icons?i=arch' },
      { name: 'RedHat', icon: 'https://skillicons.dev/icons?i=redhat' },
      { name: 'Fedora', icon: 'https://skillicons.dev/icons?i=fedora' }
    ]
  },
  "Database": {
    watermark: "🗄️",
    skills: [
      { name: 'PostgreSQL', icon: 'https://skillicons.dev/icons?i=postgres' },
      { name: 'MySQL', icon: 'https://skillicons.dev/icons?i=mysql' },
      { name: 'MongoDB', icon: 'https://skillicons.dev/icons?i=mongodb' },
      { name: 'GraphQL', icon: 'https://skillicons.dev/icons?i=graphql' },
      { name: 'Supabase', icon: 'https://skillicons.dev/icons?i=supabase' },
      { name: 'PlanetScale', icon: 'https://skillicons.dev/icons?i=planetscale' }
    ]
  },
  "Tools and Softwares": {
    watermark: "🔨",
    skills: [
      { name: 'VS Code', icon: 'https://skillicons.dev/icons?i=vscode' },
      { name: 'Visual Studio', icon: 'https://skillicons.dev/icons?i=visualstudio' },
      { name: 'Android Studio', icon: 'https://skillicons.dev/icons?i=androidstudio' },
      { name: 'JetBrains', icon: 'https://skillicons.dev/icons?i=idea' },
      { name: 'Eclipse', icon: 'https://skillicons.dev/icons?i=eclipse' },
      { name: 'Neovim', icon: 'https://skillicons.dev/icons?i=neovim' },
      { name: 'GitLab', icon: 'https://skillicons.dev/icons?i=gitlab' },
      { name: 'Bitbucket', icon: 'https://skillicons.dev/icons?i=bitbucket' },
      { name: 'Replit', icon: 'https://skillicons.dev/icons?i=replit' },
      { name: 'Figma', icon: 'https://skillicons.dev/icons?i=figma' },
      { name: 'Docker', icon: 'https://skillicons.dev/icons?i=docker' },
      { name: 'Postman', icon: 'https://skillicons.dev/icons?i=postman' },
      { name: 'Kafka', icon: 'https://skillicons.dev/icons?i=kafka' },
      { name: 'Grafana', icon: 'https://skillicons.dev/icons?i=grafana' }
    ]
  }
};

interface SkillIconProps {
  skill: { name: string; icon: string };
  index: number;
  categoryIndex: number;
}

const SkillIcon = ({ skill, index, categoryIndex }: SkillIconProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        delay: categoryIndex * 0.15 + index * 0.08,
        duration: 0.6,
        type: "spring",
        stiffness: 120,
        damping: 15
      }}
      className="relative group cursor-pointer"
    >
      <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 rounded-xl flex items-center justify-center bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 hover:scale-110 hover:shadow-xl hover:shadow-blue-500/20 hover:bg-slate-700/70 hover:border-blue-500/30 transition-all duration-300 ease-out">
        <img 
          src={skill.icon} 
          alt={skill.name} 
          className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 object-contain filter drop-shadow-sm"
          loading="lazy"
        />
      </div>

      {/* Tooltip on hover */}
      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-slate-900/95 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap z-20 border border-slate-700/50 shadow-lg">
        {skill.name}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900/95"></div>
      </div>
    </motion.div>
  );
};

interface SkillCategoryProps {
  title: string;
  categoryData: {
    watermark: string;
    skills: Array<{ name: string; icon: string }>;
  };
  index: number;
}

const SkillCategory = ({ title, categoryData, index }: SkillCategoryProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.2, duration: 0.8, ease: "easeOut" }}
      className="mb-16 relative"
    >
      {/* Container with centered layout */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Category Header */}
        <div className="flex items-center justify-center mb-8">
          <h3 className="text-xl sm:text-2xl font-bold text-white text-center">{title}</h3>
        </div>
        
        {/* Category Content with Balanced Watermark */}
        <div className="relative min-h-[160px] flex items-center justify-center">
          {/* Smaller, Balanced Watermark Behind Grid */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-[120px] sm:text-[140px] md:text-[160px] lg:text-[180px] text-slate-800/10 font-bold select-none leading-none">
              {categoryData.watermark}
            </span>
          </div>
          
          {/* Skills Grid - Constrained to 4-5 items per row */}
          <div className="relative z-10 w-full max-w-xl mx-auto">
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 sm:gap-4 md:gap-5 place-items-center">
              {categoryData.skills.map((skill, skillIndex) => (
                <SkillIcon
                  key={skill.name}
                  skill={skill}
                  index={skillIndex}
                  categoryIndex={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section 
      id="skills" 
      className="py-20 bg-gradient-to-b from-slate-950 via-slate-900 to-gray-950 min-h-screen relative overflow-hidden" 
      ref={ref}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-600 bg-clip-text text-transparent">
            Skills
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-8">
            Technologies and tools I work with to bring ideas to life
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 rounded-full mx-auto" />
        </motion.div>

        {/* Skills Categories */}
        <div className="space-y-12">
          {Object.entries(SKILLS_DATA).map(([category, categoryData], index) => (
            <SkillCategory
              key={category}
              title={category}
              categoryData={categoryData}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;