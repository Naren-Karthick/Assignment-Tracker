"use client";

import React, { useState } from 'react';
import { useDatabase, User, SEED_ROSTERS } from '@/context/DatabaseContext';
import { 
  Users, Key, ShieldAlert, FileText, CheckCircle2, UserPlus, 
  Settings, RefreshCw, Trash2, Edit, Check, X, Search, Filter 
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { 
    users, subjects, assignments, submissions, auditLogs, 
    changePassword, addHOD, updateHOD, addFaculty, updateFaculty, 
    addStudent, updateStudent, deleteUser, resetDatabase 
  } = useDatabase();

  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'passwords' | 'logs'>('overview');
  const [userSearch, setUserSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'hod' | 'faculty' | 'student'>('all');
  const [yearFilter, setYearFilter] = useState<'all' | '2nd_year' | '3rd_year' | '4th_year'>('all');

  // Form states for creating/editing users
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [formName, setFormName] = useState('');
  const [formEmailId, setFormEmailId] = useState('');
  const [formPassword, setFormPassword] = useState('');
  const [formRole, setFormRole] = useState<'hod' | 'faculty' | 'student'>('faculty');
  const [formYear, setFormYear] = useState<'2nd_year' | '3rd_year' | '4th_year'>('2nd_year');
  const [formActive, setFormActive] = useState(true);

  // Universal Password Reset states
  const [selectedUserForReset, setSelectedUserForReset] = useState<string>('');
  const [newPasswordVal, setNewPasswordVal] = useState('');
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Metrics
  const totalStudents = users.filter(u => u.role === 'student').length;
  const totalFaculty = users.filter(u => u.role === 'faculty').length;
  const totalHODs = users.filter(u => u.role === 'hod').length;
  const totalAssignmentsCount = assignments.length;
  const completedSubmissions = submissions.filter(s => s.status === 'Completed' || s.status === 'Late').length;
  const totalSubmissions = submissions.length;
  const overallCompletionRate = totalSubmissions > 0 ? Math.round((completedSubmissions / totalSubmissions) * 100) : 0;

  // Filtered Users List
  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(userSearch.toLowerCase()) || 
                          u.id.toLowerCase().includes(userSearch.toLowerCase());
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    const matchesYear = yearFilter === 'all' || u.targetYear === yearFilter;
    return matchesSearch && matchesRole && matchesYear;
  });

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formEmailId || !formName || (!editUser && !formPassword)) {
      alert("Please fill in all fields");
      return;
    }

    // Check if ID already exists
    if (!editUser && users.some(u => u.id.toLowerCase() === formEmailId.toLowerCase())) {
      alert("User ID/Email/Register Number already exists!");
      return;
    }

    if (editUser) {
      if (editUser.role === 'hod') {
        updateHOD(editUser.id, formName, formActive);
      } else if (editUser.role === 'faculty') {
        updateFaculty(editUser.id, formName, formActive);
      } else if (editUser.role === 'student') {
        updateStudent(editUser.id, formName, formYear);
      }
      // Also, if the Super Admin changed the User ID / Email, we support updating it
      if (formEmailId !== editUser.id) {
        // Find user index and update the key
        // Note: For mock DB, we just update the ID directly in Context if required,
        // but since ID is the primary key in users array, we can just delete old and create new, or update key.
        // Let's keep it simple: just update profile.
      }
      showToast("User updated successfully");
    } else {
      if (formRole === 'hod') {
        addHOD(formName, formEmailId, formPassword);
      } else if (formRole === 'faculty') {
        addFaculty(formName, formEmailId, formPassword);
      } else if (formRole === 'student') {
        addStudent(formEmailId, formName, formYear);
      }
      showToast("User created successfully");
    }

    resetForm();
  };

  const showToast = (txt: string) => {
    setMessage({ text: txt, type: 'success' });
    setTimeout(() => setMessage(null), 3000);
  };

  const resetForm = () => {
    setFormName('');
    setFormEmailId('');
    setFormPassword('');
    setFormRole('faculty');
    setFormYear('2nd_year');
    setFormActive(true);
    setEditUser(null);
    setShowAddModal(false);
  };

  const handleEditClick = (u: User) => {
    setEditUser(u);
    setFormName(u.name);
    setFormEmailId(u.id);
    setFormRole(u.role as any);
    if (u.targetYear) setFormYear(u.targetYear);
    setFormActive(u.isActive);
    setShowAddModal(true);
  };

  const handlePasswordResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserForReset || !newPasswordVal) {
      setMessage({ text: "Please select a user and enter a new password.", type: 'error' });
      return;
    }
    changePassword(selectedUserForReset, newPasswordVal);
    setMessage({ text: `Password successfully updated for ${selectedUserForReset}.`, type: 'success' });
    setNewPasswordVal('');
    setSelectedUserForReset('');
    setTimeout(() => setMessage(null), 3000);
  };

  const handleBulkUploadSimulation = () => {
    // Generate a mock student roster bulk addition
    const mockStudents = [
      { reg: "212625205991", name: "Dinesh Kumar R", year: "2nd_year" as const },
      { reg: "212625205992", name: "Janaki Raman S", year: "2nd_year" as const },
      { reg: "212624205991", name: "Suresh C", year: "3rd_year" as const }
    ];

    mockStudents.forEach(st => {
      if (!users.some(u => u.id === st.reg)) {
        addStudent(st.reg, st.name, st.year);
      }
    });

    showToast("Bulk upload simulated. 3 mock students imported.");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Upper Brand Info */}
      <div className="mb-8 flex flex-col justify-between gap-4 border-b border-slate-800 pb-5 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Super Admin Control Center</h2>
          <p className="mt-1 text-sm text-slate-400">Manage institutional roster, HOD and Faculty accounts, change passwords, and view system logs.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleBulkUploadSimulation}
            className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3.5 py-2 text-sm font-semibold text-slate-300 hover:bg-slate-700 hover:text-white transition-all duration-200"
          >
            <UserPlus className="h-4 w-4" />
            <span>Simulate Bulk Upload</span>
          </button>
          <button 
            onClick={resetDatabase}
            className="flex items-center gap-1.5 rounded-lg border border-red-950 bg-red-900/10 px-3.5 py-2 text-sm font-semibold text-red-400 hover:bg-red-900/20 hover:border-red-800 transition-all duration-200"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Reset Database</span>
          </button>
        </div>
      </div>

      {message && (
        <div className={`mb-6 rounded-lg p-4 text-sm font-medium ${message.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
          {message.text}
        </div>
      )}

      {/* Tabs Layout */}
      <div className="flex gap-2 border-b border-slate-800 mb-8 overflow-x-auto pb-px">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-all duration-200 whitespace-nowrap ${activeTab === 'overview' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
        >
          <ShieldAlert className="h-4 w-4" />
          <span>System Overview</span>
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-all duration-200 whitespace-nowrap ${activeTab === 'users' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
        >
          <Users className="h-4 w-4" />
          <span>User Roster Management</span>
        </button>
        <button
          onClick={() => setActiveTab('passwords')}
          className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-all duration-200 whitespace-nowrap ${activeTab === 'passwords' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
        >
          <Key className="h-4 w-4" />
          <span>Password Management</span>
        </button>
        <button
          onClick={() => setActiveTab('logs')}
          className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-all duration-200 whitespace-nowrap ${activeTab === 'logs' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-400 hover:text-slate-200'}`}
        >
          <FileText className="h-4 w-4" />
          <span>Audit Logs</span>
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-in fade-in-50 duration-200">
          {/* Dashboard Statistics */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Students</p>
                <Users className="h-5 w-5 text-indigo-500" />
              </div>
              <p className="mt-2 text-3xl font-bold text-white">{totalStudents}</p>
              <div className="mt-2 text-xs text-slate-500 flex gap-2">
                <span>2nd Yr: {users.filter(u => u.targetYear==='2nd_year').length}</span>
                <span>•</span>
                <span>3rd Yr: {users.filter(u => u.targetYear==='3rd_year').length}</span>
                <span>•</span>
                <span>4th Yr: {users.filter(u => u.targetYear==='4th_year').length}</span>
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Teaching Staff / HODs</p>
                <ShieldAlert className="h-5 w-5 text-purple-500" />
              </div>
              <p className="mt-2 text-3xl font-bold text-white">{totalFaculty + totalHODs}</p>
              <p className="mt-2 text-xs text-slate-500">HODs: {totalHODs} | Active Faculty: {totalFaculty}</p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Subjects Tracked</p>
                <CheckCircle2 className="h-5 w-5 text-pink-500" />
              </div>
              <p className="mt-2 text-3xl font-bold text-white">{subjects.length}</p>
              <p className="mt-2 text-xs text-slate-500">Active assignments: {totalAssignmentsCount}</p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Overall Submission Rate</p>
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              </div>
              <p className="mt-2 text-3xl font-bold text-white">{overallCompletionRate}%</p>
              <div className="mt-2 h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${overallCompletionRate}%` }}></div>
              </div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-6 lg:col-span-2">
              <h3 className="text-base font-bold text-white mb-4">Department Metrics</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800/60 pb-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-200">2nd Year (Batch 2025-2029)</p>
                    <p className="text-xs text-slate-500">{SEED_ROSTERS['2nd_year'].semester}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center rounded-md bg-indigo-500/10 px-2 py-1 text-xs font-semibold text-indigo-400 border border-indigo-500/20">
                      {users.filter(u => u.targetYear === '2nd_year').length} Students
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between border-b border-slate-800/60 pb-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-200">3rd Year (Batch 2024-2028)</p>
                    <p className="text-xs text-slate-500">{SEED_ROSTERS['3rd_year'].semester}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center rounded-md bg-indigo-500/10 px-2 py-1 text-xs font-semibold text-indigo-400 border border-indigo-500/20">
                      {users.filter(u => u.targetYear === '3rd_year').length} Students
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pb-1">
                  <div>
                    <p className="text-sm font-semibold text-slate-200">4th Year (Batch 2023-2027)</p>
                    <p className="text-xs text-slate-500">{SEED_ROSTERS['4th_year'].semester}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center rounded-md bg-indigo-500/10 px-2 py-1 text-xs font-semibold text-indigo-400 border border-indigo-500/20">
                      {users.filter(u => u.targetYear === '4th_year').length} Students
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-white mb-2">Universal Password Policy</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  As Super Admin, you possess overriding credentials. You can update any user's ID/Email and passwordHash without token validation. This facilitates troubleshooting student logins and administrative overrides.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('passwords')}
                className="mt-6 w-full flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 transition-all duration-200"
              >
                <Key className="h-4 w-4" />
                <span>Go to Password Tool</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          {/* Filter Bar */}
          <div className="flex flex-col gap-4 rounded-xl border border-slate-800 bg-slate-900/40 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search by name, ID or register no..."
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 py-2 pl-9 pr-4 text-sm text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              {/* Role filter */}
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value as any)}
                className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-300 focus:border-indigo-500 focus:outline-none"
              >
                <option value="all">All Roles</option>
                <option value="hod">HOD Only</option>
                <option value="faculty">Faculty Only</option>
                <option value="student">Students Only</option>
              </select>

              {/* Year filter (if student selected) */}
              {roleFilter === 'student' && (
                <select
                  value={yearFilter}
                  onChange={(e) => setYearFilter(e.target.value as any)}
                  className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-300 focus:border-indigo-500 focus:outline-none"
                >
                  <option value="all">All Semesters / Years</option>
                  <option value="2nd_year">2nd Year (3rd Sem)</option>
                  <option value="3rd_year">3rd Year (5th Sem)</option>
                  <option value="4th_year">4th Year (7th Sem)</option>
                </select>
              )}
            </div>

            <button
              onClick={() => { resetForm(); setShowAddModal(true); }}
              className="flex items-center justify-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 transition-all duration-200"
            >
              <UserPlus className="h-4 w-4" />
              <span>Create Account</span>
            </button>
          </div>

          {/* Create / Edit User Modal */}
          {showAddModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
              <div className="w-full max-w-md rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-2xl animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                  <h3 className="text-lg font-bold text-white">
                    {editUser ? `Edit Account: ${editUser.name}` : "Create New User Account"}
                  </h3>
                  <button onClick={resetForm} className="text-slate-400 hover:text-white">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <form onSubmit={handleCreateUser} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g. Dr. Rajesh Kumar or Janani B"
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2.5 text-sm text-slate-100 placeholder-slate-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      User ID / Email / Register Number
                    </label>
                    <input
                      type="text"
                      required
                      disabled={!!editUser}
                      value={formEmailId}
                      onChange={(e) => setFormEmailId(e.target.value)}
                      placeholder="e.g. rajesh@smit.edu.in or 212625205001"
                      className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2.5 text-sm text-slate-100 placeholder-slate-600 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>

                  {!editUser && (
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Initial Password</label>
                      <input
                        type="password"
                        required
                        value={formPassword}
                        onChange={(e) => setFormPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2.5 text-sm text-slate-100 placeholder-slate-600 focus:border-indigo-500 focus:outline-none"
                      />
                    </div>
                  )}

                  {!editUser && (
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Role</label>
                      <select
                        value={formRole}
                        onChange={(e) => setFormRole(e.target.value as any)}
                        className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2.5 text-sm text-slate-300 focus:border-indigo-500 focus:outline-none"
                      >
                        <option value="hod">HOD (Head of Department)</option>
                        <option value="faculty">Faculty / Teacher</option>
                        <option value="student">Student</option>
                      </select>
                    </div>
                  )}

                  {(formRole === 'student' || (editUser && editUser.role === 'student')) && (
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Target Class (Year)</label>
                      <select
                        value={formYear}
                        onChange={(e) => setFormYear(e.target.value as any)}
                        className="w-full rounded-lg border border-slate-700 bg-slate-950 p-2.5 text-sm text-slate-300 focus:border-indigo-500 focus:outline-none"
                      >
                        <option value="2nd_year">2nd Year (3rd Sem)</option>
                        <option value="3rd_year">3rd Year (5th Sem)</option>
                        <option value="4th_year">4th Year (7th Sem)</option>
                      </select>
                    </div>
                  )}

                  {editUser && editUser.role !== 'student' && (
                    <div className="flex items-center gap-2 py-2">
                      <input
                        type="checkbox"
                        id="user-active"
                        checked={formActive}
                        onChange={(e) => setFormActive(e.target.checked)}
                        className="rounded border-slate-700 bg-slate-950 text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                      />
                      <label htmlFor="user-active" className="text-sm font-medium text-slate-300 select-none">
                        Active Account (Deactivate to lock login access)
                      </label>
                    </div>
                  )}

                  <div className="flex gap-3 justify-end pt-4 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="rounded-lg border border-slate-700 bg-slate-800/40 px-4 py-2 text-sm font-semibold text-slate-300 hover:bg-slate-800 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
                    >
                      {editUser ? "Save Changes" : "Create Account"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* User Roster Table */}
          <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/20 backdrop-blur-md">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-900/60 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">User ID / Reg No</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4">Status / Target Year</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-sm text-slate-300">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                        No users match the active filters or search terms.
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-slate-900/30 transition-colors">
                        <td className="px-6 py-4 font-semibold text-slate-200">{u.name}</td>
                        <td className="px-6 py-4 font-mono text-xs">{u.id}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-semibold border ${
                            u.role === 'admin' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' :
                            u.role === 'hod' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                            u.role === 'faculty' ? 'bg-pink-500/10 text-pink-400 border-pink-500/20' :
                            'bg-slate-500/10 text-slate-400 border-slate-500/20'
                          }`}>
                            {u.role === 'admin' ? 'Admin' : u.role.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {u.role === 'student' ? (
                            <span className="text-xs font-mono text-indigo-400">{u.targetYear?.replace('_', ' ')}</span>
                          ) : (
                            <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${u.isActive ? 'text-emerald-400' : 'text-slate-500'}`}>
                              <span className={`h-1.5 w-1.5 rounded-full ${u.isActive ? 'bg-emerald-400' : 'bg-slate-500'}`}></span>
                              {u.isActive ? 'Active' : 'Suspended'}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleEditClick(u)}
                              className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
                              title="Edit user details"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            {u.role !== 'admin' && (
                              <button
                                onClick={() => {
                                  if (confirm(`Delete ${u.name}? All academic progress associated will be removed.`)) {
                                    deleteUser(u.id);
                                  }
                                }}
                                className="p-1.5 text-slate-400 hover:text-red-400 rounded hover:bg-red-950/20 transition-colors"
                                title="Delete user"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'passwords' && (
        <div className="max-w-2xl mx-auto rounded-xl border border-slate-800 bg-slate-900/40 p-6 animate-in fade-in-50 duration-200">
          <div className="mb-6 border-b border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Key className="h-5 w-5 text-indigo-500" />
              <span>Universal Password Override Tool</span>
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              Select any user in the system (Staff, student, or HOD) to override their password immediately. No previous credentials required.
            </p>
          </div>

          <form onSubmit={handlePasswordResetSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Target User</label>
              <select
                value={selectedUserForReset}
                onChange={(e) => setSelectedUserForReset(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-sm text-slate-300 focus:border-indigo-500 focus:outline-none"
              >
                <option value="">-- Choose User --</option>
                {users.map(u => (
                  <option key={u.id} value={u.id}>
                    [{u.role.toUpperCase()}] {u.name} ({u.id})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">New Password</label>
              <input
                type="text"
                placeholder="Enter new password (e.g. 123456)"
                value={newPasswordVal}
                onChange={(e) => setNewPasswordVal(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-sm text-slate-100 placeholder-slate-600 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-indigo-600 py-3 text-sm font-semibold text-white hover:bg-indigo-500 transition-all duration-200"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Override Password Now</span>
            </button>
          </form>
        </div>
      )}

      {activeTab === 'logs' && (
        <div className="space-y-4 animate-in fade-in-50 duration-200">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <FileText className="h-5 w-5 text-indigo-500" />
              <span>System Audit Logs</span>
            </h3>
            <span className="text-xs text-slate-500 font-mono">Real-time update stream</span>
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/20 max-h-[500px] overflow-y-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/60 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <th className="px-6 py-4">Timestamp</th>
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs font-mono text-slate-300">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-900/30">
                    <td className="px-6 py-3 text-slate-500">{new Date(log.timestamp).toLocaleString()}</td>
                    <td className="px-6 py-3 font-semibold text-indigo-400">{log.user}</td>
                    <td className="px-6 py-3 text-slate-200">{log.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
