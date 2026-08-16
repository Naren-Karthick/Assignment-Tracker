import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// File path for persistence in the workspace
const DB_FILE = path.join(process.cwd(), 'db.json');

// Default seeding data (matching DatabaseContext initial rosters)
const SEED_ROSTERS = {
  "2nd_year": [
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
  ],
  "3rd_year": [
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
  ],
  "4th_year": [
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
};

const getSeedData = () => {
  const seedUsers: any[] = [];
  
  // Super Admin
  seedUsers.push({
    id: 'narenkarthickgururaju@gmail.com',
    name: 'Naren Karthick G (Super Admin)',
    role: 'admin',
    passwordHash: 'Narenguru',
    isActive: true
  });

  // HOD
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
    SEED_ROSTERS[year].forEach(student => {
      seedUsers.push({
        id: student.register_no,
        name: student.name,
        role: 'student',
        passwordHash: student.register_no,
        isActive: true,
        targetYear: year
      });
    });
  });

  // Seed Subjects
  const seedSubjects = [
    { code: 'CS3301', name: 'Data Structures', semester: '3rd Semester (Odd)', year: '2nd_year', allocatedStaffId: 'rajesh@smit.edu.in' },
    { code: 'CS3302', name: 'Object Oriented Programming', semester: '3rd Semester (Odd)', year: '2nd_year', allocatedStaffId: 'priya@smit.edu.in' },
    { code: 'IT3501', name: 'Computer Networks', semester: '5th Semester (Odd)', year: '3rd_year', allocatedStaffId: 'anbarasan@smit.edu.in' },
    { code: 'IT3502', name: 'Web Technology', semester: '5th Semester (Odd)', year: '3rd_year', allocatedStaffId: 'priya@smit.edu.in' },
    { code: 'IT3701', name: 'Cloud Computing', semester: '7th Semester (Odd)', year: '4th_year', allocatedStaffId: 'rajesh@smit.edu.in' },
    { code: 'IT3702', name: 'Cryptography & Network Security', semester: '7th Semester (Odd)', year: '4th_year', allocatedStaffId: 'anbarasan@smit.edu.in' }
  ];

  // Seed Assignments
  const seedAssignments = [
    {
      id: 'a1',
      title: 'Binary Search Tree Implementation',
      description: 'Implement a BST in Java/C++ supporting insert, delete, search and traversals.',
      dueDate: '2026-08-25',
      subjectCode: 'CS3301',
      subjectName: 'Data Structures',
      year: '2nd_year',
      facultyId: 'rajesh@smit.edu.in',
      createdAt: new Date().toISOString(),
      type: 'Assignment'
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
      createdAt: new Date().toISOString(),
      type: 'Assignment'
    }
  ];

  // Seed Submissions
  const seedSubmissions: any[] = [];
  SEED_ROSTERS['2nd_year'].forEach((student, index) => {
    let status = 'Pending';
    let score;
    let feedback;

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

  SEED_ROSTERS['3rd_year'].forEach((student, index) => {
    let status = 'Pending';
    let score;
    let feedback;

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

  const seedLogs = [
    { id: 'l1', user: 'System', action: 'Database Seeded successfully.', timestamp: new Date().toISOString() }
  ];

  return {
    users: seedUsers,
    subjects: seedSubjects,
    assignments: seedAssignments,
    submissions: seedSubmissions,
    auditLogs: seedLogs
  };
};

let inMemoryDB: any = null;

async function getDB() {
  const KV_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const KV_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  if (KV_URL && KV_TOKEN) {
    try {
      const res = await fetch(`${KV_URL}/get/smit_db`, {
        headers: {
          Authorization: `Bearer ${KV_TOKEN}`
        },
        next: { revalidate: 0 }
      });
      const data = await res.json();
      if (data && data.result) {
        return JSON.parse(data.result);
      }
    } catch (err) {
      console.error("KV Read Error:", err);
    }
  }

  // Use in-memory DB cache if local file writing is unavailable
  if (inMemoryDB) {
    return inMemoryDB;
  }

  // Fallback to local file db.json (with safe try-catch for Vercel)
  try {
    if (fs.existsSync(DB_FILE)) {
      const fileContent = fs.readFileSync(DB_FILE, 'utf-8');
      inMemoryDB = JSON.parse(fileContent);
      return inMemoryDB;
    }
  } catch (e) {
    console.warn("Read-only filesystem: Local file read failed:", e);
  }

  // Seed default data
  const data = getSeedData();
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  } catch (e) {
    console.warn("Read-only filesystem: Local file write failed (Expected on Vercel serverless). Using memory.");
  }
  inMemoryDB = data;
  return inMemoryDB;
}

async function saveDB(data: any) {
  const KV_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const KV_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  // Always update in-memory cache
  inMemoryDB = data;

  if (KV_URL && KV_TOKEN) {
    try {
      await fetch(KV_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${KV_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(['SET', 'smit_db', JSON.stringify(data)])
      });
      return;
    } catch (err) {
      console.error("KV Write Error:", err);
    }
  }

  // Fallback to local file db.json
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  } catch (e) {
    console.warn("Read-only filesystem: Local file write failed (Expected on Vercel serverless). Saved to memory.");
  }
}

export async function GET() {
  const data = await getDB();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const data = await request.json();
  await saveDB(data);
  return NextResponse.json({ success: true });
}
