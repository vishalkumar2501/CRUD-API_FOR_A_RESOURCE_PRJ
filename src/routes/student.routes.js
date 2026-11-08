const express = require('express');
const studentController = require('../controllers/student.controller');

const router = express.Router();

// STUDENT ROUTES (Industry-Standard RESTful)


// 1. Create Student (POST /api/students)
router.post('/', studentController.createStudent);

// 2. Get All Students (GET /api/students)
router.get('/', studentController.getAllStudents);

// 3. Get Student By ID (GET /api/students/:id)
router.get('/:id', studentController.getStudentById);

module.exports = router;
