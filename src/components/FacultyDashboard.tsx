"use client";

import React, { useState } from 'react';
import { useDatabase, Assignment, Subject } from '@/context/DatabaseContext';
import { 
  Plus, Edit, ClipboardCheck, Users, Calendar, BookOpen, 
  Trash2, X, AlertCircle, Save, CheckCircle 
} from 'lucide-react';

export const FacultyDashboard: React.FC<{ isEmbedded?: boolean }> = ({ isEmbedded = false }) => {
  const { 
    currentUser, subjects, assignments, submissions, users,
    createAssignment, deleteAssignment, evaluateSubmission 
  } = useDatabase();

  const [activeTab, setActiveTab] = useState<'assignments' | 'evaluate' | 'roster'>('assignments');
  const [showAddAssignmentModal, setShowAddAssignmentModal] = useState(false);

  // Form states for posting assignment
  const [assignTitle, setAssignTitle] = useState('');
  const [assignDesc, setAssignDesc] = useState('');
  const [assignDueDate, setAssignDueDate] = useState('');
  const [assignSubCode, setAssignSubCode] = useState('');
  const [assignType, setAssignType] = useState<'Assignment' | 'Test' | 'Homework'>('Assignment');

  // Evaluation states
  const [selectedAssignmentForEval, setSelectedAssignmentForEval] = useState<string>('');
  const [editingSubmissionStudentId, setEditingSubmissionStudentId] = useState<string | null>(null);
  const [evalStatus, setEvalStatus] = useState<'Completed' | 'Pending' | 'Late' | 'Missing'>('Completed');
  const [evalScore, setEvalScore] = useState<string>('');
  const [evalFeedback, setEvalFeedback] = useState<string>('');

  // Filter lists based on logged in faculty
  const mySubjects = subjects.filter(s => s.allocatedStaffId === currentUser?.id);
  const myAssignments = assignments.filter(a => a.facultyId === currentUser?.id);

  const handlePostAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignTitle || !assignDesc || !assignDueDate || !assignSubCode) {
      alert("Please fill all fields");
      return;
    }

    const selectedSubject = mySubjects.find(s => s.code === assignSubCode);
    if (!selectedSubject) return;

    createAssignment(
      assignTitle,
      assignDesc,
      assignDueDate,
      assignSubCode,
      selectedSubject.year,
      assignType
    );

    // Reset Form
    setAssignTitle('');
    setAssignDesc('');
    setAssignDueDate('');
    setAssignSubCode('');
    setAssignType('Assignment');
    setShowAddAssignmentModal(false);
  };

  const startEvaluation = (studentId: string, currentStatus: any, currentScore?: number, currentFeedback?: string) => {
    setEditingSubmissionStudentId(studentId);
    setEvalStatus(currentStatus || 'Completed');
    setEvalScore(currentScore !== undefined ? String(currentScore) : '');
    setEvalFeedback(currentFeedback || '');
  };

  const handleSaveEvaluation = (e: React.FormEvent, studentId: string) => {
    e.preventDefault();
    if (!selectedAssignmentForEval) return;

    evaluateSubmission(
      selectedAssignmentForEval,
      studentId,
      evalStatus,
      evalScore ? Number(evalScore) : undefined,
      evalFeedback
    );

    setEditingSubmissionStudentId(null);
  };

  return (
    <div className={isEmbedded ? "" : "mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"}>
      {/* Header section */}
      {!isEmbedded ? (
        <div className="mb-8 flex flex-col justify-between gap-4 border-b border-slate-800 pb-5 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Faculty Portal</h2>
            <p className="mt-1 text-sm text-slate-400">Welcome, {currentUser?.name} • Design coursework, assign homework, and evaluate submissions.</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => {
                if (mySubjects.length === 0) {
                  alert("You do not have any allocated subjects. Please contact the HOD to allocate subjects.");
                  return;
                }
                setShowAddAssignmentModal(true);
              }}
              className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 transition-all duration-200"
            >
              <Plus className="h-4 w-4" />
              <span>Create Assignment</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="mb-4 flex justify-between items-center border-b border-slate-800 pb-3">
          <p className="text-sm font-medium text-slate-400">Manage assignments and grade submissions for subjects you teach.</p>
          <button 
            onClick={() => {
              if (mySubjects.length === 0) {
                alert("You do not have any allocated subjects. Please allocate subjects to yourself under 'Subjects & Allocations' first.");
                return;
              }
              setShowAddAssignmentModal(true);
            }}
            className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 transition-all duration-200"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Create Coursework</span>
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-800 mb-8 overflow-x-auto pb-px">
        <button
          onClick={() => setActiveTab('assignments')}
          className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-all duration-200 whitespace-nowrap ${activeTab === 'assignments' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
        >
          <Calendar className="h-4 w-4" />
          <span>My Assignments ({myAssignments.length})</span>
        </button>
        <button
          onClick={() => {
            setActiveTab('evaluate');
            if (myAssignments.length > 0 && !selectedAssignmentForEval) {
              setSelectedAssignmentForEval(myAssignments[0].id);
            }
          }}
          className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-all duration-200 whitespace-nowrap ${activeTab === 'evaluate' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
        >
          <ClipboardCheck className="h-4 w-4" />
          <span>Evaluate & Grade</span>
        </button>
        <button
          onClick={() => setActiveTab('roster')}
          className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-all duration-200 whitespace-nowrap ${activeTab === 'roster' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
        >
          <Users className="h-4 w-4" />
          <span>My Subject Rosters</span>
        </button>
      </div>

      {/* Add Assignment Modal */}
      {showAddAssignmentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
              <h3 className="text-lg font-bold text-white">Create New Course Assignment</h3>
              <button onClick={() => setShowAddAssignmentModal(false)} className="text-slate-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handlePostAssignment} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Target Subject & Class</label>
                <select
                  required
                  value={assignSubCode}
                  onChange={(e) => setAssignSubCode(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2.5 text-sm text-slate-350 focus:border-indigo-500 focus:outline-none"
                >
                  <option value="">-- Choose Subject Allocation --</option>
                  {mySubjects.map(s => (
                    <option key={s.code} value={s.code}>
                      {s.code} - {s.name} ({s.year.replace('_', ' ')})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Assignment Title</label>
                <input
                  type="text"
                  required
                  value={assignTitle}
                  onChange={(e) => setAssignTitle(e.target.value)}
                  placeholder="e.g. Unit 1 Trees and Graphs Assignment"
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2.5 text-sm text-slate-100 placeholder-slate-600 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Detailed Description / Instructions</label>
                <textarea
                  required
                  rows={4}
                  value={assignDesc}
                  onChange={(e) => setAssignDesc(e.target.value)}
                  placeholder="Write clear steps, reference book links, or laboratory constraints..."
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2.5 text-sm text-slate-100 placeholder-slate-600 focus:border-indigo-500 focus:outline-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Due Date</label>
                <input
                  type="date"
                  required
                  value={assignDueDate}
                  onChange={(e) => setAssignDueDate(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2.5 text-sm text-slate-300 focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Task Type</label>
                <select
                  value={assignType}
                  onChange={(e: any) => setAssignType(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2.5 text-sm text-slate-300 focus:border-indigo-500 focus:outline-none"
                >
                  <option value="Assignment">Assignment</option>
                  <option value="Test">Test</option>
                  <option value="Homework">Homework</option>
                </select>
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddAssignmentModal(false)}
                  className="rounded-lg border border-slate-700 bg-slate-800/40 px-4 py-2 text-sm font-semibold text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
                >
                  Post Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tabs implementation */}
      {activeTab === 'assignments' && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          {myAssignments.length === 0 ? (
            <div className="rounded-xl border border-slate-800 bg-slate-900/10 p-12 text-center text-slate-500">
              <Calendar className="h-10 w-10 mx-auto text-slate-700 mb-3" />
              <h3 className="text-sm font-bold text-slate-300">No Course Assignments Posted</h3>
              <p className="text-xs text-slate-500 mt-1 mb-4">You have not created any assignments yet. Press create to post your first task.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {myAssignments.map(a => {
                const subsForAssign = submissions.filter(s => s.assignmentId === a.id);
                const total = subsForAssign.length;
                const completed = subsForAssign.filter(s => s.status === 'Completed').length;
                const late = subsForAssign.filter(s => s.status === 'Late').length;
                const pct = total > 0 ? Math.round(((completed + late) / total) * 100) : 0;

                return (
                  <div key={a.id} className="rounded-xl border border-slate-800 bg-slate-900/30 p-5 flex flex-col justify-between hover:border-slate-700 transition-colors">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <span className="inline-flex items-center rounded bg-slate-850 px-2 py-0.5 text-[10px] font-semibold text-slate-350 border border-slate-800 uppercase tracking-wider">
                          {a.type} • {a.subjectCode} • {a.year.replace('_', ' ')}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">Due: {a.dueDate}</span>
                      </div>
                      <h4 className="font-bold text-white text-base">{a.title}</h4>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-3 leading-relaxed">{a.description}</p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-800/60">
                      <div className="flex justify-between text-xs text-slate-400 mb-2">
                        <span>Evaluation Progress:</span>
                        <span className="font-semibold text-slate-200">{completed + late} / {total} graded</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden mb-4">
                        <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${pct}%` }}></div>
                      </div>

                      <div className="flex justify-between gap-2">
                        <button
                          onClick={() => {
                            setSelectedAssignmentForEval(a.id);
                            setActiveTab('evaluate');
                          }}
                          className="flex-1 flex items-center justify-center gap-1 rounded-lg border border-indigo-950 bg-indigo-950/20 py-2 text-xs font-semibold text-indigo-400 hover:bg-indigo-950/40 hover:text-indigo-300"
                        >
                          <ClipboardCheck className="h-3.5 w-3.5" />
                          <span>Grade Roster</span>
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete assignment "${a.title}"? This cannot be undone.`)) {
                              deleteAssignment(a.id);
                            }
                          }}
                          className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-950/20 rounded-lg transition-colors border border-transparent hover:border-red-900/30"
                          title="Delete Assignment"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {activeTab === 'evaluate' && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 animate-in fade-in-50 duration-200">
          {/* Side Assignment selector */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Select Assignment</h3>
            <div className="space-y-2">
              {myAssignments.map(a => (
                <div
                  key={a.id}
                  onClick={() => {
                    setSelectedAssignmentForEval(a.id);
                    setEditingSubmissionStudentId(null);
                  }}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    selectedAssignmentForEval === a.id 
                      ? 'border-indigo-500 bg-indigo-500/5 text-white' 
                      : 'border-slate-800 bg-slate-900/10 text-slate-400 hover:bg-slate-900/30'
                  }`}
                >
                  <p className="text-[10px] font-mono uppercase tracking-wider">{a.subjectCode} • {a.year.replace('_', ' ')}</p>
                  <p className="font-bold text-sm mt-1">{a.title}</p>
                </div>
              ))}
              {myAssignments.length === 0 && (
                <p className="text-xs text-slate-650 italic">Please post an assignment first.</p>
              )}
            </div>
          </div>

          {/* Student grading view */}
          <div className="lg:col-span-2 space-y-4">
            {selectedAssignmentForEval ? (
              (() => {
                const currentAssign = assignments.find(a => a.id === selectedAssignmentForEval);
                const targetStudents = users.filter(u => u.role === 'student' && u.targetYear === currentAssign?.year);
                
                return (
                  <div className="space-y-4">
                    <div className="border-b border-slate-800 pb-3">
                      <h3 className="text-lg font-bold text-white">{currentAssign?.title}</h3>
                      <p className="text-xs text-slate-500 font-mono mt-0.5">{currentAssign?.subjectName} ({currentAssign?.subjectCode})</p>
                    </div>

                    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/20">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-slate-800 bg-slate-900/60 text-xs font-semibold uppercase tracking-wider text-slate-400">
                            <th className="px-6 py-4">Student</th>
                            <th className="px-6 py-4">Submission Status</th>
                            <th className="px-6 py-4">Marks & Feedback</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-850 text-xs text-slate-300">
                          {targetStudents.map(student => {
                            const sub = submissions.find(
                              s => s.assignmentId === selectedAssignmentForEval && s.studentRegisterNo === student.id
                            );
                            const isEditing = editingSubmissionStudentId === student.id;

                            return (
                              <tr key={student.id} className="hover:bg-slate-900/20">
                                <td className="px-6 py-4">
                                  <p className="font-semibold text-slate-200 text-sm">{student.name}</p>
                                  <p className="font-mono text-[10px] text-slate-500 mt-0.5">{student.id}</p>
                                </td>
                                <td className="px-6 py-4">
                                  {isEditing ? (
                                    <select
                                      value={evalStatus}
                                      onChange={(e: any) => setEvalStatus(e.target.value)}
                                      className="rounded border border-slate-700 bg-slate-950 p-1.5 focus:outline-none"
                                    >
                                      <option value="Completed">Completed</option>
                                      <option value="Pending">Pending</option>
                                      <option value="Late">Late</option>
                                      <option value="Missing">Missing</option>
                                    </select>
                                  ) : (
                                    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-semibold border ${
                                      sub?.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                      sub?.status === 'Late' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                                      sub?.status === 'Missing' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                                      'bg-slate-500/10 text-slate-400 border-slate-500/20'
                                    }`}>
                                      {sub?.status || 'Pending'}
                                    </span>
                                  )}
                                </td>
                                <td className="px-6 py-4 max-w-[220px] truncate">
                                  {isEditing ? (
                                    <div className="space-y-1.5">
                                      <input
                                        type="number"
                                        placeholder="Marks (0-100)"
                                        value={evalScore}
                                        onChange={(e) => setEvalScore(e.target.value)}
                                        className="rounded border border-slate-700 bg-slate-950 p-1.5 w-24 focus:outline-none"
                                        max={100}
                                        min={0}
                                      />
                                      <input
                                        type="text"
                                        placeholder="Feedback comments..."
                                        value={evalFeedback}
                                        onChange={(e) => setEvalFeedback(e.target.value)}
                                        className="rounded border border-slate-700 bg-slate-950 p-1.5 w-full focus:outline-none"
                                      />
                                    </div>
                                  ) : (
                                    <div>
                                      {sub?.score !== undefined ? (
                                        <p className="font-semibold text-white">Score: {sub.score} / 100</p>
                                      ) : (
                                        <p className="text-slate-500">Ungraded</p>
                                      )}
                                      {sub?.feedback && (
                                        <p className="text-slate-400 italic text-[10px] truncate mt-0.5" title={sub.feedback}>
                                          "{sub.feedback}"
                                        </p>
                                      )}
                                    </div>
                                  )}
                                </td>
                                <td className="px-6 py-4 text-right">
                                  {isEditing ? (
                                    <div className="flex justify-end gap-1.5">
                                      <button
                                        onClick={(e) => handleSaveEvaluation(e, student.id)}
                                        className="p-1.5 text-emerald-400 bg-emerald-500/10 rounded hover:bg-emerald-500/20"
                                        title="Save grades"
                                      >
                                        <Save className="h-4 w-4" />
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => setEditingSubmissionStudentId(null)}
                                        className="p-1.5 text-slate-500 bg-slate-800 rounded hover:bg-slate-750"
                                        title="Cancel"
                                      >
                                        <X className="h-4 w-4" />
                                      </button>
                                    </div>
                                  ) : (
                                    <button
                                      onClick={() => startEvaluation(student.id, sub?.status, sub?.score, sub?.feedback)}
                                      className="inline-flex items-center gap-1 rounded bg-indigo-600/10 hover:bg-indigo-600/20 px-2 py-1.5 text-xs text-indigo-400 font-semibold border border-indigo-500/25 transition-colors"
                                    >
                                      <span>Grade</span>
                                    </button>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })()
            ) : (
              <div className="rounded-xl border border-slate-850 p-12 text-center text-slate-500">
                <AlertCircle className="h-8 w-8 mx-auto text-slate-700 mb-2" />
                <p className="text-sm font-semibold">Select an Assignment to Begin Evaluation</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'roster' && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-base font-bold text-white">Class Rosters</h3>
            <p className="text-xs text-slate-500 mt-1">Students enrolled in the classes allocated to your subjects.</p>
          </div>

          {mySubjects.length === 0 ? (
            <p className="text-slate-500 italic text-sm">No roster details available.</p>
          ) : (
            <div className="space-y-8">
              {mySubjects.map(sub => {
                const classStudents = users.filter(u => u.role === 'student' && u.targetYear === sub.year);

                return (
                  <div key={sub.code} className="rounded-xl border border-slate-800 bg-slate-900/30 p-6">
                    <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-3">
                      <div>
                        <h4 className="text-base font-bold text-white">{sub.name}</h4>
                        <p className="text-xs text-indigo-400 font-mono mt-0.5">{sub.code} • {sub.semester} ({sub.year.replace('_', ' ')})</p>
                      </div>
                      <span className="text-xs font-semibold text-slate-400">{classStudents.length} Enrolled Students</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {classStudents.map(student => (
                        <div key={student.id} className="rounded-lg bg-slate-950 p-3 border border-slate-850 flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-slate-200 text-xs">{student.name}</p>
                            <p className="font-mono text-[10px] text-slate-500">{student.id}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
