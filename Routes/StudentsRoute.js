const express = require("express");
const { createStudent, getStudentById, getStudents, deleteStudent, updateStudent, StudentLogin } = require("../Controller/StudentController");
const upload = require("../middleware/uploads");
const StudentRouter = express.Router();

StudentRouter.post("/", upload.single("profileImage"), createStudent);
StudentRouter.get("/", getStudents);
StudentRouter.get("/:id", getStudentById);
StudentRouter.put("/:studentid", upload.single("profileImage"), updateStudent);
StudentRouter.delete("/:studentid", deleteStudent);
StudentRouter.post("/login", StudentLogin);

module.exports = StudentRouter;
