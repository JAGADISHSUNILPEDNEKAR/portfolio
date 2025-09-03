'use client';

import { motion } from 'framer-motion';
import { forwardRef, useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, icon, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const inputType = type === 'password' && showPassword ? 'text' : type;

    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-gray-300">
            {label}
          </label>
        )}
        
        <div className="relative">
          {/* Icon */}
          {icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}

          {/* Input */}
          <motion.input/>

          {/* Password toggle */}
          {type === 'password' && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              {showPassword ? (
                <EyeSlashIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </motion.button>
          )}

          {/* Focus ring */}
          <motion.div
            animate={{
              opacity: isFocused ? 1 : 0,
              scale: isFocused ? 1 : 0.95,
            }}
            className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl -z-10 blur-sm"
          />
        </div>

       
      </div>
    );
  }
);

Input.displayName = "Input";

// Textarea component
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-gray-300">
            {label}
          </label>
        )}
        
        <div className="relative">
          <motion.textarea/>

          {/* Focus ring */}
          <motion.div
            animate={{
              opacity: isFocused ? 1 : 0,
              scale: isFocused ? 1 : 0.95,
            }}
            className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl -z-10 blur-sm"
          />
        </div>

        {/* Error message */}
        
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Input };