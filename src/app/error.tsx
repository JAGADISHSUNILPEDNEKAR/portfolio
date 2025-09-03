'use client';

import { motion } from 'framer-motion';
import { ExclamationTriangleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error to error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md mx-auto"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <ExclamationTriangleIcon className="w-10 h-10 text-red-500" />
        </motion.div>

        <h1 className="text-2xl font-bold text-white mb-4">
          Something went wrong!
        </h1>
        
        <p className="text-gray-400 mb-8 leading-relaxed">
          We encountered an unexpected error. Don't worry, our team has been notified 
          and we're working to fix it.
        </p>

        <div className="space-y-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={reset}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-200"
          >
            <ArrowPathIcon className="w-4 h-4 mr-2" />
            Try Again
          </motion.button>

          <div>
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="/"
              className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
            >
              ← Back to Home
            </motion.a>
          </div>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <details className="mt-8 text-left">
            <summary className="text-sm text-gray-500 cursor-pointer hover:text-gray-400">
              Error Details (Development Only)
            </summary>
            <pre className="mt-2 text-xs text-red-400 bg-red-900/10 p-4 rounded-lg overflow-auto">
              {error.message}
            </pre>
          </details>
        )}
      </motion.div>
    </div>
  );
}