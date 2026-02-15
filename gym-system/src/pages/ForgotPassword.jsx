import React, { useState } from 'react';
import { Mail, ArrowLeft, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import authService from '../services/authService';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      await authService.forgotPassword(email);
      setMessage('Reset link sent! Please check your inbox.');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-black z-0" />
      
      <div className="relative z-10 w-full max-w-md bg-zinc-900/80 backdrop-blur-md border border-zinc-800 p-8 rounded-2xl shadow-2xl">
        <Link to="/login" className="flex items-center gap-2 text-zinc-500 hover:text-white mb-6 text-sm transition-colors">
          <ArrowLeft size={16} /> Back to Login
        </Link>

        <h2 className="text-2xl font-black italic text-white uppercase mb-2">Reset Password</h2>
        <p className="text-zinc-400 text-sm mb-6">Enter your email and we'll send you a link to get back into your account.</p>

        {message && (
          <div className="bg-green-900/20 border border-green-500/50 text-green-500 p-3 rounded-lg text-sm mb-6">
            {message}
          </div>
        )}

        {error && (
          <div className="bg-red-900/20 border border-red-500/50 text-red-500 p-3 rounded-lg text-sm mb-6">
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

          <Button 
            variant="primary" 
            className="w-full" 
            isLoading={loading}
            icon={Send}
          >
            Send Reset Link
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;