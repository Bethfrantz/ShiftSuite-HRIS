# ShiftSuite HRIS — Scheduling & Workforce Management Platform

ShiftSuite is a full‑stack **HRIS‑style scheduling and workforce management platform** built with **React, Node.js, Express, and MongoDB**. It features a fully custom **enterprise‑grade design system** inspired by Paylocity, Dayforce, and modern internal business tools.

---

## ✨ Features

- HRIS‑style dashboard with enterprise UI  
- Shift scheduling (create, edit, assign, delete)  
- Calendar view with shift indicators  
- Employee management  
- Reusable component library  
- Custom design system  
  - spacing tokens  
  - typography scale  
  - color system  
  - shadows & radii  
  - animations & transitions  
- Responsive layout  
- Dark mode support  
- REST API (Node + Express)  
- MongoDB data models  
- Production‑ready folder structure

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Custom CSS design system  
- Enterprise UI components  
- Context‑based state management

### Backend
- Node.js  
- Express  
- REST API architecture  

### Database
- MongoDB  
- Mongoose models  

### Deployment
- Frontend: Vercel  
- Backend: Railway / Render  

---

## 📁 Project Structure
ShiftSuite-HRIS/
│
├── client/               # React frontend
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── pages/        # Dashboard, Scheduling, Calendar
│   │   ├── styles/       # Design system CSS
│   │   └── utils/
│   └── public/
│
├── server/               # Node/Express backend
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── config/
│
├── design-system/        # Tokens, utilities, global styles
│
└── README.md

---

## 📅 Scheduling System Overview

ShiftSuite provides a clean, HRIS‑grade scheduling workflow:

- Create shifts  
- Assign employees  
- View schedules in a calendar grid  
- Highlight days with shifts  
- Display shift tags inside calendar cells  
- Manage shift actions (edit/delete)  

---

## 🎨 Design System

ShiftSuite includes a fully custom design system:

### Tokens
- `--space-*` spacing scale  
- `--text-*` typography scale  
- `--radius-*` radii  
- `--shadow-*` shadows  
- `--brand-*` semantic colors  
- `--neutral-*` grayscale palette  

### Components
- Buttons  
- Badges  
- Cards  
- Panels  
- Modals  
- Tables  
- Calendar cells  
- Shift cards  

### Utilities
- Flex/grid helpers  
- Layout spacing  
- Text utilities  
- Animation utilities  

---

## 📡 API Endpoints (Example)

### Shifts
GET    /api/shifts
POST   /api/shifts
PUT    /api/shifts/:id
DELETE /api/shifts/:id

### Employees
GET    /api/employees
POST   /api/employees
PUT    /api/employees/:id
DELETE /api/employees/:id


---

## 🚀 Getting Started

### Clone the repository
git clone https://github.com/BethFrantz/ShiftSuite-HRIS.git


### Install dependencies

Frontend:
cd client
npm install
npm run dev


Backend:
cd server
npm install
npm start


---

## 📸 Screenshots

Add your screenshots here:

- Dashboard  
- Scheduling page  
- Calendar  
- Shift cards  
- Employee list  
- Modals  
- Dark mode  

Place them in:
/docs/screenshots/


---

## 📈 Roadmap

- Authentication (JWT)  
- Role‑based access (Admin / Manager / Employee)  
- Availability tracking  
- PTO requests  
- Notifications  
- Drag‑and‑drop scheduling  

---

## 📄 License

MIT License

---

## 👤 Author

**Beth Frantz**  
Full‑Stack Developer — React, Node, Express, MongoDB  
Plymouth / Polk, Indiana  



