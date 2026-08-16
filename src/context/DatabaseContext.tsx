"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

// Roster Data
export const SEED_ROSTERS = {
  "2nd_year": {
    "semester": "3rd Semester (Odd)",
    "batch": "2025-2029",
    "students": [
      { "s_no": 1, "register_no": "212625205001", "name": "Aishwarya A" },
      { "s_no": 2, "register_no": "212625205002", "name": "Aishwarya J" },
      { "s_no": 3, "register_no": "212625205003", "name": "Anu Sri K" },
      { "s_no": 4, "register_no": "212625205004", "name": "Aravind M" },
      { "s_no": 5, "register_no": "212625205005", "name": "Aswin Kumar M" },
      { "s_no": 6, "register_no": "212625205006", "name": "Balaji E" },
      { "s_no": 7, "register_no": "212625205007", "name": "Barath S G" },
      { "s_no": 8, "register_no": "212625205009", "name": "Gayathri M (H)" },
      { "s_no": 9, "register_no": "212625205010", "name": "Grascy Jennifer J R" },
      { "s_no": 10, "register_no": "212625205011", "name": "Gunal S" },
      { "s_no": 11, "register_no": "212625205012", "name": "Hema Sathana M S" },
      { "s_no": 12, "register_no": "212625205013", "name": "Ilakiya B" },
      { "s_no": 13, "register_no": "212625205014", "name": "Ilakkiya M" },
      { "s_no": 14, "register_no": "212625205015", "name": "Jagan S" },
      { "s_no": 15, "register_no": "212625205016", "name": "Janavi M" },
      { "s_no": 16, "register_no": "212625205017", "name": "Jawahar M" },
      { "s_no": 17, "register_no": "212625205018", "name": "Karthik A" },
      { "s_no": 18, "register_no": "212625205019", "name": "Kaviya D" },
      { "s_no": 19, "register_no": "212625205020", "name": "Kaviya Priya V" },
      { "s_no": 20, "register_no": "212625205021", "name": "Keerthika B" },
      { "s_no": 21, "register_no": "212625205023", "name": "Mohammed Aashik Ali S" },
      { "s_no": 22, "register_no": "212625205024", "name": "Mohammed Nayeemudeen N" },
      { "s_no": 23, "register_no": "212625205025", "name": "Mohd Arif Z" },
      { "s_no": 24, "register_no": "212625205026", "name": "Mukesh Kumar K" },
      { "s_no": 25, "register_no": "212625205027", "name": "Muthu Kumaran R" },
      { "s_no": 26, "register_no": "212625205028", "name": "Nandimandalam Balaji" },
      { "s_no": 27, "register_no": "212625205029", "name": "Naren Karthick G" },
      { "s_no": 28, "register_no": "212625205030", "name": "Neethin K" },
      { "s_no": 29, "register_no": "212625205031", "name": "Nishanth S" },
      { "s_no": 30, "register_no": "212625205032", "name": "Nithishgiri S" },
      { "s_no": 31, "register_no": "212625205033", "name": "Nithish Raj R" },
      { "s_no": 32, "register_no": "212625205034", "name": "Pandiselvi R" },
      { "s_no": 33, "register_no": "212625205035", "name": "Pavithra T" },
      { "s_no": 34, "register_no": "212625205036", "name": "Ponmozhi D" },
      { "s_no": 35, "register_no": "212625205037", "name": "Prakash M" },
      { "s_no": 36, "register_no": "212625205038", "name": "Prakash R (H)" },
      { "s_no": 37, "register_no": "212625205039", "name": "Praveen S" },
      { "s_no": 38, "register_no": "212625205040", "name": "Praveena M" },
      { "s_no": 39, "register_no": "212625205041", "name": "Premkumar M" },
      { "s_no": 40, "register_no": "212625205044", "name": "Priyadharshini A (H)" },
      { "s_no": 41, "register_no": "212625205045", "name": "Priyadharshini P" },
      { "s_no": 42, "register_no": "212625205046", "name": "Priyanka S" },
      { "s_no": 43, "register_no": "212625205047", "name": "Ranjan S" },
      { "s_no": 44, "register_no": "212625205048", "name": "Reshma Parveen J" },
      { "s_no": 45, "register_no": "212625205049", "name": "Sakthi K" },
      { "s_no": 46, "register_no": "212625205050", "name": "Sathish A" },
      { "s_no": 47, "register_no": "212625205051", "name": "Srigar K" },
      { "s_no": 48, "register_no": "212625205052", "name": "Sundar S" },
      { "s_no": 49, "register_no": "212625205053", "name": "Thasif Yahiya T" },
      { "s_no": 50, "register_no": "212625205054", "name": "Vasantha Krishnan V" },
      { "s_no": 51, "register_no": "212625205055", "name": "Vasanth Kumar S" },
      { "s_no": 52, "register_no": "212625205056", "name": "Vetriganesh G" },
      { "s_no": 53, "register_no": "212625205057", "name": "Vishal K" },
      { "s_no": 54, "register_no": "212625205058", "name": "Roobini Dj" },
      { "s_no": 55, "register_no": "212625205301", "name": "Abinaya L" },
      { "s_no": 56, "register_no": "212625205303", "name": "Vignesh S" },
      { "s_no": 57, "register_no": "212625205304", "name": "Vinodhini A" },
      { "s_no": 58, "register_no": "212625205302", "name": "Madhan Kumar Y" }
    ]
  },
  "3rd_year": {
    "semester": "5th Semester (Odd)",
    "batch": "2024-2028",
    "students": [
      { "s_no": 1, "register_no": "212624205001", "name": "Ashwinmaran S" },
      { "s_no": 2, "register_no": "212624205002", "name": "Bharanikumar S" },
      { "s_no": 3, "register_no": "212624205003", "name": "Deepika D" },
      { "s_no": 4, "register_no": "212624205004", "name": "Divya Priya K" },
      { "s_no": 5, "register_no": "212624205005", "name": "Elavarasan A" },
      { "s_no": 6, "register_no": "212624205006", "name": "Ellammal P" },
      { "s_no": 7, "register_no": "212624205007", "name": "Gokulraja M" },
      { "s_no": 8, "register_no": "212624205008", "name": "Harithra A" },
      { "s_no": 9, "register_no": "212624205009", "name": "Jayashree" },
      { "s_no": 10, "register_no": "212624205010", "name": "Jetson G" },
      { "s_no": 11, "register_no": "212624205011", "name": "Kaarki Che P S" },
      { "s_no": 12, "register_no": "212624205012", "name": "Madhusri J V" },
      { "s_no": 13, "register_no": "212624205013", "name": "Manikandan R" },
      { "s_no": 14, "register_no": "212624205014", "name": "Mohan Raj P" },
      { "s_no": 15, "register_no": "212624205015", "name": "Nethra R" },
      { "s_no": 16, "register_no": "212624205016", "name": "Senthil Arasu A" },
      { "s_no": 17, "register_no": "212624205017", "name": "Santhosh Selvam G" },
      { "s_no": 18, "register_no": "212624205018", "name": "Shyam Sundar" },
      { "s_no": 19, "register_no": "212624205019", "name": "Suriyadharan R" },
      { "s_no": 20, "register_no": "212624205020", "name": "Velan V S" },
      { "s_no": 21, "register_no": "212624205021", "name": "Vimal Raj G" },
      { "s_no": 22, "register_no": "212624205022", "name": "Vinoth A" },
      { "s_no": 23, "register_no": "212624205301", "name": "Manikandan S" },
      { "s_no": 24, "register_no": "212624205302", "name": "Manoj Kumar B" },
      { "s_no": 25, "register_no": "212624205303", "name": "Shalini V" },
      { "s_no": 26, "register_no": "212624205701", "name": "Kavi Priya S" }
    ]
  },
  "4th_year": {
    "semester": "7th Semester (Odd)",
    "batch": "2023-2027",
    "students": [
      { "s_no": 1, "register_no": "212623205001", "name": "Abinaya K" },
      { "s_no": 2, "register_no": "212623205002", "name": "Amsavarthini A" },
      { "s_no": 3, "register_no": "212623205003", "name": "Arikrishnan R" },
      { "s_no": 4, "register_no": "212623205004", "name": "Balamurugan S" },
      { "s_no": 5, "register_no": "212623205005", "name": "Bhuvaneshkumar M" },
      { "s_no": 6, "register_no": "212623205006", "name": "Blessi V" },
      { "s_no": 7, "register_no": "212623205008", "name": "Cibichozhan L" },
      { "s_no": 8, "register_no": "212623205009", "name": "Dharshini M V" },
      { "s_no": 9, "register_no": "212623205010", "name": "Dinesh A" },
      { "s_no": 10, "register_no": "212623205011", "name": "Dravid Kumar R" },
      { "s_no": 11, "register_no": "212623205012", "name": "Ebenezer Issac I" },
      { "s_no": 12, "register_no": "212623205013", "name": "Gopi P" },
      { "s_no": 13, "register_no": "212623205014", "name": "Haakesh R V" },
      { "s_no": 14, "register_no": "212623205015", "name": "Hari Prasanth S" },
      { "s_no": 15, "register_no": "212623205016", "name": "Helen Sharon A" },
      { "s_no": 16, "register_no": "212623205017", "name": "Janani B" },
      { "s_no": 17, "register_no": "212623205018", "name": "Kayalvizhi P" },
      { "s_no": 18, "register_no": "212623205019", "name": "Kirubakaran M" },
      { "s_no": 19, "register_no": "212623205020", "name": "Lokesh B" },
      { "s_no": 20, "register_no": "212623205021", "name": "Madhan Kumar B" },
      { "s_no": 21, "register_no": "212623205022", "name": "Madhumitha S" },
      { "s_no": 22, "register_no": "212623205023", "name": "Nadesan S" },
      { "s_no": 23, "register_no": "212623205024", "name": "Nandhini P" },
      { "s_no": 24, "register_no": "212623205025", "name": "Nandhini S" },
      { "s_no": 25, "register_no": "212623205026", "name": "Pooja K" },
      { "s_no": 26, "register_no": "212623205027", "name": "Preethi S" },
      { "s_no": 27, "register_no": "212623205028", "name": "Raghuraj R" },
      { "s_no": 28, "register_no": "212623205029", "name": "Rajavikram V" },
      { "s_no": 29, "register_no": "212623205030", "name": "Rajeswari R" },
      { "s_no": 30, "register_no": "212623205031", "name": "Ruban V" },
      { "s_no": 31, "register_no": "212623205032", "name": "Sagithan K" },
      { "s_no": 32, "register_no": "212623205033", "name": "Sanjay R" },
      { "s_no": 33, "register_no": "212623205034", "name": "Sathiyamoorthi S" },
      { "s_no": 34, "register_no": "212623205035", "name": "Tamilarasan M" },
      { "s_no": 35, "register_no": "212623205036", "name": "Thiruselvam J" },
      { "s_no": 36, "register_no": "212623205037", "name": "Vanishree E" },
      { "s_no": 37, "register_no": "212623205038", "name": "Vanjinathan L" },
      { "s_no": 38, "register_no": "212623205039", "name": "Vinotha K" },
      { "s_no": 39, "register_no": "212623205301", "name": "Jeeva A" }
    ]
  }
};

