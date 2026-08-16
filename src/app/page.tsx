"use client";

import React, { useState } from 'react';
import { useDatabase } from '@/context/DatabaseContext';
import { Header } from '@/components/Header';
import { AdminDashboard } from '@/components/AdminDashboard';
import { HODDashboard } from '@/components/HODDashboard';
import { FacultyDashboard } from '@/components/FacultyDashboard';
import { StudentDashboard } from '@/components/StudentDashboard';
import { School, LogIn, Sparkles } from 'lucide-react';

export default function Home() {
  const { currentUser, login } = useDatabase();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const success = login(username, password);
    if (!success) {
      setErrorMsg('Invalid login credentials or suspended account.');
    }
  };

  // Render appropriate dashboard
  const renderDashboard = () => {
    if (!currentUser) return null;
    switch (currentUser.role) {
      case 'admin':
        return <AdminDashboard />;
      case 'hod':
        return <HODDashboard />;
      case 'faculty':
        return <FacultyDashboard />;
      case 'student':
        return <StudentDashboard />;
      default:
        return (
          <div className="flex flex-col items-center justify-center p-12 text-slate-500">
            <p>Role not recognized</p>
          </div>
        );
    }
  };

  if (currentUser) {
    return (
      <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100">
        <Header />
        <main className="flex-1 pb-16 bg-slate-950">
          {renderDashboard()}
        </main>
        <footer className="border-t border-slate-900 bg-slate-950 py-4 text-center text-xs text-slate-600">
          <p>© 2026 Sri Muthukumaran Institute of Technology • Department of IT. All rights reserved.</p>
        </footer>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 px-4 py-12 sm:px-6 lg:px-8">
      {/* Decorative gradients */}
      <div className="absolute top-0 -left-4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 -right-4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md space-y-8 z-10">
        {/* Branding header */}
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-xl shadow-indigo-500/20">
            <School className="h-7 w-7 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-white">SMIT Portal</h2>
          <p className="mt-2 text-sm text-slate-400">
            Assignment & Homework Tracker
          </p>
          <div className="mt-1 flex items-center justify-center gap-1.5 text-xs text-indigo-400 font-semibold uppercase tracking-wider">
            <Sparkles className="h-3 w-3" />
            <span>IT Department • AY 2026-2027</span>
          </div>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-8 shadow-2xl backdrop-blur-md">
          <form onSubmit={handleLoginSubmit} className="space-y-6">
            {errorMsg && (
              <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3.5 text-center text-xs font-semibold text-red-400">
                {errorMsg}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  Register Number / Email / User ID
                </label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. HOD, 212625205001, or email"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 placeholder-slate-650 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 placeholder-slate-650 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white shadow-lg hover:bg-indigo-500 transition-all duration-200"
            >
              <LogIn className="h-4 w-4" />
              <span>Sign In</span>
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
