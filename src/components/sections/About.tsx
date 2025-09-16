'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  AcademicCapIcon,
  BriefcaseIcon,
  TrophyIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { PERSONAL_INFO } from '@/lib/constants';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  // Ref for all counter spans
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const stats = [
    { label: 'Years Experience', value: '1+' },
    { label: 'Projects Completed', value: '50+' },
    { label: 'Happy Clients', value: '25+' },
    { label: 'Technologies', value: '20+' },
  ];

  const timeline = [
    {
      year: '2025',
      title: 'Bitcoin Developer',
      company: 'python-bitcoin-utils',
      type: 'work',
      description:
        'Implementing Bitcoin Improvement Protocols and contributing to the open-source Bitcoin ecosystem.',
    },
    {
      year: '2022',
      title: 'Full Stack Developer',
      company: 'StartupXYZ',
      type: 'work',
      description:
        'Built and maintained multiple client projects, focusing on performance and user experience.',
    },
    {
      year: '2020',
      title: "Bachelor's in Computer Science",
      company: 'University of Technology',
      type: 'education',
      description:
        'Graduated with honors, specialized in software engineering and web development.',
    },
    {
      year: '2019',
      title: 'Frontend Developer',
      company: 'Digital Agency Pro',
      type: 'work',
      description:
        'Started career focusing on modern frontend technologies and responsive design.',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax background effect
      gsap.to('.about-bg-gradient', {
        yPercent: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Profile image animation
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          {
            scale: 0.8,
            opacity: 0,
            rotateY: -30,
          },
          {
            scale: 1,
            opacity: 1,
            rotateY: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: imageRef.current,
              start: 'top 80%',
            },
          }
        );
      }

      // Timeline items stagger animation
      gsap.fromTo(
        '.timeline-item',
        {
          opacity: 0,
          x: (index: number) => (index % 2 === 0 ? -50 : 50),
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 70%',
          },
        }
      );

      // Stats counter animation - use refs!
      counterRefs.current.forEach((el, idx) => {
        if (el) {
          // Get numeric part of value for animation (ignoring "+")
          const endVal = parseInt(stats[idx].value, 10);
          gsap.fromTo(
            el,
            { textContent: 0 },
            {
              textContent: endVal,
              duration: 2,
              ease: 'power1.in',
              snap: { textContent: 1 },
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
              },
              onUpdate: function () {
                el.textContent =
                  Math.floor(Number(el.textContent)).toString() +
                  (stats[idx].value.endsWith('+') ? '+' : '');
              },
            }
          );
        }
      });

      // Content text reveal animation
      gsap.fromTo(
        '.content-text p',
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.2,
          scrollTrigger: {
            trigger: '.content-text',
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const TimelineItem = ({
    item,
    index,
  }: {
    item: typeof timeline[0];
    index: number;
  }) => (
    <div
      className={`timeline-item relative flex items-center gap-8 mb-12 ${
        index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
      }`}
    >
      <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-gray-600 hover:bg-gray-900/70 transition-all duration-300">
          <div className="flex items-center gap-2 mb-2">
            {item.type === 'work' ? (
              <BriefcaseIcon className="w-5 h-5 text-blue-400" />
            ) : (
              <AcademicCapIcon className="w-5 h-5 text-green-400" />
            )}
            <span className="text-sm font-medium text-gray-400">
              {item.year}
            </span>
          </div>
          <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
          <p className="text-blue-400 font-medium mb-3">{item.company}</p>
          <p className="text-gray-400 text-sm leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>
      {/* Timeline Dot */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-gray-950" />
      {index < timeline.length - 1 && (
        <div className="absolute left-1/2 transform -translate-x-1/2 top-4 w-0.5 h-16 bg-gradient-to-b from-blue-500/50 to-transparent" />
      )}
      <div className="flex-1" />
    </div>
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-32 bg-gradient-to-b from-slate-950 to-gray-950 overflow-hidden"
    >
      {/* Animated Background */}
      <div className="about-bg-gradient absolute inset-0">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000" />
        </div>
        {/* Animated Grid Lines */}
        <svg
          className="absolute inset-0 w-full h-full opacity-10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-blue-500"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Passionate developer with a love for creating exceptional digital
            experiences
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Profile Section */}
          <div ref={imageRef} className="relative group">
            <div className="relative inline-block">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
              <div className="relative w-64 h-64 rounded-2xl overflow-hidden border-4 border-gray-800">
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
          </div>

          {/* Content Section */}
          <div className="space-y-6">
            <motion.h3
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-2xl font-bold text-white mb-4"
            >
              Building the Future, One Line of Code at a Time
            </motion.h3>

            <div className="content-text space-y-4 text-gray-400 leading-relaxed">
              <p>
                I'm a passionate full-stack developer with over 1 years of
                experience creating scalable web applications and digital
                solutions. My journey in tech started with a curiosity for how
                things work and evolved into a career focused on building
                exceptional user experiences.
              </p>
              <p>
                I specialize in modern JavaScript frameworks, particularly React
                and Node.js, and I'm always eager to learn new technologies that
                can improve the development process and end-user experience.
              </p>
              <p>
                When I'm not coding, you'll find me contributing to open-source
                projects, writing technical articles, or exploring the latest
                trends in web development.
              </p>
            </div>

            {/* Stats */}
            <div className="stats-container grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-4 text-center hover:border-gray-600 hover:bg-gray-900/70 transition-all duration-300"
                >
                  <div className="text-2xl font-bold text-white mb-1">
                    {/* Assign ref here for each stat */}
                    <span
                      className="stat-number"
                      ref={el => (counterRefs.current[index] = el)}
                    >
                      {stat.value}
                    </span>
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-3xl font-bold text-white mb-4">My Journey</h3>
            <p className="text-gray-400">
              Key milestones in my professional development
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-500 to-purple-500 opacity-30" />

            {/* Timeline Items */}
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <TimelineItem
                  key={`${item.year}-${item.title}`}
                  item={item}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
