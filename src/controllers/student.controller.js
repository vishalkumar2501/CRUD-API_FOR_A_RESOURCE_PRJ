const Student = require('../models/student.model');
const asyncHandler = require('../utils/asyncHandler');

// @desc    Create a new student
// @route   POST /api/students
const createStudent = asyncHandler(async (req, res) => {
    const { name, email, age, course } = req.body;

    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
        return res.status(400).json({
            success: false,
            message: 'Student with this email already exists',
        });
    }

    const student = await Student.create({ name, email, age, course });

    res.status(201).json({
        success: true,
        message: 'Student created successfully',
        data: student,
    });
});

// @desc    Get all students
// @route   GET /api/students
const getAllStudents = asyncHandler(async (req, res) => {
    const students = await Student.find();

    res.status(200).json({
        success: true,
        count: students.length,
        data: students,
    });
});

// @desc    Get single student by ID
// @route   GET /api/students/:id
const getStudentById = asyncHandler(async (req, res) => {
    const student = await Student.findById(req.params.id);

    if (!student) {
        return res.status(404).json({
            success: false,
            message: 'Student not found',
        });
    }

    res.status(200).json({
        success: true,
        data: student,
    });
});

// @desc    Update student by ID
// @route   PUT /api/students/:id
const updateStudent = asyncHandler(async (req, res) => {
    const student = await Student.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );

    if (!student) {
        return res.status(404).json({
            success: false,
            message: 'Student not found',
        });
    }

    res.status(200).json({
        success: true,
        message: 'Student updated successfully',
        data: student,
    });
});

// @desc    Delete student by ID
// @route   DELETE /api/students/:id
const deleteStudent = asyncHandler(async (req, res) => {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
        return res.status(404).json({
            success: false,
            message: 'Student not found',
        });
    }

    res.status(200).json({
        success: true,
        message: 'Student deleted successfully',
    });
});

module.exports = {
    createStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
};
