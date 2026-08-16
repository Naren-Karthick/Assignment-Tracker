"use client";

import React from 'react';
import { useDatabase } from '@/context/DatabaseContext';
import { LogOut, GraduationCap, School, BookOpen } from 'lucide-react';

interface HeaderProps {
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = () => {
  const { currentUser, logout, resetDatabase } = useDatabase();

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
              <h1 className="text-sm font-bold tracking-tight text-white sm:text-base">
                Sri Muthukumaran Institute of Technology
              </h1>
              <div className="flex items-center gap-1.5 text-xs text-indigo-400 font-medium">
                <GraduationCap className="h-3 w-3" />
                <span>Department of Information Technology</span>
                <span className="text-slate-500">•</span>
                <span>AY 2026–2027</span>
              </div>
            </div>
          </div>

          {/* User Section */}
          {currentUser && (
            <div className="flex items-center gap-4">
              <div className="hidden text-right sm:block">
                <p className="text-xs font-semibold text-white">{currentUser.name}</p>
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-mono">
                  {currentUser.role === 'admin' ? 'Super Admin' : currentUser.role.toUpperCase()}
                </p>
              </div>

              <button
                onClick={logout}
                className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/40 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 transition-all duration-200"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
