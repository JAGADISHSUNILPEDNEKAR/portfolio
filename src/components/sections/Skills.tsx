'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
gsap.registerPlugin(ScrollTrigger);

/* -------------------------------------------------------------------------- */
/* SKILLS DATA SET */
/* -------------------------------------------------------------------------- */
const SKILLS_DATA = {
  'Language Skills': {
    watermark: '</>',
    color: 'from-blue-500 to-cyan-500',
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
      { name: 'Kotlin', icon: 'https://skillicons.dev/icons?i=kotlin' },
    ],
  },
  Frameworks: {
    watermark: '🧩',
    color: 'from-green-500 to-emerald-500',
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
      { name: 'Flutter', icon: 'https://skillicons.dev/icons?i=flutter' },
    ],
  },
  Database: {
    watermark: '🗄️',
    color: 'from-purple-500 to-pink-500',
    skills: [
      { name: 'PostgreSQL', icon: 'https://skillicons.dev/icons?i=postgres' },
      { name: 'MySQL', icon: 'https://skillicons.dev/icons?i=mysql' },
      { name: 'MongoDB', icon: 'https://skillicons.dev/icons?i=mongodb' },
      { name: 'GraphQL', icon: 'https://skillicons.dev/icons?i=graphql' },
      { name: 'Supabase', icon: 'https://skillicons.dev/icons?i=supabase' },
      { name: 'PlanetScale', icon: 'https://skillicons.dev/icons?i=planetscale' },
    ],
  },
  'Tools & Softwares': {
    watermark: '🔨',
    color: 'from-orange-500 to-red-500',
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
      { name: 'Grafana', icon: 'https://skillicons.dev/icons?i=grafana' },
    ],
  },
  'Operating Systems': {
    watermark: '🖥️',
    color: 'from-indigo-500 to-purple-500',
    skills: [
      { name: 'Windows', icon: 'https://skillicons.dev/icons?i=windows' },
      { 
        name: 'Linux', 
        icon: 'https://skillicons.dev/icons?i=linux',
        isExpandable: true,
        distros: [
          { name: 'Ubuntu', icon: 'https://skillicons.dev/icons?i=ubuntu' },
          { name: 'Arch', icon: 'https://skillicons.dev/icons?i=arch' },
          { name: 'Fedora', icon: 'https://skillicons.dev/icons?i=fedora' },
          { name: 'Debian', icon: 'https://skillicons.dev/icons?i=debian' },
          { name: 'Kali', icon: 'https://skillicons.dev/icons?i=kali' },
          { name: 'RedHat', icon: 'https://skillicons.dev/icons?i=redhat' },
        ]
      },
      { name: 'Apple', icon: 'https://skillicons.dev/icons?i=apple' },
    ],
  },
} as const;

/* -------------------------------------------------------------------------- */
/* TYPE DEFINITIONS */
/* -------------------------------------------------------------------------- */
interface Skill {
  name: string;
  icon: string;
  isExpandable?: boolean;
  distros?: readonly Skill[];
}

interface SkillIconProps {
  skill: Skill;
  index: number;
  categoryIndex: number;
  onToggleExpand?: () => void;
  isExpanded?: boolean;
}

interface SkillCategoryProps {
  title: string;
  categoryData: {
    readonly watermark: string;
    readonly color: string;
    readonly skills: readonly Skill[];
  };
  index: number;
}

/* -------------------------------------------------------------------------- */
/* SUBCOMPONENTS */
/* -------------------------------------------------------------------------- */
const SkillIcon = ({ skill, index, categoryIndex, onToggleExpand, isExpanded }: SkillIconProps) => {
  const iconRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  /* Client-side only GSAP */
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (iconRef.current && isMounted && !skill.isExpandable) {
      gsap.fromTo(
        iconRef.current,
        { opacity: 0, scale: 0.5, y: 50 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          delay: categoryIndex * 0.15 + index * 0.08,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: iconRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }
  }, [index, categoryIndex, isMounted, skill.isExpandable]);

  /* SSR Hydration Guard */
  if (!isMounted) {
    return (
      <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-22 lg:h-22 rounded-xl flex flex-col items-center justify-center bg-slate-800/60 backdrop-blur-sm border border-slate-700/50" />
    );
  }

  const handleClick = () => {
    if (skill.isExpandable && onToggleExpand) {
      onToggleExpand();
    }
  };

  const tooltipText = skill.isExpandable ? `${skill.name} (Linux Distros)` : skill.name;

  return (
    <div className="relative group cursor-pointer" ref={iconRef}>
      <div 
        className={`w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 lg:w-22 lg:h-22 rounded-xl flex flex-col items-center justify-center bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 hover:scale-110 hover:shadow-xl hover:shadow-blue-500/20 hover:bg-slate-700/70 hover:border-blue-500/30 transition-all duration-300 ease-out ${
          skill.isExpandable ? 'cursor-pointer' : ''
        } ${isExpanded ? 'ring-2 ring-blue-500/50 bg-slate-700/70 border-blue-500/30' : ''}`}
        onClick={handleClick}
      >
        <Image
          src={skill.icon}
          alt={skill.name}
          width={40}
          height={40}
          className="object-contain filter drop-shadow-sm mb-1"
          loading="lazy"
          unoptimized={true}
        />
        {skill.isExpandable && (
          <motion.div 
            className="absolute bottom-1 right-1 w-4 h-4 bg-blue-500/80 rounded-full flex items-center justify-center text-xs text-white font-bold"
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            ▼
          </motion.div>
        )}
      </div>
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900/95 backdrop-blur-sm text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap z-20 border border-slate-700/50 shadow-xl">
        <div className="font-medium">{tooltipText}</div>
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900/95" />
      </div>
    </div>
  );
};

