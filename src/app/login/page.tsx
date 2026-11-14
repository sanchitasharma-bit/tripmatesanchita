'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Compass,
  Sparkles,
  MapPin,
  ArrowRight,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  ArrowLeft,
  CheckCircle2,
  Cloud,
  Send,
  Plane,
  Heart,
  Luggage,
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulated graceful login
    setTimeout(() => {
      setIsLoading(false);
      setAuthSuccess(true);
      setTimeout(() => {
        router.push('/');
      }, 1200);
    }, 900);
  };

  const handleGoogleAuth = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setAuthSuccess(true);
      setTimeout(() => {
        router.push('/');
      }, 1000);
    }, 800);
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-[#FDFBF7] via-[#F8F6F0] to-[#EFF6FF] flex flex-col justify-between selection:bg-[#FF6B35] selection:text-white">
      
      {/* ─── Ambient Floating Pastel Gradients (Zero Gravity Atmosphere) ─── */}
      <div className="absolute -top-32 -left-32 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-sky-200/50 via-teal-100/40 to-transparent blur-3xl pointer-events-none animate-ambient-glow" />
      <div className="absolute top-1/3 -right-32 w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-rose-100/60 via-amber-100/50 to-sky-100/40 blur-3xl pointer-events-none animate-ambient-glow" style={{ animationDelay: '4s' }} />
      <div className="absolute -bottom-40 left-1/4 w-[650px] h-[650px] rounded-full bg-gradient-to-t from-emerald-100/40 via-sky-100/30 to-transparent blur-3xl pointer-events-none animate-ambient-glow" style={{ animationDelay: '8s' }} />

      {/* ─── Top Floating Header / Back Link ─── */}
      <header className="relative z-30 max-w-7xl mx-auto w-full px-6 sm:px-10 pt-6 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/70 hover:bg-white text-slate-700 hover:text-slate-900 border border-white/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] backdrop-blur-md transition-all hover:-translate-y-0.5 text-xs font-bold"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-slate-500" />
          <span>Back to TripMate</span>
        </Link>

        {/* Currency & Safe Badge */}
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50/80 text-emerald-800 border border-emerald-200/60 text-[11px] font-semibold backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>AI Travel Cloud Online</span>
          </span>
        </div>
      </header>

      {/* ─── Split Screen Main Workspace ─── */}
      <main className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-8 py-8 lg:py-12 flex-1 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* ═══════════════════════════════════════════════════════════════════
              LEFT SIDE: HERO & FLOATING TRAVEL PARADISE (Anti-Gravity)
             ═══════════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-8 text-center lg:text-left relative">
            
            {/* Top Brand Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/80 border border-white/90 shadow-[0_8px_25px_rgba(0,0,0,0.04)] backdrop-blur-md self-center lg:self-start">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#FF6B35] to-[#FFA07A] flex items-center justify-center text-white shadow-2xs">
                <Compass className="w-3.5 h-3.5 stroke-[2.4]" />
              </div>
              <span className="text-xs font-black tracking-tight text-slate-800">
                Trip<span className="text-[#FF6B35]">Mate</span>
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-300" />
              <span className="text-[11px] font-semibold text-slate-500">Autonomous Trip Architect</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl font-black text-slate-800 tracking-tight leading-[1.12]">
                Plan Smarter. <br />
                Travel Better. <br />
                <span className="bg-gradient-to-r from-[#FF6B35] via-[#FF8C61] to-[#0284C7] bg-clip-text text-transparent">
                  Explore Anywhere.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Step into a weightless planning experience. Instant day-wise schedules, verified INR budget optimization, and curated destinations in one fluid workspace.
              </p>
            </div>

            {/* ─── Floating Anti-Gravity Travel Cards Array ─── */}
            <div className="relative pt-4 pb-2 max-w-lg mx-auto lg:mx-0">
              
              {/* Floating Card 1: Mountain Destination Card (Float Slow) */}
              <div className="animate-float-slow bg-white/80 backdrop-blur-xl p-4 rounded-3xl border border-white/90 shadow-[0_20px_40px_-15px_rgba(255,107,53,0.12)] flex items-center justify-between gap-4 max-w-sm">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl overflow-hidden shadow-xs flex-shrink-0">
                    <img
                      src="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=200&q=80"
                      alt="Manali"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-black text-slate-800">Manali Mountain Getaway</div>
                    <div className="text-[11px] text-slate-500 font-medium">3 Days • ₹8,500/person</div>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200/60 text-[10px] font-bold">
                  98% Match
                </span>
              </div>

              {/* Floating Card 2: AI Synthesis Time Pill (Float Reverse) */}
              <div className="animate-float-reverse mt-4 sm:ml-12 bg-white/80 backdrop-blur-xl px-4 py-3 rounded-full border border-white/90 shadow-[0_15px_35px_-10px_rgba(2,132,199,0.12)] inline-flex items-center gap-2.5 max-w-fit">
                <div className="w-7 h-7 rounded-full bg-sky-100 text-[#0284C7] flex items-center justify-center font-bold text-xs">
                  ⚡
                </div>
                <div className="text-left pr-2">
                  <span className="text-xs font-bold text-slate-800">AI Itinerary Formulated in 2.4s</span>
                  <span className="text-[10px] text-slate-400 block font-medium">Zero Hallucinations • Real INR Budget</span>
                </div>
              </div>

              {/* Floating Card 3: Coastal Card (Float Medium) */}
              <div className="animate-float-medium hidden sm:flex absolute right-0 -bottom-4 bg-white/80 backdrop-blur-xl p-3.5 rounded-3xl border border-white/90 shadow-[0_20px_45px_-12px_rgba(16,185,129,0.1)] items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Luggage className="w-4 h-4" />
                </div>
                <div className="text-left pr-2">
                  <div className="text-xs font-black text-slate-800">Zero Gravity Budget</div>
                  <div className="text-[10px] text-emerald-700 font-semibold">100% Free & Offline-Ready</div>
                </div>
              </div>

            </div>

            {/* Community proof & stats */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-3 text-xs text-slate-500">
              <div className="flex -space-x-2">
                <img className="h-7 w-7 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="avatar" />
                <img className="h-7 w-7 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="avatar" />
                <img className="h-7 w-7 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="avatar" />
              </div>
              <span className="font-medium text-slate-600">Joined by <strong>5,000+</strong> happy travelers this month</span>
            </div>

          </div>

          {/* ═══════════════════════════════════════════════════════════════════
              RIGHT SIDE: FLOATING GLASSMORPHISM LOGIN CARD
             ═══════════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            {/* Diffused colored halo behind card for weightless depth */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#FF6B35]/15 via-sky-200/20 to-teal-200/15 rounded-[40px] blur-2xl transform scale-95 pointer-events-none" />

            {/* The Floating Glass Card */}
            <div className="floating-glass-card relative w-full max-w-md rounded-[36px] p-7 sm:p-9 transition-all duration-500 hover:shadow-[0_30px_70px_-15px_rgba(255,107,53,0.12),0_25px_50px_-20px_rgba(2,132,199,0.12)]">
              
              {/* Tab Selector Pill (Sign In vs Create Account) */}
              <div className="flex p-1.5 rounded-full bg-slate-100/70 border border-white/60 mb-6 backdrop-blur-md">
                <button
                  type="button"
                  onClick={() => setIsSignUp(false)}
                  className={`flex-1 py-2.5 rounded-full text-xs font-bold transition-all ${
                    !isSignUp
                      ? 'bg-white text-slate-900 shadow-sm shadow-slate-200/50'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setIsSignUp(true)}
                  className={`flex-1 py-2.5 rounded-full text-xs font-bold transition-all ${
                    isSignUp
                      ? 'bg-white text-slate-900 shadow-sm shadow-slate-200/50'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Create Account
                </button>
              </div>

              {/* Title & Greeting */}
              <div className="mb-6 text-center sm:text-left">
                <h2 className="text-2xl font-black text-slate-800 tracking-tight">
                  {isSignUp ? 'Start Your Next Adventure' : 'Welcome Back, Explorer'}
                </h2>
                <p className="text-xs text-slate-500 mt-1 font-medium">
                  {isSignUp
                    ? 'Create your free account to sync itineraries & budgets.'
                    : 'Access your saved trips and personalized travel AI.'}
                </p>
              </div>

              {/* Success Notification */}
              {authSuccess && (
                <div className="mb-5 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Success! Launching your TripMate workspace...</span>
                </div>
              )}

              {/* Google SSO Button (Fully Rounded Pill) */}
              <button
                type="button"
                onClick={handleGoogleAuth}
                disabled={isLoading || authSuccess}
                className="w-full py-3.5 px-4 rounded-full bg-white/90 hover:bg-white text-slate-700 text-xs sm:text-sm font-bold border border-slate-200/80 hover:border-slate-300 shadow-[0_4px_15px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.06)] flex items-center justify-center gap-3 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60"
              >
                {/* Official Google Vector Icon */}
                <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.9c2.28-2.1 3.64-5.2 3.64-9.15z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.9-3.05c-1.08.72-2.45 1.16-4.03 1.16-3.1 0-5.74-2.1-6.68-4.91H1.28v3.15C3.25 21.3 7.31 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.32 14.29c-.24-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.56H1.28C.46 8.18 0 10.03 0 12s.46 3.82 1.28 5.44l4.04-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.7 1.28 6.56l4.04 3.15c.94-2.82 3.58-4.96 6.68-4.96z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>

              {/* Pastel Divider */}
              <div className="relative my-5 flex items-center justify-center">
                <div className="w-full border-t border-slate-200/60" />
                <span className="absolute px-3 bg-white/70 backdrop-blur-sm text-[11px] font-semibold text-slate-400">
                  or email
                </span>
              </div>

              {/* Input Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Full Name for Sign Up */}
                {isSignUp && (
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your Full Name"
                      className="w-full pl-11 pr-4 py-3 rounded-full bg-white/80 border border-slate-200/80 text-xs sm:text-sm text-slate-800 placeholder-slate-400 font-semibold focus:outline-none focus:border-[#FF6B35] focus:ring-3 focus:ring-orange-500/15 transition-all shadow-inner shadow-slate-100/40"
                    />
                  </div>
                )}

                {/* Email Address */}
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-11 pr-4 py-3 rounded-full bg-white/80 border border-slate-200/80 text-xs sm:text-sm text-slate-800 placeholder-slate-400 font-semibold focus:outline-none focus:border-[#FF6B35] focus:ring-3 focus:ring-orange-500/15 transition-all shadow-inner shadow-slate-100/40"
                  />
                </div>

                {/* Password */}
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-11 pr-11 py-3 rounded-full bg-white/80 border border-slate-200/80 text-xs sm:text-sm text-slate-800 placeholder-slate-400 font-semibold focus:outline-none focus:border-[#FF6B35] focus:ring-3 focus:ring-orange-500/15 transition-all shadow-inner shadow-slate-100/40"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Remember & Forgot options */}
                <div className="flex items-center justify-between text-xs px-2 pt-1 text-slate-500">
                  <label className="flex items-center gap-2 cursor-pointer font-medium hover:text-slate-700">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="rounded border-slate-300 text-[#FF6B35] focus:ring-orange-500/20"
                    />
                    <span>Remember me</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => alert('Password reset link sent to demo email!')}
                    className="text-[#0284C7] hover:text-[#0369A1] font-semibold transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Submit Button (Vibrant Warm Sunset Gradient Pill) */}
                <button
                  type="submit"
                  disabled={isLoading || authSuccess}
                  className="w-full mt-2 py-3.5 px-6 rounded-full bg-gradient-to-r from-[#FF6B35] via-[#FF8052] to-[#FFA07A] hover:from-[#EA580C] hover:to-[#FF8052] text-white font-bold text-sm shadow-[0_12px_30px_rgba(255,107,53,0.3)] hover:shadow-[0_16px_35px_rgba(255,107,53,0.4)] transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>{isSignUp ? 'Creating Profile...' : 'Authenticating...'}</span>
                    </>
                  ) : (
                    <>
                      <span>{isSignUp ? 'Create Free Account' : 'Sign In to TripMate'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Guest Access Alternative */}
              <div className="mt-5 pt-4 border-t border-slate-200/60 text-center">
                <Link
                  href="/"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#FF6B35] transition-colors"
                >
                  <span>Skip for now — Continue as Guest</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>
          </div>

        </div>
      </main>

      {/* ─── Bottom Subdued Footer ─── */}
      <footer className="relative z-20 max-w-7xl mx-auto w-full px-6 sm:px-10 py-5 text-center text-xs text-slate-400">
        <p>© 2026 TripMate AI. Pure anti-gravity design • Encrypted & private.</p>
      </footer>
    </div>
  );
}

