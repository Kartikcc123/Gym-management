import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Zap, Shield, ArrowRight, Dumbbell } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const coreValues = [
    {
      icon: Target,
      title: "Unrelenting Focus",
      description: "We strip away the distractions. No gimmicks, just top-tier equipment and the environment you need to hit your goals."
    },
    {
      icon: Users,
      title: "Brotherhood & Sisterhood",
      description: "IronForge isn't just a gym; it's a community. When you step through our doors, you are surrounded by people pushing you to be better."
    },
    {
      icon: Zap,
      title: "High-Performance Culture",
      description: "From our elite personal trainers to our custom nutrition plans, everything is optimized for maximum human performance."
    },
    {
      icon: Shield,
      title: "Safe & Resilient",
      description: "Clean facilities, well-maintained iron, and an ego-free zone where everyone respects the work."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-red-600 selection:text-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 px-4 md:px-8 overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black z-0" />

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <div className="flex justify-center mb-6">
              <Dumbbell className="text-red-600" size={56} />
            </div>
            <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tight mb-6">
              Forged in <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800">Iron.</span><br />
              Built for Greatness.
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              We didn't build a fitness center. We built a proving ground. IronForge was created for those who are tired of average and are ready to put in the actual work.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="border-y border-zinc-900 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "10,000+", label: "Pounds of Iron" },
              { number: "24/7", label: "Facility Access" },
              { number: "50+", label: "Elite Trainers" },
              { number: "100%", label: "Commitment" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="space-y-2"
              >
                <h3 className="text-3xl md:text-4xl font-black italic text-white">{stat.number}</h3>
                <p className="text-xs font-bold tracking-widest uppercase text-zinc-500">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CORE VALUES GRID */}
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-black italic uppercase mb-4">Our Philosophy</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">We believe in discipline, hard work, and pushing past your perceived limits. This is what makes us different.</p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {coreValues.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div 
                key={index}
                variants={fadeUp}
                className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl hover:border-red-600/50 hover:bg-zinc-900 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-red-950/30 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-red-900/40 transition-all">
                  <Icon className="text-red-500" size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* 4. CALL TO ACTION */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-red-900/10 z-0" />
        <div className="max-w-4xl mx-auto relative z-10 text-center bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 p-12 rounded-3xl">
          <h2 className="text-3xl md:text-5xl font-black italic uppercase mb-6">Stop Waiting. Start Forging.</h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Your goals aren't going to achieve themselves. Join IronForge today and get access to the best equipment and community in the city.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/register" 
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold uppercase tracking-wider transition-colors"
            >
              Join The Forge <ArrowRight size={20} />
            </Link>
            <Link 
              to="/login" 
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-transparent border border-zinc-700 hover:bg-zinc-800 text-white px-8 py-4 rounded-lg font-bold uppercase tracking-wider transition-colors"
            >
              Member Login
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutUs;