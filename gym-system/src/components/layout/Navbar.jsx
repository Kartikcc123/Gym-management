import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Dumbbell } from 'lucide-react';
import Button from '../common/Button'; // Using our common component

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Detect Scroll for Glass Effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper to handle scrolling to ID
  const scrollToSection = (id) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'Features', id: 'features' },
    { name: 'Programs', id: 'classes' },
    { name: 'Nutrition', id: 'diet' },
    { name: 'Stories', id: 'reviews' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-black/80 backdrop-blur-md border-b border-white/10 py-4 shadow-lg' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <Dumbbell className="text-red-600 transform group-hover:-rotate-45 transition-transform duration-300" size={32} />
          <div className="text-2xl font-black italic tracking-tighter text-white">
            IRON<span className="text-red-600">FORGE</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8 text-sm font-bold text-gray-300 uppercase tracking-widest">
          {navLinks.map((link) => (
            <button 
              key={link.name} 
              onClick={() => scrollToSection(link.id)}
              className="hover:text-red-500 transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all group-hover:w-full" />
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/login" className="text-white font-bold hover:text-red-500 text-sm uppercase tracking-wide">
            Login
          </Link>
          <Button 
            variant="primary" 
            skew={true} 
            onClick={() => navigate('/register')}
          >
            Join Now
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white hover:text-red-500 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-zinc-900 border-b border-zinc-800 p-6 md:hidden flex flex-col gap-4 shadow-2xl">
          {navLinks.map((link) => (
            <button 
              key={link.name} 
              onClick={() => scrollToSection(link.id)}
              className="text-left text-gray-300 font-bold uppercase tracking-widest py-2 hover:text-white border-b border-zinc-800"
            >
              {link.name}
            </button>
          ))}
          <div className="flex flex-col gap-3 mt-4">
            <Button variant="outline" className="w-full" onClick={() => navigate('/login')}>Login</Button>
            <Button variant="primary" className="w-full" onClick={() => navigate("/register")}>Join Now</Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;