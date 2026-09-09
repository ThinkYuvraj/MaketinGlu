import React, { useState } from 'react';
import { Lock, Mail, Shield, ArrowLeft, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import Logo from '../components/Logo';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onBackToSite: () => void;
}

export default function AdminLogin({ onLoginSuccess, onBackToSite }: AdminLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      // Standard admin demo credentials
      if (
        (email.trim().toLowerCase() === 'admin@marketinglu.com' || email.trim().toLowerCase() === 'admin') &&
        password === 'admin123'
      ) {
        localStorage.setItem('marketinglu_admin_session', 'authenticated');
        onLoginSuccess();
      } else {
        setError('Invalid credentials. Use demo: admin@marketinglu.com / admin123');
      }
      setIsLoading(false);
    }, 400);
  };

  const handleQuickDemoFill = () => {
    setEmail('admin@marketinglu.com');
    setPassword('admin123');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#050811] flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden text-slate-100">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[350px] h-[300px] bg-sky-600/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Top back navigation */}
      <div className="w-full max-w-md mb-6 flex items-center justify-between z-10">
        <button
          onClick={onBackToSite}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Live Website</span>
        </button>

        <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded-full border border-cyan-800/40">
          <Shield className="w-3 h-3" />
          <span>Admin Portal</span>
        </div>
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-md bg-[#0a1120] border border-slate-800/90 rounded-2xl p-6 sm:p-8 shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Logo variant="light-badge" />
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Marketing LU CMS Admin
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1.5 leading-relaxed">
            Sign in to manage live UI/UX configurations, content fixes, retainers, and client reviews.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-2.5 text-xs text-rose-300 animate-fade-in">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Admin Email / Username
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@marketinglu.com"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#070c17] border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#070c17] border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-sky-500 via-sky-400 to-cyan-400 text-slate-950 font-bold text-sm hover:brightness-110 active:scale-[0.98] transition-all duration-200 cursor-pointer shadow-lg shadow-cyan-500/25 mt-2 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <span className="inline-block w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>Enter Admin Studio</span>
              </>
            )}
          </button>
        </form>

        {/* Demo Credentials Quick Fill */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 text-center">
          <div className="text-[11px] text-slate-400 mb-2">
            Need test access?
          </div>
          <button
            type="button"
            onClick={handleQuickDemoFill}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/40 border border-cyan-800/50 text-cyan-300 text-xs font-medium hover:bg-cyan-900/50 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>Auto-fill Demo: admin@marketinglu.com / admin123</span>
          </button>
        </div>
      </div>

      <div className="mt-6 text-center text-xs text-slate-500">
        Marketing LU Management CMS &bull; Secure Administrative Session
      </div>
    </div>
  );
}
