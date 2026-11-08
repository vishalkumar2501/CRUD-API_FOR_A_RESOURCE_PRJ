# 🎓 EduManage Pro | Full-Stack Student Management & Auth System

A production-ready Full-Stack MERN project with a clean separation between **Backend** (Node.js, Express, MongoDB) and **Frontend** (React.js, Vite).

---

## 📁 Project Structure (Separated Folders)

```text
01_CRUD-API-FOR_A_RESOUSCE/
│
├── backend/                      # Node.js + Express + MongoDB REST API
│   ├── src/
│   │   ├── controllers/          # Business logic (auth & student CRUD)
│   │   ├── db/                   # MongoDB Atlas connection
│   │   ├── middlewares/          # JWT auth & centralized error handling
│   │   ├── models/               # Mongoose schemas (student & user)
│   │   ├── routes/               # Clean RESTful endpoints
│   │   └── app.js                # Express app setup & route mounting
│   ├── .env                      # Environment secrets (PORT=5000, MONGO_URI, JWT_SECRET)
│   ├── package.json              # Backend dependencies
│   └── server.js                 # Server entry point
│
├── frontend/                     # React.js (Vite) Single Page Application
│   ├── src/
│   │   ├── components/           # Navbar, StatsCards, StudentTable, Modals, Toast
│   │   ├── services/             # Axios API client (connected to port 5000)
│   │   ├── App.jsx               # Main state & CRUD handlers
│   │   ├── index.css             # Modern design system & responsive UI
│   │   └── main.jsx              # React DOM entry
│   ├── index.html                # HTML entry
│   ├── package.json              # React & Vite dependencies
│   └── vite.config.js            # Vite configuration & proxy
│
└── README.md
```

---

## 🚀 How to Run the Project

### 1. Start the Backend (Terminal 1)
```bash
cd backend
npm run dev
```
👉 Backend will run on: **http://localhost:5000** (Connected to MongoDB Atlas)

---

### 2. Start the Frontend (Terminal 2)
```bash
cd frontend
npm run dev
```
👉 Frontend will run on: **http://localhost:5173** (Connected to Backend API)

---

## 📡 Backend API Endpoints

### 🔐 Authentication (`http://localhost:5000/api/auth`)
- `POST /register`: Register user/admin with hashed password (Bcrypt)
- `POST /login`: Authenticate and issue HTTP-only JWT cookie
- `GET /me`: Get current logged-in profile
- `POST /logout`: Clear token cookie

### 🎓 Student CRUD (`http://localhost:5000/api/students`)
- `POST /`: Create a new student record
- `GET /`: Get all students (sorted by newest first)
- `GET /:id`: Get single student by ID
- `PUT /:id`: Update student by ID
- `DELETE /:id`: Permanently delete student by ID
