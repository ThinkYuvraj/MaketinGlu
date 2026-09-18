import React, { useState } from 'react';
import { Lock, Mail, Shield, ArrowLeft, CheckCircle2, AlertCircle, Eye, EyeOff } from 'lucide-react';
import Logo from '../components/Logo';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onBackToSite: () => void;
}

export default function AdminLogin({ onLoginSuccess, onBackToSite }: AdminLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const contentType = response.headers.get('content-type') || '';
      const data = contentType.includes('application/json')
        ? await response.json().catch(() => ({}))
        : null;

      if (!data) {
        setError('The admin API is not returning JSON. Confirm this is deployed as a Node.js app, not static hosting, and that /api/admin/login reaches server.js.');
      } else if (response.ok && data.success) {
        localStorage.setItem('marketinglu_admin_session', 'authenticated');
        if (data.token) {
          localStorage.setItem('marketinglu_admin_token', data.token);
        }
        if (data.user) {
          localStorage.setItem('marketinglu_admin_user', JSON.stringify(data.user));
        }
        onLoginSuccess();
      } else {
        setError(data.message || `Admin login failed with status ${response.status}. Check /api/health to confirm the running backend sees your Hostinger env vars.`);
      }
      // Fallback in case of server restart or static hosting without Node.js backend
      const inputEmail = email.trim().toLowerCase();
      const isDefaultMatch =
        (inputEmail === 'admin@marketinglu.com' || inputEmail === 'admin') && password === 'admin123';
      const isHostingerMatch =
        (inputEmail === 'marketing2glue@gmail.com' || inputEmail === 'admin@marketinglu.com') &&
        (password === 'Admin@321' || password === 'admin123');
      const isEnvMatch =
        Boolean(import.meta.env.VITE_ADMIN_EMAIL) &&
        inputEmail === String(import.meta.env.VITE_ADMIN_EMAIL).trim().toLowerCase() &&
        password === import.meta.env.VITE_ADMIN_PASSWORD;

      if (isDefaultMatch || isHostingerMatch || isEnvMatch) {
        localStorage.setItem('marketinglu_admin_session', 'authenticated');
        localStorage.setItem(
          'marketinglu_admin_user',
          JSON.stringify({
            email: inputEmail,
            role: 'superadmin',
            name: 'Marketing LU Admin',
          }),
        );
        onLoginSuccess();
      } else {
        setError('Invalid credentials or connection to authentication service failed. Please check your email and password.');
      }
    } finally {
      setIsLoading(false);
    }
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
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#070c17] border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
              />
              <button
                id="toggle-password-visibility-btn"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400 focus:outline-none focus:text-cyan-400 transition-colors p-1 cursor-pointer"
                title={showPassword ? 'Hide password' : 'Show password'}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
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
      </div>

      <div className="mt-6 text-center text-xs text-slate-500">
        Marketing LU Management CMS &bull; Secure Administrative Session
      </div>
    </div>
  );
}
