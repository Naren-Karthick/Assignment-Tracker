"use client";

import React, { useState } from 'react';
import { useDatabase, Assignment } from '@/context/DatabaseContext';
import { 
  ClipboardCheck, Clock, FileText, CheckCircle2, 
  HelpCircle, ChevronRight, BookOpen, Send, Calendar 
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const { currentUser, assignments, submissions, subjects } = useDatabase();
  const [filterSubject, setFilterSubject] = useState('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'Pending' | 'Completed' | 'Late' | 'Missing'>('all');
  const [filterType, setFilterType] = useState<'all' | 'Assignment' | 'Test' | 'Homework'>('all');

  // Filter assignments based on student's year
  const studentYear = currentUser?.targetYear;
  const studentAssignments = assignments.filter(a => a.year === studentYear);

  // Get active subjects in this year to filter
  const yearSubjects = subjects.filter(s => s.year === studentYear);

  const filteredAssignments = studentAssignments.filter(a => {
    const sub = submissions.find(s => s.assignmentId === a.id && s.studentRegisterNo === currentUser?.id);
    const matchesSubject = filterSubject === 'all' || a.subjectCode === filterSubject;
    const matchesStatus = filterStatus === 'all' || (sub ? sub.status === filterStatus : filterStatus === 'Pending');
    const matchesType = filterType === 'all' || a.type === filterType;
    return matchesSubject && matchesStatus && matchesType;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Upper info card */}
      <div className="mb-8 rounded-2xl border border-indigo-500/20 bg-gradient-to-r from-slate-900 via-indigo-950/10 to-slate-900 p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="inline-flex items-center rounded-md bg-indigo-500/10 px-2.5 py-0.5 text-xs font-semibold text-indigo-400 border border-indigo-500/20 uppercase tracking-wider mb-2.5">
              IT DEPARTMENT • {currentUser?.targetYear?.replace('_', ' ').toUpperCase()}
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Student Workspace</h2>
            <p className="mt-2 text-sm text-slate-300">
              Welcome, <strong className="text-white">{currentUser?.name}</strong> (Register No: <code className="text-indigo-300 font-mono text-xs">{currentUser?.id}</code>)
            </p>
          </div>

          <div className="flex gap-4 text-center">
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 min-w-[100px]">
              <p className="text-emerald-400 font-bold text-xl">
                {submissions.filter(s => s.studentRegisterNo === currentUser?.id && (s.status === 'Completed' || s.status === 'Late')).length}
              </p>
              <p className="text-slate-500 text-[10px] uppercase font-semibold tracking-wider mt-1">Submitted</p>
            </div>
            <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 min-w-[100px]">
              <p className="text-amber-400 font-bold text-xl">
                {submissions.filter(s => s.studentRegisterNo === currentUser?.id && s.status === 'Pending').length}
              </p>
              <p className="text-slate-500 text-[10px] uppercase font-semibold tracking-wider mt-1">Pending</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col gap-3 rounded-xl border border-slate-800 bg-slate-900/40 p-4 mb-6 sm:flex-row sm:items-center">
        <span className="text-xs font-semibold uppercase text-slate-400 tracking-wider">Filters:</span>
        
        <select
          value={filterSubject}
          onChange={(e) => setFilterSubject(e.target.value)}
          className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-350 focus:border-indigo-500 focus:outline-none"
        >
          <option value="all">All Subjects</option>
          {yearSubjects.map(s => (
            <option key={s.code} value={s.code}>{s.code} - {s.name}</option>
          ))}
        </select>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as any)}
          className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-350 focus:border-indigo-500 focus:outline-none"
        >
          <option value="all">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed (On-time)</option>
          <option value="Late">Late Submission</option>
          <option value="Missing">Missing</option>
        </select>

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as any)}
          className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-350 focus:border-indigo-500 focus:outline-none"
        >
          <option value="all">All Types</option>
          <option value="Assignment">Assignment Only</option>
          <option value="Test">Test Only</option>
          <option value="Homework">Homework Only</option>
        </select>
      </div>

      {/* Assignments list */}
      <div className="space-y-4">
        {filteredAssignments.length === 0 ? (
          <div className="rounded-xl border border-slate-800 bg-slate-900/10 p-12 text-center text-slate-500 text-sm">
            No assignments match your filters.
          </div>
        ) : (
          filteredAssignments.map(a => {
            const sub = submissions.find(
              s => s.assignmentId === a.id && s.studentRegisterNo === currentUser?.id
            );

            const isPending = !sub || sub.status === 'Pending';
            const isCompleted = sub?.status === 'Completed' || sub?.status === 'Late';

            return (
              <div 
                key={a.id}
                className="rounded-xl border border-slate-800 bg-slate-900/30 p-6 hover:border-slate-700 transition-all duration-200"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  {/* Info */}
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center rounded px-2 py-0.5 text-[10px] font-semibold border ${
                        a.type === 'Assignment' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' :
                        a.type === 'Test' ? 'bg-pink-500/10 text-pink-400 border-pink-500/20' :
                        'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      } uppercase tracking-wider`}>
                        {a.type}
                      </span>
                      <span className="inline-flex items-center rounded bg-slate-850 px-2 py-0.5 text-[10px] font-semibold text-slate-350 border border-slate-800 uppercase tracking-wider">
                        {a.subjectCode} • {a.subjectName}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
                        <Calendar className="h-3 w-3" />
                        <span>Due: {a.dueDate}</span>
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white">{a.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed max-w-3xl">{a.description}</p>

                    {/* Feedback and Marks */}
                    {sub && (sub.score !== undefined || sub.feedback) && (
                      <div className="mt-3 rounded-lg bg-indigo-500/5 border border-indigo-500/10 p-3 max-w-2xl">
                        <div className="flex justify-between items-center text-xs font-bold text-slate-300">
                          <span>Faculty Evaluation:</span>
                          {sub.score !== undefined && (
                            <span className="text-indigo-400">Score: {sub.score} / {a.totalMark || 100}</span>
                          )}
                        </div>
                        {sub.feedback && (
                          <p className="text-xs text-slate-400 italic mt-1 font-mono">"{sub.feedback}"</p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Submission Control */}
                  <div className="flex flex-col sm:items-end gap-2 shrink-0">
                    <span className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-bold border ${
                      sub?.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                      sub?.status === 'Late' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                      sub?.status === 'Missing' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                      'bg-slate-500/10 text-slate-400 border-slate-500/20'
                    }`}>
                      {sub?.status || 'Pending'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
