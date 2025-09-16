'use client';
import { motion, HTMLMotionProps } from 'framer-motion';
import { forwardRef, useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

// Create a cleaner interface that extends only the basic input attributes
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 
  'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration' | 'onTransitionEnd' | 
  'onDragStart' | 'onDragEnd' | 'onDrag' | 'onDirectionLock' | 'onDragTransitionEnd'> {
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
          <motion.input
            ref={ref}
            type={inputType}
            className={cn(
              "w-full px-4 py-3 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg text-white placeholder-gray-500 transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent",
              error && "border-red-500",
              icon && "pl-10",
              type === 'password' && "pr-10",
              className
            )}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...(props as any)}
          />
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
        {/* Error message */}
        {error && (
          <p className="text-sm text-red-400">{error}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

// Textarea component with similar fix
export interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration' | 'onTransitionEnd' | 
  'onDragStart' | 'onDragEnd' | 'onDrag' | 'onDirectionLock' | 'onDragTransitionEnd'> {
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
          <motion.textarea
            ref={ref}
            className={cn(
              "w-full px-4 py-3 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg text-white placeholder-gray-500 transition-all duration-200 resize-none",
              "focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent",
              error && "border-red-500",
              className
            )}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...(props as any)}
          />
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
        {error && (
          <p className="text-sm text-red-400">{error}</p>
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Input };