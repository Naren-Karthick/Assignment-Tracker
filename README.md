# SMIT IT Department - Coursework & Assignment Tracker

A modern, mobile-responsive coursework tracker built with **Next.js**, **React**, and **TailwindCSS** for the Information Technology Department at Sri Muthukumaran Institute of Technology (SMIT). 

This portal acts as a central workspace for tracking assignments, homework, and test schedules, synchronizing data across multiple devices.

---

## 🚀 Key Features

*   **Four Custom Role Workspaces**:
    *   **Super Admin**: High-level roster managers (wiping databases, managing individual accounts).
    *   **Head of Department (HOD)**: View analytics, allocate subjects, manage teaching staff, and reassign teachers dynamically.
    *   **Faculty Members**: Post tests/homework/assignments, track student submissions, and grade work with feedback.
    *   **Students**: View upcoming coursework, check due dates, and monitor evaluation results.
*   **Instant Multi-Device Sync**: Persists data in real-time to a serverless backend JSON sync endpoint (`/api/db`) powered by Upstash Redis/Vercel KV to prevent device-to-device data drift.
*   **Responsive Cards Grid Layout**: Optimizes automatically for narrow mobile viewports, changing dense tables into actionable mobile cards.
*   **HOD Subject Reallocation**: HODs can edit subject teacher allocations in-place with instantaneous database sync.

---

## 🔑 Demo Access Credentials

| Role | User ID / Email | Password |
| :--- | :--- | :--- |
| **Super Admin** | `narenkarthickgururaju@gmail.com` | `Narenguru` |
| **HOD** (Dr. Kalaimagal Sivamuni) | `HOD` | `8886918686` |
| **Faculty** | `staff1` | `password123` |
| **Student** (e.g. Naren Karthick G) | `212625205029` | *Same as Register No* (`212625205029`) |

---

## 🛠️ Tech Stack

*   **Framework**: Next.js (App Router)
*   **Styling**: TailwindCSS & Vanilla CSS
*   **Database**: Serverless Server Handler with Upstash Redis / Vercel KV fallback
*   **Icons**: Lucide React
*   **Host**: Vercel

---

## 💻 Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.
