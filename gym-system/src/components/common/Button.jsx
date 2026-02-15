// src/components/common/Button.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const variants = {
  primary: 'bg-red-600 text-white hover:bg-red-700 hover:shadow-[0_0_20px_rgba(220,38,38,0.5)] border-transparent',
  secondary: 'bg-white text-black hover:bg-gray-200 border-transparent',
  outline: 'bg-transparent border border-zinc-700 text-white hover:border-red-500 hover:text-red-500',
  ghost: 'bg-transparent text-gray-400 hover:text-white hover:bg-white/5 border-transparent',
  danger: 'bg-red-900/20 text-red-500 border border-red-900/50 hover:bg-red-900/40',
};

const sizes = {
  sm: 'px-4 py-1.5 text-xs',
  md: 'px-6 py-2.5 text-sm',
  lg: 'px-8 py-4 text-base',
};

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className, 
  isLoading = false, 
  icon: Icon,
  skew = true, // Toggle the futuristic skew effect
  ...props 
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      disabled={isLoading || props.disabled}
      className={twMerge(
        'relative group font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed',
        skew ? '-skew-x-[10deg] rounded-sm' : 'rounded-lg', // Conditional skew
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {/* If skewed, we must un-skew the content so text is readable */}
      <div className={clsx('flex items-center gap-2', skew && 'skew-x-[10deg]')}>
        {isLoading && <Loader2 size={16} className="animate-spin" />}
        {!isLoading && Icon && <Icon size={18} />}
        {children}
      </div>
    </motion.button>
  );
};

export default Button;