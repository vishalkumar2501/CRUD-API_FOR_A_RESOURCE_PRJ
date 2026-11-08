const express = require('express');
const studentController = require('../controllers/student.controller');

const router = express.Router();

// Student CRUD Routes
router.post('/', studentController.createStudent);
router.get('/', studentController.getAllStudents);
router.get('/:id', studentController.getStudentById);
router.put('/:id', studentController.updateStudent);
router.delete('/:id', studentController.deleteStudent);

module.exports = router;
