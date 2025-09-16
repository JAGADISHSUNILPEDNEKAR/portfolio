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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 to-purple-950">
      <div className="text-center p-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mb-8"
        >
          <ExclamationTriangleIcon className="w-24 h-24 text-red-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-white mb-4">
            Something went wrong!
          </h1>
        </motion.div>

        <div className="max-w-md mx-auto mb-8">
          <p className="text-gray-300 mb-6">
            We encountered an unexpected error. Don&apos;t worry, our team has been notified
            and we&apos;re working to fix it.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={reset}
              className="px-6 py-3 bg-purple-600 text-white font-medium rounded-xl hover:bg-purple-700 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <ArrowPathIcon className="w-5 h-5" />
              Try Again
            </button>

            <button
              onClick={() => window.location.href = '/'}
              className="px-6 py-3 border border-white/20 text-white font-medium rounded-xl hover:bg-white/10 transition-all duration-200"
            >
              ← Back to Home
            </button>
          </div>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <div className="max-w-2xl mx-auto mt-8 p-4 bg-red-900/20 border border-red-500/30 rounded-lg text-left">
            <h3 className="text-red-400 font-medium mb-2">Error Details (Development Only)</h3>
            <pre className="text-red-300 text-sm overflow-auto">{error.message}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
