// src/components/features/landing/CallToAction.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../common/Button';

const CallToAction = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-zinc-900 border-t border-red-900/30 pt-20 pb-20 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 text-center relative z-10">
        <h2 className="text-5xl md:text-7xl font-black text-white italic uppercase mb-8">
          Ready to <span className="text-red-600">Domin8?</span>
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto mb-10 text-lg">
          Join the elite today. Limited spots available for the upcoming season. Sign up now and get a free personal training session.
        </p>
        
        <div className="flex justify-center">
            <Button 
                variant="secondary" 
                size="lg" 
                className="hover:bg-red-600 hover:text-white border-none"
                onClick={() => navigate('/dashboard')}
            >
                Start Your Journey
            </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;