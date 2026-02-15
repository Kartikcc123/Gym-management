// src/components/common/Card.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

const Card = ({ children, className, hover = false, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={hover ? { y: -5 } : {}}
      className={twMerge(
        'relative bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-2xl p-6 overflow-hidden',
        hover && 'hover:border-red-600/50 transition-colors duration-300',
        className
      )}
      {...props}
    >
      {/* Top Gradient Glow Effect */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default Card;