const Student = require('../models_02/student.model');

// @desc    Create a new student
// @route   POST /api/students
const createStudent = async (req, res, next) => {
    try {
        const { name, email, age, course, rollNumber, phone } = req.body;

        const newStudent = await Student.create({
            name,
            email,
            age,
            course,
            rollNumber,
            phone,
        });

        res.status(201).json({
            success: true,
            message: 'Student created successfully',
            data: newStudent,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all students
// @route   GET /api/students
const getAllStudents = async (req, res, next) => {
    try {
        const students = await Student.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: students.length,
            data: students,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get a single student by ID
// @route   GET /api/students/:id
const getStudentById = async (req, res, next) => {
    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: `Student not found with id: ${req.params.id}`,
            });
        }

        res.status(200).json({
            success: true,
            data: student,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update a student by ID
// @route   PUT /api/students/:id
const updateStudent = async (req, res, next) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedStudent) {
            return res.status(404).json({
                success: false,
                message: `Student not found with id: ${req.params.id}`,
            });
        }

        res.status(200).json({
            success: true,
            message: 'Student updated successfully',
            data: updatedStudent,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete a student by ID
// @route   DELETE /api/students/:id
const deleteStudent = async (req, res, next) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: `Student not found with id: ${req.params.id}`,
            });
        }

        res.status(200).json({
            success: true,
            message: 'Student deleted successfully',
            data: {},
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
};
