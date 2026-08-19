"use client";
import React, { useState } from 'react';
import { useDatabase } from '@/context/DatabaseContext';
import { LogOut, GraduationCap, School, Key, X } from 'lucide-react';

interface HeaderProps {
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = () => {
  const { currentUser, logout, updateMyPassword } = useDatabase();
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handlePasswordChangeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!oldPassword || !newPassword || !confirmPassword) {
      setErrorMsg("All fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg("New passwords do not match.");
      return;
    }

    const res = updateMyPassword(oldPassword, newPassword);
    if (res.success) {
      setSuccessMsg(res.message);
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        setShowChangePasswordModal(false);
        setSuccessMsg('');
      }, 1500);
    } else {
      setErrorMsg(res.message);
    }
  };

  return (
    <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-md sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo & Branding */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/20">
              <School className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xs font-bold tracking-tight text-white sm:text-base">
                <span className="hidden xs:inline sm:inline">Sri Muthukumaran Institute of Technology</span>
                <span className="inline xs:hidden sm:hidden">SMIT IT</span>
              </h1>
              <div className="flex items-center gap-1 text-[10px] sm:text-xs text-indigo-400 font-medium">
                <GraduationCap className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                <span className="hidden sm:inline">Department of Information Technology</span>
                <span className="inline sm:hidden">Dept of IT</span>
                <span className="text-slate-500">•</span>
                <span>AY 2026–27</span>
              </div>
            </div>
          </div>

          {/* User Section */}
          {currentUser && (
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="hidden text-right sm:block">
                <p className="text-xs font-semibold text-white">{currentUser.name}</p>
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-mono">
                  {currentUser.role === 'admin' ? 'Super Admin' : currentUser.role.toUpperCase()}
                </p>
              </div>

              <button
                onClick={() => setShowChangePasswordModal(true)}
                className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/40 px-2.5 py-1.5 text-xs font-semibold text-slate-350 hover:bg-slate-750 hover:text-white transition-all duration-200"
                title="Change Password"
              >
                <Key className="h-3.5 w-3.5 text-indigo-450" />
                <span className="hidden md:inline">Change Password</span>
              </button>

              <button
                onClick={logout}
                className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/40 px-2.5 py-1.5 text-xs font-semibold text-slate-300 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 transition-all duration-200"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Change Password Modal */}
      {showChangePasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Key className="h-4 w-4 text-indigo-400" />
                <span>Update Password</span>
              </h3>
              <button 
                onClick={() => {
                  setShowChangePasswordModal(false);
                  setErrorMsg('');
                  setSuccessMsg('');
                }} 
                className="text-slate-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {errorMsg && (
              <div className="mb-3 text-[11px] font-semibold text-red-405 bg-red-500/10 border border-red-500/15 p-2 rounded">
                {errorMsg}
              </div>
            )}
            {successMsg && (
              <div className="mb-3 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/15 p-2 rounded">
                {successMsg}
              </div>
            )}

            <form onSubmit={handlePasswordChangeSubmit} className="space-y-3.5">
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Current Password</label>
                <input
                  type="password"
                  required
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full rounded border border-slate-700 bg-slate-950 px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">New Password</label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full rounded border border-slate-700 bg-slate-950 px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Confirm New Password</label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded border border-slate-700 bg-slate-950 px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="pt-2 border-t border-slate-800 flex justify-end gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setShowChangePasswordModal(false);
                    setErrorMsg('');
                    setSuccessMsg('');
                  }}
                  className="rounded border border-slate-750 bg-slate-800/40 px-3 py-1.5 text-slate-350 hover:bg-slate-700 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded bg-indigo-650 px-3 py-1.5 text-white hover:bg-indigo-550 font-semibold"
                >
                  Save Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};
