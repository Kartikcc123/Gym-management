import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Dumbbell, ArrowRight } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import BackButton from '../components/common/BackButton';
import ForgotPassword from './ForgotPassword';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="min-h-screen ...">
        <BackButton />
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      
        
        {/* Background Decor */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-0" />

        {/* Login Card */}
        <div className="relative z-10 w-full max-w-md bg-zinc-900/80 backdrop-blur-md border border-zinc-800 p-8 rounded-2xl shadow-2xl">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Dumbbell className="text-red-600" size={48} />
            </div>
            <h2 className="text-3xl font-black italic text-white uppercase">Member Login</h2>
            <p className="text-zinc-400 text-sm mt-2">Welcome back to the IronForge.</p>
          </div>

          {error && (
            <div className="bg-red-900/20 border border-red-500/50 text-red-500 p-3 rounded-lg text-sm mb-6 text-center animate-pulse">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email Address"
              type="email"
              icon={Mail}
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label="Password"
              type="password"
              icon={Lock}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="flex justify-between items-center text-xs text-zinc-500">
              <label className="flex items-center gap-2 cursor-pointer hover:text-white">
                <input type="checkbox" className="accent-red-600" />
                Remember me
              </label>
              <Link to="/ForgotPassword" className="hover:text-red-500 transition-colors">
                Forgot Password?
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              size="lg"
              isLoading={isLoading}
              icon={ArrowRight}
            >
              Sign In
            </Button>
          </form>

          <div className="mt-8 text-center text-sm text-zinc-500">
            Don't have an account?{' '}
            <Link to="/register" className="text-white font-bold hover:text-red-500 transition-colors">
              Join Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;