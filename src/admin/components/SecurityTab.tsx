import React, { useState, useEffect } from 'react';
import { ShieldCheck, Key, Mail, Lock, CheckCircle2, AlertCircle, RefreshCw, Server } from 'lucide-react';

export default function SecurityTab() {
  const [currentEmail, setCurrentEmail] = useState<string>('admin@marketinglu.com');
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newEmail, setNewEmail] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [serverStatus, setServerStatus] = useState<'connected' | 'checking' | 'offline'>('checking');

  const token = sessionStorage.getItem('marketinglu_admin_token') || '';

  const checkServerStatus = async () => {
    setServerStatus('checking');
    try {
      const res = await fetch('/api/admin/info', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        if (data.email) {
          setCurrentEmail(data.email);
        }
        setServerStatus('connected');
      } else {
        setServerStatus('offline');
      }
    } catch {
      setServerStatus('offline');
    }
  };

  useEffect(() => {
    checkServerStatus();
  }, []);

  const handleUpdateCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!currentPassword) {
      setErrorMsg('Current password is required to save new credentials.');
      return;
    }

    if (newPassword && newPassword !== confirmPassword) {
      setErrorMsg('New password and confirmation do not match.');
      return;
    }

    if (newPassword && newPassword.length < 6) {
      setErrorMsg('New password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/admin/change-credentials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword,
          newEmail: newEmail.trim() || undefined,
          newPassword: newPassword || undefined
        })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccessMsg(data.message || 'Credentials updated successfully on the backend server!');
        if (data.updatedEmail) {
          setCurrentEmail(data.updatedEmail);
        }
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setNewEmail('');
      } else {
        setErrorMsg(data.message || 'Failed to update credentials. Please check current password.');
      }
    } catch {
      setErrorMsg('Error communicating with backend authentication server.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Backend Status Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#091122] border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white">Backend Authentication Server</h3>
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                serverStatus === 'connected'
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  : serverStatus === 'checking'
                  ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                  : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
              }`}>
                {serverStatus === 'connected' ? 'Active & Protected' : serverStatus === 'checking' ? 'Verifying...' : 'Offline / Standalone'}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Active admin account: <span className="text-cyan-300 font-mono font-medium">{currentEmail}</span>
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={checkServerStatus}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Status</span>
        </button>
      </div>

      {/* Main Credentials Form */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#091122] border border-slate-800">
        <div className="flex items-center gap-2.5 mb-2">
          <Key className="w-4 h-4 text-cyan-400" />
          <h2 className="text-base font-bold text-white">Update Admin Credentials</h2>
        </div>
        <p className="text-xs text-slate-400 mb-6">
          Update the administrative login email or password stored on the backend server. These credentials are required to access this portal.
        </p>

        {successMsg && (
          <div className="mb-5 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2 text-xs text-emerald-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div className="mb-5 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-2 text-xs text-rose-300">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleUpdateCredentials} className="space-y-4 max-w-xl">
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              Current Password <span className="text-rose-400">*</span>
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password (default: admin123)"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#060a14] border border-slate-700/80 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              />
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800/80">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              New Admin Email (Optional)
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Leave blank to keep current email"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#060a14] border border-slate-700/80 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
              New Password (Optional)
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Leave blank to keep current password (min 6 characters)"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#060a14] border border-slate-700/80 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
              />
            </div>
          </div>

          {newPassword && (
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Confirm New Password <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-[#060a14] border border-slate-700/80 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                />
              </div>
            </div>
          )}

          <div className="pt-3">
            <button
              type="submit"
              disabled={isLoading}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 via-sky-400 to-cyan-400 text-slate-950 font-bold text-xs sm:text-sm hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer shadow-md shadow-cyan-500/20 flex items-center gap-2"
            >
              {isLoading ? (
                <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <ShieldCheck className="w-4 h-4" />
              )}
              <span>Save Admin Credentials</span>
            </button>
          </div>
        </form>
      </div>

      {/* Environment Variables Reference Info */}
      <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 space-y-2">
        <h4 className="font-bold text-slate-300">Environment Configuration:</h4>
        <p>
          Set these exact variables in Hostinger's Node.js app environment, then restart the app:
        </p>
        <div className="font-mono bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-[11px] text-cyan-300 select-all">
          ADMIN_EMAIL=admin@marketinglu.com<br />
          ADMIN_PASSWORD=your_secure_password
        </div>
        <p>
          Do not add quotes around the values. Changes made inside this CMS are temporary until these server variables are updated.
        </p>
      </div>
    </div>
  );
}
