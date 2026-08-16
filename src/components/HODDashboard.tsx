"use client";

import React, { useState } from 'react';
import { useDatabase, Subject, User, Assignment } from '@/context/DatabaseContext';
import { FacultyDashboard } from './FacultyDashboard';
import { 
  Users, BookOpen, GraduationCap, FileText, Download, 
  Plus, Trash2, ShieldAlert, Award, ChevronRight, X, Search 
} from 'lucide-react';

export const HODDashboard: React.FC<{ isEmbedded?: boolean }> = ({ isEmbedded = false }) => {
  const { 
    users, subjects, assignments, submissions, 
    addFaculty, updateFaculty, deleteUser,
    addSubject, updateSubjectStaff, deleteSubject 
  } = useDatabase();

  const [activeTab, setActiveTab] = useState<'analytics' | 'staff' | 'subjects' | 'teaching'>('analytics');
  const [selectedAssignmentDetails, setSelectedAssignmentDetails] = useState<Assignment | null>(null);
  const [editingSubjectCode, setEditingSubjectCode] = useState<string | null>(null);

  // Form States for Staff
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [staffName, setStaffName] = useState('');
  const [staffEmail, setStaffEmail] = useState('');
  const [staffPassword, setStaffPassword] = useState('password123');

  // Form States for Subject
  const [showSubjectModal, setShowSubjectModal] = useState(false);
  const [subCode, setSubCode] = useState('');
  const [subName, setSubName] = useState('');
  const [subSem, setSubSem] = useState('3rd Semester (Odd)');
  const [subYear, setSubYear] = useState<'2nd_year' | '3rd_year' | '4th_year'>('2nd_year');
  const [subStaffId, setSubStaffId] = useState('');

  // Faculty List - only show users with role 'faculty' in HOD's Teaching Staff roster view
  const facultyUsers = users.filter(u => u.role === 'faculty');

  // Allocable Staff List - HODs can assign classes to either HODs or Faculty (Admins excluded)
  const allocableStaff = users.filter(u => u.role === 'faculty' || u.role === 'hod');

  // Semester dropdown list
  const semesters = [
    "3rd Semester (Odd)",
    "5th Semester (Odd)",
    "7th Semester (Odd)"
  ];

  // CSV Export Utility
  const exportAnalyticsToCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Task Title,Type,Subject,Year,Due Date,Total Roster,Completed,Pending,Late,Missing,Completion Rate (%)\n";

    assignments.forEach(a => {
      const targetSubs = submissions.filter(s => s.assignmentId === a.id);
      const total = targetSubs.length;
      const completed = targetSubs.filter(s => s.status === 'Completed').length;
      const pending = targetSubs.filter(s => s.status === 'Pending').length;
      const late = targetSubs.filter(s => s.status === 'Late').length;
      const missing = targetSubs.filter(s => s.status === 'Missing').length;
      const rate = total > 0 ? Math.round(((completed + late) / total) * 100) : 0;

      csvContent += `"${a.title}","${a.type}","${a.subjectName} (${a.subjectCode})","${a.year.replace('_', ' ')}","${a.dueDate}",${total},${completed},${pending},${late},${missing},${rate}%\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "SMIT_IT_Department_Assignment_Analytics.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCreateStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!staffName || !staffEmail || !staffPassword) return;

    if (users.some(u => u.id.toLowerCase() === staffEmail.toLowerCase())) {
      alert("Faculty User ID/Email already exists.");
      return;
    }

    addFaculty(staffName, staffEmail, staffPassword);
    setStaffName('');
    setStaffEmail('');
    setStaffPassword('password123');
    setShowStaffModal(false);
  };

  const handleCreateSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subCode || !subName || !subStaffId) return;

    if (subjects.some(s => s.code.toLowerCase() === subCode.toLowerCase())) {
      alert("Subject Code already exists.");
      return;
    }

    addSubject(subCode, subName, subSem, subYear, subStaffId);
    setSubCode('');
    setSubName('');
    setSubStaffId('');
    setShowSubjectModal(false);
  };

  return (
    <div className={isEmbedded ? "" : "mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"}>
      {/* Page header */}
      {!isEmbedded ? (
        <div className="mb-8 flex flex-col justify-between gap-4 border-b border-slate-800 pb-5 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">HOD Dashboard</h2>
            <p className="mt-1 text-sm text-slate-400">Department of Information Technology • Academic Management & Quality Assurance.</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={exportAnalyticsToCSV}
              className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 transition-all duration-200"
            >
              <Download className="h-4 w-4" />
              <span>Export Analytics (CSV)</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="mb-4 flex justify-between items-center border-b border-slate-800 pb-3">
          <p className="text-sm font-medium text-slate-400">Department management and subject allocations workspace.</p>
          <button 
            onClick={exportAnalyticsToCSV}
            className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-md hover:bg-indigo-500 transition-all duration-200"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export Analytics</span>
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-800 mb-8 overflow-x-auto pb-px">
        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-all duration-200 whitespace-nowrap ${activeTab === 'analytics' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
        >
          <FileText className="h-4 w-4" />
          <span>Assignment Analytics</span>
        </button>
        <button
          onClick={() => setActiveTab('teaching')}
          className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-all duration-200 whitespace-nowrap ${activeTab === 'teaching' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
        >
          <GraduationCap className="h-4 w-4" />
          <span>Teaching Workspace</span>
        </button>
        <button
          onClick={() => setActiveTab('staff')}
          className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-all duration-200 whitespace-nowrap ${activeTab === 'staff' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
        >
          <Users className="h-4 w-4" />
          <span>Manage Teaching Staff</span>
        </button>
        <button
          onClick={() => setActiveTab('subjects')}
          className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-all duration-200 whitespace-nowrap ${activeTab === 'subjects' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
        >
          <BookOpen className="h-4 w-4" />
          <span>Subjects & Allocations</span>
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'analytics' && (
        <div className="space-y-8 animate-in fade-in-50 duration-200">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Assignments List */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-base font-bold text-white">Active Class Assignments</h3>
              
              <div className="space-y-3">
                {assignments.length === 0 ? (
                  <div className="rounded-xl border border-slate-800 bg-slate-900/10 p-6 text-center text-slate-500 text-sm">
                    No assignments posted by faculty yet.
                  </div>
                ) : (
                  assignments.map(a => {
                    const targetSubs = submissions.filter(s => s.assignmentId === a.id);
                    const total = targetSubs.length;
                    const completed = targetSubs.filter(s => s.status === 'Completed').length;
                    const late = targetSubs.filter(s => s.status === 'Late').length;
                    const rate = total > 0 ? Math.round(((completed + late) / total) * 100) : 0;
                    const faculty = users.find(u => u.id === a.facultyId);

                    return (
                      <div 
                        key={a.id}
                        onClick={() => setSelectedAssignmentDetails(a)}
                        className={`group rounded-xl border p-5 bg-slate-900/30 hover:bg-slate-900/50 cursor-pointer transition-all duration-200 ${
                          selectedAssignmentDetails?.id === a.id ? 'border-indigo-500 shadow-lg shadow-indigo-500/10' : 'border-slate-800'
                        }`}
                      >
                        <div className="flex justify-between items-start gap-4">
                          <div>
                            <span className="inline-flex items-center rounded bg-indigo-500/10 px-2 py-0.5 text-[10px] font-semibold text-indigo-400 border border-indigo-500/20 uppercase tracking-wider mb-2">
                              {a.type} • {a.year.replace('_', ' ')} • {a.subjectCode}
                            </span>
                            <h4 className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">{a.title}</h4>
                            <p className="text-xs text-slate-400 mt-1 line-clamp-2">{a.description}</p>
                            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                              <span>Allocated Faculty: <strong className="text-slate-400">{faculty?.name || a.facultyId}</strong></span>
                              <span>•</span>
                              <span>Due: <strong className="text-slate-400">{new Date(a.dueDate).toLocaleDateString()}</strong></span>
                            </div>
                          </div>

                          <div className="text-right">
                            <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${
                              rate > 75 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                              rate > 40 ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                              'bg-red-500/10 text-red-400 border border-red-500/20'
                            }`}>
                              {rate}% Completed
                            </span>
                            <p className="text-[10px] text-slate-500 mt-1">{completed + late} of {total} submitted</p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Selected Assignment Details Panel */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 h-fit">
              {selectedAssignmentDetails ? (
                <div className="space-y-6 animate-in fade-in-50 duration-200">
                  <div className="flex justify-between items-start gap-2 border-b border-slate-800 pb-4">
                    <div>
                      <span className="text-[10px] font-semibold text-indigo-400 uppercase tracking-wider">
                        {selectedAssignmentDetails.subjectName}
                      </span>
                      <h3 className="text-base font-bold text-white mt-1">{selectedAssignmentDetails.title}</h3>
                    </div>
                    <button 
                      onClick={() => setSelectedAssignmentDetails(null)}
                      className="text-slate-500 hover:text-white"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Submission Metrics</h4>
                    <div className="grid grid-cols-2 gap-2 text-center text-xs">
                      <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-850">
                        <p className="text-emerald-400 font-bold text-base">
                          {submissions.filter(s => s.assignmentId === selectedAssignmentDetails.id && s.status === 'Completed').length}
                        </p>
                        <p className="text-slate-500 text-[10px]">On-Time</p>
                      </div>
                      <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-850">
                        <p className="text-amber-400 font-bold text-base">
                          {submissions.filter(s => s.assignmentId === selectedAssignmentDetails.id && s.status === 'Late').length}
                        </p>
                        <p className="text-slate-500 text-[10px]">Late</p>
                      </div>
                      <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-850">
                        <p className="text-blue-400 font-bold text-base">
                          {submissions.filter(s => s.assignmentId === selectedAssignmentDetails.id && s.status === 'Pending').length}
                        </p>
                        <p className="text-slate-500 text-[10px]">Pending</p>
                      </div>
                      <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-850">
                        <p className="text-red-400 font-bold text-base">
                          {submissions.filter(s => s.assignmentId === selectedAssignmentDetails.id && s.status === 'Missing').length}
                        </p>
                        <p className="text-slate-500 text-[10px]">Missing</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Detailed Roster Status</h4>
                    <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                      {users
                        .filter(u => u.role === 'student' && u.targetYear === selectedAssignmentDetails.year)
                        .map(student => {
                          const sub = submissions.find(
                            s => s.assignmentId === selectedAssignmentDetails.id && s.studentRegisterNo === student.id
                          );
                          return (
                            <div key={student.id} className="flex justify-between items-center text-xs border-b border-slate-800/40 pb-2">
                              <div>
                                <p className="font-semibold text-slate-200">{student.name}</p>
                                <p className="text-[10px] font-mono text-slate-500">{student.id}</p>
                              </div>
                              <span className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-semibold border ${
                                sub?.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                sub?.status === 'Late' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                                sub?.status === 'Missing' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                                'bg-slate-500/10 text-slate-400 border-slate-500/20'
                              }`}>
                                {sub?.status || 'Pending'}
                              </span>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-slate-500">
                  <FileText className="h-8 w-8 text-slate-700 mx-auto mb-2" />
                  <p className="text-sm font-medium">No Assignment Selected</p>
                  <p className="text-xs text-slate-600 mt-1">Select an assignment to view its detailed roster and marks records.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'staff' && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white">Department Teaching Staff</h3>
            <button
              onClick={() => setShowStaffModal(true)}
              className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
            >
              <Plus className="h-4 w-4" />
              <span>Add Staff</span>
            </button>
          </div>

          {/* Add Staff Modal */}
          {showStaffModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
              <div className="w-full max-w-md rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-2xl animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                  <h3 className="text-lg font-bold text-white">Add New Teaching Staff</h3>
                  <button onClick={() => setShowStaffModal(false)} className="text-slate-400 hover:text-white">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <form onSubmit={handleCreateStaff} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={staffName}
                      onChange={(e) => setStaffName(e.target.value)}
                      placeholder="e.g. Mrs. Priya S"
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2.5 text-sm text-slate-100 placeholder-slate-600 focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Email ID</label>
                    <input
                      type="email"
                      required
                      value={staffEmail}
                      onChange={(e) => setStaffEmail(e.target.value)}
                      placeholder="e.g. priya@smit.edu.in"
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2.5 text-sm text-slate-100 placeholder-slate-600 focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Initial Password</label>
                    <input
                      type="password"
                      required
                      value={staffPassword}
                      onChange={(e) => setStaffPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2.5 text-sm text-slate-100 placeholder-slate-600 focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div className="flex gap-3 justify-end pt-4 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => setShowStaffModal(false)}
                      className="rounded-lg border border-slate-700 bg-slate-800/40 px-4 py-2 text-sm font-semibold text-slate-300 hover:bg-slate-800 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
                    >
                      Add Staff Member
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Roster list */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {facultyUsers.map(f => {
              const allocatedSubjects = subjects.filter(s => s.allocatedStaffId === f.id);

              return (
                <div key={f.id} className="rounded-xl border border-slate-800 bg-slate-900/30 p-5 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-white text-base">{f.name}</h4>
                    <p className="text-xs font-mono text-indigo-400 mt-0.5">{f.id}</p>
                    
                    <div className="mt-4">
                      <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Allocated Subjects</p>
                      {allocatedSubjects.length === 0 ? (
                        <p className="text-xs text-slate-600 italic">No subjects assigned yet.</p>
                      ) : (
                        <div className="flex flex-wrap gap-1.5">
                          {allocatedSubjects.map(s => (
                            <span key={s.code} className="inline-flex items-center rounded-md bg-slate-850 px-2 py-0.5 text-[10px] font-medium text-slate-300 border border-slate-800">
                              {s.code} ({s.year.replace('_', ' ')})
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-800/60 flex justify-end">
                    <button
                      onClick={() => {
                        if (confirm(`Remove faculty member ${f.name}? This will de-allocate their subjects.`)) {
                          deleteUser(f.id);
                        }
                      }}
                      className="flex items-center gap-1 text-xs text-slate-500 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>Remove Staff</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'subjects' && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white">Department Subjects & Faculty Allocations</h3>
            <button
              onClick={() => setShowSubjectModal(true)}
              className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
            >
              <Plus className="h-4 w-4" />
              <span>Add Subject</span>
            </button>
          </div>

          {/* Add Subject Modal */}
          {showSubjectModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
              <div className="w-full max-w-md rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-2xl animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                  <h3 className="text-lg font-bold text-white">Add New Subject</h3>
                  <button onClick={() => setShowSubjectModal(false)} className="text-slate-400 hover:text-white">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <form onSubmit={handleCreateSubject} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Subject Code</label>
                      <input
                        type="text"
                        required
                        value={subCode}
                        onChange={(e) => setSubCode(e.target.value)}
                        placeholder="e.g. IT3502"
                        className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2.5 text-sm text-slate-100 placeholder-slate-650 focus:border-indigo-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Semester</label>
                      <select
                        value={subSem}
                        onChange={(e) => setSubSem(e.target.value)}
                        className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2.5 text-sm text-slate-300 focus:border-indigo-500 focus:outline-none"
                      >
                        {semesters.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Subject Name</label>
                    <input
                      type="text"
                      required
                      value={subName}
                      onChange={(e) => setSubName(e.target.value)}
                      placeholder="e.g. Web Technology"
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2.5 text-sm text-slate-100 placeholder-slate-600 focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Target Class</label>
                      <select
                        value={subYear}
                        onChange={(e) => setSubYear(e.target.value as any)}
                        className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2.5 text-sm text-slate-300 focus:border-indigo-500 focus:outline-none"
                      >
                        <option value="2nd_year">2nd Year (3rd Sem)</option>
                        <option value="3rd_year">3rd Year (5th Sem)</option>
                        <option value="4th_year">4th Year (7th Sem)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Allocate Staff</label>
                      <select
                        required
                        value={subStaffId}
                        onChange={(e) => setSubStaffId(e.target.value)}
                        className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2.5 text-sm text-slate-300 focus:border-indigo-500 focus:outline-none"
                      >
                        <option value="">-- Select Staff --</option>
                        {allocableStaff.map(f => (
                          <option key={f.id} value={f.id}>{f.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-3 justify-end pt-4 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => setShowSubjectModal(false)}
                      className="rounded-lg border border-slate-700 bg-slate-800/40 px-4 py-2 text-sm font-semibold text-slate-300 hover:bg-slate-800 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
                    >
                      Create & Allocate
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Subjects Table (Desktop View) */}
          <div className="hidden md:block overflow-hidden rounded-xl border border-slate-800 bg-slate-900/20 backdrop-blur-md">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-900/60 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    <th className="px-6 py-4">Subject Code</th>
                    <th className="px-6 py-4">Subject Name</th>
                    <th className="px-6 py-4">Target Year / Semester</th>
                    <th className="px-6 py-4">Allocated Teacher</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-sm text-slate-300">
                  {subjects.map(s => {
                    const allocatedTeacher = users.find(u => u.id === s.allocatedStaffId);

                    return (
                      <tr key={s.code} className="hover:bg-slate-900/30 transition-colors">
                        <td className="px-6 py-4 font-mono font-bold text-white text-xs">{s.code}</td>
                        <td className="px-6 py-4 font-semibold text-slate-200">{s.name}</td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-0.5">
                            <span className="text-xs font-semibold text-indigo-400">{s.year.replace('_', ' ').toUpperCase()}</span>
                            <span className="text-[10px] text-slate-500">{s.semester}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {editingSubjectCode === s.code ? (
                            <select
                              value={s.allocatedStaffId}
                              onChange={(e) => {
                                updateSubjectStaff(s.code, e.target.value);
                                setEditingSubjectCode(null);
                              }}
                              onBlur={() => setEditingSubjectCode(null)}
                              className="rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-1 text-xs text-slate-200 focus:border-indigo-500 focus:outline-none"
                              autoFocus
                            >
                              <option value="">-- Select Staff --</option>
                              {allocableStaff.map(f => (
                                <option key={f.id} value={f.id}>{f.name}</option>
                              ))}
                            </select>
                          ) : (
                            <div className="flex items-center gap-2 group">
                              <div className="flex flex-col">
                                <span className="font-medium text-slate-300">{allocatedTeacher?.name || 'Unassigned'}</span>
                                <span className="text-[10px] text-slate-500 font-mono">{s.allocatedStaffId}</span>
                              </div>
                              <button
                                onClick={() => setEditingSubjectCode(s.code)}
                                className="text-[10px] text-indigo-400 opacity-0 group-hover:opacity-100 hover:text-indigo-350 transition-opacity ml-1.5 font-semibold"
                                title="Change Staff"
                              >
                                Edit
                              </button>
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete ${s.name} (${s.code})?`)) {
                                deleteSubject(s.code);
                              }
                            }}
                            className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-slate-800/40 rounded transition-colors"
                            title="Delete Subject"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Subjects Cards (Mobile View) */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {subjects.length === 0 ? (
              <div className="rounded-xl border border-slate-800 bg-slate-900/20 p-8 text-center text-slate-500 text-sm">
                No subjects configured yet.
              </div>
            ) : (
              subjects.map(s => {
                const allocatedTeacher = users.find(u => u.id === s.allocatedStaffId);

                return (
                  <div key={s.code} className="rounded-xl border border-slate-800 bg-slate-900/30 p-5 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/25">{s.code}</span>
                        <h4 className="font-bold text-white text-base mt-2">{s.name}</h4>
                      </div>
                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete ${s.name} (${s.code})?`)) {
                            deleteSubject(s.code);
                          }
                        }}
                        className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-slate-800/40 rounded transition-colors"
                        title="Delete Subject"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="pt-3 border-t border-slate-800/60 flex flex-col gap-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Class:</span>
                        <span className="font-semibold text-slate-200 uppercase">{s.year.replace('_', ' ')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Semester:</span>
                        <span className="text-slate-200">{s.semester}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400">Allocated Staff:</span>
                        {editingSubjectCode === s.code ? (
                          <select
                            value={s.allocatedStaffId}
                            onChange={(e) => {
                              updateSubjectStaff(s.code, e.target.value);
                              setEditingSubjectCode(null);
                            }}
                            onBlur={() => setEditingSubjectCode(null)}
                            className="rounded-lg border border-slate-700 bg-slate-950 px-2 py-1 text-xs text-slate-250 focus:border-indigo-500 focus:outline-none"
                            autoFocus
                          >
                            <option value="">-- Select Staff --</option>
                            {allocableStaff.map(f => (
                              <option key={f.id} value={f.id}>{f.name}</option>
                            ))}
                          </select>
                        ) : (
                          <div className="flex items-center gap-1.5">
                            <span className="font-medium text-indigo-350">{allocatedTeacher?.name || 'Unassigned'}</span>
                            <button
                              onClick={() => setEditingSubjectCode(s.code)}
                              className="text-[10px] text-indigo-400 hover:text-indigo-300 font-semibold"
                            >
                              (Edit)
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {activeTab === 'teaching' && (
        <div className="rounded-xl border border-slate-800 bg-slate-900/10 p-6 animate-in fade-in-50 duration-200">
          <FacultyDashboard isEmbedded={true} />
        </div>
      )}
    </div>
  );
};
