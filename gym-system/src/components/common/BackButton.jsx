import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const BackButton = ({ className = "" }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className={`absolute top-6 left-6 z-50 flex items-center gap-2 text-zinc-500 hover:text-white transition-colors font-bold uppercase text-xs tracking-widest ${className}`}
    >
      <ArrowLeft size={18} /> Back
    </button>
  );
};

export default BackButton;