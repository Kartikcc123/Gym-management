// src/components/common/Input.jsx
import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const Input = forwardRef(({ 
  label, 
  error, 
  icon: Icon, 
  className, 
  type = "text",
  ...props 
}, ref) => {
  return (
    <div className="w-full space-y-2">
      {label && (
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">
          {label}
        </label>
      )}
      
      <div className="relative group">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-red-500 transition-colors">
            <Icon size={18} />
          </div>
        )}
        
        <input
          ref={ref}
          type={type}
          className={twMerge(
            'w-full bg-zinc-900/50 border border-zinc-800 text-white rounded-lg py-3 px-4 outline-none transition-all duration-300',
            'focus:border-red-600 focus:bg-zinc-900 focus:shadow-[0_0_15px_rgba(220,38,38,0.1)]',
            'placeholder:text-zinc-600',
            Icon && 'pl-12', // Add padding if icon exists
            error && 'border-red-500 focus:border-red-500',
            className
          )}
          {...props}
        />
      </div>

      {error && (
        <p className="text-red-500 text-xs ml-1 animate-pulse">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;