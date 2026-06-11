import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Lock, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!agreeTerms) {
      setError('You must agree to the Terms and Conditions');
      return;
    }

    setLoading(true);

    try {
      // INTEGRATION POINT: Import `registerUser` from `../../APIs/authentication` and call it here.
      // Example:
      // const response = await registerUser(formData.name, formData.email, formData.phone, formData.password);
      // if (response) { navigate('/login'); }

      console.log('Signup attempt submitted:', formData);

      // Mock successful account creation
      setTimeout(() => {
        setLoading(false);
        navigate('/login');
      }, 1200);

    } catch (err: any) {
      setError(err.message || 'Failed to create account. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#0B0F19] text-gray-100 font-sans">
      {/* Background Decorative Glowing Circles */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500 rounded-full glow-circle animate-pulse-glow" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500 rounded-full glow-circle animate-pulse-glow" style={{ animationDelay: '3s' }} />

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
            <div className="p-1 px-3 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-400 inline-block font-medium">
              Create an Account
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight leading-tight">
              Start your <br />
              <span className="text-gradient-primary">Financial Journey</span> with us.
            </h1>
            <p className="text-gray-400 text-sm leading-relaxed">
              Setting up takes less than 2 minutes. Gain access to savings accounts, instant bank statements, and smart analytics.
            </p>

            {/* Micro Graphic: Security Trust badges */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-start gap-1">
                <span className="text-lg">🔒</span>
                <span className="text-xs font-semibold text-white">Encrypted Data</span>
                <span className="text-[10px] text-gray-500">AES-256 bits</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-start gap-1">
                <span className="text-lg">⚡</span>
                <span className="text-xs font-semibold text-white">Instant Setup</span>
                <span className="text-[10px] text-gray-500">Fast approval</span>
              </div>
            </div>
          </div>

          <div className="text-xs text-gray-500 relative z-10 flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Need help? Contact support 24/7.</span>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="lg:col-span-7 p-8 sm:p-12 md:p-12 flex flex-col justify-center bg-slate-900/30">
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">Create Account</h2>
            <p className="text-gray-400 text-sm mt-1">Get started by entering your registration details.</p>
          </div>

          {error && (
            <div className="mb-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400 animate-scale-up">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full pl-9 pr-3 py-2.5 rounded-xl border border-white/10 glass-input text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-600 text-white"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="block w-full pl-9 pr-3 py-2.5 rounded-xl border border-white/10 glass-input text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-600 text-white"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-9 pr-3 py-2.5 rounded-xl border border-white/10 glass-input text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-600 text-white"
                  placeholder="john.doe@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full pl-9 pr-3 py-2.5 rounded-xl border border-white/10 glass-input text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-600 text-white"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    name="confirmPassword"
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="block w-full pl-9 pr-3 py-2.5 rounded-xl border border-white/10 glass-input text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-600 text-white"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-start pt-2">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="h-4.5 w-4.5 text-blue-600 focus:ring-blue-500/20 bg-slate-950 border-white/10 rounded cursor-pointer mt-0.5"
              />
              <label htmlFor="terms" className="ml-2.5 block text-xs text-gray-400 cursor-pointer select-none leading-relaxed">
                I agree to the{' '}
                <a href="#" className="font-semibold text-blue-400 hover:text-blue-300 transition">
                  Terms & Conditions
                </a>{' '}
                and{' '}
                <a href="#" className="font-semibold text-blue-400 hover:text-blue-300 transition">
                  Privacy Policy
                </a>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-sm font-semibold text-white glow-btn-primary disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer mt-4"
            >
              <span>{loading ? 'Creating Account...' : 'Create Account'}</span>
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>

            <div className="text-center pt-2">
              <p className="text-sm text-gray-400">
                Already have an account?{' '}
                <Link to="/login" className="font-semibold text-blue-400 hover:text-blue-300 transition">
                  Sign in here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;