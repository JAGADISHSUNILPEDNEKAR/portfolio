'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

// Skills data structure matching the image
const SKILLS_DATA = {
  "Language Skills": [
    { name: 'Java', icon: '☕', color: '#f89820' },
    { name: 'JavaScript', icon: 'JS', color: '#f7df1e' },
    { name: 'TypeScript', icon: 'TS', color: '#3178c6' },
    { name: 'C', icon: 'C', color: '#00599c' },
    { name: 'C++', icon: 'C++', color: '#00599c' },
    { name: 'Python', icon: '🐍', color: '#3776ab' },
    { name: 'Dart', icon: '🎯', color: '#0175c2' },
    { name: 'Go', icon: 'Go', color: '#00add8' },
    { name: 'Rust', icon: '🦀', color: '#dea584' },
    { name: 'Kotlin', icon: 'Kt', color: '#7f52ff' }
  ],
  "Frameworks": [
    { name: 'React', icon: '⚛️', color: '#61dafb' },
    { name: 'Next.js', icon: 'N', color: '#000000' },
    { name: 'AWS', icon: '☁️', color: '#ff9900' },
    { name: 'Node.js', icon: '📗', color: '#339933' },
    { name: 'Svelte', icon: 'S', color: '#ff3e00' },
    { name: 'Vue', icon: 'V', color: '#4fc08d' },
    { name: 'Polygon', icon: '⬟', color: '#8247e5' },
    { name: 'Cargo', icon: '📦', color: '#dea584' },
    { name: 'Django', icon: '🎸', color: '#092e20' },
    { name: 'GraphQL', icon: '◈', color: '#e10098' },
    { name: 'Flask', icon: '🌶️', color: '#000000' },
    { name: 'Astro', icon: '🚀', color: '#ff5d01' },
    { name: 'Flutter', icon: '💙', color: '#02569b' },
    { name: 'Rocket', icon: '🚀', color: '#d33847' },
    { name: 'Actix', icon: '⚡', color: '#fd7f0b' }
  ],
  "Operating Systems": [
    { name: 'ZoS', icon: '🖥️', color: '#1ba1e2' },
    { name: 'Windows', icon: '🪟', color: '#0078d4' },
    { name: 'Linux', icon: '🐧', color: '#fcc624' },
    { name: 'Apple', icon: '🍎', color: '#000000' },
    { name: 'Ubuntu', icon: '🟠', color: '#e95420' },
    { name: 'Arch', icon: '🏔️', color: '#1793d1' },
    { name: 'Kali', icon: '🔒', color: '#557c94' },
    { name: 'RedHat', icon: '🎩', color: '#ee0000' },
    { name: 'Fedora', icon: '🧢', color: '#294172' }
  ],
  "Database": [
    { name: 'PostgreSQL', icon: '🐘', color: '#336791' },
    { name: 'MySQL', icon: '🐬', color: '#4479a1' },
    { name: 'MongoDB', icon: '🍃', color: '#47a248' },
    { name: 'GraphQL', icon: '◈', color: '#e10098' },
    { name: 'Supabase', icon: '⚡', color: '#3ecf8e' },
    { name: 'Neo4j', icon: '📊', color: '#008cc1' },
    { name: 'PlanetScale', icon: '🌍', color: '#000000' },
    { name: 'Chroma', icon: '🎨', color: '#ff6b6b' }
  ],
  "Tools and Softwares": [
    { name: 'VS Code', icon: '📝', color: '#007acc' },
    { name: 'Visual Studio', icon: '🔧', color: '#5c2d91' },
    { name: 'Android Studio', icon: '📱', color: '#3ddc84' },
    { name: 'JetBrains', icon: '🧠', color: '#000000' },
    { name: 'Eclipse', icon: '🌙', color: '#2c2255' },
    { name: 'Neovim', icon: '📄', color: '#57a143' },
    { name: 'Bitcoin', icon: '₿', color: '#f7931a' },
    { name: 'Blender', icon: '🎭', color: '#f5792a' },
    { name: 'Slack', icon: '💬', color: '#4a154b' },
    { name: 'GitLab', icon: '🦊', color: '#fc6d26' },
    { name: 'BitBucket', icon: '🪣', color: '#0052cc' },
    { name: 'Replit', icon: '🔄', color: '#56676d' },
    { name: 'Figma', icon: '🎨', color: '#f24e1e' },
    { name: 'Docker', icon: '🐳', color: '#2496ed' },
    { name: 'AWS', icon: '☁️', color: '#ff9900' },
    { name: 'Postman', icon: '📮', color: '#ff6c37' },
    { name: 'Kafka', icon: '📊', color: '#231f20' },
    { name: 'Grafana', icon: '📈', color: '#f46800' }
  ]
};

interface SkillIconProps {
  skill: { name: string; icon: string; color: string };
  index: number;
  categoryIndex: number;
}

const SkillIcon = ({ skill, index, categoryIndex }: SkillIconProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        delay: categoryIndex * 0.1 + index * 0.05,
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }}
      className="relative group cursor-pointer"
    >
      <div 
        className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-sm transition-all duration-300 hover:scale-110 hover:shadow-lg"
        style={{ backgroundColor: skill.color + '20', border: `2px solid ${skill.color}40` }}
      >
        <span className="text-lg" style={{ color: skill.color }}>
          {skill.icon}
        </span>
      </div>
      
      {/* Tooltip */}
      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
        {skill.name}
      </div>
    </motion.div>
  );
};

interface SkillCategoryProps {
  title: string;
  skills: Array<{ name: string; icon: string; color: string }>;
  index: number;
}

const SkillCategory = ({ title, skills, index }: SkillCategoryProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const getCategoryIcon = (title: string) => {
    switch (title) {
      case 'Language Skills': return '💬';
      case 'Frameworks': return '🏗️';
      case 'Operating Systems': return '💻';
      case 'Database': return '🗄️';
      case 'Tools and Softwares': return '🛠️';
      default: return '📂';
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.2, duration: 0.6 }}
      className="mb-12"
    >
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl">{getCategoryIcon(title)}</span>
        <h3 className="text-xl font-bold text-white">
          {title}
        </h3>
      </div>
      
      <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-4">
        {skills.map((skill, skillIndex) => (
          <SkillIcon
            key={skill.name}
            skill={skill}
            index={skillIndex}
            categoryIndex={index}
          />
        ))}
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-slate-950 to-gray-950 min-h-screen" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Skills
          </h2>
          <div className="mt-8 w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto" />
        </motion.div>

        <div className="max-w-7xl mx-auto">
          {Object.entries(SKILLS_DATA).map(([category, skills], index) => (
            <SkillCategory
              key={category}
              title={category}
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