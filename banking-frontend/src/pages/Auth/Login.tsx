import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // INTEGRATION POINT: Import `Login` from `../../APIs/authentication` and call it here.
      // Example:
      // const response = await loginApi(email, password);
      // if (response) { navigate('/dashboard'); }
      
      console.log('Login request submitted:', { email, password, rememberMe });
      
      // Mock successful login for visual feedback
      setTimeout(() => {
        setLoading(false);
        navigate('/dashboard');
      }, 1000);
      
    } catch (err: any) {
      setError(err.message || 'Invalid credentials. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#0B0F19] text-gray-100 font-sans">
      {/* Background Decorative Glowing Circles */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500 rounded-full glow-circle animate-pulse-glow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-500 rounded-full glow-circle animate-pulse-glow" style={{ animationDelay: '3s' }} />

      {/* Main Glassmorphic Wrapper */}
      <div className="w-full max-w-5xl mx-4 grid grid-cols-1 lg:grid-cols-12 rounded-3xl glass-panel overflow-hidden relative z-10 shadow-2xl border border-white/10 animate-scale-up">
        
        {/* Left Side: Brand Marketing & Visuals */}
        <div className="lg:col-span-5 bg-gradient-to-br from-blue-900/40 to-indigo-905/30 p-8 sm:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10 relative overflow-hidden">
          {/* Subtle grid pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
          
          <div className="flex items-center space-x-2 relative z-10">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-white">
              Secure<span className="text-blue-400">Bank</span>
            </span>
          </div>

          <div className="my-12 relative z-10 space-y-6">
            <div className="p-1 px-3 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs text-blue-400 inline-block font-medium">
              Enterprise Grade Protection
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight leading-tight">
              Next-Gen <span className="text-gradient-primary">Digital Banking</span> for Everyone.
            </h1>
            <p className="text-gray-400 text-sm leading-relaxed">
              Experience ultra-secure transactions, virtual credit cards, and comprehensive ATM controls right at your fingertips.
            </p>

            {/* Virtual Card Graphic */}
            <div className="relative pt-6 max-w-[280px] mx-auto lg:mx-0 animate-float">
              <div className="w-full aspect-[1.586] rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-blue-800 p-5 shadow-2xl border border-white/15 relative overflow-hidden flex flex-col justify-between">
                {/* Chip and Contactless Icon */}
                <div className="flex justify-between items-center">
                  <div className="w-9 h-7 bg-amber-400/80 rounded-md shadow-inner border border-amber-300/40 relative overflow-hidden">
                    <div className="absolute inset-0 grid grid-cols-3 gap-0.5 opacity-30">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="border border-black/40" />
                      ))}
                    </div>
                  </div>
                  <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center opacity-70">
                    <span className="text-[10px] text-white">📡</span>
                  </div>
                </div>
                {/* Card Number Placeholder */}
                <div>
                  <p className="text-xs text-white/50 tracking-wider">SECURE BANK PLATINUM</p>
                  <p className="text-sm font-mono text-white tracking-widest mt-1">••••  ••••  ••••  1234</p>
                </div>
                {/* Holder and Logo */}
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[9px] text-white/40 uppercase">Card Holder</p>
                    <p className="text-[11px] font-semibold text-white tracking-wider">JOHN DOE</p>
                  </div>
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-red-500/80" />
                    <div className="w-6 h-6 rounded-full bg-yellow-500/80" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-xs text-gray-500 relative z-10 flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Need help? Contact support 24/7.</span>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="lg:col-span-7 p-8 sm:p-12 md:p-16 flex flex-col justify-center bg-slate-900/30">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">Welcome Back</h2>
            <p className="text-gray-400 text-sm mt-1">Please enter your details to sign in.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400 animate-scale-up">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-4 py-3 rounded-xl border border-white/10 glass-input text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-500 text-white"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Password
                </label>
                <Link to="/forgot-password" className="text-xs font-medium text-blue-400 hover:text-blue-300 transition">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-4 py-3 rounded-xl border border-white/10 glass-input text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-500 text-white"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4.5 w-4.5 text-blue-600 focus:ring-blue-500/20 bg-slate-950 border-white/10 rounded cursor-pointer"
              />
              <label htmlFor="remember-me" className="ml-2.5 block text-sm text-gray-300 cursor-pointer select-none">
                Keep me signed in
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-sm font-semibold text-white glow-btn-primary disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <span>{loading ? 'Signing In...' : 'Sign In'}</span>
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>

            <div className="text-center pt-2">
              <p className="text-sm text-gray-400">
                Don't have an account?{' '}
                <Link to="/signup" className="font-semibold text-blue-400 hover:text-blue-300 transition">
                  Sign up here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;