const studentModel = require('../models/student.model');

// ---------------------------------------------------------------------------
// 1. CREATE STUDENT (POST /api/students)
// ---------------------------------------------------------------------------
async function createStudent(req, res, next) {
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
        next(error);
    }
}

// ---------------------------------------------------------------------------
// 2. GET ALL STUDENTS (GET /api/students)
// ---------------------------------------------------------------------------
async function getAllStudents(req, res, next) {
    try {
        const students = await studentModel.find().sort({ createdAt: -1 });

        return res.status(200).json({
            message: "Students fetched successfully",
            count: students.length,
            students: students
        });

    } catch (error) {
        next(error);
    }
}

// ---------------------------------------------------------------------------
// 3. GET STUDENT BY ID (GET /api/students/:id)
// ---------------------------------------------------------------------------
async function getStudentById(req, res, next) {
    try {
        const { id } = req.params;

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
        next(error);
    }
}

// ---------------------------------------------------------------------------
// 4. UPDATE STUDENT (PUT /api/students/:id)
// ---------------------------------------------------------------------------
async function updateStudent(req, res, next) {
    try {
        const { id } = req.params;
        const { name, email, age, course } = req.body;

        const updatedStudent = await studentModel.findByIdAndUpdate(
            id,
            {
                ...(name && { name: name.trim() }),
                ...(email && { email: email.toLowerCase().trim() }),
                ...(age && { age }),
                ...(course && { course: course.trim() })
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedStudent) {
            return res.status(404).json({
                message: "Student not found with the provided ID"
            });
        }

        return res.status(200).json({
            message: "Student updated successfully",
            student: updatedStudent
        });

    } catch (error) {
        next(error);
    }
}

// ---------------------------------------------------------------------------
// 5. DELETE STUDENT (DELETE /api/students/:id)
// ---------------------------------------------------------------------------
async function deleteStudent(req, res, next) {
    try {
        const { id } = req.params;

        const deletedStudent = await studentModel.findByIdAndDelete(id);

        if (!deletedStudent) {
            return res.status(404).json({
                message: "Student not found with the provided ID"
            });
        }

        return res.status(200).json({
            message: "Student deleted successfully",
            student: deletedStudent
        });

    } catch (error) {
        next(error);
    }
}

module.exports = {
    createStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent
};