export interface User {
  id: string; // email, Register Number, or 'HOD'
  name: string;
  role: 'admin' | 'hod' | 'faculty' | 'student';
  passwordHash: string;
  isActive: boolean;
  targetYear?: '2nd_year' | '3rd_year' | '4th_year'; // for students
}

export interface Subject {
  code: string;
  name: string;
  semester: string;
  year: '2nd_year' | '3rd_year' | '4th_year';
  allocatedStaffId: string; // User ID of faculty
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  subjectCode: string;
  subjectName: string;
  year: '2nd_year' | '3rd_year' | '4th_year';
  facultyId: string;
  createdAt: string;
}

export interface Submission {
  assignmentId: string;
  studentRegisterNo: string;
  status: 'Completed' | 'Pending' | 'Late' | 'Missing';
  score?: number;
  feedback?: string;
  submittedAt?: string;
}

export interface AuditLog {
  id: string;
  user: string;
  action: string;
  timestamp: string;
}

interface DatabaseContextType {
  currentUser: User | null;
  users: User[];
  subjects: Subject[];
  assignments: Assignment[];
  submissions: Submission[];
  auditLogs: AuditLog[];
  login: (id: string, password: string) => boolean;
  logout: () => void;
  resetDatabase: () => void;
  // Admin Methods
  changePassword: (userId: string, newPassword: string) => void;
  addHOD: (name: string, email: string, password: string) => void;
  updateHOD: (email: string, name: string, isActive: boolean) => void;
  addFaculty: (name: string, email: string, password: string) => void;
  updateFaculty: (email: string, name: string, isActive: boolean) => void;
  addStudent: (registerNo: string, name: string, year: '2nd_year' | '3rd_year' | '4th_year') => void;
  updateStudent: (registerNo: string, name: string, year: '2nd_year' | '3rd_year' | '4th_year') => void;
  deleteUser: (userId: string) => void;
  // HOD Methods
  addSubject: (code: string, name: string, semester: string, year: '2nd_year' | '3rd_year' | '4th_year', allocatedStaffId: string) => void;
  deleteSubject: (code: string) => void;
  // Faculty Methods
  createAssignment: (title: string, description: string, dueDate: string, subjectCode: string, year: '2nd_year' | '3rd_year' | '4th_year') => void;
  deleteAssignment: (assignmentId: string) => void;
  evaluateSubmission: (assignmentId: string, studentRegisterNo: string, status: 'Completed' | 'Pending' | 'Late' | 'Missing', score?: number, feedback?: string) => void;
}

