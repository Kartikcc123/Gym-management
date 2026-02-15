// src/components/common/Badge.jsx
import React from 'react';
import { twMerge } from 'tailwind-merge';

const variants = {
  success: 'bg-green-500/10 text-green-500 border-green-500/20',
  warning: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  danger: 'bg-red-500/10 text-red-500 border-red-500/20',
  info: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  neutral: 'bg-zinc-800 text-gray-400 border-zinc-700',
  brand: 'bg-red-600 text-white border-red-600 shadow-[0_0_10px_rgba(220,38,38,0.4)]',
};

const Badge = ({ children, variant = 'neutral', className }) => {
  return (
    <span className={twMerge(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide border',
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
};

export default Badge;