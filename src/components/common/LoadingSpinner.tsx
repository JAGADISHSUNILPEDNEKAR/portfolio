'use client';

import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'purple' | 'white' | 'blue';
  className?: string;
}

const sizes = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
};

const colors = {
  purple: 'border-purple-500/20 border-t-purple-500',
  white: 'border-white/20 border-t-white',
  blue: 'border-blue-500/20 border-t-blue-500',
};

export default function LoadingSpinner({ 
  size = 'md', 
  color = 'purple', 
  className = '' 
}: LoadingSpinnerProps) {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className={`${sizes[size]} border-2 ${colors[color]} rounded-full ${className}`}
    />
  );
}

// Skeleton loader component
export function SkeletonLoader({ 
  className = '',
  width = 'w-full',
  height = 'h-4',
}: {
  className?: string;
  width?: string;
  height?: string;
}) {
  return (
    <motion.div
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity }}
      className={`${width} ${height} bg-gray-800 rounded ${className}`}
    />
  );
}

// Full page loader
export function PageLoader() {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="text-center space-y-4">
        <LoadingSpinner size="lg" />
        <p className="text-white">Loading...</p>
      </div>
    </div>
  );
}