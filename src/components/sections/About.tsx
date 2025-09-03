'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <section id="about" ref={sectionRef} className="py-32 bg-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/5 to-black" />
      </div>

      <motion.div 
        style={{ scale, opacity }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative"
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                About Me
              </span>
            </h2>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              I'm a passionate full-stack developer with a love for creating beautiful, 
              functional web experiences. With expertise in modern JavaScript frameworks 
              and a keen eye for design, I bridge the gap between aesthetic appeal and 
              technical excellence.
            </p>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              My journey in web development started with a curiosity about how things work 
              on the internet. Today, I specialize in building scalable applications that 
              solve real-world problems while providing delightful user experiences.
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="px-6 py-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
              >
                <p className="text-2xl font-bold text-white">5+</p>
                <p className="text-gray-400">Years Experience</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="px-6 py-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
              >
                <p className="text-2xl font-bold text-white">50+</p>
                <p className="text-gray-400">Projects Completed</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Visual element */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative w-full h-[500px] rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20" />
              <div className="absolute inset-0 backdrop-blur-sm bg-white/5 border border-white/10 rounded-3xl" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse" />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}