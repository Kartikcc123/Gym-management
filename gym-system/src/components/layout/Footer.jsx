import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 pt-20 pb-10 text-zinc-400">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="text-3xl font-black italic tracking-tighter text-white">
              IRON<span className="text-red-600">FORGE</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              The premier destination for body transformation. Advanced analytics meets hardcore training. Join the revolution.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all"><Instagram size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all"><Twitter size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all"><Youtube size={18} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-6">Company</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/about" className="hover:text-red-500 transition-colors">About Us</Link></li>
              <li><Link to="/careers" className="hover:text-red-500 transition-colors">Careers</Link></li>
              <li><Link to="/blog" className="hover:text-red-500 transition-colors">Fitness Blog</Link></li>
              <li><Link to="/press" className="hover:text-red-500 transition-colors">Press</Link></li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-6">Programs</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-red-500 transition-colors">Hypertrophy</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Fat Loss / Shred</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Powerlifting</a></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">CrossFit</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-6">Contact</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="text-red-600 mt-1" size={16} />
                <span>124 Iron Street, Muscle Beach,<br/>Venice, CA 90291</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-red-600" size={16} />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-red-600" size={16} />
                <span>hello@ironforge.gym</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-zinc-600">
          <p>&copy; {new Date().getFullYear()} IronForge Gym Systems. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white">Terms of Service</Link>
            <Link to="/cookies" className="hover:text-white">Cookie Settings</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;