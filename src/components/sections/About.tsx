'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { 
  AcademicCapIcon, 
  BriefcaseIcon, 
  TrophyIcon,
  UserIcon 
} from '@heroicons/react/24/outline';
import { PERSONAL_INFO } from '@/lib/constants';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const stats = [
    { label: 'Years Experience', value: '1+' },
    { label: 'Projects Completed', value: '50+' },
    { label: 'Happy Clients', value: '25+' },
    { label: 'Technologies', value: '20+' }
  ];

  const timeline = [
    {
      year: '2025',
      title: 'Bitcoin Developer',
      company: 'python-bitcoin-utils',
      type: 'Internship',
      description: 'Implementiing Bitcoin Improvement Protocals'
    },
    {
      year: '2022',
      title: 'Full Stack Developer',
      company: 'StartupXYZ',
      type: 'work', 
      description: 'Built and maintained multiple client projects, focusing on performance and user experience.'
    },
    {
      year: '2020',
      title: 'Bachelor\'s in Computer Science',
      company: 'University of Technology',
      type: 'education',
      description: 'Graduated with honors, specialized in software engineering and web development.'
    },
    {
      year: '2019',
      title: 'Frontend Developer',
      company: 'Digital Agency Pro',
      type: 'work',
      description: 'Started career focusing on modern frontend technologies and responsive design.'
    }
  ];

  const TimelineItem = ({ item, index }: { item: typeof timeline[0], index: number }) => (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.2, duration: 0.8 }}
      className={`flex items-center gap-6 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
    >
      <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-gray-600 transition-colors duration-300">
          <div className="flex items-center gap-2 mb-2">
            {item.type === 'work' ? (
              <BriefcaseIcon className="w-5 h-5 text-blue-400" />
            ) : (
              <AcademicCapIcon className="w-5 h-5 text-green-400" />
            )}
            <span className="text-sm font-medium text-gray-400">{item.year}</span>
          </div>
          <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
          <p className="text-blue-400 font-medium mb-3">{item.company}</p>
          <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
        </div>
      </div>
      
      <div className="relative">
        <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-gray-950" />
        {index < timeline.length - 1 && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-0.5 h-16 bg-gradient-to-b from-blue-500/50 to-transparent" />
        )}
      </div>
      
      <div className="flex-1" />
    </motion.div>
  );

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-slate-950 to-gray-950" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            About Me
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Passionate developer with a love for creating exceptional digital experiences
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="space-y-6"
          >
            <div className="relative inline-block">
              <div className="w-64 h-64 rounded-2xl overflow-hidden border-4 border-gray-800">
                <Image
                  src="/images/profile.svg"
                  alt="Profile"
                  width={256}
                  height={256}
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <UserIcon className="w-8 h-8 text-white" />
              </div>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Building the Future, One Line of Code at a Time
              </h3>
              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>
                  I'm a passionate full-stack developer with over 5 years of experience creating 
                  scalable web applications and digital solutions. My journey in tech started with 
                  a curiosity for how things work and evolved into a career focused on building 
                  exceptional user experiences.
                </p>
                <p>
                  I specialize in modern JavaScript frameworks, particularly React and Node.js, 
                  and I'm always eager to learn new technologies that can improve the development 
                  process and end-user experience.
                </p>
                <p>
                  When I'm not coding, you'll find me contributing to open-source projects, 
                  writing technical articles, or exploring the latest trends in web development.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                  className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 text-center hover:border-gray-600 transition-colors duration-300"
                >
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">My Journey</h3>
            <p className="text-gray-400">Key milestones in my professional development</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {timeline.map((item, index) => (
              <TimelineItem key={`${item.year}-${item.title}`} item={item} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;