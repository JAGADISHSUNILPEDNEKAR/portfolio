'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

// ✅ Skills Data with real logos from skillicons.dev
const SKILLS_DATA = {
  "Language Skills": [
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
  ],
  "Frameworks": [
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
  ],
  "Operating Systems": [
    { name: 'Windows', icon: 'https://skillicons.dev/icons?i=windows' },
    { name: 'Linux', icon: 'https://skillicons.dev/icons?i=linux' },
    { name: 'Apple', icon: 'https://skillicons.dev/icons?i=apple' },
    { name: 'Ubuntu', icon: 'https://skillicons.dev/icons?i=ubuntu' },
    { name: 'Arch', icon: 'https://skillicons.dev/icons?i=arch' },
    { name: 'RedHat', icon: 'https://skillicons.dev/icons?i=redhat' },
    { name: 'Fedora', icon: 'https://skillicons.dev/icons?i=fedora' }
    // ZoS & Kali are not on skillicons → you can add custom icons if needed
  ],
  "Database": [
    { name: 'PostgreSQL', icon: 'https://skillicons.dev/icons?i=postgres' },
    { name: 'MySQL', icon: 'https://skillicons.dev/icons?i=mysql' },
    { name: 'MongoDB', icon: 'https://skillicons.dev/icons?i=mongodb' },
    { name: 'GraphQL', icon: 'https://skillicons.dev/icons?i=graphql' },
    { name: 'Supabase', icon: 'https://skillicons.dev/icons?i=supabase' },
    { name: 'PlanetScale', icon: 'https://skillicons.dev/icons?i=planetscale' }
    // Chroma & Neo4j → custom logos if you want
  ],
  "Tools and Softwares": [
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
    // Bitcoin, Blender, Slack → add custom icons if needed
  ]
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
        delay: categoryIndex * 0.1 + index * 0.05,
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }}
      className="relative group cursor-pointer"
    >
      <div className="w-20 h-20 rounded-xl flex items-center justify-center bg-gray-900/50 hover:scale-110 hover:shadow-lg transition-all duration-300">
        <img 
          src={skill.icon} 
          alt={skill.name} 
          className="w-10 h-10 object-contain"
        />
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
  skills: Array<{ name: string; icon: string }>;
  index: number;
}

const SkillCategory = ({ title, skills, index }: SkillCategoryProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.2, duration: 0.6 }}
      className="mb-12"
    >
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>
      
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6">
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
