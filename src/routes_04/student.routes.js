const express = require('express');
const router = express.Router();
const {
    createStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
} = require('../controllers_03/student.controller');

// Route: /api/students
router.route('/')
    .post(createStudent)
    .get(getAllStudents);

// Route: /api/students/:id
router.route('/:id')
    .get(getStudentById)
    .put(updateStudent)
    .patch(updateStudent)
    .delete(deleteStudent);

module.exports = router;
