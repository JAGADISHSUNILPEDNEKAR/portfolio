'use client';

import { motion } from 'framer-motion';

interface HeaderProps {
  title: string;
  subtitle?: string;
  gradient?: 'purple' | 'blue' | 'green' | 'pink';
  className?: string;
}

const gradients = {
  purple: 'from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400',
  blue: 'from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400',
  green: 'from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400',
  pink: 'from-pink-600 to-rose-600 dark:from-pink-400 dark:to-rose-400',
};

export default function Header({
  title,
  subtitle,
  gradient = 'purple',
  className = ''
}: HeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className={`text-center mb-20 ${className}`}
    >
      <h2 className="text-5xl md:text-7xl font-bold mb-6">
        <span className={`bg-gradient-to-r ${gradients[gradient]} bg-clip-text text-transparent`}>
          {title}
        </span>
      </h2>
      {subtitle && (
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}