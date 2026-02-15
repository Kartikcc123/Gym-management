import React from 'react';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/features/landing/Hero';
import Features from '../components/features/landing/Features';
import DietSection from '../components/features/landing/DietSection';
import Programs from '../components/features/landing/Programs';
import Testimonials from '../components/features/landing/Testimonials';
import CallToAction from '../components/features/landing/CallToAction';
import Footer from '../components/layout/Footer';

const LandingPage = () => {
  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-red-600 selection:text-white">
      <Navbar />
      <Hero />
      <Features />
      <DietSection />
      <Programs />
      <Testimonials />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default LandingPage;