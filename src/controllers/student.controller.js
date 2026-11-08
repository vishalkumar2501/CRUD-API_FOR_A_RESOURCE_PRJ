const studentModel = require('../models/student.model');


// 1. CREATE STUDENT (POST /api/students)
async function createStudent(req, res) {
    try {
        const { name, email, age, course } = req.body;

        // Validation: Saare fields check karo
        if (!name || !email || !age || !course) {
            return res.status(400).json({
                message: "All fields (name, email, age, course) are required"
            });
        }

        // Duplicate Check: Kya ye email pehle se exist karta hai?
        const isStudentExist = await studentModel.findOne({ 
            email: email.toLowerCase().trim() 
        });

        if (isStudentExist) {
            return res.status(400).json({
                message: "Student already exists with this email"
            });
        }

        // Database Entry: Naya student document create karo
        const student = await studentModel.create({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            age,
            course: course.trim()
        });

        // Success Response
        return res.status(201).json({
            message: "Student created successfully",
            student: student
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || "Internal server error"
        });
    }
}


// 2. GET ALL STUDENTS (GET /api/students)

async function getAllStudents(req, res) {
    try {
        // Database se saare students lekar aao (latest pehle)
        const students = await studentModel.find().sort({ createdAt: -1 });

        return res.status(200).json({
            message: "Students fetched successfully",
            count: students.length,
            students: students
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || "Internal server error"
        });
    }
}


// 3. GET STUDENT BY ID (GET /api/students/:id)

async function getStudentById(req, res) {
    try {
        const { id } = req.params;

        // ID se specific student dhundho
        const student = await studentModel.findById(id);

        if (!student) {
            return res.status(404).json({
                message: "Student not found with the provided ID"
            });
        }

        return res.status(200).json({
            message: "Student details fetched successfully",
            student: student
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || "Internal server error"
        });
    }
}

module.exports = {
    createStudent,
    getAllStudents,
    getStudentById
};