const DistroIcon = ({ skill, index }: { skill: Skill; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.5, y: 20 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.05,
        ease: "backOut"
      }}
      className="relative group cursor-pointer"
    >
      <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 rounded-lg flex flex-col items-center justify-center bg-slate-800/40 backdrop-blur-sm border border-slate-600/30 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 hover:bg-slate-700/50 hover:border-purple-400/40 transition-all duration-300 ease-out">
        <Image
          src={skill.icon}
          alt={skill.name}
          width={32}
          height={32}
          className="object-contain filter drop-shadow-sm"
          loading="lazy"
          unoptimized={true}
        />
      </div>
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900/95 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap z-20 border border-slate-700/50 shadow-lg">
        <div className="font-medium">{skill.name}</div>
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-3 border-r-3 border-t-3 border-transparent border-t-slate-900/95" />
      </div>
    </motion.div>
  );
};

const SkillCategory = ({ title, categoryData, index }: SkillCategoryProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [expandedLinux, setExpandedLinux] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (ref.current && isMounted) {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 100, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          delay: index * 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }
  }, [index, isMounted]);

  const handleLinuxToggle = () => {
    setExpandedLinux(!expandedLinux);
  };

  return (
    <div ref={ref} className="mb-20 relative skill-category">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-center mb-10">
          <h3
            className={`text-2xl sm:text-3xl font-bold text-center bg-gradient-to-r ${categoryData.color} bg-clip-text text-transparent`}
          >
            {title}
          </h3>
        </div>
        <div className="relative min-h-[200px] flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span
              className="text-[150px] sm:text-[180px] md:text-[220px] lg:text-[260px] text-slate-800/8 font-bold select-none"
              suppressHydrationWarning
            >
              {categoryData.watermark}
            </span>
          </div>
          <div className="relative z-10 w-full">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 sm:gap-6 md:gap-8 place-items-center max-w-5xl mx-auto">
              {categoryData.skills.map((skill, skillIndex) => (
                <div key={skill.name} className="flex flex-col items-center">
                  <SkillIcon
                    skill={skill}
                    index={skillIndex}
                    categoryIndex={index}
                    onToggleExpand={skill.isExpandable ? handleLinuxToggle : undefined}
                    isExpanded={skill.isExpandable ? expandedLinux : undefined}
                  />
                </div>
              ))}
            </div>
            
            {/* Linux Distros Expansion */}
            <AnimatePresence>
              {expandedLinux && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -20 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="mt-8 overflow-hidden"
                >
                  <div className="bg-slate-800/20 backdrop-blur-sm border border-slate-700/30 rounded-2xl p-6">
                    <h4 className="text-lg font-semibold text-white mb-4 text-center">
                      Linux Distributions
                    </h4>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 sm:gap-4 place-items-center max-w-3xl mx-auto">
                      {SKILLS_DATA['Operating Systems'].skills
                        .find(skill => skill.name === 'Linux')
                        ?.distros?.map((distro, distroIndex) => (
                          <DistroIcon
                            key={distro.name}
                            skill={distro}
                            index={distroIndex}
                          />
                        ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* MAIN */
/* -------------------------------------------------------------------------- */
const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  /* Background Animations */
  useEffect(() => {
    if (!isMounted) return;
    const ctx = gsap.context(() => {
      gsap.to('.skill-particle', {
        y: -100,
        opacity: 0,
        duration: 4,
        stagger: { each: 0.3, repeat: -1, from: 'random' },
        ease: 'power1.out',
      });
      gsap.to('.skill-category', {
        y: -10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        stagger: 0.5,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [isMounted]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-32 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-gray-950 min-h-screen"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
          <div
            className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
            style={{ animationDelay: '3s' }}
          />
          <div
            className="absolute top-2/3 left-1/2 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
            style={{ animationDelay: '5s' }}
          />
        </div>
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
              backgroundSize: '20px 20px',
            }}
          />
        </div>
        <svg className="absolute bottom-0 w-full h-64 opacity-10" viewBox="0 0 1440 320">
          <path
            fill="currentColor"
            className="text-blue-500"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="skill-particle absolute w-2 h-2 bg-blue-400/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${100 + Math.random() * 50}%`,
              }}
              suppressHydrationWarning
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Skills & Expertise
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Technologies and tools I work with to bring ideas to life
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full mx-auto" />
        </motion.div>

        <div className="space-y-16">
          {Object.entries(SKILLS_DATA).map(([category, categoryData], idx) => (
            <SkillCategory
              key={category}
              title={category}
              categoryData={categoryData}
              index={idx}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-24 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-8">Additional Technologies</h3>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {[
              'Redux',
              'Sass',
              'Webpack',
              'Babel',
              'Jenkins',
              'Kubernetes',
              'Terraform',
              'Elasticsearch',
              'RabbitMQ',
              'Nginx',
            ].map((tech, idx) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05, duration: 0.5 }}
                whileHover={{ scale: 1.1, y: -5 }}
                viewport={{ once: true }}
                className="px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-full text-gray-300 hover:text-white hover:border-blue-500 hover:bg-slate-800/70 transition-all duration-300 cursor-pointer"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;