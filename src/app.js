const express = require('express');
const cookieParser = require('cookie-parser');
const studentRoutes = require('./routes/student.routes');

const app = express();

// ==========================================
// 1. GLOBAL MIDDLEWARES
// ==========================================
app.use(express.json());
app.use(cookieParser());

// ==========================================
// 2. ROUTE PREFIX (Industry Standard)
// ==========================================
app.use('/api/students', studentRoutes);

// ==========================================
// 3. EXPORT APP
// ==========================================
module.exports = app;
