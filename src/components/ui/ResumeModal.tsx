'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ExternalLink, Maximize2, Minimize2 } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  resumeUrl?: string;
}

export default function ResumeModal({ isOpen, onClose, resumeUrl = '/resume.pdf' }: ResumeModalProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenNewTab = () => {
    window.open(resumeUrl, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={`fixed z-50 bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 ${
              isFullscreen 
                ? 'inset-4' 
                : 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[85vh] max-w-5xl'
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm rounded-t-2xl">
              <h3 className="text-xl font-semibold text-white">Resume</h3>
              
              <div className="flex items-center gap-2">
                {/* Download Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDownload}
                  className="group p-2 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 transition-all duration-200"
                  title="Download Resume"
                >
                  <Download className="w-5 h-5 text-blue-400 group-hover:text-blue-300" />
                </motion.button>

                {/* Open in New Tab */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleOpenNewTab}
                  className="group p-2 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 transition-all duration-200"
                  title="Open in New Tab"
                >
                  <ExternalLink className="w-5 h-5 text-purple-400 group-hover:text-purple-300" />
                </motion.button>

                {/* Fullscreen Toggle */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="group p-2 rounded-lg bg-green-600/20 hover:bg-green-600/30 border border-green-500/30 transition-all duration-200"
                  title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
                >
                  {isFullscreen ? (
                    <Minimize2 className="w-5 h-5 text-green-400 group-hover:text-green-300" />
                  ) : (
                    <Maximize2 className="w-5 h-5 text-green-400 group-hover:text-green-300" />
                  )}
                </motion.button>

                {/* Close Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="group p-2 rounded-lg bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 transition-all duration-200"
                  title="Close"
                >
                  <X className="w-5 h-5 text-red-400 group-hover:text-red-300" />
                </motion.button>
              </div>
            </div>

            {/* PDF Viewer Container */}
            <div className="relative w-full h-[calc(100%-73px)] bg-slate-950 rounded-b-2xl overflow-hidden">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-950">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    <p className="text-slate-400">Loading resume...</p>
                  </div>
                </div>
              )}
              
              <iframe
                src={`${resumeUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                className="w-full h-full"
                onLoad={() => setIsLoading(false)}
                title="Resume PDF Viewer"
              />

              {/* Fallback Message */}
              <noscript>
                <div className="absolute inset-0 flex items-center justify-center bg-slate-950">
                  <div className="text-center text-slate-400">
                    <p className="mb-4">Unable to display PDF inline.</p>
                    <button
                      onClick={handleOpenNewTab}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Open in New Tab
                    </button>
                  </div>
                </div>
              </noscript>
            </div>

            {/* Quick Actions Bar */}
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 p-2 bg-slate-800/90 backdrop-blur-sm rounded-full border border-slate-600"
            >
              <button
                onClick={handleDownload}
                className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200"
              >
                Download PDF
              </button>
              <button
                onClick={handleOpenNewTab}
                className="px-4 py-2 text-sm font-medium text-white bg-slate-700 rounded-full hover:bg-slate-600 transition-colors duration-200"
              >
                Open Externally
              </button>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}