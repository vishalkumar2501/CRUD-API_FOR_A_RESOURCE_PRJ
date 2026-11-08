const express = require('express');
const studentController = require('../controllers/student.controller');

const router = express.Router();

// ---------------------------------------------------------------------------
// 1. CREATE STUDENT (POST /api/students)
// ---------------------------------------------------------------------------
router.post('/', studentController.createStudent);

// ---------------------------------------------------------------------------
// 2. GET ALL STUDENTS (GET /api/students)
// ---------------------------------------------------------------------------
router.get('/', studentController.getAllStudents);

// ---------------------------------------------------------------------------
// 3. GET STUDENT BY ID (GET /api/students/:id)
// ---------------------------------------------------------------------------
router.get('/:id', studentController.getStudentById);

// ---------------------------------------------------------------------------
// 4. UPDATE STUDENT (PUT /api/students/:id)
// ---------------------------------------------------------------------------
router.put('/:id', studentController.updateStudent);

// ---------------------------------------------------------------------------
// 5. DELETE STUDENT (DELETE /api/students/:id)
// ---------------------------------------------------------------------------
router.delete('/:id', studentController.deleteStudent);

module.exports = router;
