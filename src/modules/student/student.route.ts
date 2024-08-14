import express from "express";
import { StudentControllers } from "./student.controller";
import validateRequest from "../../app/middlewares/validateRequest";
import { updateStudentValidationSchema } from "./studentValidation";
import auth from "../../app/middlewares/auth";

const router = express.Router();

// router.post('/create-student', StudentControllers.createStudent);

router.get("/", auth(), StudentControllers.getAllStudents);

router.get("/:studentId", StudentControllers.getSingleStudent);

router.patch(
  "/:studentId",
  validateRequest(updateStudentValidationSchema),
  StudentControllers.updateStudent
);

router.delete("/:studentId", StudentControllers.deleteStudent);

export const StudentRoutes = router;
