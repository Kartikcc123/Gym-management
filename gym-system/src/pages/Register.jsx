import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Dumbbell, ArrowRight } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import BackButton from '../components/common/BackButton';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const { register, isLoading, error } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    
    try {
      await register({ 
        name: formData.name, 
        email: formData.email, 
        password: formData.password 
      });
      navigate('/dashboard');
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  return (
    <div className="min-h-screen ...">
        <BackButton />
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-0" />

      {/* Register Card */}
      <div className="relative z-10 w-full max-w-md bg-zinc-900/80 backdrop-blur-md border border-zinc-800 p-8 rounded-2xl shadow-2xl">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
             <Dumbbell className="text-red-600" size={48} />
          </div>
          <h2 className="text-3xl font-black italic text-white uppercase">Join The Forge</h2>
          <p className="text-zinc-400 text-sm mt-2">Start your transformation today.</p>
        </div>

        {error && (
          <div className="bg-red-900/20 border border-red-500/50 text-red-500 p-3 rounded-lg text-sm mb-6 text-center animate-pulse">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            name="name"
            type="text"
            icon={User}
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <Input
            label="Email Address"
            name="email"
            type="email"
            icon={Mail}
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
          
          <Input
            label="Password"
            name="password"
            type="password"
            icon={Lock}
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <Input
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            icon={Lock}
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <Button
            type="submit" 
            variant="primary" 
            className="w-full mt-4" 
            size="lg" 
            isLoading={isLoading}
            icon={ArrowRight}
          >
            Create Account
          </Button>
        </form>

        <div className="mt-8 text-center text-sm text-zinc-500">
          Already a member?{' '}
          <Link to="/login" className="text-white font-bold hover:text-red-500 transition-colors">
            Sign In
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Register;