const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined);

export const DatabaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize DB from LocalStorage or Seed Data
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUsers = localStorage.getItem('smit_users');
      const storedSubjects = localStorage.getItem('smit_subjects');
      const storedAssignments = localStorage.getItem('smit_assignments');
      const storedSubmissions = localStorage.getItem('smit_submissions');
      const storedLogs = localStorage.getItem('smit_auditLogs');
      const storedSession = localStorage.getItem('smit_session');

      if (storedUsers && storedSubjects && storedAssignments && storedSubmissions) {
        setUsers(JSON.parse(storedUsers));
        setSubjects(JSON.parse(storedSubjects));
        setAssignments(JSON.parse(storedAssignments));
        setSubmissions(JSON.parse(storedSubmissions));
        setAuditLogs(JSON.parse(storedLogs || '[]'));
        if (storedSession) {
          setCurrentUser(JSON.parse(storedSession));
        }
      } else {
        // Run seed
        runSeeding();
      }
      setIsInitialized(true);
    }
  }, []);

  // Save changes to LocalStorage
  useEffect(() => {
    if (isInitialized && typeof window !== 'undefined') {
      localStorage.setItem('smit_users', JSON.stringify(users));
      localStorage.setItem('smit_subjects', JSON.stringify(subjects));
      localStorage.setItem('smit_assignments', JSON.stringify(assignments));
      localStorage.setItem('smit_submissions', JSON.stringify(submissions));
      localStorage.setItem('smit_auditLogs', JSON.stringify(auditLogs));
    }
  }, [users, subjects, assignments, submissions, auditLogs, isInitialized]);

  const runSeeding = () => {
    const seedUsers: User[] = [];
    
    // Super Admin (as requested: narenkarthickgururaju@gmail.com / Narenguru)
    seedUsers.push({
      id: 'narenkarthickgururaju@gmail.com',
      name: 'Naren Karthick G (Super Admin)',
      role: 'admin',
      passwordHash: 'Narenguru',
      isActive: true
    });

    // HOD (as requested: HOD / 8886918686)
    seedUsers.push({
      id: 'HOD',
      name: 'Dr. Srinivasan M (HOD IT)',
      role: 'hod',
      passwordHash: '8886918686',
      isActive: true
    });

    // Faculty
    const mockStaff = [
      { id: 'rajesh@smit.edu.in', name: 'Dr. Rajesh Kumar', password: 'password123' },
      { id: 'priya@smit.edu.in', name: 'Mrs. Priya S', password: 'password123' },
      { id: 'anbarasan@smit.edu.in', name: 'Mr. Anbarasan K', password: 'password123' }
    ];

    mockStaff.forEach(s => {
      seedUsers.push({
        id: s.id,
        name: s.name,
        role: 'faculty',
        passwordHash: s.password,
        isActive: true
      });
    });

    // Students
    Object.keys(SEED_ROSTERS).forEach(yearKey => {
      const year = yearKey as '2nd_year' | '3rd_year' | '4th_year';
      SEED_ROSTERS[year].students.forEach(student => {
        seedUsers.push({
          id: student.register_no,
          name: student.name,
          role: 'student',
          passwordHash: student.register_no, // default password is register_no
          isActive: true,
          targetYear: year
        });
      });
    });

    // Seed Subjects
    const seedSubjects: Subject[] = [
      { code: 'CS3301', name: 'Data Structures', semester: '3rd Semester (Odd)', year: '2nd_year', allocatedStaffId: 'rajesh@smit.edu.in' },
      { code: 'CS3302', name: 'Object Oriented Programming', semester: '3rd Semester (Odd)', year: '2nd_year', allocatedStaffId: 'priya@smit.edu.in' },
      { code: 'IT3501', name: 'Computer Networks', semester: '5th Semester (Odd)', year: '3rd_year', allocatedStaffId: 'anbarasan@smit.edu.in' },
      { code: 'IT3502', name: 'Web Technology', semester: '5th Semester (Odd)', year: '3rd_year', allocatedStaffId: 'priya@smit.edu.in' },
      { code: 'IT3701', name: 'Cloud Computing', semester: '7th Semester (Odd)', year: '4th_year', allocatedStaffId: 'rajesh@smit.edu.in' },
      { code: 'IT3702', name: 'Cryptography & Network Security', semester: '7th Semester (Odd)', year: '4th_year', allocatedStaffId: 'anbarasan@smit.edu.in' }
    ];

    // Seed Assignments
    const seedAssignments: Assignment[] = [
      {
        id: 'a1',
        title: 'Binary Search Tree Implementation',
        description: 'Implement a BST in Java/C++ supporting insert, delete, search and traversals.',
        dueDate: '2026-08-25',
        subjectCode: 'CS3301',
        subjectName: 'Data Structures',
        year: '2nd_year',
        facultyId: 'rajesh@smit.edu.in',
        createdAt: new Date().toISOString()
      },
      {
        id: 'a2',
        title: 'Responsive Portfolio Page',
        description: 'Design a responsive landing page using HTML, CSS grid and media queries.',
        dueDate: '2026-08-28',
        subjectCode: 'IT3502',
        subjectName: 'Web Technology',
        year: '3rd_year',
        facultyId: 'priya@smit.edu.in',
        createdAt: new Date().toISOString()
      }
    ];

    // Seed Submissions for all students in the target class
    const seedSubmissions: Submission[] = [];
    
    // We can pre-grade some, leave others pending, etc.
    SEED_ROSTERS['2nd_year'].students.forEach((student, index) => {
      let status: 'Completed' | 'Pending' | 'Late' | 'Missing' = 'Pending';
      let score: number | undefined;
      let feedback: string | undefined;

      if (index % 5 === 0) {
        status = 'Completed';
        score = 90 + (index % 10);
        feedback = 'Excellent tree visualization and dynamic traversals!';
      } else if (index % 7 === 0) {
        status = 'Late';
        score = 75;
        feedback = 'Good attempt but submitted late.';
      }

      seedSubmissions.push({
        assignmentId: 'a1',
        studentRegisterNo: student.register_no,
        status,
        score,
        feedback
      });
    });

    SEED_ROSTERS['3rd_year'].students.forEach((student, index) => {
      let status: 'Completed' | 'Pending' | 'Late' | 'Missing' = 'Pending';
      let score: number | undefined;
      let feedback: string | undefined;

      if (index % 4 === 0) {
        status = 'Completed';
        score = 85 + (index % 15);
        feedback = 'Perfect responsiveness on mobile layouts!';
      }

      seedSubmissions.push({
        assignmentId: 'a2',
        studentRegisterNo: student.register_no,
        status,
        score,
        feedback
      });
    });

    const seedLogs: AuditLog[] = [
      { id: 'l1', user: 'System', action: 'Database Seeded successfully.', timestamp: new Date().toISOString() }
    ];

    setUsers(seedUsers);
    setSubjects(seedSubjects);
    setAssignments(seedAssignments);
    setSubmissions(seedSubmissions);
    setAuditLogs(seedLogs);

    if (typeof window !== 'undefined') {
      localStorage.setItem('smit_users', JSON.stringify(seedUsers));
      localStorage.setItem('smit_subjects', JSON.stringify(seedSubjects));
      localStorage.setItem('smit_assignments', JSON.stringify(seedAssignments));
      localStorage.setItem('smit_submissions', JSON.stringify(seedSubmissions));
      localStorage.setItem('smit_auditLogs', JSON.stringify(seedLogs));
    }
  };

  const login = (id: string, password: string): boolean => {
    const user = users.find(u => u.id.toLowerCase() === id.trim().toLowerCase() && u.passwordHash === password);
    if (user) {
      if (!user.isActive) {
        return false;
      }
      setCurrentUser(user);
      if (typeof window !== 'undefined') {
        localStorage.setItem('smit_session', JSON.stringify(user));
      }
      // Add Audit Log
      const newLog: AuditLog = {
        id: 'log_' + Date.now(),
        user: user.name + ` (${user.role})`,
        action: 'Logged into the system.',
        timestamp: new Date().toISOString()
      };
      setAuditLogs(prev => [newLog, ...prev]);
      return true;
    }
    return false;
  };

  const logout = () => {
    if (currentUser) {
      const newLog: AuditLog = {
        id: 'log_' + Date.now(),
        user: currentUser.name + ` (${currentUser.role})`,
        action: 'Logged out of the system.',
        timestamp: new Date().toISOString()
      };
      setAuditLogs(prev => [newLog, ...prev]);
    }
    setCurrentUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('smit_session');
    }
  };

  const resetDatabase = () => {
    runSeeding();
    setCurrentUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('smit_session');
    }
  };

  // Universal Password Reset
  const changePassword = (userId: string, newPassword: string) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, passwordHash: newPassword } : u));
    
    // Log audit
    const adminName = currentUser ? currentUser.name : 'Super Admin';
    const updatedUser = users.find(u => u.id === userId);
    const newLog: AuditLog = {
      id: 'log_' + Date.now(),
      user: adminName,
      action: `Changed password for ${updatedUser?.name || userId} (${updatedUser?.role || 'user'}).`,
      timestamp: new Date().toISOString()
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // HOD CRUD
  const addHOD = (name: string, email: string, password: string) => {
    const newUser: User = {
      id: email,
      name,
      role: 'hod',
      passwordHash: password,
      isActive: true
    };
    setUsers(prev => [...prev, newUser]);

    const newLog: AuditLog = {
      id: 'log_' + Date.now(),
      user: currentUser?.name || 'Admin',
      action: `Created HOD account: ${name} (${email}).`,
      timestamp: new Date().toISOString()
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const updateHOD = (email: string, name: string, isActive: boolean) => {
    setUsers(prev => prev.map(u => u.id === email ? { ...u, name, isActive } : u));

    const newLog: AuditLog = {
      id: 'log_' + Date.now(),
      user: currentUser?.name || 'Admin',
      action: `Updated HOD profile: ${name} (${email}), Active: ${isActive}.`,
      timestamp: new Date().toISOString()
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Faculty CRUD
  const addFaculty = (name: string, email: string, password: string) => {
    const newUser: User = {
      id: email,
      name,
      role: 'faculty',
      passwordHash: password,
      isActive: true
    };
    setUsers(prev => [...prev, newUser]);

    const newLog: AuditLog = {
      id: 'log_' + Date.now(),
      user: currentUser?.name || 'Admin/HOD',
      action: `Created Faculty account: ${name} (${email}).`,
      timestamp: new Date().toISOString()
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const updateFaculty = (email: string, name: string, isActive: boolean) => {
    setUsers(prev => prev.map(u => u.id === email ? { ...u, name, isActive } : u));

    const newLog: AuditLog = {
      id: 'log_' + Date.now(),
      user: currentUser?.name || 'Admin/HOD',
      action: `Updated Faculty profile: ${name} (${email}), Active: ${isActive}.`,
      timestamp: new Date().toISOString()
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Student CRUD
  const addStudent = (registerNo: string, name: string, year: '2nd_year' | '3rd_year' | '4th_year') => {
    const newUser: User = {
      id: registerNo,
      name,
      role: 'student',
      passwordHash: registerNo,
      isActive: true,
      targetYear: year
    };
    setUsers(prev => [...prev, newUser]);

    const newLog: AuditLog = {
      id: 'log_' + Date.now(),
      user: currentUser?.name || 'Admin',
      action: `Registered Student: ${name} (${registerNo}) for ${year.replace('_', ' ')}.`,
      timestamp: new Date().toISOString()
    };
    setAuditLogs(prev => [newLog, ...prev]);

    // Add empty/pending submissions for existing assignments in that year
    const targetAssignments = assignments.filter(a => a.year === year);
    if (targetAssignments.length > 0) {
      const newSubs = targetAssignments.map(a => ({
        assignmentId: a.id,
        studentRegisterNo: registerNo,
        status: 'Pending' as const
      }));
      setSubmissions(prev => [...prev, ...newSubs]);
    }
  };

  const updateStudent = (registerNo: string, name: string, year: '2nd_year' | '3rd_year' | '4th_year') => {
    setUsers(prev => prev.map(u => u.id === registerNo ? { ...u, name, targetYear: year } : u));

    const newLog: AuditLog = {
      id: 'log_' + Date.now(),
      user: currentUser?.name || 'Admin',
      action: `Updated Student: ${name} (${registerNo}), Year: ${year.replace('_', ' ')}.`,
      timestamp: new Date().toISOString()
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const deleteUser = (userId: string) => {
    const targetUser = users.find(u => u.id === userId);
    setUsers(prev => prev.filter(u => u.id !== userId));

    const newLog: AuditLog = {
      id: 'log_' + Date.now(),
      user: currentUser?.name || 'Admin',
      action: `Deleted user: ${targetUser?.name || userId} (${targetUser?.role || 'user'}).`,
      timestamp: new Date().toISOString()
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // HOD Methods
  const addSubject = (code: string, name: string, semester: string, year: '2nd_year' | '3rd_year' | '4th_year', allocatedStaffId: string) => {
    const newSubject: Subject = {
      code,
      name,
      semester,
      year,
      allocatedStaffId
    };
    setSubjects(prev => [...prev, newSubject]);

    const staffUser = users.find(u => u.id === allocatedStaffId);
    const newLog: AuditLog = {
      id: 'log_' + Date.now(),
      user: currentUser?.name || 'HOD',
      action: `Added subject ${name} (${code}) allocated to ${staffUser?.name || allocatedStaffId}.`,
      timestamp: new Date().toISOString()
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const deleteSubject = (code: string) => {
    setSubjects(prev => prev.filter(s => s.code !== code));
    const newLog: AuditLog = {
      id: 'log_' + Date.now(),
      user: currentUser?.name || 'HOD',
      action: `Deleted subject: ${code}.`,
      timestamp: new Date().toISOString()
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Faculty Methods
  const createAssignment = (title: string, description: string, dueDate: string, subjectCode: string, year: '2nd_year' | '3rd_year' | '4th_year') => {
    const id = 'assign_' + Date.now();
    const sub = subjects.find(s => s.code === subjectCode);
    const newAssignment: Assignment = {
      id,
      title,
      description,
      dueDate,
      subjectCode,
      subjectName: sub ? sub.name : 'Unknown',
      year,
      facultyId: currentUser?.id || 'unknown',
      createdAt: new Date().toISOString()
    };

    setAssignments(prev => [...prev, newAssignment]);

    // Create submissions for all students in this year
    const targetStudents = users.filter(u => u.role === 'student' && u.targetYear === year);
    const newSubs = targetStudents.map(student => ({
      assignmentId: id,
      studentRegisterNo: student.id,
      status: 'Pending' as const
    }));
    setSubmissions(prev => [...prev, ...newSubs]);

    const newLog: AuditLog = {
      id: 'log_' + Date.now(),
      user: currentUser?.name || 'Faculty',
      action: `Posted assignment "${title}" for ${year.replace('_', ' ')} (${sub?.name || subjectCode}).`,
      timestamp: new Date().toISOString()
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const deleteAssignment = (assignmentId: string) => {
    const target = assignments.find(a => a.id === assignmentId);
    setAssignments(prev => prev.filter(a => a.id !== assignmentId));
    setSubmissions(prev => prev.filter(s => s.assignmentId !== assignmentId));

    const newLog: AuditLog = {
      id: 'log_' + Date.now(),
      user: currentUser?.name || 'Faculty',
      action: `Deleted assignment: "${target?.title || assignmentId}".`,
      timestamp: new Date().toISOString()
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const evaluateSubmission = (assignmentId: string, studentRegisterNo: string, status: 'Completed' | 'Pending' | 'Late' | 'Missing', score?: number, feedback?: string) => {
    setSubmissions(prev => prev.map(s => {
      if (s.assignmentId === assignmentId && s.studentRegisterNo === studentRegisterNo) {
        return {
          ...s,
          status,
          score,
          feedback,
          submittedAt: status === 'Completed' || status === 'Late' ? new Date().toISOString() : s.submittedAt
        };
      }
      return s;
    }));

    const student = users.find(u => u.id === studentRegisterNo);
    const assignment = assignments.find(a => a.id === assignmentId);
    
    const newLog: AuditLog = {
      id: 'log_' + Date.now(),
      user: currentUser?.name || 'Faculty',
      action: `Evaluated submission for ${student?.name} - Assignment: "${assignment?.title}", Status: ${status}.`,
      timestamp: new Date().toISOString()
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  return (
    <DatabaseContext.Provider value={{
      currentUser,
      users,
      subjects,
      assignments,
      submissions,
      auditLogs,
      login,
      logout,
      resetDatabase,
      changePassword,
      addHOD,
      updateHOD,
      addFaculty,
      updateFaculty,
      addStudent,
      updateStudent,
      deleteUser,
      addSubject,
      deleteSubject,
      createAssignment,
      deleteAssignment,
      evaluateSubmission
    }}>
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabase = () => {
  const context = useContext(DatabaseContext);
  if (!context) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
  return context;
};
